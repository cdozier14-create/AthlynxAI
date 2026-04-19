import { useState } from "react";
import { Link } from "wouter";

export default function Medical() {
  const [selectedService, setSelectedService] = useState("all");

  const services = [
    { id: "all", name: "All Services", icon: "🏥" },
    { id: "orthopedic", name: "Orthopedic", icon: "🦴" },
    { id: "physical-therapy", name: "Physical Therapy", icon: "" },
    { id: "sports-medicine", name: "Sports Medicine", icon: "⚕️" },
    { id: "nutrition", name: "Nutrition", icon: "🥗" },
    { id: "mental-health", name: "Mental Health", icon: "🧠" },
    { id: "recovery", name: "Recovery", icon: "🧊" },
  ];

  const providers = [
    { id: 1, name: "Dr. James Andrews", specialty: "Orthopedic Surgery", location: "Birmingham, AL", rating: 4.9, reviews: 1250, image: "👨‍⚕️", verified: true, athletes: "NFL, MLB, NBA" },
    { id: 2, name: "Dr. Neal ElAttrache", specialty: "Sports Medicine", location: "Los Angeles, CA", rating: 4.9, reviews: 890, image: "👨‍⚕️", verified: true, athletes: "Dodgers, Lakers" },
    { id: 3, name: "Peak Performance PT", specialty: "Physical Therapy", location: "Multiple Locations", rating: 4.8, reviews: 2340, image: "🏥", verified: true, athletes: "College & Pro" },
    { id: 4, name: "Dr. Sarah Chen", specialty: "Sports Nutrition", location: "San Francisco, CA", rating: 4.7, reviews: 456, image: "👩‍⚕️", verified: true, athletes: "Olympic Athletes" },
    { id: 5, name: "Mind of Champions", specialty: "Sports Psychology", location: "Virtual/Nationwide", rating: 4.9, reviews: 678, image: "🧠", verified: true, athletes: "All Levels" },
    { id: 6, name: "CryoRecovery Centers", specialty: "Recovery & Cryotherapy", location: "Nationwide", rating: 4.6, reviews: 1890, image: "🧊", verified: true, athletes: "Pro Athletes" },
  ];

  const injuryResources = [
    { icon: "🦵", title: "ACL Recovery", desc: "Complete guide to ACL tear recovery", time: "6-9 months" },
    { icon: "", title: "Rotator Cuff", desc: "Shoulder injury prevention & rehab", time: "3-6 months" },
    { icon: "🦶", title: "Ankle Sprains", desc: "Fast recovery protocols", time: "2-6 weeks" },
    { icon: "🏃", title: "Hamstring", desc: "Prevention and treatment guide", time: "2-8 weeks" },
    { icon: "", title: "Tennis Elbow", desc: "Overuse injury management", time: "6-12 weeks" },
    { icon: "🧠", title: "Concussion", desc: "Return to play protocols", time: "1-4 weeks" },
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
            <Link href="/medical" className="text-red-400 font-semibold">Medical</Link>
            <Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link>
          </nav>
        </div>
      </header>

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-semibold mb-4">
              🏥 MEDICAL & ORTHOPEDICS
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
              Athlete <span className="text-red-400">Health Hub</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Connect with top sports medicine doctors, physical therapists, and recovery specialists trusted by pro athletes.
            </p>
          </div>

          {/* Emergency Banner */}
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚨</span>
              <div>
                <p className="text-white font-semibold">Need Immediate Care?</p>
                <p className="text-gray-400 text-sm">Connect with a sports medicine specialist now</p>
              </div>
            </div>
            <button className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-400 transition-all">
              Get Help Now
            </button>
          </div>

          {/* Services */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                  selectedService === service.id
                    ? "bg-red-500 text-white font-semibold"
                    : "bg-white/10 text-gray-400 hover:bg-white/20"
                }`}
              >
                <span>{service.icon}</span>
                <span>{service.name}</span>
              </button>
            ))}
          </div>

          {/* Providers Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {providers.map((provider) => (
              <div
                key={provider.id}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-red-500/50 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/10 flex items-center justify-center text-3xl">
                    {provider.image}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{provider.name}</h3>
                      {provider.verified && (
                        <span className="text-blue-400 text-sm"></span>
                      )}
                    </div>
                    <p className="text-red-400 text-sm">{provider.specialty}</p>
                    <p className="text-gray-500 text-sm">{provider.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-white font-semibold">{provider.rating}</span>
                    <span className="text-gray-500 text-sm">({provider.reviews})</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mb-4">
                  <span className="text-gray-400">Trusted by:</span> {provider.athletes}
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-400 transition-all text-sm">
                    Book Now
                  </button>
                  <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all text-sm">
                    Profile
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Injury Recovery Resources */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Injury Recovery <span className="text-red-400">Resources</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {injuryResources.map((resource, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5 hover:border-red-500/50 transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{resource.icon}</span>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{resource.title}</h3>
                      <p className="text-gray-500 text-sm mb-2">{resource.desc}</p>
                      <p className="text-red-400 text-xs">Recovery: {resource.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Telehealth Section */}
          <div className="bg-gradient-to-r from-red-500/10 to-blue-500/10 rounded-2xl border border-red-500/20 p-8 mb-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-4xl block mb-4"></span>
                <h3 className="text-2xl font-bold text-white mb-2">Telehealth Available</h3>
                <p className="text-gray-400 mb-4">
                  Connect with sports medicine specialists from anywhere. Get expert advice, second opinions, and follow-up care virtually.
                </p>
                <button className="px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-400 transition-all">
                  Start Virtual Visit
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "", label: "From Home" },
                  { icon: "⏰", label: "24/7 Available" },
                  { icon: "", label: "Insurance Accepted" },
                  { icon: "🔒", label: "HIPAA Secure" },
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4 text-center">
                    <span className="text-2xl block mb-1">{item.icon}</span>
                    <p className="text-gray-400 text-sm">{item.label}</p>
                  </div>
                ))}
              </div>
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
