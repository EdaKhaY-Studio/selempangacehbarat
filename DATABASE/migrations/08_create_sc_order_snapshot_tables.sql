-- =============================================================================
-- Migrasi Database: Tabel Snapshot Opsi & Kustomisasi Pesanan
-- Ref Task: kustomisasi-selempang-dinamis/harga-otomatis-server/buat-migrasi-tabel-snapshot-opsi-pesanan
-- Usaha: Selempang Aceh Barat (FHD)
-- Tujuan: Menyimpan snapshot harga dasar model, nama resmi, rincian tiap opsi
--         tambahan beserta harganya saat transaksi dibuat, tanpa mengubah atau
--         merusak skema tabel orders/order_items yang ada.
-- =============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Tabel sc_order_item_options: Snapshot Tiap Opsi Tambahan per Item
CREATE TABLE IF NOT EXISTS `sc_order_item_options` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_item_id` VARCHAR(64) NOT NULL,
  `option_id` INT NULL,
  `option_slug` VARCHAR(50) NULL,
  `option_name` VARCHAR(150) NOT NULL,
  `group_name` VARCHAR(100) NOT NULL,
  `price` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_sc_oio_item` (`order_item_id`),
  INDEX `idx_sc_oio_slug` (`option_slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Tabel sc_order_customizations: Snapshot Spesifikasi Model & Total Harga
CREATE TABLE IF NOT EXISTS `sc_order_customizations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` VARCHAR(64) NOT NULL UNIQUE,
  `order_item_id` VARCHAR(64) NULL,
  `model_slug` VARCHAR(50) NOT NULL,
  `model_name` VARCHAR(150) NOT NULL,
  `base_price` DECIMAL(12, 2) NOT NULL,
  `total_options_price` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `unit_price` DECIMAL(12, 2) NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `total_price` DECIMAL(12, 2) NOT NULL,
  `custom_text` TEXT NULL,
  `cloth_material` VARCHAR(100) NULL,
  `cloth_color` VARCHAR(64) NULL,
  `thread_color` VARCHAR(64) NULL,
  `options_snapshot_json` TEXT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_sc_oc_order` (`order_id`),
  INDEX `idx_sc_oc_model` (`model_slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
