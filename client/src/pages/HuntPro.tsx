import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UnifiedNav from "@/components/UnifiedNav";
import UnifiedFooter from "@/components/UnifiedFooter";
import { 
  Target, 
  MapPin, 
  Trophy, 
  Calendar, 
  Star, 
  Search,
  Filter,
  ShoppingBag,
  Mountain,
  TreePine,
  Users,
  DollarSign,
  Clock,
  ChevronRight,
  Bot,
  Award,
  Shield,
  Crosshair
} from "lucide-react";

export default function HuntPro() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("all");

  const stats = [
    { value: "500K+", label: "Hunters", icon: Users },
    { value: "2,500+", label: "Competitions", icon: Trophy },
    { value: "10K+", label: "Hunting Lands", icon: MapPin },
    { value: "$10M+", label: "Prize Money", icon: DollarSign },
  ];

  const tournaments = [
    { name: "National Deer Championship", location: "Texas Hill Country", date: "Nov 15-22, 2026", prize: "$500,000", spots: "100/250", species: "Whitetail", status: "Open" },
    { name: "World Elk Classic", location: "Colorado Rockies", date: "Sep 1-15, 2026", prize: "$750,000", spots: "50/100", species: "Elk", status: "Open" },
    { name: "Duck Dynasty Invitational", location: "Louisiana Bayou", date: "Dec 1-7, 2026", prize: "$250,000", spots: "75/150", species: "Waterfowl", status: "Open" },
    { name: "Turkey Grand Slam", location: "Multiple States", date: "Apr 1-May 15, 2026", prize: "$300,000", spots: "200/500", species: "Turkey", status: "Coming Soon" },
    { name: "Predator Masters Cup", location: "Montana", date: "Jan 10-17, 2026", prize: "$150,000", spots: "80/120", species: "Coyote/Wolf", status: "Open" },
  ];

  const proHunters = [
    { name: "Lee Lakosky", specialty: "Whitetail", earnings: "$2.5M", trophies: 45, rank: 1, rating: 4.9, sponsor: "Sitka" },
    { name: "Cameron Hanes", specialty: "Elk/Bowhunting", earnings: "$3.2M", trophies: 38, rank: 2, rating: 4.9, sponsor: "Under Armour" },
    { name: "Michael Waddell", specialty: "Whitetail", earnings: "$2.1M", trophies: 42, rank: 3, rating: 4.8, sponsor: "Realtree" },
    { name: "Eva Shockey", specialty: "Big Game", earnings: "$1.8M", trophies: 35, rank: 4, rating: 4.8, sponsor: "Cabela's" },
  ];

  const seasonCalendar = [
    { species: "Whitetail Deer", season: "Oct 1 - Jan 15", states: "TX, GA, AL, MS, LA", status: "Open" },
    { species: "Elk", season: "Sep 1 - Nov 30", states: "CO, MT, WY, NM", status: "Open" },
    { species: "Turkey (Spring)", season: "Mar 15 - May 15", states: "Nationwide", status: "Upcoming" },
    { species: "Waterfowl", season: "Nov 1 - Jan 31", states: "Flyway Dependent", status: "Open" },
    { species: "Bear", season: "Sep 1 - Nov 15", states: "AK, MT, ID, WI", status: "Open" },
    { species: "Predators", season: "Year-round", states: "Most States", status: "Open" },
  ];

  const camps = [
    { name: "Elite Bowhunter Camp", duration: "5 Days", location: "Montana", focus: "Archery", price: "$2,500", instructor: "Cameron Hanes", spots: 12 },
    { name: "Whitetail Masterclass", duration: "3 Days", location: "Iowa", focus: "Deer Hunting", price: "$1,800", instructor: "Lee Lakosky", spots: 20 },
    { name: "Turkey Tactics Camp", duration: "4 Days", location: "Alabama", focus: "Turkey", price: "$1,500", instructor: "Michael Waddell", spots: 15 },
    { name: "Long Range Shooting", duration: "2 Days", location: "Texas", focus: "Marksmanship", price: "$1,200", instructor: "Ryan Cleckner", spots: 8 },
  ];

  const sitkaGear = [
    { name: "Optifade Elevated II", type: "Jacket", price: "$549", rating: 4.9, reviews: 2500, pattern: "Elevated II" },
    { name: "Jetstream Jacket", type: "Outerwear", price: "$449", rating: 4.8, reviews: 1800, pattern: "Subalpine" },
    { name: "Fanatic Hoody", type: "Mid Layer", price: "$299", rating: 4.9, reviews: 3200, pattern: "Optifade" },
    { name: "Mountain Pant", type: "Bottoms", price: "$279", rating: 4.7, reviews: 1500, pattern: "Open Country" },
    { name: "Incinerator Bib", type: "Insulation", price: "$599", rating: 4.9, reviews: 890, pattern: "Timber" },
    { name: "Stratus Jacket", type: "Outerwear", price: "$399", rating: 4.8, reviews: 2100, pattern: "Elevated II" },
  ];

  const landListings = [
    { name: "1,200 Acre Trophy Ranch", state: "Texas", price: "$45,000/season", species: ["Whitetail", "Turkey", "Hog"], rating: 4.9 },
    { name: "Colorado Elk Unit", state: "Colorado", price: "$8,500/week", species: ["Elk", "Mule Deer"], rating: 4.8 },
    { name: "Delta Duck Club", state: "Arkansas", price: "$3,500/season", species: ["Mallard", "Teal", "Wood Duck"], rating: 4.7 },
    { name: "Montana Wilderness", state: "Montana", price: "$12,000/week", species: ["Elk", "Bear", "Moose"], rating: 4.9 },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #1a0f0a 0%, #2d1810 50%, #1a0f0a 100%)' }}>
      <UnifiedNav />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMDAsMTUwLDEwMCwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="container relative py-16 px-5">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-2 mb-6">
              <Crosshair className="w-5 h-5 text-orange-400" />
              <span className="text-orange-400 font-bold">HUNT PRO</span>
              <Badge className="bg-amber-500 text-black text-xs">POWERED BY ATHLYNX</Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
              THE ULTIMATE
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400">
                HUNTING PLATFORM
              </span>
            </h1>
            
            <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">
              Tournaments. Championships. Camps. Season Calendars. Land Leases. Sitka Gear.
              Everything a hunter needs in one platform.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button className="bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-6 text-lg">
                <Trophy className="w-5 h-5 mr-2" /> Join Competition
              </Button>
              <Button variant="outline" className="border-orange-500/50 text-orange-400 hover:bg-orange-500/20 px-8 py-6 text-lg">
                <MapPin className="w-5 h-5 mr-2" /> Find Hunting Land
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <stat.icon className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-white/50 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sitka Partnership Banner */}
      <section className="container px-5 py-8">
        <div className="bg-gradient-to-r from-[#4a5c3d] to-[#3d4a32] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#5a6c4d]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
              <span className="text-2xl font-black text-[#4a5c3d]">SITKA</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Official Gear Partner: SITKA</h3>
              <p className="text-white/70">Premium hunting apparel with Optifade camouflage technology</p>
            </div>
          </div>
          <Button className="bg-white text-[#4a5c3d] font-bold hover:bg-gray-100">
            <ShoppingBag className="w-4 h-4 mr-2" /> Shop Sitka Gear
          </Button>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="container px-5 py-12">
        <Tabs defaultValue="tournaments" className="w-full">
          <TabsList className="grid grid-cols-6 bg-white/5 border border-white/10 rounded-xl p-1 mb-8">
            <TabsTrigger value="tournaments" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs md:text-sm">
              <Trophy className="w-4 h-4 mr-1 md:mr-2" /> Tournaments
            </TabsTrigger>
            <TabsTrigger value="hunters" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs md:text-sm">
              <Users className="w-4 h-4 mr-1 md:mr-2" /> Pro Hunters
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs md:text-sm">
              <Calendar className="w-4 h-4 mr-1 md:mr-2" /> Seasons
            </TabsTrigger>
            <TabsTrigger value="camps" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs md:text-sm">
              <Mountain className="w-4 h-4 mr-1 md:mr-2" /> Camps
            </TabsTrigger>
            <TabsTrigger value="gear" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs md:text-sm">
              <ShoppingBag className="w-4 h-4 mr-1 md:mr-2" /> Sitka Gear
            </TabsTrigger>
            <TabsTrigger value="land" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs md:text-sm">
              <TreePine className="w-4 h-4 mr-1 md:mr-2" /> Land
            </TabsTrigger>
          </TabsList>

          {/* Tournaments Tab */}
          <TabsContent value="tournaments">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">National Hunting Championships</h2>
                <Button variant="outline" className="border-orange-500/50 text-orange-400">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              
              {tournaments.map((tournament, i) => (
                <Card key={i} className="bg-white/5 border-white/10 hover:border-orange-500/50 transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-white">{tournament.name}</h3>
                          <Badge className="bg-amber-500/20 text-amber-400">{tournament.species}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-white/60 text-sm">
                          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {tournament.location}</span>
                          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {tournament.date}</span>
                          <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {tournament.spots} spots</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-400">{tournament.prize}</p>
                          <p className="text-white/50 text-sm">Prize Pool</p>
                        </div>
                        <Button className={tournament.status === "Open" ? "bg-orange-500 hover:bg-orange-400" : "bg-gray-600"}>
                          {tournament.status === "Open" ? "Register" : tournament.status}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Pro Hunters Tab */}
          <TabsContent value="hunters">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-6">Pro Hunter Rankings</h2>
              
              {proHunters.map((hunter, i) => (
                <Card key={i} className="bg-white/5 border-white/10 hover:border-orange-500/50 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                          hunter.rank === 1 ? 'bg-yellow-500 text-black' :
                          hunter.rank === 2 ? 'bg-gray-400 text-black' :
                          hunter.rank === 3 ? 'bg-orange-600 text-white' :
                          'bg-orange-500/20 text-orange-400'
                        }`}>
                          #{hunter.rank}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{hunter.name}</h3>
                          <p className="text-white/50 text-sm">{hunter.specialty} Specialist • Sponsored by {hunter.sponsor}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <p className="text-xl font-bold text-green-400">{hunter.earnings}</p>
                          <p className="text-white/50 text-xs">Career Earnings</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xl font-bold text-orange-400">{hunter.trophies}</p>
                          <p className="text-white/50 text-xs">Trophy Animals</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                          <span className="text-white font-bold">{hunter.rating}</span>
                        </div>
                        <Button variant="outline" className="border-orange-500/50 text-orange-400">View Profile</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Season Calendar Tab */}
          <TabsContent value="calendar">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-6">Hunting Season Calendar 2026</h2>
              
              <div className="grid gap-4">
                {seasonCalendar.map((season, i) => (
                  <Card key={i} className="bg-white/5 border-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                            <Target className="w-6 h-6 text-orange-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white">{season.species}</h3>
                            <p className="text-white/50 text-sm">{season.states}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-white font-semibold">{season.season}</p>
                            <p className="text-white/50 text-sm">Season Dates</p>
                          </div>
                          <Badge className={season.status === "Open" ? "bg-green-500" : "bg-yellow-500 text-black"}>
                            {season.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Camps Tab */}
          <TabsContent value="camps">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-6">Elite Hunting Camps & Clinics</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {camps.map((camp, i) => (
                  <Card key={i} className="bg-white/5 border-white/10 hover:border-orange-500/50 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{camp.name}</h3>
                          <p className="text-white/50 text-sm">Instructor: {camp.instructor}</p>
                        </div>
                        <Badge className="bg-orange-500/20 text-orange-400">{camp.focus}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-white/60 text-sm mb-4">
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {camp.duration}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {camp.location}</span>
                        <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {camp.spots} spots</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-green-400">{camp.price}</p>
                        <Button className="bg-orange-500 hover:bg-orange-400">Book Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Sitka Gear Tab */}
          <TabsContent value="gear">
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Sitka Gear Collection</h2>
                <Badge className="bg-[#4a5c3d] text-white px-4 py-2">Official Partner</Badge>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                {sitkaGear.map((item, i) => (
                  <Card key={i} className="bg-white/5 border-white/10 hover:border-[#5a6c4d] transition-all">
                    <CardContent className="p-6">
                      <div className="aspect-square bg-[#4a5c3d]/20 rounded-lg mb-4 flex items-center justify-center">
                        <span className="text-6xl">🦌</span>
                      </div>
                      <Badge className="bg-[#4a5c3d]/30 text-[#8fa97a] mb-2">{item.pattern}</Badge>
                      <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                      <p className="text-white/50 text-sm mb-3">{item.type}</p>
                      <div className="flex items-center gap-2 mb-4">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-white">{item.rating}</span>
                        <span className="text-white/50 text-sm">({item.reviews.toLocaleString()} reviews)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-bold text-white">{item.price}</p>
                        <Button className="bg-[#4a5c3d] hover:bg-[#5a6c4d]">Add to Cart</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <Link href="/store">
                  <Button className="bg-[#4a5c3d] hover:bg-[#5a6c4d] text-white font-bold px-8 py-3">
                    <ShoppingBag className="w-5 h-5 mr-2" /> View Full Sitka Collection
                  </Button>
                </Link>
              </div>
            </div>
          </TabsContent>

          {/* Land Tab */}
          <TabsContent value="land">
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input 
                    placeholder="Search hunting lands..." 
                    className="pl-10 bg-white/5 border-white/10 text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="border-white/20 text-white">
                  <Filter className="w-4 h-4 mr-2" /> Filters
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {landListings.map((land, i) => (
                  <Card key={i} className="bg-white/5 border-white/10 hover:border-orange-500/50 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white">{land.name}</h3>
                          <p className="text-white/50">{land.state}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-yellow-400 font-bold">{land.rating}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {land.species.map((s, j) => (
                          <Badge key={j} className="bg-orange-500/20 text-orange-400">{s}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-bold text-green-400">{land.price}</p>
                        <Button variant="outline" className="border-orange-500/50 text-orange-400">
                          <MapPin className="w-4 h-4 mr-1" /> View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* AI Hunting Guide */}
      <section className="container px-5 py-12">
        <Card className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 border-orange-500/30">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">AI Hunting Guide</h2>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              Get personalized hunting recommendations, weather analysis, best times to hunt,
              gear suggestions, and expert tips powered by AI.
            </p>
            <Link href="/ai-training-bot">
              <Button className="bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-3">
                <Bot className="w-5 h-5 mr-2" /> Start AI Hunting Guide
              </Button>
            </Link>
            <p className="text-white/50 text-sm mt-4">Uses 5 AI Credits per session</p>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container px-5 py-16">
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Hunt Like a Pro?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join 500,000+ hunters on the ultimate hunting platform. 
            Tournaments, gear, land, and AI-powered guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-orange-600 font-bold px-8 py-3 hover:bg-gray-100">
              Create Free Account
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/20 px-8 py-3">
              Explore Platform
            </Button>
          </div>
        </div>
      </section>

      <UnifiedFooter />
    </div>
  );
}
