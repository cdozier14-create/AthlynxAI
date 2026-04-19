import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const ROLES = [
  { value: "athlete", label: "Athlete", emoji: "🏆", desc: "I compete at any level" },
  { value: "parent", label: "Parent / Guardian", emoji: "👨‍👩‍👧", desc: "Supporting my athlete" },
  { value: "coach", label: "Coach", emoji: "📋", desc: "I train and develop athletes" },
  { value: "personal_coach", label: "Personal Coach", emoji: "🦁", desc: "1-on-1 athlete development" },
  { value: "brand", label: "Brand / Sponsor", emoji: "💼", desc: "NIL deals & partnerships" },
  { value: "scout", label: "Scout / Recruiter", emoji: "🔍", desc: "Finding the next star" },
  { value: "agent", label: "Agent / Advisor", emoji: "🤝", desc: "Representing athletes" },
];

const SPORTS = [
  "Football", "Basketball", "Baseball", "Soccer", "Track & Field",
  "Swimming", "Tennis", "Golf", "Volleyball", "Wrestling",
  "Lacrosse", "Hockey", "Softball", "Cross Country", "Gymnastics",
  "Boxing", "MMA", "Fishing", "Rugby", "Cycling", "Other"
];

const STEPS = ["Your Role", "Your Info", "Verify", "Welcome"];

export default function EarlyAccess() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(0);
  const [role, setRole] = useState("");
  const [sport, setSport] = useState("");
  const [form, setForm] = useState({ fullName: "", email: "", phone: "" });
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "ATHLYNX — Join the MVP Platform";
  }, []);

  const sendCodeMutation = trpc.verification.sendCode.useMutation();
  const verifyCodeMutation = trpc.verification.verifyCode.useMutation();
  const joinWaitlistMutation = trpc.waitlist.join.useMutation();
  const trackSignup = trpc.crm.trackSignup.useMutation();

  async function handleSendCode() {
    if (!form.fullName.trim()) { setError("Please enter your full name."); return; }
    if (!form.email.trim()) { setError("Please enter your email."); return; }
    setLoading(true); setError("");
    try {
      const res = await sendCodeMutation.mutateAsync({
        email: form.email,
        phone: form.phone || undefined,
        type: "signup",
        name: form.fullName.trim() || undefined,
      });
      if (res.success) {
        toast.success("Verification code sent! Check your email" + (form.phone ? " and phone." : "."));
        setStep(2);
      } else {
        setError(res.error || "Failed to send code. Try again.");
      }
    } catch (e: any) {
      setError(e.message || "Failed to send code.");
    }
    setLoading(false);
  }

  async function handleVerify() {
    if (!code || code.length !== 6) { setError("Enter the 6-digit code."); return; }
    setLoading(true); setError("");
    try {
      const res = await verifyCodeMutation.mutateAsync({ email: form.email, code });
      if (res.valid) {
        await joinWaitlistMutation.mutateAsync({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone || undefined,
          role: role as any,
          sport: sport || undefined,
        });
        trackSignup.mutate({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone || undefined,
          role,
          sport: sport || undefined,
          signupType: "waitlist",
          referralSource: document.referrer || "direct",
          utmSource: new URLSearchParams(window.location.search).get("utm_source") || undefined,
          utmMedium: new URLSearchParams(window.location.search).get("utm_medium") || undefined,
          utmCampaign: new URLSearchParams(window.location.search).get("utm_campaign") || undefined,
        });
        setStep(3);
      } else {
        setError(res.error || "Invalid code. Please try again.");
      }
    } catch (e: any) {
      setError(e.message || "Verification failed.");
    }
    setLoading(false);
  }

  const showSportDropdown = role === "athlete" || role === "coach";

  return (
    <div className="min-h-screen bg-[#050d1a] flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-[-10%] w-[700px] h-[700px] bg-blue-700/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[80px]" />
      </div>

      {/* Logo */}
      <div className="relative z-10 mb-8 text-center">
        <div className="inline-flex items-center gap-3 mb-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-400 flex items-center justify-center shadow-2xl shadow-blue-500/50">
            <span className="text-white font-black text-2xl">A</span>
          </div>
          <div>
            <div className="text-4xl font-black text-white tracking-widest leading-none">ATHLYNX</div>
            <div className="text-cyan-400 text-xs font-bold tracking-[0.3em]">THE ATHLETE'S PLAYBOOK</div>
          </div>
        </div>
        <div className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-green-900/70 to-emerald-900/70 border border-green-500/50 rounded-full px-5 py-2 shadow-lg shadow-green-900/30">
          <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-sm shadow-green-400" />
          <span className="text-green-300 text-xs font-black tracking-widest">7 DAYS FREE — NO CREDIT CARD NEEDED</span>
        </div>
      </div>

      {/* Step indicator */}
      <div className="relative z-10 flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${
              i < step ? "bg-green-500 text-white shadow-md shadow-green-500/40" :
              i === step ? "bg-blue-500 text-white shadow-lg shadow-blue-500/60 ring-2 ring-blue-400/30" :
              "bg-[#1a2a4a] text-blue-700"
            }`}>
              {i < step ? "✓" : i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-8 h-0.5 transition-all duration-500 ${i < step ? "bg-green-500" : "bg-[#1a2a4a]"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-[#0a1628]/95 border border-blue-900/60 rounded-3xl p-8 shadow-2xl shadow-blue-900/40 backdrop-blur-md">

        {/* STEP 0: Choose Role */}
        {step === 0 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-1">Who Are You?</h2>
            <p className="text-blue-400 text-sm mb-6">Every MVP starts here. Select your role to get started.</p>
            <div className="grid grid-cols-1 gap-2.5">
              {ROLES.map(r => (
                <button
                  key={r.value}
                  onClick={() => setRole(r.value)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left group ${
                    role === r.value
                      ? "border-blue-500 bg-blue-900/50 shadow-lg shadow-blue-500/20"
                      : "border-blue-900/40 bg-[#0d1f3c]/60 hover:border-blue-700 hover:bg-[#0d1f3c]"
                  }`}
                >
                  <span className="text-2xl w-8 text-center">{r.emoji}</span>
                  <div className="flex-1">
                    <div className="text-white font-bold text-sm">{r.label}</div>
                    <div className="text-blue-500 text-xs">{r.desc}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    role === r.value ? "border-blue-400 bg-blue-500" : "border-blue-800"
                  }`}>
                    {role === r.value && <span className="text-white text-xs">✓</span>}
                  </div>
                </button>
              ))}
            </div>

            {showSportDropdown && (
              <div className="mt-4">
                <label className="text-blue-300 text-xs font-bold uppercase tracking-wider mb-2 block">Your Sport</label>
                <select
                  value={sport}
                  onChange={e => setSport(e.target.value)}
                  className="w-full bg-[#0d1f3c] border-2 border-blue-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 appearance-none"
                >
                  <option value="">Select your sport...</option>
                  {SPORTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            )}

            <button
              onClick={() => {
                if (!role) { setError("Please select your role."); return; }
                setError(""); setStep(1);
              }}
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black py-4 rounded-2xl text-lg shadow-xl shadow-blue-600/30 transition-all active:scale-[0.98]"
            >
              CONTINUE →
            </button>
            {error && <p className="text-red-400 text-sm mt-3 text-center">{error}</p>}
          </div>
        )}

        {/* STEP 1: Your Info */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-1">Create Your Profile</h2>
            <p className="text-blue-400 text-sm mb-6">
              Joining as a <span className="text-cyan-400 font-bold capitalize">{ROLES.find(r => r.value === role)?.label}</span>. Let's set up your MVP account.
            </p>
            <div className="space-y-4">
              <div>
                <label className="text-blue-300 text-xs font-bold uppercase tracking-wider mb-2 block">Full Name *</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                  placeholder="Your full name"
                  className="w-full bg-[#0d1f3c] border-2 border-blue-900 text-white rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-blue-500 placeholder-blue-800 transition-colors"
                />
              </div>
              <div>
                <label className="text-blue-300 text-xs font-bold uppercase tracking-wider mb-2 block">Email Address *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="your@email.com"
                  className="w-full bg-[#0d1f3c] border-2 border-blue-900 text-white rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-blue-500 placeholder-blue-800 transition-colors"
                />
              </div>
              <div>
                <label className="text-blue-300 text-xs font-bold uppercase tracking-wider mb-2 block">
                  Phone Number <span className="text-blue-700 font-normal normal-case">(optional — for SMS code)</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-[#0d1f3c] border-2 border-blue-900 text-white rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-blue-500 placeholder-blue-800 transition-colors"
                />
              </div>
            </div>
            <button
              onClick={handleSendCode}
              disabled={loading}
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-50 text-white font-black py-4 rounded-2xl text-lg shadow-xl shadow-blue-600/30 transition-all active:scale-[0.98]"
            >
              {loading ? "SENDING CODE..." : "SEND VERIFICATION CODE →"}
            </button>
            <button onClick={() => { setError(""); setStep(0); }} className="mt-3 w-full text-blue-600 text-sm hover:text-blue-400 transition-colors">← Back</button>
            {error && <p className="text-red-400 text-sm mt-3 text-center">{error}</p>}
          </div>
        )}

        {/* STEP 2: Verify */}
        {step === 2 && (
          <div>
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">📲</div>
              <h2 className="text-2xl font-black text-white mb-2">Check Your {form.phone ? "Phone & Email" : "Email"}</h2>
              <p className="text-blue-400 text-sm">
                We sent a 6-digit code to{" "}
                <span className="text-cyan-400 font-bold">{form.email}</span>
                {form.phone ? <><br />and <span className="text-cyan-400 font-bold">{form.phone}</span></> : ""}
              </p>
            </div>
            <div>
              <label className="text-blue-300 text-xs font-bold uppercase tracking-wider mb-2 block text-center">Enter Your Code</label>
              <input
                type="text"
                inputMode="numeric"
                value={code}
                onChange={e => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="000000"
                maxLength={6}
                className="w-full bg-[#0d1f3c] border-2 border-blue-800 text-white rounded-2xl px-4 py-5 text-4xl font-black text-center tracking-[0.6em] focus:outline-none focus:border-blue-500 placeholder-blue-900 transition-colors"
              />
            </div>
            <button
              onClick={handleVerify}
              disabled={loading || code.length !== 6}
              className="mt-6 w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 disabled:opacity-50 text-white font-black py-4 rounded-2xl text-lg shadow-xl shadow-green-600/30 transition-all active:scale-[0.98]"
            >
              {loading ? "VERIFYING..." : "VERIFY & JOIN →"}
            </button>
            <button
              onClick={() => { setCode(""); setError(""); handleSendCode(); }}
              className="mt-3 w-full text-blue-600 text-sm hover:text-blue-400 transition-colors"
            >
              Resend code
            </button>
            {error && <p className="text-red-400 text-sm mt-3 text-center">{error}</p>}
          </div>
        )}

        {/* STEP 3: Welcome */}
        {step === 3 && (
          <div className="text-center">
            <div className="text-7xl mb-4 animate-bounce">🏆</div>
            <h2 className="text-3xl font-black text-white mb-2">Welcome, MVP!</h2>
            <p className="text-blue-300 text-sm mb-4">
              <span className="text-cyan-400 font-bold">{form.fullName}</span>, you're officially in the game.
            </p>
            <div className="bg-gradient-to-r from-green-900/60 to-emerald-900/60 border border-green-500/50 rounded-2xl p-5 mb-6 shadow-lg shadow-green-900/20">
              <div className="text-green-300 font-black text-xl mb-1">🎉 7 FREE DAYS ACTIVATED</div>
              <div className="text-green-400/80 text-sm">Full access to all ATHLYNX tools — AI Trainers, Teammates & Companions, NIL Portal, Transfer Portal, and more.</div>
            </div>
            <div className="space-y-2.5 mb-6 text-left">
              {[
                { icon: "📧", text: "Welcome email sent to " + form.email },
                ...(form.phone ? [{ icon: "📱", text: "Welcome SMS sent to " + form.phone }] : []),
                { icon: "🤖", text: "Your AI Trainer is ready to work" },
                { icon: "🤝", text: "AI Teammates & Companions unlocked" },
                { icon: "💰", text: "NIL Portal access activated" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-[#0d1f3c]/80 border border-blue-900/40 rounded-xl px-4 py-3">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-blue-200 text-sm">{item.text}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setLocation("/home")}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black py-4 rounded-2xl text-lg shadow-xl shadow-blue-600/30 transition-all active:scale-[0.98] mb-3"
            >
              ENTER THE PLATFORM →
            </button>
            <button
              onClick={() => setLocation("/pricing")}
              className="w-full text-blue-500 text-sm hover:text-blue-300 transition-colors"
            >
              View plans & AI Credits →
            </button>
          </div>
        )}
      </div>

      {/* Trust bar */}
      {step < 3 && (
        <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-4 text-blue-700 text-xs">
          <span className="flex items-center gap-1.5"><span className="text-blue-500">🔒</span> Secure & Private</span>
          <span className="flex items-center gap-1.5"><span className="text-green-500">⚡</span> 7 Days Free</span>
          <span className="flex items-center gap-1.5"><span className="text-yellow-500">🏆</span> 20+ Tools</span>
          <span className="flex items-center gap-1.5"><span className="text-cyan-500">🤝</span> Cancel Anytime</span>
        </div>
      )}

      {step < 3 && (
        <p className="relative z-10 mt-4 text-blue-700 text-sm">
          Already a member?{" "}
          <a href="/signin" className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors">Sign In</a>
        </p>
      )}

      <p className="relative z-10 mt-6 text-blue-900 text-xs text-center">
        © 2026 ATHLYNX AI Corporation · A Dozier Holdings Group Company
      </p>
    </div>
  );
}
