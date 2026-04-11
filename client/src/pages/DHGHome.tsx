import { DollarSign, Calendar, TrendingUp, Film, Users, Heart } from "lucide-react";

const features = [
  { icon: DollarSign, title: "NIL Deals & Contracts", desc: "Manage sponsorships, endorsement agreements, and track earnings from NIL activities." },
  { icon: Calendar, title: "Calendar & Events", desc: "Schedule upcoming games, training sessions, media appearances, and personal commitments." },
  { icon: TrendingUp, title: "Performance Data", desc: "Analyze game statistics, training metrics, and track progress over time." },
  { icon: Film, title: "Media Library", desc: "Access and manage personal photos, game highlights, press kits, and media appearances." },
  { icon: Users, title: "Professional Network", desc: "Connect with agents, coaches, teammates, and industry professionals." },
  { icon: Heart, title: "Health & Wellness", desc: "Monitor medical records, recovery plans, nutrition logs, and mental health resources." },
];

export default function DHGHome() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1a3a6b] py-6 px-6 flex items-center gap-4">
        <img src="/crab-logo-official.png" alt="ATHLYNX" className="h-12 w-12 object-contain"
          onError={(e) => { (e.target as HTMLImageElement).src = "/nil-portal-app-logo.jpeg"; }} />
        <div>
          <h1 className="text-2xl font-black text-white tracking-widest uppercase">Career Command Center</h1>
          <p className="text-blue-300 text-sm">Dozier Holdings Group — ATHLYNX Platform</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow cursor-pointer border border-gray-100">
              <div className="bg-blue-50 rounded-full p-4 mb-4">
                <f.icon size={36} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a href="/portal" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-xl text-lg transition-colors shadow-lg">
            Enter NIL Portal
          </a>
          <p className="mt-4 text-gray-500 text-sm">Dreams Do Come True — ATHLYNX 2026</p>
        </div>
      </div>
    </div>
  );
}
