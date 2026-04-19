// v1.0.2 - Apr 18 2026
import { Link } from "wouter";
import { useState, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
// InstallAppModal replaced by slim PWAInstallBanner auto-shown at bottom

const APPS = [
  { id: "nil-portal", label: "NIL Portal™", icon: "/logos/nil-portal-logo.png", badge: "LIVE", href: "/nil-portal", desc: "Manage your NIL deals" },
  { id: "messenger", label: "Messenger™", icon: "/logos/nil-messenger-logo.png", badge: "LIVE", href: "/messenger", desc: "Connect with coaches & brands" },
  { id: "diamond-grind", label: "Diamond Grind™", icon: "/diamond-grind-baseball-icon.png", badge: "NEW", href: "/diamond-grind", desc: "Baseball training platform" },
  { id: "warriors-playbook", label: "Warriors Playbook™", icon: "/warriors-playbook-icon.png", badge: "HOT", href: "/warriors-playbook", desc: "Plays, film & strategy" },
  { id: "transfer-portal", label: "Transfer Portal™", icon: "/transfer-portal-icon.png", badge: "LIVE", href: "/transfer-portal", desc: "Find your next school" },
  { id: "nil-vault", label: "NIL Vault™", icon: "/nil-vault-icon.png", badge: "ELITE", href: "/nil-vault", desc: "Secure your contracts" },
  { id: "ai-sales", label: "AI Sales™", icon: "/ai-sales.png", badge: "AI", href: "/ai-sales", desc: "Close brand deals with AI" },
  { id: "faith", label: "Faith™", icon: "/faith-icon.png", badge: "FAITH", href: "/faith", desc: "Daily athlete devotionals" },
  { id: "ai-recruiter", label: "AI Recruiter™", icon: "/ai-recruiter.png", badge: "AI", href: "/ai-recruiter", desc: "Optimize your recruiting" },
  { id: "ai-content", label: "AI Content™", icon: "/ai-content.png", badge: "BLEND", href: "/ai-content", desc: "Create viral content" },
  { id: "infrastructure", label: "Infrastructure™", icon: "/economic-vision.png", badge: "TECH", href: "/infrastructure", desc: "Data centers & AI tech" },
  { id: "gridiron-nexus", label: "Gridiron Nexus™", icon: "/gridiron-nexus-icon.png", badge: "FOOTBALL", href: "/gridiron-nexus", desc: "Elite football platform" },
  { id: "pitch-pulse", label: "Pitch Pulse™", icon: "/pitch-pulse-icon.png", badge: "SOCCER", href: "/pitch-pulse", desc: "Global soccer ecosystem" },
  { id: "court-kings", label: "Court Kings™", icon: "/court-kings-icon.png", badge: "HOOPS", href: "/court-kings", desc: "Basketball AAU & NIL" },
  { id: "reel-masters", label: "Reel Masters™", icon: "/reel-masters-icon.png", badge: "FISHING", href: "/reel-masters", desc: "Ultimate fishing platform" },
  { id: "marketplace", label: "Marketplace™", icon: "/athlynx-app-icon.png", badge: "SHOP", href: "/marketplace", desc: "Athlete gear & deals" },
  { id: "athlete-dashboard", label: "My Dashboard™", icon: "/professional-athlete-dashboard.png", badge: "PERSONAL", href: "/athlete-dashboard", desc: "Your athlete command center" },
  { id: "community-feedback", label: "Community™", icon: "/fuelbots-icon.png", badge: "VOICE", href: "/community-feedback", desc: "Shape the platform" },
  { id: "mobile-app", label: "Mobile App™", icon: "/images/logos/mobile-app-icon.png", badge: "BETA", href: "/mobile-app", desc: "ATHLYNX in your pocket" },
];

const BADGE_COLORS: Record<string, string> = {
  LIVE: "bg-green-600",
  NEW: "bg-blue-600",
  HOT: "bg-orange-500",
  ELITE: "bg-purple-600",
  AI: "bg-cyan-600",
  BLEND: "bg-pink-600",
  SOON: "bg-yellow-600",
  TECH: "bg-emerald-700",
  FOOTBALL: "bg-red-700",
  SOCCER: "bg-green-700",
  HOOPS: "bg-purple-700",
  FISHING: "bg-cyan-700",
  SHOP: "bg-blue-700",
  PERSONAL: "bg-indigo-700",
  VOICE: "bg-pink-700",
  BETA: "bg-orange-700",
};

const DEMO_VIDEO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/kmXGpMmslwPdeWYO.mp4";

const CRAB_LOGO_VIDEO = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/ImBnRmTCxfoaENos.mp4";

const VIDEOS = [
  { file: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/SyHtmDgqKAycRzBN.mp4", title: "ATHLYNX — The Multi-Sport Empire", badge: "HOT" },
  { file: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/ImBnRmTCxfoaENos.mp4", title: "NIL Portal Baseball", badge: "HOT" },
  { file: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/SNHQDsOUVYFJwfUT.mp4", title: "NIL Portal Football", badge: "LIVE" },
  { file: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/exlwMUmNOQhJjidX.mp4", title: "Diamond Grind Baseball", badge: "NEW" },
  { file: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/ZfMgzTWXcpwXcMCt.mp4", title: "Softmor AI", badge: "AI" },
  { file: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/SwXAovMVYCnPjnZu.mp4", title: "Softmor — The Future", badge: "AI" },
  { file: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/RdxGMXGkDjZBeGeL.mp4", title: "DHG Empire", badge: "ELITE" },
  { file: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/eGLqGNCLommoTHsR.mp4", title: "DHG Empire II", badge: "ELITE" },
];

// ─── Mobile Nav Menu ────────────────────────────────────────────────────────
type MobileSection = { label: string; links: { href: string; label: string }[] };
const MOBILE_NAV_SECTIONS: MobileSection[] = [
  {
    label: "Platform",
    links: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/feed", label: "My Feed" },
      { href: "/athlete-playbook", label: "Athlete Playbook" },
      { href: "/athlete-journey", label: "Athlete Journey" },
      { href: "/athlete-dashboard", label: "Athlete Dashboard" },
      { href: "/nil-portal", label: "NIL Portal" },
      { href: "/nil-calculator", label: "NIL Calculator" },
      { href: "/nil-vault", label: "NIL Vault" },
      { href: "/transfer-portal", label: "Transfer Portal" },
      { href: "/nil-marketplace", label: "Marketplace" },
    ],
  },
  {
    label: "AI Bots",
    links: [
      { href: "/wizard-hub", label: "Wizard Hub" },
      { href: "/ai-sales", label: "AI Sales Bot" },
      { href: "/ai-recruiter", label: "AI Recruiter" },
      { href: "/ai-content", label: "AI Content" },
      { href: "/ai-training-bot", label: "Training Bot" },
      { href: "/fuel-bots", label: "Fuel Bots" },
      { href: "/team-bots", label: "Team Bots" },
    ],
  },
  {
    label: "Sports",
    links: [
      { href: "/gridiron-nexus", label: "Gridiron Nexus" },
      { href: "/diamond-grind", label: "Diamond Grind" },
      { href: "/court-kings", label: "Court Kings" },
      { href: "/net-setters", label: "Net Setters" },
      { href: "/fairway-elite", label: "Fairway Elite" },
      { href: "/mat-warriors", label: "Mat Warriors" },
      { href: "/swim-surge", label: "Swim Surge" },
      { href: "/track-elite", label: "Track Elite" },
      { href: "/reel-masters", label: "Reel Masters" },
      { href: "/ice-breakers", label: "Ice Breakers" },
    ],
  },
  {
    label: "Business",
    links: [
      { href: "/crm", label: "CRM" },
      { href: "/comms-hub", label: "Comms Hub" },
      { href: "/social-hub", label: "Social Hub" },
      { href: "/studio", label: "Studio" },
      { href: "/podcast", label: "Podcast" },
      { href: "/legal-hub", label: "Legal Hub" },
      { href: "/contracts", label: "Contracts" },
      { href: "/faith", label: "Faith" },
    ],
  },
  {
    label: "Companies",
    links: [
      { href: "/dhg", label: "Dozier Holdings Group" },
      { href: "/softmor", label: "Softmor Inc" },
      { href: "/warriors-playbook", label: "Warriors Playbook" },
      { href: "/pitch-pulse", label: "Pitch Pulse" },
      { href: "/white-label", label: "White Label" },
      { href: "/partner-portal", label: "Partner Portal" },
    ],
  },
];

function MobileNavMenu({ onClose, onInstall }: { onClose: () => void; onInstall: () => void }) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  return (
    <div className="md:hidden bg-[#0a1628] border-t border-blue-900 overflow-y-auto max-h-[80vh]">
      {/* PWA Install CTA */}
      <button
        onClick={onInstall}
        className="w-full flex items-center gap-3 bg-green-700 hover:bg-green-600 text-white font-black px-4 py-4 border-b border-blue-900/60 transition-colors"
      >
        <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
        <div className="text-left">
          <div className="text-white font-black text-sm">Add ATHLYNX to Your Phone</div>
          <div className="text-green-200 text-xs font-normal">Works like a native app — no App Store needed</div>
        </div>
      </button>
      {/* Quick links */}
      <div className="px-4 py-3 flex flex-col gap-0">
        <Link href="/feed" className="flex items-center gap-3 text-white font-bold py-3.5 border-b border-blue-900/40 text-sm" onClick={onClose}>ENTER PLATFORM</Link>
        <Link href="/demo" className="flex items-center gap-3 text-yellow-300 font-bold py-3.5 border-b border-blue-900/40 text-sm" onClick={onClose}>HOW IT WORKS</Link>
        <Link href="/pricing" className="flex items-center gap-3 text-white py-3.5 border-b border-blue-900/40 text-sm" onClick={onClose}>PRICING</Link>
        <Link href="/founders" className="flex items-center gap-3 text-white py-3.5 border-b border-blue-900/40 text-sm" onClick={onClose}>FOUNDERS</Link>
      </div>
      {/* Collapsible sections */}
      {MOBILE_NAV_SECTIONS.map(section => (
        <div key={section.label} className="border-t border-blue-900/60">
          <button
            onClick={() => setOpenSection(openSection === section.label ? null : section.label)}
            className="w-full flex items-center justify-between px-4 py-3.5 text-white font-bold text-sm hover:bg-blue-900/30 transition-colors"
          >
            <span>{section.label}</span>
            <span className="text-blue-400 text-xs">{openSection === section.label ? '▲' : '▼'}</span>
          </button>
          {openSection === section.label && (
            <div className="bg-[#060e1f] px-4 pb-2">
              {section.links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-blue-200 py-2.5 border-b border-blue-900/30 text-sm hover:text-white transition-colors"
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
      {/* Auth buttons */}
      <div className="px-4 py-4 flex flex-col gap-2 border-t border-blue-900">
        <Link href="/signup" className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black px-4 py-4 rounded-2xl text-base" onClick={onClose}>JOIN FREE — 7 DAYS</Link>
        <Link href="/signin" className="flex items-center justify-center gap-2 bg-blue-600 text-white font-bold px-4 py-4 rounded-2xl text-base" onClick={onClose}>SIGN IN</Link>
      </div>
    </div>
  );
}

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, [targetDate]);
  return timeLeft;
}

const ATHLYNX_LOGO = "/images/logos/athlynx-main-logo.png";

function VideoCard({ video }: { video: { file: string; title: string; badge: string } }) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement | null>(null);

  const handlePlay = () => {
    if (ref.current) {
      ref.current.play();
      setPlaying(true);
    }
  };

  return (
    <div className="group bg-[#1a3a8f] rounded-xl overflow-hidden border border-blue-700 hover:border-blue-400 transition-all duration-200 shadow-lg hover:shadow-blue-900/60">
      {/* Thumbnail / video area */}
      <div className="relative aspect-video bg-[#0d1b3e] flex items-center justify-center overflow-hidden">
        {/* ATHLYNX logo thumbnail — always visible until play */}
        {!playing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#1a3a8f] to-[#0d1b3e] z-10">
            <img
              src={ATHLYNX_LOGO}
              alt="ATHLYNX"
              className="w-20 h-20 rounded-2xl shadow-2xl mb-3 object-cover"
            />
            <div className="text-white font-black text-base tracking-wide">ATHLYNX</div>
            <div className="text-blue-300 text-[10px] tracking-widest mt-0.5">THE ATHLETE'S PLAYBOOK</div>
          </div>
        )}
        <video
          ref={ref}
          className="w-full h-full object-cover"
          muted
          playsInline
          controls={playing}
          onEnded={() => setPlaying(false)}
        >
          <source src={video.file} />
        </video>
        {/* Play button overlay */}
        {!playing && (
          <button
            onClick={handlePlay}
            className="absolute z-20 w-14 h-14 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110"
            aria-label="Play video"
          >
            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        )}
      </div>
      {/* Card footer */}
      <div className="px-4 py-3 bg-[#1a3a8f] flex items-center justify-between">
        <div>
          <div className="text-white font-bold text-sm leading-tight">{video.title}</div>
          <div className="text-blue-400 text-[10px] mt-0.5">Click to play</div>
        </div>
        <span className={`text-[9px] font-black px-2 py-1 rounded-full text-white ${BADGE_COLORS[video.badge] ?? 'bg-blue-700'}`}>{video.badge}</span>
      </div>
    </div>
  );
}

const LAUNCH_TARGET_DATE = new Date("2026-07-01T00:00:00");

function HeroVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    vid.playsInline = true;
    const tryPlay = () => {
      vid.play().catch(() => {
        // Retry once after a short delay (handles iOS timing)
        setTimeout(() => vid.play().catch(() => {}), 500);
      });
    };
    if (vid.readyState >= 3) {
      tryPlay();
    } else {
      vid.addEventListener('canplay', tryPlay, { once: true });
    }
    return () => vid.removeEventListener('canplay', tryPlay);
  }, [src]);
  return (
    <video
      ref={videoRef}
      className="w-full h-full absolute inset-0 object-cover"
      style={{ minHeight: '500px' }}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

function HeroSignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [, navigate] = useLocation();
  const joinMutation = trpc.waitlist.join.useMutation({
    onSuccess: () => {
      setDone(true);
      setTimeout(() => navigate("/feed"), 1800);
    },
    onError: (err) => setError(err.message),
  });
  if (done) {
    return (
      <div className="bg-green-900/40 border border-green-500 rounded-2xl p-6 text-center">
        <div className="text-3xl mb-2"><svg className="w-10 h-10 text-green-400 mx-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>
        <div className="text-green-300 font-black text-xl">YOU'RE IN!</div>
        <div className="text-green-200 text-sm mt-1">Welcome to ATHLYNX. Taking you to the platform...</div>
      </div>
    );
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setError("");
        if (!name.trim() || !email.trim()) { setError("Name and email are required."); return; }
        joinMutation.mutate({ fullName: name.trim(), email: email.trim(), role: "athlete" });
      }}
      className="flex flex-col gap-3"
    >
      <input
        type="text"
        placeholder="Your Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full bg-[#0d1b3e] border border-blue-700 text-white placeholder-blue-500 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
      />
      <input
        type="email"
        placeholder="Your Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full bg-[#0d1b3e] border border-blue-700 text-white placeholder-blue-500 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={joinMutation.isPending}
        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-black text-lg py-4 rounded-xl transition-all shadow-xl hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed tracking-wide"
      >
        {joinMutation.isPending ? "JOINING..." : "GET INSTANT ACCESS →"}
      </button>
    </form>
  );
}

export default function Home() {
  const countdown = useCountdown(LAUNCH_TARGET_DATE);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // installOpen removed — PWAInstallBanner shows automatically as slim bottom bar

  return (
    <div className="min-h-screen bg-[#1a3a8f] text-white">
      {/* ═══ INVESTOR BANNER — ABSOLUTE TOP ═══ */}
      <Link href="/investor-hub">
        <div className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 text-black cursor-pointer hover:from-yellow-300 hover:to-yellow-300 transition-all">
          <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
            <span className="font-black text-xs sm:text-sm tracking-widest uppercase">ATHLYNX IS ACTIVELY SEEKING INVESTORS &amp; STRATEGIC PARTNERS</span>
            <span className="hidden sm:flex items-center gap-1 text-xs font-bold bg-black/15 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-700 rounded-full animate-pulse"></span>
              Pre-Seed Round · $130B Market
            </span>
            <span className="font-black text-xs sm:text-sm border-b-2 border-black/40 hover:border-black transition-colors">VIEW INVESTOR DECK →</span>
          </div>
        </div>
      </Link>
      {/* Announcement bar */}
      <div className="bg-[#1e4bb8] text-center text-xs py-1.5 tracking-widest font-semibold text-blue-200">
        THE FUTURE OF ATHLETE SUCCESS
      </div>

      {/* Header */}
      <header className="bg-[#1a3a8f] border-b border-blue-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <img src="/images/logos/athlynx-main-logo.png" alt="ATHLYNX" className="w-10 h-10 rounded-lg object-contain flex-shrink-0" style={{ minWidth: '40px', minHeight: '40px' }} />
            <div>
              <div className="text-white font-black text-lg leading-none tracking-wide">ATHLYNX</div>
              <div className="text-blue-400 text-[9px] tracking-widest">THE ATHLETE'S PLAYBOOK</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-blue-400">
            <Link href="/dhg" className="hover:text-white transition-colors">PARENT COMPANY: DOZIER HOLDINGS GROUP</Link>
          </div>
          {/* Desktop nav buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/demo" className="text-xs border border-yellow-600 text-yellow-300 hover:bg-yellow-900 px-3 py-1.5 rounded-lg transition-colors font-bold">
              HOW IT WORKS
            </Link>
            <Link href="/pricing" className="text-xs border border-blue-700 text-blue-300 hover:bg-blue-800 px-3 py-1.5 rounded-lg transition-colors">
              PRICING
            </Link>
            <Link href="/founders" className="text-xs border border-blue-700 text-blue-300 hover:bg-blue-800 px-3 py-1.5 rounded-lg transition-colors">
              FOUNDERS
            </Link>
            <Link href="/signup" className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black px-4 py-1.5 rounded-lg font-black transition-all shadow-lg shadow-orange-900/40 hover:scale-105">
              JOIN FREE — 7 DAYS
            </Link>
            <Link href="/signin" className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg font-bold transition-colors">
              SIGN IN
            </Link>
            <button
              onClick={() => { localStorage.removeItem('athlynx_pwa_dismissed_v2'); window.dispatchEvent(new Event('athlynx-show-pwa')); }}
              className="text-xs bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg> Add to Phone
            </button>
          </div>
          {/* Mobile hamburger button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5 rounded-xl hover:bg-blue-800 transition-colors border border-blue-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className={`block w-5 h-0.5 bg-white transition-all duration-200 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-white transition-all duration-200 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
        {/* Mobile dropdown menu */}
        {menuOpen && (
          <MobileNavMenu onClose={() => setMenuOpen(false)} onInstall={() => { localStorage.removeItem('athlynx_pwa_dismissed_v2'); setMenuOpen(false); window.dispatchEvent(new Event('athlynx-show-pwa')); }} />
        )}
      </header>

      {/* Status bar */}
      <div className="bg-[#1530a0] border-b border-blue-900 py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-6 text-xs">
          <span className="flex items-center gap-1.5 text-green-400"><span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>LIVE PLATFORM</span>
          <span className="text-blue-400">|</span>
          <span className="text-blue-300">HIPAA-COMPLIANT</span>
          <span className="text-blue-400">|</span>
          <span className="text-blue-300">PROTECTING OUR PRECIOUS CARGO</span>
        </div>
      </div>

      {/* Version banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-center py-1.5 text-xs font-bold tracking-widest text-blue-200 border-b border-blue-700">
        PLATFORM v1.0 &nbsp;·&nbsp; JULY 1, 2026 FULL LAUNCH
      </div>

      {/* Hero video — ATHLYNX Multi-Sport Empire */}
      <section className="relative bg-[#060e24] min-h-[500px] md:min-h-[600px]">
        <HeroVideo src={CRAB_LOGO_VIDEO} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060e24] via-[#0d1b3e]/40 to-transparent pointer-events-none"></div>
        <div className="relative z-10 min-h-[500px] md:min-h-[600px] flex flex-col items-center justify-center pt-6 pb-10 px-4 text-center">

          <div>
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500 text-yellow-300 text-xs font-black px-4 py-1.5 rounded-full mb-4 tracking-widest">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            OFFICIAL PLATFORM DEMO
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-2xl">
            THE ATHLETE'S PLAYBOOK
          </h1>
          <p className="text-blue-200 text-lg mt-2 drop-shadow font-semibold">One platform. Every tool. Unlimited potential.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
            <Link href="/feed" className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black text-lg px-8 py-3 rounded-xl transition-all shadow-xl hover:scale-105">
              ENTER THE PLATFORM →
            </Link>
            <Link href="/demo" className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-black text-lg px-8 py-3 rounded-xl transition-all shadow-xl hover:scale-105">
              HOW IT WORKS
            </Link>
          </div>
          </div>
        </div>
      </section>

      {/* === SIGN UP CTA — Above the fold, immediate access === */}
      <section className="bg-gradient-to-b from-[#060e24] to-[#0d1b3e] py-10 px-4 border-b border-blue-900">
        <div className="max-w-lg mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500 text-yellow-300 text-xs font-black px-4 py-1.5 rounded-full mb-4 tracking-widest">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            FREE 7-DAY ACCESS — NO CREDIT CARD
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2">JOIN ATHLYNX FREE</h2>
          <p className="text-blue-300 text-base mb-6">Get instant access to 20+ athlete tools — NIL Portal, AI Trainer, Transfer Portal, Messenger &amp; more.</p>
          <HeroSignupForm />
          <p className="text-blue-500 text-xs mt-3">Already have an account? <Link href="/signin" className="text-blue-300 underline">Sign In</Link></p>
        </div>
      </section>

      {/* DHG Heavyweight Champion section */}
      <section className="bg-[#1a3a8f] border-y border-blue-900 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a href="https://dozierholdingsgroup.com" target="_blank" rel="noopener noreferrer">
              <img src="/images/logos/dhg-logo.png" alt="Dozier Holdings Group" className="w-16 h-16 rounded-xl object-cover hover:opacity-85 transition-opacity cursor-pointer" />
            </a>
            <div>
              <div className="text-blue-400 text-xs uppercase tracking-widest">Heavyweight Champion</div>
              <a href="https://dozierholdingsgroup.com" target="_blank" rel="noopener noreferrer" className="text-white font-black text-xl hover:text-blue-200 transition-colors block">DOZIER HOLDINGS GROUP</a>
              <div className="text-blue-300 text-sm">The empire behind the platform</div>
            </div>
          </div>
          <a href="https://dozierholdingsgroup.com" target="_blank" rel="noopener noreferrer" className="text-sm border border-blue-600 text-blue-300 hover:bg-blue-800 px-4 py-2 rounded-lg transition-colors">
            Visit Dozier Holdings Group →
          </a>
        </div>
      </section>

      {/* 10 Apps Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-blue-400 text-xs uppercase tracking-widest mb-1">The Ecosystem</div>
            <h2 className="text-3xl font-black text-white">THE FULL ECOSYSTEM</h2>
            <p className="text-blue-300 mt-2">20 platforms. One mission. Built from 4 years of vision.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {APPS.map(app => (
              <Link key={app.id} href={app.href} className="group bg-[#1a3a8f] hover:bg-[#1a3a8f] border border-blue-900 hover:border-blue-600 rounded-xl p-4 flex flex-col items-center gap-3 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-blue-900/50">
                <div className="relative">
                  <img src={app.icon} alt={app.label} className="w-16 h-16 rounded-2xl object-cover shadow-lg" />
                  {app.badge && (
                    <span className={`absolute -top-1.5 -right-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full text-white ${BADGE_COLORS[app.badge]}`}>
                      {app.badge}
                    </span>
                  )}
                </div>
                <div className="text-center">
                  <div className="text-white font-bold text-sm leading-tight">{app.label}</div>
                  <div className="text-blue-400 text-[10px] mt-0.5 leading-tight">{app.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-12 px-4 bg-[#0d1b3e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-blue-400 text-xs uppercase tracking-widest mb-1">See It In Action</div>
            <h2 className="text-3xl font-black text-white">PLATFORM HIGHLIGHTS</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VIDEOS.map((video, i) => (
              <VideoCard key={i} video={video} />
            ))}
          </div>
        </div>
      </section>

      {/* Countdown + VIP Waitlist */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#1a3a8f] to-[#1530a0]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-blue-400 text-xs uppercase tracking-widest mb-2">Full Launch</div>
          <h2 className="text-4xl font-black text-white mb-6">JULY 1, 2026</h2>
          <div className="flex justify-center gap-4 mb-8">
            {[
              { val: countdown.days, label: "DAYS" },
              { val: countdown.hours, label: "HRS" },
              { val: countdown.minutes, label: "MIN" },
              { val: countdown.seconds, label: "SEC" },
            ].map(({ val, label }) => (
              <div key={label} className="bg-[#1a3a8f] border border-blue-700 rounded-xl px-4 py-3 min-w-[64px]">
                <div className="text-3xl font-black text-white tabular-nums">{String(val).padStart(2, "0")}</div>
                <div className="text-blue-400 text-[10px] tracking-widest">{label}</div>
              </div>
            ))}
          </div>

          {!joined ? (
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email for VIP access"
                className="flex-1 bg-[#1a3a8f] border border-blue-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 placeholder-blue-500"
              />
              <button
                onClick={() => { if (email) setJoined(true); }}
                className="bg-blue-600 hover:bg-blue-500 text-white font-black px-6 py-3 rounded-xl transition-colors"
              >
                JOIN VIP
              </button>
            </div>
          ) : (
            <div className="text-green-400 font-bold text-lg">You're on the VIP list! Dreams Do Come True 2026.</div>
          )}
        </div>
      </section>

      {/* The Vision Section */}
      <section className="py-16 px-4 bg-[#0a1020] border-t border-blue-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-blue-400 text-xs uppercase tracking-widest mb-2">The Story</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">BUILT WHEN NO ONE ELSE BELIEVED</h2>
            <p className="text-blue-300 text-lg max-w-3xl mx-auto leading-relaxed">
              ATHLYNX was born from a vision that athletes deserve more — more tools, more opportunities, more power over their own careers. 
              Founded by Chad A. Dozier and Glenn Tse in Houston, TX after meeting at Hope Lodge in November 2024, 
              this platform represents 4 years of relentless work to build what the sports world had never seen.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-[#1a3a8f] border border-blue-800 rounded-2xl p-6 text-center">
              <div className="text-4xl font-black text-white mb-2">4</div>
              <div className="text-blue-400 text-sm uppercase tracking-widest">Years in the Making</div>
              <div className="text-blue-300 text-xs mt-2">Every line of code. Every feature. Every platform.</div>
            </div>
            <div className="bg-[#1a3a8f] border border-blue-800 rounded-2xl p-6 text-center">
              <div className="text-4xl font-black text-white mb-2">20</div>
              <div className="text-blue-400 text-sm uppercase tracking-widest">Platforms Built</div>
              <div className="text-blue-300 text-xs mt-2">NIL, recruiting, training, AI, community & more.</div>
            </div>
            <div className="bg-[#1a3a8f] border border-blue-800 rounded-2xl p-6 text-center">
              <div className="text-4xl font-black text-white mb-2">1</div>
              <div className="text-blue-400 text-sm uppercase tracking-widest">Mission</div>
              <div className="text-blue-300 text-xs mt-2">Empower every athlete from youth to pro.</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0d1b3e] border border-blue-900 rounded-2xl p-6">
              <div className="text-blue-400 text-xs uppercase tracking-widest mb-3">The Athlete Playbook</div>
              <h3 className="text-white font-black text-xl mb-3">YOUR CAREER. YOUR BRAND. YOUR FUTURE.</h3>
              <p className="text-blue-300 text-sm leading-relaxed">
                ATHLYNX gives athletes the tools to boost their recruiting presence, build their media profile, 
                connect globally with other athletes, compare recruiting efforts, and share schedules across every sport and season. 
                From youth leagues to the pros — this is your playbook.
              </p>
            </div>
            <div className="bg-[#0d1b3e] border border-blue-900 rounded-2xl p-6">
              <div className="text-blue-400 text-xs uppercase tracking-widest mb-3">The NIL Revolution</div>
              <h3 className="text-white font-black text-xl mb-3">MONETIZE YOUR NAME, IMAGE & LIKENESS</h3>
              <p className="text-blue-300 text-sm leading-relaxed">
                The NIL Portal at <a href="https://nilportals.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white underline">nilportals.com</a> and <a href="https://nilportal.ai" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white underline">nilportal.ai</a> connects 
                athletes with brands, secures contracts, and guides the journey from small school to big opportunity through the Transfer Portal — 
                all in one seamless, integrated platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Network Section */}
      <section className="py-12 px-4 bg-[#0a1020] border-t border-blue-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-blue-400 text-xs uppercase tracking-widest mb-1">The DHG Network</div>
            <h2 className="text-2xl font-black text-white">OUR FULL ECOSYSTEM</h2>
            <p className="text-blue-400 text-sm mt-1">Every platform. One empire.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { label: "Dozier Holdings Group", url: "/dhg", tag: "PARENT CO", color: "border-yellow-600 text-yellow-400", tagColor: "bg-yellow-700" },
              { label: "NIL Portal", url: "https://nilportals.com", tag: "LIVE", color: "border-green-600 text-green-400", tagColor: "bg-green-700" },
              { label: "NIL Portal AI", url: "https://nilportal.ai", tag: "AI", color: "border-cyan-600 text-cyan-400", tagColor: "bg-cyan-700" },
              { label: "Transfer Portal", url: "https://transferportal.ai", tag: "LIVE", color: "border-green-600 text-green-400", tagColor: "bg-green-700" },
              { label: "ATHLYNX App", url: "https://athlynx.ai", tag: "VIP", color: "border-purple-600 text-purple-400", tagColor: "bg-purple-700" },
              { label: "ATHLYNX Pro", url: "https://athlynx.pro", tag: "PRO", color: "border-blue-500 text-blue-300", tagColor: "bg-blue-700" },
              { label: "ATHLYNX Net", url: "https://athlynx.net", tag: "NET", color: "border-blue-500 text-blue-300", tagColor: "bg-blue-700" },
              { label: "ATHLYNX IO", url: "https://athlynx.io", tag: "IO", color: "border-blue-500 text-blue-300", tagColor: "bg-blue-700" },
              { label: "ATHLYNX AI", url: "https://athlynx.ai", tag: "AI", color: "border-cyan-600 text-cyan-400", tagColor: "bg-cyan-700" },
              { label: "ATHLYNX App .com", url: "https://athlynxapp.com", tag: "NEW", color: "border-blue-500 text-blue-300", tagColor: "bg-blue-600" },
              { label: "AI Bot Ecosystem", url: "https://aibotecosys.com", tag: "AI", color: "border-cyan-600 text-cyan-400", tagColor: "bg-cyan-700" },
            ].map((site) => site.url.startsWith('/') ? (
                <Link
                  key={site.url}
                  href={site.url}
                  className={`group bg-[#0d1a35] border ${site.color} rounded-xl p-4 flex flex-col gap-2 hover:bg-[#1a3a8f] transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-900/40`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full text-white ${site.tagColor}`}>{site.tag}</span>
                    <span className="text-blue-600 group-hover:text-blue-400 text-xs transition-colors">→</span>
                  </div>
                  <div className={`font-bold text-sm leading-tight ${site.color.split(' ')[1]}`}>{site.label}</div>
                  <div className="text-blue-600 text-[10px] truncate">athlynx.ai{site.url}</div>
                </Link>
              ) : (
                <a
                  key={site.url}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group bg-[#0d1a35] border ${site.color} rounded-xl p-4 flex flex-col gap-2 hover:bg-[#1a3a8f] transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-900/40`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full text-white ${site.tagColor}`}>{site.tag}</span>
                    <span className="text-blue-600 group-hover:text-blue-400 text-xs transition-colors">↗</span>
                  </div>
                  <div className={`font-bold text-sm leading-tight ${site.color.split(' ')[1]}`}>{site.label}</div>
                  <div className="text-blue-600 text-[10px] truncate">{site.url.replace('https://', '')}</div>
                </a>
              )
            )}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#0a1020] to-[#080d1a] border-t border-blue-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-blue-400 text-xs uppercase tracking-widest mb-2">The Founders</div>
            <h2 className="text-3xl font-black text-white">THE PEOPLE BEHIND THE PLATFORM</h2>
            <p className="text-blue-400 text-sm mt-2">Houston, TX — Founded November 2024</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-[#1a3a8f] border border-blue-700 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-black text-white border-2 border-blue-500">CD</div>
              <div className="text-white font-black text-xl mb-1">Chad A. Dozier</div>
              <div className="text-blue-400 text-sm uppercase tracking-widest mb-4">Founder & CEO</div>
              <p className="text-blue-300 text-sm leading-relaxed">
                Visionary entrepreneur and the driving force behind ATHLYNX, the NIL Portal, and the entire Dozier Holdings Group ecosystem. 
                Chad spent 4 years building what the sports world didn't know it needed — a complete athlete empowerment platform.
              </p>
            </div>
            <div className="bg-[#1a3a8f] border border-blue-700 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-black text-white border-2 border-blue-500">GT</div>
              <div className="text-white font-black text-xl mb-1">Glenn Tse</div>
              <div className="text-blue-400 text-sm uppercase tracking-widest mb-4">Co-Founder & CTO</div>
              <p className="text-blue-300 text-sm leading-relaxed">
                Technical architect and co-founder who partnered with Chad after they met at Hope Lodge in Houston. 
                Glenn brings the engineering expertise to turn the vision into reality — building the infrastructure that powers the entire ecosystem.
              </p>
            </div>
          </div>
          <div className="bg-[#0d1b3e] border border-blue-900 rounded-2xl p-8 text-center max-w-3xl mx-auto">
            <div className="text-blue-400 text-xs uppercase tracking-widest mb-3">The Origin Story</div>
            <p className="text-blue-300 text-base leading-relaxed italic">
              "We met at Hope Lodge in Houston in November 2024. Two people with a shared vision and the determination to build something that would change how athletes navigate their careers. 
              Nobody understood it at first. We had to do it ourselves. That's the ATHLYNX story."
            </p>
            <div className="text-white font-bold mt-4">— Chad A. Dozier & Glenn Tse</div>
          </div>
          <div className="text-center mt-8">
            <Link href="/founders" className="inline-block border border-blue-600 text-blue-300 hover:bg-blue-800 px-6 py-3 rounded-xl text-sm font-bold transition-colors">
              Meet the Full Team →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== APP STORE + GOOGLE PLAY COMING SOON ===== */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#080d1a] to-[#0a1020] border-t border-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500 text-yellow-300 text-xs font-black px-4 py-1.5 rounded-full mb-6 tracking-widest">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            COMING SOON — NATIVE APPS
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight">
            ATHLYNX ON YOUR PHONE
          </h2>
          <p className="text-blue-300 text-base md:text-lg mb-10 max-w-2xl mx-auto">
            Native iOS and Android apps are coming to the App Store and Google Play. 
            Until then, install the PWA directly from your browser — same speed, same power, zero App Store wait.
          </p>

          {/* App Icons + Store Badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-10">
            {/* iOS / App Store */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src="/images/logos/mobile-app-icon.png"
                  alt="ATHLYNX iOS App"
                  className="w-28 h-28 rounded-3xl shadow-2xl shadow-blue-900/60 object-contain border-2 border-blue-700"
                />
                <div className="absolute -top-2 -right-2 bg-[#007AFF] text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg">iOS</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="text-white font-black text-sm">App Store</div>
                <div className="flex items-center gap-2 bg-black border border-white/20 rounded-xl px-5 py-3 opacity-60 cursor-not-allowed select-none">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-white/60 text-[9px] leading-none">Download on the</div>
                    <div className="text-white font-black text-sm leading-tight">App Store</div>
                  </div>
                </div>
                <div className="text-yellow-400 text-xs font-bold tracking-widest">COMING SOON</div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-40 bg-blue-800"></div>

            {/* Android / Google Play */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src="/images/logos/mobile-app-icon.png"
                  alt="ATHLYNX Android App"
                  className="w-28 h-28 rounded-3xl shadow-2xl shadow-blue-900/60 object-contain border-2 border-blue-700"
                />
                <div className="absolute -top-2 -right-2 bg-[#34A853] text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg">Android</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="text-white font-black text-sm">Google Play</div>
                <div className="flex items-center gap-2 bg-black border border-white/20 rounded-xl px-5 py-3 opacity-60 cursor-not-allowed select-none">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                    <path d="M3.18 23.76c.3.16.64.2.97.12l11.4-11.4L12 9l-8.82 14.76z" fill="#EA4335"/>
                    <path d="M20.82 10.5l-2.88-1.65L14.55 12l3.39 3.39 2.88-1.65c.82-.47.82-1.77 0-2.24z" fill="#FBBC04"/>
                    <path d="M3.18.24C2.88.4 2.67.73 2.67 1.2v21.6c0 .47.21.8.51.96L15.12 12 3.18.24z" fill="#4285F4"/>
                    <path d="M3.18 23.76l11.37-11.37L12 9.49 3.18 23.76z" fill="#34A853"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-white/60 text-[9px] leading-none">Get it on</div>
                    <div className="text-white font-black text-sm leading-tight">Google Play</div>
                  </div>
                </div>
                <div className="text-yellow-400 text-xs font-bold tracking-widest">COMING SOON</div>
              </div>
            </div>
          </div>

          {/* PWA Install CTA */}
          <div className="bg-[#1a3a8f]/60 border border-blue-700 rounded-2xl p-6 max-w-xl mx-auto">
            <div className="text-blue-400 text-xs uppercase tracking-widest mb-2">Available Right Now</div>
            <h3 className="text-white font-black text-xl mb-2">Install the PWA — No App Store Needed</h3>
            <p className="text-blue-300 text-sm mb-4">Add ATHLYNX to your home screen in seconds. Works exactly like a native app — offline support, push notifications, and instant load.</p>
            <button
              onClick={() => { localStorage.removeItem('athlynx_pwa_dismissed_v2'); window.dispatchEvent(new Event('athlynx-show-pwa')); }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00D4FF] to-blue-500 text-[#0a1628] font-black text-base px-8 py-3 rounded-xl shadow-lg shadow-blue-500/30 hover:opacity-90 transition-opacity"
            >
              <span className="text-lg">📲</span>
              Add to Phone Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#080d1a] border-t border-blue-900 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="/images/logos/athlynx-main-logo.png" alt="ATHLYNX" className="w-8 h-8 rounded-lg" />
              <div>
                <div className="text-white font-black">ATHLYNX</div>
                <div className="text-blue-400 text-xs">A Dozier Holdings Group Company</div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-blue-400">
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/billing" className="hover:text-white transition-colors">Billing</Link>
              <Link href="/founders" className="hover:text-white transition-colors">Founders</Link>
              <Link href="/dhg" className="hover:text-white transition-colors">DHG Corporate</Link>
              <Link href="/nil-portal" className="hover:text-white transition-colors">NIL Portal</Link>
              <Link href="/feed" className="hover:text-white transition-colors">Platform</Link>
              <Link href="/demo" className="hover:text-white transition-colors">How It Works</Link>
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
              <a href="https://nilportals.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">nilportals.com</a>
              <a href="https://nilportal.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">nilportal.ai</a>
              <a href="https://transferportal.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">transferportal.ai</a>
              <a href="https://aibotecosys.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">aibotecosys.com</a>
              <Link href="/gridiron-nexus" className="hover:text-white transition-colors">Gridiron Nexus</Link>
              <Link href="/pitch-pulse" className="hover:text-white transition-colors">Pitch Pulse</Link>
              <Link href="/court-kings" className="hover:text-white transition-colors">Court Kings</Link>
              <Link href="/reel-masters" className="hover:text-white transition-colors">Reel Masters</Link>
              <Link href="/marketplace" className="hover:text-white transition-colors">Marketplace</Link>
              <Link href="/athlete-dashboard" className="hover:text-white transition-colors">My Dashboard</Link>
              <Link href="/community-feedback" className="hover:text-white transition-colors">Community</Link>
              <Link href="/mobile-app" className="hover:text-white transition-colors">Mobile App</Link>
            </div>
          </div>
          <div className="mt-6 text-center text-blue-600 text-xs">
            © 2026 Dozier Holdings Group™. All Rights Reserved. ATHLYNX™ | The Athlete's Playbook™ | NIL Portal™ | Diamond Grind™ | Gridiron Nexus™ | Pitch Pulse™ | Court Kings™ | Reel Masters™ | Warriors Playbook™ | NIL Vault™ | Transfer Portal™ | Fuel Bots™ are trademarks of Dozier Holdings Group. Dreams Do Come True 2026.
          </div>
        </div>
      </footer>

      {/* PWAInstallBanner renders globally in App.tsx */}
    </div>
  );
}
// deploy-1776539237
