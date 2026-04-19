import { useState } from "react";
import { Link } from "wouter";

const appFeatures = [
  { icon: "🤖", title: "FUEL Bot AI", desc: "Your personal AI coach in your pocket. Training plans, recruiting advice, NIL guidance — 24/7." },
  { icon: "📱", title: "Social Feed", desc: "Stay connected with athletes worldwide. Share highlights, training clips, and recruiting updates." },
  { icon: "🏆", title: "Live Tournaments", desc: "Real-time tournament brackets, scores, and standings. Never miss a moment of the action." },
  { icon: "💰", title: "NIL Deals", desc: "Browse, apply, and manage NIL deals directly from your phone. Your brand, your business." },
  { icon: "🎬", title: "Film Review", desc: "Upload, tag, and share game film instantly. Get AI-powered breakdowns on the go." },
  { icon: "🔔", title: "Smart Alerts", desc: "Recruiting windows, coach views, deal deadlines — get notified before it's too late." },
];

const screenshots = [
  { label: "Dashboard", bg: "from-blue-900 to-cyan-900" },
  { label: "NIL Portal", bg: "from-green-900 to-emerald-900" },
  { label: "FUEL Bot", bg: "from-orange-900 to-red-900" },
  { label: "Tournaments", bg: "from-purple-900 to-indigo-900" },
];

export default function MobileApp() {
  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState<"ios" | "android">("ios");
  const [notified, setNotified] = useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    setNotified(true);
  };

  return (
    <div className="min-h-screen bg-[#060d1a]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#060d1a]/95 backdrop-blur border-b border-blue-900/30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-400 hover:text-white text-sm">← ATHLYNX</Link>
            <span className="text-gray-600">|</span>
            <span className="text-white font-bold">Mobile App</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#notify"
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
            >
              Get Early Access
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-[#060d1a] to-purple-950 opacity-60" />
        <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-blue-900/40 border border-blue-700/50 rounded-full px-4 py-1.5 mb-6">
              <span className="text-blue-400 text-xs font-bold tracking-widest">COMING SOON</span>
              <span className="bg-orange-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">BETA</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 leading-none">
              ATHLYNX<br />
              <span className="text-blue-400">IN YOUR</span><br />
              <span className="text-cyan-400">POCKET</span>
            </h1>
            <p className="text-gray-300 text-xl mb-8">
              The full power of ATHLYNX — FUEL Bot AI, NIL deals, recruiting tools, tournaments — all in one mobile app.
            </p>

            <div className="flex gap-4 mb-8 flex-wrap">
              <button
                onClick={() => setPlatform("ios")}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all ${
                  platform === "ios"
                    ? "bg-white text-black"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <span className="text-2xl">🍎</span>
                <div className="text-left">
                  <div className="text-xs opacity-70">Download on the</div>
                  <div className="font-black">App Store</div>
                </div>
              </button>
              <button
                onClick={() => setPlatform("android")}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all ${
                  platform === "android"
                    ? "bg-white text-black"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <span className="text-2xl">🤖</span>
                <div className="text-left">
                  <div className="text-xs opacity-70">Get it on</div>
                  <div className="font-black">Google Play</div>
                </div>
              </button>
            </div>

            <div className="bg-blue-900/30 border border-blue-700/40 rounded-xl p-4">
              <p className="text-blue-300 text-sm">
                <span className="font-bold">🚀 Beta launching soon.</span> Sign up below to be first in line and get exclusive early access perks.
              </p>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="flex gap-4">
            {screenshots.slice(0, 2).map((screen) => (
              <div
                key={screen.label}
                className={`w-36 h-64 rounded-3xl bg-gradient-to-b ${screen.bg} border-2 border-white/10 flex flex-col items-center justify-center shadow-2xl`}
                style={{ transform: screen.label === "NIL Portal" ? "translateY(24px)" : "translateY(-24px)" }}
              >
                <div className="w-16 h-1.5 bg-white/20 rounded-full mb-6" />
                <div className="text-white/40 text-xs font-bold">{screen.label}</div>
                <div className="mt-4 space-y-2 px-3 w-full">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-2 bg-white/10 rounded-full" style={{ width: `${60 + i * 10}%` }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-10">Everything You Need, On the Go</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {appFeatures.map((f) => (
              <div key={f.title} className="bg-white/5 border border-blue-900/20 rounded-xl p-5 hover:border-blue-600/40 transition-all">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 px-4 border-y border-blue-900/20 bg-black/20">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "4.9★", label: "App Store Rating", icon: "⭐" },
            { value: "<2s", label: "Load Time", icon: "⚡" },
            { value: "iOS & Android", label: "Platforms", icon: "📱" },
            { value: "Free", label: "Download", icon: "🎁" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-2xl font-black text-blue-400">{s.value}</div>
              <div className="text-gray-400 text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Early Access Form */}
      <section id="notify" className="py-16 px-4">
        <div className="max-w-lg mx-auto text-center">
          <div className="text-5xl mb-4">🚀</div>
          <h2 className="text-3xl font-black text-white mb-3">Get Early Access</h2>
          <p className="text-gray-300 mb-8">
            Be among the first to experience ATHLYNX on mobile. Early access members get exclusive perks and lifetime discounts.
          </p>
          {notified ? (
            <div className="bg-green-900/30 border border-green-700/40 rounded-2xl p-8">
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-white font-black text-xl mb-2">You're on the list!</h3>
              <p className="text-gray-300 text-sm">We'll notify you the moment the app drops. Get ready to level up.</p>
            </div>
          ) : (
            <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/5 border border-blue-900/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white font-black px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
              >
                Notify Me
              </button>
            </form>
          )}
          <p className="text-gray-600 text-xs mt-4">No spam. Unsubscribe anytime. We respect your privacy.</p>
        </div>
      </section>

      {/* Platform Comparison */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-900/20 to-purple-900/10 border-t border-blue-900/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-white text-center mb-8">Web vs Mobile</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left text-gray-400 text-sm font-bold pb-3 pr-4">Feature</th>
                  <th className="text-center text-blue-400 text-sm font-bold pb-3 px-4">Web App</th>
                  <th className="text-center text-cyan-400 text-sm font-bold pb-3 px-4">Mobile App</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {[
                  { feature: "FUEL Bot AI", web: true, mobile: true },
                  { feature: "NIL Deals", web: true, mobile: true },
                  { feature: "Recruiting Tools", web: true, mobile: true },
                  { feature: "Push Notifications", web: false, mobile: true },
                  { feature: "Offline Film Review", web: false, mobile: true },
                  { feature: "Camera Integration", web: false, mobile: true },
                  { feature: "Location-Based Spots", web: false, mobile: true },
                  { feature: "Live Tournament Updates", web: true, mobile: true },
                ].map((row) => (
                  <tr key={row.feature} className="border-b border-blue-900/20">
                    <td className="text-gray-300 text-sm py-3 pr-4">{row.feature}</td>
                    <td className="text-center py-3 px-4">
                      {row.web ? <span className="text-green-400">✓</span> : <span className="text-gray-700">—</span>}
                    </td>
                    <td className="text-center py-3 px-4">
                      {row.mobile ? <span className="text-green-400">✓</span> : <span className="text-gray-700">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-blue-900/30 text-center">
        <p className="text-gray-600 text-sm">ATHLYNX Mobile · A Dozier Holdings Group Company</p>
        <Link href="/" className="text-blue-400 text-sm hover:text-blue-300 mt-2 inline-block">← Back to ATHLYNX Platform</Link>
      </footer>
    </div>
  );
}
