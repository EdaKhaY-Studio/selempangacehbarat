-- =============================================================================
-- Migrasi Komprehensif: Tabel Model Selempang, Opsi Kustom & Relasi Katalog
-- Ref Task: kustomisasi-selempang-dinamis/isi-data-katalog/buat-migrasi-tabel-model-opsi-relasi-katalog
-- Usaha: Selempang Aceh Barat (FHD)
-- Deskripsi:
--   1. sc_product_models       : Model selempang resmi (Biasa, Syal, Timbal Balik)
--   2. sc_option_groups        : Pengelompokan opsi & aturan kuota (maks_pilih)
--   3. sc_custom_options       : Opsi dekorasi kustom (renda, aksen, motif, logo)
--   4. sc_model_custom_options : Relasi many-to-many model & opsi + harga override
-- =============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------------------------------
-- 1. Tabel sc_product_models
-- -----------------------------------------------------------------------------
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

-- -----------------------------------------------------------------------------
-- 2. Tabel sc_option_groups
-- -----------------------------------------------------------------------------
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

-- -----------------------------------------------------------------------------
-- 3. Tabel sc_custom_options
-- -----------------------------------------------------------------------------
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
  INDEX `idx_sc_options_status` (`status`),
  CONSTRAINT `fk_sc_options_group` FOREIGN KEY (`group_id`) REFERENCES `sc_option_groups`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 4. Tabel sc_model_custom_options (Relasi many-to-many + override)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `sc_model_custom_options` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `model_id` INT NOT NULL,
  `option_id` INT NOT NULL,
  `harga_override` DECIMAL(12, 2) NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uq_model_option` (`model_id`, `option_id`),
  INDEX `idx_sc_mco_model` (`model_id`),
  INDEX `idx_sc_mco_option` (`option_id`),
  CONSTRAINT `fk_sc_mco_model` FOREIGN KEY (`model_id`) REFERENCES `sc_product_models`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_sc_mco_option` FOREIGN KEY (`option_id`) REFERENCES `sc_custom_options`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

-- -----------------------------------------------------------------------------
-- Seeding Data Awal (Draft Mode Aman)
-- -----------------------------------------------------------------------------

-- 1. Models
INSERT INTO `sc_product_models` (`id`, `slug`, `nama`, `short_name`, `harga_dasar`, `deskripsi`, `status`, `features_json`)
VALUES
  (1, 'biasa', 'Selempang Model Biasa (Menyamping)', 'Model Biasa (Menyamping)', 50000.00, 'Selempang model klasik yang dikenakan menyamping dari bahu kanan ke pinggang kiri.', 'draft', '["Bordir komputer nama lengkap dan gelar akademik presisi","Kain bludru beludru 2 lapis atau satin kilap premium","Model klasik selempang bahu ke pinggang","Dapat dipadukan dengan renda mahkota/marsyanda dan les pinggir","Garansi 100% anti-typo ganti baru gratis"]'),
  (2, 'syal', 'Selempang Model Leher / Syal', 'Model Leher / Syal', 85000.00, 'Selempang bergaya syal elegan yang melingkari leher dan menjuntai simetris ke dada kiri dan kanan.', 'draft', '["Dikenakan melingkar leher jatuh simetris rapi ke dada","Ruang bordir nama, gelar, dan nama instansi di dua sisi","Pilihan motif bordir ujung, motif tengah, dan rumbai","Bahan kain bludru ganda atau satin mewah anti kusut","Garansi 100% anti-typo ganti baru gratis"]'),
  (3, 'timbal_balik', 'Selempang Model Leher Timbal Balik', 'Model Leher Timbal Balik', 135000.00, 'Selempang premium dengan konstruksi dua sisi timbal balik bolak-balik eksklusif.', 'draft', '["Desain dua sisi bolak-balik timbal balik eksklusif","Kerapian jahitan dan furing ganda atelier standar butik","Bisa dua warna berbeda luar-dalam sesuai selera","Harga paket all-inclusive Rp135.000 flat terlengkap","Garansi 100% anti-typo ganti baru gratis"]')
ON DUPLICATE KEY UPDATE
  `nama` = VALUES(`nama`),
  `short_name` = VALUES(`short_name`),
  `harga_dasar` = VALUES(`harga_dasar`),
  `deskripsi` = VALUES(`deskripsi`),
  `features_json` = VALUES(`features_json`);

-- 2. Option Groups
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

-- 3. Custom Options
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

-- 4. Relations & Overrides
INSERT INTO `sc_model_custom_options` (`id`, `model_id`, `option_id`, `harga_override`)
VALUES
  -- Model 1: Biasa
  (1, 1, 101, NULL),
  (2, 1, 102, NULL),
  (3, 1, 103, NULL),
  (4, 1, 201, NULL),
  (5, 1, 202, NULL),
  (6, 1, 401, NULL),

  -- Model 2: Syal
  (7, 2, 301, NULL),
  (8, 2, 302, NULL),
  (9, 2, 201, 10000.00),
  (10, 2, 303, NULL),
  (11, 2, 203, NULL),
  (12, 2, 401, NULL),

  -- Model 3: Selempang Model Leher Timbal Balik (Memiliki opsi custom yang sama dengan Model Leher / Syal)
  (13, 3, 301, NULL),    -- Motif Ujung -> Rp5.000
  (14, 3, 302, NULL),    -- Motif Tengah -> Rp5.000
  (15, 3, 201, 10000.00),-- Les Pinggir -> Rp10.000 (2 sisi leher)
  (16, 3, 303, NULL),    -- Renda Syal -> Rp15.000
  (17, 3, 203, NULL),    -- Rumbai Ujung Syal -> Rp15.000
  (18, 3, 401, NULL)     -- Bordir Logo -> Rp10.000
ON DUPLICATE KEY UPDATE
  `harga_override` = VALUES(`harga_override`);
