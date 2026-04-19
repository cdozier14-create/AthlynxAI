import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Heart, 
  Home, 
  Users, 
  Star, 
  ArrowLeft,
  Quote,
  Sparkles,
  Shield,
  Building2,
  Lightbulb
} from "lucide-react";

// Family photo gallery - photos to be uploaded
const familyPhotos = [
  { src: "", caption: "Family is everything" },
  { src: "", caption: "Building dreams together" },
  { src: "", caption: "The foundation of it all" },
  { src: "", caption: "Love that drives us forward" },
  { src: "", caption: "Moments that matter" },
  { src: "", caption: "Together we rise" },
  { src: "", caption: "Faith, family, future" },
  { src: "", caption: "Where it all began" },
  { src: "", caption: "The heart of our mission" },
  { src: "", caption: "Dreams do come true" },
  { src: "", caption: "Love conquers all" },
  { src: "", caption: "Building legacy" },
];

export default function FounderStory() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-amber-50/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <span className="font-semibold text-slate-800">Our Story</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Home className="w-4 h-4" />
              This is Home
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Family is <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-red-500">Everything</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Behind every line of code, every feature, every dream we chase — there's a family. 
              There's a mother. There's a reason why we wake up every day and fight for something bigger than ourselves.
            </p>
          </div>

          {/* Featured Family Photo */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-16 bg-gradient-to-br from-amber-900/30 to-slate-900 h-[500px] flex items-center justify-center">
            <div className="text-center p-8">
              <div className="text-7xl mb-6">👨‍👩‍👧‍👦</div>
              <h2 className="text-3xl font-bold text-white mb-2">The Dozier Family</h2>
              <p className="text-amber-300/80 text-lg">The foundation of everything we build</p>
            </div>
          </div>
        </div>
      </section>

      {/* THE VISION VIDEO SECTION */}
      <section className="py-16 px-4 bg-gradient-to-b from-slate-900 to-blue-950">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <span className="text-amber-400 text-4xl">🎬</span>
            <h2 className="text-3xl font-bold text-white mt-4 mb-2">The Vision</h2>
            <p className="text-cyan-400 tracking-wider">DREAMS DO TRULY COME TRUE</p>
          </div>
          
          {/* Video Player */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-cyan-400/30">
            <video 
              controls 
              className="w-full aspect-video bg-black"
              poster="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/qUknrdlyPrUZJQYo.png"
            >
              <source src="/final_clean.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          <p className="text-slate-400 text-center mt-6">
            <span className="text-cyan-400">★</span> The Founder's Journey <span className="text-cyan-400">★</span>
          </p>
        </div>
      </section>

      {/* The Story Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg prose-slate mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <Quote className="w-12 h-12 text-amber-500 flex-shrink-0 mt-2" />
              <blockquote className="text-2xl font-medium text-slate-700 italic border-none p-0 m-0">
                "Two of our founders are cancer patients in remission. The mom of another founder is also a cancer patient in remission. 
                This isn't just business. This is personal. This is our legacy."
              </blockquote>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500" />
              Why We Built This
            </h2>
            
            <p className="text-slate-600 leading-relaxed text-lg">
              My name is <strong>Chad A. Dozier</strong>. I'm the Chairman and President of Dozier Holdings Group, 
              and the founder of ATHLYNX AI. But before any of those titles, I'm a son. A family man. 
              Someone who watched his mother fight cancer and win.
            </p>

            <p className="text-slate-600 leading-relaxed text-lg">
              When you watch someone you love fight for their life, everything changes. 
              The small things don't matter anymore. What matters is <strong>family</strong>. 
              What matters is <strong>legacy</strong>. What matters is building something that helps others 
              the way we wished someone could have helped us.
            </p>

            <p className="text-slate-600 leading-relaxed text-lg">
              That's why we built <strong>Villa Agape</strong> — a home-away-from-home for cancer patients in remission. 
              With clean air, good water, IoT health monitoring, and most importantly — <strong>love</strong>. 
              Agape means unconditional love. That's what we give.
            </p>

            <p className="text-slate-600 leading-relaxed text-lg">
              That's why we built <strong>ATHLYNX</strong> — because every athlete, every worker, every person 
              deserves a platform that treats them like the star they are. Not a number. Not a commodity. 
              A <strong>human being</strong> with dreams, with family, with a story worth telling.
            </p>
          </div>
        </div>
      </section>

      {/* Family Photo Gallery */}
      <section className="py-16 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Family Album</h2>
            <p className="text-slate-600">The moments that remind us why we do this</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {familyPhotos.map((photo, index) => (
              <div 
                key={index}
                className="group relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-amber-900/20 to-slate-800"
                onClick={photo.src ? () => setSelectedPhoto(index) : undefined}
                style={{ cursor: photo.src ? 'pointer' : 'default' }}
              >
                {photo.src ? (
                  <img 
                    src={photo.src} 
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center p-3">
                      <div className="text-3xl mb-1">📸</div>
                      <p className="text-amber-300/60 text-xs">{photo.caption}</p>
                    </div>
                  </div>
                )}
                {photo.src && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm font-medium">{photo.caption}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Modal */}
      {selectedPhoto !== null && familyPhotos[selectedPhoto].src && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img 
              src={familyPhotos[selectedPhoto].src}
              alt={familyPhotos[selectedPhoto].caption}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            <p className="text-white text-center mt-4 text-lg">{familyPhotos[selectedPhoto].caption}</p>
            <button 
              className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl"
              onClick={() => setSelectedPhoto(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Mom's Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-50 to-rose-50">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-200 rounded-full opacity-50 blur-2xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-rose-200 rounded-full opacity-50 blur-2xl" />
              <div className="relative rounded-2xl shadow-xl w-full aspect-square bg-gradient-to-br from-rose-900/30 to-amber-900/30 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">❤️</div>
                  <p className="text-rose-300 text-sm">Photo coming soon</p>
                </div>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Heart className="w-4 h-4 fill-rose-500" />
                For Mom
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                The Heart of Everything
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Mom, this is for you. Every late night coding. Every early morning meeting. 
                Every dream we chase. It's all because you taught me that love conquers all. 
                That family comes first. That we fight for what matters.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                You beat cancer. You showed me what strength really looks like. 
                Now I'm building something that will help others like you — 
                people who need a place of healing, a community of love, a home away from home.
              </p>
              <p className="text-2xl font-semibold text-slate-800 italic">
                "Tomorrow, dreams will come true."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Empire We're Building */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">The Empire We're Building</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              12 companies. 1 family. Infinite possibilities. All driven by love.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 border-blue-100 hover:border-blue-300 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Technology</h3>
                <p className="text-sm text-slate-600">VC Technologies, Data Centers, The VIRT, VC Energy</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-100 hover:border-green-300 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Home className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Real Estate</h3>
                <p className="text-sm text-slate-600">Villa Agape, Pisces Resort, Venus Venue, Pomodoro</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-amber-100 hover:border-amber-300 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Sports Tech</h3>
                <p className="text-sm text-slate-600">ATHLYNX AI - The complete athlete ecosystem</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100 hover:border-purple-300 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Trading</h3>
                <p className="text-sm text-slate-600">The Silk Road Trading - Global sourcing</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-slate-900 text-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What We Stand For</h2>
            <p className="text-slate-400">The values that guide every decision we make</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Faith</h3>
              <p className="text-slate-400">
                We believe in something greater than ourselves. 
                Faith guides our path and gives us strength.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Country</h3>
              <p className="text-slate-400">
                We honor those who serve. Veterans, first responders, 
                and everyday heroes who make America great.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Family</h3>
              <p className="text-slate-400">
                Everything we build is for our families. 
                Present and future. Blood and chosen.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-2xl font-bold text-amber-400">
              "Faith. Country. Family. Leadership."
            </p>
            <p className="text-slate-500 mt-2">— Chad A. Dozier</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Our Family
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Whether you're an athlete, a veteran, a blue-collar worker, or just someone with a dream — 
            there's a place for you here. This is home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/early-access">
              <Button size="lg" className="bg-white text-amber-600 hover:bg-white/90 px-8">
                Get Early Access
              </Button>
            </Link>
            <Link href="/veterans">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                Veterans Program
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-slate-900 text-center">
        <p className="text-slate-400">
          © 2026 Dozier Holdings Group, LLC. All rights reserved.
        </p>
        <p className="text-amber-400 font-medium mt-2">
          MIC DROP. FOCKER OUT.
        </p>
      </footer>
    </div>
  );
}
