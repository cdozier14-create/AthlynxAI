import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Users, 
  Target, 
  Lightbulb, 
  TrendingUp,
  BookOpen,
  Award,
  Star,
  Rocket,
  Zap,
  DollarSign,
  Shield,
  Search,
  MessageSquare,
  Trophy,
  Heart,
  Globe,
  Lock,
  Eye,
  Flame
} from "lucide-react";
import { Button } from "@/components/ui/button";
import UnifiedFooter from "@/components/UnifiedFooter";

export default function LeadershipPrinciples() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const principles = [
    {
      number: 1,
      title: "Athlete Obsession",
      description: "Leaders start with the athlete and work backwards. They work vigorously to earn and keep athlete trust. Although leaders pay attention to competitors, they obsess over athletes.",
      dhgVersion: "Every decision starts with: How does this help the athlete succeed?",
      icon: Users,
      color: "from-cyan-500 to-blue-600"
    },
    {
      number: 2,
      title: "Ownership",
      description: "Leaders are owners. They think long term and don't sacrifice long-term value for short-term results. They act on behalf of the entire company, beyond just their own team.",
      dhgVersion: "We own our outcomes. No excuses. No finger-pointing.",
      icon: Shield,
      color: "from-purple-500 to-indigo-600"
    },
    {
      number: 3,
      title: "Invent and Simplify",
      description: "Leaders expect and require innovation and invention from their teams and always find ways to simplify.",
      dhgVersion: "If it's complicated, we haven't finished building it yet.",
      icon: Lightbulb,
      color: "from-yellow-500 to-orange-600"
    },
    {
      number: 4,
      title: "Are Right, A Lot",
      description: "Leaders are right a lot. They have strong judgment and good instincts. They seek diverse perspectives and work to disconfirm their beliefs.",
      dhgVersion: "Trust the data. Trust the process. But always verify.",
      icon: Target,
      color: "from-green-500 to-emerald-600"
    },
    {
      number: 5,
      title: "Learn and Be Curious",
      description: "Leaders are never done learning and always seek to improve themselves. They are curious about new possibilities and act to explore them.",
      dhgVersion: "Stay hungry. Stay curious. The game is always evolving.",
      icon: BookOpen,
      color: "from-pink-500 to-rose-600"
    },
    {
      number: 6,
      title: "Hire and Develop the Best",
      description: "Leaders raise the performance bar with every hire and promotion. They recognize exceptional talent.",
      dhgVersion: "A players hire A players. B players hire C players.",
      icon: Award,
      color: "from-amber-500 to-yellow-600"
    },
    {
      number: 7,
      title: "Insist on the Highest Standards",
      description: "Leaders have relentlessly high standards—many people may think these standards are unreasonably high.",
      dhgVersion: "Good enough isn't. Championship standards only.",
      icon: Star,
      color: "from-red-500 to-pink-600"
    },
    {
      number: 8,
      title: "Think Big",
      description: "Thinking small is a self-fulfilling prophecy. Leaders create and communicate a bold direction that inspires results.",
      dhgVersion: "We're not building an app. We're building an empire.",
      icon: Rocket,
      color: "from-indigo-500 to-purple-600"
    },
    {
      number: 9,
      title: "Bias for Action",
      description: "Speed matters in business. Many decisions and actions are reversible and do not need extensive study. We value calculated risk taking.",
      dhgVersion: "Move fast. Break things. Fix them faster.",
      icon: Zap,
      color: "from-orange-500 to-red-600"
    },
    {
      number: 10,
      title: "Frugality",
      description: "Accomplish more with less. Constraints breed resourcefulness, self-sufficiency and invention.",
      dhgVersion: "Every dollar matters until we're profitable. Then every dollar still matters.",
      icon: DollarSign,
      color: "from-emerald-500 to-teal-600"
    },
    {
      number: 11,
      title: "Earn Trust",
      description: "Leaders listen attentively, speak candidly, and treat others respectfully. They are vocally self-critical.",
      dhgVersion: "Trust is earned in drops and lost in buckets.",
      icon: Shield,
      color: "from-blue-500 to-cyan-600"
    },
    {
      number: 12,
      title: "Dive Deep",
      description: "Leaders operate at all levels, stay connected to the details, audit frequently, and are skeptical when metrics and anecdote differ.",
      dhgVersion: "Know your numbers. Know your product. Know your athlete.",
      icon: Search,
      color: "from-violet-500 to-purple-600"
    },
    {
      number: 13,
      title: "Have Backbone; Disagree and Commit",
      description: "Leaders are obligated to respectfully challenge decisions when they disagree, even when doing so is uncomfortable.",
      dhgVersion: "Speak up in the room. Commit outside of it.",
      icon: MessageSquare,
      color: "from-slate-500 to-gray-600"
    },
    {
      number: 14,
      title: "Deliver Results",
      description: "Leaders focus on the key inputs for their business and deliver them with the right quality and in a timely fashion.",
      dhgVersion: "All the hard work means nothing without the close. The deal has to get done—that's when we get paid.",
      icon: Trophy,
      color: "from-yellow-500 to-amber-600"
    },
    {
      number: 15,
      title: "Strive to be the Best Employer",
      description: "Leaders work every day to create a safer, more productive, higher performing work environment.",
      dhgVersion: "Take care of your people. They'll take care of the business.",
      icon: Heart,
      color: "from-rose-500 to-pink-600"
    },
    {
      number: 16,
      title: "Success and Scale Bring Broad Responsibility",
      description: "We are big, we impact the world, and we are far from perfect. We must be humble and thoughtful.",
      dhgVersion: "With great platform comes great responsibility. Use it wisely.",
      icon: Globe,
      color: "from-teal-500 to-cyan-600"
    }
  ];

  const dozierPrinciples = [
    {
      number: 17,
      title: "Move in Silence",
      description: "Don't tell people your plans—they will sabotage you. Take action and shock them with your results.",
      icon: Lock
    },
    {
      number: 18,
      title: "Stay Hungry",
      description: "\"What did I do today to put a dollar in my pocket?\" - The daily question of a hungry entrepreneur.",
      icon: Flame
    },
    {
      number: 19,
      title: "Close the Deal",
      description: "\"It's the makers and the closers that matter. Everyone else is just noise.\"",
      icon: Target
    },
    {
      number: 20,
      title: "Eyes on the Horizon",
      description: "\"Don't watch the waves. Keep your eyes on the horizon.\" - Long-term vision over short-term distractions.",
      icon: Eye
    },
    {
      number: 21,
      title: "Consistency Over Commitment",
      description: "\"Without Commitment you'll never start but without Consistency You'll never Finish.\"",
      icon: TrendingUp
    },
    {
      number: 22,
      title: "Imagination Over Logic",
      description: "\"Logic will get you from A to B. Imagination will take you Everywhere.\" - Einstein",
      icon: Lightbulb
    }
  ];

  const rulesOfPower = [
    "Don't tell people your plans - they will sabotage you",
    "Don't tell people your weakness - they will use them against you",
    "Don't tell people your failures - they will always see you as a failure",
    "Take action and shock them with your results",
    "Don't tell people your secrets - only a fool reveals their secrets",
    "Don't tell people your income - always make them wonder"
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
            <Link href="/team">
              <span className="text-white/80 hover:text-cyan-400 transition-colors cursor-pointer">
                Team
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
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/AzsuZOzvfgvscIdI.png" 
                alt="DHG" 
                className="w-24 h-24 mx-auto rounded-2xl shadow-2xl shadow-cyan-500/20"
              />
            </motion.div>
            
            <motion.p variants={fadeInUp} className="text-cyan-400 tracking-[0.3em] text-sm mb-4">
              DOZIER HOLDINGS GROUP
            </motion.p>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black text-white mb-6">
              LEADERSHIP<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-400">
                PRINCIPLES
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              We hold ourselves and each other accountable for demonstrating these Leadership Principles through our actions every day. Our unique culture helps us relentlessly pursue our mission of being the world's most athlete-centric company.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 16 Core Principles */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                THE <span className="text-cyan-400">16 PRINCIPLES</span>
              </h2>
              <p className="text-white/60 text-xl max-w-2xl mx-auto">
                Inspired by the best. Adapted for athletes.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <div className={`bg-gradient-to-br ${principle.color} rounded-2xl p-[2px]`}>
                  <div className="bg-[#0a1628] rounded-2xl p-6 h-full">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${principle.color} flex items-center justify-center flex-shrink-0`}>
                        <principle.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-white/40 text-sm font-mono">#{principle.number}</span>
                          <h3 className="text-xl font-bold text-white">{principle.title}</h3>
                        </div>
                        <p className="text-white/60 text-sm mb-3">{principle.description}</p>
                        <div className="bg-cyan-500/10 rounded-lg px-4 py-2 border-l-2 border-cyan-400">
                          <p className="text-cyan-400 text-sm font-medium">
                            <span className="text-white/50">DHG:</span> {principle.dhgVersion}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Dozier Principles */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#0d1e36] to-[#0a1628]">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                THE <span className="text-yellow-400">DOZIER PRINCIPLES</span>
              </h2>
              <p className="text-white/60 text-xl max-w-2xl mx-auto">
                Additional principles from the founder. The mindset that builds empires.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {dozierPrinciples.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl p-6 border border-yellow-500/20 hover:border-yellow-500/40 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <span className="text-yellow-400 font-black">{principle.number}</span>
                  </div>
                  <principle.icon className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{principle.title}</h3>
                <p className="text-white/70">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Rules of Power */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-[#1a3a5c]/50 to-[#0d1e36]/50 rounded-3xl p-12 border border-cyan-500/20">
              <div className="text-center mb-10">
                <Lock className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                  THE 6 RULES OF <span className="text-cyan-400">POWER</span>
                </h2>
                <p className="text-white/60 text-xl">
                  Move in silence. Let success make the noise.
                </p>
              </div>

              <div className="space-y-4">
                {rulesOfPower.map((rule, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 bg-black/30 rounded-xl px-6 py-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-cyan-400 font-bold">{index + 1}</span>
                    </div>
                    <p className="text-white/80">{rule}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-cyan-500/10 to-yellow-500/10">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              JOIN THE <span className="text-cyan-400">MOVEMENT</span>
            </h2>
            <p className="text-white/60 text-xl max-w-2xl mx-auto mb-8">
              These principles guide everything we do. If they resonate with you, you might be a perfect fit for our team.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/team">
                <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white px-10 py-6 text-lg rounded-full">
                  Meet the Team
                </Button>
              </Link>
              <Link href="/careers">
                <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 px-10 py-6 text-lg rounded-full">
                  View Careers
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
