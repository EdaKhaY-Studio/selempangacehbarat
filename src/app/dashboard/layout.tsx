"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AdminAuthGuard } from "@/components/dashboard/AdminAuthGuard";
import { Sidebar } from "@/components/dashboard/Sidebar";
import {
  Menu,
  Bell,
  Clock,
  Sparkles,
  MapPin,
  HelpCircle,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Jika sedang di halaman login, tampilkan langsung tanpa sidebar & guard
  if (pathname === "/dashboard/login") {
    return <>{children}</>;
  }

  const currentDateStr = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-[#090A0F] text-slate-100 flex flex-col lg:flex-row selection:bg-[#D4AF37] selection:text-black font-sans">
        {/* Sidebar Navigation */}
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
          {/* Top Navbar */}
          <header className="h-16 bg-[#0F1117]/80 backdrop-blur-md border-b border-[#242938] px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
            {/* Left: Mobile Toggle & Breadcrumb / Status */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-[#141721] border border-[#242938] text-slate-300 hover:text-white transition-colors"
                aria-label="Buka navigasi sidebar"
              >
                <Menu size={18} />
              </button>

              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
                <span className="font-semibold text-white">Dashboard</span>
                <span>/</span>
                <span className="text-[#D4AF37] font-medium">
                  {pathname.replace("/dashboard/", "").replace("-", " ") || "Ringkasan"}
                </span>
              </div>
            </div>

            {/* Right: Real-time Date, Status & Notification Pill */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141721] border border-[#242938] text-[11px] text-slate-400">
                <Clock size={12} className="text-[#D4AF37]" />
                <span className="capitalize">{currentDateStr}</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden sm:inline">Workshop Meulaboh •</span>
                <span>Siap Layani</span>
              </div>
            </div>
          </header>

          {/* Page Body */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
