/**
 * Data Access Layer untuk Snapshot Opsi & Kustomisasi Pesanan
 * Tabel: sc_order_item_options & sc_order_customizations
 * Usaha: Selempang Aceh Barat (FHD)
 */

import { getDbPool } from "./index";
import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";

export interface ScOrderItemOptionSnapshot {
  id?: number;
  order_item_id: string;
  option_id?: number | null;
  option_slug?: string | null;
  option_name: string;
  group_name: string;
  price: number;
  created_at?: Date;
}

export interface ScOrderCustomizationSnapshot {
  id?: number;
  order_id: string;
  order_item_id?: string | null;
  model_slug: string;
  model_name: string;
  base_price: number;
  total_options_price: number;
  unit_price: number;
  quantity: number;
  total_price: number;
  custom_text?: string | null;
  cloth_material?: string | null;
  cloth_color?: string | null;
  thread_color?: string | null;
  options_snapshot_json?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

/**
 * Menyimpan snapshot rincian kustomisasi pesanan selempang (sc_order_customizations)
 */
export async function saveOrderCustomizationSnapshot(
  data: ScOrderCustomizationSnapshot
): Promise<boolean> {
  const pool = await getDbPool();
  if (!pool) return false;

  try {
    const conn = await pool.getConnection();
    try {
      await conn.query(
        `
        INSERT INTO sc_order_customizations (
          order_id, order_item_id, model_slug, model_name,
          base_price, total_options_price, unit_price, quantity, total_price,
          custom_text, cloth_material, cloth_color, thread_color, options_snapshot_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          model_slug = VALUES(model_slug),
          model_name = VALUES(model_name),
          base_price = VALUES(base_price),
          total_options_price = VALUES(total_options_price),
          unit_price = VALUES(unit_price),
          quantity = VALUES(quantity),
          total_price = VALUES(total_price),
          custom_text = VALUES(custom_text),
          cloth_material = VALUES(cloth_material),
          cloth_color = VALUES(cloth_color),
          thread_color = VALUES(thread_color),
          options_snapshot_json = VALUES(options_snapshot_json)
      `,
        [
          data.order_id,
          data.order_item_id || null,
          data.model_slug,
          data.model_name,
          data.base_price,
          data.total_options_price,
          data.unit_price,
          data.quantity,
          data.total_price,
          data.custom_text || null,
          data.cloth_material || null,
          data.cloth_color || null,
          data.thread_color || null,
          data.options_snapshot_json || null,
        ]
      );
      return true;
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error("[Database] Gagal menyimpan snapshot kustomisasi pesanan:", error);
    return false;
  }
}

/**
 * Menyimpan snapshot item-level opsi tambahan (sc_order_item_options)
 */
export async function saveOrderItemOptionsSnapshot(
  options: ScOrderItemOptionSnapshot[]
): Promise<boolean> {
  if (options.length === 0) return true;

  const pool = await getDbPool();
  if (!pool) return false;

  try {
    const conn = await pool.getConnection();
    try {
      for (const opt of options) {
        await conn.query(
          `
          INSERT INTO sc_order_item_options (
            order_item_id, option_id, option_slug, option_name, group_name, price
          ) VALUES (?, ?, ?, ?, ?, ?)
        `,
          [
            opt.order_item_id,
            opt.option_id || null,
            opt.option_slug || null,
            opt.option_name,
            opt.group_name,
            opt.price,
          ]
        );
      }
      return true;
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error("[Database] Gagal menyimpan snapshot opsi item:", error);
    return false;
  }
}

/**
 * Mengambil snapshot kustomisasi berdasarkan order_id
 */
export async function getOrderCustomizationSnapshot(
  orderId: string
): Promise<ScOrderCustomizationSnapshot | null> {
  const pool = await getDbPool();
  if (!pool) return null;

  try {
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query<RowDataPacket[]>(
        "SELECT * FROM sc_order_customizations WHERE order_id = ? LIMIT 1",
        [orderId]
      );
      if (rows.length === 0) return null;
      return rows[0] as ScOrderCustomizationSnapshot;
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error("[Database] Gagal membaca snapshot kustomisasi pesanan:", error);
    return null;
  }
}

/**
 * Mengambil snapshot opsi kustomisasi item berdasarkan order_item_id
 */
export async function getOrderItemOptionsSnapshot(
  orderItemId: string
): Promise<ScOrderItemOptionSnapshot[]> {
  const pool = await getDbPool();
  if (!pool) return [];

  try {
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query<RowDataPacket[]>(
        "SELECT * FROM sc_order_item_options WHERE order_item_id = ?",
        [orderItemId]
      );
      return rows as ScOrderItemOptionSnapshot[];
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error("[Database] Gagal membaca snapshot opsi item:", error);
    return [];
  }
}
