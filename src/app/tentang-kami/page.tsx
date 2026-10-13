import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { AboutSection } from "@/components/sections/AboutSection";
import { PartnerLogoWall } from "@/components/sections/PartnerLogoWall";
import { LocationSection } from "@/components/sections/LocationSection";
import { Footer } from "@/components/layout/Footer";
import { AIChatbot } from "@/components/ui/AIChatbot";
import { ChevronRight, ArrowRight, MessageCircle } from "lucide-react";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Tentang Kami — Selempang Aceh Barat (FHD) | Produksi Selempang & Rental Jas Meulaboh",
  description:
    "Profil Selempang Aceh Barat (FHD) di Jl. Alue Peunyareng Meureubo, Meulaboh. Spesialis bordir selempang wisuda kilat, sewa jas sidang & wisuda, serta konveksi PDH.",
  alternates: {
    canonical: "https://selempangacehbarat.com/tentang-kami",
  },
  openGraph: {
    type: "website",
    title: "Tentang Kami — Selempang Aceh Barat (FHD)",
    description:
      "Dedikasi nyata untuk wisudawan Universitas Teuku Umar (UTU) & STAIN Meulaboh, Aceh Barat.",
    url: "https://selempangacehbarat.com/tentang-kami",
    siteName: "Selempang Aceh Barat (FHD)",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tentang Kami Selempang Aceh Barat (FHD)",
      },
    ],
  },
};

export default function TentangKamiPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#0f172a] selection:bg-[#b48c28] selection:text-white">
      {/* 1. Header & Navigation */}
      <Navbar />

      {/* 2. Breadcrumb Navigation Bar */}
      <div className="pt-20 sm:pt-24 bg-white border-b border-[#cbd5e1]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs">
          <nav className="flex items-center gap-1.5 text-[#475569]">
            <Link href="/" prefetch={true} className="hover:text-[#0f172a] transition-colors">
              Beranda
            </Link>
            <ChevronRight size={13} className="text-[#94a3b8]" />
            <span className="font-semibold text-[#0f172a]">Tentang Kami</span>
          </nav>

          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-[#b48c28] font-bold uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-full border border-[#fde68a]">
            Profil &amp; Dedikasi Selempang Aceh Barat
          </span>
        </div>
      </div>

      {/* 2.5 Page Title Banner with Semantic H1 */}
      <section className="bg-gradient-to-b from-white to-[#faf9f6] pt-10 pb-6 border-b border-[#cbd5e1]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#b48c28] mb-2 inline-flex items-center gap-1.5">
              Dedikasi Atelier &amp; Konveksi Meulaboh
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight mb-4">
              Tentang Selempang Aceh Barat (FHD)
            </h1>
            <p className="text-sm sm:text-base text-[#475569] font-light leading-relaxed">
              Pusat produksi selempang wisuda bordir kilat 1 hari, persewaan jas formal &amp; sepatu pantofel, serta konveksi baju PDH dan almamater kampus di Meulaboh, Aceh Barat.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Filosofi, Standar Keunggulan & Kisah Dedikasi */}
      <AboutSection />

      {/* 4. Marquee Mitra Kampus & Alumni di Aceh Barat */}
      <PartnerLogoWall />

      {/* 5. Lokasi Workshop Fisik & Peta Interaktif */}
      <LocationSection />

      {/* 6. Banner Reservasi (Stitch Reference CTA) */}
      <section className="w-full py-14 sm:py-16 bg-[#0f172a] text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-2xl flex flex-col gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#fde68a]">
                PERSIAPAN HARI BERSEJARAH
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                Amankan Jas Wisudamu Jauh Hari Sebelum Kehabisan.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                Permintaan melonjak tajam pada musim wisuda UTU &amp; STAIN. Hubungi kami sekarang untuk fitting ukuran dan penguncian jadwal bebas bentrok.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href="https://wa.me/6282299256343?text=Halo%20Selempang%20Aceh%20Barat,%20saya%20ingin%20tanya%20jadwal%20fitting%20jas%20wisuda"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#b48c28] hover:bg-[#9a751e] text-white font-semibold text-xs sm:text-sm tracking-wide uppercase transition-all shadow-md active:scale-95"
              >
                <MessageCircle size={16} />
                <span>Tanya Jadwal &amp; Fitting</span>
              </a>
              <Link
                href="/produk"
                prefetch={true}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all border border-slate-700 active:scale-95"
              >
                <span>Lihat Katalog Produk</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer & Chatbot */}
      <Footer />
      <AIChatbot />
    </main>
  );
}
