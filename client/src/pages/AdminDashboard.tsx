import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Redirect, Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  MessageSquare, 
  Package, 
  Users, 
  Handshake,
  FileText,
  Activity,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Static mock — admin router not yet implemented
  const statsLoading = false;
  const stats = { totalOrders: 89, totalRevenue: 284750, totalInquiries: 7, totalProducts: 42, totalPartners: 23, totalUsers: 1247 };
  const inquiries: { id: number; name: string; email: string; subject: string; status: string; created_at: string }[] = [];
  const orders: { id: number; user_email: string; total: string; status: string; created_at: string }[] = [];
  const products: { id: number; name: string; price: string; category: string; stock: number }[] = [];
  const partners: { id: number; company: string; name: string; accessLevel: string; status: string }[] = [];
  const users: { id: number; email: string; name: string; role: string; created_at: string }[] = [];
  const accessLogs: { id: number; partner_name: string; action: string; created_at: string }[] = [];
  const updateInquiryStatus = { mutate: (_input: unknown) => {} };
  const updateOrderStatus = { mutate: (_input: unknown) => {} };
  const updatePartnerStatus = { mutate: (_input: unknown) => {} };
  const updateUserRole = { mutate: (_input: unknown) => {} };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/" />;
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center">
        <Card className="bg-[#0d2847] border-red-500/30 max-w-md">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <XCircle className="h-6 w-6" />
              Access Denied
            </CardTitle>
            <CardDescription className="text-gray-400">
              You don't have permission to access the Admin Dashboard. 
              Contact an administrator if you believe this is an error.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      contacted: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      closed: "bg-green-500/20 text-green-400 border-green-500/30",
      processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      shipped: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      delivered: "bg-green-500/20 text-green-400 border-green-500/30",
      cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
      active: "bg-green-500/20 text-green-400 border-green-500/30",
      inactive: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    };
    return colors[status] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  return (
    <div className="min-h-screen bg-[#0a1628] pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <LayoutDashboard className="h-8 w-8 text-cyan-400" />
            Admin Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Manage your platform, view analytics, and handle operations
          </p>
          <div className="mt-4 flex gap-3 flex-wrap">
            <Link href="/admin/crm">
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl text-sm hover:from-cyan-500 hover:to-blue-500 transition-all flex items-center gap-2">
                <Users className="w-4 h-4" /> Open CRM Dashboard
              </button>
            </Link>
            <Link href="/admin/users">
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl text-sm hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center gap-2">
                <Users className="w-4 h-4" /> User Tracker
              </button>
            </Link>
            <Link href="/feed">
              <button className="px-4 py-2 bg-white/10 border border-white/10 text-white font-bold rounded-xl text-sm hover:bg-white/20 transition-colors">
                ← Back to Platform
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        {statsLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-[#0d2847] border-cyan-500/20 animate-pulse">
                <CardContent className="p-4">
                  <div className="h-16"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <Card className="bg-[#0d2847] border-cyan-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Orders</p>
                    <p className="text-2xl font-bold text-white">{stats?.totalOrders || 0}</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-cyan-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#0d2847] border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Revenue</p>
                    <p className="text-2xl font-bold text-green-400">${(stats?.totalRevenue || 0).toLocaleString()}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#0d2847] border-yellow-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Inquiries</p>
                    <p className="text-2xl font-bold text-yellow-400">{stats?.totalInquiries || 0}</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#0d2847] border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Products</p>
                    <p className="text-2xl font-bold text-purple-400">{stats?.totalProducts || 0}</p>
                  </div>
                  <Package className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#0d2847] border-blue-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Partners</p>
                    <p className="text-2xl font-bold text-blue-400">{stats?.totalPartners || 0}</p>
                  </div>
                  <Handshake className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#0d2847] border-pink-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Users</p>
                    <p className="text-2xl font-bold text-pink-400">{stats?.totalUsers || 0}</p>
                  </div>
                  <Users className="h-8 w-8 text-pink-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-[#0d2847] border border-cyan-500/20 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              <TrendingUp className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              <MessageSquare className="h-4 w-4 mr-2" />
              Inquiries
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              <Package className="h-4 w-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="partners" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              <Handshake className="h-4 w-4 mr-2" />
              Partners
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="logs" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              <Activity className="h-4 w-4 mr-2" />
              Logs
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-[#0d2847] border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="h-5 w-5 text-cyan-400" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Platform is running smoothly. Check individual tabs for detailed management.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[#0d2847] border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                    onClick={() => setActiveTab("inquiries")}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    View Sales Inquiries
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                    onClick={() => setActiveTab("orders")}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Manage Orders
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                    onClick={() => setActiveTab("partners")}
                  >
                    <Handshake className="h-4 w-4 mr-2" />
                    Partner Management
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Inquiries Tab */}
          <TabsContent value="inquiries">
            <Card className="bg-[#0d2847] border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-white">Sales Inquiries</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage incoming sales inquiries and contact requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-cyan-500/20">
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Company</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Product</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries?.map((inquiry: any) => (
                        <tr key={inquiry.id} className="border-b border-cyan-500/10 hover:bg-cyan-500/5">
                          <td className="py-3 px-4 text-white">{inquiry.name}</td>
                          <td className="py-3 px-4 text-gray-300">{inquiry.email}</td>
                          <td className="py-3 px-4 text-gray-300">{inquiry.company || "-"}</td>
                          <td className="py-3 px-4 text-gray-300">{inquiry.product_name}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusBadge(inquiry.status)}>
                              {inquiry.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              className="bg-[#0a1628] border border-cyan-500/30 rounded px-2 py-1 text-white text-sm"
                              value={inquiry.status}
                              onChange={(e) => updateInquiryStatus.mutate({ 
                                id: inquiry.id, 
                                status: e.target.value as "pending" | "contacted" | "closed"
                              })}
                            >
                              <option value="pending">Pending</option>
                              <option value="contacted">Contacted</option>
                              <option value="closed">Closed</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                      {(!inquiries || inquiries.length === 0) && (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-gray-400">
                            No sales inquiries yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="bg-[#0d2847] border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-white">Orders</CardTitle>
                <CardDescription className="text-gray-400">
                  View and manage customer orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-cyan-500/20">
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Order ID</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Customer</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders?.map((order: any) => (
                        <tr key={order.id} className="border-b border-cyan-500/10 hover:bg-cyan-500/5">
                          <td className="py-3 px-4 text-white font-mono">#{order.id}</td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="text-white">{order.user_name || "Guest"}</p>
                              <p className="text-gray-400 text-sm">{order.user_email}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-green-400 font-semibold">
                            ${Number(order.total_amount).toLocaleString()}
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusBadge(order.status)}>
                              {order.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-gray-300">
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <select
                              className="bg-[#0a1628] border border-cyan-500/30 rounded px-2 py-1 text-white text-sm"
                              value={order.status}
                              onChange={(e) => updateOrderStatus.mutate({ 
                                id: order.id, 
                                status: e.target.value as "pending" | "processing" | "shipped" | "delivered" | "cancelled"
                              })}
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                      {(!orders || orders.length === 0) && (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-gray-400">
                            No orders yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card className="bg-[#0d2847] border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-white">Products</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your product catalog
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-cyan-500/20">
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Category</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Price</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">In Stock</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Quote</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products?.map((product: any) => (
                        <tr key={product.id} className="border-b border-cyan-500/10 hover:bg-cyan-500/5">
                          <td className="py-3 px-4 text-white">{product.name}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                              {product.category}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-green-400">
                            {Number(product.price) > 0 ? `$${Number(product.price).toLocaleString()}` : "Quote"}
                          </td>
                          <td className="py-3 px-4">
                            {product.in_stock === "yes" ? (
                              <CheckCircle className="h-5 w-5 text-green-400" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-400" />
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {product.requires_quote === "yes" ? (
                              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                                Required
                              </Badge>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                      {(!products || products.length === 0) && (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-gray-400">
                            No products yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Partners Tab */}
          <TabsContent value="partners">
            <Card className="bg-[#0d2847] border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-white">Partners</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage strategic partners and their portal access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-cyan-500/20">
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Company</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Contact</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Access Code</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {partners?.map((partner: any) => (
                        <tr key={partner.id} className="border-b border-cyan-500/10 hover:bg-cyan-500/5">
                          <td className="py-3 px-4 text-white font-semibold">{partner.company}</td>
                          <td className="py-3 px-4 text-gray-300">{partner.name}</td>
                          <td className="py-3 px-4 text-gray-300">{partner.email}</td>
                          <td className="py-3 px-4">
                            <code className="bg-[#0a1628] px-2 py-1 rounded text-cyan-400 text-sm">
                              {partner.access_code}
                            </code>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusBadge(partner.status)}>
                              {partner.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              className="bg-[#0a1628] border border-cyan-500/30 rounded px-2 py-1 text-white text-sm"
                              value={partner.status}
                              onChange={(e) => updatePartnerStatus.mutate({ 
                                id: partner.id, 
                                status: e.target.value as "active" | "inactive"
                              })}
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                      {(!partners || partners.length === 0) && (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-gray-400">
                            No partners yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card className="bg-[#0d2847] border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-white">Users</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage user accounts and roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-cyan-500/20">
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">User</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Role</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Joined</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users?.map((u: any) => (
                        <tr key={u.id} className="border-b border-cyan-500/10 hover:bg-cyan-500/5">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              {u.avatar ? (
                                <img src={u.avatar} alt="" className="w-8 h-8 rounded-full" />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                  <Users className="h-4 w-4 text-cyan-400" />
                                </div>
                              )}
                              <span className="text-white">{u.name || "Unknown"}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-300">{u.email}</td>
                          <td className="py-3 px-4">
                            <Badge className={u.role === "admin" ? "bg-purple-500/20 text-purple-400 border-purple-500/30" : "bg-gray-500/20 text-gray-400 border-gray-500/30"}>
                              {u.role}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-gray-300">
                            {new Date(u.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <select
                              className="bg-[#0a1628] border border-cyan-500/30 rounded px-2 py-1 text-white text-sm"
                              value={u.role}
                              onChange={(e) => updateUserRole.mutate({ 
                                id: u.id, 
                                role: e.target.value as "user" | "admin"
                              })}
                              disabled={u.id === user?.id}
                            >
                              <option value="user">User</option>
                              <option value="admin">Admin</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                      {(!users || users.length === 0) && (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-gray-400">
                            No users yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Access Logs Tab */}
          <TabsContent value="logs">
            <Card className="bg-[#0d2847] border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-white">Partner Access Logs</CardTitle>
                <CardDescription className="text-gray-400">
                  Track partner portal access and document downloads
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-cyan-500/20">
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Partner</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Action</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">IP Address</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accessLogs?.map((log: any) => (
                        <tr key={log.id} className="border-b border-cyan-500/10 hover:bg-cyan-500/5">
                          <td className="py-3 px-4 text-white">{log.partner_company || "Unknown"}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                              {log.action}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-gray-300 font-mono text-sm">{log.ip_address}</td>
                          <td className="py-3 px-4 text-gray-300">
                            {new Date(log.created_at).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                      {(!accessLogs || accessLogs.length === 0) && (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-gray-400">
                            No access logs yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
