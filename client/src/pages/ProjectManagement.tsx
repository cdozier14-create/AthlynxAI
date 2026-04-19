import { useState } from "react";
import { Link } from "wouter";

// DHG Company data
const techCompanies = [
  { name: "ATHLYNX", status: "live", priority: "HIGH", description: "Complete athlete ecosystem platform", url: "/" },
  { name: "NIL Portal", status: "built", priority: "HIGH", description: "Social network for athletes", url: "/nil-portal" },
  { name: "Diamond Grind", status: "built", priority: "HIGH", description: "Baseball training & performance", url: "/diamond-grind" },
  { name: "NIL Messenger", status: "built", priority: "MEDIUM", description: "Secure encrypted messaging", url: "/messages" },
  { name: "Softmor, Inc.", status: "active", priority: "HIGH", description: "Parent technology company", url: "#" },
  { name: "VC Technology", status: "planned", priority: "LOW", description: "R&D technologies", url: "#" },
  { name: "VC Data Centers", status: "planned", priority: "LOW", description: "Cloud infrastructure", url: "#" },
  { name: "The VIRT", status: "planned", priority: "LOW", description: "Cryptocurrency platform", url: "#" },
  { name: "VC Energy", status: "planned", priority: "LOW", description: "Power generation", url: "#" },
];

const realEstateCompanies = [
  { name: "Uma Real Estate", status: "planned", priority: "MEDIUM", description: "Land acquisition & development", url: "#" },
  { name: "Villa Agape", status: "planned", priority: "MEDIUM", description: "Cancer patient housing", url: "#" },
  { name: "Compassionate Care", status: "planned", priority: "MEDIUM", description: "On-site medical clinic", url: "#" },
  { name: "Pisces Resort", status: "planned", priority: "LOW", description: "Wellness resort", url: "#" },
  { name: "Venus Venue", status: "planned", priority: "LOW", description: "Wedding & events venue", url: "#" },
  { name: "Pomodoro Restaurant", status: "planned", priority: "LOW", description: "Fine Italian dining", url: "#" },
];

const tradingCompanies = [
  { name: "Silk Road Trading", status: "planned", priority: "LOW", description: "Global sourcing & trading", url: "#" },
];

const platformFeatures = [
  { name: "VIP Early Access", status: "live", pages: true, backend: true, tests: true, url: "/" },
  { name: "Home/Landing", status: "built", pages: true, backend: true, tests: false, url: "/home" },
  { name: "NIL Portal", status: "built", pages: true, backend: true, tests: false, url: "/nil-portal" },
  { name: "Diamond Grind", status: "built", pages: true, backend: true, tests: false, url: "/diamond-grind" },
  { name: "Transfer Portal", status: "built", pages: true, backend: true, tests: true, url: "/transfer-portal-intelligence" },
  { name: "FCA (Faith)", status: "built", pages: true, backend: true, tests: true, url: "/faith" },
  { name: "Military Division", status: "built", pages: true, backend: false, tests: false, url: "/military-division" },
  { name: "Store", status: "built", pages: true, backend: true, tests: false, url: "/store" },
  { name: "Pricing", status: "built", pages: true, backend: true, tests: false, url: "/pricing" },
  { name: "Founder Story", status: "built", pages: true, backend: false, tests: false, url: "/founder-story" },
  { name: "Messages", status: "built", pages: true, backend: true, tests: false, url: "/messages" },
];

const whiteLabelApps = [
  { name: "Diamond Grind", sport: "Baseball", status: "built", market: "15M players", url: "/diamond-grind" },
  { name: "Court Kings", sport: "Basketball", status: "coming", market: "26M players", url: "/court-kings" },
  { name: "Gridiron Nexus", sport: "Football", status: "coming", market: "5M players", url: "/gridiron-nexus" },
  { name: "Pitch Pulse", sport: "Soccer", status: "coming", market: "24M players", url: "/pitch-pulse" },
  { name: "Reel Masters", sport: "Fishing", status: "coming", market: "55M anglers", url: "/reel-masters" },
  { name: "Fairway Elite", sport: "Golf", status: "coming", market: "25M golfers", url: "/fairway-elite" },
  { name: "Hunt Pro", sport: "Hunting", status: "coming", market: "15M hunters", url: "/hunt-pro" },
];

const founders = [
  { name: "Chad A. Dozier", title: "Chairman & President", role: "Founder" },
  { name: "Glenn Tse", title: "VP Business Development", role: "Founder" },
  { name: "Jimmy Boyd", title: "VP Property Development", role: "Founder" },
  { name: "Andrew Kustes", title: "VP Technology", role: "Founder" },
];

const advisors = [
  { name: "David Ford Sr", title: "Trusted Advisor", role: "IP, Orthopedics, Real Estate" },
  { name: "Lee Crisp", title: "Military Division Commander", role: "Operation Warrior Pipeline" },
];

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    live: "bg-green-500",
    built: "bg-blue-500",
    active: "bg-cyan-500",
    planned: "bg-gray-500",
    coming: "bg-yellow-500",
  };
  
  return (
    <span className={`px-2 py-1 rounded text-xs font-bold text-white ${colors[status] || "bg-gray-500"}`}>
      {status.toUpperCase()}
    </span>
  );
};

const PriorityBadge = ({ priority }: { priority: string }) => {
  const colors: Record<string, string> = {
    HIGH: "text-red-400",
    MEDIUM: "text-yellow-400",
    LOW: "text-gray-400",
  };
  
  return (
    <span className={`text-xs font-bold ${colors[priority] || "text-gray-400"}`}>
      {priority}
    </span>
  );
};

export default function ProjectManagement() {
  const [activeTab, setActiveTab] = useState<"overview" | "companies" | "platform" | "team" | "timeline">("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-cyan-500/20 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <img 
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/AzsuZOzvfgvscIdI.png" 
                  alt="DHG" 
                  className="w-12 h-12 cursor-pointer hover:scale-105 transition-transform"
                />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Project Management</h1>
                <p className="text-cyan-400 text-sm">Dozier Holdings Group</p>
              </div>
            </div>
            <Link href="/home">
              <button className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-colors">
                Back to Platform
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b border-cyan-500/20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {["overview", "companies", "platform", "team", "timeline"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-3 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? "text-cyan-400 border-b-2 border-cyan-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-6">
                <div className="text-3xl font-bold text-cyan-400">21</div>
                <div className="text-gray-400">VIP Signups</div>
                <div className="text-xs text-gray-500 mt-1">Target: 10,000</div>
              </div>
              <div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-6">
                <div className="text-3xl font-bold text-green-400">11</div>
                <div className="text-gray-400">Pages Built</div>
                <div className="text-xs text-gray-500 mt-1">Core platform ready</div>
              </div>
              <div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-6">
                <div className="text-3xl font-bold text-yellow-400">33</div>
                <div className="text-gray-400">Days to Launch</div>
                <div className="text-xs text-gray-500 mt-1">February 1, 2026</div>
              </div>
              <div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-6">
                <div className="text-3xl font-bold text-purple-400">16</div>
                <div className="text-gray-400">Companies</div>
                <div className="text-xs text-gray-500 mt-1">DHG Portfolio</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/">
                  <button className="w-full p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 hover:bg-green-500/30 transition-colors">
                    VIP Signup Page
                  </button>
                </Link>
                <Link href="/diamond-grind">
                  <button className="w-full p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors">
                    Diamond Grind
                  </button>
                </Link>
                <Link href="/nil-portal">
                  <button className="w-full p-4 bg-purple-500/20 border border-purple-500/50 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-colors">
                    NIL Portal
                  </button>
                </Link>
                <Link href="/store">
                  <button className="w-full p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-yellow-400 hover:bg-yellow-500/30 transition-colors">
                    🛒 Store
                  </button>
                </Link>
              </div>
            </div>

            {/* Launch Countdown */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Launch Timeline</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <div className="flex-1">
                    <div className="text-white font-medium">VIP Early Access</div>
                    <div className="text-gray-400 text-sm">January 1, 2026 - 1,000 beta testers</div>
                  </div>
                  <StatusBadge status="live" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <div className="flex-1">
                    <div className="text-white font-medium">Full Launch - Baseball</div>
                    <div className="text-gray-400 text-sm">February 1, 2026 - Diamond Grind</div>
                  </div>
                  <span className="text-yellow-400 text-sm">33 days</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                  <div className="flex-1">
                    <div className="text-white font-medium">Sport Rollout</div>
                    <div className="text-gray-400 text-sm">Every 2-4 weeks after launch</div>
                  </div>
                  <span className="text-gray-400 text-sm">Planned</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Companies Tab */}
        {activeTab === "companies" && (
          <div className="space-y-8">
            {/* Technology Division */}
            <div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                💻 Technology Division
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
                      <th className="pb-3">Company</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Priority</th>
                      <th className="pb-3">Description</th>
                      <th className="pb-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {techCompanies.map((company) => (
                      <tr key={company.name} className="border-b border-gray-700/50">
                        <td className="py-3 text-white font-medium">{company.name}</td>
                        <td className="py-3"><StatusBadge status={company.status} /></td>
                        <td className="py-3"><PriorityBadge priority={company.priority} /></td>
                        <td className="py-3 text-gray-400 text-sm">{company.description}</td>
                        <td className="py-3">
                          {company.url !== "#" ? (
                            <Link href={company.url}>
                              <button className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded text-cyan-400 text-sm hover:bg-cyan-500/30">
                                View
                              </button>
                            </Link>
                          ) : (
                            <span className="text-gray-500 text-sm">Coming Soon</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Real Estate Division */}
            <div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                Real Estate Division
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
                      <th className="pb-3">Company</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Priority</th>
                      <th className="pb-3">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {realEstateCompanies.map((company) => (
                      <tr key={company.name} className="border-b border-gray-700/50">
                        <td className="py-3 text-white font-medium">{company.name}</td>
                        <td className="py-3"><StatusBadge status={company.status} /></td>
                        <td className="py-3"><PriorityBadge priority={company.priority} /></td>
                        <td className="py-3 text-gray-400 text-sm">{company.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Trading Division */}
            <div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                🌐 Trading Division
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
                      <th className="pb-3">Company</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Priority</th>
                      <th className="pb-3">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tradingCompanies.map((company) => (
                      <tr key={company.name} className="border-b border-gray-700/50">
                        <td className="py-3 text-white font-medium">{company.name}</td>
                        <td className="py-3"><StatusBadge status={company.status} /></td>
                        <td className="py-3"><PriorityBadge priority={company.priority} /></td>
                        <td className="py-3 text-gray-400 text-sm">{company.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Platform Tab */}
        {activeTab === "platform" && (
          <div className="space-y-8">
            {/* Core Features */}
            <div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">ATHLYNX Platform Features</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
                      <th className="pb-3">Feature</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Pages</th>
                      <th className="pb-3">Backend</th>
                      <th className="pb-3">Tests</th>
                      <th className="pb-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {platformFeatures.map((feature) => (
                      <tr key={feature.name} className="border-b border-gray-700/50">
                        <td className="py-3 text-white font-medium">{feature.name}</td>
                        <td className="py-3"><StatusBadge status={feature.status} /></td>
                        <td className="py-3">{feature.pages ? "" : ""}</td>
                        <td className="py-3">{feature.backend ? "" : ""}</td>
                        <td className="py-3">{feature.tests ? "" : "⚠️"}</td>
                        <td className="py-3">
                          <Link href={feature.url}>
                            <button className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded text-cyan-400 text-sm hover:bg-cyan-500/30">
                              View
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* White-Label Apps */}
            <div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">White-Label Sport Apps</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {whiteLabelApps.map((app) => (
                  <Link key={app.name} href={app.url}>
                    <div className="bg-slate-700/50 border border-gray-600 rounded-lg p-4 hover:border-cyan-500/50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{app.name}</span>
                        <StatusBadge status={app.status} />
                      </div>
                      <div className="text-gray-400 text-sm">{app.sport}</div>
                      <div className="text-cyan-400 text-xs mt-1">{app.market}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === "team" && (
          <div className="space-y-8">
            {/* Founders */}
            <div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">👥 Founders</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {founders.map((person) => (
                  <div key={person.name} className="bg-slate-700/50 border border-gray-600 rounded-lg p-4 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl">
                      
                    </div>
                    <div className="text-white font-medium">{person.name}</div>
                    <div className="text-cyan-400 text-sm">{person.title}</div>
                    <div className="text-gray-500 text-xs mt-1">{person.role}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advisors */}
            <div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Advisors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {advisors.map((person) => (
                  <div key={person.name} className="bg-slate-700/50 border border-gray-600 rounded-lg p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-xl">
                      
                    </div>
                    <div>
                      <div className="text-white font-medium">{person.name}</div>
                      <div className="text-yellow-400 text-sm">{person.title}</div>
                      <div className="text-gray-500 text-xs">{person.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Timeline Tab */}
        {activeTab === "timeline" && (
          <div className="space-y-8">
            <div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">📅 Launch Timeline</h2>
              <div className="space-y-6">
                {/* Phase 1 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <div className="w-0.5 h-full bg-gray-600 mt-2"></div>
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="text-white font-bold text-lg">VIP Early Access</div>
                    <div className="text-cyan-400">January 1, 2026</div>
                    <div className="text-gray-400 mt-2">
                      <ul className="list-disc list-inside space-y-1">
                        <li>1,000 beta testers</li>
                        <li>VIP signup page live </li>
                        <li>Email confirmation working </li>
                        <li>Core features tested</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Phase 2 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <div className="w-0.5 h-full bg-gray-600 mt-2"></div>
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="text-white font-bold text-lg">Full Launch - Baseball</div>
                    <div className="text-yellow-400">February 1, 2026</div>
                    <div className="text-gray-400 mt-2">
                      <ul className="list-disc list-inside space-y-1">
                        <li>Diamond Grind polished</li>
                        <li>10,000 VIP members target</li>
                        <li>Payment processing live</li>
                        <li>Customer support ready</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Phase 3 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-bold text-lg">Sport Rollout</div>
                    <div className="text-purple-400">Every 2-4 weeks after Feb 1</div>
                    <div className="text-gray-400 mt-2">
                      <ul className="list-disc list-inside space-y-1">
                        <li>Basketball (Court Kings)</li>
                        <li>Football (Gridiron Nexus)</li>
                        <li>Soccer (Pitch Pulse)</li>
                        <li>Additional sports based on analytics</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Immediate Priorities */}
            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Immediate Priorities (Next 7 Days)</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 rounded" />
                  <span className="text-white">Build Healthcare Broker module</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 rounded" />
                  <span className="text-white">Build Medical Records Vault (HIPAA)</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 rounded" />
                  <span className="text-white">Polish Diamond Grind for Feb launch</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 rounded" />
                  <span className="text-white">Test all VIP signup flows</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 rounded" />
                  <span className="text-white">Verify email confirmations working</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 rounded" />
                  <span className="text-white">Deploy to GitHub/Vercel for redundancy</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-cyan-500/20 bg-slate-900/80 py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            "The data is the gold. The algorithms are the refinery."
          </p>
          <p className="text-gray-500 text-xs mt-2">
            © 2024-2025 NPI, Inc. A Dozier Holdings Group Company.
          </p>
        </div>
      </footer>
    </div>
  );
}
