import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";

export default function ScoutWizard() {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [{"title": "\ud83c\udfac Highlight Reel Guide", "items": ["Keep it under 4 minutes", "Best plays in first 30 seconds", "Include game film, not just highlights", "Add your stats overlay"]}, {"title": "\ud83d\udce7 Coach Contact Template", "items": ["Subject: [Sport] [Year] [Position] \u2014 [School]", "Include GPA, test scores, stats", "Attach highlight reel link", "Follow up every 3 weeks"]}, {"title": "\ud83d\udcca Recruiting Profile", "items": ["Height, weight, 40-yard dash", "Academic achievements", "Awards and honors", "Social media handles (clean them up!)"]}, {"title": "\ud83d\uddd3\ufe0f Showcase Calendar", "items": ["Nike/Under Armour camps", "State-level combines", "Position-specific showcases", "College ID camps"]}];
  const tips = ["Coaches watch the first 30 seconds \u2014 make it count", "Email 50+ coaches \u2014 most won't respond, that's normal", "Your GPA is your backup plan AND your selling point"];

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-5 pb-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1a3a8f] to-[#1a2a4a] border border-blue-700 rounded-xl p-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-700 flex items-center justify-center text-3xl">🔭</div>
            <div>
              <h1 className="text-2xl font-black text-white">Scout Wizard</h1>
              <p className="text-blue-300 text-sm">Get discovered by scouts, build highlight reels, contact coaches</p>
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {sections.map((s: { title: string; items: string[] }, i: number) => (
            <button key={i} onClick={() => setActiveSection(i)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border whitespace-nowrap transition-all ${activeSection === i ? "bg-blue-600 border-blue-400 text-white" : "bg-[#1a3a8f] border-blue-800 text-blue-300 hover:border-blue-600"}`}>
              {s.title.split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
        </div>

        {/* Active Section */}
        <Card className="bg-[#1a3a8f] border-blue-800">
          <CardContent className="p-5">
            <h2 className="text-white font-bold text-lg mb-4">{sections[activeSection].title}</h2>
            <div className="space-y-2">
              {sections[activeSection].items.map((item: string, j: number) => (
                <div key={j} className="flex items-center gap-3 bg-[#0d1b3e] rounded-xl p-3">
                  <div className="w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center text-xs font-bold text-white shrink-0">{j + 1}</div>
                  <span className="text-blue-200 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pro Tips */}
        <Card className="bg-gradient-to-r from-yellow-900/30 to-[#1a3a8f] border-yellow-700">
          <CardContent className="p-5">
            <h3 className="text-yellow-400 font-bold mb-3">⚡ Pro Tips</h3>
            <div className="space-y-2">
              {tips.map((tip: string, i: number) => (
                <div key={i} className="flex items-start gap-2 text-sm text-blue-200">
                  <span className="text-yellow-400 mt-0.5 shrink-0">›</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="grid grid-cols-2 gap-3">
          <Button className="bg-blue-600 hover:bg-blue-500 text-white font-bold">
            Save Progress
          </Button>
          <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black">
            Get Expert Help
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
