import PlatformLayout from "@/components/PlatformLayout";
export default function Faith() {
  return (
    <PlatformLayout title="Faith">
      <div className="space-y-4 pb-20 lg:pb-4">
        <div className="bg-gradient-to-r from-[#1a3a8f] to-[#1a2a4a] border border-yellow-600 rounded-xl p-5">
          <div className="flex items-center gap-4">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/mlASPvSCUQZpELyh.png" alt="Faith" className="w-14 h-14 rounded-2xl object-cover shadow-lg" />
            <div>
              <h2 className="text-2xl font-black text-white">FAITH</h2>
              <p className="text-blue-300 text-sm">Daily devotionals, scripture, and spiritual strength for athletes</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-900/40 to-[#1530a0] border border-yellow-700 rounded-xl p-5">
          <div className="text-yellow-400 text-xs uppercase tracking-widest mb-2">Today's Verse</div>
          <blockquote className="text-white text-lg font-semibold leading-relaxed mb-2">
            "I can do all things through Christ who strengthens me."
          </blockquote>
          <div className="text-yellow-400 text-sm">— Philippians 4:13</div>
        </div>
        <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-4">
          <h3 className="text-white font-bold mb-3">Daily Devotionals</h3>
          <div className="space-y-3">
            {[
              { title: "Competing with Purpose", day: "Today", desc: "Understanding why you play and who you play for." },
              { title: "Handling Adversity", day: "Yesterday", desc: "Finding strength in your toughest moments on and off the field." },
              { title: "Team & Brotherhood", day: "2 days ago", desc: "The spiritual foundation of a winning team culture." },
              { title: "Humility in Victory", day: "3 days ago", desc: "Staying grounded when success comes your way." },
            ].map((dev, i) => (
              <div key={i} className="bg-[#1530a0] rounded-xl p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-700 flex items-center justify-center text-lg shrink-0">✝️</div>
                <div className="flex-1">
                  <div className="font-semibold text-white text-sm">{dev.title}</div>
                  <div className="text-blue-400 text-xs">{dev.day} • {dev.desc}</div>
                </div>
                <button className="text-yellow-400 hover:text-white text-xs transition-colors">Read →</button>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-4">
          <h3 className="text-white font-bold mb-3">Prayer Wall</h3>
          <div className="space-y-2 mb-3">
            {["Praying for my team's health this season 🙏", "Thank God for the scholarship opportunity!", "Prayers for all athletes chasing their dreams."].map((prayer, i) => (
              <div key={i} className="bg-[#1530a0] rounded-xl p-3 text-blue-200 text-sm">{prayer}</div>
            ))}
          </div>
          <textarea className="w-full bg-[#1a3a8f] border border-blue-800 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-yellow-500 placeholder-blue-500 h-20 resize-none" placeholder="Share a prayer request or praise report..." />
          <button className="w-full mt-2 bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-2.5 rounded-xl transition-colors">Post to Prayer Wall</button>
        </div>
      </div>
    </PlatformLayout>
  );
}
