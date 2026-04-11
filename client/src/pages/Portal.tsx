import { useState } from "react";
import { Home, Compass, PlusSquare, MessageCircle, User, Heart, MessageSquare, Send, Bookmark, MoreHorizontal } from "lucide-react";

const athletes = [
  { id: 1, name: "Janan Wolte", sport: "Professional Football", deal: "$50K Nike Deal", dealColor: "bg-blue-600" },
  { id: 2, name: "Jonn Allers", sport: "Basketball Player", deal: "$25K Gatorade Partnership", dealColor: "bg-blue-500" },
  { id: 3, name: "Junly Roma", sport: "Soccer Manager", deal: "$15K Local Sponsorship", dealColor: "bg-blue-700" },
  { id: 4, name: "Junly Roma", sport: "Professional Football", deal: "$25K Gatorade Partnership", dealColor: "bg-blue-500" },
];

const stories = [
  { id: 0, name: "Your Story", isOwn: true },
  { id: 1, name: "Joel E." },
  { id: 2, name: "Kyrie I." },
  { id: 3, name: "Tre J." },
  { id: 4, name: "Marco R." },
  { id: 5, name: "Alex T." },
];

type Tab = "home" | "explore" | "create" | "messages" | "profile";

export default function Portal() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto relative shadow-xl">
      {/* Header */}
      <div className="bg-[#1a3a6b] px-4 py-3 flex justify-center items-center sticky top-0 z-50">
        <img src="/crab-logo-official.png" alt="ATHLYNX" className="h-10 w-10 object-contain"
          onError={(e) => { (e.target as HTMLImageElement).src = "/nil-portal-app-logo.jpeg"; }} />
      </div>

      {/* Stories */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex gap-4 overflow-x-auto">
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className={`w-16 h-16 rounded-full border-2 ${story.isOwn ? "border-gray-300" : "border-blue-500"} p-0.5 relative`}>
                <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center">
                  <img src="/crab-logo-official.png" alt={story.name} className="w-10 h-10 object-contain opacity-80"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
                {story.isOwn && (
                  <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                    <span className="text-white text-xs font-bold">+</span>
                  </div>
                )}
              </div>
              <span className="text-xs text-gray-600 truncate w-16 text-center">{story.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feed — 2-column grid matching screenshot */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="grid grid-cols-2">
          {athletes.map((athlete, idx) => (
            <div key={idx} className="border-b border-r border-gray-100">
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center">
                    <img src="/crab-logo-official.png" alt="" className="w-5 h-5 object-contain"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900 leading-tight">{athlete.name}</p>
                    <p className="text-xs text-gray-500 leading-tight">{athlete.sport}</p>
                  </div>
                </div>
                <MoreHorizontal size={14} className="text-gray-400" />
              </div>
              <div className="relative aspect-square bg-gradient-to-br from-blue-900 to-slate-800 overflow-hidden">
                <img src="/professional-athlete-dashboard.png" alt={athlete.name}
                  className="w-full h-full object-cover opacity-60"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                <div className={`absolute bottom-2 left-2 ${athlete.dealColor} text-white text-xs font-bold px-2 py-1 rounded`}>
                  {athlete.deal}
                </div>
              </div>
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2">
                  <button onClick={() => setLiked(prev => ({ ...prev, [idx]: !prev[idx] }))}>
                    <Heart size={16} className={liked[idx] ? "fill-red-500 text-red-500" : "text-gray-700"} />
                  </button>
                  <MessageSquare size={16} className="text-gray-700" />
                  <Send size={16} className="text-gray-700" />
                </div>
                <Bookmark size={16} className="text-gray-700" />
              </div>
              <div className="px-3 pb-3">
                <p className="text-xs text-gray-700 leading-tight">
                  <span className="font-semibold">{athlete.name.toLowerCase().replace(" ", "")}</span>{" "}
                  {athlete.sport} {athlete.deal}.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 flex justify-around items-center py-3 z-50">
        {[
          { tab: "home", icon: Home, label: "Home" },
          { tab: "explore", icon: Compass, label: "Explore" },
          { tab: "create", icon: PlusSquare, label: "Create" },
          { tab: "messages", icon: MessageCircle, label: "Messages" },
          { tab: "profile", icon: User, label: "Profile" },
        ].map(({ tab, icon: Icon, label }) => (
          <button key={tab} onClick={() => setActiveTab(tab as Tab)} className="flex flex-col items-center gap-1">
            <Icon size={24} className={activeTab === tab ? "text-blue-600" : "text-gray-500"} strokeWidth={activeTab === tab ? 2.5 : 1.5} />
            <span className={`text-xs ${activeTab === tab ? "text-blue-600 font-semibold" : "text-gray-500"}`}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
