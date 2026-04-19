import { Link } from "wouter";
import { useState } from "react";
import { 
  Building2, Trophy, Users, Globe, TrendingUp, Shield, 
  Briefcase, Heart, Home, Zap, ChevronRight, Play,
  Star, Award, Target, Crown, Rocket
} from "lucide-react";

export default function DHGHome() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { label: "COMPANIES", value: "12", icon: Building2 },
    { label: "GLOBAL REACH", value: "5+", suffix: "Countries", icon: Globe },
    { label: "ATHLETES SERVED", value: "10K+", icon: Users },
    { label: "NIL DEALS", value: "$50M+", icon: TrendingUp },
  ];

  const subsidiaries = [
    { 
      name: "ATHLYNX AI Corporation", 
      description: "The Athlete's Playbook - NIL Platform",
      status: "FLAGSHIP",
      color: "from-cyan-500 to-blue-600",
      link: "/"
    },
    { 
      name: "VC Technologies, LLC", 
      description: "Enterprise Software & AI Solutions",
      status: "ACTIVE",
      color: "from-purple-500 to-indigo-600",
      link: "/vc-tech"
    },
    { 
      name: "VC Data Centers, LLC", 
      description: "NVIDIA H200/H100 GPU Infrastructure",
      status: "EXPANDING",
      color: "from-green-500 to-emerald-600",
      link: "/data-centers"
    },
    { 
      name: "The VIRT, LLC", 
      description: "Cryptocurrency & Blockchain",
      status: "ACTIVE",
      color: "from-orange-500 to-amber-600",
      link: "/virt"
    },
    { 
      name: "VC Energy, LLC", 
      description: "Renewable Energy & Sustainability",
      status: "ACTIVE",
      color: "from-yellow-500 to-orange-500",
      link: "/energy"
    },
    { 
      name: "Uma Real Estate Investment, LLC", 
      description: "Commercial & Residential Properties",
      status: "ACTIVE",
      color: "from-rose-500 to-pink-600",
      link: "/real-estate"
    },
    { 
      name: "Villa Agape, LLC", 
      description: "Healthcare & Assisted Living",
      status: "ACTIVE",
      color: "from-red-500 to-rose-600",
      link: "/villa-agape"
    },
    { 
      name: "Compassionate Care, LLC", 
      description: "Home Healthcare Services",
      status: "ACTIVE",
      color: "from-pink-500 to-fuchsia-600",
      link: "/compassionate-care"
    },
    { 
      name: "Pisces Resort, LLC", 
      description: "Luxury Hospitality & Entertainment",
      status: "DEVELOPMENT",
      color: "from-blue-500 to-cyan-600",
      link: "/pisces-resort"
    },
    { 
      name: "Venus Venue & Vineyard, LLC", 
      description: "Events, Wine & Agriculture",
      status: "DEVELOPMENT",
      color: "from-violet-500 to-purple-600",
      link: "/venus-venue"
    },
    { 
      name: "Pomodoro Restaurant, LLC", 
      description: "Fine Dining & Culinary Excellence",
      status: "DEVELOPMENT",
      color: "from-red-600 to-orange-500",
      link: "/pomodoro"
    },
    { 
      name: "DHG Ventures", 
      description: "Venture Capital & Investments",
      status: "ACTIVE",
      color: "from-slate-600 to-gray-700",
      link: "/ventures"
    },
  ];

  const partners = [
    { name: "Nebius AI", role: "Cloud Infrastructure" },
    { name: "Manus AI", role: "AI Development" },
    { name: "NVIDIA", role: "H200/H100 GPUs" },
    { name: "ICC-USA", role: "Sports Compliance" },
    { name: "Stripe", role: "Payments" },
    { name: "Twilio", role: "Communications" },
  ];

  const leadership = [
    { name: "Chad A. Dozier Sr.", role: "Founder & CEO", image: "/family/chad-portrait.jpg" },
    { name: "Glenn Tse", role: "Partner", image: null },
    { name: "Jimmy Boyd", role: "Partner", image: null },
    { name: "Andrew Kustes", role: "Partner", image: null },
    { name: "Lee Marshall", role: "Partner", image: null },
    { name: "David Ford", role: "Legal Advisor", image: null },
    { name: "Nicki Leggett", role: "Board Advisor", image: null },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Stats Bar - Like Perfect Game */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white py-2 px-4">
        <div className="container mx-auto flex items-center justify-center gap-8 text-xs md:text-sm font-semibold tracking-wide">
          <span className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-cyan-400" />
            12 COMPANIES
          </span>
          <span className="hidden md:inline text-gray-500">|</span>
          <span className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            GLOBAL REACH
          </span>
          <span className="hidden md:inline text-gray-500">|</span>
          <span className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            $168M+ CAPITAL TARGET
          </span>
          <span className="hidden md:inline text-gray-500">|</span>
          <span className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-400" />
            BUILDING EMPIRES
          </span>
        </div>
      </div>

      {/* Navigation - Like Perfect Game/Hudl */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <img 
                src="/logos/dhg-crab-logo.png" 
                alt="DHG Crab Shield" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">DOZIER HOLDINGS GROUP</h1>
                <p className="text-xs text-blue-600 font-semibold">THE EMPIRE BUILDER</p>
              </div>
            </div>

            {/* Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {["OVERVIEW", "COMPANIES", "ATHLYNX", "INVESTORS", "LEADERSHIP", "PARTNERS", "CONTACT"].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveTab(item.toLowerCase())}
                  className={`px-4 py-2 text-sm font-bold transition-colors ${
                    activeTab === item.toLowerCase()
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <Link href="/">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all">
                  ATHLYNX
                </button>
              </Link>
              <button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all">
                INVEST
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 py-20 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Crown className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-semibold">THE CANCER CRAB EMPIRE</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                DOZIER<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  HOLDINGS GROUP
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
                Building dynasties and empires through innovation, technology, and unwavering determination.
                <span className="text-cyan-400 font-semibold"> Dreams Do Come True.</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/">
                  <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/30">
                    <Rocket className="w-5 h-5" />
                    EXPLORE ATHLYNX
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </Link>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition-all border border-white/20">
                  <Play className="w-5 h-5" />
                  WATCH VIDEO
                </button>
              </div>
            </div>

            {/* Right - Crab Shield Logo */}
            <div className="flex-1 flex justify-center">
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-cyan-500/30 blur-3xl rounded-full scale-75" />
                
                {/* Logo */}
                <img 
                  src="/logos/dhg-crab-logo.png" 
                  alt="DHG Crab Shield - The King" 
                  className="relative w-80 h-80 md:w-96 md:h-96 object-contain drop-shadow-2xl"
                />
                
                {/* Badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-900 px-6 py-2 rounded-full font-black text-sm shadow-lg">
                  THE KING
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <div className="text-4xl md:text-5xl font-black text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm font-bold text-gray-500 tracking-wide">{stat.label}</div>
                {stat.suffix && <div className="text-xs text-gray-400">{stat.suffix}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subsidiaries Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-slate-900 mb-4">THE EMPIRE</h2>
            <p className="text-xl text-gray-600">12 Companies • Global Reach • Infinite Potential</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {subsidiaries.map((company, index) => (
              <Link key={index} href={company.link}>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 cursor-pointer group">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${company.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{company.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      company.status === "FLAGSHIP" ? "bg-cyan-100 text-cyan-700" :
                      company.status === "EXPANDING" ? "bg-green-100 text-green-700" :
                      company.status === "DEVELOPMENT" ? "bg-amber-100 text-amber-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {company.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{company.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ATHLYNX Spotlight */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-cyan-500/20 rounded-full px-4 py-2 mb-6">
                <Star className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-semibold text-cyan-400">FLAGSHIP PRODUCT</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                ATHLYNX
                <span className="block text-2xl md:text-3xl text-cyan-400 font-bold mt-2">
                  THE ATHLETE'S PLAYBOOK
                </span>
              </h2>
              
              <p className="text-lg text-gray-300 mb-8">
                The complete NIL ecosystem for athletes, parents, and coaches. Manage deals, track training, 
                connect with recruiters, and build your brand - all in one platform.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-black text-cyan-400">10</div>
                  <div className="text-sm text-gray-400">Powerful Apps</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-black text-cyan-400">$50M+</div>
                  <div className="text-sm text-gray-400">NIL Deals Tracked</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-black text-cyan-400">24/7</div>
                  <div className="text-sm text-gray-400">AI Support</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-black text-cyan-400">HIPAA</div>
                  <div className="text-sm text-gray-400">Compliant</div>
                </div>
              </div>

              <Link href="/">
                <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/30">
                  LAUNCH ATHLYNX
                  <ChevronRight className="w-5 h-5" />
                </button>
              </Link>
            </div>

            <div className="flex-1">
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/qUknrdlyPrUZJQYo.png" 
                alt="ATHLYNX" 
                className="w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-4">STRATEGIC PARTNERS</h2>
            <p className="text-gray-600">Powered by industry leaders</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.map((partner, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 transition-colors">
                <div className="font-bold text-slate-900 mb-1">{partner.name}</div>
                <div className="text-xs text-gray-500">{partner.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-4">LEADERSHIP TEAM</h2>
            <p className="text-gray-600">The visionaries building the empire</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {leadership.map((person, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold">
                  {person.image ? (
                    <img src={person.image} alt={person.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    person.name.split(" ").map(n => n[0]).join("").slice(0, 2)
                  )}
                </div>
                <div className="font-bold text-slate-900 text-sm">{person.name}</div>
                <div className="text-xs text-gray-500">{person.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-4">JOIN THE EMPIRE</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Whether you're an athlete, investor, or partner - there's a place for you in the DHG family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all">
                EXPLORE ATHLYNX
              </button>
            </Link>
            <button className="bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all border border-white/30">
              CONTACT US
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img src="/logos/dhg-crab-logo.png" alt="DHG" className="w-12 h-12" />
              <div>
                <div className="font-bold">Dozier Holdings Group, LLC</div>
                <div className="text-sm text-gray-400">Building Empires Since 2020</div>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="https://dozier-holdingsgroup.com.mx" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                dozier-holdingsgroup.com.mx
              </a>
              <span>|</span>
              <span>Houston, TX • Laurel, MS</span>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            © 2020-2026 Dozier Holdings Group, LLC. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
