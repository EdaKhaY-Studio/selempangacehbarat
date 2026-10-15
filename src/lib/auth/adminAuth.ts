import crypto from "crypto";

export interface AdminPayload {
  userId: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  iat: number;
  exp: number;
}

const TOKEN_EXPIRY_HOURS = 8;

function getSecretKey(): string {
  const secret = process.env.ADMIN_JWT_SECRET || process.env.ADMIN_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production" || process.env.IS_PRODUCTION === "true") {
      throw new Error(
        "ADMIN_JWT_SECRET belum dikonfigurasi di Environment Variables produksi. Sesi admin ditolak demi keamanan."
      );
    }
    return "dev_secret_sab_atelier_local_only_not_for_production";
  }
  return secret;
}

/**
 * Signs a payload into an HMAC-SHA256 signed token
 */
export function signAdminToken(payload: Omit<AdminPayload, "iat" | "exp">): string {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + TOKEN_EXPIRY_HOURS * 60 * 60;
  const fullPayload: AdminPayload = { ...payload, iat, exp };

  const payloadB64 = Buffer.from(JSON.stringify(fullPayload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", getSecretKey())
    .update(payloadB64)
    .digest("base64url");

  return `${payloadB64}.${signature}`;
}

/**
 * Verifies and parses an admin token. Returns null if invalid or expired.
 */
export function verifyAdminToken(token: string): AdminPayload | null {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payloadB64, providedSig] = parts;

  // Verify HMAC signature
  const expectedSig = crypto
    .createHmac("sha256", getSecretKey())
    .update(payloadB64)
    .digest("base64url");

  // Constant-time comparison to prevent timing attacks
  const expectedBuf = Buffer.from(expectedSig);
  const providedBuf = Buffer.from(providedSig);

  if (expectedBuf.length !== providedBuf.length) return null;
  if (!crypto.timingSafeEqual(expectedBuf, providedBuf)) return null;

  try {
    const payloadJson = Buffer.from(payloadB64, "base64url").toString("utf-8");
    const payload: AdminPayload = JSON.parse(payloadJson);

    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Extracts and verifies admin session from an incoming Request
 */
export function getAdminSessionFromRequest(request: Request): AdminPayload | null {
  // 1. Try Authorization header: Bearer <token>
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
    const token = authHeader.substring(7).trim();
    const session = verifyAdminToken(token);
    if (session) return session;
  }

  // 2. Try Cookie header: sab_admin_token=<token> or admin_session=<token>
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = cookieHeader.split(";").map((c) => c.trim());

  for (const cookie of cookies) {
    if (cookie.startsWith("sab_admin_token=")) {
      const token = decodeURIComponent(cookie.substring("sab_admin_token=".length));
      const session = verifyAdminToken(token);
      if (session) return session;
    }
  }

  return null;
}
