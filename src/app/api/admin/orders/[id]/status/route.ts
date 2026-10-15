import { NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth/adminAuth";
import { orderStore, PaymentStatus, ProductionStatus } from "@/lib/db/orderStore";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, { params }: RouteParams) {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Akses ditolak. Sesi admin tidak sah." },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const {
      paymentStatus,
      productionStatus,
      recordManualSettlement,
      reason,
    } = body || {};

    const order = await orderStore.getOrderById(id);
    if (!order) {
      return NextResponse.json({ success: false, message: "Pesanan tidak ditemukan." }, { status: 404 });
    }

    let finalPaymentStatus: PaymentStatus = order.paymentStatus;
    const finalProdStatus: ProductionStatus = productionStatus || order.productionStatus;

    // Handle manual cash settlement verification at the store
    if (recordManualSettlement) {
      finalPaymentStatus = "paid";
      await orderStore.recordTransaction(order.id, {
        paymentPhase: "pelunasan",
        midtransOrderId: `${order.orderNumber.replace(/[^A-Za-z0-9]/g, "")}-CASH-${Date.now()}`,
        grossAmount: order.balanceAmount,
        paymentMethod: "Tunai / Kasir Toko",
        transactionStatus: "settlement",
        paidAt: new Date().toISOString(),
      });
    } else if (paymentStatus) {
      finalPaymentStatus = paymentStatus;
    }

    const updated = await orderStore.updateStatus(order.id, {
      paymentStatus: finalPaymentStatus,
      productionStatus: finalProdStatus,
      adminUser: session.name || session.email,
      reason: reason || (recordManualSettlement ? "Pelunasan tunai diterima langsung di toko Alpen" : "Pembaruan status operasional oleh admin"),
    });

    return NextResponse.json({
      success: true,
      order: updated,
      message: "Status pesanan berhasil diperbarui.",
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Terjadi kesalahan server.";
    return NextResponse.json({ success: false, message: errorMsg }, { status: 500 });
  }
}
