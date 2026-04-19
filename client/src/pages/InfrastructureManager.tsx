import { useState } from "react";
import { 
  Server, 
  Cpu, 
  HardDrive, 
  Activity, 
  DollarSign, 
  Cloud, 
  Database,
  Zap,
  TrendingUp,
  Play,
  Square,
  Plus,
  Trash2,
  RefreshCw,
  Settings,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// GPU Types and Pricing
const GPU_TYPES = {
  H100: { name: "NVIDIA H100", memory: 80, price: 2.00, color: "bg-green-500" },
  H200: { name: "NVIDIA H200", memory: 141, price: 2.30, color: "bg-blue-500" },
  B200: { name: "NVIDIA B200", memory: 180, price: 3.00, color: "bg-purple-500" },
  GB200: { name: "NVIDIA GB200 NVL72", memory: 288, price: 5.00, color: "bg-amber-500" },
};

// Mock data for clusters
const mockClusters = [
  {
    id: "dhg-cluster-athlynx-prod",
    name: "ATHLYNX Production",
    provider: "Nebius",
    gpuType: "H100",
    totalGpus: 8,
    runningGpus: 6,
    region: "us-east-1",
    status: "running",
    monthlyEstimate: 11520,
    createdAt: "2026-01-01",
  },
  {
    id: "dhg-cluster-nil-training",
    name: "NIL AI Training",
    provider: "Nebius",
    gpuType: "H200",
    totalGpus: 16,
    runningGpus: 16,
    region: "eu-west-1",
    status: "running",
    monthlyEstimate: 26496,
    createdAt: "2026-01-03",
  },
  {
    id: "dhg-cluster-content-gen",
    name: "Content Generation",
    provider: "ICC-USA",
    gpuType: "B200",
    totalGpus: 4,
    runningGpus: 2,
    region: "us-central-1",
    status: "partial",
    monthlyEstimate: 8640,
    createdAt: "2026-01-05",
  },
];

// Mock data for jobs
const mockJobs = [
  {
    id: "dhg-job-nil-v3",
    name: "NIL Valuation Model v3 Training",
    cluster: "NIL AI Training",
    type: "training",
    status: "running",
    gpuCount: 8,
    progress: 67,
    runtime: "4h 23m",
    estimatedCost: 73.60,
  },
  {
    id: "dhg-job-content-batch",
    name: "Social Content Generation Batch",
    cluster: "Content Generation",
    type: "inference",
    status: "running",
    gpuCount: 2,
    progress: 89,
    runtime: "1h 12m",
    estimatedCost: 7.20,
  },
  {
    id: "dhg-job-transfer-match",
    name: "Transfer Portal Matching - 10K Athletes",
    cluster: "ATHLYNX Production",
    type: "processing",
    status: "queued",
    gpuCount: 4,
    progress: 0,
    runtime: "0m",
    estimatedCost: 0,
  },
  {
    id: "dhg-job-video-highlights",
    name: "Highlight Video Processing",
    cluster: "ATHLYNX Production",
    type: "processing",
    status: "completed",
    gpuCount: 2,
    progress: 100,
    runtime: "2h 45m",
    estimatedCost: 11.00,
  },
];

// Mock hardware orders
const mockHardwareOrders = [
  {
    id: "ICC-ORDER-001",
    item: "8x NVIDIA H100 Server",
    quantity: 2,
    totalPrice: 700000,
    status: "shipped",
    orderedAt: "2025-12-15",
    estimatedDelivery: "2026-01-15",
  },
  {
    id: "ICC-ORDER-002",
    item: "100TB NVMe Storage Array",
    quantity: 4,
    totalPrice: 300000,
    status: "delivered",
    orderedAt: "2025-12-01",
    estimatedDelivery: "2025-12-15",
  },
];

// Mock colocation contracts
const mockColocation = [
  {
    id: "ICC-COLO-001",
    plan: "Enterprise Colocation",
    rackUnits: 42,
    powerKw: 30,
    bandwidth: "100 Gbps",
    monthlyPrice: 7500,
    termMonths: 24,
    status: "active",
  },
];

export default function InfrastructureManager() {
  const [activeTab, setActiveTab] = useState("overview");
  const [clusters, setClusters] = useState(mockClusters);
  const [jobs, setJobs] = useState(mockJobs);
  const [isCreatingCluster, setIsCreatingCluster] = useState(false);
  const [newCluster, setNewCluster] = useState({
    name: "",
    gpuType: "H100",
    gpuCount: 8,
    region: "us-east-1",
    provider: "nebius",
  });
  const { toast } = useToast();

  // Calculate totals
  const totalGpus = clusters.reduce((sum, c) => sum + c.totalGpus, 0);
  const runningGpus = clusters.reduce((sum, c) => sum + c.runningGpus, 0);
  const monthlyCloudCost = clusters.reduce((sum, c) => sum + c.monthlyEstimate, 0);
  const monthlyColoCost = mockColocation.reduce((sum, c) => sum + c.monthlyPrice, 0);
  const hardwareCapex = mockHardwareOrders.reduce((sum, o) => sum + o.totalPrice, 0);

  const handleCreateCluster = () => {
    const gpuInfo = GPU_TYPES[newCluster.gpuType as keyof typeof GPU_TYPES];
    const monthlyEstimate = newCluster.gpuCount * gpuInfo.price * 24 * 30;
    
    const cluster = {
      id: `dhg-cluster-${Date.now()}`,
      name: newCluster.name,
      provider: newCluster.provider === "nebius" ? "Nebius" : "ICC-USA",
      gpuType: newCluster.gpuType,
      totalGpus: newCluster.gpuCount,
      runningGpus: 0,
      region: newCluster.region,
      status: "creating",
      monthlyEstimate,
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    setClusters([...clusters, cluster]);
    setIsCreatingCluster(false);
    setNewCluster({ name: "", gpuType: "H100", gpuCount: 8, region: "us-east-1", provider: "nebius" });
    
    toast({
      title: "🚀 Cluster Created",
      description: `${cluster.name} is being provisioned with ${cluster.totalGpus} ${gpuInfo.name} GPUs`,
    });
  };

  const handleStartCluster = (clusterId: string) => {
    setClusters(clusters.map(c => 
      c.id === clusterId ? { ...c, runningGpus: c.totalGpus, status: "running" } : c
    ));
    toast({
      title: "▶️ Cluster Started",
      description: "All GPUs are now running",
    });
  };

  const handleStopCluster = (clusterId: string) => {
    setClusters(clusters.map(c => 
      c.id === clusterId ? { ...c, runningGpus: 0, status: "stopped" } : c
    ));
    toast({
      title: "⏹️ Cluster Stopped",
      description: "All GPUs have been stopped",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running":
        return <Badge className="bg-green-500">Running</Badge>;
      case "stopped":
        return <Badge variant="secondary">Stopped</Badge>;
      case "creating":
        return <Badge className="bg-blue-500">Creating</Badge>;
      case "partial":
        return <Badge className="bg-amber-500">Partial</Badge>;
      case "queued":
        return <Badge variant="outline">Queued</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "shipped":
        return <Badge className="bg-blue-500">Shipped</Badge>;
      case "delivered":
        return <Badge className="bg-green-500">Delivered</Badge>;
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                <Server className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Infrastructure Manager</h1>
                <p className="text-slate-400 text-sm">Nebius AI Cloud + ICC-USA Hardware</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="border-slate-700">
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync
              </Button>
              <Dialog open={isCreatingCluster} onOpenChange={setIsCreatingCluster}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600">
                    <Plus className="h-4 w-4 mr-2" />
                    New Cluster
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-900 border-slate-700">
                  <DialogHeader>
                    <DialogTitle>Create GPU Cluster</DialogTitle>
                    <DialogDescription>
                      Provision a new GPU cluster on Nebius or ICC-USA
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Cluster Name</Label>
                      <Input 
                        placeholder="e.g., ATHLYNX-AI-Training"
                        value={newCluster.name}
                        onChange={(e) => setNewCluster({ ...newCluster, name: e.target.value })}
                        className="bg-slate-800 border-slate-700"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Provider</Label>
                        <Select 
                          value={newCluster.provider}
                          onValueChange={(v) => setNewCluster({ ...newCluster, provider: v })}
                        >
                          <SelectTrigger className="bg-slate-800 border-slate-700">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nebius">Nebius AI Cloud</SelectItem>
                            <SelectItem value="icc">ICC-USA</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Region</Label>
                        <Select 
                          value={newCluster.region}
                          onValueChange={(v) => setNewCluster({ ...newCluster, region: v })}
                        >
                          <SelectTrigger className="bg-slate-800 border-slate-700">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us-east-1">US East</SelectItem>
                            <SelectItem value="us-west-1">US West</SelectItem>
                            <SelectItem value="eu-west-1">EU West</SelectItem>
                            <SelectItem value="us-central-1">US Central</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>GPU Type</Label>
                        <Select 
                          value={newCluster.gpuType}
                          onValueChange={(v) => setNewCluster({ ...newCluster, gpuType: v })}
                        >
                          <SelectTrigger className="bg-slate-800 border-slate-700">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(GPU_TYPES).map(([key, gpu]) => (
                              <SelectItem key={key} value={key}>
                                {gpu.name} (${gpu.price}/hr)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>GPU Count</Label>
                        <Select 
                          value={newCluster.gpuCount.toString()}
                          onValueChange={(v) => setNewCluster({ ...newCluster, gpuCount: parseInt(v) })}
                        >
                          <SelectTrigger className="bg-slate-800 border-slate-700">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 4, 8, 16, 32, 64].map((n) => (
                              <SelectItem key={n} value={n.toString()}>{n} GPUs</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-800 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Estimated Monthly Cost:</span>
                        <span className="font-bold text-cyan-400">
                          ${(newCluster.gpuCount * GPU_TYPES[newCluster.gpuType as keyof typeof GPU_TYPES].price * 24 * 30).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreatingCluster(false)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleCreateCluster}
                      disabled={!newCluster.name}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600"
                    >
                      Create Cluster
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      {/* Eagle / AI Power Video */}
      <div className="relative bg-black">
        <video
          className="w-full max-h-[50vh] object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/RBdDZfrubjWqomzn.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />
        <div className="absolute bottom-6 left-0 right-0 text-center">
          <div className="text-cyan-400 text-xs uppercase tracking-widest font-bold">AI-Powered Infrastructure</div>
          <div className="text-white font-black text-2xl mt-1">BUILT FOR THE FUTURE</div>
        </div>
      </div>

      <div className="container py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <Cpu className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalGpus}</p>
                  <p className="text-xs text-slate-400">Total GPUs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Activity className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{runningGpus}</p>
                  <p className="text-xs text-slate-400">Running</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{Math.round(runningGpus / totalGpus * 100)}%</p>
                  <p className="text-xs text-slate-400">Utilization</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 rounded-lg">
                  <Server className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{clusters.length}</p>
                  <p className="text-xs text-slate-400">Clusters</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Zap className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{jobs.filter(j => j.status === "running").length}</p>
                  <p className="text-xs text-slate-400">Active Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <DollarSign className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">${Math.round(monthlyCloudCost / 1000)}K</p>
                  <p className="text-xs text-slate-400">Monthly Est.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-slate-800/50 border border-slate-700 mb-6">
            <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-500/20">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="clusters" className="data-[state=active]:bg-cyan-500/20">
              <Cloud className="h-4 w-4 mr-2" />
              Clusters
            </TabsTrigger>
            <TabsTrigger value="jobs" className="data-[state=active]:bg-cyan-500/20">
              <Zap className="h-4 w-4 mr-2" />
              Jobs
            </TabsTrigger>
            <TabsTrigger value="hardware" className="data-[state=active]:bg-cyan-500/20">
              <HardDrive className="h-4 w-4 mr-2" />
              Hardware
            </TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-cyan-500/20">
              <DollarSign className="h-4 w-4 mr-2" />
              Billing
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Cloud Resources */}
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud className="h-5 w-5 text-cyan-400" />
                    Cloud Resources
                  </CardTitle>
                  <CardDescription>Nebius AI Cloud + ICC-USA</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clusters.map((cluster) => (
                      <div key={cluster.id} className="p-4 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${cluster.status === "running" ? "bg-green-500" : "bg-slate-500"}`} />
                            <span className="font-medium">{cluster.name}</span>
                          </div>
                          <Badge variant="outline">{cluster.provider}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-slate-400">
                          <span>{cluster.runningGpus}/{cluster.totalGpus} {GPU_TYPES[cluster.gpuType as keyof typeof GPU_TYPES]?.name || cluster.gpuType}</span>
                          <span>${cluster.monthlyEstimate.toLocaleString()}/mo</span>
                        </div>
                        <Progress 
                          value={(cluster.runningGpus / cluster.totalGpus) * 100} 
                          className="h-2 mt-2"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Active Jobs */}
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-amber-400" />
                    Active Jobs
                  </CardTitle>
                  <CardDescription>Currently running workloads</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {jobs.filter(j => j.status === "running" || j.status === "queued").map((job) => (
                      <div key={job.id} className="p-4 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{job.name}</span>
                          {getStatusBadge(job.status)}
                        </div>
                        <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                          <span>{job.gpuCount} GPUs • {job.cluster}</span>
                          <span>{job.runtime}</span>
                        </div>
                        {job.status === "running" && (
                          <div className="flex items-center gap-2">
                            <Progress value={job.progress} className="h-2 flex-1" />
                            <span className="text-xs text-slate-400">{job.progress}%</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Cost Summary */}
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-emerald-400" />
                    Cost Summary
                  </CardTitle>
                  <CardDescription>Monthly infrastructure costs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-400">Cloud Computing (Nebius)</span>
                      <span className="font-bold">${monthlyCloudCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-400">Colocation (ICC-USA)</span>
                      <span className="font-bold">${monthlyColoCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-400">Hardware CapEx (One-time)</span>
                      <span className="font-bold">${hardwareCapex.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-slate-700 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium">Total Monthly</span>
                        <span className="text-2xl font-bold text-cyan-400">
                          ${(monthlyCloudCost + monthlyColoCost).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-purple-400" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>Common infrastructure tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-auto py-4 flex-col border-slate-700 hover:bg-slate-800">
                      <Cpu className="h-6 w-6 mb-2 text-cyan-400" />
                      <span>Scale Cluster</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex-col border-slate-700 hover:bg-slate-800">
                      <Zap className="h-6 w-6 mb-2 text-amber-400" />
                      <span>Submit Job</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex-col border-slate-700 hover:bg-slate-800">
                      <Database className="h-6 w-6 mb-2 text-green-400" />
                      <span>Add Storage</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex-col border-slate-700 hover:bg-slate-800">
                      <HardDrive className="h-6 w-6 mb-2 text-purple-400" />
                      <span>Order Hardware</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Clusters Tab */}
          <TabsContent value="clusters">
            <div className="grid gap-4">
              {clusters.map((cluster) => (
                <Card key={cluster.id} className="bg-slate-900/50 border-slate-800">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${GPU_TYPES[cluster.gpuType as keyof typeof GPU_TYPES]?.color || "bg-slate-600"}/20`}>
                          <Server className="h-8 w-8" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{cluster.name}</h3>
                          <p className="text-slate-400">{cluster.id}</p>
                          <div className="flex items-center gap-4 mt-2">
                            {getStatusBadge(cluster.status)}
                            <Badge variant="outline">{cluster.provider}</Badge>
                            <Badge variant="outline">{cluster.region}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {cluster.status === "stopped" ? (
                          <Button 
                            size="sm" 
                            onClick={() => handleStartCluster(cluster.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Play className="h-4 w-4 mr-1" />
                            Start
                          </Button>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleStopCluster(cluster.id)}
                            className="border-slate-700"
                          >
                            <Square className="h-4 w-4 mr-1" />
                            Stop
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="border-slate-700">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 mt-6">
                      <div className="p-4 bg-slate-800/50 rounded-lg text-center">
                        <p className="text-3xl font-bold">{cluster.totalGpus}</p>
                        <p className="text-sm text-slate-400">Total GPUs</p>
                      </div>
                      <div className="p-4 bg-slate-800/50 rounded-lg text-center">
                        <p className="text-3xl font-bold text-green-400">{cluster.runningGpus}</p>
                        <p className="text-sm text-slate-400">Running</p>
                      </div>
                      <div className="p-4 bg-slate-800/50 rounded-lg text-center">
                        <p className="text-3xl font-bold">{GPU_TYPES[cluster.gpuType as keyof typeof GPU_TYPES]?.memory || 0}GB</p>
                        <p className="text-sm text-slate-400">Memory/GPU</p>
                      </div>
                      <div className="p-4 bg-slate-800/50 rounded-lg text-center">
                        <p className="text-3xl font-bold text-cyan-400">${Math.round(cluster.monthlyEstimate / 1000)}K</p>
                        <p className="text-sm text-slate-400">Monthly Est.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs">
            <div className="space-y-4">
              {jobs.map((job) => (
                <Card key={job.id} className="bg-slate-900/50 border-slate-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${
                          job.status === "running" ? "bg-green-500/20" :
                          job.status === "completed" ? "bg-cyan-500/20" :
                          job.status === "queued" ? "bg-amber-500/20" : "bg-slate-700"
                        }`}>
                          {job.status === "running" ? <Loader2 className="h-6 w-6 animate-spin" /> :
                           job.status === "completed" ? <CheckCircle className="h-6 w-6 text-green-400" /> :
                           job.status === "queued" ? <Clock className="h-6 w-6 text-amber-400" /> :
                           <AlertCircle className="h-6 w-6" />}
                        </div>
                        <div>
                          <h3 className="font-bold">{job.name}</h3>
                          <p className="text-sm text-slate-400">{job.cluster} • {job.gpuCount} GPUs • {job.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {getStatusBadge(job.status)}
                        <div className="text-right">
                          <p className="font-bold">{job.runtime}</p>
                          <p className="text-sm text-slate-400">${job.estimatedCost.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                    {job.status === "running" && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-slate-400">Progress</span>
                          <span>{job.progress}%</span>
                        </div>
                        <Progress value={job.progress} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Hardware Tab */}
          <TabsContent value="hardware">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Hardware Orders */}
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle>Hardware Orders</CardTitle>
                  <CardDescription>ICC-USA equipment orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockHardwareOrders.map((order) => (
                      <div key={order.id} className="p-4 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{order.item}</span>
                          {getStatusBadge(order.status)}
                        </div>
                        <div className="flex items-center justify-between text-sm text-slate-400">
                          <span>Qty: {order.quantity}</span>
                          <span className="font-bold text-white">${order.totalPrice.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                          Delivery: {order.estimatedDelivery}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Order Hardware
                  </Button>
                </CardContent>
              </Card>

              {/* Colocation */}
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle>Colocation Contracts</CardTitle>
                  <CardDescription>Data center space and power</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockColocation.map((contract) => (
                      <div key={contract.id} className="p-4 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{contract.plan}</span>
                          {getStatusBadge(contract.status)}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-slate-400 mt-3">
                          <div>Rack Units: {contract.rackUnits}U</div>
                          <div>Power: {contract.powerKw} kW</div>
                          <div>Bandwidth: {contract.bandwidth}</div>
                          <div>Term: {contract.termMonths} months</div>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-700">
                          <span className="text-slate-400">Monthly</span>
                          <span className="font-bold text-cyan-400">${contract.monthlyPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Colocation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Cloud Computing</CardTitle>
                  <CardDescription>Nebius AI Cloud costs</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">${monthlyCloudCost.toLocaleString()}</p>
                  <p className="text-slate-400">per month</p>
                  <div className="mt-4 space-y-2">
                    {clusters.map((c) => (
                      <div key={c.id} className="flex justify-between text-sm">
                        <span className="text-slate-400">{c.name}</span>
                        <span>${c.monthlyEstimate.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-purple-400">Colocation</CardTitle>
                  <CardDescription>ICC-USA data center</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">${monthlyColoCost.toLocaleString()}</p>
                  <p className="text-slate-400">per month</p>
                  <div className="mt-4 space-y-2">
                    {mockColocation.map((c) => (
                      <div key={c.id} className="flex justify-between text-sm">
                        <span className="text-slate-400">{c.plan}</span>
                        <span>${c.monthlyPrice.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-amber-400">Hardware CapEx</CardTitle>
                  <CardDescription>One-time purchases</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">${hardwareCapex.toLocaleString()}</p>
                  <p className="text-slate-400">total invested</p>
                  <div className="mt-4 space-y-2">
                    {mockHardwareOrders.map((o) => (
                      <div key={o.id} className="flex justify-between text-sm">
                        <span className="text-slate-400">{o.item}</span>
                        <span>${o.totalPrice.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
