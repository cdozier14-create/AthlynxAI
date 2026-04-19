import { Link } from "wouter";
import { Mail, Phone, Linkedin, Globe, MapPin, Building2, Download, Camera } from "lucide-react";

const leadership = [
  {
    name: "Chad Allen Dozier Sr.",
    title: "Founder/CEO/Chief Imagineer",
    company: "Dozier Holdings Group",
    responsibilities: "Vision, Strategy, Investor Relations",
    bio: "Founder and visionary leader driving the ATHLYNX platform from concept to market. Former collegiate athlete at Mississippi State University. Building the future of athlete success through technology and NIL opportunities.",
    email: "cdozier14@athlynx.ai",
    phone: "+1 (601) 498-5282",
    whatsapp: "+1 (601) 498-5282",
    wechat: "ChadDozier14",
    facebook: "https://www.facebook.com/chad.dozier.2025",
    twitter: "https://twitter.com/ATHLYNX",
    instagram: "https://instagram.com/athlynx",
    youtube: "https://youtube.com/@ATHLYNX",
    tiktok: "https://tiktok.com/@athlynx",
    location: "Laurel, Mississippi",
    linkedin: "https://www.linkedin.com/in/chad-a-dozier-494391136",
    website: "athlynx.ai",
    initials: "CD",
    gradient: "from-cyan-500 to-blue-600",
    role: "founder",
    photo: "/images/chad-dozier-ceo.png",
  },
  {
    name: "Glenn Tse",
    title: "CFO & COO/Chief Imagineer",
    company: "Dozier Holdings Group",
    responsibilities: "Finance, Operations, Legal Coordination",
    bio: "Oversees all financial operations, legal entity formation, and day-to-day business operations. Based in Hong Kong with extensive experience in international business development and cross-border partnerships.",
    email: "gtse@dozierholdingsgroup.com",
    phoneUSA: "+1 (832) 620-6389",
    phoneHK: "+852 9832-1292",
    phoneChina: "+86 136-0906-1766",
    location: "Hong Kong",
    linkedin: "linkedin.com/in/glenntse",
    initials: "GT",
    gradient: "from-amber-500 to-orange-600",
    role: "executive",
    photo: "/images/glenn-tse-cfo.png",
    chineseName: "謝文傑",
  },
];

const executives = [
  {
    name: "Andy Kustes",
    title: "VP of Technology",
    responsibilities: "Product Development, Engineering, Patents",
    bio: "Leads all technology initiatives including platform development, patent filings, and technical architecture.",
    initials: "AK",
  },
  {
    name: "Lee Marshall",
    title: "VP of Sales & Partnerships",
    responsibilities: "Sales, Brand Partnerships, Trademarks",
    bio: "Drives revenue through brand partnerships and athlete onboarding. Manages trademark protection.",
    initials: "LM",
  },
  {
    name: "Jimmy Boyd",
    title: "VP of Real Estate",
    responsibilities: "Real Estate, Strategic Partnerships",
    bio: "Manages Softmor datacenter real estate strategy and site selection.",
    initials: "JB",
  },
];

const advisors = [
  {
    name: "David R. Ford Sr.",
    title: "Trusted Advisor (Uncle)",
    expertise: "Business Development & Operations",
    initials: "DF",
  },
  {
    name: "Lee Crisp",
    title: "Industry Advisor",
    expertise: "Sports Industry & NIL Compliance",
    initials: "LC",
  },
];

const boardStructure = [
  { seat: "Seat 1", holder: "Chad Allen Dozier Sr.", role: "Founder/CEO/Chief Imagineer - Chairman" },
  { seat: "Seat 2", holder: "Glenn Tse", role: "CFO & COO/Chief Imagineer - Board Member" },
  { seat: "Seat 3", holder: "TBD", role: "Independent Director (Industry Expert)" },
  { seat: "Seat 4", holder: "TBD", role: "Investor Representative - Post Series A" },
  { seat: "Seat 5", holder: "TBD", role: "Independent Director (Finance/Governance)" },
];

// Generate vCard content
function generateVCard(person: typeof leadership[0]): string {
  const isGlenn = person.name === "Glenn Tse";
  
  let vcard = `BEGIN:VCARD
VERSION:3.0
N:${person.name.split(' ').reverse().join(';')}
FN:${person.name}
ORG:${person.company}
TITLE:${person.title}
EMAIL;TYPE=WORK:${person.email}
`;

  if (isGlenn) {
    vcard += `TEL;TYPE=WORK,VOICE:${person.phoneUSA}
TEL;TYPE=CELL:${person.phoneHK}
TEL;TYPE=HOME:${person.phoneChina}
`;
  } else {
    vcard += `TEL;TYPE=WORK,VOICE:${person.phone}
`;
  }

  vcard += `ADR;TYPE=WORK:;;${person.location};;;;
URL:https://${person.linkedin}
`;

  if (person.website) {
    vcard += `URL:https://${person.website}
`;
  }

  vcard += `NOTE:${person.responsibilities}
END:VCARD`;

  return vcard;
}

// Download vCard file
function downloadVCard(person: typeof leadership[0]) {
  const vcard = generateVCard(person);
  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${person.name.replace(/\s+/g, '_')}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// E-Card Component for Leadership
function ECard({ person }: { person: typeof leadership[0] }) {
  const isGlenn = person.name === "Glenn Tse";
  
  return (
    <div className="relative group">
      {/* Main Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-[1.02]">
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r ${person.gradient} p-6 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative flex items-center gap-4">
            {/* Avatar - Photo or Initials */}
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/30 shadow-xl overflow-hidden relative group/avatar">
              {person.photo ? (
                <img src={person.photo} alt={person.name} className="w-full h-full object-cover" />
              ) : (
                <>
                  <span className="text-4xl font-black text-white">{person.initials}</span>
                  {/* Photo upload hint */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white/80" />
                  </div>
                </>
              )}
            </div>
            {/* Name & Title */}
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">{person.name}</h3>
              <p className="text-white/90 font-semibold text-lg">{person.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <Building2 className="w-4 h-4 text-white/70" />
                <span className="text-white/70 text-sm">{person.company}</span>
              </div>
            </div>
          </div>
          {/* DHG Logo watermark */}
          <div className="absolute top-4 right-4 opacity-30">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/AzsuZOzvfgvscIdI.png" alt="DHG" className="w-16 h-16 rounded-lg" />
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Bio */}
          <p className="text-white/70 text-sm leading-relaxed">{person.bio}</p>
          
          {/* Responsibilities */}
          <div className="bg-black/30 rounded-xl px-4 py-3">
            <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">Responsibilities</p>
            <p className="text-white/80 text-sm">{person.responsibilities}</p>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 pt-2">
            {/* Email */}
            <a href={`mailto:${person.email}`} className="flex items-center gap-3 text-white/70 hover:text-cyan-400 transition-colors group/link">
              <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center group-hover/link:bg-cyan-500/20 transition-colors">
                <Mail className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-sm">{person.email}</span>
            </a>

            {/* Phone(s) */}
            {isGlenn ? (
              <div className="space-y-2">
                <a href={`tel:${person.phoneUSA}`} className="flex items-center gap-3 text-white/70 hover:text-cyan-400 transition-colors group/link">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center group-hover/link:bg-cyan-500/20 transition-colors">
                    <Phone className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="text-sm">
                    <span className="text-white/50 text-xs">USA: </span>
                    {person.phoneUSA}
                  </div>
                </a>
                <a href={`tel:${person.phoneHK}`} className="flex items-center gap-3 text-white/70 hover:text-cyan-400 transition-colors group/link pl-[52px]">
                  <div className="text-sm">
                    <span className="text-white/50 text-xs">HK: </span>
                    {person.phoneHK}
                  </div>
                </a>
                <a href={`tel:${person.phoneChina}`} className="flex items-center gap-3 text-white/70 hover:text-cyan-400 transition-colors group/link pl-[52px]">
                  <div className="text-sm">
                    <span className="text-white/50 text-xs">China: </span>
                    {person.phoneChina}
                  </div>
                </a>
              </div>
            ) : (
              <a href={`tel:${person.phone}`} className="flex items-center gap-3 text-white/70 hover:text-cyan-400 transition-colors group/link">
                <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center group-hover/link:bg-cyan-500/20 transition-colors">
                  <Phone className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-sm">{person.phone}</span>
              </a>
            )}

            {/* Location */}
            <div className="flex items-center gap-3 text-white/70">
              <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-sm">{person.location}</span>
            </div>

            {/* LinkedIn */}
            <a href={`https://${person.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-cyan-400 transition-colors group/link">
              <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center group-hover/link:bg-cyan-500/20 transition-colors">
                <Linkedin className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-sm">{person.linkedin}</span>
            </a>

            {/* Website (Chad only) */}
            {person.website && (
              <a href={`https://${person.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-cyan-400 transition-colors group/link">
                <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center group-hover/link:bg-cyan-500/20 transition-colors">
                  <Globe className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-sm">{person.website}</span>
              </a>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/AzsuZOzvfgvscIdI.png" alt="DHG" className="w-8 h-8 rounded" />
              <div>
                <p className="text-white/50 text-xs">Parent Company</p>
                <p className="text-cyan-400 text-sm font-semibold">Dozier Holdings Group</p>
              </div>
            </div>
            <button 
              onClick={() => downloadVCard(person)}
              className="flex items-center gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
            >
              <Download className="w-4 h-4" />
              Save Contact
            </button>
          </div>
        </div>
      </div>

      {/* Glow effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${person.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}></div>
    </div>
  );
}

export default function Team() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0d1f3c 50%, #061424 100%)' }}>
      {/* Header */}
      <div className="text-center py-12 border-b border-cyan-500/20">
        <Link href="/dhg">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-cyan-500/30 rounded-full px-4 py-2 mb-6 cursor-pointer hover:bg-slate-800/80 transition-colors">
            <span className="text-white/60 text-sm">← Back to DHG</span>
          </div>
        </Link>
        <div className="flex items-center justify-center gap-4 mb-4">
          <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/AzsuZOzvfgvscIdI.png" alt="DHG" className="w-20 h-20 rounded-full border-4 border-cyan-400/50" />
        </div>
        <h1 className="text-5xl font-black text-white mb-2">LEADERSHIP TEAM</h1>
        <p className="text-cyan-400 text-xl font-bold uppercase tracking-wider">Dozier Holdings Group</p>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-10">
        {/* Leadership E-Cards */}
        <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-8">Executive Leadership</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {leadership.map((person) => (
            <ECard key={person.name} person={person} />
          ))}
        </div>

        {/* Other Executives */}
        <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-6">Executive Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {executives.map((exec) => (
            <div key={exec.name} className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">{exec.initials}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{exec.name}</h3>
                  <p className="text-cyan-400 font-semibold text-sm">{exec.title}</p>
                </div>
              </div>
              <div className="bg-black/30 rounded-lg px-3 py-2 mb-3">
                <p className="text-white/70 text-xs">{exec.responsibilities}</p>
              </div>
              <p className="text-white/50 text-sm">{exec.bio}</p>
            </div>
          ))}
        </div>

        {/* Advisors */}
        <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-6">Advisory Board</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {advisors.map((advisor) => (
            <div key={advisor.name} className="bg-slate-900/80 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{advisor.initials}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{advisor.name}</h3>
                  <p className="text-amber-400 font-semibold text-sm">{advisor.title}</p>
                  <p className="text-white/50 text-sm">{advisor.expertise}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Board of Directors */}
        <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-6">Board of Directors (Planned)</h2>
        <div className="bg-slate-900/80 border border-white/10 rounded-2xl overflow-hidden mb-12">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-cyan-400 font-semibold text-sm py-4 px-6">Seat</th>
                <th className="text-left text-cyan-400 font-semibold text-sm py-4 px-6">Holder</th>
                <th className="text-left text-cyan-400 font-semibold text-sm py-4 px-6">Role</th>
              </tr>
            </thead>
            <tbody>
              {boardStructure.map((seat) => (
                <tr key={seat.seat} className="border-b border-white/5">
                  <td className="text-white font-semibold py-4 px-6">{seat.seat}</td>
                  <td className="text-white py-4 px-6">{seat.holder}</td>
                  <td className="text-white/60 py-4 px-6">{seat.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Contact */}
        <div className="text-center bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 rounded-2xl p-8">
          <h2 className="text-2xl font-black text-white mb-2">Connect With Our Team</h2>
          <p className="text-white/70 mb-6">Interested in joining or partnering with Dozier Holdings Group?</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/careers">
              <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl transition-colors">
                View Careers
              </button>
            </Link>
            <Link href="/investor-deck">
              <button className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3 rounded-xl border border-white/20 transition-colors">
                Investor Deck
              </button>
            </Link>
            <Link href="/partner-portal">
              <button className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3 rounded-xl border border-white/20 transition-colors">
                Partner Portal
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 border-t border-white/10 mt-10">
        <p className="text-white/50 text-sm">© 2025 Dozier Holdings Group, LLC. All Rights Reserved.</p>
      </div>
    </div>
  );
}
