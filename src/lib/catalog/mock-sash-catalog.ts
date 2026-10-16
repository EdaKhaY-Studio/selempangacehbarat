/**
 * Mock Data Sumber Kebenaran Database Katalog Selempang (Fase 1 — Data Tiruan / Stub)
 * Memetakan skema tabel masa depan: sash_models, option_groups, custom_options, dan model_options
 * Selaras dengan PRD Kustomisasi Selempang Dinamis (FHD).
 */

export interface SashModelEntity {
  id: number;
  slug: "biasa" | "syal" | "timbal_balik";
  nama: string; // Nama lengkap resmi (bukan kode Model A/B/C)
  shortName: string;
  harga_dasar: number;
  deskripsi: string;
  status: "draft" | "published";
  features: string[];
  photos: {
    main: string;
    gallery: string[];
    caption: string;
  };
}

export interface OptionGroupEntity {
  id: number;
  slug: string;
  nama_grup: string;
  deskripsi: string;
  max_pilih: number | null; // 1 untuk eksklusif (mis. renda), null untuk bebas
  is_required: boolean;
}

export interface CustomOptionEntity {
  id: number;
  slug: string;
  group_id: number;
  nama: string;
  deskripsi?: string;
  harga: number;
  status: "draft" | "published";
}

export interface ModelOptionRelationEntity {
  id: number;
  model_id: number;
  option_id: number;
  harga_override: number | null; // Null berarti menggunakan harga default di custom_options
}

// ─── 1. Mock Data Model Selempang (sash_models) ──────────────────────────────
export const MOCK_SASH_MODELS: SashModelEntity[] = [
  {
    id: 1,
    slug: "biasa",
    nama: "Selempang Model Biasa (Menyamping)",
    shortName: "Model Biasa (Menyamping)",
    harga_dasar: 50000,
    deskripsi:
      "Selempang model klasik yang dikenakan menyamping dari bahu kanan ke pinggang kiri. Pilihan utama untuk wisuda, yudisium, pelantikan organisasi, dan penghargaan formal. Bahan kain bludru 2 lapis tebal atau satin kilap mewah dengan jahitan presisi.",
    status: "draft",
    features: [
      "Bordir komputer nama lengkap dan gelar akademik presisi",
      "Kain bludru beludru 2 lapis atau satin kilap premium",
      "Model klasik selempang bahu ke pinggang",
      "Dapat dipadukan dengan renda mahkota/marsyanda dan les pinggir",
      "Garansi 100% anti-typo ganti baru gratis",
    ],
    photos: {
      main: "/Gambar/01-selempang-wisuda-hitam-silver-nama.jpeg",
      gallery: [
        "/Gambar/01-selempang-wisuda-hitam-silver-nama.jpeg",
        "/Gambar/03-selempang-beige-bordir-pink.jpeg",
        "/Gambar/04-selempang-hitam-emas-rumbai.jpeg",
      ],
      caption: "Contoh Foto Asli: Selempang Model Biasa (Menyamping)",
    },
  },
  {
    id: 2,
    slug: "syal",
    nama: "Selempang Model Leher / Syal",
    shortName: "Model Leher / Syal",
    harga_dasar: 85000,
    deskripsi:
      "Selempang bergaya syal elegan yang melingkari leher dan menjuntai simetris ke dada kiri dan kanan. Memiliki ruang bordir nama di kedua sisi serta ornamen motif ujung dan rumbai yang menambah kewibawaan saat prosesi wisuda.",
    status: "draft",
    features: [
      "Dikenakan melingkar leher jatuh simetris rapi ke dada",
      "Ruang bordir nama, gelar, dan nama instansi di dua sisi",
      "Pilihan motif bordir ujung, motif tengah, dan rumbai",
      "Bahan kain bludru ganda atau satin mewah anti kusut",
      "Garansi 100% anti-typo ganti baru gratis",
    ],
    photos: {
      main: "/Gambar/02-selempang-hitam-bordir-emas-instansi.jpeg",
      gallery: [
        "/Gambar/02-selempang-hitam-bordir-emas-instansi.jpeg",
        "/Gambar/04-selempang-hitam-emas-rumbai.jpeg",
        "/Gambar/01-selempang-wisuda-hitam-silver-nama.jpeg",
      ],
      caption: "Contoh Foto Asli: Selempang Model Leher / Syal",
    },
  },
  {
    id: 3,
    slug: "timbal_balik",
    nama: "Selempang Model Leher Timbal Balik",
    shortName: "Model Leher Timbal Balik",
    harga_dasar: 135000,
    deskripsi:
      "Selempang premium dengan konstruksi dua sisi timbal balik bolak-balik eksklusif. Memungkinkan dua kombinasi warna kain atau dua set tulisan bordir berbeda di sisi luar dan sisi dalam. Hasil karya atelier terbaik untuk momen wisuda bergengsi.",
    status: "draft",
    features: [
      "Desain dua sisi bolak-balik timbal balik eksklusif",
      "Kerapian jahitan dan furing ganda atelier standar butik",
      "Bisa dua warna berbeda luar-dalam sesuai selera",
      "Harga paket all-inclusive Rp135.000 flat terlengkap",
      "Garansi 100% anti-typo ganti baru gratis",
    ],
    photos: {
      main: "/Gambar/04-selempang-hitam-emas-rumbai.jpeg",
      gallery: [
        "/Gambar/04-selempang-hitam-emas-rumbai.jpeg",
        "/Gambar/01-selempang-wisuda-hitam-silver-nama.jpeg",
        "/Gambar/02-selempang-hitam-bordir-emas-instansi.jpeg",
      ],
      caption: "Contoh Foto Asli: Selempang Model Leher Timbal Balik (Dua Sisi)",
    },
  },
];

// ─── 2. Mock Data Aturan Grup Opsi (option_groups) ───────────────────────────
export const MOCK_OPTION_GROUPS: OptionGroupEntity[] = [
  {
    id: 1,
    slug: "renda",
    nama_grup: "Renda Keliling",
    deskripsi: "Pilihan renda border selempang. Hanya boleh memilih maksimal 1 renda (sifat eksklusif).",
    max_pilih: 1, // Rule eksklusif per PRD
    is_required: false,
  },
  {
    id: 2,
    slug: "aksen_pinggir",
    nama_grup: "Aksen Pinggir & Rumbai",
    deskripsi: "Tambahan dekorasi lis pita atau rumbai tepi selempang.",
    max_pilih: null, // Bebas memilih beberapa opsi
    is_required: false,
  },
  {
    id: 3,
    slug: "motif_bordir",
    nama_grup: "Motif Bordir Tambahan",
    deskripsi: "Motif bordir komputer klasik khas selempang syal.",
    max_pilih: null,
    is_required: false,
  },
  {
    id: 4,
    slug: "logo_instansi",
    nama_grup: "Bordir Logo Kampus / Organisasi",
    deskripsi: "Bordir logo multi-warna komputer di sudut atau dada.",
    max_pilih: 1,
    is_required: false,
  },
];

// ─── 3. Mock Data Opsi Kustom (custom_options) ────────────────────────────────
export const MOCK_CUSTOM_OPTIONS: CustomOptionEntity[] = [
  // Grup 1: Renda
  { id: 101, slug: "renda_biasa", group_id: 1, nama: "Renda Biasa", deskripsi: "Renda rajut benang metalik standar", harga: 5000, status: "draft" },
  { id: 102, slug: "renda_mahkota", group_id: 1, nama: "Renda Mahkota", deskripsi: "Renda motif mahkota timbul mewah", harga: 7000, status: "draft" },
  { id: 103, slug: "renda_marsyanda", group_id: 1, nama: "Renda Marsyanda", deskripsi: "Renda pola lekuk Marsyanda elegan", harga: 7000, status: "draft" },

  // Grup 2: Aksen Pinggir & Rumbai
  { id: 201, slug: "les_pinggir", group_id: 2, nama: "Les Pinggir", deskripsi: "Pita lis pinggir warna emas/perak", harga: 5000, status: "draft" },
  { id: 202, slug: "rumbai", group_id: 2, nama: "Rumbai Pinggir / Ujung", deskripsi: "Rumbai benang emas berkilau di ujung selempang", harga: 15000, status: "draft" },
  { id: 203, slug: "rumbai_ujung", group_id: 2, nama: "Rumbai Ujung Syal", deskripsi: "Rumbai khusus kedua ujung model syal", harga: 15000, status: "draft" },

  // Grup 3: Motif Bordir
  { id: 301, slug: "motif_ujung", group_id: 3, nama: "Motif Ujung", deskripsi: "Ornamen floral bordir di kedua ujung selempang", harga: 5000, status: "draft" },
  { id: 302, slug: "motif_tengah", group_id: 3, nama: "Motif Tengah", deskripsi: "Ornamen motif simetris di bagian belakang leher", harga: 5000, status: "draft" },
  { id: 303, slug: "renda_syal", group_id: 3, nama: "Renda Syal", deskripsi: "Renda bordir keliling khusus model leher", harga: 15000, status: "draft" },

  // Grup 4: Logo
  { id: 401, slug: "bordir_logo", group_id: 4, nama: "Bordir Logo", deskripsi: "Bordir logo kampus/sekolah dengan benang bordir presisi", harga: 10000, status: "draft" },
];

// ─── 4. Mock Data Relasi Model ↔ Opsi (model_options) ─────────────────────────
// Kedua model leher berbagi opsi yang sama tanpa duplikasi definisi, dengan dukungan harga_override per model.
export const MOCK_MODEL_OPTIONS: ModelOptionRelationEntity[] = [
  // ── Model 1: Biasa (Menyamping)
  { id: 1, model_id: 1, option_id: 101, harga_override: null }, // Renda Biasa -> Rp5.000
  { id: 2, model_id: 1, option_id: 102, harga_override: null }, // Renda Mahkota -> Rp7.000
  { id: 3, model_id: 1, option_id: 103, harga_override: null }, // Renda Marsyanda -> Rp7.000
  { id: 4, model_id: 1, option_id: 201, harga_override: null }, // Les Pinggir -> Rp5.000
  { id: 5, model_id: 1, option_id: 202, harga_override: null }, // Rumbai -> Rp15.000
  { id: 6, model_id: 1, option_id: 401, harga_override: null }, // Bordir Logo -> Rp10.000

  // ── Model 2: Leher / Syal
  { id: 7, model_id: 2, option_id: 301, harga_override: null }, // Motif Ujung -> Rp5.000
  { id: 8, model_id: 2, option_id: 302, harga_override: null }, // Motif Tengah -> Rp5.000
  { id: 9, model_id: 2, option_id: 201, harga_override: 10000 }, // Les Pinggir -> override Rp10.000 (karena 2 sisi)
  { id: 10, model_id: 2, option_id: 303, harga_override: null }, // Renda Syal -> Rp15.000
  { id: 11, model_id: 2, option_id: 203, harga_override: null }, // Rumbai Ujung -> Rp15.000
  { id: 12, model_id: 2, option_id: 401, harga_override: null }, // Bordir Logo -> Rp10.000

  // ── Model 3: Leher Timbal Balik (Berbagi opsi yang sama dengan model leher, paket all-in)
  { id: 13, model_id: 3, option_id: 301, harga_override: 0 }, // Motif Ujung -> Sudah termasuk paket flat
  { id: 14, model_id: 3, option_id: 302, harga_override: 0 }, // Motif Tengah -> Sudah termasuk paket flat
  { id: 15, model_id: 3, option_id: 201, harga_override: 0 }, // Les Pinggir -> Sudah termasuk paket flat
  { id: 16, model_id: 3, option_id: 303, harga_override: 0 }, // Renda Syal -> Sudah termasuk paket flat
  { id: 17, model_id: 3, option_id: 203, harga_override: 0 }, // Rumbai Ujung -> Sudah termasuk paket flat
  { id: 18, model_id: 3, option_id: 401, harga_override: null }, // Bordir Logo -> Rp10.000
];

// ─── 5. Helper & Query Functions (Client & Server Mock Layer) ─────────────────

export interface ResolvedOption {
  option: CustomOptionEntity;
  group: OptionGroupEntity;
  effectivePrice: number;
  relationId: number;
}

export interface GroupedResolvedOptions {
  group: OptionGroupEntity;
  options: ResolvedOption[];
}

/**
 * Mengambil semua model selempang mock
 */
export function getMockSashModels(): SashModelEntity[] {
  return MOCK_SASH_MODELS;
}

/**
 * Mengambil model selempang berdasarkan slug atau ID
 */
export function getMockSashModel(idOrSlug: number | string): SashModelEntity | undefined {
  if (typeof idOrSlug === "number") {
    return MOCK_SASH_MODELS.find((m) => m.id === idOrSlug);
  }
  const numericId = parseInt(idOrSlug, 10);
  if (!isNaN(numericId)) {
    return MOCK_SASH_MODELS.find((m) => m.id === numericId);
  }
  return MOCK_SASH_MODELS.find((m) => m.slug === idOrSlug);
}

/**
 * Mengambil opsi yang tersedia untuk model tertentu melalui relasi model_options
 * Mengelompokkannya per option_groups dan menerapkan harga_override jika ada.
 */
export function getMockOptionsForModel(modelIdOrSlug: number | string): GroupedResolvedOptions[] {
  const model = getMockSashModel(modelIdOrSlug);
  if (!model) return [];

  // Filter relasi untuk model ini
  const relations = MOCK_MODEL_OPTIONS.filter((rel) => rel.model_id === model.id);

  const groupMap = new Map<number, { group: OptionGroupEntity; options: ResolvedOption[] }>();

  // Inisialisasi grup-grup
  MOCK_OPTION_GROUPS.forEach((g) => {
    groupMap.set(g.id, { group: g, options: [] });
  });

  relations.forEach((rel) => {
    const opt = MOCK_CUSTOM_OPTIONS.find((o) => o.id === rel.option_id);
    if (!opt) return;

    const group = MOCK_OPTION_GROUPS.find((g) => g.id === opt.group_id);
    if (!group) return;

    const effectivePrice = rel.harga_override !== null ? rel.harga_override : opt.harga;

    const resolved: ResolvedOption = {
      option: opt,
      group,
      effectivePrice,
      relationId: rel.id,
    };

    const container = groupMap.get(group.id);
    if (container) {
      container.options.push(resolved);
    }
  });

  // Kembalikan hanya grup yang memiliki opsi tersedia untuk model ini
  return Array.from(groupMap.values()).filter((g) => g.options.length > 0);
}

/**
 * Menghitung estimasi total harga dari data tiruan (Validasi server-mock)
 */
export function calculateMockSashPrice(
  modelIdOrSlug: number | string,
  selectedOptionSlugsOrIds: (string | number)[],
  quantity: number = 1
) {
  const model = getMockSashModel(modelIdOrSlug);
  if (!model) {
    return {
      isValid: false,
      error: "Model selempang tidak valid",
      basePrice: 0,
      optionsTotal: 0,
      unitPrice: 0,
      totalPrice: 0,
      breakdown: [],
    };
  }

  const groupedOptions = getMockOptionsForModel(model.id);
  const allResolvedOptions: ResolvedOption[] = [];
  groupedOptions.forEach((g) => allResolvedOptions.push(...g.options));

  // Cocokkan opsi yang dipilih
  const matchedOptions: ResolvedOption[] = [];
  for (const sel of selectedOptionSlugsOrIds) {
    const found = allResolvedOptions.find(
      (ro) => ro.option.slug === sel || ro.option.id === sel || ro.option.id.toString() === sel.toString()
    );
    if (found && !matchedOptions.some((m) => m.option.id === found.option.id)) {
      matchedOptions.push(found);
    }
  }

  // Validasi batas per grup (misal renda max 1)
  for (const grp of groupedOptions) {
    if (grp.group.max_pilih !== null && grp.group.max_pilih > 0) {
      const countInGroup = matchedOptions.filter((mo) => mo.group.id === grp.group.id).length;
      if (countInGroup > grp.group.max_pilih) {
        return {
          isValid: false,
          error: `Grup ${grp.group.nama_grup} hanya memperbolehkan maksimal ${grp.group.max_pilih} pilihan.`,
          basePrice: model.harga_dasar,
          optionsTotal: 0,
          unitPrice: model.harga_dasar,
          totalPrice: model.harga_dasar * quantity,
          breakdown: [],
        };
      }
    }
  }

  const optionsTotal = matchedOptions.reduce((acc, curr) => acc + curr.effectivePrice, 0);
  const unitPrice = model.harga_dasar + optionsTotal;
  const totalPrice = unitPrice * Math.max(1, quantity);

  return {
    isValid: true,
    modelName: model.nama,
    basePrice: model.harga_dasar,
    optionsTotal,
    unitPrice,
    totalPrice,
    breakdown: matchedOptions.map((mo) => ({
      name: mo.option.nama,
      group: mo.group.nama_grup,
      price: mo.effectivePrice,
    })),
  };
}

/**
 * Menyelesaikan daftar opsi terpilih menjadi nama resmi, grup, dan harga efektif snapshot
 */
export function resolveSelectedOptions(
  modelSlug: string,
  optionSlugs: string[] = []
): Array<{
  slug: string;
  name: string;
  groupName: string;
  price: number;
}> {
  const calc = calculateMockSashPrice(modelSlug, optionSlugs);
  if (calc.isValid && calc.breakdown.length > 0) {
    return calc.breakdown.map((b, idx) => ({
      slug: optionSlugs[idx] || `opt_${idx}`,
      name: b.name,
      groupName: b.group,
      price: b.price,
    }));
  }

  // Fallback jika tidak matched di relasi
  return optionSlugs.map((slug) => {
    const raw = MOCK_CUSTOM_OPTIONS.find((o) => o.slug === slug);
    const grp = raw ? MOCK_OPTION_GROUPS.find((g) => g.id === raw.group_id) : null;
    return {
      slug,
      name: raw?.nama || slug.replace(/_/g, " "),
      groupName: grp?.nama_grup || "Opsi Tambahan",
      price: raw?.harga || 0,
    };
  });
}

/**
 * Logika pemilihan opsi cerdas yang menegakkan aturan batas grup (max_pilih):
 * - Jika max_pilih === 1 (mis. Renda): Mengklik opsi aktif akan membatalkannya;
 *   mengklik opsi lain dalam grup yang sama akan menggantikan opsi sebelumnya (eksklusif).
 * - Jika max_pilih === N (N > 1): Menjaga batas maksimal grup.
 * - Jika max_pilih === null: Bebas memilih/membatalkan tanpa batasan kuota.
 */
export function toggleOptionWithGroupLimits(
  currentSelectedSlugs: string[],
  optionToToggle: ResolvedOption,
  groupedOptions: GroupedResolvedOptions[]
): {
  newSelectedSlugs: string[];
  swappedFrom?: string;
  isLimitReached?: boolean;
} {
  const slug = optionToToggle.option.slug;
  const isAlreadySelected = currentSelectedSlugs.includes(slug);
  const grp = optionToToggle.group;
  const maxPilih = grp.max_pilih;

  // Jika opsi sudah terpilih, batalkan pilihan
  if (isAlreadySelected) {
    return {
      newSelectedSlugs: currentSelectedSlugs.filter((s) => s !== slug),
    };
  }

  // Jika tidak ada batas kuota
  if (maxPilih === null || maxPilih <= 0) {
    return {
      newSelectedSlugs: [...currentSelectedSlugs, slug],
    };
  }

  // Cari semua opsi yang satu grup dengan opsi ini
  const groupContainer = groupedOptions.find((g) => g.group.id === grp.id);
  const groupSlugs = groupContainer ? groupContainer.options.map((o) => o.option.slug) : [];
  const currentlySelectedInGroup = currentSelectedSlugs.filter((s) => groupSlugs.includes(s));

  if (maxPilih === 1) {
    // Gantikan opsi sebelumnya di grup ini secara eksklusif
    const withoutGroupOptions = currentSelectedSlugs.filter((s) => !groupSlugs.includes(s));
    return {
      newSelectedSlugs: [...withoutGroupOptions, slug],
      swappedFrom: currentlySelectedInGroup[0],
    };
  }

  // Jika kuota grup sudah penuh (maxPilih > 1)
  if (currentlySelectedInGroup.length >= maxPilih) {
    const [firstInGroup, ...remainingInGroup] = currentlySelectedInGroup;
    const withoutGroupOptions = currentSelectedSlugs.filter((s) => !groupSlugs.includes(s));
    return {
      newSelectedSlugs: [...withoutGroupOptions, ...remainingInGroup, slug],
      swappedFrom: firstInGroup,
      isLimitReached: true,
    };
  }

  return {
    newSelectedSlugs: [...currentSelectedSlugs, slug],
  };
}
