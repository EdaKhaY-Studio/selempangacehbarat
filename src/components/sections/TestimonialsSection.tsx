"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image, { StaticImageData } from "next/image";

// Local image assets from src/Gambar/
import roviAnitaImg from "@/Gambar/Rovi-Anita.png";
import mairaSartikaImg from "@/Gambar/Maira-sartika.png";

// Official Google 'G' Icon (SVG)
function GoogleLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

interface TestimonialCard {
  id: string;
  name: string;
  avatarType: "image" | "initial";
  avatarImage?: StaticImageData;
  initial?: string;
  avatarBg?: string;
  reviewCount: string;
  source: string;
  timeAgo: string;
  rating: number;
  content: string;
}

const TESTIMONIALS_DATA: TestimonialCard[] = [
  {
    id: "card-1",
    name: "Rofi Arnita",
    avatarType: "image",
    avatarImage: roviAnitaImg,
    reviewCount: "1 ulasan",
    source: "Google Review",
    timeAgo: "setahun lalu",
    rating: 5,
    content:
      "Selempang nya bagus, sesuai dengan request, sukses terus selempang Aceh Barat",
  },
  {
    id: "card-2",
    name: "Ratna Sari",
    avatarType: "initial",
    initial: "R",
    avatarBg: "#5D4037", // Default Google Account neutral brown background
    reviewCount: "1 ulasan",
    source: "Google Review",
    timeAgo: "setahun lalu",
    rating: 5,
    content:
      "Selempang nya sangat bagus, rapi jahitannya, rapi tulisan nya, Dan juga murcek, dijamin ga bakal kecewa kok buat selempang disini, buat kalian yang nunggu moment yang kalian nanti kan boleh pesan di sini!",
  },
  {
    id: "card-3",
    name: "Maira sartika",
    avatarType: "image",
    avatarImage: mairaSartikaImg,
    reviewCount: "1 ulasan",
    source: "Google Review",
    timeAgo: "2 tahun lalu",
    rating: 5,
    content:
      "Terimakasih sudah memfasilitasi selempang nya dan jas nya, Bagus sekali",
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="testimoni"
      className="section-padding bg-[#faf9f6] relative border-b border-[#cbd5e1]/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#b48c28] mb-3 inline-block">
            Ulasan Asli Google Maps
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#0f172a] tracking-tight">
            Kata Mereka yang Sudah Memakai Produk Kami
          </h2>

          {/* Average Rating Summary */}
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-[#475569]">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="fill-[#b48c28] text-[#b48c28]"
                />
              ))}
            </div>
            <span className="font-bold text-[#0f172a]">5.0</span>
            <span>•</span>
            <span className="font-normal">Rata-rata Ulasan di Google Maps</span>
          </div>
        </div>

        {/* 3-Column Responsive Grid (1 col on mobile, 3 cols on desktop md/lg) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.45 }}
              className={`h-full flex flex-col justify-between p-6 sm:p-7 rounded-xl sm:rounded-2xl bg-white border border-[#cbd5e1]/60 hover:border-[#b48c28]/60 hover:shadow-xl transition-all duration-300 shadow-xs antigravity antigravity-pause-hover ${
                idx === 0
                  ? "float-slow float-delay-200"
                  : idx === 1
                  ? "float-medium float-delay-600"
                  : "float-drift float-delay-1000"
              }`}
            >
              <div>
                {/* Header Kartu: Avatar + Nama & Meta + Google Watermark */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar Display */}
                    {item.avatarType === "image" && item.avatarImage ? (
                      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#cbd5e1]/60 bg-zinc-100 shadow-xs">
                        <Image
                          src={item.avatarImage}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white font-medium text-base select-none shadow-xs"
                        style={{ backgroundColor: item.avatarBg || "#5D4037" }}
                        aria-label={`Inisial Akun ${item.name}`}
                      >
                        {item.initial}
                      </div>
                    )}

                    {/* Nama & Detail Meta */}
                    <div>
                      <h3 className="text-sm font-semibold text-[#0f172a] leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#475569] font-normal mt-0.5">
                        {item.reviewCount} • {item.source} • {item.timeAgo}
                      </p>
                    </div>
                  </div>

                  {/* Penanda Kredibilitas: Logo Google + Label Diulas di Google */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#f8fafc] border border-[#cbd5e1]/60 shrink-0 select-none">
                    <GoogleLogo className="w-3.5 h-3.5" />
                    <span className="text-[10px] text-[#475569] font-medium">
                      Diulas di Google
                    </span>
                  </div>
                </div>

                {/* Rating Bintang Emas Google (#b48c28) */}
                <div className="flex items-center gap-0.5 mb-3.5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className="fill-[#b48c28] text-[#b48c28]"
                    />
                  ))}
                </div>

                {/* 100% Teks Ulasan Asli */}
                <p className="text-sm text-[#0f172a] font-normal leading-relaxed whitespace-pre-line">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              {/* Footer Kartu: Penanda Status Autentik */}
              <div className="pt-4 mt-6 border-t border-[#cbd5e1]/40 flex items-center justify-between text-[11px] text-[#475569]">
                <span>Terverifikasi Google Maps</span>
                <span className="text-[#b48c28] font-semibold">Ulasan Nyata</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
