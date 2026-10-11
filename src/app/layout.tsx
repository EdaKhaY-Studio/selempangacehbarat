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
  title: "Selempang Aceh Barat (FHD) — Pusat Selempang & Sewa Jas Meulaboh",
  description:
    "Pusat produksi selempang wisuda bordir kilat 1 hari, sewa jas formal & pantofel di Meulaboh. Buka sampai jam 23:00 di Jln Alpen Meureubo (Dekat Kampus UTU & STAIN).",
  keywords: [
    "selempang aceh barat",
    "selempang wisuda meulaboh",
    "sewa jas aceh barat",
    "sewa sepatu aceh barat",
    "baju pdh meulaboh",
    "almamater aceh barat",
    "id card dan medali meulaboh",
    "selempang bludru aceh barat",
    "selempang satin aceh barat",
  ],
  authors: [{ name: "Selempang Aceh Barat", url: "https://selempangacehbarat.com" }],
  creator: "Selempang Aceh Barat",
  publisher: "Selempang Aceh Barat",
  alternates: {
    canonical: "https://selempangacehbarat.com",
  },
  openGraph: {
    title: "Selempang Aceh Barat (FHD) — Pusat Selempang & Sewa Jas Meulaboh",
    description:
      "Buka sampai jam 23:00! Sewa jas rapi & selempang wisuda bordir kilat 1 hari Meulaboh. Order online via web.",
    url: "https://selempangacehbarat.com",
    siteName: "Selempang Aceh Barat",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Selempang Aceh Barat (FHD)",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Selempang Aceh Barat (FHD)",
    description: "Pusat selempang wisuda & sewa jas formal Meulaboh.",
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
    icon: "/Gambar/LOGOFHD.png",
    apple: "/Gambar/LOGOFHD.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["ClothingStore", "LocalBusiness"],
  name: "Selempang Aceh Barat",
  alternateName: ["Sewa Jas Sepatu Aceh Barat", "Selempang Wisuda Aceh Barat", "FHD Selempang"],
  description:
    "Pusat produksi selempang wisuda bludru & satin, konveksi PDH/almamater/medali, serta persewaan jas formal dan sepatu pantofel di Aceh Barat.",
  url: "https://selempangacehbarat.com",
  telephone: "+6282299256343",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jln Alpen, Gampong Gunung Kleng, Kecamatan Meureubo",
    addressLocality: "Meulaboh",
    addressRegion: "Kabupaten Aceh Barat",
    postalCode: "23681",
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
  priceRange: "Rp 15.000 – Rp 135.000",
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
