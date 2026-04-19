import { Link } from "wouter";
import { Shield, CheckCircle, Lock, Server, Users, FileText, AlertTriangle, Phone } from "lucide-react";

export default function HIPAACompliance() {
  const complianceFeatures = [
    {
      title: "Data Encryption",
      description: "All PHI is encrypted at rest (AES-256) and in transit (TLS 1.3)",
      icon: Lock,
    },
    {
      title: "Access Controls",
      description: "Role-based access with multi-factor authentication required",
      icon: Users,
    },
    {
      title: "Audit Logging",
      description: "Complete audit trails for all PHI access and modifications",
      icon: FileText,
    },
    {
      title: "Secure Infrastructure",
      description: "HIPAA-compliant cloud hosting with BAA agreements",
      icon: Server,
    },
  ];

  const safeguards = [
    {
      category: "Administrative Safeguards",
      items: [
        "Security Management Process",
        "Assigned Security Responsibility",
        "Workforce Security",
        "Information Access Management",
        "Security Awareness Training",
        "Security Incident Procedures",
        "Contingency Plan",
        "Evaluation",
        "Business Associate Contracts",
      ],
    },
    {
      category: "Physical Safeguards",
      items: [
        "Facility Access Controls",
        "Workstation Use Policies",
        "Workstation Security",
        "Device and Media Controls",
      ],
    },
    {
      category: "Technical Safeguards",
      items: [
        "Access Control",
        "Audit Controls",
        "Integrity Controls",
        "Person or Entity Authentication",
        "Transmission Security",
      ],
    },
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
              <button className="text-slate-300 hover:text-white px-4 py-2">
                Legal Hub
              </button>
            </Link>
            <Link href="/">
              <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-lg font-medium">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            HIPAA COMPLIANT
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              HIPAA Compliance
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            ATHLYNX is fully compliant with the Health Insurance Portability and Accountability Act (HIPAA). 
            We protect athlete health information with enterprise-grade security.
          </p>
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 inline-block">
            <p className="text-green-400 font-semibold">
              "Protecting Our Precious Cargo"
            </p>
            <p className="text-slate-400 text-sm mt-2">
              Your health data is sacred. We treat it that way.
            </p>
          </div>
        </div>
      </section>

      {/* Compliance Features */}
      <section className="py-12 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Security Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceFeatures.map((feature) => (
              <div key={feature.title} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                <feature.icon className="w-10 h-10 text-green-400 mb-4" />
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safeguards */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">HIPAA Safeguards</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {safeguards.map((safeguard) => (
              <div key={safeguard.category} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">{safeguard.category}</h3>
                <ul className="space-y-2">
                  {safeguard.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BAA Section */}
      <section className="py-12 px-4 bg-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <FileText className="w-8 h-8 text-purple-400" />
              Business Associate Agreements
            </h2>
            <p className="text-slate-300 mb-6">
              ATHLYNX maintains Business Associate Agreements (BAAs) with all third-party vendors 
              who may have access to Protected Health Information (PHI). Our BAA partners include:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Cloud Infrastructure Providers",
                "Database Hosting Services",
                "Email Service Providers",
                "Analytics Platforms",
                "Payment Processors",
                "Customer Support Tools",
              ].map((partner) => (
                <div key={partner} className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Breach Notification */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-amber-400" />
              Breach Notification Policy
            </h2>
            <p className="text-slate-300 mb-4">
              In the unlikely event of a data breach involving PHI, ATHLYNX will:
            </p>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 mt-1" />
                Notify affected individuals within 60 days of discovery
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 mt-1" />
                Report to the HHS Secretary as required by law
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 mt-1" />
                Notify prominent media outlets if breach affects 500+ individuals
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 mt-1" />
                Provide credit monitoring services to affected individuals
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 px-4 bg-slate-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">HIPAA Compliance Questions?</h2>
          <p className="text-slate-300 mb-8">
            Contact our Privacy Officer for any HIPAA-related inquiries.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:privacy@athlynx.ai" className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2">
              <FileText className="w-5 h-5" />
              privacy@athlynx.ai
            </a>
            <a href="tel:+16014985282" className="bg-slate-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2">
              <Phone className="w-5 h-5" />
              +1 (601) 498-5282
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400 text-sm">
            © 2026 Dozier Holdings Group, LLC. All rights reserved.
          </p>
          <p className="text-slate-500 text-xs mt-2">
            Last Updated: January 7, 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
