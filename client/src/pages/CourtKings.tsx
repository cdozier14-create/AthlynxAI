import { useState } from "react";
import { Link } from "wouter";

const stats = [
  { icon: "🏀", value: "850K+", label: "Players" },
  { icon: "🏆", value: "8,000+", label: "Tournaments" },
  { icon: "🎓", value: "1,100+", label: "College Programs" },
  { icon: "💰", value: "$890M+", label: "NIL Deals" },
];

const features = [
  { icon: "🏆", title: "AAU Tournaments", desc: "Find and register for AAU tournaments nationwide. Compete against the best, get seen by the most scouts." },
  { icon: "⭐", title: "Elite Showcases", desc: "Nike, Adidas, Under Armour showcases — the stages where legends are made. We get you there." },
  { icon: "🏕️", title: "Camps", desc: "Elite skill development camps run by college coaches and NBA trainers. Level up your game fast." },
  { icon: "📊", title: "Rankings", desc: "National, regional, and state rankings updated weekly. See where you rank among the best." },
  { icon: "📅", title: "Recruiting Calendar", desc: "Never miss a live period. Track every recruiting event, campus visit, and contact window." },
  { icon: "🤝", title: "NIL Marketplace", desc: "Connect with brands, sign deals, and monetize your game. Your name is worth money — collect it." },
];

export default function CourtKings() {
  const [activeTab, setActiveTab] = useState<"overview" | "tournaments" | "rankings" | "nil">("overview");

  return (
    <div className="min-h-screen bg-[#0d0020]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0d0020]/95 backdrop-blur border-b border-purple-900/30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-400 hover:text-white text-sm">← ATHLYNX</Link>
            <span className="text-gray-600">|</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏀</span>
              <div>
                <div className="text-xs text-purple-400 font-bold tracking-widest">COURT KINGS</div>
                <div className="text-xs text-orange-400 tracking-wider">POWERED BY ATHLYNX</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/signin" className="text-sm text-gray-300 hover:text-white">Log In</Link>
            <Link href="/signin" className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
              Sign Up Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-[#0d0020] to-orange-950/30 opacity-70" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-900/40 border border-purple-700/50 rounded-full px-4 py-1.5 mb-6">
            <span className="text-purple-400 text-xs font-bold tracking-widest">COURT KINGS</span>
            <span className="bg-orange-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">POWERED BY ATHLYNX</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-white mb-4 leading-none">
            DOMINATE<br />
            <span className="text-orange-400">THE COURT</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            AAU Tournaments. Elite Showcases. Camps. Rankings. Recruiting Calendar. The complete basketball platform for hoopers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signin" className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all hover:scale-105">
              🏆 Find Tournaments
            </Link>
            <button className="flex items-center justify-center gap-2 border border-orange-500 text-orange-400 hover:bg-orange-500/10 font-bold text-lg px-8 py-4 rounded-xl transition-all">
              📈 View Rankings
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 px-4 border-y border-purple-900/30 bg-black/30">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl mb-1">{s.icon}</div>
              <div className="text-3xl font-black text-purple-400">{s.value}</div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tabs */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {(["overview", "tournaments", "rankings", "nil"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg font-bold text-sm capitalize whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? "bg-purple-600 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                {tab === "nil" ? "NIL Deals" : tab}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f) => (
                <div key={f.title} className="bg-white/5 border border-purple-900/30 rounded-xl p-5 hover:border-purple-600/50 transition-all">
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
                { name: "Nike EYBL Peach Jam", date: "July 8, 2026", location: "North Augusta, SC", circuit: "Nike EYBL", teams: 64 },
                { name: "Adidas 3SSB Championship", date: "July 15, 2026", location: "Las Vegas, NV", circuit: "Adidas 3SSB", teams: 48 },
                { name: "Under Armour Association Finals", date: "July 22, 2026", location: "Atlanta, GA", circuit: "UA Association", teams: 32 },
                { name: "AAU Super Showcase", date: "July 28, 2026", location: "Orlando, FL", circuit: "AAU", teams: 256 },
                { name: "Pangos All-American Camp", date: "June 5, 2026", location: "Las Vegas, NV", circuit: "Invite Only", teams: 0 },
              ].map((t) => (
                <div key={t.name} className="bg-white/5 border border-purple-900/30 rounded-xl p-5 flex items-center justify-between hover:border-purple-600/50 transition-all">
                  <div>
                    <div className="text-white font-bold">{t.name}</div>
                    <div className="text-gray-400 text-sm">{t.date} · {t.location}</div>
                    <span className="text-xs bg-purple-900/40 text-purple-400 px-2 py-0.5 rounded-full mt-1 inline-block">{t.circuit}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-orange-400 font-bold">{t.teams > 0 ? `${t.teams} teams` : "Invite Only"}</div>
                    <button className="mt-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-colors">
                      {t.teams > 0 ? "Register" : "Apply"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "rankings" && (
            <div className="space-y-3">
              {[
                { rank: 1, name: "Isaiah Thompson", pos: "PG", school: "Montverde Academy", state: "FL", class: "2027", stars: 5 },
                { rank: 2, name: "Jaylen Carter", pos: "SF", school: "Sierra Canyon", state: "CA", class: "2027", stars: 5 },
                { rank: 3, name: "Marcus Webb", pos: "C", school: "IMG Academy", state: "FL", class: "2026", stars: 5 },
                { rank: 4, name: "Zion Mitchell", pos: "SG", school: "Oak Hill Academy", state: "VA", class: "2027", stars: 4 },
                { rank: 5, name: "Darius King", pos: "PF", school: "La Lumiere", state: "IN", class: "2026", stars: 4 },
              ].map((player) => (
                <div key={player.rank} className="bg-white/5 border border-purple-900/30 rounded-xl p-4 flex items-center gap-4 hover:border-orange-500/30 transition-all">
                  <div className="text-2xl font-black text-orange-400 w-8">#{player.rank}</div>
                  <div className="flex-1">
                    <div className="text-white font-bold">{player.name}</div>
                    <div className="text-gray-400 text-sm">{player.school} · {player.state} · Class of {player.class}</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-900/40 text-purple-400 text-xs font-bold px-2 py-0.5 rounded">{player.pos}</div>
                    <div className="text-orange-400 text-sm mt-1">{"⭐".repeat(player.stars)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "nil" && (
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { brand: "Nike", type: "Signature Shoe Deal", value: "$500K+", status: "Open", sport: "Basketball" },
                { brand: "Gatorade", type: "Social Media Ambassador", value: "$25K", status: "Open", sport: "All Sports" },
                { brand: "Under Armour", type: "Equipment Sponsorship", value: "$15K", status: "Open", sport: "Basketball" },
                { brand: "2K Sports", type: "Gaming Ambassador", value: "$10K", status: "Open", sport: "Basketball" },
              ].map((deal) => (
                <div key={deal.brand} className="bg-white/5 border border-purple-900/30 rounded-xl p-5 hover:border-orange-500/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-white font-bold text-lg">{deal.brand}</div>
                      <div className="text-gray-400 text-sm">{deal.type}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold">{deal.value}</div>
                      <span className="text-xs bg-green-900/40 text-green-400 px-2 py-0.5 rounded">{deal.status}</span>
                    </div>
                  </div>
                  <button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 rounded-lg text-sm transition-colors">
                    Apply for Deal
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-900/40 to-orange-900/20 border-t border-purple-900/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">Ready to Dominate the Court?</h2>
          <p className="text-gray-300 mb-8">Join 850K+ hoopers on Court Kings. Your next level is one tournament away.</p>
          <Link href="/signin" className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-black text-xl px-10 py-5 rounded-xl transition-all hover:scale-105">
            🏀 Start Free — 7 Days on Us
          </Link>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-purple-900/30 text-center">
        <p className="text-gray-600 text-sm">Court Kings · Powered by ATHLYNX · A Dozier Holdings Group Company</p>
        <Link href="/" className="text-purple-400 text-sm hover:text-purple-300 mt-2 inline-block">← Back to ATHLYNX Platform</Link>
      </footer>
    </div>
  );
}
