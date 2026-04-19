import PlatformLayout from "@/components/PlatformLayout";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

const SCHOOLS = [
  { name: "University of Florida", sport: "Football", openings: "2 WR, 1 QB", scholarship: true, nilProgram: "Strong", conference: "SEC" },
  { name: "Ohio State", sport: "Basketball", openings: "1 PG, 1 SG", scholarship: true, nilProgram: "Elite", conference: "Big Ten" },
  { name: "LSU", sport: "Baseball", openings: "2 SP, 1 C", scholarship: true, nilProgram: "Strong", conference: "SEC" },
  { name: "USC", sport: "Football", openings: "3 DB, 1 LB", scholarship: true, nilProgram: "Elite", conference: "Big Ten" },
];

export default function TransferPortal() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("athletes");
  const [sport, setSport] = useState("All");
  const [aiQ, setAiQ] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [showEnterPortal, setShowEnterPortal] = useState(false);
  const [portalForm, setPortalForm] = useState({ sport: "Football", position: "", currentSchool: "", gpa: "", stats: "" });
  const utils = trpc.useUtils();
  const { data: portalAthletes = [] } = trpc.nil.getTransferEntries.useQuery({ limit: 20 });
  const enterPortalMutation = trpc.nil.enterTransferPortal.useMutation({ onSuccess: () => { utils.nil.getTransferEntries.invalidate(); setShowEnterPortal(false); } });
  const aiAdvisorMutation = trpc.ai.getRecruitingAdvice.useMutation({ onSuccess: (d) => setAiResult(String(d.advice ?? "")) });

  return (
    <PlatformLayout title="Transfer Portal">
      <div className="space-y-4 pb-20 lg:pb-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1a3a8f] to-[#1a2a4a] border border-blue-700 rounded-xl p-5">
          <div className="flex items-center gap-4">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/zXVECIAqcyZDAOuV.png" alt="Transfer Portal" className="w-14 h-14 rounded-2xl object-cover shadow-lg" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-white">TRANSFER PORTAL</h2>
                <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full font-bold">LIVE</span>
              </div>
              <p className="text-blue-300 text-sm">Find your next school. Maximize your NIL value.</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { label: "Athletes Available", value: portalAthletes.length.toString() },
              { label: "Schools Recruiting", value: SCHOOLS.length.toString() },
              { label: "Deals Closed", value: "0" },
            ].map((s, i) => (
              <div key={i} className="bg-[#1530a0] rounded-xl p-3 text-center">
                <div className="text-2xl font-black text-blue-400">{s.value}</div>
                <div className="text-blue-500 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#1a3a8f] border border-blue-900 rounded-xl p-1">
          {["athletes", "schools", "eligibility"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg capitalize transition-colors ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-blue-400 hover:text-white'}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Athletes tab */}
        {activeTab === "athletes" && (
          <div className="space-y-3">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {["All", "Football", "Basketball", "Baseball"].map(s => (
                <button
                  key={s}
                  onClick={() => setSport(s)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${sport === s ? 'bg-blue-600 text-white' : 'bg-[#1a3a8f] border border-blue-800 text-blue-400 hover:text-white'}`}
                >
                  {s}
                </button>
              ))}
            </div>
            {user && <button onClick={() => setShowEnterPortal(true)} className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white font-bold py-3 rounded-xl transition-all mb-2">+ Enter Transfer Portal</button>}
            {showEnterPortal && (
              <div className="bg-[#0d1f3c] border border-green-700 rounded-xl p-5 space-y-3 mb-2">
                <h4 className="text-white font-bold">Enter Transfer Portal</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-blue-300 text-xs font-semibold block mb-1">Sport</label>
                    <select className="w-full bg-[#1a2a4a] border border-blue-800 text-white text-sm rounded-lg px-3 py-2" value={portalForm.sport} onChange={e => setPortalForm(f => ({...f, sport: e.target.value}))}>
                      {["Football","Basketball","Baseball","Soccer","Track","Swimming","Tennis","Volleyball","Other"].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-blue-300 text-xs font-semibold block mb-1">Position</label>
                    <input className="w-full bg-[#1a2a4a] border border-blue-800 text-white text-sm rounded-lg px-3 py-2 placeholder-blue-600" placeholder="e.g. QB, PG" value={portalForm.position} onChange={e => setPortalForm(f => ({...f, position: e.target.value}))} />
                  </div>
                  <div>
                    <label className="text-blue-300 text-xs font-semibold block mb-1">Current School</label>
                    <input className="w-full bg-[#1a2a4a] border border-blue-800 text-white text-sm rounded-lg px-3 py-2 placeholder-blue-600" placeholder="e.g. Alabama" value={portalForm.currentSchool} onChange={e => setPortalForm(f => ({...f, currentSchool: e.target.value}))} />
                  </div>
                  <div>
                    <label className="text-blue-300 text-xs font-semibold block mb-1">GPA</label>
                    <input className="w-full bg-[#1a2a4a] border border-blue-800 text-white text-sm rounded-lg px-3 py-2 placeholder-blue-600" placeholder="e.g. 3.5" value={portalForm.gpa} onChange={e => setPortalForm(f => ({...f, gpa: e.target.value}))} />
                  </div>
                </div>
                <div>
                  <label className="text-blue-300 text-xs font-semibold block mb-1">Key Stats</label>
                  <input className="w-full bg-[#1a2a4a] border border-blue-800 text-white text-sm rounded-lg px-3 py-2 placeholder-blue-600" placeholder="e.g. 87 rec, 1,240 yds, 12 TD" value={portalForm.stats} onChange={e => setPortalForm(f => ({...f, stats: e.target.value}))} />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => enterPortalMutation.mutate({ fromSchool: portalForm.currentSchool || "Unknown" })} disabled={enterPortalMutation.isPending} className="flex-1 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl">{enterPortalMutation.isPending ? "Submitting..." : "Submit to Portal"}</button>
                  <button onClick={() => setShowEnterPortal(false)} className="flex-1 border border-blue-700 text-blue-300 font-bold py-2.5 rounded-xl hover:bg-blue-900">Cancel</button>
                </div>
              </div>
            )}
            {portalAthletes.length === 0 && (
              <div className="text-center py-8 text-blue-400">
                <div className="text-4xl mb-2">🏆</div>
                <div className="font-bold text-white mb-1">No athletes in portal yet</div>
                <div className="text-sm">Be the first to enter!</div>
              </div>
            )}
            {portalAthletes.map((athlete: any, i: number) => (
              <div key={i} className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-sm font-black shrink-0 text-white">
                    {(athlete.userName || athlete.userId?.toString() || "AT").slice(0,2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white">{athlete.userName || "Athlete"}</span>
                      {athlete.position && <span className="text-xs bg-blue-900 text-blue-300 px-2 py-0.5 rounded-full">{athlete.position}</span>}
                      <span className="text-xs bg-green-900 text-green-400 px-2 py-0.5 rounded-full">Available</span>
                    </div>
                    <div className="text-blue-400 text-xs">{athlete.sport}{athlete.currentSchool ? ` • From: ${athlete.currentSchool}` : ""}{athlete.gpa ? ` • GPA: ${athlete.gpa}` : ""}</div>
                    {athlete.stats && <div className="text-blue-300 text-xs mt-1">{athlete.stats}</div>}
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2 rounded-lg transition-colors">View Profile</button>
                  <button className="flex-1 border border-blue-700 text-blue-300 text-xs font-bold py-2 rounded-lg hover:bg-blue-900 transition-colors">Contact</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Schools tab */}
        {activeTab === "schools" && (
          <div className="space-y-3">
            {SCHOOLS.map((school, i) => (
              <div key={i} className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-bold text-white">{school.name}</div>
                    <div className="text-blue-400 text-xs">{school.conference} • {school.sport}</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${school.nilProgram === 'Elite' ? 'bg-purple-900 text-purple-300' : 'bg-blue-900 text-blue-300'}`}>
                    {school.nilProgram} NIL
                  </span>
                </div>
                <div className="text-xs text-green-400 mb-3">Open: {school.openings}</div>
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-2 rounded-lg transition-colors">
                  Apply to Transfer
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Eligibility tab */}
        {activeTab === "eligibility" && (
          <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-5">
            <h3 className="text-white font-bold mb-4">Transfer Eligibility Checker</h3>
            <div className="space-y-3">
              {[
                { q: "Current Division Level", opts: ["D1", "D2", "D3", "NAIA", "JUCO"] },
                { q: "Years Played", opts: ["1", "2", "3", "4"] },
                { q: "Previous Transfers", opts: ["None", "1 Transfer", "2+ Transfers"] },
                { q: "Academic Standing", opts: ["Good Standing", "Academic Probation"] },
              ].map((item, i) => (
                <div key={i}>
                  <label className="text-blue-300 text-sm font-semibold block mb-1">{item.q}</label>
                  <select className="w-full bg-[#1a3a8f] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none">
                    {item.opts.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-3 rounded-xl transition-colors">
                CHECK MY ELIGIBILITY
              </button>
              <div className="bg-green-900/30 border border-green-700 rounded-xl p-4 text-center">
                <div className="text-green-400 font-black text-lg">ELIGIBLE TO TRANSFER</div>
                <div className="text-green-300 text-sm mt-1">You qualify for immediate eligibility at your next school</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PlatformLayout>
  );
}
