import { NextResponse } from "next/server";
import {
  migrateOptionGroupsTable,
  seedOptionGroupsDraft,
  getAllOptionGroupsFromDb,
} from "@/lib/db/optionGroupsStore";
import {
  migrateCustomOptionsTable,
  seedCustomOptionsDraft,
  getAllCustomOptionsFromDb,
} from "@/lib/db/customOptionsStore";

export async function POST() {
  try {
    await migrateOptionGroupsTable();
    await migrateCustomOptionsTable();

    const okGroups = await seedOptionGroupsDraft();
    const okOptions = await seedCustomOptionsDraft();

    const groups = await getAllOptionGroupsFromDb();
    const options = await getAllCustomOptionsFromDb();

    return NextResponse.json({
      success: okGroups && okOptions,
      message: okGroups && okOptions
        ? "Seeding grup opsi & opsi kustom ke database draft berhasil."
        : "Database tidak terhubung, data tetap aman menggunakan mock fallback.",
      groupsCount: groups.length,
      optionsCount: options.length,
      groups: groups.map((g) => ({
        id: g.id,
        slug: g.slug,
        nama_grup: g.nama_grup,
        max_pilih: g.max_pilih,
      })),
      options: options.map((o) => ({
        id: o.id,
        slug: o.slug,
        group_id: o.group_id,
        nama: o.nama,
        harga: o.harga,
        status: o.status,
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
    const groups = await getAllOptionGroupsFromDb();
    const options = await getAllCustomOptionsFromDb();

    return NextResponse.json({
      endpoint: "/api/admin/catalog/seed/options",
      description: "Trigger seeding opsi tambahan & grupnya dari kode ke database draft",
      groups,
      options,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
