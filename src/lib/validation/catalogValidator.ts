/**
 * Backend Validator untuk Model Selempang & Batas Pilihan per Grup Opsi (max_pilih)
 * Usaha: Selempang Aceh Barat (FHD)
 *
 * Menegakkan aturan:
 * 1. Opsi harus terdaftar dan berelasi secara sah dengan model yang dipilih.
 * 2. Batas maksimal pilihan per grup (misal renda max 1) divalidasi secara dinamis
 *    berdasarkan atribut grup (max_pilih), BUKAN hardcoded nama.
 */

import {
  getMockSashModel,
  getMockOptionsForModel,
  GroupedResolvedOptions,
  ResolvedOption,
} from "@/lib/catalog/mock-sash-catalog";
import { getProductModelBySlugFromDb } from "@/lib/db/productModelsStore";
import { getOptionsForModelFromDb } from "@/lib/db/modelOptionsStore";

export interface ValidationSuccess {
  isValid: true;
  model: {
    id: number;
    slug: string;
    nama: string;
    harga_dasar: number;
    status: "draft" | "published";
  };
  validatedOptions: {
    id: number;
    slug: string;
    nama: string;
    group_id: number;
    group_name: string;
    effective_price: number;
    status: "draft" | "published";
  }[];
  unitPrice: number;
  isDraft: boolean;
  draftItems: string[];
}

export interface ValidationFailure {
  isValid: false;
  statusCode: number;
  message: string;
}

export type CatalogValidationResult = ValidationSuccess | ValidationFailure;

export interface ValidationOptions {
  requirePublished?: boolean;
}

/**
 * Validasi model selempang, aturan batas grup opsi, dan penguncian status draft
 */
export async function validateModelAndOptionGroupLimits(
  modelSlugOrId: string | number,
  selectedOptionSlugs: string[] = [],
  options: ValidationOptions = {}
): Promise<CatalogValidationResult> {
  // 1. Ambil data model
  let model = await getProductModelBySlugFromDb(String(modelSlugOrId));
  let numericModelId = model?.id;

  if (!model) {
    const mockModel = getMockSashModel(modelSlugOrId);
    if (!mockModel) {
      return {
        isValid: false,
        statusCode: 400,
        message: `Model selempang "${modelSlugOrId}" tidak terdaftar dalam katalog resmi.`,
      };
    }
    model = {
      id: mockModel.id,
      slug: mockModel.slug,
      nama: mockModel.nama,
      short_name: mockModel.shortName,
      harga_dasar: mockModel.harga_dasar,
      deskripsi: mockModel.deskripsi,
      status: mockModel.status,
      features_json: JSON.stringify(mockModel.features),
    };
    numericModelId = mockModel.id;
  }

  // 2. Ambil grup opsi & opsi yang diizinkan untuk model ini (via relasi database)
  const groupedOptions: GroupedResolvedOptions[] = await getOptionsForModelFromDb(numericModelId!);

  // Kumpulkan seluruh opsi sah untuk model ini
  const allAvailableOptions: ResolvedOption[] = [];
  groupedOptions.forEach((g) => allAvailableOptions.push(...g.options));

  // 3. Validasi apakah semua opsi yang dikirim tersedia untuk model ini
  const matchedOptions: ResolvedOption[] = [];

  for (const requestedSlug of selectedOptionSlugs) {
    const found = allAvailableOptions.find(
      (avail) =>
        avail.option.slug === requestedSlug ||
        avail.option.id.toString() === requestedSlug.toString()
    );

    if (!found) {
      return {
        isValid: false,
        statusCode: 400,
        message: `Opsi kustom "${requestedSlug}" tidak tersedia untuk ${model.nama}.`,
      };
    }

    if (!matchedOptions.some((m) => m.option.id === found.option.id)) {
      matchedOptions.push(found);
    }
  }

  // 4. Validasi batas maksimal pilihan per grup (max_pilih) secara dinamis
  for (const grp of groupedOptions) {
    const maxAllowed = grp.group.max_pilih;

    if (maxAllowed !== null && maxAllowed > 0) {
      const selectedInGroup = matchedOptions.filter(
        (mo) => mo.group.id === grp.group.id
      );

      if (selectedInGroup.length > maxAllowed) {
        return {
          isValid: false,
          statusCode: 400,
          message: `Grup pilihan "${grp.group.nama_grup}" dibatasi maksimal ${maxAllowed} pilihan (Anda memilih ${selectedInGroup.length}: ${selectedInGroup.map((s) => s.option.nama).join(", ")}).`,
        };
      }
    }
  }

  // 5. Cek status draft & kumpulkan item draft
  const draftItems: string[] = [];
  if (model.status === "draft") {
    draftItems.push(`Model: ${model.nama}`);
  }
  for (const mo of matchedOptions) {
    if (mo.option.status === "draft") {
      draftItems.push(`Opsi: ${mo.option.nama}`);
    }
  }

  const isDraft = draftItems.length > 0;

  // 6. Kunci Status Draft: Blokir Pemakaian pada Transaksi Nyata
  if (options.requirePublished && isDraft) {
    return {
      isValid: false,
      statusCode: 403,
      message: `Transaksi nyata diblokir: Item katalog masih berstatus "draft" (${draftItems.join(
        ", "
      )}). Publikasikan dan verifikasi struktur sebelum digunakan dalam transaksi riil.`,
    };
  }

  // 7. Hitung harga satuan server-side tervalidasi
  const optionsTotal = matchedOptions.reduce(
    (acc, curr) => acc + curr.effectivePrice,
    0
  );
  const unitPrice = model.harga_dasar + optionsTotal;

  return {
    isValid: true,
    model: {
      id: model.id,
      slug: model.slug,
      nama: model.nama,
      harga_dasar: model.harga_dasar,
      status: model.status,
    },
    validatedOptions: matchedOptions.map((mo) => ({
      id: mo.option.id,
      slug: mo.option.slug,
      nama: mo.option.nama,
      group_id: mo.group.id,
      group_name: mo.group.nama_grup,
      effective_price: mo.effectivePrice,
      status: mo.option.status,
    })),
    unitPrice,
    isDraft,
    draftItems,
  };
}

/**
 * Memeriksa status publikasi katalog dan memblokir eksekusi transaksi nyata jika masih draft
 */
export async function assertCatalogPublishedForLiveTransaction(
  modelSlugOrId: string | number,
  selectedOptionSlugs: string[] = []
): Promise<{ canProceed: boolean; error?: string; draftItems?: string[] }> {
  const result = await validateModelAndOptionGroupLimits(
    modelSlugOrId,
    selectedOptionSlugs,
    { requirePublished: true }
  );

  if (!result.isValid) {
    return {
      canProceed: false,
      error: result.message,
    };
  }

  return {
    canProceed: true,
    draftItems: result.draftItems,
  };
}

/**
 * Memvalidasi apakah seluruh opsi tambahan yang dipilih sah dan tersedia untuk model terkait
 */
export async function validateOptionsForModel(
  modelSlugOrId: string | number,
  requestedOptionSlugs: string[] = []
): Promise<{
  isValid: boolean;
  modelName: string;
  allowedOptions: string[];
  disallowedOptions: string[];
  message?: string;
}> {
  const result = await validateModelAndOptionGroupLimits(
    modelSlugOrId,
    requestedOptionSlugs
  );

  if (!result.isValid) {
    return {
      isValid: false,
      modelName: String(modelSlugOrId),
      allowedOptions: [],
      disallowedOptions: requestedOptionSlugs,
      message: result.message,
    };
  }

  return {
    isValid: true,
    modelName: result.model.nama,
    allowedOptions: result.validatedOptions.map((o) => o.slug),
    disallowedOptions: [],
  };
}

/**
 * Memvalidasi batas kuota pilihan per grup opsi (max_pilih) secara dinamis
 * tanpa hardcode nama opsi (sesuai PRD Kustomisasi Selempang Dinamis)
 */
export function validateGroupLimitsDynamically(
  selectedOptions: { groupId: number; optionName: string }[],
  groups: { id: number; namaGrup: string; maxPilih: number | null }[]
): {
  isValid: boolean;
  violatedGroup?: { id: number; namaGrup: string; maxPilih: number };
  selectedCount?: number;
  message?: string;
} {
  for (const grp of groups) {
    if (grp.maxPilih !== null && grp.maxPilih > 0) {
      const inGroup = selectedOptions.filter((o) => o.groupId === grp.id);
      if (inGroup.length > grp.maxPilih) {
        return {
          isValid: false,
          violatedGroup: {
            id: grp.id,
            namaGrup: grp.namaGrup,
            maxPilih: grp.maxPilih,
          },
          selectedCount: inGroup.length,
          message: `Grup ${grp.namaGrup} dibatasi maksimal ${grp.maxPilih} pilihan (Anda memilih ${inGroup.length}: ${inGroup.map((o) => o.optionName).join(", ")}).`,
        };
      }
    }
  }

  return { isValid: true };
}
