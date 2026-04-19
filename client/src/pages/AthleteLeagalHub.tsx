import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  FileText, Scale, Handshake, DollarSign, Search, Star, Shield,
  CheckCircle, ArrowRight, ChevronRight, Users, Briefcase, Award,
  TrendingUp, Globe, Phone, Mail, Clock, Zap, Lock, Download,
  Building2, Heart, Mic, Camera, Filter, MapPin, ExternalLink
} from "lucide-react";

// ─── Contract Templates ───────────────────────────────────────────────────────
const CONTRACT_CATEGORIES = [
  { id: "all", label: "All Contracts" },
  { id: "nil", label: "NIL Deals" },
  { id: "endorsement", label: "Endorsements" },
  { id: "agent", label: "Agent & Rep" },
  { id: "appearance", label: "Appearances" },
  { id: "media", label: "Media & Content" },
  { id: "pro", label: "Professional" },
  { id: "protection", label: "Protection" },
];

const CONTRACTS = [
  { id: 1, title: "NIL Endorsement Agreement", category: "nil", desc: "Standard NIL deal between athlete and brand. Covers deliverables, payment, exclusivity, and term.", popular: true, tier: "free", pages: "4–6 pages" },
  { id: 2, title: "Social Media Sponsorship Contract", category: "endorsement", desc: "For Instagram, TikTok, YouTube, and X campaigns. Includes post requirements, approval rights, and FTC disclosure.", popular: true, tier: "free", pages: "3–5 pages" },
  { id: 3, title: "Athlete Representation Agreement", category: "agent", desc: "Full representation contract between athlete and sports agent. Covers scope, commission, term, and termination.", popular: true, tier: "pro", pages: "8–12 pages" },
  { id: 4, title: "Appearance & Autograph Agreement", category: "appearance", desc: "For personal appearances, signings, and fan events. Covers fee, travel, cancellation, and image rights.", popular: false, tier: "free", pages: "2–3 pages" },
  { id: 5, title: "Podcast & Media Appearance Release", category: "media", desc: "Releases rights for podcast, radio, TV, and digital media appearances. Includes compensation terms.", popular: false, tier: "free", pages: "2 pages" },
  { id: 6, title: "Brand Ambassador Agreement", category: "endorsement", desc: "Long-term brand ambassador deal. Covers exclusivity, territory, compensation, and brand guidelines.", popular: true, tier: "pro", pages: "6–8 pages" },
  { id: 7, title: "Licensing Agreement (Name & Likeness)", category: "nil", desc: "License your name, image, and likeness to a third party. Covers royalties, territory, and usage rights.", popular: false, tier: "pro", pages: "5–7 pages" },
  { id: 8, title: "Non-Disclosure Agreement (NDA)", category: "protection", desc: "Protect confidential information in business negotiations. Mutual or one-way NDA options.", popular: true, tier: "free", pages: "2–3 pages" },
  { id: 9, title: "Professional Player Contract Addendum", category: "pro", desc: "Supplemental terms to a standard pro contract. Covers bonuses, marketing rights, and personal conduct.", popular: false, tier: "elite", pages: "3–4 pages" },
  { id: 10, title: "Coaching & Training Services Agreement", category: "appearance", desc: "For athlete-coaches offering personal training, camps, or clinics. Covers liability, payment, and IP.", popular: false, tier: "free", pages: "3–4 pages" },
  { id: 11, title: "Content Creation & Influencer Agreement", category: "media", desc: "For athletes creating sponsored content. Covers creative control, approval process, and payment schedule.", popular: true, tier: "free", pages: "4–5 pages" },
  { id: 12, title: "Merch & Product Collaboration Deal", category: "endorsement", desc: "Co-branded merchandise agreement. Covers royalties, design approval, production, and distribution.", popular: false, tier: "pro", pages: "5–6 pages" },
];

// ─── Agents ───────────────────────────────────────────────────────────────────
const AGENTS = [
  { id: 1, name: "Marcus Williams", cert: "NFLPA Certified", sports: ["Football"], location: "Dallas, TX", clients: 34, rating: 4.9, deals: "$180M+", specialty: "Offensive Line & Skill Positions", verified: true },
  { id: 2, name: "Jennifer Park", cert: "NBPA Certified", sports: ["Basketball"], location: "Los Angeles, CA", clients: 22, rating: 5.0, deals: "$420M+", specialty: "Guards & Forwards, International Players", verified: true },
  { id: 3, name: "David Reyes", cert: "MLBPA Certified", sports: ["Baseball"], location: "Miami, FL", clients: 41, rating: 4.8, deals: "$95M+", specialty: "Pitchers & Latin American Players", verified: true },
  { id: 4, name: "Sarah Thompson", cert: "Multi-Sport Certified", sports: ["Soccer", "Track", "Tennis"], location: "New York, NY", clients: 58, rating: 4.9, deals: "$67M+", specialty: "Women's Sports & International Markets", verified: true },
  { id: 5, name: "Kevin Johnson", cert: "NFLPA Certified", sports: ["Football"], location: "Atlanta, GA", clients: 29, rating: 4.7, deals: "$210M+", specialty: "Quarterbacks & Defensive Backs", verified: true },
  { id: 6, name: "Michelle Chen", cert: "NBPA Certified", sports: ["Basketball"], location: "Chicago, IL", clients: 18, rating: 5.0, deals: "$380M+", specialty: "Centers & Power Forwards, Endorsements", verified: true },
];

// ─── Financial Advisors ───────────────────────────────────────────────────────
const ADVISORS = [
  { id: 1, name: "Robert Martinez", cert: "CFP, Athlete Specialist", firm: "Athlete Wealth Partners", location: "Houston, TX", athletes: 120, rating: 4.9, aum: "$340M", specialty: "NFL/NBA Wealth Management, Tax Strategy", verified: true },
  { id: 2, name: "Angela Brooks", cert: "CFA, Sports Finance", firm: "ProAthlete Financial", location: "New York, NY", athletes: 85, rating: 5.0, aum: "$520M", specialty: "Investment Management, Retirement Planning", verified: true },
  { id: 3, name: "James Wilson", cert: "CFP, Estate Planning", firm: "Legacy Athlete Advisors", location: "Los Angeles, CA", athletes: 67, rating: 4.8, aum: "$280M", specialty: "Estate Planning, Business Ventures, Real Estate", verified: true },
  { id: 4, name: "Priya Patel", cert: "CPA, Tax Specialist", firm: "Athlete Tax Solutions", location: "Chicago, IL", athletes: 200, rating: 4.9, aum: "N/A", specialty: "Tax Optimization, Multi-State Filing, NIL Tax", verified: true },
  { id: 5, name: "Thomas Reed", cert: "CFP, Insurance Specialist", firm: "Athlete Protection Group", location: "Dallas, TX", athletes: 95, rating: 4.7, aum: "$190M", specialty: "Disability Insurance, Career-Ending Coverage", verified: true },
  { id: 6, name: "Lisa Chang", cert: "CFP, NIL Specialist", firm: "NIL Financial Group", location: "Nashville, TN", athletes: 310, rating: 5.0, aum: "$145M", specialty: "NIL Income Management, College Athlete Finance", verified: true },
];

// ─── Endorsement Deals ────────────────────────────────────────────────────────
const ENDORSEMENT_DEALS = [
  { id: 1, brand: "Nike", category: "Apparel", value: "$10K–$50K", type: "Social Media + Appearances", requirements: "10K+ followers, D1 or Pro athlete", deadline: "Rolling", featured: true, logo: "👟" },
  { id: 2, brand: "Gatorade", category: "Nutrition", value: "$5K–$20K", type: "Product Endorsement + Content", requirements: "5K+ followers, Any sport", deadline: "Rolling", featured: true, logo: "⚡" },
  { id: 3, brand: "Under Armour", category: "Apparel", value: "$8K–$35K", type: "Ambassador Program", requirements: "8K+ followers, Performance sport", deadline: "May 30, 2026", featured: true, logo: "🛡️" },
  { id: 4, brand: "Beats by Dre", category: "Electronics", value: "$3K–$15K", type: "Social Media Campaign", requirements: "15K+ followers, Any sport", deadline: "June 15, 2026", featured: false, logo: "🎧" },
  { id: 5, brand: "Fanatics", category: "Merchandise", value: "$4K–$12K", type: "Merch Collaboration", requirements: "Strong fan base, Any level", deadline: "Rolling", featured: false, logo: "🏆" },
  { id: 6, brand: "Muscle Milk", category: "Nutrition", value: "$2K–$8K", type: "Affiliate + Content", requirements: "2K+ followers, Any athlete", deadline: "Rolling", featured: false, logo: "💪" },
  { id: 7, brand: "State Farm", category: "Insurance", value: "$5K–$25K", type: "TV + Social Campaign", requirements: "College or Pro, 20K+ followers", deadline: "July 1, 2026", featured: true, logo: "🏠" },
  { id: 8, brand: "Panini America", category: "Trading Cards", value: "$3K–$10K", type: "Autograph Deal", requirements: "Draft prospect or Pro", deadline: "Rolling", featured: false, logo: "🃏" },
  { id: 9, brand: "Topps", category: "Collectibles", value: "$2K–$8K", type: "Signature Series", requirements: "Any level athlete", deadline: "Rolling", featured: false, logo: "⭐" },
  { id: 10, brand: "Local Auto Group", category: "Automotive", value: "$2K–$6K", type: "Appearance + Social", requirements: "Local athlete, 2K+ followers", deadline: "Rolling", featured: false, logo: "🚗" },
  { id: 11, brand: "Campus Protein", category: "Nutrition", value: "$1K–$4K", type: "Affiliate Program", requirements: "Any athlete, 1K+ followers", deadline: "Rolling", featured: false, logo: "🥤" },
  { id: 12, brand: "ATHLYNX Brand Partners", category: "Platform", value: "$500–$5K", type: "Platform Ambassador", requirements: "Active ATHLYNX member", deadline: "Rolling", featured: true, logo: "🔥" },
];

const TIER_COLORS: Record<string, string> = {
  free: "bg-green-900/30 text-green-400 border-green-700/40",
  pro: "bg-blue-900/30 text-blue-400 border-blue-700/40",
  elite: "bg-yellow-900/30 text-yellow-400 border-yellow-700/40",
};

export default function AthleteLeagalHub() {
  const [activeTab, setActiveTab] = useState<"contracts" | "agents" | "advisors" | "endorsements">("contracts");
  const [contractCategory, setContractCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filteredContracts = CONTRACTS.filter(c =>
    (contractCategory === "all" || c.category === contractCategory) &&
    (search === "" || c.title.toLowerCase().includes(search.toLowerCase()))
  );

  const TABS = [
    { id: "contracts", label: "Contract Templates", icon: FileText, count: CONTRACTS.length },
    { id: "agents", label: "Find an Agent", icon: Handshake, count: AGENTS.length },
    { id: "advisors", label: "Financial Advisors", icon: DollarSign, count: ADVISORS.length },
    { id: "endorsements", label: "Endorsement Deals", icon: Star, count: ENDORSEMENT_DEALS.length },
  ] as const;

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#0a0f1e] via-[#0d1a3a] to-[#0a0f1e] border-b border-blue-900/40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(59,130,246,0.12),_transparent_60%)]" />
        <div className="relative max-w-6xl mx-auto px-4 py-14">
          <div className="flex items-start gap-6">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-4 shrink-0 shadow-xl shadow-blue-900/40">
              <Scale className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <Badge className="mb-3 bg-blue-600/20 text-blue-300 border-blue-500/30">ATHLETE LEGAL & DEALS HUB</Badge>
              <h1 className="text-4xl md:text-5xl font-black mb-3 leading-tight">
                Protect Your Career.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Maximize Your Value.</span>
              </h1>
              <p className="text-blue-200 text-lg max-w-2xl mb-6">
                Contracts, agents, financial advisors, and endorsement deals — everything an athlete needs to protect their name, maximize their income, and build a legacy. Powered by ATHLYNX.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: FileText, text: "50+ Contract Templates" },
                  { icon: Shield, text: "Verified Professionals" },
                  { icon: Zap, text: "Instant Access" },
                  { icon: Lock, text: "Legally Reviewed" },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-2 text-sm text-blue-300">
                    <item.icon className="w-4 h-4 text-blue-400" />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-20 bg-[#0a0f1e]/95 backdrop-blur-sm border-b border-blue-900/40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-3">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all shrink-0 ${
                    isActive ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg" : "text-blue-400 hover:bg-blue-900/40 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${isActive ? "bg-white/20 text-white" : "bg-blue-900 text-blue-400"}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* ── CONTRACT TEMPLATES ── */}
        {activeTab === "contracts" && (
          <div>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                <Input
                  placeholder="Search contracts..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-10 bg-[#0d1a3a] border-blue-800 text-white placeholder:text-blue-600"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {CONTRACT_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setContractCategory(cat.id)}
                    className={`px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                      contractCategory === cat.id ? "bg-blue-600 text-white" : "bg-blue-900/30 text-blue-400 hover:bg-blue-900/60"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredContracts.map(contract => (
                <div key={contract.id} className="bg-[#0d1a3a] rounded-2xl border border-blue-900/40 p-5 hover:border-blue-600/50 transition-all group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="bg-blue-900/40 rounded-xl p-2.5">
                      <FileText className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex gap-2">
                      {contract.popular && <Badge className="bg-orange-900/30 text-orange-400 border-orange-700/40 text-[10px]">POPULAR</Badge>}
                      <Badge className={`text-[10px] border ${TIER_COLORS[contract.tier]}`}>{contract.tier.toUpperCase()}</Badge>
                    </div>
                  </div>
                  <h3 className="font-bold text-white mb-2 leading-tight">{contract.title}</h3>
                  <p className="text-blue-300 text-sm mb-3 leading-relaxed">{contract.desc}</p>
                  <div className="flex items-center justify-between text-xs text-blue-500 mb-4">
                    <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{contract.pages}</span>
                    <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500" />Legally Reviewed</span>
                  </div>
                  <Button size="sm" className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-lg">
                    <Download className="w-4 h-4 mr-2" /> Use Template
                  </Button>
                </div>
              ))}
            </div>

            {/* AI Contract Generator CTA */}
            <div className="mt-8 bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl border border-indigo-700/40 p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="bg-indigo-700/40 rounded-2xl p-4 shrink-0">
                <Zap className="w-8 h-8 text-indigo-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-black text-white mb-1">Need a Custom Contract?</h3>
                <p className="text-indigo-200 text-sm">Our AI Contract Generator creates a fully customized, legally-reviewed contract in under 2 minutes. Just answer a few questions.</p>
              </div>
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-black px-6 py-3 rounded-xl whitespace-nowrap shadow-lg">
                Generate Custom Contract <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ── AGENT FINDER ── */}
        {activeTab === "agents" && (
          <div>
            <div className="bg-[#0d1a3a] rounded-2xl border border-blue-900/40 p-5 mb-6">
              <h3 className="font-bold text-white mb-2 flex items-center gap-2"><Shield className="w-5 h-5 text-blue-400" />Why Use ATHLYNX to Find an Agent?</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["All agents verified & certified", "Read real athlete reviews", "Compare commission rates", "Schedule free consultations"].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-blue-300">
                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />{item}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {AGENTS.map(agent => (
                <div key={agent.id} className="bg-[#0d1a3a] rounded-2xl border border-blue-900/40 p-6 hover:border-blue-600/50 transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-800 flex items-center justify-center text-2xl font-black text-white shrink-0">
                      {agent.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-black text-white text-lg">{agent.name}</h3>
                        {agent.verified && <CheckCircle className="w-4 h-4 text-blue-400" />}
                      </div>
                      <Badge className="bg-blue-900/40 text-blue-300 border-blue-700/40 text-xs mb-1">{agent.cert}</Badge>
                      <div className="flex items-center gap-1 text-yellow-400 text-sm">
                        {"★".repeat(Math.floor(agent.rating))}
                        <span className="text-blue-400 ml-1">{agent.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-blue-900/20 rounded-lg p-2 text-center">
                      <div className="text-sm font-black text-white">{agent.clients}</div>
                      <div className="text-[10px] text-blue-400">Clients</div>
                    </div>
                    <div className="bg-blue-900/20 rounded-lg p-2 text-center">
                      <div className="text-sm font-black text-green-400">{agent.deals}</div>
                      <div className="text-[10px] text-blue-400">Deals Done</div>
                    </div>
                    <div className="bg-blue-900/20 rounded-lg p-2 text-center">
                      <div className="text-sm font-black text-white">{agent.sports.join(", ")}</div>
                      <div className="text-[10px] text-blue-400">Sport(s)</div>
                    </div>
                  </div>
                  <p className="text-blue-300 text-sm mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" />{agent.location}</p>
                  <p className="text-blue-400 text-xs mb-4">Specialty: {agent.specialty}</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-lg">
                      <Phone className="w-3 h-3 mr-1" /> Schedule Call
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 border-blue-700 text-blue-300 hover:bg-blue-900/40 font-bold rounded-lg">
                      <Mail className="w-3 h-3 mr-1" /> Send Message
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FINANCIAL ADVISORS ── */}
        {activeTab === "advisors" && (
          <div>
            <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-2xl border border-green-700/30 p-5 mb-6">
              <h3 className="font-bold text-white mb-2 flex items-center gap-2"><DollarSign className="w-5 h-5 text-green-400" />Athlete-Specialized Financial Advisors</h3>
              <p className="text-green-200 text-sm">Every advisor in our network specializes in athlete finances — NIL income, multi-state taxes, short career windows, and long-term wealth building. All verified and reviewed by athletes.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {ADVISORS.map(advisor => (
                <div key={advisor.id} className="bg-[#0d1a3a] rounded-2xl border border-blue-900/40 p-6 hover:border-green-600/40 transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-700 to-emerald-800 flex items-center justify-center text-2xl font-black text-white shrink-0">
                      {advisor.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-black text-white text-lg">{advisor.name}</h3>
                        {advisor.verified && <CheckCircle className="w-4 h-4 text-green-400" />}
                      </div>
                      <div className="text-xs text-green-300 mb-1">{advisor.cert} · {advisor.firm}</div>
                      <div className="flex items-center gap-1 text-yellow-400 text-sm">
                        {"★".repeat(Math.floor(advisor.rating))}
                        <span className="text-blue-400 ml-1">{advisor.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-green-900/20 rounded-lg p-2 text-center">
                      <div className="text-sm font-black text-white">{advisor.athletes}</div>
                      <div className="text-[10px] text-green-400">Athletes</div>
                    </div>
                    <div className="bg-green-900/20 rounded-lg p-2 text-center">
                      <div className="text-sm font-black text-green-400">{advisor.aum}</div>
                      <div className="text-[10px] text-green-400">AUM</div>
                    </div>
                    <div className="bg-green-900/20 rounded-lg p-2 text-center">
                      <div className="text-sm font-black text-white">{advisor.location.split(",")[1]?.trim() || advisor.location}</div>
                      <div className="text-[10px] text-green-400">Location</div>
                    </div>
                  </div>
                  <p className="text-blue-400 text-xs mb-4">Specialty: {advisor.specialty}</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-green-700 hover:bg-green-600 text-white font-bold rounded-lg">
                      <Phone className="w-3 h-3 mr-1" /> Free Consultation
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 border-green-700 text-green-300 hover:bg-green-900/20 font-bold rounded-lg">
                      <Mail className="w-3 h-3 mr-1" /> Send Message
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ENDORSEMENT DEALS ── */}
        {activeTab === "endorsements" && (
          <div>
            <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-2xl border border-yellow-700/30 p-5 mb-6">
              <h3 className="font-bold text-white mb-2 flex items-center gap-2"><Star className="w-5 h-5 text-yellow-400" />Live Endorsement Opportunities</h3>
              <p className="text-yellow-200 text-sm">Browse active endorsement deals from national brands and local businesses. Apply directly through ATHLYNX — no agent required for most deals. Use our AI to match you with the best opportunities for your profile.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ENDORSEMENT_DEALS.map(deal => (
                <div key={deal.id} className={`bg-[#0d1a3a] rounded-2xl border p-5 hover:border-yellow-600/40 transition-all ${deal.featured ? "border-yellow-700/40" : "border-blue-900/40"}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">{deal.logo}</div>
                    <div className="flex gap-1">
                      {deal.featured && <Badge className="bg-yellow-900/30 text-yellow-400 border-yellow-700/40 text-[10px]">FEATURED</Badge>}
                      <Badge className="bg-blue-900/30 text-blue-400 border-blue-700/40 text-[10px]">{deal.category}</Badge>
                    </div>
                  </div>
                  <h3 className="font-black text-white text-lg mb-1">{deal.brand}</h3>
                  <p className="text-sm text-blue-300 mb-3">{deal.type}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-400">Deal Value</span>
                      <span className="text-green-400 font-bold">{deal.value}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-400">Requirements</span>
                      <span className="text-white text-xs text-right max-w-[60%]">{deal.requirements}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-400">Deadline</span>
                      <span className="text-white">{deal.deadline}</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-bold rounded-lg">
                    Apply Now <ArrowRight className="ml-1 w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Submit Your Deal CTA */}
            <div className="mt-8 bg-gradient-to-r from-yellow-900/40 to-orange-900/40 rounded-2xl border border-yellow-700/30 p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="bg-yellow-700/30 rounded-2xl p-4 shrink-0">
                <Building2 className="w-8 h-8 text-yellow-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-black text-white mb-1">Are You a Brand?</h3>
                <p className="text-yellow-200 text-sm">Post your endorsement opportunity and connect with thousands of verified athletes across every sport and level.</p>
              </div>
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-black px-6 py-3 rounded-xl whitespace-nowrap shadow-lg">
                Post a Deal <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
