import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Bot, CheckCircle2, Circle } from "lucide-react";
import { Link } from "wouter";

export default function Capabilities() {
  const capabilityMatrix = [
    {
      category: "Communication & Collaboration",
      capabilities: [
        { name: "Email Management", executive: true, presentation: false, operations: false, marketing: true, sales: true },
        { name: "Calendar Management", executive: true, presentation: true, operations: true, marketing: false, sales: true },
        { name: "Meeting Coordination", executive: true, presentation: true, operations: true, marketing: false, sales: true },
        { name: "Team Communication", executive: true, presentation: false, operations: true, marketing: true, sales: false },
      ]
    },
    {
      category: "Content & Documentation",
      capabilities: [
        { name: "Content Generation", executive: false, presentation: true, operations: false, marketing: true, sales: false },
        { name: "Presentation Creation", executive: false, presentation: true, operations: false, marketing: false, sales: false },
        { name: "Report Generation", executive: true, presentation: false, operations: true, marketing: true, sales: true },
        { name: "Document Management", executive: true, presentation: true, operations: true, marketing: false, sales: true },
      ]
    },
    {
      category: "Data & Analytics",
      capabilities: [
        { name: "Performance Analytics", executive: true, presentation: false, operations: true, marketing: true, sales: true },
        { name: "Predictive Analytics", executive: true, presentation: false, operations: false, marketing: true, sales: true },
        { name: "Market Intelligence", executive: true, presentation: true, operations: false, marketing: true, sales: false },
        { name: "Competitive Analysis", executive: true, presentation: true, operations: false, marketing: true, sales: false },
      ]
    },
    {
      category: "Project & Task Management",
      capabilities: [
        { name: "Project Tracking", executive: true, presentation: false, operations: true, marketing: false, sales: false },
        { name: "Task Assignment", executive: false, presentation: false, operations: true, marketing: false, sales: false },
        { name: "Workflow Automation", executive: false, presentation: false, operations: true, marketing: true, sales: false },
        { name: "Resource Management", executive: true, presentation: false, operations: true, marketing: false, sales: false },
      ]
    },
    {
      category: "Customer & Lead Management",
      capabilities: [
        { name: "CRM Management", executive: false, presentation: false, operations: false, marketing: false, sales: true },
        { name: "Lead Generation", executive: false, presentation: false, operations: false, marketing: true, sales: false },
        { name: "Lead Qualification", executive: false, presentation: false, operations: false, marketing: true, sales: true },
        { name: "Customer Intelligence", executive: false, presentation: false, operations: false, marketing: false, sales: true },
      ]
    },
    {
      category: "Marketing & Sales",
      capabilities: [
        { name: "Campaign Management", executive: false, presentation: false, operations: false, marketing: true, sales: false },
        { name: "Social Media Management", executive: true, presentation: false, operations: false, marketing: true, sales: false },
        { name: "Sales Outreach", executive: false, presentation: false, operations: false, marketing: false, sales: true },
        { name: "Deal Tracking", executive: false, presentation: false, operations: false, marketing: false, sales: true },
      ]
    },
  ];

  const bots = [
    { id: "executive", name: "Executive", icon: "👔", color: "bg-blue-500" },
    { id: "presentation", name: "Presentation", icon: "", color: "bg-purple-500" },
    { id: "operations", name: "Operations", icon: "⚙️", color: "bg-green-500" },
    { id: "marketing", name: "Marketing", icon: "", color: "bg-orange-500" },
    { id: "sales", name: "Sales", icon: "", color: "bg-red-500" },
  ];

  const keyFeatures = [
    {
      title: "Intelligent Automation",
      description: "All bots leverage advanced AI to automate repetitive tasks, allowing team members to focus on strategic work that requires human creativity and judgment.",
      examples: ["Automated email filtering and response drafting", "Intelligent task prioritization", "Workflow automation across systems"]
    },
    {
      title: "Real-Time Insights",
      description: "Continuous monitoring and analysis provide immediate access to critical information and emerging trends across all business functions.",
      examples: ["Live performance dashboards", "Instant market intelligence alerts", "Real-time project status updates"]
    },
    {
      title: "Seamless Integration",
      description: "Each bot connects with existing tools and platforms, creating a unified ecosystem that eliminates data silos and manual data entry.",
      examples: ["Calendar and email platform integration", "CRM and marketing automation sync", "Project management tool connectivity"]
    },
    {
      title: "Adaptive Learning",
      description: "Bots continuously learn from interactions and outcomes, improving their recommendations and automation over time.",
      examples: ["Pattern recognition in successful strategies", "Personalized workflow optimization", "Predictive insights based on historical data"]
    },
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
            <Link href="/bots" className="text-sm font-medium hover:text-primary transition-colors">
              Team Bots
            </Link>
            <Link href="/capabilities" className="text-sm font-medium text-primary">
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
          <h1 className="text-4xl font-bold">Capabilities Matrix</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Compare capabilities across all AI bots in the ecosystem. Each bot is specialized for specific functions 
            while maintaining interoperability for seamless collaboration.
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section className="container py-12 space-y-8">
        <h2 className="text-3xl font-bold">Key Features Across All Bots</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {keyFeatures.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.examples.map((example, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Capability Matrix */}
      <section className="container py-12 space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Detailed Capability Comparison</h2>
          <p className="text-muted-foreground">
            This matrix shows which capabilities are available in each AI bot, helping you understand 
            how the ecosystem covers all organizational needs.
          </p>
        </div>

        <div className="space-y-8">
          {capabilityMatrix.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="text-xl">{category.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Capability</TableHead>
                        {bots.map((bot) => (
                          <TableHead key={bot.id} className="text-center">
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-2xl">{bot.icon}</span>
                              <span className="text-xs font-medium">{bot.name}</span>
                            </div>
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {category.capabilities.map((capability, capIndex) => (
                        <TableRow key={capIndex}>
                          <TableCell className="font-medium">{capability.name}</TableCell>
                          <TableCell className="text-center">
                            {capability.executive ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <Circle className="h-5 w-5 text-muted-foreground/30 mx-auto" />
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {capability.presentation ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <Circle className="h-5 w-5 text-muted-foreground/30 mx-auto" />
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {capability.operations ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <Circle className="h-5 w-5 text-muted-foreground/30 mx-auto" />
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {capability.marketing ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <Circle className="h-5 w-5 text-muted-foreground/30 mx-auto" />
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {capability.sales ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <Circle className="h-5 w-5 text-muted-foreground/30 mx-auto" />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Legend */}
        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-sm">Capability Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Circle className="h-5 w-5 text-muted-foreground/30" />
                <span className="text-sm">Not Applicable</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Integration Note */}
      <section className="container py-12">
        <Card className="border-2 border-primary bg-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl">Ecosystem Integration</CardTitle>
            <CardDescription className="text-base">
              While each bot specializes in specific capabilities, they all work together as an integrated ecosystem. 
              Information flows seamlessly between bots, enabling coordinated actions and comprehensive insights across 
              all business functions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Shared Data Layer</h4>
                <p className="text-sm text-muted-foreground">
                  All bots access a unified data repository, ensuring consistency and eliminating duplicate data entry.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Cross-Bot Workflows</h4>
                <p className="text-sm text-muted-foreground">
                  Actions in one bot can trigger automated workflows in others, creating seamless end-to-end processes.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Unified Reporting</h4>
                <p className="text-sm text-muted-foreground">
                  Aggregate insights from all bots provide comprehensive visibility into organizational performance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
