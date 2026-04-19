import { useState, useEffect, useRef } from "react";
import { Trophy, Users, DollarSign, Building2, Star, Zap } from "lucide-react";

interface StatItem {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const stats: StatItem[] = [
  {
    icon: <Users className="w-8 h-8" />,
    value: 10000,
    suffix: "+",
    label: "Athletes Empowered",
    color: "from-cyan-400 to-blue-500",
  },
  {
    icon: <DollarSign className="w-8 h-8" />,
    value: 50,
    suffix: "M+",
    label: "NIL Deals Facilitated",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    value: 500,
    suffix: "+",
    label: "Brand Partners",
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: <Trophy className="w-8 h-8" />,
    value: 98,
    suffix: "%",
    label: "Satisfaction Rate",
    color: "from-amber-400 to-orange-500",
  },
];

function AnimatedNumber({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, inView]);

  return (
    <span className="tabular-nums">
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
}

export default function AnimatedStats() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-cyan-400/20 px-4 py-2 rounded-full mb-4">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium">BY THE NUMBERS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">ATHLYNX</span> Impact
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Join thousands of athletes who are already maximizing their NIL potential with our platform.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`relative group ${inView ? 'animate-in fade-in slide-in-from-bottom-4' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`} />
              
              {/* Card */}
              <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 group-hover:border-cyan-400/50 transition-all">
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white mb-4`}>
                  {stat.icon}
                </div>

                {/* Value */}
                <div className="text-3xl md:text-4xl font-black text-white mb-2">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={inView} />
                </div>

                {/* Label */}
                <p className="text-slate-400 text-sm">{stat.label}</p>

                {/* Decorative star */}
                <Star className="absolute top-4 right-4 w-4 h-4 text-amber-400/50 group-hover:text-amber-400 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-400 text-sm">
            <span className="text-cyan-400 font-semibold">Updated in real-time</span> • Data as of January 2026
          </p>
        </div>
      </div>
    </div>
  );
}
