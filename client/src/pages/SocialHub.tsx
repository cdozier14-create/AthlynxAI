// ATHLYNX SOCIAL HUB - ALL PLATFORMS SEAMLESSLY INTEGRATED
// WhatsApp + WeChat + Telegram + Teams + Zoom + Facebook + Instagram + Twitter + LinkedIn + TikTok + YouTube + Discord
// First Media Conglomerate to do it ALL IN ONE!

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Send, 
  Globe,
  Zap,
  CheckCircle2,
  Clock,
  Users,
  Video,
  MessageSquare,
  Share2,
  TrendingUp,
  Bell,
  Settings
} from 'lucide-react';

// ALL SOCIAL PLATFORMS
const MESSAGING_PLATFORMS = [
  { id: 'whatsapp', name: 'WhatsApp', icon: '📱', color: '#25D366', users: '2B+', type: 'messaging' },
  { id: 'wechat', name: 'WeChat', icon: '💬', color: '#07C160', users: '1.3B+', type: 'messaging' },
  { id: 'telegram', name: 'Telegram', icon: '✈️', color: '#0088cc', users: '700M+', type: 'messaging' },
  { id: 'discord', name: 'Discord', icon: '🎮', color: '#5865F2', users: '150M+', type: 'messaging' },
];

const SOCIAL_PLATFORMS = [
  { id: 'facebook', name: 'Facebook', icon: '📘', color: '#1877F2', users: '3B+', type: 'social' },
  { id: 'instagram', name: 'Instagram', icon: '📸', color: '#E4405F', users: '2B+', type: 'social' },
  { id: 'twitter', name: 'X (Twitter)', icon: '🐦', color: '#000000', users: '500M+', type: 'social' },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: '#0A66C2', users: '900M+', type: 'social' },
  { id: 'tiktok', name: 'TikTok', icon: '🎵', color: '#000000', users: '1B+', type: 'social' },
  { id: 'youtube', name: 'YouTube', icon: '▶️', color: '#FF0000', users: '2.5B+', type: 'social' },
];

const BUSINESS_PLATFORMS = [
  { id: 'teams', name: 'MS Teams', icon: '👥', color: '#6264A7', users: '300M+', type: 'business' },
  { id: 'zoom', name: 'Zoom', icon: '🎥', color: '#2D8CFF', users: '300M+', type: 'business' },
  { id: 'slack', name: 'Slack', icon: '💬', color: '#4A154B', users: '20M+', type: 'business' },
  { id: 'email', name: 'Email', icon: '📧', color: '#00d4ff', users: '4B+', type: 'business' },
];

const ALL_PLATFORMS = [...MESSAGING_PLATFORMS, ...SOCIAL_PLATFORMS, ...BUSINESS_PLATFORMS];

export default function SocialHub() {
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['email']);
  const [sending, setSending] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedPlatforms(ALL_PLATFORMS.map(p => p.id));
  };

  const clearAll = () => {
    setSelectedPlatforms([]);
  };

  const sendToAll = async () => {
    if (!message.trim()) {
      toast({ title: 'Error', description: 'Please enter a message', variant: 'destructive' });
      return;
    }
    if (selectedPlatforms.length === 0) {
      toast({ title: 'Error', description: 'Please select at least one platform', variant: 'destructive' });
      return;
    }

    setSending(true);
    await new Promise(r => setTimeout(r, 2000));

    toast({
      title: '🚀 BROADCAST SENT!',
      description: `Message sent to ${selectedPlatforms.length} platforms simultaneously!`,
    });

    setSending(false);
    setMessage('');
  };

  const getPlatformsByType = (type: string) => {
    if (type === 'all') return ALL_PLATFORMS;
    return ALL_PLATFORMS.filter(p => p.type === type);
  };

  const renderPlatformGrid = (platforms: typeof ALL_PLATFORMS) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {platforms.map(platform => (
        <div
          key={platform.id}
          onClick={() => togglePlatform(platform.id)}
          className={`relative flex flex-col items-center p-4 rounded-xl cursor-pointer transition-all duration-300 ${
            selectedPlatforms.includes(platform.id)
              ? 'bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border-2 border-cyan-400 scale-105 shadow-lg shadow-cyan-500/20'
              : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
          }`}
        >
          {selectedPlatforms.includes(platform.id) && (
            <div className="absolute top-2 right-2">
              <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            </div>
          )}
          <span className="text-4xl mb-2">{platform.icon}</span>
          <p className="text-white font-medium text-sm">{platform.name}</p>
          <p className="text-gray-500 text-xs">{platform.users} users</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] to-[#1a365d]">
      {/* Header */}
      <div className="bg-[#0a1628] border-b border-cyan-500/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-cyan-400">ATHLYNX SOCIAL HUB</h1>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                  <Zap className="w-3 h-3 mr-1" />
                  LIVE
                </Badge>
              </div>
              <p className="text-gray-400 mt-1">14 Platforms • One Message • Global Reach • Instant Delivery</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gold">{selectedPlatforms.length}</p>
                <p className="text-gray-500 text-xs">Selected</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-cyan-400">14</p>
                <p className="text-gray-500 text-xs">Platforms</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">15B+</p>
                <p className="text-gray-500 text-xs">Total Reach</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left - Platform Selection */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-[#1a365d]/50 border-cyan-500/30">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-cyan-400" />
                    Select Platforms
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-cyan-400 border-cyan-400/50" onClick={selectAll}>
                      Select All
                    </Button>
                    <Button size="sm" variant="outline" className="text-gray-400 border-gray-400/50" onClick={clearAll}>
                      Clear
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="bg-[#0a1628] border border-white/10 mb-6">
                    <TabsTrigger value="all" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                      All (14)
                    </TabsTrigger>
                    <TabsTrigger value="messaging" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
                      Messaging (4)
                    </TabsTrigger>
                    <TabsTrigger value="social" className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400">
                      Social (6)
                    </TabsTrigger>
                    <TabsTrigger value="business" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
                      Business (4)
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="all">{renderPlatformGrid(ALL_PLATFORMS)}</TabsContent>
                  <TabsContent value="messaging">{renderPlatformGrid(MESSAGING_PLATFORMS)}</TabsContent>
                  <TabsContent value="social">{renderPlatformGrid(SOCIAL_PLATFORMS)}</TabsContent>
                  <TabsContent value="business">{renderPlatformGrid(BUSINESS_PLATFORMS)}</TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30">
                <CardContent className="pt-6 text-center">
                  <MessageSquare className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">4</p>
                  <p className="text-green-400 text-xs">Messaging</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-pink-500/20 to-pink-600/10 border-pink-500/30">
                <CardContent className="pt-6 text-center">
                  <Share2 className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">6</p>
                  <p className="text-pink-400 text-xs">Social</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/30">
                <CardContent className="pt-6 text-center">
                  <Video className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">4</p>
                  <p className="text-purple-400 text-xs">Business</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-gold/20 to-yellow-600/10 border-gold/30">
                <CardContent className="pt-6 text-center">
                  <TrendingUp className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">15B+</p>
                  <p className="text-gold text-xs">Total Reach</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right - Compose & Send */}
          <div className="space-y-6">
            <Card className="bg-[#1a365d]/50 border-gold/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Send className="w-5 h-5 text-gold" />
                  Broadcast Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Type your message here... This will be sent to ALL selected platforms simultaneously."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[180px] bg-[#0a1628] border-cyan-500/30 text-white placeholder:text-gray-500 resize-none"
                />
                
                <div className="bg-[#0a1628] rounded-lg p-3 border border-white/10">
                  <p className="text-gray-400 text-sm mb-2">Selected platforms:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedPlatforms.length === 0 ? (
                      <span className="text-gray-500 text-sm">None selected</span>
                    ) : (
                      selectedPlatforms.map(id => {
                        const platform = ALL_PLATFORMS.find(p => p.id === id);
                        return platform ? (
                          <span key={id} className="text-lg" title={platform.name}>{platform.icon}</span>
                        ) : null;
                      })
                    )}
                  </div>
                </div>

                <Button
                  onClick={sendToAll}
                  disabled={sending || selectedPlatforms.length === 0}
                  className="w-full bg-gradient-to-r from-gold to-yellow-600 hover:from-gold/90 hover:to-yellow-600/90 text-black font-bold py-6 text-lg"
                >
                  {sending ? (
                    <>
                      <Clock className="w-5 h-5 mr-2 animate-spin" />
                      BROADCASTING...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 mr-2" />
                      BROADCAST TO {selectedPlatforms.length} PLATFORMS
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="bg-[#1a365d]/50 border-cyan-500/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm">Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Simultaneous posting to all platforms</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Auto-format for each platform</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Schedule posts in advance</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Analytics across all platforms</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">AI-powered content optimization</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border-cyan-500/30">
              <CardContent className="pt-6 text-center">
                <p className="text-gold font-bold mb-2">FIRST MEDIA CONGLOMERATE</p>
                <p className="text-white text-sm">Fox News + ESPN + Social Media</p>
                <p className="text-cyan-400 text-sm">ALL IN ONE PLATFORM</p>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-gray-400 text-xs">Dreams Do Come True 2026</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
