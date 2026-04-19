import { useState } from "react";
import { Link, Redirect } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Users, TrendingUp, Activity, List, LayoutGrid, Plus, Search,
  Download, RefreshCw, ChevronRight, Mail, Phone, Building2,
  Star, Clock, CheckCircle, XCircle, ArrowRight, Shield, BarChart3,
  Loader2, Trash2, Edit2, X
} from "lucide-react";

const CDN = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/qUknrdlyPrUZJQYo.png";

const PIPELINE_STAGES = ["New Lead", "Contacted", "Demo Scheduled", "Proposal Sent", "Closed Won", "Closed Lost"] as const;
const STAGE_COLORS: Record<string, string> = {
  "New Lead": "bg-blue-900/60 border-blue-700",
  "Contacted": "bg-yellow-900/60 border-yellow-700",
  "Demo Scheduled": "bg-purple-900/60 border-purple-700",
  "Proposal Sent": "bg-orange-900/60 border-orange-700",
  "Closed Won": "bg-green-900/60 border-green-700",
  "Closed Lost": "bg-red-900/60 border-red-700",
};
const STAGE_BADGE: Record<string, string> = {
  "New Lead": "bg-blue-800 text-blue-200",
  "Contacted": "bg-yellow-800 text-yellow-200",
  "Demo Scheduled": "bg-purple-800 text-purple-200",
  "Proposal Sent": "bg-orange-800 text-orange-200",
  "Closed Won": "bg-green-800 text-green-200",
  "Closed Lost": "bg-red-800 text-red-200",
};
const STATUS_BADGE: Record<string, string> = {
  Lead: "bg-blue-900 text-blue-300",
  Active: "bg-green-900 text-green-300",
  VIP: "bg-yellow-900 text-yellow-300",
  Churned: "bg-red-900 text-red-300",
};
const ROLE_BADGE: Record<string, string> = {
  Athlete: "bg-cyan-900 text-cyan-300",
  Coach: "bg-purple-900 text-purple-300",
  Brand: "bg-orange-900 text-orange-300",
  Agent: "bg-teal-900 text-teal-300",
  Investor: "bg-yellow-900 text-yellow-300",
  Team: "bg-indigo-900 text-indigo-300",
};

// ─── Add Contact Modal ────────────────────────────────────────────────────────
function AddContactModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", role: "Athlete" as const, status: "Lead" as const, notes: "" });
  const createContact = trpc.crm.createContact.useMutation({
    onSuccess: () => { toast.success("Contact added"); onSuccess(); onClose(); },
    onError: (e) => toast.error(e.message),
  });
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0d1f3c] border border-white/10 rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white font-black text-lg">Add New Contact</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-3">
          {[
            { key: "name", label: "Full Name *", placeholder: "John Smith" },
            { key: "email", label: "Email", placeholder: "john@example.com" },
            { key: "phone", label: "Phone", placeholder: "+1 (555) 000-0000" },
            { key: "company", label: "Company / School", placeholder: "University of Texas" },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="text-white/60 text-xs font-semibold uppercase tracking-wide block mb-1">{label}</label>
              <input
                type="text"
                placeholder={placeholder}
                value={(form as Record<string, string>)[key]}
                onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#00c2ff]/50"
              />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-white/60 text-xs font-semibold uppercase tracking-wide block mb-1">Role</label>
              <select value={form.role} onChange={(e) => setForm(f => ({ ...f, role: e.target.value as typeof form.role }))}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#00c2ff]/50">
                {["Athlete", "Coach", "Brand", "Agent", "Investor", "Team"].map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="text-white/60 text-xs font-semibold uppercase tracking-wide block mb-1">Status</label>
              <select value={form.status} onChange={(e) => setForm(f => ({ ...f, status: e.target.value as typeof form.status }))}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#00c2ff]/50">
                {["Lead", "Active", "VIP", "Churned"].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-white/60 text-xs font-semibold uppercase tracking-wide block mb-1">Notes</label>
            <textarea
              placeholder="Any notes about this contact..."
              value={form.notes}
              onChange={(e) => setForm(f => ({ ...f, notes: e.target.value }))}
              rows={3}
              className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#00c2ff]/50 resize-none"
            />
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl text-sm font-bold hover:bg-white/10 transition-colors">Cancel</button>
          <button
            onClick={() => { if (!form.name) { toast.error("Name is required"); return; } createContact.mutate(form); }}
            disabled={createContact.isPending}
            className="flex-1 py-2.5 bg-gradient-to-r from-[#00c2ff] to-[#0066ff] text-white rounded-xl text-sm font-black hover:from-[#00b0e8] hover:to-[#0055dd] transition-all disabled:opacity-50"
          >
            {createContact.isPending ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Add Contact"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminCRM() {
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "contacts" | "pipeline" | "waitlist" | "activity">("overview");
  const [search, setSearch] = useState("");
  const [showAddContact, setShowAddContact] = useState(false);

  const utils = trpc.useUtils();
  const statsQuery = trpc.crm.stats.useQuery(undefined, { refetchInterval: 30000 });
  const contactsQuery = trpc.crm.getContacts.useQuery({ search: search || undefined, limit: 100 }, { enabled: activeTab === "contacts" });
  const pipelineQuery = trpc.crm.getPipeline.useQuery(undefined, { enabled: activeTab === "pipeline" });
  const waitlistQuery = trpc.crm.getWaitlist.useQuery({ limit: 200 }, { enabled: activeTab === "waitlist" });
  const activityQuery = trpc.crm.getActivityLog.useQuery({ limit: 100 }, { enabled: activeTab === "activity" });
  const usersQuery = trpc.crm.getUsers.useQuery({ limit: 100 }, { enabled: activeTab === "overview" });

  const deleteContact = trpc.crm.deleteContact.useMutation({
    onSuccess: () => { toast.success("Contact deleted"); utils.crm.getContacts.invalidate(); },
    onError: (e) => toast.error(e.message),
  });
  const updateStage = trpc.crm.updatePipelineStage.useMutation({
    onSuccess: () => { utils.crm.getPipeline.invalidate(); },
    onError: (e) => toast.error(e.message),
  });
  const updateUserRole = trpc.crm.updateUserRole.useMutation({
    onSuccess: () => { toast.success("Role updated"); utils.crm.getUsers.invalidate(); },
    onError: (e) => toast.error(e.message),
  });

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#050c1a] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#00c2ff] animate-spin" />
      </div>
    );
  }

  // Not logged in
  if (!user) return <Redirect to="/signin" />;

  // Not admin
  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#050c1a] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-white text-2xl font-black mb-2">Admin Access Required</h1>
          <p className="text-white/50 mb-6">You need admin privileges to access the CRM dashboard. Contact Chad Dozier to request access.</p>
          <Link href="/feed">
            <button className="px-6 py-3 bg-gradient-to-r from-[#00c2ff] to-[#0066ff] text-white font-black rounded-xl">Go to Feed</button>
          </Link>
        </div>
      </div>
    );
  }

  const stats = statsQuery.data;
  const contacts = contactsQuery.data?.contacts ?? [];
  const pipeline = pipelineQuery.data ?? [];
  const waitlist = waitlistQuery.data?.entries ?? [];
  const activityEvents = activityQuery.data?.events ?? [];
  const allUsers = usersQuery.data?.users ?? [];

  // Export waitlist as CSV
  const exportWaitlistCSV = () => {
    const header = "Name,Email,Sport,School,Phone,Role,Signed Up";
    const rows = waitlist.map((w: typeof waitlist[0]) => `"${w.name ?? ""}","${w.email}","${w.sport ?? ""}","${w.school ?? ""}","${w.phone ?? ""}","${w.role ?? ""}","${w.signedUpAt}"`);
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `athlynx-waitlist-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Waitlist exported");
  };

  const TABS = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "contacts", label: "Contacts", icon: Users },
    { id: "pipeline", label: "Pipeline", icon: LayoutGrid },
    { id: "waitlist", label: "Waitlist", icon: List },
    { id: "activity", label: "Activity", icon: Activity },
  ] as const;

  return (
    <div className="min-h-screen bg-[#050c1a]">
      {/* Header */}
      <header className="bg-[#0a1628] border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <img src={`${CDN}/athlynx-main-icon_7b5e9ca6.png`} alt="ATHLYNX" className="w-9 h-9 rounded-xl cursor-pointer" />
            </Link>
            <div>
              <div className="text-white font-black text-lg leading-none">CRM Dashboard</div>
              <div className="text-[#00c2ff] text-xs tracking-widest uppercase leading-none">ATHLYNX Admin</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-green-900/50 border border-green-700/50 text-green-300 text-xs px-3 py-1 rounded-full font-semibold">
              ● Admin: {user.name}
            </span>
            <button onClick={() => { statsQuery.refetch(); toast.success("Refreshed"); }} className="p-2 bg-white/5 border border-white/10 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
            <Link href="/feed">
              <button className="px-4 py-2 bg-white/5 border border-white/10 text-white text-sm font-bold rounded-xl hover:bg-white/10 transition-colors">← Platform</button>
            </Link>
          </div>
        </div>
      </header>

      {/* Tab nav */}
      <div className="bg-[#0a1628] border-b border-white/10 px-6">
        <div className="max-w-7xl mx-auto flex gap-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-all ${
                activeTab === id
                  ? "border-[#00c2ff] text-[#00c2ff]"
                  : "border-transparent text-white/40 hover:text-white/70"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">

        {/* ─── OVERVIEW TAB ─────────────────────────────────────────────────── */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Users", value: stats?.totalSignups ?? 0, icon: Users, color: "text-[#00c2ff]", sub: `+${stats?.todaySignups ?? 0} today` },
                { label: "This Week", value: stats?.weekSignups ?? 0, icon: TrendingUp, color: "text-green-400", sub: "new signups" },
                { label: "Waitlist", value: stats?.waitlistCount ?? 0, icon: List, color: "text-yellow-400", sub: "pending" },
                { label: "CRM Contacts", value: stats?.contactsCount ?? 0, icon: Star, color: "text-purple-400", sub: "tracked" },
              ].map(({ label, value, icon: Icon, color, sub }) => (
                <div key={label} className="bg-[#0d1f3c] border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white/50 text-xs font-semibold uppercase tracking-wide">{label}</span>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <div className={`text-3xl font-black ${color} mb-1`}>{value.toLocaleString()}</div>
                  <div className="text-white/30 text-xs">{sub}</div>
                </div>
              ))}
            </div>

            {/* Team members */}
            <div className="bg-[#0d1f3c] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-black text-base mb-4">DHG Team Members</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { name: "Chad A. Dozier", title: "Founder, CEO & Chairman", email: "cdozier14@dozierholdingsgroup.com.mx", badge: "admin" },
                  { name: "Glenn Tse", title: "CFO / COO", email: "glenn@dozierholdingsgroup.com.mx", badge: "team" },
                  { name: "Andy Kustes", title: "VP Technology", email: "andy@dozierholdingsgroup.com.mx", badge: "team" },
                  { name: "Lee Marshall", title: "VP Sales & Partnerships", email: "lee@dozierholdingsgroup.com.mx", badge: "team" },
                  { name: "Jimmy Boyd", title: "VP Real Estate", email: "jimmy@dozierholdingsgroup.com.mx", badge: "team" },
                ].map((m) => (
                  <div key={m.name} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00c2ff] to-[#0066ff] flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                      {m.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-white font-bold text-sm truncate">{m.name}</div>
                      <div className="text-white/50 text-xs truncate">{m.title}</div>
                      <div className="text-[#00c2ff] text-xs truncate">{m.email}</div>
                      <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-bold ${m.badge === "admin" ? "bg-red-900 text-red-300" : "bg-blue-900 text-blue-300"}`}>
                        {m.badge.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent users */}
            <div className="bg-[#0d1f3c] border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-black text-base">Recent Users</h3>
                <button onClick={() => setActiveTab("contacts")} className="text-[#00c2ff] text-xs font-bold hover:underline flex items-center gap-1">
                  View All <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              {usersQuery.isLoading ? (
                <div className="flex items-center justify-center py-8"><Loader2 className="w-6 h-6 text-[#00c2ff] animate-spin" /></div>
              ) : allUsers.length === 0 ? (
                <p className="text-white/30 text-sm text-center py-6">No users yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        {["Name", "Email", "Role", "Joined"].map(h => (
                          <th key={h} className="text-white/40 text-xs font-semibold uppercase tracking-wide text-left pb-2 pr-4">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {allUsers.slice(0, 10).map((u: typeof allUsers[0]) => (
                        <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-2.5 pr-4 text-white font-semibold">{u.name ?? "—"}</td>
                          <td className="py-2.5 pr-4 text-white/50">{u.email ?? "—"}</td>
                          <td className="py-2.5 pr-4">
                            <select
                              value={u.role ?? "athlete"}
                              onChange={(e) => updateUserRole.mutate({ userId: u.id, role: e.target.value as "athlete" | "coach" | "brand" | "admin" })}
                              className="bg-white/10 border border-white/10 text-white text-xs rounded-lg px-2 py-1 focus:outline-none"
                            >
                              {["athlete", "coach", "brand", "admin"].map((r: string) => <option key={r} value={r}>{r}</option>)}
                            </select>
                          </td>
                          <td className="py-2.5 text-white/30 text-xs">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── CONTACTS TAB ─────────────────────────────────────────────────── */}
        {activeTab === "contacts" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="relative flex-1 min-w-48">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#00c2ff]/50"
                />
              </div>
              <button
                onClick={() => setShowAddContact(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#00c2ff] to-[#0066ff] text-white font-black rounded-xl text-sm hover:from-[#00b0e8] hover:to-[#0055dd] transition-all"
              >
                <Plus className="w-4 h-4" /> Add Contact
              </button>
            </div>

            {contactsQuery.isLoading ? (
              <div className="flex items-center justify-center py-16"><Loader2 className="w-8 h-8 text-[#00c2ff] animate-spin" /></div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-16">
                <Users className="w-12 h-12 text-white/20 mx-auto mb-3" />
                <p className="text-white/40 text-sm">No contacts yet. Add your first contact.</p>
              </div>
            ) : (
              <div className="bg-[#0d1f3c] border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="border-b border-white/10">
                    <tr>
                      {["Name", "Email", "Phone", "Company", "Role", "Status", "Last Activity", "Actions"].map(h => (
                        <th key={h} className="text-white/40 text-xs font-semibold uppercase tracking-wide text-left px-4 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((c: typeof contacts[0]) => (
                      <tr key={c.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3 text-white font-semibold">{c.name}</td>
                        <td className="px-4 py-3 text-white/50">{c.email ?? "—"}</td>
                        <td className="px-4 py-3 text-white/50">{c.phone ?? "—"}</td>
                        <td className="px-4 py-3 text-white/50">{c.company ?? "—"}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${ROLE_BADGE[c.role] ?? "bg-gray-800 text-gray-300"}`}>{c.role}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${STATUS_BADGE[c.status] ?? "bg-gray-800 text-gray-300"}`}>{c.status}</span>
                        </td>
                        <td className="px-4 py-3 text-white/30 text-xs">{c.lastActivity ? new Date(c.lastActivity).toLocaleDateString() : "—"}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => { if (confirm(`Delete ${c.name}?`)) deleteContact.mutate({ id: c.id }); }}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ─── PIPELINE TAB ─────────────────────────────────────────────────── */}
        {activeTab === "pipeline" && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-black text-lg">Sales Pipeline</h2>
              <span className="text-white/40 text-sm">{pipeline.length} deals</span>
            </div>
            {pipelineQuery.isLoading ? (
              <div className="flex items-center justify-center py-16"><Loader2 className="w-8 h-8 text-[#00c2ff] animate-spin" /></div>
            ) : pipeline.length === 0 ? (
              <div className="text-center py-16">
                <LayoutGrid className="w-12 h-12 text-white/20 mx-auto mb-3" />
                <p className="text-white/40 text-sm">No pipeline entries yet. Add contacts and move them through stages.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {PIPELINE_STAGES.map((stage) => {
                  const stageItems = pipeline.filter((p: typeof pipeline[0]) => p.pipeline.stage === stage);
                  return (
                    <div key={stage} className={`${STAGE_COLORS[stage]} border rounded-xl p-3`}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white/70 text-xs font-bold uppercase tracking-wide">{stage}</span>
                        <span className="bg-white/10 text-white text-xs px-1.5 py-0.5 rounded-full">{stageItems.length}</span>
                      </div>
                      <div className="space-y-2">
                        {stageItems.map(({ pipeline: p, contact }: { pipeline: typeof stageItems[0]['pipeline']; contact: typeof stageItems[0]['contact'] }) => (
                          <div key={p.id} className="bg-black/30 border border-white/10 rounded-lg p-2.5">
                            <div className="text-white text-xs font-bold truncate">{contact?.name ?? "Unknown"}</div>
                            <div className="text-white/40 text-[10px] truncate">{contact?.role ?? ""}</div>
                            {p.dealValue ? <div className="text-green-400 text-[10px] font-bold mt-1">${p.dealValue.toLocaleString()}</div> : null}
                            <select
                              value={p.stage}
                              onChange={(e) => updateStage.mutate({ id: p.id, stage: e.target.value as typeof p.stage })}
                              className="w-full mt-2 bg-white/10 border border-white/10 text-white text-[10px] rounded px-1 py-0.5 focus:outline-none"
                            >
                              {PIPELINE_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ─── WAITLIST TAB ─────────────────────────────────────────────────── */}
        {activeTab === "waitlist" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-white font-black text-lg">VIP Waitlist</h2>
                <p className="text-white/40 text-sm">{waitlistQuery.data?.total ?? 0} total entries</p>
              </div>
              <button
                onClick={exportWaitlistCSV}
                className="flex items-center gap-2 px-4 py-2.5 bg-green-800 hover:bg-green-700 text-white font-bold rounded-xl text-sm transition-colors"
              >
                <Download className="w-4 h-4" /> Export CSV
              </button>
            </div>

            {waitlistQuery.isLoading ? (
              <div className="flex items-center justify-center py-16"><Loader2 className="w-8 h-8 text-[#00c2ff] animate-spin" /></div>
            ) : waitlist.length === 0 ? (
              <div className="text-center py-16">
                <List className="w-12 h-12 text-white/20 mx-auto mb-3" />
                <p className="text-white/40 text-sm">No waitlist entries yet.</p>
              </div>
            ) : (
              <div className="bg-[#0d1f3c] border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="border-b border-white/10">
                    <tr>
                      {["#", "Name", "Email", "Sport", "School", "Phone", "Role", "Signed Up"].map(h => (
                        <th key={h} className="text-white/40 text-xs font-semibold uppercase tracking-wide text-left px-4 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {waitlist.map((w: typeof waitlist[0], i: number) => (
                      <tr key={w.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3 text-white/30 text-xs">{i + 1}</td>
                        <td className="px-4 py-3 text-white font-semibold">{w.name ?? "—"}</td>
                        <td className="px-4 py-3 text-[#00c2ff]">{w.email}</td>
                        <td className="px-4 py-3 text-white/50">{w.sport ?? "—"}</td>
                        <td className="px-4 py-3 text-white/50">{w.school ?? "—"}</td>
                        <td className="px-4 py-3 text-white/50">{w.phone ?? "—"}</td>
                        <td className="px-4 py-3 text-white/50">{w.role ?? "—"}</td>
                        <td className="px-4 py-3 text-white/30 text-xs">{new Date(w.signedUpAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ─── ACTIVITY TAB ─────────────────────────────────────────────────── */}
        {activeTab === "activity" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-black text-lg">Activity Log</h2>
              <span className="text-white/40 text-sm">{activityQuery.data?.total ?? 0} total events</span>
            </div>

            {activityQuery.isLoading ? (
              <div className="flex items-center justify-center py-16"><Loader2 className="w-8 h-8 text-[#00c2ff] animate-spin" /></div>
            ) : activityEvents.length === 0 ? (
              <div className="text-center py-16">
                <Activity className="w-12 h-12 text-white/20 mx-auto mb-3" />
                <p className="text-white/40 text-sm">No activity logged yet.</p>
              </div>
            ) : (
              <div className="bg-[#0d1f3c] border border-white/10 rounded-2xl overflow-hidden">
                <div className="divide-y divide-white/5">
                  {activityEvents.map(({ log, user: u }: { log: typeof activityEvents[0]['log']; user: typeof activityEvents[0]['user'] }) => (
                    <div key={log.id} className="px-5 py-4 flex items-start gap-4 hover:bg-white/5 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-[#00c2ff]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Activity className="w-4 h-4 text-[#00c2ff]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-white font-bold text-sm">{log.eventType}</span>
                          {u?.name && <span className="text-white/40 text-xs">by {u.name}</span>}
                        </div>
                        {log.metadata && <p className="text-white/40 text-xs mt-0.5 truncate">{log.metadata}</p>}
                      </div>
                      <span className="text-white/25 text-xs flex-shrink-0">{new Date(log.createdAt).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Contact Modal */}
      {showAddContact && (
        <AddContactModal
          onClose={() => setShowAddContact(false)}
          onSuccess={() => utils.crm.getContacts.invalidate()}
        />
      )}
    </div>
  );
}
