import PlatformLayout from "@/components/PlatformLayout";

const TEAM = [
  {
    initials: "CD",
    name: "Chad A. Dozier",
    title: "Founder, CEO & Chairman",
    org: "Dozier Holdings Group • ATHLYNX",
    bio: "Chad A. Dozier is the Founder, CEO & Chairman of Dozier Holdings Group and ATHLYNX. A visionary entrepreneur and athlete advocate, Chad co-founded DHG in Houston, TX in November 2024 after meeting Glenn Tse at Hope Lodge. His mission: give every athlete the tools, resources, and opportunities they need to succeed on and off the field.",
    tags: [
      { label: "NIL Pioneer", color: "bg-green-900 text-green-400" },
      { label: "Tech Founder", color: "bg-blue-900 text-blue-300" },
      { label: "Athlete Advocate", color: "bg-purple-900 text-purple-300" },
    ],
    gradient: "from-blue-600 to-blue-900",
    border: "border-blue-500",
    badge: "bg-blue-700 text-blue-200",
    badgeLabel: "Founder, CEO & Chairman",
  },
  {
    initials: "GT",
    name: "Glenn Tse",
    title: "CFO / COO",
    org: "Dozier Holdings Group • ATHLYNX",
    bio: "Glenn Tse is the co-founder of Dozier Holdings Group and serves as CFO/COO. Glenn and Chad met at Hope Lodge in Houston, TX in November 2024, and together built DHG on a foundation of resilience, shared purpose, and the belief that the best is yet to come. Glenn's expertise in financial strategy and operations drives DHG's growth.",
    tags: [
      { label: "CFO / COO", color: "bg-cyan-900 text-cyan-400" },
      { label: "Co-Founder", color: "bg-blue-900 text-blue-300" },
      { label: "Strategic Partner", color: "bg-green-900 text-green-400" },
    ],
    gradient: "from-cyan-600 to-blue-900",
    border: "border-cyan-500",
    badge: "bg-cyan-700 text-cyan-200",
    badgeLabel: "CFO / COO",
  },
  {
    initials: "AK",
    name: "Andy Kustes",
    title: "VP Technology",
    org: "Dozier Holdings Group • ATHLYNX",
    bio: "Andy Kustes leads DHG's technology vision as VP Technology. Andy architects the technical infrastructure powering ATHLYNX, Softmor AI, and VC Data Centers — building the technological backbone of the DHG ecosystem and ensuring every platform delivers world-class performance.",
    tags: [
      { label: "VP Technology", color: "bg-purple-900 text-purple-400" },
      { label: "Platform Architect", color: "bg-blue-900 text-blue-300" },
      { label: "AI Builder", color: "bg-indigo-900 text-indigo-300" },
    ],
    gradient: "from-purple-600 to-blue-900",
    border: "border-purple-500",
    badge: "bg-purple-700 text-purple-200",
    badgeLabel: "VP Technology",
  },
  {
    initials: "LM",
    name: "Lee Marshall",
    title: "VP Sales & Partnerships",
    org: "Dozier Holdings Group • ATHLYNX",
    bio: "Lee Marshall drives DHG's revenue growth as VP Sales & Partnerships. Lee builds the strategic relationships and partnership channels that fuel DHG's expansion across all divisions — from NIL brand deals to enterprise technology partnerships.",
    tags: [
      { label: "VP Sales", color: "bg-orange-900 text-orange-400" },
      { label: "Partnerships", color: "bg-amber-900 text-amber-300" },
      { label: "Revenue Leader", color: "bg-yellow-900 text-yellow-300" },
    ],
    gradient: "from-orange-600 to-amber-900",
    border: "border-orange-500",
    badge: "bg-orange-700 text-orange-200",
    badgeLabel: "VP Sales & Partnerships",
  },
  {
    initials: "JB",
    name: "Jimmy Boyd",
    title: "VP Real Estate",
    org: "Dozier Holdings Group",
    bio: "Jimmy Boyd oversees DHG's real estate portfolio and development pipeline as VP Real Estate. Jimmy leads acquisitions, development, and management across DHG's residential and commercial real estate divisions — including Uma Real Estate, VC Residential, Villa Agape, and Pisces Resort.",
    tags: [
      { label: "VP Real Estate", color: "bg-teal-900 text-teal-400" },
      { label: "Development", color: "bg-green-900 text-green-300" },
      { label: "Acquisitions", color: "bg-emerald-900 text-emerald-300" },
    ],
    gradient: "from-teal-600 to-green-900",
    border: "border-teal-500",
    badge: "bg-teal-700 text-teal-200",
    badgeLabel: "VP Real Estate",
  },
];

export default function Founders() {
  return (
    <PlatformLayout>
      <div className="space-y-4 pb-20 lg:pb-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1a3a8f] to-[#1a2a4a] border border-blue-700 rounded-xl p-5 text-center">
          <img
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/qUknrdlyPrUZJQYo.png"
            alt="ATHLYNX"
            className="w-16 h-16 rounded-2xl mx-auto mb-3 shadow-lg"
          />
          <h2 className="text-3xl font-black text-white">THE TEAM</h2>
          <p className="text-blue-300 text-sm mt-1">The visionaries building the future of athlete success</p>
          <p className="text-blue-400 text-xs mt-1">Dozier Holdings Group · Founded November 2024 · Houston, TX</p>
        </div>

        {/* Team Members */}
        {TEAM.map((person) => (
          <div key={person.name} className="bg-[#1a3a8f] border border-blue-700 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${person.gradient} flex items-center justify-center text-2xl font-black border-4 ${person.border} shrink-0`}>
                {person.initials}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-2xl font-black text-white">{person.name}</h3>
                  <span className={`text-xs ${person.badge} px-2 py-0.5 rounded-full`}>{person.badgeLabel}</span>
                </div>
                <div className="text-blue-400 text-sm mb-2">{person.org}</div>
                <p className="text-blue-200 text-sm leading-relaxed">{person.bio}</p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  {person.tags.map((tag) => (
                    <span key={tag.label} className={`text-xs ${tag.color} px-3 py-1 rounded-full`}>
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Vision Quote */}
        <div className="bg-gradient-to-br from-blue-900/40 to-[#1530a0] border border-blue-700 rounded-xl p-5 text-center">
          <div className="text-blue-400 text-xs uppercase tracking-widest mb-2">The Vision</div>
          <blockquote className="text-white text-xl font-black leading-relaxed">
            "Every athlete deserves a playbook. We built it."
          </blockquote>
          <div className="text-blue-400 text-sm mt-2">— Chad A. Dozier & Glenn Tse, Founders</div>
        </div>

        {/* Mission */}
        <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-4">
          <h3 className="text-white font-bold mb-3">The Mission</h3>
          <div className="space-y-3">
            {[
              { icon: "🏆", title: "Athlete First", desc: "Every decision we make starts with what's best for the athlete." },
              { icon: "💰", title: "NIL Empowerment", desc: "Helping athletes understand, protect, and maximize their NIL value." },
              { icon: "🤝", title: "Community", desc: "Building the largest network of athletes, coaches, and brands in sports." },
              { icon: "🚀", title: "Innovation", desc: "Using AI and technology to give athletes an unfair advantage." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-[#1530a0] rounded-xl p-3">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <div className="font-bold text-white text-sm">{item.title}</div>
                  <div className="text-blue-400 text-xs">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-4 text-center">
          <div className="text-white font-black text-xl mb-1">Dreams Do Come True</div>
          <div className="text-blue-400 text-sm">2026 · Dozier Holdings Group · Houston, TX</div>
        </div>
      </div>
    </PlatformLayout>
  );
}
