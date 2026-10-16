import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChatbot } from "@/components/ui/AIChatbot";
import { CustomSashShowcase } from "@/components/products/CustomSashShowcase";
import { getHydratedCatalogModelsFromDb } from "@/lib/db/productModelsStore";
import { ChevronRight, ShieldCheck, MapPin, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Selempang Wisuda — Selempang Aceh Barat (FHD)",
  description:
    "Pesan selempang custom untuk wisuda, yudisium, fakultas, sekolah, organisasi, dan acara khusus bersama Selempang Aceh Barat (FHD). Pelanggan dapat memilih model, bahan, warna kain, dekorasi, warna bordir, serta memasukkan nama dan gelar sesuai kebutuhan.",
  alternates: {
    canonical: "https://selempangacehbarat.com/produk/custom-selempang",
  },
  openGraph: {
    type: "website",
    title: "Custom Selempang Wisuda — Selempang Aceh Barat (FHD)",
    description:
      "Pesan selempang custom untuk wisuda, yudisium, fakultas, sekolah, organisasi, dan acara khusus bersama Selempang Aceh Barat (FHD). Pilihan model biasa, leher/syal, dan timbal balik dua sisi.",
    url: "https://selempangacehbarat.com/produk/custom-selempang",
    siteName: "Selempang Aceh Barat (FHD)",
    images: [
      {
        url: "/Gambar/Maira-sartika.png",
        width: 800,
        height: 800,
        alt: "Custom Selempang Wisuda Selempang Aceh Barat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Selempang Wisuda — Selempang Aceh Barat (FHD)",
    description:
      "Pesan selempang custom wisuda bordir nama dan gelar resmi di Meulaboh, Aceh Barat.",
    images: ["/Gambar/Maira-sartika.png"],
  },
};

export default async function CustomSashDetailPage() {
  const models = await getHydratedCatalogModelsFromDb();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Custom Selempang Wisuda — Selempang Aceh Barat (FHD)",
    image: [
      "https://selempangacehbarat.com/Gambar/Maira-sartika.png",
      "https://selempangacehbarat.com/Gambar/Rovi-Anita.png",
      "https://selempangacehbarat.com/Gambar/bg-1.jpg",
    ],
    description:
      "Pesan selempang custom untuk wisuda, yudisium, fakultas, sekolah, organisasi, dan acara khusus bersama Selempang Aceh Barat (FHD).",
    brand: {
      "@type": "Brand",
      name: "Selempang Aceh Barat (FHD)",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "IDR",
      lowPrice: "50000",
      highPrice: "135000",
      offerCount: "3",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "LocalBusiness",
        name: "Selempang Aceh Barat (FHD)",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Jln Alpen, Gampong Gunung Kleng",
          addressLocality: "Meureubo",
          addressRegion: "Aceh Barat",
          postalCode: "23615",
          addressCountry: "ID",
        },
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-[#0f172a] selection:bg-[#b48c28] selection:text-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
              <span className="font-semibold text-[#0f172a] truncate max-w-[200px] sm:max-w-none">
                Custom Selempang Wisuda
              </span>
            </nav>

            <div className="hidden sm:flex items-center gap-2 text-[#75777d]">
              <MapPin size={13} className="text-[#b48c28]" />
              <span>Workshop Meulaboh, Aceh Barat</span>
            </div>
          </div>
        </div>

        {/* 3. Main Product Detail Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full">
          {/* Page Heading & Official Copy */}
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#b48c28] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles size={13} />
              Layanan Custom E-Commerce Resmi
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0f172a] tracking-tight mb-4">
              Custom Selempang Wisuda — Selempang Aceh Barat (FHD)
            </h1>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed mb-3">
              Pesan selempang custom untuk wisuda, yudisium, fakultas, sekolah, organisasi, dan acara khusus bersama Selempang Aceh Barat (FHD). Pelanggan dapat memilih model, bahan, warna kain, dekorasi, warna bordir, serta memasukkan nama dan gelar sesuai kebutuhan.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Setiap pesanan dibuat berdasarkan spesifikasi yang dipilih pelanggan. Pelanggan dapat memeriksa rincian dan estimasi harga sebelum melakukan pemesanan.
            </p>
          </div>

          {/* Interactive Showcase & Addon Engine */}
          <Suspense fallback={<div className="p-12 text-center text-sm text-slate-500">Memuat katalog selempang dinamis dari database...</div>}>
            <CustomSashShowcase initialModels={models} />
          </Suspense>
        </div>
      </main>

      {/* 4. Footer & AIChatbot */}
      <Footer />
      <AIChatbot />
    </div>
  );
}
