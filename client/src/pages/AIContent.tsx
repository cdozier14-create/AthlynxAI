import PlatformLayout from "@/components/PlatformLayout";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

export default function AIContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"caption" | "bio" | "plan">("caption");
  const [captionForm, setCaptionForm] = useState({ platform: "instagram" as "instagram"|"twitter"|"tiktok"|"linkedin", contentType: "highlight" as "highlight"|"training"|"gameday"|"nil_deal"|"motivation"|"recruiting", context: "", sport: "" });
  const [captionResult, setCaptionResult] = useState("");
  const [bioForm, setBioForm] = useState({ platform: "instagram" as "instagram"|"twitter"|"tiktok"|"linkedin", sport: "", school: "", position: "", achievements: "" });
  const [bioResult, setBioResult] = useState("");
  const [planForm, setPlanForm] = useState({ sport: "", season: "in-season" as "preseason"|"in-season"|"offseason"|"postseason", goals: "", platforms: ["instagram", "twitter"] });
  const [planResult, setPlanResult] = useState("");
  const captionMutation = trpc.ai.generateCaption.useMutation({ onSuccess: (d) => setCaptionResult(String(d.captions ?? "")) });
  const bioMutation = trpc.ai.generateBio.useMutation({ onSuccess: (d) => setBioResult(String(d.bios ?? "")) });
  const planMutation = trpc.ai.generateContentPlan.useMutation({ onSuccess: (d) => setPlanResult(String(d.plan ?? "")) });
  return (
    <PlatformLayout title="AI Content">
      <div className="space-y-4 pb-20 lg:pb-4">
        <div className="bg-gradient-to-r from-[#1a3a8f] to-[#1a2a4a] border border-pink-700 rounded-xl p-5">
          <div className="flex items-center gap-4">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/ZIXWdkuFjiAnPjQj.png" alt="AI Content" className="w-14 h-14 rounded-2xl object-cover shadow-lg" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-white">AI CONTENT</h2>
                <span className="text-xs bg-pink-600 text-white px-2 py-0.5 rounded-full font-bold">BLEND</span>
              </div>
              <p className="text-blue-300 text-sm">Create viral content, highlight reels, and brand-ready media with AI</p>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {(["caption", "bio", "plan"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === tab ? "bg-pink-600 text-white" : "bg-[#1a2a4a] text-blue-300 hover:bg-[#1a3a6a]"
              }`}>
              {tab === "caption" ? "📱 Caption Generator" : tab === "bio" ? "✍️ Bio Writer" : "📅 Content Plan"}
            </button>
          ))}
        </div>

        {activeTab === "caption" && (
          <div className="bg-[#0d1f3c] border border-pink-900 rounded-xl p-5 space-y-4">
            <h3 className="text-white font-bold text-lg">Social Media Caption Generator</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-blue-300 text-xs font-semibold block mb-1">Platform</label>
                <select className="w-full bg-[#1a2a4a] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5"
                  value={captionForm.platform} onChange={e => setCaptionForm(f => ({ ...f, platform: e.target.value as any }))}>
                  {["instagram","twitter","tiktok","linkedin"].map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase()+p.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="text-blue-300 text-xs font-semibold block mb-1">Content Type</label>
                <select className="w-full bg-[#1a2a4a] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5"
                  value={captionForm.contentType} onChange={e => setCaptionForm(f => ({ ...f, contentType: e.target.value as any }))}>
                  {["highlight","training","gameday","nil_deal","motivation","recruiting"].map(t => <option key={t} value={t}>{t.replace("_"," ").toUpperCase()}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-blue-300 text-xs font-semibold block mb-1">What's the post about?</label>
              <textarea className="w-full bg-[#1a2a4a] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 h-20 resize-none placeholder-blue-600"
                placeholder="e.g. Just dropped 4 TDs in the championship game, feeling blessed..."
                value={captionForm.context} onChange={e => setCaptionForm(f => ({ ...f, context: e.target.value }))} />
            </div>
            <button onClick={() => captionMutation.mutate({ platform: captionForm.platform, contentType: captionForm.contentType, context: captionForm.context || "Athletic achievement", sport: captionForm.sport, includeHashtags: true })}
              disabled={captionMutation.isPending}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
              {captionMutation.isPending ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Generating...</> : "✨ Generate Captions"}
            </button>
            {captionResult && (
              <div className="bg-[#0a1628] border border-pink-800 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-pink-400 font-bold text-sm">✨ AI Captions</h4>
                  <button onClick={() => navigator.clipboard.writeText(captionResult)} className="text-xs text-blue-400 hover:text-white border border-blue-700 px-2 py-1 rounded-lg">Copy All</button>
                </div>
                <pre className="text-white text-sm whitespace-pre-wrap font-sans leading-relaxed">{captionResult}</pre>
              </div>
            )}
          </div>
        )}

        {activeTab === "bio" && (
          <div className="bg-[#0d1f3c] border border-pink-900 rounded-xl p-5 space-y-4">
            <h3 className="text-white font-bold text-lg">Athlete Bio Writer</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-blue-300 text-xs font-semibold block mb-1">Platform</label>
                <select className="w-full bg-[#1a2a4a] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5"
                  value={bioForm.platform} onChange={e => setBioForm(f => ({ ...f, platform: e.target.value as any }))}>
                  {["instagram","twitter","tiktok","linkedin"].map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase()+p.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="text-blue-300 text-xs font-semibold block mb-1">Sport</label>
                <input className="w-full bg-[#1a2a4a] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 placeholder-blue-600"
                  placeholder="e.g. Football" value={bioForm.sport} onChange={e => setBioForm(f => ({ ...f, sport: e.target.value }))} />
              </div>
              <div>
                <label className="text-blue-300 text-xs font-semibold block mb-1">School</label>
                <input className="w-full bg-[#1a2a4a] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 placeholder-blue-600"
                  placeholder="e.g. Alabama" value={bioForm.school} onChange={e => setBioForm(f => ({ ...f, school: e.target.value }))} />
              </div>
              <div>
                <label className="text-blue-300 text-xs font-semibold block mb-1">Position</label>
                <input className="w-full bg-[#1a2a4a] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 placeholder-blue-600"
                  placeholder="e.g. QB" value={bioForm.position} onChange={e => setBioForm(f => ({ ...f, position: e.target.value }))} />
              </div>
            </div>
            <div>
              <label className="text-blue-300 text-xs font-semibold block mb-1">Key Achievements</label>
              <textarea className="w-full bg-[#1a2a4a] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 h-16 resize-none placeholder-blue-600"
                placeholder="e.g. 4,200 passing yards, 38 TDs, All-Conference 2024..."
                value={bioForm.achievements} onChange={e => setBioForm(f => ({ ...f, achievements: e.target.value }))} />
            </div>
            <button onClick={() => bioMutation.mutate({ platform: bioForm.platform, athleteName: user?.name || "Athlete", sport: bioForm.sport || "Athlete", school: bioForm.school || undefined, position: bioForm.position || undefined, achievements: bioForm.achievements || undefined })}
              disabled={bioMutation.isPending}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
              {bioMutation.isPending ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Writing...</> : "✍️ Write My Bio"}
            </button>
            {bioResult && (
              <div className="bg-[#0a1628] border border-purple-800 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-purple-400 font-bold text-sm">✍️ AI Bio Options</h4>
                  <button onClick={() => navigator.clipboard.writeText(bioResult)} className="text-xs text-blue-400 hover:text-white border border-blue-700 px-2 py-1 rounded-lg">Copy</button>
                </div>
                <pre className="text-white text-sm whitespace-pre-wrap font-sans leading-relaxed">{bioResult}</pre>
              </div>
            )}
          </div>
        )}

        {activeTab === "plan" && (
          <div className="bg-[#0d1f3c] border border-pink-900 rounded-xl p-5 space-y-4">
            <h3 className="text-white font-bold text-lg">30-Day Content Plan</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-blue-300 text-xs font-semibold block mb-1">Sport</label>
                <input className="w-full bg-[#1a2a4a] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 placeholder-blue-600"
                  placeholder="e.g. Basketball" value={planForm.sport} onChange={e => setPlanForm(f => ({ ...f, sport: e.target.value }))} />
              </div>
              <div>
                <label className="text-blue-300 text-xs font-semibold block mb-1">Season</label>
                <select className="w-full bg-[#1a2a4a] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5"
                  value={planForm.season} onChange={e => setPlanForm(f => ({ ...f, season: e.target.value as any }))}>
                  {["preseason","in-season","offseason","postseason"].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-blue-300 text-xs font-semibold block mb-1">Your Goals</label>
              <textarea className="w-full bg-[#1a2a4a] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 h-16 resize-none placeholder-blue-600"
                placeholder="e.g. Grow to 50K followers, attract NIL deals, get recruited to D1..."
                value={planForm.goals} onChange={e => setPlanForm(f => ({ ...f, goals: e.target.value }))} />
            </div>
            <button onClick={() => planMutation.mutate({ sport: planForm.sport || "College Sport", season: planForm.season, goals: planForm.goals || "Grow audience and attract NIL deals", platforms: planForm.platforms })}
              disabled={planMutation.isPending}
              className="w-full bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-500 hover:to-pink-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
              {planMutation.isPending ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Creating Plan...</> : "📅 Generate 30-Day Plan"}
            </button>
            {planResult && (
              <div className="bg-[#0a1628] border border-blue-800 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-blue-400 font-bold text-sm">📅 Your 30-Day Content Plan</h4>
                  <button onClick={() => navigator.clipboard.writeText(planResult)} className="text-xs text-blue-400 hover:text-white border border-blue-700 px-2 py-1 rounded-lg">Copy</button>
                </div>
                <pre className="text-white text-sm whitespace-pre-wrap font-sans leading-relaxed">{planResult}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </PlatformLayout>
  );
}
