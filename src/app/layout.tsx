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
  title: {
    default: "Selempang Aceh Barat",
    template: "%s | Selempang Aceh Barat",
  },
  description:
    "Pusat produksi selempang wisuda (bahan bludru & satin), konveksi seragam (PDH, kaos, almamater, ID card & medali), serta jasa persewaan jas formal & sepatu pantofel di Meulaboh, Aceh Barat.",
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
  authors: [{ name: "Selempang Aceh Barat", url: "https://sewajasacehbarat.com" }],
  creator: "Selempang Aceh Barat",
  publisher: "Selempang Aceh Barat",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://sewajasacehbarat.com",
    title: "Selempang Aceh Barat",
    description:
      "Pusat produksi selempang wisuda bludru & satin, seragam konveksi, dan persewaan jas formal & sepatu pantofel di Aceh Barat.",
    siteName: "Selempang Aceh Barat",
  },
  twitter: {
    card: "summary_large_image",
    title: "Selempang Aceh Barat",
    description: "Pusat produksi selempang wisuda dan jasa sewa jas formal & sepatu pantofel di Meulaboh, Aceh Barat.",
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
  alternates: {
    canonical: "https://sewajasacehbarat.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["ClothingStore", "LocalBusiness"],
  name: "Selempang Aceh Barat",
  alternateName: ["Sewa Jas Sepatu Aceh Barat", "Selempang Wisuda Aceh Barat"],
  description:
    "Pusat produksi selempang wisuda bludru & satin, konveksi PDH/almamater/medali, serta persewaan jas formal dan sepatu pantofel di Aceh Barat.",
  url: "https://sewajasacehbarat.com",
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
