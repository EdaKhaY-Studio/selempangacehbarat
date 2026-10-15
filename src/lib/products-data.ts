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
  // ─── 1. 6 PRODUK ASLI KATALOG FHD ──────────────────────────────────────────
  {
    id: "fhd-slmp-01",
    slug: "selempang-wisuda-hitam-silver-custom",
    name: "Selempang Wisuda Hitam Silver Custom",
    category: "selempang",
    categoryLabel: "Selempang Wisuda",
    price: 50000,
    priceLabel: "Dasar Rp 50.000",
    priceType: "Harga Pembuatan",
    priceUnit: "/ pcs",
    badge: "Model Biasa (Menyamping)",
    rating: 5.0,
    reviewCount: 485,
    inStock: true,
    sku: "FHD-SLMP-001",
    images: ["/Gambar/01-selempang-wisuda-hitam-silver-nama.jpeg"],
    imageAlts: ["Selempang wisuda hitam dengan bordir nama dan pinggiran silver."],
    shortDescription:
      "Selempang hitam dengan tulisan nama dan gelar serta aksen pinggiran silver. Harga dasar resmi Rp50.000 sebelum tambahan dekorasi.",
    description:
      "Selempang hitam dengan tulisan nama dan gelar serta aksen pinggiran silver. Cocok untuk referensi desain wisuda dan yudisium. Menggunakan kain bludru dobel lapis yang kaku, rapi, dan elegan. Bordir komputer presisi dengan benang perak metalik tahan pudar. Harga dasar resmi adalah Rp50.000 sebelum tambahan dekorasi (seperti les pinggir silver +Rp5.000 yang dikonfirmasi pada formulir pemesanan).",
    features: [
      "Bordir komputer presisi nama lengkap & gelar akademik",
      "Aksen pinggiran / list pita silver metalik rapi",
      "Bahan kain bludru tebal 2 lapis (double layer)",
      "Garansi anti-typo 100% ganti baru tanpa debat",
      "Pengerjaan kilat siap pakai di Meulaboh, Aceh Barat",
    ],
    materialOptions: [
      "Kain Bludru Beludru Tebal (Double Layer)",
      "Kain Satin Kilap Mewah",
      "Aksen Pinggiran Silver Metalik",
    ],
    colors: [
      { name: "Hitam", hex: "#0f172a" },
      { name: "Maron", hex: "#7f1d1d" },
      { name: "Navy", hex: "#1e3a8a" },
    ],
    specifications: {
      "Model Potongan": "Biasa Menyamping (Model Standar Wisuda)",
      "Bahan Kain": "Bludru Tebal 2 Lapis / Satin Silk",
      "Harga Dasar Resmi": "Rp 50.000 (sebelum tambahan dekorasi)",
      "Aksen Pinggiran": "Pilihan Les Pinggir Silver (+Rp5.000 dikonfirmasi saat pesan)",
      "Teknik Bordir": "Bordir Komputer Multi-Needle Presisi",
      "Lokasi Produksi": "Workshop Alpen, Meulaboh, Aceh Barat",
    },
    sashModel: "biasa",
    defaultAddons: ["les-pinggir"],
  },
  {
    id: "fhd-slmp-02",
    slug: "selempang-hitam-bordir-emas-custom",
    name: "Selempang Hitam Bordir Emas Custom",
    category: "selempang",
    categoryLabel: "Selempang Wisuda",
    price: 85000,
    priceLabel: "Dasar Rp 85.000",
    priceType: "Harga Pembuatan",
    priceUnit: "/ pcs",
    badge: "Model Syal / Leher",
    rating: 5.0,
    reviewCount: 390,
    inStock: true,
    sku: "FHD-SLMP-002",
    images: ["/Gambar/02-selempang-hitam-bordir-emas-instansi.jpeg"],
    imageAlts: ["Selempang hitam dengan bordir emas dan identitas instansi."],
    shortDescription:
      "Selempang model leher berwarna hitam dengan bordir emas dan detail identitas instansi. Harga dasar resmi Rp85.000 sebelum tambahan dekorasi.",
    description:
      "Selempang model leher berwarna hitam dengan bordir emas dan detail identitas instansi. Tulisan serta desain mengikuti spesifikasi pesanan. Didesain secara ergonomis mengalung di leher kiri dan kanan dengan keseimbangan visual yang anggun dan berwibawa. Harga dasar resmi adalah Rp85.000 sebelum tambahan dekorasi.",
    features: [
      "Model leher / syal elegan mengalung di pundak",
      "Bordir komputer benang emas metalik berkilau tajam",
      "Bordir logo lembaga atau lambang universitas resmi",
      "Kain bludru berkualitas tinggi double layer tegak sempurna",
      "Pilihan custom teks sisi kanan dan kiri sesuai pesanan",
    ],
    materialOptions: [
      "Kain Bludru Hitam Premium Double Layer",
      "Kain Satin Kilap Mewah",
      "Bordir Benang Emas Metalik (Gold)",
    ],
    colors: [
      { name: "Hitam", hex: "#0f172a" },
      { name: "Maron", hex: "#7f1d1d" },
      { name: "Navy", hex: "#1e3a8a" },
    ],
    specifications: {
      "Model Potongan": "Model Leher / Syal (Gantung Dua Sisi)",
      "Bahan Kain": "Bludru Tebal Dua Lapis",
      "Warna Benang": "Benang Metalik Emas (Gold)",
      "Harga Dasar Resmi": "Dasar Rp 85.000 (sebelum tambahan dekorasi)",
      "Bordir Logo": "Identitas Kampus / Lembaga / Instansi",
      "Lokasi Workshop": "Meulaboh, Aceh Barat",
    },
    sashModel: "syal",
    defaultAddons: [],
  },
  {
    id: "fhd-slmp-03",
    slug: "selempang-custom-beige-bordir-pink",
    name: "Selempang Custom Beige Bordir Pink",
    category: "selempang",
    categoryLabel: "Selempang Wisuda",
    price: 50000,
    priceLabel: "Dasar Rp 50.000",
    priceType: "Harga Pembuatan",
    priceUnit: "/ pcs",
    badge: "Custom Warna Pastel",
    rating: 4.9,
    reviewCount: 210,
    inStock: true,
    sku: "FHD-SLMP-003",
    images: ["/Gambar/03-selempang-beige-bordir-pink.jpeg"],
    imageAlts: ["Selempang beige dengan tulisan bordir pink."],
    shortDescription:
      "Selempang beige dengan tulisan dan identitas kampus menggunakan bordir pink. Harga dasar resmi Rp50.000 sebelum tambahan.",
    description:
      "Selempang beige dengan tulisan dan identitas kampus menggunakan bordir pink. Warna kain dan benang menjadi referensi untuk desain custom. Menghadirkan nuansa estetik, lembut, dan modern bagi wisudawati atau wisudawan yang menginginkan kombinasi warna kekinian di hari kelulusan. Harga dasar resmi Rp50.000 sebelum tambahan.",
    features: [
      "Kombinasi warna kain beige/cream dengan benang bordir soft pink",
      "Bordir nama lengkap, gelar akademik, dan logo fakultas/kampus",
      "Bahan kain halus, rapi, dan tidak mudah berkerut",
      "Finishing pinggiran halus dan proporsional di badan",
      "Bisa request custom font dan variasi kombinasi warna lain",
    ],
    materialOptions: [
      "Kain Beige / Cream Lembut",
      "Pilihan Benang Soft Pink",
      "Pilihan Bahan Bludru atau Satin",
    ],
    colors: [
      { name: "Beige / Cream", hex: "#d6c7a1" },
      { name: "Pink", hex: "#ec4899" },
    ],
    specifications: {
      "Model Potongan": "Biasa Menyamping",
      "Warna Kain": "Beige / Cream Pastel",
      "Warna Bordir": "Benang Pink Lembut",
      "Harga Dasar Resmi": "Dasar Rp 50.000 (sebelum tambahan)",
      "Lokasi Produksi": "Meulaboh, Aceh Barat",
    },
    sashModel: "biasa",
    defaultAddons: [],
  },
  {
    id: "fhd-slmp-04",
    slug: "selempang-custom-rumbai-emas",
    name: "Selempang Custom dengan Rumbai Emas",
    category: "selempang",
    categoryLabel: "Selempang Wisuda",
    price: 50000,
    priceLabel: "Dasar Rp 50.000",
    priceType: "Harga Pembuatan",
    priceUnit: "/ pcs",
    badge: "Model Biasa (Aksen Rumbai)",
    rating: 5.0,
    reviewCount: 340,
    inStock: true,
    sku: "FHD-SLMP-004",
    images: ["/Gambar/04-selempang-hitam-emas-rumbai.jpeg"],
    imageAlts: ["Selempang hitam dengan bordir emas dan rumbai emas."],
    shortDescription:
      "Selempang hitam dengan bordir emas dan rumbai dekoratif. Harga dasar resmi Rp50.000 sebelum tambahan dekorasi rumbai (+Rp15.000).",
    description:
      "Selempang hitam dengan bordir emas, aksen merah putih, dan rumbai dekoratif. Tulisan serta dekorasi disesuaikan dengan kebutuhan pesanan. Aksen rumbai emas di ujung selempang memberikan kesan agung, megah, dan prestisius saat dikenakan di atas panggung wisuda dan sesi foto studio. Harga dasar resmi adalah Rp50.000 sebelum tambahan dekorasi rumbai (+Rp15.000 yang dikonfirmasi pada formulir pesanan).",
    features: [
      "Rumbai emas tebal berkilau di bagian ujung selempang",
      "Aksen pita merah putih atau dekorasi khusus",
      "Bordir benang emas metalik berkilau tahan lama",
      "Bahan bludru hitam pekat dobel lapis tegak mewah",
      "Garansi anti-typo dan hasil bordir rapi presisi",
    ],
    materialOptions: [
      "Kain Bludru Hitam Pekat Double Layer",
      "Rumbai Emas Mewah (Tassel)",
      "Benang Emas Metalik",
    ],
    colors: [
      { name: "Hitam", hex: "#0f172a" },
      { name: "Rumbai Gold", hex: "#b48c28" },
    ],
    specifications: {
      "Model Potongan": "Biasa Menyamping",
      "Harga Dasar Resmi": "Dasar Rp 50.000 (sebelum tambahan dekorasi)",
      "Dekorasi Rumbai": "Pilihan Rumbai Emas (+Rp 15.000 dikonfirmasi saat pemesanan)",
      "Warna Bordir": "Gold Metallic Thread",
      "Lokasi Pengerjaan": "Meulaboh, Aceh Barat",
    },
    sashModel: "biasa",
    defaultAddons: ["rumbai"],
  },
  {
    id: "fhd-mdl-05",
    slug: "medali-wisuda-custom-hijau",
    name: "Medali Wisuda Custom Hijau",
    category: "apparel-pdh",
    categoryLabel: "Atribut & Medali",
    price: 0,
    priceLabel: "Hubungi Admin / Custom",
    priceType: "Harga Pembuatan",
    priceUnit: "/ pcs",
    badge: "Atribut Wisuda",
    rating: 4.9,
    reviewCount: 120,
    inStock: true,
    sku: "FHD-MDL-005",
    images: ["/Gambar/05-medali-wisuda-custom-hijau.jpeg"],
    imageAlts: ["Medali wisuda hijau dengan logo lembaga dan pita kuning hijau."],
    shortDescription:
      "Medali dengan identitas lembaga dan pita berwarna hijau-kuning. Desain serta tulisan disesuaikan kebutuhan acara kelulusan dan penghargaan. Harga belum ditentukan (Hubungi Admin / Custom).",
    description:
      "Medali dengan identitas lembaga dan pita berwarna hijau-kuning. Desain serta tulisan dapat disesuaikan untuk kebutuhan acara kelulusan dan penghargaan. Dibuat dengan presisi tinggi menggunakan plat logam / akrilik berkualitas serta pita satin tebal yang rapi dan nyaman dikalungkan. Harga resmi belum ditentukan dan tetap menggunakan label Hubungi Admin / Custom karena harga akhir disesuaikan dengan kuantiti dan spesifikasi bahan.",
    features: [
      "Pita satin halus kombinasi warna hijau dan kuning kampus",
      "Plat medali lambang lembaga jernih dan kokoh",
      "Desain dan tulisan disesuaikan kebutuhan acara",
      "Melayani pesanan partai kecil maupun rombongan besar",
      "Konsultasi desain mockup sebelum naik cetak produksi",
    ],
    materialOptions: [
      "Medali Logam / Akrilik / Resin Kilap",
      "Pita Satin Hijau-Kuning Kampus",
    ],
    colors: [
      { name: "Hijau-Kuning", hex: "#15803d" },
      { name: "Emas", hex: "#b48c28" },
    ],
    specifications: {
      "Jenis Produk": "Medali Wisuda & Penghargaan",
      "Pita Kalung": "Pita Satin Ganda Hijau Kuning",
      "Kustomisasi": "Logo Lembaga / Kampus & Tulisan Acara",
      "Ketersediaan": "Pesanan Custom Satuan & Rombongan",
      "Harga Resmi": "Hubungi Admin / Custom (Perlu konfirmasi spesifikasi & kuantiti)",
    },
  },
  {
    id: "fhd-mdl-06",
    slug: "medali-custom-hitam-emas",
    name: "Medali Custom Hitam Emas",
    category: "apparel-pdh",
    categoryLabel: "Atribut & Medali",
    price: 0,
    priceLabel: "Hubungi Admin / Custom",
    priceType: "Harga Pembuatan",
    priceUnit: "/ pcs",
    badge: "Penghargaan & Wisuda",
    rating: 5.0,
    reviewCount: 95,
    inStock: true,
    sku: "FHD-MDL-006",
    images: ["/Gambar/06-medali-custom-hitam-emas.jpeg"],
    imageAlts: ["Medali custom hitam emas dengan identitas lembaga."],
    shortDescription:
      "Medali hitam emas dengan identitas lembaga dan ornamen dekoratif. Harga belum ditentukan (Hubungi Admin / Custom).",
    description:
      "Medali hitam emas dengan identitas lembaga dan ornamen dekoratif. Cocok sebagai referensi medali untuk kegiatan wisuda, alumni, dan penghargaan. Memadukan warna hitam elegan dengan aksen ornamen emas yang memberi kesan eksklusif dan berwibawa bagi para penerima apresiasi. Harga resmi belum ditentukan dan tetap menggunakan label Hubungi Admin / Custom karena harga akhir disesuaikan dengan kuantiti dan spesifikasi bahan.",
    features: [
      "Kombinasi warna hitam pekat dan aksen ornamen emas",
      "Identitas lembaga dan logo institusi tercetak jelas",
      "Cocok untuk wisuda, reuni alumni, dan malam penghargaan prestasi",
      "Tali kalung kuat dan simetris",
      "Tersedia nota resmi dan stempel toko untuk administrasi LPJ",
    ],
    materialOptions: [
      "Plat Logam Emas / Akrilik Hitam Tebal",
      "Pita Satin Eksklusif",
    ],
    colors: [
      { name: "Hitam Emas", hex: "#0f172a" },
      { name: "Gold", hex: "#b48c28" },
    ],
    specifications: {
      "Jenis Produk": "Medali Apresiasi & Wisuda Prestasi",
      "Kombinasi Warna": "Hitam & Emas Metalik",
      "Desain": "Logo Lembaga & Ornamen Khusus",
      "Fasilitas Administrasi": "Kuitansi Resmi & Stempel Toko",
      "Harga Resmi": "Hubungi Admin / Custom (Perlu konfirmasi spesifikasi & kuantiti)",
    },
  },

  // ─── 2. PRODUK SEWA OUTFIT & KONVEKSI EKSIS ────────────────────────────────
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
      "/Gambar/01-selempang-wisuda-hitam-silver-nama.jpeg",
      "/Gambar/02-selempang-hitam-bordir-emas-instansi.jpeg",
      "/Gambar/04-selempang-hitam-emas-rumbai.jpeg",
      "/Gambar/03-selempang-beige-bordir-pink.jpeg",
    ],
    imageAlts: [
      "Contoh selempang wisuda hitam bordir silver",
      "Contoh selempang leher bordir emas instansi",
      "Contoh selempang hitam rumbai emas",
      "Contoh selempang beige bordir pink",
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
    sashModel: "biasa",
  },
  {
    id: "selempang-2lapis-1",
    slug: "id-card-medali-wisuda",
    name: "Pembuatan ID Card PVC & Medali Wisuda Event",
    category: "apparel-pdh",
    categoryLabel: "Apparel / PDH",
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
      "Contoh medali hitam emas penghargaan",
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
