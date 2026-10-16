-- =============================================================================
-- Migrasi Database Fase 1: Relasi Model Selempang & Opsi (sc_model_custom_options)
-- Usaha: Selempang Aceh Barat (FHD)
-- Tujuan: Menghubungkan model dengan opsi kustom tanpa duplikasi definisi,
--         serta menyediakan kolom harga_override per model.
-- =============================================================================

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

-- Initial Seed Relasi Model & Opsi (Aman Mode Draft)
INSERT INTO `sc_model_custom_options` (`id`, `model_id`, `option_id`, `harga_override`)
VALUES
  -- Model 1: Biasa (Menyamping) -> Renda biasa/mahkota/marsyanda, les pinggir, rumbai, logo
  (1, 1, 101, NULL),
  (2, 1, 102, NULL),
  (3, 1, 103, NULL),
  (4, 1, 201, NULL),
  (5, 1, 202, NULL),
  (6, 1, 401, NULL),

  -- Model 2: Leher / Syal -> Berbagi opsi motif ujung, motif tengah, les pinggir (override 10rb), renda syal, rumbai ujung, logo
  (7, 2, 301, NULL),
  (8, 2, 302, NULL),
  (9, 2, 201, 10000.00),
  (10, 2, 303, NULL),
  (11, 2, 203, NULL),
  (12, 2, 401, NULL),

  -- Model 3: Leher Timbal Balik -> Memiliki opsi custom yang sama dengan Model Leher / Syal
  (13, 3, 301, NULL),    -- Motif Ujung -> Rp5.000
  (14, 3, 302, NULL),    -- Motif Tengah -> Rp5.000
  (15, 3, 201, 10000.00),-- Les Pinggir -> Rp10.000 (2 sisi leher)
  (16, 3, 303, NULL),    -- Renda Syal -> Rp15.000
  (17, 3, 203, NULL),    -- Rumbai Ujung Syal -> Rp15.000
  (18, 3, 401, NULL)     -- Bordir Logo -> Rp10.000
ON DUPLICATE KEY UPDATE
  `harga_override` = VALUES(`harga_override`);
