import { NextRequest, NextResponse } from "next/server";
import { getAllProductModelsFromDb } from "@/lib/db/productModelsStore";
import { getOptionsForModelFromDb } from "@/lib/db/modelOptionsStore";

export const dynamic = "force-dynamic";

/**
 * GET /api/models
 * API publik untuk mengambil daftar model selempang dengan nama lengkap resmi
 * Ref Task: kustomisasi-selempang-dinamis/pilih-model-opsi/buat-api-daftar-model-nama-lengkap
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const modelIdParam = searchParams.get("modelId");

    const allModels = await getAllProductModelsFromDb();

    let filteredModels = allModels;
    if (slug) {
      filteredModels = allModels.filter((m) => m.slug === slug);
    } else if (modelIdParam) {
      const modelId = parseInt(modelIdParam, 10);
      filteredModels = allModels.filter((m) => m.id === modelId);
    }

    const modelsWithRelations = await Promise.all(
      filteredModels.map(async (model) => {
        const optionGroups = await getOptionsForModelFromDb(model.id);

        let parsedFeatures: string[] = [];
        if (model.features_json) {
          try {
            parsedFeatures = JSON.parse(model.features_json);
          } catch {
            parsedFeatures = [];
          }
        }

        return {
          id: model.id,
          slug: model.slug,
          nama: model.nama, // Nama lengkap resmi (bukan A/B/C)
          short_name: model.short_name,
          harga_dasar: model.harga_dasar,
          deskripsi: model.deskripsi,
          status: model.status,
          features: parsedFeatures,
          option_groups: optionGroups.map((og) => ({
            id: og.group.id,
            slug: og.group.slug,
            nama_grup: og.group.nama_grup,
            deskripsi: og.group.deskripsi,
            max_pilih: og.group.max_pilih,
            is_required: og.group.is_required,
            options: og.options.map((opt) => ({
              id: opt.option.id,
              slug: opt.option.slug,
              nama: opt.option.nama,
              deskripsi: opt.option.deskripsi,
              base_price: opt.option.harga,
              effective_price: opt.effectivePrice,
              has_price_override: opt.effectivePrice !== opt.option.harga,
            })),
          })),
        };
      })
    );

    return NextResponse.json({
      success: true,
      total: modelsWithRelations.length,
      data: modelsWithRelations,
    });
  } catch (error) {
    console.error("[API Models] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal memuat daftar model selempang",
      },
      { status: 500 }
    );
  }
}
