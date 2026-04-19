import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap, Trophy, TrendingUp, Star, Shield, DollarSign,
  Users, FileText, Heart, ArrowRight, CheckCircle, Zap, Target,
  BookOpen, Award, Briefcase, Home, ChevronRight, Play, Lock,
  Globe, Mic, Camera, BarChart3, Building2, Handshake, Clock,
  Rocket, Crown, Medal, Activity
} from "lucide-react";

const STAGES = [
  {
    id: "highschool",
    label: "High School",
    subtitle: "Grades 9–12",
    icon: GraduationCap,
    color: "from-green-500 to-emerald-600",
    accent: "#10b981",
    badge: "START HERE",
    description: "Build your foundation, get discovered, and set yourself up for a full ride.",
    tools: [
      { icon: Target, title: "Recruiting Profile Builder", desc: "Create your official ATHLYNX recruiting profile — film, stats, highlights, GPA, and contact info all in one place coaches can find.", href: "/athlete-playbook", cta: "Build Profile" },
      { icon: Star, title: "NIL Early Access", desc: "Start earning NIL deals as early as 9th grade. Local brands, social media partnerships, and camp appearances — all legal, all tracked.", href: "/nil-portal", cta: "Start Earning" },
      { icon: Users, title: "Coach & Scout Connect", desc: "Direct messaging with college coaches and scouts. Get your film in front of the right people at the right time.", href: "/nil-portal", cta: "Connect Now" },
      { icon: BarChart3, title: "Recruiting Score Tracker", desc: "Your ATHLYNX Recruiting Score updates in real time as you add stats, film, and achievements. Know exactly where you stand.", href: "/athlete-playbook", cta: "Check Score" },
      { icon: BookOpen, title: "Academic Eligibility Monitor", desc: "Track NCAA/NAIA eligibility requirements, GPA, and course credits. Never lose eligibility over a paperwork mistake.", href: "/athlete-playbook", cta: "Track Grades" },
      { icon: Camera, title: "Highlight Reel Studio", desc: "Upload, edit, and share your best moments. ATHLYNX automatically formats your highlights for every platform — Hudl, Twitter, Instagram.", href: "/media-showcase", cta: "Create Reel" },
    ]
  },
  {
    id: "college",
    label: "College",
    subtitle: "NCAA / NAIA / JUCO",
    icon: Trophy,
    color: "from-blue-500 to-indigo-600",
    accent: "#3b82f6",
    badge: "MOST POPULAR",
    description: "Maximize your NIL value, manage your brand, and prepare for the next level.",
    tools: [
      { icon: DollarSign, title: "NIL Deal Marketplace", desc: "Browse and apply for NIL deals from national brands, local businesses, and digital campaigns. Earn while you play.", href: "/nil-marketplace", cta: "Browse Deals" },
      { icon: FileText, title: "NIL Contract Generator", desc: "Generate legally-reviewed NIL contracts in minutes. Endorsement agreements, social media deals, appearance contracts — all covered.", href: "/athlete-legal-hub", cta: "Generate Contract" },
      { icon: Handshake, title: "Agent Finder", desc: "Connect with NFLPA, NBPA, and MLB-certified agents. Compare profiles, read reviews, and schedule consultations directly.", href: "/athlete-legal-hub", cta: "Find Agent" },
      { icon: TrendingUp, title: "Transfer Portal Manager", desc: "Enter, manage, and track your transfer portal journey. Compare schools, communicate with coaches, and make the best decision.", href: "/transfer-portal", cta: "Enter Portal" },
      { icon: BarChart3, title: "NIL Valuation Calculator", desc: "Know your exact market value based on sport, school, social following, and performance stats. Negotiate from a position of power.", href: "/nil-calculator", cta: "Calculate Value" },
      { icon: Shield, title: "Brand Protection", desc: "Trademark your name and likeness. ATHLYNX legal partners help you protect your brand before someone else does.", href: "/athlete-legal-hub", cta: "Protect Brand" },
    ]
  },
  {
    id: "transfer",
    label: "Transfer Portal",
    subtitle: "The New Free Agency",
    icon: Rocket,
    color: "from-purple-500 to-violet-600",
    accent: "#8b5cf6",
    badge: "GAME CHANGER",
    description: "Navigate the transfer portal with confidence. Find the right school, maximize your value.",
    tools: [
      { icon: Globe, title: "School Comparison Engine", desc: "Compare up to 5 schools side-by-side — NIL opportunities, playing time, academic programs, facilities, and coaching staff.", href: "/transfer-portal", cta: "Compare Schools" },
      { icon: Users, title: "Coach Direct Messaging", desc: "Message coaches directly through ATHLYNX. No middlemen. Track every conversation and never miss a deadline.", href: "/transfer-portal", cta: "Message Coaches" },
      { icon: FileText, title: "Transfer Eligibility Checker", desc: "Instantly verify your transfer eligibility, waiver status, and remaining years of competition under current NCAA rules.", href: "/transfer-portal", cta: "Check Eligibility" },
      { icon: DollarSign, title: "NIL Package Comparator", desc: "Compare NIL deal packages from competing schools. See the full financial picture before you commit.", href: "/nil-calculator", cta: "Compare Packages" },
      { icon: Briefcase, title: "Transfer Timeline Manager", desc: "Never miss a portal window, commitment deadline, or signing date. Your transfer timeline, fully managed.", href: "/transfer-portal", cta: "View Timeline" },
      { icon: Star, title: "Transfer Success Stories", desc: "Read real stories from athletes who used ATHLYNX to find the perfect fit and maximize their career.", href: "/athlete-playbook", cta: "Read Stories" },
    ]
  },
  {
    id: "pro",
    label: "Professional",
    subtitle: "NFL · NBA · MLB · NHL · MLS & More",
    icon: Crown,
    color: "from-yellow-500 to-orange-500",
    accent: "#f59e0b",
    badge: "ELITE",
    description: "From draft day to your first contract — manage your professional career like a business.",
    tools: [
      { icon: FileText, title: "Pro Contract Analyzer", desc: "Upload any professional contract and get an instant AI-powered analysis. Understand every clause, bonus, and guarantee.", href: "/athlete-legal-hub", cta: "Analyze Contract" },
      { icon: Handshake, title: "Certified Agent Network", desc: "Connect with NFLPA, NBPA, MLBPA, and NHLPA certified agents. Verified, reviewed, and rated by athletes like you.", href: "/athlete-legal-hub", cta: "Find Pro Agent" },
      { icon: DollarSign, title: "Endorsement Deal Hub", desc: "Manage all your endorsement deals in one place. Track deliverables, payments, and renewal dates. Never leave money on the table.", href: "/athlete-legal-hub", cta: "Manage Deals" },
      { icon: BarChart3, title: "Financial Dashboard", desc: "Track your income, investments, and expenses across all sources. Built for athletes with complex, multi-source income.", href: "/athlete-legal-hub", cta: "View Dashboard" },
      { icon: Shield, title: "Insurance & Protection", desc: "Disability insurance, career-ending injury coverage, and asset protection — tailored for professional athletes.", href: "/athlete-legal-hub", cta: "Get Protected" },
      { icon: Globe, title: "International Opportunities", desc: "Explore leagues in Europe, Asia, and beyond. ATHLYNX connects you with international agents and teams.", href: "/nil-marketplace", cta: "Go Global" },
    ]
  },
  {
    id: "retirement",
    label: "Retirement & Legacy",
    subtitle: "Life After the Game",
    icon: Heart,
    color: "from-rose-500 to-pink-600",
    accent: "#f43f5e",
    badge: "LEGACY",
    description: "Your career doesn't end when the game does. Build your legacy, protect your wealth, and thrive.",
    tools: [
      { icon: DollarSign, title: "Wealth Management Connect", desc: "Connect with financial advisors who specialize in athlete retirement. Protect what you earned and grow it for generations.", href: "/athlete-legal-hub", cta: "Find Advisor" },
      { icon: Mic, title: "Media & Broadcasting", desc: "Transition into broadcasting, podcasting, and media. ATHLYNX connects retired athletes with networks and production companies.", href: "/podcast", cta: "Explore Media" },
      { icon: Briefcase, title: "Business Venture Hub", desc: "Launch your post-career business with ATHLYNX's network of investors, mentors, and fellow athlete-entrepreneurs.", href: "/nil-marketplace", cta: "Start Business" },
      { icon: BookOpen, title: "Coaching & Mentorship", desc: "Give back to the next generation. Build your coaching profile and connect with youth programs, colleges, and academies.", href: "/athlete-playbook", cta: "Start Coaching" },
      { icon: Heart, title: "Foundation & Charity", desc: "Launch your charitable foundation with ATHLYNX's legal and administrative support. Create your legacy off the field.", href: "/athlete-legal-hub", cta: "Start Foundation" },
      { icon: Award, title: "Brand Ambassador Program", desc: "Continue earning through long-term brand ambassador deals. Your name and story still have value — let ATHLYNX monetize it.", href: "/athlete-legal-hub", cta: "Become Ambassador" },
    ]
  }
];

const STATS = [
  { value: "50,000+", label: "Athletes Managed" },
  { value: "$2.4B+", label: "NIL Deals Facilitated" },
  { value: "1,200+", label: "College Programs" },
  { value: "32", label: "Pro Sports Leagues" },
];

export default function AthleteJourney() {
  const [activeStage, setActiveStage] = useState("highschool");
  const stage = STAGES.find(s => s.id === activeStage)!;
  const StageIcon = stage.icon;

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0a0f1e] via-[#0d1a3a] to-[#0a0f1e] border-b border-blue-900/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.15),_transparent_60%)]" />
        <div className="relative max-w-6xl mx-auto px-4 py-16 text-center">
          <Badge className="mb-4 bg-blue-600/20 text-blue-300 border-blue-500/30 text-sm px-4 py-1">
            THE COMPLETE ATHLETE LIFECYCLE PLATFORM
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            From <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">High School</span>
            <br />to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Legacy</span>
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
            ATHLYNX manages every stage of your athletic career — recruiting, NIL deals, transfer portal, pro contracts, endorsements, and retirement planning. One platform. Your entire career.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <Link href="/signin">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-8 py-3 text-lg rounded-xl shadow-lg shadow-blue-900/40">
                Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/podcast">
              <Button variant="outline" className="border-blue-700 text-blue-300 hover:bg-blue-900/40 font-bold px-8 py-3 text-lg rounded-xl">
                <Play className="mr-2 w-5 h-5" /> Watch Stories
              </Button>
            </Link>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {STATS.map(s => (
              <div key={s.label} className="bg-blue-900/20 rounded-xl p-4 border border-blue-800/30">
                <div className="text-2xl font-black text-blue-300">{s.value}</div>
                <div className="text-xs text-blue-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stage Selector */}
      <div className="sticky top-0 z-20 bg-[#0a0f1e]/95 backdrop-blur-sm border-b border-blue-900/40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-3 scrollbar-hide">
            {STAGES.map(s => {
              const Icon = s.icon;
              const isActive = s.id === activeStage;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStage(s.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all shrink-0 ${
                    isActive
                      ? `bg-gradient-to-r ${s.color} text-white shadow-lg`
                      : "text-blue-400 hover:bg-blue-900/40 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {s.label}
                  {s.badge && isActive && (
                    <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded-full font-black">{s.badge}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stage Content */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Stage Header */}
        <div className={`rounded-2xl bg-gradient-to-r ${stage.color} p-8 mb-8 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative flex items-start gap-6">
            <div className="bg-white/20 rounded-2xl p-4 shrink-0">
              <StageIcon className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-black text-white">{stage.label}</h2>
                <Badge className="bg-white/20 text-white border-white/30 font-bold">{stage.subtitle}</Badge>
                <Badge className="bg-black/30 text-white border-white/20 font-black text-xs">{stage.badge}</Badge>
              </div>
              <p className="text-white/90 text-lg max-w-2xl">{stage.description}</p>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {stage.tools.map((tool, i) => {
            const ToolIcon = tool.icon;
            return (
              <div key={i} className="bg-[#0d1a3a] rounded-2xl border border-blue-900/40 p-6 hover:border-blue-600/60 transition-all group hover:bg-[#0f1f47]">
                <div className="flex items-start gap-4 mb-4">
                  <div className="rounded-xl p-2.5 shrink-0" style={{ backgroundColor: stage.accent + "22" }}>
                    <ToolIcon className="w-6 h-6" style={{ color: stage.accent }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base leading-tight">{tool.title}</h3>
                  </div>
                </div>
                <p className="text-blue-300 text-sm leading-relaxed mb-5">{tool.desc}</p>
                <Link href={tool.href}>
                  <Button
                    size="sm"
                    className="w-full font-bold text-white rounded-lg"
                    style={{ background: `linear-gradient(to right, ${stage.accent}cc, ${stage.accent}88)` }}
                  >
                    {tool.cta} <ChevronRight className="ml-1 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Journey Progress Bar */}
        <div className="bg-[#0d1a3a] rounded-2xl border border-blue-900/40 p-6 mb-8">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
            Your Complete Career Path
          </h3>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {STAGES.map((s, i) => {
              const Icon = s.icon;
              const isActive = s.id === activeStage;
              const isPast = STAGES.findIndex(x => x.id === activeStage) > i;
              return (
                <div key={s.id} className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setActiveStage(s.id)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                      isActive ? `bg-gradient-to-b ${s.color} shadow-lg` :
                      isPast ? "bg-blue-900/40 opacity-60" : "bg-blue-900/20 hover:bg-blue-900/40"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-white" : isPast ? "text-blue-400" : "text-blue-600"}`} />
                    <span className={`text-[10px] font-bold ${isActive ? "text-white" : "text-blue-400"}`}>{s.label}</span>
                    {isPast && <CheckCircle className="w-3 h-3 text-green-400" />}
                  </button>
                  {i < STAGES.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-blue-700 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl border border-blue-700/40 p-8 text-center">
          <h3 className="text-2xl font-black text-white mb-2">Ready to Take Control of Your Career?</h3>
          <p className="text-blue-300 mb-6 max-w-xl mx-auto">
            Join 50,000+ athletes who use ATHLYNX to manage every stage of their career — from first practice to final paycheck.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/signin">
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white font-black px-8 py-3 rounded-xl text-lg shadow-lg shadow-blue-900/40">
                Create Free Account <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/athlete-legal-hub">
              <Button variant="outline" className="border-blue-600 text-blue-300 hover:bg-blue-900/40 font-bold px-8 py-3 rounded-xl text-lg">
                <FileText className="mr-2 w-5 h-5" /> Legal & Deals Hub
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
