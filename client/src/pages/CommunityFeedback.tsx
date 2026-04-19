import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const feedbackCategories = [
  { id: "feature", label: "Feature Request", icon: "💡" },
  { id: "bug", label: "Bug Report", icon: "🐛" },
  { id: "improvement", label: "Improvement", icon: "📈" },
  { id: "general", label: "General Feedback", icon: "💬" },
];

const statusColors: Record<string, string> = {
  pending: "bg-gray-600",
  reviewing: "bg-yellow-500",
  planned: "bg-purple-500",
  in_progress: "bg-blue-500",
  completed: "bg-green-500",
  declined: "bg-red-600",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  reviewing: "Reviewing",
  planned: "Planned",
  in_progress: "In Progress",
  completed: "Completed",
  declined: "Declined",
};

export default function CommunityFeedback() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState("all");
  const [formData, setFormData] = useState({ title: "", category: "feature", description: "", sport: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [votedIds, setVotedIds] = useState<number[]>([]);

  // Fetch real feedback from DB
  const { data: feedbackData, refetch } = trpc.feedback.list.useQuery({
    category: (activeCategory === "all" ? "all" : activeCategory) as "all" | "feature_request" | "bug_report" | "general" | "content" | "performance",
    limit: 50,
    offset: 0,
  });

  const submitMutation = trpc.feedback.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      refetch();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to submit feedback. Please try again.");
    },
  });


  const voteMutation = trpc.feedback.vote.useMutation({
    onSuccess: (_, vars) => {
      setVotedIds((prev) => [...prev, vars.feedbackId]);
      refetch();
    },
    onError: () => {
      toast.error("Please sign in to vote.");
    },
  });

  // Generate a stable voter identifier from user or browser fingerprint
  const getVoterIdentifier = () => {
    if (user?.email) return user.email;
    let id = localStorage.getItem("athlynx_voter_id");
    if (!id) { id = `anon_${Date.now()}_${Math.random().toString(36).slice(2)}`; localStorage.setItem("athlynx_voter_id", id); }
    return id;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate({
      name: user?.name ?? "Anonymous Athlete",
      email: formData.email || (user?.email ?? "noreply@athlynx.ai"),
      title: formData.title,
      body: formData.description,
      category: (formData.category === "feature" ? "feature_request" : formData.category === "bug" ? "bug_report" : "general") as "feature_request" | "bug_report" | "general" | "content" | "performance",
    });
  };

  const handleVote = (id: number) => {
    if (votedIds.includes(id)) return;
    voteMutation.mutate({ feedbackId: id, voterIdentifier: getVoterIdentifier() });
  };

  const posts = (feedbackData?.items ?? []) as Array<{ id: number; title: string; description?: string; body?: string; category: string; status: string; votes?: number; sport?: string; authorName?: string; adminReply?: string; createdAt: string | number; }>;
  const totalCount = posts.length;

  return (
    <div className="min-h-screen bg-[#060d1a]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#060d1a]/95 backdrop-blur border-b border-blue-900/30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-400 hover:text-white text-sm">← ATHLYNX</Link>
            <span className="text-gray-600">|</span>
            <div>
              <div className="text-white font-black text-lg leading-none">COMMUNITY</div>
              <div className="text-blue-400 text-xs font-bold tracking-widest">FEEDBACK HUB</div>
            </div>
          </div>
          {!user && (
            <Link href="/signin" className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
              Sign Up to Vote
            </Link>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="py-14 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-5xl mb-4">💬</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Your Voice Shapes<br />
            <span className="text-blue-400">ATHLYNX</span>
          </h1>
          <p className="text-gray-300 text-lg mb-2">
            We build what the community needs. Submit ideas, vote on features, and watch your suggestions come to life.
          </p>
          <p className="text-gray-500 text-sm italic">"Dreams Do Come True" — Chad Allen Dozier Sr., Founder</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 px-4 border-y border-blue-900/20 bg-black/20">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: totalCount > 0 ? totalCount.toString() : "0", label: "Ideas Submitted", icon: "💡" },
            { value: posts.filter(p => p.status === "completed").length.toString(), label: "Features Shipped", icon: "✅" },
            { value: posts.reduce((sum, p) => sum + (p.votes ?? 0), 0).toString(), label: "Community Votes", icon: "🗳️" },
            { value: "< 24h", label: "Avg Response Time", icon: "⚡" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-2xl font-black text-blue-400">{s.value}</div>
              <div className="text-gray-400 text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        {/* Left: Submit Form */}
        <div className="md:col-span-1">
          <div className="bg-white/5 border border-blue-900/30 rounded-2xl p-6 sticky top-20">
            <h2 className="text-white font-black text-xl mb-5">Submit Feedback</h2>
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-white font-bold text-lg mb-2">Thank You!</h3>
                <p className="text-gray-400 text-sm mb-4">Your feedback has been submitted. Chad reviews every single submission personally.</p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ title: "", category: "feature", description: "", sport: "", email: "" }); }}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-gray-400 text-xs font-bold block mb-1">Category</label>
                  <div className="grid grid-cols-2 gap-2">
                    {feedbackCategories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat.id })}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                          formData.category === cat.id
                            ? "bg-blue-600 text-white"
                            : "bg-white/5 text-gray-400 hover:bg-white/10"
                        }`}
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-xs font-bold block mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="Brief summary of your idea..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-white/5 border border-blue-900/30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-xs font-bold block mb-1">Your Sport</label>
                  <select
                    value={formData.sport}
                    onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                    className="w-full bg-[#0d1b3e] border border-blue-900/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select sport...</option>
                    {["Football", "Basketball", "Soccer", "Baseball", "Volleyball", "Track & Field", "Swimming", "Wrestling", "Other"].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-xs font-bold block mb-1">Details *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your idea or issue in detail..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-white/5 border border-blue-900/30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-xs font-bold block mb-1">Email (optional)</label>
                  <input
                    type="email"
                    placeholder="Get notified when we respond..."
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-blue-900/30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  {submitMutation.isPending ? "Submitting..." : "Submit Feedback"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right: Community Posts */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <h2 className="text-white font-black text-xl">Community Ideas</h2>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeCategory === "all" ? "bg-blue-600 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                All
              </button>
              {feedbackCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeCategory === cat.id ? "bg-blue-600 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <div className="text-5xl mb-4">💡</div>
              <p className="text-lg font-bold text-gray-400">Be the first to submit feedback!</p>
              <p className="text-sm mt-2">Your ideas shape ATHLYNX. Every suggestion is read by Chad personally.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="bg-white/5 border border-blue-900/20 rounded-xl p-5 hover:border-blue-600/40 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center gap-1">
                      <button
                        onClick={() => handleVote(post.id)}
                        disabled={votedIds.includes(post.id)}
                        className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all ${
                          votedIds.includes(post.id)
                            ? "bg-blue-600 text-white cursor-default"
                            : "bg-white/5 hover:bg-blue-600/20 text-gray-400 hover:text-blue-400"
                        }`}
                      >
                        <span className="text-lg">▲</span>
                        <span className="text-sm font-black">{(post.votes ?? 0) + (votedIds.includes(post.id) ? 1 : 0)}</span>
                      </button>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`text-xs font-bold text-white px-2 py-0.5 rounded-full ${statusColors[post.status] ?? "bg-gray-600"}`}>
                          {statusLabels[post.status] ?? post.status}
                        </span>
                        <span className="text-xs bg-white/10 text-gray-400 px-2 py-0.5 rounded-full capitalize">{post.category.replace("_", " ")}</span>
                        {post.sport && <span className="text-xs text-gray-500">{post.sport}</span>}
                      </div>
                      <h3 className="text-white font-bold text-lg mb-1">{post.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">{post.body ?? post.description}</p>
                      {post.adminReply && (
                        <div className="bg-blue-900/30 border border-blue-700/40 rounded-lg px-4 py-3 mb-3">
                          <div className="text-blue-400 text-xs font-bold mb-1">💬 ATHLYNX Response</div>
                          <p className="text-blue-100 text-sm">{post.adminReply}</p>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 text-xs">
                          {post.authorName ?? "Anonymous"} · {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="py-8 px-4 border-t border-blue-900/30 text-center">
        <p className="text-gray-600 text-sm">ATHLYNX Community Feedback · A Dozier Holdings Group Company</p>
        <Link href="/" className="text-blue-400 text-sm hover:text-blue-300 mt-2 inline-block">← Back to ATHLYNX Platform</Link>
      </footer>
    </div>
  );
}
