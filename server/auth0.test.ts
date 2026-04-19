import { describe, it, expect } from "vitest";

describe("Auth0 environment variables", () => {
  it("should have VITE_AUTH0_DOMAIN set", () => {
    const domain = process.env.VITE_AUTH0_DOMAIN;
    expect(domain).toBeTruthy();
    expect(domain).toContain("auth0.com");
  });

  it("should have VITE_AUTH0_CLIENT_ID set", () => {
    const clientId = process.env.VITE_AUTH0_CLIENT_ID;
    expect(clientId).toBeTruthy();
    expect(clientId!.length).toBeGreaterThan(10);
  });

  it("should have AUTH0_CLIENT_SECRET set", () => {
    const secret = process.env.AUTH0_CLIENT_SECRET;
    expect(secret).toBeTruthy();
    expect(secret!.length).toBeGreaterThan(10);
  });

  it("Auth0 domain should be reachable (JWKS endpoint)", async () => {
    const domain = process.env.VITE_AUTH0_DOMAIN;
    if (!domain) return;
    const res = await fetch(`https://${domain}/.well-known/jwks.json`);
    expect(res.ok).toBe(true);
    const data = await res.json();
    expect(data.keys).toBeDefined();
    expect(Array.isArray(data.keys)).toBe(true);
  });
});
