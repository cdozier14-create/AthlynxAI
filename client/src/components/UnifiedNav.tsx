import { Link, useLocation } from "wouter";
import { useState } from "react";

const navItems = [
  {
    category: "CORE APPS",
    items: [
      { name: "NIL Portal", href: "/nil-portal", icon: "/logos/nil-portal-logo.png" },
      { name: "Diamond Grind", href: "/diamond-grind", icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/TptlbGHFTBamgRix.png" },
      { name: "Messenger", href: "/messages", icon: "/logos/nil-messenger-logo.png" },
      { name: "NIL Deals", href: "/nil-marketplace", icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/aDzQEREXtGvMmnFc.png" },
    ]
  },
  {
    category: "PLATFORM",
    items: [
      { name: "Home", href: "/home", icon: "🏠" },
      { name: "Playbook", href: "/playbook", icon: "📖" },
      { name: "Dashboard", href: "/dashboard", icon: "📊" },
      { name: "Store", href: "/store", icon: "🛒" },
      { name: "Training", href: "/training", icon: "💪" },
      { name: "Careers", href: "/careers", icon: "💼" },
    ]
  },
  {
    category: "WHITE-LABEL SPORTS",
    items: [
      { name: "Court Kings", href: "/court-kings", icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/IYSXsjNLtHxVaazj.png" },
      { name: "Gridiron Nexus", href: "/gridiron-nexus", icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/HcanzWKcSkXMpmUO.png" },
      { name: "Pitch Pulse", href: "/pitch-pulse", icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/CVjahruZfJTZcuBW.png" },
      { name: "Reel Masters", href: "/reel-masters", icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/aZXZLwryoTRrDQBs.png" },
    ]
  },
  {
    category: "SPECIAL",
    items: [
      { name: "Faith", href: "/faith", icon: "✟" },
      { name: "Military", href: "/military-division", icon: "🎖️" },
      { name: "Transfer Portal", href: "/transfer-portal-intelligence", icon: "🔄" },
      { name: "Medical", href: "/medical", icon: "🏥" },
    ]
  },
  {
    category: "DHG ECOSYSTEM",
    items: [
      { name: "Fuel Bots", href: "/fuel-bots", icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/qUknrdlyPrUZJQYo.png" },
      { name: "DHG Empire", href: "/dhg-empire", icon: "/logos/dhg-crab-logo.png" },
      { name: "Softmor Inc", href: "/softmor", icon: "🧠" },
      { name: "Investor Hub", href: "/investor-hub", icon: "💎" },
      { name: "Investor Deck", href: "/investor-deck", icon: "📊" },
      { name: "Partner Portal", href: "/partner-portal", icon: "🤝" },
    ]
  },
  {
    category: "MANAGEMENT",
    items: [
      { name: "Admin Dashboard", href: "/admin", icon: "⚙️" },
      { name: "Project Management", href: "/project-management", icon: "📋" },
      { name: "Media", href: "/media", icon: "🎬" },
      { name: "Pricing", href: "/pricing", icon: "💰" },
    ]
  }
];

export default function UnifiedNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  return (
    <>
      {/* Floating Nav Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-cyan-500 hover:bg-cyan-400 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Navigation Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Nav Panel */}
          <div className="fixed right-0 top-0 bottom-0 w-80 bg-slate-900/95 backdrop-blur-xl border-l border-cyan-500/30 z-50 overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-xl p-4 border-b border-cyan-500/30">
              <div className="flex items-center gap-3">
                <img src="/logos/dhg-crab-logo.png" alt="DHG" className="w-10 h-10 rounded-full" />
                <div>
                  <h2 className="text-white font-bold">ATHLYNX</h2>
                  <p className="text-cyan-400 text-xs">Navigation Hub</p>
                </div>
              </div>
            </div>

            {/* VIP Access Button */}
            <div className="p-4">
              <Link href="/">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all"
                >
                  🎟️ VIP Early Access
                </button>
              </Link>
            </div>

            {/* Navigation Categories */}
            <div className="p-4 space-y-6">
              {navItems.map((category) => (
                <div key={category.category}>
                  <h3 className="text-gray-500 text-xs font-bold tracking-wider mb-3">{category.category}</h3>
                  <div className="space-y-1">
                    {category.items.map((item) => {
                      const isActive = location === item.href;
                      const isImage = item.icon.startsWith('/') || item.icon.startsWith('http');
                      return (
                        <Link key={item.name} href={item.href}>
                          <button
                            onClick={() => setIsOpen(false)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-left ${
                              isActive 
                                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' 
                                : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                            }`}
                          >
                            {isImage ? (
                              <img src={item.icon} alt={item.name} className="w-6 h-6 rounded-md" />
                            ) : (
                              <span className="w-6 h-6 flex items-center justify-center text-sm">{item.icon}</span>
                            )}
                            <span className="font-medium">{item.name}</span>
                          </button>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-cyan-500/30">
              <Link href="/dhg-empire">
                <span className="text-gray-500 hover:text-cyan-400 text-xs text-center block transition-colors cursor-pointer">
                  © 2025 Dozier Holdings Group
                </span>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
