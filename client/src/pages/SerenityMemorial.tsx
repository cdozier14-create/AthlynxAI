import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import UnifiedNav from "@/components/UnifiedNav";
import UnifiedFooter from "@/components/UnifiedFooter";
import { 
  Heart, 
  Building,
  TrendingUp,
  Users,
  MapPin,
  Calendar,
  DollarSign,
  Target,
  Award,
  Shield,
  ChevronRight,
  Star,
  Leaf,
  Home,
  Clock,
  Phone
} from "lucide-react";

export default function SerenityMemorial() {
  const financials = [
    { year: "Year 1", revenue: "$629,300", ebitda: "$105,248", netIncome: "$49,686", margin: "7.9%", cases: 70 },
    { year: "Year 3", revenue: "$1,168,700", ebitda: "$410,069", netIncome: "$278,302", margin: "23.8%", cases: 130 },
    { year: "Year 5", revenue: "$1,618,200", ebitda: "$635,320", netIncome: "$447,240", margin: "27.6%", cases: 180 }
  ];

  const rollupStrategy = [
    {
      phase: "Foundation",
      years: "Years 1-2",
      description: "Establish flagship Orange Beach location. Build operational excellence and community reputation.",
      target: "80-120 Services",
      color: "from-blue-500 to-cyan-500"
    },
    {
      phase: "Regional",
      years: "Years 3-4",
      description: "Acquire 3-5 locations in Gulf Coast region. Leverage economies of scale in purchasing.",
      target: "400-600 Services",
      color: "from-cyan-500 to-teal-500"
    },
    {
      phase: "State-Level",
      years: "Years 5-7",
      description: "Expand throughout Alabama & adjacent states. Acquire established local brands.",
      target: "1,000-1,500 Services",
      color: "from-teal-500 to-green-500"
    },
    {
      phase: "Multi-State",
      years: "Years 8-10",
      description: "Expand to GA, TN, Carolinas. Position for institutional investment or strategic exit.",
      target: "3,000-5,000 Services",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const useOfFunds = [
    { item: "Facility Leasehold Improvements", amount: "$250,000" },
    { item: "Vehicle Acquisition", amount: "$150,000" },
    { item: "Furniture, Fixtures & Equipment", amount: "$100,000" },
    { item: "Working Capital & Contingency", amount: "$100,000" },
    { item: "Initial Inventory & Supplies", amount: "$50,000" }
  ];

  const competitiveAdvantages = [
    {
      icon: MapPin,
      title: "First-Mover Position",
      description: "Only funeral home within Orange Beach city limits, capturing local demand"
    },
    {
      icon: Shield,
      title: "Technology Integration",
      description: "Digital showrooms and virtual attendance for modern families"
    },
    {
      icon: Star,
      title: "Premium Positioning",
      description: "High-quality facilities and personalized services aligned with local demographics"
    },
    {
      icon: TrendingUp,
      title: "Scalable Systems",
      description: "Standardized operations enabling efficient multi-location expansion"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <UnifiedNav />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        
        <div className="container relative px-4 md:px-5">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-4">
              <Building className="w-3 h-3 mr-1" /> A DOZIER HOLDINGS GROUP SUBSIDIARY
            </Badge>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Leaf className="w-10 h-10 text-emerald-400" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white">
                Serenity Memorial
              </h1>
              <Leaf className="w-10 h-10 text-emerald-400 transform scale-x-[-1]" />
            </div>
            <p className="text-2xl text-amber-400 font-light mb-4">Services</p>
            <p className="text-xl text-white/70 italic mb-8">
              "Honoring Life with Grace"
            </p>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Compassionate funeral and memorial services for the Gulf Coast community.
              First-mover advantage in Orange Beach, Alabama.
            </p>
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="container px-4 md:px-5 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">The $13B Opportunity</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            "The U.S. funeral industry is a stable, recession-resistant market driven by 
            inevitable demographic trends and ripe for consolidation."
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { value: "$13.03B", label: "Market Size", sub: "Projected for 2024" },
            { value: "5.92%", label: "Annual Growth", sub: "CAGR 2025-2030" },
            { value: "10.3%", label: "Profit Margin", sub: "Industry Average" },
            { value: "3M+", label: "Annual Deaths", sub: "U.S. Demographics" }
          ].map((stat, i) => (
            <Card key={i} className="bg-white/5 border-white/10 text-center">
              <CardContent className="p-6">
                <p className="text-3xl font-bold text-amber-400 mb-2">{stat.value}</p>
                <p className="text-white font-semibold">{stat.label}</p>
                <p className="text-white/50 text-sm">{stat.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Orange Beach Advantage */}
        <Card className="bg-gradient-to-r from-emerald-500/20 to-amber-500/20 border-emerald-500/30">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="bg-emerald-500/20 text-emerald-400 mb-4">CRITICAL ADVANTAGE</Badge>
                <h3 className="text-2xl font-bold text-white mb-4">Orange Beach Market</h3>
                <p className="text-white/70 mb-4">
                  <strong className="text-emerald-400">No dedicated funeral home exists within Orange Beach city limits</strong>, 
                  creating a significant first-mover opportunity.
                </p>
                <p className="text-white/60">
                  Recognized as one of America's best retirement communities with high median income 
                  and an aging population seeking premium services.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "51.6", label: "Median Age" },
                  { value: "30%", label: "Residents 65+" },
                  { value: "$89K", label: "Median Income" },
                  { value: "15-20%", label: "Year 1 Share" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white/10 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-white/60 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Roll-Up Strategy */}
      <section className="container px-4 md:px-5 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Nationwide Roll-Up Strategy</h2>
          <p className="text-white/60">Targeting $50M+ Annual Revenue by Year 10</p>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {rollupStrategy.map((phase, i) => (
            <Card key={i} className="bg-white/5 border-white/10 relative overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${phase.color}`} />
              <CardContent className="p-6">
                <Badge className="bg-white/10 text-white/80 mb-3">{phase.years}</Badge>
                <h3 className="text-xl font-bold text-white mb-3">{phase.phase}</h3>
                <p className="text-white/60 text-sm mb-4">{phase.description}</p>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-amber-400 font-semibold">Target: {phase.target}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Financial Projections */}
      <section className="container px-4 md:px-5 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">5-Year Financial Projections</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            "Serenity Memorial Services achieves first-year profitability with net margins 
            reaching 27.6% by Year 5, far exceeding the industry average."
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-4 text-white/60">Metric</th>
                {financials.map((f, i) => (
                  <th key={i} className="text-center py-4 px-4 text-white font-semibold">{f.year}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-4 px-4 text-white">Annual Revenue</td>
                {financials.map((f, i) => (
                  <td key={i} className="text-center py-4 px-4 text-emerald-400 font-semibold">{f.revenue}</td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-4 px-4 text-white">EBITDA</td>
                {financials.map((f, i) => (
                  <td key={i} className="text-center py-4 px-4 text-white">{f.ebitda}</td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-4 px-4 text-white">Net Income</td>
                {financials.map((f, i) => (
                  <td key={i} className="text-center py-4 px-4 text-white">{f.netIncome}</td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-4 px-4 text-white">Net Profit Margin</td>
                {financials.map((f, i) => (
                  <td key={i} className="text-center py-4 px-4 text-amber-400 font-semibold">{f.margin}</td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-4 text-white">Case Volume</td>
                {financials.map((f, i) => (
                  <td key={i} className="text-center py-4 px-4 text-white">{f.cases}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <p className="text-white/60 text-sm">Premium Pricing</p>
              <p className="text-xl font-bold text-white">$8,500 Traditional</p>
              <p className="text-white/50 text-sm">vs $5,000 industry avg</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <p className="text-white/60 text-sm">Service Mix</p>
              <p className="text-xl font-bold text-white">60% / 40%</p>
              <p className="text-white/50 text-sm">Cremation / Traditional</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <p className="text-white/60 text-sm">Product Revenue</p>
              <p className="text-xl font-bold text-white">45% of Service</p>
              <p className="text-white/50 text-sm">40% commission margins</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Leadership */}
      <section className="container px-4 md:px-5 pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-8">
              <Badge className="bg-amber-500/20 text-amber-400 mb-4">FOUNDER & CEO</Badge>
              <h3 className="text-2xl font-bold text-white mb-4">Bailey Boyd</h3>
              <p className="text-white/70">
                Experienced leader focused on compassionate service and community impact, 
                guiding Serenity Memorial Services with purpose.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-8">
              <Badge className="bg-cyan-500/20 text-cyan-400 mb-4">STRATEGIC PARTNER</Badge>
              <h3 className="text-2xl font-bold text-white mb-4">Dozier Holdings Group</h3>
              <p className="text-white/70">
                Silent partner supplying strategic oversight, capital access, and 
                operational infrastructure for scalable growth.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="container px-4 md:px-5 pb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Strategic Competitive Edge</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {competitiveAdvantages.map((adv, i) => (
            <Card key={i} className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4">
                  <adv.icon className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{adv.title}</h3>
                <p className="text-white/60 text-sm">{adv.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Investment Opportunity */}
      <section className="container px-4 md:px-5 pb-16">
        <Card className="bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border-amber-500/30">
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="bg-amber-500/20 text-amber-400 mb-4">INVESTMENT OPPORTUNITY</Badge>
                <h2 className="text-3xl font-bold text-white mb-4">Initial Capital Ask</h2>
                <p className="text-5xl font-bold text-amber-400 mb-6">$650,000</p>
                
                <h3 className="text-white font-semibold mb-4">Investment Highlights</h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Immediate Market Opportunity:</strong> First and only funeral home in Orange Beach city limits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Proven Industry Model:</strong> Roll-up strategy validated by major consolidators</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Strong Unit Economics:</strong> Projected 27.6% net margins by Year 5</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Clear Exit Strategy:</strong> Strategic sale or PE buyout at 6-10x EBITDA</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">Use of Funds</h3>
                <div className="space-y-3">
                  {useOfFunds.map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-white/70">{item.item}</span>
                      <span className="text-white font-semibold">{item.amount}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Link href="/investor-hub">
                    <Button className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3">
                      Contact for Investment Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contact */}
      <section className="container px-4 md:px-5 py-16 border-t border-white/10">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Contact Serenity Memorial Services</h2>
          <p className="text-white/60 mb-6">
            For investment inquiries or partnership opportunities
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button className="bg-amber-500 hover:bg-amber-400 text-black font-bold">
                <Phone className="w-4 h-4 mr-2" /> Contact Us
              </Button>
            </Link>
            <Link href="/investor-deck">
              <Button variant="outline" className="border-amber-500/50 text-amber-400 hover:bg-amber-500/20">
                View Full Investor Deck
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <UnifiedFooter />
    </div>
  );
}
