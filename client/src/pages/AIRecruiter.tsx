import PlatformLayout from "@/components/PlatformLayout";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

export default function AIRecruiter() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"optimize" | "email" | "advice">("optimize");

  // Profile optimizer state
  const [profileForm, setProfileForm] = useState({
    sport: "Football",
    position: "QB",
    school: "",
    gpa: "",
    height: "",
    weight: "",
    bio: "",
    achievements: "",
    currentDivision: "D1",
    targetDivision: "D1",
  });
  const [optimizeResult, setOptimizeResult] = useState("");

  // Coach email state
  const [emailForm, setEmailForm] = useState({
    targetSchool: "",
    coachName: "",
    achievements: "",
    sport: "",
    position: "",
  });
  const [emailResult, setEmailResult] = useState("");

  // Advice state
  const [adviceQ, setAdviceQ] = useState("");
  const [adviceResult, setAdviceResult] = useState("");

  const optimizeMutation = trpc.ai.optimizeProfile.useMutation({
    onSuccess: (d) => setOptimizeResult(String(d.optimized ?? "")),
  });

  const emailMutation = trpc.ai.generateCoachEmail.useMutation({
    onSuccess: (d) => setEmailResult(String(d.email ?? "")),
  });

  const adviceMutation = trpc.ai.getRecruitingAdvice.useMutation({
    onSuccess: (d) => setAdviceResult(String(d.advice ?? "")),
  });

  if (!user) {
    return (
      <PlatformLayout title="AI Recruiter">
        <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-8 text-center">
          <div className="text-4xl mb-4">🎓</div>
          <h2 className="text-xl font-black text-white mb-2">Sign In to Use AI Recruiter</h2>
          <p className="text-blue-300 text-sm mb-4">Optimize your recruiting profile and get discovered by the right coaches.</p>
          <a href="/signin" className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-2.5 rounded-lg inline-block transition-colors">
            Sign In
          </a>
        </div>
      </PlatformLayout>
    );
  }

  return (
    <PlatformLayout title="AI Recruiter">
      <div className="space-y-4 pb-20 lg:pb-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1a3a8f] to-[#1a2a4a] border border-green-700 rounded-xl p-5">
          <div className="flex items-center gap-4">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/jmJopPCZNYcSzojv.png" alt="AI Recruiter" className="w-14 h-14 rounded-2xl object-cover shadow-lg" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-white">AI RECRUITER</h2>
                <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full font-bold">LIVE AI</span>
              </div>
              <p className="text-blue-300 text-sm">Optimize your recruiting profile and get discovered by the right coaches</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#1a3a8f] border border-blue-900 rounded-xl p-1">
          {[
            { key: "optimize", label: "Profile Optimizer" },
            { key: "email", label: "Coach Email AI" },
            { key: "advice", label: "Recruiting Advice" },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === tab.key ? 'bg-green-600 text-white' : 'text-blue-400 hover:text-white'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Optimizer */}
        {activeTab === "optimize" && (
          <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-5">
            <h3 className="text-white font-bold mb-4">AI Profile Optimizer</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Sport *", key: "sport", placeholder: "Football" },
                  { label: "Position *", key: "position", placeholder: "QB" },
                  { label: "School", key: "school", placeholder: "University of Alabama" },
                  { label: "GPA", key: "gpa", placeholder: "3.6" },
                  { label: "Height", key: "height", placeholder: "6'3\"" },
                  { label: "Weight", key: "weight", placeholder: "215 lbs" },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-blue-300 text-xs font-semibold block mb-1">{f.label}</label>
                    <input
                      value={(profileForm as any)[f.key]}
                      onChange={e => setProfileForm(p => ({ ...p, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-green-500 placeholder-blue-600"
                    />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-blue-300 text-xs font-semibold block mb-1">Current Division</label>
                  <select
                    value={profileForm.currentDivision}
                    onChange={e => setProfileForm(p => ({ ...p, currentDivision: e.target.value }))}
                    className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-green-500"
                  >
                    {["D1", "D2", "D3", "NAIA", "JUCO", "High School"].map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-blue-300 text-xs font-semibold block mb-1">Target Division</label>
                  <select
                    value={profileForm.targetDivision}
                    onChange={e => setProfileForm(p => ({ ...p, targetDivision: e.target.value }))}
                    className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-green-500"
                  >
                    {["D1", "D2", "D3", "NAIA"].map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-blue-300 text-xs font-semibold block mb-1">Key Achievements</label>
                <textarea
                  value={profileForm.achievements}
                  onChange={e => setProfileForm(p => ({ ...p, achievements: e.target.value }))}
                  placeholder="4,200 passing yards, 38 TDs, All-Conference 2024..."
                  rows={2}
                  className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-green-500 placeholder-blue-600 resize-none"
                />
              </div>
              <div>
                <label className="text-blue-300 text-xs font-semibold block mb-1">Current Bio</label>
                <textarea
                  value={profileForm.bio}
                  onChange={e => setProfileForm(p => ({ ...p, bio: e.target.value }))}
                  placeholder="Tell coaches who you are..."
                  rows={2}
                  className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-green-500 placeholder-blue-600 resize-none"
                />
              </div>
              <button
                onClick={() => optimizeMutation.mutate({
                  sport: profileForm.sport,
                  position: profileForm.position,
                  school: profileForm.school || undefined,
                  gpa: profileForm.gpa ? Number(profileForm.gpa) : undefined,
                  height: profileForm.height || undefined,
                  weight: profileForm.weight || undefined,
                  bio: profileForm.bio || undefined,
                  achievements: profileForm.achievements || undefined,

                })}
                disabled={optimizeMutation.isPending || !profileForm.sport || !profileForm.position}
                className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-3 rounded-xl transition-colors disabled:opacity-50"
              >
                {optimizeMutation.isPending ? "Analyzing Profile..." : "ANALYZE MY PROFILE"}
              </button>
            </div>

            {optimizeMutation.isError && (
              <div className="mt-3 bg-red-900/30 border border-red-700 rounded-xl p-3 text-red-300 text-sm">
                Error analyzing profile. Please try again.
              </div>
            )}

            {optimizeResult && (
              <div className="mt-4 bg-[#1530a0] border border-green-700 rounded-xl p-4">
                <div className="text-green-400 text-xs font-bold mb-2 flex items-center gap-2">
                  <span>🤖</span> AI PROFILE ANALYSIS
                </div>
                <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">{optimizeResult}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => navigator.clipboard.writeText(optimizeResult)}
                    className="flex-1 border border-green-700 text-green-300 text-sm font-bold py-2 rounded-lg hover:bg-green-900 transition-colors"
                  >
                    Copy Analysis
                  </button>
                  <button
                    onClick={() => setOptimizeResult("")}
                    className="flex-1 border border-blue-700 text-blue-300 text-sm font-bold py-2 rounded-lg hover:bg-blue-900 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Coach Email AI */}
        {activeTab === "email" && (
          <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-5">
            <h3 className="text-white font-bold mb-4">Coach Outreach Email Generator</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-blue-300 text-xs font-semibold block mb-1">Target School *</label>
                  <input
                    value={emailForm.targetSchool}
                    onChange={e => setEmailForm(p => ({ ...p, targetSchool: e.target.value }))}
                    placeholder="University of Florida"
                    className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-green-500 placeholder-blue-600"
                  />
                </div>
                <div>
                  <label className="text-blue-300 text-xs font-semibold block mb-1">Coach Name</label>
                  <input
                    value={emailForm.coachName}
                    onChange={e => setEmailForm(p => ({ ...p, coachName: e.target.value }))}
                    placeholder="Coach Smith"
                    className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-green-500 placeholder-blue-600"
                  />
                </div>
                <div>
                  <label className="text-blue-300 text-xs font-semibold block mb-1">Sport</label>
                  <input
                    value={emailForm.sport}
                    onChange={e => setEmailForm(p => ({ ...p, sport: e.target.value }))}
                    placeholder="Football"
                    className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-green-500 placeholder-blue-600"
                  />
                </div>
                <div>
                  <label className="text-blue-300 text-xs font-semibold block mb-1">Position</label>
                  <input
                    value={emailForm.position}
                    onChange={e => setEmailForm(p => ({ ...p, position: e.target.value }))}
                    placeholder="QB"
                    className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-green-500 placeholder-blue-600"
                  />
                </div>
              </div>
              <div>
                <label className="text-blue-300 text-xs font-semibold block mb-1">Key Achievements</label>
                <textarea
                  value={emailForm.achievements}
                  onChange={e => setEmailForm(p => ({ ...p, achievements: e.target.value }))}
                  placeholder="4,200 passing yards, 38 TDs, All-Conference..."
                  rows={2}
                  className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-green-500 placeholder-blue-600 resize-none"
                />
              </div>
              <button
                onClick={() => emailMutation.mutate({
                  targetSchool: emailForm.targetSchool,
                  coachName: emailForm.coachName || undefined,
                  athleteName: user?.name || "Athlete",
                  sport: emailForm.sport || "Athlete",
                  position: emailForm.position || undefined,
                  achievements: emailForm.achievements || undefined,
                })}
                disabled={emailMutation.isPending || !emailForm.targetSchool}
                className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-3 rounded-xl transition-colors disabled:opacity-50"
              >
                {emailMutation.isPending ? "Generating Email..." : "GENERATE COACH EMAIL"}
              </button>
            </div>

            {emailMutation.isError && (
              <div className="mt-3 bg-red-900/30 border border-red-700 rounded-xl p-3 text-red-300 text-sm">
                Error generating email. Please try again.
              </div>
            )}

            {emailResult && (
              <div className="mt-4 bg-[#1530a0] border border-green-700 rounded-xl p-4">
                <div className="text-green-400 text-xs font-bold mb-2 flex items-center gap-2">
                  <span>🤖</span> AI GENERATED EMAIL
                </div>
                <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">{emailResult}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => navigator.clipboard.writeText(emailResult)}
                    className="flex-1 border border-green-700 text-green-300 text-sm font-bold py-2 rounded-lg hover:bg-green-900 transition-colors"
                  >
                    Copy Email
                  </button>
                  <button
                    onClick={() => setEmailResult("")}
                    className="flex-1 border border-blue-700 text-blue-300 text-sm font-bold py-2 rounded-lg hover:bg-blue-900 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Recruiting Advice */}
        {activeTab === "advice" && (
          <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-5">
            <h3 className="text-white font-bold mb-4">AI Recruiting Advisor</h3>
            <p className="text-blue-400 text-sm mb-4">Ask any recruiting question and get personalized AI advice.</p>
            <div className="space-y-3">
              <div>
                <label className="text-blue-300 text-xs font-semibold block mb-1">Your Question *</label>
                <textarea
                  value={adviceQ}
                  onChange={e => setAdviceQ(e.target.value)}
                  placeholder="e.g. How do I get noticed by D1 coaches? What should I include in my highlight reel? How do I handle multiple scholarship offers?"
                  rows={4}
                  className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-green-500 placeholder-blue-600 resize-none"
                />
              </div>
              <button
                onClick={() => adviceMutation.mutate({ question: adviceQ, sport: "College Athlete", targetLevel: "D1" })}
                disabled={adviceMutation.isPending || !adviceQ.trim()}
                className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-3 rounded-xl transition-colors disabled:opacity-50"
              >
                {adviceMutation.isPending ? "Getting AI Advice..." : "GET AI RECRUITING ADVICE"}
              </button>
            </div>

            {adviceMutation.isError && (
              <div className="mt-3 bg-red-900/30 border border-red-700 rounded-xl p-3 text-red-300 text-sm">
                Error getting advice. Please try again.
              </div>
            )}

            {adviceResult && (
              <div className="mt-4 bg-[#1530a0] border border-green-700 rounded-xl p-4">
                <div className="text-green-400 text-xs font-bold mb-2 flex items-center gap-2">
                  <span>🤖</span> AI RECRUITING ADVICE
                </div>
                <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">{adviceResult}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => navigator.clipboard.writeText(adviceResult)}
                    className="flex-1 border border-green-700 text-green-300 text-sm font-bold py-2 rounded-lg hover:bg-green-900 transition-colors"
                  >
                    Copy Advice
                  </button>
                  <button
                    onClick={() => setAdviceResult("")}
                    className="flex-1 border border-blue-700 text-blue-300 text-sm font-bold py-2 rounded-lg hover:bg-blue-900 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}

            {/* Quick question prompts */}
            {!adviceResult && (
              <div className="mt-4">
                <div className="text-blue-400 text-xs font-bold mb-2">QUICK QUESTIONS</div>
                <div className="space-y-2">
                  {[
                    "How do I get noticed by D1 coaches?",
                    "What should I include in my recruiting highlight reel?",
                    "How do I handle multiple scholarship offers?",
                    "What GPA do I need to get recruited to a D1 school?",
                    "How early should I start the recruiting process?",
                  ].map((q, i) => (
                    <button
                      key={i}
                      onClick={() => setAdviceQ(q)}
                      className="w-full text-left text-xs text-blue-300 hover:text-white bg-[#0d1f3c] hover:bg-[#1530a0] border border-blue-800 px-3 py-2 rounded-lg transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </PlatformLayout>
  );
}
