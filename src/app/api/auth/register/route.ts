import { NextRequest, NextResponse } from "next/server";
import { apiFetch } from "@/lib/api/client";
import type { AuthTokens, Therapeute, RegisterPayload } from "@/types/auth";

export async function POST(req: NextRequest) {
  const body: RegisterPayload = await req.json();

  try {
    const { accessToken, refreshToken } = await apiFetch<AuthTokens>(
      "/auth/register",
      { method: "POST", body: JSON.stringify(body) }
    );

    const therapeute = await apiFetch<Therapeute>("/auth/me", {}, accessToken).catch(() => null);

    const response = NextResponse.json({ user: therapeute });

    response.cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    response.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    console.error("Erreur lors de la tentative d'inscription:", err);
    return NextResponse.json(
      { message: "Impossible de créer le compte" },
      { status: 502 }
    );
  }
}