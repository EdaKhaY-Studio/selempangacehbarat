-- =============================================================================
-- Migrasi Database Fase 1: Tabel Opsi Kustom (sc_custom_options)
-- Usaha: Selempang Aceh Barat (FHD)
-- Tujuan: Menyimpan opsi tambahan (renda, aksen, motif, logo) beserta harga resmi.
-- Catatan Keamanan: Seluruh data baru bertatus 'draft' sampai struktur diverifikasi.
-- =============================================================================

CREATE TABLE IF NOT EXISTS `sc_custom_options` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(50) NOT NULL UNIQUE,
  `group_id` INT NULL,
  `nama` VARCHAR(150) NOT NULL,
  `deskripsi` TEXT NULL,
  `harga` DECIMAL(12, 2) NOT NULL,
  `status` ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_sc_options_slug` (`slug`),
  INDEX `idx_sc_options_group` (`group_id`),
  INDEX `idx_sc_options_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initial Draft Seed Data (Aman Mode Draft)
INSERT INTO `sc_custom_options` (`id`, `slug`, `group_id`, `nama`, `deskripsi`, `harga`, `status`)
VALUES
  (101, 'renda_biasa', 1, 'Renda Biasa', 'Renda rajut benang metalik standar', 5000.00, 'draft'),
  (102, 'renda_mahkota', 1, 'Renda Mahkota', 'Renda motif mahkota timbul mewah', 7000.00, 'draft'),
  (103, 'renda_marsyanda', 1, 'Renda Marsyanda', 'Renda pola lekuk Marsyanda elegan', 7000.00, 'draft'),
  (201, 'les_pinggir', 2, 'Les Pinggir', 'Pita lis pinggir warna emas/perak', 5000.00, 'draft'),
  (202, 'rumbai', 2, 'Rumbai Pinggir / Ujung', 'Rumbai benang emas berkilau di ujung selempang', 15000.00, 'draft'),
  (203, 'rumbai_ujung', 2, 'Rumbai Ujung Syal', 'Rumbai khusus kedua ujung model syal', 15000.00, 'draft'),
  (301, 'motif_ujung', 3, 'Motif Ujung', 'Ornamen floral bordir di kedua ujung selempang', 5000.00, 'draft'),
  (302, 'motif_tengah', 3, 'Motif Tengah', 'Ornamen motif simetris di bagian belakang leher', 5000.00, 'draft'),
  (303, 'renda_syal', 3, 'Renda Syal', 'Renda bordir keliling khusus model leher', 15000.00, 'draft'),
  (401, 'bordir_logo', 4, 'Bordir Logo', 'Bordir logo kampus/sekolah dengan benang bordir presisi', 10000.00, 'draft')
ON DUPLICATE KEY UPDATE
  `group_id` = VALUES(`group_id`),
  `nama` = VALUES(`nama`),
  `deskripsi` = VALUES(`deskripsi`),
  `harga` = VALUES(`harga`);
