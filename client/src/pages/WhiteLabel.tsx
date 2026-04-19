import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function WhiteLabel() {
  const sportApps = [
    {
      id: "diamond-grind",
      name: "Diamond Grind",
      sport: "Baseball",
      icon: "",
      color: "from-blue-500 to-cyan-500",
      description: "The #1 baseball recruiting and training platform",
      features: ["Player Rankings", "Scout Network", "Tournament Registration", "AI Baseball Coach"],
      url: "/diamond-grind",
      status: "live"
    },
    {
      id: "court-kings",
      name: "Court Kings",
      sport: "Basketball", 
      icon: "",
      color: "from-orange-500 to-red-500",
      description: "Elite basketball recruiting and development platform",
      features: ["Player Rankings", "AAU Tournaments", "Showcase Events", "AI Basketball Coach"],
      url: "/court-kings",
      status: "coming-soon"
    },
    {
      id: "gridiron-nexus",
      name: "Gridiron Nexus",
      sport: "Football",
      icon: "",
      color: "from-green-500 to-emerald-500",
      description: "Complete football recruiting and training ecosystem",
      features: ["Position Rankings", "Combine Results", "Film Analysis", "AI Football Coach"],
      url: "/gridiron-nexus",
      status: "coming-soon"
    },
    {
      id: "pitch-pulse",
      name: "Pitch Pulse",
      sport: "Soccer",
      icon: "",
      color: "from-purple-500 to-pink-500",
      description: "Global soccer recruiting and development platform",
      features: ["Player Profiles", "Club Connections", "International Scouts", "AI Soccer Coach"],
      url: "/pitch-pulse",
      status: "coming-soon"
    },
    {
      id: "reel-masters",
      name: "Reel Masters",
      sport: "Fishing",
      icon: "🎣",
      color: "from-cyan-500 to-blue-500",
      description: "Competitive fishing tournament and sponsorship platform",
      features: ["Tournament Finder", "Catch Logging", "Sponsor Matching", "AI Fishing Guide"],
      url: "/reel-masters",
      status: "coming-soon"
    },
    {
      id: "fairway-elite",
      name: "Fairway Elite",
      sport: "Golf",
      icon: "⛳",
      color: "from-green-600 to-teal-500",
      description: "Premium golf recruiting and performance platform",
      features: ["Handicap Tracking", "Tournament Results", "College Golf Recruiting", "AI Golf Coach"],
      url: "/fairway-elite",
      status: "coming-soon"
    },
    {
      id: "hunt-pro",
      name: "Hunt Pro",
      sport: "Hunting",
      icon: "🦌",
      color: "from-amber-700 to-orange-600",
      description: "Professional hunting network and sponsorship platform",
      features: ["Harvest Logging", "Sponsor Connections", "License Tracking", "AI Hunting Guide"],
      url: "/hunt-pro",
      status: "coming-soon"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#1a1a2e] to-[#0A1628]">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-2xl"></span>
            <span className="text-xl font-black text-white">ATHLYNX</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-gray-400 hover:text-white text-sm">Home</Link>
            <Link href="/pricing" className="text-gray-400 hover:text-white text-sm">Pricing</Link>
            <Link href="/white-label" className="text-cyan-400 font-semibold text-sm">White-Label</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container text-center">
          <span className="inline-block px-4 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-semibold mb-4">
            🏷️ WHITE-LABEL PLATFORMS
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            Sport-Specific <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Platforms</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Same powerful ATHLYNX infrastructure, customized branding for each sport. 
            One backend, unlimited possibilities.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>Live</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span>Coming Soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sport Apps Grid */}
      <section className="container pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sportApps.map((app) => (
            <Card key={app.id} className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-cyan-500/50 transition-all group">
              <CardContent className="p-6">
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                    {app.icon}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    app.status === "live" 
                      ? "bg-green-500/20 text-green-400" 
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {app.status === "live" ? "LIVE" : "COMING SOON"}
                  </span>
                </div>

                {/* App Info */}
                <h3 className="text-2xl font-bold text-white mb-1">{app.name}</h3>
                <p className="text-cyan-400 text-sm font-semibold mb-3">{app.sport}</p>
                <p className="text-gray-400 text-sm mb-4">{app.description}</p>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {app.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="text-cyan-400"></span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                {app.status === "live" ? (
                  <Link href={app.url}>
                    <button className={`w-full py-3 bg-gradient-to-r ${app.color} text-white font-bold rounded-xl hover:opacity-90 transition-all`}>
                      Visit Platform →
                    </button>
                  </Link>
                ) : (
                  <button disabled className="w-full py-3 bg-white/5 text-gray-500 font-bold rounded-xl cursor-not-allowed">
                    Coming Soon
                  </button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container pb-20">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            How White-Label Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🏗️",
                title: "Same Infrastructure",
                desc: "All platforms run on the same ATHLYNX backend - one codebase, one database, one admin panel"
              },
              {
                icon: "🎨",
                title: "Custom Branding",
                desc: "Each sport gets its own name, logo, colors, and sport-specific features while sharing core functionality"
              },
              {
                icon: "",
                title: "Shared Revenue",
                desc: "All subscriptions, AI credits, and transactions flow through the same payment system"
              }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Want Your Sport Added?
        </h2>
        <p className="text-gray-400 mb-6">
          We're constantly expanding to new sports. Contact us to discuss adding your sport to the ATHLYNX ecosystem.
        </p>
        <Link href="/">
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:opacity-90 transition-all">
            Contact Us
          </button>
        </Link>
      </section>
    </div>
  );
}
