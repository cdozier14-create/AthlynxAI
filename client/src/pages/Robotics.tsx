import PlatformLayout from "@/components/PlatformLayout";
import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

const CDN = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/";

const SCENARIOS = [
  { id: "training", label: "Training", icon: "🏋️" },
  { id: "game_day", label: "Game Day", icon: "🏆" },
  { id: "recovery", label: "Recovery", icon: "💪" },
  { id: "recruiting", label: "Recruiting", icon: "🎓" },
  { id: "nil_deals", label: "NIL Deals", icon: "💰" },
  { id: "in_the_stands", label: "In the Stands", icon: "🏟️" },
  { id: "locker_room", label: "Locker Room", icon: "🔒" },
  { id: "film_review", label: "Film Review", icon: "🎬" },
  { id: "nutrition", label: "Nutrition", icon: "🥗" },
  { id: "mental_prep", label: "Mental Prep", icon: "🧠" },
  { id: "social_media", label: "Social Media", icon: "📱" },
  { id: "academics", label: "Academics", icon: "📚" },
];

const USE_CASES = [
  { icon: "🏟️", title: "In the Stands", subtitle: "Fan & Scout Companion", desc: "Your robot companion navigates the stadium, delivers merchandise, assists scouts with real-time player tracking, and keeps fans engaged with live stats and highlights.", sport: "All Sports", color: "from-blue-900 to-blue-800" },
  { icon: "🏋️", title: "In Training", subtitle: "Performance Coach", desc: "Acts as a ball machine, resistance partner, rep counter, and form coach. Analyzes your mechanics in real time and gives instant feedback to maximize every rep.", sport: "All Sports", color: "from-green-900 to-green-800" },
  { icon: "🏈", title: "On the Field", subtitle: "Real-Time Performance Partner", desc: "Tracks your movement patterns, speed, and positioning during practice. Feeds data directly into your ATHLYNX profile for coaches and recruiters to see.", sport: "Football, Soccer, Lacrosse", color: "from-orange-900 to-orange-800" },
  { icon: "⚾", title: "Baseball Diamond", subtitle: "Diamond Grind Robot", desc: "Pitching machine, fielding drill partner, and swing analyzer. Connects directly with Diamond Grind to log every session and track your development over time.", sport: "Baseball, Softball", color: "from-red-900 to-red-800" },
  { icon: "🏀", title: "On the Court", subtitle: "Shooting & Defense Trainer", desc: "Rebounds your shots, tracks your shooting percentage from every zone, runs defensive drills, and syncs your stats to your ATHLYNX Warriors Playbook.", sport: "Basketball", color: "from-purple-900 to-purple-800" },
  { icon: "💪", title: "In Recovery", subtitle: "Wellness & Rehab Companion", desc: "Monitors vitals, guides stretching routines, tracks sleep and hydration, and checks in on mental wellness. Your 24/7 recovery partner that never sleeps.", sport: "All Sports", color: "from-teal-900 to-teal-800" },
  { icon: "🎓", title: "In Recruiting", subtitle: "Showcase & Highlight Tool", desc: "Records your best moments from every angle, auto-edits highlight reels, and sends them directly to coaches through your ATHLYNX AI Recruiter profile.", sport: "All Sports", color: "from-yellow-900 to-yellow-800" },
  { icon: "🏆", title: "In the Locker Room", subtitle: "Team Morale & Strategy", desc: "Reviews game film with the team, displays plays on screen, tracks team stats, and keeps morale high with motivational content tailored to your team.", sport: "All Sports", color: "from-indigo-900 to-indigo-800" },
  { icon: "📊", title: "NIL Deal Assistant", subtitle: "Brand Partnership Robot", desc: "Represents you at brand events, captures content for social media, and helps execute NIL deal obligations — from appearances to product demos.", sport: "All Sports", color: "from-pink-900 to-pink-800" },
  { icon: "🌙", title: "After Hours", subtitle: "Study & Mental Prep", desc: "Helps athletes stay on top of academics, reviews game film before bed, runs mental visualization exercises, and keeps your schedule organized.", sport: "All Sports", color: "from-slate-900 to-slate-800" },
  { icon: "🏊", title: "In the Pool", subtitle: "Aquatic Performance Tracker", desc: "Waterproof poolside companion that tracks lap times, stroke efficiency, and turn technique. Syncs directly with your ATHLYNX training log.", sport: "Swimming, Water Polo", color: "from-cyan-900 to-cyan-800" },
  { icon: "🎯", title: "Pre-Game Ritual", subtitle: "Mental & Physical Warmup", desc: "Leads your warmup routine, plays your pre-game playlist, runs through your mental checklist, and gets you locked in before every competition.", sport: "All Sports", color: "from-rose-900 to-rose-800" },
];

const QUICK_PROMPTS = [
  "Give me a 30-minute pre-game warmup routine",
  "How do I improve my vertical jump in 4 weeks?",
  "What should I eat the night before a big game?",
  "Help me write a message to a college coach",
  "What NIL deals should I look for as a D1 athlete?",
  "How do I stay mentally focused during a slump?",
  "Create a 5-day training plan for my position",
  "What film should I review to improve my game?",
];

type ChatMessage = { role: "user" | "assistant"; content: string };

function RobotChat({ user }: { user: any }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hey! I'm LYNX — your ATHLYNX AI Robot Companion. I'm here to help you with training, recruiting, NIL deals, game strategy, recovery, and everything else in your athletic journey. What can I help you with today? 🤖",
    },
  ]);
  const [input, setInput] = useState("");
  const [scenario, setScenario] = useState("training");
  const [sport, setSport] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const chatMutation = trpc.ai.robotChat.useMutation({
    onSuccess: (data) => {
      setMessages(prev => [...prev, { role: "assistant", content: String(data.reply || "") }]);
    },
    onError: () => {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I ran into an issue. Please try again." }]);
    },
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim() || chatMutation.isPending) return;
    const userMsg: ChatMessage = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    chatMutation.mutate({
      message: text,
      scenario: SCENARIOS.find(s => s.id === scenario)?.label,
      sport: sport || undefined,
      history: messages.slice(-10),
    });
  };

  if (!user) {
    return (
      <div className="bg-[#1a3a8f] border border-blue-900 rounded-2xl p-6 text-center">
        <div className="text-4xl mb-3">🤖</div>
        <h3 className="text-white font-black text-lg mb-2">Sign In to Chat with LYNX</h3>
        <p className="text-blue-300 text-sm mb-4">Your AI robot companion is waiting. Sign in to start your conversation.</p>
        <a href="/signin" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-lg transition-colors">
          Sign In
        </a>
      </div>
    );
  }

  return (
    <div className="bg-[#1a3a8f] border border-blue-900 rounded-2xl overflow-hidden">
      {/* Chat header */}
      <div className="bg-gradient-to-r from-[#0d1b3e] to-[#1530a0] border-b border-blue-900 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl shrink-0">
            🤖
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-black text-white">LYNX</span>
              <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full font-bold">LIVE AI</span>
            </div>
            <div className="text-blue-400 text-xs">Your AI Robot Companion — Always On</div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs">Online</span>
          </div>
        </div>

        {/* Scenario & Sport selectors */}
        <div className="flex gap-2 mt-3">
          <div className="flex-1">
            <select
              value={scenario}
              onChange={e => setScenario(e.target.value)}
              className="w-full bg-[#0d1b3e] border border-blue-800 text-white text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-500"
            >
              {SCENARIOS.map(s => (
                <option key={s.id} value={s.id}>{s.icon} {s.label}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <input
              value={sport}
              onChange={e => setSport(e.target.value)}
              placeholder="Your sport..."
              className="w-full bg-[#0d1b3e] border border-blue-800 text-white text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-500 placeholder-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-80 overflow-y-auto p-4 space-y-3 bg-[#0d1b3e]">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-sm shrink-0 mt-0.5">🤖</div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
              msg.role === "user"
                ? "bg-blue-600 text-white rounded-br-sm"
                : "bg-[#1530a0] text-blue-100 rounded-bl-sm border border-blue-800"
            }`}>
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 text-white overflow-hidden">
                {user?.avatarUrl ? <img src={user.avatarUrl} className="w-full h-full object-cover" alt="" /> : (user?.name?.[0] || "A")}
              </div>
            )}
          </div>
        ))}
        {chatMutation.isPending && (
          <div className="flex gap-2 justify-start">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-sm shrink-0">🤖</div>
            <div className="bg-[#1530a0] border border-blue-800 rounded-2xl rounded-bl-sm px-3 py-2">
              <div className="flex gap-1 items-center h-5">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick prompts */}
      {messages.length <= 1 && (
        <div className="px-4 py-2 bg-[#0d1b3e] border-t border-blue-900/50">
          <div className="text-blue-500 text-xs mb-2">Quick questions:</div>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_PROMPTS.slice(0, 4).map((p, i) => (
              <button
                key={i}
                onClick={() => sendMessage(p)}
                className="text-xs bg-[#1530a0] hover:bg-blue-700 text-blue-300 hover:text-white border border-blue-800 px-2.5 py-1 rounded-full transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-3 bg-[#1a3a8f] border-t border-blue-900">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage(input))}
            placeholder="Ask LYNX anything about your sport..."
            className="flex-1 bg-[#0d1b3e] border border-blue-800 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500 placeholder-blue-600"
            disabled={chatMutation.isPending}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || chatMutation.isPending}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl transition-colors font-bold text-sm shrink-0"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Robotics() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"chat" | "usecases" | "integration">("chat");

  return (
    <PlatformLayout>
      <div className="space-y-5 pb-20 lg:pb-6">

        {/* Hero */}
        <div className="relative bg-gradient-to-br from-[#0a1628] via-[#1a3a8f] to-[#0a1628] border border-blue-700 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #0066ff 0%, transparent 60%), radial-gradient(circle at 70% 50%, #00ffaa 0%, transparent 60%)" }} />
          <div className="relative p-6 text-center">
            <div className="text-6xl mb-3">🤖</div>
            <div className="text-blue-400 text-xs uppercase tracking-[0.3em] mb-1">Coming Soon</div>
            <h1 className="text-3xl font-black text-white mb-2">ATHLYNX ROBOTICS</h1>
            <p className="text-blue-300 text-sm font-semibold mb-4">Your AI Robot Companion — In Every Moment of Your Athletic Journey</p>
            <div className="w-16 h-0.5 bg-blue-600 mx-auto mb-4" />
            <p className="text-blue-200 text-sm leading-relaxed max-w-lg mx-auto">
              The next frontier of athlete performance. An AI-powered robot companion that works alongside you — on the field, in the stands, in training, in recovery, and everywhere in between.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-blue-900/50 border border-blue-600 rounded-full px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">In Development — Guinness World Record Technology</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: "12+", label: "Use Cases" },
            { value: "10+", label: "Sports Covered" },
            { value: "24/7", label: "Always On" },
          ].map((s, i) => (
            <div key={i} className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-3 text-center">
              <div className="text-2xl font-black text-blue-400">{s.value}</div>
              <div className="text-blue-300 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#1a3a8f] border border-blue-900 rounded-xl p-1">
          {[
            { key: "chat", label: "🤖 Chat with LYNX" },
            { key: "usecases", label: "📋 Use Cases" },
            { key: "integration", label: "🔗 App Integration" },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === tab.key ? 'bg-blue-600 text-white' : 'text-blue-400 hover:text-white'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "chat" && (
          <div className="space-y-4">
            <div className="bg-[#1a3a8f] border border-blue-800 rounded-2xl p-4">
              <h2 className="text-white font-black text-lg mb-2">Meet LYNX — Your AI Robot Companion</h2>
              <p className="text-blue-200 text-sm leading-relaxed">
                LYNX is the AI brain behind the ATHLYNX robot. Right now, you can chat with LYNX directly — ask anything about training, recruiting, NIL deals, game strategy, recovery, and more. When the physical robot launches, LYNX will be the intelligence inside it.
              </p>
            </div>

            {/* Scenario quick-select */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {SCENARIOS.map(s => (
                <button
                  key={s.id}
                  className="flex flex-col items-center gap-1 bg-[#1530a0] hover:bg-blue-700 border border-blue-800 rounded-xl px-3 py-2 shrink-0 transition-colors"
                >
                  <span className="text-xl">{s.icon}</span>
                  <span className="text-[10px] text-blue-300 whitespace-nowrap">{s.label}</span>
                </button>
              ))}
            </div>

            <RobotChat user={user} />
          </div>
        )}

        {activeTab === "usecases" && (
          <div>
            <div className="bg-[#1a3a8f] border border-blue-800 rounded-2xl p-4 mb-4">
              <h2 className="text-white font-black text-lg mb-2">One Robot. Every Sport. Every Moment.</h2>
              <p className="text-blue-200 text-sm leading-relaxed">
                ATHLYNX is partnering with world-class robotics engineers to bring the most advanced AI companion to athletes at every level. This isn't a gadget — it's a teammate that never gets tired, never misses a rep, and never stops working for you.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {USE_CASES.map((uc, i) => (
                <div key={i} className={`bg-gradient-to-br ${uc.color} border border-white/10 rounded-2xl p-4`}>
                  <div className="flex items-start gap-3">
                    <div className="text-3xl shrink-0">{uc.icon}</div>
                    <div>
                      <div className="font-black text-white">{uc.title}</div>
                      <div className="text-white/60 text-xs font-semibold mb-1">{uc.subtitle}</div>
                      <p className="text-white/80 text-xs leading-relaxed">{uc.desc}</p>
                      <div className="mt-2 inline-block text-xs bg-white/10 text-white/70 px-2 py-0.5 rounded-full">{uc.sport}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "integration" && (
          <div className="bg-[#1a3a8f] border border-blue-900 rounded-2xl p-5">
            <h2 className="text-white font-black text-lg mb-4">Connects With Every ATHLYNX App</h2>
            <div className="space-y-2">
              {[
                { app: "Diamond Grind", robot: "Pitching machine, swing analyzer, fielding drill partner" },
                { app: "Warriors Playbook", robot: "Film room display, play diagram projector, team stat tracker" },
                { app: "NIL Portal", robot: "Brand event representation, content capture, product demos" },
                { app: "AI Recruiter", robot: "Highlight reel capture, coach communication assistant" },
                { app: "AI Content", robot: "Auto-records and edits your best moments for social media" },
                { app: "Transfer Portal", robot: "Campus visit companion, school tour guide, coach meeting prep" },
                { app: "Feed", robot: "Captures and posts your best training moments automatically" },
                { app: "Messenger", robot: "Voice-to-text messaging while you train, hands-free communication" },
                { app: "Faith", robot: "Morning devotional companion, pre-game prayer partner" },
                { app: "NIL Vault", robot: "Contract review assistant, deal document organizer" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-[#1530a0] rounded-xl p-3">
                  <div className="text-blue-400 font-black text-xs w-28 shrink-0 pt-0.5">{item.app}</div>
                  <div className="text-blue-200 text-xs leading-relaxed">{item.robot}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-br from-[#0a1628] to-[#1a3a8f] border border-blue-600 rounded-2xl p-6 text-center">
          <div className="text-4xl mb-3">🤖</div>
          <h3 className="text-white font-black text-xl mb-2">Be First in Line</h3>
          <p className="text-blue-200 text-sm leading-relaxed max-w-sm mx-auto mb-4">
            ATHLYNX Robotics is in development. Athletes who sign up for Elite or NIL Vault plans get priority access when we launch.
          </p>
          <a href="/pricing" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-3 rounded-xl transition-colors text-sm">
            Get Priority Access — Upgrade Now
          </a>
          <div className="mt-3 text-blue-500 text-xs">Powered by Dozier Holdings Group • Softmor Technology</div>
        </div>

      </div>
    </PlatformLayout>
  );
}
