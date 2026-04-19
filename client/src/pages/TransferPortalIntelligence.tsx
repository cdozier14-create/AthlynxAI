import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowUpRight,
  Filter,
  Star,
  MapPin,
  School,
  Trophy,
  BarChart3,
  Bell,
  Download
} from "lucide-react";

export default function TransferPortalIntelligence() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSport, setSelectedSport] = useState<string>("");
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  
  // Static demo data
  const searchLoading = false;
  const searchResults = { athletes: [] as { id: string; name: string; sport: string; position: string; school: string; nilValue: number; nilValuation: number; stars: number; hometown: string; homeState: string; compositeRating: string; previousSchool: string; previousConference: string; portalStatus: string; enteredPortalDate: string; year: string; gpa: number; offers: number }[], total: 0 };
  const stats = {
    totalInPortal: 2847,
    enteredToday: 45,
    committedThisWeek: 312,
    avgNilValue: 125000,
    topConferences: [
      { conference: 'SEC', count: 423 },
      { conference: 'Big Ten', count: 387 },
      { conference: 'ACC', count: 312 },
      { conference: 'Big 12', count: 298 },
      { conference: 'Pac-12', count: 241 },
    ],
    topSports: [
      { sport: 'Football', count: 1245 },
      { sport: 'Basketball', count: 687 },
      { sport: 'Baseball', count: 423 },
      { sport: 'Soccer', count: 312 },
      { sport: 'Volleyball', count: 180 },
    ],
    recentActivity: [
      { date: new Date(Date.now() - 4 * 86400000).toISOString(), entered: 48, committed: 12 },
      { date: new Date(Date.now() - 3 * 86400000).toISOString(), entered: 53, committed: 8 },
      { date: new Date(Date.now() - 2 * 86400000).toISOString(), entered: 41, committed: 15 },
      { date: new Date(Date.now() - 1 * 86400000).toISOString(), entered: 67, committed: 19 },
      { date: new Date().toISOString(), entered: 45, committed: 11 },
    ],
  };
  const trending: { id: string; name: string; sport: string; position: string; previousSchool: string; nilValuation: number; stars: number; compositeRating: string }[] = [];
  const tiers: Record<string, { name: string; price: number; features: string[] }> = {
    scout: { name: 'Scout', price: 29, features: ['Basic search', '50 profiles/month', 'Email alerts'] },
    recruiter: { name: 'Recruiter', price: 99, features: ['Unlimited search', 'Full profiles', 'Priority alerts', 'Analytics'] },
    elite: { name: 'Elite', price: 299, features: ['Everything in Recruiter', 'API access', 'Dedicated support', 'Custom reports'] },
    enterprise: { name: 'Enterprise', price: 999, features: ['All Elite features', 'White-label', 'SLA guarantee', 'Onboarding'] },
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <Trophy className="h-8 w-8 text-yellow-400" />
                Transfer Portal Intelligence
              </h1>
              <p className="text-blue-200 mt-1">
                Real-time data on 2,800+ college athletes in the transfer portal
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Bell className="h-4 w-4 mr-2" />
                Set Alerts
              </Button>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">Total in Portal</p>
                  <p className="text-3xl font-bold text-white">{formatNumber(stats?.totalInPortal || 2847)}</p>
                </div>
                <Users className="h-10 w-10 text-blue-400" />
              </div>
              <p className="text-green-400 text-sm mt-2 flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +{stats?.enteredToday || 45} today
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">Committed This Week</p>
                  <p className="text-3xl font-bold text-white">{formatNumber(stats?.committedThisWeek || 312)}</p>
                </div>
                <TrendingUp className="h-10 w-10 text-green-400" />
              </div>
              <p className="text-blue-200 text-sm mt-2">
                11% commitment rate
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">Avg NIL Value</p>
                  <p className="text-3xl font-bold text-white">{formatCurrency(stats?.avgNilValue || 125000)}</p>
                </div>
                <DollarSign className="h-10 w-10 text-yellow-400" />
              </div>
              <p className="text-green-400 text-sm mt-2 flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +15% vs last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">Top Conference</p>
                  <p className="text-3xl font-bold text-white">SEC</p>
                </div>
                <BarChart3 className="h-10 w-10 text-purple-400" />
              </div>
              <p className="text-blue-200 text-sm mt-2">
                423 athletes in portal
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="search" className="space-y-6">
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger value="search" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              <Search className="h-4 w-4 mr-2" />
              Search Athletes
            </TabsTrigger>
            <TabsTrigger value="trending" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="pricing" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              <DollarSign className="h-4 w-4 mr-2" />
              School Pricing
            </TabsTrigger>
          </TabsList>

          {/* Search Tab */}
          <TabsContent value="search" className="space-y-6">
            {/* Search Filters */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Search & Filter Athletes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                  
                  <Select value={selectedSport} onValueChange={setSelectedSport}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="All Sports" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Sports</SelectItem>
                      <SelectItem value="Football">Football</SelectItem>
                      <SelectItem value="Basketball">Basketball</SelectItem>
                      <SelectItem value="Baseball">Baseball</SelectItem>
                      <SelectItem value="Soccer">Soccer</SelectItem>
                      <SelectItem value="Volleyball">Volleyball</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="All Positions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Positions</SelectItem>
                      <SelectItem value="Quarterback">Quarterback</SelectItem>
                      <SelectItem value="Running Back">Running Back</SelectItem>
                      <SelectItem value="Wide Receiver">Wide Receiver</SelectItem>
                      <SelectItem value="Point Guard">Point Guard</SelectItem>
                      <SelectItem value="Pitcher">Pitcher</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Search Results */}
            <div className="space-y-4">
              {searchLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin h-8 w-8 border-2 border-yellow-400 border-t-transparent rounded-full mx-auto"></div>
                  <p className="text-blue-200 mt-4">Searching athletes...</p>
                </div>
              ) : searchResults?.athletes.length === 0 ? (
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="py-12 text-center">
                    <Users className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">No athletes found matching your criteria</p>
                  </CardContent>
                </Card>
              ) : (
                searchResults?.athletes.map((athlete) => (
                  <Card key={athlete.id} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer">
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl font-bold text-black">
                            {athlete.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-xl font-bold text-white">{athlete.name}</h3>
                              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                                {athlete.stars}★
                              </Badge>
                              <Badge 
                                className={
                                  athlete.portalStatus === "entered" 
                                    ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                    : athlete.portalStatus === "committed"
                                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                                    : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                                }
                              >
                                {athlete.portalStatus.charAt(0).toUpperCase() + athlete.portalStatus.slice(1)}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-blue-200 text-sm mt-1">
                              <span className="flex items-center gap-1">
                                <Trophy className="h-4 w-4" />
                                {athlete.sport} - {athlete.position}
                              </span>
                              <span className="flex items-center gap-1">
                                <School className="h-4 w-4" />
                                {athlete.previousSchool} ({athlete.previousConference})
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {athlete.hometown}, {athlete.homeState}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-yellow-400">
                            {formatCurrency(athlete.nilValuation || 0)}
                          </div>
                          <div className="text-blue-200 text-sm">NIL Value</div>
                          <div className="flex items-center gap-2 mt-2 justify-end">
                            <span className="text-blue-200 text-sm">Rating:</span>
                            <span className="text-white font-semibold">{athlete.compositeRating}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {searchResults && searchResults.total > 0 && (
              <div className="flex items-center justify-between text-blue-200">
                <p>Showing {searchResults.athletes.length} of {searchResults.total} athletes</p>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Next
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Trending Tab */}
          <TabsContent value="trending" className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-yellow-400" />
                  Highest NIL Value Athletes in Portal
                </CardTitle>
                <CardDescription className="text-blue-200">
                  Top athletes by estimated NIL valuation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trending.map((athlete, index) => (
                    <div key={athlete.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-yellow-400 w-8">#{index + 1}</div>
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-lg font-bold text-black">
                          {athlete.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{athlete.name}</h4>
                          <p className="text-blue-200 text-sm">{athlete.sport} - {athlete.position} | {athlete.previousSchool}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-yellow-400">{formatCurrency(athlete.nilValuation || 0)}</div>
                        <div className="text-blue-200 text-sm">{athlete.stars}★ | {athlete.compositeRating} rating</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Athletes by Sport</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats?.topSports.map((sport) => (
                      <div key={sport.sport} className="flex items-center justify-between">
                        <span className="text-blue-200">{sport.sport}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-yellow-400 rounded-full"
                              style={{ width: `${(sport.count / 1245) * 100}%` }}
                            />
                          </div>
                          <span className="text-white font-semibold w-12 text-right">{sport.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Athletes by Conference</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats?.topConferences.map((conf) => (
                      <div key={conf.conference} className="flex items-center justify-between">
                        <span className="text-blue-200">{conf.conference}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-400 rounded-full"
                              style={{ width: `${(conf.count / 423) * 100}%` }}
                            />
                          </div>
                          <span className="text-white font-semibold w-12 text-right">{conf.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Recent Portal Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-4">
                  {stats?.recentActivity.map((day) => (
                    <div key={day.date} className="text-center p-4 rounded-lg bg-white/5">
                      <p className="text-blue-200 text-sm">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                      <p className="text-2xl font-bold text-white mt-2">{day.entered}</p>
                      <p className="text-blue-200 text-xs">entered</p>
                      <p className="text-lg font-semibold text-green-400 mt-1">{day.committed}</p>
                      <p className="text-blue-200 text-xs">committed</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white">School Subscription Plans</h2>
              <p className="text-blue-200 mt-2">Get the data you need to find your next star athlete</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {tiers && Object.entries(tiers).map(([key, tier]) => (
                <Card 
                  key={key} 
                  className={`border backdrop-blur-sm ${
                    key === "elite" 
                      ? "bg-yellow-500/10 border-yellow-500/50" 
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <CardHeader>
                    {key === "elite" && (
                      <Badge className="w-fit mb-2 bg-yellow-500 text-black">Most Popular</Badge>
                    )}
                    <CardTitle className="text-white">{tier.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-white">
                        {tier.price === 0 ? "Free" : `$${tier.price.toLocaleString()}`}
                      </span>
                      {tier.price > 0 && (
                        <span className="text-blue-200">
                          /{(tier as any).annual ? "year" : "month"}
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-blue-200">
                          <Star className="h-4 w-4 text-yellow-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full mt-6 ${
                        key === "elite"
                          ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                          : "bg-white/10 hover:bg-white/20 text-white"
                      }`}
                    >
                      {tier.price === 0 ? "Get Started" : "Subscribe Now"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
