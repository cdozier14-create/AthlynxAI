import { useState } from "react";
import { Link } from "wouter";
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle, MessageCircle, Building2, Users, Briefcase } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    type: "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Message sent! We'll get back to you soon.");
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
        <h1 className="text-5xl font-black text-white mb-2">CONTACT US</h1>
        <p className="text-cyan-400 text-xl font-bold uppercase tracking-wider mb-4">Dozier Holdings Group</p>
        <p className="text-white/60 max-w-2xl mx-auto px-4">
          Have questions about ATHLYNX, partnerships, or investment opportunities? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-8">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-white/60 mb-6">
                  Thank you for reaching out. We'll get back to you within 24-48 hours.
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
                <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
                
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
                  <label className="block text-white/70 text-sm mb-1">Subject *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
                    placeholder="What is this about?"
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
                    <a href="mailto:cdozier@dozierholdingsgroup.com" className="text-cyan-400 hover:underline">
                      cdozier@dozierholdingsgroup.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Phone</p>
                    <a href="tel:+16015808869" className="text-white hover:text-cyan-400">
                      +1 (601) 580-8869
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Location</p>
                    <p className="text-white">Laurel, Mississippi</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <Linkedin className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">LinkedIn</p>
                    <a href="https://linkedin.com/in/chaddozier" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                      linkedin.com/in/chaddozier
                    </a>
                  </div>
                </div>
              </div>
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
                <Link href="/team" className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 text-center transition-colors">
                  <MessageCircle className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                  <span className="text-white text-sm">Our Team</span>
                </Link>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-2">Response Time</h3>
              <p className="text-white/60 text-sm">
                We typically respond to all inquiries within <strong className="text-cyan-400">24-48 hours</strong>. 
                For urgent matters, please call directly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 border-t border-white/10 mt-10">
        <p className="text-white/50 text-sm">© 2025 Dozier Holdings Group, LLC. All Rights Reserved.</p>
      </div>
    </div>
  );
}
