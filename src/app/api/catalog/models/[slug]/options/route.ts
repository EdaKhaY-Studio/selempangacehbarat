import { NextRequest, NextResponse } from "next/server";
import {
  getProductModelByIdFromDb,
  getProductModelBySlugFromDb,
  getAllProductModelsFromDb,
} from "@/lib/db/productModelsStore";
import { getOptionsForModelFromDb } from "@/lib/db/modelOptionsStore";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * GET /api/catalog/models/[slug]/options
 * Mengambil daftar opsi yang tersedia untuk model tertentu melalui relasi database
 * Ref Task: kustomisasi-selempang-dinamis/pilih-model-opsi/buat-api-opsi-tersedia-per-model
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    let model = null;
    const numericId = parseInt(slug, 10);
    if (!isNaN(numericId)) {
      model = await getProductModelByIdFromDb(numericId);
    }

    if (!model) {
      model = await getProductModelBySlugFromDb(slug);
    }

    if (!model) {
      const all = await getAllProductModelsFromDb();
      model = all.find((m) => m.slug === slug || m.id.toString() === slug) || null;
    }

    if (!model) {
      return NextResponse.json(
        {
          success: false,
          error: `Model selempang dengan identitas "${slug}" tidak ditemukan.`,
        },
        { status: 404 }
      );
    }

    const groupedOptions = await getOptionsForModelFromDb(model.id);

    const formattedGroups = groupedOptions.map((og) => ({
      group_id: og.group.id,
      group_slug: og.group.slug,
      nama_grup: og.group.nama_grup,
      deskripsi: og.group.deskripsi,
      max_pilih: og.group.max_pilih,
      is_required: og.group.is_required,
      options: og.options.map((opt) => ({
        id: opt.option.id,
        slug: opt.option.slug,
        nama: opt.option.nama,
        deskripsi: opt.option.deskripsi,
        harga_default: opt.option.harga,
        harga_override: opt.effectivePrice !== opt.option.harga ? opt.effectivePrice : null,
        effective_price: opt.effectivePrice,
        relation_id: opt.relationId,
      })),
    }));

    const totalOptions = formattedGroups.reduce((acc, g) => acc + g.options.length, 0);

    return NextResponse.json({
      success: true,
      model: {
        id: model.id,
        slug: model.slug,
        nama: model.nama,
        short_name: model.short_name,
        harga_dasar: model.harga_dasar,
        status: model.status,
      },
      totalGroups: formattedGroups.length,
      totalOptions,
      groupedOptions: formattedGroups,
    });
  } catch (error) {
    console.error("[API Catalog Model Options] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal mengambil opsi untuk model tersebut",
      },
      { status: 500 }
    );
  }
}
