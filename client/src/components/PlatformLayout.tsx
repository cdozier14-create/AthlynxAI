import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import AIOnboarding from "./AIOnboarding";

const APPS = [
  { id: "nil-portal", label: "NIL Portal", icon: "/logos/nil-portal-logo.png", badge: "LIVE", href: "/nil-portal" },
  { id: "messenger", label: "NIL Messenger", icon: "/logos/nil-messenger-logo.png", badge: "LIVE", href: "/messenger" },
  { id: "diamond-grind", label: "Diamond Grind", icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/TptlbGHFTBamgRix.png", badge: "NEW", href: "/diamond-grind" },
  { id: "warriors-playbook", label: "Warriors Playbook", icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/HcanzWKcSkXMpmUO.png", badge: "HOT", href: "/warriors-playbook" },
  { id: "transfer-portal", label: "Transfer Portal", icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/zXVECIAqcyZDAOuV.png", badge: "LIVE", href: "/transfer-portal" },
  { id: "nil-vault", label: "NIL Vault", icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/aDzQEREXtGvMmnFc.png", badge: "ELITE", href: "/nil-vault" },
  { id: "ai-sales", label: "AI Sales", icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/aZXZLwryoTRrDQBs.png", badge: "AI", href: "/ai-sales" },
  { id: "ai-recruiter", label: "AI Recruiter", icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/jmJopPCZNYcSzojv.png", badge: "AI", href: "/ai-recruiter" },
  { id: "ai-content", label: "AI Content", icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/ZIXWdkuFjiAnPjQj.png", badge: "BLEND", href: "/ai-content" },
  { id: "faith", label: "Faith", icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/mlASPvSCUQZpELyh.png", badge: "", href: "/faith" },
  { id: "robotics", label: "Robotics", icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/JQENVEFPHSYfaPCl.png", badge: "SOON", href: "/robotics" },
  { id: "trainerbot", label: "TrainerBot", icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/KDhZuDUVfPtCvWsm.png", badge: "NEW", href: "/trainerbot" },
  { id: "infrastructure", label: "Infrastructure", icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/XQoWBSZFveYEShpv.png", badge: "INFRA", href: "/infrastructure" },
  { id: "marketplace", label: "Marketplace", icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/lwxugmjkXJoyYfVC.png", badge: "NEW", href: "/marketplace" },
  { id: "podcast", label: "Podcast", icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/nTYMGLkExngartwO.png", badge: "NEW", href: "/podcast" },
  { id: "athlete-journey", label: "Athlete Journey", icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/TxZgHVyhvysJXPve.png", badge: "NEW", href: "/athlete-journey" },
  { id: "athlete-legal-hub", label: "Legal & Deals", icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/GdOOpCRNAGZWGOFB.png", badge: "NEW", href: "/athlete-legal-hub" },
  { id: "athlete-store", label: "Athlete Store", icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/gvdoanUpNeACpwLe.png", badge: "NEW", href: "/athlete-store" },
  { id: "white-label", label: "White-Label", icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/AuWTafmWwajotAmj.png", badge: "BIZ", href: "/white-label" },
  { id: "crm", label: "CRM", icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/lcQxjnmKEGqxIlhY.png", badge: "PRO", href: "/admin/crm" },
  { id: "analytics", label: "Analytics", icon: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/GxeIWIdQkpRYcHWd.png", badge: "PRO", href: "/analytics" },
  { id: "admin", label: "Admin", icon: "/logos/dhg-crab-logo.png", badge: "ADMIN", href: "/admin" },
];

const BADGE_COLORS: Record<string, string> = {
  LIVE: "bg-green-600",
  NEW: "bg-blue-600",
  HOT: "bg-orange-500",
  ELITE: "bg-purple-600",
  AI: "bg-cyan-600",
  BLEND: "bg-pink-600",
  SOON: "bg-gray-600",
  BIZ: "bg-indigo-600",
  PRO: "bg-violet-600",
  ADMIN: "bg-red-700",
};

interface PlatformLayoutProps {
  children: React.ReactNode;
  title?: string;
}

function NotificationBell({ user }: { user: any }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { data: notifications = [] } = trpc.notifications.getRecent.useQuery(undefined, {
    enabled: !!user,
    refetchInterval: 30000,
  });
  const utils = trpc.useUtils();
  const markReadMutation = trpc.notifications.markAllRead.useMutation({
    onSuccess: () => utils.notifications.getRecent.invalidate(),
  });

  const unread = (notifications as any[]).filter(n => !n.isRead).length;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => {
          setOpen(!open);
          if (!open && unread > 0) {
            markReadMutation.mutate();
            utils.notifications.getRecent.invalidate();
          }
        }}
        className="p-2 rounded-lg hover:bg-blue-900 transition-colors relative"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
        </svg>
        {unread > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[9px] font-bold text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-80 bg-[#0d1b3e] border border-blue-800 rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-blue-900">
            <span className="font-bold text-white text-sm">Notifications</span>
            {unread > 0 && (
              <button
                onClick={() => markReadMutation.mutate()}
                className="text-xs text-blue-400 hover:text-white"
              >
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {(notifications as any[]).length === 0 ? (
              <div className="p-4 text-center text-blue-400 text-sm">No notifications yet</div>
            ) : (
              (notifications as any[]).map((n: any) => (
                <div key={n.id} className={`px-4 py-3 border-b border-blue-900/50 hover:bg-blue-900/30 transition-colors ${!n.isRead ? 'bg-blue-900/20' : ''}`}>
                  <div className="flex items-start gap-2">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!n.isRead ? 'bg-blue-400' : 'bg-transparent'}`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-semibold">{n.title}</div>
                      <div className="text-blue-400 text-xs mt-0.5 line-clamp-2">{n.body}</div>
                      <div className="text-blue-600 text-[10px] mt-1">{new Date(n.createdAt).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <Link href="/notifications" onClick={() => setOpen(false)} className="block px-4 py-2 text-center text-xs text-blue-400 hover:text-white border-t border-blue-900 transition-colors">
            View all notifications
          </Link>
        </div>
      )}
    </div>
  );
}

export default function PlatformLayout({ children, title }: PlatformLayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingDismissed, setOnboardingDismissed] = useState(false);
  const { user, loading: authLoading } = useAuth();

  // Check onboarding status from DB
  const { data: onboardingStatus, isLoading: onboardingLoading } = trpc.profile.getOnboardingStatus.useQuery(undefined, { enabled: !!user });
  useEffect(() => {
    if (user && !authLoading && !onboardingLoading && !onboardingDismissed) {
      if (onboardingStatus && !onboardingStatus.completed) {
        setShowOnboarding(true);
      }
    }
  }, [user, authLoading, onboardingLoading, onboardingStatus, onboardingDismissed]);

  const displayName = user?.name || "Athlete";
  const initials = displayName.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();

  // Subscription plan for credits display
  const { data: sub } = trpc.stripe.getSubscription.useQuery(undefined, { enabled: !!user });
  // Trial state derived from DB user
  const trialEndsAt = (user as any)?.trialEndsAt ? new Date((user as any).trialEndsAt) : null;
  const _now = new Date();
  const trialDaysLeft = trialEndsAt ? Math.max(0, Math.ceil((trialEndsAt.getTime() - _now.getTime()) / (1000 * 60 * 60 * 24))) : 0;
  const isInTrial = !!trialEndsAt && trialEndsAt > _now && !(user as any)?.stripeSubscriptionId;
  const trialExpired = !!trialEndsAt && trialEndsAt <= _now && !(user as any)?.stripeSubscriptionId;

  const planLabel = sub?.plan === "athlete_pro" ? "PRO" :
    sub?.plan === "athlete_elite" ? "ELITE" :
    sub?.plan === "nil_vault" ? "NIL VAULT" : "FREE";

  const planColor = sub?.plan === "athlete_pro" ? "#0066ff" :
    sub?.plan === "athlete_elite" ? "#00c2ff" :
    sub?.plan === "nil_vault" ? "#7c3aed" : "#6b7280";

  return (
    <div className="min-h-screen bg-[#1a3a8f] text-white">
      {showOnboarding && user && (
        <AIOnboarding onComplete={() => { setShowOnboarding(false); setOnboardingDismissed(true); }} />
      )}
      {/* Top announcement bar */}
      <div className="bg-[#1e4bb8] text-center text-xs py-1 tracking-widest font-semibold text-blue-200">
        THE FUTURE OF ATHLETE SUCCESS
      </div>

      {/* Trial banner */}
      {user && isInTrial && (
        <div className="bg-gradient-to-r from-[#00c2ff]/20 to-[#0066ff]/20 border-b border-[#00c2ff]/30 text-center py-1.5 px-4 flex items-center justify-center gap-3">
          <span className="text-[#00c2ff] text-xs font-bold">🎯 FREE TRIAL — {trialDaysLeft} day{trialDaysLeft !== 1 ? 's' : ''} remaining</span>
          <Link href="/billing" className="text-xs bg-[#00c2ff] text-[#0a0f1e] font-black px-3 py-0.5 rounded-full hover:bg-white transition-colors">
            Upgrade Now
          </Link>
        </div>
      )}
      {/* Trial expired banner */}
      {user && trialExpired && (
        <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 border-b border-red-700/50 text-center py-1.5 px-4 flex items-center justify-center gap-3">
          <span className="text-red-300 text-xs font-bold">⚠️ FREE TRIAL ENDED — Upgrade to keep full access</span>
          <Link href="/billing" className="text-xs bg-red-500 text-white font-black px-3 py-0.5 rounded-full hover:bg-red-400 transition-colors">
            Upgrade Now
          </Link>
        </div>
      )}

      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-[#1a3a8f] border-b border-blue-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img src="/logos/athlynx-main-logo.png" alt="ATHLYNX" className="w-9 h-9 rounded-lg object-cover" />
            <div className="hidden sm:block">
              <div className="text-white font-black text-lg leading-none tracking-wide">ATHLYNX</div>
              <div className="text-blue-400 text-[9px] tracking-widest leading-none">THE ATHLETE'S PLAYBOOK</div>
            </div>
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-xs mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search athletes, teams, deals..."
                className="w-full bg-[#0d1f3c] text-white text-sm rounded-full px-4 py-2 pl-9 border border-blue-800 focus:outline-none focus:border-blue-500 placeholder-blue-400"
              />
              <svg className="absolute left-3 top-2.5 w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Nav icons */}
          <div className="flex items-center gap-1">
            {/* Plan badge + Credits */}
            {user && (
              <div className="hidden sm:flex items-center gap-1 mr-1">
                <Link href="/billing">
                  <span
                    className="inline-flex text-[10px] font-black px-2 py-1 rounded-full cursor-pointer"
                    style={{ backgroundColor: planColor + "22", color: planColor, border: `1px solid ${planColor}44` }}
                  >
                    {planLabel}
                  </span>
                </Link>
                <Link href="/billing">
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 cursor-pointer hover:bg-yellow-500/20 transition-colors">
                    ⚡ {(user as any)?.credits ?? 0}
                  </span>
                </Link>
              </div>
            )}

            <Link href="/feed" className={`p-2 rounded-lg transition-colors ${location === '/feed' ? 'bg-blue-700' : 'hover:bg-blue-900'}`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
            </Link>

            <Link href="/messenger" className={`p-2 rounded-lg transition-colors relative ${location === '/messenger' ? 'bg-blue-700' : 'hover:bg-blue-900'}`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
              </svg>
            </Link>

            {user ? (
              <NotificationBell user={user} />
            ) : (
              <button className="p-2 rounded-lg hover:bg-blue-900 transition-colors relative">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                </svg>
              </button>
            )}

            {user ? (
              <Link href="/profile" className="ml-1 w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-sm font-bold hover:bg-blue-600 transition-colors overflow-hidden shrink-0">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={displayName} className="w-full h-full object-cover" />
                ) : (
                  <span>{initials}</span>
                )}
              </Link>
            ) : (
              <Link href="/signin" className="ml-1 text-xs bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-1.5 rounded-lg transition-colors">
                Sign In
              </Link>
            )}

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-blue-900 ml-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0d1b3e] border-t border-blue-900 px-4 py-3">
            <input
              type="text"
              placeholder="Search athletes, teams, deals..."
              className="w-full bg-[#1a3a8f] text-white text-sm rounded-full px-4 py-2 border border-blue-800 focus:outline-none mb-3"
            />
            <div className="grid grid-cols-5 gap-2">
              {APPS.slice(0, 10).map(app => (
                <Link key={app.id} href={app.href} onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-blue-900">
                  <img src={app.icon} alt={app.label} className="w-8 h-8 rounded-lg object-cover" onError={e => { (e.target as HTMLImageElement).src = "/logos/dhg-crab-logo.png"; }} />
                  <span className="text-[9px] text-blue-300 text-center leading-tight">{app.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 flex gap-4 lg:pb-4 pb-[calc(72px+env(safe-area-inset-bottom,0px))]">
        {/* Left Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 gap-3">
          {/* Profile card */}
          <Link href="/profile" className="bg-[#1a3a8f] rounded-xl border border-blue-900 overflow-hidden hover:border-blue-700 transition-colors block">
            <div className="h-16 bg-gradient-to-r from-blue-800 to-blue-600"></div>
            <div className="px-4 pb-4 -mt-8">
              <div className="w-14 h-14 rounded-full bg-blue-700 border-4 border-[#0d1b3e] flex items-center justify-center text-xl font-black overflow-hidden">
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt={displayName} className="w-full h-full object-cover" />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
              <div className="mt-1 font-bold text-white">{user ? displayName : "Athlete Profile"}</div>
              <div className="text-blue-400 text-xs">{user ? "View your profile" : "Sign in to continue"}</div>
            </div>
          </Link>

          {/* Apps nav */}
          <div className="bg-[#1a3a8f] rounded-xl border border-blue-900 p-3">
            <div className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2 px-1">Your Apps</div>
            {APPS.map(app => (
              <Link key={app.id} href={app.href} className={`flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-blue-900 transition-colors group ${location === app.href ? 'bg-blue-900' : ''}`}>
                <img
                  src={app.icon}
                  alt={app.label}
                  className="w-8 h-8 rounded-lg object-cover shrink-0"
                  onError={e => { (e.target as HTMLImageElement).src = "/logos/dhg-crab-logo.png"; }}
                />
                <span className="text-sm text-white group-hover:text-blue-300 flex-1">{app.label}</span>
                {app.badge && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white ${BADGE_COLORS[app.badge] || 'bg-gray-600'}`}>
                    {app.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* DHG link */}
          <Link href="/dhg-empire" className="bg-[#1a3a8f] rounded-xl border border-yellow-700/40 p-3 flex items-center gap-3 hover:bg-blue-900 hover:border-yellow-500/60 transition-colors">
            <img src="/logos/dhg-crab-logo.png" alt="DHG" className="w-10 h-10 rounded-lg object-cover" />
            <div>
              <div className="text-sm font-bold text-white">DHG Empire</div>
              <div className="text-yellow-400/70 text-xs">All 20+ Companies</div>
            </div>
          </Link>

          {/* Upgrade CTA for free users */}
          {user && (!sub?.plan || sub.plan === "free") && (
            <Link href="/billing" className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl border border-purple-700 p-3 hover:border-purple-500 transition-colors block">
              <div className="text-purple-300 text-xs font-bold uppercase tracking-wider mb-1">Upgrade to PRO</div>
              <div className="text-white text-sm font-semibold">Unlock all features</div>
              <div className="text-blue-400 text-xs mt-1">NIL Vault, AI tools, and more</div>
              <div className="mt-2 text-center bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold py-1.5 rounded-lg transition-colors">
                View Plans →
              </div>
            </Link>
          )}
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {title && (
            <div className="mb-4 px-1">
              <h1 className="text-2xl font-black text-white tracking-wide">{title}</h1>
            </div>
          )}
          {/* PAYWALL GATE — hard block when trial expired and no active subscription */}
          {user && trialExpired ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12">
              <div className="max-w-lg w-full bg-gradient-to-br from-[#0a1628] via-[#1a3a8f] to-[#0a1628] border-2 border-red-500/60 rounded-3xl p-8 text-center shadow-2xl">
                <div className="text-5xl mb-4">🔒</div>
                <div className="text-red-400 text-xs uppercase tracking-widest font-bold mb-2">Trial Ended</div>
                <h2 className="text-white font-black text-2xl mb-3">Your Free Trial Has Expired</h2>
                <p className="text-blue-200 text-sm leading-relaxed mb-6">
                  Your 7-day free trial has ended. Choose a plan to keep full access to all 20+ ATHLYNX apps — NIL Portal, Transfer Portal, Diamond Grind, Warriors Playbook, and more.
                </p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {([{name:"STARTER",price:"$29",color:"#0066ff"},{name:"PRO",price:"$79",color:"#00c2ff",popular:true},{name:"ELITE",price:"$149",color:"#7c3aed"}] as any[]).map((p: any) => (
                    <Link key={p.name} href="/billing" className="rounded-xl border p-3 hover:scale-105 transition-all cursor-pointer block" style={{borderColor: p.color + '44', backgroundColor: p.color + '11'}}>
                      {p.popular && <div className="text-[9px] font-black text-yellow-400 mb-1">POPULAR</div>}
                      <div className="font-black text-white text-sm">{p.name}</div>
                      <div className="font-black text-lg" style={{color: p.color}}>{p.price}<span className="text-xs text-blue-400">/mo</span></div>
                    </Link>
                  ))}
                </div>
                <Link href="/billing" className="block w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-black text-lg py-3 rounded-xl transition-all shadow-xl hover:scale-105">
                  CHOOSE YOUR PLAN →
                </Link>
                <div className="mt-4 text-blue-400 text-xs">No contracts. Cancel anytime. Instant access.</div>
              </div>
            </div>
          ) : (
            children
          )}
        </main>

        {/* Right Sidebar */}
        <aside className="hidden xl:flex flex-col w-72 shrink-0 gap-3">
          {/* Platform Stats */}
          <div className="bg-[#1a3a8f] rounded-xl border border-blue-900 p-4">
            <div className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">Platform Stats</div>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-1 border-b border-blue-900">
                <span className="text-blue-300 text-sm">Apps Available</span>
                <span className="text-white font-bold text-sm">20+</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-blue-900">
                <span className="text-blue-300 text-sm">Sports Covered</span>
                <span className="text-white font-bold text-sm">10+</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-blue-300 text-sm">Full Launch</span>
                <span className="text-green-400 font-bold text-sm">July 1, 2026</span>
              </div>
            </div>
          </div>

          {/* Countdown */}
          <div className="bg-gradient-to-br from-blue-900 to-[#1530a0] rounded-xl border border-blue-700 p-4 text-center">
            <div className="text-blue-300 text-xs uppercase tracking-widest mb-1">Full Launch</div>
            <div className="text-white font-black text-2xl">JULY 1, 2026</div>
            <div className="text-blue-400 text-xs mt-1">Dreams Do Come True</div>
              {user ? (
                <Link href="/billing" className="mt-3 block w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-2 rounded-lg transition-colors text-center">
                  View Plans
                </Link>
              ) : (
                <Link href="/signin" className="mt-3 block w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-2 rounded-lg transition-colors text-center">
                  Start Free Trial
                </Link>
              )}
          </div>

          {/* About DHG */}
          <div className="bg-[#1a3a8f] rounded-xl border border-blue-900 p-4">
            <div className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">About ATHLYNX</div>
            <p className="text-blue-200 text-xs leading-relaxed mb-3">Built by Dozier Holdings Group — The Sole Source Provider. Empowering athletes with NIL tools, recruiting intelligence, and AI-powered career management.</p>
            <a href="/dhg" className="block text-center text-xs bg-blue-700 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors font-semibold">
              About DHG
            </a>
          </div>
        </aside>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#1a3a8f] border-t border-blue-900 z-50" style={{paddingBottom: 'max(env(safe-area-inset-bottom, 8px), 8px)'}}>
        <div className="flex items-center justify-around py-2">
          {[
            { href: "/feed", icon: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z", label: "Home" },
            { href: "/nil-portal", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z", label: "NIL" },
            { href: "/messenger", icon: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z", label: "Chat" },
            { href: "/transfer-portal", icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", label: "Transfer" },
            { href: "/profile", icon: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z", label: "Profile" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className={`flex flex-col items-center gap-0.5 p-2 rounded-lg transition-colors ${location === item.href ? 'text-blue-400' : 'text-blue-600 hover:text-blue-400'}`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d={item.icon} />
              </svg>
              <span className="text-[9px]">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
