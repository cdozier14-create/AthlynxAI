// ATHLYNX UNIFIED COMMUNICATIONS HUB
// WhatsApp + WeChat + Telegram + Teams + Zoom + Email - ALL IN ONE
// First Media Conglomerate to do it!

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageCircle, 
  Mail, 
  Video, 
  Users, 
  Send, 
  Globe,
  Smartphone,
  Building2,
  Zap,
  CheckCircle2,
  Clock
} from 'lucide-react';

// Platform configurations
const PLATFORMS = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: '📱',
    color: '#25D366',
    description: 'International messaging',
    status: 'active',
  },
  {
    id: 'wechat',
    name: 'WeChat',
    icon: '💬',
    color: '#07C160',
    description: 'China/Asia market',
    status: 'active',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: '✈️',
    color: '#0088cc',
    description: 'Crypto/Tech community',
    status: 'active',
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    icon: '👥',
    color: '#6264A7',
    description: 'Enterprise/Business',
    status: 'active',
  },
  {
    id: 'zoom',
    name: 'Zoom',
    icon: '🎥',
    color: '#2D8CFF',
    description: 'Video conferencing',
    status: 'active',
  },
  {
    id: 'email',
    name: 'Email',
    icon: '📧',
    color: '#00d4ff',
    description: 'Official communications',
    status: 'active',
  },
];

// Team members
const TEAM = [
  { name: 'Chad A. Dozier', role: 'Founder/CEO', email: 'cdozier14@dozierholdingsgroup.com.mx', phone: '+16014985282' },
  { name: 'Glenn Tse', role: 'Partner', email: 'gtse@dozierholdingsgroup.com' },
  { name: 'Jimmy Boyd', role: 'Partner', email: 'jboydbamabayou@yahoo.com' },
  { name: 'Andrew Kustes', role: 'Partner', email: 'akustes@dozierholdingsgroup.com' },
  { name: 'Lee Marshall', role: 'Partner', email: 'leronius@gmail.com' },
  { name: 'David Ford', role: 'Advisor', email: 'david.ford@aocmedicalllc.com' },
];

export default function CommsHub() {
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['email']);
  const [selectedTeam, setSelectedTeam] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [sentHistory, setSentHistory] = useState<Array<{time: string; platforms: string[]; recipients: number}>>([]);

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleTeamMember = (name: string) => {
    setSelectedTeam(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const selectAllTeam = () => {
    setSelectedTeam(TEAM.map(t => t.name));
  };

  const selectAllPlatforms = () => {
    setSelectedPlatforms(PLATFORMS.map(p => p.id));
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
    if (selectedTeam.length === 0) {
      toast({ title: 'Error', description: 'Please select at least one recipient', variant: 'destructive' });
      return;
    }

    setSending(true);

    // Simulate sending (in production, this calls the backend)
    await new Promise(r => setTimeout(r, 1500));

    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setSentHistory(prev => [{
      time: now,
      platforms: [...selectedPlatforms],
      recipients: selectedTeam.length
    }, ...prev.slice(0, 9)]);

    toast({
      title: '🚀 Messages Sent!',
      description: `Sent to ${selectedTeam.length} recipients via ${selectedPlatforms.length} platforms`,
    });

    setSending(false);
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] to-[#1a365d]">
      {/* Header */}
      <div className="bg-[#0a1628] border-b border-cyan-500/30 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-cyan-400">ATHLYNX COMMS HUB</h1>
              <p className="text-gray-400 mt-1">All Platforms • One Message • Instant Delivery</p>
            </div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50 text-lg px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              LIVE
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Left Column - Platforms */}
          <div className="space-y-6">
            <Card className="bg-[#1a365d]/50 border-cyan-500/30">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-cyan-400" />
                    Platforms
                  </CardTitle>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-cyan-400 border-cyan-400/50"
                    onClick={selectAllPlatforms}
                  >
                    Select All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {PLATFORMS.map(platform => (
                  <div
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                      selectedPlatforms.includes(platform.id)
                        ? 'bg-cyan-500/20 border border-cyan-500/50'
                        : 'bg-white/5 border border-transparent hover:bg-white/10'
                    }`}
                  >
                    <span className="text-2xl">{platform.icon}</span>
                    <div className="flex-1">
                      <p className="text-white font-medium">{platform.name}</p>
                      <p className="text-gray-400 text-sm">{platform.description}</p>
                    </div>
                    {selectedPlatforms.includes(platform.id) && (
                      <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-[#1a365d]/50 border-gold/30">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold text-gold">{selectedPlatforms.length}</p>
                    <p className="text-gray-400 text-sm">Platforms</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-cyan-400">{selectedTeam.length}</p>
                    <p className="text-gray-400 text-sm">Recipients</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Message */}
          <div className="space-y-6">
            <Card className="bg-[#1a365d]/50 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-cyan-400" />
                  Compose Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Type your message here... This will be sent to all selected platforms simultaneously."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[200px] bg-[#0a1628] border-cyan-500/30 text-white placeholder:text-gray-500"
                />
                
                <div className="flex gap-3">
                  <Button
                    onClick={sendToAll}
                    disabled={sending}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-6"
                  >
                    {sending ? (
                      <>
                        <Clock className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        SEND TO ALL
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-center text-gray-500 text-sm">
                  Messages sent simultaneously to all platforms
                </p>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-[#1a365d]/50 border-green-500/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-400" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {sentHistory.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">No messages sent yet</p>
                ) : (
                  <div className="space-y-2">
                    {sentHistory.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-sm bg-white/5 p-2 rounded">
                        <span className="text-gray-400">{item.time}</span>
                        <span className="text-green-400">{item.platforms.length} platforms • {item.recipients} recipients</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Team */}
          <div className="space-y-6">
            <Card className="bg-[#1a365d]/50 border-gold/30">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-gold" />
                    Founding Team
                  </CardTitle>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-gold border-gold/50"
                    onClick={selectAllTeam}
                  >
                    Select All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {TEAM.map(member => (
                  <div
                    key={member.name}
                    onClick={() => toggleTeamMember(member.name)}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                      selectedTeam.includes(member.name)
                        ? 'bg-gold/20 border border-gold/50'
                        : 'bg-white/5 border border-transparent hover:bg-white/10'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{member.name}</p>
                      <p className="text-gray-400 text-sm">{member.role}</p>
                    </div>
                    {selectedTeam.includes(member.name) && (
                      <CheckCircle2 className="w-5 h-5 text-gold" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Platform Links */}
            <Card className="bg-[#1a365d]/50 border-cyan-500/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm">Quick Connect</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-2">
                <a 
                  href="https://wa.me/16014985282" 
                  target="_blank"
                  className="flex flex-col items-center p-3 bg-[#25D366]/20 rounded-lg hover:bg-[#25D366]/30 transition"
                >
                  <span className="text-2xl">📱</span>
                  <span className="text-white text-xs mt-1">WhatsApp</span>
                </a>
                <a 
                  href="#" 
                  className="flex flex-col items-center p-3 bg-[#07C160]/20 rounded-lg hover:bg-[#07C160]/30 transition"
                >
                  <span className="text-2xl">💬</span>
                  <span className="text-white text-xs mt-1">WeChat</span>
                </a>
                <a 
                  href="https://t.me/athlynx" 
                  target="_blank"
                  className="flex flex-col items-center p-3 bg-[#0088cc]/20 rounded-lg hover:bg-[#0088cc]/30 transition"
                >
                  <span className="text-2xl">✈️</span>
                  <span className="text-white text-xs mt-1">Telegram</span>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-cyan-500/20 to-gold/20 border border-cyan-500/30 rounded-full px-8 py-4">
            <span className="text-cyan-400 font-bold">FIRST MEDIA CONGLOMERATE</span>
            <span className="text-gray-400">•</span>
            <span className="text-gold">Fox News + ESPN + Social Media</span>
            <span className="text-gray-400">•</span>
            <span className="text-white">ALL IN ONE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
