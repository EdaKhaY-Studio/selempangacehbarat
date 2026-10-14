"use client";

import { useState } from "react";
import { GraduationCap, ShieldCheck } from "lucide-react";

export interface PartnerLogo {
  id: number;
  name: string;
  fullName: string;
  img: string;
  color?: string;
  category?: string;
}

export const PARTNER_LOGOS: PartnerLogo[] = [
  // Universitas & Institut Negeri / Swasta
  {
    id: 1,
    name: "UTU Meulaboh",
    fullName: "Universitas Teuku Umar",
    img: "./Gambar/utu.png",
    category: "Universitas Negeri",
  },
  {
    id: 2,
    name: "USK",
    fullName: "Universitas Syiah Kuala",
    img: "./Gambar/usk.png",
    category: "Universitas Negeri",
  },
  {
    id: 3,
    name: "UIN Ar-Raniry",
    fullName: "UIN Ar-Raniry Banda Aceh",
    img: "./Gambar/uin-ar-raniry.png",
    category: "Universitas Islam Negeri",
  },
  {
    id: 4,
    name: "Unimal",
    fullName: "Universitas Malikussaleh",
    img: "./Gambar/unimal.png",
    category: "Universitas Negeri",
  },
  {
    id: 5,
    name: "STAIN Meulaboh",
    fullName: "STAIN Teungku Dirundeng Meulaboh",
    img: "./Gambar/stain-meulaboh.png",
    category: "Sekolah Tinggi Agama Islam",
  },
  {
    id: 6,
    name: "UT",
    fullName: "Universitas Terbuka",
    img: "./Gambar/ut.png",
    category: "Universitas Terbuka",
  },
  {
    id: 7,
    name: "UBBG",
    fullName: "Universitas Bina Bangsa Getsempena",
    img: "./Gambar/ubbg.png",
    category: "Universitas",
  },
  {
    id: 8,
    name: "Univ Abulyatama",
    fullName: "Universitas Abulyatama Aceh",
    img: "./Gambar/abulyatama.png",
    category: "Universitas",
  },
  {
    id: 9,
    name: "UUI",
    fullName: "Universitas Ubudiyah Indonesia",
    img: "./Gambar/uui.png",
    category: "Universitas",
  },
  {
    id: 10,
    name: "UNPRI",
    fullName: "Universitas Prima Indonesia",
    img: "./Gambar/unpri.png",
    category: "Universitas",
  },
  {
    id: 11,
    name: "USMI",
    fullName: "Universitas Sari Mutiara Indonesia",
    img: "./Gambar/usmi.png",
    category: "Universitas",
  },
  {
    id: 12,
    name: "UPERTIS",
    fullName: "Universitas Perintis Indonesia",
    img: "./Gambar/upertis.png",
    category: "Universitas",
  },
  {
    id: 13,
    name: "UJG",
    fullName: "Universitas Jabal Ghafur Sigli",
    img: "./Gambar/ujg.png",
    category: "Universitas",
  },
  {
    id: 14,
    name: "UIA",
    fullName: "Universitas Islam Aceh",
    img: "./Gambar/uia.png",
    category: "Universitas",
  },
  {
    id: 15,
    name: "UISU Medan",
    fullName: "Universitas Islam Sumatera Utara",
    img: "./Gambar/uisu.png",
    category: "Universitas",
  },
  {
    id: 16,
    name: "UNCM",
    fullName: "Universitas Nusantara",
    img: "./Gambar/uncm.png",
    category: "Universitas",
  },

  // Politeknik & Sekolah Tinggi Kesehatan / Kejuruan
  {
    id: 17,
    name: "Poltekkes Aceh",
    fullName: "Poltekkes Kemenkes Aceh",
    img: "./Gambar/poltekkes-aceh.png",
    category: "Kemenkes RI",
  },
  {
    id: 18,
    name: "STIKES MBO",
    fullName: "STIKES Medika Seramoe Barat",
    img: "./Gambar/stikes-mbo.png",
    category: "Sekolah Tinggi Ilmu Kesehatan",
  },
  {
    id: 19,
    name: "IKDH Medan",
    fullName: "Institut Kesehatan Deli Husada",
    img: "./Gambar/ikdh.png",
    category: "Institut Kesehatan",
  },
  {
    id: 20,
    name: "Mitra Husada",
    fullName: "STIKes Mitra Husada Medan",
    img: "./Gambar/mitra-husada.png",
    category: "Sekolah Tinggi",
  },
  {
    id: 21,
    name: "Politeknik ASEL",
    fullName: "Politeknik Aceh Selatan",
    img: "./Gambar/poltek-asel.png",
    category: "Politeknik",
  },
  {
    id: 22,
    name: "STIKES MA",
    fullName: "STIKes Muhammadiyah Aceh",
    img: "./Gambar/stikes-ma.png",
    category: "Sekolah Tinggi",
  },
  {
    id: 23,
    name: "STIKES DL",
    fullName: "STIKes Darussalam Lhokseumawe",
    img: "./Gambar/stikes-dl.png",
    category: "Sekolah Tinggi",
  },
  {
    id: 24,
    name: "YAPPKES SIN",
    fullName: "Akper Yappkes Aceh Singkil",
    img: "./Gambar/yappkes.png",
    category: "Akademi Keperawatan",
  },
  {
    id: 25,
    name: "STIP YASHAFA",
    fullName: "STIP Yashafa Aceh Singkil",
    img: "./Gambar/stip-yashafa.png",
    category: "Sekolah Tinggi Pertanian",
  },
  {
    id: 26,
    name: "STIT Simeulue",
    fullName: "STIT Simeulue",
    img: "./Gambar/stit-simeulue.png",
    category: "Tarbiyah Islamiyah",
  },
  {
    id: 27,
    name: "STIT HAFAS",
    fullName: "STIT Hamzah Fansuri Subulussalam",
    img: "./Gambar/stit-hafas.png",
    category: "Tarbiyah Islamiyah",
  },
  {
    id: 28,
    name: "STAI SAR",
    fullName: "STAI Syekh Abdur Rauf Singkil",
    img: "./Gambar/stai-sar.png",
    category: "Sekolah Tinggi Agama Islam",
  },
  {
    id: 29,
    name: "STAI Darul Hikmah",
    fullName: "STAI Darul Hikmah Aceh Barat",
    img: "./Gambar/stai-darul-hikmah.png",
    category: "Sekolah Tinggi Agama Islam",
  },
  {
    id: 30,
    name: "Stiapen Nara",
    fullName: "STIA Pelita Nusantara",
    img: "./Gambar/stiapen-nara.png",
    category: "Administrasi Negara",
  },
  {
    id: 31,
    name: "PPG",
    fullName: "Pendidikan Profesi Guru",
    img: "./Gambar/ppg.png",
    category: "Profesi Pendidik",
  },

  // Instansi Kedinasan & Keamanan
  {
    id: 32,
    name: "POLRI",
    fullName: "Kepolisian Negara Republik Indonesia",
    img: "./Gambar/polri.png",
    category: "Instansi Kepolisian",
  },
  {
    id: 33,
    name: "TNI-AD",
    fullName: "Tentara Nasional Indonesia Angkatan Darat",
    img: "./Gambar/tni-ad.png",
    category: "Instansi Militer",
  },
  {
    id: 34,
    name: "TNI-AL",
    fullName: "Tentara Nasional Indonesia Angkatan Laut",
    img: "./Gambar/tni-al.png",
    category: "Instansi Militer",
  },
];

function LogoCard({ partner, ariaHidden }: { partner: PartnerLogo; ariaHidden?: boolean }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      aria-hidden={ariaHidden ? "true" : undefined}
      className="group/card relative flex items-center gap-3.5 px-4 sm:px-5 py-3 rounded-2xl bg-white border border-[#cbd5e1]/80 hover:border-[#b48c28]/60 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 shrink-0 select-none cursor-pointer"
      title={`${partner.name} — ${partner.fullName}`}
    >
      {/* Wadah Lingkaran Putih Bersih */}
      <div className="w-12 h-12 rounded-full bg-white border border-[#cbd5e1]/70 flex items-center justify-center shrink-0 shadow-2xs group-hover/card:border-[#b48c28]/50 transition-colors overflow-hidden">
        {!hasError ? (
          <img
            src={partner.img}
            alt={ariaHidden ? "" : `Logo ${partner.name}`}
            width={40}
            height={40}
            className="w-10 h-10 object-contain p-1 transition-transform duration-300 group-hover/card:scale-105"
            loading="lazy"
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-amber-50 text-[#b48c28] font-bold text-xs uppercase tracking-wider">
            {partner.name.slice(0, 3)}
          </div>
        )}
      </div>

      {/* Text Info */}
      <div className="text-left pr-1">
        <div className="flex items-center gap-1.5">
          <h4 className="font-serif text-sm font-bold text-[#0f172a] group-hover/card:text-[#b48c28] transition-colors leading-tight whitespace-nowrap">
            {partner.name}
          </h4>
          <ShieldCheck size={13} className="text-[#b48c28] shrink-0 opacity-80" />
        </div>
        <p className="text-[11px] text-[#475569] font-normal truncate max-w-[160px] sm:max-w-[200px] leading-tight mt-0.5">
          {partner.fullName}
        </p>
      </div>

      {/* Subtle hover accent light */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/0 via-amber-500/[0.03] to-amber-500/0 opacity-0 group-hover/card:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}

export function PartnerLogoWall() {
  return (
    <section className="relative py-12 sm:py-16 bg-[#faf9f6] border-b border-[#cbd5e1]/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        {/* Top Header Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#cbd5e1]/80 shadow-2xs mb-3">
          <GraduationCap size={14} className="text-[#b48c28]" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#475569]">
            Standar Busana Formal &amp; Selempang Toga Resmi
          </span>
        </div>

        {/* Section Heading */}
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0f172a] tracking-tight">
          Dipercaya Wisudawan dari 34+ Kampus &amp; Instansi
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-[#475569] font-normal max-w-xl mx-auto">
          Setelan jas formal presisi dan selempang wisuda bludru bordir komputer dengan logo standar resmi kampus dan kedinasan di Aceh, Sumatera Utara, dan nasional.
        </p>
      </div>

      {/* ── React Bits Infinite Logo Loop Track ── */}
      <div className="group/marquee relative w-full overflow-hidden py-3">
        {/* Left Gradient Fade Mask */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-44 bg-gradient-to-r from-[#faf9f6] via-[#faf9f6]/90 to-transparent z-10" />

        {/* Right Gradient Fade Mask */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-44 bg-gradient-to-l from-[#faf9f6] via-[#faf9f6]/90 to-transparent z-10" />

        {/* Infinite Moving Row (Auto-pause on hover) */}
        <div className="animate-marquee-loop flex items-center gap-4 sm:gap-6 pl-4">
          {PARTNER_LOGOS.map((partner) => (
            <LogoCard key={`primary-${partner.id}`} partner={partner} />
          ))}
          {/* Duplikat teknis seamless CSS loop disembunyikan dari screen reader & bot */}
          {PARTNER_LOGOS.map((partner) => (
            <LogoCard key={`clone-${partner.id}`} partner={partner} ariaHidden={true} />
          ))}
        </div>
      </div>
    </section>
  );
}
