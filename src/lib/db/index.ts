import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

export type MySqlConfig =
  | { uri: string }
  | {
      host: string;
      port: number;
      user: string;
      password: string;
      database: string;
    };

let pool: mysql.Pool | null = null;

export function getMySqlConfig(): MySqlConfig | null {
  const dbUrl = process.env.DATABASE_URL || process.env.MYSQL_URL;
  if (dbUrl && dbUrl.trim() !== "") {
    return { uri: dbUrl.trim() };
  }

  const isProduction = process.env.NODE_ENV === "production";
  // Pada deployment Hostinger, aplikasi Node.js mengakses MySQL lokal via 127.0.0.1 (bukan srv1409.hstgr.io yang khusus akses remote luar)
  let host =
    process.env.DB_HOST ||
    process.env.MYSQL_HOST ||
    (isProduction ? "127.0.0.1" : "srv1409.hstgr.io");
  let port = parseInt(
    process.env.DB_PORT || process.env.MYSQL_PORT || "3306",
    10
  );
  let user =
    process.env.DB_USER ||
    process.env.MYSQL_USER ||
    "u911912137_SelempangABAR";
  let password =
    process.env.DB_PASSWORD ||
    process.env.DB_PASS ||
    process.env.MYSQL_PASSWORD;
  let database =
    process.env.DB_NAME ||
    process.env.MYSQL_DATABASE ||
    process.env.MYSQL_DB ||
    "u911912137_Selempag4ceh";

  // Fallback membaca .env.db-migration.local di lingkungan lokal jika env belum dimuat
  if (!password) {
    try {
      const localEnvPath = path.join(process.cwd(), ".env.db-migration.local");
      if (fs.existsSync(localEnvPath)) {
        const raw = fs.readFileSync(localEnvPath, "utf-8");
        for (const line of raw.split("\n")) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#")) continue;
          const eq = trimmed.indexOf("=");
          if (eq !== -1) {
            const k = trimmed.slice(0, eq).trim();
            let v = trimmed.slice(eq + 1).trim();
            if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
              v = v.slice(1, -1);
            }
            if (k === "DB_PASSWORD" || k === "MYSQL_PASSWORD" || k === "DB_PASS") password = v;
            if (k === "DB_HOST" || k === "MYSQL_HOST") host = v;
            if (k === "DB_USER" || k === "MYSQL_USER") user = v;
            if (k === "DB_NAME" || k === "MYSQL_DATABASE") database = v;
            if (k === "DB_PORT" || k === "MYSQL_PORT") port = parseInt(v, 10);
          }
        }
      }
    } catch {
      // Abaikan jika tidak dapat membaca file lokal
    }
  }

  if (!password) {
    return null; // MySQL password not yet provided
  }

  return { host, port, user, password, database };
}

export function isMySqlConfigured(): boolean {
  return getMySqlConfig() !== null;
}

export async function getDbPool(): Promise<mysql.Pool | null> {
  const config = getMySqlConfig();
  if (!config) return null;

  if (!pool) {
    try {
      if ("uri" in config) {
        pool = mysql.createPool(config.uri);
      } else {
        const isLocal =
          config.host === "127.0.0.1" ||
          config.host === "localhost" ||
          config.host === "::1";

        pool = mysql.createPool({
          host: config.host,
          port: config.port,
          user: config.user,
          password: config.password,
          database: config.database,
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
          connectTimeout: 10000,
          ...(isLocal ? {} : { ssl: { rejectUnauthorized: false } }),
        });
      }
    } catch (e) {
      console.error("[Database] Gagal menginisialisasi MySQL connection pool:", e);
      return null;
    }
  }

  return pool;
}

// ─── Dedicated Catalog Database Connection (u911912137_Selempag4ceh) ────────
let catalogPool: mysql.Pool | null = null;

export function getCatalogMySqlConfig(): MySqlConfig | null {
  const catalogDbUrl =
    process.env.CATALOG_DATABASE_URL || process.env.CATALOG_MYSQL_URL;
  if (catalogDbUrl && catalogDbUrl.trim() !== "") {
    return { uri: catalogDbUrl.trim() };
  }

  const isProduction = process.env.NODE_ENV === "production";
  let host =
    process.env.CATALOG_DB_HOST ||
    process.env.CATALOG_MYSQL_HOST ||
    process.env.DB_HOST ||
    process.env.MYSQL_HOST ||
    (isProduction ? "127.0.0.1" : "srv1409.hstgr.io");
  let port = parseInt(
    process.env.CATALOG_DB_PORT ||
      process.env.CATALOG_MYSQL_PORT ||
      process.env.DB_PORT ||
      process.env.MYSQL_PORT ||
      "3306",
    10
  );
  let user =
    process.env.CATALOG_DB_USER ||
    process.env.CATALOG_MYSQL_USER ||
    process.env.DB_USER ||
    process.env.MYSQL_USER ||
    "u911912137_SelempangABAR";
  let password =
    process.env.CATALOG_DB_PASSWORD ||
    process.env.CATALOG_DB_PASS ||
    process.env.CATALOG_MYSQL_PASSWORD ||
    process.env.DB_PASSWORD ||
    process.env.DB_PASS ||
    process.env.MYSQL_PASSWORD;
  let database =
    process.env.CATALOG_DB_NAME ||
    process.env.CATALOG_MYSQL_DATABASE ||
    process.env.DB_NAME ||
    process.env.MYSQL_DATABASE ||
    "u911912137_Selempag4ceh";

  // Fallback membaca .env.db-migration.local di environment lokal jika env belum dimuat
  if (!password) {
    try {
      const localEnvPath = path.join(process.cwd(), ".env.db-migration.local");
      if (fs.existsSync(localEnvPath)) {
        const raw = fs.readFileSync(localEnvPath, "utf-8");
        for (const line of raw.split("\n")) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#")) continue;
          const eq = trimmed.indexOf("=");
          if (eq !== -1) {
            const k = trimmed.slice(0, eq).trim();
            let v = trimmed.slice(eq + 1).trim();
            if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
              v = v.slice(1, -1);
            }
            if (
              k === "DB_PASSWORD" ||
              k === "CATALOG_DB_PASSWORD" ||
              k === "MYSQL_PASSWORD"
            )
              password = v;
            if (k === "DB_HOST" || k === "CATALOG_DB_HOST" || k === "MYSQL_HOST")
              host = v;
            if (k === "DB_USER" || k === "CATALOG_DB_USER" || k === "MYSQL_USER")
              user = v;
            if (k === "DB_NAME" || k === "CATALOG_DB_NAME" || k === "MYSQL_DATABASE")
              database = v;
            if (k === "DB_PORT" || k === "CATALOG_DB_PORT" || k === "MYSQL_PORT")
              port = parseInt(v, 10);
          }
        }
      }
    } catch {
      // Abaikan jika tidak dapat membaca file lokal
    }
  }

  if (!password) {
    return null; // Password katalog belum tersedia
  }

  return { host, port, user, password, database };
}

export function isCatalogMySqlConfigured(): boolean {
  return getCatalogMySqlConfig() !== null;
}

export async function getCatalogDbPool(): Promise<mysql.Pool | null> {
  const config = getCatalogMySqlConfig();
  if (!config) return null;

  if (!catalogPool) {
    try {
      if ("uri" in config) {
        catalogPool = mysql.createPool(config.uri);
      } else {
        const isLocal =
          config.host === "127.0.0.1" ||
          config.host === "localhost" ||
          config.host === "::1";

        catalogPool = mysql.createPool({
          host: config.host,
          port: config.port,
          user: config.user,
          password: config.password,
          database: config.database,
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
          connectTimeout: 10000,
          ...(isLocal ? {} : { ssl: { rejectUnauthorized: false } }),
        });
      }
    } catch (e) {
      console.error("[Database] Gagal menginisialisasi Catalog MySQL connection pool:", e);
      return null;
    }
  }

  return catalogPool;
}

/**
 * Ensures required database tables exist in MySQL
 */
export async function initMySqlTables(): Promise<boolean> {
  const p = await getDbPool();
  if (!p) return false;

  try {
    const conn = await p.getConnection();
    try {
      // 1. Table sab_orders
      await conn.query(`
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
      `);

      // 2. Table sab_order_items
      await conn.query(`
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
      `);

      // 3. Table sab_payment_transactions
      await conn.query(`
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
      `);

      // 4. Table sab_audit_logs
      await conn.query(`
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
      `);

      // 5. Table sc_product_models (Fase 1: Sumber Kebenaran Model Selempang)
      await conn.query(`
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

      // 6. Table sc_option_groups (Fase 1: Aturan Grup Opsi & Maks Pilih)
      await conn.query(`
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

      // 7. Table sc_custom_options (Fase 1: Sumber Kebenaran Opsi Kustom)
      await conn.query(`
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
          INDEX idx_sc_options_status (status)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

      // 8. Table sc_model_custom_options (Fase 1: Relasi Model & Opsi dengan Harga Override)
      await conn.query(`
        CREATE TABLE IF NOT EXISTS sc_model_custom_options (
          id INT AUTO_INCREMENT PRIMARY KEY,
          model_id INT NOT NULL,
          option_id INT NOT NULL,
          harga_override DECIMAL(12, 2) NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          UNIQUE KEY uq_model_option (model_id, option_id),
          INDEX idx_sc_mco_model (model_id),
          INDEX idx_sc_mco_option (option_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

      // 9. Canonical Views (sash_models, option_groups, custom_options, model_options)
      await conn.query(`
        CREATE OR REPLACE VIEW sash_models AS
        SELECT id, slug, nama, short_name, harga_dasar, deskripsi, status, features_json, created_at, updated_at
        FROM sc_product_models;
      `);

      await conn.query(`
        CREATE OR REPLACE VIEW option_groups AS
        SELECT id, slug, nama_grup, deskripsi, max_pilih, is_required, created_at, updated_at
        FROM sc_option_groups;
      `);

      await conn.query(`
        CREATE OR REPLACE VIEW custom_options AS
        SELECT id, slug, group_id, nama, deskripsi, harga, status, created_at, updated_at
        FROM sc_custom_options;
      `);

      await conn.query(`
        CREATE OR REPLACE VIEW model_options AS
        SELECT id, model_id, option_id, harga_override, created_at, updated_at
        FROM sc_model_custom_options;
      `);

      // 10. Table sc_order_item_options (Snapshot Tiap Opsi per Item Pesanan)
      await conn.query(`
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
      `);

      // 11. Table sc_order_customizations (Snapshot Model, Harga Dasar & Opsi Pesanan)
      await conn.query(`
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

      return true;
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error("[Database] Error creating MySQL tables:", err);
    return false;
  }
}
