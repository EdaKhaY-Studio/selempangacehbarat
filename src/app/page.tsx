import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { CatalogSection } from "@/components/sections/CatalogSection";
import { OrderFlowSection } from "@/components/sections/OrderFlowSection";
import { ValueProposition } from "@/components/sections/ValueProposition";
import { BundlingHighlight } from "@/components/sections/BundlingHighlight";
import { BundlingCalculator } from "@/components/sections/BundlingCalculator";
import { AboutSection } from "@/components/sections/AboutSection";
import { PartnerLogoWall } from "@/components/sections/PartnerLogoWall";
import { GallerySection } from "@/components/sections/GallerySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { Footer } from "@/components/layout/Footer";
import { AIChatbot } from "@/components/ui/AIChatbot";

/**
 * Selempang Aceh Barat — Jasa Pembuatan Selempang & Persewaan Jas/Sepatu
 * Design System: Modern Elegant Boutique Store (Executive Atelier)
 * Palette: Surface #FAF9F6, Primary #0F172A, Accent #B48C28, Border #CBD5E1
 *
 * Struktur Urutan Beranda (High-Conversion Flow):
 * 1. Hero Section: Headline darurat + Typewriter hook + CTA "Amankan Tanggalmuu!!" + Trust Bar
 * 2. Katalog Produk Interaktif (Naik ke atas): Tab switch [Beli Selempang] | [Sewa Outfit] | [Paket Organisasi]
 * 3. 3-Step Alur Order: Pilih & Custom -> Bayar Instan (Midtrans Snap) -> Ambil di Toko Alpen / Kirim
 * 4. Keunggulan Toko: 4 Card (Kilat 1 Hari, Buka Sampai 23:00, 2 Menit dari Kampus, Ready to Wear)
 * 5. Galeri & Testimoni: Grid feed foto real bordir dan wisudawan (IG @selempang_acehbarat & @sewajassepatu_acehbarat)
 * 6. FAQ Accordion: Tanya jawab deadline pengerjaan, jaminan sewa, fitting ukuran
 * 7. Maps, Jam Buka & Footer: Embed Google Maps Selempang Aceh Barat Jln Alpen Meureubo + Jam Operasional
 */
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-[#0f172a] selection:bg-[#b48c28] selection:text-white">
      {/* Header & Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col">
        {/* 1. Hero Section: Headline darurat + Typewriter hook + CTA Amankan Tanggalmuu!! + Trust Bar */}
        <HeroSection />

        {/* 2. Katalog Produk Interaktif (Naik ke atas): Tab switch [Beli Selempang] | [Sewa Outfit] | [Paket Organisasi] */}
        <CatalogSection />

        {/* 3. 3-Step Alur Order: Pilih & Custom -> Bayar Instan (Midtrans Snap) -> Ambil di Toko Alpen / Kirim */}
        <OrderFlowSection />

        {/* 4. Keunggulan Toko: 4 Card (Kilat 1 Hari, Buka Sampai 23:00, 2 Menit dari Kampus, Ready to Wear) */}
        <ValueProposition />

        {/* Bundling Highlight & Interactive Size Calculator */}
        <BundlingHighlight />
        <BundlingCalculator />

        {/* Tentang Kami & Mitra Kampus (UTU, STAIN, USK, Poltekkes) */}
        <AboutSection />
        <PartnerLogoWall />

        {/* 5. Galeri & Testimoni: Grid feed foto real bordir & wisudawan (IG & Google Reviews) */}
        <GallerySection />
        <TestimonialsSection />

        {/* 6. FAQ Accordion: Tanya jawab deadline kilat, jaminan sewa, fitting ukuran, pembayaran */}
        <FaqSection />

        {/* 7. Maps, Jam Buka & Footer: Embed Google Maps Jln Alpen Meureubo + Jam Operasional */}
        <LocationSection />
      </main>

      {/* Footer & Asisten Interaktif */}
      <Footer />
      <AIChatbot />
    </div>
  );
}
