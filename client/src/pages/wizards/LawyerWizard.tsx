import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";

export default function LawyerWizard() {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [{"title": "\ud83d\udcc4 Contract Review Checklist", "items": ["Exclusivity clauses", "Payment terms and schedule", "Termination conditions", "IP ownership rights"]}, {"title": "\ud83d\udee1\ufe0f NIL Agreement Essentials", "items": ["Usage rights for your likeness", "Social media posting requirements", "Revenue share percentages", "Morality clauses"]}, {"title": "\u26a0\ufe0f Red Flags to Watch", "items": ["Unlimited exclusivity periods", "No payment cap clauses", "Vague deliverable language", "Missing termination rights"]}, {"title": "\ud83d\udcde When to Get a Lawyer", "items": ["Any deal over $1,000", "Endorsement agreements", "Scholarship modifications", "Transfer portal disputes"]}];
  const tips = ["Never sign a contract same day \u2014 take 48 hours", "Get everything in writing, even verbal agreements", "Your university compliance office is a free resource"];

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-5 pb-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1a3a8f] to-[#1a2a4a] border border-blue-700 rounded-xl p-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-700 flex items-center justify-center text-3xl">⚖️</div>
            <div>
              <h1 className="text-2xl font-black text-white">Lawyer Wizard</h1>
              <p className="text-blue-300 text-sm">Understand contracts, NIL agreements, and your legal rights</p>
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
