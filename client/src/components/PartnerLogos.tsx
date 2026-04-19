import { useState } from "react";
import { Sparkles, Shield, Zap, Globe } from "lucide-react";

interface Partner {
  name: string;
  logo: string;
  description: string;
  badge?: string;
}

const partners: Partner[] = [
  {
    name: "Manus AI",
    logo: "🤖",
    description: "Powering our AI infrastructure",
    badge: "TECHNOLOGY PARTNER",
  },
  {
    name: "Dozier Holdings Group",
    logo: "🦀",
    description: "Parent company & strategic vision",
    badge: "PARENT COMPANY",
  },
  {
    name: "Stripe",
    logo: "💳",
    description: "Secure payment processing",
    badge: "PAYMENTS",
  },
  {
    name: "Hansi Tech",
    logo: "🤖",
    description: "Robot companion technology",
    badge: "ROBOTICS",
  },
];

const upcomingPartners = [
  "ESPN", "Nike", "Under Armour", "Gatorade", "NCAA", "NFL", "NBA", "MLB"
];

export default function PartnerLogos() {
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-slate-900/50 to-blue-950/50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-400/20 px-4 py-2 rounded-full mb-4">
            <Shield className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-sm font-medium">TRUSTED PARTNERS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Industry Leaders</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            We've partnered with the best in technology, sports, and innovation to bring you the ultimate athlete platform.
          </p>
        </div>

        {/* Partner Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredPartner(partner.name)}
              onMouseLeave={() => setHoveredPartner(null)}
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
              
              {/* Card */}
              <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 group-hover:border-cyan-400/50 transition-all text-center h-full">
                {/* Badge */}
                {partner.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                      {partner.badge}
                    </span>
                  </div>
                )}

                {/* Logo */}
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {partner.logo}
                </div>

                {/* Name */}
                <h3 className="text-white font-bold text-lg mb-2">{partner.name}</h3>

                {/* Description */}
                <p className="text-slate-400 text-sm">{partner.description}</p>

                {/* Sparkle on hover */}
                <Sparkles className={`absolute top-4 right-4 w-4 h-4 text-amber-400 transition-opacity ${hoveredPartner === partner.name ? 'opacity-100' : 'opacity-0'}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Partners Marquee */}
        <div className="relative overflow-hidden py-8 border-t border-b border-slate-700/50">
          <div className="text-center mb-6">
            <span className="text-slate-500 text-sm font-medium">COMING SOON</span>
          </div>
          
          <div className="flex items-center justify-center gap-8 flex-wrap opacity-40">
            {upcomingPartners.map((partner, index) => (
              <div key={index} className="flex items-center gap-2 text-slate-400">
                <Globe className="w-4 h-4" />
                <span className="font-medium">{partner}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-400 mb-4">
            Interested in partnering with ATHLYNX?
          </p>
          <a 
            href="mailto:partners@athlynx.ai" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold px-6 py-3 rounded-full transition-all"
          >
            <Zap className="w-4 h-4" />
            Become a Partner
          </a>
        </div>
      </div>
    </div>
  );
}
