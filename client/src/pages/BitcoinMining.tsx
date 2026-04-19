import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import UnifiedNav from "@/components/UnifiedNav";
import UnifiedFooter from "@/components/UnifiedFooter";
import { 
  Bitcoin, Server, Zap, TrendingUp, Shield, Thermometer, Clock, 
  DollarSign, Building2, Cpu, Leaf, Globe, ChevronRight, Phone, Mail,
  BarChart3, Target, Coins, Factory, Wind, Sun
} from 'lucide-react';

export default function BitcoinMining() {
  const [activeTab, setActiveTab] = useState<'overview' | 'technology' | 'financials' | 'hardware'>('overview');

  const facilityStats = [
    { value: '97%', label: 'Annual Uptime', icon: Clock },
    { value: '4', label: 'Building Complexes', icon: Building2 },
    { value: '1,000+ kW', label: 'Power Capacity', icon: Zap },
    { value: '16.6 mo', label: 'Average ROI', icon: TrendingUp }
  ];

  const keyFeatures = [
    {
      title: 'Immersion Cooling',
      description: 'Advanced dielectric fluid cooling for 30% higher hash rates and extended equipment lifespan',
      icon: Thermometer,
      specs: ['2240 kW @ 20°C ambient', '128 miners per container', 'Biodegradable fluid (GWP: 0)']
    },
    {
      title: 'Modular Design',
      description: 'Scalable infrastructure with hot/cold aisle separation and rapid deployment capability',
      icon: Factory,
      specs: ['40ft x 8ft x 13ft containers', '8 tanks per container', '6 min/unit deployment']
    },
    {
      title: 'Renewable Integration',
      description: 'Strategic partnerships with solar, wind, and hydro power providers',
      icon: Leaf,
      specs: ['Solar: $0.03-0.06/kWh', 'Wind: $0.02-0.05/kWh', 'Hydro: $0.01-0.04/kWh']
    },
    {
      title: '24/7 Operations',
      description: 'Comprehensive monitoring with advanced management software and technical support',
      icon: Shield,
      specs: ['< 1 hour response time', 'Weekly performance reports', 'Quarterly maintenance']
    }
  ];

  const financialScenarios = [
    { scenario: 'Current Revenue/TH', monthly: '$186.88', roi: '29 months' },
    { scenario: 'Year-to-date Revenue/TH', monthly: '$274.75', roi: '16.6 months', highlight: true },
    { scenario: 'Halving-to-date Revenue/TH', monthly: '$424.34', roi: '8 months' },
    { scenario: '12-month Average Revenue/TH', monthly: '$498.26', roi: '19.9 months' }
  ];

  const hardwareOptions = [
    { 
      name: 'Bitmain Antminer S23 Hyd 3U', 
      tier: 'High-End',
      hashrate: '1.16 Ph/s', 
      power: '11,020W', 
      efficiency: '9.5 J/T', 
      price: '$34,800' 
    },
    { 
      name: 'Bitmain Antminer S21e XP Hyd 3U', 
      tier: 'High-End',
      hashrate: '860 Th/s', 
      power: '11,180W', 
      efficiency: '13 J/T', 
      price: '$17,210' 
    },
    { 
      name: 'Bitmain Antminer S21 XP+ Hyd', 
      tier: 'Mid-Range',
      hashrate: '500 Th/s', 
      power: '5,500W', 
      efficiency: '11 J/T', 
      price: '$12,700' 
    },
    { 
      name: 'MicroBT Whatsminer M60S', 
      tier: 'Mid-Range',
      hashrate: '573 Th/s', 
      power: '6,300W', 
      efficiency: '11 J/T', 
      price: '$10,500' 
    },
    { 
      name: 'Canaan Avalon Nano 3S', 
      tier: 'Entry-Level',
      hashrate: '6 Th/s', 
      power: '140W', 
      efficiency: '23.3 J/T', 
      price: '$450-600' 
    }
  ];

  const timeline = [
    { phase: 'Phase 1', months: '1-3', title: 'Site Selection & Planning', description: 'Regulatory approvals, infrastructure planning' },
    { phase: 'Phase 2', months: '4-6', title: 'Construction & Procurement', description: 'Facility construction, equipment procurement' },
    { phase: 'Phase 3', months: '7-9', title: 'Installation & Testing', description: 'Equipment installation, operational testing' },
    { phase: 'Phase 4', months: '10-12', title: 'Full Launch', description: 'Operational launch, performance monitoring' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/20 to-slate-950">
      <UnifiedNav />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        
        <div className="container relative px-4 md:px-5">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-4">
              <Bitcoin className="w-3 h-3 mr-1" /> DHG CRYPTOCURRENCY DIVISION
            </Badge>
            
            {/* Bitcoin Logo */}
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-xl opacity-50 animate-pulse" />
              <div className="relative w-full h-full bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                <Bitcoin className="w-12 h-12 text-white" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Bitcoin Mining Facility
            </h1>
            <p className="text-xl text-amber-400 mb-6">
              State-of-the-Art Mining Operations
            </p>
            <p className="text-white/60 max-w-2xl mx-auto mb-8">
              Our cutting-edge Bitcoin mining facility features immersion cooling technology, 
              renewable energy integration, and industry-leading operational efficiency with 
              97% annual uptime and 16.6 month average ROI.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold">
                <TrendingUp className="w-4 h-4 mr-2" /> Investment Opportunities
              </Button>
              <Link href="/dhg-empire">
                <Button variant="outline" className="border-amber-500/50 text-amber-400 hover:bg-amber-500/20">
                  <Building2 className="w-4 h-4 mr-2" /> DHG Empire
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container px-4 md:px-5 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {facilityStats.map((stat, i) => (
            <Card key={i} className="bg-white/5 border-amber-500/20">
              <CardContent className="p-6 text-center">
                <stat.icon className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-white/60">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="container px-4 md:px-5 pb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {(['overview', 'technology', 'financials', 'hardware'] as const).map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              onClick={() => setActiveTab(tab)}
              className={activeTab === tab 
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0" 
                : "border-amber-500/30 text-amber-400 hover:bg-amber-500/20"
              }
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Button>
          ))}
        </div>
      </section>

      {/* Tab Content */}
      <section className="container px-4 md:px-5 pb-16">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Features */}
            <div className="grid md:grid-cols-2 gap-6">
              {keyFeatures.map((feature, i) => (
                <Card key={i} className="bg-white/5 border-amber-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                        <p className="text-white/60 mb-3">{feature.description}</p>
                        <ul className="space-y-1">
                          {feature.specs.map((spec, j) => (
                            <li key={j} className="text-amber-400 text-sm flex items-center gap-2">
                              <ChevronRight className="w-3 h-3" /> {spec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Implementation Timeline */}
            <Card className="bg-white/5 border-amber-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-400" /> Implementation Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  {timeline.map((phase, i) => (
                    <div key={i} className="relative">
                      <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl p-4 border border-amber-500/30">
                        <Badge className="bg-amber-500 text-white mb-2">{phase.phase}</Badge>
                        <p className="text-amber-400 text-sm mb-1">Months {phase.months}</p>
                        <h4 className="text-white font-bold mb-1">{phase.title}</h4>
                        <p className="text-white/60 text-sm">{phase.description}</p>
                      </div>
                      {i < timeline.length - 1 && (
                        <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-amber-500/50" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'technology' && (
          <div className="space-y-8">
            {/* Immersion Cooling */}
            <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <Badge className="bg-amber-500/20 text-amber-400 mb-4">ADVANCED COOLING</Badge>
                    <h2 className="text-3xl font-bold text-white mb-4">Immersion Cooling Technology</h2>
                    <p className="text-white/70 mb-6">
                      Our facilities utilize advanced immersion cooling technology, submerging mining 
                      hardware in dielectric fluid to maximize performance and efficiency.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-white">
                        <Thermometer className="w-5 h-5 text-amber-400" />
                        <span>Up to 30% higher hash rates vs air-cooled</span>
                      </li>
                      <li className="flex items-center gap-3 text-white">
                        <Shield className="w-5 h-5 text-amber-400" />
                        <span>Extended equipment lifespan</span>
                      </li>
                      <li className="flex items-center gap-3 text-white">
                        <Leaf className="w-5 h-5 text-amber-400" />
                        <span>Biodegradable dielectric fluid (GWP: 0)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-6 border border-amber-500/30">
                    <h3 className="text-white font-bold mb-4">Container Specifications</h3>
                    <table className="w-full">
                      <tbody className="text-white/80">
                        <tr className="border-b border-white/10">
                          <td className="py-2">Immersion Conex Size</td>
                          <td className="py-2 text-amber-400 text-right">40ft x 8ft x 13ft</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-2">Tanks per Conex</td>
                          <td className="py-2 text-amber-400 text-right">8</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-2">Miners per Tank</td>
                          <td className="py-2 text-amber-400 text-right">16</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-2">Total Miner Slots</td>
                          <td className="py-2 text-amber-400 text-right">128</td>
                        </tr>
                        <tr>
                          <td className="py-2">Cooling Performance</td>
                          <td className="py-2 text-amber-400 text-right">2240 kW @ 20°C</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* VIRT Token Integration */}
            <Card className="bg-white/5 border-amber-500/20">
              <CardContent className="p-8">
                <div className="text-center max-w-2xl mx-auto">
                  <Coins className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-4">VIRT Token Integration</h2>
                  <p className="text-white/70 mb-6">
                    The VIRT Token platform seamlessly integrates with our mining facilities, enabling 
                    tokenized investment in mining operations while providing transparency and liquidity.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-900/50 rounded-xl p-4 border border-amber-500/30">
                      <h4 className="text-amber-400 font-bold mb-2">Tokenized Mining Exposure</h4>
                      <p className="text-white/60 text-sm">Fractional ownership in mining operations through tokenization</p>
                    </div>
                    <div className="bg-slate-900/50 rounded-xl p-4 border border-amber-500/30">
                      <h4 className="text-amber-400 font-bold mb-2">Smart Contract Security</h4>
                      <p className="text-white/60 text-sm">Automated distribution of mining rewards</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'financials' && (
          <div className="space-y-8">
            {/* Market Overview */}
            <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-green-400 text-sm mb-1">Bitcoin Price (Aug 2025)</p>
                    <p className="text-4xl font-bold text-white">$117,398</p>
                  </div>
                  <div>
                    <p className="text-green-400 text-sm mb-1">Market Cap</p>
                    <p className="text-4xl font-bold text-white">$2.3T</p>
                  </div>
                  <div>
                    <p className="text-green-400 text-sm mb-1">24h Volume</p>
                    <p className="text-4xl font-bold text-white">$42.8B</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Scenarios */}
            <Card className="bg-white/5 border-amber-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-amber-400" /> Revenue Scenarios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 text-white/60">Scenario</th>
                        <th className="text-right py-3 text-white/60">Monthly Net Revenue</th>
                        <th className="text-right py-3 text-white/60">ROI Period</th>
                      </tr>
                    </thead>
                    <tbody>
                      {financialScenarios.map((scenario, i) => (
                        <tr key={i} className={`border-b border-white/10 ${scenario.highlight ? 'bg-amber-500/10' : ''}`}>
                          <td className="py-3 text-white">{scenario.scenario}</td>
                          <td className="py-3 text-right text-amber-400 font-bold">{scenario.monthly}</td>
                          <td className="py-3 text-right text-white">{scenario.roi}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-white/50 text-sm mt-4">
                  Power Cost: $0.05/kWh (industry average) | Hardware: Latest generation miners with 500-1160 TH/s
                </p>
              </CardContent>
            </Card>

            {/* Energy Cost Analysis */}
            <Card className="bg-white/5 border-amber-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" /> Energy Cost Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                    <p className="text-green-400 font-bold mb-2">$0.03/kWh</p>
                    <p className="text-white text-sm">Cost to Mine 1 BTC: $58,000</p>
                    <p className="text-green-400 text-sm">50.6% profit margin</p>
                  </div>
                  <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
                    <p className="text-amber-400 font-bold mb-2">$0.05/kWh</p>
                    <p className="text-white text-sm">Cost to Mine 1 BTC: $96,552</p>
                    <p className="text-amber-400 text-sm">17.8% profit margin</p>
                  </div>
                  <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                    <p className="text-red-400 font-bold mb-2">$0.08/kWh</p>
                    <p className="text-white text-sm">Cost to Mine 1 BTC: $154,483</p>
                    <p className="text-red-400 text-sm">-31.6% (loss)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'hardware' && (
          <div className="space-y-6">
            {hardwareOptions.map((hw, i) => (
              <Card key={i} className="bg-white/5 border-amber-500/20 hover:bg-white/10 transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                        <Cpu className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white font-bold">{hw.name}</h3>
                          <Badge variant="outline" className={`text-xs ${
                            hw.tier === 'High-End' ? 'border-green-500 text-green-400' :
                            hw.tier === 'Mid-Range' ? 'border-amber-500 text-amber-400' :
                            'border-gray-500 text-gray-400'
                          }`}>
                            {hw.tier}
                          </Badge>
                        </div>
                        <p className="text-white/60 text-sm">Efficiency: {hw.efficiency}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6 text-center">
                      <div>
                        <p className="text-white/50 text-xs">Hashrate</p>
                        <p className="text-amber-400 font-bold">{hw.hashrate}</p>
                      </div>
                      <div>
                        <p className="text-white/50 text-xs">Power</p>
                        <p className="text-white font-bold">{hw.power}</p>
                      </div>
                      <div>
                        <p className="text-white/50 text-xs">Price</p>
                        <p className="text-green-400 font-bold">{hw.price}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Contact Section */}
      <section className="container px-4 md:px-5 py-16 border-t border-amber-500/20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Investment Inquiries</h2>
          <p className="text-white/60 mb-8">
            Interested in Bitcoin mining investment opportunities? Contact our team.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-white/5 border-amber-500/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">
                  CD
                </div>
                <h3 className="text-white font-bold">Chad A. Dozier</h3>
                <p className="text-amber-400 text-sm mb-3">Chief Executive Officer</p>
                <div className="space-y-2 text-sm">
                  <p className="text-white/60 flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" /> +1-601-498-5282
                  </p>
                  <p className="text-white/60 flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" /> cdozier@dozierholdingsgroup.com
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-amber-500/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">
                  GT
                </div>
                <h3 className="text-white font-bold">Glenn Tse</h3>
                <p className="text-amber-400 text-sm mb-3">VP Business Development</p>
                <div className="space-y-2 text-sm">
                  <p className="text-white/60 flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" /> +1-832-620-6389
                  </p>
                  <p className="text-white/60 flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" /> gtse@dozierholdingsgroup.com
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <UnifiedFooter />
    </div>
  );
}
