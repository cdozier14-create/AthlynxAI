import { Link } from "wouter";
import { useState } from "react";

const DEMO_VIDEO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/TJIQEsjoLVlddltc.mp4";
const ATHLYNX_LOGO = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/qUknrdlyPrUZJQYo.png";

const STEPS = [
  {
    step: "01",
    title: "Create Your Free Account",
    subtitle: "7-Day Free Trial — No Credit Card Required",
    icon: "🏆",
    color: "from-blue-600 to-blue-800",
    border: "border-blue-600",
    description: "Sign up in 30 seconds. Your 7-day free trial starts the moment you log in. Access every feature — NIL deals, recruiting tools, AI coach, messaging, and more.",
    bullets: [
      "Sign up with email or Google",
      "Set your sport, position, and school",
      "Upload your highlight reel and stats",
      "Your athlete profile goes live immediately",
    ],
    cta: { label: "JOIN FREE", href: "/signup" },
  },
  {
    step: "02",
    title: "Build Your Athlete Profile",
    subtitle: "Your Digital Recruiting Resume",
    icon: "⚡",
    color: "from-indigo-600 to-blue-700",
    border: "border-indigo-500",
    description: "Your profile is your brand. Coaches, scouts, and brands search ATHLYNX to find athletes. Make yours impossible to ignore.",
    bullets: [
      "Add your stats, GPA, and measurables",
      "Upload highlight videos directly to your profile",
      "Connect your social media handles",
      "Set your recruiting status (open, committed, transfer portal)",
    ],
    cta: { label: "VIEW PROFILE DEMO", href: "/profile" },
  },
  {
    step: "03",
    title: "Activate the Social Feed",
    subtitle: "The Athlete's Instagram + LinkedIn Combined",
    icon: "🔥",
    color: "from-orange-600 to-red-700",
    border: "border-orange-500",
    description: "Post highlights, training clips, game-day moments. React to teammates. Connect with athletes across every sport globally. This is your court, field, and diamond — all in one feed.",
    bullets: [
      "Post photos, videos, and updates",
      "React with 🔥 Fire, 🏆 Trophy, 👏 Clap, ❤️ Heart",
      "Follow coaches, scouts, and other athletes",
      "Stories bar shows who's active right now",
    ],
    cta: { label: "ENTER THE FEED", href: "/feed" },
  },
  {
    step: "04",
    title: "Use the NIL Portal",
    subtitle: "Get Paid for Your Name, Image & Likeness",
    icon: "💰",
    color: "from-green-600 to-emerald-700",
    border: "border-green-500",
    description: "The NIL Portal connects you directly with brands looking to sponsor athletes. From local businesses to national brands — your NIL career starts here.",
    bullets: [
      "Browse active brand deals in your sport",
      "Submit your NIL profile to brands",
      "Sign contracts securely through NIL Vault",
      "Track earnings and deal history",
    ],
    cta: { label: "OPEN NIL PORTAL", href: "/nil-portal" },
  },
  {
    step: "05",
    title: "Connect with Coaches via Messenger",
    subtitle: "Direct Line to Every Coach in the Country",
    icon: "📱",
    color: "from-purple-600 to-blue-700",
    border: "border-purple-500",
    description: "ATHLYNX Messenger is built for athletes. Message coaches directly, get recruiting updates, coordinate with teammates, and never miss a contact window.",
    bullets: [
      "Message coaches and scouts directly",
      "Group chats for team communication",
      "Share highlight clips inside conversations",
      "Read receipts so you know when coaches open your message",
    ],
    cta: { label: "OPEN MESSENGER", href: "/messenger" },
  },
  {
    step: "06",
    title: "Use the AI Recruiter",
    subtitle: "Your Personal Recruiting Agent — Available 24/7",
    icon: "🤖",
    color: "from-cyan-600 to-blue-700",
    border: "border-cyan-500",
    description: "The AI Recruiter analyzes your profile, stats, and target schools — then gives you a personalized recruiting strategy. It knows what coaches want to see.",
    bullets: [
      "Get a personalized school target list",
      "AI writes your recruiting email templates",
      "Analyzes your film and suggests improvements",
      "Tracks your recruiting pipeline like a CRM",
    ],
    cta: { label: "TRY AI RECRUITER", href: "/ai-recruiter" },
  },
  {
    step: "07",
    title: "Navigate the Transfer Portal",
    subtitle: "Find Your Next School — Faster Than Anyone",
    icon: "🎓",
    color: "from-yellow-600 to-orange-600",
    border: "border-yellow-500",
    description: "The Transfer Portal Intelligence system tracks every open roster spot, scholarship availability, and coach contact windows. If you're entering the portal, ATHLYNX gives you the edge.",
    bullets: [
      "Search open roster spots by sport and position",
      "See scholarship availability in real time",
      "Contact coaches directly through the portal",
      "Track your portal status and offers",
    ],
    cta: { label: "ENTER TRANSFER PORTAL", href: "/transfer-portal" },
  },
  {
    step: "08",
    title: "Train with AI-Powered Tools",
    subtitle: "Elite Training Programs Built for Your Sport",
    icon: "💪",
    color: "from-red-600 to-orange-700",
    border: "border-red-500",
    description: "Access sport-specific training programs, film breakdown tools, and AI coaching. Whether you're a quarterback, pitcher, or point guard — ATHLYNX has your training plan.",
    bullets: [
      "Sport-specific workout programs",
      "Film breakdown and play analysis",
      "Nutrition and recovery tracking",
      "Connect with certified trainers",
    ],
    cta: { label: "START TRAINING", href: "/training" },
  },
];

const FEATURES = [
  { icon: "🏈", label: "Gridiron Nexus", desc: "Football", href: "/gridiron-nexus" },
  { icon: "⚾", label: "Diamond Grind", desc: "Baseball", href: "/diamond-grind" },
  { icon: "⚽", label: "Pitch Pulse", desc: "Soccer", href: "/pitch-pulse" },
  { icon: "🏀", label: "Court Kings", desc: "Basketball", href: "/court-kings" },
  { icon: "🎣", label: "Reel Masters", desc: "Fishing", href: "/reel-masters" },
  { icon: "🧠", label: "AI Content", desc: "Go Viral", href: "/ai-content" },
  { icon: "📊", label: "NIL Vault", desc: "Contracts", href: "/nil-vault" },
  { icon: "🌍", label: "Social Hub", desc: "Community", href: "/social-hub" },
];

export default function Demo() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="min-h-screen bg-[#060e24] text-white">
      {/* Header */}
      <header className="bg-[#0d1b3e] border-b border-blue-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-3">
            <img src={ATHLYNX_LOGO} alt="ATHLYNX" className="w-9 h-9 rounded-lg" />
            <div>
              <div className="text-white font-black text-lg leading-none tracking-wide">ATHLYNX</div>
              <div className="text-blue-400 text-[9px] tracking-widest">THE ATHLETE'S PLAYBOOK</div>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/feed" className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg font-bold transition-colors hidden sm:block">
              ENTER PLATFORM
            </Link>
            <Link href="/signup" className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1.5 rounded-lg font-black transition-all hover:scale-105">
              JOIN FREE
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-black">
        <video
          className="w-full max-h-[60vh] object-cover opacity-80"
          autoPlay
          muted
          loop
          playsInline
          poster={ATHLYNX_LOGO}
        >
          <source src={DEMO_VIDEO_URL} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#060e24] via-[#060e24]/50 to-transparent pointer-events-none" />
        <div className="absolute bottom-8 left-0 right-0 text-center px-4">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500 text-yellow-300 text-xs font-black px-4 py-1.5 rounded-full mb-4 tracking-widest">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            OFFICIAL PLATFORM WALKTHROUGH
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">HOW ATHLYNX WORKS</h1>
          <p className="text-blue-300 text-lg mt-2">One platform. Every tool. Built for every athlete.</p>
        </div>
      </section>

      {/* Intro Banner */}
      <section className="bg-[#1a3a8f] border-y border-blue-800 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white text-xl font-bold leading-relaxed">
            Every athlete deserves the tools, connections, and opportunities to reach their full potential — from high school to the pros.
          </p>
          <p className="text-blue-300 mt-3 text-base">
            NIL deals, recruiting, training, film, messaging, and more — one platform built entirely around you.
          </p>
        </div>
      </section>

      {/* Step-by-step guide */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-blue-400 text-xs uppercase tracking-widest mb-2">The Playbook</div>
            <h2 className="text-3xl md:text-4xl font-black text-white">8 STEPS TO DOMINATE YOUR RECRUITING</h2>
            <p className="text-blue-300 mt-3 text-lg">Follow these steps and coaches will find you — not the other way around.</p>
          </div>

          {/* Step selector tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {STEPS.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`px-4 py-2 rounded-full text-xs font-black transition-all border ${
                  activeStep === i
                    ? "bg-blue-600 border-blue-400 text-white scale-105 shadow-lg shadow-blue-900/50"
                    : "bg-[#0d1b3e] border-blue-800 text-blue-400 hover:border-blue-600 hover:text-white"
                }`}
              >
                {s.step} {s.icon}
              </button>
            ))}
          </div>

          {/* Active step detail */}
          <div className={`bg-gradient-to-br ${STEPS[activeStep].color} rounded-3xl p-8 md:p-12 border ${STEPS[activeStep].border} shadow-2xl mb-12 transition-all duration-300`}>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="text-7xl md:text-8xl leading-none">{STEPS[activeStep].icon}</div>
              <div className="flex-1">
                <div className="text-white/60 text-sm font-black tracking-widest mb-1">STEP {STEPS[activeStep].step}</div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-2">{STEPS[activeStep].title}</h3>
                <div className="text-white/80 text-lg font-semibold mb-4">{STEPS[activeStep].subtitle}</div>
                <p className="text-white/90 text-base leading-relaxed mb-6">{STEPS[activeStep].description}</p>
                <ul className="space-y-2 mb-8">
                  {STEPS[activeStep].bullets.map((b, bi) => (
                    <li key={bi} className="flex items-start gap-3 text-white/90 text-sm">
                      <span className="text-yellow-400 font-black mt-0.5">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href={STEPS[activeStep].cta.href}
                  className="inline-block bg-white text-blue-900 font-black px-8 py-3 rounded-xl hover:bg-yellow-400 transition-all hover:scale-105 shadow-xl"
                >
                  {STEPS[activeStep].cta.label} →
                </Link>
              </div>
            </div>
          </div>

          {/* All steps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`text-left bg-[#0d1b3e] border rounded-2xl p-5 transition-all duration-200 hover:scale-105 hover:shadow-xl ${
                  activeStep === i ? `${s.border} shadow-lg` : "border-blue-900 hover:border-blue-700"
                }`}
              >
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="text-blue-400 text-[10px] font-black tracking-widest mb-1">STEP {s.step}</div>
                <div className="text-white font-black text-sm leading-tight mb-2">{s.title}</div>
                <div className="text-blue-400 text-xs leading-relaxed">{s.subtitle}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sport-specific platforms */}
      <section className="py-16 px-4 bg-[#0a1020] border-t border-blue-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-blue-400 text-xs uppercase tracking-widest mb-2">Every Sport. One Platform.</div>
            <h2 className="text-3xl font-black text-white">FIND YOUR SPORT</h2>
            <p className="text-blue-300 mt-2">ATHLYNX has dedicated platforms for every sport — not just football.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {FEATURES.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="group bg-[#1a3a8f] border border-blue-800 hover:border-blue-500 rounded-2xl p-6 text-center transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-blue-900/50"
              >
                <div className="text-4xl mb-3">{f.icon}</div>
                <div className="text-white font-black text-sm">{f.label}</div>
                <div className="text-blue-400 text-xs mt-1">{f.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why ATHLYNX beats the competition */}
      <section className="py-16 px-4 bg-[#060e24] border-t border-blue-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-blue-400 text-xs uppercase tracking-widest mb-2">The Competition</div>
            <h2 className="text-3xl font-black text-white">WHY ATHLYNX WINS</h2>
            <p className="text-blue-300 mt-2">We don't just compete — we replace every tool you're already using.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-blue-800">
                  <th className="text-left py-3 px-4 text-blue-400 font-black uppercase tracking-widest text-xs">Feature</th>
                  <th className="py-3 px-4 text-yellow-400 font-black text-center">ATHLYNX</th>
                  <th className="py-3 px-4 text-blue-600 font-bold text-center text-xs">Hudl</th>
                  <th className="py-3 px-4 text-blue-600 font-bold text-center text-xs">On3</th>
                  <th className="py-3 px-4 text-blue-600 font-bold text-center text-xs">Perfect Game</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Social Feed (Posts, Stories, Reactions)", "✅", "❌", "❌", "❌"],
                  ["Direct Messaging to Coaches", "✅", "❌", "❌", "❌"],
                  ["NIL Deal Management", "✅", "❌", "✅", "❌"],
                  ["AI Recruiting Assistant", "✅", "❌", "❌", "❌"],
                  ["Transfer Portal Intelligence", "✅", "❌", "✅", "❌"],
                  ["Film Upload & Breakdown", "✅", "✅", "❌", "❌"],
                  ["Sport-Specific Platforms", "✅", "✅", "✅", "✅"],
                  ["Athlete-to-Athlete Networking", "✅", "❌", "❌", "❌"],
                  ["AI Content Creation", "✅", "❌", "❌", "❌"],
                  ["Free 7-Day Trial", "✅", "❌", "❌", "❌"],
                ].map(([feature, ...vals], i) => (
                  <tr key={i} className={`border-b border-blue-900/50 ${i % 2 === 0 ? "bg-[#0d1b3e]/30" : ""}`}>
                    <td className="py-3 px-4 text-white font-semibold">{feature}</td>
                    {vals.map((v, vi) => (
                      <td key={vi} className={`py-3 px-4 text-center font-black text-lg ${v === "✅" ? "text-green-400" : "text-red-600/60"}`}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#1a3a8f] to-[#0d1b3e] border-t border-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-blue-400 text-xs uppercase tracking-widest mb-2">Simple Pricing</div>
          <h2 className="text-3xl font-black text-white mb-4">START FREE. UPGRADE WHEN YOU'RE READY.</h2>
          <p className="text-blue-300 text-lg mb-8">Every athlete gets a 7-day free trial. No credit card. No commitment.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {[
              { name: "STARTER", price: "FREE", period: "7 days", features: ["Full platform access", "Basic profile", "Feed & Messenger", "NIL browsing"], color: "border-blue-700", badge: "" },
              { name: "PRO", price: "$29", period: "/month", features: ["Everything in Starter", "AI Recruiter", "NIL deal submissions", "Transfer Portal Intel", "Priority support"], color: "border-blue-500 ring-2 ring-blue-500", badge: "MOST POPULAR" },
              { name: "ELITE", price: "$99", period: "/month", features: ["Everything in Pro", "Unlimited NIL deals", "AI Content creation", "Personal recruiting agent", "White-glove support"], color: "border-yellow-600", badge: "ELITE" },
            ].map((plan) => (
              <div key={plan.name} className={`bg-[#0d1b3e] border ${plan.color} rounded-2xl p-6 relative`}>
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full tracking-widest">
                    {plan.badge}
                  </div>
                )}
                <div className="text-blue-400 text-xs font-black tracking-widest mb-2">{plan.name}</div>
                <div className="text-white font-black text-4xl mb-0.5">{plan.price}</div>
                <div className="text-blue-400 text-xs mb-4">{plan.period}</div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="text-blue-300 text-xs flex items-start gap-2">
                      <span className="text-green-400 font-black">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="block text-center bg-blue-600 hover:bg-blue-500 text-white font-black py-2.5 rounded-xl transition-colors text-sm">
                  GET STARTED
                </Link>
              </div>
            ))}
          </div>
          <Link href="/pricing" className="text-blue-400 hover:text-white text-sm underline transition-colors">
            View full pricing details →
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-[#060e24] border-t border-blue-900 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-6xl mb-6">🏆</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">YOUR CAREER STARTS NOW</h2>
          <p className="text-blue-300 text-xl mb-8">
            Join the platform built by a pro athlete, for every athlete. 
            From youth leagues to the NFL Draft — ATHLYNX is your playbook.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-black text-xl px-10 py-4 rounded-2xl transition-all shadow-2xl hover:scale-105"
            >
              JOIN FREE — 7 DAYS →
            </Link>
            <Link
              href="/feed"
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-black text-xl px-10 py-4 rounded-2xl transition-all hover:scale-105"
            >
              ENTER PLATFORM
            </Link>
          </div>
          <p className="text-blue-600 text-xs mt-6">No credit card required. Cancel anytime. Dreams Do Come True 2026.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#040810] border-t border-blue-900 py-6 px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <img src={ATHLYNX_LOGO} alt="ATHLYNX" className="w-8 h-8 rounded-lg" />
          <div className="text-white font-black">ATHLYNX</div>
          <div className="text-blue-600 text-xs">A Dozier Holdings Group Company</div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-xs text-blue-600 mb-3">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="/feed" className="hover:text-white transition-colors">Platform</Link>
          <Link href="/founders" className="hover:text-white transition-colors">Founders</Link>
          <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms</Link>
        </div>
        <div className="text-blue-800 text-xs">© 2026 Dozier Holdings Group. All Rights Reserved.</div>
      </footer>
    </div>
  );
}
