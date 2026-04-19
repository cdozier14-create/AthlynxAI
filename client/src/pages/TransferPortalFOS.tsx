import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  TrendingUp,
  Clock,
  Share2,
  Bookmark,
  ChevronRight,
  Flame,
  Zap,
  Star,
  ArrowLeft,
  Filter,
  Bell,
  ExternalLink
} from "lucide-react";

// School brand data
const schoolBrands: Record<string, { primary: string; secondary: string; logo: string; mascot: string }> = {
  "Alabama": { primary: "#9E1B32", secondary: "#828A8F", logo: "🅰️", mascot: "Crimson Tide" },
  "Georgia": { primary: "#BA0C2F", secondary: "#000000", logo: "🐶", mascot: "Bulldogs" },
  "Ohio State": { primary: "#BB0000", secondary: "#666666", logo: "🌰", mascot: "Buckeyes" },
  "Michigan": { primary: "#00274C", secondary: "#FFCB05", logo: "〽️", mascot: "Wolverines" },
  "Texas": { primary: "#BF5700", secondary: "#333F48", logo: "🤘", mascot: "Longhorns" },
  "USC": { primary: "#990000", secondary: "#FFC72C", logo: "✌️", mascot: "Trojans" },
  "Oregon": { primary: "#154733", secondary: "#FEE123", logo: "🦆", mascot: "Ducks" },
  "LSU": { primary: "#461D7C", secondary: "#FDD023", logo: "🐯", mascot: "Tigers" },
  "Florida": { primary: "#0021A5", secondary: "#FA4616", logo: "🐊", mascot: "Gators" },
  "Tennessee": { primary: "#FF8200", secondary: "#58595B", logo: "🍊", mascot: "Volunteers" },
  "Ole Miss": { primary: "#CE1126", secondary: "#14213D", logo: "🔴", mascot: "Rebels" },
  "Mississippi State": { primary: "#660000", secondary: "#FFFFFF", logo: "🔔", mascot: "Bulldogs" },
  "Auburn": { primary: "#0C2340", secondary: "#E87722", logo: "🦅", mascot: "Tigers" },
  "Texas A&M": { primary: "#500000", secondary: "#FFFFFF", logo: "👍", mascot: "Aggies" },
  "Penn State": { primary: "#041E42", secondary: "#FFFFFF", logo: "🦁", mascot: "Nittany Lions" },
  "Notre Dame": { primary: "#0C2340", secondary: "#C99700", logo: "☘️", mascot: "Fighting Irish" },
  "Clemson": { primary: "#F56600", secondary: "#522D80", logo: "🐅", mascot: "Tigers" },
  "Miami": { primary: "#F47321", secondary: "#005030", logo: "🙌", mascot: "Hurricanes" },
  "Colorado": { primary: "#CFB87C", secondary: "#000000", logo: "🦬", mascot: "Buffaloes" },
  "Oklahoma": { primary: "#841617", secondary: "#FDF9D8", logo: "🏈", mascot: "Sooners" },
};

// Breaking transfer news
const breakingNews = [
  {
    id: 1,
    headline: "Travis Hunter Declares for NFL Draft",
    school: "Colorado",
    player: "Travis Hunter",
    position: "CB/WR",
    nilValue: "$4.5M",
    timestamp: "2 hours ago",
    isHot: true,
    type: "draft",
    summary: "Two-way star and Heisman winner announces NFL intentions after historic season"
  },
  {
    id: 2,
    headline: "Mississippi State Lands Experienced SEC Quarterback",
    school: "Mississippi State",
    player: "AJ Swann",
    position: "QB",
    nilValue: "$850K",
    timestamp: "4 hours ago",
    isHot: true,
    type: "commitment",
    summary: "Former Vanderbilt starter brings SEC experience to Starkville"
  },
  {
    id: 3,
    headline: "5-Star Edge Rusher Enters Portal from Georgia",
    school: "Georgia",
    player: "Mykel Williams",
    position: "Edge",
    nilValue: "$1.2M",
    timestamp: "6 hours ago",
    isHot: false,
    type: "portal",
    summary: "Former top recruit looking for more playing time after championship season"
  },
  {
    id: 4,
    headline: "Ohio State WR Commits to USC",
    school: "USC",
    player: "Carnell Tate",
    position: "WR",
    nilValue: "$920K",
    timestamp: "8 hours ago",
    isHot: false,
    type: "commitment",
    summary: "Chicago native heads west for fresh start under Lincoln Riley"
  },
  {
    id: 5,
    headline: "Alabama RB Enters Transfer Portal",
    school: "Alabama",
    player: "Jam Miller",
    position: "RB",
    nilValue: "$680K",
    timestamp: "12 hours ago",
    isHot: false,
    type: "portal",
    summary: "Seeking starting role after splitting carries in Tuscaloosa"
  },
];

// Top available players
const topAvailable = [
  { rank: 1, name: "Jalen Milroe", position: "QB", school: "Alabama", nilValue: "$2.8M", rating: 0.9456 },
  { rank: 2, name: "Quinshon Judkins", position: "RB", school: "Ohio State", nilValue: "$1.9M", rating: 0.9234 },
  { rank: 3, name: "Tetairoa McMillan", position: "WR", school: "Arizona", nilValue: "$2.35M", rating: 0.9189 },
  { rank: 4, name: "Nic Scourton", position: "Edge", school: "Texas A&M", nilValue: "$1.4M", rating: 0.9102 },
  { rank: 5, name: "Kelvin Banks Jr.", position: "OT", school: "Texas", nilValue: "$1.6M", rating: 0.9078 },
];

// School transfer activity
const schoolActivity = [
  { school: "Colorado", in: 24, out: 8, netNIL: "+$12.4M" },
  { school: "USC", in: 18, out: 12, netNIL: "+$8.2M" },
  { school: "Texas", in: 15, out: 6, netNIL: "+$6.8M" },
  { school: "Alabama", in: 12, out: 14, netNIL: "-$2.1M" },
  { school: "Ohio State", in: 11, out: 9, netNIL: "+$4.5M" },
];

function NewsCard({ news }: { news: typeof breakingNews[0] }) {
  const brand = schoolBrands[news.school] || { primary: "#1e3a5f", secondary: "#ffffff", logo: "🏈", mascot: "Team" };
  
  return (
    <Card className="bg-slate-900 border-slate-700 hover:border-cyan-400/50 transition-all cursor-pointer group overflow-hidden">
      <div 
        className="h-2" 
        style={{ backgroundColor: brand.primary }}
      />
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {news.isHot && (
              <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
                <Flame className="w-3 h-3 mr-1" /> HOT
              </Badge>
            )}
            <Badge 
              variant="outline"
              className={`${
                news.type === "commitment" 
                  ? "border-green-400 text-green-400" 
                  : news.type === "portal"
                  ? "border-amber-400 text-amber-400"
                  : "border-blue-400 text-blue-400"
              }`}
            >
              {news.type === "commitment" ? "COMMITMENT" : news.type === "portal" ? "IN PORTAL" : "NFL DRAFT"}
            </Badge>
          </div>
          <span className="text-slate-500 text-xs flex items-center gap-1">
            <Clock className="w-3 h-3" /> {news.timestamp}
          </span>
        </div>

        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-cyan-400 transition-colors">
          {news.headline}
        </h3>

        <p className="text-slate-400 text-sm mb-4">
          {news.summary}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
              style={{ backgroundColor: brand.primary }}
            >
              {brand.logo}
            </div>
            <div>
              <p className="text-white font-semibold">{news.player}</p>
              <p className="text-slate-400 text-sm">{news.position} • {news.school}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-green-400 font-bold">{news.nilValue}</p>
            <p className="text-slate-500 text-xs">NIL Value</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
          <div className="flex items-center gap-3">
            <button className="text-slate-400 hover:text-cyan-400 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="text-slate-400 hover:text-cyan-400 transition-colors">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
          <span className="text-cyan-400 text-sm flex items-center gap-1 group-hover:underline">
            Full Story <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function SchoolCard({ school, data }: { school: string; data: typeof schoolActivity[0] }) {
  const brand = schoolBrands[school] || { primary: "#1e3a5f", secondary: "#ffffff", logo: "🏈", mascot: "Team" };
  
  return (
    <Link href={`/school/${school.toLowerCase().replace(/\s+/g, '-')}`}>
      <Card className="bg-slate-900 border-slate-700 hover:border-cyan-400/50 transition-all cursor-pointer group">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: brand.primary }}
            >
              {brand.logo}
            </div>
            <div>
              <h4 className="text-white font-bold group-hover:text-cyan-400 transition-colors">{school}</h4>
              <p className="text-slate-400 text-sm">{brand.mascot}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-green-500/10 rounded-lg p-2">
              <p className="text-green-400 font-bold">{data.in}</p>
              <p className="text-slate-500 text-xs">IN</p>
            </div>
            <div className="bg-red-500/10 rounded-lg p-2">
              <p className="text-red-400 font-bold">{data.out}</p>
              <p className="text-slate-500 text-xs">OUT</p>
            </div>
            <div className={`${data.netNIL.startsWith('+') ? 'bg-green-500/10' : 'bg-red-500/10'} rounded-lg p-2`}>
              <p className={`${data.netNIL.startsWith('+') ? 'text-green-400' : 'text-red-400'} font-bold text-sm`}>{data.netNIL}</p>
              <p className="text-slate-500 text-xs">NIL</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function TransferPortalFOS() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConference, setSelectedConference] = useState("all");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-black text-white flex items-center gap-2">
                  <Zap className="w-6 h-6 text-cyan-400" />
                  TRANSFER PORTAL
                </h1>
                <p className="text-slate-400 text-sm">Powered by ATHLYNX • Front Office Sports Style</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                <Bell className="w-4 h-4 mr-2" /> Alerts
              </Button>
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                <Filter className="w-4 h-4 mr-2" /> Filters
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-slate-900/50 border-b border-slate-800 py-4">
        <div className="container mx-auto px-4">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search players, schools, positions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 h-12 text-lg"
            />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Live Ticker */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-4 mb-8 flex items-center gap-4 overflow-hidden">
          <Badge className="bg-white text-red-600 font-bold shrink-0">LIVE</Badge>
          <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
            <span className="text-white font-medium">🔥 Travis Hunter declares for NFL Draft</span>
            <span className="text-white/60">•</span>
            <span className="text-white font-medium">📢 AJ Swann commits to Mississippi State</span>
            <span className="text-white/60">•</span>
            <span className="text-white font-medium">⚡ 847 players currently in portal</span>
            <span className="text-white/60">•</span>
            <span className="text-white font-medium">💰 $2.1B total NIL value in portal</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main News Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                Breaking Transfer News
              </h2>
              <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="space-y-4">
              {breakingNews.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Available */}
            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400" />
                  Top Available Players
                </h3>
                <div className="space-y-3">
                  {topAvailable.map((player) => (
                    <div key={player.rank} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
                      <span className="text-2xl font-black text-slate-600 w-8">{player.rank}</span>
                      <div className="flex-1">
                        <p className="text-white font-semibold">{player.name}</p>
                        <p className="text-slate-400 text-sm">{player.position} • {player.school}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-bold">{player.nilValue}</p>
                        <p className="text-slate-500 text-xs">{player.rating.toFixed(4)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/transfer-portal">
                  <Button variant="outline" className="w-full mt-4 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10">
                    View Full Rankings
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* School Activity */}
            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  Most Active Schools
                </h3>
                <div className="space-y-3">
                  {schoolActivity.map((data) => (
                    <SchoolCard key={data.school} school={data.school} data={data} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-cyan-400/30">
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Link href="/transfer-portal">
                    <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
                      <ExternalLink className="w-4 h-4 mr-2" /> Full Player Database
                    </Button>
                  </Link>
                  <Link href="/wizards">
                    <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
                      <ExternalLink className="w-4 h-4 mr-2" /> AI Transfer Guide
                    </Button>
                  </Link>
                  <Link href="/nil-vault">
                    <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
                      <ExternalLink className="w-4 h-4 mr-2" /> NIL Valuations
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* School Deep Dive Section */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">School Deep Dives</h2>
            <Button variant="outline" className="border-slate-700 text-slate-300">
              View All Schools
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(schoolBrands).slice(0, 8).map(([school, brand]) => (
              <Link key={school} href={`/school/${school.toLowerCase().replace(/\s+/g, '-')}`}>
                <Card 
                  className="bg-slate-900 border-slate-700 hover:border-cyan-400/50 transition-all cursor-pointer group overflow-hidden"
                >
                  <div className="h-24 flex items-center justify-center text-5xl" style={{ backgroundColor: brand.primary }}>
                    {brand.logo}
                  </div>
                  <CardContent className="p-4">
                    <h4 className="text-white font-bold group-hover:text-cyan-400 transition-colors">{school}</h4>
                    <p className="text-slate-400 text-sm">{brand.mascot}</p>
                    <p className="text-cyan-400 text-sm mt-2 flex items-center gap-1">
                      View Portal Activity <ChevronRight className="w-4 h-4" />
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400">
            <span className="text-cyan-400 font-bold">ATHLYNX</span> Transfer Portal • Powered by Front Office Sports Style
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Real-time transfer news, NIL valuations, and school deep dives
          </p>
        </div>
      </footer>
    </div>
  );
}
