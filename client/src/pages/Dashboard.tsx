import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import LoginButton from "@/components/LoginButton";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - in production this would come from tRPC
  const subscription = {
    plan: "Pro",
    status: "active",
    price: 9.99,
    nextBilling: "January 15, 2025",
    aiCredits: 42,
    totalCredits: 50,
  };

  const recentActivity = [
    { type: "ai", action: "AI Training Plan Generated", credits: 5, date: "2 hours ago" },
    { type: "purchase", action: "Purchased Pro Baseball Bat", amount: 299.99, date: "Yesterday" },
    { type: "ai", action: "Video Analysis Completed", credits: 10, date: "2 days ago" },
    { type: "profile", action: "Profile Updated", date: "3 days ago" },
    { type: "ai", action: "Recruiting Email Generated", credits: 3, date: "5 days ago" },
  ];

  const savedPlayers = [
    { name: "Marcus Johnson", position: "RHP", class: 2026, rating: 98 },
    { name: "Jake Williams", position: "SS", class: 2026, rating: 97 },
    { name: "Tyler Smith", position: "OF", class: 2026, rating: 96 },
  ];

  const orders = [
    { id: "ORD-001234", date: "Dec 20, 2024", items: 2, total: 489.98, status: "Delivered" },
    { id: "ORD-001198", date: "Dec 5, 2024", items: 1, total: 34.99, status: "Delivered" },
    { id: "ORD-001156", date: "Nov 28, 2024", items: 3, total: 124.97, status: "Delivered" },
  ];

  const tabs = [
    { id: "overview", name: "Overview", icon: "" },
    { id: "subscription", name: "Subscription", icon: "💳" },
    { id: "credits", name: "AI Credits", icon: "🤖" },
    { id: "orders", name: "Orders", icon: "📦" },
    { id: "saved", name: "Saved Players", icon: "" },
    { id: "settings", name: "Settings", icon: "⚙️" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center p-4">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 max-w-md w-full text-center">
          <span className="text-6xl block mb-4"></span>
          <h1 className="text-2xl font-bold text-white mb-2">Sign In Required</h1>
          <p className="text-gray-400 mb-6">Please sign in to access your dashboard</p>
          <LoginButton className="inline-block px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-xl hover:opacity-90 transition-all">
            Sign In with ATHLYNX
          </LoginButton>
          <p className="text-gray-500 text-sm mt-4">
            <Link href="/" className="text-cyan-400 hover:underline">← Back to Home</Link>
          </p>
        </div>
      </div>
    );
  }

  const handleUpgrade = () => {
    toast.success("Redirecting to upgrade page...");
  };

  const handleBuyCredits = () => {
    toast.success("Redirecting to credit purchase...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl"></span>
            <span className="text-xl font-black text-white">ATHLYNX</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/home" className="text-gray-400 hover:text-white">Platform</Link>
            <Link href="/store" className="text-gray-400 hover:text-white">Store</Link>
            <Link href="/dashboard" className="text-yellow-400 font-semibold">Dashboard</Link>
          </nav>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
              <span className="text-yellow-400">🤖</span>
              <span className="text-white font-semibold">{subscription.aiCredits}</span>
              <span className="text-gray-400 text-sm">credits</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
              {user.name?.charAt(0) || "U"}
            </div>
          </div>
        </div>
      </header>

      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, <span className="text-cyan-400">{user.name || "Athlete"}</span>! 👋
            </h1>
            <p className="text-gray-400">Manage your subscription, AI credits, and account settings</p>
          </div>

          <div className="flex gap-6 flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeTab === tab.id
                        ? "bg-yellow-500 text-black font-semibold"
                        : "text-gray-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Quick Stats */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-400 text-sm">Current Plan</span>
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-semibold">
                          {subscription.plan}
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-white">${subscription.price}/mo</p>
                      <p className="text-gray-500 text-sm mt-1">Next billing: {subscription.nextBilling}</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-400 text-sm">AI Credits</span>
                        <span className="text-cyan-400">🤖</span>
                      </div>
                      <p className="text-2xl font-bold text-white">{subscription.aiCredits} / {subscription.totalCredits}</p>
                      <div className="w-full h-2 bg-white/10 rounded-full mt-2">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                          style={{ width: `${(subscription.aiCredits / subscription.totalCredits) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-400 text-sm">Saved Players</span>
                        <span className="text-yellow-400"></span>
                      </div>
                      <p className="text-2xl font-bold text-white">{savedPlayers.length}</p>
                      <p className="text-gray-500 text-sm mt-1">Players on your watchlist</p>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5">
                    <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      {recentActivity.map((activity, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">
                              {activity.type === "ai" ? "🤖" : activity.type === "purchase" ? "🛒" : ""}
                            </span>
                            <div>
                              <p className="text-white text-sm">{activity.action}</p>
                              <p className="text-gray-500 text-xs">{activity.date}</p>
                            </div>
                          </div>
                          {activity.credits && (
                            <span className="text-cyan-400 text-sm">-{activity.credits} credits</span>
                          )}
                          {activity.amount && (
                            <span className="text-green-400 text-sm">${activity.amount}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Subscription Tab */}
              {activeTab === "subscription" && (
                <div className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-white">Your Subscription</h3>
                        <p className="text-gray-400">Manage your plan and billing</p>
                      </div>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                        Active
                      </span>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-6 mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-yellow-400 font-semibold mb-1">ATHLYNX Pro</p>
                          <p className="text-3xl font-bold text-white">${subscription.price}<span className="text-lg text-gray-400">/month</span></p>
                        </div>
                        <button
                          onClick={handleUpgrade}
                          className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-all"
                        >
                          Upgrade to Elite
                        </button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-lg p-4">
                        <p className="text-gray-400 text-sm mb-1">Next Billing Date</p>
                        <p className="text-white font-semibold">{subscription.nextBilling}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4">
                        <p className="text-gray-400 text-sm mb-1">Payment Method</p>
                        <p className="text-white font-semibold">•••• •••• •••• 4242</p>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10">
                      <h4 className="text-white font-semibold mb-3">Plan Features</h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {[
                          "50 AI Credits/month",
                          "Video Highlights",
                          "Advanced Analytics",
                          "Priority Support",
                          "Recruiting Tools",
                          "Custom Training Plans"
                        ].map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                            <span className="text-green-400"></span>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Billing History</h3>
                    <div className="space-y-2">
                      {[
                        { date: "Dec 15, 2024", amount: 9.99, status: "Paid" },
                        { date: "Nov 15, 2024", amount: 9.99, status: "Paid" },
                        { date: "Oct 15, 2024", amount: 9.99, status: "Paid" },
                      ].map((bill, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                          <span className="text-gray-400">{bill.date}</span>
                          <span className="text-white">${bill.amount}</span>
                          <span className="text-green-400 text-sm">{bill.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* AI Credits Tab */}
              {activeTab === "credits" && (
                <div className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-white">AI Credits</h3>
                        <p className="text-gray-400">Power your AI coaching and analysis</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-cyan-400">{subscription.aiCredits}</p>
                        <p className="text-gray-500 text-sm">credits remaining</p>
                      </div>
                    </div>

                    <div className="w-full h-4 bg-white/10 rounded-full mb-6">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                        style={{ width: `${(subscription.aiCredits / subscription.totalCredits) * 100}%` }}
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      {[
                        { credits: 100, price: 9.99, popular: false },
                        { credits: 500, price: 39.99, popular: true },
                        { credits: 1000, price: 69.99, popular: false },
                      ].map((pack, i) => (
                        <div 
                          key={i} 
                          className={`relative rounded-xl p-5 border ${
                            pack.popular 
                              ? "bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500/50" 
                              : "bg-white/5 border-white/10"
                          }`}
                        >
                          {pack.popular && (
                            <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-cyan-500 text-black text-xs font-bold rounded-full">
                              BEST VALUE
                            </span>
                          )}
                          <p className="text-3xl font-bold text-white text-center mb-1">{pack.credits}</p>
                          <p className="text-gray-400 text-center text-sm mb-3">credits</p>
                          <p className="text-xl font-bold text-cyan-400 text-center mb-4">${pack.price}</p>
                          <button
                            onClick={handleBuyCredits}
                            className={`w-full py-2 rounded-lg font-semibold transition-all ${
                              pack.popular
                                ? "bg-cyan-500 text-black hover:bg-cyan-400"
                                : "bg-white/10 text-white hover:bg-white/20"
                            }`}
                          >
                            Buy Now
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-3">Credit Usage Guide</h4>
                      <div className="grid md:grid-cols-2 gap-2 text-sm">
                        {[
                          { action: "Training Plan Generation", credits: 5 },
                          { action: "Video Analysis", credits: 10 },
                          { action: "Recruiting Email", credits: 3 },
                          { action: "Performance Report", credits: 8 },
                          { action: "AI Chat Session", credits: 1 },
                          { action: "Scouting Report", credits: 15 },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between text-gray-400">
                            <span>{item.action}</span>
                            <span className="text-cyan-400">{item.credits} credits</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Order History</h3>
                  <div className="space-y-4">
                    {orders.map((order, i) => (
                      <div key={i} className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">{order.id}</span>
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                            {order.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">{order.date} • {order.items} items</span>
                          <span className="text-white font-semibold">${order.total}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href="/store" className="block mt-6 text-center text-cyan-400 hover:underline">
                    Continue Shopping →
                  </Link>
                </div>
              )}

              {/* Saved Players Tab */}
              {activeTab === "saved" && (
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Saved Players</h3>
                  <div className="space-y-3">
                    {savedPlayers.map((player, i) => (
                      <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                            {player.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white font-semibold">{player.name}</p>
                            <p className="text-gray-400 text-sm">{player.position} • Class of {player.class}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-cyan-400 font-bold">{player.rating}</span>
                          <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm hover:bg-blue-500/30">
                            View Profile
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href="/diamond-grind" className="block mt-6 text-center text-cyan-400 hover:underline">
                    Browse More Players →
                  </Link>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Account Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-gray-400 text-sm block mb-2">Display Name</label>
                        <input
                          type="text"
                          defaultValue={user.name || ""}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm block mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue="athlete@example.com"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <button className="px-6 py-2 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-all">
                        Save Changes
                      </button>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Notifications</h3>
                    <div className="space-y-3">
                      {[
                        { label: "Email notifications", enabled: true },
                        { label: "Recruiting alerts", enabled: true },
                        { label: "Tournament reminders", enabled: false },
                        { label: "Marketing emails", enabled: false },
                      ].map((setting, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-gray-400">{setting.label}</span>
                          <button className={`w-12 h-6 rounded-full transition-all ${
                            setting.enabled ? "bg-cyan-500" : "bg-white/20"
                          }`}>
                            <div className={`w-5 h-5 bg-white rounded-full transition-all ${
                              setting.enabled ? "translate-x-6" : "translate-x-0.5"
                            }`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-red-500/10 backdrop-blur-sm rounded-xl border border-red-500/20 p-6">
                    <h3 className="text-lg font-bold text-red-400 mb-2">Danger Zone</h3>
                    <p className="text-gray-400 text-sm mb-4">Once you delete your account, there is no going back.</p>
                    <button className="px-6 py-2 bg-red-500/20 text-red-400 font-semibold rounded-lg hover:bg-red-500/30 transition-all">
                      Delete Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
