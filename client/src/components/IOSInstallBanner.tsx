/**
 * IOSInstallBanner — Persistent bottom banner for iOS Safari
 * Automatically appears on iOS Safari when app is not installed as PWA.
 * Shows animated arrow pointing to the Share button with clear instructions.
 * Dismissible but re-appears after 3 days.
 */
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function IOSInstallBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    const isIOS = /iphone|ipad|ipod/i.test(ua) && !(window as any).MSStream;
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (!isIOS || isStandalone) return;

    // Check if dismissed recently (3-day cooldown)
    const dismissed = localStorage.getItem("athlynx_ios_banner_dismissed");
    if (dismissed) {
      const dismissedAt = parseInt(dismissed, 10);
      const threeDays = 3 * 24 * 60 * 60 * 1000;
      if (Date.now() - dismissedAt < threeDays) return;
    }

    // Show after 2 seconds
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("athlynx_ios_banner_dismissed", Date.now().toString());
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "linear-gradient(135deg, #0d1b3e, #0a1628)",
        borderTop: "2px solid #0066ff",
        padding: "16px 20px 28px",
        boxShadow: "0 -8px 32px rgba(0,102,255,0.3)",
      }}
    >
      {/* Dismiss button */}
      <button
        onClick={handleDismiss}
        style={{
          position: "absolute",
          top: 10,
          right: 12,
          background: "rgba(255,255,255,0.1)",
          border: "none",
          borderRadius: "50%",
          width: 28,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#94a3b8",
        }}
      >
        <X size={14} />
      </button>

      {/* Content */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        {/* ATHLYNX icon */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 12,
            background: "linear-gradient(135deg, #0066ff, #00c2ff)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: 22,
            fontWeight: 900,
            color: "#fff",
            letterSpacing: 1,
          }}
        >
          A
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ color: "#fff", fontWeight: 900, fontSize: 15, marginBottom: 4 }}>
            Add ATHLYNX to Home Screen
          </div>
          <div style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.5, marginBottom: 12 }}>
            Install the app for the full experience — faster, offline-ready, and always one tap away.
          </div>

          {/* Step-by-step */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#0066ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: 13,
                  flexShrink: 0,
                }}
              >
                1
              </div>
              <div style={{ color: "#e2e8f0", fontSize: 13 }}>
                Tap the{" "}
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 3,
                    background: "rgba(0,102,255,0.2)",
                    border: "1px solid #0066ff",
                    borderRadius: 6,
                    padding: "1px 7px",
                    fontWeight: 700,
                    color: "#00c2ff",
                    fontSize: 13,
                  }}
                >
                  <ShareIcon /> Share
                </span>{" "}
                button at the bottom
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#0066ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: 13,
                  flexShrink: 0,
                }}
              >
                2
              </div>
              <div style={{ color: "#e2e8f0", fontSize: 13 }}>
                Scroll down and tap{" "}
                <span style={{ fontWeight: 700, color: "#fff" }}>"Add to Home Screen"</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#00c2ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: 13,
                  flexShrink: 0,
                }}
              >
                3
              </div>
              <div style={{ color: "#e2e8f0", fontSize: 13 }}>
                Tap <span style={{ fontWeight: 700, color: "#fff" }}>"Add"</span> — done! 🏆
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated arrow pointing down to Safari tab bar */}
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          animation: "bounce 1.5s infinite",
        }}
      >
        <div style={{ color: "#0066ff", fontSize: 22 }}>↓</div>
        <div style={{ color: "#475569", fontSize: 11, letterSpacing: 2 }}>TAP SHARE BELOW</div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </div>
  );
}

// Inline share icon matching iOS style
function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}
