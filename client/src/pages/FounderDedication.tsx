import { Link } from 'wouter';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import UnifiedNav from "@/components/UnifiedNav";
import UnifiedFooter from "@/components/UnifiedFooter";
import { 
  Heart, Star, Users, Cross, Trophy, Clock, Quote, 
  Crown, Sparkles, BookOpen, Dog, Home, GraduationCap
} from 'lucide-react';

export default function FounderDedication() {
  const timestamp = "December 29, 2025 • 9:36 PM CST";
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-cyan-950/20 to-slate-950">
      <UnifiedNav />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        
        {/* Glowing orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
        
        <div className="container relative px-4 md:px-5">
          <div className="text-center max-w-4xl mx-auto">
            {/* Historic Timestamp */}
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 mb-4 text-sm">
              <Clock className="w-3 h-3 mr-1" /> {timestamp} • USER #1 • HISTORIC MOMENT
            </Badge>
            
            {/* Crown Icon */}
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full blur-xl opacity-50 animate-pulse" />
              <div className="relative w-full h-full bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center">
                <Crown className="w-12 h-12 text-white" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Founder's Dedication
            </h1>
            <p className="text-xl text-cyan-400 mb-2">
              "Look Ma and Nanny, I Made It"
            </p>
            <p className="text-white/60 max-w-2xl mx-auto mb-8">
              The story of how one man's faith, family, and perseverance built an empire 
              when everyone else gave empty promises.
            </p>
          </div>
        </div>
      </section>

      {/* The Number 1 - God */}
      <section className="container px-4 md:px-5 pb-16">
        <Card className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border-yellow-500/30 overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="text-center max-w-3xl mx-auto">
              <Cross className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 mb-4">
                #1 - ABOVE ALL
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                The Good Lord Above
              </h2>
              <p className="text-white/80 text-lg mb-6 leading-relaxed">
                The number one is the Good Lord up above that gave me so many chances I didn't deserve. 
                But now I see His purpose and I will never lose sight.
              </p>
              <blockquote className="border-l-4 border-yellow-500 pl-6 py-4 bg-slate-900/50 rounded-r-xl">
                <p className="text-yellow-400 text-xl italic mb-4">
                  "Each of you should use whatever gift you have received to serve others, 
                  as faithful stewards of God's grace."
                </p>
                <footer className="text-white/60">— 1 Peter 4:10</footer>
              </blockquote>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Nanny - The One Who Saved His Life */}
      <section className="container px-4 md:px-5 pb-16">
        <Card className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 border-pink-500/30 overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="text-center max-w-3xl mx-auto">
              <Heart className="w-16 h-16 text-pink-400 mx-auto mb-6 animate-pulse" />
              <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/30 mb-4">
                THE ONE WHO SAVED MY LIFE
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                My Nanny
              </h2>
              <p className="text-white/80 text-lg mb-6 leading-relaxed">
                My Nanny saved my life. My grandmother - she raised me well. She gets ALL the credit. 
                Everything I am today, everything I've built, it all started with her love, her sacrifice, 
                her belief in me when no one else did.
              </p>
              <div className="bg-slate-900/50 rounded-xl p-6 border border-pink-500/30">
                <p className="text-pink-400 text-2xl font-bold">
                  "Look Ma and Nanny, I Made It"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Mother - The Reason */}
      <section className="container px-4 md:px-5 pb-16">
        <Card className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 border-purple-500/30 overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="text-center max-w-3xl mx-auto">
              <Home className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 mb-4">
                THE REASON FOR EVERYTHING
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                My Precious Mother
              </h2>
              <p className="text-white/80 text-lg leading-relaxed">
                She's the reason I did all this. I had to grow up to take care of her with her cancer battle. 
                Every late night, every setback, every moment I wanted to give up - I thought of her. 
                This empire isn't just for me. It's for her. It's always been for her.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Family */}
      <section className="container px-4 md:px-5 pb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          <Users className="w-6 h-6 inline mr-2 text-cyan-400" /> Family Who Believed
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-white/5 border-cyan-500/20">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Grampa</h3>
              <p className="text-white/60">The foundation of strength</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-cyan-500/20">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Aunt Jami</h3>
              <p className="text-white/60">Always there when it mattered</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-cyan-500/20">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Uncle Bill</h3>
              <p className="text-white/60">Guidance through the storm</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* The Team Who Stayed */}
      <section className="container px-4 md:px-5 pb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-4">
          <Trophy className="w-6 h-6 inline mr-2 text-yellow-400" /> The Team Who Stayed
        </h2>
        <p className="text-white/60 text-center mb-8 max-w-2xl mx-auto">
          After every person let me down and gave me empty promises, these men stood by me.
        </p>
        <div className="grid md:grid-cols-5 gap-4">
          {[
            { name: 'Glenn Tse', role: 'CFO & COO', initials: 'GT' },
            { name: 'Jimmy Boyd', role: 'VP Property Development', initials: 'JB' },
            { name: 'Lee Marshall', role: 'Trusted Advisor', initials: 'LM' },
            { name: 'Andrew Kustes', role: 'VP Technology', initials: 'AK' },
            { name: 'David Ford Sr.', role: 'Trusted Partner', initials: 'DF' }
          ].map((person, i) => (
            <Card key={i} className="bg-white/5 border-yellow-500/20">
              <CardContent className="p-4 text-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 mx-auto mb-3 flex items-center justify-center text-white font-bold">
                  {person.initials}
                </div>
                <h3 className="text-white font-bold text-sm">{person.name}</h3>
                <p className="text-yellow-400 text-xs">{person.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Best Friends - Westin & Diesel */}
      <section className="container px-4 md:px-5 pb-16">
        <Card className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border-orange-500/30 overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="text-center max-w-3xl mx-auto">
              <Dog className="w-16 h-16 text-orange-400 mx-auto mb-6" />
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mb-4">
                MY BOYS • MY DOGS • MY LIFE
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Westin & Diesel
              </h2>
              <p className="text-white/80 text-lg leading-relaxed">
                My two best friends. You saved my life when I had no hope. 
                I will forever be loyal. Through the darkest days, you were there. 
                Unconditional love when the world gave conditions.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* The Journey */}
      <section className="container px-4 md:px-5 pb-16">
        <Card className="bg-white/5 border-cyan-500/20">
          <CardContent className="p-8 md:p-12">
            <div className="text-center max-w-3xl mx-auto">
              <GraduationCap className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-6">The Journey</h2>
              <div className="space-y-4 text-left">
                <p className="text-white/80 leading-relaxed">
                  From <span className="text-cyan-400 font-bold">RH Watkins High School</span> in Laurel, Mississippi, 
                  where the dream began on the baseball diamond.
                </p>
                <p className="text-white/80 leading-relaxed">
                  To <span className="text-cyan-400 font-bold">Jones County Junior College</span>, 
                  where the work ethic was forged.
                </p>
                <p className="text-white/80 leading-relaxed">
                  To <span className="text-cyan-400 font-bold">Mississippi State University</span>, 
                  where the dream was cut short by injury.
                </p>
                <p className="text-white/80 leading-relaxed">
                  Through <span className="text-red-400 font-bold">years of poor choices</span> that followed - 
                  the testimony that now helps others avoid the same path.
                </p>
                <p className="text-white/80 leading-relaxed">
                  To <span className="text-yellow-400 font-bold">TODAY</span> - building an empire not for money, 
                  but to help that ONE child who had a childhood like mine never make the same mistakes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Wisdom */}
      <section className="container px-4 md:px-5 pb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          <BookOpen className="w-6 h-6 inline mr-2 text-cyan-400" /> Words to Live By
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white/5 border-cyan-500/20">
            <CardContent className="p-6">
              <Quote className="w-8 h-8 text-cyan-400 mb-4" />
              <p className="text-white/80 italic mb-4">
                "Dreams without Goals are just dreams and ultimately without Goals they fuel disappointment. 
                On the Road to Achieving your Dreams you must apply discipline but more importantly Consistency. 
                Because without Commitment you'll never start but without Consistency You'll never Finish."
              </p>
              <footer className="text-cyan-400 font-bold">— Chad A. Dozier Sr.</footer>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-cyan-500/20">
            <CardContent className="p-6">
              <Quote className="w-8 h-8 text-cyan-400 mb-4" />
              <p className="text-white/80 italic mb-4">
                "Logic will get you from A to B. Imagination will take you Everywhere."
              </p>
              <footer className="text-cyan-400 font-bold">— Albert Einstein</footer>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Signature */}
      <section className="container px-4 md:px-5 pb-16">
        <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
          <CardContent className="p-8 md:p-12 text-center">
            <Sparkles className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
            <p className="text-white/80 text-lg mb-6">
              I love all of you.
            </p>
            <p className="text-white text-xl mb-2">Respectfully,</p>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-4">
              Chad Allen Dozier Sr.
            </p>
            <p className="text-cyan-400">Founder & CEO, Dozier Holdings Group</p>
            <p className="text-white/60 text-sm mt-2">@Cdozier14</p>
            <p className="text-white/40 text-sm mt-4">User #1 • {timestamp}</p>
            
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-white/60 text-sm">
                "If my testimony helps that ONE child, then I've done my job. 
                And I'm having the time of my life - living my childhood dream through this platform."
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="container px-4 md:px-5 py-16 border-t border-cyan-500/20">
        <div className="text-center">
          <Link href="/founder-story">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold mr-4">
              Read Full Story
            </Button>
          </Link>
          <Link href="/dhg-empire">
            <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20">
              Explore The Empire
            </Button>
          </Link>
        </div>
      </section>

      <UnifiedFooter />
    </div>
  );
}
