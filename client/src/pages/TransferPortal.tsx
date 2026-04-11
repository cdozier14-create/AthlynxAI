import { useState, useMemo, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  GraduationCap, 
  TrendingUp,
  Users,
  Calendar,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Eye,
  Heart,
  Share2,
  ArrowLeft,
  Zap,
  Shield,
  Clock,
  DollarSign
} from "lucide-react";

// Football positions with categories
const positionCategories = {
  "Offense": [
    { value: "QB", label: "Quarterback" },
    { value: "RB", label: "Running Back" },
    { value: "WR", label: "Wide Receiver" },
    { value: "TE", label: "Tight End" },
    { value: "OT", label: "Offensive Tackle" },
    { value: "OG", label: "Offensive Guard" },
    { value: "C", label: "Center" },
    { value: "IOL", label: "Interior O-Line" },
  ],
  "Defense": [
    { value: "Edge", label: "Edge Rusher" },
    { value: "DT", label: "Defensive Tackle" },
    { value: "DE", label: "Defensive End" },
    { value: "LB", label: "Linebacker" },
    { value: "ILB", label: "Inside Linebacker" },
    { value: "OLB", label: "Outside Linebacker" },
    { value: "CB", label: "Cornerback" },
    { value: "S", label: "Safety" },
    { value: "FS", label: "Free Safety" },
    { value: "SS", label: "Strong Safety" },
  ],
  "Special Teams": [
    { value: "K", label: "Kicker" },
    { value: "P", label: "Punter" },
    { value: "LS", label: "Long Snapper" },
  ],
  "Athlete": [
    { value: "ATH", label: "Athlete" },
  ],
};

const divisions = [
  { value: "all", label: "All Divisions" },
  { value: "D1-FBS", label: "FBS (D1)" },
  { value: "D1-FCS", label: "FCS (D1)" },
  { value: "D2", label: "Division II" },
  { value: "D3", label: "Division III" },
  { value: "NAIA", label: "NAIA" },
  { value: "JUCO", label: "JUCO" },
];

const conferences = [
  { value: "all", label: "All Conferences" },
  { value: "SEC", label: "SEC" },
  { value: "Big Ten", label: "Big Ten" },
  { value: "Big 12", label: "Big 12" },
  { value: "ACC", label: "ACC" },
  { value: "Pac-12", label: "Pac-12" },
  { value: "AAC", label: "American" },
  { value: "MWC", label: "Mountain West" },
  { value: "Sun Belt", label: "Sun Belt" },
  { value: "MAC", label: "MAC" },
  { value: "CUSA", label: "Conference USA" },
  { value: "Independent", label: "Independent" },
];

const statuses = [
  { value: "all", label: "All Statuses" },
  { value: "available", label: "Available" },
  { value: "entered", label: "In Portal" },
  { value: "committed", label: "Committed" },
];

// Fallback sample data in case API fails
const fallbackPlayers = [
  {
    id: 1,
    fullName: "Marcus Johnson",
    position: "QB",
    height: "6-3",
    weight: 215,
    currentSchool: "Texas A&M",
    currentConference: "SEC",
    currentDivision: "D1-FBS",
    status: "available",
    playerRating: 0.9245,
    starRating: 4,
    nilValuation: 850000,
    eligibilityRemaining: 2,
    gpa: 3.4,
    totalFollowers: 125000,
    highlightVideoUrl: "#",
    stats: { passingYards: 2847, touchdowns: 24, completionPct: 67.2 },
  },
  {
    id: 2,
    fullName: "DeShawn Williams",
    position: "Edge",
    height: "6-4",
    weight: 255,
    currentSchool: "Oregon",
    currentConference: "Big Ten",
    currentDivision: "D1-FBS",
    status: "available",
    playerRating: 0.9102,
    starRating: 4,
    nilValuation: 620000,
    eligibilityRemaining: 1,
    gpa: 3.1,
    totalFollowers: 45000,
    highlightVideoUrl: "#",
    stats: { sacks: 8.5, tackles: 52, tfl: 14 },
  },
  {
    id: 3,
    fullName: "Jaylen Carter",
    position: "WR",
    height: "6-1",
    weight: 195,
    currentSchool: "USC",
    currentConference: "Big Ten",
    currentDivision: "D1-FBS",
    status: "available",
    playerRating: 0.8876,
    starRating: 4,
    nilValuation: 520000,
    eligibilityRemaining: 3,
    gpa: 3.6,
    totalFollowers: 89000,
    highlightVideoUrl: "#",
    stats: { receptions: 67, yards: 1024, touchdowns: 9 },
  },
  {
    id: 4,
    fullName: "Tyler Brooks",
    position: "RB",
    height: "5-11",
    weight: 210,
    currentSchool: "Alabama",
    currentConference: "SEC",
    currentDivision: "D1-FBS",
    status: "entered",
    playerRating: 0.8654,
    starRating: 3,
    nilValuation: 380000,
    eligibilityRemaining: 2,
    gpa: 2.9,
    totalFollowers: 32000,
    highlightVideoUrl: "#",
    stats: { rushingYards: 876, touchdowns: 8, ypc: 5.2 },
  },
  {
    id: 5,
    fullName: "Chris Anderson",
    position: "CB",
    height: "6-0",
    weight: 185,
    currentSchool: "Ohio State",
    currentConference: "Big Ten",
    currentDivision: "D1-FBS",
    status: "available",
    playerRating: 0.9012,
    starRating: 4,
    nilValuation: 480000,
    eligibilityRemaining: 1,
    gpa: 3.2,
    totalFollowers: 56000,
    highlightVideoUrl: "#",
    stats: { interceptions: 4, passBreakups: 12, tackles: 38 },
  },
  {
    id: 6,
    fullName: "Brandon Mitchell",
    position: "OT",
    height: "6-6",
    weight: 315,
    currentSchool: "Georgia",
    currentConference: "SEC",
    currentDivision: "D1-FBS",
    status: "available",
    playerRating: 0.8789,
    starRating: 4,
    nilValuation: 420000,
    eligibilityRemaining: 2,
    gpa: 3.0,
    totalFollowers: 18000,
    highlightVideoUrl: "#",
    stats: { gamesStarted: 24, sacksAllowed: 2, pancakes: 45 },
  },
];

function formatNIL(value: number) {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value}`;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "text-amber-400 fill-amber-400"
              : "text-slate-600"
          }`}
        />
      ))}
    </div>
  );
}

function PlayerCard({ player }: { player: typeof fallbackPlayers[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="bg-slate-800/80 border-slate-700 hover:border-cyan-400/50 transition-all group">
      <CardContent className="p-4">
        {/* Header Row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* Position Badge */}
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-sm">{player.position}</span>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-lg group-hover:text-cyan-400 transition-colors">
                {player.fullName}
              </h3>
              <p className="text-slate-400 text-sm flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {player.currentSchool} • {player.currentConference}
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <Badge 
            variant="outline" 
            className={`${
              player.status === "available" 
                ? "border-green-400 text-green-400 bg-green-400/10" 
                : player.status === "entered"
                ? "border-amber-400 text-amber-400 bg-amber-400/10"
                : "border-slate-400 text-slate-400"
            }`}
          >
            {player.status === "available" ? "AVAILABLE" : player.status === "entered" ? "IN PORTAL" : "COMMITTED"}
          </Badge>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          <div className="bg-slate-700/50 rounded-lg p-2 text-center">
            <p className="text-slate-400 text-xs">Height</p>
            <p className="text-white font-bold">{player.height}</p>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-2 text-center">
            <p className="text-slate-400 text-xs">Weight</p>
            <p className="text-white font-bold">{player.weight}</p>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-2 text-center">
            <p className="text-slate-400 text-xs">Elig.</p>
            <p className="text-white font-bold">{player.eligibilityRemaining}yr</p>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-2 text-center">
            <p className="text-slate-400 text-xs">GPA</p>
            <p className="text-white font-bold">{player.gpa}</p>
          </div>
        </div>

        {/* Rating & NIL Row */}
        <div className="flex items-center justify-between mb-3 p-3 bg-gradient-to-r from-slate-700/50 to-blue-900/30 rounded-lg">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-slate-400 text-xs">Rating</p>
              <p className="text-cyan-400 font-bold">{typeof player.playerRating === 'number' ? player.playerRating.toFixed(4) : player.playerRating || 'N/A'}</p>
            </div>
            <StarRating rating={player.starRating} />
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-xs">NIL Value</p>
            <p className="text-green-400 font-bold text-lg">{formatNIL(player.nilValuation)}</p>
          </div>
        </div>

        {/* Expandable Stats */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors py-2"
        >
          <span className="text-sm">{expanded ? "Hide Stats" : "View Stats"}</span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {expanded && (
          <div className="mt-3 pt-3 border-t border-slate-700 animate-in fade-in slide-in-from-top-2">
            <div className="grid grid-cols-3 gap-2 mb-4">
              {Object.entries(player.stats).map(([key, value]) => (
                <div key={key} className="bg-slate-700/30 rounded p-2 text-center">
                  <p className="text-slate-400 text-xs capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                  <p className="text-white font-bold">{String(value)}</p>
                </div>
              ))}
            </div>
            
            {/* Social & Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Users className="w-4 h-4" />
                <span>{(player.totalFollowers / 1000).toFixed(0)}K followers</span>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400">
                  <Eye className="w-4 h-4 mr-1" />
                  Film
                </Button>
                <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:border-pink-400 hover:text-pink-400">
                  <Heart className="w-4 h-4 mr-1" />
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function TransferPortal() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("all");
  const [selectedDivision, setSelectedDivision] = useState("all");
  const [selectedConference, setSelectedConference] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(true);
  const [sortBy, setSortBy] = useState("rating");

  // Current recruiting period status
  const [periodStatus, setPeriodStatus] = useState<"dead" | "quiet" | "contact">("dead");

  // Fetch players from API
  const { data: apiPlayers, isLoading } = trpc.transferPortal.players.useQuery({
    sport: undefined,
    position: selectedPosition !== "all" ? selectedPosition : undefined,
    division: selectedDivision !== "all" ? selectedDivision : undefined,
    conference: selectedConference !== "all" ? selectedConference : undefined,
    status: selectedStatus !== "all" ? selectedStatus : undefined,
    search: searchQuery || undefined,
    limit: 100,
    offset: 0,
  });

  useEffect(() => {
    // Check current date against recruiting calendar
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    
    // January 8-11 is dead period
    if (month === 1 && day >= 8 && day <= 11) {
      setPeriodStatus("dead");
    } else if (month === 1) {
      setPeriodStatus("contact");
    } else {
      setPeriodStatus("contact");
    }
  }, []);

  // Use API players if available, otherwise fallback
  const apiPlayersList = apiPlayers?.players || [];
  const players = apiPlayersList.length > 0 ? apiPlayersList : fallbackPlayers;

  // Filter and sort players
  const filteredPlayers = useMemo(() => {
    return players.filter((player: any) => {
      // If using API data, filtering is done server-side, but we still apply client-side for fallback
      if (apiPlayersList.length > 0) return true;
      
      if (searchQuery && !player.fullName.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !player.currentSchool.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (selectedPosition !== "all" && player.position !== selectedPosition) return false;
      if (selectedDivision !== "all" && player.currentDivision !== selectedDivision) return false;
      if (selectedConference !== "all" && player.currentConference !== selectedConference) return false;
      if (selectedStatus !== "all" && player.status !== selectedStatus) return false;
      return true;
    }).sort((a: any, b: any) => {
      if (sortBy === "rating") return (b.playerRating || 0) - (a.playerRating || 0);
      if (sortBy === "nil") return (b.nilValuation || 0) - (a.nilValuation || 0);
      if (sortBy === "followers") return (b.totalFollowers || 0) - (a.totalFollowers || 0);
      return 0;
    });
  }, [players, apiPlayersList, searchQuery, selectedPosition, selectedDivision, selectedConference, selectedStatus, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 to-blue-900 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              
              {/* Queen of the Ball Logo */}
              <div className="relative cursor-pointer group">
                <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 rounded-xl px-3 py-2 flex items-center gap-3 shadow-xl hover:shadow-cyan-500/30 transition-all border border-cyan-400/30">
                  <img 
                    src="/athlynx-playbook-logo.png" 
                    alt="ATHLYNX - The Athlete's Playbook" 
                    className="h-8 md:h-10 rounded-lg shadow-lg group-hover:scale-105 transition-all duration-300"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full border border-slate-900 animate-pulse"></div>
              </div>
              
              <div>
                <h1 className="text-xl font-black text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  Transfer Portal
                </h1>
                <p className="text-cyan-400 text-xs">THE ATHLETE'S PLAYBOOK</p>
              </div>
            </div>

            {/* Recruiting Period Status */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              periodStatus === "dead" 
                ? "bg-red-500/20 border border-red-500/50" 
                : periodStatus === "quiet"
                ? "bg-amber-500/20 border border-amber-500/50"
                : "bg-green-500/20 border border-green-500/50"
            }`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                periodStatus === "dead" ? "bg-red-500" : periodStatus === "quiet" ? "bg-amber-500" : "bg-green-500"
              }`} />
              <span className={`text-sm font-medium ${
                periodStatus === "dead" ? "text-red-400" : periodStatus === "quiet" ? "text-amber-400" : "text-green-400"
              }`}>
                {periodStatus === "dead" ? "DEAD PERIOD" : periodStatus === "quiet" ? "QUIET PERIOD" : "CONTACT PERIOD"}
              </span>
              <Clock className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>
      </header>

      {/* Dead Period Notice */}
      {periodStatus === "dead" && (
        <div className="bg-red-500/10 border-b border-red-500/30 py-3 px-4">
          <div className="container mx-auto flex items-center justify-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-300 text-sm">
              <strong>NCAA Dead Period Active (Jan 8-11)</strong> — Coaches cannot make in-person contact. 
              <span className="text-red-400 font-medium"> ATHLYNX is your window to discover talent.</span>
            </p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className={`w-72 flex-shrink-0 ${showFilters ? '' : 'hidden'}`}>
            <Card className="bg-slate-800/50 border-slate-700 sticky top-32">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center gap-2">
                  <Filter className="w-5 h-5 text-cyan-400" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-slate-400 text-sm mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Name or school..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                {/* Position */}
                <div>
                  <label className="text-slate-400 text-sm mb-2 block">Position</label>
                  <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="All Positions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Positions</SelectItem>
                      {Object.entries(positionCategories).map(([category, positions]) => (
                        <div key={category}>
                          <div className="px-2 py-1 text-xs text-slate-400 font-medium bg-slate-800">
                            {category}
                          </div>
                          {positions.map((pos) => (
                            <SelectItem key={pos.value} value={pos.value}>
                              {pos.value} - {pos.label}
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Division */}
                <div>
                  <label className="text-slate-400 text-sm mb-2 block">Division</label>
                  <Select value={selectedDivision} onValueChange={setSelectedDivision}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="All Divisions" />
                    </SelectTrigger>
                    <SelectContent>
                      {divisions.map((div) => (
                        <SelectItem key={div.value} value={div.value}>{div.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Conference */}
                <div>
                  <label className="text-slate-400 text-sm mb-2 block">Conference</label>
                  <Select value={selectedConference} onValueChange={setSelectedConference}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="All Conferences" />
                    </SelectTrigger>
                    <SelectContent>
                      {conferences.map((conf) => (
                        <SelectItem key={conf.value} value={conf.value}>{conf.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Status */}
                <div>
                  <label className="text-slate-400 text-sm mb-2 block">Status</label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="text-slate-400 text-sm mb-2 block">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Highest Rating</SelectItem>
                      <SelectItem value="nil">Highest NIL Value</SelectItem>
                      <SelectItem value="followers">Most Followers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters */}
                <Button 
                  variant="outline" 
                  className="w-full border-slate-600 text-slate-300"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedPosition("all");
                    setSelectedDivision("all");
                    setSelectedConference("all");
                    setSelectedStatus("all");
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-white font-bold text-xl">
                  {filteredPlayers.length} Players Found
                </h2>
                <p className="text-slate-400 text-sm">
                  {selectedPosition !== "all" && `Position: ${selectedPosition} • `}
                  {selectedConference !== "all" && `${selectedConference} • `}
                  Sorted by {sortBy === "rating" ? "Rating" : sortBy === "nil" ? "NIL Value" : "Followers"}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-600 text-slate-300"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                {showFilters ? "Hide" : "Show"} Filters
              </Button>
            </div>

            {/* Player Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredPlayers.map((player: any) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>

            {filteredPlayers.length === 0 && (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">No Players Found</h3>
                <p className="text-slate-400">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border-t border-cyan-400/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-white font-bold text-2xl mb-2">Are You a Coach?</h3>
          <p className="text-slate-300 mb-4">
            Get unlimited access to player profiles, advanced analytics, and direct messaging.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/pricing">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500">
                <Shield className="w-4 h-4 mr-2" />
                Coach Dashboard
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:border-cyan-400">
                <DollarSign className="w-4 h-4 mr-2" />
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
