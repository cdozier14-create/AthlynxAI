import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, CheckCircle2, Clock, Users, Zap, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Implementation() {
  const phases = [
    {
      phase: "Phase 1",
      title: "Foundation & Planning",
      duration: "Weeks 1-2",
      status: "Planning",
      description: "Establish infrastructure, define requirements, and prepare for bot deployment.",
      tasks: [
        "Conduct detailed needs assessment with each team member",
        "Document current workflows and pain points",
        "Define success metrics and KPIs for each bot",
        "Set up core infrastructure and integration frameworks",
        "Establish data governance and security protocols",
        "Create training materials and documentation"
      ],
      deliverables: [
        "Requirements documentation",
        "Infrastructure setup",
        "Security framework",
        "Training materials"
      ]
    },
    {
      phase: "Phase 2",
      title: "Pilot Deployment",
      duration: "Weeks 3-6",
      status: "Implementation",
      description: "Deploy first two bots (Executive Command Center and Operations Command Hub) as pilot program.",
      tasks: [
        "Configure Executive Command Center for Chad A. Dozier",
        "Set up Operations Command Hub for Jimmy Boyd",
        "Integrate with existing calendar and email systems",
        "Connect to project management tools",
        "Train pilot users on bot capabilities",
        "Establish feedback collection mechanisms",
        "Monitor performance and gather initial insights"
      ],
      deliverables: [
        "Two operational bots",
        "Integration with core systems",
        "User training completion",
        "Initial performance metrics"
      ]
    },
    {
      phase: "Phase 3",
      title: "Expansion Deployment",
      duration: "Weeks 7-10",
      status: "Planned",
      description: "Deploy remaining three bots based on pilot learnings and feedback.",
      tasks: [
        "Configure Presentation Intelligence Suite for Glenn Tse",
        "Set up Marketing Intelligence Engine for Andy Kustes",
        "Deploy Sales Acceleration Platform for Lee Marshall",
        "Integrate all bots with shared data layer",
        "Enable cross-bot workflows and automation",
        "Conduct comprehensive team training",
        "Establish ongoing support processes"
      ],
      deliverables: [
        "Five fully operational bots",
        "Complete ecosystem integration",
        "Team-wide training completion",
        "Support infrastructure"
      ]
    },
    {
      phase: "Phase 4",
      title: "Optimization & Scaling",
      duration: "Weeks 11-14",
      status: "Future",
      description: "Optimize bot performance, expand capabilities, and prepare for organization-wide scaling.",
      tasks: [
        "Analyze usage patterns and performance data",
        "Optimize bot configurations based on feedback",
        "Expand integration with additional tools",
        "Develop advanced automation workflows",
        "Create custom capabilities for specific needs",
        "Document best practices and success stories",
        "Plan for scaling to additional team members"
      ],
      deliverables: [
        "Performance optimization report",
        "Enhanced capabilities",
        "Best practices documentation",
        "Scaling roadmap"
      ]
    }
  ];

  const criticalSuccessFactors = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "User Adoption",
      description: "Success depends on team members actively engaging with their AI bots. Comprehensive training, ongoing support, and clear communication of benefits are essential."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Integration Quality",
      description: "Seamless integration with existing tools and workflows is critical. Bots must enhance rather than disrupt current processes."
    },
    {
      icon: <CheckCircle2 className="h-6 w-6" />,
      title: "Data Quality",
      description: "Bot effectiveness relies on access to accurate, complete data. Establishing data governance and quality standards is foundational."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Iterative Improvement",
      description: "Continuous monitoring, feedback collection, and optimization ensure bots evolve to meet changing needs and deliver increasing value over time."
    }
  ];

  const timeline = [
    { week: "Weeks 1-2", milestone: "Foundation Complete", description: "Infrastructure ready, requirements documented" },
    { week: "Week 3", milestone: "First Bot Live", description: "Executive Command Center operational" },
    { week: "Week 5", milestone: "Pilot Complete", description: "Two bots operational with initial feedback" },
    { week: "Week 8", milestone: "Full Deployment", description: "All five bots operational" },
    { week: "Week 10", milestone: "Integration Complete", description: "Cross-bot workflows enabled" },
    { week: "Week 14", milestone: "Optimization Complete", description: "Performance optimized, ready for scaling" }
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
            <Link href="/capabilities" className="text-sm font-medium hover:text-primary transition-colors">
              Capabilities
            </Link>
            <Link href="/implementation" className="text-sm font-medium text-primary">
              Implementation
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b bg-muted/30 py-12">
        <div className="container space-y-4">
          <h1 className="text-4xl font-bold">Implementation Roadmap</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            A comprehensive 14-week plan to deploy the AI Bot Ecosystem across Dozier Holdings Group, 
            from initial planning through full optimization and scaling readiness.
          </p>
        </div>
      </section>

      {/* Timeline Overview */}
      <section className="container py-12 space-y-8">
        <h2 className="text-3xl font-bold">Implementation Timeline</h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="relative pl-12">
                <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {index + 1}
                </div>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{item.milestone}</CardTitle>
                      <Badge variant="outline">{item.week}</Badge>
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Phases */}
      <section className="container py-12 space-y-8">
        <h2 className="text-3xl font-bold">Detailed Phase Breakdown</h2>
        <div className="space-y-6">
          {phases.map((phase, index) => (
            <Card key={index} className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge className="text-sm">{phase.phase}</Badge>
                      <CardTitle className="text-2xl">{phase.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">{phase.description}</CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="outline" className="whitespace-nowrap">
                      <Clock className="h-3 w-3 mr-1" />
                      {phase.duration}
                    </Badge>
                    <Badge variant={phase.status === "Planning" ? "default" : phase.status === "Implementation" ? "secondary" : "outline"}>
                      {phase.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm uppercase text-muted-foreground">Key Tasks</h4>
                    <ul className="space-y-2">
                      {phase.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm uppercase text-muted-foreground">Deliverables</h4>
                    <ul className="space-y-2">
                      {phase.deliverables.map((deliverable, delIndex) => (
                        <li key={delIndex} className="flex items-start gap-2 text-sm">
                          <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Critical Success Factors */}
      <section className="container py-12 space-y-8">
        <h2 className="text-3xl font-bold">Critical Success Factors</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {criticalSuccessFactors.map((factor, index) => (
            <Card key={index} className="border-2">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-primary text-primary-foreground p-2 rounded">
                    {factor.icon}
                  </div>
                  <CardTitle className="text-xl">{factor.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{factor.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Risk Mitigation */}
      <section className="container py-12 space-y-8">
        <h2 className="text-3xl font-bold">Risk Mitigation Strategies</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Technical Risks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Risk:</strong> Integration failures or system incompatibilities</p>
              <p><strong>Mitigation:</strong> Thorough testing in pilot phase, fallback procedures, and vendor support agreements</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Adoption Risks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Risk:</strong> Low user engagement or resistance to change</p>
              <p><strong>Mitigation:</strong> Comprehensive training, clear communication of benefits, and ongoing support</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Data Risks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Risk:</strong> Data quality issues or security concerns</p>
              <p><strong>Mitigation:</strong> Robust data governance, security protocols, and regular audits</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Next Steps */}
      <section className="container py-12">
        <Card className="border-2 border-primary bg-primary/5">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-3xl">Ready to Begin?</CardTitle>
            <CardDescription className="text-lg">
              The AI Bot Ecosystem implementation is designed to be phased and iterative, minimizing disruption 
              while delivering value quickly. Contact us to schedule a detailed planning session.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">14</div>
                <div className="text-sm text-muted-foreground">Weeks to Full Deployment</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">5</div>
                <div className="text-sm text-muted-foreground">Specialized AI Bots</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Continuous Support</div>
              </div>
            </div>
            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
                <strong>Contact:</strong> cdozier@dozierholdingsgroup.com
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
