-- =============================================================================
-- Migrasi Database Fase 4: Tabel Model Opsi Relasi (sc_model_custom_options / model_options)
-- Ref Task: kustomisasi-selempang-dinamis/pilih-model-opsi/buat-migrasi-tabel-model-opsi-relasi
-- Usaha: Selempang Aceh Barat (FHD)
-- Tujuan: Menghubungkan model selempang dengan opsi kustom tanpa duplikasi definisi,
--         serta menyediakan dukungan harga_override per model (mis. 5 opsi bersama
--         pada model leher dengan override 0 untuk paket all-inclusive).
-- =============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Tabel Utama: sc_model_custom_options (Tabel Relasi Many-to-Many)
CREATE TABLE IF NOT EXISTS `sc_model_custom_options` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `model_id` INT NOT NULL,
  `option_id` INT NOT NULL,
  `harga_override` DECIMAL(12, 2) NULL COMMENT 'Harga khusus model ini, NULL berarti memakai harga default custom_options',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uq_model_option` (`model_id`, `option_id`),
  INDEX `idx_sc_mco_model` (`model_id`),
  INDEX `idx_sc_mco_option` (`option_id`),
  CONSTRAINT `fk_mco_model` FOREIGN KEY (`model_id`) REFERENCES `sc_product_models` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_mco_option` FOREIGN KEY (`option_id`) REFERENCES `sc_custom_options` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. View Kanonis: model_options (Sesuai Spesifikasi PRD Kustomisasi Selempang Dinamis)
CREATE OR REPLACE VIEW `model_options` AS
SELECT
  `id`,
  `model_id`,
  `option_id`,
  `harga_override`,
  `created_at`,
  `updated_at`
FROM `sc_model_custom_options`;

-- 3. View Helper: v_model_active_options (Relasi Lengkap Siap Pakai di Frontend & API)
CREATE OR REPLACE VIEW `v_model_active_options` AS
SELECT
  mo.`id` AS `relation_id`,
  mo.`model_id`,
  pm.`nama` AS `model_nama`,
  pm.`slug` AS `model_slug`,
  pm.`harga_dasar` AS `model_harga_dasar`,
  co.`id` AS `option_id`,
  co.`slug` AS `option_slug`,
  co.`nama` AS `option_nama`,
  co.`deskripsi` AS `option_deskripsi`,
  co.`harga` AS `option_harga_default`,
  mo.`harga_override`,
  COALESCE(mo.`harga_override`, co.`harga`) AS `effective_price`,
  og.`id` AS `group_id`,
  og.`slug` AS `group_slug`,
  og.`nama_grup`,
  og.`max_pilih`,
  og.`is_required`
FROM `sc_model_custom_options` mo
JOIN `sc_product_models` pm ON mo.`model_id` = pm.`id`
JOIN `sc_custom_options` co ON mo.`option_id` = co.`id`
LEFT JOIN `sc_option_groups` og ON co.`group_id` = og.`id`
ORDER BY mo.`model_id` ASC, og.`id` ASC, co.`id` ASC;

-- 4. Initial Seed Data Relasi Model ↔ Opsi (Aman Mode Draft)
INSERT INTO `sc_model_custom_options` (`id`, `model_id`, `option_id`, `harga_override`)
VALUES
  -- Model 1: Selempang Model Biasa (Menyamping) -> Renda biasa/mahkota/marsyanda, les pinggir, rumbai, logo
  (1, 1, 101, NULL),     -- Renda Biasa -> Rp5.000 (default)
  (2, 1, 102, NULL),     -- Renda Mahkota -> Rp7.000 (default)
  (3, 1, 103, NULL),     -- Renda Marsyanda -> Rp7.000 (default)
  (4, 1, 201, NULL),     -- Les Pinggir -> Rp5.000 (default)
  (5, 1, 202, NULL),     -- Rumbai Pinggir/Ujung -> Rp15.000 (default)
  (6, 1, 401, NULL),     -- Bordir Logo -> Rp10.000 (default)

  -- Model 2: Selempang Model Leher / Syal -> Berbagi opsi leher tanpa duplikasi definisi
  (7, 2, 301, NULL),     -- Motif Ujung -> Rp5.000 (default)
  (8, 2, 302, NULL),     -- Motif Tengah -> Rp5.000 (default)
  (9, 2, 201, 10000.00), -- Les Pinggir -> override Rp10.000 (karena 2 sisi leher)
  (10, 2, 303, NULL),    -- Renda Syal -> Rp15.000 (default)
  (11, 2, 203, NULL),    -- Rumbai Ujung Syal -> Rp15.000 (default)
  (12, 2, 401, NULL),    -- Bordir Logo -> Rp10.000 (default)

  -- Model 3: Selempang Model Leher Timbal Balik (Memiliki opsi custom yang sama dengan Model Leher / Syal)
  (13, 3, 301, NULL),    -- Motif Ujung -> Rp5.000
  (14, 3, 302, NULL),    -- Motif Tengah -> Rp5.000
  (15, 3, 201, 10000.00),-- Les Pinggir -> Rp10.000 (2 sisi leher)
  (16, 3, 303, NULL),    -- Renda Syal -> Rp15.000
  (17, 3, 203, NULL),    -- Rumbai Ujung Syal -> Rp15.000
  (18, 3, 401, NULL)     -- Bordir Logo -> Rp10.000
ON DUPLICATE KEY UPDATE
  `harga_override` = VALUES(`harga_override`);

SET FOREIGN_KEY_CHECKS = 1;

-- =============================================================================
-- Verifikasi Query:
-- SELECT * FROM model_options;
-- SELECT * FROM v_model_active_options WHERE model_id = 2;
-- =============================================================================
