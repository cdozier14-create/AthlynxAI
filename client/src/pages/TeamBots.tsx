import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bot, Calendar, Mail, TrendingUp, Users, FileText, Presentation, Search, MessageSquare, Wrench, FolderKanban, AlertTriangle, Target, Megaphone, LineChart, PenTool, DollarSign, Handshake, Phone, Database } from "lucide-react";
import { Link } from "wouter";

export default function TeamBots() {
  const bots = [
    {
      id: "executive",
      name: "Executive Command Center",
      role: "Chad A. Dozier - CEO & Founder",
      icon: "👔",
      color: "bg-blue-500",
      description: "The Executive Command Center serves as Chad's personal AI assistant, functioning as a comprehensive management hub that consolidates information from across all business units and provides real-time decision support.",
      capabilities: [
        {
          icon: <Calendar className="h-5 w-5" />,
          title: "Schedule Management",
          description: "Manages complex schedules across multiple time zones and business entities, automatically prioritizing meetings based on strategic importance and identifying potential conflicts."
        },
        {
          icon: <Mail className="h-5 w-5" />,
          title: "Email Management",
          description: "Filters incoming messages across multiple accounts, categorizes by urgency and relevance, and drafts context-aware responses for review."
        },
        {
          icon: <TrendingUp className="h-5 w-5" />,
          title: "Strategic Reporting",
          description: "Generates daily executive briefings synthesizing key metrics, market intelligence, competitor activities, and internal performance indicators."
        },
        {
          icon: <Users className="h-5 w-5" />,
          title: "Partnership Management",
          description: "Tracks ongoing discussions with strategic partners, maintains relationship histories, and provides briefing materials before key meetings."
        }
      ],
      integrations: ["Google Calendar", "Outlook", "Gmail", "Hostinger", "CRM Systems", "Business Intelligence Dashboards", "Project Management Tools"]
    },
    {
      id: "presentation",
      name: "Presentation Intelligence Suite",
      role: "Glenn Tse - Presenter & Strategic Partner",
      icon: "",
      color: "bg-purple-500",
      description: "The Presentation Intelligence Suite empowers Glenn with AI-driven content creation, research support, and audience engagement tools that elevate every presentation to professional excellence.",
      capabilities: [
        {
          icon: <FileText className="h-5 w-5" />,
          title: "Content Generation",
          description: "Automatically creates presentation slides, speaker notes, and supporting materials based on topic briefs and strategic objectives."
        },
        {
          icon: <Search className="h-5 w-5" />,
          title: "Research Assistance",
          description: "Provides rapid access to relevant data, statistics, case studies, and industry insights. Continuously monitors news sources and competitor activities."
        },
        {
          icon: <MessageSquare className="h-5 w-5" />,
          title: "Audience Engagement",
          description: "Enables interactive presentations through real-time polling, Q&A management, and feedback collection."
        },
        {
          icon: <Presentation className="h-5 w-5" />,
          title: "Content Library",
          description: "Maintains a library of previous presentations, tracking which content resonates most effectively with different audience types."
        }
      ],
      integrations: ["PowerPoint", "Google Slides", "Keynote", "Research Databases", "Social Media Platforms", "Email Systems", "Video Conferencing Platforms"]
    },
    {
      id: "operations",
      name: "Operations Command Hub",
      role: "Jimmy Boyd - Operations Manager",
      icon: "⚙️",
      color: "bg-green-500",
      description: "The Operations Command Hub serves as Jimmy's central nervous system for managing complex, multi-faceted operations across the organization.",
      capabilities: [
        {
          icon: <FolderKanban className="h-5 w-5" />,
          title: "Project Management",
          description: "Comprehensive tracking of all active projects, automatically updating status and identifying potential delays before they impact deadlines."
        },
        {
          icon: <Wrench className="h-5 w-5" />,
          title: "Workflow Automation",
          description: "Creates intelligent workflows connecting different tools and systems, automatically routing documents and triggering notifications."
        },
        {
          icon: <Users className="h-5 w-5" />,
          title: "Resource Management",
          description: "Monitors team capacity, equipment utilization, and budget allocation. Provides early warning of resource constraints."
        },
        {
          icon: <AlertTriangle className="h-5 w-5" />,
          title: "Risk Monitoring",
          description: "Identifies potential operational risks by analyzing patterns in project data, team communications, and external factors."
        }
      ],
      integrations: ["Asana", "Monday.com", "Jira", "Slack", "Microsoft Teams", "Google Drive", "SharePoint", "Financial Systems", "Time Tracking Tools"]
    },
    {
      id: "marketing",
      name: "Marketing Intelligence Engine",
      role: "Andy Kustes - Marketing Director",
      icon: "",
      color: "bg-orange-500",
      description: "The Marketing Intelligence Engine provides Andy with AI-powered tools for campaign management, lead generation, content distribution, and performance analytics.",
      capabilities: [
        {
          icon: <Target className="h-5 w-5" />,
          title: "Lead Generation",
          description: "Identifies and qualifies potential customers across multiple channels using predictive analytics to score leads based on conversion probability."
        },
        {
          icon: <Megaphone className="h-5 w-5" />,
          title: "Campaign Management",
          description: "End-to-end support for marketing initiatives from planning through execution and analysis, with automatic audience segmentation and personalization."
        },
        {
          icon: <PenTool className="h-5 w-5" />,
          title: "Content Creation",
          description: "Generates marketing materials including social media posts, email campaigns, blog articles, and advertising copy while maintaining brand consistency."
        },
        {
          icon: <LineChart className="h-5 w-5" />,
          title: "Performance Analytics",
          description: "Comprehensive insights into marketing effectiveness, tracking reach, engagement, conversion rates, and ROI."
        }
      ],
      integrations: ["HubSpot", "Marketo", "Hootsuite", "Buffer", "Mailchimp", "Constant Contact", "Google Ads", "Facebook Ads", "Google Analytics", "CRM Systems"]
    },
    {
      id: "sales",
      name: "Sales Acceleration Platform",
      role: "Lee Marshall - Sales Director",
      icon: "",
      color: "bg-red-500",
      description: "The Sales Acceleration Platform equips Lee with AI-powered tools for CRM management, sales outreach, deal tracking, and customer relationship development.",
      capabilities: [
        {
          icon: <Database className="h-5 w-5" />,
          title: "CRM Management",
          description: "Maintains comprehensive customer records, tracks all interactions, and ensures data accuracy across systems with intelligent data enrichment."
        },
        {
          icon: <Phone className="h-5 w-5" />,
          title: "Sales Outreach",
          description: "Automates personalized outreach sequences via email, phone, and social media with optimal timing based on engagement patterns."
        },
        {
          icon: <DollarSign className="h-5 w-5" />,
          title: "Deal Tracking",
          description: "Monitors sales pipeline health, identifies at-risk deals, and suggests actions to move opportunities forward."
        },
        {
          icon: <Handshake className="h-5 w-5" />,
          title: "Customer Intelligence",
          description: "Aggregates information from multiple sources to provide comprehensive customer profiles and identifies upsell and cross-sell opportunities."
        }
      ],
      integrations: ["Salesforce", "HubSpot CRM", "Pipedrive", "Email Platforms", "LinkedIn Sales Navigator", "Calendar Systems", "Communication Tools", "Document Management"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Bot className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">AI Bot Ecosystem</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/bots" className="text-sm font-medium text-primary">
              Team Bots
            </Link>
            <Link href="/capabilities" className="text-sm font-medium hover:text-primary transition-colors">
              Capabilities
            </Link>
            <Link href="/implementation" className="text-sm font-medium hover:text-primary transition-colors">
              Implementation
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b bg-muted/30 py-12">
        <div className="container space-y-4">
          <h1 className="text-4xl font-bold">Team Bot Profiles</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Explore detailed profiles of each AI assistant in the ecosystem. Each bot is specifically designed 
            to support a team member's unique role and responsibilities with specialized capabilities and integrations.
          </p>
        </div>
      </section>

      {/* Bot Profiles */}
      <section className="container py-12">
        <Tabs defaultValue="executive" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            {bots.map((bot) => (
              <TabsTrigger key={bot.id} value={bot.id} className="text-xs sm:text-sm">
                <span className="mr-2">{bot.icon}</span>
                <span className="hidden sm:inline">{bot.name.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {bots.map((bot) => (
            <TabsContent key={bot.id} value={bot.id} className="space-y-8">
              {/* Bot Header */}
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`${bot.color} text-white p-4 rounded-lg text-4xl`}>
                      {bot.icon}
                    </div>
                    <div className="flex-1 space-y-2">
                      <CardTitle className="text-3xl">{bot.name}</CardTitle>
                      <CardDescription className="text-lg font-medium text-foreground/80">
                        {bot.role}
                      </CardDescription>
                      <p className="text-muted-foreground pt-2">{bot.description}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Core Capabilities */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Core Capabilities</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {bot.capabilities.map((capability, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className={`${bot.color} text-white p-2 rounded`}>
                            {capability.icon}
                          </div>
                          <CardTitle className="text-lg">{capability.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{capability.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Integrations */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">System Integrations</h2>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap gap-2">
                      {bot.integrations.map((integration, index) => (
                        <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                          {integration}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  );
}
