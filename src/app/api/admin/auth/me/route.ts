import { NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth/adminAuth";

export async function GET(request: Request) {
  const session = getAdminSessionFromRequest(request);

  if (!session) {
    return NextResponse.json(
      { success: false, authenticated: false, message: "Sesi admin tidak valid atau telah kedaluwarsa." },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    authenticated: true,
    user: {
      userId: session.userId,
      name: session.name,
      email: session.email,
      role: session.role,
      avatar: session.avatar,
    },
  });
}
