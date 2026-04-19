import PlatformLayout from "@/components/PlatformLayout";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

export default function AISales() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"pitch" | "analyze">("pitch");

  // Pitch form state
  const [pitchForm, setPitchForm] = useState({
    brandName: "",
    brandCategory: "Sports",
    dealValue: "",
    sport: "",
    school: "",
    followers: "",
    achievements: "",
  });
  const [pitchResult, setPitchResult] = useState("");

  // Analyze form state
  const [analyzeForm, setAnalyzeForm] = useState({
    brandName: "",
    dealValue: "",
    deliverables: "",
    sport: "",
    followers: "",
  });
  const [analyzeResult, setAnalyzeResult] = useState("");

  const pitchMutation = trpc.ai.generateBrandPitch.useMutation({
    onSuccess: (d) => setPitchResult(String(d.pitch ?? "")),
  });

  const analyzeMutation = trpc.ai.analyzeDeal.useMutation({
    onSuccess: (d) => setAnalyzeResult(String(d.analysis ?? "")),
  });

  const handleGeneratePitch = () => {
    if (!pitchForm.brandName || !pitchForm.sport) return;
    pitchMutation.mutate({
      brandName: pitchForm.brandName,
      brandCategory: pitchForm.brandCategory,
      dealValue: pitchForm.dealValue ? Number(pitchForm.dealValue) : undefined,
      sport: pitchForm.sport,
      school: pitchForm.school,
      followers: pitchForm.followers ? Number(pitchForm.followers) : undefined,
      athleteName: user?.name || "Athlete",
    });
  };

  const handleAnalyzeDeal = () => {
    if (!analyzeForm.brandName || !analyzeForm.dealValue) return;
    analyzeMutation.mutate({
      brandName: analyzeForm.brandName,
      dealValue: Number(analyzeForm.dealValue),
      deliverables: analyzeForm.deliverables,
      sport: analyzeForm.sport,
      athleteFollowers: analyzeForm.followers ? Number(analyzeForm.followers) : undefined,
    });
  };

  if (!user) {
    return (
      <PlatformLayout title="AI Sales">
        <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-8 text-center">
          <div className="text-4xl mb-4">🤝</div>
          <h2 className="text-xl font-black text-white mb-2">Sign In to Use AI Sales</h2>
          <p className="text-blue-300 text-sm mb-4">Generate brand pitches and analyze NIL deals with AI.</p>
          <a href="/signin" className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-6 py-2.5 rounded-lg inline-block transition-colors">
            Sign In
          </a>
        </div>
      </PlatformLayout>
    );
  }

  return (
    <PlatformLayout title="AI Sales">
      <div className="space-y-4 pb-20 lg:pb-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1a3a8f] to-[#1a2a4a] border border-cyan-700 rounded-xl p-5">
          <div className="flex items-center gap-4">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/aZXZLwryoTRrDQBs.png" alt="AI Sales" className="w-14 h-14 rounded-2xl object-cover shadow-lg" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-white">AI SALES</h2>
                <span className="text-xs bg-cyan-600 text-white px-2 py-0.5 rounded-full font-bold">LIVE AI</span>
              </div>
              <p className="text-blue-300 text-sm">Close brand deals faster with AI-powered pitch generation and deal analysis</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#1a3a8f] border border-blue-900 rounded-xl p-1">
          {[
            { key: "pitch", label: "Brand Pitch Generator" },
            { key: "analyze", label: "Deal Analyzer" },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === tab.key ? 'bg-cyan-600 text-white' : 'text-blue-400 hover:text-white'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Pitch Generator */}
        {activeTab === "pitch" && (
          <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-5">
            <h3 className="text-white font-bold mb-4">AI Brand Pitch Generator</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-blue-300 text-xs font-semibold block mb-1">Target Brand *</label>
                  <input
                    value={pitchForm.brandName}
                    onChange={e => setPitchForm(p => ({ ...p, brandName: e.target.value }))}
                    className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-cyan-500 placeholder-blue-500"
                    placeholder="e.g. Nike, Gatorade..."
                  />
                </div>
                <div>
                  <label className="text-blue-300 text-xs font-semibold block mb-1">Brand Category</label>
                  <select
                    value={pitchForm.brandCategory}
                    onChange={e => setPitchForm(p => ({ ...p, brandCategory: e.target.value }))}
                    className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-cyan-500"
                  >
                    {["Sports", "Apparel", "Food & Beverage", "Tech", "Finance", "Health", "Entertainment", "Automotive"].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-blue-300 text-xs font-semibold block mb-1">Your Sport *</label>
                  <input
                    value={pitchForm.sport}
                    onChange={e => setPitchForm(p => ({ ...p, sport: e.target.value }))}
                    className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-cyan-500 placeholder-blue-500"
                    placeholder="Football QB, D1"
                  />
                </div>
                <div>
                  <label className="text-blue-300 text-xs font-semibold block mb-1">School</label>
                  <input
                    value={pitchForm.school}
                    onChange={e => setPitchForm(p => ({ ...p, school: e.target.value }))}
                    className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-cyan-500 placeholder-blue-500"
                    placeholder="University of Alabama"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-blue-300 text-xs font-semibold block mb-1">Social Followers</label>
                  <input
                    value={pitchForm.followers}
                    onChange={e => setPitchForm(p => ({ ...p, followers: e.target.value }))}
                    type="number"
                    className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-cyan-500 placeholder-blue-500"
                    placeholder="10000"
                  />
                </div>
                <div>
                  <label className="text-blue-300 text-xs font-semibold block mb-1">Target Deal Value ($)</label>
                  <input
                    value={pitchForm.dealValue}
                    onChange={e => setPitchForm(p => ({ ...p, dealValue: e.target.value }))}
                    type="number"
                    className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-cyan-500 placeholder-blue-500"
                    placeholder="25000"
                  />
                </div>
              </div>
              <div>
                <label className="text-blue-300 text-xs font-semibold block mb-1">Key Stats & Achievements</label>
                <textarea
                  value={pitchForm.achievements}
                  onChange={e => setPitchForm(p => ({ ...p, achievements: e.target.value }))}
                  className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-cyan-500 placeholder-blue-500 h-20 resize-none"
                  placeholder="4,200 passing yards, 38 TDs, All-Conference honors..."
                />
              </div>
              <button
                onClick={handleGeneratePitch}
                disabled={pitchMutation.isPending || !pitchForm.brandName || !pitchForm.sport}
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-black py-3 rounded-xl transition-colors disabled:opacity-50"
              >
                {pitchMutation.isPending ? "Generating AI Pitch..." : "GENERATE AI PITCH"}
              </button>
            </div>

            {pitchMutation.isError && (
              <div className="mt-3 bg-red-900/30 border border-red-700 rounded-xl p-3 text-red-300 text-sm">
                Error generating pitch. Please try again.
              </div>
            )}

            {pitchResult && (
              <div className="mt-4 bg-[#1530a0] border border-cyan-700 rounded-xl p-4">
                <div className="text-cyan-400 text-xs font-bold mb-2 flex items-center gap-2">
                  <span>🤖</span> AI GENERATED PITCH
                </div>
                <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">{pitchResult}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => navigator.clipboard.writeText(pitchResult)}
                    className="flex-1 border border-cyan-700 text-cyan-300 text-sm font-bold py-2 rounded-lg hover:bg-cyan-900 transition-colors"
                  >
                    Copy Pitch
                  </button>
                  <button
                    onClick={() => setPitchResult("")}
                    className="flex-1 border border-blue-700 text-blue-300 text-sm font-bold py-2 rounded-lg hover:bg-blue-900 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Deal Analyzer */}
        {activeTab === "analyze" && (
          <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-5">
            <h3 className="text-white font-bold mb-4">AI Deal Analyzer</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-blue-300 text-xs font-semibold block mb-1">Brand Name *</label>
                  <input
                    value={analyzeForm.brandName}
                    onChange={e => setAnalyzeForm(p => ({ ...p, brandName: e.target.value }))}
                    className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-cyan-500 placeholder-blue-500"
                    placeholder="Brand name"
                  />
                </div>
                <div>
                  <label className="text-blue-300 text-xs font-semibold block mb-1">Deal Value ($) *</label>
                  <input
                    value={analyzeForm.dealValue}
                    onChange={e => setAnalyzeForm(p => ({ ...p, dealValue: e.target.value }))}
                    type="number"
                    className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-cyan-500 placeholder-blue-500"
                    placeholder="15000"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-blue-300 text-xs font-semibold block mb-1">Your Sport</label>
                  <input
                    value={analyzeForm.sport}
                    onChange={e => setAnalyzeForm(p => ({ ...p, sport: e.target.value }))}
                    className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-cyan-500 placeholder-blue-500"
                    placeholder="Football"
                  />
                </div>
                <div>
                  <label className="text-blue-300 text-xs font-semibold block mb-1">Your Followers</label>
                  <input
                    value={analyzeForm.followers}
                    onChange={e => setAnalyzeForm(p => ({ ...p, followers: e.target.value }))}
                    type="number"
                    className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-cyan-500 placeholder-blue-500"
                    placeholder="10000"
                  />
                </div>
              </div>
              <div>
                <label className="text-blue-300 text-xs font-semibold block mb-1">Deal Deliverables</label>
                <textarea
                  value={analyzeForm.deliverables}
                  onChange={e => setAnalyzeForm(p => ({ ...p, deliverables: e.target.value }))}
                  className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-cyan-500 placeholder-blue-500 h-20 resize-none"
                  placeholder="3 Instagram posts, 2 stories, 1 appearance..."
                />
              </div>
              <button
                onClick={handleAnalyzeDeal}
                disabled={analyzeMutation.isPending || !analyzeForm.brandName || !analyzeForm.dealValue}
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-black py-3 rounded-xl transition-colors disabled:opacity-50"
              >
                {analyzeMutation.isPending ? "Analyzing Deal..." : "ANALYZE DEAL WITH AI"}
              </button>
            </div>

            {analyzeMutation.isError && (
              <div className="mt-3 bg-red-900/30 border border-red-700 rounded-xl p-3 text-red-300 text-sm">
                Error analyzing deal. Please try again.
              </div>
            )}

            {analyzeResult && (
              <div className="mt-4 bg-[#1530a0] border border-cyan-700 rounded-xl p-4">
                <div className="text-cyan-400 text-xs font-bold mb-2 flex items-center gap-2">
                  <span>🤖</span> AI DEAL ANALYSIS
                </div>
                <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">{analyzeResult}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => navigator.clipboard.writeText(analyzeResult)}
                    className="flex-1 border border-cyan-700 text-cyan-300 text-sm font-bold py-2 rounded-lg hover:bg-cyan-900 transition-colors"
                  >
                    Copy Analysis
                  </button>
                  <button
                    onClick={() => setAnalyzeResult("")}
                    className="flex-1 border border-blue-700 text-blue-300 text-sm font-bold py-2 rounded-lg hover:bg-blue-900 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sponsor Matching */}
        <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-4">
          <h3 className="text-white font-bold mb-3">Top Brand Categories for Athletes</h3>
          <p className="text-blue-400 text-sm mb-3">Use the AI pitch generator above to target these high-value brand categories.</p>
          {[
            { brand: "Sports Apparel", match: "94%", reason: "Highest NIL deal volume for athletes" },
            { brand: "Energy & Nutrition", match: "87%", reason: "Strong athlete audience alignment" },
            { brand: "Tech & Gaming", match: "82%", reason: "Gen Z athlete demographic match" },
            { brand: "Automotive", match: "76%", reason: "High-value local market deals" },
            { brand: "Financial Services", match: "71%", reason: "Growing NIL financial literacy market" },
          ].map((m, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-blue-900 last:border-0">
              <div className="flex-1">
                <div className="font-semibold text-white text-sm">{m.brand}</div>
                <div className="text-blue-400 text-xs">{m.reason}</div>
              </div>
              <div className="text-right">
                <div className="text-cyan-400 font-bold text-sm">{m.match}</div>
                <div className="text-blue-500 text-xs">match</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PlatformLayout>
  );
}
