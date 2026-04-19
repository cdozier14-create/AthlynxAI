import { useState } from 'react';
import { Link } from 'wouter';
import {
  Building2, Cpu, Database, Zap, Coins, Home, Utensils, Wine, Heart, TreePine,
  Globe, Shield, TrendingUp, Users, Target
} from 'lucide-react';

type Division = 'all' | 'technology' | 'realestate' | 'trading';

interface Subsidiary {
  name: string;
  shortName: string;
  division: 'technology' | 'realestate' | 'trading';
  description: string;
  icon: React.ReactNode;
  status: 'active' | 'development' | 'planned';
}

const subsidiaries: Subsidiary[] = [
  { name: 'VC Technologies, LLC', shortName: 'VC Tech', division: 'technology', description: 'R&D technologies, data center design, cryptocurrency & trading platform development', icon: <Cpu className="w-6 h-6" />, status: 'active' },
  { name: 'VC Data Centers, LLC', shortName: 'VC Data', division: 'technology', description: 'Build and operate proprietary data centers serving as cloud infrastructure for enterprise customers', icon: <Database className="w-6 h-6" />, status: 'active' },
  { name: 'The VIRT, LLC', shortName: 'VIRT', division: 'technology', description: 'Proprietary cryptocurrency mining and trading platform with VLT & VPT tokens', icon: <Coins className="w-6 h-6" />, status: 'active' },
  { name: 'VC Energy, LLC', shortName: 'VC Energy', division: 'technology', description: 'Generate and supply low-cost geothermal power for real estate projects and data centers', icon: <Zap className="w-6 h-6" />, status: 'development' },
  { name: 'Softmor Inc.', shortName: 'Softmor', division: 'technology', description: 'AI-powered software solutions, enterprise platforms, and the ATHLYNX sports technology ecosystem', icon: <img src="/logos/dhg-crab-logo.png" alt="Softmor" className="w-8 h-8 object-contain" />, status: 'active' },
  { name: 'Uma Real Estate Investment, LLC', shortName: 'UMA', division: 'realestate', description: 'Land acquisitions and development for DHG businesses near Livingston and Trinity River', icon: <Building2 className="w-6 h-6" />, status: 'active' },
  { name: 'Villa Agape, LLC', shortName: 'Villa Agape', division: 'realestate', description: 'Home-away-from-home residences for cancer patients with IoT health monitoring', icon: <Heart className="w-6 h-6" />, status: 'development' },
  { name: 'Compassionate Care, LLC', shortName: 'Compassionate Care', division: 'realestate', description: 'On-site clinic at Villa Agape providing daily care and health services', icon: <Heart className="w-6 h-6" />, status: 'development' },
  { name: 'Pisces Resort, LLC', shortName: 'Pisces Resort', division: 'realestate', description: 'Luxury resort with spa, gym, swimming, fishing, and prefab cabin accommodations', icon: <TreePine className="w-6 h-6" />, status: 'planned' },
  { name: 'Venus Venue & Vineyard, LLC', shortName: 'Venus Venue', division: 'realestate', description: 'Wedding venue with glass chapel, event hosting, and premium wine production', icon: <Wine className="w-6 h-6" />, status: 'planned' },
  { name: 'Pomodoro Restaurant, LLC', shortName: 'Pomodoro', division: 'realestate', description: 'Award-winning Italian fine dining with luxury catering and event services', icon: <Utensils className="w-6 h-6" />, status: 'planned' },
  { name: 'VC Residential, LLC', shortName: 'VC Residential', division: 'realestate', description: 'Residential real estate investments, development, and management across high-growth markets', icon: <Home className="w-6 h-6" />, status: 'active' },
  { name: 'The Silk Road Trading, LLC', shortName: 'Silk Road', division: 'trading', description: 'Worldwide sourcing and trading products with strong profit outlooks', icon: <Globe className="w-6 h-6" />, status: 'active' },
  { name: 'VC Global, LLC', shortName: 'VC Global', division: 'trading', description: 'International trade partnerships, import/export operations, and global market expansion', icon: <TrendingUp className="w-6 h-6" />, status: 'development' },
];

const leadership = [
  { name: 'Chad A. Dozier', title: 'Founder, CEO & Chairman', bio: "Visionary entrepreneur and founder of Dozier Holdings Group. Chad brings decades of business acumen across technology, real estate, and energy sectors. His leadership philosophy — Iron Sharpens Iron — drives the company's culture of excellence and continuous improvement.", email: 'cdozier14@dozierholdingsgroup.com.mx', initials: 'CD', color: 'from-blue-500 to-cyan-500' },
  { name: 'Glenn Tse', title: 'CFO / COO', bio: "Co-founder and financial architect of DHG. Glenn's expertise in financial strategy, operations management, and business development has been instrumental in building DHG's diversified portfolio from the ground up since the company's founding at Hope Lodge in November 2024.", initials: 'GT', color: 'from-emerald-500 to-teal-500', email: '' },
  { name: 'Andy Kustes', title: 'VP Technology', bio: "Technology visionary leading DHG's digital transformation and AI initiatives. Andy architects the technical infrastructure powering ATHLYNX, Softmor AI, and VC Data Centers — building the technological backbone of the DHG ecosystem.", initials: 'AK', color: 'from-purple-500 to-violet-500', email: '' },
  { name: 'Lee Marshall', title: 'VP Sales & Partnerships', bio: "Sales leader and partnership architect driving DHG's business development strategy. Lee builds the relationships and revenue channels that fuel DHG's growth across all divisions.", initials: 'LM', color: 'from-orange-500 to-amber-500', email: '' },
  { name: 'Jimmy Boyd', title: 'VP Real Estate', bio: "Real estate executive overseeing DHG's property portfolio and development pipeline. Jimmy leads acquisitions, development, and management across DHG's residential and commercial real estate divisions.", initials: 'JB', color: 'from-teal-500 to-green-500', email: '' },
];

const stats = [
  { value: '14+', label: 'Subsidiaries', icon: <Building2 className="w-5 h-5" /> },
  { value: '3', label: 'Core Divisions', icon: <Target className="w-5 h-5" /> },
  { value: '500+', label: 'Enterprise Clients', icon: <Users className="w-5 h-5" /> },
  { value: '99.9%', label: 'Uptime Guarantee', icon: <Shield className="w-5 h-5" /> },
];

export default function DHGCorporate() {
  const [filter, setFilter] = useState<Division>('all');
  const filteredSubs = filter === 'all' ? subsidiaries : subsidiaries.filter(s => s.division === filter);
  const divisionColors: Record<string, string> = {
    technology: 'from-blue-500 to-cyan-500',
    realestate: 'from-emerald-500 to-green-500',
    trading: 'from-amber-500 to-orange-500'
  };
  const statusColors: Record<string, string> = { active: 'bg-green-500', development: 'bg-yellow-500', planned: 'bg-blue-500' };
  const statusLabels: Record<string, string> = { active: 'Active', development: 'In Development', planned: 'Planned' };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1628]/90 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logos/dhg-crab-logo.png" alt="DHG" className="w-10 h-10 rounded-lg object-cover" />
            <div>
              <div className="text-white font-bold text-sm leading-none">DOZIER HOLDINGS GROUP</div>
              <div className="text-emerald-400 text-xs">THE SOLE SOURCE PROVIDER</div>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
            <a href="#about" className="hover:text-white transition">About</a>
            <a href="#subsidiaries" className="hover:text-white transition">Subsidiaries</a>
            <a href="#leadership" className="hover:text-white transition">Leadership</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
            <Link href="/" className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition text-xs">ATHLYNX Platform</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-emerald-900/30" />
        <div className="container relative py-20 md:py-28">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <img src="/logos/dhg-crab-logo.png" alt="Dozier Holdings Group" className="w-24 h-24 rounded-2xl object-cover shadow-2xl" />
            <div>
              <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-1">Parent Company</p>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight">Dozier Holdings Group</h1>
              <p className="text-emerald-400 font-bold text-lg mt-1 tracking-wider">THE SOLE SOURCE PROVIDER</p>
            </div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mb-10 leading-relaxed">
            A diversified holding company driving transformative investments across technology, real estate, and trading —
            built on the principle that <span className="text-white font-bold italic">Iron Sharpens Iron.</span>
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                <div className="flex justify-center text-emerald-400 mb-2">{stat.icon}</div>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOUNDING STORY */}
      <div id="about" className="container py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">Our Story</p>
            <h2 className="text-4xl font-black mb-6 leading-tight">Born at Hope Lodge.<br /><span className="text-emerald-400">Built in Houston.</span></h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>Dozier Holdings Group was founded in <strong className="text-white">November 2024</strong> in Houston, Texas, by <strong className="text-white">Chad A. Dozier</strong> and <strong className="text-white">Glenn Tse</strong> — two entrepreneurs who met at <strong className="text-white">Hope Lodge</strong> and discovered a shared vision for building transformative businesses across technology, real estate, and global trade.</p>
              <p>What began as a conversation between two driven individuals became a multi-division holding company with 14+ subsidiaries spanning AI software, data centers, cryptocurrency, real estate, hospitality, and commodity trading — all unified under one mission.</p>
              <p>The companies were built on a single philosophy: <strong className="text-white italic">Iron Sharpens Iron</strong> — the belief that surrounding yourself with excellence makes you excellent. Every hire, every partnership, every investment is made with that standard in mind.</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-900/60 to-emerald-900/40 border border-emerald-500/30 rounded-2xl p-8">
              <div className="text-4xl mb-4">⚔️</div>
              <h3 className="text-2xl font-black text-white mb-3">Iron Sharpens Iron</h3>
              <p className="text-gray-300 leading-relaxed">Our core philosophy. We build teams of high-performers who push each other to greater heights. We form partnerships that create mutual strength. We invest in industries where excellence is the baseline.</p>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-emerald-400 text-sm font-semibold italic">"As iron sharpens iron, so one person sharpens another." — Proverbs 27:17</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5"><div className="text-2xl mb-2">📍</div><div className="text-white font-bold">Houston, TX</div><div className="text-gray-400 text-sm">Headquarters</div></div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5"><div className="text-2xl mb-2">📅</div><div className="text-white font-bold">November 2024</div><div className="text-gray-400 text-sm">Founded</div></div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5"><div className="text-2xl mb-2">🏢</div><div className="text-white font-bold">14+ Subsidiaries</div><div className="text-gray-400 text-sm">& Growing</div></div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5"><div className="text-2xl mb-2">🌐</div><div className="text-white font-bold">3 Divisions</div><div className="text-gray-400 text-sm">Tech · RE · Trading</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* SUBSIDIARIES */}
      <div id="subsidiaries" className="bg-white/[0.02] border-y border-white/10 py-20">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">Our Portfolio</p>
            <h2 className="text-4xl font-black mb-4">Subsidiary Companies</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Three core divisions. One unified vision. Every subsidiary is purpose-built to dominate its market.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {(['all', 'technology', 'realestate', 'trading'] as Division[]).map((div) => (
              <button key={div} onClick={() => setFilter(div)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${filter === div ? 'bg-emerald-500 text-white' : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'}`}>
                {div === 'all' ? 'All Divisions' : div === 'realestate' ? 'Real Estate' : div.charAt(0).toUpperCase() + div.slice(1)}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSubs.map((sub) => (
              <div key={sub.name} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-emerald-500/40 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${divisionColors[sub.division]} flex items-center justify-center text-white`}>{sub.icon}</div>
                  <div className="flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${statusColors[sub.status]}`} /><span className="text-xs text-gray-400">{statusLabels[sub.status]}</span></div>
                </div>
                <h3 className="text-white font-bold mb-1 group-hover:text-emerald-400 transition-colors">{sub.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{sub.description}</p>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">{sub.division === 'realestate' ? 'Real Estate' : sub.division.charAt(0).toUpperCase() + sub.division.slice(1)} Division</span>
                  {sub.shortName === 'Softmor' && <Link href="/softmor" className="text-xs text-emerald-400 hover:underline">View →</Link>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LEADERSHIP */}
      <div id="leadership" className="container py-20">
        <div className="text-center mb-12">
          <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">Core Team</p>
          <h2 className="text-4xl font-black mb-4">Leadership</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">The founders and executives driving DHG's vision forward.</p>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {leadership.map((person) => (
            <div key={person.name} className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-emerald-500/30 transition-all">
              <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${person.color} flex items-center justify-center text-2xl font-black text-white mb-5`}>{person.initials}</div>
              <h3 className="text-white font-black text-xl mb-1">{person.name}</h3>
              <p className="text-emerald-400 text-sm font-semibold mb-4">{person.title}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{person.bio}</p>
              {person.email && <a href={`mailto:${person.email}`} className="inline-block mt-4 text-xs text-cyan-400 hover:text-cyan-300 transition">{person.email}</a>}
            </div>
          ))}
        </div>
      </div>

      {/* THREE DIVISIONS */}
      <div className="bg-white/[0.02] border-y border-white/10 py-20">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">Our Divisions</p>
            <h2 className="text-4xl font-black mb-4">Three Pillars of Growth</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border border-blue-500/30 rounded-2xl p-8">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-2xl font-black mb-3 text-blue-300">Technology Division</h3>
              <p className="text-gray-400 mb-5 leading-relaxed">AI software, data centers, cryptocurrency platforms, and energy infrastructure. Powered by Softmor Inc. and VC Technologies.</p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Softmor AI Enterprise Suite</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> ATHLYNX Sports Platform</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> VC Data Centers</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> VLT & VPT Crypto Tokens</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Geothermal Energy Solutions</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-emerald-900/50 to-emerald-800/30 border border-emerald-500/30 rounded-2xl p-8">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-2xl font-black mb-3 text-emerald-300">Real Estate Division</h3>
              <p className="text-gray-400 mb-5 leading-relaxed">Residential, commercial, hospitality, and agricultural investments across high-growth markets.</p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Residential Development</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Villa Agape Cancer Care</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Pisces Resort</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Venus Venue & Vineyard</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Pomodoro Restaurant</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-amber-900/50 to-amber-800/30 border border-amber-500/30 rounded-2xl p-8">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-2xl font-black mb-3 text-amber-300">Trading Division</h3>
              <p className="text-gray-400 mb-5 leading-relaxed">Commodity trading, financial instruments, and global market expansion through Silk Road Trading and VC Global.</p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Commodity Trading</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Financial Instruments</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Import / Export Operations</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Global Market Partnerships</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Strategic Investments</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div id="contact" className="container py-20">
        <div className="bg-gradient-to-r from-emerald-900/50 to-blue-900/50 border border-emerald-500/30 rounded-2xl p-10 md:p-16 text-center">
          <img src="/logos/dhg-crab-logo.png" alt="DHG" className="w-20 h-20 rounded-2xl object-cover mb-6 mx-auto shadow-xl" />
          <h2 className="text-4xl font-black mb-4">Partner With DHG</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">Whether you're an enterprise client, strategic investor, or potential partner — Dozier Holdings Group is the sole source provider for your growth needs.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:cdozier14@dozierholdingsgroup.com.mx" className="px-8 py-3 bg-emerald-500 rounded-xl font-bold hover:bg-emerald-600 transition text-white">Contact Leadership</a>
            <Link href="/softmor" className="px-8 py-3 bg-white/10 border border-white/20 rounded-xl font-bold hover:bg-white/20 transition text-white">Softmor Inc.</Link>
            <Link href="/feed" className="px-8 py-3 bg-blue-600 rounded-xl font-bold hover:bg-blue-700 transition text-white">ATHLYNX Platform</Link>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-sm text-gray-500">
            <p>Dozier Holdings Group | 12306 Lake Portal Drive, Houston, TX 77047</p>
            <p className="mt-1">cdozier14@dozierholdingsgroup.com.mx</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="container py-8 border-t border-white/10">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <Link href="/" className="hover:text-white transition">ATHLYNX Home</Link>
          <Link href="/softmor" className="hover:text-white transition">Softmor Inc.</Link>
          <Link href="/infrastructure" className="hover:text-white transition">Infrastructure</Link>
          <Link href="/marketplace" className="hover:text-white transition">Marketplace</Link>
          <Link href="/feed" className="hover:text-white transition">Platform</Link>
        </div>
        <p className="text-center text-xs text-gray-600 mt-4">© {new Date().getFullYear()} Dozier Holdings Group. All rights reserved. | Iron Sharpens Iron</p>
      </div>
    </div>
  );
}
