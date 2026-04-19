import { useState } from "react";
import { Link } from "wouter";
import { Briefcase, MapPin, DollarSign, Clock, Send, CheckCircle, Building2, Users, Rocket, Heart } from "lucide-react";
import { toast } from "sonner";

const dhgJobs = [
  {
    id: 1,
    title: "VP of Technology",
    department: "Engineering",
    location: "Remote / Houston, TX",
    type: "Full-time",
    salary: "Equity + Competitive",
    description: "Lead all technology initiatives including platform development, patent filings, and technical architecture for ATHLYNX and DHG ecosystem.",
    requirements: ["10+ years software engineering", "Experience scaling platforms", "Leadership experience", "Sports tech passion"],
    equity: true,
    urgent: true,
  },
  {
    id: 2,
    title: "VP of Sales & Partnerships",
    department: "Business Development",
    location: "Remote / Nationwide",
    type: "Full-time",
    salary: "Equity + Commission",
    description: "Drive revenue through brand partnerships, athlete onboarding, and enterprise sales. Build relationships with colleges, NIL collectives, and sports brands.",
    requirements: ["Sales leadership experience", "Sports industry connections", "NIL knowledge preferred", "Entrepreneurial mindset"],
    equity: true,
    urgent: true,
  },
  {
    id: 3,
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time / Contract",
    salary: "$80K - $150K + Equity",
    description: "Build and scale the ATHLYNX platform using React, Node.js, and modern web technologies. Work directly with the founding team.",
    requirements: ["React/TypeScript experience", "Node.js/Express", "Database design", "API development"],
    equity: true,
    urgent: false,
  },
  {
    id: 4,
    title: "Sports Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    salary: "$60K - $90K + Equity",
    description: "Lead marketing efforts for ATHLYNX platform. Create content, manage social media, and build brand awareness among athletes and sports programs.",
    requirements: ["Marketing experience", "Sports industry knowledge", "Content creation skills", "Social media expertise"],
    equity: true,
    urgent: false,
  },
  {
    id: 5,
    title: "NIL Compliance Specialist",
    department: "Operations",
    location: "Remote",
    type: "Full-time / Part-time",
    salary: "$50K - $80K",
    description: "Ensure all NIL deals and athlete activities comply with NCAA regulations and state laws. Advise athletes and brands on compliance matters.",
    requirements: ["NCAA rules knowledge", "Legal/compliance background", "Detail-oriented", "Communication skills"],
    equity: false,
    urgent: false,
  },
  {
    id: 6,
    title: "Athlete Success Manager",
    department: "Customer Success",
    location: "Remote",
    type: "Full-time",
    salary: "$45K - $65K + Equity",
    description: "Help athletes maximize their experience on ATHLYNX. Onboard new users, provide support, and gather feedback to improve the platform.",
    requirements: ["Customer success experience", "Former athlete preferred", "Empathetic communicator", "Problem solver"],
    equity: true,
    urgent: false,
  },
];

const benefits = [
  { icon: Rocket, title: "Ground Floor Opportunity", desc: "Join a startup with massive growth potential" },
  { icon: DollarSign, title: "Equity Compensation", desc: "Own a piece of the company you're building" },
  { icon: Users, title: "Small Team, Big Impact", desc: "Your work directly shapes the product" },
  { icon: Heart, title: "Mission-Driven", desc: "Help athletes succeed beyond the game" },
];

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<typeof dhgJobs[0] | null>(null);
  const [showApplication, setShowApplication] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    resume: "",
    coverLetter: "",
    formerAthlete: false,
    sport: "",
  });

  const handleApply = (job: typeof dhgJobs[0]) => {
    setSelectedJob(job);
    setShowApplication(true);
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
    toast.success("Application submitted! We'll be in touch soon.");
  };

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
        <h1 className="text-5xl font-black text-white mb-2">JOIN OUR TEAM</h1>
        <p className="text-cyan-400 text-xl font-bold uppercase tracking-wider mb-4">Dozier Holdings Group</p>
        <p className="text-white/60 max-w-2xl mx-auto px-4">
          We're building the future of athlete success. Join us at the ground floor and help shape the next generation of sports technology.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-10">
        {/* Benefits */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {benefits.map((benefit, i) => (
            <div key={i} className="bg-slate-900/50 border border-cyan-500/20 rounded-xl p-4 text-center">
              <benefit.icon className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <h3 className="text-white font-bold text-sm mb-1">{benefit.title}</h3>
              <p className="text-white/50 text-xs">{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* Job Listings */}
        <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-6">Open Positions</h2>
        <div className="space-y-4 mb-12">
          {dhgJobs.map((job) => (
            <div
              key={job.id}
              className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">{job.title}</h3>
                    {job.urgent && (
                      <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full">
                        Urgent
                      </span>
                    )}
                    {job.equity && (
                      <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs font-semibold rounded-full">
                        Equity
                      </span>
                    )}
                  </div>
                  <p className="text-white/60 text-sm mb-3">{job.description}</p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="flex items-center gap-1 text-white/50">
                      <Building2 className="w-4 h-4" /> {job.department}
                    </span>
                    <span className="flex items-center gap-1 text-white/50">
                      <MapPin className="w-4 h-4" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1 text-white/50">
                      <Clock className="w-4 h-4" /> {job.type}
                    </span>
                    <span className="flex items-center gap-1 text-cyan-400">
                      <DollarSign className="w-4 h-4" /> {job.salary}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleApply(job)}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Why Join DHG */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-black text-white mb-4 text-center">Why Join Dozier Holdings Group?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-cyan-400 font-bold mb-2">Startup Energy</h3>
              <p className="text-white/60 text-sm">We're a lean team moving fast. Your ideas matter and your work ships quickly.</p>
            </div>
            <div>
              <h3 className="text-cyan-400 font-bold mb-2">Equity Ownership</h3>
              <p className="text-white/60 text-sm">Most positions include equity. When we win, you win.</p>
            </div>
            <div>
              <h3 className="text-cyan-400 font-bold mb-2">Athletes Welcome</h3>
              <p className="text-white/60 text-sm">Former athletes understand our mission. Your experience is valued here.</p>
            </div>
            <div>
              <h3 className="text-cyan-400 font-bold mb-2">🌍 Remote-First</h3>
              <p className="text-white/60 text-sm">Work from anywhere. We care about results, not where you sit.</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center bg-slate-900/50 border border-white/10 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-2">Don't See Your Role?</h2>
          <p className="text-white/60 mb-4">We're always looking for talented people. Send us your resume anyway.</p>
          <a href="mailto:careers@dozierholdingsgroup.com" className="text-cyan-400 hover:underline">
            careers@dozierholdingsgroup.com
          </a>
        </div>
      </div>

      {/* Application Modal */}
      {showApplication && selectedJob && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Apply for {selectedJob.title}</h2>
                  <p className="text-white/50">{selectedJob.department} • {selectedJob.location}</p>
                </div>
                <button
                  onClick={() => setShowApplication(false)}
                  className="text-white/50 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            {submitted ? (
              <div className="p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Application Submitted!</h3>
                <p className="text-white/60 mb-6">
                  Thank you for your interest in joining DHG. We'll review your application and get back to you soon.
                </p>
                <button
                  onClick={() => setShowApplication(false)}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-1">Full Name *</label>
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

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-1">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-1">LinkedIn Profile</label>
                    <input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
                      placeholder="linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-1">Resume/CV Link *</label>
                  <input
                    type="url"
                    required
                    value={formData.resume}
                    onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
                    placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-1">Why do you want to join DHG? *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white focus:border-cyan-500 focus:outline-none resize-none"
                    placeholder="Tell us about yourself and why you're interested in this role..."
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="formerAthlete"
                    checked={formData.formerAthlete}
                    onChange={(e) => setFormData({ ...formData, formerAthlete: e.target.checked })}
                    className="w-5 h-5 rounded border-white/20 bg-black/30 text-cyan-500"
                  />
                  <label htmlFor="formerAthlete" className="text-white/70">
                    I am a former athlete
                  </label>
                </div>

                {formData.formerAthlete && (
                  <div>
                    <label className="block text-white/70 text-sm mb-1">What sport(s) did you play?</label>
                    <input
                      type="text"
                      value={formData.sport}
                      onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                      className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
                      placeholder="e.g., Baseball at Mississippi State"
                    />
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowApplication(false)}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center py-8 border-t border-white/10 mt-10">
        <p className="text-white/50 text-sm">© 2025 Dozier Holdings Group, LLC. All Rights Reserved.</p>
      </div>
    </div>
  );
}
