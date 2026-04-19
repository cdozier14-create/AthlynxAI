import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UnifiedNav from "@/components/UnifiedNav";
import UnifiedFooter from "@/components/UnifiedFooter";
import { 
  Check, 
  Star, 
  Users, 
  Trophy,
  GraduationCap,
  Briefcase,
  Heart,
  Shield,
  Lock,
  FileText,
  DollarSign,
  TrendingUp,
  Zap,
  Award,
  Building,
  Crown
} from "lucide-react";

export default function PricingTiers() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const lifetimeTiers = [
    {
      tier: 1,
      name: "The Foundation",
      tagline: "Ages 3-13",
      icon: Heart,
      color: "from-pink-500 to-rose-500",
      borderColor: "border-pink-500/50",
      price: "$49.99",
      priceNote: "One-Time Family Fee",
      focus: "For parents to track progress, save memories, and connect with other sports families.",
      why: "Parents pay once for a lifetime of memories for their young child. It's a simple, no-commitment purchase that gets them into your ecosystem early.",
      features: [
        "Digital scrapbook for photos and videos",
        "Skill and milestone tracker",
        "Team and community communication tools",
        "Parent networking features",
        "Youth sports event calendar",
        "Achievement badges and rewards"
      ],
      cta: "Start Your Journey"
    },
    {
      tier: 2,
      name: "The Prospect",
      tagline: "High School (Ages 14-18)",
      icon: GraduationCap,
      color: "from-blue-500 to-cyan-500",
      borderColor: "border-blue-500/50",
      price: billingCycle === "monthly" ? "$9.99" : "$99",
      priceNote: billingCycle === "monthly" ? "/month" : "/year (Save $20)",
      focus: "Building a personal brand and preparing for college-level NIL opportunities.",
      why: "This is an affordable monthly fee that unlocks the first real NIL tools. It transitions the user from a one-time purchase to a recurring revenue model.",
      features: [
        "All Foundation features",
        "Profile builder to create a public-facing athlete page",
        "Basic NIL education (the \"do's and don'ts\")",
        "Compliance reporting tools for first deals",
        "Recruiting profile optimization",
        "College coach visibility tools",
        "Highlight reel builder"
      ],
      cta: "Build Your Brand",
      popular: true
    },
    {
      tier: 3,
      name: "The NIL Athlete",
      tagline: "College (Ages 18-22)",
      icon: Trophy,
      color: "from-purple-500 to-violet-500",
      borderColor: "border-purple-500/50",
      price: "5%",
      priceNote: "of each deal done through the app",
      focus: "Actively making money from NIL deals and managing the business side of being an athlete.",
      why: "The app only makes money when the athlete makes money. This is the most powerful and fair model for college athletes. It shows you are a partner in their success.",
      features: [
        "All Prospect features",
        "Full access to the NIL Marketplace to connect with brands",
        "Contract management tools",
        "Connections to vetted lawyers and financial advisors",
        "Tax preparation assistance",
        "Deal negotiation support",
        "Brand partnership matching AI",
        "Compliance auto-reporting"
      ],
      cta: "Start Earning"
    },
    {
      tier: 4,
      name: "The Pro",
      tagline: "Professional Athlete",
      icon: Crown,
      color: "from-yellow-500 to-amber-500",
      borderColor: "border-yellow-500/50",
      price: "$499",
      priceNote: "/month",
      focus: "Professional brand management and wealth growth.",
      why: "Professional athletes have a team (agent, manager) who can expense this. The fee is for a premium, enterprise-level tool that helps manage a multi-million dollar brand.",
      features: [
        "All NIL Athlete features",
        "Advanced financial dashboards for tracking investments",
        "Tools for managing large-scale brand partnerships",
        "Secure document vault for contracts and financial records",
        "Dedicated account manager",
        "Priority deal flow",
        "Wealth management integrations",
        "Media training resources"
      ],
      cta: "Go Pro"
    },
    {
      tier: 5,
      name: "The Legacy",
      tagline: "Retired Athlete",
      icon: Award,
      color: "from-emerald-500 to-teal-500",
      borderColor: "border-emerald-500/50",
      price: "$29.99",
      priceNote: "/month",
      focus: "Staying relevant and finding post-career opportunities.",
      why: "A reduced fee to keep them on the platform, providing continued value and access to a powerful network long after their playing career has ended.",
      features: [
        "Access to a network of other retired athletes",
        "Marketplace for speaking engagements, coaching jobs, and appearances",
        "Tools to manage a charitable foundation",
        "Alumni networking events",
        "Career transition resources",
        "Broadcasting opportunity connections",
        "Mentorship program access"
      ],
      cta: "Build Your Legacy"
    }
  ];

  const businessTiers = [
    {
      name: "Scout",
      price: "$499",
      period: "/month",
      description: "For individual scouts and small agencies",
      features: [
        "Access to 10,000 athlete profiles",
        "Basic search and filters",
        "5 direct messages per month",
        "Export to CSV",
        "Email support"
      ]
    },
    {
      name: "Pro Team",
      price: "$2,499",
      period: "/month",
      description: "For college programs and pro teams",
      features: [
        "Unlimited athlete profiles",
        "Advanced analytics and AI matching",
        "Unlimited messaging",
        "API access",
        "Draft intelligence data",
        "Dedicated success manager",
        "Custom integrations"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For leagues, conferences, and large organizations",
      features: [
        "Everything in Pro Team",
        "White-label options",
        "Custom data feeds",
        "On-premise deployment option",
        "SLA guarantees",
        "Executive briefings",
        "Custom development"
      ]
    }
  ];

  const complianceBadges = [
    { icon: Shield, label: "NCAA Compliant", color: "text-green-400" },
    { icon: Lock, label: "AES-256 Encryption", color: "text-blue-400" },
    { icon: FileText, label: "SOC 2 Type II", color: "text-purple-400" },
    { icon: Users, label: "FERPA Compliant", color: "text-cyan-400" },
    { icon: Heart, label: "You Own Your Data", color: "text-pink-400" },
    { icon: Building, label: "HIPAA Compliant", color: "text-yellow-400" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <UnifiedNav />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        
        <div className="container relative px-4 md:px-5">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 mb-4">
              FROM PLAYGROUND TO PRO
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
              One Platform.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                Lifetime Value.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 mb-8">
              A tiered payment structure designed to grow with an athlete throughout their entire career.
              From age 3 to retirement and beyond.
            </p>

            {/* Compliance Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {complianceBadges.map((badge, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                  <badge.icon className={`w-4 h-4 ${badge.color}`} />
                  <span className="text-white/70 text-xs font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Pricing Tabs */}
      <section className="container px-4 md:px-5 pb-16">
        <Tabs defaultValue="athletes" className="w-full">
          <TabsList className="grid grid-cols-2 max-w-md mx-auto bg-white/5 border border-white/10 rounded-xl p-1 mb-8">
            <TabsTrigger value="athletes" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" /> For Athletes
            </TabsTrigger>
            <TabsTrigger value="business" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
              <Building className="w-4 h-4 mr-2" /> For Business
            </TabsTrigger>
          </TabsList>

          {/* Athletes Tab */}
          <TabsContent value="athletes">
            {/* Billing Toggle for Tier 2 */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/5 border border-white/10 rounded-full p-1 flex">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    billingCycle === "monthly" ? "bg-cyan-500 text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    billingCycle === "yearly" ? "bg-cyan-500 text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  Yearly <Badge className="ml-1 bg-green-500/20 text-green-400 text-xs">Save 17%</Badge>
                </button>
              </div>
            </div>

            {/* Lifetime Journey Visual */}
            <div className="relative mb-12">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-emerald-500 transform -translate-y-1/2 hidden md:block" />
              <div className="grid grid-cols-5 gap-2 relative">
                {lifetimeTiers.map((tier, i) => (
                  <div key={i} className="text-center">
                    <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-r ${tier.color} flex items-center justify-center mx-auto mb-2 relative z-10`}>
                      <tier.icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </div>
                    <p className="text-white/60 text-xs md:text-sm hidden md:block">{tier.tagline}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tier Cards */}
            <div className="space-y-6">
              {lifetimeTiers.map((tier, i) => (
                <Card key={i} className={`bg-white/5 ${tier.borderColor} border-2 overflow-hidden ${tier.popular ? 'ring-2 ring-cyan-500' : ''}`}>
                  {tier.popular && (
                    <div className="bg-cyan-500 text-white text-center py-1 text-sm font-bold">
                      MOST POPULAR
                    </div>
                  )}
                  <CardContent className="p-6 md:p-8">
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Left - Tier Info */}
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tier.color} flex items-center justify-center`}>
                            <tier.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <Badge className="bg-white/10 text-white/60 mb-1">Tier {tier.tier}</Badge>
                            <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                          </div>
                        </div>
                        <p className="text-white/50 text-sm mb-4">{tier.tagline}</p>
                        <div className="mb-4">
                          <span className="text-3xl md:text-4xl font-black text-white">{tier.price}</span>
                          <span className="text-white/50 text-sm ml-1">{tier.priceNote}</span>
                        </div>
                        <p className="text-white/70 text-sm">{tier.focus}</p>
                      </div>

                      {/* Middle - Features */}
                      <div className="md:border-l md:border-r border-white/10 md:px-6">
                        <h4 className="text-white font-semibold mb-3">What's Included:</h4>
                        <ul className="space-y-2">
                          {tier.features.map((feature, j) => (
                            <li key={j} className="flex items-start gap-2 text-white/70 text-sm">
                              <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right - Why & CTA */}
                      <div className="flex flex-col justify-between">
                        <div className="bg-white/5 rounded-lg p-4 mb-4">
                          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-400" /> Why This Works
                          </h4>
                          <p className="text-white/60 text-sm">{tier.why}</p>
                        </div>
                        <Button className={`w-full bg-gradient-to-r ${tier.color} hover:opacity-90 text-white font-bold py-6`}>
                          {tier.cta}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Business Tab */}
          <TabsContent value="business">
            <div className="grid md:grid-cols-3 gap-6">
              {businessTiers.map((tier, i) => (
                <Card key={i} className={`bg-white/5 border-white/10 ${tier.popular ? 'border-cyan-500 ring-2 ring-cyan-500' : ''}`}>
                  {tier.popular && (
                    <div className="bg-cyan-500 text-white text-center py-1 text-sm font-bold">
                      MOST POPULAR
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-white">{tier.name}</CardTitle>
                    <p className="text-white/50 text-sm">{tier.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <span className="text-4xl font-black text-white">{tier.price}</span>
                      <span className="text-white/50">{tier.period}</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-2 text-white/70 text-sm">
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className={`w-full ${tier.popular ? 'bg-cyan-500 hover:bg-cyan-400' : 'bg-white/10 hover:bg-white/20'} text-white`}>
                      {tier.price === "Custom" ? "Contact Sales" : "Get Started"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Enterprise CTA */}
            <Card className="mt-8 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/30">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-3">White-Label Licensing</h3>
                <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                  License the entire ATHLYNX platform for your school, league, or organization. 
                  Custom branding, dedicated support, and full data ownership.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="bg-cyan-500 hover:bg-cyan-400 text-white">
                    Request Demo
                  </Button>
                  <Link href="/partner-portal">
                    <Button variant="outline" className="border-cyan-500/50 text-cyan-400">
                      Partner Portal
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Revenue Model Section */}
      <section className="container px-4 md:px-5 py-16 border-t border-white/10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Where The Money Goes</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Transparent revenue streams that align our success with athlete success.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {[
            { icon: DollarSign, label: "Healthcare Broker Fees", desc: "Referral commissions from providers", pct: "15%" },
            { icon: Users, label: "Athlete Subscriptions", desc: "Premium features across all tiers", pct: "35%" },
            { icon: Building, label: "Pro Team Subscriptions", desc: "Draft intelligence data", pct: "20%" },
            { icon: TrendingUp, label: "NIL Deal Commissions", desc: "Platform-facilitated deals", pct: "30%" },
          ].map((item, i) => (
            <Card key={i} className="bg-white/5 border-white/10">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <p className="text-2xl font-bold text-white mb-1">{item.pct}</p>
                <h3 className="text-white font-semibold mb-1">{item.label}</h3>
                <p className="text-white/50 text-sm">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 md:px-5 py-16">
        <div className="bg-gradient-to-r from-cyan-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Join the Ecosystem?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            From playground to pro, we're with you every step of the way.
            Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/">
              <Button className="bg-white text-cyan-600 font-bold px-8 py-3 hover:bg-gray-100">
                Get Early Access
              </Button>
            </Link>
            <Link href="/investor-hub">
              <Button variant="outline" className="border-white text-white hover:bg-white/20 px-8 py-3">
                Investor Information
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <UnifiedFooter />
    </div>
  );
}
