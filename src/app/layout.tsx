import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://selempangacehbarat.com"),
  title: "Selempang Aceh Barat (FHD) — Selempang Wisuda Meulaboh & Sewa Jas Aceh Barat",
  description:
    "Pusat produksi selempang wisuda bordir kilat 1 hari di Meulaboh, jasa sewa jas sidang skripsi & wisuda, sepatu pantofel, serta konveksi baju PDH di Alpen Meureubo, Aceh Barat. Buka s.d. 23:00 WIB.",
  keywords: [
    "selempang wisuda meulaboh",
    "selempang wisuda aceh barat",
    "jasa bordir selempang wisuda",
    "sewa jas wisuda meulaboh",
    "sewa jas sidang skripsi meulaboh",
    "konveksi pdh aceh barat",
    "selempang aceh barat",
    "sewa sepatu aceh barat",
    "sewa sepatu pantofel meulaboh",
    "baju pdh meulaboh",
    "almamater aceh barat",
    "id card dan medali meulaboh",
    "selempang bludru aceh barat",
    "selempang satin aceh barat",
  ],
  authors: [{ name: "Selempang Aceh Barat (FHD)", url: "https://selempangacehbarat.com" }],
  creator: "Selempang Aceh Barat (FHD)",
  publisher: "Selempang Aceh Barat (FHD)",
  alternates: {
    canonical: "https://selempangacehbarat.com",
  },
  openGraph: {
    title: "Selempang Aceh Barat (FHD) — Selempang Wisuda Meulaboh & Sewa Jas Aceh Barat",
    description:
      "Buka sampai jam 23:00! Sewa jas rapi sidang/wisuda & produksi selempang bordir kilat 1 hari Meulaboh, Aceh Barat. Order online via web.",
    url: "https://selempangacehbarat.com",
    siteName: "Selempang Aceh Barat (FHD)",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Selempang Aceh Barat (FHD) - Pusat Selempang & Sewa Jas Meulaboh",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Selempang Aceh Barat (FHD) — Selempang Wisuda Meulaboh & Sewa Jas Aceh Barat",
    description: "Pusat selempang wisuda bordir kilat & sewa jas formal Meulaboh, Aceh Barat.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
  },
  verification: {
    google: "NcApH-TXrnGY14mm3ebmb05zqlKtnUaBJsjkmTlW2oE",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://selempangacehbarat.com/#website",
      url: "https://selempangacehbarat.com",
      name: "Selempang Aceh Barat (FHD)",
      description:
        "Pusat produksi selempang wisuda bordir kilat 1 hari, sewa jas formal & pantofel di Meulaboh, Aceh Barat.",
      hasPart: [
        {
          "@type": "WebPage",
          name: "Katalog Produk & Sewa Jas",
          description:
            "Katalog sewa jas formal, selempang wisuda bordir kilat, dan sepatu pantofel Meulaboh",
          url: "https://selempangacehbarat.com/produk",
        },
        {
          "@type": "WebPage",
          name: "Tentang Kami",
          description: "Profil usaha, visi, dan workshop Selempang Aceh Barat di Meureubo",
          url: "https://selempangacehbarat.com/tentang-kami",
        },
        {
          "@type": "WebPage",
          name: "Galeri Wisudawan",
          description: "Dokumentasi dan testimoni wisudawan UTU, STAIN & AKPER Aceh Barat",
          url: "https://selempangacehbarat.com/galeri",
        },
        {
          "@type": "WebPage",
          name: "Blog & Panduan Wisuda",
          description: "Tips ukuran jas, panduan wisuda, dan perbedaan selempang bludru vs satin",
          url: "https://selempangacehbarat.com/blog",
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": "https://selempangacehbarat.com/#navigation",
      name: "Navigasi Utama",
      itemListElement: [
        {
          "@type": "SiteNavigationElement",
          position: 1,
          name: "Katalog Produk & Sewa Jas",
          url: "https://selempangacehbarat.com/produk",
        },
        {
          "@type": "SiteNavigationElement",
          position: 2,
          name: "Tentang Kami",
          url: "https://selempangacehbarat.com/tentang-kami",
        },
        {
          "@type": "SiteNavigationElement",
          position: 3,
          name: "Galeri Wisudawan",
          url: "https://selempangacehbarat.com/galeri",
        },
        {
          "@type": "SiteNavigationElement",
          position: 4,
          name: "Blog & Panduan Wisuda",
          url: "https://selempangacehbarat.com/blog",
        },
      ],
    },
    {
      "@type": ["ClothingStore", "LocalBusiness"],
      "@id": "https://selempangacehbarat.com/#store",
      name: "Selempang Aceh Barat (FHD)",
      alternateName: [
        "Sewa Jas Sepatu Aceh Barat",
        "Selempang Wisuda Aceh Barat",
        "FHD Selempang Meulaboh",
      ],
      description:
        "Pusat produksi selempang wisuda custom bahan bludru & satin bordir komputer kilat, persewaan jas wisuda & sidang skripsi pria/wanita, sepatu pantofel, serta konveksi seragam PDH di Meulaboh, Aceh Barat.",
      url: "https://selempangacehbarat.com",
      telephone: "+6282299256343",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+6282299256343",
          contactType: "Pemesanan Selempang & Konveksi PDH",
          availableLanguage: ["id"]
        },
        {
          "@type": "ContactPoint",
          telephone: "+6282276027590",
          contactType: "Sewa Jas Wisuda & Sepatu Pantofel",
          availableLanguage: ["id"]
        }
      ],
      sameAs: [
        "https://instagram.com/selempang_acehbarat",
        "https://instagram.com/sewajassepatu_acehbarat",
        "https://tiktok.com/@selempang_acehbarat"
      ],
      areaServed: [
        { "@type": "AdministrativeArea", "name": "Meulaboh" },
        { "@type": "AdministrativeArea", "name": "Meureubo" },
        { "@type": "AdministrativeArea", "name": "Kabupaten Aceh Barat" },
        { "@type": "AdministrativeArea", "name": "Aceh" }
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Layanan Bisnis Selempang Aceh Barat (FHD)",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Selempang Wisuda Custom (Bludru & Satin)",
              description: "Selempang wisuda custom berbahan bludru tebal 2 lapis dan satin mewah di Meulaboh"
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Jasa Bordir Nama dan Gelar pada Selempang",
              description: "Bordir komputer presisi nama, gelar akademik, logo kampus, pita, renda, dan rumbai anti-typo 100%"
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Sewa Jas Wisuda dan Sidang Skripsi",
              description: "Rental jas pria/wanita, kemeja putih, celana bahan, rok, dan dasi formal steril siap pakai"
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Sewa Sepatu Pantofel Pria & Wanita",
              description: "Rental & penjualan sepatu pantofel kulit formal kilap insole empuk ukuran 35-44"
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Konveksi PDH dan Almamater Aceh Barat",
              description: "Produksi seragam kemeja PDH, kaos event angkatan, jas almamater, ID card PVC panitia, dan medali wisuda"
            }
          }
        ]
      },
      image: "https://selempangacehbarat.com/Gambar/LOGOFHD.png",
      priceRange: "Rp 15.000 – Rp 135.000",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jl. Alue Peunyareng / Jln Alpen, Gampong Gunong Kleng, Kecamatan Meureubo",
        addressLocality: "Meulaboh, Kecamatan Meureubo",
        addressRegion: "Kabupaten Aceh Barat, Aceh",
        postalCode: "23615",
        addressCountry: "ID",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 4.137,
        longitude: 96.135,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "08:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "20:00",
          closes: "23:00",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${plusJakarta.variable} ${playfair.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#faf9f6] text-[#0f172a] selection:bg-[#b48c28] selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
