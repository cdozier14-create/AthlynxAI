import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

/**
 * ATHLYNX NIL VALUATION CALCULATOR
 * A DOZIER HOLDINGS GROUP COMPANY
 * Powered by Manus AI
 * 
 * "Everyone is an NIL Commodity" - Chad Allen Dozier Sr.
 */

interface ValuationResult {
  estimatedValue: number;
  lowRange: number;
  highRange: number;
  breakdown: {
    socialMedia: number;
    performance: number;
    marketability: number;
    location: number;
    sport: number;
  };
  recommendations: string[];
}

const SPORTS_MULTIPLIERS: Record<string, number> = {
  football: 1.5,
  basketball: 1.4,
  baseball: 1.2,
  soccer: 1.1,
  volleyball: 1.0,
  softball: 1.0,
  track: 0.9,
  swimming: 0.9,
  tennis: 1.1,
  golf: 1.2,
  hockey: 1.1,
  lacrosse: 1.0,
  wrestling: 0.9,
  gymnastics: 1.1,
  other: 0.8,
};

const DIVISION_MULTIPLIERS: Record<string, number> = {
  "D1 Power 5": 2.0,
  "D1 Group of 5": 1.5,
  "D1 Other": 1.2,
  "D2": 0.8,
  "D3": 0.5,
  "NAIA": 0.4,
  "JUCO": 0.3,
  "High School": 0.2,
};

export default function NILCalculator() {
  const [formData, setFormData] = useState({
    name: "",
    sport: "football",
    division: "D1 Power 5",
    position: "",
    instagramFollowers: "",
    tiktokFollowers: "",
    twitterFollowers: "",
    youtubeSubscribers: "",
    engagementRate: "3",
    gpa: "3.0",
    isStarter: true,
    isAllConference: false,
    isAllAmerican: false,
    hasMediaTraining: false,
    state: "",
  });

  const [result, setResult] = useState<ValuationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateNILValue = () => {
    setIsCalculating(true);
    
    // Simulate AI calculation
    setTimeout(() => {
      const instagram = parseInt(formData.instagramFollowers) || 0;
      const tiktok = parseInt(formData.tiktokFollowers) || 0;
      const twitter = parseInt(formData.twitterFollowers) || 0;
      const youtube = parseInt(formData.youtubeSubscribers) || 0;
      const engagement = parseFloat(formData.engagementRate) || 3;
      
      // Social Media Value (base: $0.01 per follower, adjusted by engagement)
      const totalFollowers = instagram + tiktok + twitter + youtube;
      const engagementMultiplier = engagement / 3; // 3% is average
      const socialMediaValue = totalFollowers * 0.01 * engagementMultiplier;
      
      // Sport & Division Multiplier
      const sportMultiplier = SPORTS_MULTIPLIERS[formData.sport] || 1;
      const divisionMultiplier = DIVISION_MULTIPLIERS[formData.division] || 1;
      
      // Performance Bonuses
      let performanceBonus = 0;
      if (formData.isStarter) performanceBonus += 5000;
      if (formData.isAllConference) performanceBonus += 15000;
      if (formData.isAllAmerican) performanceBonus += 50000;
      
      // Marketability Bonus
      let marketabilityBonus = 0;
      if (formData.hasMediaTraining) marketabilityBonus += 2500;
      if (parseFloat(formData.gpa) >= 3.5) marketabilityBonus += 2500;
      
      // Base calculation
      const baseValue = (socialMediaValue + performanceBonus + marketabilityBonus) * sportMultiplier * divisionMultiplier;
      
      // Add minimum floor based on division
      const minimumValue = formData.division.includes("D1") ? 5000 : 1000;
      const estimatedValue = Math.max(baseValue, minimumValue);
      
      // Calculate ranges
      const lowRange = estimatedValue * 0.7;
      const highRange = estimatedValue * 1.5;
      
      // Generate recommendations
      const recommendations: string[] = [];
      if (totalFollowers < 10000) {
        recommendations.push("🚀 Grow your social media presence to 10K+ followers to significantly increase your NIL value");
      }
      if (engagement < 3) {
        recommendations.push("💬 Improve engagement by posting consistently and interacting with followers");
      }
      if (!formData.hasMediaTraining) {
        recommendations.push("🎤 Consider media training to improve brand partnership opportunities");
      }
      if (!formData.isAllConference && formData.isStarter) {
        recommendations.push("🏆 Aim for All-Conference honors to boost your value by $15K+");
      }
      if (parseFloat(formData.gpa) < 3.5) {
        recommendations.push("📚 Maintain a 3.5+ GPA to unlock academic-focused brand deals");
      }
      recommendations.push("📱 Create content showcasing your personality - brands want authentic athletes");
      recommendations.push("🤝 Partner with ATHLYNX to connect with verified brand opportunities");
      
      setResult({
        estimatedValue: Math.round(estimatedValue),
        lowRange: Math.round(lowRange),
        highRange: Math.round(highRange),
        breakdown: {
          socialMedia: Math.round(socialMediaValue * sportMultiplier * divisionMultiplier),
          performance: Math.round(performanceBonus * sportMultiplier * divisionMultiplier),
          marketability: Math.round(marketabilityBonus * sportMultiplier * divisionMultiplier),
          location: Math.round(estimatedValue * 0.1),
          sport: Math.round(estimatedValue * (sportMultiplier - 1)),
        },
        recommendations,
      });
      
      setIsCalculating(false);
      toast.success("NIL Valuation Complete! 🎉");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl p-2">
                <span className="text-2xl">💰</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">ATHLYNX</h1>
                <p className="text-green-400 text-xs">NIL CALCULATOR</p>
              </div>
            </div>
          </Link>
          <Link href="/">
            <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10">
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 text-center px-4">
        <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-4">
          POWERED BY MANUS AI
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            NIL Valuation Calculator
          </span>
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Discover your true market value. Our AI analyzes your social presence, performance, and marketability.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <span className="text-2xl">📊</span> Your Information
              </CardTitle>
              <CardDescription className="text-slate-400">
                Enter your details for an accurate valuation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Position</Label>
                  <Input
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="e.g., Quarterback"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>

              {/* Sport & Division */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Sport</Label>
                  <select
                    value={formData.sport}
                    onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded-md p-2"
                  >
                    {Object.keys(SPORTS_MULTIPLIERS).map((sport) => (
                      <option key={sport} value={sport}>
                        {sport.charAt(0).toUpperCase() + sport.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label className="text-slate-300">Division</Label>
                  <select
                    value={formData.division}
                    onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded-md p-2"
                  >
                    {Object.keys(DIVISION_MULTIPLIERS).map((div) => (
                      <option key={div} value={div}>{div}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <Label className="text-slate-300 text-lg mb-2 block">📱 Social Media Following</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-400 text-sm">Instagram</Label>
                    <Input
                      type="number"
                      value={formData.instagramFollowers}
                      onChange={(e) => setFormData({ ...formData, instagramFollowers: e.target.value })}
                      placeholder="0"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">TikTok</Label>
                    <Input
                      type="number"
                      value={formData.tiktokFollowers}
                      onChange={(e) => setFormData({ ...formData, tiktokFollowers: e.target.value })}
                      placeholder="0"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">Twitter/X</Label>
                    <Input
                      type="number"
                      value={formData.twitterFollowers}
                      onChange={(e) => setFormData({ ...formData, twitterFollowers: e.target.value })}
                      placeholder="0"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">YouTube</Label>
                    <Input
                      type="number"
                      value={formData.youtubeSubscribers}
                      onChange={(e) => setFormData({ ...formData, youtubeSubscribers: e.target.value })}
                      placeholder="0"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <Label className="text-slate-400 text-sm">Engagement Rate (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.engagementRate}
                    onChange={(e) => setFormData({ ...formData, engagementRate: e.target.value })}
                    placeholder="3.0"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>

              {/* Performance */}
              <div>
                <Label className="text-slate-300 text-lg mb-2 block">🏆 Performance</Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isStarter}
                      onChange={(e) => setFormData({ ...formData, isStarter: e.target.checked })}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-slate-300">Starter</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isAllConference}
                      onChange={(e) => setFormData({ ...formData, isAllConference: e.target.checked })}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-slate-300">All-Conference</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isAllAmerican}
                      onChange={(e) => setFormData({ ...formData, isAllAmerican: e.target.checked })}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-slate-300">All-American</span>
                  </label>
                </div>
              </div>

              {/* Academics */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">GPA</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="4.0"
                    value={formData.gpa}
                    onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                    placeholder="3.0"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer pb-2">
                    <input
                      type="checkbox"
                      checked={formData.hasMediaTraining}
                      onChange={(e) => setFormData({ ...formData, hasMediaTraining: e.target.checked })}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-slate-300">Media Training</span>
                  </label>
                </div>
              </div>

              <Button
                onClick={calculateNILValue}
                disabled={isCalculating}
                className="w-full py-6 text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400"
              >
                {isCalculating ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⚙️</span> Calculating...
                  </span>
                ) : (
                  "Calculate My NIL Value 💰"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {result ? (
              <>
                {/* Main Value */}
                <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/50">
                  <CardContent className="p-8 text-center">
                    <p className="text-green-400 text-sm font-bold mb-2">YOUR ESTIMATED NIL VALUE</p>
                    <h2 className="text-6xl font-black text-white mb-2">
                      ${result.estimatedValue.toLocaleString()}
                    </h2>
                    <p className="text-slate-400">
                      Range: ${result.lowRange.toLocaleString()} - ${result.highRange.toLocaleString()}
                    </p>
                  </CardContent>
                </Card>

                {/* Breakdown */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">📊 Value Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Social Media Value</span>
                      <span className="text-green-400 font-bold">${result.breakdown.socialMedia.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Performance Bonus</span>
                      <span className="text-cyan-400 font-bold">${result.breakdown.performance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Marketability</span>
                      <span className="text-purple-400 font-bold">${result.breakdown.marketability.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Sport Premium</span>
                      <span className="text-yellow-400 font-bold">${result.breakdown.sport.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">🚀 Recommendations to Increase Value</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-slate-300 text-sm">{rec}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* CTA */}
                <Card className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border-cyan-500/30">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-2">Ready to Monetize Your Value?</h3>
                    <p className="text-slate-400 mb-4">Join ATHLYNX and connect with brands looking for athletes like you.</p>
                    <Link href="/pricing">
                      <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400">
                        Get Started Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="bg-slate-800/50 border-slate-700 h-full flex items-center justify-center">
                <CardContent className="text-center py-20">
                  <span className="text-6xl mb-4 block">💰</span>
                  <h3 className="text-2xl font-bold text-white mb-2">Enter Your Details</h3>
                  <p className="text-slate-400">Fill out the form to see your estimated NIL value</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8 text-center">
        <p className="text-slate-500 text-sm">
          A Dozier Holdings Group Company • Powered by Manus AI
        </p>
        <p className="text-slate-600 text-xs mt-2">
          "Everyone is an NIL Commodity" - Chad Allen Dozier Sr.
        </p>
      </footer>
    </div>
  );
}
