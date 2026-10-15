"use client";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export const DEFAULT_ADMIN: AdminUser = {
  id: "admin-1",
  name: "Fardi hd, S.P. (Selempang Aceh Barat)",
  email: "admin@selempangacehbarat.com",
  role: "Super Admin",
  avatar: "/Gambar/LOGOFHD.png",
};

const SESSION_KEY = "admin_session";

export interface AdminSession {
  user: AdminUser;
  token: string;
  loginAt: string;
  expiresAt: string;
}

/**
 * Client authentication service communicating with server-side auth API
 */
export const authService = {
  async login(
    email: string,
    pass: string
  ): Promise<{ success: boolean; message?: string; session?: AdminSession }> {
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return {
          success: false,
          message: data.message || "Email atau kata sandi tidak valid.",
        };
      }

      const now = new Date();
      const expires = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      const session: AdminSession = {
        user: {
          id: data.user.userId || DEFAULT_ADMIN.id,
          name: data.user.name || DEFAULT_ADMIN.name,
          email: data.user.email || DEFAULT_ADMIN.email,
          role: data.user.role || DEFAULT_ADMIN.role,
          avatar: data.user.avatar || DEFAULT_ADMIN.avatar,
        },
        token: data.token,
        loginAt: now.toISOString(),
        expiresAt: expires.toISOString(),
      };

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        } catch {
          // ignore localStorage limitations
        }
      }

      return { success: true, session };
    } catch (err: unknown) {
      console.error("[Auth] Login error:", err);
      return {
        success: false,
        message: "Gagal menghubungi server autentikasi. Silakan coba lagi.",
      };
    }
  },

  getSession(): AdminSession | null {
    if (typeof window === "undefined") return null;

    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) {
        const parsed: AdminSession = JSON.parse(stored);
        if (new Date(parsed.expiresAt) > new Date()) {
          return parsed;
        }
      }
    } catch {
      // ignore parse error
    }

    return null;
  },

  isAuthenticated(): boolean {
    return this.getSession() !== null;
  },

  async logout(): Promise<void> {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }

    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(SESSION_KEY);
      } catch {
        // ignore
      }
    }
  },
};
