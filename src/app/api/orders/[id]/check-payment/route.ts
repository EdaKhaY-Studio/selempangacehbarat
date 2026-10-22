import { NextResponse } from "next/server";
import { orderStore } from "@/lib/db/orderStore";
import { MidtransService } from "@/lib/services/midtransService";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID pesanan tidak valid." },
        { status: 400 }
      );
    }

    const order = await orderStore.getOrderById(id);
    if (!order) {
      return NextResponse.json(
        { success: false, message: "Pesanan tidak ditemukan di database." },
        { status: 404 }
      );
    }

    // Ambil transaksi pending terbaru
    const latestTx = order.transactions[order.transactions.length - 1];

    if (!latestTx || !latestTx.midtransOrderId) {
      return NextResponse.json({
        success: true,
        paymentStatus: order.paymentStatus,
        productionStatus: order.productionStatus,
        message: "Belum ada transaksi aktif untuk diperiksa.",
      });
    }

    // Jika Midtrans dikonfigurasi, lakukan query langsung ke Midtrans Status API
    if (MidtransService.isConfigured()) {
      const statusRes = await MidtransService.getTransactionStatus(latestTx.midtransOrderId);

      if (statusRes) {
        const transStatus = statusRes.transaction_status as string;
        const fraudStatus = statusRes.fraud_status as string;

        let isSuccess = false;
        let isExpired = false;
        let isFailed = false;

        if (transStatus === "settlement" || (transStatus === "capture" && fraudStatus === "accept")) {
          isSuccess = true;
        } else if (transStatus === "expire") {
          isExpired = true;
        } else if (transStatus === "deny" || transStatus === "cancel") {
          isFailed = true;
        }

        if (isSuccess) {
          // Perbarui status transaksi
          await orderStore.recordTransaction(order.id, {
            paymentPhase: latestTx.paymentPhase,
            midtransOrderId: latestTx.midtransOrderId,
            grossAmount: latestTx.grossAmount,
            paymentMethod: (statusRes.payment_type as string) || latestTx.paymentMethod,
            transactionStatus: "settlement",
            paidAt: (statusRes.settlement_time as string) || new Date().toISOString(),
            rawNotification: JSON.stringify(statusRes),
          });

          // Perbarui status pesanan
          if (latestTx.paymentPhase === "dp") {
            await orderStore.updateStatus(order.id, {
              paymentStatus: "deposit_paid",
              productionStatus: "in_production",
              adminUser: "check_payment_api",
              reason: "Verifikasi status transaksi Midtrans: DP 50% berhasil dibayar",
            });
          } else if (latestTx.paymentPhase === "pelunasan") {
            await orderStore.updateStatus(order.id, {
              paymentStatus: "paid",
              adminUser: "check_payment_api",
              reason: "Verifikasi status transaksi Midtrans: Pelunasan 50% lunas",
            });
          }
        } else if (isExpired || isFailed) {
          await orderStore.recordTransaction(order.id, {
            paymentPhase: latestTx.paymentPhase,
            midtransOrderId: latestTx.midtransOrderId,
            grossAmount: latestTx.grossAmount,
            paymentMethod: latestTx.paymentMethod,
            transactionStatus: isExpired ? "expire" : "cancel",
            rawNotification: JSON.stringify(statusRes),
          });
        }
      }
    }

    // Ambil data pesanan ter-update
    const updatedOrder = await orderStore.getOrderById(id);

    return NextResponse.json({
      success: true,
      orderNumber: updatedOrder?.orderNumber || order.orderNumber,
      paymentStatus: updatedOrder?.paymentStatus || order.paymentStatus,
      productionStatus: updatedOrder?.productionStatus || order.productionStatus,
      transactions: updatedOrder?.transactions || order.transactions,
      message: "Status transaksi berhasil diperiksa.",
    });
  } catch (err: unknown) {
    console.error("[Check Payment] Exception:", err);
    const errorMsg = err instanceof Error ? err.message : "Terjadi kesalahan sistem.";
    return NextResponse.json({ success: false, message: errorMsg }, { status: 500 });
  }
}
