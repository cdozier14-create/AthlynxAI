import { Link } from "wouter";

export default function InvestorDeck() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1628] via-[#0d1f3c] to-[#0A1628]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/AzsuZOzvfgvscIdI.png" alt="DHG" className="h-24 w-24" />
            </div>
            <div className="inline-block px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full mb-6">
              <span className="text-cyan-400 text-sm font-semibold tracking-wider">INVESTMENT OPPORTUNITY</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
              DOZIER HOLDINGS GROUP
            </h1>
            <p className="text-xl text-cyan-400 mb-8">
              Building the Future of Sports Technology, AI, and Infrastructure
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 px-6 py-4">
                <div className="text-3xl font-bold text-yellow-400">$180M+</div>
                <div className="text-gray-400 text-sm">Market Opportunity</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 px-6 py-4">
                <div className="text-3xl font-bold text-cyan-400">15+</div>
                <div className="text-gray-400 text-sm">Sports Platforms</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 px-6 py-4">
                <div className="text-3xl font-bold text-green-400">$27.5M</div>
                <div className="text-gray-400 text-sm">Hardware Pipeline</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">The DHG Ecosystem</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl border border-cyan-500/30 p-8 text-center">
              <div className="text-5xl mb-4"></div>
              <h3 className="text-xl font-bold text-white mb-2">ATHLYNX</h3>
              <p className="text-gray-400 text-sm mb-4">The Athlete's Playbook</p>
              <ul className="text-left text-gray-300 text-sm space-y-2">
                <li>• NIL Portal - Deal marketplace</li>
                <li>• Diamond Grind - Elite baseball</li>
                <li>• Messenger - Private comms</li>
                <li>• Transfer Portal - Recruiting</li>
                <li>• AI Training Bots</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30 p-8 text-center">
              <div className="text-5xl mb-4">🧠</div>
              <h3 className="text-xl font-bold text-white mb-2">SOFTMOR INC</h3>
              <p className="text-gray-400 text-sm mb-4">AI & Data Center Solutions</p>
              <ul className="text-left text-gray-300 text-sm space-y-2">
                <li>• Enterprise AI platforms</li>
                <li>• Data center construction</li>
                <li>• Hardware distribution</li>
                <li>• Technical support services</li>
                <li>• Geothermal power integration</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl border border-yellow-500/30 p-8 text-center">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-white mb-2">FUEL BOTS</h3>
              <p className="text-gray-400 text-sm mb-4">AI Companions Division</p>
              <ul className="text-left text-gray-300 text-sm space-y-2">
                <li>• Athletic training robots</li>
                <li>• Medical response units</li>
                <li>• Stadium security</li>
                <li>• Data center operations</li>
                <li>• Energy sector automation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Market Opportunity</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            DHG operates at the intersection of three explosive growth markets
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <div className="text-4xl font-bold text-cyan-400 mb-2">$26.6B</div>
              <div className="text-white font-semibold mb-2">Sports Technology</div>
              <p className="text-gray-400 text-sm">
                Global sports tech market growing at 17.5% CAGR. NIL market alone projected to reach $1.17B by 2025.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <div className="text-4xl font-bold text-yellow-400 mb-2">$180M</div>
              <div className="text-white font-semibold mb-2">Fuel Bots Market</div>
              <p className="text-gray-400 text-sm">
                Annual market opportunity for AI companions in sports, data centers, and energy sectors.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <div className="text-4xl font-bold text-green-400 mb-2">$500B+</div>
              <div className="text-white font-semibold mb-2">Data Center Infrastructure</div>
              <p className="text-gray-400 text-sm">
                Global data center market with AI driving unprecedented demand for compute infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Model */}
      <section className="py-16 bg-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Revenue Model</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-cyan-500/10 to-transparent rounded-xl border border-cyan-500/20 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center text-2xl">💳</div>
                  <div>
                    <h3 className="text-white font-bold">Subscriptions</h3>
                    <p className="text-gray-400 text-sm">Recurring SaaS revenue</p>
                  </div>
                </div>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Pro: $9.99/mo - 50 AI credits</li>
                  <li>• Elite: $29.99/mo - 200 AI credits</li>
                  <li>• Enterprise: Custom pricing</li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-yellow-500/10 to-transparent rounded-xl border border-yellow-500/20 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center text-2xl">🖥️</div>
                  <div>
                    <h3 className="text-white font-bold">Hardware Sales</h3>
                    <p className="text-gray-400 text-sm">Enterprise infrastructure</p>
                  </div>
                </div>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Supermicro servers: $15K-$40K</li>
                  <li>• Data center packages: $100K-$2.5M+</li>
                  <li>• ICC partnership (NVIDIA Elite)</li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-purple-500/10 to-transparent rounded-xl border border-purple-500/20 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-2xl">🤖</div>
                  <div>
                    <h3 className="text-white font-bold">Fuel Bots Leasing</h3>
                    <p className="text-gray-400 text-sm">AI companion contracts</p>
                  </div>
                </div>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• University contracts: $50K-$500K</li>
                  <li>• Pro team packages: Custom</li>
                  <li>• Data subscriptions for coaches</li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-green-500/10 to-transparent rounded-xl border border-green-500/20 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center text-2xl"></div>
                  <div>
                    <h3 className="text-white font-bold">White-Label Licensing</h3>
                    <p className="text-gray-400 text-sm">Platform licensing</p>
                  </div>
                </div>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Sport-specific apps: $5K-$50K</li>
                  <li>• Enterprise AI suite: $10K+</li>
                  <li>• API access fees</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Partnerships */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Strategic Partnerships</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-3xl"></span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">ICC</h3>
                  <p className="text-green-400 text-sm">NVIDIA Elite Partner of the Year 2024</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Enterprise hardware partnership providing access to Supermicro servers, NVIDIA networking, 
                and data center infrastructure at competitive pricing.
              </p>
              <div className="text-2xl font-bold text-green-400">$27.5M Pipeline</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-3xl">🌏</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Global Expansion</h3>
                  <p className="text-blue-400 text-sm">US-China-Hong Kong Operations</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Strategic positioning for international data center development, hardware distribution, 
                and AI companion manufacturing with established relationships in key markets.
              </p>
              <div className="text-2xl font-bold text-blue-400">3 Continents</div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-16 bg-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Implementation Roadmap</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-yellow-500 to-green-500" />
              
              {/* Phase 1 */}
              <div className="relative pl-20 pb-12">
                <div className="absolute left-4 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                  <div className="text-cyan-400 font-semibold mb-1">Q1 2026</div>
                  <h3 className="text-white font-bold text-lg mb-2">ATHLYNX Launch</h3>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• February 1, 2026: Full public launch</li>
                    <li>• 10,000 founding members</li>
                    <li>• Baseball features complete</li>
                    <li>• 5-10 Fuel Bots per partner university</li>
                  </ul>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="relative pl-20 pb-12">
                <div className="absolute left-4 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                  <div className="text-yellow-400 font-semibold mb-1">Q2-Q4 2026</div>
                  <h3 className="text-white font-bold text-lg mb-2">Scale & Expand</h3>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Roll out 15+ sport platforms</li>
                    <li>• 1,000+ athlete metrics tracked</li>
                    <li>• Data center partnerships active</li>
                    <li>• Enterprise hardware sales</li>
                  </ul>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="relative pl-20">
                <div className="absolute left-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                  <div className="text-green-400 font-semibold mb-1">2027</div>
                  <h3 className="text-white font-bold text-lg mb-2">Market Leadership</h3>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• 50-100 university partnerships</li>
                    <li>• Pro team contracts</li>
                    <li>• International expansion</li>
                    <li>• IPO preparation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Leadership Team</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                
              </div>
              <h3 className="text-xl font-bold text-white">Chad A. Dozier Sr</h3>
              <p className="text-cyan-400 mb-4">Chief Executive Officer & Founder</p>
              <p className="text-gray-400 text-sm">
                Visionary entrepreneur who built the entire DHG ecosystem from the ground up in one year. 
                Deep expertise in sports technology, AI integration, and enterprise partnerships.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                
              </div>
              <h3 className="text-xl font-bold text-white">Glenn Tse</h3>
              <p className="text-yellow-400 mb-4">CFO & VP Business Development</p>
              <p className="text-gray-400 text-sm">
                Strategic financial partner with extensive experience in US-Asia business operations. 
                Based in Hong Kong with connections across China and the United States.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment CTA */}
      <section className="py-20 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-yellow-500/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Join the Future</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            DHG is positioned at the intersection of sports technology, AI, and infrastructure - 
            three of the fastest-growing markets in the world. We're looking for strategic partners 
            who share our vision.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link href="/partner-portal">
              <button className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-xl transition-all">
                Partner Portal Access
              </button>
            </Link>
            <Link href="/dhg">
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all">
                Learn More About DHG
              </button>
            </Link>
          </div>
          <div className="text-gray-400 text-sm">
            <p>Contact: cdozier@dozierholdingsgroup.com</p>
            <p className="mt-2">Dozier Holdings Group | Houston, Texas</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Dozier Holdings Group. All rights reserved. | 
            This presentation is for informational purposes only and does not constitute an offer to sell securities.
          </p>
        </div>
      </footer>
    </div>
  );
}
