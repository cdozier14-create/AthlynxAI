import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useToast } from "@/hooks/use-toast";
import { Phone } from "lucide-react";

const SPORTS = [
  "Football", "Basketball", "Baseball", "Soccer", "Track & Field",
  "Swimming", "Wrestling", "Tennis", "Golf", "Volleyball",
  "Hockey", "Lacrosse", "Softball", "Cross Country", "Other"
];

const POSITIONS_BY_SPORT: Record<string, string[]> = {
  Football: ["QB", "RB", "WR", "TE", "OL", "DL", "LB", "CB", "S", "K/P"],
  Basketball: ["PG", "SG", "SF", "PF", "C"],
  Baseball: ["P", "C", "1B", "2B", "3B", "SS", "OF", "DH"],
  Soccer: ["GK", "CB", "LB", "RB", "CDM", "CM", "CAM", "LW", "RW", "ST"],
  "Track & Field": ["Sprints", "Distance", "Hurdles", "Jumps", "Throws", "Multi-Event"],
  Swimming: ["Freestyle", "Backstroke", "Breaststroke", "Butterfly", "IM"],
  Wrestling: ["125", "133", "141", "149", "157", "165", "174", "184", "197", "HWT"],
  Tennis: ["Singles", "Doubles", "Both"],
  Golf: ["Individual"],
  Volleyball: ["S", "OH", "MB", "RS", "L", "DS"],
  Hockey: ["G", "D", "LW", "C", "RW"],
  Lacrosse: ["A", "M", "D", "G", "LSM", "FOGO"],
  Softball: ["P", "C", "1B", "2B", "3B", "SS", "OF"],
  "Cross Country": ["Distance"],
  Other: ["Athlete"],
};

const CLASS_YEARS = ["2025", "2026", "2027", "2028", "2029", "Graduate", "Professional", "Alumni"];

interface OnboardingModalProps {
  onComplete: () => void;
}

export default function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    sport: "",
    position: "",
    school: "",
    classYear: "",
    state: "",
    recruitingStatus: "available" as "available" | "committed" | "signed" | "transferred",
  });
  const [phone, setPhone] = useState("");
  const { toast } = useToast();
  const utils = trpc.useUtils();

  const savePhone = trpc.auth.savePhone.useMutation();

  const updateProfile = trpc.profile.updateProfile.useMutation({
    onSuccess: () => {
      utils.profile.getMyProfile.invalidate();
      setStep(4);
    },
    onError: () => {
      toast({ title: "Error", description: "Could not save profile. Please try again.", variant: "destructive" });
    },
  });

  const handleSubmit = () => {
    updateProfile.mutate(form);
  };

  const handlePhoneSubmit = () => {
    if (phone.replace(/\D/g, "").length >= 10) {
      savePhone.mutate({ phone }, {
        onSettled: () => {
          toast({ title: "Welcome to ATHLYNX!", description: "Your profile is live. Let's get to work." });
          onComplete();
        },
      });
    } else {
      toast({ title: "Welcome to ATHLYNX!", description: "Your profile is live. Let's get to work." });
      onComplete();
    }
  };

  const positions = form.sport ? (POSITIONS_BY_SPORT[form.sport] ?? ["Athlete"]) : [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg mx-4 bg-[#0d1b3e] border border-blue-700 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0066ff] to-[#00c2ff] px-6 py-4">
          <div className="flex items-center gap-3">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/qUknrdlyPrUZJQYo.png"
              alt="ATHLYNX"
              className="w-10 h-10 rounded-lg"
            />
            <div>
              <h2 className="text-white font-black text-xl">Welcome to ATHLYNX</h2>
              <p className="text-blue-100 text-sm">Set up your athlete profile to get started</p>
            </div>
          </div>
          {/* Progress */}
          <div className="flex gap-2 mt-4">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all ${s <= step ? "bg-white" : "bg-white/30"}`}
              />
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="px-6 py-6">
          {step === 1 && (
            <div>
              <h3 className="text-white font-bold text-lg mb-1">What sport do you play?</h3>
              <p className="text-blue-400 text-sm mb-4">Select your primary sport</p>
              <div className="grid grid-cols-3 gap-2">
                {SPORTS.map((sport) => (
                  <button
                    key={sport}
                    onClick={() => setForm({ ...form, sport, position: "" })}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      form.sport === sport
                        ? "bg-[#0066ff] text-white"
                        : "bg-[#1a3a8f] text-blue-300 hover:bg-blue-800"
                    }`}
                  >
                    {sport}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-white font-bold text-lg mb-1">What's your position?</h3>
              <p className="text-blue-400 text-sm mb-4">Select your position in {form.sport}</p>
              <div className="grid grid-cols-4 gap-2 mb-6">
                {positions.map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setForm({ ...form, position: pos })}
                    className={`px-3 py-2 rounded-lg text-sm font-bold transition-all ${
                      form.position === pos
                        ? "bg-[#0066ff] text-white"
                        : "bg-[#1a3a8f] text-blue-300 hover:bg-blue-800"
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>
              <div>
                <label className="text-blue-300 text-sm font-semibold block mb-1">Class Year</label>
                <div className="grid grid-cols-4 gap-2">
                  {CLASS_YEARS.map((yr) => (
                    <button
                      key={yr}
                      onClick={() => setForm({ ...form, classYear: yr })}
                      className={`px-3 py-2 rounded-lg text-sm font-bold transition-all ${
                        form.classYear === yr
                          ? "bg-[#00c2ff] text-[#0a0f1e]"
                          : "bg-[#1a3a8f] text-blue-300 hover:bg-blue-800"
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 className="text-white font-bold text-lg mb-1">Get your welcome text</h3>
              <p className="text-blue-400 text-sm mb-6">Add your phone number to receive updates, alerts, and your welcome message from ATHLYNX.</p>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 555-5555"
                  className="w-full bg-[#1a3a8f] text-white rounded-lg pl-10 pr-4 py-3 border border-blue-700 focus:outline-none focus:border-blue-400 placeholder-blue-500 text-lg"
                />
              </div>
              <p className="text-blue-600 text-xs mt-3">US numbers only. Standard messaging rates apply. You can update this in your profile settings.</p>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-white font-bold text-lg mb-1">Where do you play?</h3>
              <p className="text-blue-400 text-sm mb-4">Your school and recruiting status</p>
              <div className="space-y-4">
                <div>
                  <label className="text-blue-300 text-sm font-semibold block mb-1">School / University</label>
                  <input
                    type="text"
                    value={form.school}
                    onChange={(e) => setForm({ ...form, school: e.target.value })}
                    placeholder="e.g. University of Texas"
                    className="w-full bg-[#1a3a8f] text-white rounded-lg px-4 py-2.5 border border-blue-700 focus:outline-none focus:border-blue-400 placeholder-blue-500"
                  />
                </div>
                <div>
                  <label className="text-blue-300 text-sm font-semibold block mb-1">State</label>
                  <input
                    type="text"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    placeholder="e.g. Texas"
                    className="w-full bg-[#1a3a8f] text-white rounded-lg px-4 py-2.5 border border-blue-700 focus:outline-none focus:border-blue-400 placeholder-blue-500"
                  />
                </div>
                <div>
                  <label className="text-blue-300 text-sm font-semibold block mb-1">Recruiting Status</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["available", "committed", "signed", "transferred"] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => setForm({ ...form, recruitingStatus: status })}
                        className={`px-3 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                          form.recruitingStatus === status
                            ? "bg-[#0066ff] text-white"
                            : "bg-[#1a3a8f] text-blue-300 hover:bg-blue-800"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex items-center justify-between">
          {step > 1 && step < 4 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-blue-400 hover:text-white transition-colors text-sm font-semibold"
            >
              ← Back
            </button>
          ) : step === 4 ? (
            <button
              onClick={() => { toast({ title: "Welcome to ATHLYNX!", description: "Your profile is live. Let's get to work." }); onComplete(); }}
              className="px-4 py-2 text-blue-500 hover:text-blue-300 transition-colors text-sm"
            >
              Skip
            </button>
          ) : (
            <button
              onClick={onComplete}
              className="px-4 py-2 text-blue-500 hover:text-blue-300 transition-colors text-sm"
            >
              Skip for now
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={step === 1 && !form.sport}
              className="px-6 py-2.5 bg-[#0066ff] hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors"
            >
              Next →
            </button>
          ) : step === 3 ? (
            <button
              onClick={handleSubmit}
              disabled={updateProfile.isPending}
              className="px-6 py-2.5 bg-gradient-to-r from-[#0066ff] to-[#00c2ff] hover:opacity-90 disabled:opacity-40 text-white font-black rounded-lg transition-opacity"
            >
              {updateProfile.isPending ? "Saving..." : "Next →"}
            </button>
          ) : (
            <button
              onClick={handlePhoneSubmit}
              disabled={savePhone.isPending}
              className="px-6 py-2.5 bg-gradient-to-r from-[#0066ff] to-[#00c2ff] hover:opacity-90 disabled:opacity-40 text-white font-black rounded-lg transition-opacity"
            >
              {savePhone.isPending ? "Saving..." : "Launch My Profile 🚀"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
