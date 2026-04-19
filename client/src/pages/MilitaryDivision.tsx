import { Link } from "wouter";
import { useState } from "react";

export default function MilitaryDivision() {
  const [activeTab, setActiveTab] = useState<"pipeline" | "support" | "mentorship">("pipeline");

  const marketStats = [
    { value: "$1.4B+", label: "DoD Recruitment Budget", icon: "" },
    { value: "500K+", label: "College Athletes/Year", icon: "" },
    { value: "19M", label: "U.S. Veterans", icon: "" },
    { value: "96%", label: "Athletes Need Career Path", icon: "" },
  ];

  const pipelinePrograms = [
    {
      id: 1,
      name: "Military NIL Sponsorships",
      desc: "Athletes receive NIL deals from Army, Navy, Air Force, Marines, Space Force, Coast Guard in exchange for service commitment",
      icon: "",
      branch: "All Branches",
    },
    {
      id: 2,
      name: "ROTC Athlete Program",
      desc: "Support and NIL opportunities for ROTC cadets who are also college athletes",
      icon: "",
      branch: "Army, Navy, Air Force",
    },
    {
      id: 3,
      name: "Military Academy Support",
      desc: "Connect with athletes at West Point, Annapolis, Air Force Academy, Coast Guard Academy",
      icon: "🏛️",
      branch: "Service Academies",
    },
    {
      id: 4,
      name: "Officer Candidate Connections",
      desc: "Fast-track athletes to officer programs with leadership development",
      icon: "",
      branch: "All Branches",
    },
  ];

  const supportServices = [
    {
      id: 1,
      name: "VA Benefits Navigator",
      desc: "AI-powered tool to help veterans understand and claim their benefits",
      icon: "🤖",
      type: "Technology",
    },
    {
      id: 2,
      name: "Disability Claims Assistance",
      desc: "Guide veterans through the claims process with expert support",
      icon: "📋",
      type: "Support",
    },
    {
      id: 3,
      name: "GI Bill Optimization",
      desc: "Help veterans maximize their education benefits",
      icon: "📚",
      type: "Education",
    },
    {
      id: 4,
      name: "Healthcare Coordination",
      desc: "Connect veterans with VA healthcare services",
      icon: "🏥",
      type: "Healthcare",
    },
    {
      id: 5,
      name: "Mental Health Resources",
      desc: "PTSD support, counseling connections, peer support networks",
      icon: "🧠",
      type: "Wellness",
    },
    {
      id: 6,
      name: "Career Transition Services",
      desc: "Help veterans find civilian employment",
      icon: "",
      type: "Career",
    },
    {
      id: 7,
      name: "Veteran-Owned Business Support",
      desc: "Resources for veteran entrepreneurs",
      icon: "",
      type: "Business",
    },
  ];

  const mentorshipPrograms = [
    {
      id: 1,
      name: "Battle Buddy System",
      desc: "Pair current athletes with veteran mentors for guidance and support",
      icon: "",
    },
    {
      id: 2,
      name: "Leadership Development",
      desc: "Military-style leadership training for athletes",
      icon: "",
    },
    {
      id: 3,
      name: "Life Skills Training",
      desc: "Financial literacy, discipline, goal-setting",
      icon: "",
    },
    {
      id: 4,
      name: "Career Guidance",
      desc: "Veterans help athletes plan post-sport careers",
      icon: "",
    },
    {
      id: 5,
      name: "Speaker Series",
      desc: "Veteran athletes share their stories and inspire the next generation",
      icon: "🎤",
    },
  ];

  const defensePartners = [
    { company: "Lockheed Martin", opportunity: "STEM athlete sponsorships", logo: "🛡️" },
    { company: "Raytheon", opportunity: "Engineering career pipeline", logo: "🔧" },
    { company: "Boeing", opportunity: "Aviation athlete program", logo: "✈️" },
    { company: "Northrop Grumman", opportunity: "Cybersecurity training", logo: "" },
    { company: "General Dynamics", opportunity: "Leadership development", logo: "⚙️" },
    { company: "BAE Systems", opportunity: "Technical career paths", logo: "" },
    { company: "L3Harris", opportunity: "Communications training", logo: "📡" },
  ];

  const missionPhases = [
    {
      phase: "Phase 1",
      title: "Establish Base",
      timeline: "Months 1-3",
      tasks: [
        "Accept Division Commander role",
        "Review and refine playbook",
        "Identify key veteran partners",
        "Connect with military recruitment offices",
        "Begin outreach to ROTC programs",
      ],
    },
    {
      phase: "Phase 2",
      title: "Build Infrastructure",
      timeline: "Months 4-6",
      tasks: [
        "Develop VA Benefits Navigator tool",
        "Create veteran mentorship program structure",
        "Establish first military branch partnership",
        "Launch pilot program with 2-3 universities",
        "Build veteran advisory board",
      ],
    },
    {
      phase: "Phase 3",
      title: "Scale Operations",
      timeline: "Months 7-12",
      tasks: [
        "Expand to 25+ universities",
        "Secure first government contract",
        "Launch full veteran support platform",
        "Establish defense contractor partnerships",
        "Build team of 5-10 veteran staff members",
      ],
    },
    {
      phase: "Phase 4",
      title: "National Impact",
      timeline: "Year 2+",
      tasks: [
        "Nationwide military-athlete pipeline",
        "Full VA benefits platform",
        "100+ university partnerships",
        "Multiple government contracts",
        "Premier military-athlete organization",
      ],
    },
  ];

  const militaryBranches = [
    { name: "U.S. Army", motto: "This We'll Defend", icon: "" },
    { name: "U.S. Navy", motto: "Non Sibi Sed Patriae", icon: "⚓" },
    { name: "U.S. Air Force", motto: "Aim High... Fly-Fight-Win", icon: "✈️" },
    { name: "U.S. Marines", motto: "Semper Fidelis", icon: "🦅" },
    { name: "U.S. Coast Guard", motto: "Semper Paratus", icon: "🚢" },
    { name: "U.S. Space Force", motto: "Semper Supra", icon: "" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#1a2744] to-[#0f1d32]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl"></span>
            <span className="text-xl font-black text-white">ATHLYNX</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/home" className="text-gray-400 hover:text-white">Platform</Link>
            <Link href="/careers" className="text-gray-400 hover:text-white">Careers</Link>
            <Link href="/military-division" className="text-red-400 font-semibold">Military Division</Link>
            <Link href="/faith" className="text-gray-400 hover:text-white">Faith</Link>
          </nav>
        </div>
      </header>

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center gap-3 mb-4">
              <span className="text-5xl"></span>
              <span className="text-5xl"></span>
              <span className="text-5xl"></span>
            </div>
            <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-semibold mb-4 border border-red-500/30">
              OPERATION: WARRIOR PIPELINE
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
              MILITARY <span className="text-red-400">DIVISION</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-6">
              The first-ever NIL platform that connects college athletes with military service opportunities 
              while supporting our veterans through their entire journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                Division Commander: Lee Crisp
              </span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
                SEMPER FIDELIS
              </span>
            </div>
          </div>

          {/* The Problem We Solve */}
          <div className="bg-gradient-to-r from-red-900/20 via-white/5 to-blue-900/20 rounded-2xl border border-white/10 p-8 mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              THE PROBLEM <span className="text-red-400">WE SOLVE</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black/30 rounded-xl p-6 border border-red-500/20">
                <h3 className="text-lg font-bold text-red-400 mb-3">Military Recruitment Crisis</h3>
                <p className="text-gray-300 mb-4">
                  In 2023, the Army missed its recruiting goal by <span className="text-red-400 font-bold">25%</span>. 
                  The Navy, Air Force, and Marines are all struggling.
                </p>
                <p className="text-gray-400 text-sm">
                  The military needs quality recruits with discipline, teamwork, leadership, and physical fitness.
                </p>
              </div>
              <div className="bg-black/30 rounded-xl p-6 border border-blue-500/20">
                <h3 className="text-lg font-bold text-blue-400 mb-3">Athletes Need Career Paths</h3>
                <p className="text-gray-300 mb-4">
                  <span className="text-blue-400 font-bold">500,000+</span> college athletes graduate every year, 
                  and only 2-4% go pro.
                </p>
                <p className="text-gray-400 text-sm">
                  That means <span className="text-yellow-400 font-bold">96%</span> of college athletes need a career path after college.
                </p>
              </div>
            </div>
            <div className="text-center mt-6">
              <p className="text-xl text-white font-semibold">
                Athletes already have what the military needs. <span className="text-cyan-400">We connect these two worlds.</span>
              </p>
            </div>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {marketStats.map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 text-center hover:border-red-500/50 transition-all">
                <span className="text-3xl block mb-2">{stat.icon}</span>
                <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* The Gap */}
          <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-2xl border border-yellow-500/20 p-8 mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              THE <span className="text-yellow-400">GAP</span> WE FILL
            </h2>
            <p className="text-gray-300 text-center mb-6">No platform exists that:</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { num: "1", text: "Recruits athletes INTO military service" },
                { num: "2", text: "Provides NIL deals sponsored by military branches" },
                { num: "3", text: "Supports veterans with benefits navigation" },
                { num: "4", text: "Creates a mentorship pipeline from veterans to athletes" },
              ].map((item) => (
                <div key={item.num} className="bg-black/30 rounded-xl p-4 border border-yellow-500/20">
                  <span className="inline-block w-8 h-8 bg-yellow-500 text-black font-bold rounded-full flex items-center justify-center mb-2">
                    {item.num}
                  </span>
                  <p className="text-gray-300 text-sm">{item.text}</p>
                </div>
              ))}
            </div>
            <p className="text-center mt-6 text-xl font-bold text-yellow-400">
              ATHLYNX fills this gap. YOU lead this mission.
            </p>
          </div>

          {/* Three Pillars Tabs */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              THREE PILLARS OF THE <span className="text-red-400">MILITARY DIVISION</span>
            </h2>
            
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <button
                onClick={() => setActiveTab("pipeline")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === "pipeline"
                    ? "bg-red-500 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                Athlete to Military Pipeline
              </button>
              <button
                onClick={() => setActiveTab("support")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === "support"
                    ? "bg-blue-500 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                🏥 Veteran Support Services
              </button>
              <button
                onClick={() => setActiveTab("mentorship")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === "mentorship"
                    ? "bg-green-500 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                Mentorship Network
              </button>
            </div>

            {/* Tab Content */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              {activeTab === "pipeline" && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl"></span>
                    <div>
                      <h3 className="text-xl font-bold text-white">PILLAR 1: ATHLETE TO MILITARY PIPELINE</h3>
                      <p className="text-red-400">Mission: Recruit elite athletes into military service</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {pipelinePrograms.map((program) => (
                      <div key={program.id} className="bg-black/30 rounded-xl p-4 border border-red-500/20 hover:border-red-500/50 transition-all">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{program.icon}</span>
                          <div>
                            <h4 className="font-bold text-white">{program.name}</h4>
                            <p className="text-gray-400 text-sm mb-2">{program.desc}</p>
                            <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">
                              {program.branch}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-black/30 rounded-xl p-4 border border-white/10">
                    <h4 className="font-bold text-white mb-2">Revenue Model</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Government contracts", "Per-recruit fees", "ROTC partnerships", "Defense contractor sponsorships"].map((item) => (
                        <span key={item} className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "support" && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">🏥</span>
                    <div>
                      <h3 className="text-xl font-bold text-white">PILLAR 2: VETERAN SUPPORT SERVICES</h3>
                      <p className="text-blue-400">Mission: Serve those who served</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {supportServices.map((service) => (
                      <div key={service.id} className="bg-black/30 rounded-xl p-4 border border-blue-500/20 hover:border-blue-500/50 transition-all">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{service.icon}</span>
                          <div>
                            <h4 className="font-bold text-white text-sm">{service.name}</h4>
                            <p className="text-gray-400 text-xs mb-2">{service.desc}</p>
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                              {service.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-black/30 rounded-xl p-4 border border-white/10">
                    <h4 className="font-bold text-white mb-2">Revenue Model</h4>
                    <div className="flex flex-wrap gap-2">
                      {["VA partnership contracts", "VSO partnerships", "Corporate hiring fees", "Premium subscriptions"].map((item) => (
                        <span key={item} className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "mentorship" && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl"></span>
                    <div>
                      <h3 className="text-xl font-bold text-white">PILLAR 3: VETERAN ATHLETE MENTORSHIP NETWORK</h3>
                      <p className="text-green-400">Mission: Connect generations of warrior-athletes</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {mentorshipPrograms.map((program) => (
                      <div key={program.id} className="bg-black/30 rounded-xl p-4 border border-green-500/20 hover:border-green-500/50 transition-all">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{program.icon}</span>
                          <div>
                            <h4 className="font-bold text-white">{program.name}</h4>
                            <p className="text-gray-400 text-sm">{program.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-black/30 rounded-xl p-4 border border-white/10">
                    <h4 className="font-bold text-white mb-2">Revenue Model</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Corporate sponsorships", "School program fees", "Speaking engagement fees", "Training program licensing"].map((item) => (
                        <span key={item} className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Military Branches */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              PARTNER <span className="text-red-400">BRANCHES</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {militaryBranches.map((branch) => (
                <div key={branch.name} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 text-center hover:border-red-500/50 transition-all">
                  <span className="text-3xl block mb-2">{branch.icon}</span>
                  <p className="text-white font-semibold text-sm">{branch.name}</p>
                  <p className="text-gray-500 text-xs italic">{branch.motto}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Defense Contractor Partnerships */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-10">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              DEFENSE CONTRACTOR <span className="text-cyan-400">PARTNERSHIPS</span>
            </h2>
            <p className="text-gray-400 text-center mb-6">
              These companies spend BILLIONS on recruitment and workforce development. Athletes are premium candidates.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {defensePartners.map((partner) => (
                <div key={partner.company} className="bg-black/30 rounded-xl p-4 border border-cyan-500/20 hover:border-cyan-500/50 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{partner.logo}</span>
                    <h4 className="font-bold text-white">{partner.company}</h4>
                  </div>
                  <p className="text-gray-400 text-sm">{partner.opportunity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mission Objectives Timeline */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              MISSION <span className="text-yellow-400">OBJECTIVES</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {missionPhases.map((phase, index) => (
                <div key={phase.phase} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-yellow-500/50 transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-8 h-8 bg-yellow-500 text-black font-bold rounded-full flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-white">{phase.phase}</h3>
                      <p className="text-yellow-400 text-xs">{phase.timeline}</p>
                    </div>
                  </div>
                  <h4 className="text-white font-semibold mb-3">{phase.title}</h4>
                  <ul className="space-y-2">
                    {phase.tasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                        <span className="text-green-400 mt-1">☐</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Warrior Lifecycle */}
          <div className="bg-gradient-to-r from-red-900/20 via-blue-900/20 to-green-900/20 rounded-2xl border border-white/10 p-8 mb-10">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              THE WARRIOR <span className="text-cyan-400">LIFECYCLE</span>
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-4 text-center">
              {["ATHLETES", "MILITARY SERVICE", "VETERANS", "MENTORS", "NEXT GENERATION"].map((stage, i) => (
                <div key={stage} className="flex items-center gap-4">
                  <span className="px-4 py-2 bg-white/10 rounded-xl text-white font-semibold">
                    {stage}
                  </span>
                  {i < 4 && <span className="text-cyan-400 text-2xl">→</span>}
                </div>
              ))}
            </div>
            <p className="text-center mt-6 text-gray-300">
              We're not just building a business. We're building a <span className="text-cyan-400 font-bold">MOVEMENT</span>.
            </p>
            <p className="text-center text-gray-400">
              A movement that honors service, supports warriors, and creates the next generation of leaders.
            </p>
          </div>

          {/* Quotes */}
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {[
              { quote: "The only easy day was yesterday.", source: "Navy SEALs" },
              { quote: "Semper Fidelis", source: "United States Marine Corps" },
              { quote: "This We'll Defend", source: "United States Army" },
            ].map((item) => (
              <div key={item.source} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 text-center">
                <p className="text-white text-lg italic mb-2">"{item.quote}"</p>
                <p className="text-gray-500 text-sm">— {item.source}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-red-500/20 via-white/5 to-blue-500/20 rounded-2xl border border-white/10 p-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              WHERE ATHLETES BECOME <span className="text-red-400">LEGENDS</span>
            </h2>
            <p className="text-xl text-cyan-400 font-semibold mb-6">
              AND WARRIORS SERVE FOREVER
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/" className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all">
                Join the Mission
              </Link>
              <Link href="/veterans" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/20">
                Veteran Resources
              </Link>
            </div>
            <p className="text-gray-500 text-sm mt-6">
              Contact: Chad Dozier, Founder — ATHLYNX / Dozier Holdings Group
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
