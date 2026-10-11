"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService, AdminSession } from "@/lib/services/authService";
import { ShieldCheck, Loader2 } from "lucide-react";

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const router = useRouter();
  const [session, setSession] = useState<AdminSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentSession = authService.getSession();
    if (!currentSession) {
      router.replace("/dashboard/login");
    } else {
      setSession(currentSession);
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090A0F] text-slate-100 flex flex-col items-center justify-center p-4">
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#141721] border border-[#242938] flex items-center justify-center shadow-xl">
            <ShieldCheck size={32} className="text-[#D4AF37] animate-pulse" />
          </div>
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#D4AF37]/20 to-amber-500/0 blur-md -z-10" />
        </div>
        <div className="flex items-center gap-2.5 text-xs tracking-wider uppercase text-slate-400 font-semibold mb-2">
          <Loader2 size={14} className="animate-spin text-[#D4AF37]" />
          <span>Memverifikasi Akses Admin...</span>
        </div>
        <p className="text-[11px] text-slate-500 font-mono">
          Selempang Aceh Barat • Sistem Manajemen Pesanan
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
