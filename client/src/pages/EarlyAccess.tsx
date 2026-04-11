import { useState, useEffect } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function EarlyAccess() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [sport, setSport] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "ATHLYNX.AI - The Athlete's Playbook";
  }, []);

  // Send verification code
  const sendCode = trpc.verification.sendCode.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        setShowVerification(true);
        toast.success("Verification code sent! Check your email and phone.");
      } else {
        toast.error(data.error || "Failed to send code");
      }
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send code");
      setIsSubmitting(false);
    },
  });

  // Verify code and create account
  const verify = trpc.verification.verifyCode.useMutation({
    onSuccess: async (data) => {
      if (data.valid) {
        // Code verified! Now create waitlist entry
        await joinWaitlist.mutateAsync({
          fullName,
          email,
          phone,
          role: role.toLowerCase() as "athlete" | "parent" | "coach" | "brand",
          sport,
        });
      } else {
        toast.error(data.error || "Invalid code");
        setIsSubmitting(false);
      }
    },
    onError: (error) => {
      toast.error(error.message || "Verification failed");
      setIsSubmitting(false);
    },
  });

  // CRM tracking mutation
  const trackSignup = trpc.crm.trackSignup.useMutation();

  // Join waitlist after verification
  const joinWaitlist = trpc.waitlist.join.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        trackSignup.mutate({
          fullName,
          email,
          phone,
          role: role.toLowerCase(),
          sport,
          signupType: "waitlist",
          referralSource: document.referrer || "direct",
          utmSource: new URLSearchParams(window.location.search).get("utm_source") || undefined,
          utmMedium: new URLSearchParams(window.location.search).get("utm_medium") || undefined,
          utmCampaign: new URLSearchParams(window.location.search).get("utm_campaign") || undefined,
        });
        
        setSubmitted(true);
        toast.success("🎉 Welcome to ATHLYNX! Check your email for your VIP code!");
        setFullName("");
        setEmail("");
        setPhone("");
        setRole("");
        setSport("");
        setVerificationCode("");
        setShowVerification(false);
      } else {
        toast.error(data.error || "Something went wrong");
      }
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName) { toast.error("Please enter your full name"); return; }
    if (!email) { toast.error("Please enter your email"); return; }
    if (!phone) { toast.error("Please enter your phone number"); return; }
    if (!role) { toast.error("Please select your role"); return; }
    if (!sport) { toast.error("Please select your sport"); return; }
    
    setIsSubmitting(true);
    sendCode.mutate({ email, phone, type: "signup" });
  };

  const handleVerify = () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error("Please enter the 6-digit code");
      return;
    }
    setIsSubmitting(true);
    verify.mutate({ email, code: verificationCode });
  };

  const roles = ["Athlete", "Parent", "Coach", "Brand"];
  const sports = ["Baseball", "Football", "Basketball", "Soccer", "Track & Field", "Volleyball", "Other"];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* SIMPLE HEADER - MOBILE OPTIMIZED */}
      <header className="bg-slate-900 border-b border-slate-700 px-4 py-3">
        <div className="flex items-center justify-center">
          <img 
            src="/athlynx-playbook-logo.png" 
            alt="ATHLYNX" 
            className="h-12"
          />
        </div>
        <div className="flex items-center justify-center gap-2 mt-2 text-xs text-white">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            LIVE
          </span>
          <span className="text-slate-500">•</span>
          <span>HIPAA COMPLIANT</span>
        </div>
      </header>

      {/* MAIN CONTENT - MOBILE FIRST */}
      <main className="px-4 py-6">
        
        {/* STEP 1: VIP SIGNUP - FIRST THING USERS SEE */}
        <section className="mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="text-center mb-4">
              <h1 className="text-slate-900 font-black text-xl mb-1">JOIN THE VIP WAITLIST</h1>
              <p className="text-blue-600 text-sm">Get early access to all 10 apps</p>
            </div>
            
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="text-slate-900 font-bold text-xl mb-2">You're In!</h2>
                <p className="text-slate-600 mb-4">Check your email for your VIP code</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-blue-600 underline text-sm"
                >
                  Sign up another person
                </button>
              </div>
            ) : showVerification ? (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-slate-600 mb-4">
                    We sent a 6-digit code to:<br />
                    <strong>{email}</strong> and <strong>{phone}</strong>
                  </p>
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full bg-slate-100 border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 text-center text-2xl font-bold tracking-widest"
                  maxLength={6}
                />
                <button
                  onClick={handleVerify}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? "VERIFYING..." : "VERIFY & JOIN"}
                </button>
                <button
                  onClick={() => setShowVerification(false)}
                  className="w-full text-slate-600 text-sm underline"
                >
                  ← Back to form
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-100 border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 text-base"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-100 border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 text-base"
                />
                <input
                  type="tel"
                  inputMode="tel"
                  placeholder="Phone Number (with country code)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-100 border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 text-base"
                />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-100 border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 text-base"
                >
                  <option value="">Select Your Role</option>
                  {roles.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <select
                  value={sport}
                  onChange={(e) => setSport(e.target.value)}
                  className="w-full bg-slate-100 border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 text-base"
                >
                  <option value="">Select Your Sport</option>
                  {sports.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? "SENDING CODE..." : "CLAIM MY VIP SPOT"}
                </button>
              </form>
            )}
            
            <p className="text-slate-400 text-xs text-center mt-4">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </section>

        {/* STEP 2: ALREADY HAVE VIP CODE */}
        <section className="mb-6">
          <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700">
            <h2 className="text-white font-bold text-center mb-2">Already Have a VIP Code?</h2>
            <Link href="/portal">
              <button className="w-full bg-white text-slate-900 font-bold py-3 rounded-xl">
                LOGIN TO PORTAL
              </button>
            </Link>
          </div>
        </section>

        {/* APPS PREVIEW */}
        <section className="mb-6">
          <h2 className="text-white font-black text-xl text-center mb-4">THE COMPLETE ATHLETE ECOSYSTEM</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Portal", icon: "/apps/portal.png", badge: "LIVE" },
              { name: "Messenger", icon: "/apps/messenger.png", badge: "LIVE" },
              { name: "Diamond Grind", icon: "/apps/diamond-grind.png", badge: "NEW" },
              { name: "Warriors Playbook", icon: "/apps/warriors-playbook.png", badge: "HOT" },
              { name: "Transfer Portal", icon: "/apps/transfer-portal.png", badge: "ELITE" },
              { name: "NIL Vault", icon: "/apps/nil-vault.png", badge: "$$$" },
              { name: "AI Sales", icon: "/apps/ai-sales.png", badge: "AI" },
              { name: "Faith", icon: "/apps/faith.png", badge: "BLESSED" },
              { name: "AI Recruiter", icon: "/apps/ai-recruiter.png", badge: "AI" },
              { name: "AI Content", icon: "/apps/ai-content.png", badge: "AI" },
            ].map((app, idx) => (
              <div key={idx} className="bg-slate-800 rounded-xl p-4 text-center border border-slate-700">
                <img src={app.icon} alt={app.name} className="w-16 h-16 mx-auto mb-2" />
                <p className="text-white font-bold text-sm">{app.name}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                  {app.badge}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center text-slate-400 text-xs py-6">
          <p className="mb-2">© 2026 ATHLYNX AI Corporation</p>
          <p className="mb-2">A Dozier Holdings Group Company</p>
          <p>Dreams Do Come True 2026 🏆</p>
        </footer>
      </main>
    </div>
  );
}
