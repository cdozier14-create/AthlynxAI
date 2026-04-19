import PlatformLayout from "@/components/PlatformLayout";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

export default function DiamondGrind() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("programs");
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiPlan, setAiPlan] = useState("");
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDuration, setWorkoutDuration] = useState("");
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
      setWorkoutName("");
      setWorkoutDuration("");
      utils.training.getHistory.invalidate();
      utils.training.getStats.invalidate();
    },
  });

  const generatePlanMutation = trpc.ai.getRecruitingAdvice.useMutation({
    onSuccess: (data) => setAiPlan((data as any).advice || ""),
  });

  return (
    <PlatformLayout title="Diamond Grind">
      <div className="space-y-4 pb-20 lg:pb-4">
        <div className="bg-gradient-to-r from-[#1a3a8f] to-[#1a2a4a] border border-yellow-700 rounded-xl p-5">
          <div className="flex items-center gap-4">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/TptlbGHFTBamgRix.png" alt="Diamond Grind" className="w-14 h-14 rounded-2xl object-cover shadow-lg" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-white">DIAMOND GRIND</h2>
                <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">NEW</span>
              </div>
              <p className="text-blue-300 text-sm">Elite baseball training platform powered by AI analytics</p>
            </div>
          </div>
        </div>

        <div className="flex gap-1 bg-[#1a3a8f] border border-blue-900 rounded-xl p-1">
          {["programs", "tracker", "analytics", "leaderboard"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg capitalize transition-colors ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-blue-400 hover:text-white'}`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === "programs" && (
          <div className="space-y-3">
            {[
              { title: "Advanced Pitching Mechanics", level: "Elite", duration: "8 weeks", sessions: 24, icon: "⚾" },
              { title: "Hitting Power Development", level: "Intermediate", duration: "6 weeks", sessions: 18, icon: "🏏" },
              { title: "Fielding & Footwork", level: "All Levels", duration: "4 weeks", sessions: 12, icon: "🧤" },
              { title: "Mental Performance", level: "All Levels", duration: "Ongoing", sessions: null, icon: "🧠" },
            ].map((prog, i) => (
              <div key={i} className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{prog.icon}</span>
                  <div>
                    <div className="font-bold text-white">{prog.title}</div>
                    <div className="text-blue-400 text-xs">{prog.level} • {prog.duration} {prog.sessions && `• ${prog.sessions} sessions`}</div>
                  </div>
                </div>
                <button className="w-full bg-yellow-600 hover:bg-yellow-500 text-white text-sm font-bold py-2 rounded-lg transition-colors">
                  Start Program
                </button>
              </div>
            ))}
            <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-4">
              <h3 className="text-white font-bold mb-3">AI Video Analysis</h3>
              <p className="text-blue-300 text-sm mb-3">Upload your pitching or hitting video and get instant AI feedback on mechanics, release point, and improvement areas.</p>
              <button className="w-full border-2 border-dashed border-yellow-700 text-yellow-400 hover:text-white hover:border-yellow-500 text-sm font-bold py-4 rounded-xl transition-colors">
                📹 Upload Video for AI Analysis
              </button>
            </div>
          </div>
        )}

        {activeTab === "leaderboard" && (
          <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-4">
            <h3 className="text-white font-bold mb-3">Top Performers This Week</h3>
            {[
              { rank: 1, name: "Tyler Brooks", school: "LSU", score: 9840, sport: "SP" },
              { rank: 2, name: "Jake Martinez", school: "Vanderbilt", score: 9210, sport: "C" },
              { rank: 3, name: "Chris Davis", school: "Arkansas", score: 8950, sport: "1B" },
            ].map((player, i) => (
              <div key={i} className="flex items-center gap-3 py-3 border-b border-blue-900 last:border-0">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-black ${i === 0 ? 'bg-yellow-500 text-black' : i === 1 ? 'bg-gray-400 text-black' : 'bg-orange-700 text-white'}`}>{player.rank}</span>
                <div className="flex-1">
                  <div className="font-semibold text-white text-sm">{player.name}</div>
                  <div className="text-blue-400 text-xs">{player.sport} • {player.school}</div>
                </div>
                <div className="text-yellow-400 font-bold">{player.score.toLocaleString()} pts</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "tracker" && (
          <div className="space-y-4">
            {user && trainingStats && (
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Sessions", value: trainingStats.totalSessions, color: "text-yellow-400" },
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
            <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-5">
              <h3 className="text-white font-black text-lg mb-4">⚾ Log Baseball Workout</h3>
              {!user ? (
                <div className="text-center py-4">
                  <a href="/signin" className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold px-6 py-2.5 rounded-xl transition-colors">Sign In to Log Workouts</a>
                </div>
              ) : (
                <div className="space-y-3">
                  <input value={workoutName} onChange={e => setWorkoutName(e.target.value)}
                    placeholder="Workout type (e.g. Bullpen Session, Batting Practice, Fielding Drills)"
                    className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-yellow-500 placeholder-blue-500" />
                  <input value={workoutDuration} onChange={e => setWorkoutDuration(e.target.value)}
                    placeholder="Duration (minutes)" type="number"
                    className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-yellow-500 placeholder-blue-500" />
                  <button onClick={() => workoutName.trim() && logWorkoutMutation.mutate({ workout: workoutName, duration: workoutDuration ? parseInt(workoutDuration) : undefined })}
                    disabled={logWorkoutMutation.isPending || !workoutName.trim()}
                    className="bg-yellow-600 hover:bg-yellow-500 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl transition-colors">
                    {logWorkoutMutation.isPending ? "Logging..." : "Log Workout"}
                  </button>
                </div>
              )}
            </div>
            {user && (trainingHistory as any[]).length > 0 && (
              <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-4">
                <h4 className="text-white font-bold mb-3">Recent Sessions</h4>
                <div className="space-y-2">
                  {(trainingHistory as any[]).map((log: any) => (
                    <div key={log.id} className="flex items-center gap-3 py-2 border-b border-blue-900/50 last:border-0">
                      <span className="text-xl">⚾</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-sm font-semibold truncate">{log.workout}</div>
                        <div className="text-blue-400 text-xs">{log.duration ? log.duration + " min" : ""}</div>
                      </div>
                      <div className="text-blue-500 text-xs shrink-0">{new Date(log.logDate).toLocaleDateString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === "analytics" && (
          <div className="space-y-4">
            <div className="bg-[#1a3a8f] border border-yellow-700 rounded-xl p-5">
              <h3 className="text-white font-black text-lg mb-1">🤖 AI Performance Coach</h3>
              <p className="text-blue-400 text-sm mb-4">Get personalized training plans and performance analysis from AI</p>
              {!user ? (
                <div className="text-center py-4">
                  <a href="/signin" className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold px-6 py-2.5 rounded-xl transition-colors">Sign In to Use AI Coach</a>
                </div>
              ) : (
                <>
                  <textarea value={aiPrompt} onChange={e => setAiPrompt(e.target.value)}
                    placeholder="e.g. I'm a 16-year-old pitcher with 82mph fastball. How do I get to 90mph? Or: Create a 4-week hitting program for a power hitter."
                    rows={3} className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 placeholder-blue-500 resize-none mb-3" />
                  <button onClick={() => aiPrompt.trim() && generatePlanMutation.mutate({ sport: "Baseball", targetLevel: "D1", question: aiPrompt })}
                    disabled={generatePlanMutation.isPending || !aiPrompt.trim()}
                    className="bg-yellow-600 hover:bg-yellow-500 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl transition-colors">
                    {generatePlanMutation.isPending ? "Analyzing..." : "Get AI Training Plan"}
                  </button>
                  {aiPlan && (
                    <div className="mt-4 bg-[#0d1f3c] border border-yellow-700 rounded-xl p-4">
                      <div className="text-yellow-400 text-xs font-bold mb-2">AI PERFORMANCE COACH</div>
                      <p className="text-blue-100 text-sm leading-relaxed whitespace-pre-wrap">{aiPlan}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </PlatformLayout>
  );
}
