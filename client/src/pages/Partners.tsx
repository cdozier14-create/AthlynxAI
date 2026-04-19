import { Link } from "wouter";
import { Handshake, Users, DollarSign, BarChart3, Shield, Zap, Globe, Code, Building, Star, CheckCircle, ArrowRight } from "lucide-react";

export default function Partners() {
  const partnerTiers = [
    {
      name: "Affiliate",
      commission: "10%",
      requirements: "No minimum",
      benefits: ["Referral tracking", "Monthly payouts", "Marketing materials"],
      color: "from-slate-500 to-gray-600",
    },
    {
      name: "Silver",
      commission: "15%",
      requirements: "$5K/month revenue",
      benefits: ["Everything in Affiliate", "Dedicated support", "Co-marketing opportunities"],
      color: "from-slate-400 to-slate-500",
    },
    {
      name: "Gold",
      commission: "20%",
      requirements: "$25K/month revenue",
      benefits: ["Everything in Silver", "API access", "White-label options", "Priority features"],
      color: "from-amber-500 to-yellow-500",
    },
    {
      name: "Platinum",
      commission: "25%",
      requirements: "$100K/month revenue",
      benefits: ["Everything in Gold", "Revenue share", "Board advisory", "Equity options"],
      color: "from-cyan-400 to-blue-500",
    },
  ];

  const partnerTypes = [
    { name: "Schools & Universities", icon: Building, count: "500+" },
    { name: "Sports Agencies", icon: Users, count: "150+" },
    { name: "Brands & Sponsors", icon: Star, count: "300+" },
    { name: "Technology Partners", icon: Code, count: "50+" },
    { name: "Media Partners", icon: Globe, count: "100+" },
    { name: "Financial Services", icon: DollarSign, count: "75+" },
  ];

  const currentPartners = [
    "Manus AI",
    "Nebius AI Cloud",
    "NVIDIA",
    "Hansi Tech",
    "ICC USA",
    "Twilio",
    "Resend",
    "Stripe",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 to-blue-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/qUknrdlyPrUZJQYo.png" alt="ATHLYNX" className="h-12 rounded-lg" />
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/legal">
              <button className="text-slate-300 hover:text-white px-4 py-2">Legal Hub</button>
            </Link>
            <Link href="/">
              <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-lg font-medium">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Handshake className="w-4 h-4" />
            PARTNER PROGRAM
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
              Partners Portal
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Join the ATHLYNX partner ecosystem. Earn commissions, access exclusive APIs, 
            and grow with the future of athlete success.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2">
              Become a Partner <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-slate-700 text-white px-8 py-4 rounded-xl font-bold text-lg">
              Partner Login
            </button>
          </div>
        </div>
      </section>

      {/* Partner Stats */}
      <section className="py-12 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {partnerTypes.map((type) => (
              <div key={type.name} className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700 text-center">
                <type.icon className="w-8 h-8 text-teal-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{type.count}</p>
                <p className="text-slate-400 text-xs">{type.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Tiers */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Partner Tiers</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {partnerTiers.map((tier) => (
              <div key={tier.name} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-teal-400 transition-all">
                <div className={`w-full h-2 rounded-full bg-gradient-to-r ${tier.color} mb-6`}></div>
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-4xl font-black text-teal-400 mb-2">{tier.commission}</p>
                <p className="text-slate-400 text-sm mb-6">Commission Rate</p>
                <p className="text-slate-500 text-xs mb-4">Requires: {tier.requirements}</p>
                <ul className="space-y-2">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2 text-slate-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-teal-400" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-12 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Technology Partners</h2>
          <p className="text-slate-400 text-center mb-12">Powering the ATHLYNX ecosystem</p>
          <div className="flex flex-wrap justify-center gap-4">
            {currentPartners.map((partner) => (
              <div key={partner} className="bg-slate-800/50 rounded-xl px-6 py-4 border border-slate-700">
                <p className="text-white font-medium">{partner}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Access */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
              <Code className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4">API Access</h3>
              <p className="text-slate-300 mb-6">
                Integrate ATHLYNX data into your applications. Access athlete profiles, 
                NIL valuations, transfer portal data, and more.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-slate-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-purple-400" />
                  RESTful API & GraphQL
                </li>
                <li className="flex items-center gap-2 text-slate-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-purple-400" />
                  Python & Julia SDKs
                </li>
                <li className="flex items-center gap-2 text-slate-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-purple-400" />
                  Webhooks & Real-time events
                </li>
              </ul>
              <Link href="/docs">
                <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium">
                  View API Docs
                </button>
              </Link>
            </div>
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
              <BarChart3 className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Partner Dashboard</h3>
              <p className="text-slate-300 mb-6">
                Track your referrals, commissions, and performance in real-time. 
                Access marketing materials and co-branded assets.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-slate-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  Real-time analytics
                </li>
                <li className="flex items-center gap-2 text-slate-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  Commission tracking
                </li>
                <li className="flex items-center gap-2 text-slate-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  Marketing asset library
                </li>
              </ul>
              <Link href="/crm">
                <button className="bg-cyan-600 text-white px-6 py-3 rounded-lg font-medium">
                  Partner Dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Domains */}
      <section className="py-12 px-4 bg-slate-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">Partner Across All Platforms</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["athlynxapp.vip", "athlynx.io", "athlynx.net", "transferportal.ai"].map((domain) => (
              <span key={domain} className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white px-4 py-2 rounded-lg font-medium">
                {domain}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/30 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Partner?</h2>
            <p className="text-slate-300 mb-6">
              Join 1,000+ partners already earning with ATHLYNX. Apply today and start earning commissions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:partners@athlynx.ai" className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white px-6 py-3 rounded-lg font-medium">
                Apply Now
              </a>
              <a href="tel:+16014985282" className="bg-slate-700 text-white px-6 py-3 rounded-lg font-medium">
                Call: +1 (601) 498-5282
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400 text-sm">© 2026 Dozier Holdings Group, LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
