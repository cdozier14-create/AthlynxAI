import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import UnifiedNav from "@/components/UnifiedNav";
import UnifiedFooter from "@/components/UnifiedFooter";
import { 
  Brain, Heart, Shield, Users, BookOpen, Video, MessageCircle, 
  Target, Award, Clock, Phone, CheckCircle, Star, Sparkles,
  GraduationCap, Briefcase, Stethoscope, Medal
} from 'lucide-react';

export default function WellnessPortal() {
  const [selectedAudience, setSelectedAudience] = useState<'athletes' | 'executives' | 'military' | 'medical'>('athletes');

  const audiences = [
    { id: 'athletes', label: 'Athletes', icon: Medal, color: 'from-cyan-500 to-blue-500' },
    { id: 'executives', label: 'Executives', icon: Briefcase, color: 'from-purple-500 to-pink-500' },
    { id: 'military', label: 'Military', icon: Shield, color: 'from-green-500 to-emerald-500' },
    { id: 'medical', label: 'Medical Professionals', icon: Stethoscope, color: 'from-red-500 to-rose-500' }
  ];

  const stats = [
    { value: '50K+', label: 'Users Helped', icon: Users },
    { value: '500+', label: 'Courses Available', icon: BookOpen },
    { value: '24/7', label: 'Support Access', icon: Clock },
    { value: '98%', label: 'Satisfaction Rate', icon: Star }
  ];

  const programs = {
    athletes: [
      { title: 'Performance Anxiety Management', description: 'Techniques to manage pre-game nerves and perform under pressure', duration: '8 weeks' },
      { title: 'Career Transition Support', description: 'Mental health support for athletes transitioning out of sports', duration: '12 weeks' },
      { title: 'Injury Recovery Mindset', description: 'Psychological resilience during physical rehabilitation', duration: '6 weeks' },
      { title: 'Team Dynamics & Communication', description: 'Building healthy relationships with coaches and teammates', duration: '4 weeks' }
    ],
    executives: [
      { title: 'Burnout Prevention', description: 'Strategies to maintain peak performance without sacrificing wellbeing', duration: '6 weeks' },
      { title: 'Leadership Under Pressure', description: 'Decision-making and emotional regulation in high-stakes situations', duration: '8 weeks' },
      { title: 'Work-Life Integration', description: 'Creating sustainable boundaries and priorities', duration: '4 weeks' },
      { title: 'Executive Presence', description: 'Confidence, communication, and authentic leadership', duration: '6 weeks' }
    ],
    military: [
      { title: 'PTSD Recovery Program', description: 'Evidence-based treatment for post-traumatic stress', duration: '16 weeks' },
      { title: 'Transition to Civilian Life', description: 'Identity, purpose, and career after service', duration: '12 weeks' },
      { title: 'Family Reconnection', description: 'Rebuilding relationships after deployment', duration: '8 weeks' },
      { title: 'Resilience Training', description: 'Mental toughness and stress inoculation', duration: '6 weeks' }
    ],
    medical: [
      { title: 'Compassion Fatigue Recovery', description: 'Restoring empathy and preventing burnout', duration: '8 weeks' },
      { title: 'Shift Work Wellness', description: 'Sleep, nutrition, and energy management', duration: '4 weeks' },
      { title: 'Critical Incident Debriefing', description: 'Processing traumatic patient experiences', duration: '6 weeks' },
      { title: 'Mindfulness for Healthcare', description: 'Present-moment awareness in clinical settings', duration: '4 weeks' }
    ]
  };

  const features = [
    {
      title: '1-on-1 Counseling',
      description: 'Licensed therapists specializing in your field',
      icon: MessageCircle
    },
    {
      title: 'Video Courses',
      description: 'Self-paced learning modules and workshops',
      icon: Video
    },
    {
      title: 'Peer Support Groups',
      description: 'Connect with others facing similar challenges',
      icon: Users
    },
    {
      title: 'Crisis Hotline',
      description: '24/7 emergency mental health support',
      icon: Phone
    }
  ];

  const currentAudience = audiences.find(a => a.id === selectedAudience)!;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950">
      <UnifiedNav />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        
        <div className="container relative px-4 md:px-5">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 mb-4">
              <Brain className="w-3 h-3 mr-1" /> MENTAL HEALTH & PERFORMANCE
            </Badge>
            
            {/* Brain Icon */}
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse" />
              <div className="relative w-full h-full bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <Brain className="w-12 h-12 text-white" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Wellness & Performance Portal
            </h1>
            <p className="text-xl text-purple-400 mb-6">
              Your Mind is Your Greatest Asset
            </p>
            <p className="text-white/60 max-w-2xl mx-auto mb-8">
              Comprehensive mental health and wellness education for high-performers. 
              Whether you're an athlete, executive, veteran, or healthcare professional, 
              we provide the tools and support you need to thrive.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold">
                <Sparkles className="w-4 h-4 mr-2" /> Start Your Journey
              </Button>
              <Button variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/20">
                <Phone className="w-4 h-4 mr-2" /> Crisis Support
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container px-4 md:px-5 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="bg-white/5 border-purple-500/20">
              <CardContent className="p-6 text-center">
                <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-white/60">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Audience Selector */}
      <section className="container px-4 md:px-5 pb-8">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Choose Your Path</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {audiences.map((audience) => {
            const Icon = audience.icon;
            return (
              <button
                key={audience.id}
                onClick={() => setSelectedAudience(audience.id as typeof selectedAudience)}
                className={`p-4 rounded-xl border transition-all ${
                  selectedAudience === audience.id
                    ? `bg-gradient-to-r ${audience.color} border-transparent`
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <Icon className={`w-8 h-8 mx-auto mb-2 ${selectedAudience === audience.id ? 'text-white' : 'text-purple-400'}`} />
                <p className={`font-bold ${selectedAudience === audience.id ? 'text-white' : 'text-white/80'}`}>
                  {audience.label}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Programs for Selected Audience */}
      <section className="container px-4 md:px-5 pb-16">
        <Card className={`bg-gradient-to-r ${currentAudience.color} bg-opacity-10 border-purple-500/30`}>
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <currentAudience.icon className="w-6 h-6" /> Programs for {currentAudience.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {programs[selectedAudience].map((program, i) => (
                <div key={i} className="bg-slate-900/50 rounded-xl p-4 border border-white/10">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-bold">{program.title}</h3>
                    <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                      {program.duration}
                    </Badge>
                  </div>
                  <p className="text-white/60 text-sm mb-3">{program.description}</p>
                  <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white">
                    Learn More
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Features */}
      <section className="container px-4 md:px-5 pb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-8">How We Support You</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <Card key={i} className="bg-white/5 border-purple-500/20 text-center">
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Crisis Support Banner */}
      <section className="container px-4 md:px-5 pb-16">
        <Card className="bg-gradient-to-r from-red-500/20 to-rose-500/20 border-red-500/30">
          <CardContent className="p-8 text-center">
            <Phone className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Need Immediate Support?</h2>
            <p className="text-white/70 mb-4">
              Our crisis support line is available 24/7. You're not alone.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-red-500 hover:bg-red-400 text-white font-bold">
                <Phone className="w-4 h-4 mr-2" /> Call Now: 1-800-WELLNESS
              </Button>
              <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/20">
                <MessageCircle className="w-4 h-4 mr-2" /> Chat with Counselor
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="container px-4 md:px-5 py-16 border-t border-purple-500/20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Start Your Wellness Journey Today</h2>
          <p className="text-white/60 mb-6">
            Join thousands of high-performers who have transformed their mental health and performance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold">
              <GraduationCap className="w-4 h-4 mr-2" /> Enroll Now
            </Button>
            <Link href="/dhg-empire">
              <Button variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/20">
                Back to DHG Empire
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <UnifiedFooter />
    </div>
  );
}
