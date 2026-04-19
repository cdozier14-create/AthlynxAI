import { Link } from "wouter";

interface ComingSoonProps {
  title: string;
  description: string;
  icon: string;
}

export default function ComingSoon({ title, description, icon }: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-8">
        {/* Icon */}
        <div className="text-8xl">{icon}</div>
        
        {/* Title */}
        <h1 className="text-5xl font-bold text-yellow-400">{title}</h1>
        
        {/* Description */}
        <p className="text-xl text-gray-300">{description}</p>
        
        {/* Coming Soon Badge */}
        <div className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 px-8 py-4 rounded-full shadow-2xl">
          <p className="text-black font-bold text-2xl">COMING SOON</p>
        </div>
        
        {/* Launch Date */}
        <div className="space-y-2">
          <p className="text-cyan-400 text-lg font-medium">Launching February 1, 2026</p>
          <p className="text-gray-400">Join the VIP waitlist to get early access</p>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link href="/">
            <a className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold px-8 py-4 rounded-full text-lg shadow-xl shadow-cyan-500/30 transition-all">
              Join VIP Waitlist
            </a>
          </Link>
          <Link href="/home">
            <a className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-4 rounded-full text-lg border border-cyan-500/30 transition-all">
              Explore Platform
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
