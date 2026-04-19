import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import UnifiedNav from "@/components/UnifiedNav";
import UnifiedFooter from "@/components/UnifiedFooter";
import { 
  Bot, 
  Zap, 
  Shield, 
  Brain, 
  Heart, 
  Timer, 
  Battery, 
  Wifi, 
  Mountain,
  Building2,
  Fuel,
  Factory,
  GraduationCap,
  Trophy,
  DollarSign,
  Users,
  Calendar,
  ChevronRight,
  Play,
  CheckCircle2,
  Target,
  TrendingUp,
  Globe,
  Server,
  Flame,
  Lock
} from "lucide-react";

export default function FuelBots() {
  const [activeIndustry, setActiveIndustry] = useState("sports");

  const industries = [
    {
      id: "sports",
      name: "Sports & Stadiums",
      icon: Trophy,
      color: "from-cyan-500 to-blue-600",
      description: "Revolutionary training companions for athletes and teams",
      features: [
        "AI-powered drill running and real-time coaching",
        "Rapid AED delivery - 30% faster medical response",
        "Equipment transport across facilities",
        "24/7 training availability",
        "Performance data collection and analysis"
      ],
      stats: { value: "30%", label: "Faster Medical Response" }
    },
    {
      id: "datacenter",
      name: "Data Centers",
      icon: Server,
      color: "from-purple-500 to-indigo-600",
      description: "Autonomous monitoring and maintenance for critical infrastructure",
      features: [
        "Server rack inspection and monitoring",
        "Environmental condition tracking",
        "Cable management assistance",
        "Security patrol automation",
        "Predictive maintenance alerts"
      ],
      stats: { value: "24/7", label: "Continuous Monitoring" }
    },
    {
      id: "fuel",
      name: "Fuel & Gas",
      icon: Fuel,
      color: "from-orange-500 to-red-600",
      description: "Safety-first companions for hazardous environments",
      features: [
        "Pipeline inspection and leak detection",
        "Safety monitoring in hazardous zones",
        "Equipment transport in restricted areas",
        "Emergency response support",
        "Real-time environmental sensing"
      ],
      stats: { value: "IP66", label: "Protection Rating" }
    },
    {
      id: "geothermal",
      name: "Geothermal Power",
      icon: Flame,
      color: "from-green-500 to-emerald-600",
      description: "Sustainable energy facility companions",
      features: [
        "Facility monitoring and inspection",
        "Equipment health tracking",
        "Security operations",
        "Maintenance assistance",
        "Environmental compliance monitoring"
      ],
      stats: { value: "4-6hr", label: "Battery Life" }
    }
  ];

  const specs = [
    { icon: Mountain, label: "All-Terrain", value: "Grass, turf, concrete, indoor surfaces" },
    { icon: Brain, label: "AI Intelligence", value: "Voice interaction, behavioral adaptation, multi-modal sensors" },
    { icon: Battery, label: "Battery Life", value: "4-6 hours continuous, hot-swappable" },
    { icon: Shield, label: "Protection", value: "Industrial IP66 rated" },
    { icon: Zap, label: "Payload", value: "25kg heavy-duty capacity" },
    { icon: Wifi, label: "Navigation", value: "Autonomous with obstacle avoidance" },
    { icon: Timer, label: "Temperature Range", value: "-20°C to 55°C (-4°F to 131°F)" },
    { icon: Lock, label: "Passage Width", value: "50cm (20 inch) narrow clearance" }
  ];

  const roadmap = [
    {
      phase: "Phase 1",
      title: "Pilot Launch",
      date: "Q1-Q2 2026",
      description: "Deploy 5-10 Fuel Bots per university with NIL Portal integration",
      status: "upcoming"
    },
    {
      phase: "Phase 2",
      title: "Data Validation",
      date: "Q3-Q4 2026",
      description: "Capture metrics from 1,000+ athletes; document injury reduction",
      status: "planned"
    },
    {
      phase: "Phase 3",
      title: "National Expansion",
      date: "2027",
      description: "Scale to 50-100 universities; launch high school & pro packages",
      status: "planned"
    }
  ];

  const revenueStreams = [
    { icon: Building2, title: "Equipment Leasing", value: "$50K-$500K", description: "Annual contracts with universities & pro teams" },
    { icon: TrendingUp, title: "Data Subscriptions", value: "Premium", description: "Analytics for coaches, agents, and recruiters" },
    { icon: Globe, title: "Brand Partnerships", value: "Strategic", description: "Deals with major sports equipment brands" },
    { icon: Users, title: "B2C Expansion", value: "Consumer", description: "Stadium visibility drives demand" }
  ];

  const activeIndustryData = industries.find(i => i.id === activeIndustry);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section with Video */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-slate-950 via-cyan-950/30 to-slate-950" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          {/* Badge */}
          <Badge className="mb-6 bg-cyan-500/20 text-cyan-400 border-cyan-500/30 px-4 py-2 text-sm">
            <Bot className="w-4 h-4 mr-2" />
            DOZIER HOLDINGS GROUP
          </Badge>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tight">
            FUEL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">BOTS</span>
          </h1>
          <p className="text-2xl md:text-3xl text-cyan-400 font-bold mb-6">
            AI COMPANIONS
          </p>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Revolutionizing athletic performance, industrial operations, and critical infrastructure 
            with autonomous AI companions that work alongside humans.
          </p>

          {/* Key Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-black text-cyan-400">$180M</div>
              <div className="text-white/60 text-sm">Annual Market Opportunity</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-green-400">30%</div>
              <div className="text-white/60 text-sm">Faster Medical Response</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-orange-400">24/7</div>
              <div className="text-white/60 text-sm">Training Availability</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-6 text-lg">
              <Play className="w-5 h-5 mr-2" />
              Schedule Demo
            </Button>
            <Button size="lg" variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 px-8 py-6 text-lg">
              <GraduationCap className="w-5 h-5 mr-2" />
              University Pilot Program
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cyan-500/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Core Ecosystem */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-500/20 text-orange-400 border-orange-500/30">
              THE COMPLETE ECOSYSTEM
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Three Pillars. One <span className="text-cyan-400">Insurmountable Moat</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Dozier Holdings Group builds a complete OS for modern athletes, where each component strengthens the others.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* NIL Portal */}
            <Card className="bg-gradient-to-br from-blue-900/40 to-blue-950/40 border-blue-500/30 hover:border-blue-400/50 transition-all group">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/QNTbeHFuYniqJHLn.png" alt="NIL Portal" className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">NIL Portal</h3>
                <p className="text-white/60">Social network for athletes to manage NIL deals, training, and connections</p>
              </CardContent>
            </Card>

            {/* Fuel Candy */}
            <Card className="bg-gradient-to-br from-orange-900/40 to-orange-950/40 border-orange-500/30 hover:border-orange-400/50 transition-all group">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Fuel Candy</h3>
                <p className="text-white/60">Performance nutrition and supplements optimized for peak athletic performance</p>
              </CardContent>
            </Card>

            {/* Fuel Bots */}
            <Card className="bg-gradient-to-br from-cyan-900/40 to-cyan-950/40 border-cyan-500/30 hover:border-cyan-400/50 transition-all group ring-2 ring-cyan-500/50">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Bot className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Fuel Bots</h3>
                <p className="text-white/60">AI companions for training, medical response, and industrial operations</p>
                <Badge className="mt-4 bg-cyan-500/20 text-cyan-400">YOU ARE HERE</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Robot Dog Product Lines */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
              ADVANCED ROBOTICS PLATFORM
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Three Robot Dog <span className="text-cyan-400">Product Lines</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Industrial-grade AI companions designed for any environment and application.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Hexapod Robot Dog */}
            <Card className="bg-gradient-to-br from-cyan-900/30 to-cyan-950/30 border-cyan-500/30 hover:border-cyan-400/50 transition-all overflow-hidden">
              <CardContent className="p-0">
                <div className="h-48 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 flex items-center justify-center">
                  <Bot className="w-24 h-24 text-cyan-400" />
                </div>
                <div className="p-6">
                  <Badge className="mb-3 bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs">6 LEGS</Badge>
                  <h3 className="text-xl font-bold text-white mb-2">Hexapod Robot Dog</h3>
                  <p className="text-cyan-400 text-sm mb-4">六足机器狗</p>
                  <ul className="space-y-2 text-sm text-white/70">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />High stability under load</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />Minimal body undulation</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />Lower operating noise</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />Force & visual perception</li>
                  </ul>
                  <p className="mt-4 text-xs text-cyan-400 italic">"More stable, more powerful, more precise"</p>
                </div>
              </CardContent>
            </Card>

            {/* Wheel-Leg Hybrid */}
            <Card className="bg-gradient-to-br from-purple-900/30 to-purple-950/30 border-purple-500/30 hover:border-purple-400/50 transition-all overflow-hidden">
              <CardContent className="p-0">
                <div className="h-48 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 flex items-center justify-center">
                  <Bot className="w-24 h-24 text-purple-400" />
                </div>
                <div className="p-6">
                  <Badge className="mb-3 bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">HYBRID</Badge>
                  <h3 className="text-xl font-bold text-white mb-2">Wheel-Leg Hybrid</h3>
                  <p className="text-purple-400 text-sm mb-4">轮组机器狗</p>
                  <ul className="space-y-2 text-sm text-white/70">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />IP66 industrial protection</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />-20°C to 55°C operation</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />Hot-swappable battery</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />50cm narrow passage nav</li>
                  </ul>
                  <p className="mt-4 text-xs text-purple-400 italic">"Adaptable to extreme environments"</p>
                </div>
              </CardContent>
            </Card>

            {/* Medium Size */}
            <Card className="bg-gradient-to-br from-orange-900/30 to-orange-950/30 border-orange-500/30 hover:border-orange-400/50 transition-all overflow-hidden">
              <CardContent className="p-0">
                <div className="h-48 bg-gradient-to-br from-orange-600/20 to-red-600/20 flex items-center justify-center">
                  <Bot className="w-24 h-24 text-orange-400" />
                </div>
                <div className="p-6">
                  <Badge className="mb-3 bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">INDUSTRIAL</Badge>
                  <h3 className="text-xl font-bold text-white mb-2">Medium Size Robot</h3>
                  <p className="text-orange-400 text-sm mb-4">中型机器狗</p>
                  <ul className="space-y-2 text-sm text-white/70">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />Heavy payload standard</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />Premium hardware platform</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />Open for rapid development</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />Customizable applications</li>
                  </ul>
                  <p className="mt-4 text-xs text-orange-400 italic">"Built for industrial excellence"</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Industrial Robotics Specs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-500/20 text-purple-400 border-purple-500/30">
              INDUSTRIAL ROBOTICS
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Proven Technology. <span className="text-purple-400">Revolutionary Application.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {specs.map((spec, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700/50 hover:border-purple-500/50 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <spec.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">{spec.label}</h3>
                      <p className="text-white/60 text-sm">{spec.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Roles Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">
              TRANSFORMING OPERATIONS
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Dual Roles: <span className="text-green-400">AI Trainer</span> & <span className="text-red-400">Medical Response</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* AI Trainer */}
            <Card className="bg-gradient-to-br from-green-900/30 to-green-950/30 border-green-500/30 overflow-hidden">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mb-6">
                  <Brain className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">AI-Powered Trainer</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-white/80">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    Runs drills and provides real-time coaching
                  </li>
                  <li className="flex items-center gap-3 text-white/80">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    Voice interaction and behavioral adaptation
                  </li>
                  <li className="flex items-center gap-3 text-white/80">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    24/7 training availability
                  </li>
                  <li className="flex items-center gap-3 text-white/80">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    Performance data collection
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Medical Response */}
            <Card className="bg-gradient-to-br from-red-900/30 to-red-950/30 border-red-500/30 overflow-hidden">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Medical & Safety</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-white/80">
                    <CheckCircle2 className="w-5 h-5 text-red-400 flex-shrink-0" />
                    Rapid AED delivery to any location
                  </li>
                  <li className="flex items-center gap-3 text-white/80">
                    <CheckCircle2 className="w-5 h-5 text-red-400 flex-shrink-0" />
                    30% faster medical response time
                  </li>
                  <li className="flex items-center gap-3 text-white/80">
                    <CheckCircle2 className="w-5 h-5 text-red-400 flex-shrink-0" />
                    Injury support and first aid supplies
                  </li>
                  <li className="flex items-center gap-3 text-white/80">
                    <CheckCircle2 className="w-5 h-5 text-red-400 flex-shrink-0" />
                    Emergency alert system integration
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Multi-Industry Applications */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
              MULTI-INDUSTRY APPLICATIONS
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              One Platform. <span className="text-cyan-400">Endless Possibilities.</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              From sports stadiums to power stations, Fuel Bots adapt to any environment.
            </p>
          </div>

          {/* Industry Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {industries.map((industry) => (
              <Button
                key={industry.id}
                variant={activeIndustry === industry.id ? "default" : "outline"}
                onClick={() => setActiveIndustry(industry.id)}
                className={activeIndustry === industry.id 
                  ? `bg-gradient-to-r ${industry.color} text-white border-0`
                  : "border-slate-600 text-white/70 hover:text-white hover:border-slate-500"
                }
              >
                <industry.icon className="w-4 h-4 mr-2" />
                {industry.name}
              </Button>
            ))}
          </div>

          {/* Active Industry Content */}
          {activeIndustryData && (
            <div className="max-w-4xl mx-auto">
              <Card className={`bg-gradient-to-br ${activeIndustryData.color.replace('from-', 'from-').replace('to-', 'to-')}/10 border-white/10`}>
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activeIndustryData.color} flex items-center justify-center mb-6`}>
                        <activeIndustryData.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{activeIndustryData.name}</h3>
                      <p className="text-white/60 mb-6">{activeIndustryData.description}</p>
                      <ul className="space-y-3">
                        {activeIndustryData.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3 text-white/80">
                            <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex-shrink-0 flex items-center justify-center">
                      <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/10">
                        <div className="text-5xl font-black text-white mb-2">{activeIndustryData.stats.value}</div>
                        <div className="text-white/60">{activeIndustryData.stats.label}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Revenue Model */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">
              <DollarSign className="w-4 h-4 mr-1" />
              REVENUE MODEL
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              <span className="text-green-400">$180M</span> Annual Market Opportunity
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {revenueStreams.map((stream, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700/50 hover:border-green-500/50 transition-all group">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <stream.icon className="w-7 h-7 text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{stream.title}</h3>
                  <div className="text-green-400 font-bold mb-2">{stream.value}</div>
                  <p className="text-white/60 text-sm">{stream.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Roadmap */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">
              <Calendar className="w-4 h-4 mr-1" />
              IMPLEMENTATION ROADMAP
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Pilot Programs Launch <span className="text-blue-400">Q1 2026</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500" />

              {/* Timeline Items */}
              <div className="space-y-8">
                {roadmap.map((item, index) => (
                  <div key={index} className="relative pl-20">
                    {/* Timeline Dot */}
                    <div className="absolute left-6 w-5 h-5 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 border-4 border-slate-900" />
                    
                    <Card className="bg-slate-800/50 border-slate-700/50 hover:border-blue-500/50 transition-all">
                      <CardContent className="p-6">
                        <div className="flex flex-wrap items-center gap-4 mb-2">
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            {item.phase}
                          </Badge>
                          <span className="text-cyan-400 font-bold">{item.date}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-white/60">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-500/20 text-orange-400 border-orange-500/30">
              JOIN THE REVOLUTION
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              The Future of Athletic Training <span className="text-orange-400">Starts Now</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Universities */}
            <Card className="bg-gradient-to-br from-blue-900/40 to-blue-950/40 border-blue-500/30 hover:border-blue-400/50 transition-all group cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Universities</h3>
                <p className="text-white/60 text-sm mb-4">Join our pilot program today</p>
                <Button className="w-full bg-blue-500 hover:bg-blue-400">
                  Apply Now <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            {/* Pro Teams */}
            <Card className="bg-gradient-to-br from-purple-900/40 to-purple-950/40 border-purple-500/30 hover:border-purple-400/50 transition-all group cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Trophy className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Pro Teams</h3>
                <p className="text-white/60 text-sm mb-4">Schedule a live demonstration</p>
                <Button className="w-full bg-purple-500 hover:bg-purple-400">
                  Book Demo <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            {/* Investors */}
            <Card className="bg-gradient-to-br from-green-900/40 to-green-950/40 border-green-500/30 hover:border-green-400/50 transition-all group cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <DollarSign className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Investors</h3>
                <p className="text-white/60 text-sm mb-4">Be part of the $180M opportunity</p>
                <Button className="w-full bg-green-500 hover:bg-green-400">
                  Learn More <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            {/* Athletes */}
            <Card className="bg-gradient-to-br from-cyan-900/40 to-cyan-950/40 border-cyan-500/30 hover:border-cyan-400/50 transition-all group cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Athletes</h3>
                <p className="text-white/60 text-sm mb-4">Experience the future of training</p>
                <Button className="w-full bg-cyan-500 hover:bg-cyan-400">
                  Sign Up <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Branding */}
          <div className="text-center mt-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/AzsuZOzvfgvscIdI.png" alt="DHG" className="w-12 h-12 rounded-full" />
              <div className="text-left">
                <div className="text-white font-bold">Dozier Holdings Group</div>
                <div className="text-white/60 text-sm">NIL Portal | Fuel Candy | Fuel Bots</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <UnifiedNav />
      <UnifiedFooter />
    </div>
  );
}
