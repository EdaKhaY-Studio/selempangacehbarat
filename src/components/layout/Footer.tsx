"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, MapPin, Phone, MessageCircle, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#0d111a] text-slate-300 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-3 select-none group w-fit"
            >
              <img
                alt="Selempang Aceh Barat Logo"
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain shrink-0 antigravity float-bob"
                src="/Gambar/LOGOFHD.png"
              />
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-tight text-white group-hover:text-[#fde68a] transition-colors">
                  SELEMPANG ACEH BARAT
                </span>
                <span className="text-[11px] text-[#b48c28] font-semibold tracking-widest uppercase">
                  Aceh Barat • Selempang &amp; Sewa Jas Sepatu
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed mt-1 font-light">
              Produksi selempang wisuda bordir komputer, konveksi PDH &amp; almamater, serta persewaan jas formal &amp; sepatu pantofel di Meulaboh, Aceh Barat.
            </p>

            <div className="flex items-center gap-2 text-[11px] tracking-wider text-slate-500 uppercase font-semibold mt-1">
              <CheckCircle2 size={14} className="text-[#b48c28]" />
              <span>EST. 2023 • MEUREUBO, ACEH BARAT</span>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://instagram.com/selempang_acehbarat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#b48c28] hover:border-[#b48c28]/60 transition-colors shadow-2xs antigravity float-bob float-delay-100"
                aria-label="Instagram Selempang Aceh Barat"
                title="@selempang_acehbarat"
              >
                <Instagram size={15} />
              </a>
              <a
                href="https://instagram.com/sewajassepatu_acehbarat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#b48c28] hover:border-[#b48c28]/60 transition-colors shadow-2xs antigravity float-bob float-delay-300"
                aria-label="Instagram Sewa Jas & Sepatu Aceh Barat"
                title="@sewajassepatu_acehbarat"
              >
                <Instagram size={15} />
              </a>
              <a
                href="https://tiktok.com/@selempang_acehbarat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#b48c28] hover:border-[#b48c28]/60 transition-colors shadow-2xs antigravity float-bob float-delay-400 font-mono text-[11px] font-bold"
                aria-label="TikTok Selempang Aceh Barat"
                title="TikTok: @selempang_acehbarat"
              >
                TT
              </a>
              <a
                href="https://wa.me/6282299256343?text=Halo%20Selempang%20Aceh%20Barat,%20saya%20mau%20tanya%20pemesanan%20selempang/konveksi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#b48c28] hover:border-[#b48c28]/60 transition-colors shadow-2xs antigravity float-bob float-delay-500"
                aria-label="WhatsApp Selempang & Konveksi"
                title="WhatsApp Selempang: 0822-9925-6343"
              >
                <MessageCircle size={15} />
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Selempang+Aceh+Barat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#b48c28] hover:border-[#b48c28]/60 transition-colors shadow-2xs antigravity float-bob float-delay-700"
                aria-label="Google Maps Selempang Aceh Barat"
                title="Buka Lokasi di Google Maps"
              >
                <MapPin size={15} />
              </a>
            </div>
          </div>

          {/* Navigasi Cepat (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              NAVIGASI CEPAT
            </h3>
            <nav className="flex flex-col gap-2.5 text-sm font-light">
              <Link className="text-slate-400 hover:text-white transition-colors duration-200" href="/">
                Beranda
              </Link>
              <Link className="text-slate-400 hover:text-white transition-colors duration-200" href="/tentang-kami">
                Tentang Kami
              </Link>
              <Link className="text-slate-400 hover:text-white transition-colors duration-200" href="/produk">
                Katalog Produk &amp; Layanan
              </Link>
              <Link className="text-slate-400 hover:text-white transition-colors duration-200" href="/galeri">
                Galeri Wisudawan
              </Link>
              <Link className="text-slate-400 hover:text-white transition-colors duration-200" href="/blog">
                Artikel &amp; Panduan Busana
              </Link>
              <Link className="text-slate-400 hover:text-white transition-colors duration-200" href="/tentang-kami#lokasi-workshop">
                Lokasi Workshop
              </Link>
            </nav>
          </div>

          {/* Kontak & Workshop (4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              KONTAK &amp; WORKSHOP
            </h3>
            <div className="flex flex-col gap-3 text-sm text-slate-400 font-light">
              <div className="flex items-start gap-3">
                <MapPin size={17} className="text-[#b48c28] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Jl. Alue Peunyareng / Jln Alpen, Gampong Gunong Kleng, Kecamatan Meureubo, Kabupaten Aceh Barat 23615
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={17} className="text-[#b48c28] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <a
                    href="https://wa.me/6282299256343"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Selempang &amp; Konveksi: 0822-9925-6343
                  </a>
                  <a
                    href="https://wa.me/6282276027590"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Sewa Jas &amp; Sepatu: 0822-7602-7590
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={17} className="text-[#b48c28] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span>Pagi: 08:00 - 18:00 WIB (Waktu sholat toko tutup)</span>
                  <span>Malam: 20:00 - 23:00 WIB</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-400 antigravity float-gentle float-delay-500">
              <ShieldCheck size={16} className="text-[#b48c28] shrink-0" />
              <span className="font-light">
                Garansi bordir komputer presisi rapi, busana higienis, dan pas di badan untuk momen istimewa Anda.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 pt-6 mt-12 flex flex-col items-start text-left gap-1 text-xs text-slate-400">
          <p className="font-semibold text-slate-300">
            Selempang Aceh Barat (FHD)
          </p>
          <p className="font-light text-slate-400">
            © 2026 — Powered by{" "}
            <a
              href="https://pahamdigital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#fde68a] hover:text-[#b48c28] font-medium transition-colors duration-200 underline underline-offset-4 decoration-amber-400/50 hover:decoration-[#b48c28]"
            >
              Paham Digital Agency
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
