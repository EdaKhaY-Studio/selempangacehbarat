import { NextResponse } from "next/server";
import { orderStore } from "@/lib/db/orderStore";
import { MidtransService } from "@/lib/services/midtransService";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
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

    if (order.paymentStatus !== "deposit_paid" && order.paymentStatus !== "balance_due") {
      return NextResponse.json(
        {
          success: false,
          message: "DP pesanan belum terverifikasi, pelunasan belum dapat dilakukan.",
        },
        { status: 400 }
      );
    }

    const midtransOrderId = `${order.orderNumber.replace(/[^A-Za-z0-9]/g, "")}-BAL-${Date.now()}`;
    let snapToken: string | undefined;
    let snapRedirectUrl: string | undefined;

    if (MidtransService.isConfigured()) {
      const snapRes = await MidtransService.createSnapTransaction({
        orderId: midtransOrderId,
        grossAmount: order.balanceAmount,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        customerEmail: order.customerEmail,
        itemDescription: `Pelunasan 50% ${order.orderNumber}`,
      });

      if (snapRes) {
        snapToken = snapRes.token;
        snapRedirectUrl = snapRes.redirectUrl;

        await orderStore.recordTransaction(order.id, {
          paymentPhase: "pelunasan",
          midtransOrderId,
          grossAmount: order.balanceAmount,
          transactionStatus: "pending",
          snapToken,
          snapRedirectUrl,
        });

        await orderStore.updateStatus(order.id, {
          paymentStatus: "balance_pending",
        });
      }
    } else {
      await orderStore.recordTransaction(order.id, {
        paymentPhase: "pelunasan",
        midtransOrderId,
        grossAmount: order.balanceAmount,
        transactionStatus: "pending",
      });
    }

    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      balanceAmount: order.balanceAmount,
      snapToken,
      snapRedirectUrl,
      message: "Transaksi pelunasan berhasil dibuat.",
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Terjadi kesalahan.";
    return NextResponse.json({ success: false, message: errorMsg }, { status: 500 });
  }
}
