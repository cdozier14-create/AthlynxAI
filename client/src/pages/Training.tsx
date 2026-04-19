import { useState } from "react";
import { Link } from "wouter";

export default function Training() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Training", icon: "" },
    { id: "strength", name: "Strength", icon: "🏋️" },
    { id: "speed", name: "Speed & Agility", icon: "" },
    { id: "sport-specific", name: "Sport-Specific", icon: "" },
    { id: "recovery", name: "Recovery", icon: "🧘" },
    { id: "nutrition", name: "Nutrition", icon: "🥗" },
  ];

  const workoutPlans = [
    { id: 1, name: "Elite Athlete Strength", duration: "12 weeks", level: "Advanced", sport: "All Sports", rating: 4.9, users: 12500, image: "🏋️", price: "Pro" },
    { id: 2, name: "Speed & Explosion", duration: "8 weeks", level: "Intermediate", sport: "Football, Basketball", rating: 4.8, users: 8900, image: "", price: "Pro" },
    { id: 3, name: "Baseball Power Hitting", duration: "6 weeks", level: "All Levels", sport: "Baseball", rating: 4.9, users: 5600, image: "", price: "Elite" },
    { id: 4, name: "Quarterback Mechanics", duration: "10 weeks", level: "Advanced", sport: "Football", rating: 4.7, users: 3200, image: "", price: "Elite" },
    { id: 5, name: "Basketball Vertical Jump", duration: "8 weeks", level: "Intermediate", sport: "Basketball", rating: 4.8, users: 7800, image: "", price: "Pro" },
    { id: 6, name: "Injury Prevention", duration: "Ongoing", level: "All Levels", sport: "All Sports", rating: 4.9, users: 15000, image: "🛡️", price: "Free" },
  ];

  const trainers = [
    { id: 1, name: "Marcus Johnson", specialty: "NFL Strength Coach", athletes: "50+ NFL Players", rating: 4.9, image: "👨‍🏫", verified: true },
    { id: 2, name: "Sarah Williams", specialty: "Olympic Speed Coach", athletes: "12 Olympic Medalists", rating: 4.9, image: "👩‍🏫", verified: true },
    { id: 3, name: "Coach Mike", specialty: "Baseball Hitting", athletes: "MLB Draft Picks", rating: 4.8, image: "👨‍🏫", verified: true },
    { id: 4, name: "Dr. Lisa Chen", specialty: "Sports Nutrition", athletes: "Pro Athletes", rating: 4.9, image: "👩‍⚕️", verified: true },
  ];

  const gyms = [
    { id: 1, name: "Athlete Performance Center", location: "Los Angeles, CA", rating: 4.9, type: "Elite Training", amenities: ["Turf Field", "Weight Room", "Recovery"] },
    { id: 2, name: "Diamond Elite Baseball", location: "Phoenix, AZ", rating: 4.8, type: "Baseball Specific", amenities: ["Batting Cages", "Pitching Lab", "Video Analysis"] },
    { id: 3, name: "Gridiron Training", location: "Dallas, TX", rating: 4.7, type: "Football Specific", amenities: ["40-Yard Track", "Sled Push", "Film Room"] },
    { id: 4, name: "Hoop Dreams Academy", location: "Chicago, IL", rating: 4.8, type: "Basketball Specific", amenities: ["Courts", "Shooting Lab", "Strength Room"] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl"></span>
            <span className="text-xl font-black text-white">ATHLYNX</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/home" className="text-gray-400 hover:text-white">Platform</Link>
            <Link href="/store" className="text-gray-400 hover:text-white">Store</Link>
            <Link href="/training" className="text-orange-400 font-semibold">Training</Link>
            <Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link>
          </nav>
        </div>
      </header>

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-semibold mb-4">
              TRAINING & GYM
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
              Train Like a <span className="text-orange-400">Pro</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Access elite training programs, connect with pro trainers, and find the best gyms near you.
            </p>
          </div>

          {/* AI Training Bot Banner */}
          <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-2xl border border-orange-500/30 p-6 mb-10">
            <div className="flex items-center gap-6">
              <span className="text-5xl">🤖</span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">AI Personal Trainer</h3>
                <p className="text-gray-400">Get custom workout plans generated by AI based on your sport, position, and goals</p>
              </div>
              <button className="px-6 py-3 bg-orange-500 text-black font-bold rounded-xl hover:bg-orange-400 transition-all">
                Generate My Plan
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-orange-500 text-black font-semibold"
                    : "bg-white/10 text-gray-400 hover:bg-white/20"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Workout Plans */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Training <span className="text-orange-400">Programs</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workoutPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:border-orange-500/50 transition-all"
                >
                  <div className="h-32 bg-gradient-to-br from-orange-500/20 to-yellow-500/10 flex items-center justify-center text-5xl">
                    {plan.image}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${
                        plan.price === "Free" ? "bg-green-500/20 text-green-400" :
                        plan.price === "Pro" ? "bg-blue-500/20 text-blue-400" :
                        "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        {plan.price}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-3">{plan.sport}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <span>⏱️ {plan.duration}</span>
                      <span>{plan.level}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-white">{plan.rating}</span>
                        <span className="text-gray-500">({plan.users.toLocaleString()})</span>
                      </div>
                      <button className="px-4 py-2 bg-orange-500 text-black font-semibold rounded-lg text-sm hover:bg-orange-400 transition-all">
                        Start
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Trainers */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Elite <span className="text-orange-400">Trainers</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {trainers.map((trainer) => (
                <div
                  key={trainer.id}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5 text-center hover:border-orange-500/50 transition-all"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-orange-500/20 to-yellow-500/10 flex items-center justify-center text-4xl mb-4">
                    {trainer.image}
                  </div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <h3 className="text-white font-bold">{trainer.name}</h3>
                    {trainer.verified && <span className="text-blue-400 text-sm"></span>}
                  </div>
                  <p className="text-orange-400 text-sm mb-1">{trainer.specialty}</p>
                  <p className="text-gray-500 text-xs mb-3">{trainer.athletes}</p>
                  <div className="flex items-center justify-center gap-1 mb-3">
                    <span className="text-yellow-400">★</span>
                    <span className="text-white">{trainer.rating}</span>
                  </div>
                  <button className="w-full py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all text-sm">
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Gym Finder */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Find a <span className="text-orange-400">Gym</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {gyms.map((gym) => (
                <div
                  key={gym.id}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5 hover:border-orange-500/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{gym.name}</h3>
                      <p className="text-gray-500 text-sm">{gym.location}</p>
                    </div>
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-semibold rounded-full">
                      {gym.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-yellow-400">★</span>
                    <span className="text-white">{gym.rating}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {gym.amenities.map((amenity, i) => (
                      <span key={i} className="px-2 py-1 bg-white/10 text-gray-400 text-xs rounded">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <button className="w-full py-2 bg-orange-500 text-black font-semibold rounded-lg hover:bg-orange-400 transition-all text-sm">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Back Link */}
          <div className="text-center">
            <Link href="/" className="text-cyan-400 hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
