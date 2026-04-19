import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Shield,
  Star,
  Heart,
  Medal,
  Users,
  Briefcase,
  GraduationCap,
  Home,
  Stethoscope,
  Bot,
  DollarSign,
  CheckCircle2,
  Flag,
  Award,
  Target
} from "lucide-react";

const veteranBenefits = [
  {
    icon: DollarSign,
    title: "NIL Opportunities",
    description: "Veterans are heroes. Heroes deserve endorsement deals, speaking engagements, and brand partnerships.",
    features: ["Brand partnerships", "Speaking engagements", "Endorsement deals", "Content creation"]
  },
  {
    icon: Briefcase,
    title: "Career Transition",
    description: "Military skills translate to civilian success. We connect veterans with employers who value their experience.",
    features: ["Job matching", "Resume building", "Interview prep", "Skill translation"]
  },
  {
    icon: GraduationCap,
    title: "Education Support",
    description: "GI Bill optimization, scholarship matching, and educational resources for veterans and families.",
    features: ["GI Bill guidance", "Scholarship matching", "Trade certifications", "Degree programs"]
  },
  {
    icon: Stethoscope,
    title: "Health & Wellness",
    description: "Access to Villa Agape for recovery, mental health resources, and companion robot support.",
    features: ["Villa Agape access", "Mental health support", "PTSD resources", "Robot companions"]
  },
  {
    icon: Home,
    title: "Housing Assistance",
    description: "VA loan guidance, housing resources, and connections to veteran-friendly communities.",
    features: ["VA loan help", "Housing search", "Community connections", "Relocation support"]
  },
  {
    icon: Bot,
    title: "Robot Companions",
    description: "Guide dog robots for injured veterans, providing independence and companionship.",
    features: ["Guide assistance", "PTSD support", "24/7 companionship", "Emergency alerts"]
  }
];

const starRatings = [
  {
    stars: 5,
    title: "Elite Veteran",
    description: "Special Forces, Medal of Honor recipients, Distinguished Service",
    benefits: "Premium brand deals, executive speaking, VIP access to all programs",
    color: "from-amber-400 to-yellow-500"
  },
  {
    stars: 4,
    title: "Distinguished Veteran",
    description: "Combat veterans, Purple Heart recipients, 20+ years service",
    benefits: "Major brand partnerships, conference speaking, priority job placement",
    color: "from-purple-400 to-purple-600"
  },
  {
    stars: 3,
    title: "Honored Veteran",
    description: "10+ years service, leadership roles, specialized skills",
    benefits: "Brand collaborations, podcast features, career mentorship",
    color: "from-blue-400 to-blue-600"
  },
  {
    stars: 2,
    title: "Valued Veteran",
    description: "4-10 years service, honorable discharge, skilled trades",
    benefits: "Local partnerships, community features, job matching",
    color: "from-green-400 to-green-600"
  },
  {
    stars: 1,
    title: "Rising Veteran",
    description: "New veterans, transitioning service members",
    benefits: "Mentorship program, skill building, network access",
    color: "from-slate-400 to-slate-600"
  }
];

const partnerBrands = [
  "Defense contractors seeking authentic voices",
  "Outdoor and tactical brands",
  "Fitness and nutrition companies",
  "Financial services for military",
  "Automotive and truck brands",
  "Home improvement companies",
  "Technology and security firms",
  "Healthcare and wellness brands"
];

export default function Veterans() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="gap-2 text-white hover:text-white hover:bg-slate-800">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <span className="font-semibold text-white">Veterans Heroes</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 relative overflow-hidden">
        {/* American flag overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-red-600 to-transparent" />
        </div>
        
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center mb-12">
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-6">
              <Flag className="w-3 h-3 mr-1" />
              Honoring Those Who Served
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Veterans <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500">Heroes</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              You served your country. Now let us serve you. The first NIL marketplace 
              designed exclusively for America's veterans — because heroes deserve more than a thank you.
            </p>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { value: "19M+", label: "U.S. Veterans" },
              { value: "200K+", label: "Transitioning Annually" },
              { value: "$0", label: "Platform Fee for Vets" },
              { value: "100%", label: "Respect & Honor" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                <div className="text-3xl font-bold text-amber-400">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mission Statement */}
          <div className="bg-gradient-to-r from-amber-500/10 to-red-500/10 rounded-3xl border border-amber-500/30 p-8 text-center">
            <Medal className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <blockquote className="text-2xl font-medium text-white italic mb-4">
              "Faith. Country. Family. Leadership."
            </blockquote>
            <p className="text-slate-400">
              Our founder's creed. Veterans embody these values every day. 
              That's why we built this platform — to give back to those who gave everything.
            </p>
          </div>
        </div>
      </section>

      {/* Star Rating System */}
      <section className="py-16 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Veteran Star Ratings</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Just like athletes, veterans have different levels of experience and achievement. 
              Our star system matches you with opportunities that fit your profile.
            </p>
          </div>

          <div className="space-y-4">
            {starRatings.map((rating, index) => (
              <Card key={index} className="bg-slate-900/50 border-slate-700 overflow-hidden">
                <div className={`h-1 bg-gradient-to-r ${rating.color}`} />
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center gap-3 md:w-48">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${i < rating.stars ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">{rating.title}</h3>
                      <p className="text-slate-400 text-sm mb-2">{rating.description}</p>
                      <p className="text-amber-400 text-sm">{rating.benefits}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Complete Veteran Support</h2>
            <p className="text-slate-400">Everything you need to thrive after service</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {veteranBenefits.map((benefit, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-amber-500/50 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500/20 to-red-500/20 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <CardTitle className="text-white">{benefit.title}</CardTitle>
                  <p className="text-slate-400 text-sm">{benefit.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {benefit.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* NIL Opportunities */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-500/10 to-red-500/10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-6">
                <DollarSign className="w-3 h-3 mr-1" />
                Monetize Your Service
              </Badge>
              <h2 className="text-3xl font-bold text-white mb-6">
                Your Service Has Value
              </h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Athletes get NIL deals. Why not veterans? Your experience, your story, your authenticity — 
                brands want to work with real American heroes. We make those connections happen.
              </p>
              
              <div className="space-y-3">
                <h3 className="text-white font-semibold">Brands Looking for Veterans:</h3>
                <div className="grid grid-cols-1 gap-2">
                  {partnerBrands.map((brand, index) => (
                    <div key={index} className="flex items-center gap-2 text-slate-300 text-sm">
                      <Target className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      {brand}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-8">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Veteran NIL Opportunities</h3>
              <div className="space-y-4">
                {[
                  { type: "Brand Ambassador", range: "$500 - $10,000/month", icon: Award },
                  { type: "Speaking Engagement", range: "$1,000 - $25,000/event", icon: Users },
                  { type: "Content Creation", range: "$200 - $5,000/post", icon: Star },
                  { type: "Endorsement Deal", range: "$5,000 - $100,000+", icon: Medal }
                ].map((opp, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                    <div className="flex items-center gap-3">
                      <opp.icon className="w-5 h-5 text-amber-400" />
                      <span className="text-white font-medium">{opp.type}</span>
                    </div>
                    <span className="text-green-400 font-semibold">{opp.range}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Villa Agape Connection */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-amber-400 to-red-500" />
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-amber-500/20 to-red-500/20 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-red-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Villa Agape for Veterans</h2>
                  <p className="text-slate-400">A place of healing and love</p>
                </div>
              </div>
              
              <p className="text-slate-300 mb-6 leading-relaxed">
                Villa Agape was built for cancer patients in remission — including veterans. 
                Many who served come home with invisible wounds. Our IoT-enabled villas provide 
                a safe, healing environment with 24/7 monitoring, companion robots, and a community 
                that understands sacrifice.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { label: "PTSD Support", icon: Heart },
                  { label: "Robot Companions", icon: Bot },
                  { label: "Health Monitoring", icon: Stethoscope }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                    <item.icon className="w-5 h-5 text-amber-400" />
                    <span className="text-white text-sm">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/robot-companions">
                  <Button className="bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white">
                    <Bot className="w-4 h-4 mr-2" />
                    Learn About Robot Companions
                  </Button>
                </Link>
                <Link href="/our-story">
                  <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                    Read Our Story
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-900 to-slate-900">
        <div className="container mx-auto max-w-4xl text-center">
          <Flag className="w-16 h-16 text-amber-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Thank You for Your Service
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Now let us serve you. Join the Veterans Heroes program and unlock opportunities 
            you've earned through your sacrifice and dedication to our country.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/early-access">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white px-8">
                <Shield className="w-5 h-5 mr-2" />
                Join Veterans Program
              </Button>
            </Link>
            <Link href="/blue-collar">
              <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800 px-8">
                Explore All Programs
              </Button>
            </Link>
          </div>
          
          <p className="text-amber-400 font-semibold mt-8">
            100% Free for All Veterans. Always.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-slate-900 border-t border-slate-800 text-center">
        <p className="text-slate-500">
          © 2026 Dozier Holdings Group, LLC. All rights reserved.
        </p>
        <p className="text-amber-400 font-medium mt-2">
          Faith. Country. Family. Leadership.
        </p>
      </footer>
    </div>
  );
}
