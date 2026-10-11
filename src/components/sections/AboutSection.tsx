"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Shirt,
  Zap,
  ShieldCheck,
  Users,
  FileText,
  MapPin,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  Star,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

interface AboutServiceItem {
  icon: typeof Shirt;
  title: string;
  description: string;
  tag: string;
  cta?: {
    label: string;
    href: string;
  };
}

const ABOUT_SERVICES: AboutServiceItem[] = [
  {
    icon: Shirt,
    title: "Sewa Outfit Wisuda Lengkap",
    description:
      "Rental jas cowok/cewek, sepatu pantofel, kemeja putih, dasi, celana, dan rok bahan. Kondisi bersih, wangi, tinggal pakai buat foto studio.",
    tag: "Ready to Wear",
  },
  {
    icon: Zap,
    title: "Selempang Bordir Kilat",
    description:
      "Bahan bludru & satin mewah. Mesin bordir komputer sendiri, tembus 50+ pcs per hari. Deadline mepet tetap gas.",
    tag: "Kilat 1 Hari",
  },
  {
    icon: ShieldCheck,
    title: "Garansi Anti-Typo 100%",
    description:
      "Salah gelar atau typo nama? Langsung kita ganti baru gratis tanpa debat.",
    tag: "Garansi Ganti Baru",
  },
  {
    icon: Users,
    title: "Order Satuan & Grosiran",
    description:
      "Mau bikin satu doang buat wisuda sendiri atau ribuan pcs bareng angkatan/fakultas, semua dilayani.",
    tag: "Satuan & Rombongan",
  },
  {
    icon: FileText,
    title: "Aman Buat LPJ/SPJ",
    description:
      "Butuh nota dinas, kuitansi, atau stempel toko buat klaim dana kampus/BEM? Kita siapin lengkap.",
    tag: "Kuitansi & Nota Resmi",
  },
  {
    icon: MapPin,
    title: "Lokasi Basecamp",
    description:
      "Selempang Aceh Barat FHD — Jln. Alpen, Gampong Gunung Kleng, Kec. Meureubo, Kab. Aceh Barat (zona kampus UTU & STAIN Meulaboh).",
    tag: "Dekat Kampus UTU & STAIN",
    cta: {
      label: "Buka di Google Maps",
      href: "https://www.google.com/maps/search/?api=1&query=Selempang+Aceh+Barat+FHD",
    },
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inViewRef = useRef(false);

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState("0.0");
  const [isUnderlineDrawn, setIsUnderlineDrawn] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    let animFrameId: number;
    let loopTimer: NodeJS.Timeout;
    let isCurrentlyAnimating = false;

    const startAnimation = () => {
      if (isCurrentlyAnimating) return;
      isCurrentlyAnimating = true;

      // Reset dan jalankan animasi sapuan kuas garis lengkung SVG
      setIsUnderlineDrawn(false);
      setTimeout(() => {
        setIsUnderlineDrawn(true);
      }, 60);

      const startTime = performance.now();
      const duration = 1800; // 1.8s (dalam rentang 1.5 - 2 detik)

      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const eased = easeOutCubic(progress);

        // Counter 1: 0 -> 485
        const val1 = Math.round(eased * 485);
        setCount1(val1);

        // Counter 2: 0 -> 20
        const val2 = Math.round(eased * 20);
        setCount2(val2);

        // Counter 3: 0.0 -> 5.0
        const val3 = (eased * 5.0).toFixed(1);
        setCount3(val3);

        if (progress < 1) {
          animFrameId = requestAnimationFrame(step);
        } else {
          setCount1(485);
          setCount2(20);
          setCount3("5.0");
          isCurrentlyAnimating = false;

          // Loop berkala tiap 6 detik jika masih di viewport
          loopTimer = setTimeout(() => {
            if (inViewRef.current) {
              startAnimation();
            }
          }, 6000);
        }
      };

      animFrameId = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            inViewRef.current = true;
            startAnimation();
          } else {
            inViewRef.current = false;
            isCurrentlyAnimating = false;
            cancelAnimationFrame(animFrameId);
            clearTimeout(loopTimer);
            setIsUnderlineDrawn(false);
            setCount1(0);
            setCount2(0);
            setCount3("0.0");
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animFrameId);
      clearTimeout(loopTimer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tentang-kami"
      className="relative py-16 sm:py-20 lg:py-24 bg-[#faf9f6] border-b border-[#cbd5e1]/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ═════════ HEADER SECTION TENTANG KAMI ═════════ */}
        <div className="flex flex-col items-center text-center gap-3 max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Badge / Sub-heading */}
          <span className="font-mono text-xs text-[#b48c28] tracking-widest uppercase font-bold flex items-center gap-1.5 bg-amber-50 px-3.5 py-1 rounded-full border border-[#fde68a] shadow-2xs">
            <Sparkles size={12} className="text-[#b48c28]" />
            Tentang Kami
          </span>

          {/* Main Title dengan Sapuan Garis Emas */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight leading-[1.2]">
            Selempang Aceh Barat (FHD)
          </h2>

          {/* Lead Paragraph */}
          <p className="text-sm sm:text-base lg:text-lg text-[#475569] font-light leading-relaxed max-w-2xl">
            Basecamp apparel wisuda &amp; rental outfit formal nomor satu di Meulaboh. Solusi satset buat sidang, yudisium, sampai wisuda akbar tanpa ribet.
          </p>
        </div>

        {/* ═════════ 6 POIN LAYANAN GRID (1 Kolom Mobile, 2 Kolom Tablet, 3 Kolom Desktop) ═════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {ABOUT_SERVICES.map((item, idx) => {
            const Icon = item.icon;
            const floatClasses = [
              "float-slow float-delay-100",
              "float-medium float-delay-300",
              "float-drift float-delay-500",
              "float-slow float-delay-700",
              "float-medium float-delay-900",
              "float-drift float-delay-1100",
            ];

            return (
              <div
                key={item.title}
                className={`bg-white rounded-2xl border border-[#cbd5e1]/80 p-6 sm:p-7 shadow-xs hover:border-[#b48c28] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group antigravity antigravity-pause-hover ${floatClasses[idx % floatClasses.length]}`}
              >
                <div className="flex flex-col gap-4">
                  {/* Icon & Tag Header */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 border border-[#fde68a]/70 flex items-center justify-center text-[#b48c28] group-hover:scale-110 group-hover:bg-[#0f172a] group-hover:text-[#fde68a] transition-all duration-300 shadow-2xs shrink-0">
                      <Icon size={24} />
                    </div>
                    <span className="text-[10px] font-bold text-[#b48c28] bg-amber-50/80 px-2.5 py-0.5 rounded-full border border-[#fde68a]/60 uppercase tracking-wider">
                      {item.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0f172a] group-hover:text-[#b48c28] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Direct Google Maps Action Button on Card 6 */}
                {item.cta && (
                  <div className="pt-4 mt-4 border-t border-[#f1f5f9]">
                    <a
                      href={item.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors group/btn active:scale-95"
                    >
                      <MapPin size={13} className="text-[#fde68a]" />
                      <span>{item.cta.label}</span>
                      <ExternalLink size={12} className="text-slate-400 group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ═════════ STATISTIK COUNTER BAR (Horizontal 1 Baris / 3 Kolom Sejajar) ═════════ */}
        <div className="mt-10 sm:mt-12 max-w-4xl mx-auto w-full">
          <div className="grid grid-cols-3 divide-x divide-neutral-200 rounded-2xl border border-neutral-100 bg-neutral-50/50 p-4 text-center shadow-sm">
            {/* Kolom 1 */}
            <div className="flex flex-col items-center justify-center px-1 sm:px-4">
              <span className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight tabular-nums">
                {count1}+
              </span>
              <p className="text-xs text-neutral-600 mt-1">
                Wisudawan &amp; Klien Terlayani di Aceh
              </p>
            </div>

            {/* Kolom 2 */}
            <div className="flex flex-col items-center justify-center px-1 sm:px-4">
              <span className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight tabular-nums">
                {count2}+
              </span>
              <p className="text-xs text-neutral-600 mt-1">
                Fakultas, Kampus &amp; Mitra
              </p>
            </div>

            {/* Kolom 3 */}
            <div className="flex flex-col items-center justify-center px-1 sm:px-4">
              <div className="flex items-center justify-center gap-1 sm:gap-1.5 text-amber-500">
                <span className="text-2xl sm:text-3xl font-black text-amber-500 tracking-tight tabular-nums">
                  {count3}
                </span>
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 fill-amber-500 shrink-0" />
              </div>
              <p className="text-xs text-neutral-600 mt-1">
                Rating Ulasan Asli Google Maps
              </p>
            </div>
          </div>
        </div>

        {/* ═════════ KISAH FOUNDER & DEDIKASI LOKAL ═════════ */}
        <div className="mt-14 sm:mt-18 pt-12 sm:pt-14 border-t border-[#cbd5e1]/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Foto Pendiri */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-md border border-[#cbd5e1]/70 overflow-hidden relative antigravity float-slow antigravity-shadow">
                <div className="aspect-[4/5] rounded-xl overflow-hidden relative bg-[#f1f5f9]">
                  <Image
                    src="/Gambar/bg-fardi-portrait.png"
                    alt="Potret Pendiri Selempang Aceh Barat FHD"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 420px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/85 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#fde68a] bg-[#0f172a]/60 px-2 py-0.5 rounded border border-[#fde68a]/30 inline-block mb-1">
                      FOUNDER &amp; BESPOKE TAILOR
                    </span>
                    <p className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
                      Bg Fardi, S.P.
                    </p>
                    <p className="text-xs text-slate-200 mt-0.5 font-light">
                      Alumni Perguruan Tinggi Meulaboh &amp; Praktisi Kriya Tekstil
                    </p>
                  </div>
                </div>

                {/* Floating Authenticity Seal */}
                <div className="mt-4 p-3.5 bg-[#f8fafc] rounded-xl border border-[#cbd5e1]/60 flex items-center justify-between antigravity float-bob float-delay-500">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 border border-[#fde68a]/60 flex items-center justify-center text-[#b48c28] shrink-0">
                      <ShieldCheck size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#0f172a]">
                        Komitmen Putra Daerah
                      </span>
                      <span className="text-[11px] text-[#475569] font-light">
                        Melayani wisudawan Barat Selatan Aceh
                      </span>
                    </div>
                  </div>
                  <span className="font-serif italic text-sm font-semibold text-[#b48c28]">
                    Est. 2023
                  </span>
                </div>
              </div>
            </div>

            {/* Narasi Kisah Dedikasi & Call to Action */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-0.5 bg-[#b48c28]" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#b48c28]">
                  Kisah di Balik Layar
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#0f172a] tracking-tight leading-[1.25]">
                Dedikasi Nyata untuk Senyum Orang Tua di Hari Kelulusan
              </h3>

              <div className="space-y-3 text-sm sm:text-base text-[#475569] leading-relaxed font-light">
                <p>
                  Sebagai mantan mahasiswa di Meulaboh, Bg Fardi mengingat betul kegelisahan menjelang sidang komprehensif dan hari wisuda. Kala itu, sulit sekali menemukan setelan jas berpotongan modern dengan bahan yang nyaman di cuaca pesisir pantai barat Aceh. Pilihan yang ada kerap kali jas lungsuran yang terlalu longgar, atau selempang nama yang hurufnya miring dan benang mudah terurai.
                </p>
                <p>
                  Dari workshop di Meureubo dengan komitmen teguh, Selempang Aceh Barat FHD bertumbuh menjadi rujukan utama mahasiswa Universitas Teuku Umar (UTU), STAIN Teungku Dirundeng, AKN Aceh Barat, serta instansi daerah.
                </p>
              </div>

              {/* 2 Core Value Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div className="bg-white p-4 rounded-xl border border-[#cbd5e1]/70 shadow-2xs">
                  <div className="flex items-center gap-2 mb-1.5 text-[#b48c28]">
                    <CheckCircle2 size={16} />
                    <span className="text-xs font-bold text-[#0f172a]">
                      Transparan Tanpa Biaya Tersembunyi
                    </span>
                  </div>
                  <p className="text-xs text-[#475569] leading-relaxed font-light">
                    Deposit jaminan jelas, biaya sewa tercantum gamblang, dan garansi tukar size bebas denda saat fitting.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#cbd5e1]/70 shadow-2xs">
                  <div className="flex items-center gap-2 mb-1.5 text-[#b48c28]">
                    <GraduationCap size={16} />
                    <span className="text-xs font-bold text-[#0f172a]">
                      Standar Akademik Kampus
                    </span>
                  </div>
                  <p className="text-xs text-[#475569] leading-relaxed font-light">
                    Memahami spesifikasi format nama, gelar, warna beludru fakultas, dan logo sah resmi universitas di wilayah Aceh Barat.
                  </p>
                </div>
              </div>

              {/* Tombol Hubungi WhatsApp */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="https://wa.me/6282299256343?text=Halo%20Selempang%20Aceh%20Barat%20FHD,%20saya%20ingin%20konsultasi%20pemesanan%20outfit%20wisuda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white font-semibold text-xs tracking-wider uppercase shadow-md transition-colors active:scale-95"
                >
                  <MessageCircle size={15} />
                  <span>Konsultasi via WhatsApp</span>
                </a>

                <a
                  href="#katalog"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-[#cbd5e1] hover:bg-[#f1f5f9] text-[#0f172a] font-semibold text-xs tracking-wider uppercase shadow-2xs transition-colors active:scale-95"
                >
                  <span>Lihat Katalog Produk</span>
                  <ArrowRight size={14} className="text-[#b48c28]" />
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
