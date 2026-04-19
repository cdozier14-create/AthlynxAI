import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Users, Search, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown,
  CreditCard, Clock, TrendingUp, UserCheck, Shield, RefreshCw
} from "lucide-react";

type SortField = "createdAt" | "name" | "email" | "role";
type SortDir = "asc" | "desc";

function trialStatus(trialEndsAt: Date | null | undefined, hasSubscription: boolean) {
  if (hasSubscription) return { label: "Subscribed", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" };
  if (!trialEndsAt) return { label: "Free", color: "bg-slate-500/20 text-slate-400 border-slate-500/30" };
  const now = new Date();
  const end = new Date(trialEndsAt);
  if (end > now) {
    const daysLeft = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return { label: `Trial (${daysLeft}d)`, color: "bg-blue-500/20 text-blue-300 border-blue-500/30" };
  }
  return { label: "Trial Expired", color: "bg-red-500/20 text-red-300 border-red-500/30" };
}

export default function AdminUsers() {
  const { user, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortField>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [limit] = useState(50);

  // Debounce search
  const handleSearch = (val: string) => {
    setSearch(val);
    clearTimeout((window as any).__searchTimer);
    (window as any).__searchTimer = setTimeout(() => {
      setDebouncedSearch(val);
      setPage(1);
    }, 400);
  };

  const { data, isLoading, refetch } = trpc.admin.getUsers.useQuery(
    { page, limit, search: debouncedSearch, sortBy, sortDir },
    { enabled: !!user && (user as any).role === "admin" }
  );

  const { data: stats } = trpc.admin.getStats.useQuery(undefined, {
    enabled: !!user && (user as any).role === "admin",
  });

  const setRoleMutation = trpc.admin.setUserRole.useMutation({
    onSuccess: () => {
      toast({ title: "Role updated" });
      refetch();
    },
    onError: (e) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const toggleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortDir(d => d === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDir("desc");
    }
    setPage(1);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortBy !== field) return <ArrowUpDown className="w-3 h-3 opacity-40" />;
    return sortDir === "asc" ? <ArrowUp className="w-3 h-3 text-blue-400" /> : <ArrowDown className="w-3 h-3 text-blue-400" />;
  };

    if (authLoading) {
    return (
      <div className="min-h-screen bg-[#060d1f] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || (user as any).role !== "admin") {
    return (
      <div className="min-h-screen bg-[#060d1f] flex items-center justify-center">
        <Card className="bg-[#0d1b3e] border-red-500/30 p-8 text-center">
          <Shield className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-white text-xl font-bold mb-2">Admin Access Required</h2>
          <p className="text-slate-400 mb-4">This page is restricted to administrators.</p>
          <Button onClick={() => navigate("/admin")} variant="outline" className="border-blue-500/40 text-blue-300">
            Back to Admin
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060d1f] text-white">
      {/* Header */}
      <div className="border-b border-[#1e3a6e] bg-[#0a0f1e]/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/admin")} className="text-slate-400 hover:text-white transition-colors">
              ← Admin
            </button>
            <span className="text-slate-600">/</span>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              <h1 className="text-lg font-bold">User Tracker</h1>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
          >
            <RefreshCw className="w-4 h-4 mr-1" /> Refresh
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Row */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-blue-400" },
              { label: "New This Week", value: stats.newThisWeek, icon: TrendingUp, color: "text-emerald-400" },
              { label: "New This Month", value: stats.newThisMonth, icon: TrendingUp, color: "text-cyan-400" },
              { label: "Subscribed", value: stats.withSubscription, icon: CreditCard, color: "text-yellow-400" },
              { label: "On Trial", value: stats.onTrial, icon: Clock, color: "text-purple-400" },
            ].map(({ label, value, icon: Icon, color }) => (
              <Card key={label} className="bg-[#0d1b3e] border-[#1e3a6e]">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`w-4 h-4 ${color}`} />
                    <span className="text-xs text-slate-400">{label}</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{value.toLocaleString()}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by name, email, sport, school..."
              value={search}
              onChange={e => handleSearch(e.target.value)}
              className="pl-9 bg-[#0d1b3e] border-[#1e3a6e] text-white placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>
          <div className="text-sm text-slate-400 flex items-center gap-1 whitespace-nowrap">
            {data?.total ?? 0} users
          </div>
        </div>

        {/* Table */}
        <Card className="bg-[#0d1b3e] border-[#1e3a6e] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1e3a6e] bg-[#060d1f]/60">
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">
                    <button onClick={() => toggleSort("name")} className="flex items-center gap-1 hover:text-white transition-colors">
                      Name <SortIcon field="name" />
                    </button>
                  </th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">
                    <button onClick={() => toggleSort("email")} className="flex items-center gap-1 hover:text-white transition-colors">
                      Email <SortIcon field="email" />
                    </button>
                  </th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium hidden md:table-cell">Sport / School</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Status</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">
                    <button onClick={() => toggleSort("role")} className="flex items-center gap-1 hover:text-white transition-colors">
                      Role <SortIcon field="role" />
                    </button>
                  </th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium hidden lg:table-cell">Login Method</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">
                    <button onClick={() => toggleSort("createdAt")} className="flex items-center gap-1 hover:text-white transition-colors">
                      Signed Up <SortIcon field="createdAt" />
                    </button>
                  </th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium hidden xl:table-cell">Last Seen</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <tr key={i} className="border-b border-[#1e3a6e]/50">
                      {Array.from({ length: 9 }).map((_, j) => (
                        <td key={j} className="px-4 py-3">
                          <div className="h-4 bg-[#1e3a6e]/40 rounded animate-pulse" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : data?.users.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-12 text-center text-slate-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  data?.users.map((u: any) => {
                    const ts = trialStatus(u.trialEndsAt, !!u.stripeSubscriptionId);
                    return (
                      <tr key={u.id} className="border-b border-[#1e3a6e]/50 hover:bg-[#0a1628]/60 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-medium text-white">{u.name || <span className="text-slate-500 italic">—</span>}</div>
                          <div className="text-xs text-slate-500">#{u.id}</div>
                        </td>
                        <td className="px-4 py-3 text-slate-300 max-w-[200px] truncate">{u.email || "—"}</td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          {u.sport && <div className="text-slate-300 text-xs">{u.sport}</div>}
                          {u.school && <div className="text-slate-500 text-xs">{u.school}</div>}
                          {!u.sport && !u.school && <span className="text-slate-600">—</span>}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${ts.color}`}>
                            {ts.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                            u.role === "admin"
                              ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                              : "bg-slate-500/20 text-slate-400 border-slate-500/30"
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <span className="text-xs text-slate-400 capitalize">{u.loginMethod || "—"}</span>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">
                          {u.createdAt
                            ? new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                            : "—"}
                        </td>
                        <td className="px-4 py-3 hidden xl:table-cell text-xs text-slate-500 whitespace-nowrap">
                          {u.lastSignedIn
                            ? new Date(u.lastSignedIn).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                            : "Never"}
                        </td>
                        <td className="px-4 py-3">
                          <Select
                            value={u.role}
                            onValueChange={(val) =>
                              setRoleMutation.mutate({ userId: u.id, role: val as "user" | "admin" })
                            }
                          >
                            <SelectTrigger className="h-7 w-24 text-xs bg-[#060d1f] border-[#1e3a6e] text-slate-300">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#0d1b3e] border-[#1e3a6e]">
                              <SelectItem value="user" className="text-slate-300 text-xs">User</SelectItem>
                              <SelectItem value="admin" className="text-yellow-300 text-xs">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-[#1e3a6e]">
              <span className="text-xs text-slate-400">
                Page {data.page} of {data.totalPages} · {data.total} total
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  className="border-[#1e3a6e] text-slate-300 hover:bg-[#1e3a6e]/40 h-7 px-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= data.totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="border-[#1e3a6e] text-slate-300 hover:bg-[#1e3a6e]/40 h-7 px-2"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
