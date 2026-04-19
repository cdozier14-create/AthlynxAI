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
  Flag, 
  MapPin, 
  Trophy, 
  Calendar, 
  Star, 
  Search,
  Filter,
  ShoppingBag,
  Users,
  DollarSign,
  Clock,
  ChevronRight,
  Bot,
  Award,
  Target,
  Sun
} from "lucide-react";

export default function FairwayElite() {
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { value: "750K+", label: "Golfers", icon: Users },
    { value: "5,000+", label: "Tournaments", icon: Trophy },
    { value: "25K+", label: "Courses", icon: MapPin },
    { value: "$50M+", label: "Prize Money", icon: DollarSign },
  ];

  const tournaments = [
    { name: "Fairway Elite Championship", location: "Pebble Beach, CA", date: "Aug 10-13, 2026", prize: "$2,000,000", spots: "120/156", status: "Open", type: "Pro" },
    { name: "Junior Masters Invitational", location: "Augusta, GA", date: "Apr 5-7, 2026", prize: "$500,000", spots: "80/100", status: "Open", type: "Junior" },
    { name: "Amateur National Championship", location: "Pinehurst, NC", date: "Jun 15-18, 2026", prize: "$250,000", spots: "200/256", status: "Open", type: "Amateur" },
    { name: "College Golf Classic", location: "TPC Sawgrass, FL", date: "Mar 20-22, 2026", prize: "$100,000", spots: "64/64", status: "Waitlist", type: "College" },
    { name: "Senior Tour Championship", location: "Torrey Pines, CA", date: "Sep 5-8, 2026", prize: "$1,500,000", spots: "72/80", status: "Open", type: "Senior" },
  ];

  const proGolfers = [
    { name: "Scottie Scheffler", specialty: "All-Around", earnings: "$14.2M", wins: 12, rank: 1, rating: 4.9, handicap: "+6.4" },
    { name: "Rory McIlroy", specialty: "Power", earnings: "$12.8M", wins: 24, rank: 2, rating: 4.9, handicap: "+6.2" },
    { name: "Jon Rahm", specialty: "Ball Striking", earnings: "$11.5M", wins: 15, rank: 3, rating: 4.8, handicap: "+6.1" },
    { name: "Viktor Hovland", specialty: "Iron Play", earnings: "$9.2M", wins: 8, rank: 4, rating: 4.8, handicap: "+5.8" },
  ];

  const courses = [
    { name: "Pebble Beach Golf Links", location: "California", rating: 4.9, reviews: 8500, slope: 145, par: 72, price: "$595" },
    { name: "TPC Sawgrass", location: "Florida", rating: 4.8, reviews: 6200, slope: 137, par: 72, price: "$450" },
    { name: "Pinehurst No. 2", location: "North Carolina", rating: 4.9, reviews: 5800, slope: 135, par: 72, price: "$395" },
    { name: "Torrey Pines South", location: "California", rating: 4.7, reviews: 4500, slope: 138, par: 72, price: "$250" },
  ];

  const camps = [
    { name: "Elite Junior Academy", duration: "5 Days", location: "Orlando, FL", focus: "Full Game", price: "$2,500", instructor: "Butch Harmon", spots: 24, ages: "12-18" },
    { name: "Short Game Masterclass", duration: "3 Days", location: "Scottsdale, AZ", focus: "Chipping & Putting", price: "$1,800", instructor: "Dave Pelz", spots: 16, ages: "All" },
    { name: "College Prep Camp", duration: "4 Days", location: "San Diego, CA", focus: "Recruiting", price: "$2,200", instructor: "Multiple", spots: 32, ages: "14-18" },
    { name: "Mental Game Workshop", duration: "2 Days", location: "Las Vegas, NV", focus: "Psychology", price: "$1,200", instructor: "Dr. Bob Rotella", spots: 20, ages: "All" },
  ];

  const gearBrands = [
    { name: "Titleist", products: 450, rating: 4.9 },
    { name: "Callaway", products: 380, rating: 4.8 },
    { name: "TaylorMade", products: 420, rating: 4.8 },
    { name: "Ping", products: 290, rating: 4.7 },
    { name: "Cobra", products: 250, rating: 4.6 },
    { name: "Cleveland", products: 180, rating: 4.7 },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0a2010 0%, #143820 50%, #0a2010 100%)' }}>
      <UnifiedNav />
      
      {/* Hero Section - Mobile Optimized */}
      <section className="relative overflow-hidden pt-16 md:pt-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDIwMCwxMDAsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" />
        
        <div className="absolute top-20 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="container relative py-8 md:py-16 px-4 md:px-5">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-3 md:px-4 py-2 mb-4 md:mb-6">
              <Flag className="w-4 md:w-5 h-4 md:h-5 text-green-400" />
              <span className="text-green-400 font-bold text-sm md:text-base">FAIRWAY ELITE</span>
              <Badge className="bg-emerald-500 text-black text-xs">POWERED BY ATHLYNX</Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-3 md:mb-4">
              THE ULTIMATE
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-400">
                GOLF PLATFORM
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
              Tournaments. Championships. Camps. Tee Times. Course Finder. Pro Rankings.
              Everything a golfer needs in one platform.
            </p>

            {/* Mobile-friendly buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-8 md:mb-12 px-4">
              <Button className="bg-green-500 hover:bg-green-400 text-white font-bold px-6 md:px-8 py-5 md:py-6 text-base md:text-lg w-full sm:w-auto">
                <Trophy className="w-5 h-5 mr-2" /> Join Tournament
              </Button>
              <Button variant="outline" className="border-green-500/50 text-green-400 hover:bg-green-500/20 px-6 md:px-8 py-5 md:py-6 text-base md:text-lg w-full sm:w-auto">
                <MapPin className="w-5 h-5 mr-2" /> Find Courses
              </Button>
            </div>

            {/* Stats - Mobile Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto px-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3 md:p-4">
                  <stat.icon className="w-5 md:w-6 h-5 md:h-6 text-green-400 mx-auto mb-1 md:mb-2" />
                  <p className="text-xl md:text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-white/50 text-xs md:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs - Mobile Optimized */}
      <section className="container px-4 md:px-5 py-8 md:py-12">
        <Tabs defaultValue="tournaments" className="w-full">
          {/* Scrollable tabs on mobile */}
          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <TabsList className="inline-flex md:grid md:grid-cols-6 bg-white/5 border border-white/10 rounded-xl p-1 mb-6 md:mb-8 min-w-max md:min-w-0">
              <TabsTrigger value="tournaments" className="data-[state=active]:bg-green-500 data-[state=active]:text-white text-xs md:text-sm whitespace-nowrap px-3 md:px-4">
                <Trophy className="w-4 h-4 mr-1 md:mr-2" /> Tournaments
              </TabsTrigger>
              <TabsTrigger value="golfers" className="data-[state=active]:bg-green-500 data-[state=active]:text-white text-xs md:text-sm whitespace-nowrap px-3 md:px-4">
                <Users className="w-4 h-4 mr-1 md:mr-2" /> Pro Golfers
              </TabsTrigger>
              <TabsTrigger value="courses" className="data-[state=active]:bg-green-500 data-[state=active]:text-white text-xs md:text-sm whitespace-nowrap px-3 md:px-4">
                <MapPin className="w-4 h-4 mr-1 md:mr-2" /> Courses
              </TabsTrigger>
              <TabsTrigger value="camps" className="data-[state=active]:bg-green-500 data-[state=active]:text-white text-xs md:text-sm whitespace-nowrap px-3 md:px-4">
                <Sun className="w-4 h-4 mr-1 md:mr-2" /> Camps
              </TabsTrigger>
              <TabsTrigger value="gear" className="data-[state=active]:bg-green-500 data-[state=active]:text-white text-xs md:text-sm whitespace-nowrap px-3 md:px-4">
                <ShoppingBag className="w-4 h-4 mr-1 md:mr-2" /> Gear
              </TabsTrigger>
              <TabsTrigger value="ai" className="data-[state=active]:bg-green-500 data-[state=active]:text-white text-xs md:text-sm whitespace-nowrap px-3 md:px-4">
                <Bot className="w-4 h-4 mr-1 md:mr-2" /> AI Coach
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tournaments Tab */}
          <TabsContent value="tournaments">
            <div className="space-y-3 md:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-white">Golf Championships</h2>
                <Button variant="outline" className="border-green-500/50 text-green-400 w-full sm:w-auto">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              
              {tournaments.map((tournament, i) => (
                <Card key={i} className="bg-white/5 border-white/10 hover:border-green-500/50 transition-all touch-manipulation">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-lg md:text-xl font-bold text-white">{tournament.name}</h3>
                          <Badge className="bg-green-500/20 text-green-400 text-xs">{tournament.type}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-2 md:gap-4 text-white/60 text-xs md:text-sm">
                          <span className="flex items-center gap-1"><MapPin className="w-3 md:w-4 h-3 md:h-4" /> {tournament.location}</span>
                          <span className="flex items-center gap-1"><Calendar className="w-3 md:w-4 h-3 md:h-4" /> {tournament.date}</span>
                          <span className="flex items-center gap-1"><Users className="w-3 md:w-4 h-3 md:h-4" /> {tournament.spots}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xl md:text-2xl font-bold text-green-400">{tournament.prize}</p>
                          <p className="text-white/50 text-xs md:text-sm">Prize Pool</p>
                        </div>
                        <Button className={`${tournament.status === "Open" ? "bg-green-500 hover:bg-green-400" : "bg-gray-600"} min-h-[44px] px-4 md:px-6`}>
                          {tournament.status === "Open" ? "Register" : tournament.status}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Pro Golfers Tab */}
          <TabsContent value="golfers">
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">World Golf Rankings</h2>
              
              {proGolfers.map((golfer, i) => (
                <Card key={i} className="bg-white/5 border-white/10 hover:border-green-500/50 transition-all touch-manipulation">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className={`w-10 md:w-12 h-10 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl font-bold flex-shrink-0 ${
                          golfer.rank === 1 ? 'bg-yellow-500 text-black' :
                          golfer.rank === 2 ? 'bg-gray-400 text-black' :
                          golfer.rank === 3 ? 'bg-orange-600 text-white' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          #{golfer.rank}
                        </div>
                        <div>
                          <h3 className="text-base md:text-lg font-bold text-white">{golfer.name}</h3>
                          <p className="text-white/50 text-xs md:text-sm">{golfer.specialty} • Handicap: {golfer.handicap}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8">
                        <div className="text-left md:text-center">
                          <p className="text-lg md:text-xl font-bold text-green-400">{golfer.earnings}</p>
                          <p className="text-white/50 text-xs">Earnings</p>
                        </div>
                        <div className="text-left md:text-center">
                          <p className="text-lg md:text-xl font-bold text-emerald-400">{golfer.wins}</p>
                          <p className="text-white/50 text-xs">Wins</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 md:w-5 h-4 md:h-5 text-yellow-400 fill-yellow-400" />
                          <span className="text-white font-bold text-sm md:text-base">{golfer.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 mb-4 md:mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input 
                    placeholder="Search courses..." 
                    className="pl-10 bg-white/5 border-white/10 text-white min-h-[44px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="border-white/20 text-white min-h-[44px]">
                  <Filter className="w-4 h-4 mr-2" /> Filters
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                {courses.map((course, i) => (
                  <Card key={i} className="bg-white/5 border-white/10 hover:border-green-500/50 transition-all touch-manipulation">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex items-start justify-between mb-3 md:mb-4">
                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-white">{course.name}</h3>
                          <p className="text-white/50 text-sm">{course.location}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-yellow-400 font-bold">{course.rating}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                        <Badge className="bg-green-500/20 text-green-400">Par {course.par}</Badge>
                        <Badge className="bg-emerald-500/20 text-emerald-400">Slope {course.slope}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xl font-bold text-white">{course.price}</p>
                          <p className="text-white/50 text-xs">{course.reviews.toLocaleString()} reviews</p>
                        </div>
                        <Button className="bg-green-500 hover:bg-green-400 min-h-[44px]">Book Tee Time</Button>
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
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Golf Camps & Academies</h2>
              
              <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                {camps.map((camp, i) => (
                  <Card key={i} className="bg-white/5 border-white/10 hover:border-green-500/50 transition-all touch-manipulation">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3 md:mb-4">
                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-white mb-1">{camp.name}</h3>
                          <p className="text-white/50 text-xs md:text-sm">Instructor: {camp.instructor}</p>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400">{camp.focus}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2 md:gap-4 text-white/60 text-xs md:text-sm mb-3 md:mb-4">
                        <span className="flex items-center gap-1"><Clock className="w-3 md:w-4 h-3 md:h-4" /> {camp.duration}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 md:w-4 h-3 md:h-4" /> {camp.location}</span>
                        <span className="flex items-center gap-1"><Users className="w-3 md:w-4 h-3 md:h-4" /> {camp.spots} spots</span>
                        <span className="flex items-center gap-1">Ages: {camp.ages}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xl md:text-2xl font-bold text-green-400">{camp.price}</p>
                        <Button className="bg-green-500 hover:bg-green-400 min-h-[44px]">Book Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Gear Tab */}
          <TabsContent value="gear">
            <div className="space-y-6">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Golf Equipment Marketplace</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
                {gearBrands.map((brand, i) => (
                  <Card key={i} className="bg-white/5 border-white/10 hover:border-green-500/50 transition-all cursor-pointer touch-manipulation">
                    <CardContent className="p-4 md:p-6 text-center">
                      <span className="text-3xl md:text-4xl block mb-2 md:mb-3">⛳</span>
                      <h3 className="text-white font-bold text-sm md:text-base mb-1">{brand.name}</h3>
                      <p className="text-white/50 text-xs md:text-sm">{brand.products} items</p>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-white text-xs">{brand.rating}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-6 md:mt-8">
                <Link href="/store">
                  <Button className="bg-green-500 hover:bg-green-400 text-white font-bold px-6 md:px-8 py-3 min-h-[44px]">
                    <ShoppingBag className="w-5 h-5 mr-2" /> Visit Full Golf Shop
                  </Button>
                </Link>
              </div>
            </div>
          </TabsContent>

          {/* AI Coach Tab */}
          <TabsContent value="ai">
            <div className="max-w-2xl mx-auto">
              <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30">
                <CardContent className="p-6 md:p-8 text-center">
                  <div className="w-16 md:w-20 h-16 md:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                    <Bot className="w-8 md:w-10 h-8 md:h-10 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">AI Golf Coach</h2>
                  <p className="text-white/70 mb-4 md:mb-6 text-sm md:text-base">
                    Get personalized swing analysis, course strategy, club recommendations,
                    and practice drills powered by AI.
                  </p>
                  <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                    <div className="bg-white/10 rounded-lg p-3 md:p-4">
                      <Target className="w-5 md:w-6 h-5 md:h-6 text-green-400 mx-auto mb-1 md:mb-2" />
                      <p className="text-white text-xs md:text-sm">Swing Analysis</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 md:p-4">
                      <Flag className="w-5 md:w-6 h-5 md:h-6 text-emerald-400 mx-auto mb-1 md:mb-2" />
                      <p className="text-white text-xs md:text-sm">Course Strategy</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 md:p-4">
                      <ShoppingBag className="w-5 md:w-6 h-5 md:h-6 text-green-400 mx-auto mb-1 md:mb-2" />
                      <p className="text-white text-xs md:text-sm">Club Fitting</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 md:p-4">
                      <Award className="w-5 md:w-6 h-5 md:h-6 text-yellow-400 mx-auto mb-1 md:mb-2" />
                      <p className="text-white text-xs md:text-sm">Practice Plans</p>
                    </div>
                  </div>
                  <Link href="/ai-training-bot">
                    <Button className="bg-green-500 hover:bg-green-400 text-white font-bold px-6 md:px-8 py-3 min-h-[44px] w-full sm:w-auto">
                      <Bot className="w-5 h-5 mr-2" /> Start AI Golf Coach
                    </Button>
                  </Link>
                  <p className="text-white/50 text-xs md:text-sm mt-3 md:mt-4">Uses 5 AI Credits per session</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="container px-4 md:px-5 py-12 md:py-16">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 md:p-8 lg:p-12 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
            Ready to Elevate Your Game?
          </h2>
          <p className="text-white/90 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
            Join 750,000+ golfers on the ultimate golf platform. 
            Tournaments, courses, gear, and AI-powered coaching.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            <Button className="bg-white text-green-600 font-bold px-6 md:px-8 py-3 hover:bg-gray-100 min-h-[44px] w-full sm:w-auto">
              Create Free Account
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/20 px-6 md:px-8 py-3 min-h-[44px] w-full sm:w-auto">
              Explore Platform
            </Button>
          </div>
        </div>
      </section>

      <UnifiedFooter />
    </div>
  );
}
