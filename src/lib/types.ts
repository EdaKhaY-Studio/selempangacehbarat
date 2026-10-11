// ─── Product Types ─────────────────────────────────────────────────────────

export type ProductCategory = "paket-lengkap" | "jas-satuan" | "selempang";
export type SuitSize = "S" | "M" | "L" | "XL" | "XXL";
export type ShoeSize = 39 | 40 | 41 | 42 | 43 | 44;
export type SashColor =
  | "hitam"
  | "maron"
  | "merah"
  | "biru-dongker"
  | "hijau"
  | "ungu"
  | "pink"
  | "cokelat"
  | "abu-abu"
  | "putih"
  | "cream"
  | "kuning";
export type ThreadColor = "gold" | "silver";
export type SashFont = "Monotype Corsiva" | "Cinzel" | "Times New Roman" | "Arial";
export type SashLogo = "utu" | "stain" | "usk" | "akn" | "custom";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  priceLabel: string;
  images: string[];
  availableSizes?: SuitSize[];
  badge?: string;
  isBestSeller?: boolean;
}

export interface SashConfig {
  clothColor: SashColor;
  threadColor: ThreadColor;
  textLeft: string;
  textRight: string;
  font: SashFont;
  logo: SashLogo;
  isDoubleLayer: boolean;
  hasGlitterEdge: boolean;
}

// ─── Booking Types ─────────────────────────────────────────────────────────

export type BookingStatus =
  | "menunggu-pembayaran"
  | "siap-diambil"
  | "sedang-dipakai"
  | "selesai-dikembalikan"
  | "dibatalkan";

export interface BookingData {
  id: string;
  customerName: string;
  customerPhone: string;
  customerInstitution: string;
  productId: string;
  size?: SuitSize;
  shoeSize?: ShoeSize;
  sashConfig?: SashConfig;
  startDate: string;
  endDate: string;
  totalAmount: number;
  discount: number;
  status: BookingStatus;
  createdAt: string;
  isBundling: boolean;
}

// ─── Payment Types ──────────────────────────────────────────────────────────

export type PaymentMethod =
  | "qris"
  | "va-bca"
  | "va-mandiri"
  | "va-bri"
  | "va-bni"
  | "va-bsi"
  | "gopay"
  | "shopeepay"
  | "dana";

export interface PaymentData {
  bookingId: string;
  method: PaymentMethod;
  amount: number;
  qrisUrl?: string;
  vaNumber?: string;
  expiresAt: string;
  status: "pending" | "success" | "failed" | "expired";
}

// ─── AI Chat Types ──────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// ─── Store Information & Operational Constants ──────────────────────────────

export const STORE_INFO = {
  name: "Selempang Aceh Barat",
  address: "Jln Alpen, Gampong Gunung Kleng, Kecamatan Meureubo, Kabupaten Aceh Barat",
  operatingHours: {
    morning: "08:00 - 18:00 (Waktu sholat toko tutup)",
    evening: "20:00 - 23:00",
  },
  accounts: {
    selempang: {
      name: "Selempang Aceh Barat",
      handle: "@selempang_acehbarat",
      instagramUrl: "https://instagram.com/selempang_acehbarat",
      whatsapp: "0822-9925-6343",
      whatsappDisplay: "0822-9925-6343",
      whatsappRaw: "6282299256343",
    },
    sewa: {
      name: "Sewa Jas & Sepatu Aceh Barat",
      handle: "@sewajassepatu_acehbarat",
      instagramUrl: "https://instagram.com/sewajassepatu_acehbarat",
      whatsapp: "0822-7602-7590",
      whatsappDisplay: "0822-7602-7590",
      whatsappRaw: "6282276027590",
    },
  },
  selempangPrices: [50000, 55000, 65000, 80000, 85000, 90000, 135000],
  bludruColors: ["Hitam", "Maron", "Merah", "Biru Dongker", "Hijau", "Ungu", "Pink"],
  satinColors: [
    "Hitam",
    "Maron",
    "Merah",
    "Biru Dongker",
    "Hijau",
    "Ungu",
    "Pink",
    "Cokelat",
    "Abu-abu",
    "Putih",
    "Cream",
    "Kuning",
  ],
  jasColors: ["Hitam", "Cream", "Abu-Abu", "Coklat", "Maron"],
  rentalPrices: {
    jasPriaPlusDasi: 50000,
    dasi: 15000,
    jasWanita: "Rp 35.000 - Rp 40.000",
    kemejaPria: 25000,
    kemejaWanita: 25000,
    celana: 25000,
    rok: 30000,
    sepatuPria: 35000,
    sepatuWanita: 30000,
  },
  saleProducts: [
    "Selempang (Bahan Bludru & Satin)",
    "Baju PDH",
    "Baju Kaos",
    "Baju Almamater",
    "Id Card & Medali",
    "Jas, Dasi, Kemeja Putih & Celana Formal",
    "Sepatu Pantofel",
  ],
};

// ─── Catalog Data ───────────────────────────────────────────────────────────

export const PRODUCTS: Product[] = [
  {
    id: "paket-lengkap-1",
    name: "Sewa Jas Pria + Dasi Formal",
    category: "paket-lengkap",
    description:
      "Sewa Jas Pria lengkap dengan Dasi formal. Pilihan warna jas: Hitam, Cream, Abu-Abu, Coklat, Maron. Tersedia ukuran lengkap S, M, L, XL, XXL siap pakai.",
    price: 50000,
    priceLabel: "Rp 50.000 / Sewa",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAr-e_rGospVQPboskLeppHkkNvw5cKBoMLWiQszAbmnwrL97XVB2IdbN0DrYgXfXz481mZdol_oz8khfUPE402EnxDq9kdwu14H62QLVw2hE_mlI_LNlhgu5pWisITMYtDSjZlyhNNH6VkNmK-Ou1wNkk8ZMyeijmYTIpx5UrybfLltwi-Zo4SN4Oc2VSWcAEDWrkY4P-Jed-KLg-WL34fvMAH7dCL2CEJvC0S-GGAzQqLboF5dNf4",
    ],
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    badge: "Favorit Wisuda",
    isBestSeller: true,
  },
  {
    id: "bundling-sultan-1",
    name: "Sewa Jas Wanita & Busana Pendukung",
    category: "paket-lengkap",
    description:
      "Jas Wanita (Rp 35.000 - Rp 40.000) dengan pilihan warna: Hitam, Cream, Abu-Abu, Coklat, Maron. Sewa Kemeja Pria/Wanita Rp 25.000, Celana Rp 25.000, Rok Rp 30.000, Dasi Rp 15.000.",
    price: 35000,
    priceLabel: "Rp 35.000 - Rp 40.000",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBg6U_Dk2uibp68llXo4dyaKecUCUk5vieQQwU78-DOBgKrbgxU8aIB61r8cpn3qC8zpcPMB4mfYjyNDEzUO2qYb_nyk6YcyPRlN6WK14LP3d1mRU5vZnor4WHA8Dy5vkH_O4cAXslyXDqwOlXFoUSAWdHrS_tc8b_qt_HIRwalPAju85QLk4OQ6Up8yeV1LJdrZDCokqru7hnfmqqjyQdI5h2GSSBNvikGDFprDGMa9EPQMzae_5JK",
    ],
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    badge: "Pria & Wanita",
    isBestSeller: true,
  },
  {
    id: "selempang-custom-1",
    name: "Selempang Wisuda (Bludru & Satin)",
    category: "selempang",
    description:
      "Bordir komputer presisi rapi. Range harga mulai Rp 50.000 - 55.000 - 65.000 - 80.000 - 85.000 - 90.000 - 135.000. Bahan Bludru & Satin dengan pilihan warna terlengkap.",
    price: 50000,
    priceLabel: "Rp 50.000 - 135.000",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACGb4x2T6Ey5MqMf2FS15rYdtYlVPM8sNxUDMnOd8Dkmxa1jBs_eT9IXzl8LfSgXjDDgve0S5qx5Bo28kSB5YtdCeVGKnTbBqABt7KtrvyDb5dvXHZ0coHthBjU5CpW1KwCuV0PBNo-9LBzXhQeZgBS9pKYjbosSCshPwBoHR2PV7wZ5AW_n6I_cf02YXECTjF7BPV1EdTp_z-ekTKmvvP9WH-Sm6KejQYPeGhlfRtjw5ShwR9hugT",
    ],
    badge: "Custom Hak Milik",
    isBestSeller: true,
  },
  {
    id: "sepatu-pantofel-1",
    name: "Sewa Sepatu Pantofel Pria & Wanita",
    category: "jas-satuan",
    description:
      "Sewa Sepatu Pria: Rp 35.000 & Sepatu Wanita: Rp 30.000. Kulit formal kilap, insole empuk nyaman di panggung wisuda. Tersedia juga penjualan Sepatu Pantofel baru.",
    price: 30000,
    priceLabel: "Rp 30.000 - Rp 35.000",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDyPYkVj9Hlt7dMpjNZkYtmyjmxcN3Zo_gOfJcvOC-dkEugOpLMdXKVPP7f09Gw14LWrg37G61DN_hbI_f-SBl8Dz6CQH7dLnWalW9w6QNM7ekE2SASgw5VfTP0jJs7rEUdmVZBNZv-gKnzqWiUtxkYIVuwJ0j6-2n38XzBxJ7MDLOxfiCDCl44DtQ2j_V_DQ5iOJaQ_jV1JrpJWvIslAjAuTu9sIw1eNIL6asVqa9UkmBYlXZRfjb2",
    ],
    badge: "Sewa & Jual",
  },
  {
    id: "jas-satuan-1",
    name: "Baju PDH, Kaos & Baju Almamater (Dijual)",
    category: "jas-satuan",
    description:
      "Layanan konveksi dan penjualan pakaian organisasi resmi: Baju PDH kampus/dinas, Baju Kaos sablon/bordir, serta Baju Almamater berkualitas rapi dan nyaman dipakai.",
    price: 85000,
    priceLabel: "Partai & Satuan",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBQ2rnP9Qui1nPXu3S5X6n1ewNiFQYmeHwr9yK46CEziVy3OpEnWyPoQBwOFi8pyXJNeyrfQJygx63YSFYdX3inFoVBlvLOrJ9DEHf44JdXhz9SJA_IuZK0MVo30NrtjZ9rReVeC_38kGEtwcrVJ5AryOU-vggX1mcNVBphwqTAhJT0QB_2QfLlTFZkZ5VXdhpuITOvZ6MhLs1lkOTYYQ4n1E6gJOa1RyYtxokvs4e1n-be4NjkreYx",
    ],
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    badge: "Produksi Konveksi",
  },
  {
    id: "selempang-2lapis-1",
    name: "Id Card & Medali Wisuda (Dijual)",
    category: "selempang",
    description:
      "Pembuatan Id Card anti patah & Medali wisuda/event resin kilap pita warna kampus. Tersedia juga penjualan Jas, Dasi, Kemeja Putih & Celana Formal baru.",
    price: 25000,
    priceLabel: "Mulai Rp 15.000",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCOVNwBxqTyk3uRGT88S_AYGCZZbQ_TnLexHaXWvwm_sewcrhunr8Yb9kGLl6O6T9Ijywswyyb8wnkS86SF6QiswwNhf4z3zaJX0LS3WrQY6M0ObRoTPwoCVxorUohQUpbSl6J3rFguSwxHiOX5JeIGtW7R2qnWa2fYZeLqy4AwptyG1MAib8uK5QgYq7RbDgqEI25qFYaXX4_flT6FZyw-MI0W560i8pnWdD1Oqa7pAg2zhoKHqyQf",
    ],
    badge: "Atribut Wisuda",
  },
];

export const TESTIMONIALS = [
  {
    id: "1",
    name: "Tengku Aisyah R.",
    role: "Wisudawan UTU — Fakultas Ekonomi",
    avatar: "/images/testimonial-1.jpg",
    content:
      "Alhamdulillah selempang bludru pesanan saya persis banget dengan yang diminta! Bordir benang emasnya rapi dan berkilau. Sewa jas dan sepatunya juga langsung siap pakai.",
    rating: 5,
    date: "Agustus 2026",
  },
  {
    id: "2",
    name: "Muhammad Rizki A.",
    role: "Wisudawan STAIN Meulaboh",
    avatar: "/images/testimonial-2.jpg",
    content:
      "Pesan selempang kilat langsung jadi rapi! Jas prianya wangi, rapi, setelan dasinya pas di badan. Pilihan warna jasnya juga beragam dan pelayanannya sangat ramah.",
    rating: 5,
    date: "September 2026",
  },
  {
    id: "3",
    name: "Cut Nabila M.",
    role: "Wisudawan UTU — FKM",
    avatar: "/images/testimonial-3.jpg",
    content:
      "Sistem pemesanan gampang sekali! Bisa sewa jas wanita dan beli selempang wisuda bordir komputer berkualitas. Sepatu pantofelnya juga empuk tidak bikin lecet.",
    rating: 5,
    date: "Oktober 2026",
  },
  {
    id: "4",
    name: "Agus Fauzi, S.T.",
    role: "Wisudawan UTU — Teknik Sipil",
    avatar: "/images/testimonial-4.jpg",
    content:
      "Pelayanan 5 bintang! Harga terjangkau, kualitas jahitan dan bordir premium. Rekomendasi utama untuk seluruh rekan mahasiswa di Aceh Barat.",
    rating: 5,
    date: "Oktober 2026",
  },
];
