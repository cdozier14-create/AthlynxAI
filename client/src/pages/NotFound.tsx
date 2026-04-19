import { Link } from "wouter";

const CDN = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/qUknrdlyPrUZJQYo.png";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050c1a] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a3e] via-[#050c1a] to-[#0a0520]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00c2ff]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0066ff]/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,194,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-lg">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center justify-center gap-3 mb-10 cursor-pointer group">
            <img
              src={`${CDN}/athlynx-main-icon_7b5e9ca6.png`}
              alt="ATHLYNX"
              className="w-12 h-12 rounded-xl group-hover:scale-105 transition-transform"
            />
            <div className="text-left">
              <div className="text-white font-black text-xl tracking-tight leading-none">ATHLYNX</div>
              <div className="text-[#00c2ff] text-[10px] tracking-widest uppercase leading-none">The Athlete's Playbook</div>
            </div>
          </div>
        </Link>

        {/* 404 display */}
        <div className="relative mb-6 h-32 flex items-center justify-center">
          <div className="text-[120px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#00c2ff] to-[#0066ff]">
            404
          </div>
        </div>

        <h1 className="text-white text-3xl font-black mb-3">
          Out of Bounds
        </h1>
        <p className="text-white/50 text-base leading-relaxed mb-8">
          Looks like this play didn't make the playbook.<br />
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <button className="px-8 py-3 bg-gradient-to-r from-[#00c2ff] to-[#0066ff] text-white font-black rounded-xl hover:from-[#00b0e8] hover:to-[#0055dd] transition-all hover:scale-105 shadow-xl shadow-[#00c2ff]/20 w-full sm:w-auto">
              🏠 Go Home
            </button>
          </Link>
          <Link href="/feed">
            <button className="px-8 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 hover:border-[#00c2ff]/30 transition-all w-full sm:w-auto">
              📰 Go to Feed
            </button>
          </Link>
          <Link href="/signin">
            <button className="px-8 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 hover:border-[#00c2ff]/30 transition-all w-full sm:w-auto">
              🔑 Sign In
            </button>
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-10 flex flex-wrap gap-2 justify-center">
          {[
            { label: "NIL Portal", href: "/nil-portal" },
            { label: "Transfer Portal", href: "/transfer-portal" },
            { label: "AI Recruiter", href: "/ai-recruiter" },
            { label: "Diamond Grind", href: "/diamond-grind" },
            { label: "Founders", href: "/founders" },
            { label: "Contact", href: "/contact" },
          ].map((link) => (
            <Link key={link.href} href={link.href}>
              <span className="bg-white/5 border border-white/10 text-white/50 hover:text-[#00c2ff] hover:border-[#00c2ff]/30 text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer">
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        <p className="text-white/20 text-xs mt-8">
          ATHLYNX · A Dozier Holdings Group Company · Houston, TX
        </p>
      </div>
    </div>
  );
}
