import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  FileText, 
  Download, 
  Lock, 
  Building2, 
  Clock,
  CheckCircle,
  AlertCircle,
  Folder,
  ExternalLink
} from "lucide-react";

interface Partner {
  id: number;
  name: string;
  company: string;
  accessLevel: string;
}

interface Document {
  id: number;
  title: string;
  description: string;
  file_url: string;
  category: string;
  created_at: string;
}

export default function PartnerPortal() {
  const [accessCode, setAccessCode] = useState("");
  const [partner, setPartner] = useState<Partner | null>(null);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  // Static mock — partners router not yet implemented
  const authenticateMutation = {
    mutate: (input: { accessCode: string }) => {
      if (input.accessCode === 'ATHLYNX2025') {
        setPartner({ id: 1, name: 'Demo Partner', company: 'Demo Corp', accessLevel: 'standard' });
        setError('');
      } else {
        setError('Invalid access code. Use ATHLYNX2025 for demo access.');
      }
    },
    isPending: false,
  };
  const allDocuments: Document[] = [
    { id: 1, title: 'Partner Agreement', description: 'Standard partnership agreement', file_url: '#', category: 'contracts', created_at: new Date().toISOString() },
    { id: 2, title: 'Brand Guidelines', description: 'ATHLYNX brand assets and usage guidelines', file_url: '#', category: 'presentations', created_at: new Date().toISOString() },
    { id: 3, title: 'API Documentation', description: 'Integration guide and API reference', file_url: '#', category: 'technical', created_at: new Date().toISOString() },
    { id: 4, title: 'Pricing Proposal', description: 'Custom pricing for your organization', file_url: '#', category: 'quotes', created_at: new Date().toISOString() },
  ];
  const documents: Document[] = partner
    ? (selectedCategory ? allDocuments.filter(d => d.category === selectedCategory) : allDocuments)
    : [];
  const docsLoading = false;
  const logDownloadMutation = { mutate: (_input: unknown) => {} };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode.trim()) {
      setError("Please enter your access code");
      return;
    }
    authenticateMutation.mutate({ accessCode: accessCode.trim() });
  };

  const handleDownload = (doc: Document) => {
    if (partner) {
      logDownloadMutation.mutate({ partnerId: partner.id, documentId: doc.id });
    }
    window.open(doc.file_url, "_blank");
  };

  const categories = [
    { id: undefined, label: "All Documents", icon: Folder },
    { id: "quotes", label: "Quotes", icon: FileText },
    { id: "proposals", label: "Proposals", icon: FileText },
    { id: "technical", label: "Technical", icon: FileText },
    { id: "presentations", label: "Presentations", icon: FileText },
    { id: "contracts", label: "Contracts", icon: FileText },
  ];

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case "executive": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "premium": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default: return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
    }
  };

  // Login Screen
  if (!partner) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#0D1E36] to-[#0A1628] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border-2 border-cyan-400/30 flex items-center justify-center">
              <Shield className="w-10 h-10 text-cyan-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Partner Portal</h1>
            <p className="text-gray-400">Secure access for DHG strategic partners</p>
          </div>

          {/* Login Card */}
          <Card className="bg-[#0D1E36]/80 border-cyan-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-cyan-400" />
                Partner Authentication
              </CardTitle>
              <CardDescription className="text-gray-400">
                Enter your unique access code to view partnership materials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Input
                    type="password"
                    placeholder="Enter access code"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    className="bg-[#0A1628] border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-400"
                  />
                </div>
                
                {error && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"
                  disabled={authenticateMutation.isPending}
                >
                  {authenticateMutation.isPending ? "Authenticating..." : "Access Portal"}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-cyan-500/20">
                <p className="text-gray-500 text-sm text-center">
                  Need access? Contact{" "}
                  <a href="mailto:partnerships@dhg.com" className="text-cyan-400 hover:underline">
                    partnerships@dhg.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-xs flex items-center justify-center gap-1">
              <Shield className="w-3 h-3" />
              256-bit SSL encrypted • All access logged
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Partner Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#0D1E36] to-[#0A1628]">
      {/* Header */}
      <div className="border-b border-cyan-500/20 bg-[#0A1628]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border border-cyan-400/30 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{partner.company}</h1>
                <p className="text-gray-400 text-sm">Welcome, {partner.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className={getAccessLevelColor(partner.accessLevel)}>
                {partner.accessLevel.toUpperCase()} ACCESS
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setPartner(null)}
                className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <Card className="bg-[#0D1E36]/80 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.label}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                      selectedCategory === cat.id
                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                        : "text-gray-400 hover:bg-cyan-500/10 hover:text-white"
                    }`}
                  >
                    <cat.icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-[#0D1E36]/80 border-cyan-500/20 mt-6">
              <CardHeader>
                <CardTitle className="text-white text-lg">Portal Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Active Partnership</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm">Last login: Just now</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">{documents?.length || 0} documents available</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main - Documents */}
          <div className="lg:col-span-3">
            <Card className="bg-[#0D1E36]/80 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  Partnership Documents
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Access your exclusive partnership materials, quotes, and proposals
                </CardDescription>
              </CardHeader>
              <CardContent>
                {docsLoading ? (
                  <div className="text-center py-12">
                    <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading documents...</p>
                  </div>
                ) : documents && documents.length > 0 ? (
                  <div className="space-y-4">
                    {documents.map((doc: Document) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-[#0A1628] border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                            <FileText className="w-6 h-6 text-cyan-400" />
                          </div>
                          <div>
                            <h3 className="text-white font-medium">{doc.title}</h3>
                            {doc.description && (
                              <p className="text-gray-400 text-sm mt-1">{doc.description}</p>
                            )}
                            <div className="flex items-center gap-3 mt-2">
                              <Badge variant="outline" className="text-xs border-cyan-500/30 text-cyan-400">
                                {doc.category}
                              </Badge>
                              <span className="text-gray-500 text-xs">
                                {new Date(doc.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(doc)}
                            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(doc.file_url, "_blank")}
                            className="text-gray-400 hover:text-white"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Folder className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-white font-medium mb-2">No Documents Yet</h3>
                    <p className="text-gray-400 text-sm">
                      Documents will appear here once they're shared with you.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="bg-[#0D1E36]/80 border-cyan-500/20 mt-6">
              <CardContent className="py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Need Assistance?</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      Contact your dedicated partnership manager for support
                    </p>
                  </div>
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
