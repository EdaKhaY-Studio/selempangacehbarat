import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChatbot } from "@/components/ui/AIChatbot";
import { PilihModelSelempangView } from "@/components/products/PilihModelSelempangView";
import { ChevronRight, MapPin, Sparkles, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Pilih Model Selempang Wisuda — Selempang Aceh Barat (FHD)",
  description:
    "Pilih model selempang wisuda dengan nama lengkap resmi: Model Menyamping Selempang, Model Leher / Syal V-Neck, dan Model Timbal Balik Dua Sisi Butik di Meulaboh, Aceh Barat.",
  alternates: {
    canonical: "https://selempangacehbarat.com/pilih-model-selempang",
  },
  openGraph: {
    title: "Pilih Model Selempang Wisuda — Selempang Aceh Barat (FHD)",
    description:
      "Koleksi 3 model resmi selempang wisuda bordir komputer berkualitas butik FHD di Meulaboh.",
    url: "https://selempangacehbarat.com/pilih-model-selempang",
    siteName: "Selempang Aceh Barat (FHD)",
    images: [
      {
        url: "/Gambar/Maira-sartika.png",
        width: 800,
        height: 800,
        alt: "Pilih Model Selempang Wisuda FHD",
      },
    ],
  },
};

export default function PilihModelSelempangPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-[#0f172a] selection:bg-[#b48c28] selection:text-white">
      {/* 1. Navbar */}
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
              <Link href="/produk" className="hover:text-[#b48c28] transition-colors">
                Katalog Produk
              </Link>
              <ChevronRight size={14} className="text-slate-400" />
              <span className="font-semibold text-[#0f172a]">
                Pilih Model Selempang
              </span>
            </nav>

            <div className="hidden sm:flex items-center gap-2 text-[#75777d]">
              <MapPin size={13} className="text-[#b48c28]" />
              <span>Workshop Meulaboh, Aceh Barat</span>
            </div>
          </div>
        </div>

        {/* 3. Hero Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 flex-1 w-full">
          <div className="max-w-3xl mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#b48c28] text-xs font-bold uppercase tracking-wider mb-3">
              <Layers size={13} />
              <span>Katalog Model Dinamis (Fase 4 — Pilih Model &amp; Opsi)</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0f172a] tracking-tight mb-4">
              Pilih Model Selempang Wisuda Resmi
            </h1>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed mb-2">
              Pilih pola potongan selempang bordir komputer berkualitas butik FHD. Setiap model memiliki karakteristik potongan, penempatan bordir nama/gelar, dan opsi ornamen renda yang berbeda.
            </p>
            <p className="text-xs sm:text-sm text-slate-500">
              *Semua model diproses menggunakan standar bordir komputer presisi dengan kain bludru tebal 2 lapis atau satin kilap mewah.
            </p>
          </div>

          {/* 4. Interactive Model Selector Component */}
          <PilihModelSelempangView />
        </div>
      </main>

      {/* 5. Footer & AIChatbot */}
      <Footer />
      <AIChatbot />
    </div>
  );
}
