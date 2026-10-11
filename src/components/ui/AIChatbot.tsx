"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Minimize2, Sparkles, MessageCircle, Ruler, Award, CalendarClock } from "lucide-react";
import type { ChatMessage } from "@/lib/types";

const INITIAL_MESSAGE: ChatMessage = {
  id: "0",
  role: "assistant",
  content:
    "Pue haba Rakan! Saya Asisten AI Selempang Aceh Barat.\n\nButuh info produk dijual (selempang bludru & satin, PDH, kaos, almamater, ID card & medali) atau daftar harga sewa jas formal & sepatu pantofel di Meulaboh? Tanyakan langsung di sini!",
  timestamp: new Date(),
};

const AUTO_RESPONSES: Record<string, string> = {
  harga:
    "Daftar Tarif & Produk Selempang Aceh Barat:\n\n• SELEMPANG (DIJUAL):\nRange harga: Rp 50.000 - 55.000 - 65.000 - 80.000 - 85.000 - 90.000 - 135.000\n\n• PRODUK DIJUAL LAINNYA:\nBaju PDH, Baju Kaos, Baju Almamater, ID Card & Medali, Jas, Dasi, Kemeja Putih & Celana Formal, Sepatu Pantofel.\n\n• DAFTAR HARGA SEWA (RENTAL):\n- Jas Pria + Dasi: Rp 50.000\n- Dasi: Rp 15.000\n- Jas Wanita: Rp 35.000 - Rp 40.000\n- Kemeja Pria: Rp 25.000\n- Kemeja Wanita: Rp 25.000\n- Celana: Rp 25.000\n- Rok: Rp 30.000\n- Sepatu Pria: Rp 35.000\n- Sepatu Wanita: Rp 30.000\n- Pilihan Warna Jas: Hitam, Cream, Abu-Abu, Coklat, Maron",
  ukuran:
    "Panduan Ukuran Jas Pria & Wanita:\n\n• Size S: TB < 165 cm, BB < 54 kg\n• Size M: TB 165–175 cm, BB 55–68 kg\n• Size L: TB 170–180 cm, BB 69–78 kg\n• Size XL: TB 175–185 cm, BB 79–90 kg\n• Size XXL: TB > 180 cm, BB > 90 kg\n\nPilihan warna jas: Hitam, Cream, Abu-Abu, Coklat, Maron.",
  lokasi:
    "Lokasi Toko & Workshop Kami:\nJln Alpen, Gampong Gunung Kleng, Kecamatan Meureubo, Kabupaten Aceh Barat.\n\nJam Operasional:\n• Pagi: 08:00 - 18:00 (Waktu sholat toko tutup)\n• Malam: 20:00 - 23:00",
  selempang:
    "Detail Selempang Wisuda (Bordir Komputer Presisi):\n\n• Range Harga: Rp 50.000 - 55.000 - 65.000 - 80.000 - 85.000 - 90.000 - 135.000\n• Pilihan Warna Bludru: Hitam, Maron, Merah, Biru Dongker, Hijau, Ungu, Pink\n• Pilihan Warna Satin: Hitam, Maron, Merah, Biru Dongker, Hijau, Ungu, Pink, Cokelat, Abu-abu, Putih, Cream, Kuning",
  booking:
    "Prosedur Pemesanan & Sewa:\n\n1. Pilih produk di katalog\n2. Klik tombol sewa/pesan\n3. Hubungi CS WhatsApp untuk fitting & pengambilan:\n- Selempang: 0822-9925-6343 (IG @selempang_acehbarat)\n- Sewa Jas & Sepatu: 0822-7602-7590 (IG @sewajassepatu_acehbarat)",
  jadwal:
    "Jam Operasional Toko:\n• Pagi: 08:00 - 18:00 WIB (Waktu sholat toko tutup)\n• Malam: 20:00 - 23:00 WIB\n\nAlamat: Jln Alpen, Gampong Gunung Kleng, Kec. Meureubo, Kab. Aceh Barat.",
};

function getAutoResponse(message: string): string | null {
  const lower = message.toLowerCase();
  for (const [key, response] of Object.entries(AUTO_RESPONSES)) {
    if (lower.includes(key)) return response;
  }
  if (lower.match(/tb|tinggi|berat|bb|kg|cm/)) {
    const heightMatch = lower.match(/(\d{2,3})\s*cm/);
    const weightMatch = lower.match(/(\d{2,3})\s*kg/);
    if (heightMatch && weightMatch) {
      const h = parseInt(heightMatch[1]);
      const w = parseInt(weightMatch[1]);
      const bmi = w / (h / 100) ** 2;
      const size =
        bmi > 28 || h > 180
          ? "XL"
          : bmi > 24 || h > 172
          ? "L"
          : bmi > 18 || h > 162
          ? "M"
          : "S";
      return `Berdasarkan TB ${h} cm dan BB ${w} kg, ukuran yang paling proporsional untuk Anda adalah ${size}. Jas ini memiliki ruang dada yang leluasa dan panjang lengan yang tepat saat mengenakan jubah toga.`;
    }
  }
  return null;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (customText?: string) => {
    const query = customText || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const autoReply = getAutoResponse(query);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          autoReply ||
          "Terima kasih atas pesan Anda. Untuk konsultasi langsung atau pemesanan, silakan hubungi WhatsApp Selempang Aceh Barat di 0822-9925-6343 atau Sewa Jas & Sepatu di 0822-7602-7590. Kami siap melayani Anda.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  const quickReplies = [
    { label: "Cek Size Jas", query: "ukuran", icon: Ruler },
    { label: "Selempang Kilat", query: "selempang", icon: Award },
    { label: "Jadwal Sewa", query: "jadwal", icon: CalendarClock },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 select-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              height: isMinimized ? "auto" : undefined,
            }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25 }}
            className="w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-3xl shadow-2xl border border-[#cbd5e1]/80 overflow-hidden flex flex-col mb-2"
            style={{ boxShadow: "0 20px 45px -10px rgba(15, 23, 42, 0.25)" }}
          >
            {/* Header */}
            <div className="bg-[#0f172a] text-white p-4 flex items-center justify-between border-b border-slate-800 relative">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-[#b48c28]/40 flex items-center justify-center text-amber-400">
                    <Bot size={20} />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0f172a]" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif text-sm font-bold text-white">
                      Selempang AI
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-300 text-[9px] font-bold px-1.5 py-0.5 rounded border border-emerald-400/40 uppercase">
                      ONLINE
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-300 font-light">
                    Asisten Wisuda &amp; Sewa Jas Aceh Barat
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Minimize"
                >
                  <Minimize2 size={13} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="p-4 bg-[#f8fafc] max-h-[340px] overflow-y-auto flex flex-col gap-3">
                  <div className="text-center">
                    <span className="text-[10px] text-[#475569] bg-white/90 px-3 py-1 rounded-full border border-[#cbd5e1]/40 shadow-2xs font-light">
                      Buka Setiap Hari 09.00 - 21.00 WIB
                    </span>
                  </div>

                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "items-start"}`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${
                          msg.role === "assistant"
                            ? "bg-amber-50 border border-[#b48c28]/40 text-[#b48c28] mt-0.5 shadow-2xs"
                            : "bg-[#0f172a] text-white shadow-2xs"
                        }`}
                      >
                        {msg.role === "assistant" ? <Bot size={14} /> : <User size={13} />}
                      </div>

                      <div
                        className={`max-w-[82%] p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line shadow-xs ${
                          msg.role === "assistant"
                            ? "bg-white border border-[#cbd5e1]/70 text-[#0f172a] rounded-tl-sm font-light"
                            : "bg-[#0f172a] text-white font-normal rounded-tr-sm"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-2 items-center">
                      <div className="w-7 h-7 rounded-full bg-amber-50 border border-[#b48c28]/40 flex items-center justify-center text-[#b48c28] shadow-2xs">
                        <Bot size={13} />
                      </div>
                      <div className="px-3.5 py-2.5 rounded-xl bg-white border border-[#cbd5e1]/60 flex gap-1 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#b48c28] animate-pulse" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#b48c28] animate-pulse delay-150" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#b48c28] animate-pulse delay-300" />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick replies & WhatsApp Button */}
                <div className="p-3 bg-white border-t border-[#cbd5e1]/60 space-y-2.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {quickReplies.map((qr) => {
                      const IconComponent = qr.icon;
                      return (
                        <button
                          key={qr.label}
                          onClick={() => sendMessage(qr.query)}
                          className="px-2.5 py-1 bg-white hover:bg-slate-50 text-[#0f172a] border border-[#cbd5e1]/70 rounded-full text-[11px] font-medium transition-colors shadow-2xs flex items-center gap-1.5"
                        >
                          <IconComponent size={12} className="text-[#b48c28]" />
                          <span>{qr.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <a
                    href="https://wa.me/6282299256343?text=Halo%20Selempang%20Aceh%20Barat,%20saya%20ingin%20konsultasi%20pemesanan%20selempang%20dan%20sewa%20jas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp Hubungi Sekarang!</span>
                  </a>
                </div>

                {/* Chat Input */}
                <div className="p-2.5 bg-white border-t border-[#cbd5e1]/60 flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Ketik pertanyaan Anda..."
                    className="flex-1 bg-[#f8fafc] border border-[#cbd5e1]/70 rounded-xl px-3.5 py-2 text-[#0f172a] text-xs focus:outline-none focus:border-[#0f172a] transition-colors placeholder:text-[#475569]/50 font-light"
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim()}
                    className="w-9 h-9 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white flex items-center justify-center shadow-xs shrink-0 transition-colors disabled:opacity-40"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher Trigger Button Bar */}
      <div className="flex flex-col items-end gap-2">
        <div className="bg-[#0f172a]/90 text-white text-[11px] px-3.5 py-1 rounded-full shadow-lg border border-slate-700/60 backdrop-blur-md flex items-center gap-2 mb-0.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium tracking-wide">Konsultasi Wisuda Meulaboh</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Tanya AI Selempang Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-slate-50 text-[#0f172a] font-semibold text-xs shadow-xl border border-[#cbd5e1]/80 transition-all transform hover:-translate-y-0.5 active:scale-95 duration-200 group cursor-pointer"
          >
            <span className="w-6 h-6 rounded-full bg-amber-50 border border-[#b48c28]/40 flex items-center justify-center text-[#b48c28] shrink-0">
              <Bot size={14} />
            </span>
            <span>Tanya AI Selempang</span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Online
            </span>
          </button>

          {/* Quick WhatsApp Button */}
          <a
            href="https://wa.me/6282299256343?text=Halo%20Selempang%20Aceh%20Barat,%20saya%20ingin%20konsultasi%20pemesanan%20selempang%20dan%20sewa%20jas"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-3.5 py-2.5 rounded-full shadow-xl shadow-emerald-900/20 flex items-center gap-1.5 transition-all transform hover:scale-105 active:scale-95"
          >
            <MessageCircle size={15} />
            <span>Hubungi</span>
          </a>
        </div>
      </div>
    </div>
  );
}
