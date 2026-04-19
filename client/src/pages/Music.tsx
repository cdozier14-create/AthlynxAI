import { useState } from "react";
import { Link } from "wouter";

export default function Music() {
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [isPlaying, setIsPlaying] = useState<number | null>(null);

  const genres = [
    { id: "all", name: "All Music", icon: "🎵" },
    { id: "hiphop", name: "Hip Hop", icon: "🎤" },
    { id: "edm", name: "EDM", icon: "🎧" },
    { id: "rock", name: "Rock", icon: "🎸" },
    { id: "motivation", name: "Motivation", icon: "" },
    { id: "focus", name: "Focus", icon: "🧘" },
  ];

  const playlists = [
    { id: 1, name: "Pre-Game Hype", tracks: 45, duration: "2hr 30min", genre: "hiphop", plays: "2.5M", image: "", curator: "ATHLYNX" },
    { id: 2, name: "Weightroom Beast Mode", tracks: 60, duration: "3hr 15min", genre: "edm", plays: "1.8M", image: "🏋️", curator: "ATHLYNX" },
    { id: 3, name: "Cardio Crusher", tracks: 50, duration: "2hr 45min", genre: "edm", plays: "1.2M", image: "🏃", curator: "ATHLYNX" },
    { id: 4, name: "Focus & Flow", tracks: 40, duration: "2hr", genre: "focus", plays: "890K", image: "🧘", curator: "ATHLYNX" },
    { id: 5, name: "Game Day Anthems", tracks: 35, duration: "1hr 45min", genre: "rock", plays: "1.5M", image: "", curator: "ATHLYNX" },
    { id: 6, name: "Motivation Monday", tracks: 30, duration: "1hr 30min", genre: "motivation", plays: "2.1M", image: "", curator: "ATHLYNX" },
    { id: 7, name: "Baseball Walkup Songs", tracks: 100, duration: "5hr", genre: "hiphop", plays: "3.2M", image: "", curator: "Diamond Grind" },
    { id: 8, name: "Football Friday Nights", tracks: 55, duration: "3hr", genre: "rock", plays: "1.9M", image: "", curator: "ATHLYNX" },
  ];

  const athletePlaylists = [
    { name: "LeBron's Pregame", athlete: "LeBron James", sport: "Basketball", followers: "5.2M", image: "" },
    { name: "Mahomes Mix", athlete: "Patrick Mahomes", sport: "Football", followers: "3.8M", image: "" },
    { name: "Trout's Walkups", athlete: "Mike Trout", sport: "Baseball", followers: "1.2M", image: "" },
    { name: "Serena's Power", athlete: "Serena Williams", sport: "Tennis", followers: "2.9M", image: "" },
  ];

  const podcasts = [
    { id: 1, name: "The Athlete Mindset", host: "Dr. Michael Johnson", episodes: 156, rating: 4.9, image: "🧠" },
    { id: 2, name: "NIL Talk", host: "ATHLYNX Team", episodes: 89, rating: 4.8, image: "" },
    { id: 3, name: "Recruiting Insider", host: "Coach Williams", episodes: 234, rating: 4.7, image: "" },
    { id: 4, name: "Pro Athlete Stories", host: "Marcus Allen", episodes: 178, rating: 4.9, image: "" },
  ];

  const filteredPlaylists = selectedGenre === "all" 
    ? playlists 
    : playlists.filter(p => p.genre === selectedGenre);

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
            <Link href="/music" className="text-purple-400 font-semibold">Music</Link>
            <Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link>
          </nav>
        </div>
      </header>

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-semibold mb-4">
              🎵 ATHLYNX MUSIC
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
              Fuel Your <span className="text-purple-400">Performance</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Curated playlists for every workout, game day, and training session. Music that moves athletes.
            </p>
          </div>

          {/* Now Playing Banner */}
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30 p-6 mb-10">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl animate-pulse">
                🎵
              </div>
              <div className="flex-1">
                <p className="text-gray-400 text-sm">NOW PLAYING</p>
                <h3 className="text-xl font-bold text-white">Pre-Game Hype Mix</h3>
                <p className="text-purple-400">45 tracks • 2hr 30min</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                  <span className="text-xl">⏮️</span>
                </button>
                <button className="p-4 bg-purple-500 rounded-full hover:bg-purple-400 transition-all">
                  <span className="text-2xl">▶️</span>
                </button>
                <button className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                  <span className="text-xl">⏭️</span>
                </button>
              </div>
            </div>
          </div>

          {/* Genres */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => setSelectedGenre(genre.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                  selectedGenre === genre.id
                    ? "bg-purple-500 text-white font-semibold"
                    : "bg-white/10 text-gray-400 hover:bg-white/20"
                }`}
              >
                <span>{genre.icon}</span>
                <span>{genre.name}</span>
              </button>
            ))}
          </div>

          {/* Playlists Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Workout <span className="text-purple-400">Playlists</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredPlaylists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all cursor-pointer group"
                  onClick={() => setIsPlaying(isPlaying === playlist.id ? null : playlist.id)}
                >
                  <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/10 flex items-center justify-center text-6xl relative">
                    {playlist.image}
                    <div className={`absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all ${isPlaying === playlist.id ? 'opacity-100' : ''}`}>
                      <span className="text-4xl">{isPlaying === playlist.id ? '⏸️' : '▶️'}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">{playlist.name}</h3>
                    <p className="text-gray-500 text-xs mb-2">{playlist.tracks} tracks • {playlist.duration}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-400 text-xs">{playlist.plays} plays</span>
                      <span className="text-gray-600 text-xs">{playlist.curator}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Athlete Playlists */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Pro Athlete <span className="text-purple-400">Playlists</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {athletePlaylists.map((playlist, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5 hover:border-purple-500/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/10 flex items-center justify-center text-2xl">
                      {playlist.image}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{playlist.name}</h3>
                      <p className="text-purple-400 text-sm">{playlist.athlete}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{playlist.sport}</span>
                    <span className="text-gray-400">{playlist.followers} followers</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Podcasts */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Sports <span className="text-purple-400">Podcasts</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {podcasts.map((podcast) => (
                <div
                  key={podcast.id}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5 hover:border-purple-500/50 transition-all cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 flex items-center justify-center text-3xl mb-4">
                    {podcast.image}
                  </div>
                  <h3 className="text-white font-semibold mb-1">{podcast.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{podcast.host}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{podcast.episodes} episodes</span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-white">{podcast.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Banner */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center mb-10">
            <h3 className="text-2xl font-bold text-white mb-2">🎵 ATHLYNX Music Premium</h3>
            <p className="text-white/80 mb-6">Ad-free listening, offline downloads, and exclusive athlete playlists</p>
            <button className="px-8 py-3 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition-all">
              Upgrade to Premium
            </button>
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
