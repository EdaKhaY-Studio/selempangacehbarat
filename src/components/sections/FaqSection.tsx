"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle, Sparkles } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_LIST: FaqItem[] = [
  {
    category: "Deadline & Pengerjaan",
    question: "Berapa lama pengerjaan selempang wisuda kilat?",
    answer:
      "Untuk kebutuhan mendesak menjelang sidang atau wisuda, kami memiliki fasilitas pengerjaan Kilat 1 Hari selesai! Sementara untuk pesanan reguler bordir komputer presisi dua lapis beserta logo universitas (UTU, STAIN, USK, dll), estimasi pengerjaan normal adalah 2–3 hari kerja.",
  },
  {
    category: "Jaminan & Kebersihan",
    question: "Bagaimana jaminan kebersihan & syarat sewa jas serta sepatu?",
    answer:
      "Semua jas formal, dasi, kemeja, dan sepatu pantofel dijamin 100% higienis, steril, wangi, dan rapi karena telah melalui sterilisasi setrika uap. Syarat sewa sangat mudah tanpa deposit besar: cukup tinggalkan kartu identitas resmi (KTP atau KTM) dan jas siap Anda bawa pulang.",
  },
  {
    category: "Fitting & Panduan Ukuran",
    question: "Bagaimana cara fitting ukuran jika saya belum tahu size yang pas?",
    answer:
      "Anda dipersilakan datang langsung ke workshop kami di Jln Alpen Meureubo untuk mencoba langsung (fitting gratis) berbagai ukuran jas mulai dari S, M, L, XL, hingga XXL, serta sepatu pantofel size 35–44. Jika belum sempat mampir, kirimkan info Tinggi Badan (TB) dan Berat Badan (BB) via WhatsApp, tim tailor kami akan merekomendasikan size paling akurat.",
  },
  {
    category: "Partai & Organisasi",
    question: "Apakah melayani pemesanan rombongan organisasi & seragam kampus?",
    answer:
      "Sangat melayani! Kami berpengalaman menangani pesanan selempang panitia/himpunan, Baju PDH, Baju Kaos sablon/bordir, Baju Almamater, serta Id Card dan Medali wisuda untuk berbagai fakultas di Aceh Barat dengan diskon khusus partai besar.",
  },
  {
    category: "Sistem Pembayaran",
    question: "Metode pembayaran apa saja yang didukung?",
    answer:
      "Kami menerima pembayaran tunai di toko serta transaksi online instan via Midtrans Snap. Anda bisa membayar menggunakan QRIS (GoPay, OVO, Dana, ShopeePay, LinkAja) atau Virtual Account otomatis (Bank Syariah Indonesia / BSI, Bank BCA, Bank Mandiri, dan BRI) dengan verifikasi otomatis realtime.",
  },
  {
    category: "Jam Buka & Operasional",
    question: "Apakah toko buka di malam hari untuk fitting sepulang kuliah?",
    answer:
      "Ya, kami buka setiap hari dengan jam operasional fleksibel: Pagi 08:00 – 18:00 WIB dan Malam 20:00 – 23:00 WIB (toko rehat saat waktu sholat). Anda bebas berkunjung malam hari untuk fitting atau pengambilan pesanan.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full bg-[#faf9f6] py-16 lg:py-24 px-4 sm:px-6 lg:px-12 border-b border-[#cbd5e1]/60 relative">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2 max-w-2xl mx-auto">
          <span className="font-mono text-xs text-[#b48c28] tracking-widest uppercase font-bold flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full border border-[#fde68a]">
            <HelpCircle size={13} className="text-[#b48c28]" />
            PERTANYAAN UMUM (FAQ)
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight">
            Semua yang Perlu Anda Ketahui
          </h2>
          <p className="text-sm sm:text-base text-[#475569] font-light leading-relaxed">
            Jawaban lengkap seputar deadline pengerjaan selempang kilat, jaminan sewa jas, fitting ukuran, hingga pembayaran instan.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="flex flex-col gap-3.5">
          {FAQ_LIST.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-white border-[#b48c28] shadow-md ring-1 ring-[#b48c28]/20"
                    : "bg-white border-[#cbd5e1]/80 hover:border-slate-300 shadow-2xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex flex-col gap-1 pr-2">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[#b48c28]">
                      {faq.category}
                    </span>
                    <span className="font-serif text-base sm:text-lg font-bold text-[#0f172a] leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-[#0f172a] border-[#0f172a] text-[#fde68a] rotate-180"
                        : "bg-slate-50 border-[#cbd5e1] text-[#475569]"
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm text-[#475569] leading-relaxed font-light border-t border-[#f1f5f9]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still have questions? WhatsApp Box */}
        <div className="p-6 rounded-2xl bg-white border border-[#cbd5e1]/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-2xs">
          <div className="flex flex-col gap-1">
            <span className="font-serif text-base font-bold text-[#0f172a]">
              Masih Memiliki Pertanyaan Khusus?
            </span>
            <span className="text-xs text-[#475569] font-light">
              Hubungi layanan CS WhatsApp kami untuk konsultasi langsung dalam hitungan menit.
            </span>
          </div>

          <a
            href="https://wa.me/6282299256343?text=Halo%20Selempang%20Aceh%20Barat,%20saya%20ingin%20bertanya%20seputar%20pemesanan/sewa"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold shadow-xs flex items-center gap-2 shrink-0 transition-colors active:scale-95"
          >
            <MessageCircle size={15} />
            <span>Chat CS WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
