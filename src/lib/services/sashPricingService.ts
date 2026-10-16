/**
 * Service Hitung Harga Dasar & Opsi Selempang Server-Side
 * Ref Task: kustomisasi-selempang-dinamis/harga-otomatis-server/buat-service-hitung-harga-dasar-dan-opsi
 * Usaha: Selempang Aceh Barat (FHD)
 *
 * Bertanggung jawab melakukan:
 * 1. Resolusi model selempang dan harga dasarnya dari database
 * 2. Resolusi opsi tambahan yang sah via relasi sc_model_custom_options & harga_override
 * 3. Penegakan aturan batas kuota grup (max_pilih)
 * 4. Perhitungan subtotal satuan, total akhir (satuan x kuantitas), dan split DP 50%
 * 5. Pembuatan snapshot data terstruktur untuk disimpan ke tabel pesanan
 */

import { getProductModelBySlugFromDb, ScProductModel } from "@/lib/db/productModelsStore";
import { getOptionsForModelFromDb } from "@/lib/db/modelOptionsStore";
import {
  getMockSashModel,
  getMockOptionsForModel,
  GroupedResolvedOptions,
  ResolvedOption,
} from "@/lib/catalog/mock-sash-catalog";

export interface CalculateSashPriceParams {
  modelSlugOrId: string | number;
  optionSlugs?: string[];
  quantity?: number;
}

export interface OptionPriceSnapshot {
  optionId: number;
  optionSlug: string;
  optionName: string;
  groupId: number;
  groupName: string;
  basePrice: number;
  effectivePrice: number;
  hasPriceOverride: boolean;
}

export interface ServerPriceCalculationSuccess {
  isValid: true;
  model: {
    id: number;
    slug: string;
    nama: string;
    hargaDasar: number;
    status: "draft" | "published";
  };
  quantity: number;
  basePrice: number;
  optionsTotal: number;
  unitPrice: number;
  totalPrice: number;
  dpAmount: number;
  balanceAmount: number;
  breakdown: OptionPriceSnapshot[];
  isDraft: boolean;
  draftItems: string[];
}

export interface ServerPriceCalculationFailure {
  isValid: false;
  statusCode: number;
  error: string;
}

export type ServerPriceCalculationResult =
  | ServerPriceCalculationSuccess
  | ServerPriceCalculationFailure;

export class SashPricingService {
  /**
   * Menghitung total harga selempang secara resmi di backend
   */
  public static async calculate(
    params: CalculateSashPriceParams
  ): Promise<ServerPriceCalculationResult> {
    const { modelSlugOrId, optionSlugs = [], quantity = 1 } = params;
    const safeQty = Math.max(1, Math.floor(quantity || 1));

    // 1. Ambil data model dari DB (atau mock fallback)
    let model = await getProductModelBySlugFromDb(String(modelSlugOrId));
    let numericModelId = model?.id;

    if (!model) {
      const mock = getMockSashModel(modelSlugOrId);
      if (!mock) {
        return {
          isValid: false,
          statusCode: 404,
          error: `Model selempang "${modelSlugOrId}" tidak ditemukan dalam basis data katalog.`,
        };
      }
      model = {
        id: mock.id,
        slug: mock.slug,
        nama: mock.nama,
        short_name: mock.shortName,
        harga_dasar: mock.harga_dasar,
        deskripsi: mock.deskripsi,
        status: mock.status,
        features_json: JSON.stringify(mock.features),
      };
      numericModelId = mock.id;
    }

    // 2. Ambil grup & opsi sah untuk model ini via relasi
    let groupedOptions: GroupedResolvedOptions[] = await getOptionsForModelFromDb(
      numericModelId!
    );
    if (!groupedOptions || groupedOptions.length === 0) {
      groupedOptions = getMockOptionsForModel(numericModelId!);
    }

    const allAllowedOptions: ResolvedOption[] = [];
    groupedOptions.forEach((g) => allAllowedOptions.push(...g.options));

    // 3. Cocokkan opsi yang dipilih
    const matchedOptions: ResolvedOption[] = [];
    const draftItems: string[] = [];

    if (model.status === "draft") {
      draftItems.push(`Model: ${model.nama}`);
    }

    for (const reqSlug of optionSlugs) {
      const found = allAllowedOptions.find(
        (avail) =>
          avail.option.slug === reqSlug ||
          avail.option.id.toString() === reqSlug.toString()
      );

      if (!found) {
        return {
          isValid: false,
          statusCode: 400,
          error: `Opsi tambahan "${reqSlug}" tidak sah untuk model selempang ${model.nama}.`,
        };
      }

      if (!matchedOptions.some((m) => m.option.id === found.option.id)) {
        matchedOptions.push(found);
        if (found.option.status === "draft") {
          draftItems.push(`Opsi: ${found.option.nama}`);
        }
      }
    }

    // 4. Validasi kuota per grup (max_pilih dinamis)
    for (const grp of groupedOptions) {
      const maxAllowed = grp.group.max_pilih;
      if (maxAllowed !== null && maxAllowed > 0) {
        const countInGroup = matchedOptions.filter(
          (mo) => mo.group.id === grp.group.id
        );
        if (countInGroup.length > maxAllowed) {
          return {
            isValid: false,
            statusCode: 400,
            error: `Grup ${grp.group.nama_grup} dibatasi maksimal ${maxAllowed} pilihan (ditemukan ${countInGroup.length}).`,
          };
        }
      }
    }

    // 5. Kalkulasi Harga
    const basePrice = Number(model.harga_dasar);
    const optionsTotal = matchedOptions.reduce(
      (sum, item) => sum + item.effectivePrice,
      0
    );
    const unitPrice = basePrice + optionsTotal;
    const totalPrice = unitPrice * safeQty;
    const dpAmount = Math.floor(totalPrice * 0.5);
    const balanceAmount = totalPrice - dpAmount;

    // 6. Buat Breakdown & Snapshot
    const breakdown: OptionPriceSnapshot[] = matchedOptions.map((mo) => ({
      optionId: mo.option.id,
      optionSlug: mo.option.slug,
      optionName: mo.option.nama,
      groupId: mo.group.id,
      groupName: mo.group.nama_grup,
      basePrice: mo.option.harga,
      effectivePrice: mo.effectivePrice,
      hasPriceOverride: mo.effectivePrice !== mo.option.harga,
    }));

    return {
      isValid: true,
      model: {
        id: model.id,
        slug: model.slug,
        nama: model.nama,
        hargaDasar: basePrice,
        status: model.status,
      },
      quantity: safeQty,
      basePrice,
      optionsTotal,
      unitPrice,
      totalPrice,
      dpAmount,
      balanceAmount,
      breakdown,
      isDraft: draftItems.length > 0,
      draftItems,
    };
  }

  /**
   * Menghitung total akhir berdasarkan perkalian harga satuan dan kuantitas pesanan
   */
  public static multiply(
    unitPrice: number,
    quantity: number
  ): {
    quantity: number;
    subtotal: number;
    dpAmount: number;
    balanceAmount: number;
  } {
    const safeQty = Math.max(1, Math.floor(quantity || 1));
    const subtotal = Math.max(0, unitPrice) * safeQty;
    const dpAmount = Math.floor(subtotal * 0.5);
    const balanceAmount = subtotal - dpAmount;

    return {
      quantity: safeQty,
      subtotal,
      dpAmount,
      balanceAmount,
    };
  }

  /**
   * Menyelaraskan tagihan DP 50% dan Pelunasan 50% agar jumlahnya 100% presisi tanpa selisih pembulatan
   */
  public static alignDpAndSettlement(totalAmount: number): {
    total: number;
    dpAmount: number;
    balanceAmount: number;
    isAligned: boolean;
  } {
    const safeTotal = Math.max(0, Math.round(totalAmount));
    const dpAmount = Math.floor(safeTotal * 0.5);
    const balanceAmount = safeTotal - dpAmount;

    return {
      total: safeTotal,
      dpAmount,
      balanceAmount,
      isAligned: dpAmount + balanceAmount === safeTotal,
    };
  }
}
