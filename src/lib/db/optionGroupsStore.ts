/**
 * Data Access Layer & Migrasi untuk sc_option_groups (Fase 1 — Database Katalog Selempang)
 * Usaha: Selempang Aceh Barat (FHD)
 */

import { getCatalogDbPool } from "./index";
import { MOCK_OPTION_GROUPS, OptionGroupEntity } from "@/lib/catalog/mock-sash-catalog";
import type { RowDataPacket } from "mysql2/promise";

export interface ScOptionGroup {
  id: number;
  slug: string;
  nama_grup: string;
  deskripsi: string | null;
  max_pilih: number | null;
  is_required: boolean;
  created_at?: Date;
  updated_at?: Date;
}

/**
 * Menjalankan migrasi DDL untuk tabel sc_option_groups
 */
export async function migrateOptionGroupsTable(): Promise<boolean> {
  const pool = await getCatalogDbPool();
  if (!pool) {
    console.log("[Migration] MySQL belum dikonfigurasi, migrasi sc_option_groups dilewati (menggunakan data tiruan fallback).");
    return false;
  }

  try {
    const conn = await pool.getConnection();
    try {
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

      console.log("[Migration] Tabel sc_option_groups berhasil diverifikasi / dibuat.");
      return true;
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error("[Migration] Gagal menjalankan migrasi tabel sc_option_groups:", error);
    return false;
  }
}

/**
 * Mengisi seed data aturan grup opsi (termasuk max_pilih: 1 untuk renda eksklusif)
 */
export async function seedOptionGroupsDraft(): Promise<boolean> {
  const pool = await getCatalogDbPool();
  if (!pool) return false;

  try {
    const conn = await pool.getConnection();
    try {
      for (const g of MOCK_OPTION_GROUPS) {
        await conn.query(
          `
          INSERT INTO sc_option_groups (id, slug, nama_grup, deskripsi, max_pilih, is_required)
          VALUES (?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            nama_grup = VALUES(nama_grup),
            deskripsi = VALUES(deskripsi),
            max_pilih = VALUES(max_pilih),
            is_required = VALUES(is_required)
        `,
          [
            g.id,
            g.slug,
            g.nama_grup,
            g.deskripsi || null,
            g.max_pilih,
            g.is_required ? 1 : 0,
          ]
        );
      }
      return true;
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error("[Migration] Gagal melakukan seeding sc_option_groups:", error);
    return false;
  }
}

/**
 * Mengambil seluruh grup opsi dari database MySQL
 * Jika koneksi database belum tersedia, mengembalikan fallback dari mock data.
 */
export async function getAllOptionGroupsFromDb(): Promise<ScOptionGroup[]> {
  const pool = await getCatalogDbPool();
  if (!pool) {
    return MOCK_OPTION_GROUPS.map((g) => ({
      id: g.id,
      slug: g.slug,
      nama_grup: g.nama_grup,
      deskripsi: g.deskripsi || null,
      max_pilih: g.max_pilih,
      is_required: g.is_required,
    }));
  }

  try {
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query<RowDataPacket[]>(
        "SELECT * FROM sc_option_groups ORDER BY id ASC"
      );

      if (rows.length === 0) {
        return MOCK_OPTION_GROUPS.map((g) => ({
          id: g.id,
          slug: g.slug,
          nama_grup: g.nama_grup,
          deskripsi: g.deskripsi || null,
          max_pilih: g.max_pilih,
          is_required: g.is_required,
        }));
      }

      return rows.map((r) => ({
        id: Number(r.id),
        slug: String(r.slug),
        nama_grup: String(r.nama_grup),
        deskripsi: r.deskripsi ? String(r.deskripsi) : null,
        max_pilih: r.max_pilih !== null ? Number(r.max_pilih) : null,
        is_required: Boolean(r.is_required),
        created_at: r.created_at ? new Date(r.created_at) : undefined,
        updated_at: r.updated_at ? new Date(r.updated_at) : undefined,
      }));
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error("[OptionGroupsStore] Gagal membaca sc_option_groups:", error);
    return MOCK_OPTION_GROUPS.map((g) => ({
      id: g.id,
      slug: g.slug,
      nama_grup: g.nama_grup,
      deskripsi: g.deskripsi || null,
      max_pilih: g.max_pilih,
      is_required: g.is_required,
    }));
  }
}

/**
 * Mengambil satu grup opsi berdasarkan ID
 */
export async function getOptionGroupByIdFromDb(id: number): Promise<ScOptionGroup | null> {
  const all = await getAllOptionGroupsFromDb();
  return all.find((g) => g.id === id) || null;
}
