import { NextResponse } from "next/server";
import { orderStore } from "@/lib/db/orderStore";
import { getMockOrderRecord } from "@/lib/orders/mock-order-data";
import {
  getOrderCustomizationSnapshot,
  getOrderItemOptionsSnapshot,
} from "@/lib/db/orderSnapshotsStore";
import { resolveSelectedOptions } from "@/lib/catalog/mock-sash-catalog";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ success: false, message: "ID pesanan tidak valid." }, { status: 400 });
    }

    let order = await orderStore.getOrderById(id);

    // Mock Data Tiruan Fallback untuk Pengujian & Demo
    if (!order && (
      id.toLowerCase() === "demo" ||
      id.toLowerCase() === "mock" ||
      id.toLowerCase() === "sample" ||
      id.toLowerCase().includes("demo") ||
      id.toLowerCase().includes("mock")
    )) {
      order = getMockOrderRecord(id);
    }

    if (!order) {
      return NextResponse.json({ success: false, message: "Pesanan tidak ditemukan." }, { status: 404 });
    }

    // Try fetching database customization snapshot if exists
    let customizationSnapshot: any = null;
    try {
      customizationSnapshot = await getOrderCustomizationSnapshot(order.id);
    } catch {
      // ignore
    }

    // Mask phone number for public view (e.g. 0822****6343)
    const phone = order.customerPhone;
    const maskedPhone =
      phone.length > 6
        ? `${phone.slice(0, 4)}****${phone.slice(-3)}`
        : phone;

    // Resolve items with options snapshots
    const resolvedItems = await Promise.all(
      order.items.map(async (it) => {
        const modelName =
          it.modelName ||
          customizationSnapshot?.model_name ||
          (it.modelType === "biasa"
            ? "Selempang Model Biasa (Menyamping)"
            : it.modelType === "syal"
            ? "Selempang Model Leher / Syal"
            : "Selempang Model Leher Timbal Balik");

        const basePrice =
          it.basePrice ||
          customizationSnapshot?.base_price ||
          (it.modelType === "biasa" ? 50000 : it.modelType === "syal" ? 85000 : 135000);

        const addonsPrice =
          it.addonsPrice ||
          customizationSnapshot?.total_options_price ||
          0;

        let selectedOptions: Array<{
          slug: string;
          name: string;
          groupName: string;
          price: number;
        }> = [];

        // 1. Coba baca snapshot opsi dari tabel sc_order_item_options
        if (it.id) {
          try {
            const dbOptions = await getOrderItemOptionsSnapshot(it.id);
            if (dbOptions && dbOptions.length > 0) {
              selectedOptions = dbOptions.map((o) => ({
                slug: o.option_slug || "",
                name: o.option_name,
                groupName: o.group_name,
                price: o.price,
              }));
            }
          } catch {
            // ignore
          }
        }

        // 2. Jika item dari mock atau offline, baca dari property selectedOptions atau fallback dari decorations
        if (selectedOptions.length === 0 && (it as any).selectedOptions) {
          selectedOptions = (it as any).selectedOptions;
        } else if (
          selectedOptions.length === 0 &&
          Array.isArray(it.decorations) &&
          it.decorations.length > 0
        ) {
          selectedOptions = resolveSelectedOptions(it.modelType, it.decorations);
        }

        return {
          id: it.id,
          modelType: it.modelType,
          modelName,
          basePrice,
          addonsPrice,
          material: it.material,
          clothColor: it.clothColor,
          edgeTapeColor: it.edgeTapeColor,
          threadColor: it.threadColor,
          customText: it.customText,
          hasLogo: it.hasLogo,
          logoUrl: it.logoUrl,
          decorations: it.decorations,
          selectedOptions,
          designNotes: it.designNotes,
          unitPrice: it.unitPrice,
          quantity: it.quantity,
          subtotal: it.subtotal,
        };
      })
    );

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        isMock: order.id.includes("mock") || order.orderNumber.includes("MOCK"),
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
        items: resolvedItems,
        transactions: order.transactions.map((tx) => ({
          paymentPhase: tx.paymentPhase,
          midtransOrderId: tx.midtransOrderId,
          grossAmount: tx.grossAmount,
          transactionStatus: tx.transactionStatus,
          paymentMethod: tx.paymentMethod,
          paidAt: tx.paidAt,
          snapToken: tx.snapToken,
          snapRedirectUrl: tx.snapRedirectUrl,
          vaNumber: tx.vaNumber,
          bank: tx.bank,
          billKey: tx.billKey,
          billerCode: tx.billerCode,
          qrString: tx.qrString,
          qrUrl: tx.qrUrl,
          deepLinkUrl: tx.deepLinkUrl,
          expiryTime: tx.expiryTime,
        })),
        createdAt: order.createdAt,
      },
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Terjadi kesalahan.";
    return NextResponse.json({ success: false, message: errorMsg }, { status: 500 });
  }
}
