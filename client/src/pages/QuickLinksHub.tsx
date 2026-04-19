import { Link } from "wouter";

const systems = {
  core: [
    { name: "Portal Website", description: "Main marketing site with features, pricing, and athlete showcase", icon: "/images/website-logo.png", link: "/" },
    { name: "NIL Portal App", description: "Instagram-style social feed for athletes to build their brand", icon: "/images/mobile-app-logo.png", link: "/apps" },
    { name: "NIL Messenger", description: "Private messaging for agents, lawyers, and business conversations", icon: "/images/messenger-icon.jpeg", link: "/messages" },
    { name: "Transfer Portal", description: "Track athletes, NIL valuations, connect with scouts", icon: "/images/nil-portal-icon.jpeg", link: "/transfer-portal", featured: true },
  ],
  management: [
    { name: "User Management", description: "Manage athletes, agents, brands, and subscriber accounts", icon: "/images/users-logo.png", link: "/dashboard" },
    { name: "Admin Dashboard", description: "System settings, configurations, and platform controls", icon: "/images/admin-logo.png", link: "/project-management" },
    { name: "Deals Marketplace", description: "Browse and manage NIL deals, sponsorships, and endorsements", icon: "/images/deals-logo.png", link: "/nil-marketplace" },
    { name: "Video Upload", description: "Upload and manage athlete highlight reels and content", icon: "/images/videos-logo.png", link: "/media" },
    { name: "Analytics Dashboard", description: "Platform metrics, user engagement, and revenue tracking", icon: "/images/analytics-logo.png", link: "/athlete-dashboard" },
    { name: "Contract Management", description: "Create, sign, and manage NIL contracts and agreements", icon: "/images/contracts-logo.png", link: "/nil-marketplace" },
  ],
  athlete: [
    { name: "Fuel Bots", description: "AI robotic trainers for performance optimization", icon: "/images/fuelbots-logo.png", link: "/ai/training" },
    { name: "Wellness & Performance", description: "Mental and physical health support for athletes", icon: "/images/wellness-logo.png", link: "/medical" },
    { name: "Diamond Grind", description: "Baseball-specific training and analytics platform", icon: "/images/diamond-grind-icon.png", link: "/diamond-grind" },
  ],
  corporate: [
    { name: "DHG Corporate", description: "Dozier Holdings Group corporate structure and leadership", icon: "/images/dhg-logo.png", link: "/dhg" },
    { name: "Softmor Inc", description: "Technology division - ATHLYNX platform development", icon: "/images/hub-logo.png", link: "/softmor" },
  ],
};

export default function QuickLinksHub() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
      {/* Header */}
      <div className="text-center py-10 border-b border-white/10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/QNTbeHFuYniqJHLn.png" alt="NIL Portal" className="w-16 h-16 rounded-xl" />
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            NIL Portal
          </h1>
        </div>
        <p className="text-white/60">Complete Athlete Ecosystem - 14 Integrated Systems</p>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-10">
        {/* Core Applications */}
        <h2 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-5 pl-1">Core Applications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {systems.core.map((system) => (
            <Link key={system.name} href={system.link}>
              <div className={`bg-white/5 border rounded-2xl p-6 text-center cursor-pointer transition-all hover:bg-white/10 hover:-translate-y-1 hover:shadow-2xl ${system.featured ? 'border-2 border-amber-500 bg-gradient-to-br from-amber-500/10 to-white/5' : 'border-white/10 hover:border-blue-500'}`}>
                <img src={system.icon} alt={system.name} className="w-16 h-16 rounded-xl mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{system.name}</h3>
                <p className="text-sm text-white/60 mb-4">{system.description}</p>
                <span className="text-sm font-semibold text-blue-500">Open →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Management Systems */}
        <h2 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-5 pl-1">Management Systems</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {systems.management.map((system) => (
            <Link key={system.name} href={system.link}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center cursor-pointer transition-all hover:bg-white/10 hover:-translate-y-1 hover:shadow-2xl hover:border-blue-500">
                <img src={system.icon} alt={system.name} className="w-16 h-16 rounded-xl mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{system.name}</h3>
                <p className="text-sm text-white/60 mb-4">{system.description}</p>
                <span className="text-sm font-semibold text-blue-500">Open →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Athlete Services */}
        <h2 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-5 pl-1">Athlete Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {systems.athlete.map((system) => (
            <Link key={system.name} href={system.link}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center cursor-pointer transition-all hover:bg-white/10 hover:-translate-y-1 hover:shadow-2xl hover:border-blue-500">
                <img src={system.icon} alt={system.name} className="w-16 h-16 rounded-xl mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{system.name}</h3>
                <p className="text-sm text-white/60 mb-4">{system.description}</p>
                <span className="text-sm font-semibold text-blue-500">Explore →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Corporate */}
        <h2 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-5 pl-1">Corporate</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {systems.corporate.map((system) => (
            <Link key={system.name} href={system.link}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center cursor-pointer transition-all hover:bg-white/10 hover:-translate-y-1 hover:shadow-2xl hover:border-blue-500">
                <img src={system.icon} alt={system.name} className="w-16 h-16 rounded-xl mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{system.name}</h3>
                <p className="text-sm text-white/60 mb-4">{system.description}</p>
                <span className="text-sm font-semibold text-blue-500">View →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 border-t border-white/10">
        <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/QNTbeHFuYniqJHLn.png" alt="NIL Portal" className="w-10 h-10 rounded-lg mx-auto mb-3" />
        <p className="text-white font-semibold">NIL Portal Inc. - A Dozier Holdings Group Company</p>
        <p className="text-white/50 text-sm mt-1">14 integrated systems with shared database</p>
        <p className="text-white/50 text-sm mt-2">© 2024 NIL Portal Inc. All rights reserved.</p>
      </div>
    </div>
  );
}
