import { NextRequest, NextResponse } from "next/server";
import { apiFetch } from "@/lib/api/client";
import type { AuthTokens, Therapeute, LoginPayload } from "@/types/auth";

export async function POST(req: NextRequest) {
  const body: LoginPayload = await req.json();

  try {
    const { accessToken, refreshToken } = await apiFetch<AuthTokens>(
      "/auth/login",
      { method: "POST", body: JSON.stringify(body) }
    );

    const therapeute = await apiFetch<Therapeute>("/auth/me", {}, accessToken);

    const response = NextResponse.json({ user: therapeute });

    response.cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15, // 15 min, à ajuster selon la durée de vie réelle du token NestJS
    });

    response.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
    });

    return response;
  } catch (err) {
    console.error("Erreur lors de la tentative de login:", err);
    return NextResponse.json(
      { message: "Identifiants invalides" },
      { status: 401 }
    );
  }
}