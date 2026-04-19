import { useEffect, useState } from "react";
import { Link, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

/**
 * ATHLYNX PAYMENT SUCCESS PAGE
 * A DOZIER HOLDINGS GROUP COMPANY
 * 
 * "Dreams Do Come True" - Chad Allen Dozier Sr.
 */

export default function PaymentSuccess() {
  const searchString = useSearch();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    // Parse session_id from URL
    const params = new URLSearchParams(searchString);
    const sid = params.get("session_id");
    setSessionId(sid);

    // Celebration confetti!
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#00d4ff', '#0066ff', '#ff6600', '#ffcc00'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#00d4ff', '#0066ff', '#ff6600', '#ffcc00'],
      });
    }, 250);

    return () => clearInterval(interval);
  }, [searchString]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-bounce">
            <span className="text-6xl">✓</span>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-5xl md:text-6xl font-black mb-4">
          <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Welcome to the Family!
          </span>
        </h1>

        <p className="text-xl text-slate-300 mb-8">
          Your payment was successful. You're now part of the ATHLYNX empire!
        </p>

        {/* Quote */}
        <div className="bg-slate-800/50 rounded-2xl p-6 mb-8 border border-cyan-500/30">
          <p className="text-2xl italic text-cyan-400 mb-2">
            "Dreams Do Come True"
          </p>
          <p className="text-slate-400">— Chad Allen Dozier Sr., Founder</p>
        </div>

        {/* What's Next */}
        <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-2xl p-8 mb-8 border border-cyan-500/20">
          <h2 className="text-2xl font-bold text-white mb-4">🚀 What's Next?</h2>
          <ul className="text-left space-y-3 text-slate-300">
            <li className="flex items-start gap-3">
              <span className="text-green-400">✓</span>
              <span>Complete your athlete profile to get discovered</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400">✓</span>
              <span>Upload your highlight videos</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400">✓</span>
              <span>Connect with brands for NIL opportunities</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400">✓</span>
              <span>Join the community and start networking</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/portal">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-6 text-lg font-bold rounded-xl">
              Go to Dashboard
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-6 text-lg rounded-xl">
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Session ID for reference */}
        {sessionId && (
          <p className="mt-8 text-xs text-slate-500">
            Transaction ID: {sessionId.slice(0, 20)}...
          </p>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <p className="text-slate-500 text-sm">
            A Dozier Holdings Group Company • Powered by Manus AI
          </p>
        </div>
      </div>
    </div>
  );
}
