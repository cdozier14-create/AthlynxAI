/**
 * InstallAppModal — Always-accessible install guide
 * Shows step-by-step instructions for iOS and Android
 * Triggered by a button anywhere in the app
 */
import { useState, useEffect } from "react";
import { X, Share, Plus, Download, Smartphone, CheckCircle } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface InstallAppModalProps {
  open: boolean;
  onClose: () => void;
}

export default function InstallAppModal({ open, onClose }: InstallAppModalProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [platform, setPlatform] = useState<"ios" | "android" | "desktop">("desktop");

  useEffect(() => {
    // Detect platform
    const ua = navigator.userAgent;
    const isIOS = /iphone|ipad|ipod/i.test(ua) && !(window as any).MSStream;
    const isAndroid = /android/i.test(ua);
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) {
      setInstalled(true);
    } else if (isIOS) {
      setPlatform("ios");
    } else if (isAndroid) {
      setPlatform("android");
    } else {
      setPlatform("desktop");
    }

    // Capture Android install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleAndroidInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setInstalled(true);
      setTimeout(onClose, 1500);
    }
    setDeferredPrompt(null);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full sm:max-w-md bg-[#0a1628] border border-[#00D4FF]/30 rounded-t-3xl sm:rounded-3xl shadow-2xl shadow-blue-900/50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/xTPjfpFcIKtwWcKQ.png"
              alt="ATHLYNX"
              className="w-14 h-14 rounded-2xl shadow-lg object-contain"
            />
            <div>
              <h2 className="text-white font-black text-lg leading-tight">Add ATHLYNX to Phone</h2>
              <p className="text-[#00D4FF] text-xs">Works like a native app — no App Store needed</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5">
          {installed ? (
            /* Already installed */
            <div className="text-center py-6">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-3" />
              <h3 className="text-white font-black text-xl mb-1">ATHLYNX is Installed!</h3>
              <p className="text-blue-300 text-sm">Open it from your home screen anytime.</p>
            </div>
          ) : platform === "ios" ? (
            /* iOS Instructions */
            <div>
              <p className="text-white/70 text-sm mb-5 text-center">
                Follow these 3 easy steps in <span className="text-[#00D4FF] font-bold">Safari</span>
              </p>
              <div className="flex flex-col gap-3">
                {/* Step 1 */}
                <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="w-10 h-10 rounded-full bg-[#00D4FF] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#0a1628] font-black text-lg">1</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-bold text-sm">Tap the Share button</p>
                    <p className="text-white/50 text-xs mt-0.5">The box with an arrow at the bottom of Safari</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Share className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="w-10 h-10 rounded-full bg-[#00D4FF] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#0a1628] font-black text-lg">2</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-bold text-sm">Tap "Add to Home Screen"</p>
                    <p className="text-white/50 text-xs mt-0.5">Scroll down in the Share menu to find it</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="w-10 h-10 rounded-full bg-[#00D4FF] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#0a1628] font-black text-lg">3</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-bold text-sm">Tap "Add" in the top right</p>
                    <p className="text-white/50 text-xs mt-0.5">ATHLYNX icon appears on your home screen!</p>
                  </div>
                  <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Visual hint arrow */}
              <div className="mt-5 bg-[#00D4FF]/10 border border-[#00D4FF]/30 rounded-2xl p-4 text-center">
                <p className="text-[#00D4FF] text-xs font-bold uppercase tracking-widest mb-1">Look for this icon</p>
                <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
                  <Share className="w-5 h-5 text-[#00D4FF]" />
                  <span>at the <strong>bottom center</strong> of Safari</span>
                </div>
              </div>
            </div>
          ) : platform === "android" && deferredPrompt ? (
            /* Android — one-tap install */
            <div className="text-center py-4">
              <Smartphone className="w-16 h-16 text-[#00D4FF] mx-auto mb-4" />
              <h3 className="text-white font-black text-xl mb-2">One Tap to Install</h3>
              <p className="text-white/60 text-sm mb-6">
                ATHLYNX will be added to your home screen and work like a native app — no App Store needed.
              </p>
              <button
                onClick={handleAndroidInstall}
                className="w-full bg-gradient-to-r from-[#00D4FF] to-blue-500 text-[#0a1628] font-black text-lg py-4 rounded-2xl flex items-center justify-center gap-3 hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/30"
              >
                <Download className="w-6 h-6" />
                Install ATHLYNX Now
              </button>
            </div>
          ) : (
            /* Desktop or Android without prompt */
            <div>
              <p className="text-white/70 text-sm mb-5 text-center">
                Open this page on your <span className="text-[#00D4FF] font-bold">phone browser</span> to install
              </p>
              <div className="flex flex-col gap-3">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <p className="text-white font-bold text-sm mb-1">📱 On iPhone (Safari)</p>
                  <p className="text-white/60 text-xs">Tap Share → Add to Home Screen → Add</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <p className="text-white font-bold text-sm mb-1">🤖 On Android (Chrome)</p>
                  <p className="text-white/60 text-xs">Tap the 3-dot menu → Add to Home Screen → Install</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <p className="text-white font-bold text-sm mb-1">💻 On Desktop (Chrome)</p>
                  <p className="text-white/60 text-xs">Click the install icon (⊕) in the address bar</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom safe area for iOS */}
        <div className="h-safe-bottom bg-[#0a1628]" />
      </div>
    </div>
  );
}
