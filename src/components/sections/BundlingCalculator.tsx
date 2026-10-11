"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Ruler, Calendar as CalendarIcon, ShieldCheck } from "lucide-react";
import { BookingModal } from "@/components/ui/BookingModal";
import { PRODUCTS } from "@/lib/types";

export function BundlingCalculator() {
  const [height, setHeight] = useState<number>(171);
  const [weight, setWeight] = useState<number>(68);
  const [eventDate, setEventDate] = useState<string>("2026-04-18");
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Dynamic Size Calculation according to Stitch logic
  let size = "M";
  let spec = "Lingkar Dada: 96cm | Pjg Jas: 71cm | Celana: 30-31";

  if (weight < 54 || (height < 165 && weight < 58)) {
    size = "S";
    spec = "Lingkar Dada: 92cm | Pjg Jas: 68cm | Celana: 28-29";
  } else if (weight <= 68 && height <= 175) {
    size = "M";
    spec = "Lingkar Dada: 96cm | Pjg Jas: 71cm | Celana: 30-31";
  } else if (weight <= 78 && height <= 180) {
    size = "L";
    spec = "Lingkar Dada: 102cm | Pjg Jas: 73cm | Celana: 32-34";
  } else if (weight <= 90) {
    size = "XL";
    spec = "Lingkar Dada: 108cm | Pjg Jas: 75cm | Celana: 35-37";
  } else {
    size = "XXL";
    spec = "Lingkar Dada: 114cm+ | Pjg Jas: 77cm | Celana: 38-40";
  }

  // 3-Day breakdown dates
  const picked = new Date(eventDate);
  const isValid = !isNaN(picked.getTime());
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };

  const dateMain = isValid ? picked.toLocaleDateString("id-ID", options) : "18 Apr 2026";
  const dateTake = isValid
    ? new Date(picked.getTime() - 86400000).toLocaleDateString("id-ID", options)
    : "17 Apr 2026";
  const dateReturn = isValid
    ? new Date(picked.getTime() + 86400000).toLocaleDateString("id-ID", options)
    : "19 Apr 2026";

  return (
    <section
      className="w-full bg-[#faf9f6] py-16 lg:py-24 px-4 sm:px-6 lg:px-12 border-b border-[#cbd5e1]/50"
      id="kalkulator-ukuran"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-2 max-w-2xl mx-auto">
          <span className="font-mono text-xs text-[#b48c28] tracking-widest uppercase font-bold">
            Teknologi Fitting &amp; Reservasi
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight">
            Kalkulator Ukuran &amp; Cek Tanggal Realtime
          </h2>
          <p className="text-sm text-[#475569] font-light leading-relaxed">
            Ketahui ukuran jas Anda yang ideal secara presisi dan pastikan tanggal acara Anda tersedia sebelum kehabisan slot.
          </p>
        </div>

        {/* 2-Column Split: Sliders Recommender (Left) & Realtime Date Checker (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Interactive Size Calculator */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#cbd5e1]/70 shadow-xs flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 border border-[#fde68a]/60 flex items-center justify-center text-[#b48c28]">
                <Ruler size={22} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#0f172a]">
                  Cari Ukuran Jas Sempurna Anda
                </h3>
                <p className="text-xs text-[#475569] font-light">
                  Algoritma fitting presisi Selempang Aceh Barat
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {/* Height Slider */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-[#0f172a] font-semibold">Tinggi Badan</label>
                  <span className="font-mono text-sm text-[#b48c28] font-bold">
                    {height} cm
                  </span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="195"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                  className="w-full accent-[#0f172a] bg-slate-200 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Weight Slider */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-[#0f172a] font-semibold">Berat Badan</label>
                  <span className="font-mono text-sm text-[#b48c28] font-bold">
                    {weight} kg
                  </span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="120"
                  value={weight}
                  onChange={(e) => setWeight(parseInt(e.target.value))}
                  className="w-full accent-[#0f172a] bg-slate-200 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Calculation Output Box */}
              <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#cbd5e1]/60 flex items-center justify-between mt-2 shadow-2xs">
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#475569] font-medium">
                    Rekomendasi Terbaik
                  </span>
                  <span className="font-serif text-xl sm:text-2xl text-[#0f172a] font-bold">
                    Ukuran {size} (Slimfit)
                  </span>
                  <span className="text-xs text-[#475569] mt-1 font-light">
                    {spec}
                  </span>
                </div>
                <div className="w-14 h-14 rounded-full bg-[#0f172a] text-white flex items-center justify-center font-mono text-2xl font-bold shadow-xs shrink-0">
                  {size}
                </div>
              </div>

              <p className="text-[11px] text-[#475569] italic font-light">
                *Bila ragu, Anda juga dapat mencoba fitting langsung di toko kami di Jln Alpen, Gampong Gunung Kleng, Meureubo secara gratis.
              </p>
            </div>
          </div>

          {/* Right Column: Realtime Date Availability Checker */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#cbd5e1]/70 shadow-xs flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 border border-[#fde68a]/60 flex items-center justify-center text-[#b48c28]">
                <CalendarIcon size={22} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#0f172a]">
                  Cek Ketersediaan Tanggal Rental
                </h3>
                <p className="text-xs text-[#475569] font-light">
                  Sistem anti double-booking real-time
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-[#0f172a] font-semibold">
                  Pilih Tanggal Hari-H Acara / Wisuda
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] px-4 py-2.5 rounded-lg text-[#0f172a] focus:outline-hidden focus:border-[#0f172a] transition-colors font-mono text-sm font-medium"
                />
              </div>

              {/* 3-Day Breakdown Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-[#f8fafc] border border-[#cbd5e1]/60 text-center flex flex-col">
                  <span className="text-[10px] text-[#475569]">H-1 (Ambil)</span>
                  <span className="font-mono text-xs text-[#0f172a] font-bold">
                    {dateTake}
                  </span>
                  <span className="text-[10px] text-[#b48c28] font-semibold">Fitting Terakhir</span>
                </div>
                <div className="p-3 rounded-lg bg-amber-50 border border-[#fde68a] text-center flex flex-col">
                  <span className="text-[10px] text-[#b48c28] font-bold">Hari-H (Pakai)</span>
                  <span className="font-mono text-xs text-[#0f172a] font-bold">
                    {dateMain}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold">Puncak Wisuda</span>
                </div>
                <div className="p-3 rounded-lg bg-[#f8fafc] border border-[#cbd5e1]/60 text-center flex flex-col">
                  <span className="text-[10px] text-[#475569]">H+1 (Kembali)</span>
                  <span className="font-mono text-xs text-[#0f172a] font-bold">
                    {dateReturn}
                  </span>
                  <span className="text-[10px] text-[#475569]">Maks 20.00 WIB</span>
                </div>
              </div>

              {/* Live Status Alert Box */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={22} className="text-emerald-600 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-emerald-800">
                      Slot Masih Terbuka!
                    </span>
                    <span className="text-[11px] text-[#475569]">
                      Tersedia 12 Set Jas untuk tanggal ini
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setBookingModalOpen(true)}
                  className="px-4 py-2 rounded-lg bg-[#0f172a] text-white font-serif text-xs font-bold hover:bg-slate-800 transition-colors shadow-xs shrink-0 self-end sm:self-auto"
                >
                  Kunci Tanggal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal on Trigger */}
      {bookingModalOpen && (
        <BookingModal
          product={PRODUCTS[0]}
          onClose={() => setBookingModalOpen(false)}
        />
      )}
    </section>
  );
}
