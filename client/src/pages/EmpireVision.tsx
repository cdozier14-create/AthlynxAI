import { Link } from "wouter";
import { 
  Rocket, 
  TrendingUp, 
  Globe, 
  Building2, 
  Cpu, 
  Users, 
  DollarSign, 
  Heart,
  Dumbbell,
  Music,
  ShoppingBag,
  Shield,
  GraduationCap,
  Tv,
  Landmark,
  Home,
  ChevronRight,
  Zap,
  Target,
  Crown,
  Sparkles
} from "lucide-react";

export default function EmpireVision() {
  const empireBuilders = [
    {
      name: "Jeff Bezos",
      company: "Amazon",
      started: "Selling Books Online",
      became: "The Everything Store",
      marketCap: "$1.5 Trillion",
      lesson: "Start with one vertical, perfect it, then expand into everything.",
      color: "from-orange-500 to-yellow-500"
    },
    {
      name: "Ray Kroc",
      company: "McDonald's",
      started: "Selling Ice Cream Machines",
      became: "World's Largest Real Estate Company",
      marketCap: "$200 Billion",
      lesson: "The product is the entry point. The real business is the ecosystem.",
      color: "from-red-500 to-yellow-500"
    },
    {
      name: "Chad A. Dozier",
      company: "Dozier Holdings Group",
      started: "Athlete Platform (ATHLYNX)",
      became: "Complete Athlete Ecosystem Empire",
      marketCap: "Building...",
      lesson: "Athletes are the entry point. The empire serves their entire life.",
      color: "from-cyan-500 to-blue-600"
    }
  ];

  const verticals = [
    { icon: Users, name: "Athletes", desc: "Core Platform", status: "LIVE", color: "cyan", detail: "ATHLYNX - The Athlete's Playbook" },
    { icon: Dumbbell, name: "Training", desc: "Fitness & Performance", status: "LIVE", color: "green", detail: "AI-powered training programs" },
    { icon: Heart, name: "Medical", desc: "Healthcare & Orthopedics", status: "LIVE", color: "red", detail: "Sports medicine network" },
    { icon: ShoppingBag, name: "Commerce", desc: "Athlete Marketplace", status: "LIVE", color: "purple", detail: "Gear, merch, supplements" },
    { icon: Music, name: "Entertainment", desc: "Music & Media", status: "LIVE", color: "pink", detail: "Athlete playlists & content" },
    { icon: Shield, name: "Veterans", desc: "Military Services", status: "LIVE", color: "orange", detail: "Operation Warrior Pipeline" },
    { icon: Cpu, name: "AI", desc: "FuelBots & Intelligence", status: "LIVE", color: "blue", detail: "AI companions for athletes" },
    { icon: DollarSign, name: "NIL", desc: "Name, Image, Likeness", status: "LIVE", color: "yellow", detail: "NIL deals & management" },
    { icon: GraduationCap, name: "Education", desc: "Athlete Academy", status: "2026", color: "indigo", detail: "Online courses & certifications" },
    { icon: Tv, name: "Broadcasting", desc: "ATHLYNX TV", status: "2026", color: "rose", detail: "Live sports & athlete content" },
    { icon: Landmark, name: "Financial", desc: "Athlete Banking", status: "2026", color: "emerald", detail: "NIL banking, loans, investments" },
    { icon: Home, name: "Real Estate", desc: "Athlete Housing", status: "2027", color: "amber", detail: "Housing for athletes & families" },
  ];

  const aiCapabilities = [
    { name: "FuelBots", desc: "AI Companions that guide athletes through every aspect of their journey", icon: "🤖" },
    { name: "AI Training Bot", desc: "Personalized workout plans, form analysis, and performance optimization", icon: "" },
    { name: "Recruiting Intelligence", desc: "AI-powered matching between athletes and programs", icon: "" },
    { name: "NIL Valuation", desc: "Real-time athlete market value calculation and deal recommendations", icon: "" },
    { name: "Content Generation", desc: "AI-created highlight reels, social posts, and media kits", icon: "🎬" },
    { name: "Analytics Engine", desc: "Deep performance insights and predictive analytics", icon: "" },
  ];

  const timeline = [
    { year: "2024", event: "ATHLYNX Platform Launch", desc: "The Athlete's Playbook goes live" },
    { year: "2025", event: "Diamond Grind & Sport Verticals", desc: "Baseball-first, then all sports" },
    { year: "2026", event: "AI Ecosystem & FuelBots", desc: "Full AI integration across platform" },
    { year: "2027", event: "Financial Services Launch", desc: "Athlete banking and investment" },
    { year: "2028", event: "Broadcasting Network", desc: "ATHLYNX TV and media empire" },
    { year: "2029", event: "Global Expansion", desc: "International markets and partnerships" },
    { year: "2030", event: "IPO / Major Exit", desc: "Public offering or strategic acquisition" },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0d1f3c 50%, #061424 100%)' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDIxNywyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" />
        
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="container relative py-16 px-5">
          <Link href="/dhg">
            <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-cyan-500/30 rounded-full px-4 py-2 mb-8 cursor-pointer hover:bg-slate-800/80 transition-colors">
              <span className="text-white/60 text-sm">← Back to DHG</span>
            </div>
          </Link>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
              <Crown className="w-4 h-4 text-yellow-400" />
              <span className="text-cyan-400 text-sm font-bold">THE EMPIRE VISION</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
              BUILDING AN
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400">
                EMPIRE
              </span>
            </h1>
            
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Bezos started with books. Ray Kroc sold ice cream machines. 
              <strong className="text-cyan-400"> We're starting with athletes.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Empire Builders Comparison */}
      <section className="container px-5 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          <Sparkles className="inline w-8 h-8 text-yellow-400 mr-2" />
          Learning From The Legends
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {empireBuilders.map((builder, i) => (
            <div
              key={i}
              className={`relative bg-slate-900/80 border ${i === 2 ? 'border-cyan-500 ring-2 ring-cyan-500/30' : 'border-white/10'} rounded-2xl p-6 overflow-hidden`}
            >
              {i === 2 && (
                <div className="absolute top-0 right-0 bg-cyan-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                  OUR PATH
                </div>
              )}
              
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${builder.color} flex items-center justify-center text-2xl font-black text-white mb-4`}>
                {builder.name.charAt(0)}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-1">{builder.name}</h3>
              <p className="text-cyan-400 font-semibold mb-4">{builder.company}</p>
              
              <div className="space-y-3 mb-4">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white/50 text-xs uppercase">Started With</p>
                  <p className="text-white font-semibold">{builder.started}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white/50 text-xs uppercase">Built Into</p>
                  <p className="text-white font-semibold">{builder.became}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white/50 text-xs uppercase">Market Cap</p>
                  <p className={`font-bold ${i === 2 ? 'text-cyan-400' : 'text-green-400'}`}>{builder.marketCap}</p>
                </div>
              </div>
              
              <div className="border-t border-white/10 pt-4">
                <p className="text-white/70 text-sm italic">"{builder.lesson}"</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The DHG Ecosystem */}
      <section className="container px-5 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            <Globe className="inline w-8 h-8 text-cyan-400 mr-2" />
            The Complete Ecosystem
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Like Amazon expanded from books to everything, we're expanding from athletes to serve their entire life journey.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {verticals.map((vertical, i) => (
            <div
              key={i}
              className={`bg-slate-900/80 border border-white/10 rounded-xl p-5 hover:border-${vertical.color}-500/50 transition-all group`}
            >
              <div className="flex items-center justify-between mb-3">
                <vertical.icon className={`w-8 h-8 text-${vertical.color}-400`} />
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  vertical.status === 'LIVE' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {vertical.status}
                </span>
              </div>
              <h3 className="text-white font-bold mb-1">{vertical.name}</h3>
              <p className="text-white/50 text-sm mb-2">{vertical.desc}</p>
              <p className="text-cyan-400 text-xs">{vertical.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Ecosystem */}
      <section className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 py-16">
        <div className="container px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              <Cpu className="inline w-8 h-8 text-cyan-400 mr-2" />
              AI-Powered Everything
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Manus AI capabilities integrated throughout the entire ecosystem, making us the most intelligent athlete platform ever built.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiCapabilities.map((ai, i) => (
              <div
                key={i}
                className="bg-slate-900/80 border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-500 transition-all"
              >
                <span className="text-4xl block mb-4">{ai.icon}</span>
                <h3 className="text-xl font-bold text-white mb-2">{ai.name}</h3>
                <p className="text-white/60">{ai.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/fuel-bots">
              <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl transition-colors inline-flex items-center gap-2">
                Explore FuelBots AI <ChevronRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Media Empire */}
      <section className="container px-5 py-16">
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                🌐 The Social Media Empire
              </h2>
              <p className="text-white/70 mb-6">
                ATHLYNX isn't just an app—it's the <strong className="text-purple-400">athlete social network</strong>. 
                Like Facebook connected the world, we're connecting every athlete, coach, brand, and fan.
              </p>
              <ul className="space-y-3">
                {[
                  "Athlete profiles with verified stats",
                  "NIL Messenger for secure communication",
                  "Content creation & highlight tools",
                  "Brand partnership marketplace",
                  "Viral content engine",
                  "Influencer analytics dashboard"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-white/80">
                    <Zap className="w-4 h-4 text-purple-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <p className="text-4xl font-black text-purple-400">10M+</p>
                <p className="text-white/60 text-sm">Target Athletes</p>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <p className="text-4xl font-black text-pink-400">$50B</p>
                <p className="text-white/60 text-sm">NIL Market</p>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <p className="text-4xl font-black text-cyan-400">15+</p>
                <p className="text-white/60 text-sm">Sports Covered</p>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <p className="text-4xl font-black text-yellow-400">∞</p>
                <p className="text-white/60 text-sm">Possibilities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container px-5 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          <TrendingUp className="inline w-8 h-8 text-cyan-400 mr-2" />
          The Roadmap to Empire
        </h2>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500 to-blue-600 hidden md:block" />
          
          <div className="space-y-8">
            {timeline.map((item, i) => (
              <div
                key={i}
                className={`flex flex-col md:flex-row items-center gap-4 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className={`bg-slate-900/80 border border-white/10 rounded-xl p-5 inline-block ${i === 0 ? 'border-cyan-500 ring-2 ring-cyan-500/30' : ''}`}>
                    <span className="text-cyan-400 font-bold">{item.year}</span>
                    <h3 className="text-white font-bold text-lg">{item.event}</h3>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-cyan-500 rounded-full border-4 border-slate-900 z-10 hidden md:block" />
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container px-5 py-16">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Be Part of the Empire
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join us as we build the most comprehensive athlete ecosystem ever created. 
            Invest, partner, or join the team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/investor-deck">
              <button className="bg-white text-blue-600 font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors">
                View Investor Deck
              </button>
            </Link>
            <Link href="/partner-portal">
              <button className="bg-white/20 text-white font-bold px-8 py-3 rounded-xl hover:bg-white/30 transition-colors border border-white/30">
                Become a Partner
              </button>
            </Link>
            <Link href="/careers">
              <button className="bg-white/20 text-white font-bold px-8 py-3 rounded-xl hover:bg-white/30 transition-colors border border-white/30">
                Join the Team
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container px-5 text-center">
          <p className="text-white/50 text-sm">© 2025 Dozier Holdings Group, LLC. Building the Future of Athlete Success.</p>
        </div>
      </footer>
    </div>
  );
}
