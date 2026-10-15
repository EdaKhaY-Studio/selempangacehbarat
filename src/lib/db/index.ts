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
  const dbUrl = process.env.DATABASE_URL;
  if (dbUrl && dbUrl.trim() !== "") {
    return { uri: dbUrl.trim() };
  }

  const host = process.env.DB_HOST || "127.0.0.1";
  const port = parseInt(process.env.DB_PORT || "3306", 10);
  const user = process.env.DB_USER || "u911912137_SELEMPANG";
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_NAME || "u911912137_Selempang";

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
        pool = mysql.createPool({
          host: config.host,
          port: config.port,
          user: config.user,
          password: config.password,
          database: config.database,
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
        });
      }
    } catch (e) {
      console.error("[Database] Gagal menginisialisasi MySQL connection pool:", e);
      return null;
    }
  }

  return pool;
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

      return true;
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error("[Database] Error creating MySQL tables:", err);
    return false;
  }
}
