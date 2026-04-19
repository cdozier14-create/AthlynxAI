import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Bot,
  Heart,
  Shield,
  Eye,
  Cpu,
  Battery,
  Navigation,
  Thermometer,
  Volume2,
  Hand,
  Zap,
  Home,
  Building2,
  Users,
  Sparkles,
  CheckCircle2
} from "lucide-react";

const robotProducts = [
  {
    name: "Hexapod Robot Dog",
    tagline: "Six Legs of Stability",
    description: "High stability with smoother movement under load, minimal body undulation, and lower operating noise. Perfect for indoor environments.",
    features: [
      "6-leg design for maximum stability",
      "Force sensing & visual perception",
      "Multi-modal human-robot interaction",
      "Stable walking on unstructured terrain",
      "Heavy-load capacity"
    ],
    useCases: ["Villa Agape Companion", "Indoor Patrol", "Elderly Care"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "Wheel-Leg Hybrid",
    tagline: "Adaptable to Any Environment",
    description: "Industrial-grade IP66 protection with wide operating temperature range. Features autonomous navigation and charging.",
    features: [
      "IP66 weather protection",
      "-20°C to 55°C operation",
      "Hot-swappable battery",
      "50cm narrow passage navigation",
      "Night supplementary lighting"
    ],
    useCases: ["Data Center Patrol", "Outdoor Security", "Property Inspection"],
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "Medium Size Robot Dog",
    tagline: "Industrial-Grade Power",
    description: "Premium mobile hardware platform with 25kg walking load and 100kg standing load. Open for rapid development.",
    features: [
      "25kg continuous walking load",
      "100kg standing load capacity",
      "8-Core High-Performance CPU",
      "Intel Core i7 for development",
      "High computing power expansion"
    ],
    useCases: ["Heavy Duty Tasks", "Research Platform", "Custom Development"],
    color: "from-amber-500 to-orange-500"
  }
];

const solutions = [
  {
    title: "Smart Patrol Inspection",
    icon: Shield,
    description: "Autonomous patrol and inspection for data centers, properties, and facilities",
    workflow: [
      "Explore targets & inspection path",
      "Set up inspection location & mission",
      "Real-time inspection on pre-set paths",
      "Generate real-time results & reports",
      "Return to auto-charge, repeat"
    ],
    applications: ["VC Data Centers", "Villa Agape Security", "Pisces Resort Patrol"]
  },
  {
    title: "Guide Dog Robot",
    icon: Eye,
    description: "Full-sensory intelligent robot dog for visually impaired individuals and veterans",
    workflow: [
      "Traffic signal recognition",
      "Navigation and positioning",
      "Voice human-robot interaction",
      "Cane force interaction",
      "Safety-first decision making"
    ],
    applications: ["Veteran Assistance", "Elderly Support", "Accessibility Aid"]
  },
  {
    title: "Companion Care",
    icon: Heart,
    description: "Emotional support and health monitoring for patients and elderly residents",
    workflow: [
      "Vital sign monitoring",
      "Fall detection alerts",
      "Medication reminders",
      "Emergency response",
      "Family video calls"
    ],
    applications: ["Villa Agape Residents", "Cancer Patient Support", "Elderly Care"]
  }
];

const dhgApplications = [
  {
    company: "Villa Agape",
    icon: Home,
    description: "Companion robots for cancer patients in remission",
    benefits: ["24/7 companionship", "Health monitoring", "Fall detection", "Emergency alerts"]
  },
  {
    company: "VC Data Centers",
    icon: Building2,
    description: "Autonomous patrol and inspection robots",
    benefits: ["Server monitoring", "Temperature checks", "Security patrol", "Anomaly detection"]
  },
  {
    company: "Veterans Program",
    icon: Shield,
    description: "Guide dog robots for injured veterans",
    benefits: ["Navigation assistance", "PTSD support", "Independence", "Companionship"]
  },
  {
    company: "Pisces Resort",
    icon: Sparkles,
    description: "Guest services and property security",
    benefits: ["Guest assistance", "Property patrol", "Concierge services", "Night security"]
  }
];

export default function RobotCompanions() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
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
            <Bot className="w-5 h-5 text-cyan-400" />
            <span className="font-semibold text-white">Robot Companions</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 mb-6">
              <Bot className="w-3 h-3 mr-1" />
              Hansi Tech Partnership
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Robot <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Companions</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Breaking application boundaries with high-performance robot dogs. 
              From companion care to industrial patrol — intelligent robots that serve, protect, and care.
            </p>
          </div>

          {/* Hero Visual */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 p-8 mb-16">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjI4MzMiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyem0tNiA2aC00djJoNHYtMnptLTYgMGgtNHYyaDR2LTJ6bTEyIDBWMjhoLTJ2Nmgyem0tNiA2di00aC0ydjRoMnptNi02aC00djJoNHYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
            <div className="relative grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold text-cyan-400 mb-2">3</div>
                <div className="text-slate-400">Robot Models</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-blue-400 mb-2">24/7</div>
                <div className="text-slate-400">Autonomous Operation</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-purple-400 mb-2">IP66</div>
                <div className="text-slate-400">Weather Protection</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Robot Products */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Robot Fleet</h2>
            <p className="text-slate-400">Three specialized robots for every need</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {robotProducts.map((robot, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 overflow-hidden group">
                <div className={`h-2 bg-gradient-to-r ${robot.color}`} />
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${robot.color} flex items-center justify-center`}>
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{robot.name}</CardTitle>
                      <p className="text-sm text-slate-400">{robot.tagline}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 text-sm mb-4">{robot.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {robot.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {robot.useCases.map((useCase, i) => (
                      <Badge key={i} variant="outline" className="border-slate-600 text-slate-400 text-xs">
                        {useCase}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 px-4 bg-slate-800/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Intelligent Solutions</h2>
            <p className="text-slate-400">Purpose-built applications for real-world needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="bg-slate-900/50 border-slate-700">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                    <solution.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <CardTitle className="text-white">{solution.title}</CardTitle>
                  <p className="text-slate-400 text-sm">{solution.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    {solution.workflow.map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs text-cyan-400 font-bold">{i + 1}</span>
                        </div>
                        <span className="text-sm text-slate-300">{step}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-700">
                    <p className="text-xs text-slate-500 mb-2">Applications:</p>
                    <div className="flex flex-wrap gap-1">
                      {solution.applications.map((app, i) => (
                        <Badge key={i} className="bg-slate-700 text-slate-300 text-xs">
                          {app}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* DHG Applications */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Across the DHG Empire</h2>
            <p className="text-slate-400">Robot companions serving all our companies</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {dhgApplications.map((app, index) => (
              <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700 hover:border-cyan-500/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <app.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{app.company}</h3>
                      <p className="text-slate-400 text-sm mb-4">{app.description}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {app.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                            <Zap className="w-3 h-3 text-amber-400" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-16 px-4 bg-slate-800/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Technical Excellence</h2>
            <p className="text-slate-400">Built for real-world performance</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Thermometer, label: "Operating Range", value: "-20°C to 55°C" },
              { icon: Battery, label: "Battery", value: "Hot-Swappable" },
              { icon: Navigation, label: "Navigation", value: "Autonomous" },
              { icon: Cpu, label: "Processing", value: "8-Core + i7" },
              { icon: Eye, label: "Vision", value: "Multi-Modal" },
              { icon: Volume2, label: "Audio", value: "Voice Interaction" },
              { icon: Hand, label: "Tactile", value: "Force Sensing" },
              { icon: Shield, label: "Protection", value: "IP66 Rated" }
            ].map((spec, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-slate-900/50 border border-slate-700">
                <spec.icon className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-white font-bold">{spec.value}</div>
                <div className="text-slate-500 text-sm">{spec.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl border border-cyan-500/30 p-8 md:p-12">
            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 mb-6">
              Strategic Partnership
            </Badge>
            <h2 className="text-3xl font-bold text-white mb-4">
              Hansi Tech x ATHLYNX
            </h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Through our partnership with Hansi Tech (函司科技), we bring cutting-edge robot technology 
              to America. From data center patrol to companion care, we're breaking application boundaries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/early-access">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8">
                  Request Robot Demo
                </Button>
              </Link>
              <Link href="/our-story">
                <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800 px-8">
                  Learn Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-slate-900 border-t border-slate-800 text-center">
        <p className="text-slate-500">
          © 2026 Dozier Holdings Group, LLC. All rights reserved.
        </p>
        <p className="text-cyan-400 font-medium mt-2">
          Breaking Application Boundaries
        </p>
      </footer>
    </div>
  );
}
