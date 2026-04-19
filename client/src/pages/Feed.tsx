import PlatformLayout from "@/components/PlatformLayout";
import { useState, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

const BADGE_COLORS: Record<string, string> = {
  LIVE: "bg-green-600", NEW: "bg-blue-600", HOT: "bg-orange-500",
  ELITE: "bg-purple-600", AI: "bg-cyan-600", BLEND: "bg-pink-600",
};

function PostCard({ post, currentUserId }: { post: any; currentUserId?: number }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likesCount ?? 0);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const utils = trpc.useUtils();

  const likeMutation = trpc.feed.likePost.useMutation({
    onMutate: () => {
      setLiked(l => !l);
      setLikeCount((c: number) => liked ? c - 1 : c + 1);
    },
    onSettled: () => utils.feed.getFeed.invalidate(),
  });

  const addCommentMutation = trpc.feed.addComment.useMutation({
    onSuccess: () => { setComment(""); utils.feed.getComments.invalidate({ postId: post.id }); },
  });

  const { data: comments = [] } = trpc.feed.getComments.useQuery(
    { postId: post.id },
    { enabled: showComments }
  );

  const initials = (post.authorName || "AT").split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();
  const timeAgo = (date: Date) => {
    const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (s < 60) return `${s}s ago`;
    if (s < 3600) return `${Math.floor(s/60)}m ago`;
    if (s < 86400) return `${Math.floor(s/3600)}h ago`;
    return `${Math.floor(s/86400)}d ago`;
  };

  return (
    <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl overflow-hidden">
      <div className="flex items-start gap-3 p-4">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-sm font-black shrink-0 text-white">
          {post.authorAvatar ? <img src={post.authorAvatar} className="w-full h-full rounded-full object-cover" alt="" /> : initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-white">{post.authorName || "Athlete"}</span>
            <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
          </div>
          <div className="text-blue-400 text-xs">{post.postType || "status"} • {timeAgo(post.createdAt)}</div>
        </div>
        <span className={`text-[9px] font-black px-2 py-1 rounded-full text-white shrink-0 ${BADGE_COLORS[post.postType?.toUpperCase()] ?? "bg-blue-600"}`}>{post.postType?.toUpperCase() || "POST"}</span>
      </div>

      <div className="px-4 pb-3">
        <p className="text-blue-100 text-sm leading-relaxed">{post.content}</p>
      </div>

      {post.mediaUrl && post.mediaType === "video" && (
        <div className="relative bg-black">
          <video className="w-full max-h-64 object-cover" muted loop playsInline controls>
            <source src={post.mediaUrl} />
          </video>
        </div>
      )}
      {post.mediaUrl && post.mediaType === "image" && (
        <img src={post.mediaUrl} className="w-full max-h-64 object-cover" alt="" />
      )}

      <div className="px-4 py-2 flex items-center justify-between text-xs text-blue-500 border-t border-blue-900">
        <span>{likeCount.toLocaleString()} hypes</span>
        <span>{post.commentsCount ?? 0} comments</span>
      </div>

      <div className="px-2 py-1 flex items-center gap-1 border-t border-blue-900">
        <button
          onClick={() => currentUserId && likeMutation.mutate({ postId: post.id })}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-colors ${liked ? 'text-blue-400 bg-blue-900/50' : 'text-blue-500 hover:bg-blue-900/30'}`}
        >
          <svg className="w-4 h-4" fill={liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          Hype
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold text-blue-500 hover:bg-blue-900/30 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Comment
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold text-blue-500 hover:bg-blue-900/30 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </button>
      </div>

      {showComments && (
        <div className="px-4 pb-4 border-t border-blue-900 pt-3">
          {currentUserId ? (
            <div className="flex gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-xs font-bold shrink-0">A</div>
              <div className="flex-1 flex gap-2">
                <input
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && comment.trim() && addCommentMutation.mutate({ postId: post.id, content: comment })}
                  placeholder="Write a comment..."
                  className="flex-1 bg-[#1a3a8f] border border-blue-800 text-white text-sm rounded-full px-3 py-1.5 focus:outline-none focus:border-blue-500 placeholder-blue-500"
                />
                <button
                  onClick={() => comment.trim() && addCommentMutation.mutate({ postId: post.id, content: comment })}
                  disabled={addCommentMutation.isPending || !comment.trim()}
                  className="text-blue-400 hover:text-blue-300 text-sm font-bold px-2 disabled:opacity-50"
                >
                  Post
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-2 mb-3">
              <a href="/signin" className="text-blue-400 text-sm hover:text-blue-300">Sign in to comment</a>
            </div>
          )}
          {comments.length === 0 && <div className="text-xs text-blue-500 text-center">Be the first to comment</div>}
          {comments.map((c: any) => (
            <div key={c.id} className="flex gap-2 mb-2">
              <div className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center text-xs font-bold shrink-0">
                {(c.authorName || "A").slice(0,1).toUpperCase()}
              </div>
              <div className="bg-[#1530a0] rounded-xl px-3 py-2 flex-1">
                <div className="text-xs font-bold text-blue-300">{c.authorName || "Athlete"}</div>
                <div className="text-xs text-blue-100">{c.content}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Feed() {
  const { user } = useAuth();
  const [postText, setPostText] = useState("");
  const [postType, setPostType] = useState<"status"|"achievement"|"workout"|"nil_deal"|"announcement"|"milestone">("status");
  const utils = trpc.useUtils();

  const { data: feedData, isLoading } = trpc.feed.getFeed.useQuery({ limit: 20 });
  const posts = feedData ?? [];

  const createPostMutation = trpc.feed.createPost.useMutation({
    onSuccess: () => { setPostText(""); utils.feed.getFeed.invalidate(); },
  });

  return (
    <PlatformLayout>
      <div className="space-y-4 pb-20 lg:pb-4">
        {/* Create post */}
        <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-4">
          {user ? (
            <>
              <div className="flex gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-sm font-bold shrink-0 text-white">
                  {user.name?.slice(0,1).toUpperCase() || "A"}
                </div>
                <textarea
                  value={postText}
                  onChange={e => setPostText(e.target.value)}
                  placeholder="Share your highlight, training update, or NIL news..."
                  rows={2}
                  className="flex-1 bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 placeholder-blue-500 resize-none"
                />
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-blue-900">
                {[
                  { label: "Highlight", value: "achievement", color: "text-red-400" },
                  { label: "Training", value: "workout", color: "text-green-400" },
                  { label: "NIL Deal", value: "nil_deal", color: "text-yellow-400" },
                  { label: "Update", value: "status", color: "text-blue-400" },
                ].map(btn => (
                  <button
                    key={btn.value}
                    onClick={() => setPostType(btn.value as any)}
                    className={`text-xs font-semibold px-2 py-1.5 rounded-lg transition-colors ${postType === btn.value ? `${btn.color} bg-blue-900/50` : `${btn.color} hover:bg-blue-900/30`}`}
                  >
                    {btn.label}
                  </button>
                ))}
                <button
                  onClick={() => postText.trim() && createPostMutation.mutate({ content: postText, postType: postType })}
                  disabled={createPostMutation.isPending || !postText.trim()}
                  className="ml-auto bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-bold px-4 py-1.5 rounded-lg transition-colors"
                >
                  {createPostMutation.isPending ? "Posting..." : "Post"}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-2">
              <a href="/signin" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl transition-colors">
                Sign In to Post
              </a>
            </div>
          )}
        </div>

        {/* Feed posts */}
        {isLoading && (
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-4 animate-pulse">
                <div className="flex gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full bg-blue-800" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-blue-800 rounded w-1/3" />
                    <div className="h-3 bg-blue-800 rounded w-1/4" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-blue-800 rounded" />
                  <div className="h-3 bg-blue-800 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && posts.length === 0 && (
          <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-8 text-center">
            <div className="text-5xl mb-4">🏆</div>
            <div className="text-white font-bold text-lg mb-2">The Feed is Live — Be First</div>
            <div className="text-blue-400 text-sm mb-4">Share your highlight, training update, or NIL news to start the conversation.</div>
            {!user && <a href="/signin" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl transition-colors">Sign In to Post</a>}
          </div>
        )}

        {posts.map((post: any) => (
          <PostCard key={post.id} post={post} currentUserId={user?.id} />
        ))}
      </div>
    </PlatformLayout>
  );
}
