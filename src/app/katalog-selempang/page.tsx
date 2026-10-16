import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChatbot } from "@/components/ui/AIChatbot";
import { CustomSashShowcase } from "@/components/products/CustomSashShowcase";
import { ChevronRight, Sparkles, MapPin, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Katalog Selempang Wisuda Dinamis — Selempang Aceh Barat (FHD)",
  description:
    "Katalog model selempang wisuda bordir komputer terlengkap di Meulaboh, Aceh Barat. Pilihan model menyamping, syal leher, dan timbal balik dengan kustomisasi opsi renda, aksen, dan logo resmi.",
  alternates: {
    canonical: "https://selempangacehbarat.com/katalog-selempang",
  },
};

export default function KatalogSelempangPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-[#0f172a] selection:bg-[#b48c28] selection:text-white">
      {/* 1. Header & Navigation */}
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
                Katalog Selempang
              </span>
            </nav>

            <div className="hidden sm:flex items-center gap-2 text-[#75777d]">
              <MapPin size={13} className="text-[#b48c28]" />
              <span>Workshop Meulaboh, Aceh Barat</span>
            </div>
          </div>
        </div>

        {/* 3. Main Catalog Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#b48c28] text-xs font-bold uppercase tracking-wider mb-3">
              <Database size={13} />
              Database Katalog Selempang (Data Tiruan)
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0f172a] tracking-tight mb-4">
              Katalog Selempang Wisuda &amp; Kustomisasi Bordir
            </h1>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed mb-3">
              Pilih model selempang dengan nama lengkap resmi, bahan berkualitas, dan dekorasi tambahan sesuai kebutuhan wisuda, yudisium, atau acara organisasi Anda.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Katalog ini ditenagai oleh struktur basis data relasional (sash_models, option_groups, custom_options, dan model_options) dengan perhitungan tarif otomatis dan aturan grup yang tervalidasi.
            </p>
          </div>

          {/* Interactive Showcase & Addon Engine */}
          <Suspense fallback={<div className="p-12 text-center text-sm text-slate-500">Memuat katalog selempang dinamis...</div>}>
            <CustomSashShowcase />
          </Suspense>
        </div>
      </main>

      {/* 4. Footer & AIChatbot */}
      <Footer />
      <AIChatbot />
    </div>
  );
}
