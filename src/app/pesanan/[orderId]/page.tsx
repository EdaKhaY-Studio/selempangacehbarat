import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomerOrderStatusView } from "@/components/orders/CustomerOrderStatusView";
import { ChevronRight } from "lucide-react";

interface PageProps {
  params: Promise<{ orderId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { orderId } = await params;
  return {
    title: `Status Pesanan ${orderId} — Selempang Aceh Barat (FHD)`,
    description: `Periksa status produksi bordir, jadwal serah terima, dan pembayaran pesanan ${orderId} Selempang Aceh Barat.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function OrderStatusPage({ params }: PageProps) {
  const { orderId } = await params;

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#0f172a] selection:bg-[#b48c28] selection:text-white pb-16">
      {/* 1. Header & Navbar */}
      <Navbar />

      {/* 2. Breadcrumbs Bar */}
      <div className="pt-20 sm:pt-24 bg-white border-b border-[#cbd5e1]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-[#475569]">
            <Link href="/" className="hover:text-[#b48c28] transition-colors">
              Beranda
            </Link>
            <ChevronRight size={14} className="text-slate-400" />
            <Link href="/produk/custom-selempang" className="hover:text-[#b48c28] transition-colors">
              Custom Selempang
            </Link>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="font-semibold text-[#0f172a]">Status Pesanan</span>
          </nav>
        </div>
      </div>

      {/* 3. Main Status View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <CustomerOrderStatusView orderId={orderId} />
      </div>

      {/* 4. Footer */}
      <Footer />
    </main>
  );
}
