import PlatformLayout from "@/components/PlatformLayout";
import { Link } from "wouter";

const CDN = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/";

const SUBSIDIARIES = [
  {
    name: "ATHLYNX",
    tagline: "The Crown — The Athlete's Playbook",
    desc: "The flagship platform. 10 AI-powered apps giving every athlete the tools of a professional. NIL deals, recruiting, training, strategy — all in one place.",
    status: "LIVE",
    icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/qUknrdlyPrUZJQYo.png",
    href: "/",
    isCrown: true,
  },
  {
    name: "Softmor",
    tagline: "The Engine — Hardware & Software",
    desc: "The technology backbone that powers the entire DHG empire. Softmor builds the infrastructure, AI systems, and software that runs every platform.",
    status: "LIVE",
    icon: "/logos/dhg-crab-logo.png",
    href: "/softmor",
    isEngine: true,
  },
  {
    name: "NIL Portals",
    tagline: "Name. Image. Likeness.",
    desc: "The dedicated NIL marketplace connecting athletes with brands for life-changing deals. Every athlete deserves to profit from their name.",
    status: "LIVE",
    icon: "/logos/nil-portal-logo.png",
    href: "https://nilportals.com",
  },
  {
    name: "Transfer Portal AI",
    tagline: "Find Your Next Chapter",
    desc: "AI-powered transfer portal helping athletes find the right school, the right program, and the right opportunity to elevate their career.",
    status: "LIVE",
    icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/zXVECIAqcyZDAOuV.png",
    href: "https://transferportal.ai",
  },
  {
    name: "Diamond Grind",
    tagline: "Elite Baseball Training",
    desc: "Performance analytics and training programs built for baseball athletes who refuse to settle. Grind harder. Play smarter.",
    status: "LIVE",
    icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/TptlbGHFTBamgRix.png",
    href: "/diamond-grind",
  },
  {
    name: "Warriors Playbook",
    tagline: "Strategy. Film. Victory.",
    desc: "The digital playbook for coaches and teams. Film room, play designer, and team strategy board — all in one platform.",
    status: "LIVE",
    icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/HcanzWKcSkXMpmUO.png",
    href: "/warriors-playbook",
  },
  {
    name: "aibotecosys",
    tagline: "AI Ecosystem",
    desc: "The AI automation ecosystem powering the next generation of athlete and business intelligence across the DHG portfolio.",
    status: "BUILDING",
    icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/aZXZLwryoTRrDQBs.png",
    href: "https://aibotecosys.com",
  },
  {
    name: "ATHLYNX Robotics",
    tagline: "The Robot Companion — In Every Moment",
    desc: "AI-powered robot companions for athletes — in training, in the stands, on the field, in recovery, and everywhere in between. Robotics partnership currently in development.",
    status: "COMING",
    icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/qUknrdlyPrUZJQYo.png",
    href: "/robotics",
    isRobot: true,
  },
  {
    name: "DHG Media",
    tagline: "Stories Worth Telling",
    desc: "Sports content production and distribution. Athlete stories, brand content, and the media arm of the DHG empire.",
    status: "COMING",
    icon: "/logos/dhg-crab-logo.png",
    href: "#",
  },
];

export default function DHG() {
  return (
    <PlatformLayout>
      <div className="space-y-5 pb-20 lg:pb-6">

        {/* Hero */}
        <div className="relative bg-gradient-to-br from-[#0a1628] via-[#1a3a8f] to-[#0a1628] border border-blue-700 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #0066ff 0%, transparent 70%)" }} />
          <div className="relative p-6 text-center">
            <img
              src={"/logos/dhg-crab-logo.png"}
              alt="Dozier Holdings Group"
              className="w-24 h-24 rounded-3xl object-cover shadow-2xl mx-auto mb-4 border-2 border-blue-500"
            />
            <div className="text-blue-400 text-xs uppercase tracking-[0.3em] mb-1">The Iron Core</div>
            <h1 className="text-3xl font-black text-white mb-1">DOZIER HOLDINGS GROUP</h1>
            <div className="text-blue-300 text-sm font-semibold mb-4">Iron Sharpens Iron</div>
            <div className="w-16 h-0.5 bg-blue-600 mx-auto mb-4" />
            <p className="text-blue-200 text-sm leading-relaxed max-w-lg mx-auto">
              Founded in Houston, TX — November 2024. Born from a hospital room at Hope Lodge, where cancer brought together a group of visionaries who refused to let adversity define their story.
            </p>
          </div>
        </div>

        {/* The Origin Story */}
        <div className="bg-[#1a3a8f] border border-blue-800 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-900 border border-blue-700 flex items-center justify-center text-xl">🦀</div>
            <div>
              <h2 className="text-white font-black text-lg">The Crab. The Cancer. The Crown.</h2>
              <div className="text-blue-400 text-xs">The story behind the symbol</div>
            </div>
          </div>
          <div className="space-y-3 text-blue-200 text-sm leading-relaxed">
            <p>
              The crab is not just a logo. It is the Cancer — the shared diagnosis that brought Chad A. Dozier and every one of his partners together. At Hope Lodge in Houston, strangers became brothers. Survivors became builders.
            </p>
            <p>
              <strong className="text-white">The crown in the center is ATHLYNX</strong> — the crown jewel of the empire. Every athlete deserves a crown. Every athlete deserves a platform built for them.
            </p>
            <p>
              <strong className="text-white">Each leg of the crab is a company</strong> — built together, through the bond of that shared journey. Softmor is the engine. NIL Portals, Transfer Portal AI, Diamond Grind, Warriors Playbook — each leg strengthens the body.
            </p>
            <p>
              <strong className="text-white">Iron sharpens iron.</strong> Every company in the DHG portfolio makes every other company stronger. One solid piece. One mission. One empire.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Founded", value: "2024", sub: "Houston, TX" },
            { label: "Portfolio", value: "8+", sub: "Companies" },
            { label: "Athletes", value: "50K+", sub: "Served" },
            { label: "NIL Value", value: "$12M+", sub: "Deals Closed" },
          ].map((s, i) => (
            <div key={i} className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-3 text-center">
              <div className="text-2xl font-black text-blue-400">{s.value}</div>
              <div className="text-white text-xs font-bold mt-0.5">{s.label}</div>
              <div className="text-blue-500 text-xs">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Leadership */}
        <div className="bg-[#1a3a8f] border border-blue-900 rounded-2xl p-5">
          <h3 className="text-white font-black text-lg mb-4">Leadership</h3>
          <div className="space-y-3">
            {[
              { name: "Chad A. Dozier", title: "Founder & CEO", desc: "Visionary entrepreneur, athlete advocate, and cancer survivor. Built DHG from a hospital room to a billion-dollar vision.", initials: "CD" },
              { name: "Glenn Tse", title: "Co-Founder & Strategic Partner", desc: "Technology leader and cancer survivor. Met Chad at Hope Lodge. Together they turned adversity into an empire.", initials: "GT" },
            ].map((person, i) => (
              <div key={i} className="flex items-start gap-4 bg-[#1530a0] rounded-xl p-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-900 flex items-center justify-center text-sm font-black border-2 border-blue-400 shrink-0 text-white">
                  {person.initials}
                </div>
                <div>
                  <div className="font-black text-white">{person.name}</div>
                  <div className="text-blue-400 text-xs font-semibold mb-1">{person.title}</div>
                  <div className="text-blue-300 text-xs leading-relaxed">{person.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Engine — Softmor */}
        <div className="bg-gradient-to-r from-[#0a1628] to-[#1a3a8f] border border-blue-600 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white"><img src="/logos/dhg-crab-logo.png" alt="Softmor Inc" className="w-full h-full object-contain p-0.5" /></div>
            <div>
              <h3 className="text-white font-black">Softmor — The Engine</h3>
              <div className="text-blue-400 text-xs">Hardware & Software Infrastructure</div>
            </div>
          </div>
          <p className="text-blue-200 text-sm leading-relaxed">
            Softmor is the hardware and software backbone that runs the entire DHG engine. Every platform, every AI tool, every data pipeline — Softmor builds and powers it. Without the engine, the empire doesn't move.
          </p>
        </div>

        {/* Portfolio — The Legs */}
        <div className="bg-[#1a3a8f] border border-blue-900 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🦀</span>
            <h3 className="text-white font-black text-lg">The Legs — DHG Portfolio</h3>
          </div>
          <div className="space-y-3">
            {SUBSIDIARIES.map((co, i) => (
              <a
                key={i}
                href={co.href}
                target={co.href.startsWith("http") ? "_blank" : undefined}
                rel={co.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`flex items-center gap-4 rounded-xl p-4 transition-all hover:scale-[1.01] cursor-pointer block ${
                  co.isCrown
                    ? "bg-gradient-to-r from-[#0066ff]/20 to-[#1530a0] border border-blue-500"
                    : co.isEngine
                    ? "bg-gradient-to-r from-[#1530a0] to-[#0a1628] border border-blue-700"
                    : "bg-[#1530a0] border border-blue-900"
                }`}
              >
                <img src={co.icon} alt={co.name} className="w-12 h-12 rounded-xl object-cover shadow-lg shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-black text-white">{co.name}</span>
                    {co.isCrown && <span className="text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded-full font-bold">👑 CROWN</span>}
                    {co.isEngine && <span className="text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full font-bold">⚙️ ENGINE</span>}
                    {(co as any).isRobot && <span className="text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded-full font-bold">🤖 ROBOT</span>}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      co.status === "LIVE" ? "bg-green-900 text-green-400" :
                      co.status === "BUILDING" ? "bg-blue-900 text-blue-400" :
                      "bg-gray-800 text-gray-400"
                    }`}>{co.status}</span>
                  </div>
                  <div className="text-blue-400 text-xs font-semibold">{co.tagline}</div>
                  <div className="text-blue-300 text-xs mt-0.5 leading-relaxed line-clamp-2">{co.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div className="bg-gradient-to-br from-[#0a1628] to-[#1a3a8f] border border-blue-700 rounded-2xl p-5 text-center">
          <div className="text-4xl mb-3">🦀</div>
          <h3 className="text-white font-black text-xl mb-2">Iron Sharpens Iron</h3>
          <p className="text-blue-200 text-sm leading-relaxed max-w-md mx-auto mb-4">
            Every company in the DHG portfolio makes every other company stronger. We don't compete — we compound. One body. One mission. Every leg matters.
          </p>
          <div className="text-blue-400 text-xs uppercase tracking-widest">Dozier Holdings Group • Houston, TX • Est. 2024</div>
        </div>

        {/* Videos */}
        <div className="space-y-4">
          <div className="bg-[#1a3a8f] border border-blue-900 rounded-2xl overflow-hidden">
            <video className="w-full" controls muted loop playsInline>
              <source src={"https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/mQeioRPSvzxsvCcY.mov"} type="video/mp4" />
            </video>
            <div className="p-3 text-center text-blue-300 text-sm font-semibold">DHG Corporate Overview</div>
          </div>
          <div className="bg-[#1a3a8f] border border-blue-900 rounded-2xl overflow-hidden">
            <video className="w-full" controls muted loop playsInline>
              <source src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/xnXNQvBUfirjVkId.mp4" type="video/mp4" />
            </video>
            <div className="p-3 text-center text-blue-300 text-sm font-semibold">DHG AI Compute & Data Centers</div>
          </div>
          <div className="bg-[#1a3a8f] border border-blue-900 rounded-2xl overflow-hidden">
            <video className="w-full" controls muted loop playsInline>
              <source src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/mQeioRPSvzxsvCcY.mov" type="video/mp4" />
            </video>
            <div className="p-3 text-center text-blue-300 text-sm font-semibold">DHG Urban Innovation & City Hubs</div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-[#1a3a8f] border border-blue-900 rounded-2xl p-5">
          <h3 className="text-white font-black mb-3">Contact DHG</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3 text-blue-200">
              <span className="text-blue-500">📍</span>
              <span>19039 Cloyanna Ln, Humble TX 77346</span>
            </div>
            <div className="flex items-center gap-3 text-blue-200">
              <span className="text-blue-500">✉️</span>
              <a href="mailto:cdozier@dozierholdingsgroup.com" className="hover:text-white transition-colors">cdozier@dozierholdingsgroup.com</a>
            </div>
            <div className="flex items-center gap-3 text-blue-200">
              <span className="text-blue-500">🌐</span>
              <a href="/dhg" className="hover:text-white transition-colors">DHG Corporate Site</a>
            </div>
          </div>
        </div>

      </div>
    </PlatformLayout>
  );
}
