export type PostStatus = "DRAFT" | "PUBLISHED";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML atau Markdown string
  category: string; // "Tips Wisuda" | "Info Toko" | "Seputar Kampus" dll
  thumbnail: string;
  author: string; // default: "Fardi hd, S.P."
  status: PostStatus;
  publishedAt: string;
  views: number;
  tags?: string[];
}

export interface CreatePostInput {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  category: string;
  thumbnail: string;
  author?: string;
  status: PostStatus;
  tags?: string[];
}

// 3 Artikel Awal (Seed Data Standar Meulaboh & Selempang Aceh Barat)
export const INITIAL_MOCK_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title: "5 Tips Memilih Ukuran Jas Wisuda Pria Agar Pas dan Proporsional di Foto",
    slug: "tips-memilih-ukuran-jas-wisuda-pria",
    excerpt:
      "Panduan menentukan panjang lengan, lebar bahu, dan model slim fit vs regular fit agar Anda tampil berwibawa saat prosesi pemindahan kuncir toga wisuda.",
    category: "Tips Wisuda",
    thumbnail:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&h=630&auto=format&fit=crop&q=80",
    author: "Fardi hd, S.P. (Selempang Aceh Barat)",
    status: "PUBLISHED",
    publishedAt: "28 Feb 2026",
    views: 1420,
    tags: ["Jas Wisuda", "Tips Pria", "Sewa Jas Meulaboh", "Outfit Wisuda UTU"],
    content: `## 1. Pastikan Jahitan Sambungan Bahu Tepat di Ujung Tulang Bahu
Titik bahu adalah bagian paling krusial pada sebuah jas. Bantalan bahu (shoulder pad) harus berakhir persis di ujung lekukan tulang bahu Anda, tidak boleh menggantung (kebesaran) dan tidak boleh menarik kain hingga berkerut (kekecilan).

Jika bahu jas terlalu lebar, postur tubuh akan terlihat tenggelam di balik toga. Sebaliknya, bila terlalu sempit, pergerakan tangan saat menyalami rektor dan senat kampus akan terasa kaku dan terbatas.

> **Tips Ahli Selempang Aceh Barat:** Bersandarlah perlahan ke dinding. Jika bantalan bahu menyentuh dinding sebelum pundak Anda, berarti jas tersebut kebesaran.

## 2. Aturan Manset Kemeja: Biarkan Muncul 1 hingga 1.5 cm
Panjang lengan jas formal yang ideal harus berhenti persis di pergelangan tangan (tepat di atas pangkal ibu jari). Kemeja putih lengan panjang yang Anda kenakan di dalam jas wajib mengintip keluar sekitar 1 sampai 1.5 sentimeter.

Detail kecil ini membedakan tampilan setelan jas amatir dengan penampilan pria berkelas di studio foto wisuda.

## 3. Uji Kancing Jas (The Button Hug Test)
Saat kancing jas bagian atas dipasang, jas harus menutup rapat tanpa menimbulkan kerutan berbentuk huruf X di sekitar kancing perut. Kerutan X menandakan jas terlalu ketat di bagian dada atau lingkar pinggang.

## 4. Pemilihan Potongan: Slim Fit vs Regular Fit
- **Slim Fit:** Cocok untuk postur tinggi ramping, lingkar pinggang proporsional.
- **Regular Fit:** Sangat nyaman untuk pergerakan dinamis sepanjang gladi hingga resepsi.
- **Bahan Wool Blend:** Menjaga struktur jas tetap tegak anti lecek sepanjang hari.

## 5. Manfaatkan Sesi Fitting Langsung di Alpen Store Meulaboh
Di workshop Selempang Aceh Barat (Alpen Store), kami menyediakan sesi fitting gratis dari ukuran S, M, L, XL, XXL hingga 3XL. Jas sudah kami laundry higienis, disetrika uap bertekanan tinggi, dan disemprot parfum aromaterapi segar.`,
  },
  {
    id: "post-2",
    title: "Perbedaan Selempang Wisuda Bahan Bludru vs Satin Bordir Komputer",
    slug: "perbedaan-selempang-wisuda-bludru-vs-satin-bordir-komputer",
    excerpt:
      "Ketahui kelebihan bahan bludru beludru tebal 2 lapis versus bahan satin kilap mewah dengan bordir komputer benang metalik gold anti-typo di Meulaboh.",
    category: "Info Toko",
    thumbnail:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=630&auto=format&fit=crop&q=80",
    author: "Fardi hd, S.P. (Selempang Aceh Barat)",
    status: "PUBLISHED",
    publishedAt: "15 Feb 2026",
    views: 980,
    tags: ["Selempang Wisuda", "Bordir Komputer", "Bludru vs Satin", "Wisuda Meulaboh"],
    content: `## 1. Karakteristik Bahan Bludru (Velvet) Premium 2 Lapis
Bahan bludru memiliki tekstur permukaan lembut berbulu halus yang memberikan kesan mewah, klasik, dan eksklusif. Di workshop Selempang Aceh Barat, kami menerapkan konstruksi dobel lapis (double layer) sehingga selempang memiliki ketebalan kokoh dan tidak lemas saat dikalungkan di atas jubah toga.

Kelebihan utama bahan bludru adalah daya pantul cahayanya yang matte dan anggun. Saat terkena lampu flash studio fotografi atau cahaya matahari luar ruangan, tulisan bordir emas tampak sangat kontras dan terbaca tajam.

- Tekstur beludru tebal dobel lapis tidak kusut.
- Pilihan 7 warna favorit: Hitam pekat, Maron, Merah bendera, Navy dongker, Hijau lumut, Ungu, dan Pink.
- Sangat kokoh saat dipasangi renda rumbai emas di seluruh tepiannya.

## 2. Karakteristik Bahan Satin Silk Kilau Elegan
Bahan satin dikenal dengan permukaan licin dan kilau sutra yang menawan. Selempang satin memberikan nuansa kontemporer yang ringan, segar, dan berkilau di setiap sudut pandang.

> **Tips Ahli:** Bahan satin sangat cocok untuk perayaan wisuda outdoor siang hari karena kilaunya menangkap cahaya alami dengan sangat apik.

## 3. Ketajaman Huruf Bordir Komputer Multi-Needle
Baik bludru maupun satin di tempat kami diproduksi menggunakan mesin bordir komputer modern berkecepatan tinggi dengan benang metalik gold dan silver impor berstandar ekspor.

Bordir komputer menjamin font proporsional, kerapatan tusukan benang tebal, tidak mudah berudul, serta bebas dari kesalahan ejaan (garansi anti-typo 100%).`,
  },
  {
    id: "post-3",
    title: "Checklist Lengkap Persiapan Hari Wisuda di Aceh Barat: Dari Fitting Hingga Foto Studio",
    slug: "checklist-persiapan-hari-wisuda-aceh-barat",
    excerpt:
      "Panduan lengkap jadwal sewa, durasi booking 3 hari tanpa denda kilat, tips merawat setelan jas tetap wangi, dan checklist perlengkapan wisuda di Meulaboh.",
    category: "Seputar Kampus",
    thumbnail:
      "https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?w=1200&h=630&auto=format&fit=crop&q=80",
    author: "Fardi hd, S.P. (Selempang Aceh Barat)",
    status: "PUBLISHED",
    publishedAt: "02 Feb 2026",
    views: 1840,
    tags: ["Checklist Wisuda", "Tips Wisudawan", "Studio Foto Meulaboh", "Sewa Jas"],
    content: `## H-7: Pastikan Booking Jas & Konfirmasi Bordir Selempang
Musim wisuda kampus di Meulaboh (UTU, STAIN Meulaboh, dan AKN) biasanya berlangsung serentak. Permintaan sewa jas dan selempang custom melonjak drastis hingga 300%.

Lakukan booking ukuran jas minimal satu minggu sebelumnya. Di Selempang Aceh Barat, Anda dapat mengamankan tanggal tanpa khawatir kehabisan stok jas slim-fit favorit.

- Kirimkan draft tulisan nama dan gelar lengkap untuk diverifikasi tim bordir komputer kami.
- Tentukan jenis dasi: dasi panjang formal hitam/navy atau dasi kupu-kupu pesta.
- Cek ketersediaan sepatu pantofel hitam kilap ukuran 39 sampai 44.

## H-2: Gladi Bersih & Pengambilan Perlengkapan Wisuda
Ambil setelan jas dan selempang yang sudah dipesan. Masa sewa di Selempang Aceh Barat sangat fleksibel hingga 3 hari kalender penuh, sehingga Anda tidak terburu-buru mengembalikan barang saat masih berkumpul bersama keluarga besar.

> **Tips Merawat Jas:** Gantung jas di hanger berbusa lebar dan hindari melipat jas di dalam tas ransel agar tidak kusut.

## Hari-H Pagi: Checklist Busana Lengkap Sebelum Keluar Rumah
1. Kemeja putih berkerah kaku + manset berkancing rapi.
2. Celana bahan formal hitam dengan ikat pinggang kulit senada.
3. Jas wisuda pria / blazer wanita dengan kancing terpasang kokoh.
4. Sepatu pantofel kulit hitam yang sudah disemir mengkilap + kaus kaki hitam panjang.
5. Selempang wisuda bordir nama dan gelar disematkan peniti emas di bahu kanan.
6. Toga, topi wisuda, medali kampus, dan map ijazah.`,
  },
];

const STORAGE_KEY = "sab_blog_posts";
const EVENT_NAME = "sab_blog_updated";

/**
 * Helper generate slug SEO-friendly dari judul
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Helper memicu event reaktif antar komponen
 */
function notifyUpdate() {
  if (typeof window !== "undefined") {
    try {
      window.dispatchEvent(new CustomEvent(EVENT_NAME));
    } catch {
      // ignore
    }
  }
}

/**
 * Blog Service - Dual-Mode Architecture
 * - Pre-Database: Baca & tulis ke localStorage (key: sab_blog_posts).
 * - Post-Database: Siap dialihkan ke adapter Prisma/MySQL `db.post` tanpa ubah UI.
 */
export const blogService = {
  /**
   * Mengambil semua artikel (DRAFT + PUBLISHED)
   */
  getAllPosts(): BlogPost[] {
    if (typeof window === "undefined") {
      return INITIAL_MOCK_POSTS;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_POSTS));
        return INITIAL_MOCK_POSTS;
      }
      return JSON.parse(stored);
    } catch (e) {
      console.warn("Gagal membaca blog posts dari localStorage, fallback ke seed:", e);
      return INITIAL_MOCK_POSTS;
    }
  },

  /**
   * Mengambil hanya artikel yang berstatus PUBLISHED untuk halaman publik
   */
  getPublishedPosts(): BlogPost[] {
    const all = this.getAllPosts();
    return all.filter((p) => p.status === "PUBLISHED");
  },

  /**
   * Mencari artikel berdasarkan slug URL
   */
  getPostBySlug(slug: string): BlogPost | undefined {
    const all = this.getAllPosts();
    return all.find((p) => p.slug === slug || p.id === slug);
  },

  /**
   * Mencari artikel berdasarkan ID unik
   */
  getPostById(id: string): BlogPost | undefined {
    const all = this.getAllPosts();
    return all.find((p) => p.id === id);
  },

  /**
   * Membuat artikel jurnal baru
   */
  createPost(input: CreatePostInput): BlogPost {
    const all = this.getAllPosts();
    const slug = input.slug?.trim() ? generateSlug(input.slug) : generateSlug(input.title);

    const now = new Date();
    const dateFormatted = new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(now);

    const newPost: BlogPost = {
      ...input,
      id: "post-" + Date.now(),
      slug: slug || "jurnal-" + Date.now(),
      author: input.author || "Fardi hd, S.P.",
      publishedAt: dateFormatted,
      views: 0,
    };

    const updated = [newPost, ...all];

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Gagal simpan artikel ke localStorage:", e);
      }
      notifyUpdate();
    }

    return newPost;
  },

  /**
   * Memperbarui artikel jurnal
   */
  updatePost(id: string, updates: Partial<BlogPost>): BlogPost | null {
    const all = this.getAllPosts();
    const index = all.findIndex((p) => p.id === id);
    if (index === -1) return null;

    if (updates.title && !updates.slug) {
      updates.slug = generateSlug(updates.title);
    } else if (updates.slug) {
      updates.slug = generateSlug(updates.slug);
    }

    const updatedPost: BlogPost = {
      ...all[index],
      ...updates,
    };

    all[index] = updatedPost;

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      } catch (e) {
        console.error("Gagal update artikel ke localStorage:", e);
      }
      notifyUpdate();
    }

    return updatedPost;
  },

  /**
   * Menghapus artikel jurnal
   */
  deletePost(id: string): boolean {
    const all = this.getAllPosts();
    const filtered = all.filter((p) => p.id !== id);
    if (filtered.length === all.length) return false;

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      } catch (e) {
        console.error("Gagal hapus artikel dari localStorage:", e);
      }
      notifyUpdate();
    }

    return true;
  },

  /**
   * Menambah jumlah pembaca artikel
   */
  incrementViews(slugOrId: string): void {
    const all = this.getAllPosts();
    const target = all.find((p) => p.slug === slugOrId || p.id === slugOrId);
    if (!target) return;

    target.views = (target.views || 0) + 1;

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      } catch {
        // ignore
      }
    }
  },

  /**
   * Reset data kembali ke 3 artikel mock awal
   */
  resetToInitial(): BlogPost[] {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_POSTS));
      } catch {
        // ignore
      }
      notifyUpdate();
    }
    return INITIAL_MOCK_POSTS;
  },
};
