import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { GallerySection } from "@/components/sections/GallerySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { Footer } from "@/components/layout/Footer";
import { AIChatbot } from "@/components/ui/AIChatbot";
import { ChevronRight, ArrowRight, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Galeri Wisuda & Portofolio — Selempang Aceh Barat (FHD)",
  description:
    "Dokumentasi foto nyata hasil bordir komputer selempang wisuda bludru & satin, setelan jas formal, dan koleksi sepatu pantofel di Meulaboh, Aceh Barat.",
  alternates: {
    canonical: "https://selempangacehbarat.com/galeri",
  },
  openGraph: {
    type: "website",
    title: "Galeri Wisuda & Portofolio — Selempang Aceh Barat (FHD)",
    description:
      "Koleksi foto produk selempang wisuda dan persewaan jas formal & sepatu pantofel mengacu pada akun Instagram @selempang_acehbarat dan @sewajassepatu_acehbarat.",
    url: "https://selempangacehbarat.com/galeri",
    siteName: "Selempang Aceh Barat (FHD)",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Galeri Wisuda & Portofolio Selempang Aceh Barat (FHD)",
      },
    ],
  },
};

export default function GaleriPage() {
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
            <span className="font-semibold text-[#0f172a]">Galeri &amp; Portofolio</span>
          </nav>

          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-[#b48c28] font-bold uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-full border border-[#fde68a]">
            Dokumentasi Hasil Nyata
          </span>
        </div>
      </div>

      {/* 2.5 Page Title Banner with Semantic H1 */}
      <section className="bg-gradient-to-b from-white to-[#faf9f6] pt-10 pb-6 border-b border-[#cbd5e1]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#b48c28] mb-2 inline-flex items-center gap-1.5">
              Portofolio Hasil Atelier &amp; Persewaan Meulaboh
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight mb-4">
              Galeri Wisudawan &amp; Portofolio Produk
            </h1>
            <p className="text-sm sm:text-base text-[#475569] font-light leading-relaxed">
              Dokumentasi nyata hasil bordir selempang wisuda bludru &amp; satin, rental jas formal sidang, dan sepatu pantofel untuk wisudawan UTU, STAIN, dan kampus se-Aceh Barat.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Galeri Portofolio & Filter Interaktif */}
      <GallerySection />

      {/* 4. Testimoni Nyata Wisudawan */}
      <TestimonialsSection />

      {/* 5. Banner Konsultasi Busana */}
      <section className="w-full py-12 sm:py-16 bg-[#0f172a] text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col gap-2 max-w-xl">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              Ingin Tampil Memukau Seperti Mereka?
            </h2>
            <p className="text-sm text-slate-300 font-light">
              Konsultasikan tema warna selempang kampus dan ukuran jas formal Anda langsung dengan Selempang Aceh Barat.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="https://wa.me/6282299256343?text=Halo%20Selempang%20Aceh%20Barat,%20saya%20melihat%20galeri%20dan%20tertarik%20konsultasi%20pemesanan%20selempang/sewa%20jas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-[#b48c28] hover:bg-[#9a751e] text-white font-semibold text-xs sm:text-sm tracking-wide uppercase transition-all shadow-md active:scale-95"
            >
              <MessageCircle size={16} />
              <span>Konsultasi Desain via WhatsApp</span>
            </a>
            <Link
              href="/produk"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all border border-slate-700 active:scale-95"
            >
              <span>Pilih Paket di Katalog</span>
              <ArrowRight size={14} />
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
