import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import UnifiedNav from "@/components/UnifiedNav";
import UnifiedFooter from "@/components/UnifiedFooter";
import { 
  Shield, 
  Lock, 
  FileText, 
  Users, 
  Building,
  Scale,
  Eye,
  Server,
  Globe,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Gavel,
  Heart,
  GraduationCap,
  Trophy,
  Briefcase,
  Download,
  ExternalLink
} from "lucide-react";

export default function LegalCompliance() {
  const [activeSection, setActiveSection] = useState("overview");

  const complianceCertifications = [
    {
      icon: Shield,
      name: "NCAA Compliant",
      description: "Full compliance with NCAA NIL rules and regulations",
      status: "Certified",
      color: "text-green-400",
      bgColor: "bg-green-500/20"
    },
    {
      icon: Lock,
      name: "AES-256 Encryption",
      description: "Military-grade encryption for all data at rest and in transit",
      status: "Active",
      color: "text-blue-400",
      bgColor: "bg-blue-500/20"
    },
    {
      icon: FileText,
      name: "SOC 2 Type II",
      description: "Annual audit for security, availability, and confidentiality",
      status: "Certified",
      color: "text-purple-400",
      bgColor: "bg-purple-500/20"
    },
    {
      icon: GraduationCap,
      name: "FERPA Compliant",
      description: "Student education records protection for all users",
      status: "Certified",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/20"
    },
    {
      icon: Heart,
      name: "You Own Your Data",
      description: "Athletes retain full ownership of their personal data",
      status: "Guaranteed",
      color: "text-pink-400",
      bgColor: "bg-pink-500/20"
    },
    {
      icon: Building,
      name: "HIPAA Compliant",
      description: "Healthcare data protection for Medical Records Vault",
      status: "Certified",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20"
    }
  ];

  const ncaaRules = [
    {
      title: "Disclosure Requirements",
      description: "Athletes must disclose NIL activities to their institution within 72 hours",
      icon: Eye
    },
    {
      title: "No Pay-for-Play",
      description: "NIL compensation cannot be tied to athletic performance or enrollment decisions",
      icon: AlertTriangle
    },
    {
      title: "Institutional Involvement",
      description: "Schools cannot arrange NIL deals but can provide education and support",
      icon: Building
    },
    {
      title: "State Law Compliance",
      description: "NIL activities must comply with applicable state laws",
      icon: Globe
    },
    {
      title: "Academic Standing",
      description: "Athletes must maintain academic eligibility to participate in NIL activities",
      icon: GraduationCap
    },
    {
      title: "Agent Regulations",
      description: "Athletes working with agents must follow NCAA and state agent regulations",
      icon: Briefcase
    }
  ];

  const legalDocuments = [
    { name: "Terms of Service", updated: "Dec 15, 2024", type: "Legal" },
    { name: "Privacy Policy", updated: "Dec 15, 2024", type: "Privacy" },
    { name: "Data Processing Agreement", updated: "Dec 1, 2024", type: "GDPR" },
    { name: "NIL Compliance Guide", updated: "Dec 20, 2024", type: "Compliance" },
    { name: "Athlete Rights Charter", updated: "Nov 30, 2024", type: "Rights" },
    { name: "Cookie Policy", updated: "Dec 1, 2024", type: "Privacy" },
    { name: "Acceptable Use Policy", updated: "Dec 10, 2024", type: "Legal" },
    { name: "HIPAA Notice", updated: "Dec 15, 2024", type: "Healthcare" }
  ];

  const securityFeatures = [
    {
      title: "End-to-End Encryption",
      description: "All messages and sensitive data encrypted using AES-256",
      icon: Lock
    },
    {
      title: "Multi-Factor Authentication",
      description: "Required for all accounts with financial or medical data access",
      icon: Shield
    },
    {
      title: "Regular Security Audits",
      description: "Quarterly penetration testing by independent security firms",
      icon: Eye
    },
    {
      title: "Data Residency Options",
      description: "Choose where your data is stored to comply with local regulations",
      icon: Server
    },
    {
      title: "Access Controls",
      description: "Role-based permissions ensure data is only accessible to authorized users",
      icon: Users
    },
    {
      title: "Audit Logging",
      description: "Complete audit trail of all data access and modifications",
      icon: FileText
    }
  ];

  const faqItems = [
    {
      question: "How does ATHLYNX ensure NCAA compliance?",
      answer: "ATHLYNX has built-in compliance tools that automatically flag potential violations, require disclosure documentation, and integrate with institutional compliance offices. Our platform is designed in consultation with NCAA compliance officers and sports attorneys."
    },
    {
      question: "Who owns the data on the platform?",
      answer: "Athletes own their data. Period. You can export, delete, or transfer your data at any time. We never sell personal data to third parties. Our business model is based on subscriptions and transaction fees, not data monetization."
    },
    {
      question: "How is medical information protected?",
      answer: "Medical data in our Medical Records Vault is protected under HIPAA regulations. We use separate encrypted databases, strict access controls, and audit logging. Only you and healthcare providers you authorize can access your medical information."
    },
    {
      question: "What happens if there's a data breach?",
      answer: "We have comprehensive incident response procedures. In the unlikely event of a breach, affected users will be notified within 72 hours as required by law. We maintain cyber liability insurance and will provide credit monitoring services if personal financial data is compromised."
    },
    {
      question: "How do I report a compliance concern?",
      answer: "You can report concerns through our in-app reporting tool, email compliance@athlynx.com, or use our anonymous whistleblower hotline. All reports are investigated by our compliance team and, when appropriate, escalated to relevant authorities."
    },
    {
      question: "Is ATHLYNX available internationally?",
      answer: "Yes, ATHLYNX is available globally. We comply with GDPR for European users, CCPA for California residents, and other applicable data protection laws. International users can choose data residency options to ensure compliance with local regulations."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <UnifiedNav />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        
        <div className="container relative px-4 md:px-5">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-4">
              <Shield className="w-3 h-3 mr-1" /> TRUST & TRANSPARENCY
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
              Legal & Compliance
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                Center
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 mb-8">
              Built on trust, transparency, and athlete-first principles.
              Your data, your rights, your future.
            </p>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="container px-4 md:px-5 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {complianceCertifications.map((cert, i) => (
            <Card key={i} className="bg-white/5 border-white/10 hover:border-white/20 transition-all">
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 ${cert.bgColor} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <cert.icon className={`w-6 h-6 ${cert.color}`} />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{cert.name}</h3>
                <Badge className={`${cert.bgColor} ${cert.color} text-xs`}>{cert.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="container px-4 md:px-5 pb-16">
        <Tabs defaultValue="ncaa" className="w-full">
          <TabsList className="flex flex-wrap justify-center bg-white/5 border border-white/10 rounded-xl p-1 mb-8 gap-1">
            <TabsTrigger value="ncaa" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white text-xs md:text-sm">
              <Trophy className="w-4 h-4 mr-1 md:mr-2" /> NCAA Compliance
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white text-xs md:text-sm">
              <Lock className="w-4 h-4 mr-1 md:mr-2" /> Security
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white text-xs md:text-sm">
              <Eye className="w-4 h-4 mr-1 md:mr-2" /> Privacy
            </TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white text-xs md:text-sm">
              <FileText className="w-4 h-4 mr-1 md:mr-2" /> Documents
            </TabsTrigger>
            <TabsTrigger value="faq" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white text-xs md:text-sm">
              <BookOpen className="w-4 h-4 mr-1 md:mr-2" /> FAQ
            </TabsTrigger>
          </TabsList>

          {/* NCAA Compliance Tab */}
          <TabsContent value="ncaa">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">NCAA NIL Compliance</h2>
                <p className="text-white/70 mb-6">
                  ATHLYNX is designed from the ground up to ensure full compliance with NCAA 
                  Name, Image, and Likeness (NIL) regulations. Our platform includes built-in 
                  safeguards and educational resources to help athletes navigate the NIL landscape.
                </p>
                
                <div className="space-y-4">
                  {ncaaRules.map((rule, i) => (
                    <Card key={i} className="bg-white/5 border-white/10">
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <rule.icon className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold mb-1">{rule.title}</h3>
                          <p className="text-white/60 text-sm">{rule.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <Card className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-500/30 mb-6">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Gavel className="w-5 h-5 text-cyan-400" />
                      State NIL Laws
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70 mb-4">
                      NIL laws vary by state. ATHLYNX automatically applies the relevant 
                      regulations based on your institution's location and provides 
                      state-specific guidance.
                    </p>
                    <Button className="bg-cyan-500 hover:bg-cyan-400 text-white w-full">
                      View State-by-State Guide
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Building className="w-5 h-5 text-purple-400" />
                      Institutional Integration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70 mb-4">
                      ATHLYNX integrates with your school's compliance office to streamline 
                      disclosure requirements and ensure all NIL activities are properly documented.
                    </p>
                    <ul className="space-y-2 text-white/60 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        Automatic disclosure notifications
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        Compliance dashboard for administrators
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        Real-time violation alerts
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        Audit-ready documentation
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityFeatures.map((feature, i) => (
                <Card key={i} className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                    <p className="text-white/60 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Security First Architecture</h3>
                    <p className="text-white/70 mb-4">
                      ATHLYNX is built on a zero-trust security model. Every request is 
                      authenticated, every action is logged, and every piece of data is encrypted.
                    </p>
                    <ul className="space-y-2 text-white/60">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        99.99% uptime SLA
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        24/7 security monitoring
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        Incident response team
                      </li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-32 h-32 bg-blue-500/20 rounded-full mb-4">
                      <Shield className="w-16 h-16 text-blue-400" />
                    </div>
                    <p className="text-white font-semibold">SOC 2 Type II Certified</p>
                    <p className="text-white/50 text-sm">Annually audited</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Your Data Rights</h2>
                <p className="text-white/70 mb-6">
                  At ATHLYNX, we believe athletes should have complete control over their 
                  personal information. Here's what that means:
                </p>

                <div className="space-y-4">
                  {[
                    { title: "Right to Access", desc: "Request a copy of all data we have about you" },
                    { title: "Right to Portability", desc: "Export your data in standard formats" },
                    { title: "Right to Deletion", desc: "Request complete deletion of your account and data" },
                    { title: "Right to Correction", desc: "Update or correct inaccurate information" },
                    { title: "Right to Object", desc: "Opt out of certain data processing activities" },
                    { title: "Right to Restrict", desc: "Limit how we use your data" }
                  ].map((right, i) => (
                    <Card key={i} className="bg-white/5 border-white/10">
                      <CardContent className="p-4 flex items-center gap-4">
                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                        <div>
                          <h3 className="text-white font-semibold">{right.title}</h3>
                          <p className="text-white/60 text-sm">{right.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <Card className="bg-white/5 border-white/10 mb-6">
                  <CardHeader>
                    <CardTitle className="text-white">Data We Collect</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { category: "Profile Information", examples: "Name, email, school, sport" },
                        { category: "Athletic Data", examples: "Stats, achievements, highlights" },
                        { category: "Financial Data", examples: "NIL deals, payment information" },
                        { category: "Medical Data", examples: "Only in Medical Vault, with consent" },
                        { category: "Usage Data", examples: "How you use the platform" }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-start border-b border-white/10 pb-3 last:border-0">
                          <span className="text-white font-medium">{item.category}</span>
                          <span className="text-white/50 text-sm text-right">{item.examples}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-pink-500/20 border-pink-500/30">
                  <CardContent className="p-6">
                    <Heart className="w-8 h-8 text-pink-400 mb-3" />
                    <h3 className="text-white font-bold text-lg mb-2">We Never Sell Your Data</h3>
                    <p className="text-white/70 text-sm">
                      Your personal information is never sold to third parties. Our business 
                      model is based on subscriptions and transaction fees, not data monetization.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <div className="grid md:grid-cols-2 gap-4">
              {legalDocuments.map((doc, i) => (
                <Card key={i} className="bg-white/5 border-white/10 hover:border-cyan-500/50 transition-all cursor-pointer">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{doc.name}</h3>
                        <p className="text-white/50 text-sm">Updated: {doc.updated}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-white/10 text-white/60">{doc.type}</Badge>
                      <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq">
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="bg-white/5 border border-white/10 rounded-lg px-4">
                    <AccordionTrigger className="text-white hover:text-cyan-400 text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-white/70">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Contact Section */}
      <section className="container px-4 md:px-5 py-16 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Questions or Concerns?</h2>
          <p className="text-white/60 mb-6">
            Our compliance and legal team is here to help. Reach out with any questions 
            about data privacy, NCAA compliance, or security.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-cyan-500 hover:bg-cyan-400 text-white">
              Contact Compliance Team
            </Button>
            <Link href="/contact">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                General Inquiries
              </Button>
            </Link>
          </div>
          <p className="text-white/40 text-sm mt-6">
            compliance@athlynx.com • legal@athlynx.com • privacy@athlynx.com
          </p>
        </div>
      </section>

      <UnifiedFooter />
    </div>
  );
}
