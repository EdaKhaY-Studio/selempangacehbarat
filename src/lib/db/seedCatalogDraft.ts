/**
 * Master Seeder Katalog Awal Selempang Mode Draft Aman
 * Usaha: Selempang Aceh Barat (FHD)
 */

import { migrateOptionGroupsTable, seedOptionGroupsDraft } from "./optionGroupsStore";
import { migrateProductModelsTable, seedProductModelsDraft } from "./productModelsStore";
import { migrateCustomOptionsTable, seedCustomOptionsDraft } from "./customOptionsStore";
import { migrateModelCustomOptionsTable, seedModelCustomOptionsDraft } from "./modelOptionsStore";

export interface SeedCatalogResult {
  success: boolean;
  message: string;
  tablesVerified: string[];
  status: "draft";
}

/**
 * Menjalankan migrasi struktur DDL dan seeding data draft katalog selempang
 */
export async function seedCatalogDraftSafe(): Promise<SeedCatalogResult> {
  const verifiedTables: string[] = [];

  try {
    // 1. Grup Opsi
    const mg = await migrateOptionGroupsTable();
    if (mg) verifiedTables.push("sc_option_groups");
    await seedOptionGroupsDraft();

    // 2. Model Produk
    const mm = await migrateProductModelsTable();
    if (mm) verifiedTables.push("sc_product_models");
    await seedProductModelsDraft();

    // 3. Opsi Kustom
    const mo = await migrateCustomOptionsTable();
    if (mo) verifiedTables.push("sc_custom_options");
    await seedCustomOptionsDraft();

    // 4. Relasi Model & Opsi
    const mr = await migrateModelCustomOptionsTable();
    if (mr) verifiedTables.push("sc_model_custom_options");
    await seedModelCustomOptionsDraft();

    return {
      success: true,
      message: "Katalog awal selempang berhasil diinisialisasi dalam mode draft aman.",
      tablesVerified: verifiedTables,
      status: "draft",
    };
  } catch (error) {
    console.error("[Seeder] Gagal melakukan inisialisasi katalog draft:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Terjadi kesalahan pada seeding katalog draft",
      tablesVerified: verifiedTables,
      status: "draft",
    };
  }
}
