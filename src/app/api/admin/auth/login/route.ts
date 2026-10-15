import { NextResponse } from "next/server";
import { signAdminToken } from "@/lib/auth/adminAuth";
import crypto from "crypto";

// Rate limiting state for brute-force protection (in-memory)
interface AttemptRecord {
  count: number;
  lockedUntil: number;
}
const loginAttempts = new Map<string, AttemptRecord>();
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout

export async function POST(request: Request) {
  try {
    // 1. Identify Client IP for rate-limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    const now = Date.now();
    const attempt = loginAttempts.get(clientIp);

    if (attempt && attempt.lockedUntil > now) {
      const remainingMinutes = Math.ceil((attempt.lockedUntil - now) / 60000);
      return NextResponse.json(
        {
          success: false,
          message: `Terlalu banyak percobaan login yang gagal. Akun dikunci sementara demi keamanan. Silakan coba kembali dalam ${remainingMinutes} menit.`,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email dan kata sandi wajib diisi." },
        { status: 400 }
      );
    }

    const trimmedEmail = String(email).trim().toLowerCase();
    const trimmedPass = String(password).trim();

    // 2. Strict Production Security Check
    const isProd = process.env.NODE_ENV === "production" || process.env.IS_PRODUCTION === "true";
    const envPassword = process.env.ADMIN_PASSWORD;

    if (isProd) {
      if (!envPassword || envPassword === "admin123" || envPassword.length < 8) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Konfigurasi kredensial produksi belum disetel secara aman (ADMIN_PASSWORD wajib diatur di environment server dan tidak boleh menggunakan password lama). Hubungi administrator.",
          },
          { status: 500 }
        );
      }
    }

    const expectedEmail = (process.env.ADMIN_EMAIL || "admin@selempangacehbarat.com").toLowerCase().trim();
    const expectedPassword = (envPassword || "admin123").trim();

    // Timing-safe comparison to prevent timing side-channel attacks
    const emailMatches = trimmedEmail === expectedEmail;
    const passBuf = Buffer.from(trimmedPass);
    const expectedPassBuf = Buffer.from(expectedPassword);
    const passMatches =
      passBuf.length === expectedPassBuf.length &&
      crypto.timingSafeEqual(passBuf, expectedPassBuf);

    if (!emailMatches || !passMatches) {
      // Record failed attempt
      const currentAttempts = (attempt?.count || 0) + 1;
      let lockedUntil = 0;

      if (currentAttempts >= MAX_FAILED_ATTEMPTS) {
        lockedUntil = now + LOCKOUT_DURATION_MS;
      }

      loginAttempts.set(clientIp, { count: currentAttempts, lockedUntil });

      const remainingTries = Math.max(0, MAX_FAILED_ATTEMPTS - currentAttempts);
      const warnMsg =
        remainingTries > 0
          ? `Email atau kata sandi tidak valid. Sisa percobaan: ${remainingTries}.`
          : "Akun dikunci selama 15 menit karena terlalu banyak percobaan gagal.";

      return NextResponse.json({ success: false, message: warnMsg }, { status: 401 });
    }

    // Login successful: reset rate limiter for this IP
    loginAttempts.delete(clientIp);

    const user = {
      userId: "admin-fhd-1",
      name: "Fardi hd, S.P. (Selempang Aceh Barat)",
      email: expectedEmail,
      role: "Super Admin",
      avatar: "/Gambar/LOGOFHD.png",
    };

    const token = signAdminToken(user);

    const response = NextResponse.json({
      success: true,
      token,
      user,
      message: "Autentikasi admin berhasil.",
    });

    // Set secure HTTP cookie (8-hour working session)
    response.cookies.set({
      name: "sab_admin_token",
      value: token,
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: 8 * 60 * 60, // 8 hours
      path: "/",
    });

    return response;
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Terjadi kesalahan server.";
    return NextResponse.json({ success: false, message: errorMsg }, { status: 500 });
  }
}
