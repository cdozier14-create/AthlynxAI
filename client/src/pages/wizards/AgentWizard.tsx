import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";

export default function AgentWizard() {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [{"title": "\ud83d\udd0d Finding an Agent", "items": ["NFLPA/NBPA certified agents only", "Check disciplinary history", "Ask for client references", "Verify track record in your sport"]}, {"title": "\ud83d\udcc4 Agent Contract Terms", "items": ["Standard commission: 3-5% NFL, 4% NBA", "Contract length: 1-2 years max", "Termination clause: 30-day notice", "Expense reimbursement limits"]}, {"title": "\u26a0\ufe0f Agent Red Flags", "items": ["Upfront fees before signing", "Guarantees of specific contracts", "Pressure to sign immediately", "No verifiable client list"]}, {"title": "\ud83d\udcde Working With Your Agent", "items": ["Weekly check-in calls", "All offers in writing", "Understand every deal before signing", "Keep your own copies of everything"]}];
  const tips = ["You can fire your agent at any time \u2014 know your rights", "NCAA athletes: be careful about agent contact rules", "The best agents have relationships, not just promises"];

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-5 pb-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1a3a8f] to-[#1a2a4a] border border-blue-700 rounded-xl p-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-700 flex items-center justify-center text-3xl">🤝</div>
            <div>
              <h1 className="text-2xl font-black text-white">Agent Wizard</h1>
              <p className="text-blue-300 text-sm">Find, evaluate, and work with sports agents and advisors</p>
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
