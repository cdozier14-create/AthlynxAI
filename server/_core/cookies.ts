import type { CookieOptions, Request } from "express";

export function getSessionCookieOptions(
  req: Request
): { domain?: string; httpOnly: boolean; path: string; sameSite: string; secure: boolean } {
  const isSecure = req.protocol === "https" ||
    ((): boolean => {
      const fwd = req.headers["x-forwarded-proto"];
      if (!fwd) return false;
      const list = Array.isArray(fwd) ? fwd : fwd.split(",");
      return list.some((p: string) => p.trim().toLowerCase() === "https");
    })();

  return {
    domain: undefined,
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: isSecure,
  };
}
