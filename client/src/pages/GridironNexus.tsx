import { useState } from "react";
import { Link } from "wouter";

const stats = [
  { icon: "👥", value: "1.2M+", label: "Players" },
  { icon: "🏆", value: "15,000+", label: "Events" },
  { icon: "🎓", value: "4,800+", label: "Colleges" },
  { icon: "💰", value: "$2.1B+", label: "NIL Deals" },
];

const features = [
  { icon: "🎬", title: "Film Analysis", desc: "AI-powered film breakdown. See your tendencies, fix your weaknesses, dominate your position." },
  { icon: "📊", title: "Combine Prep", desc: "40-yard dash, vertical, bench press — track every metric. Get your combine score before the combine." },
  { icon: "🎯", title: "Elite Recruiting", desc: "Connect directly with D1, D2, D3, NAIA coaches. Your highlight reel goes to the right eyes." },
  { icon: "💵", title: "NIL Opportunities", desc: "Local brands, national sponsors, autograph deals. Your name is your brand — monetize it now." },
  { icon: "🏟️", title: "Find Events", desc: "7-on-7 tournaments, combines, showcases, camps. Never miss a chance to be seen." },
  { icon: "📈", title: "Rankings", desc: "State, regional, national rankings updated weekly. Know where you stand. Rise to the top." },
];

const positions = ["QB", "RB", "WR", "TE", "OL", "DL", "LB", "DB", "K/P", "ATH"];

export default function GridironNexus() {
  const [activeTab, setActiveTab] = useState<"overview" | "events" | "rankings" | "recruiting">("overview");

  return (
    <div className="min-h-screen bg-[#1a0a00]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1a0a00]/95 backdrop-blur border-b border-red-900/30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-400 hover:text-white text-sm">← ATHLYNX</Link>
            <span className="text-gray-600">|</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏈</span>
              <div>
                <div className="text-xs text-red-400 font-bold tracking-widest">GRIDIRON NEXUS</div>
                <div className="text-xs text-yellow-400 tracking-wider">POWERED BY ATHLYNX</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/signin" className="text-sm text-gray-300 hover:text-white">Log In</Link>
            <Link href="/signin" className="bg-red-600 hover:bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
              Sign Up Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-[#1a0a00] to-yellow-950 opacity-60" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-900/40 border border-red-700/50 rounded-full px-4 py-1.5 mb-6">
            <span className="text-red-400 text-xs font-bold tracking-widest">GRIDIRON NEXUS</span>
            <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">POWERED BY ATHLYNX</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-white mb-4 leading-none">
            OWN THE<br />
            <span className="text-yellow-400">GRIDIRON</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Elite Recruiting. Film Analysis. Combine Prep. NIL Opportunities. The complete football platform for ballers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signin" className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all hover:scale-105">
              🏆 Find Events
            </Link>
            <button className="flex items-center justify-center gap-2 border border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 font-bold text-lg px-8 py-4 rounded-xl transition-all">
              📈 View Rankings
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 px-4 border-y border-red-900/30 bg-black/30">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl mb-1">{s.icon}</div>
              <div className="text-3xl font-black text-yellow-400">{s.value}</div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tabs */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {(["overview", "events", "rankings", "recruiting"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg font-bold text-sm capitalize whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? "bg-red-600 text-white"
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
                <div key={f.title} className="bg-white/5 border border-red-900/30 rounded-xl p-5 hover:border-red-600/50 transition-all">
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "events" && (
            <div className="space-y-4">
              {[
                { name: "Elite 11 QB Camp", date: "May 15, 2026", location: "Dallas, TX", type: "QB Camp", spots: 12 },
                { name: "Under Armour All-America Camp", date: "May 22, 2026", location: "Atlanta, GA", type: "Showcase", spots: 50 },
                { name: "National 7-on-7 Championship", date: "June 5, 2026", location: "Las Vegas, NV", type: "Tournament", spots: 32 },
                { name: "Nike Football Training Camp", date: "June 12, 2026", location: "Houston, TX", type: "Camp", spots: 100 },
                { name: "Rivals Camp Series", date: "June 20, 2026", location: "Miami, FL", type: "Showcase", spots: 75 },
              ].map((event) => (
                <div key={event.name} className="bg-white/5 border border-red-900/30 rounded-xl p-5 flex items-center justify-between hover:border-red-600/50 transition-all">
                  <div>
                    <div className="text-white font-bold">{event.name}</div>
                    <div className="text-gray-400 text-sm">{event.date} · {event.location}</div>
                    <span className="text-xs bg-red-900/40 text-red-400 px-2 py-0.5 rounded-full mt-1 inline-block">{event.type}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 font-bold">{event.spots} spots</div>
                    <button className="mt-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-colors">
                      Register
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "rankings" && (
            <div>
              <div className="flex gap-2 mb-6 flex-wrap">
                {positions.map((pos) => (
                  <button key={pos} className="bg-white/5 hover:bg-red-600/20 border border-red-900/30 text-gray-300 text-sm font-bold px-3 py-1.5 rounded-lg transition-all">
                    {pos}
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                {[
                  { rank: 1, name: "Marcus Johnson", pos: "QB", school: "Westfield HS", state: "TX", stars: 5 },
                  { rank: 2, name: "DeShawn Williams", pos: "WR", school: "IMG Academy", state: "FL", stars: 5 },
                  { rank: 3, name: "Tyler Brooks", pos: "OL", school: "St. John Bosco", state: "CA", stars: 5 },
                  { rank: 4, name: "Jordan Davis", pos: "DB", school: "North Shore HS", state: "TX", stars: 4 },
                  { rank: 5, name: "Chris Martinez", pos: "RB", school: "Duncanville HS", state: "TX", stars: 4 },
                ].map((player) => (
                  <div key={player.rank} className="bg-white/5 border border-red-900/30 rounded-xl p-4 flex items-center gap-4 hover:border-yellow-500/30 transition-all">
                    <div className="text-2xl font-black text-yellow-400 w-8">#{player.rank}</div>
                    <div className="flex-1">
                      <div className="text-white font-bold">{player.name}</div>
                      <div className="text-gray-400 text-sm">{player.school} · {player.state}</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-red-900/40 text-red-400 text-xs font-bold px-2 py-0.5 rounded">{player.pos}</div>
                      <div className="text-yellow-400 text-sm mt-1">{"⭐".repeat(player.stars)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "recruiting" && (
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { school: "Alabama", conference: "SEC", openNeeds: ["QB", "WR", "DB"], scholarships: 3 },
                { school: "Ohio State", conference: "Big Ten", openNeeds: ["RB", "OL", "LB"], scholarships: 2 },
                { school: "Georgia", conference: "SEC", openNeeds: ["DL", "TE", "DB"], scholarships: 4 },
                { school: "Texas", conference: "Big 12", openNeeds: ["QB", "WR", "OL"], scholarships: 5 },
              ].map((school) => (
                <div key={school.school} className="bg-white/5 border border-red-900/30 rounded-xl p-5 hover:border-yellow-500/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-white font-bold text-lg">{school.school}</div>
                      <div className="text-gray-400 text-sm">{school.conference}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold">{school.scholarships}</div>
                      <div className="text-gray-500 text-xs">scholarships</div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {school.openNeeds.map((pos) => (
                      <span key={pos} className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-0.5 rounded">
                        {pos} needed
                      </span>
                    ))}
                  </div>
                  <button className="mt-4 w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded-lg text-sm transition-colors">
                    Connect with Coaches
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-900/40 to-yellow-900/20 border-t border-red-900/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">Ready to Own the Gridiron?</h2>
          <p className="text-gray-300 mb-8">Join 1.2M+ football players already on ATHLYNX. Your next level starts here.</p>
          <Link href="/signin" className="inline-block bg-red-600 hover:bg-red-500 text-white font-black text-xl px-10 py-5 rounded-xl transition-all hover:scale-105">
            🏈 Start Free — 7 Days on Us
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-red-900/30 text-center">
        <p className="text-gray-600 text-sm">Gridiron Nexus · Powered by ATHLYNX · A Dozier Holdings Group Company</p>
        <Link href="/" className="text-red-400 text-sm hover:text-red-300 mt-2 inline-block">← Back to ATHLYNX Platform</Link>
      </footer>
    </div>
  );
}
