import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UnifiedNav from "@/components/UnifiedNav";
import UnifiedFooter from "@/components/UnifiedFooter";
import { 
  Apple, 
  Smartphone,
  Download,
  Star,
  Shield,
  Check,
  Globe,
  Users,
  Trophy,
  Heart,
  Zap,
  Camera,
  MessageSquare,
  Bell,
  Lock,
  FileText,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export default function AppStoreSubmission() {
  const appInfo = {
    name: "ATHLYNX - NIL Portal",
    subtitle: "The Complete Athlete Ecosystem",
    version: "1.0.0",
    category: "Sports",
    ageRating: "12+",
    size: "85 MB",
    languages: ["English", "Spanish", "French", "German", "Portuguese", "Chinese"],
    developer: "NPI, Inc. (A Dozier Holdings Group Company)",
    website: "https://athlynx.com",
    support: "support@athlynx.com",
    privacy: "https://athlynx.com/privacy"
  };

  const screenshots = [
    { title: "Home Dashboard", desc: "Your personalized athlete command center" },
    { title: "NIL Marketplace", desc: "Connect with brands and manage deals" },
    { title: "Training Programs", desc: "AI-powered workout recommendations" },
    { title: "Secure Messaging", desc: "Encrypted communication with coaches and brands" },
    { title: "Medical Vault", desc: "HIPAA-compliant health records" },
    { title: "Analytics", desc: "Track your performance and growth" }
  ];

  const features = [
    {
      icon: Trophy,
      title: "NIL Deal Management",
      desc: "Find, negotiate, and manage brand partnerships all in one place"
    },
    {
      icon: MessageSquare,
      title: "Secure Messaging",
      desc: "End-to-end encrypted communication with coaches, agents, and brands"
    },
    {
      icon: Heart,
      title: "Medical Records Vault",
      desc: "HIPAA-compliant storage for your health and injury records"
    },
    {
      icon: Zap,
      title: "AI Training Bot",
      desc: "Personalized workout plans based on your sport and goals"
    },
    {
      icon: Shield,
      title: "Compliance Tools",
      desc: "Stay NCAA compliant with automatic disclosure reporting"
    },
    {
      icon: Globe,
      title: "Transfer Portal",
      desc: "Explore transfer opportunities with AI-powered matching"
    }
  ];

  const reviews = [
    {
      name: "Marcus J.",
      rating: 5,
      title: "Game changer for college athletes",
      review: "Finally an app that understands what we need. The NIL marketplace alone has helped me land 3 deals!",
      date: "Dec 15, 2024"
    },
    {
      name: "Sarah T.",
      rating: 5,
      title: "Best recruiting tool out there",
      review: "The transfer portal feature helped me find my perfect school. The AI matching is incredibly accurate.",
      date: "Dec 10, 2024"
    },
    {
      name: "Coach Williams",
      rating: 5,
      title: "Essential for modern recruiting",
      review: "We use ATHLYNX for all our recruiting. The compliance features give us peace of mind.",
      date: "Dec 5, 2024"
    }
  ];

  const releaseNotes = [
    { version: "1.0.0", date: "Dec 2024", notes: "Initial release with NIL Portal, Messaging, Training, and Medical Vault" },
    { version: "1.1.0", date: "Jan 2025", notes: "Added Transfer Portal Intelligence and AI Training Bot" },
    { version: "1.2.0", date: "Feb 2025", notes: "White-label sport apps: Diamond Grind, Court Kings, and more" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <UnifiedNav />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        
        <div className="container relative px-4 md:px-5">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 mb-4">
              <Smartphone className="w-3 h-3 mr-1" /> AVAILABLE ON ALL PLATFORMS
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
              Download
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                ATHLYNX
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 mb-8">
              The Operating System for Athletes. From youth sports to the pros.
              Every data point. Every medical record. Every NIL deal. One platform.
            </p>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Button className="bg-black hover:bg-gray-900 text-white font-bold px-8 py-6 rounded-xl border border-white/20">
                <Apple className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <p className="text-xs text-white/60">Download on the</p>
                  <p className="text-lg font-bold">App Store</p>
                </div>
              </Button>
              <Button className="bg-black hover:bg-gray-900 text-white font-bold px-8 py-6 rounded-xl border border-white/20">
                <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="text-left">
                  <p className="text-xs text-white/60">GET IT ON</p>
                  <p className="text-lg font-bold">Google Play</p>
                </div>
              </Button>
            </div>

            {/* App Info */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/50">
              <span>Version {appInfo.version}</span>
              <span>•</span>
              <span>{appInfo.size}</span>
              <span>•</span>
              <span>{appInfo.ageRating}</span>
              <span>•</span>
              <span>{appInfo.category}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="container px-4 md:px-5 pb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Screenshots</h2>
        <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory">
          {screenshots.map((screen, i) => (
            <div key={i} className="flex-shrink-0 w-64 snap-center">
              <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl aspect-[9/16] flex items-center justify-center border border-white/10 mb-2">
                <div className="text-center p-4">
                  <Camera className="w-12 h-12 text-white/30 mx-auto mb-2" />
                  <p className="text-white/50 text-sm">{screen.title}</p>
                </div>
              </div>
              <p className="text-white/60 text-sm text-center">{screen.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 md:px-5 pb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <Card key={i} className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tabs Section */}
      <section className="container px-4 md:px-5 pb-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="flex flex-wrap justify-center bg-white/5 border border-white/10 rounded-xl p-1 mb-8 gap-1">
            <TabsTrigger value="description" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
              Description
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
              Reviews
            </TabsTrigger>
            <TabsTrigger value="whats-new" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
              What's New
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
              Privacy
            </TabsTrigger>
          </TabsList>

          {/* Description Tab */}
          <TabsContent value="description">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-white mb-4">About ATHLYNX</h3>
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/70 mb-4">
                    ATHLYNX is the complete athlete ecosystem - a revolutionary platform designed to support 
                    athletes from youth sports through professional careers and beyond. Whether you're a 
                    high school prospect building your brand, a college athlete navigating NIL opportunities, 
                    or a pro managing your career, ATHLYNX has you covered.
                  </p>
                  
                  <h4 className="text-white font-semibold mt-6 mb-3">Key Features:</h4>
                  <ul className="text-white/70 space-y-2">
                    <li>• <strong>NIL Marketplace:</strong> Connect with brands, negotiate deals, and manage contracts</li>
                    <li>• <strong>Secure Messaging:</strong> End-to-end encrypted communication with coaches, agents, and brands</li>
                    <li>• <strong>Medical Records Vault:</strong> HIPAA-compliant storage for health records</li>
                    <li>• <strong>AI Training Bot:</strong> Personalized workout plans based on your sport and goals</li>
                    <li>• <strong>Transfer Portal:</strong> AI-powered matching for transfer opportunities</li>
                    <li>• <strong>Compliance Tools:</strong> Stay NCAA compliant with automatic disclosure reporting</li>
                    <li>• <strong>Career Portal:</strong> Job opportunities for athletes transitioning out of sports</li>
                  </ul>

                  <h4 className="text-white font-semibold mt-6 mb-3">White-Label Sport Apps:</h4>
                  <ul className="text-white/70 space-y-2">
                    <li>• Diamond Grind (Baseball)</li>
                    <li>• Court Kings (Basketball)</li>
                    <li>• Gridiron Nexus (Football)</li>
                    <li>• Pitch Pulse (Soccer)</li>
                    <li>• Reel Masters (Fishing)</li>
                    <li>• Hunt Pro (Hunting)</li>
                    <li>• Fairway Elite (Golf)</li>
                    <li>• And many more...</li>
                  </ul>

                  <h4 className="text-white font-semibold mt-6 mb-3">Subscription Tiers:</h4>
                  <ul className="text-white/70 space-y-2">
                    <li>• <strong>Foundation (Ages 3-13):</strong> $49.99 one-time</li>
                    <li>• <strong>Prospect (High School):</strong> $9.99/month</li>
                    <li>• <strong>NIL Athlete (College):</strong> 5% of deals</li>
                    <li>• <strong>Pro (Professional):</strong> $499/month</li>
                    <li>• <strong>Legacy (Retired):</strong> $29.99/month</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <div className="space-y-4">
              <Card className="bg-white/5 border-white/10 mb-6">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-4xl font-bold text-white">4.9</p>
                    <div className="flex gap-1 my-2">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-white/50 text-sm">Based on 2,847 reviews</p>
                  </div>
                  <Button className="bg-cyan-500 hover:bg-cyan-400 text-white">
                    Write a Review
                  </Button>
                </CardContent>
              </Card>

              {reviews.map((review, i) => (
                <Card key={i} className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-white font-semibold">{review.name}</p>
                        <p className="text-white/50 text-sm">{review.date}</p>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(review.rating)].map((_, j) => (
                          <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <h4 className="text-white font-semibold mb-2">{review.title}</h4>
                    <p className="text-white/60">{review.review}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* What's New Tab */}
          <TabsContent value="whats-new">
            <div className="space-y-4">
              {releaseNotes.map((release, i) => (
                <Card key={i} className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-cyan-500/20 text-cyan-400">v{release.version}</Badge>
                      <span className="text-white/50 text-sm">{release.date}</span>
                    </div>
                    <p className="text-white/70">{release.notes}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-white mb-4">App Privacy</h3>
                <p className="text-white/70 mb-6">
                  The developer, NPI, Inc., indicated that the app's privacy practices may include 
                  handling of data as described below. For more information, see the developer's 
                  privacy policy.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-cyan-400" />
                      Data Used to Track You
                    </h4>
                    <p className="text-white/50 text-sm mb-2">The following data may be used to track you across apps and websites owned by other companies:</p>
                    <ul className="text-white/60 text-sm space-y-1">
                      <li>• Identifiers</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Users className="w-5 h-5 text-cyan-400" />
                      Data Linked to You
                    </h4>
                    <p className="text-white/50 text-sm mb-2">The following data may be collected and linked to your identity:</p>
                    <ul className="text-white/60 text-sm space-y-1">
                      <li>• Contact Info</li>
                      <li>• Health & Fitness</li>
                      <li>• Financial Info</li>
                      <li>• User Content</li>
                      <li>• Identifiers</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex flex-wrap gap-4">
                    {[
                      { icon: Shield, label: "NCAA Compliant" },
                      { icon: Lock, label: "AES-256 Encryption" },
                      { icon: FileText, label: "SOC 2 Type II" },
                      { icon: Heart, label: "HIPAA Compliant" }
                    ].map((badge, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5">
                        <badge.icon className="w-4 h-4 text-green-400" />
                        <span className="text-white/70 text-sm">{badge.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <Link href="/legal">
                    <Button variant="outline" className="border-cyan-500/50 text-cyan-400">
                      View Full Privacy Policy <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Developer Info */}
      <section className="container px-4 md:px-5 pb-16">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Developer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/50">Developer</span>
                  <span className="text-white">{appInfo.developer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Website</span>
                  <a href={appInfo.website} className="text-cyan-400 hover:underline">{appInfo.website}</a>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Support</span>
                  <a href={`mailto:${appInfo.support}`} className="text-cyan-400 hover:underline">{appInfo.support}</a>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/50">Category</span>
                  <span className="text-white">{appInfo.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Age Rating</span>
                  <span className="text-white">{appInfo.ageRating}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Languages</span>
                  <span className="text-white">{appInfo.languages.length} languages</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container px-4 md:px-5 py-16 border-t border-white/10">
        <div className="bg-gradient-to-r from-cyan-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Athletic Career?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of athletes already using ATHLYNX to manage their NIL deals, 
            training, and career opportunities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-cyan-600 font-bold px-8 py-3 hover:bg-gray-100">
              <Apple className="w-5 h-5 mr-2" /> Download for iOS
            </Button>
            <Button className="bg-white text-cyan-600 font-bold px-8 py-3 hover:bg-gray-100">
              <Smartphone className="w-5 h-5 mr-2" /> Download for Android
            </Button>
          </div>
        </div>
      </section>

      <UnifiedFooter />
    </div>
  );
}
