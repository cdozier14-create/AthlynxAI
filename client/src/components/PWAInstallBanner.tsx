/**
 * PWAInstallBanner — Slim, non-intrusive bottom install bar
 * Android: one-tap native install prompt
 * iOS Safari: slim bar with animated arrow pointing to Share button
 * No full-screen overlay. Dismissible with 3-day cooldown.
 */
import { useState, useEffect } from "react";
import { X, Share, Download } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const ICON_URL =
  "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/qUknrdlyPrUZJQYo.png";

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [platform, setPlatform] = useState<"ios" | "android" | null>(null);

  useEffect(() => {
    // Listen for manual trigger from "Add to Phone" button
    const forceShow = () => {
      setShow(true);
      if (!platform) {
        const ua = navigator.userAgent;
        const isIOS = /iphone|ipad|ipod/i.test(ua) && !(window as any).MSStream;
        setPlatform(isIOS ? 'ios' : 'android');
      }
    };
    window.addEventListener('athlynx-show-pwa', forceShow);
    return () => window.removeEventListener('athlynx-show-pwa', forceShow);
  }, [platform]);

  useEffect(() => {
    // Already installed as PWA — never show
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    if (isStandalone) return;

    // 3-day dismissal cooldown
    const dismissed = localStorage.getItem("athlynx_pwa_dismissed_v2");
    if (dismissed && Date.now() - parseInt(dismissed) < 3 * 24 * 60 * 60 * 1000) return;

    const ua = navigator.userAgent;
    const isIOS = /iphone|ipad|ipod/i.test(ua) && !(window as any).MSStream;
    const isAndroid = /android/i.test(ua);

    if (isIOS) {
      setPlatform("ios");
      const t = setTimeout(() => setShow(true), 5000);
      return () => clearTimeout(t);
    }

    if (isAndroid) {
      const handler = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        setPlatform("android");
        setShow(true);
      };
      window.addEventListener("beforeinstallprompt", handler);
      return () => window.removeEventListener("beforeinstallprompt", handler);
    }
  }, []);

  const handleAndroidInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setShow(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    localStorage.setItem("athlynx_pwa_dismissed_v2", Date.now().toString());
    setShow(false);
  };

  if (!show || !platform) return null;

  return (
    <>
      <style>{`
        @keyframes athlynx-pwa-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        @keyframes athlynx-pwa-slide {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .athlynx-pwa-bar {
          animation: athlynx-pwa-slide 0.35s ease-out forwards;
        }
      `}</style>

      <div
        className="athlynx-pwa-bar"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9998,
          background: "linear-gradient(180deg, #0d1b3e 0%, #060d1f 100%)",
          borderTop: "1.5px solid rgba(0, 102, 255, 0.45)",
          boxShadow: "0 -6px 30px rgba(0, 102, 255, 0.18)",
          paddingBottom: "max(12px, env(safe-area-inset-bottom))",
          paddingTop: 10,
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        {platform === "android" ? (
          /* ─── Android: One-tap install ─── */
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img
              src={ICON_URL}
              alt="ATHLYNX"
              style={{ width: 44, height: 44, borderRadius: 11, flexShrink: 0 }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 14, lineHeight: 1.2 }}>
                Install ATHLYNX
              </div>
              <div style={{ color: "#64748b", fontSize: 11, marginTop: 2 }}>
                Add to home screen · works offline · no App Store
              </div>
            </div>
            <button
              onClick={handleAndroidInstall}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "linear-gradient(135deg, #0066ff, #00c2ff)",
                color: "#fff",
                border: "none",
                borderRadius: 22,
                padding: "8px 18px",
                fontWeight: 800,
                fontSize: 13,
                cursor: "pointer",
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              <Download size={14} />
              Install
            </button>
            <button
              onClick={handleDismiss}
              style={{
                background: "none",
                border: "none",
                color: "#334155",
                cursor: "pointer",
                padding: 4,
                flexShrink: 0,
              }}
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          /* ─── iOS: Slim 3-step bar ─── */
          <div>
            {/* Top row: icon + title + dismiss */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <img
                src={ICON_URL}
                alt="ATHLYNX"
                style={{ width: 38, height: 38, borderRadius: 9, flexShrink: 0 }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: 13, lineHeight: 1.2 }}>
                  Add ATHLYNX to Home Screen
                </div>
                <div style={{ color: "#64748b", fontSize: 11, marginTop: 1 }}>
                  Works like a native app · no App Store needed
                </div>
              </div>
              <button
                onClick={handleDismiss}
                style={{
                  background: "none",
                  border: "none",
                  color: "#334155",
                  cursor: "pointer",
                  padding: 4,
                  flexShrink: 0,
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* 3 steps inline */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                background: "rgba(0,102,255,0.07)",
                border: "1px solid rgba(0,102,255,0.2)",
                borderRadius: 10,
                padding: "7px 10px",
              }}
            >
              {/* Step 1 */}
              <div style={{ display: "flex", alignItems: "center", gap: 5, flex: 1 }}>
                <span
                  style={{
                    background: "#0066ff",
                    color: "#fff",
                    borderRadius: "50%",
                    width: 17,
                    height: 17,
                    fontSize: 10,
                    fontWeight: 900,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  1
                </span>
                <span style={{ color: "#94a3b8", fontSize: 10 }}>
                  Tap{" "}
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 2,
                      color: "#00c2ff",
                      fontWeight: 700,
                    }}
                  >
                    <Share size={10} /> Share
                  </span>
                </span>
              </div>

              <span style={{ color: "#1e3a6e", fontSize: 14 }}>›</span>

              {/* Step 2 */}
              <div style={{ display: "flex", alignItems: "center", gap: 5, flex: 1.4 }}>
                <span
                  style={{
                    background: "#0066ff",
                    color: "#fff",
                    borderRadius: "50%",
                    width: 17,
                    height: 17,
                    fontSize: 10,
                    fontWeight: 900,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  2
                </span>
                <span style={{ color: "#94a3b8", fontSize: 10 }}>
                  <span style={{ color: "#e2e8f0", fontWeight: 600 }}>"Add to Home Screen"</span>
                </span>
              </div>

              <span style={{ color: "#1e3a6e", fontSize: 14 }}>›</span>

              {/* Step 3 */}
              <div style={{ display: "flex", alignItems: "center", gap: 5, flex: 0.8 }}>
                <span
                  style={{
                    background: "#00c2ff",
                    color: "#fff",
                    borderRadius: "50%",
                    width: 17,
                    height: 17,
                    fontSize: 10,
                    fontWeight: 900,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  3
                </span>
                <span style={{ color: "#00c2ff", fontSize: 10, fontWeight: 700 }}>
                  Tap "Add" ✓
                </span>
              </div>
            </div>

            {/* Animated arrow pointing to Safari tab bar */}
            <div
              style={{
                textAlign: "center",
                marginTop: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  animation: "athlynx-pwa-bounce 1.4s ease-in-out infinite",
                  color: "#0066ff",
                  fontSize: 15,
                  lineHeight: 1,
                }}
              >
                ↓
              </span>
              <span style={{ color: "#334155", fontSize: 10, letterSpacing: "0.08em" }}>
                Share button is in the Safari bar below
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
