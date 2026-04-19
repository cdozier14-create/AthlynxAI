import PlatformLayout from "@/components/PlatformLayout";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Notifications() {
  const { user } = useAuth();
  const { data: notifications = [], isLoading, refetch } = trpc.notifications.getRecent.useQuery(undefined, {
    enabled: !!user,
  });
  const markAllReadMutation = trpc.notifications.markAllRead.useMutation({
    onSuccess: () => refetch(),
  });
  const markReadMutation = trpc.notifications.markRead.useMutation({
    onSuccess: () => refetch(),
  });

  if (!user) {
    return (
      <PlatformLayout title="Notifications">
        <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-8 text-center">
          <div className="text-4xl mb-3">🔔</div>
          <h2 className="text-xl font-black text-white mb-2">Sign In to See Notifications</h2>
          <a href="/signin" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-lg transition-colors mt-2">
            Sign In
          </a>
        </div>
      </PlatformLayout>
    );
  }

  const unreadCount = (notifications as any[]).filter(n => !n.isRead).length;

  return (
    <PlatformLayout title="Notifications">
      <div className="space-y-4 pb-20 lg:pb-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-blue-300 text-sm">{unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}</span>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={() => markAllReadMutation.mutate()}
              disabled={markAllReadMutation.isPending}
              className="text-xs text-blue-400 hover:text-white border border-blue-700 px-3 py-1.5 rounded-lg transition-colors"
            >
              Mark all as read
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-4 animate-pulse">
                <div className="h-4 bg-blue-800 rounded w-1/3 mb-2" />
                <div className="h-3 bg-blue-900 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : (notifications as any[]).length === 0 ? (
          <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-8 text-center">
            <div className="text-4xl mb-3">🔔</div>
            <h3 className="text-white font-bold mb-1">No notifications yet</h3>
            <p className="text-blue-400 text-sm">When you get notifications, they'll show up here.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {(notifications as any[]).map((n: any) => (
              <div
                key={n.id}
                onClick={() => !n.isRead && markReadMutation.mutate({ id: n.id })}
                className={`bg-[#1a3a8f] border rounded-xl p-4 cursor-pointer transition-colors hover:border-blue-700 ${
                  !n.isRead ? "border-blue-600 bg-[#1530a0]" : "border-blue-900"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${!n.isRead ? "bg-blue-400" : "bg-transparent"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-semibold text-white text-sm">{n.title}</div>
                      <div className="text-blue-600 text-[10px] shrink-0">{new Date(n.createdAt).toLocaleString()}</div>
                    </div>
                    {n.body && <div className="text-blue-300 text-sm mt-1 leading-relaxed">{n.body}</div>}
                    <div className="mt-1">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        n.type === "success" ? "bg-green-900 text-green-400" :
                        n.type === "warning" ? "bg-yellow-900 text-yellow-400" :
                        n.type === "error" ? "bg-red-900 text-red-400" :
                        "bg-blue-900 text-blue-400"
                      }`}>
                        {n.type || "info"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PlatformLayout>
  );
}
