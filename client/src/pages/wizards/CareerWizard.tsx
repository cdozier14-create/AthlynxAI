import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";

const STEPS = [
  { id: 1, title: "Your Sport & Level", emoji: "🏆" },
  { id: 2, title: "Career Goals", emoji: "🎯" },
  { id: 3, title: "Timeline", emoji: "📅" },
  { id: 4, title: "Your Playbook", emoji: "📖" },
];

const GOALS = [
  "Play Division I", "Go Pro / Draft", "Earn Full Scholarship", "Transfer to Better Program",
  "Compete Internationally", "Become a Coach", "NIL Brand Deals", "Graduate Debt-Free",
];

const SPORTS = ["Football", "Basketball", "Baseball", "Soccer", "Track & Field", "Swimming", "Wrestling", "Volleyball", "Golf", "Hockey"];
const LEVELS = ["High School", "JUCO", "Division III", "Division II", "Division I", "Professional"];

export default function CareerWizard() {
  const [step, setStep] = useState(0);
  const [sport, setSport] = useState("");
  const [level, setLevel] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [gradYear, setGradYear] = useState("2026");
  const [done, setDone] = useState(false);

  const toggleGoal = (g: string) => {
    setSelectedGoals(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-5 pb-10">
        <div className="bg-gradient-to-r from-[#1a3a8f] to-[#1a2a4a] border border-blue-700 rounded-xl p-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-700 flex items-center justify-center text-3xl">🏆</div>
            <div>
              <h1 className="text-2xl font-black text-white">Career Wizard</h1>
              <p className="text-blue-300 text-sm">Build your personalized athletic career playbook</p>
            </div>
          </div>
        </div>
        {!done && (
          <div className="flex items-center gap-2">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${i <= step ? "bg-blue-600 text-white" : "bg-[#1a3a8f] text-blue-400"}`}>
                  {i < step ? "✓" : s.emoji}
                </div>
                {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 ${i < step ? "bg-blue-600" : "bg-blue-900"}`} />}
              </div>
            ))}
          </div>
        )}
        {!done && step === 0 && (
          <Card className="bg-[#1a3a8f] border-blue-800">
            <CardContent className="p-5 space-y-4">
              <h2 className="text-white font-bold text-lg">What sport do you play?</h2>
              <div className="grid grid-cols-2 gap-2">
                {SPORTS.map(s => (
                  <button key={s} onClick={() => setSport(s)}
                    className={`py-2.5 px-3 rounded-xl text-sm font-semibold border transition-all ${sport === s ? "bg-blue-600 border-blue-400 text-white" : "bg-[#0d1b3e] border-blue-900 text-blue-300 hover:border-blue-600"}`}>
                    {s}
                  </button>
                ))}
              </div>
              <h2 className="text-white font-bold text-lg mt-4">Current level?</h2>
              <div className="grid grid-cols-2 gap-2">
                {LEVELS.map(l => (
                  <button key={l} onClick={() => setLevel(l)}
                    className={`py-2.5 px-3 rounded-xl text-sm font-semibold border transition-all ${level === l ? "bg-yellow-600 border-yellow-400 text-white" : "bg-[#0d1b3e] border-blue-900 text-blue-300 hover:border-blue-600"}`}>
                    {l}
                  </button>
                ))}
              </div>
              <Button onClick={() => setStep(1)} disabled={!sport || !level} className="w-full bg-blue-600 hover:bg-blue-500 mt-2">
                Next: Set Your Goals →
              </Button>
            </CardContent>
          </Card>
        )}
        {!done && step === 1 && (
          <Card className="bg-[#1a3a8f] border-blue-800">
            <CardContent className="p-5 space-y-4">
              <h2 className="text-white font-bold text-lg">Select your career goals <span className="text-blue-400 text-sm font-normal">(pick all that apply)</span></h2>
              <div className="grid grid-cols-2 gap-2">
                {GOALS.map(g => (
                  <button key={g} onClick={() => toggleGoal(g)}
                    className={`py-2.5 px-3 rounded-xl text-sm font-semibold border transition-all text-left ${selectedGoals.includes(g) ? "bg-blue-600 border-blue-400 text-white" : "bg-[#0d1b3e] border-blue-900 text-blue-300 hover:border-blue-600"}`}>
                    {selectedGoals.includes(g) ? "✓ " : ""}{g}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" onClick={() => setStep(0)} className="flex-1 border-blue-700 text-blue-300">← Back</Button>
                <Button onClick={() => setStep(2)} disabled={selectedGoals.length === 0} className="flex-1 bg-blue-600 hover:bg-blue-500">Next: Timeline →</Button>
              </div>
            </CardContent>
          </Card>
        )}
        {!done && step === 2 && (
          <Card className="bg-[#1a3a8f] border-blue-800">
            <CardContent className="p-5 space-y-4">
              <h2 className="text-white font-bold text-lg">When do you graduate / go pro?</h2>
              <div className="grid grid-cols-3 gap-2">
                {["2025", "2026", "2027", "2028", "2029", "2030"].map(y => (
                  <button key={y} onClick={() => setGradYear(y)}
                    className={`py-3 rounded-xl text-sm font-bold border transition-all ${gradYear === y ? "bg-yellow-600 border-yellow-400 text-white" : "bg-[#0d1b3e] border-blue-900 text-blue-300 hover:border-blue-600"}`}>
                    {y}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1 border-blue-700 text-blue-300">← Back</Button>
                <Button onClick={() => { setStep(3); setDone(true); }} className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black">Generate My Playbook 🚀</Button>
              </div>
            </CardContent>
          </Card>
        )}
        {done && (
          <div className="space-y-4">
            <Card className="bg-gradient-to-r from-yellow-900/40 to-blue-900 border-yellow-600">
              <CardContent className="p-5">
                <div className="text-yellow-400 text-xs uppercase tracking-widest mb-1">Your Career Playbook</div>
                <h2 className="text-white text-2xl font-black mb-1">{sport} Athlete — {level}</h2>
                <p className="text-blue-300 text-sm">Target Year: {gradYear}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedGoals.map(g => <Badge key={g} className="bg-blue-700 text-white">{g}</Badge>)}
                </div>
              </CardContent>
            </Card>
            {[
              { title: "📋 Immediate Actions (Next 30 Days)", items: ["Update your ATHLYNX athlete profile", "Upload highlight reel to Scout Hub", "Connect with 3 coaches in your target schools", "Set up NIL profile if eligible"] },
              { title: "🎯 6-Month Milestones", items: ["Attend 2 showcases / combines", "Apply to 5 scholarship opportunities", "Build your personal brand on social media", "Schedule meetings with NIL advisors"] },
              { title: "🏆 Long-Term Goals", items: selectedGoals.map(g => `Achieve: ${g}`) },
            ].map((section, i) => (
              <Card key={i} className="bg-[#1a3a8f] border-blue-800">
                <CardContent className="p-4">
                  <h3 className="text-white font-bold mb-3">{section.title}</h3>
                  <div className="space-y-2">
                    {section.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-3 bg-[#0d1b3e] rounded-xl p-2.5">
                        <div className="w-5 h-5 rounded-full border-2 border-blue-600 flex items-center justify-center shrink-0">
                          <div className="w-2 h-2 rounded-full bg-blue-600" />
                        </div>
                        <span className="text-blue-200 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button onClick={() => { setStep(0); setDone(false); setSport(""); setLevel(""); setSelectedGoals([]); }}
              variant="outline" className="w-full border-blue-700 text-blue-300">↺ Start Over</Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
