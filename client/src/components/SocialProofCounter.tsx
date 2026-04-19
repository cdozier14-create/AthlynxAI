import { useState, useEffect } from "react";
import { Users, TrendingUp, Clock, Zap } from "lucide-react";

interface CounterProps {
  baseCount?: number;
}

export default function SocialProofCounter({ baseCount = 847 }: CounterProps) {
  const [count, setCount] = useState(baseCount);
  const [recentSignup, setRecentSignup] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  // Simulated recent signups for social proof
  const recentNames = [
    "Marcus J. from Texas",
    "Sarah K. from California",
    "DeShawn M. from Florida",
    "Emily R. from Ohio",
    "Jordan T. from Georgia",
    "Aaliyah W. from New York",
    "Chris B. from Alabama",
    "Maya L. from Michigan",
    "Tyler S. from Pennsylvania",
    "Jasmine H. from North Carolina",
  ];

  useEffect(() => {
    // Increment counter randomly every 30-90 seconds
    const incrementInterval = setInterval(() => {
      const shouldIncrement = Math.random() > 0.3;
      if (shouldIncrement) {
        setCount(prev => prev + 1);
        
        // Show notification
        const randomName = recentNames[Math.floor(Math.random() * recentNames.length)];
        setRecentSignup(randomName);
        setShowNotification(true);
        
        setTimeout(() => setShowNotification(false), 4000);
      }
    }, Math.random() * 60000 + 30000); // 30-90 seconds

    return () => clearInterval(incrementInterval);
  }, []);

  // Animate count on mount
  const [displayCount, setDisplayCount] = useState(0);
  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const increment = count / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= count) {
        setDisplayCount(count);
        clearInterval(timer);
      } else {
        setDisplayCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  // Update display when count changes
  useEffect(() => {
    setDisplayCount(count);
  }, [count]);

  return (
    <div className="relative">
      {/* Main Counter */}
      <div className="bg-gradient-to-r from-green-900/80 to-emerald-900/80 backdrop-blur-sm rounded-2xl p-6 border border-green-400/30 shadow-xl">
        <div className="flex items-center justify-center gap-4">
          <div className="p-3 bg-green-400/20 rounded-full animate-pulse">
            <Users className="w-8 h-8 text-green-400" />
          </div>
          
          <div className="text-center">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-white tabular-nums">
                {displayCount.toLocaleString()}
              </span>
              <TrendingUp className="w-6 h-6 text-green-400 animate-bounce" />
            </div>
            <p className="text-green-400 font-medium text-sm tracking-wide">
              ATHLETES ALREADY SIGNED UP
            </p>
          </div>

          <div className="flex items-center gap-1 bg-green-400/20 px-3 py-1 rounded-full">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-xs font-bold">LIVE</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-green-400/20">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">50+</p>
            <p className="text-slate-400 text-xs">States</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">25+</p>
            <p className="text-slate-400 text-xs">Sports</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">$2M+</p>
            <p className="text-slate-400 text-xs">NIL Potential</p>
          </div>
        </div>
      </div>

      {/* Recent Signup Notification */}
      {showNotification && recentSignup && (
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="bg-slate-800 text-white px-4 py-2 rounded-full shadow-xl border border-cyan-400/30 flex items-center gap-2 whitespace-nowrap">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm">
              <strong>{recentSignup}</strong> just joined!
            </span>
            <Clock className="w-3 h-3 text-slate-400" />
            <span className="text-xs text-slate-400">Just now</span>
          </div>
        </div>
      )}
    </div>
  );
}
