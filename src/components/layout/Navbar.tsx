"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, User } from "lucide-react";
import { cn } from "@/lib/utils";

export const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/tentang-kami", label: "Tentang Kami" },
  { href: "/produk", label: "Katalog Produk" },
  { href: "/blog", label: "Blog" },
];

const BRAND_LOGO_URL = "/Gambar/LOGOFHD.png";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/produk") return pathname.startsWith("/produk") || pathname.startsWith("/katalog-produk");
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-[#cbd5e1]/60 shadow-xs">
        <div className="h-14 sm:h-16 w-full px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-2 sm:gap-4 max-w-7xl mx-auto">
          {/* Logo & Brand */}
          <Link
            href="/"
            prefetch={true}
            className="flex items-center gap-2.5 select-none group min-w-0 shrink"
          >
            <img
              alt="Selempang Aceh Barat Logo"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain shrink-0 antigravity float-bob"
              src={BRAND_LOGO_URL}
            />
            <span className="font-serif text-sm sm:text-base font-semibold tracking-tight text-[#0f172a] group-hover:text-[#b48c28] transition-colors whitespace-nowrap leading-none">
              SELEMPANG ACEH BARAT
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  className={cn(
                    "text-xs font-medium transition-colors py-1",
                    active
                      ? "text-[#0f172a] font-bold border-b-2 border-[#0f172a]"
                      : "text-[#475569] hover:text-[#0f172a]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/produk"
              prefetch={true}
              className="hidden md:inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-[#0f172a] text-white font-serif text-xs font-semibold hover:bg-slate-800 transition-all shadow-md shadow-slate-900/10 active:scale-95 whitespace-nowrap antigravity float-gentle float-delay-300"
            >
              Konsultasi &amp; Booking
            </Link>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#b48c28]/15 border border-[#fde68a] flex items-center justify-center text-[#0f172a] shrink-0 antigravity float-bob float-delay-500">
              <User size={16} className="text-[#0f172a]" />
            </div>
            <button
              onClick={() => setMobileOpen(true)}
              className="xl:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#f1f5f9] border border-[#cbd5e1]/70 flex items-center justify-center text-[#0f172a] hover:bg-slate-200 transition-colors focus:outline-hidden shrink-0"
              aria-label="Buka Menu Navigasi"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (100% Stitch Mobile Drawer) */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col justify-between overflow-hidden z-10 border-l border-[#cbd5e1]/70"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#cbd5e1]/60 bg-[#f8fafc]">
                <Link
                  href="/"
                  prefetch={true}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 group select-none"
                >
                  <img
                    alt="Selempang Aceh Barat Logo"
                    className="w-8 h-8 object-contain shrink-0"
                    src={BRAND_LOGO_URL}
                  />
                  <div className="flex flex-col">
                    <span className="font-serif text-sm font-bold text-[#0f172a] group-hover:text-[#b48c28] transition-colors leading-tight">
                      SELEMPANG ACEH BARAT
                    </span>
                    <span className="text-[10px] text-[#b48c28] font-semibold tracking-wider uppercase">
                      Menu Mobile &amp; Navigasi
                    </span>
                  </div>
                </Link>
                <button
                  className="w-9 h-9 rounded-lg bg-white border border-[#cbd5e1]/60 text-[#475569] hover:text-[#0f172a] flex items-center justify-center transition-colors"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Tutup Menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] text-[#475569] font-bold uppercase tracking-wider px-2">
                    Halaman Utama
                  </span>
                  <nav className="flex flex-col gap-1">
                    {NAV_LINKS.map((link) => {
                      const active = isLinkActive(link.href);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          prefetch={true}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-xs transition-colors",
                            active
                              ? "bg-amber-50 text-[#0f172a] font-bold border border-[#fde68a]"
                              : "text-[#0f172a] hover:bg-[#f8fafc]"
                          )}
                        >
                          <span>{link.label}</span>
                          <ArrowRight
                            size={14}
                            className={active ? "text-[#b48c28]" : "text-[#94a3b8]"}
                          />
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                <div className="flex flex-col gap-1.5 pt-2 border-t border-[#cbd5e1]/60">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-[11px] text-[#475569] font-bold uppercase tracking-wider">
                      Pintasan Section Beranda
                    </span>
                    <span className="text-[10px] text-[#b48c28] font-semibold bg-amber-50 px-2 py-0.5 rounded-full border border-[#fde68a]">
                      Lompat Cepat
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Link
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#f1f5f9] text-xs text-[#0f172a] transition-colors"
                      href="/#keunggulan"
                      prefetch={true}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="text-[#b48c28] font-bold">•</span>
                      <span>1. Mengapa Selempang Aceh Barat</span>
                    </Link>
                    <Link
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#f1f5f9] text-xs text-[#0f172a] transition-colors"
                      href="/#katalog"
                      prefetch={true}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="text-[#b48c28] font-bold">•</span>
                      <span>2. Paket Sewa &amp; Custom Wisuda</span>
                    </Link>
                    <Link
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#f1f5f9] text-xs text-[#0f172a] transition-colors"
                      href="/#bundling-sultan"
                      prefetch={true}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="text-[#b48c28] font-bold">•</span>
                      <span>3. Paket Bundling Sultan 2-in-1</span>
                    </Link>
                    <Link
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#f1f5f9] text-xs text-[#0f172a] transition-colors"
                      href="/#kalkulator-ukuran"
                      prefetch={true}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="text-[#b48c28] font-bold">•</span>
                      <span>4. Kalkulator Ukuran &amp; Cek Tanggal</span>
                    </Link>
                    <Link
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#f1f5f9] text-xs text-[#0f172a] transition-colors"
                      href="/#metode-pembayaran"
                      prefetch={true}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="text-[#b48c28] font-bold">•</span>
                      <span>5. Pembayaran Cepat &amp; Aman</span>
                    </Link>
                    <Link
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#f1f5f9] text-xs text-[#0f172a] transition-colors"
                      href="/#lokasi-workshop"
                      prefetch={true}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="text-[#b48c28] font-bold">•</span>
                      <span>6. Lokasi Workshop &amp; Kontak</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Drawer Bottom CTA */}
              <div className="p-4 border-t border-[#cbd5e1]/60 bg-[#f8fafc] flex flex-col gap-2">
                <Link
                  className="w-full py-2.5 rounded-xl bg-[#0f172a] text-white font-serif text-xs font-semibold flex items-center justify-center gap-2 shadow-md hover:bg-slate-800 transition-colors"
                  href="/produk"
                  prefetch={true}
                  onClick={() => setMobileOpen(false)}
                >
                  <span>Konsultasi &amp; Booking</span>
                </Link>
                <a
                  className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-serif text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
                  href="https://wa.me/6282299256343?text=Halo%20Selempang%20Aceh%20Barat,%20saya%20ingin%20konsultasi%20pemesanan%20selempang%20dan%20sewa%20jas"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Hubungi WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
