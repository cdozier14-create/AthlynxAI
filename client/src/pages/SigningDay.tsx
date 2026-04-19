import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, Users, Video, MessageCircle, Trophy, Play } from "lucide-react";

export default function SigningDay() {
  const [selectedSport, setSelectedSport] = useState("all");

  const sports = [
    { id: "all", name: "All Sports", emoji: "" },
    { id: "football", name: "Football", emoji: "" },
    { id: "baseball", name: "Baseball", emoji: "" },
    { id: "basketball", name: "Basketball", emoji: "" },
    { id: "soccer", name: "Soccer", emoji: "" },
    { id: "track", name: "Track & Field", emoji: "🏃" },
    { id: "volleyball", name: "Volleyball", emoji: "" },
  ];

  const upcomingEvents = [
    {
      id: 1,
      sport: "Football",
      emoji: "",
      date: "December 20, 2024",
      name: "Early Signing Period",
      athleteCount: 1250,
      status: "upcoming",
    },
    {
      id: 2,
      sport: "Baseball",
      emoji: "",
      date: "November 8, 2024",
      name: "Fall Signing Period",
      athleteCount: 850,
      status: "upcoming",
    },
    {
      id: 3,
      sport: "Basketball",
      emoji: "",
      date: "November 13, 2024",
      name: "Early Signing Period",
      athleteCount: 620,
      status: "upcoming",
    },
  ];

  const liveStreams = [
    {
      id: 1,
      athleteName: "Marcus Johnson",
      sport: "Football",
      position: "QB",
      finalists: ["Alabama", "Georgia", "Ohio State"],
      viewers: 15234,
      status: "live",
      thumbnail: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400",
    },
    {
      id: 2,
      athleteName: "Sarah Williams",
      sport: "Basketball",
      position: "PG",
      finalists: ["UConn", "Stanford", "South Carolina"],
      viewers: 8921,
      status: "live",
      thumbnail: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400",
    },
  ];

  const recentCommitments = [
    {
      id: 1,
      athleteName: "Tyler Rodriguez",
      sport: "Baseball",
      position: "RHP",
      college: "Vanderbilt",
      collegeLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Vanderbilt_Commodores_logo.svg/200px-Vanderbilt_Commodores_logo.svg.png",
      views: 45230,
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      athleteName: "Emma Davis",
      sport: "Soccer",
      position: "FW",
      college: "UCLA",
      collegeLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/UCLA_Bruins_logo.svg/200px-UCLA_Bruins_logo.svg.png",
      views: 32100,
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      athleteName: "James Thompson",
      sport: "Football",
      position: "WR",
      college: "Clemson",
      collegeLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Clemson_Tigers_logo.svg/200px-Clemson_Tigers_logo.svg.png",
      views: 67890,
      timestamp: "1 day ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900">
      {/* Hero Section */}
      <div className="container py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="h-12 w-12 text-yellow-400" />
            <h1 className="text-5xl font-bold text-white">National Signing Day</h1>
          </div>
          <p className="text-xl text-cyan-200 max-w-3xl mx-auto">
            Watch athletes announce their college commitments LIVE. Every commitment is a celebration. Every decision is a moment.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500/20 rounded-lg">
                  <Video className="h-6 w-6 text-red-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">12</div>
                  <div className="text-sm text-gray-300">Live Now</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Users className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">45.2K</div>
                  <div className="text-sm text-gray-300">Watching</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Trophy className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">2,847</div>
                  <div className="text-sm text-gray-300">Commitments</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">8</div>
                  <div className="text-sm text-gray-300">Upcoming Events</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sport Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {sports.map((sport) => (
            <Button
              key={sport.id}
              variant={selectedSport === sport.id ? "default" : "outline"}
              onClick={() => setSelectedSport(sport.id)}
              className={selectedSport === sport.id ? "bg-cyan-500 hover:bg-cyan-600" : "bg-white/10 hover:bg-white/20 text-white border-white/20"}
            >
              <span className="mr-2">{sport.emoji}</span>
              {sport.name}
            </Button>
          ))}
        </div>

        {/* Live Streams */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <h2 className="text-3xl font-bold text-white">Live Now</h2>
            </div>
            <Badge variant="destructive" className="bg-red-500">
              {liveStreams.length} LIVE
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {liveStreams.map((stream) => (
              <Card key={stream.id} className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden group cursor-pointer hover:bg-white/15 transition-all">
                <div className="relative">
                  <img src={stream.thumbnail} alt={stream.athleteName} className="w-full h-64 object-cover" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="destructive" className="bg-red-500 animate-pulse">
                      🔴 LIVE
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                    <Users className="h-4 w-4 text-white" />
                    <span className="text-white font-semibold">{stream.viewers.toLocaleString()}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600">
                      <Play className="h-5 w-5 mr-2" />
                      Watch Live
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-white">{stream.athleteName}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {stream.sport} • {stream.position}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-300">Finalists:</div>
                    <div className="flex flex-wrap gap-2">
                      {stream.finalists.map((school, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-white/20 text-white">
                          {school}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Upcoming Signing Days</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl">{event.emoji}</span>
                    <Badge variant="outline" className="border-cyan-400 text-cyan-400">
                      {event.sport}
                    </Badge>
                  </div>
                  <CardTitle className="text-white">{event.name}</CardTitle>
                  <CardDescription className="text-gray-300">{event.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Users className="h-4 w-4" />
                      <span>{event.athleteCount} athletes</span>
                    </div>
                    <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white">
                      Notify Me
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Commitments */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-6">Recent Commitments</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentCommitments.map((commitment) => (
              <Card key={commitment.id} className="bg-white/10 backdrop-blur-md border-white/20 group cursor-pointer hover:bg-white/15 transition-all">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <img src={commitment.collegeLogo} alt={commitment.college} className="w-16 h-16 object-contain bg-white rounded-lg p-2" />
                    <div>
                      <CardTitle className="text-white text-lg">{commitment.athleteName}</CardTitle>
                      <CardDescription className="text-gray-300">
                        {commitment.sport} • {commitment.position}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-cyan-400">Committed to {commitment.college}!</div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>{commitment.views.toLocaleString()} views</span>
                    </div>
                    <span>{commitment.timestamp}</span>
                  </div>
                  <Button className="w-full mt-4 bg-cyan-500 hover:bg-cyan-600">
                    <Play className="h-4 w-4 mr-2" />
                    Watch Announcement
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-cyan-500 to-blue-500 border-0">
            <CardContent className="py-12">
              <Trophy className="h-16 w-16 text-white mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-white mb-4">Ready to Announce Your Commitment?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Make your college decision a moment to remember. Stream your announcement live to thousands of fans, family, and friends.
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" className="bg-white text-cyan-600 hover:bg-gray-100">
                  <Video className="h-5 w-5 mr-2" />
                  Schedule Your Stream
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
