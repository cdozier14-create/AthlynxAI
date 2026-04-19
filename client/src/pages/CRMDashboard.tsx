import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface SignupEntry {
  id: number;
  signupNumber: number;
  fullName: string | null;
  email: string;
  phone: string | null;
  role: string | null;
  sport: string | null;
  ipAddress: string | null;
  browser: string | null;
  device: string | null;
  os: string | null;
  country: string | null;
  city: string | null;
  signupType: string;
  isConverted: boolean;
  isPaying: boolean;
  lifetimeValue: string | null;
  createdAt: Date | null;
}

interface CRMStats {
  totalSignups: number;
  todaySignups: number;
  convertedUsers: number;
  payingUsers: number;
  totalRevenue: number;
  waitlistCount: number;
  conversionRate: string;
  lastUpdated: string;
}

export default function CRMDashboard() {
  const [accessCode, setAccessCode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [partnerName, setPartnerName] = useState("");
  const [signups, setSignups] = useState<SignupEntry[]>([]);
  const [stats, setStats] = useState<CRMStats | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastSignupCount = useRef(0);

  // Validate access
  const validateAccess = trpc.crm.validateAccess.useQuery(
    { accessCode },
    { enabled: false }
  );

  // Get stats
  const statsQuery = trpc.crm.stats.useQuery(undefined, {
    enabled: isAuthenticated,
    refetchInterval: autoRefresh ? 5000 : false, // Refresh every 5 seconds
  });

  // Get signups
  const signupsQuery = trpc.crm.signups.useQuery(
    { limit: 100 },
    { 
      enabled: isAuthenticated,
      refetchInterval: autoRefresh ? 5000 : false,
    }
  );

  // Update stats when query changes
  useEffect(() => {
    if (statsQuery.data) {
      setStats(statsQuery.data);
    }
  }, [statsQuery.data]);

  // Update signups and play sound for new ones
  useEffect(() => {
    if (signupsQuery.data?.signups) {
      const newSignups = signupsQuery.data.signups as SignupEntry[];
      
      // Check for new signups
      if (newSignups.length > lastSignupCount.current && lastSignupCount.current > 0) {
        // Play notification sound
        playNotificationSound();
        toast.success(`🎉 NEW SIGNUP #${newSignups[0].signupNumber}!`, {
          description: `${newSignups[0].fullName} just joined!`,
          duration: 10000,
        });
      }
      
      lastSignupCount.current = newSignups.length;
      setSignups(newSignups);
    }
  }, [signupsQuery.data]);

  const playNotificationSound = () => {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = "sine";
    gainNode.gain.value = 0.3;
    
    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
      audioContext.close();
    }, 200);
  };

  const handleLogin = async () => {
    if (!accessCode.trim()) {
      toast.error("Please enter your access code");
      return;
    }
    
    const result = await validateAccess.refetch();
    if (result.data?.valid) {
      setIsAuthenticated(true);
      setPartnerName(result.data.partner?.name || "Partner");
      toast.success(`Welcome, ${result.data.partner?.name}!`);
    } else {
      toast.error("Invalid access code");
    }
  };

  const exportToCSV = () => {
    if (!signups.length) return;
    
    const headers = [
      "Signup #", "Timestamp", "Full Name", "Email", "Phone", "Role", "Sport",
      "IP Address", "Browser", "Device", "OS", "Country", "City",
      "Signup Type", "Converted", "Paying", "Lifetime Value"
    ];
    
    const rows = signups.map(s => [
      s.signupNumber,
      s.createdAt ? new Date(s.createdAt).toISOString() : "",
      s.fullName || "",
      s.email,
      s.phone || "",
      s.role || "",
      s.sport || "",
      s.ipAddress || "",
      s.browser || "",
      s.device || "",
      s.os || "",
      s.country || "",
      s.city || "",
      s.signupType,
      s.isConverted ? "Yes" : "No",
      s.isPaying ? "Yes" : "No",
      s.lifetimeValue || "0"
    ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(","));
    
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ATHLYNX_Signups_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success("CSV exported! Ready for Microsoft Copilot");
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800/90 border-cyan-500/30">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <span className="text-4xl">📊</span>
            </div>
            <CardTitle className="text-2xl text-white">ATHLYNX CRM</CardTitle>
            <p className="text-cyan-400 text-sm">Partner Dashboard Access</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Enter Partner Access Code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="bg-slate-700 border-slate-600 text-white"
            />
            <Button 
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400"
            >
              Access Dashboard
            </Button>
            <p className="text-center text-slate-400 text-xs">
              Contact Chad for access credentials
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl px-4 py-2 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                <div>
                  <h1 className="text-white font-bold text-lg">ATHLYNX CRM</h1>
                  <p className="text-blue-100 text-[10px]">PARTNER DASHBOARD</p>
                </div>
              </div>
            </Link>
            <span className="text-cyan-400">Welcome, {partnerName}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="rounded"
              />
              <span className="text-slate-300">Auto-refresh (5s)</span>
            </label>
            <Button
              onClick={exportToCSV}
              className="bg-green-600 hover:bg-green-500"
            >
              📥 Export CSV
            </Button>
            <Button
              onClick={() => setIsAuthenticated(false)}
              variant="outline"
              className="border-slate-600 text-slate-300"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <StatCard 
            title="Total Signups" 
            value={stats?.totalSignups || 0} 
            icon="👥"
            color="cyan"
          />
          <StatCard 
            title="Today" 
            value={stats?.todaySignups || 0} 
            icon="📅"
            color="green"
          />
          <StatCard 
            title="Waitlist" 
            value={stats?.waitlistCount || 0} 
            icon="📋"
            color="blue"
          />
          <StatCard 
            title="Converted" 
            value={stats?.convertedUsers || 0} 
            icon="✅"
            color="purple"
          />
          <StatCard 
            title="Paying" 
            value={stats?.payingUsers || 0} 
            icon="💰"
            color="yellow"
          />
          <StatCard 
            title="Revenue" 
            value={`$${stats?.totalRevenue || 0}`} 
            icon="💵"
            color="green"
          />
          <StatCard 
            title="Conv. Rate" 
            value={`${stats?.conversionRate || 0}%`} 
            icon="📈"
            color="orange"
          />
        </div>

        {/* Milestones */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            🎯 Milestones
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MilestoneCard target={1} current={stats?.totalSignups || 0} label="First Signup!" />
            <MilestoneCard target={10} current={stats?.totalSignups || 0} label="10 Users" />
            <MilestoneCard target={100} current={stats?.totalSignups || 0} label="100 Users" />
            <MilestoneCard target={1000} current={stats?.totalSignups || 0} label="1,000 Users" />
            <MilestoneCard target={1} current={stats?.payingUsers || 0} label="First Paying Customer!" />
            <MilestoneCard target={100} current={stats?.totalRevenue || 0} label="$100 Revenue" isRevenue />
            <MilestoneCard target={1000} current={stats?.totalRevenue || 0} label="$1,000 Revenue" isRevenue />
            <MilestoneCard target={10000} current={stats?.totalRevenue || 0} label="$10,000 Revenue" isRevenue />
          </div>
        </div>

        {/* Live Feed */}
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
              LIVE SIGNUP FEED
            </h2>
            <span className="text-blue-100 text-sm">
              Last updated: {stats?.lastUpdated ? new Date(stats.lastUpdated).toLocaleTimeString() : "..."}
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-cyan-400 uppercase tracking-wider">#</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-cyan-400 uppercase tracking-wider">Time</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-cyan-400 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-cyan-400 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-cyan-400 uppercase tracking-wider">Phone</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-cyan-400 uppercase tracking-wider">Role</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-cyan-400 uppercase tracking-wider">Sport</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-cyan-400 uppercase tracking-wider">Device</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-cyan-400 uppercase tracking-wider">IP</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-cyan-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {signups.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-12 text-center text-slate-400">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-4xl">⏳</span>
                        <p>Waiting for first signup...</p>
                        <p className="text-sm">Launch is at 9 AM CST!</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  signups.map((signup, index) => (
                    <tr 
                      key={signup.id} 
                      className={`hover:bg-slate-700/30 transition-colors ${
                        index === 0 ? "bg-cyan-900/20 animate-pulse" : ""
                      }`}
                    >
                      <td className="px-4 py-3">
                        <span className={`font-bold ${
                          signup.signupNumber === 1 ? "text-yellow-400" : "text-cyan-400"
                        }`}>
                          #{signup.signupNumber}
                          {signup.signupNumber === 1 && " 🏆"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-300 text-sm">
                        {signup.createdAt ? new Date(signup.createdAt).toLocaleString() : "-"}
                      </td>
                      <td className="px-4 py-3 text-white font-medium">{signup.fullName || "-"}</td>
                      <td className="px-4 py-3 text-slate-300">{signup.email}</td>
                      <td className="px-4 py-3 text-slate-300">{signup.phone || "-"}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          signup.role === "athlete" ? "bg-blue-500/20 text-blue-400" :
                          signup.role === "parent" ? "bg-purple-500/20 text-purple-400" :
                          signup.role === "coach" ? "bg-green-500/20 text-green-400" :
                          "bg-orange-500/20 text-orange-400"
                        }`}>
                          {signup.role || "-"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-300">{signup.sport || "-"}</td>
                      <td className="px-4 py-3 text-slate-400 text-sm">
                        {signup.device || "-"} / {signup.browser || "-"}
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-sm font-mono">{signup.ipAddress || "-"}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {signup.isPaying && (
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">💰 Paying</span>
                          )}
                          {signup.isConverted && !signup.isPaying && (
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">✅ Converted</span>
                          )}
                          {!signup.isConverted && (
                            <span className="px-2 py-1 bg-slate-500/20 text-slate-400 rounded-full text-xs">📋 Waitlist</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-slate-500 text-sm">
          <p>ATHLYNX CRM Dashboard • Failproof • Failsafe • Unbreakable</p>
          <p>Data is backed up to console logs and exportable to Excel/Microsoft Copilot</p>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string; value: number | string; icon: string; color: string }) {
  const colorClasses: Record<string, string> = {
    cyan: "from-cyan-500/20 to-cyan-600/20 border-cyan-500/30",
    green: "from-green-500/20 to-green-600/20 border-green-500/30",
    blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
    purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
    yellow: "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30",
    orange: "from-orange-500/20 to-orange-600/20 border-orange-500/30",
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-xl border p-4`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{icon}</span>
        <span className="text-slate-400 text-xs uppercase tracking-wider">{title}</span>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  );
}

function MilestoneCard({ target, current, label, isRevenue = false }: { target: number; current: number; label: string; isRevenue?: boolean }) {
  const achieved = current >= target;
  const progress = Math.min((current / target) * 100, 100);
  
  return (
    <div className={`rounded-xl border p-4 ${
      achieved 
        ? "bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/50" 
        : "bg-slate-800/50 border-slate-700"
    }`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-slate-300">{label}</span>
        {achieved && <span className="text-xl">🎉</span>}
      </div>
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
        <div 
          className={`h-full transition-all duration-500 ${
            achieved ? "bg-green-500" : "bg-cyan-500"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-xs text-slate-400">
        {isRevenue ? `$${current}` : current} / {isRevenue ? `$${target}` : target}
      </div>
    </div>
  );
}
