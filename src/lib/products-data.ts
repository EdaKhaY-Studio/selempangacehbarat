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
  shortDescription: string;
  description: string;
  features: string[];
  materialOptions: string[];
  colors: ProductColor[];
  sizes?: string[];
  specifications: Record<string, string>;
}

export const ALL_PRODUCTS: DetailedProduct[] = [
  {
    id: "selempang-custom-1",
    slug: "selempang-wisuda-bludru-satin",
    name: "Selempang Wisuda Custom & Bordir Nama Gelar (Bludru & Satin)",
    category: "selempang",
    categoryLabel: "Selempang",
    price: 50000,
    priceLabel: "Rp 50.000 - Rp 135.000",
    priceType: "Harga Pembuatan",
    priceUnit: "/ pcs",
    badge: "Custom Hak Milik",
    rating: 5.0,
    reviewCount: 485,
    inStock: true,
    sku: "SAB-SLMP-001",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACGb4x2T6Ey5MqMf2FS15rYdtYlVPM8sNxUDMnOd8Dkmxa1jBs_eT9IXzl8LfSgXjDDgve0S5qx5Bo28kSB5YtdCeVGKnTbBqABt7KtrvyDb5dvXHZ0coHthBjU5CpW1KwCuV0PBNo-9LBzXhQeZgBS9pKYjbosSCshPwBoHR2PV7wZ5AW_n6I_cf02YXECTjF7BPV1EdTp_z-ekTKmvvP9WH-Sm6KejQYPeGhlfRtjw5ShwR9hugT",
      "https://image.pollinations.ai/prompt/custom%20wine%20red%20maroon%20velvet%20graduation%20sash%20selempang%20wisuda%20with%20metallic%20gold%20embroidery%20lettering%20and%20gold%20lace%20fringe%20border%20luxury%20craftsmanship%20macro%20shot?width=800&height=800&nologo=true",
    ],
    shortDescription:
      "Pesan selempang wisuda bordir komputer benang emas & perak di Meulaboh. Bahan bludru & satin mewah, pengerjaan kilat 1 hari anti-typo garansi 100%.",
    description:
      "Selempang wisuda bordir komputer kualitas atelier dengan ketelitian huruf dan kerapian simetris tinggi. Dikerjakan menggunakan mesin bordir komputer modern berkecepatan tinggi dengan benang metalik gold dan silver tahan pudar. Tersedia bahan bludru beludru tebal 2 lapis dan bahan satin kilap premium dengan garansi ganti baru 100% apabila terjadi kesalahan cetak nama atau gelar.",
    features: [
      "Bordir komputer presisi tinggi dengan benang metalik emas & perak",
      "Kain beludru dobel lapis (double layer) kaku elegan tanpa kusut",
      "Pilihan list renda rumbai emas, perak, atau lis pita satin",
      "Bebas custom nama lengkap, gelar akademik, dan logo kampus sah",
      "Layanan Kilat 1 Hari selesai untuk kebutuhan sidang & wisuda mendesak",
      "Garansi Anti-Typo 100% ganti baru gratis tanpa debat",
    ],
    materialOptions: [
      "Kain Bludru Beludru Tebal (7 Pilihan Warna)",
      "Kain Satin Kilap Mewah (12 Pilihan Warna)",
      "Renda Rumbai Emas / Perak Metalik",
    ],
    colors: [
      { name: "Hitam", hex: "#0f172a" },
      { name: "Maron", hex: "#7f1d1d" },
      { name: "Merah", hex: "#dc2626" },
      { name: "Navy", hex: "#1e3a8a" },
      { name: "Hijau", hex: "#15803d" },
      { name: "Ungu", hex: "#6b21a8" },
      { name: "Pink", hex: "#ec4899" },
    ],
    specifications: {
      "Panjang Selempang": "175 cm - 180 cm (proporsional tubuh)",
      "Lebar Selempang": "12 cm (standar toga wisuda nasional)",
      "Teknik Bordir": "Bordir Komputer Multi-Needle Presisi",
      "Pilihan Bahan": "Bludru Premium & Satin Silk",
      "Pengerjaan Kilat": "Siap dalam 24 Jam (S&K berlaku)",
      "Lokasi Produksi": "Workshop Meulaboh, Aceh Barat",
    },
  },
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
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBQ2rnP9Qui1nPXu3S5X6n1ewNiFQYmeHwr9yK46CEziVy3OpEnWyPoQBwOFi8pyXJNeyrfQJygx63YSFYdX3inFoVBlvLOrJ9DEHf44JdXhz9SJA_IuZK0MVo30NrtjZ9rReVeC_38kGEtwcrVJ5AryOU-vggX1mcNVBphwqTAhJT0QB_2QfLlTFZkZ5VXdhpuITOvZ6MhLs1lkOTYYQ4n1E6gJOa1RyYtxokvs4e1n-be4NjkreYx",
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
    shortDescription:
      "Konveksi seragam baju PDH, kaos angkatan, dan almamater kampus resmi di Meulaboh. Bahan American/Japan drill berkualitas, bordir komputer tajam rapi.",
    description:
      "Layanan konveksi pakaian dinas harian (PDH), seragam organisasi kemahasiswaan, kaos sablon/bordir acara angkatan, dan jas almamater resmi perguruan tinggi. Menggunakan kain American Drill dan Japan Drill berkualitas tinggi yang kokoh, adem, dan awet. Dilengkapi nota dinas, kuitansi resmi, dan stempel toko untuk mempermudah pelaporan LPJ/SPJ kampus.",
    features: [
      "Bahan pilihan: American Drill, Japan Drill, Taipan Drill, Katun Combed",
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
  {
    id: "selempang-2lapis-1",
    slug: "id-card-medali-wisuda",
    name: "Pembuatan ID Card PVC & Medali Wisuda Event",
    category: "apparel-pdh",
    categoryLabel: "Apparel / PDH",
    price: 15000,
    priceLabel: "Mulai Rp 15.000",
    priceType: "Harga Pembuatan",
    priceUnit: "/ pcs",
    badge: "Atribut Wisuda",
    rating: 4.9,
    reviewCount: 160,
    inStock: true,
    sku: "SAB-ATRB-005",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCOVNwBxqTyk3uRGT88S_AYGCZZbQ_TnLexHaXWvwm_sewcrhunr8Yb9kGLl6O6T9Ijywswyyb8wnkS86SF6QiswwNhf4z3zaJX0LS3WrQY6M0ObRoTPwoCVxorUohQUpbSl6J3rFguSwxHiOX5JeIGtW7R2qnWa2fYZeLqy4AwptyG1MAib8uK5QgYq7RbDgqEI25qFYaXX4_flT6FZyw-MI0W560i8pnWdD1Oqa7pAg2zhoKHqyQf",
    ],
    shortDescription:
      "Jasa cetak ID card PVC tebal anti-patah & medali wisuda resin kilap di Aceh Barat. Dilengkapi tali lanyard custom warna kampus, siap untuk wisuda & event.",
    description:
      "Produksi ID card berbahan PVC tebal standar kartu perbankan yang anti patah, tahan air, dan anti pudar, lengkap dengan tali lanyard warna kampus atau logo organisasi. Kami juga mencetak medali wisuda berbahan plat kuningan, akrilik, atau cor resin tebal dengan pita satin ganda sesuai warna fakultas.",
    features: [
      "Bahan PVC tebal tahan air, anti gores, dan tidak mudah patah",
      "Medali wisuda logam / akrilik / resin kilau mewah jernih",
      "Pita tali satin ganda jahitan rapi sesuai warna bendera kampus",
      "Harga grosir ekonomis untuk wisuda angkatan dan event panitia",
      "Jaminan siap sebelum tanggal gladi bersih wisuda",
      "Mendukung faktur dan nota untuk klaim anggaran kampus/BEM",
    ],
    materialOptions: [
      "ID Card PVC Standar Tebal 0.76mm",
      "Medali Wisuda Resin / Logam Kuningan",
      "Tali Lanyard Printing Sablon / Polos",
    ],
    colors: [
      { name: "Gold", hex: "#b48c28" },
      { name: "Silver", hex: "#94a3b8" },
      { name: "Tali Kampus", hex: "#0f172a" },
    ],
    specifications: {
      "Jenis Atribut": "ID Card Kepanitiaan & Medali Wisuda",
      "Material ID Card": "PVC Polyvinyl Chloride Anti-Patah",
      "Material Medali": "Resin Kilap / Akrilik / Plat Kuningan",
      "Tali / Pita": "Pita Satin Ganda 80 cm x 3 cm",
      "Minimal Order": "Mulai 1 pcs hingga Ribuan pcs",
      "Legalitas Nota": "Tersedia Kuitansi Resmi & Stempel",
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
  return ALL_PRODUCTS.find((p) => p.slug === slug || p.id === slug);
}

export function getProductsByCategory(category: string): DetailedProduct[] {
  if (category === "all") return ALL_PRODUCTS;
  return ALL_PRODUCTS.filter((p) => p.category === category);
}
