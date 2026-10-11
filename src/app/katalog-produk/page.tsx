import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { CatalogSection } from "@/components/sections/CatalogSection";
import { BundlingHighlight } from "@/components/sections/BundlingHighlight";
import { BundlingCalculator } from "@/components/sections/BundlingCalculator";
import { PaymentSection } from "@/components/sections/PaymentSection";
import { Footer } from "@/components/layout/Footer";
import { AIChatbot } from "@/components/ui/AIChatbot";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Katalog Produk Dijual & Disewakan — Selempang Aceh Barat",
  description:
    "Daftar produk dijual (selempang bludru & satin, PDH, kaos, almamater, ID card & medali) dan tarif sewa jas formal & sepatu pantofel di Meulaboh, Aceh Barat.",
  openGraph: {
    title: "Katalog Produk & Sewa — Selempang Aceh Barat",
    description:
      "Katalog lengkap produk dijual dan tarif sewa perlengkapan wisuda & formal di Meulaboh, Aceh Barat.",
  },
};

export default function KatalogProdukPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#0f172a] selection:bg-[#b48c28] selection:text-white">
      {/* 1. Header & Navigation */}
      <Navbar />

      {/* 2. Breadcrumb Navigation Bar */}
      <div className="pt-20 sm:pt-24 bg-white border-b border-[#cbd5e1]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs">
          <nav className="flex items-center gap-1.5 text-[#475569]">
            <Link href="/" className="hover:text-[#0f172a] transition-colors">
              Beranda
            </Link>
            <ChevronRight size={13} className="text-[#94a3b8]" />
            <span className="font-semibold text-[#0f172a]">Katalog Produk</span>
          </nav>

          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-[#b48c28] font-bold uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-full border border-[#fde68a]">
            Sewa Jas &amp; Custom Selempang
          </span>
        </div>
      </div>

      {/* 3. Katalog Utama 6 Produk Pilihan & Filter Interaktif */}
      <CatalogSection />

      {/* 4. Highlight Paket Bundling Sultan Wisuda 2-in-1 */}
      <BundlingHighlight />

      {/* 5. Kalkulator Ukuran & Cek Ketersediaan Realtime */}
      <BundlingCalculator />

      {/* 6. Metode Pembayaran Cepat & Aman */}
      <PaymentSection />

      {/* 7. Footer & Chatbot */}
      <Footer />
      <AIChatbot />
    </main>
  );
}
