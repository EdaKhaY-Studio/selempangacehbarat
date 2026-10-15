export interface ProductColor {
  name: string;
  hex: string;
}

export interface DetailedProduct {
  id: string;
  slug: string;
  name: string;
  category: "selempang" | "sewa-outfit" | "apparel-pdh";
  categoryLabel: string;
  price: number;
  priceLabel: string;
  priceType: "Harga Pembuatan" | "Biaya Sewa";
  priceUnit: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  sku: string;
  images: string[];
  imageAlts?: string[];
  shortDescription: string;
  description: string;
  features: string[];
  materialOptions: string[];
  colors: ProductColor[];
  sizes?: string[];
  specifications: Record<string, string>;
  sashModel?: "biasa" | "syal" | "timbal_balik";
  defaultAddons?: string[];
}

export const ALL_PRODUCTS: DetailedProduct[] = [
  // ─── 1. SATU PRODUK UTAMA: CUSTOM SELEMPANG (FHD) ──────────────────────────
  {
    id: "selempang-custom-1",
    slug: "custom-selempang",
    name: "Custom Selempang",
    category: "selempang",
    categoryLabel: "Selempang Wisuda",
    price: 50000,
    priceLabel: "Mulai Rp 50.000",
    priceType: "Harga Pembuatan",
    priceUnit: "/ pcs",
    badge: "Custom Model & Desain",
    rating: 5.0,
    reviewCount: 485,
    inStock: true,
    sku: "SAB-SLMP-001",
    images: [
      "/Gambar/01-selempang-wisuda-hitam-silver-nama.jpeg",
      "/Gambar/02-selempang-hitam-bordir-emas-instansi.jpeg",
      "/Gambar/04-selempang-hitam-emas-rumbai.jpeg",
      "/Gambar/03-selempang-beige-bordir-pink.jpeg",
    ],
    imageAlts: [
      "Contoh desain selempang wisuda hitam bordir nama dan gelar aksen list silver",
      "Contoh desain selempang model leher hitam bordir emas instansi",
      "Contoh desain selempang hitam aksen rumbai emas mewah",
      "Contoh desain selempang warna beige bordir soft pink modern",
    ],
    shortDescription:
      "Layanan pembuatan selempang wisuda dengan pilihan model, bahan, warna, tulisan bordir, dan dekorasi sesuai kebutuhan pelanggan.",
    description:
      "Layanan pembuatan selempang custom untuk wisuda, yudisium, fakultas, sekolah, organisasi, dan acara khusus bersama Selempang Aceh Barat (FHD). Pelanggan dapat memilih model (Biasa menyamping, Leher/syal, dan Leher timbal balik), bahan (bludru tebal 2 lapis atau satin kilap mewah), warna kain, dekorasi (renda, les pita, rumbai, motif), serta memasukkan tulisan nama dan gelar akademik presisi dengan garansi anti-typo 100%.",
    features: [
      "Pilihan 3 model potongan: Biasa Menyamping (Rp50k), Leher / Syal (Rp85k), dan Leher Timbal Balik (Rp135k)",
      "Bordir komputer presisi tinggi nama lengkap & gelar akademik anti-typo",
      "Pilihan bahan bludru beludru tebal 2 lapis dan satin kilap mewah",
      "Pilihan variasi dekorasi: Renda (biasa, mahkota, marsyanda), les pinggir, rumbai, dan motif",
      "Layanan kilat 1 hari siap pakai di Meulaboh, Aceh Barat",
      "Garansi anti-typo 100% ganti baru tanpa perdebatan",
    ],
    materialOptions: [
      "Kain Bludru Beludru Tebal (Double Layer)",
      "Kain Satin Kilap Mewah",
      "Benang Bordir Metalik Emas & Perak",
    ],
    colors: [
      { name: "Hitam", hex: "#0f172a" },
      { name: "Maron", hex: "#7f1d1d" },
      { name: "Merah", hex: "#dc2626" },
      { name: "Navy", hex: "#1e3a8a" },
      { name: "Hijau", hex: "#15803d" },
      { name: "Ungu", hex: "#6b21a8" },
      { name: "Beige / Cream", hex: "#d6c7a1" },
      { name: "Pink", hex: "#ec4899" },
    ],
    specifications: {
      "Pilihan Model": "Model A (Biasa Rp50k) | Model B (Syal Rp85k) | Model C (Timbal Balik Rp135k)",
      "Bahan Kain": "Bludru Beludru Tebal 2 Lapis / Satin Kilap",
      "Harga Awal": "Mulai Rp 50.000 (sesuai model & tambahan dekorasi)",
      "Teknik Bordir": "Bordir Komputer Multi-Needle Presisi",
      "Garansi Kualitas": "100% Anti-Typo Ganti Baru Gratis",
      "Lokasi Produksi": "Workshop Alpen, Meulaboh, Aceh Barat",
    },
    sashModel: "biasa",
  },

  // ─── 2. SEWA OUTFIT: JAS WISUDA PRIA ────────────────────────────────────────
  {
    id: "paket-lengkap-1",
    slug: "sewa-jas-pria-dasi-formal",
    name: "Sewa Jas Wisuda & Sidang Skripsi Pria + Dasi Formal",
    category: "sewa-outfit",
    categoryLabel: "Sewa Outfit",
    price: 50000,
    priceLabel: "Rp 50.000 / Sewa",
    priceType: "Biaya Sewa",
    priceUnit: "/ Sewa",
    badge: "Favorit Wisuda",
    rating: 5.0,
    reviewCount: 312,
    inStock: true,
    sku: "SAB-JAS-PRIA-001",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAr-e_rGospVQPboskLeppHkkNvw5cKBoMLWiQszAbmnwrL97XVB2IdbN0DrYgXfXz481mZdol_oz8khfUPE402EnxDq9kdwu14H62QLVw2hE_mlI_LNlhgu5pWisITMYtDSjZlyhNNH6VkNmK-Ou1wNkk8ZMyeijmYTIpx5UrybfLltwi-Zo4SN4Oc2VSWcAEDWrkY4P-Jed-KLg-WL34fvMAH7dCL2CEJvC0S-GGAzQqLboF5dNf4",
      "/Gambar/male-graduate-suit-full.jpg",
    ],
    imageAlts: [
      "Sewa jas wisuda pria formal slimfit dan dasi di Meulaboh",
      "Foto wisudawan pria mengenakan jas formal Selempang Aceh Barat",
    ],
    shortDescription:
      "Rental setelan jas pria wisuda & dasi formal di Meulaboh. Bahan wool blend anti-kusut, ukuran lengkap S-XXL, kondisi bersih wangi siap pakai foto studio.",
    description:
      "Setelan jas formal pria potongan modern slimfit Eropa yang dirancang untuk memberikan postur berwibawa dan tegap di panggung seremonial wisuda serta sesi foto studio. Sudah termasuk dasi formal senada. Setiap jas telah melalui proses sterilisasi setrika uap dan dry clean higienis sebelum diserahkan ke tangan Anda.",
    features: [
      "Bahan wool blend premium anti kusut dan tidak panas",
      "Sudah termasuk 1 pcs dasi formal sutra sintetis pilihan",
      "Ukuran lengkap S, M, L, XL, hingga XXL",
      "Fasilitas fitting gratis langsung di workshop Jln Alpen Meureubo",
      "Wangi, steril, dan disetrika uap (Ready to Wear)",
      "Bebas denda ganti ukuran bila belum pas di badan",
    ],
    materialOptions: [
      "Wool Blend Anti Kusut",
      "Full Furing Dalam Lembut & Menyerap Keringat",
      "Busa Pundak Tegap Standar Jas Eksekutif",
    ],
    colors: [
      { name: "Hitam", hex: "#0f172a" },
      { name: "Cream", hex: "#d6c7a1" },
      { name: "Abu-Abu", hex: "#64748b" },
      { name: "Coklat", hex: "#5c3d2e" },
      { name: "Maron", hex: "#7f1d1d" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    specifications: {
      "Model Potongan": "Modern Slimfit & Semi-Formal",
      "Kelengkapan": "Jas Pria + Dasi Formal",
      "Pilihan Ukuran": "S, M, L, XL, XXL",
      "Durasi Sewa": "3 Hari (Bisa diperpanjang)",
      "Proses Kebersihan": "Dry Clean & Steam Press Higienis",
      "Syarat Rental": "Jaminan KTP / KTM Mahasiswa",
    },
  },

  // ─── 3. SEWA OUTFIT: JAS WANITA & SETELAN FORMAL ────────────────────────────
  {
    id: "bundling-sultan-1",
    slug: "sewa-jas-wanita-busana-formal",
    name: "Sewa Jas Wanita Wisuda & Setelan Busana Formal Sidang",
    category: "sewa-outfit",
    categoryLabel: "Sewa Outfit",
    price: 35000,
    priceLabel: "Rp 35.000 - Rp 40.000",
    priceType: "Biaya Sewa",
    priceUnit: "/ Sewa",
    badge: "Pria & Wanita",
    rating: 4.9,
    reviewCount: 240,
    inStock: true,
    sku: "SAB-JAS-WNT-002",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBg6U_Dk2uibp68llXo4dyaKecUCUk5vieQQwU78-DOBgKrbgxU8aIB61r8cpn3qC8zpcPMB4mfYjyNDEzUO2qYb_nyk6YcyPRlN6WK14LP3d1mRU5vZnor4WHA8Dy5vkH_O4cAXslyXDqwOlXFoUSAWdHrS_tc8b_qt_HIRwalPAju85QLk4OQ6Up8yeV1LJdrZDCokqru7hnfmqqjyQdI5h2GSSBNvikGDFprDGMa9EPQMzae_5JK",
    ],
    imageAlts: [
      "Sewa blazer jas wanita wisuda dan sidang di Meulaboh Aceh Barat",
    ],
    shortDescription:
      "Sewa jas wanita formal, kemeja putih, celana bahan, dan rok di Meulaboh. Nyaman untuk sidang & wisuda, bersih steril siap pakai tanpa perlu dicuci ulang.",
    description:
      "Pilihan setelan jas blazer wanita berpotongan ramping dan elegan, sangat ideal untuk acara yudisium, sidang skripsi, hingga seremonial wisuda resmi. Tersedia juga opsi sewa pendukung seperti kemeja putih katun formal (Rp 25.000), celana bahan (Rp 25.000), dan rok formal (Rp 30.000) dengan kondisi higienis dan wangi parfum fresh laundry.",
    features: [
      "Jas Blazer wanita potong slimfit feminin & anggun",
      "Bahan kain poliester rayon blend sejuk dan nyaman dipakai",
      "Tersedia setelan lengkap: Kemeja Putih, Celana, dan Rok",
      "Pilihan warna formal variatif (Hitam, Cream, Abu, Coklat, Maron)",
      "Ready stock ukuran S sampai XXL",
      "Bisa dicoba langsung di fitting room toko Meureubo",
    ],
    materialOptions: [
      "Jas Wanita (Rp 35.000 - Rp 40.000)",
      "Kemeja Putih Katun (Rp 25.000)",
      "Celana Bahan Formal (Rp 25.000)",
      "Rok Bahan Formal (Rp 30.000)",
    ],
    colors: [
      { name: "Hitam", hex: "#0f172a" },
      { name: "Cream", hex: "#d6c7a1" },
      { name: "Abu-Abu", hex: "#64748b" },
      { name: "Coklat", hex: "#5c3d2e" },
      { name: "Maron", hex: "#7f1d1d" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    specifications: {
      "Model": "Blazer Formal Wanita Single/Double Button",
      "Pilihan Warna": "Hitam, Cream, Abu, Coklat, Maron",
      "Ukuran Tersedia": "S, M, L, XL, XXL",
      "Add-on Sewa": "Kemeja (25k), Celana (25k), Rok (30k), Dasi (15k)",
      "Kondisi": "100% Bersih Steril Wangi Laundry",
      "Lokasi Fitting": "Jln Alpen Meureubo, Aceh Barat",
    },
  },

  // ─── 4. SEWA OUTFIT: SEPATU PANTOFEL ────────────────────────────────────────
  {
    id: "sepatu-pantofel-1",
    slug: "sewa-sepatu-pantofel",
    name: "Sewa & Jual Sepatu Pantofel Pria & Wanita Wisuda",
    category: "sewa-outfit",
    categoryLabel: "Sewa Outfit",
    price: 30000,
    priceLabel: "Rp 30.000 - Rp 35.000",
    priceType: "Biaya Sewa",
    priceUnit: "/ Sewa",
    badge: "Sewa & Jual",
    rating: 4.9,
    reviewCount: 180,
    inStock: true,
    sku: "SAB-SPTU-003",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDyPYkVj9Hlt7dMpjNZkYtmyjmxcN3Zo_gOfJcvOC-dkEugOpLMdXKVPP7f09Gw14LWrg37G61DN_hbI_f-SBl8Dz6CQH7dLnWalW9w6QNM7ekE2SASgw5VfTP0jJs7rEUdmVZBNZv-gKnzqWiUtxkYIVuwJ0j6-2n38XzBxJ7MDLOxfiCDCl44DtQ2j_V_DQ5iOJaQ_jV1JrpJWvIslAjAuTu9sIw1eNIL6asVqa9UkmBYlXZRfjb2",
    ],
    imageAlts: [
      "Sewa dan jual sepatu pantofel formal pria wanita wisuda di Meulaboh",
    ],
    shortDescription:
      "Rental & penjualan sepatu pantofel formal pria (35k) dan wanita (30k) di Aceh Barat. Kulit formal kilap, insole empuk nyaman di panggung wisuda.",
    description:
      "Sepatu pantofel kulit formal dengan bantalan insole empuk yang dirancang khusus agar kaki tidak mudah lecet atau pegal selama berjam-jam prosesi wisuda. Tersedia model Oxford & Derby untuk pria, serta model loafer dan heels formal untuk wanita. Disemir bersih dan kilap sebelum serah terima.",
    features: [
      "Kulit sintetis kilap pekat (glossy finish) standar acara resmi",
      "Insole busa memory-foam empuk dan anti lecet di tumit",
      "Ukuran lengkap dari size 35 hingga size 44",
      "Tarif sewa ramah mahasiswa: Pria Rp 35.000 & Wanita Rp 30.000",
      "Tersedia juga opsi pembelian sepatu pantofel baru",
      "Disemir kilap dan steril higienis",
    ],
    materialOptions: [
      "Sepatu Pria Kilap (Rp 35.000 / Sewa)",
      "Sepatu Wanita Hak 3-5cm (Rp 30.000 / Sewa)",
      "Penjualan Sepatu Baru (Konsultasi CS)",
    ],
    colors: [
      { name: "Hitam Kilap", hex: "#0f172a" },
      { name: "Coklat Tua", hex: "#3e2723" },
    ],
    sizes: ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44"],
    specifications: {
      "Tipe Sepatu": "Pantofel Formal Pria & Wanita",
      "Bahan Upper": "Kulit Sintetis High-Grade Kilap",
      "Insole": "Busa Empuk Anti Pegal & Anti Lecet",
      "Rentang Ukuran": "Size 35 sampai 44",
      "Perawatan": "Disemir Mengkilap Sebelum Diserahkan",
      "Status": "Sedia Sewa & Jual Baru",
    },
  },

  // ─── 5. KONVEKSI & APPAREL: BAJU PDH & ALMAMATER ───────────────────────────
  {
    id: "jas-satuan-1",
    slug: "baju-pdh-kaos-almamater",
    name: "Konveksi Baju PDH, Kaos & Jas Almamater Kampus Aceh Barat",
    category: "apparel-pdh",
    categoryLabel: "Apparel / PDH",
    price: 85000,
    priceLabel: "Partai & Satuan",
    priceType: "Harga Pembuatan",
    priceUnit: "/ pcs",
    badge: "Produksi Konveksi",
    rating: 5.0,
    reviewCount: 95,
    inStock: true,
    sku: "SAB-KNVK-004",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBQ2rnP9Qui1nPXu3S5X6n1ewNiFQYmeHwr9yK46CEziVy3OpEnWyPoQBwOFi8pyXJNeyrfQJygx63YSFYdX3inFoVBlvLOrJ9DEHf44JdXhz9SJA_IuZK0MVo30NrtjZ9rReVeC_38kGEtwcrVJ5AryOU-vggX1mcNVBphwqTAhJT0QB_2QfLlTFZkZ5VXdhpuITOvZ6MhLs1lkOTYYQ4n1E6gJOa1RyYtxokvs4e1n-be4NjkreYx",
    ],
    imageAlts: [
      "Jasa konveksi seragam baju PDH dan jas almamater di Meulaboh Aceh Barat",
    ],
    shortDescription:
      "Konveksi seragam baju PDH, kaos angkatan, dan almamater kampus resmi di Meulaboh. Bahan American/Japan drill berkualitas, bordir komputer tajam rapi.",
    description:
      "Layanan konveksi pakaian dinas harian (PDH), seragam organisasi kemahasiswaan, kaos sablon/bordir acara angkatan, dan jas almamater resmi perguruan tinggi. Menggunakan kain American Drill dan Japan Drill berkualitas tinggi yang kokoh, adem, dan awet. Dilengkapi nota dinas, kuitansi resmi, dan stempel toko untuk mempermudah pelaporan LPJ/SPJ kampus.",
    features: [
      "Bahan pilihan: American Drill, Japan Drill, Cotton Combed",
      "Bordir komputer logo instansi tajam dan tidak mudah terurai",
      "Melayani pemesanan satuan maupun rombongan partai besar",
      "Fasilitas dokumen lengkap (Nota Dinas, Kuitansi, Stempel Toko) untuk LPJ",
      "Konsultasi desain mockup gratis sebelum naik proses produksi",
      "Pengerjaan tepat waktu sesuai jadwal deadline kegiatan",
    ],
    materialOptions: [
      "Baju PDH Lengan Panjang / Pendek",
      "Baju Kaos Katun Combed 24s / 30s",
      "Jas Almamater Kampus Bordir Komputer",
    ],
    colors: [
      { name: "Navy", hex: "#1e3a8a" },
      { name: "Hitam", hex: "#0f172a" },
      { name: "Maroon", hex: "#7f1d1d" },
      { name: "Hijau Army", hex: "#3f4f34" },
      { name: "Abu-abu", hex: "#64748b" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    specifications: {
      "Kategori Produk": "Pakaian Dinas Harian & Seragam Kampus",
      "Bahan Kain": "American Drill, Japan Drill, Cotton Combed",
      "Aplikasi Desain": "Bordir Komputer & Sablon Plastisol/DTF",
      "Minimal Order": "Mulai dari 1 pcs (Bisa Partai Besar)",
      "Kelengkapan LPJ": "Kuitansi Resmi, Nota Toko & Stempel Sah",
      "Wilayah Distribusi": "Meulaboh, Aceh Barat & Seluruh Aceh",
    },
  },

  // ─── 6. ATRIBUT & MEDALI: MEDALI WISUDA & ID CARD PVC ──────────────────────
  {
    id: "fhd-mdl-05",
    slug: "id-card-medali-wisuda",
    name: "Medali Wisuda Custom & ID Card PVC",
    category: "apparel-pdh",
    categoryLabel: "Atribut & Medali",
    price: 0,
    priceLabel: "Hubungi Admin / Custom",
    priceType: "Harga Pembuatan",
    priceUnit: "/ pcs",
    badge: "Atribut Wisuda",
    rating: 4.9,
    reviewCount: 160,
    inStock: true,
    sku: "SAB-ATRB-005",
    images: [
      "/Gambar/05-medali-wisuda-custom-hijau.jpeg",
      "/Gambar/06-medali-custom-hitam-emas.jpeg",
    ],
    imageAlts: [
      "Contoh medali wisuda hijau pita kuning hijau",
      "Contoh medali custom hitam emas penghargaan",
    ],
    shortDescription:
      "Jasa pembuatan medali wisuda plat kuningan/akrilik pita warna kampus dan cetak ID Card PVC tebal di Aceh Barat. Harga belum ditentukan (Hubungi Admin / Custom).",
    description:
      "Produksi medali wisuda berbahan plat logam, akrilik, atau cor resin kilap berkualitas dengan pita satin ganda sesuai warna fakultas atau kampus. Kami juga melayani cetak ID card kepanitiaan berbahan PVC tebal standar kartu perbankan yang tahan air dan anti patah. Harga resmi disesuaikan dengan kuantiti dan spesifikasi pesanan.",
    features: [
      "Medali wisuda logam / akrilik / resin kilap dengan logo kampus presisi",
      "Pita satin ganda jahitan kuat dan rapi sesuai warna bendera kampus",
      "Cetak ID card PVC tebal anti-patah dan anti-luntur",
      "Melayani pemesanan partai kecil maupun rombongan besar",
      "Fasilitas kuitansi resmi dan stempel toko untuk administrasi LPJ",
    ],
    materialOptions: [
      "Medali Logam / Akrilik / Cor Resin",
      "Pita Satin Ganda Custom Warna Kampus",
      "ID Card PVC Standar 0.76mm",
    ],
    colors: [
      { name: "Hijau-Kuning", hex: "#15803d" },
      { name: "Hitam-Emas", hex: "#0f172a" },
      { name: "Gold", hex: "#b48c28" },
      { name: "Silver", hex: "#94a3b8" },
    ],
    specifications: {
      "Jenis Produk": "Medali Wisuda & ID Card PVC Kepanitiaan",
      "Pita Kalung": "Pita Satin Ganda Warna Kampus",
      "Kustomisasi": "Logo Lembaga / Fakultas & Tulisan Acara",
      "Status Harga": "Hubungi Admin / Custom (Disesuaikan kuantiti & bahan)",
      "Lokasi Produksi": "Meulaboh, Aceh Barat",
    },
  },
];

export function getAllProducts(): DetailedProduct[] {
  return ALL_PRODUCTS;
}

export function getAllProductSlugs(): string[] {
  return ALL_PRODUCTS.map((p) => p.slug);
}

export function getProductBySlug(slug: string): DetailedProduct | undefined {
  if (
    slug === "custom-selempang" ||
    slug === "selempang-custom-1" ||
    slug === "selempang-wisuda-bludru-satin" ||
    slug === "selempang-wisuda-hitam-silver-custom" ||
    slug === "selempang-hitam-bordir-emas-custom" ||
    slug === "selempang-custom-beige-bordir-pink" ||
    slug === "selempang-custom-rumbai-emas" ||
    slug === "fhd-slmp-01" ||
    slug === "fhd-slmp-02" ||
    slug === "fhd-slmp-03" ||
    slug === "fhd-slmp-04"
  ) {
    return ALL_PRODUCTS.find((p) => p.slug === "custom-selempang" || p.id === "selempang-custom-1");
  }

  if (
    slug === "id-card-medali-wisuda" ||
    slug === "medali-wisuda-custom-hijau" ||
    slug === "medali-custom-hitam-emas" ||
    slug === "fhd-mdl-05" ||
    slug === "fhd-mdl-06" ||
    slug === "selempang-2lapis-1"
  ) {
    return ALL_PRODUCTS.find((p) => p.slug === "id-card-medali-wisuda" || p.id === "fhd-mdl-05");
  }

  return ALL_PRODUCTS.find((p) => p.slug === slug || p.id === slug);
}

export function getProductsByCategory(category: string): DetailedProduct[] {
  if (category === "all") return ALL_PRODUCTS;
  return ALL_PRODUCTS.filter((p) => p.category === category);
}
