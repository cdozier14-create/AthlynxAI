import { useState } from "react";
import { Link } from "wouter";
import { 
  Trophy, Target, Users, Zap, Star, Clock, 
  CheckCircle2, Circle, ArrowRight, Shield,
  Flame, Medal, Crown, Rocket, Calendar
} from "lucide-react";

// Starting Lineup - Completed Features (Starters)
const startingLineup = [
  {
    position: "P",
    positionName: "Pitcher",
    name: "VIP Early Access System",
    number: "1",
    stats: "100% Complete",
    description: "Landing page, signup form, countdown timer, success page",
    status: "starter",
    era: "0.00"
  },
  {
    position: "C",
    positionName: "Catcher",
    name: "Database & Authentication",
    number: "2",
    stats: "100% Complete",
    description: "MySQL, user auth, VIP members, Stripe integration",
    status: "starter",
    era: "0.00"
  },
  {
    position: "1B",
    positionName: "First Base",
    name: "Empire Ecosystem",
    number: "3",
    stats: "100% Complete",
    description: "Store, Careers, Medical, Training, Veterans, Music",
    status: "starter",
    era: "0.00"
  },
  {
    position: "2B",
    positionName: "Second Base",
    name: "NIL Portal & Marketplace",
    number: "4",
    stats: "100% Complete",
    description: "NIL deals, brand connections, athlete profiles",
    status: "starter",
    era: "0.00"
  },
  {
    position: "SS",
    positionName: "Shortstop",
    name: "Transfer Portal Intelligence",
    number: "5",
    stats: "100% Complete",
    description: "Athlete database, school matching, analytics",
    status: "starter",
    era: "0.00"
  },
  {
    position: "3B",
    positionName: "Third Base",
    name: "The Athlete Playbook",
    number: "6",
    stats: "100% Complete",
    description: "Recruiting, media profiles, global connections",
    status: "starter",
    era: "0.00"
  },
  {
    position: "LF",
    positionName: "Left Field",
    name: "Diamond Grind Baseball",
    number: "7",
    stats: "100% Complete",
    description: "Full baseball platform with rankings, tournaments",
    status: "starter",
    era: "0.00"
  },
  {
    position: "CF",
    positionName: "Center Field",
    name: "FCA Faith Platform",
    number: "8",
    stats: "100% Complete",
    description: "Devotionals, podcasts, prayer wall, testimonies",
    status: "starter",
    era: "0.00"
  },
  {
    position: "RF",
    positionName: "Right Field",
    name: "Military Division",
    number: "9",
    stats: "100% Complete",
    description: "Operation Warrior Pipeline, veteran support",
    status: "starter",
    era: "0.00"
  }
];

// Bench Players - In Progress Features
const benchPlayers = [
  {
    position: "UTIL",
    name: "Court Kings (Basketball)",
    number: "10",
    stats: "Coming Soon Page Built",
    status: "bench"
  },
  {
    position: "UTIL",
    name: "Gridiron Nexus (Football)",
    number: "11",
    stats: "Coming Soon Page Built",
    status: "bench"
  },
  {
    position: "UTIL",
    name: "Pitch Pulse (Soccer)",
    number: "12",
    stats: "Coming Soon Page Built",
    status: "bench"
  },
  {
    position: "UTIL",
    name: "Reel Masters (Fishing)",
    number: "13",
    stats: "Coming Soon Page Built",
    status: "bench"
  },
  {
    position: "UTIL",
    name: "Fairway Elite (Golf)",
    number: "14",
    stats: "Coming Soon Page Built",
    status: "bench"
  },
  {
    position: "UTIL",
    name: "Hunt Pro (Hunting)",
    number: "15",
    stats: "Coming Soon Page Built",
    status: "bench"
  }
];

// Farm System - Future Development
const farmSystem = [
  {
    name: "AI Credit System",
    level: "AAA",
    description: "Manus LLM integration, credit purchases, usage tracking",
    priority: "HIGH"
  },
  {
    name: "HIPAA Compliance",
    level: "AAA",
    description: "Medical data encryption, audit logging, consent forms",
    priority: "HIGH"
  },
  {
    name: "NCAA Compliance",
    level: "AA",
    description: "NIL rules, recruiting calendars, dead period blocking",
    priority: "MEDIUM"
  },
  {
    name: "National Signing Day Streaming",
    level: "AA",
    description: "Live video, commitment graphics, multi-sport calendar",
    priority: "MEDIUM"
  },
  {
    name: "Pre-Launch Audit",
    level: "A",
    description: "Testing, performance, SEO, cross-browser",
    priority: "HIGH"
  },
  {
    name: "Content Creation",
    level: "A",
    description: "30 devotionals, 5 podcasts, 10 blog posts",
    priority: "MEDIUM"
  },
  {
    name: "Marketing Launch",
    level: "Rookie",
    description: "Press release, launch video, social campaigns",
    priority: "LOW"
  }
];

// Game Schedule - Launch Timeline
const gameSchedule = [
  {
    date: "January 1, 2025",
    opponent: "VIP Early Access",
    location: "HOME",
    status: "upcoming",
    description: "1,000 beta testers only"
  },
  {
    date: "February 1, 2026",
    opponent: "FULL PUBLIC LAUNCH",
    location: "HOME",
    status: "championship",
    description: "Complete Baseball features live"
  },
  {
    date: "Post-Launch",
    opponent: "Sport Rollouts",
    location: "AWAY",
    status: "season",
    description: "New sport every 2-4 weeks"
  }
];

export default function ProjectPlaybook() {
  const [activeTab, setActiveTab] = useState<"lineup" | "bench" | "farm" | "schedule">("lineup");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0d1e36] to-[#0a1628]">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-cyan-500/10" />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            {/* Team Logo */}
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 mb-4 shadow-lg shadow-yellow-500/30">
              <span className="text-5xl"></span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tight">
              ATHLYNX <span className="text-cyan-400">PLAYBOOK</span>
            </h1>
            <p className="text-xl text-yellow-400 font-bold mb-2">THE STARTING LINEUP</p>
            <p className="text-gray-400">Project Status as of December 29, 2025</p>
            
            {/* Team Record */}
            <div className="flex justify-center gap-8 mt-6">
              <div className="text-center">
                <div className="text-3xl font-black text-green-400">70%</div>
                <div className="text-xs text-gray-500 uppercase">Complete</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-cyan-400">9</div>
                <div className="text-xs text-gray-500 uppercase">Starters</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-yellow-400">6</div>
                <div className="text-xs text-gray-500 uppercase">On Bench</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-orange-400">7</div>
                <div className="text-xs text-gray-500 uppercase">In Farm</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Status Banner */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            <span className="text-white font-bold">LIVE ON RAILWAY</span>
            <span className="text-green-100">|</span>
            <a 
              href="https://athlynx-backend-production.up.railway.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white underline hover:text-green-100"
            >
              athlynx-backend-production.up.railway.app
            </a>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { id: "lineup", label: "Starting Lineup", icon: Users, color: "cyan" },
            { id: "bench", label: "Bench", icon: Target, color: "yellow" },
            { id: "farm", label: "Farm System", icon: Rocket, color: "orange" },
            { id: "schedule", label: "Game Schedule", icon: Calendar, color: "green" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                activeTab === tab.id
                  ? `bg-${tab.color}-500 text-white shadow-lg shadow-${tab.color}-500/30`
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-12">
        
        {/* Starting Lineup Tab */}
        {activeTab === "lineup" && (
          <div>
            {/* Baseball Diamond Visual */}
            <div className="relative max-w-2xl mx-auto mb-12 aspect-square">
              <div className="absolute inset-0 bg-gradient-to-b from-green-900/30 to-green-800/20 rounded-full" />
              
              {/* Diamond Shape */}
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {/* Outfield grass */}
                <circle cx="200" cy="200" r="180" fill="rgba(34, 197, 94, 0.1)" />
                
                {/* Infield dirt */}
                <polygon 
                  points="200,80 320,200 200,320 80,200" 
                  fill="rgba(180, 83, 9, 0.2)"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="2"
                />
                
                {/* Base paths */}
                <line x1="200" y1="80" x2="320" y2="200" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                <line x1="320" y1="200" x2="200" y2="320" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                <line x1="200" y1="320" x2="80" y2="200" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                <line x1="80" y1="200" x2="200" y2="80" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                
                {/* Positions */}
                {/* Pitcher */}
                <circle cx="200" cy="200" r="20" fill="#22d3ee" className="animate-pulse" />
                <text x="200" y="205" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">P</text>
                
                {/* Catcher */}
                <circle cx="200" cy="340" r="18" fill="#22d3ee" />
                <text x="200" y="345" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">C</text>
                
                {/* 1B */}
                <circle cx="320" cy="200" r="18" fill="#22d3ee" />
                <text x="320" y="205" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">1B</text>
                
                {/* 2B */}
                <circle cx="260" cy="140" r="18" fill="#22d3ee" />
                <text x="260" y="145" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2B</text>
                
                {/* SS */}
                <circle cx="140" cy="140" r="18" fill="#22d3ee" />
                <text x="140" y="145" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">SS</text>
                
                {/* 3B */}
                <circle cx="80" cy="200" r="18" fill="#22d3ee" />
                <text x="80" y="205" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">3B</text>
                
                {/* LF */}
                <circle cx="60" cy="100" r="18" fill="#22d3ee" />
                <text x="60" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">LF</text>
                
                {/* CF */}
                <circle cx="200" cy="50" r="18" fill="#22d3ee" />
                <text x="200" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">CF</text>
                
                {/* RF */}
                <circle cx="340" cy="100" r="18" fill="#22d3ee" />
                <text x="340" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">RF</text>
              </svg>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                <div className="text-green-400 font-bold text-sm">ALL POSITIONS FILLED</div>
                <div className="text-gray-500 text-xs">9 Starters Ready</div>
              </div>
            </div>

            {/* Player Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              {startingLineup.map((player, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-4 border border-white/10 hover:border-cyan-500/50 transition-all hover:scale-105"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex flex-col items-center justify-center shadow-lg">
                        <span className="text-white font-black text-2xl">{player.number}</span>
                        <span className="text-cyan-200 text-xs font-bold">{player.position}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-xs text-green-400 font-bold">{player.stats}</span>
                      </div>
                      <h3 className="text-white font-bold truncate">{player.name}</h3>
                      <p className="text-gray-400 text-xs">{player.positionName}</p>
                      <p className="text-gray-500 text-xs mt-1 line-clamp-2">{player.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bench Tab */}
        {activeTab === "bench" && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-yellow-400 mb-2">🪑 THE BENCH</h2>
              <p className="text-gray-400">White-Label Sport Platforms - Coming Soon Pages Built</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {benchPlayers.map((player, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-yellow-500/10 to-orange-500/5 rounded-xl p-4 border border-yellow-500/20"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-18 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex flex-col items-center justify-center">
                      <span className="text-white font-black text-xl">{player.number}</span>
                      <span className="text-yellow-200 text-xs">{player.position}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-yellow-400" />
                        <span className="text-xs text-yellow-400 font-bold">{player.stats}</span>
                      </div>
                      <h3 className="text-white font-bold">{player.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-yellow-500/10 rounded-xl border border-yellow-500/20 text-center">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-yellow-400 font-bold">Ready to be called up!</p>
              <p className="text-gray-400 text-sm">These platforms have landing pages and will be fully built post-launch</p>
            </div>
          </div>
        )}

        {/* Farm System Tab */}
        {activeTab === "farm" && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-orange-400 mb-2">🌱 FARM SYSTEM</h2>
              <p className="text-gray-400">Future Development - Prospects in Training</p>
            </div>
            
            <div className="space-y-4">
              {farmSystem.map((prospect, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-r from-white/5 to-white/10 rounded-xl p-4 border border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        prospect.level === "AAA" ? "bg-red-500/20 text-red-400" :
                        prospect.level === "AA" ? "bg-orange-500/20 text-orange-400" :
                        prospect.level === "A" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-green-500/20 text-green-400"
                      }`}>
                        {prospect.level}
                      </div>
                      <div>
                        <h3 className="text-white font-bold">{prospect.name}</h3>
                        <p className="text-gray-500 text-sm">{prospect.description}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      prospect.priority === "HIGH" ? "bg-red-500/20 text-red-400" :
                      prospect.priority === "MEDIUM" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-gray-500/20 text-gray-400"
                    }`}>
                      {prospect.priority} PRIORITY
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20 text-center">
                <div className="text-2xl font-black text-red-400">AAA</div>
                <div className="text-gray-400 text-sm">Ready for call-up</div>
              </div>
              <div className="p-4 bg-orange-500/10 rounded-xl border border-orange-500/20 text-center">
                <div className="text-2xl font-black text-orange-400">AA</div>
                <div className="text-gray-400 text-sm">Advanced development</div>
              </div>
              <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20 text-center">
                <div className="text-2xl font-black text-yellow-400">A / Rookie</div>
                <div className="text-gray-400 text-sm">Early development</div>
              </div>
            </div>
          </div>
        )}

        {/* Game Schedule Tab */}
        {activeTab === "schedule" && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-2">📅 GAME SCHEDULE</h2>
              <p className="text-gray-400">Launch Timeline - Road to Championship</p>
            </div>
            
            <div className="max-w-2xl mx-auto space-y-4">
              {gameSchedule.map((game, index) => (
                <div 
                  key={index}
                  className={`rounded-xl p-6 border ${
                    game.status === "championship" 
                      ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/50" 
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {game.status === "championship" && <Trophy className="w-5 h-5 text-yellow-400" />}
                        <span className={`text-sm font-bold ${
                          game.status === "championship" ? "text-yellow-400" : "text-cyan-400"
                        }`}>
                          {game.date}
                        </span>
                      </div>
                      <h3 className={`text-xl font-bold ${
                        game.status === "championship" ? "text-yellow-400" : "text-white"
                      }`}>
                        {game.opponent}
                      </h3>
                      <p className="text-gray-400 text-sm">{game.description}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-lg text-sm font-bold ${
                      game.location === "HOME" 
                        ? "bg-green-500/20 text-green-400" 
                        : "bg-blue-500/20 text-blue-400"
                    }`}>
                      {game.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Championship Banner */}
            <div className="mt-8 p-8 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 rounded-xl border border-yellow-500/30 text-center">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-3xl font-black text-white mb-2">CHAMPIONSHIP GAME</h3>
              <p className="text-yellow-400 text-xl font-bold">FEBRUARY 1, 2026</p>
              <p className="text-gray-400 mt-2">Full Public Launch - The Big Day</p>
              
              <div className="flex justify-center gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-black text-white">33</div>
                  <div className="text-xs text-gray-500">DAYS</div>
                </div>
                <div className="text-gray-600">:</div>
                <div className="text-center">
                  <div className="text-2xl font-black text-white">--</div>
                  <div className="text-xs text-gray-500">HRS</div>
                </div>
                <div className="text-gray-600">:</div>
                <div className="text-center">
                  <div className="text-2xl font-black text-white">--</div>
                  <div className="text-xs text-gray-500">MIN</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/AzsuZOzvfgvscIdI.png" alt="DHG" className="w-8 h-8" />
            <span className="text-gray-400">Powered by</span>
            <span className="text-cyan-400 font-bold">Dozier Holdings Group</span>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300">
            <ArrowRight className="w-4 h-4" />
            Back to VIP Access
          </Link>
        </div>
      </div>
    </div>
  );
}
