import { NextResponse } from "next/server";
import { orderStore } from "@/lib/db/orderStore";
import { MidtransService, CorePaymentMethod } from "@/lib/services/midtransService";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    const { paymentMethod = "bca_va" } = body || {};

    const order = await orderStore.getOrderById(id);

    if (!order) {
      return NextResponse.json({ success: false, message: "Pesanan tidak ditemukan." }, { status: 404 });
    }

    if (order.paymentStatus === "paid") {
      return NextResponse.json(
        { success: false, message: "Pesanan sudah berstatus lunas penuh." },
        { status: 400 }
      );
    }

    if (order.paymentStatus !== "deposit_paid" && order.paymentStatus !== "balance_due" && order.paymentStatus !== "balance_pending") {
      return NextResponse.json(
        {
          success: false,
          message: "DP pesanan belum terverifikasi, pelunasan belum dapat dilakukan.",
        },
        { status: 400 }
      );
    }

    const cleanNum = order.orderNumber.replace(/[^A-Za-z0-9]/g, "");
    const midtransOrderId = `${cleanNum}-BAL-${Date.now()}`;

    if (MidtransService.isConfigured()) {
      const chargeRes = await MidtransService.chargeCoreApi({
        orderId: midtransOrderId,
        grossAmount: order.balanceAmount,
        paymentMethod: paymentMethod as CorePaymentMethod,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        customerEmail: order.customerEmail,
        itemDescription: `Pelunasan 50% ${order.orderNumber} - Slempang FHD`,
      });

      if (chargeRes) {
        await orderStore.recordTransaction(order.id, {
          paymentPhase: "pelunasan",
          midtransOrderId,
          grossAmount: order.balanceAmount,
          paymentMethod,
          transactionStatus: chargeRes.transactionStatus,
          rawNotification: JSON.stringify(chargeRes.rawResponse),
        });

        await orderStore.updateStatus(order.id, {
          paymentStatus: "balance_pending",
          adminUser: "core_api",
          reason: "Membuat transaksi pelunasan via Midtrans Core API",
        });

        return NextResponse.json({
          success: true,
          orderNumber: order.orderNumber,
          balanceAmount: order.balanceAmount,
          midtransOrderId,
          paymentMethod,
          vaNumber: chargeRes.vaNumber,
          bank: chargeRes.bank,
          billKey: chargeRes.billKey,
          billerCode: chargeRes.billerCode,
          qrString: chargeRes.qrString,
          qrUrl: chargeRes.qrUrl,
          deepLinkUrl: chargeRes.deepLinkUrl,
          expiryTime: chargeRes.expiryTime,
          message: "Transaksi pelunasan Core API berhasil dibuat.",
        });
      }
    }

    // Placeholder jika Sandbox belum aktif
    await orderStore.recordTransaction(order.id, {
      paymentPhase: "pelunasan",
      midtransOrderId,
      grossAmount: order.balanceAmount,
      paymentMethod,
      transactionStatus: "pending",
    });

    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      balanceAmount: order.balanceAmount,
      midtransOrderId,
      message: "Transaksi pelunasan dicatat (menunggu pembayaran).",
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Terjadi kesalahan.";
    return NextResponse.json({ success: false, message: errorMsg }, { status: 500 });
  }
}
