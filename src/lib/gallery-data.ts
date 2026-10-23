export type GalleryCategoryId = "all" | "selempang" | "jas" | "wisudawan" | "medali";

export interface GalleryItem {
  id: string;
  title: string;
  category: "selempang" | "jas" | "wisudawan" | "medali";
  categories?: ("selempang" | "jas" | "wisudawan" | "medali")[];
  campus: string;
  image: string;
  badge: string;
  shortText: string;
  description: string;
  alt: string;
  objectPosition?: string;
}

export const GALLERY_CATEGORIES: { id: GalleryCategoryId; label: string }[] = [
  { id: "all", label: "Semua Koleksi" },
  { id: "selempang", label: "Selempang Custom" },
  { id: "jas", label: "Sewa Jas Formal" },
  { id: "wisudawan", label: "Momen Kelulusan" },
  { id: "medali", label: "Medali Wisuda" },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g-selempang-navy",
    title: "Selempang Wisuda Custom Navy",
    category: "selempang",
    categories: ["selempang", "wisudawan"],
    campus: "Universitas Teuku Umar (UTU)",
    image: "/images/portfolio/selempang-cumlaude-navy.png",
    badge: "Cum Laude Edition",
    shortText: "Detail bordir personal untuk momen kelulusan yang tak terlupakan.",
    description:
      "Perpaduan warna navy yang elegan, bordir nama personal, identitas universitas, dan detail prestasi menghadirkan selempang wisuda yang lebih personal dan berkesan. Setiap detail menjadi bagian dari cerita perjuangan akademik yang layak dikenang.",
    alt: "Wisudawati mengenakan selempang navy custom dengan bordir nama, logo Universitas Teuku Umar, dan tulisan Cum Laude.",
    objectPosition: "center 20%",
  },
  {
    id: "g-jas-kelompok",
    title: "Tampil Formal, Kompak, dan Penuh Percaya Diri",
    category: "jas",
    categories: ["jas", "wisudawan"],
    campus: "Sewa Jas Wisuda Meulaboh",
    image: "/images/portfolio/jas-formal-kelompok.png",
    badge: "Ready Fitting Jas",
    shortText: "Gaya formal yang membuat setiap momen terasa lebih istimewa.",
    description:
      "Jas hitam yang rapi, kemeja putih yang klasik, dan dasi merah yang tegas menciptakan penampilan formal yang serasi. Jadikan momen wisuda, sesi foto, dan acara resmi semakin berkesan dengan penampilan yang percaya diri.",
    alt: "Empat pria mengenakan jas hitam, kemeja putih, dan dasi merah dalam sesi foto formal.",
    objectPosition: "center 28%",
  },
  {
    id: "g-jas-pria-lengkap",
    title: "Setelan Jas Formal Pria Wisuda & Dasi",
    category: "jas",
    categories: ["jas", "wisudawan"],
    campus: "Sewa Jas Wisuda Aceh Barat",
    image: "/Gambar/male-graduate-suit-full.jpg",
    badge: "Setelan Pria",
    shortText: "Setelan jas formal pria potongan modern rapi lengkap dasi dan sepatu.",
    description:
      "Dokumentasi setelan jas wisuda pria formal slimfit siap pakai, bersih steril, dan nyaman dipakai untuk seremonial wisuda serta foto studio kenangan.",
    alt: "Foto model pria mengenakan setelan jas formal hitam wisuda lengkap dasi dan sepatu pantofel.",
    objectPosition: "center 25%",
  },
  {
    id: "g-jas-wanita-blazer",
    title: "Jas Blazer Wanita Formal & Sidang",
    category: "jas",
    categories: ["jas", "wisudawan"],
    campus: "Yudisium & Sidang Aceh Barat",
    image: "/Gambar/stitch/blazer_charcoal.jpg",
    badge: "Blazer Formal",
    shortText: "Jas blazer wanita berpotongan rapi untuk sidang skripsi dan yudisium.",
    description:
      "Setelan jas blazer wanita warna elegan berpotongan feminin dan rapi, nyaman digunakan berjam-jam saat sidang skripsi maupun seremonial wisuda.",
    alt: "Jas blazer wanita formal warna charcoal untuk sidang dan wisuda.",
    objectPosition: "center 20%",
  },
  {
    id: "g-sepatu-pantofel-oxford",
    title: "Sepatu Pantofel Kulit Formal Kilap",
    category: "jas",
    categories: ["jas"],
    campus: "Koleksi Workshop Meureubo",
    image: "/Gambar/stitch/shoes_oxford.jpg",
    badge: "Pantofel Kilap",
    shortText: "Sepatu pantofel kulit formal insole empuk nyaman untuk prosesi wisuda.",
    description:
      "Koleksi sepatu pantofel formal pria dan wanita dengan kulit kilap elegan dan bantalan busa empuk, siap pakai dan disemir bersih sebelum serah terima.",
    alt: "Sepatu pantofel kulit hitam formal mengkilap untuk wisuda dan seremonial.",
    objectPosition: "center center",
  },
  {
    id: "g-selempang-hitam-silver",
    title: "Selempang Wisuda Hitam Silver Custom",
    category: "selempang",
    categories: ["selempang"],
    campus: "UTU & Kampus Aceh Barat",
    image: "/Gambar/01-selempang-wisuda-hitam-silver-nama.jpeg",
    badge: "Best Seller",
    shortText: "Selempang hitam dengan tulisan custom dan pinggiran silver.",
    description:
      "Contoh selempang wisuda hitam dengan tulisan nama dan inisial/gelar serta aksen pinggiran silver. Cocok sebagai referensi desain untuk wisuda atau yudisium. Tulisan dan detail akhir mengikuti spesifikasi yang disepakati saat pemesanan.",
    alt: "Beberapa selempang wisuda hitam dengan tulisan nama putih dan pinggiran silver.",
    objectPosition: "center center",
  },
  {
    id: "g-selempang-hitam-emas-rumbai",
    title: "Selempang Hitam Bordir Emas dengan Rumbai",
    category: "selempang",
    categories: ["selempang"],
    campus: "Akpol Den 61 & Kedinasan",
    image: "/Gambar/04-selempang-hitam-emas-rumbai.jpeg",
    badge: "Rumbai Eksklusif",
    shortText: "Selempang hitam dengan bordir emas, aksen merah-putih, dan rumbai.",
    description:
      "Contoh selempang hitam dengan tulisan bordir emas, aksen merah-putih, dan rumbai emas di bagian ujung. Desain tulisan, warna, dan detail dekorasi dapat dibahas sesuai kebutuhan pemesan.",
    alt: "Dua selempang hitam bertulisan emas dengan pinggiran dan rumbai emas.",
    objectPosition: "center center",
  },
  {
    id: "g-selempang-beige-pink",
    title: "Selempang Beige dengan Bordir Pink",
    category: "selempang",
    categories: ["selempang"],
    campus: "Fakultas Hukum UTU",
    image: "/Gambar/03-selempang-beige-bordir-pink.jpeg",
    badge: "Satin Premium",
    shortText: "Selempang beige dengan nama dan detail bordir pink.",
    description:
      "Contoh selempang warna beige dengan tulisan dan identitas institusi berwarna pink. Kombinasi warna kain dan benang dapat menjadi referensi desain custom. Pastikan jenis bahan dan opsi warna yang tersedia dikonfirmasi sebelum ditawarkan.",
    alt: "Selempang warna beige dengan tulisan nama dan bordir pink.",
    objectPosition: "center center",
  },
  {
    id: "g-selempang-hitam-emas-instansi",
    title: "Selempang Hitam Bordir Emas Custom Instansi",
    category: "selempang",
    categories: ["selempang"],
    campus: "Secata Rindam IM TNI AD",
    image: "/Gambar/02-selempang-hitam-bordir-emas-instansi.jpeg",
    badge: "Bordir Instansi",
    shortText: "Detail selempang hitam dengan bordir emas dan identitas instansi.",
    description:
      "Contoh selempang hitam dengan bordir emas, hiasan pinggir, serta identitas instansi. Desain ini dapat menjadi referensi untuk kebutuhan wisuda, organisasi, atau acara resmi. Logo dan tulisan pesanan harus dikonfirmasi sesuai kebutuhan pelanggan.",
    alt: "Dua pasang selempang hitam dengan tulisan dan bordir emas.",
    objectPosition: "center center",
  },
  {
    id: "g-medali-wisuda-hijau",
    title: "Medali Wisuda Custom Hijau",
    category: "medali",
    categories: ["medali"],
    campus: "Kampus & Lembaga Aceh Barat",
    image: "/Gambar/05-medali-wisuda-custom-hijau.jpeg",
    badge: "Atribut Kampus",
    shortText: "Medali custom hijau dengan lambang lembaga dan pita kuning-hijau.",
    description:
      "Contoh medali wisuda dengan desain identitas lembaga dan pita kuning-hijau. Cocok sebagai referensi untuk acara kelulusan, alumni, penghargaan, atau kegiatan institusi. Tulisan, lambang, warna, dan detail akhir harus mengikuti desain yang disetujui pemesan.",
    alt: "Medali wisuda hijau dengan lambang lembaga dan pita kuning-hijau.",
    objectPosition: "center center",
  },
  {
    id: "g-medali-custom-hitam-emas",
    title: "Medali Custom Hitam Emas",
    category: "medali",
    categories: ["medali"],
    campus: "Kejuaraan & Wisuda Meulaboh",
    image: "/Gambar/06-medali-custom-hitam-emas.jpeg",
    badge: "Resin Eksklusif",
    shortText: "Medali hitam emas dengan lambang lembaga dan pita.",
    description:
      "Contoh medali dengan kombinasi warna hitam dan emas serta lambang lembaga pada bagian depan. Dapat menjadi referensi desain medali untuk wisuda, alumni, atau penghargaan. Desain akhir mengikuti brief dan persetujuan pelanggan.",
    alt: "Medali custom hitam dan emas dengan lambang lembaga.",
    objectPosition: "center center",
  },
];
