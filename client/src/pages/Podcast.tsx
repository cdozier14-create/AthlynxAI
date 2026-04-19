import { Link } from 'wouter';
import { Play, Pause, SkipForward, SkipBack, Volume2, Clock, Mic, Headphones, Radio, ExternalLink, ChevronRight, Share2, Download, Star } from 'lucide-react';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

const SHOW_INFO = {
  title: "The Athlete's Playbook Podcast",
  subtitle: "by ATHLYNX & Dozier Holdings Group",
  description: "The definitive podcast for athletes navigating NIL deals, the transfer portal, recruiting, and building their brand. Hosted by Chad A. Dozier, Founder & CEO of ATHLYNX and Dozier Holdings Group. Every episode features real conversations with athletes, agents, coaches, financial advisors, and industry leaders who are shaping the future of athlete success.",
  host: "Chad A. Dozier",
  hostTitle: "Founder, CEO & Chairman — Dozier Holdings Group",
  frequency: "Weekly — New episodes every Tuesday",
  categories: ["Sports", "Business", "NIL", "Recruiting", "Transfer Portal", "Athlete Development"],
};

const PLATFORMS = [
  { name: "Apple Podcasts", icon: "🎧", url: "#", color: "from-purple-600 to-purple-800" },
  { name: "Spotify", icon: "🎵", url: "#", color: "from-green-600 to-green-800" },
  { name: "YouTube", icon: "▶️", url: "#", color: "from-red-600 to-red-800" },
  { name: "Google Podcasts", icon: "🎙️", url: "#", color: "from-blue-600 to-blue-800" },
  { name: "Amazon Music", icon: "🎶", url: "#", color: "from-cyan-600 to-cyan-800" },
  { name: "iHeart Radio", icon: "📻", url: "#", color: "from-red-500 to-pink-700" },
];

const EPISODES = [
  {
    id: 1,
    number: "EP 001",
    title: "Why I Built ATHLYNX — The Origin Story",
    description: "Chad A. Dozier shares the full story behind ATHLYNX — from Hope Lodge to building the most comprehensive athlete platform in the world. How a cancer journey led to a vision that's changing the game for every athlete.",
    duration: "48:32",
    date: "April 15, 2026",
    season: 1,
    tags: ["Origin Story", "ATHLYNX", "DHG"],
    featured: true,
  },
  {
    id: 2,
    number: "EP 002",
    title: "NIL Deals Explained: What Every Athlete Needs to Know",
    description: "Breaking down Name, Image, and Likeness deals from the ground up. What they are, how they work, what to watch out for, and how ATHLYNX helps athletes maximize their NIL value.",
    duration: "42:15",
    date: "April 22, 2026",
    season: 1,
    tags: ["NIL", "Education", "Money"],
    featured: false,
  },
  {
    id: 3,
    number: "EP 003",
    title: "Transfer Portal: Navigating the New Recruiting Landscape",
    description: "The transfer portal has changed college athletics forever. We break down the windows, the rules, the dead periods, and how athletes can use ATHLYNX to manage the entire process.",
    duration: "51:08",
    date: "April 29, 2026",
    season: 1,
    tags: ["Transfer Portal", "Recruiting", "NCAA"],
    featured: false,
  },
  {
    id: 4,
    number: "EP 004",
    title: "Building Your Brand: Social Media for Athletes",
    description: "Your brand is your business. Learn how to build a social media presence that attracts NIL deals, connects with fans, and positions you for success beyond sports. TikTok, Instagram, and the ATHLYNX Feed.",
    duration: "39:45",
    date: "May 6, 2026",
    season: 1,
    tags: ["Social Media", "Branding", "TikTok"],
    featured: false,
  },
  {
    id: 5,
    number: "EP 005",
    title: "Agents, Lawyers & Financial Advisors: Your Team Off the Field",
    description: "Every athlete needs a team beyond the field. We talk to sports agents, attorneys, and financial advisors about what athletes should look for, red flags to avoid, and how to protect your money.",
    duration: "55:20",
    date: "May 13, 2026",
    season: 1,
    tags: ["Agents", "Legal", "Finance"],
    featured: false,
  },
  {
    id: 6,
    number: "EP 006",
    title: "From Youth Sports to the Pros: The Full Athlete Lifecycle",
    description: "ATHLYNX captures athletes from the moment they start to the moment they retire. We discuss every stage — youth, high school, college, professional, and post-career — and what tools athletes need at each step.",
    duration: "47:55",
    date: "May 20, 2026",
    season: 1,
    tags: ["Youth Sports", "Career", "Lifecycle"],
    featured: false,
  },
  {
    id: 7,
    number: "EP 007",
    title: "AI in Sports: How ATHLYNX Uses Artificial Intelligence",
    description: "From AI recruiting assistants to content creation bots to training analytics — we reveal how ATHLYNX is using artificial intelligence to give athletes an unfair advantage.",
    duration: "44:10",
    date: "May 27, 2026",
    season: 1,
    tags: ["AI", "Technology", "Innovation"],
    featured: false,
  },
  {
    id: 8,
    number: "EP 008",
    title: "The Diamond Grind: Baseball's Digital Revolution",
    description: "Baseball is being transformed by data and technology. We dive into Diamond Grind — ATHLYNX's baseball-specific platform — and how it's changing training, scouting, and recruiting for America's pastime.",
    duration: "43:30",
    date: "June 3, 2026",
    season: 1,
    tags: ["Baseball", "Diamond Grind", "Analytics"],
    featured: false,
  },
];

const UPCOMING_GUESTS = [
  { name: "College Football Coach", topic: "Recruiting in the NIL Era", date: "June 2026" },
  { name: "Top NIL Agent", topic: "Negotiating Your First Deal", date: "June 2026" },
  { name: "Financial Advisor", topic: "Managing Athlete Wealth", date: "July 2026" },
  { name: "Transfer Portal Expert", topic: "Maximizing Your Portal Entry", date: "July 2026" },
  { name: "Sports Attorney", topic: "Contracts Every Athlete Should Understand", date: "August 2026" },
];

export default function Podcast() {
  const [playingEpisode, setPlayingEpisode] = useState<number | null>(null);
  const [expandedEpisode, setExpandedEpisode] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-[#0a1628] to-cyan-900/30" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(0,212,255,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(147,51,234,0.3) 0%, transparent 50%)' }} />
        
        <div className="container relative py-16 md:py-24">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-purple-400">Podcast</span>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                  <Mic className="w-6 h-6" />
                </div>
                <div className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-300 font-semibold">
                  NEW EPISODES WEEKLY
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                The Athlete's<br />
                <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Playbook Podcast
                </span>
              </h1>
              
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                {SHOW_INFO.description}
              </p>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Headphones className="w-4 h-4 text-purple-400" />
                  <span>{EPISODES.length} Episodes</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>{SHOW_INFO.frequency}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>Season 1</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={() => setPlayingEpisode(1)}
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-bold"
                >
                  <Play className="w-5 h-5 mr-2" /> Play Latest Episode
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-6 py-3 rounded-xl">
                  <Radio className="w-5 h-5 mr-2" /> Subscribe
                </Button>
              </div>
            </div>

            {/* Podcast Cover Art */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80 md:w-96 md:h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-3xl shadow-2xl shadow-purple-500/30 transform rotate-3" />
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/nTYMGLkExngartwO.png"
                  alt="The Athlete's Playbook Podcast Cover Art"
                  className="relative w-full h-full object-cover rounded-3xl border border-white/20 shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Listen On Platforms */}
      <div className="container py-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Listen On</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {PLATFORMS.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              className={`bg-gradient-to-br ${platform.color} rounded-xl p-4 text-center hover:scale-105 transition-transform cursor-pointer`}
            >
              <div className="text-3xl mb-2">{platform.icon}</div>
              <div className="text-sm font-semibold">{platform.name}</div>
            </a>
          ))}
        </div>
      </div>

      {/* Featured Episode */}
      {EPISODES.filter(e => e.featured).map(ep => (
        <div key={ep.id} className="container py-8">
          <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border border-purple-500/30 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 text-sm font-bold">FEATURED EPISODE</span>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="text-purple-400 text-sm font-bold mb-2">{ep.number} · {ep.date}</div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{ep.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{ep.description}</p>
                <div className="flex flex-wrap items-center gap-4">
                  <Button 
                    onClick={() => setPlayingEpisode(playingEpisode === ep.id ? null : ep.id)}
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white rounded-xl"
                  >
                    {playingEpisode === ep.id ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {playingEpisode === ep.id ? 'Pause' : 'Play Episode'}
                  </Button>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Clock className="w-4 h-4" /> {ep.duration}
                  </div>
                  <button className="text-gray-400 hover:text-white transition"><Share2 className="w-4 h-4" /></button>
                  <button className="text-gray-400 hover:text-white transition"><Download className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 content-start">
                {ep.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* All Episodes */}
      <div className="container py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">All Episodes</h2>
            <p className="text-gray-400 mt-1">Season 1 · {EPISODES.length} episodes</p>
          </div>
        </div>

        <div className="space-y-4">
          {EPISODES.map((ep) => (
            <div
              key={ep.id}
              className={`bg-white/5 border rounded-xl p-6 transition-all cursor-pointer hover:border-purple-500/40 ${
                playingEpisode === ep.id ? 'border-purple-500/60 bg-purple-900/20' : 'border-white/10'
              }`}
              onClick={() => setExpandedEpisode(expandedEpisode === ep.id ? null : ep.id)}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={(e) => { e.stopPropagation(); setPlayingEpisode(playingEpisode === ep.id ? null : ep.id); }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition ${
                    playingEpisode === ep.id 
                      ? 'bg-gradient-to-br from-purple-500 to-cyan-500' 
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {playingEpisode === ep.id ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-purple-400 text-xs font-bold">{ep.number}</span>
                    <span className="text-gray-500 text-xs">{ep.date}</span>
                    <span className="text-gray-500 text-xs flex items-center gap-1"><Clock className="w-3 h-3" /> {ep.duration}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-1">{ep.title}</h3>
                  {expandedEpisode === ep.id && (
                    <div className="mt-3">
                      <p className="text-gray-400 text-sm leading-relaxed mb-3">{ep.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {ep.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-gray-400">{tag}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={(e) => { e.stopPropagation(); }} className="text-gray-500 hover:text-white transition p-2"><Share2 className="w-4 h-4" /></button>
                  <button onClick={(e) => { e.stopPropagation(); }} className="text-gray-500 hover:text-white transition p-2"><Download className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Guests */}
      <div className="container py-12">
        <h2 className="text-3xl font-bold mb-2">Upcoming Guests</h2>
        <p className="text-gray-400 mb-8">Coming soon on The Athlete's Playbook</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {UPCOMING_GUESTS.map((guest, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 flex items-center justify-center">
                  <Mic className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-xs text-gray-500">{guest.date}</div>
              </div>
              <h3 className="font-bold mb-1">{guest.name}</h3>
              <p className="text-sm text-gray-400">{guest.topic}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About the Host */}
      <div className="container py-12">
        <div className="bg-gradient-to-r from-[#0f1f3a] to-[#1a2a4a] border border-white/10 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="flex justify-center">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center text-6xl font-black">
                CD
              </div>
            </div>
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-2">About the Host</h2>
              <h3 className="text-xl text-cyan-400 font-semibold mb-4">{SHOW_INFO.host}</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {SHOW_INFO.hostTitle}. Chad built ATHLYNX from the ground up to give every athlete — 
                from youth sports to retirement — the tools they need to succeed on and off the field. 
                His journey from Hope Lodge to building a sports technology empire is the foundation of 
                everything ATHLYNX stands for.
              </p>
              <p className="text-gray-400 leading-relaxed">
                On The Athlete's Playbook Podcast, Chad brings real conversations with the people who 
                are shaping the future of athlete success — no fluff, no gatekeeping, just the playbook 
                every athlete needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Never Miss an Episode</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Subscribe to The Athlete's Playbook Podcast on your favorite platform and get new episodes every Tuesday.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/signup" className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-bold hover:opacity-90 transition">
              Join ATHLYNX Free
            </Link>
            <Link href="/" className="px-8 py-3 bg-white/10 border border-white/20 rounded-xl font-bold hover:bg-white/20 transition">
              Explore the Platform
            </Link>
          </div>
        </div>
      </div>

      {/* Now Playing Bar */}
      {playingEpisode && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#0f1729]/95 backdrop-blur-xl border-t border-purple-500/30 px-4 py-3 z-50">
          <div className="container flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center flex-shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold truncate">
                {EPISODES.find(e => e.id === playingEpisode)?.title}
              </div>
              <div className="text-xs text-gray-400">The Athlete's Playbook Podcast</div>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-gray-400 hover:text-white transition"><SkipBack className="w-5 h-5" /></button>
              <button 
                onClick={() => setPlayingEpisode(null)}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center"
              >
                <Pause className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-white transition"><SkipForward className="w-5 h-5" /></button>
              <button className="text-gray-400 hover:text-white transition hidden md:block"><Volume2 className="w-5 h-5" /></button>
            </div>
          </div>
          {/* Progress bar */}
          <div className="container mt-2">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full w-1/3 transition-all" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
