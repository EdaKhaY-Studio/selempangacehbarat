"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { authService } from "@/lib/services/authService";
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  AlertCircle,
  KeyRound,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // If already logged in, redirect to /dashboard/transaksi
  useEffect(() => {
    if (authService.isAuthenticated()) {
      router.replace("/dashboard/transaksi");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const res = authService.login(email, password);
      if (res.success) {
        router.push("/dashboard/transaksi");
      } else {
        setError(res.message || "Gagal masuk. Periksa kembali email dan password.");
        setLoading(false);
      }
    }, 450); // micro-delay for realistic tactile feedback
  };

  const fillDefaultCredentials = () => {
    setEmail("admin@selempangacehbarat.com");
    setPassword("admin123");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-slate-100 flex flex-col justify-between selection:bg-[#D4AF37] selection:text-black">
      {/* Top Bar Link to Public Site */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-[#D4AF37] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Kembali ke Website Utama</span>
        </Link>

        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Server Online • Meulaboh, Aceh</span>
        </div>
      </div>

      {/* Main Login Card Container */}
      <div className="w-full max-w-md mx-auto px-4 py-8">
        <div className="relative rounded-3xl bg-[#141721] border border-[#242938] p-7 sm:p-9 shadow-2xl overflow-hidden backdrop-blur-xl">
          {/* Subtle Ambient Gold Glow Background */}
          <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          {/* Logo & Brand Header */}
          <div className="text-center mb-8 relative z-10">
            <div className="relative w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#090A0F] border border-[#242938] flex items-center justify-center p-2.5 shadow-md">
              <Image
                src="/Gambar/LOGOFHD.png"
                alt="Selempang Aceh Barat Logo"
                width={52}
                height={52}
                className="object-contain"
                priority
              />
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37]/10 text-[#FDE68A] border border-[#D4AF37]/30 mb-2">
              <Sparkles size={11} className="text-[#D4AF37]" />
              Sistem Manajemen Pesanan
            </span>
            <h1 className="font-serif text-2xl font-bold tracking-tight text-white">
              Selempang Aceh Barat
            </h1>
            <p className="text-xs text-slate-400 font-light mt-1">
              Portal internal pengelola atelier &amp; rental outfit wisuda
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-2.5 animate-shake">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Email Administrator
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@selempangacehbarat.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#090A0F] border border-[#242938] text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="admin-password"
                  className="block text-xs font-medium text-slate-300"
                >
                  Kata Sandi
                </label>
                <span className="text-[11px] text-slate-500 font-light">
                  Akses Terproteksi
                </span>
              </div>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#090A0F] border border-[#242938] text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-sm border-slate-700 bg-slate-900 text-[#D4AF37] focus:ring-[#D4AF37] accent-[#D4AF37]"
                />
                <span className="text-[11px]">Ingat sesi ini (7 hari)</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#F59E0B] text-[#090A0F] font-bold text-xs tracking-wider uppercase transition-all duration-200 shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Memvalidasi Kredensial...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke Dashboard</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Quick Pre-Database Helper Box */}
          <div className="mt-6 pt-5 border-t border-[#242938] text-center">
            <div className="text-[11px] text-slate-400 mb-2.5">
              Akun default pengelola (Pre-Database Mode):
            </div>
            <button
              type="button"
              onClick={fillDefaultCredentials}
              className="w-full py-2.5 px-3 rounded-lg bg-[#090A0F] hover:bg-[#1A1D27] border border-[#242938] text-[11px] text-[#FDE68A] hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <KeyRound size={13} className="text-[#D4AF37] group-hover:rotate-12 transition-transform" />
              <span>Gunakan Kredensial Default (admin@selempang... / admin123)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="py-6 text-center text-xs text-slate-500 font-light">
        <p>© 2026 Selempang Aceh Barat (FHD). All rights reserved.</p>
        <p className="text-[11px] text-slate-600 mt-1">
          Atelier Busana Wisuda &amp; Rental Jas Formal Meulaboh
        </p>
      </div>
    </div>
  );
}
