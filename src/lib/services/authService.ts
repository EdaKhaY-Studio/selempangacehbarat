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
  name: "Bg Fardi (Selempang Aceh Barat)",
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
 * Helper to set a cookie readable by both client and server
 */
function setCookie(name: string, value: string, days = 7) {
  if (typeof document === "undefined") return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/; SameSite=Lax";
}

/**
 * Helper to get cookie value
 */
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
}

/**
 * Helper to delete cookie
 */
function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = name + "=; Max-Age=-99999999; path=/;";
}

export const authService = {
  login(email: string, pass: string): { success: boolean; message?: string; session?: AdminSession } {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = pass.trim();

    if (trimmedEmail === "admin@selempangacehbarat.com" && trimmedPass === "admin123") {
      const now = new Date();
      const expires = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      const session: AdminSession = {
        user: DEFAULT_ADMIN,
        token: "sab_admin_session_" + Math.random().toString(36).substring(2),
        loginAt: now.toISOString(),
        expiresAt: expires.toISOString(),
      };

      const sessionStr = JSON.stringify(session);

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(SESSION_KEY, sessionStr);
        } catch {
          // ignore localStorage restrictions
        }
        setCookie(SESSION_KEY, sessionStr, 7);
      }

      return { success: true, session };
    }

    return {
      success: false,
      message: "Email atau kata sandi tidak valid. Gunakan kredensial resmi pengelola.",
    };
  },

  getSession(): AdminSession | null {
    if (typeof window === "undefined") return null;

    // 1. Check localStorage first
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) {
        const parsed: AdminSession = JSON.parse(stored);
        if (new Date(parsed.expiresAt) > new Date()) {
          return parsed;
        }
      }
    } catch {
      // fallback to cookie
    }

    // 2. Check Cookie
    try {
      const cookieVal = getCookie(SESSION_KEY);
      if (cookieVal) {
        const parsed: AdminSession = JSON.parse(cookieVal);
        if (new Date(parsed.expiresAt) > new Date()) {
          // sync back to localStorage
          try {
            localStorage.setItem(SESSION_KEY, cookieVal);
          } catch {
            // ignore
          }
          return parsed;
        }
      }
    } catch {
      // invalid cookie
    }

    return null;
  },

  isAuthenticated(): boolean {
    return this.getSession() !== null;
  },

  logout(): void {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(SESSION_KEY);
      } catch {
        // ignore
      }
      deleteCookie(SESSION_KEY);
    }
  },
};
