import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import type { BroadcastMessage } from "../../../drizzle/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft, Send, Users, Megaphone, Clock, CheckCircle2 } from "lucide-react";

const CHANNEL_LABELS: Record<string, string> = {
  in_app: "In-App Only",
  email: "Email Only",
  both: "Email + In-App",
};

const FILTER_LABELS: Record<string, string> = {
  all: "All Users",
  trial: "Trial Users",
  subscribed: "Subscribed Users",
  free: "Free Users",
};

export default function AdminBroadcast() {
  const [, navigate] = useLocation();
  const { user } = useAuth();

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [channel, setChannel] = useState<"in_app" | "email" | "both">("in_app");
  const [recipientFilter, setRecipientFilter] = useState<"all" | "trial" | "subscribed" | "free">("all");

  const statsQuery = trpc.admin.getStats.useQuery(undefined, { enabled: user?.role === "admin" });
  const broadcastsQuery = trpc.admin.getBroadcasts.useQuery(undefined, { enabled: user?.role === "admin" });

  const sendMutation = trpc.admin.sendBroadcast.useMutation({
    onSuccess: (data) => {
      toast.success(`Message sent to ${data.recipientCount} user${data.recipientCount !== 1 ? "s" : ""}!`);
      setSubject("");
      setBody("");
      broadcastsQuery.refetch();
    },
    onError: (err) => toast.error(err.message),
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl font-bold mb-2">Access Denied</p>
          <p className="text-gray-400">Admin access required.</p>
        </div>
      </div>
    );
  }

  const stats = statsQuery.data;
  const recipientEstimate = recipientFilter === "all" ? stats?.totalUsers
    : recipientFilter === "trial" ? stats?.onTrial
    : recipientFilter === "subscribed" ? stats?.withSubscription
    : (stats?.totalUsers ?? 0) - (stats?.withSubscription ?? 0) - (stats?.onTrial ?? 0);

  const handleSend = () => {
    if (!subject.trim()) { toast.error("Subject is required"); return; }
    if (!body.trim()) { toast.error("Message body is required"); return; }
    sendMutation.mutate({ subject, body, channel, recipientFilter });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-950 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin")} className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-1" /> Admin
          </Button>
          <div className="flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-yellow-400" />
            <h1 className="text-xl font-bold">Broadcast Center</h1>
          </div>
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Chad Only</Badge>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compose Panel */}
        <div className="lg:col-span-2 space-y-5">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Send className="w-5 h-5 text-blue-400" />
                Compose Message
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Recipient Filter */}
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Send To</label>
                <Select value={recipientFilter} onValueChange={(v) => setRecipientFilter(v as typeof recipientFilter)}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">All Users {stats ? `(${stats.totalUsers})` : ""}</SelectItem>
                    <SelectItem value="trial">Trial Users {stats ? `(${stats.onTrial})` : ""}</SelectItem>
                    <SelectItem value="subscribed">Subscribed Users {stats ? `(${stats.withSubscription})` : ""}</SelectItem>
                    <SelectItem value="free">Free Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Channel */}
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Delivery Channel</label>
                <Select value={channel} onValueChange={(v) => setChannel(v as typeof channel)}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="in_app">In-App Notification Only</SelectItem>
                    <SelectItem value="email">Email Only</SelectItem>
                    <SelectItem value="both">Email + In-App</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Subject */}
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Subject / Title</label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Welcome to ATHLYNX — You're In!"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  maxLength={256}
                />
                <p className="text-xs text-gray-600 mt-1">{subject.length}/256</p>
              </div>

              {/* Body */}
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Message</label>
                <Textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write your message here. Be direct, be real, be Chad."
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 min-h-[180px] resize-none"
                />
              </div>

              {/* Preview */}
              {(subject || body) && (
                <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
                  <p className="text-xs text-blue-400 font-semibold mb-2 uppercase tracking-wider">Preview</p>
                  {subject && <p className="text-white font-semibold mb-1">{subject}</p>}
                  {body && <p className="text-gray-300 text-sm whitespace-pre-wrap">{body}</p>}
                </div>
              )}

              {/* Send Button */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>
                    ~{recipientEstimate ?? "..."} recipient{(recipientEstimate ?? 0) !== 1 ? "s" : ""} via {CHANNEL_LABELS[channel]}
                  </span>
                </div>
                <Button
                  onClick={handleSend}
                  disabled={sendMutation.isPending || !subject.trim() || !body.trim()}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6"
                >
                  {sendMutation.isPending ? (
                    <span className="flex items-center gap-2"><span className="animate-spin">⟳</span> Sending...</span>
                  ) : (
                    <span className="flex items-center gap-2"><Send className="w-4 h-4" /> Send Now</span>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel: Stats + History */}
        <div className="space-y-5">
          {/* Quick Stats */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm">Audience Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Total Users", value: stats?.totalUsers, color: "text-white" },
                { label: "On Trial", value: stats?.onTrial, color: "text-yellow-400" },
                { label: "Subscribed", value: stats?.withSubscription, color: "text-green-400" },
                { label: "New This Week", value: stats?.newThisWeek, color: "text-blue-400" },
              ].map((s) => (
                <div key={s.label} className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">{s.label}</span>
                  <span className={`font-bold ${s.color}`}>{s.value ?? "—"}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Broadcast History */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" /> Recent Broadcasts
              </CardTitle>
            </CardHeader>
            <CardContent>
              {broadcastsQuery.isLoading ? (
                <p className="text-gray-500 text-sm">Loading...</p>
              ) : !broadcastsQuery.data?.length ? (
                <p className="text-gray-500 text-sm">No broadcasts sent yet.</p>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                  {broadcastsQuery.data.map((b: BroadcastMessage) => (
                    <div key={b.id} className="border border-gray-800 rounded-lg p-3 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-white text-sm font-medium leading-tight line-clamp-2">{b.subject}</p>
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs border-gray-700 text-gray-400 px-1.5 py-0">
                          {FILTER_LABELS[b.recipientFilter]}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-gray-700 text-gray-400 px-1.5 py-0">
                          {CHANNEL_LABELS[b.channel]}
                        </Badge>
                        <span className="text-gray-500 text-xs">{b.recipientCount} sent</span>
                      </div>
                      <p className="text-gray-600 text-xs">
                        {new Date(b.createdAt).toLocaleString("en-US", { timeZone: "America/Chicago", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
