import { NextResponse } from "next/server";
import { orderStore } from "@/lib/db/orderStore";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ success: false, message: "ID pesanan tidak valid." }, { status: 400 });
    }

    const order = await orderStore.getOrderById(id);
    if (!order) {
      return NextResponse.json({ success: false, message: "Pesanan tidak ditemukan." }, { status: 404 });
    }

    // Mask phone number for public view (e.g. 0822****6343)
    const phone = order.customerPhone;
    const maskedPhone =
      phone.length > 6
        ? `${phone.slice(0, 4)}****${phone.slice(-3)}`
        : phone;

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerPhoneMasked: maskedPhone,
        customerInstitution: order.customerInstitution,
        eventDate: order.eventDate,
        targetDate: order.targetDate,
        deliveryMethod: order.deliveryMethod,
        deliveryAddress: order.deliveryAddress,
        deliveryCity: order.deliveryCity,
        scheduleNotes: order.scheduleNotes,
        totalProductAmount: order.totalProductAmount,
        dpAmount: order.dpAmount,
        balanceAmount: order.balanceAmount,
        shippingCost: order.shippingCost,
        paymentStatus: order.paymentStatus,
        productionStatus: order.productionStatus,
        items: order.items.map((it) => ({
          id: it.id,
          modelType: it.modelType,
          material: it.material,
          clothColor: it.clothColor,
          edgeTapeColor: it.edgeTapeColor,
          threadColor: it.threadColor,
          customText: it.customText,
          hasLogo: it.hasLogo,
          logoUrl: it.logoUrl,
          decorations: it.decorations,
          designNotes: it.designNotes,
          unitPrice: it.unitPrice,
          quantity: it.quantity,
          subtotal: it.subtotal,
        })),
        transactions: order.transactions.map((tx) => ({
          paymentPhase: tx.paymentPhase,
          midtransOrderId: tx.midtransOrderId,
          grossAmount: tx.grossAmount,
          transactionStatus: tx.transactionStatus,
          paymentMethod: tx.paymentMethod,
          paidAt: tx.paidAt,
          snapToken: tx.snapToken,
          snapRedirectUrl: tx.snapRedirectUrl,
        })),
        createdAt: order.createdAt,
      },
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Terjadi kesalahan.";
    return NextResponse.json({ success: false, message: errorMsg }, { status: 500 });
  }
}
