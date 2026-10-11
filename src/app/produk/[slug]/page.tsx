import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChatbot } from "@/components/ui/AIChatbot";
import { ProductDetailInteractive } from "@/components/products/ProductDetailInteractive";
import {
  getAllProducts,
  getAllProductSlugs,
  getProductBySlug,
} from "@/lib/products-data";
import { ChevronRight } from "lucide-react";

export const revalidate = 3600; // ISR: 1 jam

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produk Tidak Ditemukan | Selempang Aceh Barat",
      description: "Halaman produk tidak ditemukan di Selempang Aceh Barat.",
    };
  }

  // Ringkasan produk lokal (maksimal 160 karakter)
  const description =
    product.shortDescription.length > 160
      ? `${product.shortDescription.slice(0, 157)}...`
      : product.shortDescription;

  const canonicalUrl = `https://selempangacehbarat.com/produk/${product.slug}`;
  const ogImage = product.images[0] || "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=800&auto=format&fit=crop&q=80";

  return {
    title: `${product.name} | Selempang Aceh Barat`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      title: `${product.name} | Selempang Aceh Barat`,
      description,
      url: canonicalUrl,
      siteName: "Selempang Aceh Barat",
      images: [
        {
          url: ogImage,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Selempang Aceh Barat`,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = getAllProducts();
  const relatedProducts = allProducts.filter((p) => p.slug !== product.slug);

  // Schema JSON-LD Product & Offer
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.shortDescription,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: "Selempang Aceh Barat",
    },
    offers: {
      "@type": "Offer",
      url: `https://selempangacehbarat.com/produk/${product.slug}`,
      priceCurrency: "IDR",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceValidUntil: "2027-12-31",
      seller: {
        "@type": "Organization",
        name: "Selempang Aceh Barat",
        telephone: "+6282299256343",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Alpen Store Meulaboh, Jl. Sisingamangaraja",
          addressLocality: "Meulaboh, Aceh Barat",
          addressRegion: "Aceh",
          postalCode: "23615",
          addressCountry: "ID",
        },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#0f172a] selection:bg-[#b48c28] selection:text-white">
      {/* Schema JSON-LD Script Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Header & Navigation */}
      <Navbar />

      {/* 2. Breadcrumbs Navigation */}
      <div className="pt-20 sm:pt-24 bg-white border-b border-[#cbd5e1]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs">
          <nav className="flex items-center gap-1.5 text-[#475569] truncate">
            <Link href="/" className="hover:text-[#0f172a] transition-colors shrink-0">
              Beranda
            </Link>
            <ChevronRight size={13} className="text-[#94a3b8] shrink-0" />
            <Link
              href="/produk"
              className="hover:text-[#0f172a] transition-colors shrink-0"
            >
              Katalog Produk
            </Link>
            <ChevronRight size={13} className="text-[#94a3b8] shrink-0" />
            <span className="font-semibold text-[#0f172a] truncate">
              {product.name}
            </span>
          </nav>

          <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-[#b48c28] font-bold uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-full border border-[#fde68a] shrink-0">
            {product.categoryLabel}
          </span>
        </div>
      </div>

      {/* 3. Product Detail Section */}
      <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductDetailInteractive
          product={product}
          relatedProducts={relatedProducts}
        />
      </section>

      {/* 4. Footer & Chatbot */}
      <Footer />
      <AIChatbot />
    </main>
  );
}
