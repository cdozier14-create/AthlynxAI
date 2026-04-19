import PlatformLayout from "@/components/PlatformLayout";
import { useState } from "react";

const ROLES = [
  {
    category: "Personal Trainer",
    icon: "🏋️",
    color: "from-blue-900 to-blue-800",
    border: "border-blue-700",
    roles: [
      { title: "Strength Coach", desc: "Counts reps, tracks sets, monitors form in real time, adjusts resistance, and logs every workout to your ATHLYNX profile." },
      { title: "Cardio Partner", desc: "Runs alongside you, tracks pace, monitors heart rate zones, and pushes you to hit your target — every single session." },
      { title: "Flexibility & Recovery", desc: "Guides stretching routines, monitors muscle soreness, tracks sleep quality, and builds your recovery plan around your schedule." },
      { title: "Nutrition Tracker", desc: "Logs meals, tracks macros, reminds you to hydrate, and syncs your nutrition data with your training load." },
    ]
  },
  {
    category: "Medical & Health Monitor",
    icon: "❤️",
    color: "from-red-900 to-red-800",
    border: "border-red-700",
    roles: [
      { title: "Heart Rate Monitor", desc: "Continuous real-time heart rate tracking during training, rest, and competition. Alerts you and your coach when zones are exceeded." },
      { title: "Injury Prevention", desc: "Analyzes movement patterns, detects compensations and imbalances, and flags injury risk before it becomes a problem." },
      { title: "Vital Signs Tracker", desc: "Monitors blood oxygen, body temperature, breathing rate, and HRV — the same data pro teams pay millions for." },
      { title: "First Aid Assistant", desc: "Carries a first aid kit, applies ice packs, stabilizes injuries, and contacts medical staff instantly when needed." },
    ]
  },
  {
    category: "Ball Boy / Equipment",
    icon: "⚾",
    color: "from-green-900 to-green-800",
    border: "border-green-700",
    roles: [
      { title: "Ball Boy / Ball Girl", desc: "Retrieves balls, feeds drills, resets equipment between reps, and keeps practice moving without interruption." },
      { title: "Throwing Partner", desc: "Throws the ball with you and to you — football spirals, baseball pitches, basketball passes, soccer crosses. Tireless. Accurate. Always ready." },
      { title: "Equipment Manager", desc: "Organizes gear, tracks inventory, launders uniforms, manages lockers, and has everything ready before you arrive." },
      { title: "Pitching Machine", desc: "Delivers pitches at any speed, spin, and location. Syncs with Diamond Grind to log every at-bat and track your development." },
    ]
  },
  {
    category: "Water Boy / Nutrition",
    icon: "💧",
    color: "from-cyan-900 to-cyan-800",
    border: "border-cyan-700",
    roles: [
      { title: "Water Boy", desc: "Delivers water, sports drinks, and recovery shakes on demand. Tracks your hydration levels and reminds you to drink before you feel thirsty." },
      { title: "Sideline Attendant", desc: "Stationed on the sideline during games — towels, water, snacks, ice bags, and anything else you need between plays." },
      { title: "Meal Prep Assistant", desc: "Plans and tracks pre-game and post-game meals based on your training load, body composition goals, and game schedule." },
      { title: "Supplement Tracker", desc: "Logs supplements, reminds you of timing windows, and tracks how your body responds to different nutrition protocols." },
    ]
  },
  {
    category: "Film Crew & Scout",
    icon: "🎬",
    color: "from-purple-900 to-purple-800",
    border: "border-purple-700",
    roles: [
      { title: "Film Crew", desc: "Records every practice and game from multiple angles. Auto-edits highlight reels and uploads them directly to your ATHLYNX profile." },
      { title: "Scout Assistant", desc: "Tracks opponent tendencies, logs stats in real time, and delivers scouting reports to your coach before the next possession." },
      { title: "Performance Analyst", desc: "Analyzes your film, identifies patterns, compares your mechanics to elite athletes, and delivers actionable feedback after every session." },
      { title: "Recruiting Videographer", desc: "Captures your best moments, formats them for coach review, and sends highlight packages to programs on your target list." },
    ]
  },
  {
    category: "Schedule & Life Manager",
    icon: "📅",
    color: "from-yellow-900 to-yellow-800",
    border: "border-yellow-700",
    roles: [
      { title: "Schedule Manager", desc: "Manages your training calendar, academic schedule, recruiting visits, and NIL obligations — all in one place." },
      { title: "Academic Tutor", desc: "Keeps you eligible. Monitors grades, schedules study sessions, and helps you stay on top of coursework during the season." },
      { title: "Mental Performance Coach", desc: "Leads visualization exercises, breathing techniques, and pre-game mental prep routines to get you locked in." },
      { title: "Alarm & Routine Bot", desc: "Wakes you up, walks you through your morning routine, and makes sure you arrive to every practice, class, and meeting on time." },
    ]
  },
  {
    category: "Stadium & Venue Roles",
    icon: "🏟️",
    color: "from-orange-900 to-orange-800",
    border: "border-orange-700",
    roles: [
      { title: "Concession Vendor", desc: "Roams the stands delivering food, drinks, and merchandise to fans in their seats. Faster service, no long lines, more revenue per game." },
      { title: "Security Rover", desc: "Patrols the venue, monitors crowd behavior, identifies safety issues, and alerts security staff instantly." },
      { title: "Field Maintenance Bot", desc: "Maintains field conditions — mows grass, paints lines, cleans turf, and preps the surface before every game." },
      { title: "Fan Experience Bot", desc: "Engages fans with live stats, photo opportunities, merchandise, and interactive games — turning every seat into a premium experience." },
    ]
  },
  {
    category: "The Father Figure",
    icon: "👨‍👦",
    color: "from-indigo-900 to-indigo-800",
    border: "border-indigo-700",
    roles: [
      { title: "Always There", desc: "Never misses a practice, a game, or a workout. Available 24/7, 365 days a year. Rain, shine, 5 AM or midnight — your TrainerBot is there." },
      { title: "Encouragement Engine", desc: "Celebrates your wins, picks you up after losses, tracks your progress over time, and reminds you how far you've come." },
      { title: "Accountability Partner", desc: "Keeps you on track with your goals. No excuses accepted. Knows your schedule, your targets, and exactly what it takes to get you there." },
      { title: "Catch & Throw Partner", desc: "Throws the ball with you in the backyard, on the field, or in the gym. The partner who never gets tired of working with you." },
    ]
  },
];

const STATS = [
  { value: "24/7", label: "Always On" },
  { value: "40+", label: "Roles Covered" },
  { value: "100%", label: "Athlete-Focused" },
  { value: "0", label: "Days Off" },
];

export default function TrainerBot() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <PlatformLayout>
      <div className="max-w-2xl mx-auto px-4 pb-12">

        {/* Hero */}
        <div className="text-center py-8">
          <div className="text-6xl mb-3">🤖</div>
          <h1 className="text-white font-black text-3xl mb-2 tracking-tight">
            ATHLYNX <span className="text-blue-400">TrainerBot</span>
          </h1>
          <p className="text-blue-200 text-sm leading-relaxed max-w-sm mx-auto">
            The AI robot that does everything a dedicated father, coach, trainer, and teammate would do — and never takes a day off.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-2 mb-8">
          {STATS.map((s, i) => (
            <div key={i} className="bg-[#0d1b3e] border border-blue-900 rounded-xl p-3 text-center">
              <div className="text-blue-400 font-black text-xl">{s.value}</div>
              <div className="text-blue-300 text-[10px] mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Vision Statement */}
        <div className="bg-gradient-to-r from-[#0a1f44] to-[#0d2b5e] border border-blue-700 rounded-2xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <div className="text-3xl shrink-0">👨‍👦</div>
            <div>
              <h2 className="text-white font-black text-base mb-1">Anything a Father Can Do, a TrainerBot Can Do</h2>
              <p className="text-blue-200 text-sm leading-relaxed">
                Not every athlete has a parent who can throw the ball, track their heart rate, film every rep, manage their schedule, carry their gear, bring the water, and be there at 5 AM every single morning. TrainerBot changes that. Every athlete — regardless of background — gets the same dedicated support that elite athletes have always had.
              </p>
            </div>
          </div>
        </div>

        {/* Role Categories */}
        <h2 className="text-white font-black text-lg mb-4">Every Role. Every Sport. Every Day.</h2>
        <div className="space-y-3">
          {ROLES.map((cat, i) => (
            <div key={i} className={`bg-gradient-to-br ${cat.color} border ${cat.border} rounded-2xl overflow-hidden`}>
              <button
                className="w-full flex items-center justify-between p-4 text-left"
                onClick={() => setActiveCategory(activeCategory === cat.category ? null : cat.category)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="text-white font-black text-base">{cat.category}</span>
                </div>
                <span className="text-white/60 text-lg">{activeCategory === cat.category ? "−" : "+"}</span>
              </button>
              {activeCategory === cat.category && (
                <div className="px-4 pb-4 space-y-2">
                  {cat.roles.map((role, j) => (
                    <div key={j} className="bg-black/20 rounded-xl p-3">
                      <div className="text-white font-bold text-sm mb-1">{role.title}</div>
                      <div className="text-white/70 text-xs leading-relaxed">{role.desc}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Medical Data Section */}
        <div className="mt-8 bg-[#0d1b3e] border border-blue-800 rounded-2xl p-5">
          <h2 className="text-white font-black text-base mb-3">📊 Complete Health & Performance Data</h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              "Heart Rate (Real-Time)", "HRV Tracking", "Blood Oxygen (SpO2)", "Body Temperature",
              "Breathing Rate", "Sleep Quality", "Hydration Levels", "Caloric Burn",
              "Workout Load Score", "Recovery Score", "Injury Risk Index", "Performance Trends",
              "Throw Velocity", "Sprint Speed", "Jump Height", "Reaction Time",
            ].map((metric, i) => (
              <div key={i} className="flex items-center gap-2 bg-[#1a3a8f]/40 rounded-lg px-3 py-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></div>
                <span className="text-blue-200 text-xs">{metric}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sports Coverage */}
        <div className="mt-6 bg-[#0d1b3e] border border-blue-800 rounded-2xl p-5">
          <h2 className="text-white font-black text-base mb-3">🏆 Built for Every Sport</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Football", "Basketball", "Baseball", "Softball", "Soccer", "Track & Field",
              "Swimming", "Volleyball", "Wrestling", "Golf", "Tennis", "Hockey",
              "Lacrosse", "Cross Country", "Gymnastics", "Rugby", "Boxing", "MMA",
              "Cheerleading", "Dance", "Rowing", "Water Polo", "Skiing", "Cycling",
            ].map((sport, i) => (
              <span key={i} className="bg-blue-900/60 text-blue-200 text-xs px-3 py-1 rounded-full border border-blue-800">
                {sport}
              </span>
            ))}
          </div>
        </div>

        {/* Stadium Roles */}
        <div className="mt-6 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-blue-900 rounded-2xl p-5">
          <h2 className="text-white font-black text-base mb-3">🏟️ Stadium & Venue Deployment</h2>
          <div className="space-y-2">
            {[
              { role: "Concession Vendor", desc: "Seat-to-seat food & drink delivery — no lines, more revenue" },
              { role: "Merchandise Bot", desc: "Roams the stands selling team gear and collectibles" },
              { role: "Security Patrol", desc: "Monitors crowd safety and alerts staff to incidents" },
              { role: "Field Maintenance", desc: "Pre-game and post-game field prep and line painting" },
              { role: "Camera Operator", desc: "Captures broadcast-quality footage from field level" },
              { role: "Locker Room Attendant", desc: "Manages equipment, launders uniforms, preps gear" },
              { role: "Medical Rover", desc: "First aid response and vital monitoring during events" },
              { role: "Fan Engagement Bot", desc: "Interactive stats, photos, and entertainment for fans" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/5 rounded-xl p-3">
                <div className="text-blue-400 font-black text-xs w-36 shrink-0 pt-0.5">{item.role}</div>
                <div className="text-blue-200 text-xs leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ATHLYNX Integration */}
        <div className="mt-6 bg-[#0d1b3e] border border-blue-800 rounded-2xl p-5">
          <h2 className="text-white font-black text-base mb-3">🔗 Syncs With Your Entire ATHLYNX Profile</h2>
          <div className="space-y-2">
            {[
              { app: "AI Training Bot", sync: "Logs every workout, rep, set, and performance metric automatically" },
              { app: "Diamond Grind", sync: "Pitching machine, swing data, fielding drills — all synced" },
              { app: "AI Recruiter", sync: "Highlight reels filmed and uploaded to your recruiting profile" },
              { app: "NIL Portal", sync: "Content captured for brand deals and social media campaigns" },
              { app: "Warriors Playbook", sync: "Film, play diagrams, and stats fed directly to your playbook" },
              { app: "Health Dashboard", sync: "Heart rate, vitals, sleep, and recovery data in real time" },
              { app: "Messenger", sync: "Voice-to-text messaging while you train, hands-free" },
              { app: "Transfer Portal", sync: "Showcase footage and stats sent to target schools automatically" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-[#1a3a8f]/30 rounded-xl p-3">
                <div className="text-blue-400 font-black text-xs w-32 shrink-0 pt-0.5">{item.app}</div>
                <div className="text-blue-200 text-xs leading-relaxed">{item.sync}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 bg-gradient-to-br from-[#0a1628] to-[#1a3a8f] border border-blue-600 rounded-2xl p-6 text-center">
          <div className="text-4xl mb-3">🤖</div>
          <h3 className="text-white font-black text-xl mb-2">Be First in Line</h3>
          <p className="text-blue-200 text-sm leading-relaxed max-w-sm mx-auto mb-4">
            ATHLYNX TrainerBot is in development. Athletes on Elite and NIL Vault plans get priority access at launch. Sign up now and lock in your spot.
          </p>
          <a
            href="/pricing"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-3 rounded-xl transition-colors text-sm"
          >
            Get Priority Access — Upgrade Now
          </a>
          <div className="mt-4 text-blue-500 text-xs">
            Powered by Dozier Holdings Group · Softmor Technology · Houston, TX
          </div>
        </div>

      </div>
    </PlatformLayout>
  );
}
