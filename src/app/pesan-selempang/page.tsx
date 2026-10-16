import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChatbot } from "@/components/ui/AIChatbot";
import { PesanSelempangBuilder } from "@/components/products/PesanSelempangBuilder";
import { ChevronRight, Sparkles, MapPin, Calculator, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Pesan Selempang Wisuda Kustom — Selempang Aceh Barat (FHD)",
  description:
    "Formulir pemesanan selempang bordir komputer dengan kalkulasi harga otomatis server. Pilih model resmi, kain bludru/satin, dan dekorasi renda/rumbai di Meulaboh.",
  alternates: {
    canonical: "https://selempangacehbarat.com/pesan-selempang",
  },
};

export default function PesanSelempangPage() {
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
                Pesan Selempang Dinamis
              </span>
            </nav>

            <div className="hidden sm:flex items-center gap-2 text-[#75777d]">
              <MapPin size={13} className="text-[#b48c28]" />
              <span>Workshop Meulaboh, Aceh Barat</span>
            </div>
          </div>
        </div>

        {/* 3. Header Title & Context Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 flex-1 w-full">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#b48c28] text-xs font-bold uppercase tracking-wider mb-3">
              <Calculator size={13} />
              Harga Otomatis Server (Data Tiruan Terverifikasi)
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0f172a] tracking-tight mb-3">
              Pemesanan &amp; Kustomisasi Selempang Wisuda
            </h1>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              Sesuaikan model selempang, warna kain, ornamen bordir, dan rincian nama gelar Anda. Sistem menghitung tarif secara otomatis di server berdasarkan harga dasar dan opsi yang dipilih.
            </p>
          </div>

          {/* 4. Interactive Order Builder Component */}
          <Suspense fallback={<div className="p-12 text-center text-sm text-slate-500">Memuat formulir kustomisasi dinamis...</div>}>
            <PesanSelempangBuilder />
          </Suspense>
        </div>
      </main>

      {/* 5. Footer & AIChatbot */}
      <Footer />
      <AIChatbot />
    </div>
  );
}
