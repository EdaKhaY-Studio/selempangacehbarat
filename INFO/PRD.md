# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Sistem Informasi Sewa Jas, Sepatu & Custom Selempang Aceh Barat
**Proyek:** One-Stop Rental & Custom Sash Platform  
**Owner:** Bg Fardi, S.P (Meulaboh, Aceh Barat)  
**Architect:** PRDKENZ — Senior Product Architect, Knexu Studio  
**Versi Dokumen:** 1.0.0 (Production Blueprint)  
**Status:** Ready for Development  

---

## 1. Executive Summary & Problem Statement

### 1.1 Latar Belakang
Bisnis persewaan jas formal (`@sewajassepatu_acehbarat`) dan jasa pembuatan selempang wisuda bludru custom (`@selempang_acehbarat`) milik Bg Fardi di Meulaboh, Aceh Barat telah memiliki reputasi kuat dan rating Google Maps 5.0. Namun, seluruh operasional transaksi, pengecekan stok ukuran, dan konsultasi custom saat ini berjalan secara manual melalui DM Instagram dan WhatsApp.

### 1.2 Problem Statement
1. **Inefisiensi & Resiko Double-Booking:** Saat musim wisuda serentak (UTU, STAIN Meulaboh, AKN), pencatatan manual di buku/chat rawan tumpang tindih tanggal sewa pada jas dengan ukuran favorit (M dan L).
2. **Friksi Dua Entitas Akun:** Calon pelanggan bingung harus memesan jas di satu akun dan selempang di akun lain, padahal 90% wisudawan membutuhkan kedua produk tersebut secara bersamaan.
3. **Beban Chat Berulang (Time-Consuming FAQ):** Owner dan admin kehabisan waktu membalas pertanyaan yang sama setiap malam: *"Ukuran M ready tgl 20?", "Bisa request font selempang?", "Harga paket lengkap berapa?"*.
4. **Kehilangan Potensi Traffic Organik:** Tidak adanya website resmi menyebabkan pencarian lokal di Google seperti *"sewa jas meulaboh"* atau *"selempang wisuda aceh barat"* tidak tertangkap secara maksimal.

### 1.3 Visi Produk & Solusi
Membangun platform website terpadu berkecepatan tinggi dengan antarmuka gelap elegan (Tailor Atelier & Luxury Academic Aesthetic) yang mengintegrasikan:
- Katalog digital interaktif jas & sepatu beserta panduan ukuran (Size Recommender).
- Customizer live preview untuk selempang wisuda bordir bludru.
- Sistem booking dengan kalender anti double-booking real-time.
- Custom Checkout Page Midtrans Payment Gateway bertema website (QRIS glowing & VA 1-klik salin) yang dilengkapi fitur Sandbox Demo Switch.
- Asisten AI Customer Service 24/7 yang terhubung dengan notifikasi WhatsApp.

---

## 2. Target Audience & User Personas

| Persona | Profil & Kebutuhan | Pain Points Utama | Fitur Kunci yang Dibutuhkan |
| :--- | :--- | :--- | :--- |
| **Persona A: Mahasiswa Wisudawan / Yudisium** *(Tengku Rizki, 22 th, UTU Meulaboh)* | Butuh set jas lengkap (jas, kemeja, celana, dasi, sepatu) + selempang wisuda nama & gelar untuk yudisium/wisuda. | Takut jas kekecilan/kebesaran, takut selempang salah ejaan gelar, antre fitting lama. | Rekomendasi size otomatis (input TB/BB), Live Preview Selempang Custom, Paket Bundling Wisuda Hemat. |
| **Persona B: Calon Pengantin / Panitia Formal** *(Bang Teuku Mirza, 26 th, ASN Aceh Barat)* | Membutuhkan set jas pria premium, rompi, dan sepatu pantofel kilap untuk acara resepsi/lamaran formal. | Butuh kepastian ketersediaan H-7 tanpa harus bolak-balik datang ke toko fisik. | Kalender booking tanggal acara, jaminan kondisi pakaian wangi & siap pakai, payment transfer instan. |
| **Persona C: Owner & Pengelola Toko** *(Bg Fardi, S.P)* | Mengelola inventaris ratusan setelan jas berbagai ukuran dan antrean pesanan selempang bordir. | Capek balas chat DM/WA tengah malam, rekap manual transfer bank, lupa mengingatkan pengembalian H+1. | Dashboard booking kalender otomatis, notifikasi WhatsApp booking masuk, AI CS menjawab FAQ 24 jam. |

---

## 3. Product Scope & Functional Requirements (FR)

### FR-1: Landing Page Berkarakter Kuat (Executive Atelier Theme)
- **FR-1.1 Hero Section Sinematik:** Background image bertema *executive tailoring & golden graduation sash*, tipografi tegas elegan, badge status *“🔥 100% Ready Stock Musim Wisuda 2026”*, spotlight interactive effect.
- **FR-1.2 Value Proposition (4 Pilar Utama):**
  1. *Jaminan Pas & Rapi:* Fitting akurat, bahan wol premium, bebas kusut.
  2. *Bordir Komputer Presisi:* Selempang bludru halus dengan benang emas/perak anti-luntur.
  3. *Paket Lengkap Head-to-Toe:* Dari dasi, rompi, kemeja putih, jas, celana hingga sepatu pantofel.
  4. *Anti Double Booking:* Sistem kalender otomatis mengunci ketersediaan per tanggal.
- **FR-1.3 Interactive Bundling Booster:** Widget interaktif yang menampilkan diskon otomatis jika menyewa Jas Lengkap + Custom Selempang dalam 1 checkout.
- **FR-1.4 Social Proof & Lokasi Interaktif:** Showcase foto wisudawan UTU/STAIN, rating Google Maps 5.0, embed lokasi toko Jl. Imam Bonjol Drien Rampak.

### FR-2: Katalog & Size Guide Interaktif
- **FR-2.1 Filter & Kategori:**
  - *Paket Lengkap Jas:* Jas + Rompi + Kemeja + Celana + Dasi + Sepatu.
  - *Jas Satuan / Mix & Match:* Jas Single, Rompi Only, Celana Formal, Dasi Satin/Kupu-kupu, Sepatu Pantofel Pria/Wanita (Size 39-44).
  - *Selempang Wisuda Bludru:* Selempang 1 Lapis, Selempang 2 Lapis (Lapisan Belakang Furing Satin), List Pita Glitter / Renda Emas.
- **FR-2.2 Smart Size Recommender:** Pengguna memasukkan Tinggi Badan (cm) dan Berat Badan (kg) -> Sistem memberikan rekomendasi ukuran jas (S, M, L, XL, XXL) beserta detail lingkar dada & panjang lengan.
- **FR-2.3 Selempang Live Customizer:**
  - Pilihan Warna Kain: Hitam Pekat, Navy Midnight, Maroon Velvet, Hijau Botol.
  - Pilihan Warna Benang: Gold Metallic, Silver Metallic, White Diamond.
  - Input Teks Kiri & Kanan: Nama Lengkap + Gelar (contoh: *Cut Meutia, S.E.* / *Universitas Teuku Umar*).
  - Pilihan Jenis Font: Monotype Corsiva, Arial, Times New Roman, Lucida Calligraphy.
  - Pilihan Logo Kampus: Logo UTU, STAIN Meulaboh, USK, AKN, atau Logo Custom (Upload PNG).

### FR-3: Booking Engine & Anti Double-Booking
- **FR-3.1 Date-Range Picker Rental:**
  - Durasi standar rental: 3 Hari (H-1 Pengambilan, Hari H Acara, H+1 Pengembalian sebelum 20:00 WIB).
  - Validasi stok real-time: Jika jas ukuran L telah ter-booking penuh pada tanggal yang dipilih, opsi ukuran tersebut dinonaktifkan (disabled) secara otomatis dengan keterangan tanggal tersedia berikutnya.
- **FR-3.2 Cart & Jaminan Keamanan Rental:**
  - Formulir input identitas: Nama, Nomor WhatsApp (wajib valid), Kampus/Instansi, Foto KTP/KTM sebagai deposit jaminan sewa fisik saat pengambilan.

### FR-4: Custom Midtrans Checkout Engine (Dark Luxury UI)
- **FR-4.1 Custom Embedded UI (Non-Popup Snap):**
  - Halaman checkout kustom menggunakan desain kartu gelap (Zinc-950) dengan aksen emas.
  - Opsi Pembayaran: QRIS Dinamis (Glow border), Virtual Account (BCA, Mandiri, BSI Aceh, BRI, BNI), E-Wallet (GoPay, ShopeePay, Dana).
  - Tombol Salin 1-Klik untuk nomor rekening/VA dan nominal unik.
  - Countdown timer 15:00 menit untuk batas pembayaran.
- **FR-4.2 Sandbox Demo Mode Switch:**
  - Toggle tersembunyi/khusus admin di checkout demo: Tombol *"Simulate Midtrans Payment Success"*.
  - Menghasilkan confetti animasi Framer Motion, mengubah status transaksi menjadi *“LUNAS / TERKONFIRMASI”*, dan mengenerate invoice digital instan.

### FR-5: AI Customer Service 24/7 & Integrasi WhatsApp
- **FR-5.1 Autonomous Knowledge Retrieval:**
  - AI Assistant siap menjawab pertanyaan seputar lokasi toko, jam operasional (09.00 - 21.00 WIB), pricelist, size chart, dan panduan merawat jas.
- **FR-5.2 Automated WhatsApp Notification Triggers:**
  - *Trigger 1 (Pesanan Baru):* Kirim detail pesanan + link invoice ke WhatsApp Bg Fardi dan Pelanggan.
  - *Trigger 2 (H-1 Pengambilan):* Pengingat ke pelanggan: *"Halo [Nama], jas ukuran [Size] sudah siap diambil di Toko Drien Rampak hari ini ya!"*.
  - *Trigger 3 (H+1 Pengembalian):* Pengingat batas waktu pengembalian sebelum jam 20:00 WIB.

### FR-6: Simple Admin Panel
- **FR-6.1 Dashboard Kalender:** Tampilan kalender grid jadwal pengambilan dan pengembalian jas per hari.
- **FR-6.2 Order Management:** Mengubah status order (Menunggu Pembayaran -> Siap Diambil -> Sedang Dipakai -> Selesai Dikembalikan).

---

## 4. Non-Functional Requirements (NFR)

| Kategori | Spesifikasi & Standar |
| :--- | :--- |
| **Performance** | Page load time < 1.2 detik, Google PageSpeed Score > 90 (Mobile & Desktop), Core Web Vitals (LCP < 2.0s, CLS < 0.05). |
| **Mobile Responsiveness** | Mobile-First UI (90% pengguna adalah mahasiswa bertransaksi via ponsel Android/iOS). |
| **Security & Privacy** | Proteksi file upload KTP/KTM di storage aman terenkripsi, SSL 256-bit otomatis via Vercel Edge. |
| **Scalability & Hosting** | Zero-cost serverless stack: Next.js di Vercel Hobby Tier, Database PostgreSQL (Supabase/Neon Free Tier), Media Storage di Cloudinary/Uploadthing. |

---

## 5. User Flow & System Architecture

```
[Pengunjung Masuk] 
       │
       ▼
[Landing Page (Hero Sinematik & Karakter Kuat)]
       │
       ├───────────────┬────────────────────────┐
       ▼               ▼                        ▼
[Pilih Paket Jas]  [Custom Selempang]   [Bundling Hemat 2-in-1]
       │               │                        │
       └───────────────┼────────────────────────┘
                       ▼
       [Smart Size Recommender (TB/BB)]
                       │
                       ▼
       [Pilih Tanggal Acara (Cek Stok Real-Time)]
                       │
                       ▼
       [Isi Data Penyewa & Upload KTM/KTP]
                       │
                       ▼
       [Custom Midtrans Dark Checkout (QRIS / VA / Sandbox Demo)]
                       │
                       ▼
       [Payment Sukses + Confetti + Invoice Digital]
                       │
                       ▼
       [Notifikasi WhatsApp Otomatis ke Bg Fardi & Pelanggan]
```

---

## 6. Success Metrics & KPIs
1. **Zero Double-Booking:** 100% akurasi ketersediaan jas pada musim puncak wisuda.
2. **Peningkatan Conversion Rate:** Kenaikan pemesanan online sebesar 40% dalam 60 hari pertama setelah go-live.
3. **Peningkatan Average Order Value (AOV):** 60%+ penyewa jas mengambil paket bundling selempang bordir.
4. **Efisiensi Waktu Owner:** Menghemat 3-4 jam per hari dari beban membalas chat berulang.
