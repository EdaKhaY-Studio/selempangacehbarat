"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { authService } from "@/lib/services/authService";
import {
  LayoutDashboard,
  ReceiptText,
  BookOpenText,
  ShoppingBag,
  Images,
  LogOut,
  X,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const DASHBOARD_NAV_ITEMS = [
  {
    href: "/dashboard",
    label: "Halaman Utama",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    href: "/dashboard/transaksi",
    label: "Riwayat Transaksi",
    icon: ReceiptText,
    badge: "Utama",
  },
  {
    href: "/dashboard/jurnal",
    label: "Pengelolaan Jurnal",
    icon: BookOpenText,
    badge: null,
  },
  {
    href: "/dashboard/produk",
    label: "Katalog Produk",
    icon: ShoppingBag,
    badge: null,
  },
  {
    href: "/dashboard/galeri",
    label: "Galeri Foto",
    icon: Images,
    badge: null,
  },
];

export function Sidebar({ mobileOpen = false, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    authService.logout();
    router.replace("/dashboard/login");
  };

  const isItemActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const content = (
    <aside className="w-72 bg-[#0F1117] border-r border-[#242938] flex flex-col justify-between h-full select-none text-slate-200">
      {/* 1. Header Sidebar */}
      <div>
        <div className="p-5 border-b border-[#242938] flex items-center justify-between">
          <Link href="/dashboard/transaksi" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-[#141721] border border-[#242938] flex items-center justify-center p-1.5 shadow-sm shrink-0 group-hover:border-[#D4AF37]/50 transition-colors">
              <Image
                src="/Gambar/LOGOFHD.png"
                alt="Selempang Aceh Barat Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-sm font-bold text-white group-hover:text-[#FDE68A] transition-colors truncate leading-tight">
                Selempang Aceh Barat (FHD)
              </span>
              <span className="text-[10px] text-[#D4AF37] font-medium tracking-wider uppercase truncate mt-0.5">
                Sistem Manajemen Pesanan
              </span>
            </div>
          </Link>

          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1E2230] transition-colors"
              aria-label="Tutup menu navigasi"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* 2. Menu Navigasi Utama */}
        <div className="p-4">
          <div className="text-[10px] font-bold tracking-widest uppercase text-slate-500 px-3 mb-2">
            Menu Operasional
          </div>
          <nav className="space-y-1.5">
            {DASHBOARD_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isItemActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                    active
                      ? "bg-[#D4AF37]/15 text-[#FDE68A] border-l-3 border-[#D4AF37] font-semibold shadow-xs"
                      : "text-slate-400 hover:text-white hover:bg-[#161922]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={17}
                      className={active ? "text-[#D4AF37]" : "text-slate-400 group-hover:text-slate-200"}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge ? (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-[#D4AF37] text-black">
                      {item.badge}
                    </span>
                  ) : active ? (
                    <ChevronRight size={13} className="text-[#D4AF37]" />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          {/* Quick Link ke Website Publik */}
          <div className="mt-6 pt-5 border-t border-[#242938]">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2 rounded-lg text-[11px] text-slate-400 hover:text-[#D4AF37] hover:bg-[#161922] transition-colors group"
            >
              <span className="flex items-center gap-2">
                <ExternalLink size={13} />
                <span>Lihat Web Publik</span>
              </span>
              <span className="text-[9px] text-slate-500 font-mono">selempangacehbarat.com</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Footer Sidebar: Profil Admin & Tombol Logout */}
      <div className="p-4 border-t border-[#242938] bg-[#090A0F]/70">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-[#141721] border border-[#242938] mb-3">
          <div className="relative w-8 h-8 rounded-full bg-[#1E2230] border border-amber-400/30 flex items-center justify-center shrink-0">
            <Image
              src="/Gambar/LOGOFHD.png"
              alt="Avatar Admin"
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-semibold text-white truncate">
              Fardi hd, S.P. (Admin Utama)
            </span>
            <span className="text-[10px] text-slate-400 font-mono truncate">
              admin@selempangacehbarat.com
            </span>
          </div>
        </div>

        {/* Tombol Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
        >
          <LogOut size={14} />
          <span>Keluar dari Sistem</span>
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar (Permanent) */}
      <div className="hidden lg:block h-screen sticky top-0 shrink-0">
        {content}
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 z-10 w-72 h-full shadow-2xl">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
