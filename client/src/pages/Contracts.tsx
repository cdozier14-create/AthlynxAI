import { Link } from "wouter";
import { FileSignature, Download, Shield, Users, DollarSign, Briefcase, FileText, CheckCircle, Star } from "lucide-react";

export default function Contracts() {
  const contractTypes = [
    {
      title: "NIL Representation Agreement",
      description: "Standard athlete representation contract for NIL deals",
      icon: Users,
      category: "Athlete",
      popular: true,
    },
    {
      title: "Brand Partnership Agreement",
      description: "Contract template for brand sponsorship deals",
      icon: Briefcase,
      category: "Brand",
      popular: true,
    },
    {
      title: "Sponsorship Agreement",
      description: "Detailed sponsorship terms and deliverables",
      icon: DollarSign,
      category: "Brand",
      popular: false,
    },
    {
      title: "Influencer Marketing Contract",
      description: "Social media promotion and content creation terms",
      icon: Star,
      category: "Content",
      popular: true,
    },
    {
      title: "Non-Disclosure Agreement (NDA)",
      description: "Confidentiality agreement for business discussions",
      icon: Shield,
      category: "Legal",
      popular: false,
    },
    {
      title: "Independent Contractor Agreement",
      description: "For coaches, trainers, and service providers",
      icon: FileText,
      category: "Services",
      popular: false,
    },
    {
      title: "Transfer Portal Commitment",
      description: "Letter of intent for transfer portal athletes",
      icon: FileSignature,
      category: "Transfer",
      popular: true,
    },
    {
      title: "Revenue Share Agreement",
      description: "Partner revenue sharing and commission terms",
      icon: DollarSign,
      category: "Partner",
      popular: false,
    },
  ];

  const features = [
    "Legally reviewed by sports attorneys",
    "NCAA and state NIL law compliant",
    "Customizable templates",
    "Digital signature ready",
    "Automatic version tracking",
    "Secure cloud storage",
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
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <FileSignature className="w-4 h-4" />
            CONTRACT TEMPLATES
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Contracts & Agreements
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Professional, legally-reviewed contract templates for NIL deals, brand partnerships, 
            and athlete representation. Built for athlynx.ai, transferportal.ai, and the entire DHG ecosystem.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {features.map((feature) => (
              <span key={feature} className="flex items-center gap-2 bg-slate-800/50 px-3 py-2 rounded-lg text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-green-400" />
                {feature}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contract Templates */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Contract Templates</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contractTypes.map((contract) => (
              <div key={contract.title} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-indigo-400 transition-all relative">
                {contract.popular && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Popular
                  </span>
                )}
                <contract.icon className="w-10 h-10 text-indigo-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{contract.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{contract.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                    {contract.category}
                  </span>
                  <button className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domains Section */}
      <section className="py-12 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Available Across All Platforms</h2>
          <p className="text-slate-400 text-center mb-12">Access contracts from any of our domains</p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { domain: "athlynx.ai", desc: "Main Platform", color: "from-blue-500 to-cyan-500" },
              { domain: "athlynx.io", desc: "Developer Portal", color: "from-purple-500 to-pink-500" },
              { domain: "athlynx.net", desc: "Network Hub", color: "from-green-500 to-emerald-500" },
              { domain: "transferportal.ai", desc: "Transfer Portal", color: "from-amber-500 to-orange-500" },
            ].map((site) => (
              <div key={site.domain} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 text-center">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${site.color} mx-auto mb-4 flex items-center justify-center`}>
                  <FileSignature className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-white">{site.domain}</h3>
                <p className="text-slate-400 text-sm">{site.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Contracts */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need a Custom Contract?</h2>
            <p className="text-slate-300 mb-6">
              Our legal team can draft custom contracts tailored to your specific needs. 
              From complex NIL deals to multi-party partnerships, we've got you covered.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:legal@athlynx.ai" className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-6 py-3 rounded-lg font-medium">
                Request Custom Contract
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
          <p className="text-slate-500 text-xs mt-2">
            athlynx.ai • athlynx.io • athlynx.net • transferportal.ai
          </p>
        </div>
      </footer>
    </div>
  );
}
