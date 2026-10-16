import { NextResponse } from "next/server";
import {
  migrateModelCustomOptionsTable,
  seedModelCustomOptionsDraft,
  getOptionsForModelFromDb,
} from "@/lib/db/modelOptionsStore";
import { MOCK_SASH_MODELS, MOCK_MODEL_OPTIONS } from "@/lib/catalog/mock-sash-catalog";

export async function POST() {
  try {
    await migrateModelCustomOptionsTable();
    const ok = await seedModelCustomOptionsDraft();

    const relationsOverview = await Promise.all(
      MOCK_SASH_MODELS.map(async (m) => {
        const groups = await getOptionsForModelFromDb(m.id);
        const totalOptions = groups.reduce((acc, g) => acc + g.options.length, 0);
        return {
          modelId: m.id,
          modelName: m.nama,
          totalGroups: groups.length,
          totalOptions,
          optionsSummary: groups.map((g) => ({
            group: g.group.nama_grup,
            options: g.options.map((o) => ({
              name: o.option.nama,
              basePrice: o.option.harga,
              effectivePrice: o.effectivePrice,
              hasOverride: o.effectivePrice !== o.option.harga,
            })),
          })),
        };
      })
    );

    return NextResponse.json({
      success: ok,
      message: ok
        ? "Seeding relasi model-opsi & harga override draft berhasil."
        : "Database tidak terhubung, relasi model-opsi tetap aman menggunakan mock fallback.",
      relationsCount: MOCK_MODEL_OPTIONS.length,
      modelsOverview: relationsOverview,
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
    const relationsOverview = await Promise.all(
      MOCK_SASH_MODELS.map(async (m) => {
        const groups = await getOptionsForModelFromDb(m.id);
        return {
          modelId: m.id,
          modelName: m.nama,
          groups,
        };
      })
    );

    return NextResponse.json({
      endpoint: "/api/admin/catalog/seed/relations",
      description: "Trigger seeding relasi sc_model_custom_options dari kode ke database draft",
      relations: relationsOverview,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
