import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Trophy, 
  Users, 
  Clipboard, 
  Briefcase, 
  Scale, 
  Dumbbell,
  Brain,
  Heart,
  ArrowRight,
  Star,
  Target,
  TrendingUp,
  Shield,
  Zap,
  BookOpen,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import UnifiedFooter from "@/components/UnifiedFooter";

export default function Journey() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const stakeholders = [
    {
      id: "athletes",
      title: "Athletes",
      emoji: "",
      icon: Trophy,
      tagline: "Your success is our mission",
      color: "from-cyan-500 to-blue-600",
      description: "From youth sports to professional leagues, we're here to support your entire athletic journey. Build your brand, maximize your NIL potential, and connect with opportunities that matter.",
      features: [
        { title: "Profile & Portfolio", desc: "Showcase your stats, highlights, and achievements" },
        { title: "NIL Opportunities", desc: "Connect with brands and maximize your earning potential" },
        { title: "Transfer Portal", desc: "Navigate your next move with confidence" },
        { title: "Mental Performance", desc: "Access mindset training and mental health resources" },
        { title: "Career Planning", desc: "Plan for life during and after sports" },
        { title: "Community", desc: "Connect with athletes who understand your journey" }
      ],
      cta: "Start Your Journey",
      link: "/athlete-dashboard"
    },
    {
      id: "parents",
      title: "Parents",
      emoji: "👨‍👩‍👧‍👦",
      icon: Users,
      tagline: "Supporting your athlete, supporting you",
      color: "from-purple-500 to-indigo-600",
      description: "Being a sports parent is a journey of its own. We provide the tools, resources, and community to help you support your athlete while maintaining balance in your family life.",
      features: [
        { title: "Financial Planning", desc: "Understand costs and plan for your athlete's future" },
        { title: "Recruiting Guide", desc: "Navigate the recruiting process with confidence" },
        { title: "NIL Education", desc: "Learn how to protect and maximize your athlete's NIL" },
        { title: "Communication Tools", desc: "Stay connected with coaches and programs" },
        { title: "Parent Community", desc: "Connect with other sports parents" },
        { title: "Balance Resources", desc: "Maintain family wellness through the journey" }
      ],
      cta: "Parent Resources",
      link: "/parents"
    },
    {
      id: "coaches",
      title: "Coaches",
      emoji: "📋",
      icon: Clipboard,
      tagline: "Elevate your program",
      color: "from-green-500 to-emerald-600",
      description: "Great coaches build great athletes. Access recruiting tools, player development resources, and program management features designed to help you build championship-caliber teams.",
      features: [
        { title: "Recruiting Dashboard", desc: "Find and evaluate talent efficiently" },
        { title: "Player Development", desc: "Track and improve athlete performance" },
        { title: "Team Management", desc: "Organize rosters, schedules, and communications" },
        { title: "Video Analysis", desc: "Break down film and share with athletes" },
        { title: "Compliance Tools", desc: "Stay within NCAA and NIL regulations" },
        { title: "Coach Network", desc: "Connect with coaches across all levels" }
      ],
      cta: "Coach Portal",
      link: "/coaches"
    },
    {
      id: "agents",
      title: "Agents",
      emoji: "",
      icon: Briefcase,
      tagline: "Represent the best",
      color: "from-amber-500 to-orange-600",
      description: "Connect with top athletic talent and manage your client relationships effectively. Our platform provides the tools you need to represent athletes at the highest level.",
      features: [
        { title: "Talent Discovery", desc: "Find emerging athletes before anyone else" },
        { title: "Client Management", desc: "Track contracts, deals, and opportunities" },
        { title: "NIL Deal Flow", desc: "Access brand partnerships for your clients" },
        { title: "Contract Tools", desc: "Streamline negotiations and paperwork" },
        { title: "Analytics", desc: "Data-driven insights on athlete value" },
        { title: "Compliance", desc: "Stay certified and compliant" }
      ],
      cta: "Agent Access",
      link: "/agents"
    },
    {
      id: "lawyers",
      title: "Lawyers",
      emoji: "⚖️",
      icon: Scale,
      tagline: "Protect athlete interests",
      color: "from-slate-500 to-gray-600",
      description: "Sports law is evolving rapidly. Access the latest NIL regulations, contract templates, and compliance resources to best serve your athlete clients.",
      features: [
        { title: "NIL Law Database", desc: "State-by-state NIL regulations" },
        { title: "Contract Templates", desc: "NIL-specific legal documents" },
        { title: "Compliance Updates", desc: "Real-time regulatory changes" },
        { title: "Case Studies", desc: "Learn from precedent-setting cases" },
        { title: "Expert Network", desc: "Connect with sports law specialists" },
        { title: "CLE Resources", desc: "Continuing education in sports law" }
      ],
      cta: "Legal Resources",
      link: "/legal"
    },
    {
      id: "trainers",
      title: "Trainers",
      emoji: "",
      icon: Dumbbell,
      tagline: "Build champions",
      color: "from-red-500 to-pink-600",
      description: "Whether you're a strength coach, skills trainer, or performance specialist, connect with athletes who need your expertise and grow your training business.",
      features: [
        { title: "Client Acquisition", desc: "Connect with athletes seeking training" },
        { title: "Program Builder", desc: "Create and share training programs" },
        { title: "Progress Tracking", desc: "Monitor athlete development" },
        { title: "Scheduling", desc: "Manage sessions and availability" },
        { title: "Certification Display", desc: "Showcase your credentials" },
        { title: "Trainer Network", desc: "Collaborate with other professionals" }
      ],
      cta: "Trainer Portal",
      link: "/training"
    },
    {
      id: "counselors",
      title: "Counselors",
      emoji: "🧠",
      icon: Brain,
      tagline: "Mental game matters",
      color: "from-teal-500 to-cyan-600",
      description: "The mental game is often the difference between good and great. Provide mental performance coaching, sports psychology, and wellness support to athletes who need it.",
      features: [
        { title: "Client Matching", desc: "Connect with athletes seeking support" },
        { title: "Session Management", desc: "Schedule and track sessions" },
        { title: "Resource Library", desc: "Mental performance tools and exercises" },
        { title: "Crisis Support", desc: "Resources for athlete mental health" },
        { title: "Confidentiality", desc: "HIPAA-compliant communications" },
        { title: "Professional Network", desc: "Connect with other mental health pros" }
      ],
      cta: "Counselor Access",
      link: "/wellness"
    },
    {
      id: "chaplains",
      title: "Chaplains",
      emoji: "",
      icon: Heart,
      tagline: "Faith in the game",
      color: "from-indigo-500 to-violet-600",
      description: "Spiritual support is a vital part of many athletes' lives. Connect with athletes and teams who value faith-based guidance and support.",
      features: [
        { title: "Team Connections", desc: "Connect with teams seeking chaplaincy" },
        { title: "Athlete Support", desc: "Provide individual spiritual guidance" },
        { title: "Resource Sharing", desc: "Share devotionals and faith content" },
        { title: "Event Coordination", desc: "Organize team chapel and events" },
        { title: "Multi-Faith Support", desc: "Resources for diverse spiritual needs" },
        { title: "Chaplain Network", desc: "Connect with sports chaplains nationwide" }
      ],
      cta: "Faith Resources",
      link: "/faith"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0d1e36] to-[#0a1628]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1628]/90 backdrop-blur-md border-b border-cyan-500/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <span className="text-cyan-400 font-bold text-sm tracking-widest cursor-pointer hover:text-cyan-300 transition-colors">
              THE FUTURE OF ATHLETE SUCCESS
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/mindset">
              <span className="text-white/80 hover:text-cyan-400 transition-colors cursor-pointer">
                Mindset
              </span>
            </Link>
            <Link href="/">
              <span className="text-white/80 hover:text-cyan-400 transition-colors cursor-pointer">
                ATHLYNX
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-yellow-500/20 border border-cyan-500/30">
                <Target className="w-12 h-12 text-cyan-400" />
              </div>
            </motion.div>
            
            <motion.p variants={fadeInUp} className="text-cyan-400 tracking-[0.3em] text-sm mb-4">
              THE COMPLETE ECOSYSTEM
            </motion.p>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black text-white mb-6">
              THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-400">JOURNEY</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Revolutionizing the sports market journey with athletes, parents, coaches, agents, lawyers, trainers, counselors, and chaplains. One platform. Total support. Total positivity.
            </motion.p>

            {/* Stakeholder Quick Links */}
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 mb-8">
              {stakeholders.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="px-4 py-2 bg-[#1a3a5c]/50 rounded-full border border-cyan-500/20 hover:border-cyan-500/50 transition-all text-white/80 hover:text-cyan-400"
                >
                  <span className="mr-2">{s.emoji}</span>
                  {s.title}
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stakeholder Sections */}
      {stakeholders.map((stakeholder, index) => (
        <section 
          key={stakeholder.id}
          id={stakeholder.id}
          className={`py-20 px-4 ${index % 2 === 0 ? 'bg-[#0d1e36]' : ''}`}
        >
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${stakeholder.color} flex items-center justify-center shadow-2xl`}>
                  <span className="text-6xl">{stakeholder.emoji}</span>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-2">
                    {stakeholder.title}
                  </h2>
                  <p className={`text-xl bg-gradient-to-r ${stakeholder.color} bg-clip-text text-transparent font-semibold`}>
                    {stakeholder.tagline}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xl text-white/70 text-center md:text-left mb-12 max-w-3xl">
                {stakeholder.description}
              </p>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {stakeholder.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-[#1a3a5c]/30 rounded-xl p-6 border border-cyan-500/10 hover:border-cyan-500/30 transition-all"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stakeholder.color} flex items-center justify-center mb-4`}>
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-white/60 text-sm">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div className="text-center">
                <Link href={stakeholder.link}>
                  <Button className={`bg-gradient-to-r ${stakeholder.color} hover:opacity-90 text-white px-8 py-6 text-lg rounded-full`}>
                    {stakeholder.cta}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* The Vision */}
      <section className="py-20 px-4 bg-gradient-to-r from-cyan-500/10 to-yellow-500/10">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Star className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              ONE PLATFORM. <span className="text-cyan-400">INFINITE POSSIBILITIES.</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              We're not just building an app. We're building an ecosystem where every stakeholder in an athlete's journey has the tools, resources, and connections they need to succeed. Together, we're revolutionizing sports.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/">
                <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white px-10 py-6 text-lg rounded-full">
                  Get Started
                </Button>
              </Link>
              <Link href="/mindset">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-10 py-6 text-lg rounded-full">
                  Learn the Mindset
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <UnifiedFooter />
    </div>
  );
}
