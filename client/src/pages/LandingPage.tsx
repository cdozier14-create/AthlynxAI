  const apps = [
    { name: "Portal", icon: "/portal-icon.png", badge: "LIVE", color: "bg-cyan-500", link: "/portal" },
    { name: "Messenger", icon: "/messenger-icon.png", badge: "LIVE", color: "bg-blue-500", link: "/comms" },
    { name: "Diamond Grind", icon: "/diamond-grind-icon.png", badge: "NEW", color: "bg-purple-500", link: "/diamond-grind" },
    { name: "Warriors Playbook", icon: "/warriors-playbook-icon.png", badge: "HOT", color: "bg-red-500", link: "/warriors-playbook" },
    { name: "Transfer Portal", icon: "/transfer-portal-icon.png", badge: "ELITE", color: "bg-orange-500", link: "/transfer-portal" },
    { name: "NIL Vault", icon: "/nil-portal-icon.png", badge: "$$$", color: "bg-green-500", link: "/nil-vault" },
    { name: "AI Sales", icon: "/athlynx-logo-icon.png", badge: "AI", color: "bg-pink-500", link: "/ai-sales" },
    { name: "Faith", icon: "/faith-app-icon.png", badge: "BLESSED", color: "bg-yellow-500", link: "/faith" },
    { name: "AI Recruiter", icon: "/athlynx-logo-icon.png", badge: "AI", color: "bg-indigo-500", link: "/ai-recruiter" },
    { name: "AI Content", icon: "/athlynx-logo-icon.png", badge: "AI", color: "bg-teal-500", link: "/ai-content" },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* SECTION 1: TEAL STATUS BAR */}
      <div className="bg-teal-600 text-white text-center py-2 px-4">
        <div className="flex items-center justify-center gap-2 text-sm font-medium">
          <span>PLATFORM</span>
          <span className="text-teal-300">•</span>
          <span>compliant</span>
          <span className="text-teal-300">•</span>
          <span>precious cargo</span>
        </div>
      </div>

      {/* SECTION 2: YELLOW BANNER */}
      <div className="bg-yellow-400 text-slate-900 text-center py-3 px-4">
        <p className="text-sm font-bold">
          🚧 SITE UPDATING LIVE DAILY - Please be patient with us while we add future updates and apps!
        </p>
      </div>

      {/* SECTION 3: MAIN WHITE CARD */}
      <div className="px-4 py-6">