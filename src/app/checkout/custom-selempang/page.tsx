import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomSashCheckoutForm } from "@/components/checkout/CustomSashCheckoutForm";
import { ChevronRight, ShieldCheck, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Checkout Custom Selempang — Selempang Aceh Barat (FHD)",
  description:
    "Formulir pemesanan resmi Custom Selempang Wisuda & Yudisium Selempang Aceh Barat. Pembayaran DP 50% aman via Midtrans.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CustomSashCheckoutPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#0f172a] selection:bg-[#b48c28] selection:text-white pb-16">
      {/* 1. Navbar */}
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
            <span className="font-semibold text-[#0f172a]">Formulir Checkout</span>
          </nav>

          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <Lock size={12} />
            <span>Checkout Aman Terverifikasi</span>
          </div>
        </div>
      </div>

      {/* 3. Main Form Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-3xl mb-8">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0f172a] tracking-tight mb-2">
            Formulir Pemesanan Custom Selempang
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Lengkapi spesifikasi pesanan bordir nama, bahan, warna, dan jadwal serah terima. Perhitungan harga dihitung otomatis dan pembayaran DP 50% diproses melalui sistem resmi Midtrans.
          </p>
        </div>

        {/* Wrap in Suspense because searchParams are used */}
        <Suspense fallback={<div className="p-12 text-center text-sm text-slate-500">Memuat formulir checkout...</div>}>
          <CustomSashCheckoutForm />
        </Suspense>
      </div>

      {/* 4. Footer */}
      <Footer />
    </main>
  );
}
