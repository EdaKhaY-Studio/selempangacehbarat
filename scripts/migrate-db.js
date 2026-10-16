/**
 * Script Migrasi Database MySQL Hostinger
 * Selempang Aceh Barat (FHD)
 *
 * Fitur:
 * - Idempoten (aman dijalankan berulang kali tanpa duplikasi data)
 * - Menjaga tabel transaksi lama (sab_orders, sab_order_items, sab_payment_transactions)
 * - Mengisi data kanonis model selempang & opsi kustom sesuai ketentuan bisnis
 * - Menggunakan nama lengkap:
 *     1. Selempang Model Biasa (Menyamping)
 *     2. Selempang Model Leher / Syal
 *     3. Selempang Model Leher Timbal Balik
 * - Opsi custom bersama untuk Model Leher & Model Leher Timbal Balik
 */

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const rootDir = process.cwd();
const envFilePath = path.join(rootDir, '.env.db-migration.local');

function parseEnv(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf8');
  const env = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      env[trimmed.slice(0, eqIdx).trim()] = val;
    }
  }
  return env;
}

async function runMigration() {
  console.log('=============================================================================');
  console.log('  MIGRASI DATABASE MYSQL HOSTINGER — SELEMPANG ACEH BARAT (FHD)              ');
  console.log('=============================================================================\n');

  if (!fs.existsSync(envFilePath)) {
    console.error('❌ ERROR: File konfigurasi .env.db-migration.local tidak ditemukan.');
    process.exit(1);
  }

  const envVars = parseEnv(envFilePath);
  const host = envVars.DB_HOST || envVars.MYSQL_HOST || 'srv1409.hstgr.io';
  const port = parseInt(envVars.DB_PORT || envVars.MYSQL_PORT || '3306', 10);
  const user = envVars.DB_USER || envVars.MYSQL_USER || 'u911912137_SelempangABAR';
  const password = envVars.DB_PASSWORD || envVars.MYSQL_PASSWORD || '';
  const database = envVars.DB_NAME || envVars.MYSQL_DATABASE || 'u911912137_Selempag4ceh';

  if (!password) {
    console.error('❌ ERROR: DB_PASSWORD belum diisi di .env.db-migration.local.');
    process.exit(1);
  }

  let connection;
  try {
    connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      database,
      multipleStatements: true,
      ssl: { rejectUnauthorized: false }
    });
  } catch {
    connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      database,
      multipleStatements: true
    });
  }

  try {
    // 0. Verifikasi database aktif sebelum menjalankan query apa pun
    const [dbCheck] = await connection.query('SELECT DATABASE() AS current_db, VERSION() AS version');
    const currentDb = dbCheck[0]?.current_db;
    console.log('• Database aktif: ' + currentDb);
    if (currentDb !== 'u911912137_Selempag4ceh') {
      console.error('\n❌ FATAL: Database aktif (' + currentDb + ') BUKAN u911912137_Selempag4ceh!');
      console.error('Migrasi dibatalkan demi keamanan database.');
      process.exit(1);
    }
    console.log('✓ Konfirmasi keamanan: Terhubung tepat ke u911912137_Selempag4ceh');

    // 1. Matikan sementara FK checks untuk migrasi aman
    await connection.query('SET FOREIGN_KEY_CHECKS = 0;');

    // 2. Buat tabel sc_product_models
    console.log('• Menyiapkan tabel sc_product_models...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS sc_product_models (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(50) NOT NULL UNIQUE,
        nama VARCHAR(150) NOT NULL,
        short_name VARCHAR(100) NOT NULL,
        harga_dasar DECIMAL(12, 2) NOT NULL,
        deskripsi TEXT NULL,
        status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
        features_json TEXT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_sc_models_slug (slug),
        INDEX idx_sc_models_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 3. Buat tabel sc_option_groups
    console.log('• Menyiapkan tabel sc_option_groups...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS sc_option_groups (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(50) NOT NULL UNIQUE,
        nama_grup VARCHAR(100) NOT NULL,
        deskripsi TEXT NULL,
        max_pilih INT NULL,
        is_required TINYINT(1) NOT NULL DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_sc_groups_slug (slug)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 4. Buat tabel sc_custom_options
    console.log('• Menyiapkan tabel sc_custom_options...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS sc_custom_options (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(50) NOT NULL UNIQUE,
        group_id INT NULL,
        nama VARCHAR(150) NOT NULL,
        deskripsi TEXT NULL,
        harga DECIMAL(12, 2) NOT NULL,
        status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_sc_options_slug (slug),
        INDEX idx_sc_options_group (group_id),
        INDEX idx_sc_options_status (status),
        CONSTRAINT fk_sc_options_group FOREIGN KEY (group_id) REFERENCES sc_option_groups(id) ON DELETE SET NULL ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 5. Buat tabel sc_model_custom_options
    console.log('• Menyiapkan tabel sc_model_custom_options...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS sc_model_custom_options (
        id INT AUTO_INCREMENT PRIMARY KEY,
        model_id INT NOT NULL,
        option_id INT NOT NULL,
        harga_override DECIMAL(12, 2) NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY uq_model_option (model_id, option_id),
        INDEX idx_sc_mco_model (model_id),
        INDEX idx_sc_mco_option (option_id),
        CONSTRAINT fk_sc_mco_model FOREIGN KEY (model_id) REFERENCES sc_product_models(id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_sc_mco_option FOREIGN KEY (option_id) REFERENCES sc_custom_options(id) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 6. Buat Views Kanonis
    console.log('• Menyiapkan views kanonis (sash_models, option_groups, custom_options, model_options, v_model_active_options)...');
    await connection.query(`
      CREATE OR REPLACE VIEW sash_models AS
      SELECT id, slug, nama, short_name, harga_dasar, deskripsi, status, features_json, created_at, updated_at
      FROM sc_product_models;

      CREATE OR REPLACE VIEW option_groups AS
      SELECT id, slug, nama_grup, deskripsi, max_pilih, is_required, created_at, updated_at
      FROM sc_option_groups;

      CREATE OR REPLACE VIEW custom_options AS
      SELECT id, slug, group_id, nama, deskripsi, harga, status, created_at, updated_at
      FROM sc_custom_options;

      CREATE OR REPLACE VIEW model_options AS
      SELECT id, model_id, option_id, harga_override, created_at, updated_at
      FROM sc_model_custom_options;

      CREATE OR REPLACE VIEW v_model_active_options AS
      SELECT
        mo.id AS relation_id,
        mo.model_id,
        pm.nama AS model_nama,
        pm.slug AS model_slug,
        pm.harga_dasar AS model_harga_dasar,
        co.id AS option_id,
        co.slug AS option_slug,
        co.nama AS option_nama,
        co.deskripsi AS option_deskripsi,
        co.harga AS option_harga_default,
        mo.harga_override,
        COALESCE(mo.harga_override, co.harga) AS effective_price,
        og.id AS group_id,
        og.slug AS group_slug,
        og.nama_grup,
        og.max_pilih,
        og.is_required
      FROM sc_model_custom_options mo
      JOIN sc_product_models pm ON mo.model_id = pm.id
      JOIN sc_custom_options co ON mo.option_id = co.id
      LEFT JOIN sc_option_groups og ON co.group_id = og.id
      ORDER BY mo.model_id ASC, og.id ASC, co.id ASC;
    `);

    // 7. Buat Tabel Transaksi Pesanan & Pembayaran (Jika belum ada, IF NOT EXISTS aman)
    console.log('• Menyiapkan tabel transaksi pesanan (sab_orders, sab_order_items, sab_payment_transactions)...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS sab_orders (
        id VARCHAR(64) PRIMARY KEY,
        order_number VARCHAR(32) UNIQUE NOT NULL,
        idempotency_key VARCHAR(64) UNIQUE NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(64) NOT NULL,
        customer_email VARCHAR(255) NULL,
        customer_institution VARCHAR(255) NULL,
        event_date VARCHAR(32) NOT NULL,
        target_date VARCHAR(32) NOT NULL,
        delivery_method VARCHAR(32) NOT NULL,
        delivery_address TEXT NULL,
        delivery_city VARCHAR(128) NULL,
        delivery_postal_code VARCHAR(32) NULL,
        schedule_notes TEXT NULL,
        total_product_amount INT NOT NULL,
        dp_amount INT NOT NULL,
        balance_amount INT NOT NULL,
        shipping_cost INT NOT NULL DEFAULT 0,
        payment_status VARCHAR(32) NOT NULL DEFAULT 'awaiting_deposit',
        production_status VARCHAR(32) NOT NULL DEFAULT 'awaiting_confirmation',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_order_number (order_number),
        INDEX idx_payment_status (payment_status),
        INDEX idx_production_status (production_status),
        INDEX idx_customer_phone (customer_phone)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

      CREATE TABLE IF NOT EXISTS sab_order_items (
        id VARCHAR(64) PRIMARY KEY,
        order_id VARCHAR(64) NOT NULL,
        model_type VARCHAR(32) NOT NULL,
        material VARCHAR(32) NOT NULL,
        cloth_color VARCHAR(64) NOT NULL,
        edge_tape_color VARCHAR(64) NOT NULL,
        thread_color VARCHAR(64) NOT NULL,
        custom_text TEXT NOT NULL,
        has_logo TINYINT NOT NULL DEFAULT 0,
        logo_url VARCHAR(512) NULL,
        decorations_json TEXT NULL,
        design_notes TEXT NULL,
        base_price INT NOT NULL,
        addons_price INT NOT NULL DEFAULT 0,
        unit_price INT NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        subtotal INT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_order_id (order_id),
        CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES sab_orders(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

      CREATE TABLE IF NOT EXISTS sab_payment_transactions (
        id VARCHAR(64) PRIMARY KEY,
        order_id VARCHAR(64) NOT NULL,
        payment_phase VARCHAR(32) NOT NULL,
        midtrans_order_id VARCHAR(128) UNIQUE NOT NULL,
        gross_amount INT NOT NULL,
        payment_method VARCHAR(64) NULL,
        transaction_status VARCHAR(32) NOT NULL,
        snap_token VARCHAR(255) NULL,
        snap_redirect_url VARCHAR(512) NULL,
        paid_at DATETIME NULL,
        raw_notification LONGTEXT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_tx_order_id (order_id),
        INDEX idx_tx_status (transaction_status),
        CONSTRAINT fk_payment_order FOREIGN KEY (order_id) REFERENCES sab_orders(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

      CREATE TABLE IF NOT EXISTS sab_audit_logs (
        id VARCHAR(64) PRIMARY KEY,
        order_id VARCHAR(64) NOT NULL,
        previous_status VARCHAR(64) NULL,
        new_status VARCHAR(64) NOT NULL,
        changed_by VARCHAR(128) NOT NULL,
        reason TEXT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_log_order_id (order_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

      CREATE TABLE IF NOT EXISTS sc_order_item_options (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_item_id VARCHAR(64) NOT NULL,
        option_id INT NULL,
        option_slug VARCHAR(50) NULL,
        option_name VARCHAR(150) NOT NULL,
        group_name VARCHAR(100) NOT NULL,
        price DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_sc_oio_item (order_item_id),
        INDEX idx_sc_oio_slug (option_slug)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

      CREATE TABLE IF NOT EXISTS sc_order_customizations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id VARCHAR(64) NOT NULL UNIQUE,
        order_item_id VARCHAR(64) NULL,
        model_slug VARCHAR(50) NOT NULL,
        model_name VARCHAR(150) NOT NULL,
        base_price DECIMAL(12, 2) NOT NULL,
        total_options_price DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
        unit_price DECIMAL(12, 2) NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        total_price DECIMAL(12, 2) NOT NULL,
        custom_text TEXT NULL,
        cloth_material VARCHAR(100) NULL,
        cloth_color VARCHAR(64) NULL,
        thread_color VARCHAR(64) NULL,
        options_snapshot_json TEXT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_sc_oc_order (order_id),
        INDEX idx_sc_oc_model (model_slug)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 8. Seeding Data Kanonis (Nama Lengkap & Aturan Bisnis Resmi)
    console.log('• Mengisi / menyinkronkan data katalog resmi...');

    // A. 3 Model Selempang Resmi
    await connection.query(`
      INSERT INTO sc_product_models (id, slug, nama, short_name, harga_dasar, deskripsi, status, features_json)
      VALUES
        (1, 'biasa', 'Selempang Model Biasa (Menyamping)', 'Model Biasa (Menyamping)', 50000.00, 'Selempang model klasik yang dikenakan menyamping dari bahu kanan ke pinggang kiri.', 'draft', '["Bordir komputer nama lengkap dan gelar akademik presisi","Kain bludru beludru 2 lapis atau satin kilap premium","Model klasik selempang bahu ke pinggang","Dapat dipadukan dengan renda mahkota/marsyanda dan les pinggir","Garansi 100% anti-typo ganti baru gratis"]'),
        (2, 'syal', 'Selempang Model Leher / Syal', 'Model Leher / Syal', 85000.00, 'Selempang bergaya syal elegan yang melingkari leher dan menjuntai simetris ke dada kiri dan kanan.', 'draft', '["Dikenakan melingkar leher jatuh simetris rapi ke dada","Ruang bordir nama, gelar, dan nama instansi di dua sisi","Pilihan motif bordir ujung, motif tengah, dan rumbai","Bahan kain bludru ganda atau satin mewah anti kusut","Garansi 100% anti-typo ganti baru gratis"]'),
        (3, 'timbal_balik', 'Selempang Model Leher Timbal Balik', 'Model Leher Timbal Balik', 135000.00, 'Selempang premium dengan konstruksi dua sisi timbal balik bolak-balik eksklusif.', 'draft', '["Desain dua sisi bolak-balik timbal balik eksklusif","Kerapian jahitan dan furing ganda atelier standar butik","Bisa dua warna berbeda luar-dalam sesuai selera","Pilihan opsi custom lengkap sesuai standar model leher","Garansi 100% anti-typo ganti baru gratis"]')
      ON DUPLICATE KEY UPDATE
        nama = VALUES(nama),
        short_name = VALUES(short_name),
        harga_dasar = VALUES(harga_dasar),
        deskripsi = VALUES(deskripsi),
        status = VALUES(status),
        features_json = VALUES(features_json);
    `);

    // B. 4 Grup Opsi
    await connection.query(`
      INSERT INTO sc_option_groups (id, slug, nama_grup, deskripsi, max_pilih, is_required)
      VALUES
        (1, 'renda', 'Renda Keliling', 'Pilihan renda border selempang. Hanya boleh memilih maksimal 1 renda (sifat eksklusif).', 1, 0),
        (2, 'aksen_pinggir', 'Aksen Pinggir & Rumbai', 'Tambahan dekorasi lis pita atau rumbai tepi selempang.', NULL, 0),
        (3, 'motif_bordir', 'Motif Bordir Tambahan', 'Motif bordir komputer klasik khas selempang syal.', NULL, 0),
        (4, 'logo_instansi', 'Bordir Logo Kampus / Organisasi', 'Bordir logo multi-warna komputer di sudut atau dada.', 1, 0)
      ON DUPLICATE KEY UPDATE
        nama_grup = VALUES(nama_grup),
        deskripsi = VALUES(deskripsi),
        max_pilih = VALUES(max_pilih),
        is_required = VALUES(is_required);
    `);

    // C. 10 Opsi Kustom
    await connection.query(`
      INSERT INTO sc_custom_options (id, slug, group_id, nama, deskripsi, harga, status)
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
        group_id = VALUES(group_id),
        nama = VALUES(nama),
        deskripsi = VALUES(deskripsi),
        harga = VALUES(harga),
        status = VALUES(status);
    `);

    // D. Relasi Model & Opsi (Model Leher & Model Leher Timbal Balik memiliki opsi custom yang sama)
    await connection.query(`
      INSERT INTO sc_model_custom_options (id, model_id, option_id, harga_override)
      VALUES
        -- Model 1: Selempang Model Biasa (Menyamping)
        (1, 1, 101, NULL),     -- Renda Biasa -> Rp5.000
        (2, 1, 102, NULL),     -- Renda Mahkota -> Rp7.000
        (3, 1, 103, NULL),     -- Renda Marsyanda -> Rp7.000
        (4, 1, 201, NULL),     -- Les Pinggir -> Rp5.000
        (5, 1, 202, NULL),     -- Rumbai Pinggir/Ujung -> Rp15.000
        (6, 1, 401, NULL),     -- Bordir Logo -> Rp10.000

        -- Model 2: Selempang Model Leher / Syal
        (7, 2, 301, NULL),     -- Motif Ujung -> Rp5.000
        (8, 2, 302, NULL),     -- Motif Tengah -> Rp5.000
        (9, 2, 201, 10000.00), -- Les Pinggir -> override Rp10.000 (2 sisi leher)
        (10, 2, 303, NULL),    -- Renda Syal -> Rp15.000
        (11, 2, 203, NULL),    -- Rumbai Ujung Syal -> Rp15.000
        (12, 2, 401, NULL),    -- Bordir Logo -> Rp10.000

        -- Model 3: Selempang Model Leher Timbal Balik (Memiliki opsi custom yang sama dengan Model Leher / Syal)
        (13, 3, 301, NULL),    -- Motif Ujung -> Rp5.000
        (14, 3, 302, NULL),    -- Motif Tengah -> Rp5.000
        (15, 3, 201, 10000.00),-- Les Pinggir -> Rp10.000 (2 sisi leher)
        (16, 3, 303, NULL),    -- Renda Syal -> Rp15.000
        (17, 3, 203, NULL),    -- Rumbai Ujung Syal -> Rp15.000
        (18, 3, 401, NULL)     -- Bordir Logo -> Rp10.000
      ON DUPLICATE KEY UPDATE
        harga_override = VALUES(harga_override);
    `);

    // 9. Aktifkan kembali FK checks
    await connection.query('SET FOREIGN_KEY_CHECKS = 1;');

    console.log('\n✓ Migrasi skema dan sinkronisasi data katalog BERHASIL!');

    // 10. Verifikasi Baca-Saja Mendalam
    console.log('\n--- 1. Verifikasi Daftar Tabel & View di Database ---');
    const [allTables] = await connection.query('SHOW FULL TABLES;');
    console.log('Total tabel & view terdaftar: ' + allTables.length);
    for (const row of allTables) {
      console.log('  • ' + Object.values(row)[0] + ' (' + Object.values(row)[1] + ')');
    }

    console.log('\n--- 2. Verifikasi Data Model Selempang (sash_models) ---');
    const [models] = await connection.query('SELECT id, slug, nama, short_name, harga_dasar, status FROM sash_models ORDER BY id ASC;');
    console.table(models);

    console.log('\n--- 3. Verifikasi Grup Opsi (option_groups) ---');
    const [groups] = await connection.query('SELECT id, slug, nama_grup, max_pilih, is_required FROM option_groups ORDER BY id ASC;');
    console.table(groups);

    console.log('\n--- 4. Verifikasi Opsi Kustom (custom_options) ---');
    const [options] = await connection.query('SELECT id, slug, group_id, nama, harga, status FROM custom_options ORDER BY id ASC;');
    console.table(options);

    console.log('\n--- 5. Verifikasi Relasi Model ↔ Opsi per Model (v_model_active_options) ---');
    const [relCount] = await connection.query(`
      SELECT model_id, model_nama, COUNT(*) AS total_opsi, MIN(effective_price) AS min_harga, MAX(effective_price) AS max_harga
      FROM v_model_active_options
      GROUP BY model_id, model_nama
      ORDER BY model_id ASC;
    `);
    console.table(relCount);

    console.log('\n--- 6. Verifikasi Kesetaraan Opsi Model Leher (Model 2) vs Model Timbal Balik (Model 3) ---');
    const [neckOptions] = await connection.query(`
      SELECT
        v.model_id,
        v.model_nama,
        v.option_id,
        v.option_nama,
        v.nama_grup,
        v.effective_price
      FROM v_model_active_options v
      WHERE v.model_id IN (2, 3)
      ORDER BY v.option_id ASC, v.model_id ASC;
    `);
    console.table(neckOptions);

    console.log('\n=============================================================================');
    console.log('  MIGRASI SELESAI & TERVERIFIKASI PENUH DI DATABASE u911912137_Selempag4ceh  ');
    console.log('=============================================================================\n');

  } finally {
    await connection.end();
  }
}

runMigration().catch(err => {
  console.error('\n❌ ERROR SAAT MIGRASI:', err.message);
  process.exit(1);
});
