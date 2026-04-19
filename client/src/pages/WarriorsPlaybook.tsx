import PlatformLayout from "@/components/PlatformLayout";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

export default function WarriorsPlaybook() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("playbook");
  const [strategyInput, setStrategyInput] = useState("");
  const [strategyResult, setStrategyResult] = useState("");
  const [workoutInput, setWorkoutInput] = useState("");
  const [workoutDuration, setWorkoutDuration] = useState("");
  const [workoutNotes, setWorkoutNotes] = useState("");
  const utils = trpc.useUtils();

  const { data: trainingHistory = [] } = trpc.training.getHistory.useQuery(
    { limit: 10 },
    { enabled: !!user }
  );
  const { data: trainingStats } = trpc.training.getStats.useQuery(
    undefined,
    { enabled: !!user }
  );

  const logWorkoutMutation = trpc.training.logWorkout.useMutation({
    onSuccess: () => {
      setWorkoutInput("");
      setWorkoutDuration("");
      setWorkoutNotes("");
      utils.training.getHistory.invalidate();
      utils.training.getStats.invalidate();
    },
  });

  const getAdviceMutation = trpc.ai.getRecruitingAdvice.useMutation({
    onSuccess: (data) => setStrategyResult((data as any).advice || ""),
  });

  return (
    <PlatformLayout title="Warriors Playbook">
      <div className="space-y-4 pb-20 lg:pb-4">
        <div className="bg-gradient-to-r from-[#1a3a8f] to-[#1a2a4a] border border-orange-700 rounded-xl p-5">
          <div className="flex items-center gap-4">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/HcanzWKcSkXMpmUO.png" alt="Warriors Playbook" className="w-14 h-14 rounded-2xl object-cover shadow-lg" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-white">WARRIORS PLAYBOOK</h2>
                <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full font-bold">HOT</span>
              </div>
              <p className="text-blue-300 text-sm">Plays, film room, and team strategy — all in one place</p>
            </div>
          </div>
        </div>
        <div className="flex gap-1 bg-[#1a3a8f] border border-blue-900 rounded-xl p-1">
          {["playbook", "film", "strategy", "team"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg capitalize transition-colors ${activeTab === tab ? 'bg-orange-600 text-white' : 'text-blue-400 hover:text-white'}`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        {activeTab === "playbook" && (
          <div className="space-y-3">
            {[
              { name: "4 Verts", type: "Pass", formation: "Shotgun", success: "72%", icon: "🏈" },
              { name: "Inside Zone", type: "Run", formation: "I-Form", success: "68%", icon: "🏃" },
              { name: "Cover 2 Man", type: "Defense", formation: "4-3", success: "81%", icon: "🛡️" },
              { name: "RPO Bubble", type: "Pass/Run", formation: "Spread", success: "76%", icon: "⚡" },
            ].map((play, i) => (
              <div key={i} className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-4 flex items-center gap-3">
                <span className="text-2xl">{play.icon}</span>
                <div className="flex-1">
                  <div className="font-bold text-white">{play.name}</div>
                  <div className="text-blue-400 text-xs">{play.type} • {play.formation}</div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold">{play.success}</div>
                  <div className="text-blue-500 text-xs">success rate</div>
                </div>
              </div>
            ))}
            <button className="w-full border-2 border-dashed border-orange-700 text-orange-400 hover:text-white hover:border-orange-500 text-sm font-bold py-4 rounded-xl transition-colors">
              + Add New Play
            </button>
          </div>
        )}
        {activeTab === "film" && (
          <div className="space-y-3">
            <h3 className="text-white font-bold px-1">Film Room</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "Week 8 vs. Rivals", type: "Game Film", video: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/KXxibPEaqdpzwIEt.mp4" },
                { title: "Practice — Red Zone", type: "Practice Film", video: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/TJIQEsjoLVlddltc.mp4" },
              ].map((film, i) => (
                <div key={i} className="bg-[#1a3a8f] border border-blue-900 rounded-xl overflow-hidden">
                  <video className="w-full aspect-video object-cover" muted loop playsInline controls>
                    <source src={film.video} />
                  </video>
                  <div className="p-3">
                    <div className="font-semibold text-white text-sm">{film.title}</div>
                    <div className="text-blue-400 text-xs">{film.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "strategy" && (
          <div className="space-y-4">
            <div className="bg-[#1a3a8f] border border-orange-700 rounded-xl p-5">
              <h3 className="text-white font-black text-lg mb-1">🤖 AI Strategy Advisor</h3>
              <p className="text-blue-400 text-sm mb-4">Ask the AI for game plans, play suggestions, or recruiting strategy</p>
              {!user ? (
                <div className="text-center py-4">
                  <a href="/signin" className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-6 py-2.5 rounded-xl transition-colors">Sign In to Use AI Advisor</a>
                </div>
              ) : (
                <>
                  <textarea
                    value={strategyInput}
                    onChange={e => setStrategyInput(e.target.value)}
                    placeholder="e.g. What's the best strategy against a Cover 2 defense? Or: How do I improve my 40-yard dash time?"
                    rows={3}
                    className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 placeholder-blue-500 resize-none mb-3"
                  />
                  <button
                    onClick={() => strategyInput.trim() && getAdviceMutation.mutate({ sport: "Football", targetLevel: "D1", question: strategyInput })}
                    disabled={getAdviceMutation.isPending || !strategyInput.trim()}
                    className="bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl transition-colors"
                  >
                    {getAdviceMutation.isPending ? "Analyzing..." : "Get AI Strategy"}
                  </button>
                  {strategyResult && (
                    <div className="mt-4 bg-[#0d1f3c] border border-orange-700 rounded-xl p-4">
                      <div className="text-orange-400 text-xs font-bold mb-2">AI STRATEGY ADVISOR</div>
                      <p className="text-blue-100 text-sm leading-relaxed whitespace-pre-wrap">{strategyResult}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
        {activeTab === "team" && (
          <div className="space-y-4">
            {/* Training Stats */}
            {user && trainingStats && (
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Sessions", value: trainingStats.totalSessions, color: "text-orange-400" },
                  { label: "Minutes", value: trainingStats.totalMinutes, color: "text-green-400" },
                  { label: "Avg Perf", value: trainingStats.avgPerformance ? trainingStats.avgPerformance + "/10" : "N/A", color: "text-blue-400" },
                ].map((stat, i) => (
                  <div key={i} className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-3 text-center">
                    <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
                    <div className="text-blue-400 text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
            {/* Log Workout */}
            <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-5">
              <h3 className="text-white font-black text-lg mb-4">📋 Log Workout</h3>
              {!user ? (
                <div className="text-center py-4">
                  <a href="/signin" className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-6 py-2.5 rounded-xl transition-colors">Sign In to Log Workouts</a>
                </div>
              ) : (
                <div className="space-y-3">
                  <input
                    value={workoutInput}
                    onChange={e => setWorkoutInput(e.target.value)}
                    placeholder="Workout name (e.g. Speed & Agility, Weight Room, Film Study)"
                    className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 placeholder-blue-500"
                  />
                  <div className="flex gap-3">
                    <input
                      value={workoutDuration}
                      onChange={e => setWorkoutDuration(e.target.value)}
                      placeholder="Duration (mins)"
                      type="number"
                      className="flex-1 bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 placeholder-blue-500"
                    />
                    <input
                      value={workoutNotes}
                      onChange={e => setWorkoutNotes(e.target.value)}
                      placeholder="Notes (optional)"
                      className="flex-1 bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 placeholder-blue-500"
                    />
                  </div>
                  <button
                    onClick={() => workoutInput.trim() && logWorkoutMutation.mutate({ workout: workoutInput, duration: workoutDuration ? parseInt(workoutDuration) : undefined, notes: workoutNotes || undefined })}
                    disabled={logWorkoutMutation.isPending || !workoutInput.trim()}
                    className="bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl transition-colors"
                  >
                    {logWorkoutMutation.isPending ? "Logging..." : "Log Workout"}
                  </button>
                </div>
              )}
            </div>
            {/* Training History */}
            {user && trainingHistory.length > 0 && (
              <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-4">
                <h4 className="text-white font-bold mb-3">Recent Workouts</h4>
                <div className="space-y-2">
                  {(trainingHistory as any[]).map((log: any) => (
                    <div key={log.id} className="flex items-center gap-3 py-2 border-b border-blue-900/50 last:border-0">
                      <div className="w-8 h-8 rounded-lg bg-orange-600/20 flex items-center justify-center text-orange-400 text-lg">🏋️</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-sm font-semibold truncate">{log.workout}</div>
                        <div className="text-blue-400 text-xs">{log.duration ? log.duration + " min" : ""}{log.notes ? " • " + log.notes : ""}</div>
                      </div>
                      <div className="text-blue-500 text-xs shrink-0">{new Date(log.logDate).toLocaleDateString()}</div>
                    </div>
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
