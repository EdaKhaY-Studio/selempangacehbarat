"use client";

import { Check, MapPin, ArrowRight, Instagram, MessageCircle, ExternalLink, Sparkles, Clock, ShieldCheck } from "lucide-react";

export function ServicesSection() {
  const customProducts = [
    {
      title: "Selempang (Bahan Bludru & Satin)",
      desc: "Range Rp 50.000 - 135.000. Bludru 7 warna, Satin 12 warna. Bordir komputer presisi kilat.",
    },
    {
      title: "Baju PDH (Pakaian Dinas Harian)",
      desc: "Kemeja dinas/organisasi kampus, bahan American/Japan Drill premium, jahitan rapi kuat.",
    },
    {
      title: "Baju Kaos",
      desc: "Sablon plastisol/DTF & bordir komputer, bahan katun combed adem standar distro.",
    },
    {
      title: "Baju Almamater",
      desc: "Jas/jaket almamater resmi kampus & institusi dengan bordir logo presisi tinggi.",
    },
    {
      title: "Id Card & Medali",
      desc: "ID Card bahan PVC tebal anti patah & medali wisuda/kejuaraan resin kilap pita kampus.",
    },
    {
      title: "Jas, Dasi, Kemeja Putih & Celana Formal",
      desc: "Penjualan busana formal baru siap pakai untuk seremonial dan kebutuhan dinas.",
    },
    {
      title: "Sepatu Pantofel",
      desc: "Penjualan sepatu pantofel kulit formal baru, sol empuk dan nyaman digunakan.",
    },
  ];

  const rentalItems = [
    {
      title: "Jas Pria + Dasi: Rp 50.000",
      desc: "Pilihan warna jas: Hitam, Cream, Abu-Abu, Coklat, Maron. Lengkap ukuran S hingga XXL.",
    },
    {
      title: "Jas Wanita: Rp 35.000 - Rp 40.000",
      desc: "Potongan rapi elegan. Pilihan warna: Hitam, Cream, Abu-Abu, Coklat, Maron.",
    },
    {
      title: "Kemeja Pria & Kemeja Wanita: Rp 25.000",
      desc: "Kemeja formal bersih wangi laundry uap dengan kerah tegak rapi siap pakai.",
    },
    {
      title: "Celana: Rp 25.000 | Rok: Rp 30.000",
      desc: "Celana kain formal rapi proporsional dan rok formal jatuh anggun.",
    },
    {
      title: "Sepatu Pria: Rp 35.000 | Sepatu Wanita: Rp 30.000",
      desc: "Sepatu pantofel kilap insole empuk nyaman untuk berdiri lama saat prosesi.",
    },
    {
      title: "Dasi Satuan: Rp 15.000",
      desc: "Pilihan dasi panjang formal (slim/standar) dan dasi kupu-kupu berbagai warna.",
    },
  ];

  return (
    <section id="layanan" className="relative py-16 sm:py-24 bg-white border-b border-[#cbd5e1]/50 overflow-hidden">
      <span id="katalog" className="absolute -top-24" />
      <span id="katalog-produk" className="absolute -top-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#cbd5e1]/80 shadow-2xs mb-4">
            <Sparkles size={13} className="text-[#b48c28]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#475569]">
              Katalog Layanan Resmi
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight leading-tight">
            Solusi Lengkap Kebutuhan Wisuda &amp; Acara Formal
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#475569] font-normal leading-relaxed">
            Dari pembuatan atribut custom berkualitas hingga penyewaan setelan jas rapi siap pakai di Aceh Barat.
          </p>
        </div>

        {/* ── Dual Card / 2-Column Comparison Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch mb-12 sm:mb-16">
          
          {/* ═════════ KATEGORI A: PEMBUATAN & CUSTOM ═════════ */}
          <div className="bg-[#f8fafc] rounded-2xl border border-[#cbd5e1]/80 p-7 sm:p-9 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group hover:border-[#b48c28] hover:-translate-y-1">
            <div>
              {/* Header Badge & Meta */}
              <div className="flex items-center justify-between gap-4 mb-5">
                <span className="inline-flex items-center px-3 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-amber-50 text-[#b48c28] border border-[#fde68a]">
                  PRODUKSI CUSTOM
                </span>
                <span className="text-xs text-[#475569] flex items-center gap-1 font-medium">
                  <ShieldCheck size={14} className="text-[#b48c28]" />
                  Pemesanan Satuan &amp; Partai
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0f172a] mb-2 group-hover:text-[#b48c28] transition-colors">
                Layanan Pembuatan &amp; Custom
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] font-normal leading-relaxed mb-6">
                Fokus: Pemesanan custom berkualitas untuk instansi, kampus, kepanitiaan wisuda, dan organisasi kemahasiswaan.
              </p>

              {/* Product Checklist */}
              <div className="space-y-3.5 pt-2 border-t border-[#cbd5e1]/60 mb-8">
                {customProducts.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-amber-50 border border-[#fde68a] text-[#b48c28] flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0f172a] leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#475569] font-normal leading-relaxed mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions & Contacts */}
            <div className="pt-6 border-t border-[#cbd5e1]/70">
              {/* Contact Handles */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#475569] mb-5 bg-white px-4 py-3 rounded-xl border border-[#cbd5e1]/70">
                <a
                  href="https://instagram.com/selempang_acehbarat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#b48c28] transition-colors font-medium"
                >
                  <Instagram size={14} className="text-[#b48c28]" />
                  <span>@selempang_acehbarat</span>
                </a>
                <a
                  href="https://wa.me/6282299256343"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#b48c28] transition-colors font-medium"
                >
                  <MessageCircle size={14} className="text-emerald-600" />
                  <span>WA: 0822-9925-6343</span>
                </a>
              </div>

              {/* Primary CTA */}
              <a
                href="https://wa.me/6282299256343?text=Halo%20kak,%20saya%20mau%20order%20custom%20(selempang/PDH/merchandise)"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#0f172a] hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 shadow-md shadow-slate-950/10 active:scale-98 text-center"
              >
                <span>Pesan Custom via WhatsApp</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* ═════════ KATEGORI B: SEWA FORMAL ═════════ */}
          <div className="bg-[#f8fafc] rounded-2xl border border-[#cbd5e1]/80 p-7 sm:p-9 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group hover:border-[#b48c28] hover:-translate-y-1">
            <div>
              {/* Header Badge & Meta */}
              <div className="flex items-center justify-between gap-4 mb-5">
                <span className="inline-flex items-center px-3 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-amber-50 text-[#b48c28] border border-[#fde68a]">
                  RENTAL FORMAL
                </span>
                <span className="text-xs text-[#475569] flex items-center gap-1 font-medium">
                  <Clock size={14} className="text-[#b48c28]" />
                  Siap Pakai &amp; Wangi Laundry
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0f172a] mb-2 group-hover:text-[#b48c28] transition-colors">
                Layanan Sewa Formal
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] font-normal leading-relaxed mb-6">
                Fokus: Persewaan pakaian formal siap pakai untuk wisuda, sidang skripsi, yudisium, atau pelantikan resmi.
              </p>

              {/* Product Checklist */}
              <div className="space-y-3.5 pt-2 border-t border-[#cbd5e1]/60 mb-8">
                {rentalItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-amber-50 border border-[#fde68a] text-[#b48c28] flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0f172a] leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#475569] font-normal leading-relaxed mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions & Contacts */}
            <div className="pt-6 border-t border-[#cbd5e1]/70">
              {/* Contact Handles */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#475569] mb-5 bg-white px-4 py-3 rounded-xl border border-[#cbd5e1]/70">
                <a
                  href="https://instagram.com/sewajassepatu_acehbarat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#b48c28] transition-colors font-medium"
                >
                  <Instagram size={14} className="text-[#b48c28]" />
                  <span>@sewajassepatu_acehbarat</span>
                </a>
                <a
                  href="https://wa.me/6282276027590"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#b48c28] transition-colors font-medium"
                >
                  <MessageCircle size={14} className="text-emerald-600" />
                  <span>WA: 0822-7602-7590</span>
                </a>
              </div>

              {/* Primary CTA */}
              <a
                href="https://wa.me/6282276027590?text=Halo%20kak,%20saya%20mau%20sewa%20jas/perlengkapan%20formal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#0f172a] hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 shadow-md shadow-slate-950/10 active:scale-98 text-center"
              >
                <span>Sewa Sekarang via WhatsApp</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

        </div>

        {/* ── Section Alamat & Hubungi Kami (Bottom Strip) ── */}
        <div className="bg-[#faf9f6] rounded-2xl border border-[#cbd5e1]/80 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-white border border-[#cbd5e1] flex items-center justify-center shrink-0 text-[#b48c28] shadow-2xs">
              <MapPin size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#b48c28] bg-amber-50 px-2.5 py-0.5 rounded-md border border-[#fde68a]">
                  Lokasi Workshop &amp; Fitting Room
                </span>
                <span className="text-xs text-[#475569] hidden sm:inline">• Pagi: 08:00 - 18:00 (Sholat Tutup) | Malam: 20:00 - 23:00</span>
              </div>
              <h4 className="text-base sm:text-lg font-serif font-bold text-[#0f172a]">
                Jln Alpen, Gampong Gunung Kleng, Kecamatan Meureubo, Kabupaten Aceh Barat
              </h4>
              <p className="text-xs text-[#475569] font-normal mt-0.5">
                Kecamatan Meureubo, Kabupaten Aceh Barat • Jam: 08:00 - 18:00 &amp; 20:00 - 23:00.
              </p>
            </div>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Gampong+Gunong+Kleng+Aceh+Barat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white hover:bg-[#f1f5f9] border border-[#cbd5e1] hover:border-[#b48c28] text-[#0f172a] hover:text-[#b48c28] font-semibold text-xs tracking-wider uppercase transition-all duration-200 shadow-xs shrink-0 active:scale-95"
          >
            <MapPin size={14} className="text-[#b48c28]" />
            <span>Petunjuk Arah (Google Maps)</span>
            <ExternalLink size={13} className="opacity-70" />
          </a>
        </div>

      </div>
    </section>
  );
}
