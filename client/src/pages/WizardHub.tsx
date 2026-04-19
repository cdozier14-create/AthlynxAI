import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Sparkles, 
  Users, 
  Scale, 
  DollarSign, 
  GraduationCap, 
  Eye, 
  Heart, 
  RefreshCw,
  MessageCircle,
  Zap,
  Shield,
  Star,
  ChevronRight,
  Bot
} from "lucide-react";

const wizards = [
  {
    id: "agent",
    name: "Agent Wizard",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    description: "Find & vet sports agents, understand contracts, negotiate deals",
    features: ["Agent database", "Contract templates", "Negotiation tips", "Red flag alerts"],
    href: "/wizard/agent",
    popular: true,
  },
  {
    id: "lawyer",
    name: "Legal Advisor",
    icon: Scale,
    color: "from-purple-500 to-pink-500",
    description: "NIL compliance, contract review, legal protection guidance",
    features: ["Contract review", "NIL compliance", "Rights protection", "Legal templates"],
    href: "/wizard/lawyer",
    popular: true,
  },
  {
    id: "financial",
    name: "Financial Coach",
    icon: DollarSign,
    color: "from-green-500 to-emerald-500",
    description: "Money management, taxes, investments, budgeting for athletes",
    features: ["Budget planning", "Tax guidance", "Investment basics", "NIL income management"],
    href: "/wizard/financial",
    popular: true,
  },
  {
    id: "scholarship",
    name: "Scholarship Navigator",
    icon: GraduationCap,
    color: "from-amber-500 to-orange-500",
    description: "NCAA rules, academic eligibility, scholarship opportunities",
    features: ["NCAA rules explained", "Eligibility tracker", "Scholarship finder", "Academic planning"],
    href: "/wizard/scholarship",
    popular: false,
  },
  {
    id: "scout",
    name: "Scout Simulator",
    icon: Eye,
    color: "from-red-500 to-rose-500",
    description: "See yourself through a scout's eyes, improve your profile",
    features: ["Profile analysis", "Improvement tips", "Highlight review", "Combine prep"],
    href: "/wizard/scout",
    popular: false,
  },
  {
    id: "transfer",
    name: "Transfer Guide",
    icon: RefreshCw,
    color: "from-cyan-500 to-blue-500",
    description: "Navigate the transfer portal step-by-step",
    features: ["Portal timeline", "Communication templates", "School research", "Decision framework"],
    href: "/wizard/transfer",
    popular: true,
  },
  {
    id: "life",
    name: "Life Coach",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    description: "Balance athletics, academics, and personal life",
    features: ["Time management", "Mental wellness", "Relationship advice", "Career planning"],
    href: "/wizard/life",
    popular: false,
  },
  {
    id: "career",
    name: "Career Transition",
    icon: Zap,
    color: "from-indigo-500 to-purple-500",
    description: "Prepare for life after sports, build your future",
    features: ["Resume building", "Interview prep", "Network building", "Industry connections"],
    href: "/wizard/career",
    popular: false,
  },
];

function WizardCard({ wizard }: { wizard: typeof wizards[0] }) {
  const Icon = wizard.icon;
  
  return (
    <Link href={wizard.href}>
      <Card className="bg-slate-800/80 border-slate-700 hover:border-cyan-400/50 transition-all cursor-pointer group h-full">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${wizard.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <Icon className="w-7 h-7 text-white" />
            </div>
            {wizard.popular && (
              <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400" />
                POPULAR
              </span>
            )}
          </div>

          {/* Title & Description */}
          <h3 className="text-white font-bold text-lg mb-2 group-hover:text-cyan-400 transition-colors">
            {wizard.name}
          </h3>
          <p className="text-slate-400 text-sm mb-4">
            {wizard.description}
          </p>

          {/* Features */}
          <div className="space-y-2 mb-4">
            {wizard.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-slate-300 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                {feature}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-700">
            <span className="text-cyan-400 text-sm font-medium">Start Chat</span>
            <ChevronRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function WizardHub() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 to-purple-900 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              
              {/* Queen of the Ball Logo */}
              <Link href="/">
                <div className="relative cursor-pointer group">
                  <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 rounded-xl px-3 py-2 shadow-xl hover:shadow-cyan-500/30 transition-all border border-cyan-400/30">
                    <img 
                      src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/qUknrdlyPrUZJQYo.png" 
                      alt="ATHLYNX - The Athlete's Playbook" 
                      className="h-8 md:h-10 rounded-lg shadow-lg group-hover:scale-105 transition-all duration-300"
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full border border-slate-900 animate-pulse"></div>
                </div>
              </Link>
              
              <div>
                <h1 className="text-xl font-black text-white flex items-center gap-2">
                  <Bot className="w-5 h-5 text-cyan-400" />
                  AI Wizard Hub
                </h1>
                <p className="text-cyan-400 text-xs">THE ATHLETE'S PLAYBOOK</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-full border border-purple-500/30">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">Powered by Manus AI</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-cyan-400/20 px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium">YOUR SUCCESS TEAM</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            AI Advisors for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Every Step
            </span>{" "}
            of Your Journey
          </h2>
          
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            From finding the right agent to managing your finances, our AI wizards guide you through 
            every aspect of your athletic career and beyond. Available 24/7, always in your corner.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <p className="text-3xl font-black text-cyan-400">8</p>
              <p className="text-slate-400 text-sm">AI Wizards</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <p className="text-3xl font-black text-green-400">24/7</p>
              <p className="text-slate-400 text-sm">Available</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <p className="text-3xl font-black text-purple-400">FREE</p>
              <p className="text-slate-400 text-sm">For Athletes</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <p className="text-3xl font-black text-amber-400">∞</p>
              <p className="text-slate-400 text-sm">Questions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Wizard Grid */}
      <section className="pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wizards.map((wizard) => (
              <WizardCard key={wizard.id} wizard={wizard} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-2xl font-bold text-white text-center mb-12">How It Works</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-white font-bold mb-2">1. Ask Anything</h4>
              <p className="text-slate-400 text-sm">
                Type your question in plain English. No complicated forms or menus.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-white font-bold mb-2">2. Get Expert Guidance</h4>
              <p className="text-slate-400 text-sm">
                Our AI analyzes your situation and provides personalized advice instantly.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-white font-bold mb-2">3. Take Action</h4>
              <p className="text-slate-400 text-sm">
                Follow step-by-step recommendations and track your progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="bg-gradient-to-r from-cyan-900/50 to-purple-900/50 rounded-3xl p-8 md:p-12 border border-cyan-400/30">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Build Your Dream Career?
            </h3>
            <p className="text-slate-300 mb-6 max-w-xl mx-auto">
              Join thousands of athletes using ATHLYNX AI Wizards to navigate their journey from athletics to success.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/transfer-portal">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Transfer Portal
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:border-cyan-400">
                  <DollarSign className="w-4 h-4 mr-2" />
                  View Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800">
        <div className="container mx-auto text-center">
          <p className="text-slate-500 text-sm">
            © 2026 ATHLYNX • A Dozier Holdings Group Company • Powered by Manus AI
          </p>
        </div>
      </footer>
    </div>
  );
}
