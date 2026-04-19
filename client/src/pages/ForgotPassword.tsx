import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, ArrowLeft, Mail, CheckCircle, Lock, Eye, EyeOff } from "lucide-react";

const CDN = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/qUknrdlyPrUZJQYo.png";

type Step = "email" | "code" | "newPassword" | "done";

export default function ForgotPassword() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const sendCodeMutation = trpc.verification.sendCode.useMutation();
  const verifyCodeMutation = trpc.verification.verifyCode.useMutation();
  const resetPasswordMutation = trpc.auth.resetPassword.useMutation({
    onSuccess: () => setStep("done"),
    onError: (err: any) => setError(err.message || "Failed to reset password."),
  });

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim()) { setError("Please enter your email address."); return; }
    setLoading(true);
    try {
      const res = await sendCodeMutation.mutateAsync({
        email,
        type: "password_reset",
      });
      if (res.success) {
        setStep("code");
      } else {
        setError(res.error || "Failed to send reset code. Please try again.");
      }
    } catch (e: any) {
      setError(e.message || "Failed to send reset code.");
    }
    setLoading(false);
  }

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!code || code.length !== 6) { setError("Please enter the 6-digit code."); return; }
    setLoading(true);
    try {
      const res = await verifyCodeMutation.mutateAsync({ email, code });
      if (res.valid) {
        setStep("newPassword");
      } else {
        setError(res.error || "Invalid or expired code. Please try again.");
      }
    } catch (e: any) {
      setError(e.message || "Verification failed.");
    }
    setLoading(false);
  }

  function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!newPassword || newPassword.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (newPassword !== confirmPassword) { setError("Passwords do not match."); return; }
    resetPasswordMutation.mutate({ email, code, newPassword });
  }

  return (
    <div className="min-h-screen bg-[#050c1a] flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <Link href="/">
        <div className="flex items-center gap-3 mb-8 cursor-pointer">
          <img
            src={`${CDN}/crab-logo_e4eb935b.png`}
            alt="DHG"
            className="w-10 h-10 rounded-xl object-cover"
          />
          <span className="text-white font-black text-xl tracking-widest">ATHLYNX</span>
        </div>
      </Link>

      <div className="w-full max-w-md">
        <div className="bg-[#0a1628] border border-white/10 rounded-2xl p-8 shadow-2xl">

          {/* Step: Email */}
          {step === "email" && (
            <>
              <div className="mb-6 text-center">
                <div className="w-14 h-14 bg-[#00c2ff]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-7 h-7 text-[#00c2ff]" />
                </div>
                <h1 className="text-2xl font-black text-white mb-2">Reset Your Password</h1>
                <p className="text-white/50 text-sm">
                  Enter your email address and we'll send you a 6-digit reset code.
                </p>
              </div>
              <form onSubmit={handleSendCode} className="space-y-4">
                {error && (
                  <div className="bg-red-900/30 border border-red-700/50 text-red-300 text-sm rounded-xl px-4 py-3">
                    {error}
                  </div>
                )}
                <div>
                  <label className="text-white/70 text-xs font-semibold uppercase tracking-wide block mb-1">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="athlete@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-[#00c2ff]/50 h-11"
                    autoComplete="email"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-[#00c2ff] to-[#0066ff] hover:from-[#00b0e8] hover:to-[#0055dd] text-white font-black text-base shadow-2xl shadow-[#00c2ff]/30 transition-all hover:scale-[1.02]"
                  disabled={loading}
                >
                  {loading ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending Code...</>
                  ) : (
                    "Send Reset Code"
                  )}
                </Button>
              </form>
            </>
          )}

          {/* Step: Verify Code */}
          {step === "code" && (
            <>
              <div className="mb-6 text-center">
                <div className="w-14 h-14 bg-[#00c2ff]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-7 h-7 text-[#00c2ff]" />
                </div>
                <h1 className="text-2xl font-black text-white mb-2">Check Your Email</h1>
                <p className="text-white/50 text-sm">
                  We sent a 6-digit code to <span className="text-[#00c2ff]">{email}</span>.
                  Enter it below to continue.
                </p>
              </div>
              <form onSubmit={handleVerifyCode} className="space-y-4">
                {error && (
                  <div className="bg-red-900/30 border border-red-700/50 text-red-300 text-sm rounded-xl px-4 py-3">
                    {error}
                  </div>
                )}
                <div>
                  <label className="text-white/70 text-xs font-semibold uppercase tracking-wide block mb-1">
                    6-Digit Code
                  </label>
                  <Input
                    type="text"
                    placeholder="123456"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-[#00c2ff]/50 h-11 text-center text-2xl tracking-[0.5em] font-mono"
                    maxLength={6}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-[#00c2ff] to-[#0066ff] hover:from-[#00b0e8] hover:to-[#0055dd] text-white font-black text-base shadow-2xl shadow-[#00c2ff]/30 transition-all hover:scale-[1.02]"
                  disabled={loading}
                >
                  {loading ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying...</>
                  ) : (
                    "Verify Code"
                  )}
                </Button>
                <button
                  type="button"
                  onClick={() => { setStep("email"); setCode(""); setError(""); }}
                  className="w-full text-white/40 hover:text-white/70 text-sm transition-colors"
                >
                  ← Use a different email
                </button>
              </form>
            </>
          )}

          {/* Step: New Password */}
          {step === "newPassword" && (
            <>
              <div className="mb-6 text-center">
                <div className="w-14 h-14 bg-[#00c2ff]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-7 h-7 text-[#00c2ff]" />
                </div>
                <h1 className="text-2xl font-black text-white mb-2">Create New Password</h1>
                <p className="text-white/50 text-sm">
                  Choose a strong password for your ATHLYNX account.
                </p>
              </div>
              <form onSubmit={handleResetPassword} className="space-y-4">
                {error && (
                  <div className="bg-red-900/30 border border-red-700/50 text-red-300 text-sm rounded-xl px-4 py-3">
                    {error}
                  </div>
                )}
                <div>
                  <label className="text-white/70 text-xs font-semibold uppercase tracking-wide block mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Min 8 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-[#00c2ff]/50 h-11 pr-10"
                      autoComplete="new-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-white/70 text-xs font-semibold uppercase tracking-wide block mb-1">
                    Confirm New Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-[#00c2ff]/50 h-11"
                    autoComplete="new-password"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-[#00c2ff] to-[#0066ff] hover:from-[#00b0e8] hover:to-[#0055dd] text-white font-black text-base shadow-2xl shadow-[#00c2ff]/30 transition-all hover:scale-[1.02]"
                  disabled={resetPasswordMutation.isPending}
                >
                  {resetPasswordMutation.isPending ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Resetting Password...</>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </form>
            </>
          )}

          {/* Step: Done */}
          {step === "done" && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h1 className="text-2xl font-black text-white mb-2">Password Reset!</h1>
              <p className="text-white/50 text-sm mb-6">
                Your password has been successfully updated. You can now sign in with your new password.
              </p>
              <Link href="/signin">
                <Button className="w-full h-12 bg-gradient-to-r from-[#00c2ff] to-[#0066ff] hover:from-[#00b0e8] hover:to-[#0055dd] text-white font-black text-base shadow-2xl shadow-[#00c2ff]/30 transition-all hover:scale-[1.02]">
                  Sign In to ATHLYNX
                </Button>
              </Link>
            </div>
          )}

          {/* Back to sign in */}
          {step !== "done" && (
            <div className="mt-6 text-center">
              <Link href="/signin">
                <span className="text-white/40 hover:text-white/70 text-sm cursor-pointer transition-colors inline-flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" />
                  Back to Sign In
                </span>
              </Link>
            </div>
          )}
        </div>

        <p className="text-white/20 text-xs text-center mt-4">
          ATHLYNX · A Dozier Holdings Group Company · Houston, TX
        </p>
      </div>
    </div>
  );
}
