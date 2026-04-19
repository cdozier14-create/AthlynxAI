import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";

const nilDeals = [
  { brand: "Nike", type: "Sponsorship", duration: "12 months", value: 25000, status: "Active", statusColor: "bg-green-500" },
  { brand: "Gatorade", type: "Social Post", duration: "6 months", value: 5000, status: "Active", statusColor: "bg-green-500" },
  { brand: "Local Auto Dealer", type: "Appearance", duration: "One-time", value: 2500, status: "Pending", statusColor: "bg-yellow-500" },
  { brand: "Under Armour", type: "Equipment Deal", duration: "1 season", value: 3000, status: "Negotiating", statusColor: "bg-blue-500" },
  { brand: "Protein World", type: "Ambassador", duration: "6 months", value: 1500, status: "Completed", statusColor: "bg-gray-500" },
];

const fuelInsights = [
  {
    title: "Speed Training Alert",
    desc: "Your 40-time can improve 0.05s with targeted drills",
    icon: "⚡",
    color: "from-orange-900/50 to-red-900/30",
    borderColor: "border-orange-700/40",
    labelColor: "text-orange-400",
    cta: "View Plan",
  },
  {
    title: "Recruiting Window Open",
    desc: "3 D1 coaches viewed your profile this week. Follow up now.",
    icon: "🎓",
    color: "from-blue-900/50 to-cyan-900/30",
    borderColor: "border-blue-700/40",
    labelColor: "text-blue-400",
    cta: "View Coaches",
  },
  {
    title: "NIL Opportunity",
    desc: "New local brand deal available — $1,200 for 2 social posts",
    icon: "💰",
    color: "from-green-900/50 to-emerald-900/30",
    borderColor: "border-green-700/40",
    labelColor: "text-green-400",
    cta: "View Deal",
  },
];

const stats = [
  { label: "Profile Views", value: "1,247", change: "+18%", icon: "👁️", color: "text-blue-400" },
  { label: "NIL Earnings", value: "$32,500", change: "+$5K", icon: "💵", color: "text-green-400" },
  { label: "Recruiting Score", value: "94/100", change: "+3pts", icon: "📊", color: "text-purple-400" },
  { label: "Social Reach", value: "48.2K", change: "+2.1K", icon: "📱", color: "text-orange-400" },
];

const upcomingEvents = [
  { name: "Nike EYBL Peach Jam", date: "Jul 8", type: "Tournament", status: "Registered" },
  { name: "Coach Williams Call", date: "Apr 18", type: "Recruiting", status: "Scheduled" },
  { name: "Brand Deal Deadline", date: "Apr 20", type: "NIL", status: "Action Needed" },
  { name: "Film Review Session", date: "Apr 22", type: "Training", status: "Upcoming" },
];

export default function AthleteDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "nil" | "recruiting" | "training">("overview");

  const totalNIL = nilDeals.filter(d => d.status === "Active" || d.status === "Completed").reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="min-h-screen bg-[#060d1a]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#060d1a]/95 backdrop-blur border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-400 hover:text-white text-sm">← ATHLYNX</Link>
            <span className="text-gray-600">|</span>
            <div>
              <div className="text-cyan-400 font-black text-lg leading-none">ATHLETE</div>
              <div className="text-cyan-400 font-black text-lg leading-none">DASHBOARD</div>
              <div className="text-gray-500 text-xs">Powered by ATHLYNX</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-bold">Verified</span>
            </div>
            <button className="text-gray-300 hover:text-white text-sm border border-blue-900/40 px-3 py-1.5 rounded-lg">
              Settings
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/20 border border-blue-700/30 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-black text-white">
                Welcome back, {user?.name?.split(" ")[0] || "Athlete"} 👋
              </h1>
              <p className="text-gray-400 text-sm mt-1">Your platform is working for you 24/7. Here's your update.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-blue-600/20 border border-blue-600/30 rounded-xl px-4 py-2 text-center">
                <div className="text-blue-400 font-black text-xl">{nilDeals.filter(d => d.status === "Active").length}</div>
                <div className="text-gray-500 text-xs">Active Deals</div>
              </div>
              <div className="bg-green-600/20 border border-green-600/30 rounded-xl px-4 py-2 text-center">
                <div className="text-green-400 font-black text-xl">${(totalNIL / 1000).toFixed(0)}K</div>
                <div className="text-gray-500 text-xs">NIL Earned</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-white/5 border border-blue-900/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{s.icon}</span>
                <span className="text-green-400 text-xs font-bold">{s.change}</span>
              </div>
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-gray-500 text-xs">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {(["overview", "nil", "recruiting", "training"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg font-bold text-sm capitalize whitespace-nowrap transition-all ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {tab === "nil" ? "NIL Activity" : tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* FUEL Bot Insights */}
            <div>
              <h2 className="text-white font-black text-lg mb-4">🤖 FUEL Bot Insights</h2>
              <div className="space-y-4">
                {fuelInsights.map((insight) => (
                  <div key={insight.title} className={`bg-gradient-to-r ${insight.color} border ${insight.borderColor} rounded-xl p-5`}>
                    <div className={`text-xs font-bold mb-2 ${insight.labelColor}`}>FUEL Bot Insight</div>
                    <h3 className="text-white font-bold text-lg mb-1">{insight.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{insight.desc}</p>
                    <button className="bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
                      {insight.cta}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events + Quick Links */}
            <div className="space-y-6">
              <div>
                <h2 className="text-white font-black text-lg mb-4">📅 Upcoming</h2>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.name} className="bg-white/5 border border-blue-900/20 rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <div className="text-white font-bold text-sm">{event.name}</div>
                        <div className="text-gray-500 text-xs">{event.date} · {event.type}</div>
                      </div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        event.status === "Registered" ? "bg-green-500/20 text-green-400" :
                        event.status === "Action Needed" ? "bg-red-500/20 text-red-400" :
                        event.status === "Scheduled" ? "bg-blue-500/20 text-blue-400" :
                        "bg-gray-500/20 text-gray-400"
                      }`}>
                        {event.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-white font-black text-lg mb-4">⚡ Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Update Profile", icon: "👤", href: "/profile" },
                    { label: "Browse NIL Deals", icon: "💰", href: "/nil-portal" },
                    { label: "Find Tournaments", icon: "🏆", href: "/gridiron-nexus" },
                    { label: "AI Recruiter", icon: "🤖", href: "/ai-recruiter" },
                    { label: "Film Review", icon: "🎬", href: "/warriors-playbook" },
                    { label: "Social Hub", icon: "📱", href: "/feed" },
                  ].map((action) => (
                    <Link key={action.label} href={action.href}
                      className="bg-white/5 hover:bg-blue-600/20 border border-blue-900/20 hover:border-blue-600/40 rounded-xl p-3 flex items-center gap-2 transition-all">
                      <span className="text-xl">{action.icon}</span>
                      <span className="text-white text-xs font-bold">{action.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "nil" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-black text-xl">Recent NIL Activity</h2>
              <Link href="/nil-portal" className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
                Browse All Deals
              </Link>
            </div>
            <div className="space-y-4">
              {nilDeals.map((deal) => (
                <div key={deal.brand} className="bg-white/5 border border-blue-900/20 rounded-xl p-5 flex items-center justify-between hover:border-blue-600/40 transition-all">
                  <div>
                    <div className="text-white font-bold text-lg">{deal.brand}</div>
                    <div className="text-gray-400 text-sm">{deal.type} · {deal.duration}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-black text-xl">${deal.value.toLocaleString()}</div>
                    <span className={`text-xs font-bold text-white px-2 py-0.5 rounded-full ${deal.statusColor}`}>
                      {deal.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-gradient-to-r from-green-900/30 to-emerald-900/20 border border-green-700/30 rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-400 text-sm">Total NIL Earnings</div>
                  <div className="text-green-400 font-black text-3xl">${totalNIL.toLocaleString()}</div>
                </div>
                <Link href="/nil-portal" className="bg-green-600 hover:bg-green-500 text-white font-bold px-5 py-3 rounded-xl transition-colors">
                  Find More Deals →
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === "recruiting" && (
          <div>
            <h2 className="text-white font-black text-xl mb-6">Recruiting Activity</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-blue-900/20 rounded-xl p-5">
                <h3 className="text-white font-bold mb-4">Recent Coach Views</h3>
                <div className="space-y-3">
                  {[
                    { school: "University of Texas", coach: "Coach Williams", sport: "Football", time: "2 hours ago" },
                    { school: "LSU", coach: "Coach Johnson", sport: "Football", time: "Yesterday" },
                    { school: "Alabama", coach: "Coach Davis", sport: "Football", time: "2 days ago" },
                    { school: "Ohio State", coach: "Coach Smith", sport: "Football", time: "3 days ago" },
                  ].map((view) => (
                    <div key={view.school} className="flex items-center justify-between py-2 border-b border-blue-900/20 last:border-0">
                      <div>
                        <div className="text-white text-sm font-bold">{view.school}</div>
                        <div className="text-gray-500 text-xs">{view.coach} · {view.sport}</div>
                      </div>
                      <div className="text-gray-500 text-xs">{view.time}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 border border-blue-900/20 rounded-xl p-5">
                <h3 className="text-white font-bold mb-4">Recruiting Score</h3>
                <div className="text-center py-6">
                  <div className="text-6xl font-black text-purple-400 mb-2">94</div>
                  <div className="text-gray-400 text-sm mb-4">out of 100</div>
                  <div className="w-full bg-gray-800 rounded-full h-3 mb-6">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-3 rounded-full" style={{ width: "94%" }} />
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-left">
                    {[
                      { label: "Profile Complete", score: 98 },
                      { label: "Film Quality", score: 92 },
                      { label: "Academic Score", score: 95 },
                      { label: "Social Presence", score: 88 },
                    ].map((item) => (
                      <div key={item.label} className="bg-white/5 rounded-lg p-2">
                        <div className="text-gray-400 text-xs">{item.label}</div>
                        <div className="text-white font-bold">{item.score}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "training" && (
          <div>
            <h2 className="text-white font-black text-xl mb-6">Training & Performance</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-white font-bold">Performance Metrics</h3>
                {[
                  { label: "40-Yard Dash", value: "4.52s", target: "4.47s", progress: 85 },
                  { label: "Vertical Jump", value: "34\"", target: "36\"", progress: 78 },
                  { label: "Bench Press (225)", value: "18 reps", target: "22 reps", progress: 72 },
                  { label: "Broad Jump", value: "10'2\"", target: "10'6\"", progress: 88 },
                ].map((metric) => (
                  <div key={metric.label} className="bg-white/5 border border-blue-900/20 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-bold text-sm">{metric.label}</span>
                      <div className="text-right">
                        <span className="text-cyan-400 font-bold">{metric.value}</span>
                        <span className="text-gray-500 text-xs ml-2">/ {metric.target}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-cyan-600 to-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${metric.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-white font-bold mb-4">FUEL Bot Training Plan</h3>
                <div className="space-y-3">
                  {[
                    { day: "Monday", focus: "Speed & Agility", duration: "90 min", status: "Completed" },
                    { day: "Tuesday", focus: "Strength Training", duration: "75 min", status: "Completed" },
                    { day: "Wednesday", focus: "Film Review", duration: "60 min", status: "Today" },
                    { day: "Thursday", focus: "Route Running", duration: "90 min", status: "Upcoming" },
                    { day: "Friday", focus: "Recovery & Mobility", duration: "45 min", status: "Upcoming" },
                  ].map((session) => (
                    <div key={session.day} className={`bg-white/5 border rounded-xl p-4 flex items-center justify-between ${
                      session.status === "Today" ? "border-orange-600/50 bg-orange-900/10" : "border-blue-900/20"
                    }`}>
                      <div>
                        <div className="text-white font-bold text-sm">{session.day}</div>
                        <div className="text-gray-400 text-xs">{session.focus} · {session.duration}</div>
                      </div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        session.status === "Completed" ? "bg-green-500/20 text-green-400" :
                        session.status === "Today" ? "bg-orange-500/20 text-orange-400" :
                        "bg-gray-500/20 text-gray-400"
                      }`}>
                        {session.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
