import PlatformLayout from "@/components/PlatformLayout";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";

const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-900 text-green-400",
  pending: "bg-yellow-900 text-yellow-400",
  negotiating: "bg-blue-900 text-blue-400",
  completed: "bg-gray-800 text-gray-400",
  declined: "bg-red-900 text-red-400",
};

export default function NILPortal() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddDeal, setShowAddDeal] = useState(false);
  const [newDeal, setNewDeal] = useState({ brandName: "", dealValue: "", description: "", category: "Apparel" });
  const utils = trpc.useUtils();
  const { data: myDeals = [] } = trpc.nil.getMyDeals.useQuery(undefined, { enabled: !!user });
  const { data: allDeals = [] } = trpc.nil.getAllDeals.useQuery({ limit: 20 });
  const { data: nilCalc } = trpc.nil.calculateNilValue.useQuery(
    { sport: "Football", followers: 10000 }, { enabled: true }
  );
  const createDealMutation = trpc.nil.createDeal.useMutation({
    onSuccess: () => { utils.nil.getMyDeals.invalidate(); setShowAddDeal(false); setNewDeal({ brandName: "", dealValue: "", description: "", category: "Apparel" }); }
  });
  const totalValue = myDeals.reduce((sum: number, d: typeof myDeals[0]) => sum + (d.dealValue ?? 0), 0);
  const activeDeals = myDeals.filter((d: typeof myDeals[0]) => d.status === "active").length;

  return (
    <PlatformLayout title="NIL Portal">
      <div className="space-y-4 pb-20 lg:pb-4">
        {/* Header card */}
        <div className="bg-gradient-to-r from-[#1a3a8f] to-[#1a2a4a] border border-blue-700 rounded-xl p-5">
          <div className="flex items-center gap-4">
            <img src="/logos/nil-portal-logo.png" alt="NIL Portal" className="w-14 h-14 rounded-2xl object-cover shadow-lg" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-white">NIL PORTAL</h2>
                <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full font-bold">LIVE</span>
              </div>
              <p className="text-blue-300 text-sm">The most powerful NIL management platform for student athletes</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {[
              { label: "Total NIL Value", value: `$${totalValue.toLocaleString()}`, color: "text-green-400" },
              { label: "Active Deals", value: String(activeDeals), color: "text-blue-400" },
              { label: "Total Deals", value: String(myDeals.length), color: "text-yellow-400" },
            ].map((stat, i) => (
              <div key={i} className="bg-[#1530a0] rounded-xl p-3 text-center">
                <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
                <div className="text-blue-400 text-xs mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#1a3a8f] border border-blue-900 rounded-xl p-1">
          {["dashboard", "deals", "marketplace", "calculator", "vault"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg capitalize transition-colors ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-blue-400 hover:text-white'}`}
            >
              {tab === "calculator" ? "NIL Value" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Dashboard tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-white font-bold">Your Deals</h3>
              {user && <button onClick={() => setShowAddDeal(true)} className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg font-bold transition-colors">+ Add Deal</button>}
            </div>
            {!user && (
              <div className="bg-[#0d1f3c] border border-blue-800 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">🤝</div>
                <div className="text-white font-bold mb-2">Sign in to manage your NIL deals</div>
                <a href="/signin" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl transition-colors">Sign In</a>
              </div>
            )}
            {user && myDeals.length === 0 && (
              <div className="bg-[#0d1f3c] border border-blue-800 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">📋</div>
                <div className="text-white font-bold mb-1">No deals yet</div>
                <div className="text-blue-400 text-sm mb-3">Add your first NIL deal to start tracking</div>
                <button onClick={() => setShowAddDeal(true)} className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-2.5 rounded-xl transition-colors">+ Add First Deal</button>
              </div>
            )}
            {myDeals.map((deal: any) => (
              <div key={deal.id} className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center text-sm font-black shrink-0 text-white">
                  {deal.brandName?.slice(0,2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-white">{deal.brandName}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${STATUS_COLORS[deal.status] ?? "bg-gray-800 text-gray-400"}`}>{deal.status}</span>
                  </div>
                  <div className="text-blue-400 text-xs">{deal.category} {deal.description ? `• ${deal.description.slice(0,40)}` : ""}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-green-400 font-black text-lg">${(deal.dealValue ?? 0).toLocaleString()}</div>
                </div>
              </div>
            ))}
            {showAddDeal && (
              <div className="bg-[#0d1f3c] border border-green-700 rounded-xl p-5 space-y-3">
                <h4 className="text-white font-bold">Add New NIL Deal</h4>
                <input className="w-full bg-[#1a2a4a] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 placeholder-blue-600" placeholder="Brand Name" value={newDeal.brandName} onChange={e => setNewDeal(d => ({...d, brandName: e.target.value}))} />
                <input className="w-full bg-[#1a2a4a] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 placeholder-blue-600" placeholder="Deal Value (e.g. 45000)" type="number" value={newDeal.dealValue} onChange={e => setNewDeal(d => ({...d, dealValue: e.target.value}))} />
                <input className="w-full bg-[#1a2a4a] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 placeholder-blue-600" placeholder="Description (optional)" value={newDeal.description} onChange={e => setNewDeal(d => ({...d, description: e.target.value}))} />
                <div className="flex gap-2">
                  <button onClick={() => createDealMutation.mutate({ brandName: newDeal.brandName, dealValue: parseFloat(newDeal.dealValue) || 0, description: newDeal.description || undefined, category: newDeal.category })} disabled={createDealMutation.isPending || !newDeal.brandName} className="flex-1 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl transition-colors">{createDealMutation.isPending ? "Saving..." : "Save Deal"}</button>
                  <button onClick={() => setShowAddDeal(false)} className="flex-1 border border-blue-700 text-blue-300 font-bold py-2.5 rounded-xl hover:bg-blue-900 transition-colors">Cancel</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Marketplace tab */}
        {activeTab === "marketplace" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-white font-bold">Brand Marketplace</h3>
              <span className="text-xs text-blue-400">247 active brands</span>
            </div>
            {[
              { brand: "Adidas", category: "Apparel", budget: "$20K-$80K", sports: "All Sports", seeking: "D1 Athletes" },
              { brand: "Muscle Milk", category: "Nutrition", budget: "$5K-$25K", sports: "Football, Basketball", seeking: "High Followers" },
              { brand: "EA Sports", category: "Gaming", budget: "$10K-$50K", sports: "Football, Basketball, Baseball", seeking: "Rising Stars" },
              { brand: "Beats by Dre", category: "Electronics", budget: "$15K-$60K", sports: "All Sports", seeking: "Verified Athletes" },
            ].map((brand, i) => (
              <div key={i} className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-bold text-white">{brand.brand}</span>
                    <span className="text-blue-400 text-xs ml-2">{brand.category}</span>
                  </div>
                  <span className="text-green-400 font-bold text-sm">{brand.budget}</span>
                </div>
                <div className="text-xs text-blue-400 mb-3">{brand.sports} • Seeking: {brand.seeking}</div>
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-2 rounded-lg transition-colors">
                  Apply for Deal
                </button>
              </div>
            ))}
          </div>
        )}

        {/* NIL Value Calculator */}
        {activeTab === "calculator" && (
          <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-5">
            <h3 className="text-white font-bold mb-4">NIL Value Calculator</h3>
            <div className="space-y-4">
              {[
                { label: "Sport", options: ["Football", "Basketball", "Baseball", "Soccer", "Track"] },
                { label: "Division", options: ["D1", "D2", "D3", "NAIA", "JUCO"] },
                { label: "Position/Role", options: ["QB", "WR", "RB", "PG", "SG", "SP", "C"] },
                { label: "Social Media Followers", options: ["Under 1K", "1K-10K", "10K-100K", "100K+"] },
              ].map((field, i) => (
                <div key={i}>
                  <label className="text-blue-300 text-sm font-semibold block mb-1">{field.label}</label>
                  <select className="w-full bg-[#1a3a8f] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-blue-500">
                    {field.options.map(opt => <option key={opt}>{opt}</option>)}
                  </select>
                </div>
              ))}
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-3 rounded-xl transition-colors">
                CALCULATE MY NIL VALUE
              </button>
              <div className="bg-[#1530a0] rounded-xl p-4 text-center">
                <div className="text-blue-400 text-xs mb-1">Estimated NIL Value Range</div>
                <div className="text-4xl font-black text-green-400">$45K – $180K</div>
                <div className="text-blue-400 text-xs mt-1">Based on your profile metrics</div>
              </div>
            </div>
          </div>
        )}

        {/* Deals tab */}
        {activeTab === "deals" && (
          <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-5">
            <h3 className="text-white font-bold mb-4">Active Contracts</h3>
            <div className="space-y-3">
              {myDeals.filter((d: any) => d.status === "active").map((deal: any) => (
                <div key={deal.id} className="bg-[#1530a0] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">{deal.brandName}</span>
                    <span className="text-green-400 font-black">${(deal.dealValue ?? 0).toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-blue-400 mb-3">{deal.category}{deal.description ? ` • ${deal.description.slice(0,40)}` : ""}</div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold py-2 rounded-lg transition-colors">View Contract</button>
                    <button className="flex-1 border border-blue-700 text-blue-300 text-xs font-bold py-2 rounded-lg hover:bg-blue-900 transition-colors">Message Brand</button>
                  </div>
                </div>
              ))}
              {myDeals.filter((d: any) => d.status === "active").length === 0 && (
                <div className="text-center py-6 text-blue-400 text-sm">No active contracts yet. Add deals in the Dashboard tab.</div>
              )}
            </div>
          </div>
        )}

        {/* Vault tab */}
        {activeTab === "vault" && (
          <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-5">
            <h3 className="text-white font-bold mb-4">NIL Vault — Secure Document Storage</h3>
            <div className="space-y-3">
              {["Nike Contract 2025.pdf", "Gatorade NDA.pdf", "State Farm Agreement.pdf", "Tax Documents 2025.pdf"].map((doc, i) => (
                <div key={i} className="flex items-center gap-3 bg-[#1530a0] rounded-xl p-3">
                  <svg className="w-8 h-8 text-red-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
                  </svg>
                  <span className="flex-1 text-white text-sm">{doc}</span>
                  <button className="text-blue-400 hover:text-white text-xs transition-colors">Download</button>
                </div>
              ))}
              <button className="w-full border-2 border-dashed border-blue-700 text-blue-400 hover:text-white hover:border-blue-500 text-sm font-bold py-4 rounded-xl transition-colors">
                + Upload Document
              </button>
            </div>
          </div>
        )}
      </div>
    </PlatformLayout>
  );
}
