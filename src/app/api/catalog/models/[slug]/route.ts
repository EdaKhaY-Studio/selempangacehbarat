import { NextRequest, NextResponse } from "next/server";
import { getProductModelBySlugFromDb } from "@/lib/db/productModelsStore";
import { getOptionsForModelFromDb } from "@/lib/db/modelOptionsStore";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * GET /api/catalog/models/[slug]
 * Mengambil detail satu model selempang beserta relasi opsi kustom yang tersedia
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const model = await getProductModelBySlugFromDb(slug);

    if (!model) {
      return NextResponse.json(
        {
          success: false,
          error: `Model selempang dengan slug '${slug}' tidak ditemukan`,
        },
        { status: 404 }
      );
    }

    const optionGroups = await getOptionsForModelFromDb(model.id);

    let parsedFeatures: string[] = [];
    if (model.features_json) {
      try {
        parsedFeatures = JSON.parse(model.features_json);
      } catch {
        parsedFeatures = [];
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        id: model.id,
        slug: model.slug,
        nama: model.nama,
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
      },
    });
  } catch (error) {
    console.error("[API Catalog Model Detail] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal memuat detail model selempang",
      },
      { status: 500 }
    );
  }
}
