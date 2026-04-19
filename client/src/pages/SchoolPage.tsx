import { useState } from "react";
import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Trophy,
  MapPin,
  Calendar,
  Star,
  Share2,
  Bell,
  ChevronRight,
  Flame,
  Clock,
  ExternalLink,
  Building,
  GraduationCap
} from "lucide-react";

// Comprehensive school data
const schoolData: Record<string, {
  name: string;
  mascot: string;
  conference: string;
  division: string;
  location: string;
  stadium: string;
  capacity: number;
  headCoach: string;
  coachSince: number;
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  nilCollective: string;
  nilBudget: string;
  ranking: number;
  record: string;
  championships: number;
  transfersIn: number;
  transfersOut: number;
  topTransfer: string;
  topTransferNIL: string;
}> = {
  "alabama": {
    name: "Alabama",
    mascot: "Crimson Tide",
    conference: "SEC",
    division: "FBS",
    location: "Tuscaloosa, AL",
    stadium: "Bryant-Denny Stadium",
    capacity: 100077,
    headCoach: "Kalen DeBoer",
    coachSince: 2024,
    primaryColor: "#9E1B32",
    secondaryColor: "#828A8F",
    logo: "🅰️",
    nilCollective: "Yea Alabama",
    nilBudget: "$20M+",
    ranking: 5,
    record: "9-4",
    championships: 18,
    transfersIn: 12,
    transfersOut: 14,
    topTransfer: "Jalen Milroe",
    topTransferNIL: "$2.8M"
  },
  "georgia": {
    name: "Georgia",
    mascot: "Bulldogs",
    conference: "SEC",
    division: "FBS",
    location: "Athens, GA",
    stadium: "Sanford Stadium",
    capacity: 92746,
    headCoach: "Kirby Smart",
    coachSince: 2016,
    primaryColor: "#BA0C2F",
    secondaryColor: "#000000",
    logo: "🐶",
    nilCollective: "1785 Society",
    nilBudget: "$18M+",
    ranking: 2,
    record: "11-2",
    championships: 3,
    transfersIn: 8,
    transfersOut: 11,
    topTransfer: "Mykel Williams",
    topTransferNIL: "$1.2M"
  },
  "ohio-state": {
    name: "Ohio State",
    mascot: "Buckeyes",
    conference: "Big Ten",
    division: "FBS",
    location: "Columbus, OH",
    stadium: "Ohio Stadium",
    capacity: 102780,
    headCoach: "Ryan Day",
    coachSince: 2019,
    primaryColor: "#BB0000",
    secondaryColor: "#666666",
    logo: "🌰",
    nilCollective: "The Foundation",
    nilBudget: "$22M+",
    ranking: 1,
    record: "13-1",
    championships: 8,
    transfersIn: 11,
    transfersOut: 9,
    topTransfer: "Quinshon Judkins",
    topTransferNIL: "$1.9M"
  },
  "texas": {
    name: "Texas",
    mascot: "Longhorns",
    conference: "SEC",
    division: "FBS",
    location: "Austin, TX",
    stadium: "Darrell K Royal Stadium",
    capacity: 100119,
    headCoach: "Steve Sarkisian",
    coachSince: 2021,
    primaryColor: "#BF5700",
    secondaryColor: "#333F48",
    logo: "🤘",
    nilCollective: "Horns with Heart",
    nilBudget: "$15M+",
    ranking: 3,
    record: "12-2",
    championships: 4,
    transfersIn: 15,
    transfersOut: 6,
    topTransfer: "Kelvin Banks Jr.",
    topTransferNIL: "$1.6M"
  },
  "colorado": {
    name: "Colorado",
    mascot: "Buffaloes",
    conference: "Big 12",
    division: "FBS",
    location: "Boulder, CO",
    stadium: "Folsom Field",
    capacity: 50183,
    headCoach: "Deion Sanders",
    coachSince: 2023,
    primaryColor: "#CFB87C",
    secondaryColor: "#000000",
    logo: "🦬",
    nilCollective: "Buffs4Life",
    nilBudget: "$25M+",
    ranking: 15,
    record: "9-4",
    championships: 1,
    transfersIn: 24,
    transfersOut: 8,
    topTransfer: "Travis Hunter",
    topTransferNIL: "$4.5M"
  },
  "mississippi-state": {
    name: "Mississippi State",
    mascot: "Bulldogs",
    conference: "SEC",
    division: "FBS",
    location: "Starkville, MS",
    stadium: "Davis Wade Stadium",
    capacity: 61337,
    headCoach: "Jeff Lebby",
    coachSince: 2024,
    primaryColor: "#660000",
    secondaryColor: "#FFFFFF",
    logo: "🔔",
    nilCollective: "First & Goal",
    nilBudget: "$8M+",
    ranking: 45,
    record: "6-6",
    championships: 0,
    transfersIn: 18,
    transfersOut: 15,
    topTransfer: "AJ Swann",
    topTransferNIL: "$850K"
  },
  "ole-miss": {
    name: "Ole Miss",
    mascot: "Rebels",
    conference: "SEC",
    division: "FBS",
    location: "Oxford, MS",
    stadium: "Vaught-Hemingway Stadium",
    capacity: 64038,
    headCoach: "Lane Kiffin",
    coachSince: 2020,
    primaryColor: "#CE1126",
    secondaryColor: "#14213D",
    logo: "🔴",
    nilCollective: "Grove Collective",
    nilBudget: "$12M+",
    ranking: 12,
    record: "10-3",
    championships: 0,
    transfersIn: 14,
    transfersOut: 10,
    topTransfer: "Jaxson Dart",
    topTransferNIL: "$2.1M"
  },
  "usc": {
    name: "USC",
    mascot: "Trojans",
    conference: "Big Ten",
    division: "FBS",
    location: "Los Angeles, CA",
    stadium: "LA Memorial Coliseum",
    capacity: 77500,
    headCoach: "Lincoln Riley",
    coachSince: 2022,
    primaryColor: "#990000",
    secondaryColor: "#FFC72C",
    logo: "✌️",
    nilCollective: "Student Body Right",
    nilBudget: "$18M+",
    ranking: 18,
    record: "7-6",
    championships: 11,
    transfersIn: 18,
    transfersOut: 12,
    topTransfer: "Carnell Tate",
    topTransferNIL: "$920K"
  },
};

// Recent news for each school
const schoolNews: Record<string, Array<{
  headline: string;
  timestamp: string;
  type: "commitment" | "portal" | "news";
  player?: string;
  position?: string;
}>> = {
  "mississippi-state": [
    { headline: "AJ Swann commits to Mississippi State", timestamp: "4 hours ago", type: "commitment", player: "AJ Swann", position: "QB" },
    { headline: "Bulldogs add experienced SEC linebacker", timestamp: "1 day ago", type: "commitment", player: "Marcus Johnson", position: "LB" },
    { headline: "Jeff Lebby building through portal", timestamp: "2 days ago", type: "news" },
    { headline: "WR enters portal seeking more targets", timestamp: "3 days ago", type: "portal", player: "Rara Thomas", position: "WR" },
  ],
  "alabama": [
    { headline: "Jalen Milroe exploring NFL options", timestamp: "2 hours ago", type: "news", player: "Jalen Milroe", position: "QB" },
    { headline: "5-star DL commits from portal", timestamp: "1 day ago", type: "commitment", player: "David Stone", position: "DT" },
    { headline: "Kalen DeBoer reshaping roster", timestamp: "2 days ago", type: "news" },
  ],
  "colorado": [
    { headline: "Travis Hunter declares for NFL Draft", timestamp: "2 hours ago", type: "news", player: "Travis Hunter", position: "CB/WR" },
    { headline: "Shedeur Sanders NFL decision pending", timestamp: "6 hours ago", type: "news", player: "Shedeur Sanders", position: "QB" },
    { headline: "Deion Sanders lands 4-star WR", timestamp: "1 day ago", type: "commitment", player: "Jordan Anderson", position: "WR" },
  ],
};

export default function SchoolPage() {
  const params = useParams();
  const slug = params.slug as string || "alabama";
  const school = schoolData[slug] || schoolData["alabama"];
  const news = schoolNews[slug] || schoolNews["alabama"] || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Header with School Branding */}
      <div 
        className="relative h-64 md:h-80"
        style={{ 
          background: `linear-gradient(135deg, ${school.primaryColor} 0%, ${school.secondaryColor} 100%)` 
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto px-4 h-full flex items-end pb-8 relative z-10">
          <div className="flex items-end gap-6">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl flex items-center justify-center text-6xl md:text-7xl shadow-2xl">
              {school.logo}
            </div>
            <div className="pb-2">
              <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg">
                {school.name}
              </h1>
              <p className="text-xl md:text-2xl text-white/80">{school.mascot}</p>
              <div className="flex items-center gap-3 mt-2">
                <Badge className="bg-white/20 text-white border-white/30">{school.conference}</Badge>
                <Badge className="bg-white/20 text-white border-white/30">#{school.ranking} Ranked</Badge>
                <Badge className="bg-white/20 text-white border-white/30">{school.record}</Badge>
              </div>
            </div>
          </div>
        </div>
        
        {/* Back Button */}
        <Link href="/portal-news">
          <Button 
            variant="ghost" 
            className="absolute top-4 left-4 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Portal
          </Button>
        </Link>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="ghost" className="text-white hover:bg-white/20">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" className="text-white hover:bg-white/20">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 -mt-12 relative z-20 mb-8">
          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{school.transfersIn}</p>
              <p className="text-slate-400 text-sm">Transfers In</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-4 text-center">
              <TrendingDown className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{school.transfersOut}</p>
              <p className="text-slate-400 text-sm">Transfers Out</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{school.nilBudget}</p>
              <p className="text-slate-400 text-sm">NIL Budget</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-4 text-center">
              <Trophy className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{school.championships}</p>
              <p className="text-slate-400 text-sm">Championships</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{school.capacity.toLocaleString()}</p>
              <p className="text-slate-400 text-sm">Stadium Cap.</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-4 text-center">
              <Star className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <p className="text-lg font-bold text-white">{school.topTransferNIL}</p>
              <p className="text-slate-400 text-sm">Top NIL</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="news" className="w-full">
              <TabsList className="bg-slate-800 border-slate-700 mb-6">
                <TabsTrigger value="news" className="data-[state=active]:bg-cyan-500">Transfer News</TabsTrigger>
                <TabsTrigger value="roster" className="data-[state=active]:bg-cyan-500">Roster Moves</TabsTrigger>
                <TabsTrigger value="nil" className="data-[state=active]:bg-cyan-500">NIL Program</TabsTrigger>
                <TabsTrigger value="info" className="data-[state=active]:bg-cyan-500">School Info</TabsTrigger>
              </TabsList>

              <TabsContent value="news" className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-400" />
                  Latest Transfer News
                </h2>
                {news.map((item, idx) => (
                  <Card key={idx} className="bg-slate-900 border-slate-700 hover:border-cyan-400/50 transition-all cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge 
                            variant="outline"
                            className={`mb-2 ${
                              item.type === "commitment" 
                                ? "border-green-400 text-green-400" 
                                : item.type === "portal"
                                ? "border-amber-400 text-amber-400"
                                : "border-blue-400 text-blue-400"
                            }`}
                          >
                            {item.type === "commitment" ? "COMMITMENT" : item.type === "portal" ? "IN PORTAL" : "NEWS"}
                          </Badge>
                          <h3 className="text-white font-bold text-lg">{item.headline}</h3>
                          {item.player && (
                            <p className="text-slate-400 text-sm mt-1">
                              {item.player} • {item.position}
                            </p>
                          )}
                        </div>
                        <span className="text-slate-500 text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {item.timestamp}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="roster" className="space-y-4">
                <h2 className="text-xl font-bold text-white">Roster Moves</h2>
                <Card className="bg-slate-900 border-slate-700">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-green-400 font-bold mb-4 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" /> Incoming ({school.transfersIn})
                        </h3>
                        <p className="text-slate-400">
                          Top incoming transfer: <span className="text-white font-semibold">{school.topTransfer}</span>
                        </p>
                      </div>
                      <div>
                        <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2">
                          <TrendingDown className="w-5 h-5" /> Outgoing ({school.transfersOut})
                        </h3>
                        <p className="text-slate-400">Players seeking new opportunities</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="nil" className="space-y-4">
                <h2 className="text-xl font-bold text-white">NIL Program</h2>
                <Card className="bg-slate-900 border-slate-700">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                        <div>
                          <p className="text-slate-400 text-sm">NIL Collective</p>
                          <p className="text-white font-bold text-lg">{school.nilCollective}</p>
                        </div>
                        <DollarSign className="w-8 h-8 text-green-400" />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                        <div>
                          <p className="text-slate-400 text-sm">Estimated Annual Budget</p>
                          <p className="text-green-400 font-bold text-2xl">{school.nilBudget}</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-green-400" />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                        <div>
                          <p className="text-slate-400 text-sm">Highest NIL Deal</p>
                          <p className="text-white font-bold">{school.topTransfer} - {school.topTransferNIL}</p>
                        </div>
                        <Star className="w-8 h-8 text-amber-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="info" className="space-y-4">
                <h2 className="text-xl font-bold text-white">School Information</h2>
                <Card className="bg-slate-900 border-slate-700">
                  <CardContent className="p-6 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
                        <MapPin className="w-5 h-5 text-cyan-400" />
                        <div>
                          <p className="text-slate-400 text-sm">Location</p>
                          <p className="text-white font-semibold">{school.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
                        <Building className="w-5 h-5 text-cyan-400" />
                        <div>
                          <p className="text-slate-400 text-sm">Stadium</p>
                          <p className="text-white font-semibold">{school.stadium}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
                        <GraduationCap className="w-5 h-5 text-cyan-400" />
                        <div>
                          <p className="text-slate-400 text-sm">Head Coach</p>
                          <p className="text-white font-semibold">{school.headCoach} (since {school.coachSince})</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
                        <Trophy className="w-5 h-5 text-amber-400" />
                        <div>
                          <p className="text-slate-400 text-sm">National Championships</p>
                          <p className="text-white font-semibold">{school.championships}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Transfer */}
            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400" />
                  Featured Transfer
                </h3>
                <div className="text-center">
                  <div 
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl"
                    style={{ backgroundColor: school.primaryColor }}
                  >
                    {school.logo}
                  </div>
                  <h4 className="text-white font-bold text-xl">{school.topTransfer}</h4>
                  <p className="text-green-400 font-bold text-2xl mt-2">{school.topTransferNIL}</p>
                  <p className="text-slate-400 text-sm">NIL Valuation</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
                    <ExternalLink className="w-4 h-4 mr-2" /> Official Athletics Site
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
                    <ExternalLink className="w-4 h-4 mr-2" /> {school.nilCollective}
                  </Button>
                  <Link href="/transfer-portal">
                    <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
                      <ExternalLink className="w-4 h-4 mr-2" /> Full Player Database
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Other Schools */}
            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-white mb-4">Other Schools</h3>
                <div className="space-y-2">
                  {Object.entries(schoolData)
                    .filter(([key]) => key !== slug)
                    .slice(0, 5)
                    .map(([key, s]) => (
                      <Link key={key} href={`/school/${key}`}>
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                            style={{ backgroundColor: s.primaryColor }}
                          >
                            {s.logo}
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-semibold text-sm">{s.name}</p>
                            <p className="text-slate-500 text-xs">{s.conference}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-500" />
                        </div>
                      </Link>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
