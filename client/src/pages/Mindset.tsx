import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Brain, 
  Target, 
  Flame, 
  Eye, 
  Lock, 
  Zap,
  Trophy,
  TrendingUp,
  Shield,
  Lightbulb,
  Play,
  Mic,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import UnifiedFooter from "@/components/UnifiedFooter";

export default function Mindset() {
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

  const rulesOfPower = [
    {
      number: 1,
      rule: "Don't tell people your plans",
      consequence: "They will sabotage you.",
      icon: Lock
    },
    {
      number: 2,
      rule: "Don't tell people your weakness",
      consequence: "They will use them against you.",
      icon: Shield
    },
    {
      number: 3,
      rule: "Don't tell people your failures",
      consequence: "They will always see you as a failure and never give you an opportunity.",
      icon: Eye
    },
    {
      number: 4,
      rule: "Take action and shock them with your results",
      consequence: "Move in silence. Let success make the noise.",
      icon: Zap
    },
    {
      number: 5,
      rule: "Don't tell people your secrets",
      consequence: "Only a fool reveals their secrets.",
      icon: Lock
    },
    {
      number: 6,
      rule: "Don't tell people your income",
      consequence: "Always make them wonder.",
      icon: TrendingUp
    }
  ];

  const closerQuotes = [
    {
      quote: "What did I do today to put a dollar in my pocket?",
      context: "The daily question of a hungry entrepreneur"
    },
    {
      quote: "All the hard work means nothing without the close. The deal has to get done—that's when we get paid.",
      context: "The Closer's Mentality"
    },
    {
      quote: "It's the makers and the closers that matter. Everyone else is just noise.",
      context: "Focus on what moves the needle"
    },
    {
      quote: "Don't watch the waves. Keep your eyes on the horizon.",
      context: "Long-term vision over short-term distractions"
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
            <Link href="/studio">
              <span className="text-white/80 hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-2">
                <Mic className="w-4 h-4" />
                Studio
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
        {/* Background Effects */}
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
              <Brain className="w-20 h-20 text-cyan-400 mx-auto mb-4" />
            </motion.div>
            
            <motion.p variants={fadeInUp} className="text-cyan-400 tracking-[0.3em] text-sm mb-4">
              IN THE ZONE
            </motion.p>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black text-white mb-6">
              MINDSET &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-400">
                MOTIVATION
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              The mental game separates good from great. Champions aren't just built in the gym—they're forged in the mind.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex justify-center gap-4">
              <Link href="/studio">
                <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white px-8 py-6 text-lg rounded-full">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Episodes
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Dreams & Goals Quote */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#0d1e36] to-[#1a3a5c]">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto text-center"
          >
            <Target className="w-16 h-16 text-yellow-400 mx-auto mb-8" />
            
            <blockquote className="text-2xl md:text-4xl font-bold text-white leading-relaxed mb-8">
              "Dreams without Goals are just dreams and ultimately without Goals they fuel disappointment.
              <br /><br />
              <span className="text-cyan-400">On the Road to Achieving your Dreams you must apply discipline but more importantly Consistency.</span>
              <br /><br />
              Because without Commitment you'll never start but without Consistency You'll never Finish."
            </blockquote>
            
            <p className="text-yellow-400 text-xl font-semibold">— Chad Allen Dozier Sr.</p>
            <p className="text-white/50 mt-2">Founder, Dozier Holdings Group</p>
          </motion.div>
        </div>
      </section>

      {/* Einstein Quote */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-[#1a3a5c]/50 to-[#0d1e36]/50 rounded-3xl p-12 border border-cyan-500/20 text-center">
              <Lightbulb className="w-16 h-16 text-yellow-400 mx-auto mb-8" />
              
              <blockquote className="text-3xl md:text-5xl font-bold text-white mb-6">
                "Logic will get you from A to B.
                <br />
                <span className="text-cyan-400">Imagination will take you Everywhere.</span>"
              </blockquote>
              
              <p className="text-yellow-400 text-xl font-semibold">— Albert Einstein</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Closer's Mentality */}
      <section className="py-20 px-4 bg-[#0d1e36]">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Flame className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                THE CLOSER'S <span className="text-orange-500">MENTALITY</span>
              </h2>
              <p className="text-white/60 text-xl max-w-2xl mx-auto">
                You have to eat. And I have been hungry for years.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {closerQuotes.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl p-8 border border-orange-500/20 hover:border-orange-500/40 transition-all"
              >
                <blockquote className="text-xl md:text-2xl font-bold text-white mb-4">
                  "{item.quote}"
                </blockquote>
                <p className="text-orange-400 text-sm uppercase tracking-wider">
                  {item.context}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Rules of Power */}
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
              <Lock className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                THE 6 RULES OF <span className="text-cyan-400">POWER</span>
              </h2>
              <p className="text-white/60 text-xl max-w-2xl mx-auto">
                Move in silence. Let success make the noise.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {rulesOfPower.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#1a3a5c]/50 to-[#0d1e36]/50 rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-black text-xl group-hover:bg-cyan-500/30 transition-colors">
                    {rule.number}
                  </div>
                  <rule.icon className="w-8 h-8 text-cyan-400/50" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">
                  {rule.rule}
                </h3>
                
                <p className="text-white/60">
                  {rule.consequence}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Don't Tell People Your Next Move */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-gradient-to-r from-cyan-500/20 to-yellow-500/20 rounded-2xl px-12 py-8 border border-cyan-500/30">
              <p className="text-2xl md:text-3xl font-bold text-white">
                Don't tell people your next big move.
              </p>
              <p className="text-cyan-400 text-xl mt-2">
                Move in silence. Shock them with your results.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Journey - For All Stakeholders */}
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
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                THE <span className="text-yellow-400">JOURNEY</span>
              </h2>
              <p className="text-white/60 text-xl max-w-3xl mx-auto">
                Revolutionizing the sports market journey with athletes, parents, coaches, agents, lawyers, trainers, counselors, and chaplains. Total positivity. Total support.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { name: "Athletes", emoji: "" },
              { name: "Parents", emoji: "👨‍👩‍👧‍👦" },
              { name: "Coaches", emoji: "📋" },
              { name: "Agents", emoji: "" },
              { name: "Lawyers", emoji: "⚖️" },
              { name: "Trainers", emoji: "" },
              { name: "Counselors", emoji: "🧠" },
              { name: "Chaplains", emoji: "" }
            ].map((stakeholder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#1a3a5c]/30 rounded-xl p-6 text-center border border-cyan-500/10 hover:border-cyan-500/30 transition-all cursor-pointer group"
              >
                <span className="text-4xl mb-3 block">{stakeholder.emoji}</span>
                <p className="text-white font-semibold group-hover:text-cyan-400 transition-colors">
                  {stakeholder.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Watch the Studio */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Mic className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              WATCH THE <span className="text-cyan-400">STUDIO</span>
            </h2>
            <p className="text-white/60 text-xl max-w-2xl mx-auto mb-8">
              TED Talk style conversations about mindset, motivation, and the mental game. Real talk from real athletes and entrepreneurs.
            </p>
            <Link href="/studio">
              <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white px-10 py-6 text-lg rounded-full">
                Enter the Studio
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <UnifiedFooter />
    </div>
  );
}
