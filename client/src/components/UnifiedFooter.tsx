import { Link } from "wouter";
import { 
  Linkedin, Facebook, Twitter, Instagram, Youtube, 
  MessageCircle, MessageSquare, Mail, Phone, Globe,
  Music2
} from "lucide-react";

const footerLinks = {
  platform: [
    { name: "VIP Access", href: "/" },
    { name: "Athlete Dashboard", href: "/athlete-dashboard" },
    { name: "NIL Marketplace", href: "/nil-marketplace" },
    { name: "Transfer Portal", href: "/transfer-portal" },
    { name: "Messages", href: "/messages" },
  ],
  apps: [
    { name: "NIL Portal", href: "/nil-portal" },
    { name: "Diamond Grind", href: "/diamond-grind" },
    { name: "All Apps", href: "/apps" },
    { name: "Quick Links Hub", href: "/hub" },
  ],
  company: [
    { name: "DHG Empire", href: "/dhg-empire" },
    { name: "Softmor Inc", href: "/softmor" },
    { name: "Team", href: "/team" },
    { name: "Investor Hub", href: "/investor-hub" },
    { name: "Careers", href: "/careers" },
  ],
  resources: [
    { name: "Founder Story", href: "/founder-story" },
    { name: "Founder Dedication", href: "/founder-dedication" },
    { name: "Pricing", href: "/pricing-tiers" },
    { name: "Store", href: "/store" },
    { name: "Legal & Compliance", href: "/legal" },
  ],
};

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/chad-a-dozier-494391136", icon: Linkedin, color: "hover:text-blue-400" },
  { name: "Facebook", href: "https://www.facebook.com/chad.dozier.2025", icon: Facebook, color: "hover:text-blue-500" },
  { name: "Twitter", href: "https://twitter.com/ATHLYNX", icon: Twitter, color: "hover:text-sky-400" },
  { name: "Instagram", href: "https://instagram.com/athlynx", icon: Instagram, color: "hover:text-pink-400" },
  { name: "YouTube", href: "https://youtube.com/@ATHLYNX", icon: Youtube, color: "hover:text-red-500" },
  { name: "TikTok", href: "https://tiktok.com/@athlynx", icon: Music2, color: "hover:text-pink-500" },
  { name: "WhatsApp", href: "https://wa.me/16014985282", icon: MessageCircle, color: "hover:text-green-400" },
  { name: "WeChat", href: "#", icon: MessageSquare, color: "hover:text-green-500", id: "ChadDozier14" },
];

export default function UnifiedFooter() {
  return (
    <footer className="bg-slate-950 border-t border-white/10 py-12 px-5">
      <div className="max-w-6xl mx-auto">
        {/* Logo and tagline */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-10">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center gap-3 mb-3">
              <img src="/logos/dhg-crab-logo.png" alt="DHG" className="w-12 h-12 rounded-full" />
              <span className="text-2xl font-black text-white">ATHLYNX</span>
            </div>
            <p className="text-white/50 text-sm max-w-xs mb-4">The Complete Athlete Ecosystem. One platform for NIL deals, training, recruiting, and more.</p>
            <p className="text-cyan-400 text-xs font-bold">♾️ PERPETUAL MOTION - THE ENGINE THAT NEVER STOPS</p>
            
            {/* Social Media Links */}
            <div className="flex flex-wrap gap-3 mt-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 ${social.color} transition-all hover:scale-110 hover:border-cyan-500/50`}
                  title={social.id ? `${social.name}: ${social.id}` : social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            
            {/* Contact Info */}
            <div className="mt-4 space-y-1">
              <a href="mailto:cdozier14@athlynx.ai" className="flex items-center gap-2 text-white/50 hover:text-cyan-400 text-sm transition-colors">
                <Mail className="w-4 h-4" /> cdozier14@athlynx.ai
              </a>
              <a href="tel:+16014985282" className="flex items-center gap-2 text-white/50 hover:text-cyan-400 text-sm transition-colors">
                <Phone className="w-4 h-4" /> +1 (601) 498-5282
              </a>
              <a href="https://athlynx.ai" className="flex items-center gap-2 text-white/50 hover:text-cyan-400 text-sm transition-colors">
                <Globe className="w-4 h-4" /> athlynx.ai
              </a>
            </div>
          </div>
          
          {/* Link columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-cyan-400 font-bold text-sm uppercase tracking-wider mb-4">Platform</h4>
              <ul className="space-y-2">
                {footerLinks.platform.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}>
                      <span className="text-white/60 hover:text-white text-sm cursor-pointer transition-colors">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-cyan-400 font-bold text-sm uppercase tracking-wider mb-4">Apps</h4>
              <ul className="space-y-2">
                {footerLinks.apps.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}>
                      <span className="text-white/60 hover:text-white text-sm cursor-pointer transition-colors">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-cyan-400 font-bold text-sm uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}>
                      <span className="text-white/60 hover:text-white text-sm cursor-pointer transition-colors">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-cyan-400 font-bold text-sm uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}>
                      <span className="text-white/60 hover:text-white text-sm cursor-pointer transition-colors">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Founder Badge */}
        <div className="border-t border-white/10 pt-6 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center text-white text-xs font-bold">
                #1
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-bold">Chad A. Dozier</p>
                <p className="text-yellow-400 text-xs">Founder & CEO • @Cdozier14</p>
              </div>
            </div>
            <p className="text-white/40 text-xs italic">"Look Ma and Nanny, I Made It"</p>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/40 text-sm mb-4 md:mb-0">
            © 2025 Dozier Holdings Group, LLC. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy">
              <span className="text-white/40 hover:text-white text-sm cursor-pointer transition-colors">Privacy Policy</span>
            </Link>
            <Link href="/terms">
              <span className="text-white/40 hover:text-white text-sm cursor-pointer transition-colors">Terms of Service</span>
            </Link>
            <Link href="/dhg-empire">
              <span className="text-white/40 hover:text-white text-sm cursor-pointer transition-colors">DHG Empire</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
