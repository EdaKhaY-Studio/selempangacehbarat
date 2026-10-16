/**
 * Data Access Layer & Migrasi untuk sc_model_custom_options (Fase 1 — Database Katalog Selempang)
 * Usaha: Selempang Aceh Barat (FHD)
 */

import { getCatalogDbPool } from "./index";
import {
  MOCK_MODEL_OPTIONS,
  getMockOptionsForModel,
  GroupedResolvedOptions,
  ResolvedOption,
} from "@/lib/catalog/mock-sash-catalog";
import type { RowDataPacket } from "mysql2/promise";

export interface ScModelCustomOption {
  id: number;
  model_id: number;
  option_id: number;
  harga_override: number | null;
  created_at?: Date;
  updated_at?: Date;
}

/**
 * Menjalankan migrasi DDL untuk tabel sc_model_custom_options
 */
export async function migrateModelCustomOptionsTable(): Promise<boolean> {
  const pool = await getCatalogDbPool();
  if (!pool) {
    console.log("[Migration] MySQL belum dikonfigurasi, migrasi sc_model_custom_options dilewati (menggunakan data tiruan fallback).");
    return false;
  }

  try {
    const conn = await pool.getConnection();
    try {
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

      // Buat view kanonis model_options sesuai skema PRD
      await conn.query(`
        CREATE OR REPLACE VIEW model_options AS
        SELECT id, model_id, option_id, harga_override, created_at, updated_at
        FROM sc_model_custom_options;
      `);

      console.log("[Migration] Tabel sc_model_custom_options & view model_options berhasil diverifikasi / dibuat.");
      return true;
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error("[Migration] Gagal menjalankan migrasi tabel sc_model_custom_options:", error);
    return false;
  }
}

/**
 * Mengisi seed data relasi model & opsi dengan harga_override aman
 */
export async function seedModelCustomOptionsDraft(): Promise<boolean> {
  const pool = await getCatalogDbPool();
  if (!pool) return false;

  try {
    const conn = await pool.getConnection();
    try {
      for (const rel of MOCK_MODEL_OPTIONS) {
        await conn.query(
          `
          INSERT INTO sc_model_custom_options (id, model_id, option_id, harga_override)
          VALUES (?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            harga_override = VALUES(harga_override)
        `,
          [rel.id, rel.model_id, rel.option_id, rel.harga_override]
        );
      }
      return true;
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error("[Migration] Gagal melakukan seeding sc_model_custom_options:", error);
    return false;
  }
}

/**
 * Mengambil opsi yang tersedia untuk model tertentu melalui JOIN database MySQL
 * Mendukung harga_override dan pengelompokan per option_group
 * Fallback ke mock data tiruan jika koneksi database belum tersedia.
 */
export async function getOptionsForModelFromDb(
  modelId: number
): Promise<GroupedResolvedOptions[]> {
  const pool = await getCatalogDbPool();
  if (!pool) {
    return getMockOptionsForModel(modelId);
  }

  try {
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query<RowDataPacket[]>(
        `
        SELECT
          mco.id AS relation_id,
          mco.model_id,
          mco.option_id,
          mco.harga_override,
          co.id AS option_id,
          co.slug AS option_slug,
          co.nama AS option_nama,
          co.deskripsi AS option_deskripsi,
          co.harga AS option_harga,
          co.status AS option_status,
          og.id AS group_id,
          og.slug AS group_slug,
          og.nama_grup AS group_nama_grup,
          og.deskripsi AS group_deskripsi,
          og.max_pilih AS group_max_pilih,
          og.is_required AS group_is_required
        FROM sc_model_custom_options mco
        JOIN sc_custom_options co ON co.id = mco.option_id
        LEFT JOIN sc_option_groups og ON og.id = co.group_id
        WHERE mco.model_id = ?
        ORDER BY og.id ASC, co.id ASC
      `,
        [modelId]
      );

      if (rows.length === 0) {
        return getMockOptionsForModel(modelId);
      }

      const groupMap = new Map<number, GroupedResolvedOptions>();

      for (const row of rows) {
        const groupId = row.group_id ? Number(row.group_id) : 0;
        const effectivePrice =
          row.harga_override !== null
            ? Number(row.harga_override)
            : Number(row.option_harga);

        if (!groupMap.has(groupId)) {
          groupMap.set(groupId, {
            group: {
              id: groupId,
              slug: String(row.group_slug || "lainnya"),
              nama_grup: String(row.group_nama_grup || "Tambahan Lainnya"),
              deskripsi: String(row.group_deskripsi || ""),
              max_pilih:
                row.group_max_pilih !== null
                  ? Number(row.group_max_pilih)
                  : null,
              is_required: Boolean(row.group_is_required),
            },
            options: [],
          });
        }

        const resolved: ResolvedOption = {
          relationId: Number(row.relation_id),
          effectivePrice,
          group: groupMap.get(groupId)!.group,
          option: {
            id: Number(row.option_id),
            slug: String(row.option_slug),
            group_id: groupId,
            nama: String(row.option_nama),
            deskripsi: row.option_deskripsi ? String(row.option_deskripsi) : undefined,
            harga: Number(row.option_harga),
            status: row.option_status === "published" ? "published" : "draft",
          },
        };

        groupMap.get(groupId)!.options.push(resolved);
      }

      return Array.from(groupMap.values());
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error("[ModelOptionsStore] Gagal membaca opsi relasi model:", error);
    return getMockOptionsForModel(modelId);
  }
}
