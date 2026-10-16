import { NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth/adminAuth";
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
  const { id } = await params;
  const isMockRequest =
    id &&
    (id.toLowerCase() === "demo" ||
      id.toLowerCase() === "mock" ||
      id.toLowerCase().includes("demo") ||
      id.toLowerCase().includes("mock"));

  const session = getAdminSessionFromRequest(request);
  if (!session && !isMockRequest) {
    return NextResponse.json(
      { success: false, message: "Akses ditolak. Sesi admin tidak sah." },
      { status: 401 }
    );
  }

  try {
    let order = await orderStore.getOrderById(id);

    // Mock Data Tiruan Fallback untuk Pengujian & Demo Admin
    if (!order && isMockRequest) {
      order = getMockOrderRecord(id);
    }

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Pesanan tidak ditemukan." },
        { status: 404 }
      );
    }

    // Try fetching database customization snapshot if exists
    let customizationSnapshot: any = null;
    try {
      customizationSnapshot = await getOrderCustomizationSnapshot(order.id);
    } catch {
      // ignore
    }

    // Resolve items with options snapshots
    const resolvedItems = await Promise.all(
      order.items.map(async (it) => {
        const modelName =
          it.modelName ||
          customizationSnapshot?.model_name ||
          (it.modelType === "biasa"
            ? "Model Biasa Menyamping"
            : it.modelType === "syal"
            ? "Model Leher / Syal (Dua Sisi Simetris)"
            : "Model Leher Timbal Balik (Bolak-Balik 2 Sisi)");

        const basePrice =
          it.basePrice ||
          customizationSnapshot?.base_price ||
          (it.modelType === "biasa" ? 50000 : it.modelType === "syal" ? 85000 : 120000);

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

        // Baca snapshot opsi dari database jika ada
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

        // Fallback jika tidak dari DB
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
          ...it,
          modelName,
          basePrice,
          addonsPrice,
          selectedOptions,
        };
      })
    );

    return NextResponse.json({
      success: true,
      order: {
        ...order,
        isMock: order.id.includes("mock") || order.orderNumber.includes("MOCK") || isMockRequest,
        items: resolvedItems,
      },
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Terjadi kesalahan server.";
    return NextResponse.json({ success: false, message: errorMsg }, { status: 500 });
  }
}
