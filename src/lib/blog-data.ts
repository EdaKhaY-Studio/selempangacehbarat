export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryBadge: string;
  readTime: string;
  date: string;
  datePublished: string;
  dateModified: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string[];
      list?: string[];
      tip?: string;
    }[];
    conclusion: string;
  };
  relatedProductSlug?: string;
}

export const ALL_BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    slug: "tips-memilih-ukuran-jas-wisuda-pria",
    title: "5 Tips Memilih Ukuran Jas Wisuda Pria Agar Pas dan Proporsional di Foto",
    excerpt:
      "Panduan menentukan panjang lengan, lebar bahu, dan model slim fit vs regular fit agar Anda tampil berwibawa saat prosesi pemindahan kuncir toga wisuda.",
    category: "Tips Jas & Outfit",
    categoryBadge: "Panduan Fitting",
    readTime: "4 menit baca",
    date: "28 Feb 2026",
    datePublished: "2026-02-28T08:30:00+07:00",
    dateModified: "2026-03-01T10:00:00+07:00",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&h=630&auto=format&fit=crop&q=80",
    author: {
      name: "Fardi hd, S.P. (Selempang Aceh Barat)",
      role: "Head Stylist & Founder",
      avatar: "/Gambar/LOGOFHD.png",
    },
    tags: ["Jas Wisuda", "Tips Pria", "Sewa Jas Meulaboh", "Outfit Wisuda UTU"],
    relatedProductSlug: "sewa-jas-pria-dasi-formal",
    content: {
      intro:
        "Momen wisuda di Universitas Teuku Umar (UTU) maupun STAIN Meulaboh adalah puncak perjuangan akademik bertahun-tahun. Menggunakan setelan jas wisuda yang pas di badan (well-fitted) bukan sekadar soal gaya, melainkan tentang rasa percaya diri dan estetika kenangan foto keluarga yang akan dipajang seumur hidup.",
      sections: [
        {
          heading: "1. Pastikan Jahitan Sambungan Bahu Tepat di Ujung Tulang Bahu",
          body: [
            "Titik bahu adalah bagian paling krusial pada sebuah jas. Bantalan bahu (shoulder pad) harus berakhir persis di ujung lekukan tulang bahu Anda, tidak boleh menggantung (kebesaran) dan tidak boleh menarik kain hingga berkerut (kekecilan).",
            "Jika bahu jas terlalu lebar, postur tubuh akan terlihat tenggelam di balik toga. Sebaliknya, bila terlalu sempit, pergerakan tangan saat menyalami rektor dan senat kampus akan terasa kaku dan terbatas.",
          ],
          tip: "Trik mudah: Bersandarlah perlahan ke dinding. Jika bantalan bahu menyentuh dinding sebelum pundak Anda, berarti jas tersebut kebesaran.",
        },
        {
          heading: "2. Aturan Manset Kemeja: Biarkan Muncul 1 hingga 1.5 cm",
          body: [
            "Panjang lengan jas formal yang ideal harus berhenti persis di pergelangan tangan (tepat di atas pangkal ibu jari). Kemeja putih lengan panjang yang Anda kenakan di dalam jas wajib mengintip keluar sekitar 1 sampai 1.5 sentimeter.",
            "Detail kecil ini membedakan tampilan setelan jas amatir dengan penampilan pria berkelas di studio foto wisuda.",
          ],
        },
        {
          heading: "3. Uji Kancing Jas (The Button Hug Test)",
          body: [
            "Saat kancing jas bagian atas dipasang, jas harus menutup rapat tanpa menimbulkan kerutan berbentuk huruf X di sekitar kancing perut. Kerutan X menandakan jas terlalu ketat di bagian dada atau lingkar pinggang.",
            "Sebaliknya, jika Anda bisa memasukkan lebih dari satu kepalan tangan di antara dada dan kain jas yang terkancing, ukuran jas tersebut terlalu longgar.",
          ],
        },
        {
          heading: "4. Pemilihan Potongan: Slim Fit vs Regular Fit",
          body: [
            "Untuk wisudawan bertubuh atletis atau ramping, siluet Modern Slim Fit memberikan efek ramping dan proporsional di kamera lensa tele fotografer.",
            "Bagi postur tubuh berisi atau berotot, pilihlah potongan Tailored Regular Fit yang memberikan ruang gerak nyaman serta sirkulasi udara lebih leluasa saat berada di dalam gedung auditorium kampus.",
          ],
          list: [
            "Slim Fit: Cocok untuk postur tinggi ramping, lingkar pinggang proporsional.",
            "Regular Fit: Sangat nyaman untuk pergerakan dinamis sepanjang gladi hingga resepsi.",
            "Bahan Wool Blend: Menjaga struktur jas tetap tegak anti lecek sepanjang hari.",
          ],
        },
        {
          heading: "5. Manfaatkan Fitting Langsung di Toko Selempang Aceh Barat",
          body: [
            "Di Selempang Aceh Barat (Alpen Store Meulaboh), kami menyediakan sesi fitting gratis dari ukuran S, M, L, XL, XXL hingga 3XL. Jas sudah kami laundry higienis, disetrika uap bertekanan tinggi, dan disemprot parfum aromaterapi segar.",
            "Anda juga mendapatkan paket komplit sewa yang sudah termasuk dasi formal (panjang atau kupu-kupu) tanpa perlu repot membeli terpisah.",
          ],
        },
      ],
      conclusion:
        "Jangan biarkan momen sekali seumur hidup terganggu oleh jas yang tidak nyaman. Hubungi tim Selempang Aceh Barat untuk konsultasi ukuran berat dan tinggi badan, atau mampir langsung ke workshop kami di Meulaboh untuk mencoba koleksi jas terbaik.",
    },
  },
  {
    id: "post-2",
    slug: "perbedaan-selempang-wisuda-bludru-vs-satin-bordir-komputer",
    title: "Perbedaan Selempang Wisuda Bahan Bludru vs Satin Bordir Komputer",
    excerpt:
      "Ketahui kelebihan bahan bludru beludru tebal 2 lapis versus bahan satin kilap mewah dengan bordir komputer benang metalik gold anti-typo di Meulaboh.",
    category: "Bahan Selempang",
    categoryBadge: "Komparasi Bahan",
    readTime: "5 menit baca",
    date: "15 Feb 2026",
    datePublished: "2026-02-15T09:15:00+07:00",
    dateModified: "2026-02-20T11:00:00+07:00",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=630&auto=format&fit=crop&q=80",
    author: {
      name: "Fardi hd, S.P. (Selempang Aceh Barat)",
      role: "Head Stylist & Founder",
      avatar: "/Gambar/LOGOFHD.png",
    },
    tags: ["Selempang Wisuda", "Bordir Komputer", "Bludru vs Satin", "Wisuda Meulaboh"],
    relatedProductSlug: "selempang-wisuda-bludru-satin",
    content: {
      intro:
        "Selempang wisuda bordir nama dan gelar bukan lagi sekadar aksesori wisuda biasa, tetapi simbol kebanggaan pencapaian akademik dan kado paling bermakna dari sahabat terdekat. Pertanyaan yang paling sering diajukan pelanggan di Selempang Aceh Barat adalah: lebih bagus bahan bludru atau bahan satin?",
      sections: [
        {
          heading: "1. Karakteristik Bahan Bludru (Velvet) Premium 2 Lapis",
          body: [
            "Bahan bludru memiliki tekstur permukaan lembut berbulu halus yang memberikan kesan mewah, klasik, dan eksklusif. Di workshop Selempang Aceh Barat, kami menerapkan konstruksi dobel lapis (double layer) sehingga selempang memiliki ketebalan kokoh dan tidak lemas saat dikalungkan di atas jubah toga.",
            "Kelebihan utama bahan bludru adalah daya pantul cahayanya yang matte dan anggun. Saat terkena lampu flash studio fotografi atau cahaya matahari luar ruangan, tulisan bordir emas tampak sangat kontras dan terbaca tajam.",
          ],
          list: [
            "Tekstur beludru tebal dobel lapis tidak kusut.",
            "Pilihan 7 warna favorit: Hitam pekat, Maron, Merah bendera, Navy dongker, Hijau lumut, Ungu, dan Pink.",
            "Sangat kokoh saat dipasangi renda rumbai emas di seluruh tepiannya.",
          ],
        },
        {
          heading: "2. Karakteristik Bahan Satin Silk Kilau Elegan",
          body: [
            "Bahan satin dikenal dengan permukaan licin dan kilau sutra yang menawan. Selempang satin memberikan nuansa kontemporer yang ringan, segar, dan berkilau di setiap sudut pandang.",
            "Bagi yang menyukai tampilan modern glamor, satin adalah opsi sempurna dengan variasi palet warna yang sangat beragam (hingga 12 gradasi warna).",
          ],
          tip: "Bahan satin sangat cocok untuk perayaan wisuda outdoor siang hari karena kilaunya menangkap cahaya alami dengan sangat apik.",
        },
        {
          heading: "3. Ketajaman Huruf Bordir Komputer Multi-Needle",
          body: [
            "Baik bludru maupun satin di tempat kami diproduksi menggunakan mesin bordir komputer modern berkecepatan tinggi dengan benang metalik gold dan silver impor berstandar ekspor.",
            "Bordir komputer menjamin font proporsional, kerapatan tusukan benang tebal, tidak mudah berudul, serta bebas dari kesalahan ejaan (garansi anti-typo 100%).",
          ],
        },
        {
          heading: "4. Tabel Perbandingan Cepat: Bludru vs Satin",
          body: [
            "Berikut ringkasan fitur kedua bahan untuk membantu Anda memutuskan pilihan terbaik sesuai konsep acara wisuda Anda:",
          ],
          list: [
            "Ketebalan: Bludru (Sangat Tebal & Kaku Mewah) vs Satin (Ringan & Lembut)",
            "Efek Cahaya: Bludru (Matte Elegan) vs Satin (Kilap Sutra Glamor)",
            "Daya Tahan: Keduanya awet puluhan tahun untuk disimpan sebagai memorabilia kenangan.",
            "Rekomendasi Renda: Rumbai emas metalik untuk Bludru; Lis pita perak/emas untuk Satin.",
          ],
        },
      ],
      conclusion:
        "Jika Anda menyukai kesan resmi kenegaraan yang kokoh di atas toga, pilihlah Bludru Double Layer. Jika Anda menginginkan kilau ceria yang modern, Satin adalah pilihan tepat. Keduanya bisa selesai kilat dalam 24 jam di Selempang Aceh Barat!",
    },
  },
  {
    id: "post-3",
    slug: "checklist-persiapan-hari-wisuda-aceh-barat",
    title: "Checklist Lengkap Persiapan Hari Wisuda di Aceh Barat: Dari Fitting Hingga Foto Studio",
    excerpt:
      "Panduan lengkap jadwal sewa, durasi booking 3 hari tanpa denda kilat, tips merawat setelan jas tetap wangi, dan checklist perlengkapan wisuda di Meulaboh.",
    category: "Panduan Wisuda",
    categoryBadge: "Checklist Hari-H",
    readTime: "6 menit baca",
    date: "02 Feb 2026",
    datePublished: "2026-02-02T10:00:00+07:00",
    dateModified: "2026-02-10T14:20:00+07:00",
    image:
      "https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?w=1200&h=630&auto=format&fit=crop&q=80",
    author: {
      name: "Fardi hd, S.P. (Selempang Aceh Barat)",
      role: "Head Stylist & Founder",
      avatar: "/Gambar/LOGOFHD.png",
    },
    tags: ["Checklist Wisuda", "Tips Wisudawan", "Studio Foto Meulaboh", "Sewa Jas"],
    relatedProductSlug: "sewa-sepatu-pantofel",
    content: {
      intro:
        "Menjelang hari wisuda akbar di Aceh Barat, kepanikan mendadak sering melanda wisudawan: mulai dari kancing jas lepas, ukuran sepatu pantofel lecet, hingga salah bordir gelar akademik pada selempang wisuda. Agar hari bahagia Anda berjalan santai dan berkesan, berikut panduan checklist lengkap H-7 hingga Hari-H.",
      sections: [
        {
          heading: "H-7: Pastikan Booking Jas & Konfirmasi Bordir Selempang",
          body: [
            "Musim wisuda kampus di Meulaboh (UTU, STAIN Meulaboh, dan AKN) biasanya berlangsung serentak. Permintaan sewa jas dan selempang custom melonjak drastis hingga 300%.",
            "Lakukan booking ukuran jas minimal satu minggu sebelumnya. Di Selempang Aceh Barat, Anda dapat mengamankan tanggal tanpa khawatir kehabisan stok jas slim-fit favorit.",
          ],
          list: [
            "Kirimkan draft tulisan nama dan gelar lengkap untuk diverifikasi tim bordir komputer kami.",
            "Tentukan jenis dasi: dasi panjang formal hitam/navy atau dasi kupu-kupu pesta.",
            "Cek ketersediaan sepatu pantofel hitam kilap ukuran 39 sampai 44.",
          ],
        },
        {
          heading: "H-2: Gladi Bersih & Pengambilan Perlengkapan Wisuda",
          body: [
            "Ambil setelan jas dan selempang yang sudah dipesan. Masa sewa di Selempang Aceh Barat sangat fleksibel hingga 3 hari kalender penuh, sehingga Anda tidak terburu-buru mengembalikan barang saat masih berkumpul bersama keluarga besar.",
            "Gantung jas di hanger berbusa lebar dan hindari melipat jas di dalam tas ransel agar tidak kusut.",
          ],
          tip: "Semprotkan parfum pakaian dengan jarak 20 cm dari kain jas. Semua jas di Selempang Aceh Barat sudah dilaundry bersih dengan aroma segar siap pakai.",
        },
        {
          heading: "Hari-H Pagi: Checklist Busana Lengkap Sebelum Keluar Rumah",
          body: [
            "Bangun lebih awal untuk menghindari antrean foto atau kemacetan di jalan poros Alue Peunyareng Meulaboh. Pastikan item berikut sudah terpasang sempurna:",
          ],
          list: [
            "Kemeja putih berkerah kaku + manset berkancing rapi.",
            "Celana bahan formal hitam dengan ikat pinggang kulit senada.",
            "Jas wisuda pria / blazer wanita dengan kancing terpasang kokoh.",
            "Sepatu pantofel kulit hitam yang sudah disemir mengkilap + kaus kaki hitam panjang.",
            "Selempang wisuda bordir nama dan gelar disematkan peniti emas di bahu kanan.",
            "Toga, topi wisuda, medali kampus, dan map ijazah.",
          ],
        },
        {
          heading: "Sesi Foto Studio Bersama Orang Tua & Sahabat",
          body: [
            "Setelah prosesi sakral di kampus selesai, luangkan waktu ke studio foto wisuda di Meulaboh bersama orang tua dan sahabat seperjuangan.",
            "Setelan jas yang rapi dan selempang bordir benang emas akan terlihat sangat tajam dan berkelas di pigura foto keluarga ruang tamu Anda.",
          ],
        },
      ],
      conclusion:
        "Persiapan matang menghasilkan senyuman terindah di panggung wisuda. Tim Selempang Aceh Barat siap mendampingi kebutuhan busana wisuda Anda dari awal hingga akhir dengan pelayanan ramah dan profesional.",
    },
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return ALL_BLOG_POSTS;
}

export function getAllBlogSlugs(): string[] {
  return ALL_BLOG_POSTS.map((post) => post.slug);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return ALL_BLOG_POSTS.find((post) => post.slug === slug || post.id === slug);
}
