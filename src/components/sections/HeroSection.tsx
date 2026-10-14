"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, CheckCircle2, Sparkles, PenLine, Zap, ShieldCheck, Clock } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const LOCAL_AVATARS = [
  { type: "image", src: "/Gambar/Rovi-Anita.png", alt: "Rofi Arnita" },
  { type: "initial", letter: "R", bg: "bg-[#5D4037]", name: "Ratna Sari" },
  { type: "image", src: "/Gambar/Maira-sartika.png", alt: "Maira Sartika" },
  { type: "initial", letter: "W", bg: "bg-[#0f172a]", name: "Wisudawan UTU" },
];

type AnimationPhase =
  | "TYPING"        // Text typing out, underline hidden
  | "UNDERLINE_IN"  // Text full, line draws Right-to-Left
  | "HOLD"          // Both visible for 2500ms - 3000ms
  | "UNDERLINE_OUT" // Line wipes away Left-to-Right
  | "RESET";        // Line gone, text clears, loop back to TYPING

const TARGET_TEXT = "Tampil Berwibawa di Hari Bersejarah!";

const STITCH_HERO_SLIDES = [
  {
    id: 1,
    src: "/Gambar/male-graduate-suit-full.jpg",
    alt: "Full-body male model wearing complete three-piece black formal graduation suit with embroidered sash and Oxford shoes",
    tag: "SEWA JAS PRIA + DASI",
    title: "Jas Pria + Dasi Formal",
    price: "Rp 50.000",
    subtext: "Pilihan warna: Hitam, Cream, Abu-Abu, Coklat, Maron",
  },
  {
    id: 2,
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAr-e_rGospVQPboskLeppHkkNvw5cKBoMLWiQszAbmnwrL97XVB2IdbN0DrYgXfXz481mZdol_oz8khfUPE402EnxDq9kdwu14gXJ8R8tYc5Q8k1HhD7i9h9l0w77lG4j9m2aP_gLz_o1LqD_2kFw8mQ_7vJ9n_0oXz3bM",
    alt: "A complete elegant male graduation suit bundle set arranged neatly on dark slate surface",
    tag: "SEWA JAS WANITA & SEPATU",
    title: "Jas Wanita & Sepatu Pantofel",
    price: "Rp 35k - 40k",
    subtext: "Jas Wanita (35k-40k), Kemeja (25k), Celana (25k), Sepatu (30k-35k)",
  },
  {
    id: 3,
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuACGb4x2T6Ey5MqMf2FS15rYdtYlVPM8sNxUDMnOd8Dkmxa1jBs_eT9IXzl8LfSgXjDDgve0S5qx5Bo28kSB5YtdCeVGKnTbBqAZ1x3mP0qK7l9vJ8sN5t2w4oX_7pB8m1kL3r5z0nQ_6tW2y8bM",
    alt: "A close-up high-resolution shot of a deep black velvet graduation sash with gold computer embroidery",
    tag: "PRODUKSI SELEMPANG (DIJUAL)",
    title: "Selempang Bludru & Satin Bordir",
    price: "Rp 50k - 135k",
    subtext: "Range harga mulai Rp 50.000 - Rp 135.000 (Bordir Komputer)",
  },
];

export function HeroSection() {
  const [phase, setPhase] = useState<AnimationPhase>("TYPING");
  const [displayText, setDisplayText] = useState("");

  // Slideshow & Freeze Layer State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 5-Phase Choreographed Typewriter & Directional Underline State Machine
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (phase === "TYPING") {
      if (displayText.length < TARGET_TEXT.length) {
        timer = setTimeout(() => {
          setDisplayText(TARGET_TEXT.slice(0, displayText.length + 1));
        }, 65);
      } else {
        // Phase 1 -> Phase 2: Underline animates in from Right-to-Left
        timer = setTimeout(() => {
          setPhase("UNDERLINE_IN");
        }, 120);
      }
    } else if (phase === "UNDERLINE_IN") {
      // Underline entrance transition duration is 500ms -> Phase 3: HOLD
      timer = setTimeout(() => {
        setPhase("HOLD");
      }, 520);
    } else if (phase === "HOLD") {
      // Hold both full text and underline static for 2600ms -> Phase 4: UNDERLINE_OUT
      timer = setTimeout(() => {
        setPhase("UNDERLINE_OUT");
      }, 2600);
    } else if (phase === "UNDERLINE_OUT") {
      // Underline wipes out from Left-to-Right for 450ms -> Phase 5: RESET
      timer = setTimeout(() => {
        setPhase("RESET");
      }, 470);
    } else if (phase === "RESET") {
      // Line is fully gone; clear text and smoothly loop back to TYPING
      setDisplayText("");
      timer = setTimeout(() => {
        setPhase("TYPING");
      }, 220);
    }

    return () => clearTimeout(timer);
  }, [phase, displayText]);

  // Slideshow Auto-rotation with Freeze Layer support
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % STITCH_HERO_SLIDES.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      id="home"
      className="relative lg:min-h-[85vh] lg:flex lg:items-center bg-gradient-to-b from-white via-[#faf9f6] to-[#f8fafc] overflow-hidden pt-[76px] sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 border-b border-[#cbd5e1]/40"
    >
      <span id="beranda" className="absolute -top-20" />

      {/* ── Ambient Boutique Lighting (Stitch Radial Aesthetic) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(180,140,40,0.12)_0%,transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-200/50 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-[#b48c28]/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* ═════════ SISI KIRI: Headline, Typewriter, Dual CTA & Trust Metrics ═════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col gap-5 sm:gap-6 items-start text-left"
          >
            {/* Headline with Urgent Hook, Choreographed Typewriter & Directional Underline */}
            <div className="flex flex-col gap-2.5">
              {/* Urgent Hook Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-[#b48c28]/40 text-[#0f172a] text-xs font-semibold shadow-2xs antigravity float-bob float-delay-100 self-start">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                </span>
                <span className="text-[#b48c28] uppercase tracking-wider text-[11px] font-bold">
                  Slot Wisuda Terbatas
                </span>
                <span className="text-[#cbd5e1]">|</span>
                <span className="text-[#475569] font-medium text-[11px]">
                  Pesan Kilat 1 Hari Siap Bebas Overload
                </span>
              </div>

              <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-[42px] xl:text-[48px] font-bold text-[#0f172a] tracking-tight leading-[1.2]">
                Selempang Wisuda &amp; Sewa Jas Aceh Barat —{" "}
                <span className="relative inline-block align-top text-[#b48c28] italic font-serif pb-1.5 min-h-[2.5em] sm:min-h-[1.25em]">
                  <span className="grid grid-cols-1 grid-rows-1 items-start text-left">
                    {/* ── GHOST SPACER: Permanently holds full height, line wraps & SVG underline space ── */}
                    <span
                      className="col-start-1 row-start-1 opacity-0 pointer-events-none select-none invisible"
                      aria-hidden="true"
                    >
                      <span>Tampil Berwibawa di Hari Bersejarah!</span>
                      <span className="block h-3 sm:h-3.5 w-full pointer-events-none invisible" />
                    </span>

                    {/* ── ACTIVE ANIMATED LAYER: Types, animates underline, holds & wipes ── */}
                    <span className="col-start-1 row-start-1 relative w-full">
                      <span className="inline-flex items-baseline">
                        <span>{displayText || "\u00A0"}</span>
                        {/* Smooth amber blinking cursor */}
                        <span
                          aria-hidden="true"
                          className={cn(
                            "inline-block w-[2.5px] sm:w-[3px] h-[0.75em] bg-[#b48c28] ml-1 sm:ml-1.5 align-baseline rounded-xs shadow-xs transition-opacity duration-150",
                            phase === "TYPING"
                              ? "animate-pulse opacity-100"
                              : phase === "HOLD"
                              ? "opacity-75"
                              : "opacity-0"
                          )}
                        />
                      </span>

                      {/* ── DIRECTIONAL GOLDEN CURVED BRUSH UNDERLINE (RTL in, LTR out) ── */}
                      <svg
                        className="absolute -bottom-1 left-0 w-full h-3 sm:h-3.5 overflow-visible pointer-events-none"
                        viewBox="0 0 320 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        style={{
                          clipPath:
                            phase === "UNDERLINE_IN" || phase === "HOLD"
                              ? "inset(0 0 0 0%)"
                              : "inset(0 0 0 100%)",
                          transition:
                            phase === "UNDERLINE_IN"
                              ? "clip-path 500ms cubic-bezier(0.25, 1, 0.5, 1)"
                              : phase === "UNDERLINE_OUT"
                              ? "clip-path 450ms cubic-bezier(0.4, 0, 0.2, 1)"
                              : "none",
                          opacity: phase === "TYPING" || phase === "RESET" ? 0 : 1,
                        }}
                      >
                        <path
                          d="M3 11.5C75 3.5 170 2.5 317 9.5C215 5 95 7 25 13.5"
                          stroke="url(#hero-stitch-brush)"
                          strokeWidth="3.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <defs>
                          <linearGradient id="hero-stitch-brush" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#b48c28" />
                            <stop offset="50%" stopColor="#d97706" />
                            <stop offset="100%" stopColor="#f59e0b" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </span>
                  </span>
                </span>
              </h1>
            </div>

            {/* Subheadline (Stitch Refined Prose) */}
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl font-normal">
              Pusat produksi selempang wisuda (bahan bludru &amp; satin bordir komputer), seragam PDH, kaos, almamater, ID card, medali, serta persewaan jas formal &amp; sepatu pantofel di Meulaboh, Aceh Barat.
            </p>

            {/* Dual CTA Buttons (High-Conversion Hierarchy) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-1">
              <a
                href="https://wa.me/6282299256343?text=Halo%20Selempang%20Aceh%20Barat,%20saya%20mau%20Amankan%20Tanggalmuu!!%20untuk%20booking%20wisuda/sidang"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#0f172a] hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-lg shadow-[#0f172a]/20 active:scale-98 group"
              >
                <span>Amankan Tanggalmuu!!</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#katalog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white border border-[#cbd5e1] hover:bg-[#f1f5f9] hover:border-[#b48c28] text-[#0f172a] font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 shadow-xs active:scale-98"
              >
                <PenLine size={15} className="text-[#b48c28]" />
                <span>Katalog &amp; Custom Nama</span>
              </a>
            </div>

            {/* Trust Bar: Indikator Status Buka Toko + Icon Metode Bayar Midtrans + Rating */}
            <div className="flex flex-col gap-2.5 w-full max-w-xl mt-1.5 antigravity float-gentle float-delay-500">
              {/* Status Buka Toko (Live Beacon) */}
              <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-emerald-50/90 border border-emerald-200/90 text-xs text-emerald-950 shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="font-bold text-[11px] sm:text-xs">Toko Buka Hari Ini</span>
                  <span className="text-emerald-400 hidden xs:inline">•</span>
                  <span className="text-[11px] text-emerald-800 font-medium hidden xs:inline">
                    Pagi 08:00 - 18:00 &amp; Malam 20:00 - 23:00 WIB
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[#0f172a] text-[10px] sm:text-[11px] font-bold bg-white px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                  <Clock size={12} className="text-[#b48c28]" />
                  <span>Sampai 23:00</span>
                </div>
              </div>

              {/* 2-Column Trust Metric: Rating & Midtrans Snap Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-3.5 rounded-xl bg-white border border-[#cbd5e1]/80 shadow-xs">
                {/* Rating 5.0 Google Review */}
                <div className="sm:col-span-5 flex items-center justify-between sm:justify-start gap-3">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 text-amber-500 font-bold text-xs sm:text-sm font-serif">
                      <Star size={15} className="fill-amber-400 text-amber-400 shrink-0" />
                      <span className="text-[#0f172a]">5.0 / 5.0</span>
                    </div>
                    <span className="text-[11px] text-[#475569] font-light truncate">
                      1.000+ Wisudawan Aceh
                    </span>
                  </div>
                  <div className="h-8 w-[1px] bg-[#cbd5e1]/70 ml-auto hidden sm:block" />
                </div>

                {/* Metode Bayar Midtrans Snap */}
                <div className="sm:col-span-7 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-[#475569] font-semibold uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck size={12} className="text-[#b48c28]" />
                      Metode Bayar Midtrans Snap
                    </span>
                    <span className="text-[9px] bg-amber-50 text-[#b48c28] px-1.5 py-0.2 rounded font-bold border border-[#fde68a]">
                      Instan
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded bg-[#f8fafc] text-[#0f172a] text-[10px] font-bold border border-[#cbd5e1]/70 shadow-2xs">
                      QRIS
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#f8fafc] text-[#0f172a] text-[10px] font-bold border border-[#cbd5e1]/70 shadow-2xs">
                      BSI
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#f8fafc] text-[#0f172a] text-[10px] font-bold border border-[#cbd5e1]/70 shadow-2xs">
                      BCA
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#f8fafc] text-[#0f172a] text-[10px] font-bold border border-[#cbd5e1]/70 shadow-2xs">
                      Mandiri
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#f8fafc] text-[#0f172a] text-[10px] font-bold border border-[#cbd5e1]/70 shadow-2xs">
                      GoPay
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof Avatars Row */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex -space-x-2.5 overflow-hidden">
                {LOCAL_AVATARS.map((avatar, i) => (
                  <div
                    key={i}
                    className="relative w-7 h-7 rounded-full ring-2 ring-white overflow-hidden bg-zinc-100 flex items-center justify-center shadow-xs"
                    title={avatar.name}
                  >
                    {avatar.type === "image" && avatar.src ? (
                      <Image
                        src={avatar.src}
                        alt={avatar.alt || avatar.name || "Avatar Ulasan"}
                        fill
                        className="object-cover"
                        sizes="28px"
                      />
                    ) : (
                      <span className={`w-full h-full flex items-center justify-center font-bold text-white text-[10px] ${avatar.bg}`}>
                        {avatar.letter}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <span className="text-xs text-[#475569] font-light">
                Dipercayakan ribuan wisudawan <strong className="text-[#0f172a] font-semibold">UTU, STAIN, USK &amp; Poltekkes</strong>
              </span>
            </div>
          </motion.div>

          {/* ═════════ SISI KANAN: Stitch Luxury Boutique Showcase Card (Clean Product Showcase) ═════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative w-full aspect-[4/5] max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-2xl bg-white border border-[#cbd5e1]/60 group antigravity float-slow antigravity-shadow">
              {/* Product Showcase Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={STITCH_HERO_SLIDES[0].src}
                  alt="Male model wearing complete three-piece black formal graduation suit with embroidered sash and Oxford shoes"
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover object-center filter contrast-[1.04] transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Gradient Vignette for Readability (Stitch Style) */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Top Right Label: SELEMPANG ACEH BARAT */}
              <div className="absolute top-4 right-4 z-10 pointer-events-auto">
                <span className="px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-[10px] sm:text-[11px] text-[#fde68a] font-bold tracking-wider border border-[#b48c28]/50 uppercase shadow-xs antigravity float-bob float-delay-200 inline-block">
                  SELEMPANG ACEH BARAT
                </span>
              </div>

              {/* Floating Product Details Badge (Stitch Clean Showcase) */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/95 backdrop-blur-md shadow-lg border border-[#cbd5e1]/60 flex items-center justify-between pointer-events-auto z-10 antigravity float-fast float-delay-400">
                <div className="flex flex-col pr-2">
                  <span className="text-[10px] sm:text-[11px] text-[#b48c28] tracking-widest uppercase font-bold">
                    SEWA JAS PRIA + DASI
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#0f172a] line-clamp-1">
                    Jas Pria + Dasi Formal
                  </span>
                  <span className="text-[10px] text-[#475569] font-normal mt-0.5 line-clamp-1">
                    Pilihan warna: Hitam, Cream, Abu-Abu, Coklat, Maron
                  </span>
                </div>
                <div className="text-right pl-3 shrink-0 border-l border-[#cbd5e1]/70">
                  <span className="text-[10px] text-[#475569] block font-medium">Sewa</span>
                  <span className="font-mono text-sm sm:text-base text-[#b48c28] font-bold">
                    Rp 50.000
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
