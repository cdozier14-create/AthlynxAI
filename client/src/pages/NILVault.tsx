import PlatformLayout from "@/components/PlatformLayout";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

export default function NILVault() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("documents");

  const { data: dealsData } = trpc.nil.getMyDeals.useQuery(
    undefined,
    { enabled: !!user }
  );

  const deals = (dealsData as any)?.deals || [];
  const totalValue = (dealsData as any)?.totalValue || 0;
  const activeDeals = deals.filter((d: any) => d.status === "active").length;

  return (
    <PlatformLayout title="NIL Vault">
      <div className="space-y-4 pb-20 lg:pb-4">
        <div className="bg-gradient-to-r from-[#1a3a8f] to-[#1a2a4a] border border-purple-700 rounded-xl p-5">
          <div className="flex items-center gap-4">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/aDzQEREXtGvMmnFc.png" alt="NIL Vault" className="w-14 h-14 rounded-2xl object-cover shadow-lg" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-white">NIL VAULT</h2>
                <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full font-bold">ELITE</span>
              </div>
              <p className="text-blue-300 text-sm">Secure storage for all your NIL contracts, documents, and earnings history</p>
            </div>
          </div>
        </div>
        <div className="flex gap-1 bg-[#1a3a8f] border border-blue-900 rounded-xl p-1 mb-1">
          {["documents", "deals", "earnings"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg capitalize transition-colors ${activeTab === tab ? 'bg-purple-600 text-white' : 'text-blue-400 hover:text-white'}`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[{ label: "Active Deals", value: user ? String(activeDeals) : "4", icon: "📝" }, { label: "Total Value", value: user ? "$" + totalValue.toLocaleString() : "$39,700", icon: "💰" }, { label: "Documents", value: "14", icon: "📄" }].map((s, i) => (
            <div key={i} className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-3 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-xl font-black text-purple-400">{s.value}</div>
              <div className="text-blue-500 text-xs">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-4">
          <h3 className="text-white font-bold mb-3">Stored Documents</h3>
          <div className="space-y-2">
            {["Nike Endorsement Contract 2025.pdf", "Gatorade NDA 2025.pdf", "State Farm Appearance Agreement.pdf", "Tax Form W-9 2025.pdf", "Agent Agreement — Davis Sports.pdf", "Social Media Usage Rights.pdf"].map((doc, i) => (
              <div key={i} className="flex items-center gap-3 bg-[#1530a0] rounded-xl p-3">
                <svg className="w-8 h-8 text-red-400 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>
                <span className="flex-1 text-white text-sm">{doc}</span>
                <button className="text-blue-400 hover:text-white text-xs transition-colors">Download</button>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 border-2 border-dashed border-purple-700 text-purple-400 hover:text-white hover:border-purple-500 text-sm font-bold py-4 rounded-xl transition-colors">
            + Upload Document
          </button>
        </div>
        {activeTab === "deals" && (
          <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-4">
            <h3 className="text-white font-bold mb-3">My NIL Deals</h3>
            {!user ? (
              <div className="text-center py-6">
                <a href="/signin" className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-2.5 rounded-xl transition-colors">Sign In to View Deals</a>
              </div>
            ) : deals.length === 0 ? (
              <div className="text-center py-6 text-blue-400 text-sm">No deals yet. Visit the NIL Portal to explore opportunities.</div>
            ) : (
              <div className="space-y-2">
                {deals.map((deal: any) => (
                  <div key={deal.id} className="flex items-center gap-3 bg-[#1530a0] rounded-xl p-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-semibold truncate">{deal.brandName}</div>
                      <div className="text-blue-400 text-xs">{deal.dealType} • {deal.sport}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-green-400 font-bold text-sm">${(deal.dealValue || 0).toLocaleString()}</div>
                      <div className={`text-xs ${deal.status === 'active' ? 'text-green-400' : 'text-blue-400'}`}>{deal.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {activeTab === "earnings" && (
          <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-4">
            <h3 className="text-white font-bold mb-3">Earnings History</h3>
            {!user ? (
              <div className="text-center py-6">
                <a href="/signin" className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-2.5 rounded-xl transition-colors">Sign In to View Earnings</a>
              </div>
            ) : deals.length === 0 ? (
              <div className="text-center py-6 text-blue-400 text-sm">No earnings data yet. Add deals in the NIL Portal to track earnings.</div>
            ) : (
              <div className="space-y-2">
                {deals.filter((d: any) => d.status === 'active' || d.status === 'completed').map((deal: any) => (
                  <div key={deal.id} className="flex items-center justify-between bg-[#1530a0] rounded-xl p-3">
                    <div>
                      <div className="text-white text-sm">{deal.brandName}</div>
                      <div className="text-blue-400 text-xs">{deal.dealType}</div>
                    </div>
                    <span className="text-green-400 font-bold">${(deal.dealValue || 0).toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between bg-purple-900/30 border border-purple-700 rounded-xl p-3 mt-2">
                  <span className="text-white font-bold">Total NIL Value</span>
                  <span className="text-purple-400 font-black text-lg">${totalValue.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </PlatformLayout>
  );
}
