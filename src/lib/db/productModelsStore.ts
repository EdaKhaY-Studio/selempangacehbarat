/**
 * Data Access Layer & Migrasi untuk sc_product_models (Fase 1 — Database Katalog Selempang)
 * Usaha: Selempang Aceh Barat (FHD)
 */

import { getCatalogDbPool } from "./index";
import {
  MOCK_SASH_MODELS,
  SashModelEntity,
  GroupedResolvedOptions,
} from "@/lib/catalog/mock-sash-catalog";
import { getOptionsForModelFromDb } from "./modelOptionsStore";
import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";

export interface ScProductModel {
  id: number;
  slug: string;
  nama: string;
  short_name: string;
  harga_dasar: number;
  deskripsi: string | null;
  status: "draft" | "published";
  features_json: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface ScProductModelInput {
  slug: string;
  nama: string;
  short_name: string;
  harga_dasar: number;
  deskripsi?: string | null;
  status?: "draft" | "published";
  features?: string[];
}

/**
 * Menjalankan migrasi DDL untuk tabel sc_product_models
 */
export async function migrateProductModelsTable(): Promise<boolean> {
  const pool = await getCatalogDbPool();
  if (!pool) {
    console.log("[Migration] MySQL belum dikonfigurasi, migrasi sc_product_models dilewati (menggunakan data tiruan fallback).");
    return false;
  }

  try {
    const conn = await pool.getConnection();
    try {
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

      console.log("[Migration] Tabel sc_product_models berhasil diverifikasi / dibuat.");
      return true;
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error("[Migration] Gagal menjalankan migrasi tabel sc_product_models:", error);
    return false;
  }
}

/**
 * Mengisi seed data awal model selempang dengan status aman 'draft'
 */
export async function seedProductModelsDraft(): Promise<boolean> {
  const pool = await getCatalogDbPool();
  if (!pool) return false;

  try {
    const conn = await pool.getConnection();
    try {
      for (const m of MOCK_SASH_MODELS) {
        await conn.query(
          `
          INSERT INTO sc_product_models (slug, nama, short_name, harga_dasar, deskripsi, status, features_json)
          VALUES (?, ?, ?, ?, ?, 'draft', ?)
          ON DUPLICATE KEY UPDATE
            nama = VALUES(nama),
            short_name = VALUES(short_name),
            harga_dasar = VALUES(harga_dasar),
            deskripsi = VALUES(deskripsi),
            features_json = VALUES(features_json)
        `,
          [
            m.slug,
            m.nama,
            m.shortName,
            m.harga_dasar,
            m.deskripsi,
            JSON.stringify(m.features),
          ]
        );
      }
      return true;
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error("[Migration] Gagal melakukan seeding sc_product_models:", error);
    return false;
  }
}

/**
 * Mengambil semua model produk selempang dari database MySQL
 * Jika koneksi database belum tersedia, mengembalikan fallback dari mock data.
 */
export async function getAllProductModelsFromDb(): Promise<ScProductModel[]> {
  const pool = await getCatalogDbPool();
  if (!pool) {
    return MOCK_SASH_MODELS.map((m) => ({
      id: m.id,
      slug: m.slug,
      nama: m.nama,
      short_name: m.shortName,
      harga_dasar: m.harga_dasar,
      deskripsi: m.deskripsi,
      status: m.status,
      features_json: JSON.stringify(m.features),
    }));
  }

  try {
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query<RowDataPacket[]>(
        "SELECT * FROM sc_product_models ORDER BY id ASC"
      );

      if (rows.length === 0) {
        // Jika tabel kosong, kembalikan mock data fallback
        return MOCK_SASH_MODELS.map((m) => ({
          id: m.id,
          slug: m.slug,
          nama: m.nama,
          short_name: m.shortName,
          harga_dasar: m.harga_dasar,
          deskripsi: m.deskripsi,
          status: m.status,
          features_json: JSON.stringify(m.features),
        }));
      }

      return rows.map((r) => ({
        id: Number(r.id),
        slug: String(r.slug),
        nama: String(r.nama),
        short_name: String(r.short_name),
        harga_dasar: Number(r.harga_dasar),
        deskripsi: r.deskripsi ? String(r.deskripsi) : null,
        status: (r.status === "published" ? "published" : "draft") as "draft" | "published",
        features_json: r.features_json ? String(r.features_json) : null,
        created_at: r.created_at ? new Date(r.created_at) : undefined,
        updated_at: r.updated_at ? new Date(r.updated_at) : undefined,
      }));
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error("[ProductModelsStore] Gagal membaca sc_product_models:", error);
    return MOCK_SASH_MODELS.map((m) => ({
      id: m.id,
      slug: m.slug,
      nama: m.nama,
      short_name: m.shortName,
      harga_dasar: m.harga_dasar,
      deskripsi: m.deskripsi,
      status: m.status,
      features_json: JSON.stringify(m.features),
    }));
  }
}

/**
 * Mengambil satu model selempang berdasarkan slug
 */
export async function getProductModelBySlugFromDb(slug: string): Promise<ScProductModel | null> {
  const all = await getAllProductModelsFromDb();
  return all.find((m) => m.slug === slug) || null;
}

/**
 * Mengambil satu model selempang berdasarkan ID numerik
 */
export async function getProductModelByIdFromDb(id: number): Promise<ScProductModel | null> {
  const all = await getAllProductModelsFromDb();
  return all.find((m) => m.id === id) || null;
}

export const MODEL_PHOTOS: Record<string, { main: string; gallery: string[]; caption: string }> = {
  biasa: {
    main: "/Gambar/01-selempang-wisuda-hitam-silver-nama.jpeg",
    gallery: [
      "/Gambar/01-selempang-wisuda-hitam-silver-nama.jpeg",
      "/Gambar/03-selempang-beige-bordir-pink.jpeg",
      "/Gambar/04-selempang-hitam-emas-rumbai.jpeg",
    ],
    caption: "Contoh Foto Asli: Selempang Model Biasa (Menyamping)",
  },
  syal: {
    main: "/Gambar/02-selempang-hitam-bordir-emas-instansi.jpeg",
    gallery: [
      "/Gambar/02-selempang-hitam-bordir-emas-instansi.jpeg",
      "/Gambar/04-selempang-hitam-emas-rumbai.jpeg",
      "/Gambar/01-selempang-wisuda-hitam-silver-nama.jpeg",
    ],
    caption: "Contoh Foto Asli: Selempang Model Leher / Syal",
  },
  timbal_balik: {
    main: "/Gambar/04-selempang-hitam-emas-rumbai.jpeg",
    gallery: [
      "/Gambar/04-selempang-hitam-emas-rumbai.jpeg",
      "/Gambar/01-selempang-wisuda-hitam-silver-nama.jpeg",
      "/Gambar/02-selempang-hitam-bordir-emas-instansi.jpeg",
    ],
    caption: "Contoh Foto Asli: Selempang Model Leher Timbal Balik (Dua Sisi)",
  },
};

export interface HydratedCatalogModel extends SashModelEntity {
  optionGroups: GroupedResolvedOptions[];
}

/**
 * Mengambil seluruh model selempang dari database MySQL katalog beserta relasi grup opsi dan aset foto
 */
export async function getHydratedCatalogModelsFromDb(): Promise<HydratedCatalogModel[]> {
  const models = await getAllProductModelsFromDb();
  const hydrated: HydratedCatalogModel[] = [];

  for (const m of models) {
    const optionGroups = await getOptionsForModelFromDb(m.id);
    let features: string[] = [];
    if (m.features_json) {
      try {
        features = JSON.parse(m.features_json);
      } catch {
        features = [];
      }
    }

    const photos = MODEL_PHOTOS[m.slug] || MODEL_PHOTOS.biasa;

    hydrated.push({
      id: m.id,
      slug: m.slug as "biasa" | "syal" | "timbal_balik",
      nama: m.nama,
      shortName: m.short_name,
      harga_dasar: Number(m.harga_dasar),
      deskripsi: m.deskripsi || "",
      status: m.status,
      features,
      photos,
      optionGroups,
    });
  }

  return hydrated;
}
