-- =============================================================================
-- Migrasi Database Fase 1: Tabel Grup Opsi (sc_option_groups)
-- Usaha: Selempang Aceh Barat (FHD)
-- Tujuan: Menyimpan aturan pengelompokan opsi dan penegakan kuota maks_pilih
-- =============================================================================

CREATE TABLE IF NOT EXISTS `sc_option_groups` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(50) NOT NULL UNIQUE,
  `nama_grup` VARCHAR(100) NOT NULL,
  `deskripsi` TEXT NULL,
  `max_pilih` INT NULL,
  `is_required` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_sc_groups_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initial Seed Data Grup Opsi
INSERT INTO `sc_option_groups` (`id`, `slug`, `nama_grup`, `deskripsi`, `max_pilih`, `is_required`)
VALUES
  (1, 'renda', 'Renda Keliling', 'Pilihan renda border selempang. Hanya boleh memilih maksimal 1 renda (sifat eksklusif).', 1, 0),
  (2, 'aksen_pinggir', 'Aksen Pinggir & Rumbai', 'Tambahan dekorasi lis pita atau rumbai tepi selempang.', NULL, 0),
  (3, 'motif_bordir', 'Motif Bordir Tambahan', 'Motif bordir komputer klasik khas selempang syal.', NULL, 0),
  (4, 'logo_instansi', 'Bordir Logo Kampus / Organisasi', 'Bordir logo multi-warna komputer di sudut atau dada.', 1, 0)
ON DUPLICATE KEY UPDATE
  `nama_grup` = VALUES(`nama_grup`),
  `deskripsi` = VALUES(`deskripsi`),
  `max_pilih` = VALUES(`max_pilih`),
  `is_required` = VALUES(`is_required`);
