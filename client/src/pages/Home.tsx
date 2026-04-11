/**
 * ATHLYNX - The Athlete's Playbook
 * Design Philosophy: Championship Boxing Theme
 * - Bold typography (Bebas Neue, Oswald)
 * - Champion gold & electric cyan accents
 * - Dark navy base with depth and glow effects
 * - Athletic energy with professional polish
 */

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 27,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "athlete" as "athlete" | "parent" | "coach" | "brand",
    sport: "baseball" as "baseball" | "football" | "basketball" | "soccer" | "track" | "volleyball"
  });

  // Countdown timer
  useEffect(() => {
    const launchDate = new Date("2026-02-01T00:00:00").getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;
      
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("VIP spot claimed! Check your email for access code.");
  };

  const apps = [
    { name: "Portal", icon: "🏠", desc: "Social Network" },
    { name: "Messenger", icon: "💬", desc: "Secure Messaging" },
    { name: "Diamond Grind", icon: "⚾", desc: "Baseball Recruiting" },
    { name: "Warriors Playbook", icon: "🏈", desc: "Training & Development" },
    { name: "Transfer Portal", icon: "🔄", desc: "NCAA Transfers" },
    { name: "NIL Vault", icon: "💰", desc: "Deal Management" },
    { name: "AI Sales", icon: "🤝", desc: "Brand Partnerships" },
    { name: "Faith", icon: "✝️", desc: "Faith Community" },
    { name: "AI Recruiter", icon: "🤖", desc: "24/7 Automation" },
    { name: "AI Content", icon: "📱", desc: "Content Generation" }
  ];

  return (
    <div className="min-h-screen bg-champion-gradient">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl md:text-4xl text-champion-gradient">ATHLYNX</h1>
              <p className="text-xs text-muted-foreground">THE ATHLETE'S PLAYBOOK</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="hidden sm:inline-flex">
                Founders
              </Button>
              <Button className="bg-gold-gradient text-background font-bold">
                Portal Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/champion-hero.jpg" 
            alt="Champion" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background"></div>
        </div>

        <div className="container relative z-10">
          {/* Status Badge */}
          <div className="flex justify-center mb-8">
            <div className="glass px-6 py-3 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">LIVE PLATFORM • HIPAA-compliant • Protecting our precious cargo</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center max-w-5xl mx-auto mb-12">
            <div className="mb-4">
              <span className="text-sm font-bold text-primary tracking-wider">THE FUTURE OF ATHLETE SUCCESS</span>
            </div>
            <h2 className="font-display text-6xl md:text-8xl lg:text-9xl mb-6 text-champion-gradient leading-none">
              🏆 HEAVYWEIGHT<br/>CHAMPION<br/>OF THE WORLD 🏆
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              The complete athlete ecosystem. 10 powerful apps. One platform. Unlimited potential.
            </p>
          </div>

          {/* Dozier Holdings Group Badge */}
          <div className="text-center mb-12">
            <Card className="inline-block glass p-8">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gold-gradient rounded-full flex items-center justify-center text-4xl">
                  🦀
                </div>
                <h3 className="font-display text-3xl mb-2">DOZIER HOLDINGS GROUP</h3>
                <p className="text-primary font-bold">THE UNDEFEATED CHAMPION</p>
                <div className="flex justify-center gap-8 mt-6">
                  <div className="text-center">
                    <div className="text-4xl mb-1">∞</div>
                    <div className="text-xs text-muted-foreground">UNDEFEATED</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-1">🥊</div>
                    <div className="text-xs text-muted-foreground">KNOCKOUTS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-1">👑</div>
                    <div className="text-xs text-muted-foreground">CHAMPION</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 10 Apps Grid */}
      <section className="py-20 bg-background/50">
        <div className="container">
          <div className="text-center mb-12">
            <h3 className="font-display text-5xl mb-4">THE COMPLETE ATHLETE ECOSYSTEM</h3>
            <p className="text-xl text-muted-foreground">10 Powerful Apps. One Platform. Unlimited Potential.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {apps.map((app, idx) => (
              <Card 
                key={idx}
                className="glass p-6 hover:glow-cyan transition-all duration-300 cursor-pointer group"
              >
                <div className="text-center">
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{app.icon}</div>
                  <h4 className="font-bold mb-1">{app.name}</h4>
                  <p className="text-xs text-muted-foreground">{app.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Registration Section */}
      <section className="py-20">
        <div className="container">
          <Card className="max-w-2xl mx-auto glass p-8 md:p-12 glow-gold">
            <div className="text-center mb-8">
              <h3 className="font-display text-5xl mb-4 text-champion-gradient">VIP EARLY ACCESS</h3>
              <p className="text-2xl font-bold text-primary mb-2">6 MONTHS FREE</p>
              <p className="text-muted-foreground">LAUNCHING IN</p>
            </div>

            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="text-center">
                <div className="bg-gold-gradient text-background rounded-lg p-4 mb-2">
                  <div className="text-4xl font-display">{timeLeft.days}</div>
                </div>
                <div className="text-xs text-muted-foreground">DAYS</div>
              </div>
              <div className="text-center">
                <div className="bg-gold-gradient text-background rounded-lg p-4 mb-2">
                  <div className="text-4xl font-display">{timeLeft.hours}</div>
                </div>
                <div className="text-xs text-muted-foreground">HRS</div>
              </div>
              <div className="text-center">
                <div className="bg-gold-gradient text-background rounded-lg p-4 mb-2">
                  <div className="text-4xl font-display">{timeLeft.minutes}</div>
                </div>
                <div className="text-xs text-muted-foreground">MIN</div>
              </div>
              <div className="text-center">
                <div className="bg-gold-gradient text-background rounded-lg p-4 mb-2">
                  <div className="text-4xl font-display">{timeLeft.seconds}</div>
                </div>
                <div className="text-xs text-muted-foreground">SEC</div>
              </div>
            </div>

            <div className="text-center mb-8">
              <p className="text-sm font-bold">FEBRUARY 1, 2026</p>
              <p className="text-xs text-muted-foreground">FOUNDING MEMBER SPOTS LIMITED TO 10,000</p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="fullName">FULL NAME *</Label>
                <Input 
                  id="fullName"
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  required
                  className="bg-background/50"
                />
              </div>

              <div>
                <Label htmlFor="email">EMAIL ADDRESS *</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="bg-background/50"
                />
              </div>

              <div>
                <Label htmlFor="phone">PHONE NUMBER *</Label>
                <Input 
                  id="phone"
                  type="tel"
                  placeholder="Phone Number (Required)"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  className="bg-background/50"
                />
              </div>

              <div>
                <Label>I AM A...</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {["athlete", "parent", "coach", "brand"].map((role) => (
                    <Button
                      key={role}
                      type="button"
                      variant={formData.role === role ? "default" : "outline"}
                      onClick={() => setFormData({...formData, role: role as any})}
                      className={formData.role === role ? "bg-gold-gradient text-background" : ""}
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label>PRIMARY SPORT</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {["baseball", "football", "basketball", "soccer", "track", "volleyball"].map((sport) => (
                    <Button
                      key={sport}
                      type="button"
                      variant={formData.sport === sport ? "default" : "outline"}
                      onClick={() => setFormData({...formData, sport: sport as any})}
                      className={formData.sport === sport ? "bg-cyan-gradient text-background" : ""}
                      size="sm"
                    >
                      {sport.charAt(0).toUpperCase() + sport.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full bg-gold-gradient text-background font-bold text-lg py-6 glow-gold">
                CLAIM MY VIP SPOT
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                No credit card required. By signing up, you agree to receive updates about ATHLYNX.
              </p>

              <p className="text-center text-sm font-medium">
                Join athletes from 500+ schools already on the waitlist<br/>
                <span className="text-primary">SEC • ACC • Big Ten • Big 12 • Pac-12</span>
              </p>
            </form>

            <div className="mt-8 pt-8 border-t border-border/50 text-center">
              <p className="text-sm font-bold mb-4">ALREADY A VIP MEMBER?</p>
              <p className="text-xs text-muted-foreground mb-3">Enter your access code to unlock all 6 apps</p>
              <Button variant="outline" className="w-full">
                ENTER ACCESS CODE
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background/50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <img 
                src="/images/athlete-focus.jpg" 
                alt="Athlete Focus" 
                className="rounded-lg glow-cyan"
              />
            </div>
            <div>
              <h3 className="font-display text-5xl mb-6">BUILT FOR CHAMPIONS</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">✓</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Social Network</h4>
                    <p className="text-muted-foreground">Connect with athletes, coaches, and brands</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-3xl">💰</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">NIL Deals</h4>
                    <p className="text-muted-foreground">Find and manage $25K+ brand partnerships</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-3xl">✓</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Messaging</h4>
                    <p className="text-muted-foreground">Secure, HIPAA-compliant communication</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-3xl">📊</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Analytics</h4>
                    <p className="text-muted-foreground">Track performance and growth metrics</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-3xl">✓</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Compliance</h4>
                    <p className="text-muted-foreground">NCAA-compliant tools and workflows</p>
                  </div>
                </div>
              </div>
              <Button className="mt-8 bg-cyan-gradient text-background font-bold">
                Preview the App →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-background/30">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-display text-2xl mb-4">ATHLYNX</h4>
              <p className="text-sm text-muted-foreground">The Future of Athlete Success</p>
            </div>
            <div>
              <h5 className="font-bold mb-3">Platform</h5>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>VIP Access</div>
                <div>All Apps</div>
                <div>Pricing</div>
              </div>
            </div>
            <div>
              <h5 className="font-bold mb-3">Company</h5>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>DHG Empire</div>
                <div>Team</div>
                <div>Careers</div>
              </div>
            </div>
            <div>
              <h5 className="font-bold mb-3">Contact</h5>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>cdozier14@athlynx.ai</div>
                <div>+1 (601) 498-5282</div>
                <div>athlynx.ai</div>
              </div>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              © 2026 Dozier Holdings Group. All rights reserved. <span className="text-primary font-bold">Dreams Do Come True 2026!</span> 💎
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
