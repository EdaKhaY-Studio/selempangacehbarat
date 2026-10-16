import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-[#0f172a] selection:bg-[#b48c28] selection:text-white">
      {/* 1. Header & Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-[#b48c28]/40 text-[#b48c28] text-xs font-bold uppercase tracking-wider mb-6">
          <Search size={14} />
          <span>Halaman Tidak Ditemukan (404)</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0f172a] tracking-tight mb-4">
          Halaman Tidak Tersedia
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed mb-8 font-light">
          Halaman yang Anda tuju mungkin telah dipindahkan, diubah tautannya, atau tidak tersedia sementara waktu. Silakan kembali ke beranda atau telusuri katalog resmi kami.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-95"
          >
            <Home size={15} />
            <span>Kembali ke Beranda</span>
          </Link>
          <Link
            href="/produk"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-[#cbd5e1] hover:bg-[#f1f5f9] text-[#0f172a] font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-xs active:scale-95"
          >
            <span>Buka Katalog Produk</span>
          </Link>
        </div>
      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
}
