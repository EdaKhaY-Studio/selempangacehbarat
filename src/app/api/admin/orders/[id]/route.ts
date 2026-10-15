import { NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth/adminAuth";
import { orderStore } from "@/lib/db/orderStore";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Akses ditolak. Sesi admin tidak sah." },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const order = await orderStore.getOrderById(id);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Pesanan tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Terjadi kesalahan server.";
    return NextResponse.json({ success: false, message: errorMsg }, { status: 500 });
  }
}
