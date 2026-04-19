import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Trophy, DollarSign, Search, Filter, TrendingUp, Users, Star, Building2, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function NILMarketplace() {
  const [searchQuery, setSearchQuery] = useState("");

  const nilDeals = [
    {
      id: 1,
      brand: "Nike",
      category: "Apparel",
      value: "$5,000 - $15,000",
      type: "Social Media Campaign",
      requirements: "10K+ followers, D1 athlete",
      deadline: "Jan 15, 2025",
      featured: true
    },
    {
      id: 2,
      brand: "Gatorade",
      category: "Nutrition",
      value: "$3,000 - $8,000",
      type: "Product Endorsement",
      requirements: "5K+ followers, Any division",
      deadline: "Jan 30, 2025",
      featured: true
    },
    {
      id: 3,
      brand: "Local Auto Dealership",
      category: "Automotive",
      value: "$2,000 - $5,000",
      type: "Appearance + Social",
      requirements: "Local athlete, 2K+ followers",
      deadline: "Feb 10, 2025",
      featured: false
    },
    {
      id: 4,
      brand: "Campus Protein",
      category: "Nutrition",
      value: "$1,000 - $3,000",
      type: "Affiliate Program",
      requirements: "Any athlete, 1K+ followers",
      deadline: "Ongoing",
      featured: false
    },
    {
      id: 5,
      brand: "Fanatics",
      category: "Merchandise",
      value: "$4,000 - $10,000",
      type: "Merchandise Line",
      requirements: "5K+ followers, Strong brand",
      deadline: "Feb 1, 2025",
      featured: true
    },
    {
      id: 6,
      brand: "Local Restaurant Chain",
      category: "Food & Beverage",
      value: "$1,500 - $4,000",
      type: "Social Media + Appearances",
      requirements: "Local athlete, Any followers",
      deadline: "Jan 20, 2025",
      featured: false
    }
  ];

  const categories = [
    { name: "All", count: nilDeals.length },
    { name: "Apparel", count: 12 },
    { name: "Nutrition", count: 18 },
    { name: "Technology", count: 8 },
    { name: "Automotive", count: 6 },
    { name: "Food & Beverage", count: 15 },
    { name: "Local Businesses", count: 24 }
  ];

  const stats = [
    { icon: <DollarSign className="h-6 w-6" />, value: "$5M+", label: "Total NIL Value" },
    { icon: <Building2 className="h-6 w-6" />, value: "500+", label: "Active Brands" },
    { icon: <Users className="h-6 w-6" />, value: "10K+", label: "Athletes Earning" },
    { icon: <TrendingUp className="h-6 w-6" />, value: "85%", label: "Success Rate" }
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
            <Link href="/playbook" className="text-sm font-medium hover:text-primary transition-colors">
              Athlete Playbook
            </Link>
            <Link href="/transfer-portal" className="text-sm font-medium hover:text-primary transition-colors">
              Transfer Portal
            </Link>
            <Link href="/nil-marketplace" className="text-sm font-medium text-primary">
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
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Star className="h-4 w-4" />
            Discover Your Next Opportunity
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            NIL <span className="text-primary">Marketplace</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with brands looking for athletes like you. Browse hundreds of NIL opportunities, 
            from major national brands to local businesses. Your talent has value - let's monetize it.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/30 py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center gap-3 text-center">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="container py-12">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search brands, categories, or deal types..."
              className="pl-10 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button size="lg" variant="outline" className="gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </Button>
        </div>
      </section>

      {/* Categories */}
      <section className="container pb-12">
        <div className="flex flex-wrap gap-3">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={index === 0 ? "default" : "outline"}
              className="gap-2"
            >
              {category.name}
              <Badge variant="secondary" className="ml-1">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>
      </section>

      {/* Featured Deals */}
      <section className="container pb-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Featured Opportunities</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nilDeals.filter(deal => deal.featured).map((deal) => (
              <Card key={deal.id} className="border-2 border-primary hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                    <Badge variant="outline">{deal.category}</Badge>
                  </div>
                  <CardTitle className="text-2xl">{deal.brand}</CardTitle>
                  <CardDescription className="text-base">{deal.type}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Value</span>
                    <span className="text-lg font-bold text-primary">{deal.value}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{deal.requirements}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Deadline:</span>
                      <span className="font-medium">{deal.deadline}</span>
                    </div>
                  </div>
                  <Button className="w-full">
                    Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Opportunities */}
      <section className="container pb-24">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">All Opportunities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nilDeals.filter(deal => !deal.featured).map((deal) => (
              <Card key={deal.id} className="border-2 hover:border-primary hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline">{deal.category}</Badge>
                  </div>
                  <CardTitle className="text-xl">{deal.brand}</CardTitle>
                  <CardDescription>{deal.type}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Value</span>
                    <span className="font-bold text-primary">{deal.value}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{deal.requirements}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Deadline:</span>
                      <span className="font-medium">{deal.deadline}</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 py-24">
        <div className="container space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Getting started with NIL deals is easy. Follow these simple steps to start earning.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center font-bold text-2xl mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold">Create Profile</h3>
              <p className="text-muted-foreground">
                Build your athlete profile with stats, highlights, and social media presence
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center font-bold text-2xl mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold">Browse Deals</h3>
              <p className="text-muted-foreground">
                Explore opportunities that match your profile, interests, and follower count
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center font-bold text-2xl mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold">Apply & Connect</h3>
              <p className="text-muted-foreground">
                Submit applications and connect directly with brands through our platform
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center font-bold text-2xl mx-auto">
                4
              </div>
              <h3 className="text-xl font-semibold">Get Paid</h3>
              <p className="text-muted-foreground">
                Complete the deal requirements and receive payment through our secure system
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <div className="bg-primary text-primary-foreground rounded-2xl p-12 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to Start Earning?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of athletes who are already monetizing their name, image, and likeness 
            through Athlynx. Your next deal is waiting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Create Free Profile <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
              Browse All Deals
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
