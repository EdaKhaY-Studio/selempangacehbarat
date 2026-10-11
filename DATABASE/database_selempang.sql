-- Struktur Tabel & Data Produk Selempang Aceh Barat (FHD)
-- Import ke phpMyAdmin: Database u911912137_Selempang

CREATE TABLE IF NOT EXISTS `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `category` ENUM('selempang', 'sewa_pakaian', 'sewa_sepatu', 'konveksi') NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `material` VARCHAR(100) DEFAULT NULL,
  `colors` TEXT DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `stock_status` ENUM('ready', 'preorder', 'rented') DEFAULT 'ready'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `customer_name` VARCHAR(150) DEFAULT NULL,
  `phone_number` VARCHAR(30) NOT NULL,
  `item_ordered` VARCHAR(255) NOT NULL,
  `details` TEXT DEFAULT NULL,
  `total_price` DECIMAL(10,2) DEFAULT NULL,
  `event_date` DATE DEFAULT NULL,
  `status` ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data Awal Produk Selempang
INSERT INTO `products` (`category`, `name`, `price`, `material`, `colors`, `description`, `stock_status`) VALUES
('selempang', 'Selempang Bludru Basic', 50000.00, 'Bludru Premium', 'Hitam, Maron, Merah, Navy, Hijau, Ungu, Pink', '1 lapis bordir nama+gelar rapi mesin komputer', 'ready'),
('selempang', 'Selempang Bludru Double Renda', 65000.00, 'Bludru Premium', 'Hitam, Maron, Merah, Navy, Hijau, Ungu, Pink', 'Pita renda kilau gold/silver keliling', 'ready'),
('selempang', 'Selempang Bludru Logo Kampus', 85000.00, 'Bludru Premium', 'Hitam, Maron, Merah, Navy, Hijau, Ungu, Pink', 'Include logo universitas/fakultas bordir tebal', 'ready'),
('selempang', 'Selempang Bludru Double Side (2 Sisi)', 135000.00, 'Bludru Premium', 'Hitam, Maron, Navy', 'Bordir depan & belakang full custom', 'ready'),
('selempang', 'Selempang Satin Glossy Basic', 50000.00, 'Satin Glossy', '12 Pilihan Warna (Hitam, Maron, Gold, Navy, dll)', 'Bahan satin mengkilap elegan', 'ready'),

-- Data Awal Sewa Pakaian Formal
('sewa_pakaian', 'Sewa Jas Pria + Dasi', 50000.00, 'Semi-Wool / Formal', 'Hitam, Cream, Abu-Abu, Coklat, Maron', 'Setelan jas pria formal wisuda/sidang include dasi', 'ready'),
('sewa_pakaian', 'Sewa Jas Wanita', 35000.00, 'Formal Blend', 'Hitam, Cream, Abu-Abu, Coklat, Maron', 'Jas wanita slimfit ukuran S sampai XXL', 'ready'),
('sewa_pakaian', 'Sewa Kemeja Putih Formal', 25000.00, 'Katun Oxford', 'Putih Bersih', 'Kemeja pria/wanita wangi siap pakai', 'ready'),
('sewa_pakaian', 'Sewa Celana Bahan Formal', 25000.00, 'Kain Formal', 'Hitam', 'Celana panjang pria bahan formal', 'ready'),
('sewa_pakaian', 'Sewa Rok Bahan Formal', 30000.00, 'Kain Formal', 'Hitam', 'Rok panjang wanita formal wisuda/sidang', 'ready'),
('sewa_pakaian', 'Sewa Dasi Saja', 15000.00, 'Satin/Polyester', 'Hitam, Maron, Biru', 'Dasi instan atau manual', 'ready'),

-- Data Awal Sewa Sepatu Pantofel
('sewa_sepatu', 'Sewa Sepatu Pantofel Pria', 35000.00, 'Kulit Sintetis', 'Hitam Kilap', 'Ukuran tersedia 39 s/d 44', 'ready'),
('sewa_sepatu', 'Sewa Sepatu Pantofel Wanita', 30000.00, 'Kulit Sintetis', 'Hitam Formal', 'Ukuran tersedia 36 s/d 41', 'ready');
