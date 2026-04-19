import { Link } from "wouter";
import { Handshake, Users, DollarSign, BarChart3, Shield, Zap, Globe, Code, Building, Star, CheckCircle, ArrowRight, Server, Cpu, Mail, Database, Cloud, GitBranch, Lock, Workflow } from "lucide-react";

const TECH_STACK = [
  // AI & Intelligence
  { name: "Manus AI", category: "AI Platform", role: "Autonomous AI Development & Automation", status: "LIVE", color: "from-purple-600 to-violet-700", badge: "AI" },
  { name: "Nebius AI", category: "AI Infrastructure", role: "GPU Cloud & AI Model Hosting", status: "LIVE", color: "from-blue-600 to-indigo-700", badge: "AI" },
  { name: "Claude (Anthropic)", category: "AI Platform", role: "AI Language Model & Reasoning", status: "LIVE", color: "from-orange-500 to-amber-600", badge: "AI" },
  { name: "NVIDIA", category: "Hardware", role: "H100/H200/B200/GB200 GPU Infrastructure", status: "LIVE", color: "from-green-600 to-emerald-700", badge: "GPU" },
  { name: "ICC-USA", category: "Hardware Partner", role: "Enterprise Server & GPU Hardware", status: "LIVE", color: "from-slate-600 to-gray-700", badge: "HW" },
  { name: "RunSun Cloud", category: "GPU Cloud", role: "NVIDIA Cloud Partner — H200/B200/GB200 Clusters", status: "LIVE", color: "from-cyan-600 to-blue-700", badge: "GPU" },

  // Hosting & Infrastructure
  { name: "Vercel", category: "Hosting", role: "Production Deployment & Edge Network", status: "LIVE", color: "from-slate-700 to-black", badge: "HOST" },
  { name: "Cloudflare", category: "CDN & Security", role: "DNS, CDN, DDoS Protection & Zero Trust", status: "LIVE", color: "from-orange-500 to-yellow-600", badge: "CDN" },
  { name: "AWS", category: "Cloud", role: "S3 Storage, Lambda & Cloud Services", status: "LIVE", color: "from-yellow-500 to-orange-600", badge: "CLOUD" },
  { name: "Railway", category: "Backend Hosting", role: "Server & API Deployment", status: "LIVE", color: "from-violet-600 to-purple-700", badge: "HOST" },
  { name: "Netlify", category: "Hosting", role: "Static Site & JAMstack Deployment", status: "LIVE", color: "from-teal-500 to-cyan-600", badge: "HOST" },

  // Database
  { name: "Neon", category: "Database", role: "Serverless Postgres — Primary Database", status: "LIVE", color: "from-green-500 to-teal-600", badge: "DB" },
  { name: "PlanetScale", category: "Database", role: "MySQL Serverless — Scale Database", status: "LIVE", color: "from-pink-600 to-rose-700", badge: "DB" },

  // Communication
  { name: "Twilio", category: "Communications", role: "SMS, Voice & Messaging API", status: "LIVE", color: "from-red-600 to-rose-700", badge: "COMM" },
  { name: "Resend", category: "Email", role: "Transactional Email API", status: "LIVE", color: "from-blue-500 to-cyan-600", badge: "EMAIL" },
  { name: "Gmail / Google Workspace", category: "Productivity", role: "Business Email, Docs, Drive & Calendar", status: "LIVE", color: "from-red-500 to-yellow-500", badge: "GSUITE" },
  { name: "Zapier", category: "Automation", role: "Workflow Automation & App Integration", status: "LIVE", color: "from-orange-500 to-red-600", badge: "AUTO" },

  // Dev & Source Control
  { name: "GitHub", category: "Source Control", role: "Code Repository & CI/CD Pipelines", status: "LIVE", color: "from-gray-700 to-slate-800", badge: "DEV" },

  // Domain & DNS
  { name: "GoDaddy", category: "Domain Registrar", role: "Domain Registration & Management", status: "LIVE", color: "from-green-600 to-lime-700", badge: "DNS" },
  { name: "Hostinger", category: "Domain & Hosting", role: "Domain Registration & Web Hosting", status: "LIVE", color: "from-violet-500 to-purple-600", badge: "DNS" },

  // Payments
  { name: "Stripe", category: "Payments", role: "Payment Processing & Subscription Billing", status: "LIVE", color: "from-indigo-600 to-blue-700", badge: "PAY" },

  // Development Languages
  { name: "Python", category: "Language", role: "AI/ML, Data Science & Backend Scripting", status: "LIVE", color: "from-blue-500 to-yellow-500", badge: "LANG" },
  { name: "Julia", category: "Language", role: "High-Performance Scientific Computing", status: "LIVE", color: "from-green-500 to-purple-600", badge: "LANG" },
];

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "AI Platform": Cpu,
  "AI Infrastructure": Server,
  "Hardware": Server,
  "Hardware Partner": Server,
  "GPU Cloud": Cloud,
  "Hosting": Cloud,
  "Backend Hosting": Cloud,
  "CDN & Security": Shield,
  "Cloud": Cloud,
  "Database": Database,
  "Communications": Zap,
  "Email": Mail,
  "Productivity": Globe,
  "Automation": Workflow,
  "Source Control": GitBranch,
  "Domain Registrar": Globe,
  "Domain & Hosting": Globe,
  "Payments": DollarSign,
  "Language": Code,
};

const BADGE_COLORS: Record<string, string> = {
  AI: "bg-purple-600",
  GPU: "bg-green-600",
  HW: "bg-slate-600",
  HOST: "bg-blue-600",
  CDN: "bg-orange-600",
  CLOUD: "bg-yellow-600",
  DB: "bg-teal-600",
  COMM: "bg-red-600",
  EMAIL: "bg-cyan-600",
  GSUITE: "bg-red-500",
  AUTO: "bg-orange-500",
  DEV: "bg-gray-700",
  DNS: "bg-violet-600",
  PAY: "bg-indigo-600",
  LANG: "bg-blue-500",
};

const PARTNER_TIERS = [
  { name: "Affiliate", commission: "10%", requirements: "No minimum", benefits: ["Referral tracking", "Monthly payouts", "Marketing materials"], color: "from-slate-500 to-gray-600" },
  { name: "Silver", commission: "15%", requirements: "$5K/month revenue", benefits: ["Everything in Affiliate", "Dedicated support", "Co-marketing opportunities"], color: "from-slate-400 to-slate-500" },
  { name: "Gold", commission: "20%", requirements: "$25K/month revenue", benefits: ["Everything in Silver", "API access", "White-label options", "Priority features"], color: "from-amber-500 to-yellow-500" },
  { name: "Platinum", commission: "25%", requirements: "$100K/month revenue", benefits: ["Everything in Gold", "Revenue share", "Board advisory", "Equity options"], color: "from-cyan-400 to-blue-500" },
];

export default function Partners() {
  const categories = [...new Set(TECH_STACK.map(p => p.category))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#060e24] via-[#0d1b3e] to-[#060e24] text-white">
      {/* Header */}
      <header className="bg-[#080d1a]/90 border-b border-blue-900 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <img src="/athlynx-sports-brand.png" alt="ATHLYNX™" className="h-10 w-10 rounded-xl object-contain" />
              <div>
                <div className="text-white font-black text-lg">ATHLYNX™</div>
                <div className="text-blue-400 text-xs">A Dozier Holdings Group™ Company</div>
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/investor-hub">
              <button className="text-blue-400 hover:text-white px-4 py-2 text-sm transition-colors">Investor Hub</button>
            </Link>
            <Link href="/">
              <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-lg font-bold text-sm">
                ← Home
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,100,255,0.15)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm font-black tracking-widest uppercase mb-6">
            <Handshake className="w-4 h-4" />
            Partners & Technology Stack
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
            BUILT ON THE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">BEST IN CLASS</span>
          </h1>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            ATHLYNX™ is powered by the world's leading AI, cloud, and infrastructure partners — the same stack used by Fortune 500 companies and top-tier tech unicorns.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:cdozier@dozierholdingsgroup.com" className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-black text-lg flex items-center gap-2 hover:scale-105 transition-transform">
              Become a Partner <ArrowRight className="w-5 h-5" />
            </a>
            <Link href="/investor-hub">
              <button className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-black text-lg hover:bg-white/20 transition-colors">
                Investor Hub
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 px-4 bg-white/5 border-y border-blue-900">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div><div className="text-3xl font-black text-cyan-400">23+</div><div className="text-blue-300 text-sm">Technology Partners</div></div>
          <div><div className="text-3xl font-black text-yellow-400">$180M+</div><div className="text-blue-300 text-sm">Market Opportunity</div></div>
          <div><div className="text-3xl font-black text-green-400">15+</div><div className="text-blue-300 text-sm">Sport Platforms</div></div>
          <div><div className="text-3xl font-black text-purple-400">7</div><div className="text-blue-300 text-sm">Days Since Launch</div></div>
        </div>
      </section>

      {/* Full Tech Stack Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-400 text-xs font-black tracking-widest uppercase mb-2">Complete Technology Stack</p>
            <h2 className="text-4xl font-black text-white">Every Tool. Every Integration.</h2>
            <p className="text-blue-300 mt-2">The infrastructure powering the future of athlete success</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {TECH_STACK.map((partner) => {
              const Icon = CATEGORY_ICONS[partner.category] || Code;
              return (
                <div key={partner.name} className="bg-white/5 border border-blue-900/50 hover:border-cyan-500/50 rounded-2xl p-5 transition-all hover:bg-white/10 group">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${partner.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className={`text-xs font-black px-2 py-1 rounded-lg text-white ${BADGE_COLORS[partner.badge] || 'bg-blue-600'}`}>
                      {partner.badge}
                    </span>
                  </div>
                  <h3 className="text-white font-black text-sm mb-1">{partner.name}</h3>
                  <p className="text-blue-400 text-xs mb-2">{partner.category}</p>
                  <p className="text-blue-300/70 text-xs leading-relaxed">{partner.role}</p>
                  <div className="mt-3 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-xs font-bold">LIVE</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner Tiers */}
      <section className="py-16 px-4 bg-white/5 border-y border-blue-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-400 text-xs font-black tracking-widest uppercase mb-2">Revenue Share Program</p>
            <h2 className="text-4xl font-black text-white">Partner Tiers</h2>
            <p className="text-blue-300 mt-2">Earn commissions by growing the ATHLYNX™ ecosystem</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {PARTNER_TIERS.map((tier) => (
              <div key={tier.name} className="bg-[#080d1a] rounded-2xl p-6 border border-blue-900 hover:border-cyan-500/50 transition-all">
                <div className={`w-full h-1.5 rounded-full bg-gradient-to-r ${tier.color} mb-6`}></div>
                <h3 className="text-2xl font-black text-white mb-2">{tier.name}</h3>
                <p className="text-4xl font-black text-cyan-400 mb-1">{tier.commission}</p>
                <p className="text-blue-400 text-xs mb-4">Commission Rate</p>
                <p className="text-blue-500 text-xs mb-4">Requires: {tier.requirements}</p>
                <ul className="space-y-2">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2 text-blue-200 text-xs">
                      <CheckCircle className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API & Developer Access */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 rounded-2xl p-8 border border-blue-900">
              <Code className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-black mb-4 text-white">API Access</h3>
              <p className="text-blue-300 mb-6">
                Integrate ATHLYNX™ data into your applications. Access athlete profiles, NIL valuations, transfer portal data, and more.
              </p>
              <ul className="space-y-2 mb-6">
                {["RESTful API & GraphQL", "Python & Julia SDKs", "Webhooks & Real-time events", "Zapier Integration", "CRM & Workflow Automation"].map(item => (
                  <li key={item} className="flex items-center gap-2 text-blue-200 text-sm">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="mailto:cdozier@dozierholdingsgroup.com" className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-bold inline-block transition-colors">
                Request API Access
              </a>
            </div>
            <div className="bg-white/5 rounded-2xl p-8 border border-blue-900">
              <BarChart3 className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-2xl font-black mb-4 text-white">Partner Dashboard</h3>
              <p className="text-blue-300 mb-6">
                Track your referrals, commissions, and performance in real-time. Access marketing materials and co-branded assets.
              </p>
              <ul className="space-y-2 mb-6">
                {["Real-time analytics", "Commission tracking", "Marketing asset library", "Co-branded materials", "Dedicated partner support"].map(item => (
                  <li key={item} className="flex items-center gap-2 text-blue-200 text-sm">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/crm">
                <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg font-bold transition-colors">
                  Partner Dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Domains */}
      <section className="py-12 px-4 bg-white/5 border-y border-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-black mb-2 text-white">Partner Across All Platforms</h2>
          <p className="text-blue-400 text-sm mb-8">Our growing domain portfolio</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["athlynx.ai", "nilportals.com", "nilportal.ai", "transferportal.ai", "aibotecosys.com", "athlynx.ai", "athlynx.io", "athlynx.net"].map((domain) => (
              <span key={domain} className="bg-gradient-to-r from-blue-600/30 to-cyan-600/30 border border-blue-500/40 text-cyan-300 px-4 py-2 rounded-lg font-bold text-sm">
                {domain}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-cyan-500/30 rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-black mb-4 text-white">Ready to Partner with ATHLYNX™?</h2>
            <p className="text-blue-300 mb-8 max-w-2xl mx-auto">
              Join the ecosystem that's building the future of athlete success. Whether you're an investor, technology partner, sports agency, or brand — there's a place for you here.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:cdozier@dozierholdingsgroup.com" className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-black text-lg hover:scale-105 transition-transform">
                Contact: cdozier@dozierholdingsgroup.com
              </a>
              <Link href="/investor-hub">
                <button className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-black text-lg hover:bg-white/20 transition-colors">
                  View Investor Hub
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#080d1a] border-t border-blue-900 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-blue-600 text-xs">
            © 2026 Dozier Holdings Group™. All Rights Reserved. ATHLYNX™ | The Athlete's Playbook™ are trademarks of Dozier Holdings Group™. Dreams Do Come True 2026.
          </p>
        </div>
      </footer>
    </div>
  );
}
