import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FhdPaymentView } from "@/components/checkout/FhdPaymentView";
import { ChevronRight, Lock } from "lucide-react";

interface PageProps {
  params: Promise<{ orderId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { orderId } = await params;
  return {
    title: `Pembayaran Pesanan ${orderId} — Selempang Aceh Barat (FHD)`,
    description: `Halaman pembayaran resmi untuk pesanan ${orderId} Selempang Aceh Barat. Pembayaran DP 50% via Midtrans Core API.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function CheckoutPaymentPage({ params }: PageProps) {
  const { orderId } = await params;

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-[#0f172a] selection:bg-[#b48c28] selection:text-white">
      {/* 1. Header & Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col pb-16">
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
              <Link href="/checkout/custom-selempang" className="hover:text-[#b48c28] transition-colors">
                Checkout
              </Link>
              <ChevronRight size={14} className="text-slate-400" />
              <span className="font-semibold text-[#0f172a]">Pembayaran Pesanan</span>
            </nav>

            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <Lock size={12} />
              <span>Sistem Pembayaran Terenkripsi</span>
            </div>
          </div>
        </div>

        {/* 3. Main Payment View */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full">
          <FhdPaymentView orderId={orderId} />
        </div>
      </main>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}
