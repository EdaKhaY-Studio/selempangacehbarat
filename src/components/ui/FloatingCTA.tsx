"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ArrowUp } from "lucide-react";

export function FloatingCTA() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 450);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3">
      {/* Scroll-to-top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] hover:border-[#F97316] flex items-center justify-center text-[#4B5563] hover:text-[#F97316] transition-all duration-150 shadow-md shadow-black/5"
            aria-label="Scroll ke atas"
          >
            <ArrowUp size={16} strokeWidth={2} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp CTA */}
      <motion.a
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        href="https://wa.me/6282299256343?text=Halo%20Selempang%20Aceh%20Barat,%20saya%20mau%20tanya%20pemesanan%20selempang%20dan%20sewa%20jas"
        target="_blank"
        rel="noopener noreferrer"
        className="relative group flex items-center gap-2.5 pl-4 pr-5 py-3 rounded-full bg-[#25D366] hover:bg-[#20b556] text-white text-sm font-bold transition-all duration-200 shadow-2xl shadow-[#25D366]/30 hover:shadow-[#25D366]/50 active:scale-95"
      >
        {/* Ping indicator */}
        <div className="relative flex-shrink-0">
          <MessageCircle size={18} strokeWidth={2} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-[#25D366]">
            <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-75" />
          </span>
        </div>
        <span>Chat Sekarang</span>
      </motion.a>
    </div>
  );
}
