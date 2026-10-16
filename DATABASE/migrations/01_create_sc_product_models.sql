-- =============================================================================
-- Migrasi Database Fase 1: Tabel Model Selempang (sc_product_models)
-- Usaha: Selempang Aceh Barat (FHD)
-- Tujuan: Memindahkan sumber kebenaran model selempang dari hardcoded ke MySQL.
-- Catatan Keamanan: Seluruh data baru bertatus 'draft' sampai struktur diverifikasi.
-- =============================================================================

CREATE TABLE IF NOT EXISTS `sc_product_models` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(50) NOT NULL UNIQUE,
  `nama` VARCHAR(150) NOT NULL,
  `short_name` VARCHAR(100) NOT NULL,
  `harga_dasar` DECIMAL(12, 2) NOT NULL,
  `deskripsi` TEXT NULL,
  `status` ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  `features_json` TEXT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_sc_models_slug` (`slug`),
  INDEX `idx_sc_models_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initial Draft Seed Data (Opsional / Aman Mode Draft)
INSERT INTO `sc_product_models` (`slug`, `nama`, `short_name`, `harga_dasar`, `deskripsi`, `status`, `features_json`)
VALUES
(
  'biasa',
  'Selempang Model Biasa (Menyamping)',
  'Model Biasa (Menyamping)',
  50000.00,
  'Selempang model klasik yang dikenakan menyamping dari bahu kanan ke pinggang kiri. Pilihan utama untuk wisuda, yudisium, pelantikan organisasi, dan penghargaan formal.',
  'draft',
  '["Bordir komputer nama lengkap dan gelar akademik presisi","Kain bludru beludru 2 lapis atau satin kilap premium","Model klasik selempang bahu ke pinggang","Dapat dipadukan dengan renda mahkota/marsyanda dan les pinggir","Garansi 100% anti-typo ganti baru gratis"]'
),
(
  'syal',
  'Selempang Model Leher / Syal',
  'Model Leher / Syal',
  85000.00,
  'Selempang bergaya syal elegan yang melingkari leher dan menjuntai simetris ke dada kiri dan kanan. Memiliki ruang bordir nama di kedua sisi serta ornamen motif ujung dan rumbai.',
  'draft',
  '["Dikenakan melingkar leher jatuh simetris rapi ke dada","Ruang bordir nama, gelar, dan nama instansi di dua sisi","Pilihan motif bordir ujung, motif tengah, dan rumbai","Bahan kain bludru ganda atau satin mewah anti kusut","Garansi 100% anti-typo ganti baru gratis"]'
),
(
  'timbal_balik',
  'Selempang Model Leher Timbal Balik',
  'Model Leher Timbal Balik',
  135000.00,
  'Selempang premium dengan konstruksi dua sisi timbal balik bolak-balik eksklusif. Memungkinkan dua kombinasi warna kain atau dua set tulisan bordir berbeda di sisi luar dan sisi dalam.',
  'draft',
  '["Desain dua sisi bolak-balik timbal balik eksklusif","Kerapian jahitan dan furing ganda atelier standar butik","Bisa dua warna berbeda luar-dalam sesuai selera","Harga paket all-inclusive Rp135.000 flat terlengkap","Garansi 100% anti-typo ganti baru gratis"]'
)
ON DUPLICATE KEY UPDATE
  `nama` = VALUES(`nama`),
  `short_name` = VALUES(`short_name`),
  `harga_dasar` = VALUES(`harga_dasar`),
  `deskripsi` = VALUES(`deskripsi`),
  `features_json` = VALUES(`features_json`);
