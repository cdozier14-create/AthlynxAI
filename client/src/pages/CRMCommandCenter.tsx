import { useState, useEffect } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// ============================================
// ATHLYNX CRM COMMAND CENTER
// ONE LOGIN - FULL CONTROL - EVERYTHING IN ONE PLACE
// ============================================

interface Partner {
  id: number;
  name: string;
  role: string;
  equity: string;
  accessCode: string;
  email: string;
  phone: string;
}

interface Company {
  id: number;
  name: string;
  type: string;
  state: string;
  ein: string;
  status: string;
  annualReportDue: string;
  registeredAgent: string;
}

interface Connector {
  id: string;
  name: string;
  type: string;
  status: "connected" | "disconnected" | "pending";
  lastSync: string;
  icon: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
}

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  category: string;
}

export default function CRMCommandCenter() {
  const [accessCode, setAccessCode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [partnerName, setPartnerName] = useState("");
  const [partnerRole, setPartnerRole] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  // Validate access
  const validateAccess = trpc.crm.validateAccess.useQuery(
    { accessCode },
    { enabled: false }
  );

  const handleLogin = async () => {
    if (!accessCode.trim()) {
      toast.error("Please enter your access code");
      return;
    }
    
    const result = await validateAccess.refetch();
    if (result.data?.valid) {
      setIsAuthenticated(true);
      setPartnerName(result.data.partner?.name || "Partner");
      setPartnerRole(result.data.partner?.role || "Partner");
      toast.success(`Welcome to Command Center, ${result.data.partner?.name}!`);
    } else {
      toast.error("Invalid access code");
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800/90 border-cyan-500/30">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <span className="text-5xl">🎯</span>
            </div>
            <CardTitle className="text-3xl text-white">COMMAND CENTER</CardTitle>
            <CardDescription className="text-cyan-400">
              ATHLYNX CRM - One Login, Full Control
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Enter Partner Access Code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="bg-slate-700 border-slate-600 text-white text-center text-lg py-6"
            />
            <Button 
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 py-6 text-lg"
            >
              🔐 Access Command Center
            </Button>
            <div className="text-center space-y-2">
              <p className="text-slate-400 text-sm">
                Authorized Partners Only
              </p>
              <p className="text-cyan-500 text-xs">
                Dozier Holdings Group | ATHLYNX AI Corporation
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main Command Center
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl px-4 py-2 flex items-center gap-2 cursor-pointer hover:opacity-90">
                <span className="text-3xl">🎯</span>
                <div>
                  <h1 className="text-white font-bold text-xl">COMMAND CENTER</h1>
                  <p className="text-blue-100 text-[10px]">ATHLYNX CRM</p>
                </div>
              </div>
            </Link>
            <div className="hidden md:block">
              <p className="text-cyan-400 font-semibold">{partnerName}</p>
              <p className="text-slate-400 text-xs">{partnerRole}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              ● Online
            </Badge>
            <Button
              onClick={() => setIsAuthenticated(false)}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 bg-slate-800/50 p-2 rounded-xl h-auto">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-cyan-500 py-3">
              📊 Dashboard
            </TabsTrigger>
            <TabsTrigger value="companies" className="data-[state=active]:bg-cyan-500 py-3">
              🏢 Companies
            </TabsTrigger>
            <TabsTrigger value="partners" className="data-[state=active]:bg-cyan-500 py-3">
              👥 Partners
            </TabsTrigger>
            <TabsTrigger value="connectors" className="data-[state=active]:bg-cyan-500 py-3">
              🔌 Connectors
            </TabsTrigger>
            <TabsTrigger value="emails" className="data-[state=active]:bg-cyan-500 py-3">
              📧 Emails
            </TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-cyan-500 py-3">
              📁 Documents
            </TabsTrigger>
            <TabsTrigger value="compliance" className="data-[state=active]:bg-cyan-500 py-3">
              ✅ Compliance
            </TabsTrigger>
            <TabsTrigger value="hosting" className="data-[state=active]:bg-cyan-500 py-3">
              🌐 Hosting
            </TabsTrigger>
            <TabsTrigger value="athletes" className="data-[state=active]:bg-cyan-500 py-3">
              ⭐ Athletes
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="mt-6">
            <DashboardModule />
          </TabsContent>

          {/* Companies Tab */}
          <TabsContent value="companies" className="mt-6">
            <CompaniesModule />
          </TabsContent>

          {/* Partners Tab */}
          <TabsContent value="partners" className="mt-6">
            <PartnersModule />
          </TabsContent>

          {/* Connectors Tab */}
          <TabsContent value="connectors" className="mt-6">
            <ConnectorsModule />
          </TabsContent>

          {/* Emails Tab */}
          <TabsContent value="emails" className="mt-6">
            <EmailsModule />
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="mt-6">
            <DocumentsModule />
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="mt-6">
            <ComplianceModule />
          </TabsContent>

          {/* Web Hosting Tab */}
          <TabsContent value="hosting" className="mt-6">
            <WebHostingModule />
          </TabsContent>

          {/* Athlete Sites Tab */}
          <TabsContent value="athletes" className="mt-6">
            <AthleteSitesModule />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// ============================================
// DASHBOARD MODULE
// ============================================
function DashboardModule() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
        📊 Command Center Dashboard
      </h2>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickStatCard title="Companies" value="12+" icon="🏢" color="cyan" />
        <QuickStatCard title="Partners" value="6" icon="👥" color="blue" />
        <QuickStatCard title="Connectors" value="8" icon="🔌" color="green" />
        <QuickStatCard title="Documents" value="50+" icon="📁" color="purple" />
      </div>

      {/* Quick Actions */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">⚡ Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="bg-cyan-600 hover:bg-cyan-500 h-20 flex-col gap-2">
              <span className="text-2xl">📧</span>
              <span>Send Email</span>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-500 h-20 flex-col gap-2">
              <span className="text-2xl">📄</span>
              <span>New Document</span>
            </Button>
            <Button className="bg-green-600 hover:bg-green-500 h-20 flex-col gap-2">
              <span className="text-2xl">🏢</span>
              <span>Add Company</span>
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-500 h-20 flex-col gap-2">
              <span className="text-2xl">👤</span>
              <span>Add Partner</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">📋 Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <ActivityItem 
              icon="📄" 
              text="IP Portfolio Master Report created" 
              time="Today, 3:15 PM" 
            />
            <ActivityItem 
              icon="📧" 
              text="Team email sent to David Ford Sr." 
              time="Today, 3:10 PM" 
            />
            <ActivityItem 
              icon="🏢" 
              text="Softmor acquisition agreement drafted" 
              time="Today, 2:45 PM" 
            />
            <ActivityItem 
              icon="✅" 
              text="NCNDA Partner Agreement completed" 
              time="Today, 2:30 PM" 
            />
            <ActivityItem 
              icon="💰" 
              text="Stripe payment connector verified" 
              time="Today, 1:00 PM" 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================
// COMPANIES MODULE (Registration Management)
// ============================================
function CompaniesModule() {
  const companies: Company[] = [
    { id: 1, name: "Dozier Holdings Group, LLC", type: "LLC", state: "Texas", ein: "88-3846539", status: "Active", annualReportDue: "2026-05-15", registeredAgent: "Self (Chad A. Dozier)" },
    { id: 2, name: "ATHLYNX AI Corporation", type: "Corporation", state: "Delaware", ein: "Pending", status: "Active", annualReportDue: "2026-03-01", registeredAgent: "Self (Chad A. Dozier)" },
    { id: 3, name: "Softmor, Inc.", type: "Corporation", state: "Texas", ein: "Pending", status: "Active", annualReportDue: "2026-05-15", registeredAgent: "Self (Chad A. Dozier)" },
    { id: 4, name: "Diamond Grind, LLC", type: "LLC", state: "Texas", ein: "Pending", status: "Pending Formation", annualReportDue: "N/A", registeredAgent: "Self (Chad A. Dozier)" },
    { id: 5, name: "Warriors Playbook, LLC", type: "LLC", state: "Texas", ein: "Pending", status: "Pending Formation", annualReportDue: "N/A", registeredAgent: "Self (Chad A. Dozier)" },
    { id: 6, name: "NIL Vault, LLC", type: "LLC", state: "Texas", ein: "Pending", status: "Pending Formation", annualReportDue: "N/A", registeredAgent: "Self (Chad A. Dozier)" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          🏢 Company Registry
        </h2>
        <Button className="bg-cyan-600 hover:bg-cyan-500">
          + Add Company
        </Button>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Registered Entities</CardTitle>
          <CardDescription className="text-slate-400">
            All DHG companies - Self-managed (No Northwest RA fees!)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-cyan-400">Company Name</th>
                  <th className="text-left py-3 px-4 text-cyan-400">Type</th>
                  <th className="text-left py-3 px-4 text-cyan-400">State</th>
                  <th className="text-left py-3 px-4 text-cyan-400">EIN</th>
                  <th className="text-left py-3 px-4 text-cyan-400">Status</th>
                  <th className="text-left py-3 px-4 text-cyan-400">Annual Report Due</th>
                  <th className="text-left py-3 px-4 text-cyan-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company) => (
                  <tr key={company.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="py-3 px-4 text-white font-medium">{company.name}</td>
                    <td className="py-3 px-4 text-slate-300">{company.type}</td>
                    <td className="py-3 px-4 text-slate-300">{company.state}</td>
                    <td className="py-3 px-4 text-slate-300">{company.ein}</td>
                    <td className="py-3 px-4">
                      <Badge className={company.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}>
                        {company.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{company.annualReportDue}</td>
                    <td className="py-3 px-4">
                      <Button size="sm" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/20">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Calendar */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">📅 Compliance Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <ComplianceItem 
              company="ATHLYNX AI Corporation" 
              task="Delaware Annual Report" 
              dueDate="March 1, 2026" 
              daysLeft={54}
              status="upcoming"
            />
            <ComplianceItem 
              company="Dozier Holdings Group, LLC" 
              task="Texas Franchise Tax" 
              dueDate="May 15, 2026" 
              daysLeft={129}
              status="upcoming"
            />
            <ComplianceItem 
              company="Softmor, Inc." 
              task="Texas Franchise Tax" 
              dueDate="May 15, 2026" 
              daysLeft={129}
              status="upcoming"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================
// PARTNERS MODULE
// ============================================
function PartnersModule() {
  const partners: Partner[] = [
    // FOUNDING TEAM
    { id: 1, name: "Chad Allen Dozier Sr.", role: "Founder/CEO/Chairman", equity: "51%", accessCode: "CHAD-FOUNDER-2026", email: "cdozier14@athlynx.ai", phone: "(601) 498-5282" },
    { id: 2, name: "Glenn Tse", role: "COO/Secretary", equity: "15%", accessCode: "GLENN-PARTNER-2026", email: "gtse@athlynx.ai", phone: "" },
    { id: 3, name: "James 'Jimmy' Boyd", role: "VP Operations", equity: "12%", accessCode: "JIMMY-PARTNER-2026", email: "jboyd@athlynx.com", phone: "" },
    { id: 4, name: "Andrew 'Andy' Kustes", role: "VP Technology", equity: "8%", accessCode: "ANDREW-PARTNER-2026", email: "akustes@athlynx.ai", phone: "" },
    { id: 5, name: "Leronius 'Lee' Marshall", role: "VP Business Dev", equity: "8%", accessCode: "LEE-PARTNER-2026", email: "lmarshall@athlynx.ai", phone: "" },
    // ADVISORS & TRUSTEES
    { id: 6, name: "Nicki Simpson Leggett", role: "Successor Trustee", equity: "0% (Inherits 51%)", accessCode: "MOM-ADVISOR-2026", email: "", phone: "" },
    { id: 7, name: "David Roland Ford Sr.", role: "Legal Advisor", equity: "0%", accessCode: "DAVID-ADVISOR-2026", email: "dford@athlynx.ai", phone: "" },
    // FUTURE PARTNERS
    { id: 8, name: "Peyton", role: "Future Partner", equity: "TBD", accessCode: "PEYTON-FUTURE-2026", email: "", phone: "" },
    { id: 9, name: "Julia", role: "Future Partner", equity: "TBD", accessCode: "JULIA-FUTURE-2026", email: "", phone: "" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          👥 Partner Management
        </h2>
        <Button className="bg-cyan-600 hover:bg-cyan-500">
          + Add Partner
        </Button>
      </div>

      <div className="grid gap-4">
        {partners.map((partner) => (
          <Card key={partner.id} className="bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-xl font-bold">
                    {partner.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{partner.name}</h3>
                    <p className="text-cyan-400 text-sm">{partner.role}</p>
                    <p className="text-slate-400 text-xs">{partner.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-cyan-500/20 text-cyan-400 mb-2">
                    {partner.equity} Equity
                  </Badge>
                  <p className="text-slate-500 text-xs">Code: {partner.accessCode}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* NCNDA Status */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">📝 NCNDA Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <NCNDAStatus name="Chad Allen Dozier Sr." status="signed" />
            <NCNDAStatus name="Glenn Tse" status="pending" />
            <NCNDAStatus name="James 'Jimmy' Boyd" status="pending" />
            <NCNDAStatus name="Andrew 'Andy' Kustes" status="pending" />
            <NCNDAStatus name="Leronius 'Lee' Marshall" status="pending" />
            <NCNDAStatus name="David Roland Ford Sr." status="pending" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================
// CONNECTORS MODULE
// ============================================
function ConnectorsModule() {
  const connectors: Connector[] = [
    // CORE AI INFRASTRUCTURE - POWERED BY MANUS & NEBIUS
    { id: "manus", name: "Manus AI", type: "AI Platform (Meta Acquisition)", status: "connected", lastSync: "Live - Early Adopter", icon: "🤖" },
    { id: "nebius", name: "Nebius AI", type: "AI Infrastructure", status: "connected", lastSync: "Live", icon: "🧠" },
    // STRATEGIC PARTNERSHIPS
    { id: "icc-usa", name: "ICC-USA", type: "Hardware Partner", status: "connected", lastSync: "Active Partnership", icon: "🖥️" },
    { id: "yovole", name: "Yovole Networks", type: "China Partnership", status: "connected", lastSync: "Active Partnership", icon: "🌏" },
    { id: "softmor", name: "Softmor Inc.", type: "Data Center", status: "connected", lastSync: "Active", icon: "🏢" },
    // PAYMENTS & COMMUNICATION
    { id: "stripe", name: "Stripe Payments", type: "Payment", status: "connected", lastSync: "Just now", icon: "💳" },
    { id: "auth0-sms", name: "Auth0 SMS/MFA", type: "Communication", status: "connected", lastSync: "Live", icon: "📱" },
    { id: "resend", name: "Resend Email", type: "Communication", status: "connected", lastSync: "Live", icon: "📧" },
    // HOSTING & DEPLOYMENT
    { id: "vercel", name: "Vercel Hosting", type: "Production Hosting", status: "connected", lastSync: "Live", icon: "▲" },
    { id: "cloudflare-cdn", name: "Cloudflare CDN", type: "CDN & Security", status: "connected", lastSync: "Live", icon: "▲" },
    // PRODUCTIVITY
    { id: "calendar", name: "Google Calendar", type: "Productivity", status: "pending", lastSync: "Not configured", icon: "📅" },
    { id: "docusign", name: "DocuSign", type: "Documents", status: "pending", lastSync: "Not configured", icon: "✍️" },
    // GOVERNMENT FILINGS
    { id: "texas-sos", name: "Texas SOS", type: "State Filing", status: "pending", lastSync: "Manual", icon: "🏛️" },
    { id: "delaware-sos", name: "Delaware SOS", type: "State Filing", status: "pending", lastSync: "Manual", icon: "🏛️" },
    { id: "irs", name: "IRS (EIN)", type: "Federal", status: "pending", lastSync: "Manual", icon: "🏛️" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          🔌 Connectors Hub
        </h2>
        <Button className="bg-cyan-600 hover:bg-cyan-500">
          + Add Connector
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {connectors.map((connector) => (
          <Card key={connector.id} className="bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{connector.icon}</span>
                  <div>
                    <h3 className="text-white font-semibold">{connector.name}</h3>
                    <p className="text-slate-400 text-xs">{connector.type}</p>
                  </div>
                </div>
                <Badge className={
                  connector.status === "connected" ? "bg-green-500/20 text-green-400" :
                  connector.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                  "bg-red-500/20 text-red-400"
                }>
                  {connector.status === "connected" ? "● Connected" :
                   connector.status === "pending" ? "○ Pending" : "○ Disconnected"}
                </Badge>
              </div>
              <p className="text-slate-500 text-xs mb-3">Last sync: {connector.lastSync}</p>
              <Button 
                size="sm" 
                className={connector.status === "connected" ? "bg-slate-600" : "bg-cyan-600 hover:bg-cyan-500"}
                disabled={connector.status === "connected"}
              >
                {connector.status === "connected" ? "Configured" : "Configure"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* API Keys Management */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">🔑 API Keys & Credentials</CardTitle>
          <CardDescription className="text-slate-400">
            Securely manage all authentication credentials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <APIKeyItem name="Manus AI API Key" status="configured" lastUsed="Live" />
            <APIKeyItem name="Nebius AI API Key" status="configured" lastUsed="Live" />
            <APIKeyItem name="Stripe Secret Key" status="configured" lastUsed="Today" />
            <APIKeyItem name="Stripe Publishable Key" status="configured" lastUsed="Today" />
            <APIKeyItem name="Auth0 API Key" status="configured" lastUsed="Live" />
            <APIKeyItem name="Resend API Key" status="configured" lastUsed="Live" />
            <APIKeyItem name="Netlify Deploy Token" status="configured" lastUsed="Live" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================
// EMAILS MODULE
// ============================================
function EmailsModule() {
  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  const templates = [
    { id: "ncnda", name: "NCNDA Request", subject: "ACTION REQUIRED: Sign NCNDA Agreement" },
    { id: "welcome", name: "Welcome Partner", subject: "Welcome to ATHLYNX - Your Access Credentials" },
    { id: "update", name: "Project Update", subject: "ATHLYNX Project Update - Phase Complete" },
    { id: "legal", name: "Legal Review Request", subject: "URGENT: Legal Documents for Review" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
        📧 Email Hub
      </h2>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Compose Email */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">✉️ Compose Email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-slate-400 text-sm">To:</label>
                <Input 
                  placeholder="recipient@email.com"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm">Subject:</label>
                <Input 
                  placeholder="Email subject"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm">Message:</label>
                <textarea 
                  placeholder="Type your message..."
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="w-full h-48 bg-slate-700 border border-slate-600 text-white rounded-md p-3 mt-1"
                />
              </div>
              <div className="flex gap-3">
                <Button className="bg-cyan-600 hover:bg-cyan-500">
                  📤 Send Email
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-300">
                  📎 Attach Files
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Templates */}
        <div>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">📋 Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {templates.map((template) => (
                <Button 
                  key={template.id}
                  variant="outline" 
                  className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700"
                  onClick={() => {
                    setEmailSubject(template.subject);
                    toast.success(`Template "${template.name}" loaded`);
                  }}
                >
                  {template.name}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Quick Send */}
          <Card className="bg-slate-800/50 border-slate-700 mt-4">
            <CardHeader>
              <CardTitle className="text-white">⚡ Quick Send</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full bg-blue-600 hover:bg-blue-500">
                📧 Email All Partners
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-500">
                📧 Email David Ford Sr.
              </Button>
              <Button className="w-full bg-purple-600 hover:bg-purple-500">
                📧 Email Legal Team
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Emails */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">📬 Recent Emails</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <EmailItem 
              to="David Ford Sr., Glenn Tse, Lee Marshall, Jimmy Boyd, Andy Kustes"
              subject="🔥 PHASE 11 COMPLETE - ATHLYNX 2026 - ALL DOCUMENTS READY"
              time="Today, 3:15 PM"
              status="sent"
            />
            <EmailItem 
              to="Glenn Tse"
              subject="Softmor Purchase Agreement - $25,000 FMV"
              time="Today, 2:45 PM"
              status="sent"
            />
            <EmailItem 
              to="All Partners"
              subject="NCNDA Agreement - Signature Required by Jan 15"
              time="Today, 2:30 PM"
              status="sent"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================
// DOCUMENTS MODULE
// ============================================
function DocumentsModule() {
  const documents = [
    { id: 1, name: "MASTER_SCOPE_OF_WORK_JAN_6_2026.pdf", type: "PDF", size: "245 KB", uploadedAt: "Today, 3:15 PM", category: "Reports" },
    { id: 2, name: "IP_PORTFOLIO_MASTER_REPORT.pdf", type: "PDF", size: "247 KB", uploadedAt: "Today, 3:08 PM", category: "Legal" },
    { id: 3, name: "NCNDA_PARTNER_AGREEMENT.pdf", type: "PDF", size: "192 KB", uploadedAt: "Today, 3:08 PM", category: "Legal" },
    { id: 4, name: "STARTUP_EQUITY_AGREEMENT.pdf", type: "PDF", size: "191 KB", uploadedAt: "Today, 3:08 PM", category: "Legal" },
    { id: 5, name: "CORPORATE_STRUCTURE_INVESTOR.pdf", type: "PDF", size: "196 KB", uploadedAt: "Today, 3:09 PM", category: "Legal" },
    { id: 6, name: "SOFTMOR_PURCHASE_AGREEMENT.pdf", type: "PDF", size: "215 KB", uploadedAt: "Today, 3:11 PM", category: "Legal" },
    { id: 7, name: "DHG_IRREVOCABLE_TRUST.pdf", type: "PDF", size: "322 KB", uploadedAt: "Today, 2:59 PM", category: "Legal" },
    { id: 8, name: "DHG_OPERATING_AGREEMENT.pdf", type: "PDF", size: "339 KB", uploadedAt: "Today, 2:59 PM", category: "Legal" },
    { id: 9, name: "LAST_WILL_AND_TESTAMENT.pdf", type: "PDF", size: "318 KB", uploadedAt: "Today, 2:59 PM", category: "Legal" },
    { id: 10, name: "CEMENTCO_LEGAL_PROTECTION_REPORT.pdf", type: "PDF", size: "216 KB", uploadedAt: "Today, 3:15 PM", category: "Legal" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          📁 Document Vault
        </h2>
        <Button className="bg-cyan-600 hover:bg-cyan-500">
          + Upload Document
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2">
        <Badge className="bg-cyan-500/20 text-cyan-400 cursor-pointer hover:bg-cyan-500/30">All</Badge>
        <Badge className="bg-slate-700 text-slate-300 cursor-pointer hover:bg-slate-600">Legal</Badge>
        <Badge className="bg-slate-700 text-slate-300 cursor-pointer hover:bg-slate-600">Reports</Badge>
        <Badge className="bg-slate-700 text-slate-300 cursor-pointer hover:bg-slate-600">Contracts</Badge>
        <Badge className="bg-slate-700 text-slate-300 cursor-pointer hover:bg-slate-600">Filings</Badge>
      </div>

      {/* Documents Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-cyan-400">Document Name</th>
                  <th className="text-left py-3 px-4 text-cyan-400">Category</th>
                  <th className="text-left py-3 px-4 text-cyan-400">Size</th>
                  <th className="text-left py-3 px-4 text-cyan-400">Uploaded</th>
                  <th className="text-left py-3 px-4 text-cyan-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-red-400">📄</span>
                        <span className="text-white">{doc.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-slate-700 text-slate-300">{doc.category}</Badge>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{doc.size}</td>
                    <td className="py-3 px-4 text-slate-300">{doc.uploadedAt}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/20">
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/20">
                          Download
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================
// COMPLIANCE MODULE
// ============================================
function ComplianceModule() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
        ✅ Compliance Center
      </h2>

      {/* Compliance Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-green-900/30 border-green-500/30">
          <CardContent className="p-4 text-center">
            <span className="text-4xl">✅</span>
            <h3 className="text-green-400 font-bold text-2xl mt-2">3</h3>
            <p className="text-green-300">Compliant</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-900/30 border-yellow-500/30">
          <CardContent className="p-4 text-center">
            <span className="text-4xl">⚠️</span>
            <h3 className="text-yellow-400 font-bold text-2xl mt-2">2</h3>
            <p className="text-yellow-300">Upcoming</p>
          </CardContent>
        </Card>
        <Card className="bg-red-900/30 border-red-500/30">
          <CardContent className="p-4 text-center">
            <span className="text-4xl">🚨</span>
            <h3 className="text-red-400 font-bold text-2xl mt-2">0</h3>
            <p className="text-red-300">Overdue</p>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Tasks */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">📋 Compliance Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ComplianceTask 
              task="File ATHLYNX Trademark (USPTO)"
              company="ATHLYNX AI Corporation"
              dueDate="January 20, 2026"
              priority="high"
              status="pending"
            />
            <ComplianceTask 
              task="All Partners Sign NCNDA"
              company="Dozier Holdings Group"
              dueDate="January 15, 2026"
              priority="high"
              status="pending"
            />
            <ComplianceTask 
              task="Delaware Annual Report"
              company="ATHLYNX AI Corporation"
              dueDate="March 1, 2026"
              priority="medium"
              status="upcoming"
            />
            <ComplianceTask 
              task="Texas Franchise Tax"
              company="Dozier Holdings Group, LLC"
              dueDate="May 15, 2026"
              priority="medium"
              status="upcoming"
            />
            <ComplianceTask 
              task="Register Source Code Copyright"
              company="ATHLYNX AI Corporation"
              dueDate="February 1, 2026"
              priority="medium"
              status="pending"
            />
          </div>
        </CardContent>
      </Card>

      {/* IP Filing Status */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">🏆 IP Filing Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <IPFilingItem name="ATHLYNX™" type="Trademark" status="pending" cost="$350" />
            <IPFilingItem name="THE ATHLETE'S PLAYBOOK™" type="Trademark" status="pending" cost="$350" />
            <IPFilingItem name="DOZIER HOLDINGS GROUP™" type="Trademark" status="pending" cost="$350" />
            <IPFilingItem name="Source Code" type="Copyright" status="pending" cost="$65" />
            <IPFilingItem name="AI Athlete Valuation" type="Patent (Provisional)" status="pending" cost="$320" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================
// HELPER COMPONENTS
// ============================================

function QuickStatCard({ title, value, icon, color }: { title: string; value: string | number; icon: string; color: string }) {
  const colorClasses = {
    cyan: "from-cyan-500 to-blue-500",
    blue: "from-blue-500 to-indigo-500",
    green: "from-green-500 to-emerald-500",
    purple: "from-purple-500 to-pink-500",
  };
  
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm">{title}</p>
            <p className="text-white text-2xl font-bold">{value}</p>
          </div>
          <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center text-2xl`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityItem({ icon, text, time }: { icon: string; text: string; time: string }) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
      <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <span className="text-white">{text}</span>
      </div>
      <span className="text-slate-400 text-sm">{time}</span>
    </div>
  );
}

function ComplianceItem({ company, task, dueDate, daysLeft, status }: { company: string; task: string; dueDate: string; daysLeft: number; status: string }) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
      <div>
        <p className="text-white font-medium">{task}</p>
        <p className="text-slate-400 text-sm">{company}</p>
      </div>
      <div className="text-right">
        <p className="text-cyan-400">{dueDate}</p>
        <Badge className={daysLeft < 30 ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400"}>
          {daysLeft} days left
        </Badge>
      </div>
    </div>
  );
}

function NCNDAStatus({ name, status }: { name: string; status: "signed" | "pending" }) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
      <span className="text-white">{name}</span>
      <Badge className={status === "signed" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}>
        {status === "signed" ? "✅ Signed" : "⏳ Pending"}
      </Badge>
    </div>
  );
}

function APIKeyItem({ name, status, lastUsed }: { name: string; status: string; lastUsed: string }) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
      <div className="flex items-center gap-3">
        <span className="text-xl">🔑</span>
        <div>
          <p className="text-white">{name}</p>
          <p className="text-slate-400 text-xs">Last used: {lastUsed}</p>
        </div>
      </div>
      <Badge className={status === "configured" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
        {status === "configured" ? "● Configured" : "○ Not Configured"}
      </Badge>
    </div>
  );
}

function EmailItem({ to, subject, time, status }: { to: string; subject: string; time: string; status: string }) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
      <div>
        <p className="text-white font-medium">{subject}</p>
        <p className="text-slate-400 text-sm">To: {to}</p>
      </div>
      <div className="text-right">
        <p className="text-slate-400 text-sm">{time}</p>
        <Badge className="bg-green-500/20 text-green-400">✓ Sent</Badge>
      </div>
    </div>
  );
}

function ComplianceTask({ task, company, dueDate, priority, status }: { task: string; company: string; dueDate: string; priority: string; status: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
      <div className="flex items-center gap-4">
        <input type="checkbox" className="w-5 h-5 rounded" />
        <div>
          <p className="text-white font-medium">{task}</p>
          <p className="text-slate-400 text-sm">{company}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge className={priority === "high" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"}>
          {priority}
        </Badge>
        <span className="text-slate-300">{dueDate}</span>
      </div>
    </div>
  );
}

function IPFilingItem({ name, type, status, cost }: { name: string; type: string; status: string; cost: string }) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
      <div>
        <p className="text-white font-medium">{name}</p>
        <p className="text-slate-400 text-sm">{type}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-cyan-400">{cost}</span>
        <Badge className="bg-yellow-500/20 text-yellow-400">⏳ {status}</Badge>
      </div>
    </div>
  );
}

// ============================================
// WEB HOSTING MODULE - Like GoDaddy + AWS
// ONE STOP SHOP FOR ALL YOUR NEEDS
// ============================================
function WebHostingModule() {
  const domains = [
    { id: 1, domain: "athlynx.ai", status: "active", expires: "Dec 2026", ssl: true, hosting: "Premium" },
    { id: 2, domain: "athlynx.com", status: "active", expires: "Dec 2026", ssl: true, hosting: "Premium" },
    { id: 3, domain: "dozierholdings.com", status: "active", expires: "Jan 2027", ssl: true, hosting: "Business" },
    { id: 4, domain: "softmor.com", status: "active", expires: "Mar 2026", ssl: true, hosting: "Starter" },
    { id: 5, domain: "theathletesplaybook.com", status: "pending", expires: "-", ssl: false, hosting: "None" },
  ];

  const hostingPlans = [
    { name: "Starter", price: "$9.99/mo", storage: "10GB", bandwidth: "100GB", domains: 1, features: ["SSL Certificate", "Email Hosting", "24/7 Support"] },
    { name: "Business", price: "$24.99/mo", storage: "50GB", bandwidth: "500GB", domains: 5, features: ["SSL Certificate", "Email Hosting", "24/7 Support", "CDN", "Backups"] },
    { name: "Premium", price: "$49.99/mo", storage: "200GB", bandwidth: "Unlimited", domains: 25, features: ["SSL Certificate", "Email Hosting", "24/7 Support", "CDN", "Backups", "Priority Support", "Custom DNS"] },
    { name: "Enterprise", price: "$99.99/mo", storage: "Unlimited", bandwidth: "Unlimited", domains: "Unlimited", features: ["Everything in Premium", "Dedicated IP", "Load Balancing", "White Label", "API Access"] },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            🌐 Web Hosting & Domains
          </h2>
          <p className="text-cyan-400">One Stop Shop For All Your Needs</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-green-600 hover:bg-green-500">
            + Register Domain
          </Button>
          <Button className="bg-cyan-600 hover:bg-cyan-500">
            + New Hosting Plan
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-cyan-500/30">
          <CardContent className="p-4 text-center">
            <span className="text-3xl">🌐</span>
            <h3 className="text-cyan-400 font-bold text-2xl mt-2">5</h3>
            <p className="text-slate-300">Domains</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-green-500/30">
          <CardContent className="p-4 text-center">
            <span className="text-3xl">🖥️</span>
            <h3 className="text-green-400 font-bold text-2xl mt-2">4</h3>
            <p className="text-slate-300">Active Sites</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-purple-500/30">
          <CardContent className="p-4 text-center">
            <span className="text-3xl">🔒</span>
            <h3 className="text-purple-400 font-bold text-2xl mt-2">4</h3>
            <p className="text-slate-300">SSL Certs</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-yellow-500/30">
          <CardContent className="p-4 text-center">
            <span className="text-3xl">📧</span>
            <h3 className="text-yellow-400 font-bold text-2xl mt-2">12</h3>
            <p className="text-slate-300">Email Accounts</p>
          </CardContent>
        </Card>
      </div>

      {/* Domains Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Your Domains</CardTitle>
          <CardDescription className="text-slate-400">Manage all your domains in one place</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-cyan-400">Domain</th>
                  <th className="text-left py-3 px-4 text-cyan-400">Status</th>
                  <th className="text-left py-3 px-4 text-cyan-400">Expires</th>
                  <th className="text-left py-3 px-4 text-cyan-400">SSL</th>
                  <th className="text-left py-3 px-4 text-cyan-400">Hosting</th>
                  <th className="text-left py-3 px-4 text-cyan-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {domains.map((d) => (
                  <tr key={d.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="py-3 px-4">
                      <span className="text-white font-medium">{d.domain}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={d.status === "active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}>
                        {d.status === "active" ? "● Active" : "○ Pending"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{d.expires}</td>
                    <td className="py-3 px-4">
                      {d.ssl ? (
                        <Badge className="bg-green-500/20 text-green-400">🔒 Secure</Badge>
                      ) : (
                        <Badge className="bg-red-500/20 text-red-400">⚠️ Not Secure</Badge>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-cyan-500/20 text-cyan-400">{d.hosting}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-cyan-500 text-cyan-400">
                          Manage
                        </Button>
                        <Button size="sm" variant="outline" className="border-slate-500 text-slate-400">
                          DNS
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Hosting Plans */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Hosting Plans</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {hostingPlans.map((plan) => (
            <Card key={plan.name} className={`bg-slate-800/50 border-slate-700 ${plan.name === "Premium" ? "border-cyan-500 ring-2 ring-cyan-500/30" : ""}`}>
              <CardHeader>
                {plan.name === "Premium" && (
                  <Badge className="w-fit bg-cyan-500 text-white mb-2">MOST POPULAR</Badge>
                )}
                <CardTitle className="text-white">{plan.name}</CardTitle>
                <CardDescription className="text-2xl font-bold text-cyan-400">{plan.price}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-slate-300 text-sm space-y-1">
                  <p>💾 Storage: {plan.storage}</p>
                  <p>📡 Bandwidth: {plan.bandwidth}</p>
                  <p>🌐 Domains: {plan.domains}</p>
                </div>
                <div className="border-t border-slate-700 pt-3">
                  {plan.features.slice(0, 4).map((f, i) => (
                    <p key={i} className="text-green-400 text-xs">✓ {f}</p>
                  ))}
                </div>
                <Button className="w-full bg-cyan-600 hover:bg-cyan-500 mt-2">
                  Select Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// ATHLETE SITES MODULE - Individual Branding
// Build Your Brand, Own Your Future
// ============================================
function AthleteSitesModule() {
  const athleteSites = [
    { id: 1, name: "Demo Athlete", sport: "Baseball", domain: "demoathlete.athlynx.com", status: "live", views: 1250, plan: "Pro" },
    { id: 2, name: "Sample Player", sport: "Basketball", domain: "sampleplayer.athlynx.com", status: "live", views: 890, plan: "Starter" },
    { id: 3, name: "Test Recruit", sport: "Football", domain: "testrecruit.athlynx.com", status: "building", views: 0, plan: "Pro" },
  ];

  const siteTemplates = [
    { id: 1, name: "Recruiting Pro", description: "Perfect for college recruiting", features: ["Highlight Reel", "Stats Dashboard", "Coach Contact Form", "Academic Info"], price: "$19.99/mo" },
    { id: 2, name: "NIL Ready", description: "Built for brand deals", features: ["Media Kit", "Brand Partnerships", "Social Links", "Contact Management"], price: "$29.99/mo" },
    { id: 3, name: "Full Package", description: "Everything you need", features: ["All Recruiting Features", "All NIL Features", "Custom Domain", "Analytics Dashboard"], price: "$49.99/mo" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            ⭐ Athlete Website Builder
          </h2>
          <p className="text-cyan-400">Build Your Brand, Own Your Future</p>
        </div>
        <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400">
          + Create Athlete Site
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 border-cyan-500/30">
          <CardContent className="p-4 text-center">
            <span className="text-3xl">⭐</span>
            <h3 className="text-cyan-400 font-bold text-2xl mt-2">3</h3>
            <p className="text-slate-300">Athlete Sites</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/30">
          <CardContent className="p-4 text-center">
            <span className="text-3xl">👁️</span>
            <h3 className="text-green-400 font-bold text-2xl mt-2">2,140</h3>
            <p className="text-slate-300">Total Views</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
          <CardContent className="p-4 text-center">
            <span className="text-3xl">🏈</span>
            <h3 className="text-purple-400 font-bold text-2xl mt-2">3</h3>
            <p className="text-slate-300">Sports</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-yellow-500/30">
          <CardContent className="p-4 text-center">
            <span className="text-3xl">🎯</span>
            <h3 className="text-yellow-400 font-bold text-2xl mt-2">47</h3>
            <p className="text-slate-300">Coach Views</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Athlete Sites */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Active Athlete Sites</CardTitle>
          <CardDescription className="text-slate-400">Manage athlete recruiting and NIL websites</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {athleteSites.map((site) => (
              <div key={site.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {site.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{site.name}</p>
                    <p className="text-slate-400 text-sm">{site.sport} • {site.domain}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-cyan-400 font-medium">{site.views.toLocaleString()} views</p>
                    <Badge className={site.status === "live" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}>
                      {site.status === "live" ? "● Live" : "🛠️ Building"}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-cyan-500 text-cyan-400">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="border-green-500 text-green-400">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Site Templates */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Athlete Site Templates</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {siteTemplates.map((template) => (
            <Card key={template.id} className="bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-white">{template.name}</CardTitle>
                <CardDescription className="text-slate-400">{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  {template.features.map((f, i) => (
                    <p key={i} className="text-green-400 text-sm">✓ {f}</p>
                  ))}
                </div>
                <div className="border-t border-slate-700 pt-3">
                  <p className="text-2xl font-bold text-cyan-400">{template.price}</p>
                </div>
                <Button className="w-full bg-cyan-600 hover:bg-cyan-500">
                  Use Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Target Market Info */}
      <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-white mb-4">🏆 The ATHLYNX Advantage</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-cyan-400 font-bold mb-2">For Parents</h4>
              <p className="text-slate-300 text-sm">Give your child the recruiting edge. Professional websites that showcase their talent to college coaches.</p>
            </div>
            <div>
              <h4 className="text-cyan-400 font-bold mb-2">For Athletes</h4>
              <p className="text-slate-300 text-sm">Own your brand from day one. Build your NIL empire before you even sign your first deal.</p>
            </div>
            <div>
              <h4 className="text-cyan-400 font-bold mb-2">For Coaches</h4>
              <p className="text-slate-300 text-sm">Find the perfect recruits. Our platform connects you directly with verified athlete profiles.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
