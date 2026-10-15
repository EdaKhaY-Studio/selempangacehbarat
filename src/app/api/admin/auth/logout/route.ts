import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logout admin berhasil.",
  });

  // Clear cookie
  response.cookies.set({
    name: "sab_admin_token",
    value: "",
    path: "/",
    maxAge: 0,
  });

  return response;
}
