import { NextResponse } from "next/server";
import {
  migrateProductModelsTable,
  seedProductModelsDraft,
  getAllProductModelsFromDb,
} from "@/lib/db/productModelsStore";

export async function POST() {
  try {
    await migrateProductModelsTable();
    const ok = await seedProductModelsDraft();
    const models = await getAllProductModelsFromDb();

    return NextResponse.json({
      success: ok,
      message: ok
        ? "Seeding model selempang ke database mode draft berhasil."
        : "Database tidak terhubung, data model tetap aman menggunakan mock fallback.",
      modelsCount: models.length,
      models: models.map((m) => ({
        id: m.id,
        slug: m.slug,
        nama: m.nama,
        harga_dasar: m.harga_dasar,
        status: m.status,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const models = await getAllProductModelsFromDb();
    return NextResponse.json({
      endpoint: "/api/admin/catalog/seed/models",
      description: "Trigger seeding model selempang dari kode ke tabel database sc_product_models",
      currentModels: models,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
