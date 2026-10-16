/**
 * Data Access Layer & Migrasi untuk sc_custom_options (Fase 1 — Database Katalog Selempang)
 * Usaha: Selempang Aceh Barat (FHD)
 */

import { getCatalogDbPool } from "./index";
import { MOCK_CUSTOM_OPTIONS, CustomOptionEntity } from "@/lib/catalog/mock-sash-catalog";
import type { RowDataPacket } from "mysql2/promise";

export interface ScCustomOption {
  id: number;
  slug: string;
  group_id: number | null;
  nama: string;
  deskripsi: string | null;
  harga: number;
  status: "draft" | "published";
  created_at?: Date;
  updated_at?: Date;
}

/**
 * Menjalankan migrasi DDL untuk tabel sc_custom_options
 */
export async function migrateCustomOptionsTable(): Promise<boolean> {
  const pool = await getCatalogDbPool();
  if (!pool) {
    console.log("[Migration] MySQL belum dikonfigurasi, migrasi sc_custom_options dilewati (menggunakan data tiruan fallback).");
    return false;
  }

  try {
    const conn = await pool.getConnection();
    try {
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

      console.log("[Migration] Tabel sc_custom_options berhasil diverifikasi / dibuat.");
      return true;
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error("[Migration] Gagal menjalankan migrasi tabel sc_custom_options:", error);
    return false;
  }
}

/**
 * Mengisi seed data opsi kustom dengan status aman 'draft'
 */
export async function seedCustomOptionsDraft(): Promise<boolean> {
  const pool = await getCatalogDbPool();
  if (!pool) return false;

  try {
    const conn = await pool.getConnection();
    try {
      for (const opt of MOCK_CUSTOM_OPTIONS) {
        await conn.query(
          `
          INSERT INTO sc_custom_options (id, slug, group_id, nama, deskripsi, harga, status)
          VALUES (?, ?, ?, ?, ?, ?, 'draft')
          ON DUPLICATE KEY UPDATE
            group_id = VALUES(group_id),
            nama = VALUES(nama),
            deskripsi = VALUES(deskripsi),
            harga = VALUES(harga)
        `,
          [
            opt.id,
            opt.slug,
            opt.group_id,
            opt.nama,
            opt.deskripsi || null,
            opt.harga,
          ]
        );
      }
      return true;
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error("[Migration] Gagal melakukan seeding sc_custom_options:", error);
    return false;
  }
}

/**
 * Mengambil seluruh opsi kustom dari database MySQL
 * Jika koneksi database belum tersedia, mengembalikan fallback dari mock data.
 */
export async function getAllCustomOptionsFromDb(): Promise<ScCustomOption[]> {
  const pool = await getCatalogDbPool();
  if (!pool) {
    return MOCK_CUSTOM_OPTIONS.map((o) => ({
      id: o.id,
      slug: o.slug,
      group_id: o.group_id,
      nama: o.nama,
      deskripsi: o.deskripsi || null,
      harga: o.harga,
      status: o.status,
    }));
  }

  try {
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query<RowDataPacket[]>(
        "SELECT * FROM sc_custom_options ORDER BY id ASC"
      );

      if (rows.length === 0) {
        return MOCK_CUSTOM_OPTIONS.map((o) => ({
          id: o.id,
          slug: o.slug,
          group_id: o.group_id,
          nama: o.nama,
          deskripsi: o.deskripsi || null,
          harga: o.harga,
          status: o.status,
        }));
      }

      return rows.map((r) => ({
        id: Number(r.id),
        slug: String(r.slug),
        group_id: r.group_id ? Number(r.group_id) : null,
        nama: String(r.nama),
        deskripsi: r.deskripsi ? String(r.deskripsi) : null,
        harga: Number(r.harga),
        status: (r.status === "published" ? "published" : "draft") as "draft" | "published",
        created_at: r.created_at ? new Date(r.created_at) : undefined,
        updated_at: r.updated_at ? new Date(r.updated_at) : undefined,
      }));
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error("[CustomOptionsStore] Gagal membaca sc_custom_options:", error);
    return MOCK_CUSTOM_OPTIONS.map((o) => ({
      id: o.id,
      slug: o.slug,
      group_id: o.group_id,
      nama: o.nama,
      deskripsi: o.deskripsi || null,
      harga: o.harga,
      status: o.status,
    }));
  }
}

/**
 * Mengambil satu opsi kustom berdasarkan slug
 */
export async function getCustomOptionBySlugFromDb(slug: string): Promise<ScCustomOption | null> {
  const all = await getAllCustomOptionsFromDb();
  return all.find((o) => o.slug === slug) || null;
}
