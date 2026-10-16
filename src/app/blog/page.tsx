import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { BlogSection } from "@/components/sections/BlogSection";
import { Footer } from "@/components/layout/Footer";
import { AIChatbot } from "@/components/ui/AIChatbot";
import { ChevronRight, ArrowRight, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & Panduan Wisuda | Selempang Aceh Barat (FHD)",
  description:
    "Kumpulan tips dan panduan persiapan busana wisuda di Meulaboh, Aceh Barat: ukuran jas pria, komparasi bahan selempang bludru vs satin, dan checklist wisuda.",
  alternates: {
    canonical: "https://selempangacehbarat.com/blog",
  },
  openGraph: {
    type: "website",
    title: "Blog & Panduan Wisuda | Selempang Aceh Barat (FHD)",
    description:
      "Edukasi dan tips busana resmi untuk wisudawan Universitas Teuku Umar (UTU) & STAIN Meulaboh.",
    url: "https://selempangacehbarat.com/blog",
    siteName: "Selempang Aceh Barat (FHD)",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Blog Selempang Aceh Barat (FHD)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Panduan Wisuda | Selempang Aceh Barat (FHD)",
    description:
      "Edukasi dan tips busana resmi untuk wisudawan Universitas Teuku Umar (UTU) & STAIN Meulaboh.",
    images: ["/og-image.jpg"],
  },
};

export default function BlogListingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-[#0f172a] selection:bg-[#b48c28] selection:text-white">
      {/* 1. Header & Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* 2. Breadcrumb Navigation Bar */}
        <div className="pt-20 sm:pt-24 bg-white border-b border-[#cbd5e1]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs">
          <nav className="flex items-center gap-1.5 text-[#475569]">
            <Link href="/" className="hover:text-[#0f172a] transition-colors">
              Beranda
            </Link>
            <ChevronRight size={13} className="text-[#94a3b8]" />
            <span className="font-semibold text-[#0f172a]">Blog &amp; Panduan Busana</span>
          </nav>

          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-[#b48c28] font-bold uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-full border border-[#fde68a]">
            Tips &amp; Edukasi Wisuda
          </span>
        </div>
      </div>

      {/* 2.5 Page Title Banner with Semantic H1 */}
      <section className="bg-gradient-to-b from-white to-[#faf9f6] pt-10 pb-6 border-b border-[#cbd5e1]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#b48c28] mb-2 inline-flex items-center gap-1.5">
              Panduan Resmi Wisudawan Meulaboh
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight mb-4">
              Blog &amp; Panduan Busana Wisuda
            </h1>
            <p className="text-sm sm:text-base text-[#475569] font-light leading-relaxed">
              Kumpulan artikel edukatif, komparasi bahan selempang bordir bludru vs satin, panduan ukuran jas pria dan wanita, serta checklist persiapan yudisium &amp; wisuda di Meulaboh, Aceh Barat.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Artikel Edukasi & Panduan Wisuda (Grid Card Artikel) */}
      <BlogSection />

      {/* 4. Banner Tanya Pakar Tailoring */}
      <section className="w-full py-12 sm:py-16 bg-[#0f172a] text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col gap-2 max-w-xl">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#fde68a]">
              KONSULTASI GRATIS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              Masih Bingung Menentukan Ukuran Jas yang Pas?
            </h2>
            <p className="text-sm text-slate-300 font-light">
              Tanyakan panduan ukuran berat/tinggi badan Anda langsung ke tim Selempang Aceh Barat. Kami bantu sesuaikan agar fit sempurna saat hari wisuda.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="https://wa.me/6282299256343?text=Halo%20Selempang%20Aceh%20Barat,%20saya%20membaca%20blog%20dan%20ingin%20tanya%20panduan%20ukuran%20jas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-[#b48c28] hover:bg-[#9a751e] text-white font-semibold text-xs sm:text-sm tracking-wide uppercase transition-all shadow-md active:scale-95"
            >
              <MessageCircle size={16} />
              <span>Tanya Ukuran via WhatsApp</span>
            </a>
            <Link
              href="/produk"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all border border-slate-700 active:scale-95"
            >
              <span>Lihat Katalog Produk</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      </main>

      {/* 5. Footer & Chatbot */}
      <Footer />
      <AIChatbot />
    </div>
  );
}
