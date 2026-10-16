# STANDAR OPERASIONAL PROSEDUR (SOP) & ARSITEKTUR KATALOG SLEMPANG CUSTOM FHD
**Usaha:** Selempang Aceh Barat (FHD) — Bg Fardi, S.P
**Dokumen:** Spesifikasi Kanonis & Panduan Pemeliharaan Katalog Dinamis
**Versi:** 1.0.0 (Production Blueprint Aligned)
**Status Harga:** DRAFT (Wajib konfirmasi owner sebelum publikasi)

---

## 1. Arsitektur Basis Data Katalog & Transaksi

Sistem memisahkan tanggung jawab koneksi basis data antara katalog produk dinamis dan riwayat transaksi/pesanan lama guna menjamin stabilitas operasional toko:

1. **Koneksi Katalog Dinamis (`getCatalogMySqlConfig()`):**
   - Terhubung langsung ke MariaDB Hostinger pada database `u911912137_Selempag4ceh`.
   - Mengelola tabel katalog: `sc_product_models`, `sc_custom_options`, `sc_option_groups`, `sc_model_custom_options`.
   - Mengelola tabel snapshot pesanan: `sc_order_customizations` dan `sc_order_item_options`.
   - Menyediakan View Kanonis: `sash_models`, `custom_options`, `option_groups`, `model_options`, dan `v_model_active_options`.

2. **Koneksi & Perlindungan Transaksi (`orderStore.ts`):**
   - Transaksi diproses melalui Data Access Layer `orderStore`.
   - Mengutamakan penyimpanan pada tabel relasional `sab_orders` dan `sab_order_items`.
   - Dilengkapi fallback otomatis ke `.data/orders_store.json` sehingga pesanan pengujian lokal (misal: `#SAB-CUS-2633` dan `#SAB-CUS-2634`) tetap dapat diakses di halaman pelacakan `/pesanan/[orderId]`.
   - Integrasi Midtrans Snap/Core API dan verifikasi webhook SHA512 signature tetap terlindungi utuh.

---

## 2. Inventaris Tiga Model Selempang Kanonis

Seluruh sebutan lawas seperti "Model A/B/C" resmi dilarang dalam UI, API, dan dokumentasi. Sistem mewajibkan penggunaan nama lengkap kanonis berikut:

| ID | Slug | Nama Lengkap Resmi | Harga Dasar (Draft) | Keterangan & Karakteristik Desain |
|:---:|:---|:---|:---:|:---|
| **1** | `biasa` | **Selempang Model Biasa (Menyamping)** | Rp 50.000 | Model selempang klasik menyamping dari pundak ke pinggang, 1 lapis atau 2 lapis kain furing belakang. |
| **2** | `syal` | **Selempang Model Leher / Syal** | Rp 85.000 | Model gantung leher simetris dua sisi kanan-kiri dengan lis pinggiran dan ornamen bordir. |
| **3** | `timbal_balik` | **Selempang Model Leher Timbal Balik** | Rp 135.000 | Model leher mewah bolak-balik 2 sisi tampilan dengan bahan tebal premium. |

---

## 3. Opsi Kustomisasi & Aturan Kuota Grup (max_pilih)

Setiap model memiliki opsi tambahan yang diatur melalui tabel relasi `sc_model_custom_options` dan divalidasi ketat di sisi server via `catalogValidator.ts`:

### A. Opsi Dekorasi untuk Model Leher (Syal & Timbal Balik)
Kedua model leher memiliki opsi dekorasi dan tarif efektif yang sama:
- **Les Pinggir (List Pita Tepi)**: Rp 10.000 (menutupi kedua sisi kain).
- **Rumbai Ujung Syal**: Rp 15.000 (kedua ujung gantung leher).
- **Motif Ujung Bordir**: Rp 5.000.
- **Motif Tengah Bordir**: Rp 5.000.
- **Renda Syal Eksklusif**: Rp 15.000.
- **Bordir Logo Instansi/Kampus**: Rp 10.000.

### B. Aturan Grup Kuota (Enforced Server-Side)
- **Grup Renda (`max_pilih: 1`):** Pilihan antara Renda Biasa, Renda Mahkota, atau Renda Marsyanda bersifat eksklusif. Pelanggan hanya dapat memilih maksimal 1 jenis renda. Pelanggaran aturan akan langsung ditolak oleh API dengan HTTP 400.
- **Grup Logo (`max_pilih: 1`):** Maksimal 1 file logo kampus/instansi per item selempang.

---

## 4. Formula Perhitungan Harga & Alur Pembayaran

Perhitungan harga dilakukan sepenuhnya oleh server (`sashPricingService.ts`), bukan mengandalkan kalkulasi browser klien:

1. **Harga Satuan (Unit Price):**
   $$\text{Unit Price} = \text{Harga Dasar Model} + \sum \text{Harga Opsi Terpilih}$$
2. **Total Pesanan (Total Price):**
   $$\text{Total Price} = \text{Unit Price} \times \text{Kuantitas Unit}$$
3. **Skema Pembayaran Dua Tahap (DP 50% & Pelunasan 50%):**
   $$\text{DP Amount} = \lfloor \text{Total Price} \times 0.5 \rfloor$$
   $$\text{Balance Amount} = \text{Total Price} - \text{DP Amount}$$
   *Catatan:* Penjumlahan DP dan Balance selalu bernilai tepat sama dengan Total Price tanpa selisih pembulatan rupiah.

---

## 5. SOP Pemeliharaan & Perubahan Katalog

1. **Pengujian Koneksi:**
   Sebelum melakukan interaksi apa pun dengan database produksi, jalankan perintah audit baca-saja:
   ```bash
   npm run db:test
   ```
2. **Pelaksanaan Migrasi:**
   Migrasi hanya dijalankan melalui skrip resmi runner terpadu:
   ```bash
   npm run db:migrate
   ```
   Dilarang mengeksekusi file SQL secara serampangan atau membuat tabel manual di phpMyAdmin tanpa sinkronisasi file migrasi di version control.
3. **Status Draft Mandatori:**
   Seluruh entitas harga model dan opsi baru wajib berstatus `draft`. Nilai `draft` dilarang dialihkan ke `published` sampai ada persetujuan tertulis dari pemilik toko (Bg Fardi, S.P).
4. **Perlindungan Kredensial:**
   File kredensial `.env.local` dan `.env.db-migration.local` wajib berada di dalam `.gitignore` dan dilarang keras di-commit ke Git repositori.
