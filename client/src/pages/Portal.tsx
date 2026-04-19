import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

// App icons data
// ALL 10 ATHLYNX APPS - ACTIVATED!
const CDN = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/qUknrdlyPrUZJQYo.png";
const apps = [
  { id: "portal", name: "Portal", icon: `${CDN}/nil_portal_app_icon_n_final_0993a3be.png`, href: "/portal", active: true },
  { id: "messenger", name: "Messenger", icon: `${CDN}/messenger_7c14ce8a.jpeg`, href: "/messenger", active: true },
  { id: "diamond-grind", name: "Diamond Grind", icon: `${CDN}/diamond-grind_890f28f2.png`, href: "/diamond-grind", active: true },
  { id: "warriors-playbook", name: "Warriors Playbook", icon: `${CDN}/warriors-playbook_b10e7359.png`, href: "/warriors-playbook", active: true },
  { id: "transfer-portal", name: "Transfer Portal", icon: `${CDN}/transfer-portal_509bd0ba.png`, href: "/transfer-portal", active: true },
  { id: "nil-vault", name: "NIL Vault", icon: `${CDN}/nil-vault_e80ffa38.png`, href: "/nil-vault", active: true },
  { id: "ai-sales", name: "AI Sales", icon: `${CDN}/ai-sales_09e2681e.png`, href: "/ai-sales", active: true },
  { id: "faith", name: "Faith", icon: `${CDN}/faith_3b8bdefb.png`, href: "/faith", active: true },
  { id: "ai-recruiter", name: "AI Recruiter", icon: `${CDN}/ai-recruiter_4cfda0f2.png`, href: "/ai-recruiter", active: true },
  { id: "ai-content", name: "AI Content", icon: `${CDN}/ai-content_8f3ef4e3.png`, href: "/ai-content", active: true },
];

export default function Portal() {
  const { user, isAuthenticated, loading: isLoading } = useAuth();
  const [newPostContent, setNewPostContent] = useState("");
  const [activeTab, setActiveTab] = useState<"feed" | "profile" | "apps">("feed");

  // Fetch feed
  const { data: feedPosts, refetch: refetchFeed } = trpc.feed.getFeed.useQuery(
    { limit: 20, offset: 0 },
    { enabled: isAuthenticated }
  );

  // Create post mutation
  const createPost = trpc.feed.createPost.useMutation({
    onSuccess: () => {
      toast.success("Post created!");
      setNewPostContent("");
      refetchFeed();
    },
    onError: (error: { message?: string }) => {
      toast.error(error.message || "Failed to create post");
    },
  });

  const handleCreatePost = () => {
    if (!newPostContent.trim()) {
      toast.error("Please enter some content");
      return;
    }
    createPost.mutate({
      content: newPostContent,
      postType: "status",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-400 border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 flex flex-col items-center justify-start p-4 pt-8">
        <div className="relative group w-full max-w-sm">
          {/* Outer glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-50 transition-all duration-500"></div>
          
          <Card className="relative bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-cyan-500/30 group-hover:border-cyan-400/50 rounded-2xl shadow-2xl transition-all duration-300">
            <CardHeader className="text-center pt-6 pb-2">
              {/* Logo - Mobile Optimized */}
              <div className="flex justify-center mb-3">
                <img 
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/qUknrdlyPrUZJQYo.png" 
                  alt="ATHLYNX - The Athlete's Playbook" 
                  className="h-16 rounded-xl shadow-2xl"
                />
              </div>
              
              {/* THE LEGENDARY TRAINER badge */}
              <div className="inline-block bg-cyan-400 text-slate-900 font-bold text-xs tracking-widest px-3 py-1 rounded-full mb-3 shadow-lg">
                THE LEGENDARY TRAINER
              </div>
              
              <CardTitle className="text-xl text-white font-black">ATHLYNX Portal</CardTitle>
              <p className="text-slate-400 mt-1 text-sm">Log in to access the platform</p>
            </CardHeader>
            <CardContent className="space-y-3 pb-6 px-4">
              <a href="/signin" className="block">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-3 rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 transition-all text-sm">
                  Sign In to ATHLYNX
                </Button>
              </a>
              <Link href="/">
                <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 py-3 rounded-xl text-sm">
                  Back to Home
                </Button>
              </Link>
              
              {/* Tagline */}
              <p className="text-cyan-400 text-xs text-center font-semibold pt-2">Building champions, training winners, and creating empires.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 to-blue-900 backdrop-blur border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <div className="relative cursor-pointer group">
              <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 rounded-xl px-4 py-2 flex items-center gap-3 shadow-xl hover:shadow-cyan-500/30 transition-all border border-cyan-400/30">
                <img 
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/qUknrdlyPrUZJQYo.png" 
                  alt="ATHLYNX - The Athlete's Playbook" 
                  className="h-10 md:h-12 rounded-lg shadow-lg group-hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-slate-300 text-sm">Welcome, {user?.name || "Athlete"}</span>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0) || "A"}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 flex gap-1">
          {[
            { id: "feed", label: "Feed" },
            { id: "profile", label: "My Profile" },
            { id: "apps", label: "Apps" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-cyan-400 border-b-2 border-cyan-400"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "feed" && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Create Post */}
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-4">
                  <Textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="What's on your mind? Share your training updates, NIL deals, or achievements..."
                    className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-500 min-h-[100px]"
                  />
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        📷 Photo
                      </Button>
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        🎥 Video
                      </Button>
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        🏆 Highlight
                      </Button>
                    </div>
                    <Button
                      onClick={handleCreatePost}
                      disabled={createPost.isPending}
                      className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400"
                    >
                      {createPost.isPending ? "Posting..." : "Post"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Feed Posts */}
              {feedPosts && feedPosts.length > 0 ? (
                feedPosts.map((post: any) => (
                  <Card key={post.id} className="bg-slate-800 border-slate-700">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                          A
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-white font-medium">Athlete</span>
                            <span className="text-slate-500 text-sm">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-slate-300">{post.content}</p>
                          <div className="flex gap-4 mt-4 text-slate-500">
                            <button className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                              ❤️ {post.likesCount}
                            </button>
                            <button className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                              💬 {post.commentsCount}
                            </button>
                            <button className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                              🔄 {post.sharesCount}
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-8 text-center">
                    <p className="text-slate-400">No posts yet. Be the first to share something!</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Your Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Followers</span>
                    <span className="text-white font-bold">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Following</span>
                    <span className="text-white font-bold">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Posts</span>
                    <span className="text-white font-bold">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">NIL Deals</span>
                    <span className="text-cyan-400 font-bold">0</span>
                  </div>
                </CardContent>
              </Card>

              {/* Suggested Users */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Suggested Athletes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 text-sm">Connect with other athletes coming soon!</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="max-w-2xl mx-auto">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-3xl">
                    {user?.name?.charAt(0) || "A"}
                  </div>
                  <div>
                    <CardTitle className="text-white text-2xl">{user?.name || "Athlete"}</CardTitle>
                    <p className="text-slate-400">{user?.email}</p>
                    <p className="text-cyan-400 text-sm mt-1">
                      {user?.role === "admin" ? "Admin" : "VIP Member"}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-slate-900 rounded-lg p-4">
                    <p className="text-2xl font-bold text-white">0</p>
                    <p className="text-slate-400 text-sm">Posts</p>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-4">
                    <p className="text-2xl font-bold text-white">0</p>
                    <p className="text-slate-400 text-sm">Followers</p>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-4">
                    <p className="text-2xl font-bold text-white">0</p>
                    <p className="text-slate-400 text-sm">Following</p>
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-6">
                  <h3 className="text-white font-bold mb-4">Profile Settings</h3>
                  <p className="text-slate-400">Profile customization coming soon!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "apps" && (
          <div>
            <h2 className="text-white text-2xl font-bold mb-6">ATHLYNX Apps</h2>
            <p className="text-cyan-400 mb-8">10 Powerful Apps. One Platform. Unlimited Potential.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {apps.map((app) => (
                <Link key={app.id} href={app.active ? app.href : "#"}>
                  <Card
                    className={`bg-slate-800 border-slate-700 hover:border-cyan-400 transition-all cursor-pointer ${
                      !app.active && "opacity-50"
                    }`}
                    onClick={() => !app.active && toast.info(`${app.name} coming soon!`)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-slate-700 rounded-xl flex items-center justify-center">
                        <img
                          src={app.icon}
                          alt={app.name}
                          className="w-12 h-12 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/athlynx-logo-icon.png";
                          }}
                        />
                      </div>
                      <p className="text-white font-medium">{app.name}</p>
                      {!app.active && (
                        <span className="text-xs text-slate-500 mt-1 block">Coming Soon</span>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            © 2025-2026 Dozier Holdings Group, LLC. All Rights Reserved.
          </p>
          <p className="text-cyan-400 text-xs mt-2">
            ATHLYNX - THE ATHLETE'S PLAYBOOK
          </p>
        </div>
      </footer>
    </div>
  );
}
