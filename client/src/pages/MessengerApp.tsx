import PlatformLayout from "@/components/PlatformLayout";
import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

const COLORS = [
  "from-blue-600 to-blue-800",
  "from-green-600 to-teal-700",
  "from-orange-600 to-red-700",
  "from-purple-600 to-blue-700",
  "from-yellow-600 to-orange-700",
];

function getColor(id: number) {
  return COLORS[id % COLORS.length];
}

function initials(name: string) {
  return (name || "?").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

export default function MessengerApp() {
  const { user, loading: authLoading } = useAuth();
  const [activeConvoId, setActiveConvoId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [showList, setShowList] = useState(true);
  const [newConvoName, setNewConvoName] = useState("");
  const [showNewConvo, setShowNewConvo] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const utils = trpc.useUtils();

  // Real conversations from DB
  const { data: conversations = [], isLoading: convosLoading } = trpc.messenger.getConversations.useQuery(
    undefined,
    { enabled: !!user, refetchInterval: 5000 }
  );

  // Real messages from DB
  const { data: messages = [], isLoading: msgsLoading } = trpc.messenger.getMessages.useQuery(
    { conversationId: activeConvoId ?? 0 },
    { enabled: !!user && !!activeConvoId, refetchInterval: 3000 }
  );

  const sendMessageMutation = trpc.messenger.sendMessage.useMutation({
    onSuccess: () => {
      setMessage("");
      utils.messenger.getMessages.invalidate({ conversationId: activeConvoId ?? 0 });
      utils.messenger.getConversations.invalidate();
    },
  });

  const startConvoMutation = trpc.messenger.startConversation.useMutation({
    onSuccess: (data: any) => {
      setShowNewConvo(false);
      setNewConvoName("");
      setActiveConvoId(data.conversationId);
      utils.messenger.getConversations.invalidate();
    },
  });

  useEffect(() => {
    if (conversations.length > 0 && !activeConvoId) {
      setActiveConvoId((conversations[0] as any).id);
    }
  }, [conversations, activeConvoId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim() || !activeConvoId) return;
    sendMessageMutation.mutate({ conversationId: activeConvoId, content: message });
  };

  const activeConvo = conversations.find((c: any) => c.id === activeConvoId);

  if (authLoading) {
    return (
      <PlatformLayout title="Messenger">
        <div className="animate-pulse bg-[#1a3a8f] border border-blue-900 rounded-xl overflow-hidden" style={{ height: "calc(100vh - 180px)", minHeight: "500px" }}>
          <div className="flex h-full">
            <div className="w-72 border-r border-blue-900 p-4 space-y-3">
              {[1,2,3,4].map(i => <div key={i} className="h-14 bg-blue-800/40 rounded-xl"></div>)}
            </div>
            <div className="flex-1 p-4"><div className="h-full bg-blue-800/20 rounded-xl"></div></div>
          </div>
        </div>
      </PlatformLayout>
    );
  }
  if (!user) {
    return (
      <PlatformLayout title="Messenger">
        <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-8 text-center">
          <div className="text-4xl mb-4">💬</div>
          <h2 className="text-xl font-black text-white mb-2">Sign In to Use Messenger</h2>
          <p className="text-blue-300 text-sm mb-4">Connect with coaches, brands, and fellow athletes.</p>
          <a href="/signin" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-lg inline-block transition-colors">
            Sign In
          </a>
        </div>
      </PlatformLayout>
    );
  }

  return (
    <PlatformLayout title="Messenger">
      <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl overflow-hidden" style={{ height: "calc(100vh - 180px)", minHeight: "500px" }}>
        <div className="flex h-full">
          {/* Conversation list */}
          <div className={`${showList ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-80 border-r border-blue-900 shrink-0`}>
            <div className="p-3 border-b border-blue-900">
              <div className="flex items-center gap-2 mb-3">
                <img src="/logos/nil-portal-logo.png" alt="Messenger" className="w-8 h-8 rounded-lg" />
                <span className="font-black text-white">Messenger</span>
                <span className="ml-auto text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">LIVE</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="flex-1 bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 placeholder-blue-500"
                />
                <button
                  onClick={() => setShowNewConvo(!showNewConvo)}
                  className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                  title="New conversation"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              {showNewConvo && (
                <div className="mt-2 flex gap-2">
                  <input
                    value={newConvoName}
                    onChange={e => setNewConvoName(e.target.value)}
                    placeholder="Conversation name..."
                    className="flex-1 bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 placeholder-blue-500"
                    onKeyDown={e => { if (e.key === "Enter") { const id = parseInt(newConvoName); if (!isNaN(id)) startConvoMutation.mutate({ recipientId: id, initialMessage: "👋 Hey!" }); } }}
                  />
                  <button
                    onClick={() => {
                      const id = parseInt(newConvoName);
                      if (!isNaN(id)) startConvoMutation.mutate({ recipientId: id, initialMessage: "👋 Hey!" });
                    }}
                    disabled={startConvoMutation.isPending}
                    className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
                  >
                    Start
                  </button>
                </div>
              )}
            </div>
            <div className="flex-1 overflow-y-auto">
              {convosLoading && (
                <div className="p-4 text-center text-blue-400 text-sm">Loading conversations...</div>
              )}
              {!convosLoading && conversations.length === 0 && (
                <div className="p-4 text-center">
                  <div className="text-blue-400 text-sm mb-2">No conversations yet</div>
                  <button
                    onClick={() => setShowNewConvo(true)}
                    className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Start a conversation
                  </button>
                </div>
              )}
              {conversations.map((convo: any) => (
                <button
                  key={convo.id}
                  onClick={() => { setActiveConvoId(convo.id); setShowList(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-3 hover:bg-blue-900/50 transition-colors border-b border-blue-900/50 text-left ${activeConvoId === convo.id ? 'bg-blue-900/50' : ''}`}
                >
                  <div className="relative shrink-0">
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${getColor(convo.id)} flex items-center justify-center text-sm font-black text-white`}>
                      {initials(convo.name || "Chat")}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white text-sm truncate">{convo.name || "Conversation"}</span>
                      <span className="text-blue-500 text-xs shrink-0 ml-2">
                        {convo.lastMessageAt ? new Date(convo.lastMessageAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
                      </span>
                    </div>
                    <div className="text-xs text-blue-400 truncate">{convo.lastMessage || "No messages yet"}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat window */}
          <div className={`${!showList ? 'flex' : 'hidden'} md:flex flex-col flex-1 min-w-0`}>
            {!activeConvo ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-3">💬</div>
                  <div className="text-blue-300 font-semibold">Select a conversation</div>
                  <div className="text-blue-500 text-sm mt-1">or start a new one</div>
                </div>
              </div>
            ) : (
              <>
                {/* Chat header */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-blue-900">
                  <button onClick={() => setShowList(true)} className="md:hidden p-1 text-blue-400 hover:text-white mr-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${getColor((activeConvo as any).id)} flex items-center justify-center text-sm font-black shrink-0 text-white`}>
                    {initials((activeConvo as any).name || "Chat")}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white text-sm">{(activeConvo as any).name || "Conversation"}</div>
                    <div className="text-xs text-green-400">Active</div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {msgsLoading && <div className="text-center text-blue-400 text-sm">Loading messages...</div>}
                  {!msgsLoading && messages.length === 0 && (
                    <div className="text-center text-blue-500 text-sm py-8">No messages yet. Say hello!</div>
                  )}
                  {messages.map((msg: any) => {
                    const isMe = msg.senderId === user.id;
                    return (
                      <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} gap-2`}>
                        {!isMe && (
                          <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${getColor(msg.senderId ?? 0)} flex items-center justify-center text-xs font-bold shrink-0 text-white`}>
                            {initials(msg.senderName || "?")}
                          </div>
                        )}
                        <div className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm ${isMe ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-[#1530a0] text-blue-100 rounded-bl-sm'}`}>
                          {!isMe && <div className="text-[10px] font-bold text-blue-400 mb-0.5">{msg.senderName}</div>}
                          <p>{msg.content}</p>
                          <p className={`text-[10px] mt-1 ${isMe ? 'text-blue-200' : 'text-blue-500'}`}>
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message input */}
                <div className="p-3 border-t border-blue-900">
                  <div className="flex gap-2 items-end">
                    <input
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                      placeholder="Type a message..."
                      className="flex-1 bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 placeholder-blue-500"
                    />
                    <button
                      onClick={handleSend}
                      disabled={sendMessageMutation.isPending || !message.trim()}
                      className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors shrink-0 disabled:opacity-50"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </PlatformLayout>
  );
}
