import { NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth/adminAuth";
import { orderStore } from "@/lib/db/orderStore";

export async function GET(request: Request) {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Akses ditolak. Sesi admin tidak sah." },
      { status: 401 }
    );
  }

  try {
    const orders = await orderStore.getAllOrders();
    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Terjadi kesalahan server.";
    return NextResponse.json({ success: false, message: errorMsg }, { status: 500 });
  }
}
