import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChatbot } from "@/components/ui/AIChatbot";
import { ProductCatalogClient } from "@/components/products/ProductCatalogClient";
import { getAllProducts } from "@/lib/products-data";
import {
  ChevronRight,
  ShieldCheck,
  Clock,
  Sparkles,
  Truck,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Katalog Produk & Tarif Sewa | Selempang Aceh Barat (FHD)",
  description:
    "Katalog resmi selempang wisuda bordir komputer bludru & satin kilat, sewa jas wisuda & sidang skripsi, sepatu pantofel, dan konveksi PDH di Meulaboh, Aceh Barat.",
  alternates: {
    canonical: "https://selempangacehbarat.com/produk",
  },
  openGraph: {
    type: "website",
    title: "Katalog Produk & Tarif Sewa | Selempang Aceh Barat (FHD)",
    description:
      "Koleksi lengkap atribut wisuda & sewa busana formal nomor 1 di Meulaboh. Bordir kilat 1 hari, ukuran lengkap S-3XL.",
    url: "https://selempangacehbarat.com/produk",
    siteName: "Selempang Aceh Barat (FHD)",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Katalog Produk Selempang Aceh Barat (FHD)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Katalog Produk & Tarif Sewa | Selempang Aceh Barat (FHD)",
    description:
      "Koleksi lengkap atribut wisuda & sewa busana formal nomor 1 di Meulaboh. Bordir kilat 1 hari, ukuran lengkap S-3XL.",
    images: ["/og-image.jpg"],
  },
};

export default function ProdukListingPage() {
  const products = getAllProducts();

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#0f172a] selection:bg-[#b48c28] selection:text-white">
      {/* 1. Header & Navigation */}
      <Navbar />

      {/* 2. Breadcrumbs Bar */}
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
            Ready Stock &amp; Custom Kilat
          </span>
        </div>
      </div>

      {/* 3. Catalog Hero Banner */}
      <section className="bg-gradient-to-b from-white to-[#faf9f6] pt-10 pb-6 border-b border-[#cbd5e1]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#b48c28] mb-2 inline-flex items-center gap-1.5">
              <Sparkles size={13} />
              Atelier Busana &amp; Selempang Meulaboh
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight mb-4">
              Katalog Produk Dijual &amp; Disewakan
            </h1>
            <p className="text-sm sm:text-base text-[#475569] font-light leading-relaxed">
              Pilihan lengkap selempang wisuda bordir komputer premium, rental jas formal bergaransi wangi higienis, sepatu pantofel kulit, hingga konveksi seragam PDH untuk civitas akademika Aceh Barat.
            </p>
          </div>

          {/* Quick Trust Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-[#cbd5e1]/40">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#b48c28] flex items-center justify-center shrink-0">
                <Clock size={16} />
              </div>
              <div className="text-xs">
                <div className="font-bold text-[#0f172a]">Kilat 24 Jam</div>
                <div className="text-[#94a3b8] text-[11px]">Bordir Siap Pakai</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck size={16} />
              </div>
              <div className="text-xs">
                <div className="font-bold text-[#0f172a]">Anti-Typo 100%</div>
                <div className="text-[#94a3b8] text-[11px]">Garansi Ganti Baru</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Sparkles size={16} />
              </div>
              <div className="text-xs">
                <div className="font-bold text-[#0f172a]">Laundry Higienis</div>
                <div className="text-[#94a3b8] text-[11px]">Setrika Uap Wangi</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Truck size={16} />
              </div>
              <div className="text-xs">
                <div className="font-bold text-[#0f172a]">Ambil / Antar</div>
                <div className="text-[#94a3b8] text-[11px]">Alpen Store &amp; Kurir</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Product Catalog Interactive Filter & Grid */}
      <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductCatalogClient products={products} />
      </section>

      {/* 5. Custom Order / WhatsApp Fast Consultation Bar */}
      <section className="bg-[#0f172a] text-white py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#fde68a]">
              BUTUH PRODUK KHUSUS / PESANAN BANYAK?
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight mt-1 mb-2">
              Konsultasi Ukuran &amp; Desain Bordir Gratis
            </h2>
            <p className="text-sm text-slate-300 font-light">
              Hubungi admin Selempang Aceh Barat untuk konsultasi ukuran jas, request warna kain khusus, atau pembuatan seragam PDH angkatan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="https://wa.me/6282299256343?text=Halo%20Selempang%20Aceh%20Barat,%20saya%20ingin%20konsultasi%20pemesanan%20katalog%20produk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#b48c28] hover:bg-[#9a751e] text-white font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-95 text-center"
            >
              <PhoneCall size={16} />
              <span>Chat WhatsApp Sekarang</span>
            </a>
            <Link
              href="/galeri"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all border border-slate-700 active:scale-95 text-center"
            >
              <span>Lihat Foto Pemakaian</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Footer & Chatbot */}
      <Footer />
      <AIChatbot />
    </main>
  );
}
