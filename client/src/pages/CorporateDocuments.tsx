import { Link } from "wouter";
import { Building, FileText, Users, Scale, Download, ExternalLink, Calendar, MapPin } from "lucide-react";

export default function CorporateDocuments() {
  const companies = [
    {
      name: "Dozier Holdings Group, LLC",
      type: "Parent Holding Company",
      state: "Texas",
      formed: "2024",
      status: "Active",
      documents: ["Operating Agreement", "Articles of Organization", "EIN Certificate"],
    },
    {
      name: "ATHLYNX AI Corporation",
      type: "Technology Corporation",
      state: "Delaware",
      formed: "2025",
      status: "Active",
      documents: ["Certificate of Incorporation", "Bylaws", "Stock Ledger"],
    },
    {
      name: "VC Technologies, LLC",
      type: "Technology Services",
      state: "Texas",
      formed: "2024",
      status: "Active",
      documents: ["Operating Agreement", "Articles of Organization"],
    },
    {
      name: "VC Data Centers, LLC",
      type: "Data Infrastructure",
      state: "Texas",
      formed: "2024",
      status: "Active",
      documents: ["Operating Agreement", "Articles of Organization"],
    },
    {
      name: "The VIRT, LLC",
      type: "Cryptocurrency & Blockchain",
      state: "Wyoming",
      formed: "2025",
      status: "Active",
      documents: ["Operating Agreement", "Articles of Organization"],
    },
    {
      name: "VC Energy, LLC",
      type: "Energy & Sustainability",
      state: "Texas",
      formed: "2024",
      status: "Active",
      documents: ["Operating Agreement", "Articles of Organization"],
    },
    {
      name: "Uma Real Estate Investment, LLC",
      type: "Real Estate Investment",
      state: "Texas",
      formed: "2024",
      status: "Active",
      documents: ["Operating Agreement", "Articles of Organization"],
    },
    {
      name: "Villa Agape, LLC",
      type: "Healthcare & Wellness",
      state: "Mississippi",
      formed: "2024",
      status: "Active",
      documents: ["Operating Agreement", "Articles of Organization", "Healthcare Licenses"],
    },
    {
      name: "Compassionate Care, LLC",
      type: "Senior Care Services",
      state: "Mississippi",
      formed: "2024",
      status: "Active",
      documents: ["Operating Agreement", "Articles of Organization"],
    },
    {
      name: "Pisces Resort, LLC",
      type: "Hospitality & Tourism",
      state: "Mississippi",
      formed: "2025",
      status: "Active",
      documents: ["Operating Agreement", "Articles of Organization"],
    },
    {
      name: "Venus Venue & Vineyard, LLC",
      type: "Events & Agriculture",
      state: "Mississippi",
      formed: "2025",
      status: "Active",
      documents: ["Operating Agreement", "Articles of Organization"],
    },
    {
      name: "Pomodoro Restaurant, LLC",
      type: "Food & Beverage",
      state: "Mississippi",
      formed: "2025",
      status: "Active",
      documents: ["Operating Agreement", "Articles of Organization", "Food Service License"],
    },
  ];

  const boardMembers = [
    { name: "Chad A. Dozier", role: "Founder, CEO & Chairman", since: "2024" },
    { name: "Glenn Tse", role: "Board Member & Strategic Advisor", since: "2025" },
    { name: "Lee Marshall", role: "Board Member & Operations", since: "2025" },
    { name: "Jimmy Boyd", role: "Board Member & Technology", since: "2025" },
    { name: "Andrew Kustes", role: "Board Member & Finance", since: "2025" },
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
          <div className="inline-flex items-center gap-2 bg-slate-500/20 text-slate-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Building className="w-4 h-4" />
            CORPORATE GOVERNANCE
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-slate-300 to-slate-100 bg-clip-text text-transparent">
              Corporate Documents
            </span>
          </h1>
          <p className="text-xl text-slate-300">
            Business formation documents, corporate governance, and legal structure of the DHG Empire.
          </p>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="py-12 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Board of Directors</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {boardMembers.map((member) => (
              <div key={member.name} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-white">{member.name}</h3>
                <p className="text-cyan-400 text-sm">{member.role}</p>
                <p className="text-slate-500 text-xs mt-2">Since {member.since}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">DHG Empire Companies</h2>
          <p className="text-slate-400 text-center mb-12">12 Companies • $168M+ Capital Raise Target</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <div key={company.name} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-cyan-400 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <Building className="w-8 h-8 text-cyan-400" />
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    company.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-amber-500/20 text-amber-400"
                  }`}>
                    {company.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{company.name}</h3>
                <p className="text-cyan-400 text-sm mb-4">{company.type}</p>
                <div className="flex items-center gap-4 text-slate-400 text-sm mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {company.state}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {company.formed}
                  </span>
                </div>
                <div className="border-t border-slate-700 pt-4">
                  <p className="text-slate-500 text-xs mb-2">Available Documents:</p>
                  <div className="flex flex-wrap gap-2">
                    {company.documents.map((doc) => (
                      <span key={doc} className="bg-slate-700/50 text-slate-300 px-2 py-1 rounded text-xs">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Request */}
      <section className="py-12 px-4 bg-slate-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Request Corporate Documents</h2>
          <p className="text-slate-300 mb-8">
            For investor due diligence, partnership inquiries, or legal purposes, 
            contact our corporate office to request official documents.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:corporate@dozierholdingsgroup.com" className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Request Documents
            </a>
            <Link href="/partners">
              <button className="bg-slate-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                Partner Portal
              </button>
            </Link>
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
