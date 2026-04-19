import { Link } from "wouter";

export default function Apps() {
  const apps = [
    {
      name: "ATHLYNX",
      tagline: "The Athlete's Playbook",
      icon: "",
      color: "from-yellow-500 to-orange-500",
      description: "The all-in-one platform for athletes. Profiles, recruiting, NIL, training, and more.",
      features: ["Athlete Profiles", "AI Coaching", "NIL Marketplace", "Recruiting", "Messaging"],
      ios: "#",
      android: "#",
      status: "Coming Soon",
    },
    {
      name: "Diamond Grind",
      tagline: "Elite Baseball Platform",
      icon: "",
      color: "from-blue-500 to-blue-700",
      description: "The #1 baseball app for rankings, recruiting, tournaments, and training.",
      features: ["Player Rankings", "Tournament Finder", "Video Analysis", "Recruiting Database"],
      ios: "#",
      android: "#",
      status: "Coming Soon",
    },
    {
      name: "Court Kings",
      tagline: "Basketball Dominance",
      icon: "",
      color: "from-orange-500 to-red-500",
      description: "Basketball recruiting, training, and exposure platform.",
      features: ["Hoops Rankings", "Camp Finder", "Highlight Reels", "College Connections"],
      ios: "#",
      android: "#",
      status: "Coming Soon",
    },
    {
      name: "Gridiron Nexus",
      tagline: "Football Excellence",
      icon: "",
      color: "from-green-600 to-green-800",
      description: "Football recruiting, film analysis, and combine prep.",
      features: ["Prospect Rankings", "Film Room", "Combine Training", "Recruiting Board"],
      ios: "#",
      android: "#",
      status: "Coming Soon",
    },
    {
      name: "Pitch Pulse",
      tagline: "Soccer Intelligence",
      icon: "",
      color: "from-emerald-500 to-teal-600",
      description: "Soccer recruiting, club connections, and international opportunities.",
      features: ["Club Finder", "International Scouts", "Training Programs", "Showcase Events"],
      ios: "#",
      android: "#",
      status: "Coming Soon",
    },
    {
      name: "Reel Masters",
      tagline: "Fishing Community",
      icon: "🎣",
      color: "from-cyan-500 to-blue-600",
      description: "Find fishing spots, log catches, and compete in tournaments.",
      features: ["Spot Finder", "Catch Log", "Tournaments", "Gear Reviews"],
      ios: "#",
      android: "#",
      status: "Coming Soon",
    },
    {
      name: "Fairway Elite",
      tagline: "Golf Excellence",
      icon: "⛳",
      color: "from-green-500 to-emerald-600",
      description: "Golf handicap tracking, course finder, and tournament play.",
      features: ["Handicap Tracker", "Course Finder", "Tee Times", "Tournament Entry"],
      ios: "#",
      android: "#",
      status: "Coming Soon",
    },
    {
      name: "Hunt Pro",
      tagline: "Hunting Community",
      icon: "🦌",
      color: "from-amber-600 to-orange-700",
      description: "Hunting spots, harvest tracking, and license management.",
      features: ["Land Finder", "Harvest Log", "License Manager", "Gear Marketplace"],
      ios: "#",
      android: "#",
      status: "Coming Soon",
    },
  ];

  const subscriptionTiers = [
    { name: "Free", price: "$0", features: ["Basic profile", "Limited features", "Ads supported"] },
    { name: "Pro", price: "$9.99/mo", features: ["Full profile", "AI credits", "No ads", "Priority support"] },
    { name: "Elite", price: "$29.99/mo", features: ["Everything in Pro", "Unlimited AI", "Scout access", "Premium features"] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl"></span>
            <span className="text-xl font-black text-white">ATHLYNX</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/home" className="text-gray-400 hover:text-white">Platform</Link>
            <Link href="/store" className="text-gray-400 hover:text-white">Store</Link>
            <Link href="/apps" className="text-cyan-400 font-semibold">Apps</Link>
            <Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link>
          </nav>
        </div>
      </header>

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="flex justify-center gap-3 mb-4">
              <span className="text-4xl"></span>
              <span className="text-4xl">🍎</span>
              <span className="text-4xl">🤖</span>
            </div>
            <span className="inline-block px-4 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-semibold mb-4">
              MOBILE APPS
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
              Download Our <span className="text-cyan-400">Apps</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The complete ATHLYNX ecosystem in your pocket. Available on iOS and Android.
            </p>
          </div>

          {/* App Store Badges */}
          <div className="flex justify-center gap-4 mb-12">
            <button className="flex items-center gap-3 bg-black border border-white/20 rounded-xl px-6 py-3 hover:bg-white/10 transition-all">
              <span className="text-3xl">🍎</span>
              <div className="text-left">
                <p className="text-gray-400 text-xs">Download on the</p>
                <p className="text-white font-semibold">App Store</p>
              </div>
            </button>
            <button className="flex items-center gap-3 bg-black border border-white/20 rounded-xl px-6 py-3 hover:bg-white/10 transition-all">
              <span className="text-3xl">▶️</span>
              <div className="text-left">
                <p className="text-gray-400 text-xs">Get it on</p>
                <p className="text-white font-semibold">Google Play</p>
              </div>
            </button>
          </div>

          {/* Apps Grid */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Our <span className="text-cyan-400">App Family</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {apps.map((app, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:border-cyan-500/50 transition-all"
                >
                  <div className={`h-24 bg-gradient-to-br ${app.color} flex items-center justify-center`}>
                    <span className="text-5xl">{app.icon}</span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-white font-bold">{app.name}</h3>
                      <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs font-semibold rounded">
                        {app.status}
                      </span>
                    </div>
                    <p className="text-cyan-400 text-xs mb-2">{app.tagline}</p>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">{app.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {app.features.slice(0, 3).map((feature, j) => (
                        <span key={j} className="px-2 py-0.5 bg-white/10 text-gray-400 text-xs rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-white/10 text-white rounded-lg text-xs font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-1">
                        <span>🍎</span> iOS
                      </button>
                      <button className="flex-1 py-2 bg-white/10 text-white rounded-lg text-xs font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-1">
                        <span>🤖</span> Android
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* In-App Subscriptions */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold mb-4">
                💳 POWERED BY STRIPE
              </span>
              <h2 className="text-2xl font-bold text-white mb-2">
                In-App <span className="text-green-400">Subscriptions</span>
              </h2>
              <p className="text-gray-400">Secure payments processed through Stripe</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {subscriptionTiers.map((tier, i) => (
                <div
                  key={i}
                  className={`bg-white/5 backdrop-blur-sm rounded-xl border p-6 text-center ${
                    tier.name === "Elite" ? "border-green-500" : "border-white/10"
                  }`}
                >
                  {tier.name === "Elite" && (
                    <span className="inline-block px-3 py-1 bg-green-500 text-black text-xs font-bold rounded-full mb-3">
                      BEST VALUE
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                  <p className="text-2xl font-black text-green-400 mb-4">{tier.price}</p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    {tier.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <span className="text-green-400"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 mb-10">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Why Download Our Apps?</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: "", title: "Native Experience", desc: "Optimized for iOS & Android" },
                { icon: "🔔", title: "Push Notifications", desc: "Never miss an opportunity" },
                { icon: "📴", title: "Offline Mode", desc: "Access key features offline" },
                { icon: "", title: "Secure Payments", desc: "Stripe-powered transactions" },
              ].map((feature, i) => (
                <div key={i} className="text-center">
                  <span className="text-4xl block mb-2">{feature.icon}</span>
                  <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                  <p className="text-gray-500 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notify Me */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Get Notified When We Launch </h3>
            <p className="text-white/80 mb-6">Be the first to download our mobile apps</p>
            <div className="flex justify-center gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-white"
              />
              <button className="px-6 py-3 bg-white text-cyan-600 font-bold rounded-xl hover:bg-gray-100 transition-all">
                Notify Me
              </button>
            </div>
          </div>

          {/* Back Link */}
          <div className="text-center mt-10">
            <Link href="/" className="text-cyan-400 hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
