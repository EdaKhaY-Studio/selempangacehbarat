import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ orderId?: string; orderNumber?: string; id?: string }>;
}

export default async function CheckoutPembayaranIndexPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const target = params.orderNumber || params.orderId || params.id;

  if (target) {
    redirect(`/checkout/pembayaran/${encodeURIComponent(target)}`);
  }

  redirect("/checkout/custom-selempang");
}
