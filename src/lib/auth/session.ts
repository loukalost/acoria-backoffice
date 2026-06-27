import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api/client";
import type { Therapeute } from "@/types/auth";

export async function getCurrentTherapeute(): Promise<Therapeute | null> {
  const accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) return null;

  try {
    return await apiFetch<Therapeute>("/auth/me", {}, accessToken);
  } catch {
    return null;
  }
}