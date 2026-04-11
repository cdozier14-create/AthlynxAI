import { useState } from "react";
import { Users, DollarSign, TrendingUp, MessageSquare, Bell, Settings, Search, Plus, BarChart3, Target, Star, Phone } from "lucide-react";

const stats = [
  { label: "Total Athletes", value: "2,847", icon: Users, change: "+12%", color: "text-blue-500" },
  { label: "NIL Deals Active", value: "$4.2M", icon: DollarSign, change: "+8%", color: "text-green-500" },
  { label: "Conversion Rate", value: "34.7%", icon: TrendingUp, change: "+3.2%", color: "text-purple-500" },
  { label: "Messages Sent", value: "18,492", icon: MessageSquare, change: "+22%", color: "text-cyan-500" },
];

const leads = [
  { name: "Marcus Johnson", sport: "Basketball", school: "Duke University", nilValue: "$85K", status: "Hot", tier: "VIP" },
  { name: "Aaliyah Davis", sport: "Track & Field", school: "LSU", nilValue: "$42K", status: "Warm", tier: "Pro" },
  { name: "Tyler Brooks", sport: "Football", school: "Alabama", nilValue: "$120K", status: "Hot", tier: "VIP" },
  { name: "Sofia Martinez", sport: "Soccer", school: "Stanford", nilValue: "$38K", status: "New", tier: "Standard" },
  { name: "Darius King", sport: "Baseball", school: "Vanderbilt", nilValue: "$29K", status: "Warm", tier: "Pro" },
];

const statusColors: Record<string, string> = {
  Hot: "bg-red-100 text-red-700",
  Warm: "bg-yellow-100 text-yellow-700",
  New: "bg-green-100 text-green-700",
};

export default function CRMCommandCenter() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [search, setSearch] = useState("");

  const filtered = leads.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.sport.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/crab-logo-official.png" alt="ATHLYNX" className="h-9 w-9 object-contain"
            onError={(e) => { (e.target as HTMLImageElement).src = "/nil-portal-app-logo.jpeg"; }} />
          <div>
            <h1 className="text-lg font-black text-white tracking-wide">CRM COMMAND CENTER</h1>
            <p className="text-xs text-cyan-400">ATHLYNX — Athlete Intelligence Platform</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Bell size={20} className="text-slate-400 cursor-pointer hover:text-white" />
          <Settings size={20} className="text-slate-400 cursor-pointer hover:text-white" />
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">CD</div>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="bg-slate-900 border-b border-slate-700 px-6 flex gap-6">
        {["dashboard", "athletes", "deals", "analytics"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 text-sm font-semibold capitalize border-b-2 transition-colors ${
              activeTab === tab ? "border-blue-500 text-blue-400" : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={i} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <s.icon size={20} className={s.color} />
                <span className="text-xs text-green-400 font-semibold">{s.change}</span>
              </div>
              <p className="text-2xl font-black text-white">{s.value}</p>
              <p className="text-xs text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Athletes Table */}
        <div className="bg-slate-800 rounded-xl border border-slate-700">
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <h2 className="font-bold text-white flex items-center gap-2">
              <Target size={18} className="text-blue-400" /> Athlete Pipeline
            </h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search athletes..."
                  className="bg-slate-700 text-white text-sm pl-9 pr-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 w-48"
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2 font-semibold">
                <Plus size={14} /> Add Athlete
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-slate-400 border-b border-slate-700">
                  <th className="text-left px-4 py-3">Athlete</th>
                  <th className="text-left px-4 py-3">Sport</th>
                  <th className="text-left px-4 py-3">School</th>
                  <th className="text-left px-4 py-3">NIL Value</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Tier</th>
                  <th className="text-left px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => (
                  <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-xs font-bold">
                          {lead.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span className="font-semibold text-white text-sm">{lead.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">{lead.sport}</td>
                    <td className="px-4 py-3 text-sm text-slate-300">{lead.school}</td>
                    <td className="px-4 py-3 text-sm font-bold text-green-400">{lead.nilValue}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${statusColors[lead.status]}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs text-slate-300">{lead.tier}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-400 hover:text-blue-300 p-1 rounded">
                          <Phone size={14} />
                        </button>
                        <button className="text-cyan-400 hover:text-cyan-300 p-1 rounded">
                          <MessageSquare size={14} />
                        </button>
                        <button className="text-purple-400 hover:text-purple-300 p-1 rounded">
                          <BarChart3 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
