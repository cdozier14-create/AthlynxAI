import { Link } from 'wouter';

export function BrandingHeader() {
  return (
    <div className="w-full bg-gradient-to-r from-[#0A1628] via-[#0D1E36] to-[#0A1628] border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Left - Tagline */}
          <div className="hidden md:flex items-center">
            <span className="text-cyan-400 text-xs tracking-[0.2em] font-medium uppercase">
              The Future of Athlete Success
            </span>
          </div>

          {/* Center - Logo and Parent Company */}
          <Link href="/dhg-empire" className="flex items-center gap-3 group">
            {/* DHG Crab Logo */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border border-cyan-400/30 flex items-center justify-center group-hover:border-cyan-400/60 transition-all">
                <img 
                  src="/logos/dhg-crab-logo.png" 
                  alt="DHG" 
                  className="w-7 h-7 object-contain"
                  onError={(e) => {
                    // Fallback to text if image fails
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <span className="hidden text-cyan-400 font-bold text-xs">DHG</span>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Parent Company Badge */}
            <div className="flex flex-col items-start">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">Parent Company</span>
              <span className="text-cyan-400 text-sm font-semibold">Dozier Holdings Group</span>
            </div>
          </Link>

          {/* Right - ATHLYNX Branding */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex flex-col items-end">
              <span className="text-white font-bold text-lg tracking-wide">ATHLYNX</span>
              <span className="text-cyan-400 text-[10px] tracking-[0.15em] uppercase">The Athlete's Playbook</span>
            </div>
          </div>

          {/* Mobile - Just show ATHLYNX */}
          <div className="md:hidden">
            <span className="text-white font-bold text-sm tracking-wide">ATHLYNX</span>
          </div>
        </div>
      </div>
    </div>
  );
}
