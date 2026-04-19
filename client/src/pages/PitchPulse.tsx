import { useState } from "react";
import { Link } from "wouter";

const stats = [
  { icon: "⚽", value: "2.1M+", label: "Players" },
  { icon: "🏆", value: "22,000+", label: "Tournaments" },
  { icon: "🌍", value: "180+", label: "Countries" },
  { icon: "🎓", value: "3,200+", label: "College Programs" },
];

const features = [
  { icon: "👤", title: "Player Profile", desc: "Build your global soccer profile. Stats, highlights, positions, and achievements all in one place." },
  { icon: "🔭", title: "Scout Access", desc: "Get discovered by professional scouts and college coaches worldwide. Your profile works 24/7." },
  { icon: "🏅", title: "Rankings", desc: "National and international rankings by age group and position. Know where you stand globally." },
  { icon: "🎯", title: "Training Programs", desc: "AI-designed training programs for your position and skill level. Train like the pros." },
  { icon: "🏟️", title: "Tournaments", desc: "Find local, regional, and national tournaments. Register in seconds, compete at the highest level." },
  { icon: "🛤️", title: "Pro Pathway", desc: "The complete roadmap from youth soccer to college to professional. Every step mapped out for you." },
];

export default function PitchPulse() {
  const [activeTab, setActiveTab] = useState<"overview" | "tournaments" | "rankings" | "pathway">("overview");

  return (
    <div className="min-h-screen bg-[#001a0a]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#001a0a]/95 backdrop-blur border-b border-green-900/30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-400 hover:text-white text-sm">← ATHLYNX</Link>
            <span className="text-gray-600">|</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚽</span>
              <div>
                <div className="text-xs text-green-400 font-bold tracking-widest">PITCH PULSE</div>
                <div className="text-xs text-white/60 tracking-wider">POWERED BY ATHLYNX</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/signin" className="text-sm text-gray-300 hover:text-white">Log In</Link>
            <Link href="/signin" className="bg-green-600 hover:bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
              Create Player Profile
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-green-950 via-[#001a0a] to-emerald-950 opacity-70" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-900/40 border border-green-700/50 rounded-full px-4 py-1.5 mb-6">
            <span className="text-green-400 text-xs font-bold tracking-widest">POWERED BY ATHLYNX</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-white mb-4 leading-none">
            PITCH<br />
            <span className="text-green-400">PULSE</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            The complete soccer ecosystem. Player rankings, tournaments, training programs, and the pathway to professional soccer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signin" className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all hover:scale-105">
              👤 Create Player Profile
            </Link>
            <button className="flex items-center justify-center gap-2 border border-green-500 text-green-400 hover:bg-green-500/10 font-bold text-lg px-8 py-4 rounded-xl transition-all">
              🔭 Scout Access
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 px-4 border-y border-green-900/30 bg-black/30">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl mb-1">{s.icon}</div>
              <div className="text-3xl font-black text-green-400">{s.value}</div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tabs */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {(["overview", "tournaments", "rankings", "pathway"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg font-bold text-sm capitalize whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? "bg-green-600 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f) => (
                <div key={f.title} className="bg-white/5 border border-green-900/30 rounded-xl p-5 hover:border-green-600/50 transition-all">
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "tournaments" && (
            <div className="space-y-4">
              {[
                { name: "US Youth Soccer National Championship", date: "July 10, 2026", location: "Frisco, TX", division: "U17/U19", teams: 64 },
                { name: "ECNL National Event", date: "June 25, 2026", location: "San Diego, CA", division: "U15-U18", teams: 128 },
                { name: "MLS Next Cup", date: "July 18, 2026", location: "Columbus, OH", division: "U17/U19", teams: 48 },
                { name: "Copa del Futuro", date: "August 2, 2026", location: "Miami, FL", division: "U14-U18", teams: 32 },
              ].map((t) => (
                <div key={t.name} className="bg-white/5 border border-green-900/30 rounded-xl p-5 flex items-center justify-between hover:border-green-600/50 transition-all">
                  <div>
                    <div className="text-white font-bold">{t.name}</div>
                    <div className="text-gray-400 text-sm">{t.date} · {t.location}</div>
                    <span className="text-xs bg-green-900/40 text-green-400 px-2 py-0.5 rounded-full mt-1 inline-block">{t.division}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold">{t.teams} teams</div>
                    <button className="mt-2 bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-colors">
                      Register
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "rankings" && (
            <div className="space-y-3">
              {[
                { rank: 1, name: "Sofia Reyes", pos: "FW", club: "LAFC Academy", state: "CA", age: "U17" },
                { rank: 2, name: "Aiden Torres", pos: "MF", club: "FC Dallas Academy", state: "TX", age: "U17" },
                { rank: 3, name: "Emma Chen", pos: "GK", club: "Portland Thorns Academy", state: "OR", age: "U18" },
                { rank: 4, name: "Marcus Silva", pos: "CB", club: "Atlanta United Academy", state: "GA", age: "U17" },
                { rank: 5, name: "Priya Patel", pos: "FW", club: "Chicago Fire Academy", state: "IL", age: "U16" },
              ].map((player) => (
                <div key={player.rank} className="bg-white/5 border border-green-900/30 rounded-xl p-4 flex items-center gap-4 hover:border-green-600/30 transition-all">
                  <div className="text-2xl font-black text-green-400 w-8">#{player.rank}</div>
                  <div className="flex-1">
                    <div className="text-white font-bold">{player.name}</div>
                    <div className="text-gray-400 text-sm">{player.club} · {player.state}</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-900/40 text-green-400 text-xs font-bold px-2 py-0.5 rounded">{player.pos}</div>
                    <div className="text-gray-500 text-xs mt-1">{player.age}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "pathway" && (
            <div className="space-y-4">
              {[
                { step: 1, title: "Youth Development", desc: "Build fundamentals. Join a club academy. Get ranked in your age group.", icon: "🌱" },
                { step: 2, title: "High School Excellence", desc: "Dominate your state. Build your highlight reel. Get on college coaches' radars.", icon: "📈" },
                { step: 3, title: "College Recruitment", desc: "Connect with D1/D2/D3 programs. Visit campuses. Sign your letter of intent.", icon: "🎓" },
                { step: 4, title: "College Career", desc: "Compete at the highest collegiate level. Build your professional profile.", icon: "🏟️" },
                { step: 5, title: "Professional Draft", desc: "MLS SuperDraft, NWSL Draft, or international opportunities. Your pro career starts here.", icon: "⚡" },
              ].map((step) => (
                <div key={step.step} className="bg-white/5 border border-green-900/30 rounded-xl p-5 flex items-start gap-4 hover:border-green-600/50 transition-all">
                  <div className="text-3xl">{step.icon}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-green-400 text-xs font-bold">STEP {step.step}</span>
                    </div>
                    <h3 className="text-white font-bold text-lg">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-900/40 to-emerald-900/20 border-t border-green-900/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">Your Soccer Journey Starts Now</h2>
          <p className="text-gray-300 mb-8">Join 2.1M+ soccer players on Pitch Pulse. Get discovered. Go pro.</p>
          <Link href="/signin" className="inline-block bg-green-600 hover:bg-green-500 text-white font-black text-xl px-10 py-5 rounded-xl transition-all hover:scale-105">
            ⚽ Start Free — 7 Days on Us
          </Link>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-green-900/30 text-center">
        <p className="text-gray-600 text-sm">Pitch Pulse · Powered by ATHLYNX · A Dozier Holdings Group Company</p>
        <Link href="/" className="text-green-400 text-sm hover:text-green-300 mt-2 inline-block">← Back to ATHLYNX Platform</Link>
      </footer>
    </div>
  );
}
