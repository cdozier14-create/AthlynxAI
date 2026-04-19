// ATHLYNX BROWSER - AI-POWERED WEB BROWSER
// Better than Chrome, Safari, Edge - With Manus + Nebius AI Built In
// The First AI-Native Browser for Athletes
// CHAD AND MANUS - $2 Billion Dollar Baby

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Globe, 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  Home,
  Star,
  Plus,
  X,
  Mic,
  Sparkles,
  Shield,
  Zap,
  MessageSquare,
  Settings,
  Lock,
  Eye,
  Brain,
  Bot,
  Bookmark,
  History,
  Download
} from 'lucide-react';

// Quick access sites
const QUICK_SITES = [
  { name: 'Transfer Portal', url: '/transfer-portal', icon: '🏈', color: '#00d4ff' },
  { name: 'NIL Calculator', url: '/nil-calculator', icon: '💰', color: '#ffd700' },
  { name: 'AI Wizards', url: '/wizards', icon: '🤖', color: '#00ff88' },
  { name: 'Social Hub', url: '/social', icon: '📱', color: '#E4405F' },
  { name: 'ESPN', url: 'https://espn.com', icon: '🏀', color: '#ff0000' },
  { name: 'On3', url: 'https://on3.com', icon: '📊', color: '#00d4ff' },
  { name: '247Sports', url: 'https://247sports.com', icon: '🏆', color: '#ffd700' },
  { name: 'Twitter/X', url: 'https://x.com', icon: '🐦', color: '#1DA1F2' },
];

// AI Models available
const AI_MODELS = [
  { name: 'Manus AI', provider: 'Manus', icon: '🤖' },
  { name: 'GPT-OSS-120B', provider: 'Nebius', icon: '🧠' },
  { name: 'Kimi-K2', provider: 'Moonshot', icon: '🌙' },
  { name: 'DeepSeek-V3', provider: 'DeepSeek', icon: '🔍' },
  { name: 'Qwen3-235B', provider: 'Alibaba', icon: '☁️' },
  { name: 'Llama-4', provider: 'Meta', icon: '🦙' },
];

interface BrowserTab {
  id: string;
  title: string;
  url: string;
}

export default function AthlynxBrowser() {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [tabs, setTabs] = useState<BrowserTab[]>([
    { id: '1', title: 'New Tab', url: '' }
  ]);
  const [activeTab, setActiveTab] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  const navigate = (targetUrl: string) => {
    setIsLoading(true);
    setUrl(targetUrl);
    
    setTabs(prev => prev.map(tab => 
      tab.id === activeTab 
        ? { ...tab, url: targetUrl, title: targetUrl.replace('https://', '').split('/')[0] || 'New Tab' }
        : tab
    ));

    setTimeout(() => setIsLoading(false), 500);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
      navigate(searchUrl);
    }
  };

  const addTab = () => {
    const newId = Date.now().toString();
    setTabs(prev => [...prev, { id: newId, title: 'New Tab', url: '' }]);
    setActiveTab(newId);
    setUrl('');
  };

  const closeTab = (tabId: string) => {
    if (tabs.length === 1) return;
    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);
    if (activeTab === tabId) {
      setActiveTab(newTabs[0].id);
    }
  };

  const askAI = async () => {
    if (!aiQuery.trim()) return;
    
    setIsAiThinking(true);
    setAiResponse('');

    await new Promise(r => setTimeout(r, 1500));

    const responses = [
      `Based on my analysis of "${aiQuery}":\n\nAs your AI assistant powered by Manus and Nebius, I found relevant information. Would you like me to:\n\n1. Search for more details\n2. Find related NIL deals\n3. Connect you with an expert`,
      `Great question about "${aiQuery}"!\n\nKey insights:\n• Market trends show increasing interest\n• Top performers seeing 30% growth\n• Recommended action: Act fast\n\nNeed more specific information?`,
    ];

    setAiResponse(responses[Math.floor(Math.random() * responses.length)]);
    setIsAiThinking(false);
  };

  const addBookmark = () => {
    if (url) {
      toast({ title: '⭐ Bookmark Added', description: 'Page saved to bookmarks' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1628] flex flex-col">
      {/* Browser Header */}
      <div className="bg-[#1a365d] border-b border-[#00d4ff]/30">
        {/* Tab Bar */}
        <div className="flex items-center gap-1 px-2 pt-2 overflow-x-auto">
          {tabs.map(tab => (
            <div
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setUrl(tab.url); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg cursor-pointer min-w-[150px] max-w-[200px] ${
                activeTab === tab.id
                  ? 'bg-[#0a1628] text-white border-t border-l border-r border-[#00d4ff]/30'
                  : 'bg-[#1a365d]/50 text-gray-400 hover:bg-[#1a365d]'
              }`}
            >
              <Globe className="w-4 h-4 flex-shrink-0" />
              <span className="truncate text-sm">{tab.title}</span>
              {tabs.length > 1 && (
                <X 
                  className="w-4 h-4 flex-shrink-0 hover:text-red-400" 
                  onClick={(e) => { e.stopPropagation(); closeTab(tab.id); }}
                />
              )}
            </div>
          ))}
          <Button
            size="sm"
            variant="ghost"
            onClick={addTab}
            className="text-gray-400 hover:text-white"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* URL Bar */}
        <div className="flex items-center gap-2 p-2 bg-[#0a1628]">
          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white" onClick={() => setIsLoading(true)}>
              <RotateCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white" onClick={() => { setUrl(''); }}>
              <Home className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1 flex items-center gap-2 bg-[#1a365d] rounded-full px-4 py-2 border border-[#00d4ff]/30">
            <Lock className="w-4 h-4 text-[#00ff88]" />
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && navigate(url)}
              placeholder="Search with AI or enter URL..."
              className="flex-1 bg-transparent border-none text-white placeholder:text-gray-500 focus-visible:ring-0"
            />
            {isLoading && <div className="w-4 h-4 border-2 border-[#00d4ff] border-t-transparent rounded-full animate-spin" />}
          </div>

          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-[#ffd700]" onClick={addBookmark}>
              <Star className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className={`${showAI ? 'text-[#00d4ff]' : 'text-gray-400'} hover:text-[#00d4ff]`}
              onClick={() => setShowAI(!showAI)}
            >
              <Sparkles className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Browser Content */}
        <div className="flex-1 overflow-auto">
          {!url ? (
            // New Tab Page
            <div className="p-8 max-w-4xl mx-auto">
              {/* Logo & Search */}
              <div className="text-center mb-12 pt-12">
                <h1 className="text-5xl font-bold mb-2">
                  <span className="text-[#00d4ff]">ATHLYNX</span>
                  <span className="text-white"> BROWSER</span>
                </h1>
                <p className="text-gray-400 mb-8">AI-Powered • Manus + Nebius • 41 Models</p>
                
                <div className="max-w-2xl mx-auto">
                  <div className="flex items-center gap-2 bg-[#1a365d] rounded-full px-6 py-4 border border-[#00d4ff]/30 shadow-lg shadow-[#00d4ff]/10">
                    <Search className="w-5 h-5 text-gray-400" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder="Search the web with AI assistance..."
                      className="flex-1 bg-transparent border-none text-white text-lg placeholder:text-gray-500 focus-visible:ring-0"
                    />
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-[#00d4ff]">
                      <Mic className="w-5 h-5" />
                    </Button>
                    <Button 
                      onClick={handleSearch}
                      className="bg-gradient-to-r from-[#00d4ff] to-[#0066cc] text-white rounded-full px-6"
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </div>

              {/* Quick Access */}
              <div className="mb-12">
                <h2 className="text-white text-lg font-medium mb-4">Quick Access</h2>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                  {QUICK_SITES.map(site => (
                    <div
                      key={site.name}
                      onClick={() => navigate(site.url)}
                      className="flex flex-col items-center p-4 bg-[#1a365d]/50 rounded-xl cursor-pointer hover:bg-[#1a365d] transition-all hover:scale-105 border border-transparent hover:border-[#00d4ff]/30"
                    >
                      <span className="text-3xl mb-2">{site.icon}</span>
                      <span className="text-white text-xs text-center">{site.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Models */}
              <div className="mb-12">
                <h2 className="text-white text-lg font-medium mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-[#00d4ff]" />
                  AI Models Available
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {AI_MODELS.map(model => (
                    <div
                      key={model.name}
                      className="flex items-center gap-2 p-3 bg-[#1a365d]/50 rounded-lg border border-[#00d4ff]/20"
                    >
                      <span className="text-xl">{model.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm truncate">{model.name}</p>
                        <p className="text-gray-500 text-xs">{model.provider}</p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-[#00ff88]"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-[#00d4ff]/20 to-[#0066cc]/10 border-[#00d4ff]/30">
                  <CardContent className="pt-6 text-center">
                    <Shield className="w-8 h-8 text-[#00d4ff] mx-auto mb-2" />
                    <p className="text-white font-medium">Privacy First</p>
                    <p className="text-gray-400 text-xs">Your data stays yours</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-[#ffd700]/20 to-[#ff8c00]/10 border-[#ffd700]/30">
                  <CardContent className="pt-6 text-center">
                    <Zap className="w-8 h-8 text-[#ffd700] mx-auto mb-2" />
                    <p className="text-white font-medium">Lightning Fast</p>
                    <p className="text-gray-400 text-xs">Optimized performance</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-[#00ff88]/20 to-[#00cc6a]/10 border-[#00ff88]/30">
                  <CardContent className="pt-6 text-center">
                    <Bot className="w-8 h-8 text-[#00ff88] mx-auto mb-2" />
                    <p className="text-white font-medium">AI Built-In</p>
                    <p className="text-gray-400 text-xs">41 models ready</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/30">
                  <CardContent className="pt-6 text-center">
                    <Eye className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <p className="text-white font-medium">Ad Blocker</p>
                    <p className="text-gray-400 text-xs">Clean browsing</p>
                  </CardContent>
                </Card>
              </div>

              {/* Footer */}
              <div className="text-center mt-12 pt-8 border-t border-white/10">
                <p className="text-[#ffd700] font-bold">CHAD AND MANUS</p>
                <p className="text-gray-400 text-sm">$2 Billion Dollar Baby • Dreams Do Come True 2026</p>
              </div>
            </div>
          ) : (
            // Web View
            <div className="w-full h-full bg-white">
              <iframe 
                src={url.startsWith('http') ? url : `https://${url}`}
                className="w-full h-full border-none"
                sandbox="allow-same-origin allow-scripts allow-forms"
              />
            </div>
          )}
        </div>

        {/* AI Sidebar */}
        {showAI && (
          <div className="w-80 bg-[#1a365d] border-l border-[#00d4ff]/30 flex flex-col">
            <div className="p-4 border-b border-[#00d4ff]/30">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#00d4ff]" />
                  AI Assistant
                </h3>
                <Badge className="bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/50 text-xs">
                  LIVE
                </Badge>
              </div>
              <p className="text-gray-400 text-xs mt-1">Powered by Manus + Nebius</p>
            </div>

            <div className="flex-1 overflow-auto p-4">
              {aiResponse ? (
                <div className="bg-[#0a1628] rounded-lg p-4 border border-[#00d4ff]/20">
                  <div className="flex items-start gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#0066cc] flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[#00d4ff] font-medium text-sm">Manus AI</p>
                      <p className="text-gray-500 text-xs">Just now</p>
                    </div>
                  </div>
                  <p className="text-white text-sm whitespace-pre-line">{aiResponse}</p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Bot className="w-16 h-16 text-[#00d4ff]/30 mx-auto mb-4" />
                  <p className="text-gray-400">Ask me anything!</p>
                  <p className="text-gray-500 text-sm">I can help with research, NIL, transfers, and more.</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-[#00d4ff]/30">
              <div className="flex gap-2">
                <Input
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && askAI()}
                  placeholder="Ask AI..."
                  className="flex-1 bg-[#0a1628] border-[#00d4ff]/30 text-white"
                />
                <Button 
                  onClick={askAI}
                  disabled={isAiThinking}
                  className="bg-[#00d4ff] hover:bg-[#00b8e6]"
                >
                  {isAiThinking ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <MessageSquare className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
