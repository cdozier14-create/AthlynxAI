import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import {
  MessageCircle, Search, Send, Phone, Video, MoreVertical,
  Users, Star, CheckCheck, Mic, ArrowLeft, Bell, Plus, Loader2
} from "lucide-react";
import { toast } from "sonner";
import PlatformLayout from "@/components/PlatformLayout";

export default function Messages() {
  const { user } = useAuth();
  const [selectedConvId, setSelectedConvId] = useState<number | null>(null);
  const [messageText, setMessageText] = useState("");
  const [search, setSearch] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const utils = trpc.useUtils();

  const { data: conversations = [], isLoading: loadingConvs } = trpc.messenger.getConversations.useQuery(
    undefined,
    { enabled: !!user, refetchInterval: 8000 }
  );

  const { data: messages = [], isLoading: loadingMsgs } = trpc.messenger.getMessages.useQuery(
    { conversationId: selectedConvId!, limit: 80 },
    { enabled: !!selectedConvId, refetchInterval: 5000 }
  );

  const sendMutation = trpc.messenger.sendMessage.useMutation({
    onSuccess: () => {
      utils.messenger.getMessages.invalidate({ conversationId: selectedConvId! });
      utils.messenger.getConversations.invalidate();
      setMessageText("");
    },
    onError: (err) => toast.error(err.message),
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!messageText.trim() || !selectedConvId) return;
    sendMutation.mutate({ conversationId: selectedConvId, content: messageText.trim() });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const selectedConv = conversations.find((c: { id: number; name: string | null; isGroup: boolean; lastMessage: string | null; lastMessageAt: Date; createdAt: Date }) => c.id === selectedConvId);
  type ConvItem = typeof conversations[0];
  const filteredConvs = conversations.filter((c: ConvItem) =>
    !search || (c.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (c.lastMessage ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const getInitials = (name?: string | null) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const formatTime = (d?: Date | null) => {
    if (!d) return "";
    const date = new Date(d);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    if (diff < 60000) return "just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <PlatformLayout>
      <div className="flex h-[calc(100vh-64px)] bg-[#0a0f1e] text-white overflow-hidden rounded-xl border border-blue-900">
        {/* Sidebar */}
        <div className={`${selectedConvId ? "hidden md:flex" : "flex"} flex-col w-full md:w-80 border-r border-blue-900 bg-[#0d1b3e]`}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-blue-900">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-400" />
              <span className="font-bold text-white">Messages</span>
              {conversations.length > 0 && (
                <span className="bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {conversations.length}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1.5 rounded-lg hover:bg-blue-900 text-blue-400 hover:text-white transition-colors">
                <Bell className="w-4 h-4" />
              </button>
              <button
                className="p-1.5 rounded-lg hover:bg-blue-900 text-blue-400 hover:text-white transition-colors"
                onClick={() => toast.info("Start a new conversation from an athlete's profile.")}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="px-3 py-2 border-b border-blue-900">
            <div className="flex items-center gap-2 bg-blue-950 rounded-full px-3 py-1.5">
              <Search className="w-4 h-4 text-blue-400 shrink-0" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-transparent text-sm text-white placeholder-blue-400 outline-none flex-1"
              />
            </div>
          </div>

          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto">
            {loadingConvs ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
              </div>
            ) : filteredConvs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center gap-3">
                <Users className="w-12 h-12 text-blue-800" />
                <p className="text-blue-400 text-sm font-medium">No conversations yet</p>
                <p className="text-blue-600 text-xs">Connect with coaches, athletes, and scouts from their profiles.</p>
              </div>
            ) : (
              filteredConvs.map((conv: ConvItem) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConvId(conv.id)}
                  className={`w-full flex items-start gap-3 px-4 py-3 hover:bg-blue-900/40 transition-colors border-b border-blue-900/40 text-left ${selectedConvId === conv.id ? "bg-blue-900/60" : ""}`}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-sm font-bold shrink-0">
                    {getInitials(conv.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-sm font-semibold text-white truncate">{conv.name ?? "Conversation"}</span>
                      <span className="text-xs text-blue-500 shrink-0">{formatTime(conv.lastMessageAt)}</span>
                    </div>
                    <p className="text-xs text-blue-400 truncate mt-0.5">{conv.lastMessage ?? "No messages yet"}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Chat area */}
        {selectedConvId ? (
          <div className="flex flex-col flex-1 min-w-0">
            {/* Chat header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-blue-900 bg-[#0d1b3e]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedConvId(null)}
                  className="md:hidden p-1.5 rounded-lg hover:bg-blue-900 text-blue-400"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-sm font-bold">
                  {getInitials(selectedConv?.name)}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{selectedConv?.name ?? "Conversation"}</div>
                  <div className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    Active
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-lg hover:bg-blue-900 text-blue-400 hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-blue-900 text-blue-400 hover:text-white transition-colors">
                  <Video className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-blue-900 text-blue-400 hover:text-white transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {loadingMsgs ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                  <MessageCircle className="w-12 h-12 text-blue-800" />
                  <p className="text-blue-400 text-sm">No messages yet. Say hello!</p>
                </div>
              ) : (
                [...messages].reverse().map(msg => {
                  const isMe = msg.senderId === user?.id;
                  return (
                    <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"} gap-2`}>
                      {!isMe && (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-xs font-bold shrink-0 mt-1">
                          {getInitials(msg.senderName)}
                        </div>
                      )}
                      <div className={`max-w-xs lg:max-w-md ${isMe ? "items-end" : "items-start"} flex flex-col gap-1`}>
                        {!isMe && (
                          <span className="text-xs text-blue-400 px-1">{msg.senderName}</span>
                        )}
                        <div className={`px-3 py-2 rounded-2xl text-sm ${isMe ? "bg-blue-600 text-white rounded-br-sm" : "bg-[#1a3a8f] text-white rounded-bl-sm"}`}>
                          {msg.content}
                        </div>
                        <div className={`flex items-center gap-1 text-xs text-blue-500 px-1 ${isMe ? "justify-end" : ""}`}>
                          <span>{formatTime(msg.createdAt)}</span>
                          {isMe && <CheckCheck className="w-3 h-3 text-blue-400" />}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-blue-900 bg-[#0d1b3e]">
              <div className="flex items-end gap-2">
                <div className="flex-1 bg-blue-950 rounded-2xl px-4 py-2 flex items-end gap-2">
                  <textarea
                    value={messageText}
                    onChange={e => setMessageText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    rows={1}
                    className="flex-1 bg-transparent text-sm text-white placeholder-blue-400 outline-none resize-none max-h-32"
                  />
                  <button className="text-blue-400 hover:text-white transition-colors mb-0.5">
                    <Mic className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleSend}
                  disabled={!messageText.trim() || sendMutation.isPending}
                  className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 flex items-center justify-center transition-colors shrink-0"
                >
                  {sendMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-blue-600 mt-1.5 text-center">Press Enter to send · Shift+Enter for new line</p>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-col flex-1 items-center justify-center gap-4 text-center px-8">
            <div className="w-20 h-20 rounded-full bg-blue-900/50 flex items-center justify-center">
              <MessageCircle className="w-10 h-10 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Your Messages</h3>
              <p className="text-blue-400 text-sm max-w-xs">
                Connect with coaches, scouts, and fellow athletes. Select a conversation to get started.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-500">
              <Star className="w-3 h-3" />
              <span>End-to-end encrypted · HIPAA compliant</span>
            </div>
          </div>
        )}
      </div>
    </PlatformLayout>
  );
}
