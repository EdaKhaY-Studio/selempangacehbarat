import { NextRequest, NextResponse } from "next/server";
import {
  getProductModelByIdFromDb,
  getProductModelBySlugFromDb,
  getAllProductModelsFromDb,
} from "@/lib/db/productModelsStore";
import { getOptionsForModelFromDb } from "@/lib/db/modelOptionsStore";

export const dynamic = "force-dynamic";

/**
 * GET /api/models/[id]/options
 * Mengambil opsi yang tersedia untuk model selempang tertentu
 * Ref Task: kustomisasi-selempang-dinamis/pilih-model-opsi/buat-api-opsi-tersedia-per-model
 */
interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    let model = null;
    const numericId = parseInt(id, 10);
    if (!isNaN(numericId)) {
      model = await getProductModelByIdFromDb(numericId);
    }

    if (!model) {
      model = await getProductModelBySlugFromDb(id);
    }

    if (!model) {
      const all = await getAllProductModelsFromDb();
      model = all.find((m) => m.slug === id || m.id.toString() === id) || null;
    }

    if (!model) {
      return NextResponse.json(
        {
          success: false,
          error: `Model selempang "${id}" tidak ditemukan.`,
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
    console.error("[API Models Options] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal mengambil opsi untuk model tersebut",
      },
      { status: 500 }
    );
  }
}
