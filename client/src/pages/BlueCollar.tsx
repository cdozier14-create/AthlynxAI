import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Star,
  Wrench,
  HardHat,
  Truck,
  Zap,
  Hammer,
  Flame,
  Droplets,
  Building,
  Factory,
  Tractor,
  Anchor,
  Users,
  DollarSign,
  TrendingUp,
  Award,
  CheckCircle2,
  Sparkles,
  Heart,
  BookOpen
} from "lucide-react";

const industries = [
  { icon: Zap, name: "Electricians", workers: "739K", growth: "+9%" },
  { icon: Droplets, name: "Plumbers", workers: "500K", growth: "+5%" },
  { icon: Wrench, name: "Mechanics", workers: "775K", growth: "+4%" },
  { icon: Flame, name: "Welders", workers: "438K", growth: "+8%" },
  { icon: HardHat, name: "Construction", workers: "7.7M", growth: "+4%" },
  { icon: Truck, name: "Trucking", workers: "3.5M", growth: "+6%" },
  { icon: Factory, name: "Manufacturing", workers: "12.8M", growth: "+3%" },
  { icon: Tractor, name: "Agriculture", workers: "2.6M", growth: "+2%" },
  { icon: Anchor, name: "Maritime", workers: "650K", growth: "+5%" },
  { icon: Building, name: "HVAC", workers: "394K", growth: "+13%" },
  { icon: Hammer, name: "Carpentry", workers: "1.0M", growth: "+2%" },
  { icon: Wrench, name: "Machinists", workers: "421K", growth: "+7%" }
];

const starLevels = [
  {
    stars: 5,
    title: "Master Craftsman",
    requirements: "20+ years, master certification, business owner, industry recognition",
    earnings: "$150,000 - $500,000+",
    opportunities: "Brand ambassadorships, TV appearances, consulting, product development",
    color: "from-amber-400 to-yellow-500"
  },
  {
    stars: 4,
    title: "Expert Tradesperson",
    requirements: "10-20 years, journeyman license, team lead, specialized skills",
    earnings: "$80,000 - $150,000",
    opportunities: "Regional sponsorships, training videos, equipment endorsements",
    color: "from-purple-400 to-purple-600"
  },
  {
    stars: 3,
    title: "Skilled Professional",
    requirements: "5-10 years, licensed, consistent quality work, good reviews",
    earnings: "$50,000 - $80,000",
    opportunities: "Local partnerships, social media features, apprentice mentoring",
    color: "from-blue-400 to-blue-600"
  },
  {
    stars: 2,
    title: "Rising Tradesperson",
    requirements: "2-5 years, apprenticeship complete, building reputation",
    earnings: "$35,000 - $50,000",
    opportunities: "Skill showcases, job matching, certification support",
    color: "from-green-400 to-green-600"
  },
  {
    stars: 1,
    title: "Apprentice",
    requirements: "0-2 years, in training, learning the trade",
    earnings: "$25,000 - $35,000",
    opportunities: "Mentorship matching, training resources, career guidance",
    color: "from-slate-400 to-slate-600"
  }
];

const lifePlaybookFeatures = [
  {
    icon: BookOpen,
    title: "Your Life Playbook",
    description: "A personalized roadmap for career success, financial growth, and life goals — regardless of your industry."
  },
  {
    icon: TrendingUp,
    title: "Skill Progression",
    description: "Track your certifications, experience, and achievements. Level up from apprentice to master craftsman."
  },
  {
    icon: DollarSign,
    title: "NIL Marketplace",
    description: "Connect with brands that value real workers. Endorsements, sponsorships, and content opportunities."
  },
  {
    icon: Users,
    title: "Community Network",
    description: "Connect with others in your trade. Share knowledge, find mentors, and build your professional network."
  },
  {
    icon: Award,
    title: "Recognition System",
    description: "Get recognized for quality work. Customer reviews, peer endorsements, and industry certifications."
  },
  {
    icon: Heart,
    title: "Family Benefits",
    description: "Healthcare guidance, retirement planning, and family support resources for blue-collar families."
  }
];

const successStories = [
  {
    name: "Mike's Electric",
    trade: "Electrician",
    stars: 5,
    story: "Started as an apprentice, now owns a 50-person company. Brand ambassador for Milwaukee Tools.",
    earnings: "NIL deals worth $75K/year"
  },
  {
    name: "Sarah the Welder",
    trade: "Welder",
    stars: 4,
    story: "Female welder breaking barriers. Featured in industry magazines, sponsors welding gear.",
    earnings: "NIL deals worth $40K/year"
  },
  {
    name: "Big Rig Tony",
    trade: "Trucker",
    stars: 4,
    story: "3 million miles, zero accidents. Brand ambassador for Peterbilt and safety equipment.",
    earnings: "NIL deals worth $50K/year"
  }
];

export default function BlueCollar() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-orange-950/20 to-slate-900">
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
            <HardHat className="w-5 h-5 text-orange-400" />
            <span className="font-semibold text-white">Blue Collar Stars</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mb-6">
              <Wrench className="w-3 h-3 mr-1" />
              The Life Playbook
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Blue Collar <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Stars</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Athletes aren't the only stars. Electricians, plumbers, welders, truckers — 
              the backbone of America deserves NIL deals too. Everyone is a commodity. Everyone has value.
            </p>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { value: "30M+", label: "Blue Collar Workers" },
              { value: "0-5", label: "Star Rating System" },
              { value: "$1B+", label: "Potential NIL Market" },
              { value: "∞", label: "Dreams to Chase" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                <div className="text-3xl font-bold text-orange-400">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mission Statement */}
          <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-3xl border border-orange-500/30 p-8 text-center">
            <Sparkles className="w-12 h-12 text-orange-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">
              "Everyone is an NIL Commodity"
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Athletes started the NIL revolution. Now we're expanding it to everyone. 
              Your skills, your reputation, your personal brand — they all have value. 
              Let's monetize it together.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Industries We Serve</h2>
            <p className="text-slate-400">Every trade. Every skill. Every worker.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {industries.map((industry, index) => (
              <Card key={index} className="bg-slate-900/50 border-slate-700 hover:border-orange-500/50 transition-all duration-300 text-center">
                <CardContent className="p-4">
                  <industry.icon className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                  <h3 className="text-white font-medium text-sm mb-1">{industry.name}</h3>
                  <p className="text-slate-500 text-xs">{industry.workers} workers</p>
                  <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                    {industry.growth}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Star Rating System */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">The Star System</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Just like athletes, workers have different levels of skill and experience. 
              Our 0-5 star system matches you with opportunities that fit your profile.
            </p>
          </div>

          <div className="space-y-4">
            {starLevels.map((level, index) => (
              <Card key={index} className="bg-slate-900/50 border-slate-700 overflow-hidden">
                <div className={`h-1 bg-gradient-to-r ${level.color}`} />
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-4 items-center">
                    <div className="flex items-center gap-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${i < level.stars ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-white font-bold">{level.title}</span>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">{level.requirements}</p>
                    </div>
                    <div>
                      <p className="text-green-400 font-semibold">{level.earnings}</p>
                    </div>
                    <div>
                      <p className="text-orange-400 text-sm">{level.opportunities}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Life Playbook Features */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500/10 to-amber-500/10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mb-4">
              <BookOpen className="w-3 h-3 mr-1" />
              Your Personal Guide
            </Badge>
            <h2 className="text-3xl font-bold text-white mb-4">The Life Playbook</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              More than just a job platform. It's your complete guide to career success, 
              financial growth, and achieving your dreams — whatever industry you're in.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lifePlaybookFeatures.map((feature, index) => (
              <Card key={index} className="bg-slate-900/50 border-slate-700 hover:border-orange-500/50 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500/20 to-amber-500/20 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-orange-400" />
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Success Stories</h2>
            <p className="text-slate-400">Real workers. Real NIL deals. Real success.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(story.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{story.name}</h3>
                  <Badge className="mb-4 bg-orange-500/20 text-orange-400 border-orange-500/30">
                    {story.trade}
                  </Badge>
                  <p className="text-slate-400 text-sm mb-4">{story.story}</p>
                  <div className="pt-4 border-t border-slate-700">
                    <p className="text-green-400 font-semibold">{story.earnings}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-slate-800/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-slate-400">From sign-up to NIL deal in 4 simple steps</p>
          </div>

          <div className="space-y-6">
            {[
              { step: 1, title: "Create Your Profile", description: "Add your trade, experience, certifications, and work history. Upload photos of your best work." },
              { step: 2, title: "Get Your Star Rating", description: "Our AI analyzes your profile and assigns a 0-5 star rating based on experience, skills, and reputation." },
              { step: 3, title: "Match with Brands", description: "Brands looking for authentic blue-collar ambassadors find you. Review and accept opportunities." },
              { step: 4, title: "Earn & Grow", description: "Complete NIL deals, build your reputation, and level up your star rating. Dreams come true." }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Vision */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-3xl border border-orange-500/30 p-8 md:p-12">
            <Heart className="w-12 h-12 text-red-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-6">
              Dreams Do Truly Come True
            </h2>
            <p className="text-slate-400 text-lg mb-6 leading-relaxed">
              Athletes catapulted the NIL revolution. Now we're bringing it to everyone. 
              The one-man billionaire story begins with believing that every person — 
              athlete, veteran, blue-collar worker — has value worth monetizing.
            </p>
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
              "Everyone is an NIL Commodity. Everyone Has a Star Rating. Everyone Can Win."
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-600 to-amber-600">
        <div className="container mx-auto max-w-4xl text-center">
          <HardHat className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join the Revolution
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Whether you're an electrician, welder, trucker, or any other trade — 
            your skills have value. Join the Life Playbook and start your journey to NIL success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/early-access">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-white/90 px-8">
                <Star className="w-5 h-5 mr-2" />
                Get Your Star Rating
              </Button>
            </Link>
            <Link href="/veterans">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                Veterans Program
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-slate-900 border-t border-slate-800 text-center">
        <p className="text-slate-500">
          © 2026 Dozier Holdings Group, LLC. All rights reserved.
        </p>
        <p className="text-orange-400 font-medium mt-2">
          The Life Playbook — Dreams Do Truly Come True
        </p>
      </footer>
    </div>
  );
}
