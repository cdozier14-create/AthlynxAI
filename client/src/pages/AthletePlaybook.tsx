import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Camera, Users, TrendingUp, Calendar, Target, Star, MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function AthletePlaybook() {
  const playbookSections = [
    {
      icon: <Camera className="h-6 w-6" />,
      title: "Build Your Media Presence",
      description: "Create a compelling digital profile that showcases your athletic achievements, highlights, and personality.",
      strategies: [
        "Professional highlight reel creation and optimization",
        "Social media strategy for athlete branding",
        "Content calendar for consistent posting",
        "Engagement tactics to grow your following",
        "Platform-specific best practices (Instagram, TikTok, X)"
      ]
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Boost Recruiting Visibility",
      description: "Get noticed by coaches and scouts with strategic positioning and proactive outreach.",
      strategies: [
        "Optimize your athletic profile for recruiter searches",
        "Showcase statistics and achievements effectively",
        "Create compelling recruiting videos",
        "Target schools that match your talent level",
        "Follow up strategies that get responses"
      ]
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Connect Globally",
      description: "Build a network of athletes, coaches, and mentors who can help advance your career.",
      strategies: [
        "Join sport-specific athlete communities",
        "Participate in virtual camps and showcases",
        "Connect with athletes at target schools",
        "Build relationships with coaches and scouts",
        "Leverage alumni networks for introductions"
      ]
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Share Your Schedule",
      description: "Make it easy for recruiters to see you compete by sharing your game and event schedule.",
      strategies: [
        "Maintain an up-to-date competition calendar",
        "Share showcase and camp attendance",
        "Invite recruiters to key games",
        "Post game results and highlights promptly",
        "Track recruiter attendance and follow-ups"
      ]
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Compare Recruiting Efforts",
      description: "Learn from other athletes' successes and benchmark your progress against peers.",
      strategies: [
        "Analyze successful recruiting timelines",
        "Compare offer patterns by sport and position",
        "Learn from athletes who transferred successfully",
        "Understand NIL deal structures at different levels",
        "Identify gaps in your recruiting strategy"
      ]
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Master Communication",
      description: "Communicate effectively with coaches, recruiters, and potential sponsors.",
      strategies: [
        "Craft compelling introduction emails",
        "Follow-up timing and frequency best practices",
        "Phone call preparation and talking points",
        "In-person meeting strategies",
        "Thank you note templates that work"
      ]
    }
  ];

  const successStories = [
    {
      name: "Marcus Johnson",
      sport: "Basketball",
      from: "D2 School",
      to: "D1 Power 5",
      result: "Increased NIL value by 400%",
      quote: "The Athlete Playbook showed me exactly how to position myself for the transfer portal. Within 3 months, I had multiple D1 offers."
    },
    {
      name: "Sarah Chen",
      sport: "Soccer",
      from: "NAIA",
      to: "D1 Mid-Major",
      result: "Secured 3 NIL deals worth $25K",
      quote: "Building my media presence using the strategies in the playbook opened doors I never thought possible."
    },
    {
      name: "Tyler Rodriguez",
      sport: "Baseball",
      from: "JUCO",
      to: "D1 Program",
      result: "Full scholarship + NIL opportunities",
      quote: "The networking strategies helped me connect with coaches who actually wanted to see me play."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Athlynx</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/playbook" className="text-sm font-medium text-primary">
              Athlete Playbook
            </Link>
            <Link href="/transfer-portal" className="text-sm font-medium hover:text-primary transition-colors">
              Transfer Portal
            </Link>
            <Link href="/nil-marketplace" className="text-sm font-medium hover:text-primary transition-colors">
              NIL Marketplace
            </Link>
            <Link href="/messages" className="text-sm font-medium hover:text-primary transition-colors">
              Messages
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">Log In</Button>
            <Button size="sm">Sign Up Free</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Logos Row */}
          <div className="flex justify-center items-center gap-8 mb-8">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/AzsuZOzvfgvscIdI.png" alt="Partnership" className="h-20 w-20 rounded-xl shadow-lg" />
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/AzsuZOzvfgvscIdI.png" alt="Athlete Success" className="h-24 w-24 rounded-xl shadow-lg" />
          </div>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Star className="h-4 w-4" />
            WARRIOR MENTALITY • ALPHA MINDSET • CHAMPION RESULTS
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            The Warrior's <span className="text-primary">Playbook</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master the strategies that top recruits use to boost their recruiting presence, 
            build their media profile, and connect with opportunities worldwide. Your roadmap 
            to athletic success starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg">
              Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              Download Full Playbook (PDF)
            </Button>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="border-y bg-muted/30 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">10x</div>
              <div className="text-sm text-muted-foreground">Increase in Recruiter Visibility</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">5,000+</div>
              <div className="text-sm text-muted-foreground">Athletes Using These Strategies</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">92%</div>
              <div className="text-sm text-muted-foreground">Report Better Recruiting Outcomes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Playbook Sections */}
      <section className="container py-24 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold">Six Pillars of Athletic Success</h2>
          <p className="text-xl text-muted-foreground">
            Each section of the playbook provides actionable strategies you can implement immediately 
            to advance your athletic career.
          </p>
        </div>

        <Tabs defaultValue="media" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto">
            <TabsTrigger value="media" className="flex flex-col gap-1 py-3">
              <Camera className="h-4 w-4" />
              <span className="text-xs">Media</span>
            </TabsTrigger>
            <TabsTrigger value="recruiting" className="flex flex-col gap-1 py-3">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs">Recruiting</span>
            </TabsTrigger>
            <TabsTrigger value="network" className="flex flex-col gap-1 py-3">
              <Users className="h-4 w-4" />
              <span className="text-xs">Network</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex flex-col gap-1 py-3">
              <Calendar className="h-4 w-4" />
              <span className="text-xs">Schedule</span>
            </TabsTrigger>
            <TabsTrigger value="compare" className="flex flex-col gap-1 py-3">
              <Target className="h-4 w-4" />
              <span className="text-xs">Compare</span>
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex flex-col gap-1 py-3">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">Communicate</span>
            </TabsTrigger>
          </TabsList>

          {playbookSections.map((section, index) => (
            <TabsContent key={index} value={["media", "recruiting", "network", "schedule", "compare", "communication"][index]} className="mt-8">
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      {section.icon}
                    </div>
                    <div>
                      <CardTitle className="text-3xl">{section.title}</CardTitle>
                      <CardDescription className="text-base mt-2">{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Key Strategies:</h3>
                    <ul className="space-y-3">
                      {section.strategies.map((strategy, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{strategy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4">
                    <Button>
                      Learn More About This Strategy <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Success Stories */}
      <section className="bg-muted/30 py-24">
        <div className="container space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold">Real Athletes, Real Results</h2>
            <p className="text-xl text-muted-foreground">
              See how athletes like you used the Athlete Playbook to transform their careers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary text-primary-foreground rounded-full h-12 w-12 flex items-center justify-center font-bold text-lg">
                      {story.name.charAt(0)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{story.name}</CardTitle>
                      <CardDescription>{story.sport}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{story.from}</span>
                    <ArrowRight className="h-4 w-4" />
                    <span className="font-semibold text-primary">{story.to}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-primary/10 text-primary px-3 py-2 rounded-md text-sm font-medium">
                    {story.result}
                  </div>
                  <p className="text-sm italic">"{story.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <div className="bg-primary text-primary-foreground rounded-2xl p-12 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to Level Up Your Game?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join Athlynx today and get instant access to the complete Athlete Playbook, 
            plus all the tools you need to execute these strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
              Download Playbook PDF
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Athlynx</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The all-in-one platform for student athletes to manage their careers and maximize their potential.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/playbook" className="hover:text-primary transition-colors">Athlete Playbook</Link></li>
                <li><Link href="/transfer-portal" className="hover:text-primary transition-colors">Transfer Portal</Link></li>
                <li><Link href="/nil-marketplace" className="hover:text-primary transition-colors">NIL Marketplace</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/team" className="hover:text-primary transition-colors">Our Team</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Contact</h3>
              <p className="text-sm text-muted-foreground">
                cdozier@dozierholdingsgroup.com
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Dozier Holdings Group. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
