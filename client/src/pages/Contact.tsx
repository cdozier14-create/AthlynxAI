import { useState } from "react";
import { Link } from "wouter";
import { Mail, Phone, MapPin, Send, CheckCircle, MessageCircle, Building2, Users, Briefcase, Youtube, Music } from "lucide-react";
import { toast } from "sonner";

const socialChannels = [
  {
    name: "WhatsApp Business",
    handle: "Dozier Holdings Group",
    url: "https://wa.me/16014985282",
    qr: "/whatsapp-qr-chad.png",
    color: "bg-green-500",
    textColor: "text-green-400",
    borderColor: "border-green-500/40",
    icon: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
  },
  {
    name: "WeChat",
    handle: "wxid_uv8r2ll71shb12",
    url: "#",
    qr: "/wechat-qr-chad.png",
    color: "bg-green-600",
    textColor: "text-green-300",
    borderColor: "border-green-600/40",
    icon: "https://upload.wikimedia.org/wikipedia/commons/7/73/WeChat_logo.svg",
  },
  {
    name: "LinkedIn",
    handle: "linkedin.com/in/chaddozier",
    url: "https://linkedin.com/in/chaddozier",
    qr: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A//linkedin.com/in/chaddozier&bgcolor=0a1628&color=00e5ff",
    color: "bg-blue-600",
    textColor: "text-blue-400",
    borderColor: "border-blue-500/40",
    icon: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
  },
  {
    name: "Dot Card",
    handle: "dot.cards/cdozier14",
    url: "https://dot.cards/cdozier14",
    qr: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A//dot.cards/cdozier14&bgcolor=0a1628&color=00e5ff",
    color: "bg-slate-700",
    textColor: "text-white",
    borderColor: "border-white/30",
    icon: "https://dot.cards/favicon.ico",
  },
  {
    name: "Facebook",
    handle: "chad.dozier.2025",
    url: "https://www.facebook.com/chad.dozier.2025",
    qr: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A//facebook.com/chad.dozier.2025&bgcolor=0a1628&color=00e5ff",
    color: "bg-blue-700",
    textColor: "text-blue-300",
    borderColor: "border-blue-700/40",
    icon: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
  },
  {
    name: "Instagram (Brand)",
    handle: "@chadadozier14",
    url: "https://instagram.com/chadadozier14",
    qr: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A//instagram.com/chadadozier14&bgcolor=0a1628&color=00e5ff",
    color: "bg-pink-600",
    textColor: "text-pink-400",
    borderColor: "border-pink-500/40",
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
  },
  {
    name: "Instagram (Personal)",
    handle: "@dozier_chad",
    url: "https://instagram.com/dozier_chad",
    qr: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A//instagram.com/dozier_chad&bgcolor=0a1628&color=00e5ff",
    color: "bg-purple-600",
    textColor: "text-purple-400",
    borderColor: "border-purple-500/40",
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
  },
  {
    name: "X (Twitter)",
    handle: "@ChadADozier2",
    url: "https://x.com/ChadADozier2",
    qr: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A//x.com/ChadADozier2&bgcolor=0a1628&color=00e5ff",
    color: "bg-black",
    textColor: "text-white",
    borderColor: "border-white/20",
    icon: "https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png",
  },
  {
    name: "TikTok",
    handle: "@cdozier75",
    url: "https://tiktok.com/@cdozier75",
    qr: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A//tiktok.com/@cdozier75&bgcolor=0a1628&color=00e5ff",
    color: "bg-black",
    textColor: "text-pink-400",
    borderColor: "border-pink-500/40",
    icon: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg",
  },
  {
    name: "YouTube",
    handle: "@chada.dozier14",
    url: "https://youtube.com/@chada.dozier14",
    qr: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A//youtube.com/@chada.dozier14&bgcolor=0a1628&color=00e5ff",
    color: "bg-red-600",
    textColor: "text-red-400",
    borderColor: "border-red-500/40",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    type: "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeQR, setActiveQR] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Message sent! Chad will get back to you soon.");
  };

  const contactTypes = [
    { id: "general", label: "General Inquiry", icon: MessageCircle },
    { id: "partnership", label: "Partnership", icon: Building2 },
    { id: "investor", label: "Investor Relations", icon: Briefcase },
    { id: "support", label: "Support", icon: Users },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0d1f3c 50%, #061424 100%)' }}>
      {/* Header */}
      <div className="text-center py-12 border-b border-cyan-500/20">
        <Link href="/dhg">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-cyan-500/30 rounded-full px-4 py-2 mb-6 cursor-pointer hover:bg-slate-800/80 transition-colors">
            <span className="text-white/60 text-sm">← Back to DHG</span>
          </div>
        </Link>
        <div className="flex items-center justify-center gap-4 mb-4">
          <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/AzsuZOzvfgvscIdI.png" alt="DHG" className="w-16 h-16 rounded-full border-4 border-cyan-400/50" />
        </div>
        <h1 className="text-5xl font-black text-white mb-2">MEET CHAD</h1>
        <p className="text-cyan-400 text-xl font-bold uppercase tracking-wider mb-2">Chad A. Dozier Sr.</p>
        <p className="text-white/50 text-sm mb-1">Founder | CEO | Chairman</p>
        <p className="text-white/50 text-sm">Dozier Holdings Group™ | Softmor Inc™ | ATHLYNX™</p>
        <p className="text-white/40 text-sm mt-2">Houston, TX | Laurel, MS</p>
      </div>

      {/* Investor CTA Banner */}
      <div className="bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 border-y border-cyan-500/30 py-5 px-4 text-center">
        <p className="text-white font-bold text-lg mb-1">🚀 Seeking Strategic Investors & Partners</p>
        <p className="text-white/60 text-sm max-w-2xl mx-auto">
          ATHLYNX is building the world's first all-in-one athlete ecosystem. Join us on the ground floor.
        </p>
        <div className="flex justify-center gap-4 mt-3">
          <Link href="/investor-deck">
            <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-5 py-2 rounded-full text-sm transition-colors">
              View Investor Deck
            </button>
          </Link>
          <Link href="/partner-portal">
            <button className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-2 rounded-full text-sm border border-white/20 transition-colors">
              Partner Portal
            </button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-10">

        {/* Social Media Hub */}
        <div className="mb-12">
          <h2 className="text-3xl font-black text-white text-center mb-2">Connect With Chad</h2>
          <p className="text-white/50 text-center text-sm mb-8">Scan any QR code or click to connect directly</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {socialChannels.map((channel) => (
              <div
                key={channel.name}
                className={`bg-slate-900/80 border ${channel.borderColor} rounded-2xl p-4 flex flex-col items-center gap-3 cursor-pointer hover:scale-105 transition-all`}
                onClick={() => setActiveQR(activeQR === channel.name ? null : channel.name)}
              >
                <div className={`w-12 h-12 ${channel.color} rounded-xl flex items-center justify-center overflow-hidden p-2`}>
                  <img src={channel.icon} alt={channel.name} className="w-full h-full object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
                <div className="text-center">
                  <p className="text-white text-xs font-bold">{channel.name}</p>
                  <p className={`${channel.textColor} text-xs`}>{channel.handle}</p>
                </div>
                {activeQR === channel.name && (
                  <div className="mt-2">
                    <img src={channel.qr} alt={`${channel.name} QR`} className="w-32 h-32 rounded-lg" />
                    <a href={channel.url} target="_blank" rel="noopener noreferrer" className={`${channel.textColor} text-xs underline block text-center mt-1`}>Open →</a>
                  </div>
                )}
                {activeQR !== channel.name && (
                  <p className="text-white/30 text-xs">Tap for QR</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* YouTube Music Section */}
        <div className="mb-12 bg-slate-900/80 border border-red-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Chad's Playlist</h3>
              <p className="text-red-400 text-sm">YouTube Music • 128 tracks curated by Chad A. Dozier</p>
            </div>
            <a href="https://youtube.com/@chada.dozier14" target="_blank" rel="noopener noreferrer" className="ml-auto bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-full text-sm transition-colors flex items-center gap-2">
              <Youtube className="w-4 h-4" />
              Subscribe
            </a>
          </div>
          <div className="rounded-xl overflow-hidden">
            <iframe
              width="100%"
              height="200"
              src="https://www.youtube.com/embed/videoseries?list=PLrAXtmErZgOdP_8GztsuKi9nrraNbKKp4"
              title="Chad's Playlist"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full"
            />
          </div>
          <p className="text-white/40 text-xs mt-3 text-center">Motivation | Faith | Grind | Success — The soundtrack of a champion</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-8">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-white/60 mb-6">
                  Thank you for reaching out. Chad will get back to you within 24-48 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", subject: "", type: "general", message: "" });
                  }}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-2xl font-bold text-white mb-6">Send Chad a Message</h2>

                {/* Contact Type */}
                <div>
                  <label className="block text-white/70 text-sm mb-2">What can we help you with?</label>
                  <div className="grid grid-cols-2 gap-2">
                    {contactTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, type: type.id })}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
                          formData.type === type.id
                            ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                            : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                        }`}
                      >
                        <type.icon className="w-4 h-4" />
                        <span className="text-sm">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-1">Company / Organization</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
                    placeholder="Your company or school"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-1">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white focus:border-cyan-500 focus:outline-none resize-none"
                    placeholder="Tell us more..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Direct Contact */}
            <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Direct Contact</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Email</p>
                    <a href="mailto:cdozier@dozierholdingsgroup.com" className="text-cyan-400 hover:underline text-sm">
                      cdozier@dozierholdingsgroup.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Phone / WhatsApp</p>
                    <a href="tel:+16014985282" className="text-white hover:text-cyan-400 text-sm">
                      +1 (601) 498-5282
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Location</p>
                    <p className="text-white text-sm">Houston, TX | Laurel, MS</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule a Call */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-2">Schedule a Meeting</h3>
              <p className="text-white/60 text-sm mb-4">
                Ready to discuss investment, partnership, or how ATHLYNX can serve your organization?
              </p>
              <a
                href="https://calendly.com/cdozier14"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
              >
                📅 Book a Call with Chad
              </a>
              <p className="text-white/30 text-xs text-center mt-2">Investor Calls • Partnership Discussions • Demo Requests</p>
            </div>

            {/* Quick Links */}
            <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/investor-deck" className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 text-center transition-colors">
                  <Briefcase className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                  <span className="text-white text-sm">Investor Deck</span>
                </Link>
                <Link href="/partner-portal" className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 text-center transition-colors">
                  <Building2 className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                  <span className="text-white text-sm">Partner Portal</span>
                </Link>
                <Link href="/careers" className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 text-center transition-colors">
                  <Users className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                  <span className="text-white text-sm">Careers</span>
                </Link>
                <a href="https://dot.cards/cdozier14" target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 text-center transition-colors">
                  <MessageCircle className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                  <span className="text-white text-sm">Dot Card</span>
                </a>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-2xl p-5">
              <h3 className="text-lg font-bold text-white mb-1">Response Time</h3>
              <p className="text-white/60 text-sm">
                Chad personally responds to all inquiries within <strong className="text-cyan-400">24-48 hours</strong>.
                For urgent matters, WhatsApp or call directly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 border-t border-white/10 mt-10">
        <p className="text-white/50 text-sm">© 2025-2026 Dozier Holdings Group™, LLC. All Rights Reserved. | ATHLYNX™ | Softmor Inc™</p>
      </div>
    </div>
  );
}
