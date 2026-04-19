import { useState } from "react";
import { Link } from "wouter";

const stats = [
  { icon: "🎣", value: "420K+", label: "Anglers" },
  { icon: "🏆", value: "5,200+", label: "Tournaments" },
  { icon: "📍", value: "12,000+", label: "Fishing Spots" },
  { icon: "🤖", value: "24/7", label: "AI Fishing Guide" },
];

const features = [
  { icon: "🏆", title: "Tournaments", desc: "Bass, saltwater, fly fishing — find and register for tournaments at every level. From local ponds to national stages." },
  { icon: "📊", title: "Pro Rankings", desc: "Track your tournament performance. Earn points. Climb the national rankings. Get sponsored." },
  { icon: "📍", title: "Fishing Spots", desc: "Community-sourced fishing spots with real-time conditions, species reports, and GPS coordinates." },
  { icon: "🛒", title: "Gear Marketplace", desc: "Shop rods, reels, lures, and tackle from top brands. Exclusive deals for Reel Masters members." },
  { icon: "🤖", title: "AI Fishing Guide", desc: "Ask LYNX anything — best lures for current conditions, technique tips, species identification, weather analysis." },
  { icon: "📹", title: "Catch & Share", desc: "Post your catches, share your spots (selectively), build your angler profile. Go viral in the fishing community." },
];

export default function ReelMasters() {
  const [activeTab, setActiveTab] = useState<"overview" | "tournaments" | "spots" | "gear">("overview");

  return (
    <div className="min-h-screen bg-[#001520]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#001520]/95 backdrop-blur border-b border-cyan-900/30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-400 hover:text-white text-sm">← ATHLYNX</Link>
            <span className="text-gray-600">|</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎣</span>
              <div>
                <div className="text-xs text-cyan-400 font-bold tracking-widest">REEL MASTERS</div>
                <div className="text-xs text-white/60 tracking-wider">POWERED BY ATHLYNX</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/signin" className="text-sm text-gray-300 hover:text-white">Log In</Link>
            <Link href="/signin" className="bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
              Join Tournament
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950 via-[#001520] to-blue-950 opacity-70" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-900/40 border border-cyan-700/50 rounded-full px-4 py-1.5 mb-6">
            <span className="text-2xl">🎣</span>
            <span className="text-cyan-400 text-xs font-bold tracking-widest">REEL MASTERS</span>
            <span className="bg-white/10 text-white/70 text-xs px-2 py-0.5 rounded-full">POWERED BY ATHLYNX</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-none">
            THE ULTIMATE<br />
            <span className="text-cyan-400">FISHING</span><br />
            <span className="text-blue-400">PLATFORM</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Tournaments. Pro Rankings. Fishing Spots. Gear Marketplace. AI Fishing Guide. Everything an angler needs in one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signin" className="flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all hover:scale-105">
              🏆 Join Tournament
            </Link>
            <button className="flex items-center justify-center gap-2 border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-bold text-lg px-8 py-4 rounded-xl transition-all">
              📍 Find Fishing Spots
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 px-4 border-y border-cyan-900/30 bg-black/30">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl mb-1">{s.icon}</div>
              <div className="text-3xl font-black text-cyan-400">{s.value}</div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tabs */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {(["overview", "tournaments", "spots", "gear"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg font-bold text-sm capitalize whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? "bg-cyan-600 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                {tab === "spots" ? "Fishing Spots" : tab}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f) => (
                <div key={f.title} className="bg-white/5 border border-cyan-900/30 rounded-xl p-5 hover:border-cyan-600/50 transition-all">
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
                { name: "Bassmaster Classic", date: "March 20, 2027", location: "Lake Hartwell, SC", type: "Bass", prize: "$300,000" },
                { name: "FLW Tour Championship", date: "August 10, 2026", location: "Lake Champlain, NY", type: "Bass", prize: "$125,000" },
                { name: "Redfish Cup", date: "September 5, 2026", location: "Corpus Christi, TX", type: "Saltwater", prize: "$50,000" },
                { name: "Trout Unlimited National", date: "June 15, 2026", location: "Bozeman, MT", type: "Fly Fishing", prize: "$25,000" },
              ].map((t) => (
                <div key={t.name} className="bg-white/5 border border-cyan-900/30 rounded-xl p-5 flex items-center justify-between hover:border-cyan-600/50 transition-all">
                  <div>
                    <div className="text-white font-bold">{t.name}</div>
                    <div className="text-gray-400 text-sm">{t.date} · {t.location}</div>
                    <span className="text-xs bg-cyan-900/40 text-cyan-400 px-2 py-0.5 rounded-full mt-1 inline-block">{t.type}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold">{t.prize}</div>
                    <button className="mt-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-colors">
                      Register
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "spots" && (
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { name: "Lake Fork", state: "TX", species: ["Largemouth Bass", "Crappie"], rating: 4.9, reports: 1240 },
                { name: "Lake Okeechobee", state: "FL", species: ["Bass", "Bluegill", "Catfish"], rating: 4.7, reports: 890 },
                { name: "Lake Erie", state: "OH/PA", species: ["Walleye", "Perch", "Steelhead"], rating: 4.8, reports: 2100 },
                { name: "Kenai River", state: "AK", species: ["King Salmon", "Sockeye", "Rainbow Trout"], rating: 5.0, reports: 450 },
              ].map((spot) => (
                <div key={spot.name} className="bg-white/5 border border-cyan-900/30 rounded-xl p-5 hover:border-cyan-600/50 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-white font-bold text-lg">{spot.name}</div>
                      <div className="text-gray-400 text-sm">{spot.state}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-400 font-bold">⭐ {spot.rating}</div>
                      <div className="text-gray-500 text-xs">{spot.reports} reports</div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {spot.species.map((s) => (
                      <span key={s} className="bg-cyan-900/40 text-cyan-400 text-xs px-2 py-0.5 rounded">{s}</span>
                    ))}
                  </div>
                  <button className="mt-4 w-full border border-cyan-600 text-cyan-400 hover:bg-cyan-600/20 font-bold py-2 rounded-lg text-sm transition-colors">
                    View Spot Details
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "gear" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { name: "Shimano Stradic FL", type: "Spinning Reel", price: "$249", brand: "Shimano", rating: 4.8 },
                { name: "Abu Garcia Revo Beast", type: "Baitcasting Reel", price: "$199", brand: "Abu Garcia", rating: 4.7 },
                { name: "St. Croix Mojo Bass", type: "Casting Rod", price: "$129", brand: "St. Croix", rating: 4.9 },
                { name: "Rapala Original Floater", type: "Lure", price: "$8", brand: "Rapala", rating: 4.9 },
                { name: "Berkley PowerBait", type: "Soft Bait", price: "$6", brand: "Berkley", rating: 4.6 },
                { name: "Plano 3700 Tackle Box", type: "Storage", price: "$24", brand: "Plano", rating: 4.8 },
              ].map((item) => (
                <div key={item.name} className="bg-white/5 border border-cyan-900/30 rounded-xl p-4 hover:border-cyan-600/50 transition-all">
                  <div className="text-xs text-cyan-400 font-bold mb-1">{item.brand}</div>
                  <div className="text-white font-bold mb-1">{item.name}</div>
                  <div className="text-gray-400 text-xs mb-3">{item.type}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-green-400 font-bold">{item.price}</div>
                    <div className="text-yellow-400 text-xs">⭐ {item.rating}</div>
                  </div>
                  <button className="mt-3 w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-1.5 rounded-lg text-sm transition-colors">
                    Shop Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-cyan-900/40 to-blue-900/20 border-t border-cyan-900/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">The Water's Calling</h2>
          <p className="text-gray-300 mb-8">Join 420K+ anglers on Reel Masters. Find tournaments, discover spots, dominate the water.</p>
          <Link href="/signin" className="inline-block bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xl px-10 py-5 rounded-xl transition-all hover:scale-105">
            🎣 Start Free — 7 Days on Us
          </Link>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-cyan-900/30 text-center">
        <p className="text-gray-600 text-sm">Reel Masters · Powered by ATHLYNX · A Dozier Holdings Group Company</p>
        <Link href="/" className="text-cyan-400 text-sm hover:text-cyan-300 mt-2 inline-block">← Back to ATHLYNX Platform</Link>
      </footer>
    </div>
  );
}
