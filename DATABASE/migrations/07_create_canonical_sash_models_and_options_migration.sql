-- =============================================================================
-- Migrasi Database Fase 3: Tabel Model Selempang & Opsi Produk (Canonical & SC)
-- Ref Task: kustomisasi-selempang-dinamis/harga-otomatis-server/buat-migrasi-tabel-model-dan-opsi-produk
-- Usaha: Selempang Aceh Barat (FHD)
-- Tujuan: Menjamin keberadaan tabel model selempang (sash_models / sc_product_models)
--         dan opsi produk (custom_options / sc_custom_options) beserta aturan harga.
-- =============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Tabel Utama: sc_product_models (Alias Kanonis: sash_models)
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

-- View Kanonis: sash_models
CREATE OR REPLACE VIEW `sash_models` AS
SELECT
  `id`,
  `slug`,
  `nama`,
  `short_name`,
  `harga_dasar`,
  `deskripsi`,
  `status`,
  `features_json`,
  `created_at`,
  `updated_at`
FROM `sc_product_models`;

-- 2. Tabel Utama: sc_option_groups (Alias Kanonis: option_groups)
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

-- View Kanonis: option_groups
CREATE OR REPLACE VIEW `option_groups` AS
SELECT
  `id`,
  `slug`,
  `nama_grup`,
  `deskripsi`,
  `max_pilih`,
  `is_required`,
  `created_at`,
  `updated_at`
FROM `sc_option_groups`;

-- 3. Tabel Utama: sc_custom_options (Alias Kanonis: custom_options)
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

-- View Kanonis: custom_options
CREATE OR REPLACE VIEW `custom_options` AS
SELECT
  `id`,
  `slug`,
  `group_id`,
  `nama`,
  `deskripsi`,
  `harga`,
  `status`,
  `created_at`,
  `updated_at`
FROM `sc_custom_options`;

-- 4. Tabel Utama: sc_model_custom_options (Alias Kanonis: model_options)
CREATE TABLE IF NOT EXISTS `sc_model_custom_options` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `model_id` INT NOT NULL,
  `option_id` INT NOT NULL,
  `harga_override` DECIMAL(12, 2) NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uq_model_option` (`model_id`, `option_id`),
  INDEX `idx_sc_mco_model` (`model_id`),
  INDEX `idx_sc_mco_option` (`option_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- View Kanonis: model_options
CREATE OR REPLACE VIEW `model_options` AS
SELECT
  `id`,
  `model_id`,
  `option_id`,
  `harga_override`,
  `created_at`,
  `updated_at`
FROM `sc_model_custom_options`;

SET FOREIGN_KEY_CHECKS = 1;
