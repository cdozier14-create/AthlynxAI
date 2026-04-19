import { useState } from "react";
import { Link } from "wouter";

const videos = [
  { id: 1, title: "ATHLYNX Introduction", src: "/videos/athlynx-intro-1.mp4", description: "The future of athlete success" },
  { id: 2, title: "Platform Overview", src: "/videos/athlynx-intro-2.mp4", description: "Complete ecosystem walkthrough" },
  { id: 3, title: "NIL Portal Features", src: "/videos/athlynx-intro-3.mp4", description: "Monetize your brand" },
  { id: 4, title: "Diamond Grind Preview", src: "/videos/athlynx-intro-4.mp4", description: "Baseball training excellence" },

];

const appIcons = [
  { name: "NIL Portal", icon: "/images/nil-portal-icon.jpeg", description: "Social network for athletes", url: "/nil-portal" },
  { name: "NIL Messenger", icon: "/images/nil-messenger-icon.jpeg", description: "Secure encrypted messaging", url: "/messages" },
  { name: "Diamond Grind", icon: "/images/diamond-grind-icon.png", description: "Baseball training & performance", url: "/diamond-grind" },
  { name: "NIL Deals", icon: "/images/nil-deals-icon.png", description: "Brand partnerships & deals", url: "/nil-marketplace" },
];

export default function MediaShowcase() {
  const [activeVideo, setActiveVideo] = useState(videos[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section - Athlete's Playbook Style */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background gradient with golden glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-yellow-600/20 via-yellow-500/30 to-yellow-600/20 blur-[100px] rounded-full"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          {/* Trophy Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 border-2 border-yellow-500/50 rounded-full mb-8 bg-black/50">
            <span className="text-yellow-500 text-xl"></span>
            <span className="text-yellow-500 font-bold tracking-[0.3em] text-sm">INTRODUCING</span>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tight" style={{ textShadow: '0 0 60px rgba(234, 179, 8, 0.3)' }}>
            THE<br />
            <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 bg-clip-text text-transparent">ATHLETE'S</span><br />
            PLAYBOOK
          </h1>

          {/* Subtitle */}
          <p className="text-cyan-400 text-xl md:text-2xl tracking-[0.2em] mb-12">
            Your Complete NIL Success System
          </p>

          {/* Enter Site Button */}
          <Link href="/home">
            <button className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-bold text-lg rounded-full hover:from-cyan-400 hover:to-cyan-300 transition-all transform hover:scale-105 flex items-center gap-2 mx-auto">
              Enter Site
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* App Icons Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-slate-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-white text-center mb-4">Our Apps</h2>
          <p className="text-gray-400 text-center mb-12">The complete athlete ecosystem</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {appIcons.map((app) => (
              <Link key={app.name} href={app.url}>
                <div className="bg-slate-800/50 border border-cyan-500/20 rounded-2xl p-6 text-center hover:border-cyan-500/50 hover:bg-slate-800 transition-all cursor-pointer group">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-cyan-500/20 transition-shadow">
                    <img src={app.icon} alt={app.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-white font-bold mb-1">{app.name}</h3>
                  <p className="text-gray-400 text-sm">{app.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Video Gallery Section */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-white text-center mb-4">Platform Videos</h2>
          <p className="text-gray-400 text-center mb-12">See ATHLYNX in action</p>

          {/* Main Video Player */}
          <div className="bg-black rounded-2xl overflow-hidden mb-8 aspect-video">
            <video
              key={activeVideo.src}
              controls
              className="w-full h-full"
              poster="/images/athlynx-logo-dark.png"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={activeVideo.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Video Info */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white">{activeVideo.title}</h3>
            <p className="text-gray-400">{activeVideo.description}</p>
          </div>

          {/* Video Thumbnails */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {videos.map((video) => (
              <button
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className={`relative rounded-xl overflow-hidden aspect-video border-2 transition-all ${
                  activeVideo.id === video.id
                    ? "border-cyan-500 ring-2 ring-cyan-500/50"
                    : "border-gray-700 hover:border-gray-500"
                }`}
              >
                <video
                  src={video.src}
                  className="w-full h-full object-cover"
                  muted
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                  <p className="text-white text-xs font-medium truncate">{video.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* DHG Crab Shield Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900 to-black">
        <div className="container mx-auto max-w-4xl text-center">
          <img 
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/AzsuZOzvfgvscIdI.png" 
            alt="DHG Crab Shield" 
            className="w-48 h-48 mx-auto mb-8 rounded-2xl shadow-2xl"
          />
          <h2 className="text-3xl font-bold text-white mb-4">Dozier Holdings Group</h2>
          <p className="text-gray-400 mb-8">
            "The data is the gold. The algorithms are the refinery."
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/">
              <button className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors">
                VIP Early Access
              </button>
            </Link>
            <Link href="/project-management">
              <button className="px-6 py-3 border border-cyan-500 text-cyan-400 font-bold rounded-lg hover:bg-cyan-500/10 transition-colors">
                Project Management
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-black border-t border-gray-800">
        <div className="container mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © 2024-2025 NPI, Inc. A Dozier Holdings Group Company.
          </p>
        </div>
      </footer>
    </div>
  );
}
