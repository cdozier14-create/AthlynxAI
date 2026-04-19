import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const PUBLIC_DIR = path.resolve(__dirname, "../client/public");

describe("PWA Requirements", () => {
  it("service worker file exists in client/public", () => {
    const swPath = path.join(PUBLIC_DIR, "sw.js");
    expect(fs.existsSync(swPath)).toBe(true);
  });

  it("service worker contains required event listeners", () => {
    const swContent = fs.readFileSync(path.join(PUBLIC_DIR, "sw.js"), "utf8");
    expect(swContent).toContain("install");
    expect(swContent).toContain("activate");
    expect(swContent).toContain("fetch");
    expect(swContent).toContain("push");
    expect(swContent).toContain("notificationclick");
  });

  it("manifest.json exists in client/public", () => {
    const manifestPath = path.join(PUBLIC_DIR, "manifest.json");
    expect(fs.existsSync(manifestPath)).toBe(true);
  });

  it("manifest.json has required PWA fields", () => {
    const manifest = JSON.parse(
      fs.readFileSync(path.join(PUBLIC_DIR, "manifest.json"), "utf8")
    );
    expect(manifest.name).toBeTruthy();
    expect(manifest.short_name).toBeTruthy();
    expect(manifest.start_url).toBeTruthy();
    expect(manifest.display).toBe("standalone");
    expect(manifest.background_color).toBeTruthy();
    expect(manifest.theme_color).toBeTruthy();
    expect(Array.isArray(manifest.icons)).toBe(true);
    expect(manifest.icons.length).toBeGreaterThanOrEqual(2);
  });

  it("manifest.json has 192x192 and 512x512 icons", () => {
    const manifest = JSON.parse(
      fs.readFileSync(path.join(PUBLIC_DIR, "manifest.json"), "utf8")
    );
    const sizes = manifest.icons.map((i: { sizes: string }) => i.sizes);
    expect(sizes).toContain("192x192");
    expect(sizes).toContain("512x512");
  });

  it("manifest.json has shortcuts for key app sections", () => {
    const manifest = JSON.parse(
      fs.readFileSync(path.join(PUBLIC_DIR, "manifest.json"), "utf8")
    );
    expect(Array.isArray(manifest.shortcuts)).toBe(true);
    expect(manifest.shortcuts.length).toBeGreaterThanOrEqual(2);
  });

  it("index.html has iOS PWA meta tags", () => {
    const htmlPath = path.resolve(__dirname, "../client/index.html");
    const html = fs.readFileSync(htmlPath, "utf8");
    expect(html).toContain("apple-mobile-web-app-capable");
    expect(html).toContain("apple-mobile-web-app-title");
    expect(html).toContain("apple-touch-icon");
    expect(html).toContain("viewport-fit=cover");
    expect(html).toContain("/manifest.json");
  });

  it("main.tsx registers service worker", () => {
    const mainPath = path.resolve(__dirname, "../client/src/main.tsx");
    const main = fs.readFileSync(mainPath, "utf8");
    expect(main).toContain("serviceWorker");
    expect(main).toContain("register");
    expect(main).toContain("/sw.js");
  });
});
