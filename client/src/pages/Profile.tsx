import PlatformLayout from "@/components/PlatformLayout";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";

const PLAN_LABELS: Record<string, { label: string; color: string }> = {
  athlete_pro: { label: "PRO", color: "#0066ff" },
  athlete_elite: { label: "ELITE", color: "#00c2ff" },
  nil_vault: { label: "NIL VAULT", color: "#7c3aed" },
};

function SubscriptionBadge() {
  const { user } = useAuth();
  const { data: sub } = trpc.stripe.getSubscription.useQuery(undefined, { enabled: !!user });
  if (!sub?.plan || !sub.status || (sub.status as string) === "none") return null;
  const info = PLAN_LABELS[sub.plan];
  if (!info) return null;
  return (
    <Link href="/billing">
      <span
        className="text-xs font-black px-2 py-0.5 rounded-full cursor-pointer"
        style={{ backgroundColor: info.color + "22", color: info.color, border: `1px solid ${info.color}44` }}
      >
        {info.label}
      </span>
    </Link>
  );
}

export default function Profile() {
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("posts");
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ sport: "", position: "", school: "", bio: "", height: "", weight: "", gpa: "" });
  const utils = trpc.useUtils();

  // Real profile data from DB
  const { data: profile, isLoading: profileLoading } = trpc.profile.getMyProfile.useQuery(undefined, { enabled: !!user });
  // Real posts from DB
  const { data: userPosts = [] } = trpc.feed.getUserPosts.useQuery(
    { userId: user?.id ?? 0 },
    { enabled: !!user }
  );
  // Real NIL deals from DB
  const { data: nilDeals = [] } = trpc.nil.getMyDeals.useQuery(undefined, { enabled: !!user });

  const updateProfileMutation = trpc.profile.updateProfile.useMutation({
    onSuccess: () => { setEditMode(false); utils.profile.getMyProfile.invalidate(); },
  });

  const displayName = user?.name || "Athlete";
  const initials = displayName.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();

  const sport = profile?.sport || "—";
  const position = profile?.position || "—";
  const school = profile?.school || "—";
  const height = profile?.height || "—";
  const gpa = profile?.gpa ? Number(profile.gpa).toFixed(1) : "—";
  const bio = profile?.bio || "Building my legacy one play at a time. #ATHLYNX #NIL";
  const nilValue = profile?.nilValue ? `$${Number(profile.nilValue).toLocaleString()}` : "—";
  const recruitingStatus = profile?.recruitingStatus || "available";
  const followers = profile?.followers ?? 0;

  const totalNilEarnings = nilDeals
    .filter((d: any) => d.status === "active" || d.status === "completed")
    .reduce((sum: number, d: any) => sum + Number(d.dealValue || 0), 0);

  const handleEditSave = () => {
    updateProfileMutation.mutate({
      sport: editForm.sport || undefined,
      position: editForm.position || undefined,
      school: editForm.school || undefined,
      bio: editForm.bio || undefined,
      height: editForm.height || undefined,
      weight: editForm.weight ? Number(editForm.weight) : undefined,
      gpa: editForm.gpa ? Number(editForm.gpa) : undefined,
    });
  };

  const openEdit = () => {
    setEditForm({
      sport: profile?.sport || "",
      position: profile?.position || "",
      school: profile?.school || "",
      bio: profile?.bio || "",
      height: profile?.height || "",
      weight: profile?.weight != null ? String(profile.weight) : "",
      gpa: profile?.gpa != null ? String(profile.gpa) : "",
    });
    setEditMode(true);
  };

  if (authLoading) {
    return (
      <PlatformLayout>
        <div className="animate-pulse space-y-4">
          <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl overflow-hidden">
            <div className="h-36 bg-blue-900/50"></div>
            <div className="px-4 pb-4 pt-2">
              <div className="w-20 h-20 rounded-full bg-blue-800/50 -mt-10 mb-3"></div>
              <div className="h-5 bg-blue-800/50 rounded w-48 mb-2"></div>
              <div className="h-4 bg-blue-800/50 rounded w-32"></div>
            </div>
          </div>
        </div>
      </PlatformLayout>
    );
  }
  if (!user) {
    return (
      <PlatformLayout>
        <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-8 text-center">
          <div className="text-4xl mb-4">🏆</div>
          <h2 className="text-xl font-black text-white mb-2">Sign In to View Your Profile</h2>
          <p className="text-blue-300 text-sm mb-4">Your athlete profile, NIL deals, and recruiting activity are all here.</p>
          <a href="/signin" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-lg inline-block transition-colors">
            Sign In
          </a>
        </div>
      </PlatformLayout>
    );
  }

  return (
    <PlatformLayout>
      <div className="space-y-4 pb-20 lg:pb-4">
        {/* Cover + Profile */}
        <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl overflow-hidden">
          <div className="h-36 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 relative">
            {profile?.coverUrl && (
              <img src={profile.coverUrl} alt="Cover" className="w-full h-full object-cover absolute inset-0" />
            )}
            {!editMode && (
              <button onClick={openEdit} className="absolute top-3 right-3 bg-black/50 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-black/70 transition-colors">
                Edit Profile
              </button>
            )}
          </div>
          <div className="px-4 pb-4">
            <div className="flex items-end justify-between -mt-10 mb-3">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 border-4 border-[#0d1b3e] flex items-center justify-center text-2xl font-black overflow-hidden">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={displayName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white">{initials}</span>
                  )}
                </div>
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0d1b3e]"></div>
              </div>
              <div className="flex gap-2 mb-1">
                {editMode ? (
                  <>
                    <button
                      onClick={handleEditSave}
                      disabled={updateProfileMutation.isPending}
                      className="bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {updateProfileMutation.isPending ? "Saving..." : "Save"}
                    </button>
                    <button onClick={() => setEditMode(false)} className="border border-blue-700 text-blue-300 text-xs font-bold px-3 py-2 rounded-lg hover:bg-blue-900 transition-colors">
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={openEdit} className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
                      Edit Profile
                    </button>
                    <button className="border border-blue-700 text-blue-300 text-xs font-bold px-3 py-2 rounded-lg hover:bg-blue-900 transition-colors">
                      Share
                    </button>
                  </>
                )}
              </div>
            </div>

            {editMode ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Sport", key: "sport", placeholder: "Football" },
                    { label: "Position", key: "position", placeholder: "QB" },
                    { label: "School", key: "school", placeholder: "University of Alabama" },
                    { label: "Height", key: "height", placeholder: "6'3\"" },
                    { label: "Weight (lbs)", key: "weight", placeholder: "215" },
                    { label: "GPA", key: "gpa", placeholder: "3.6" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="text-blue-400 text-xs mb-1 block">{f.label}</label>
                      <input
                        value={(editForm as any)[f.key]}
                        onChange={e => setEditForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                        placeholder={f.placeholder}
                        className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 placeholder-blue-600"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="text-blue-400 text-xs mb-1 block">Bio</label>
                  <textarea
                    value={editForm.bio}
                    onChange={e => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell your story..."
                    rows={2}
                    className="w-full bg-[#0d1f3c] border border-blue-800 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 placeholder-blue-600 resize-none"
                  />
                </div>
              </div>
            ) : (
              <>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-black text-white">{displayName}</h2>
                    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                    {totalNilEarnings > 0 && (
                      <span className="text-xs bg-green-900 text-green-400 px-2 py-0.5 rounded-full font-bold">
                        ${totalNilEarnings.toLocaleString()} NIL
                      </span>
                    )}
                    <SubscriptionBadge />
                  </div>
                  <div className="text-blue-400 text-sm">{position} • {school}</div>
                  <div className="text-blue-300 text-sm mt-1">{bio}</div>
                </div>

                {/* Stats bar */}
                <div className="grid grid-cols-4 gap-3 mt-4 bg-[#1530a0] rounded-xl p-3">
                  {[
                    { label: "Sport", value: sport },
                    { label: "Position", value: position },
                    { label: "Height", value: height },
                    { label: "GPA", value: gpa },
                  ].map((s, i) => (
                    <div key={i} className="text-center">
                      <div className="text-white font-bold text-sm truncate">{s.value}</div>
                      <div className="text-blue-500 text-xs">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Recruiting status */}
                <div className="flex gap-2 mt-3 flex-wrap">
                  <span className={`text-xs px-3 py-1.5 rounded-full font-bold ${
                    recruitingStatus === "committed" ? "bg-green-900 text-green-400" :
                    recruitingStatus === "signed" ? "bg-purple-900 text-purple-300" :
                    "bg-blue-900 text-blue-300"
                  }`}>
                    {recruitingStatus === "available" ? "Available for Transfer" :
                     recruitingStatus === "committed" ? "Committed" :
                     recruitingStatus === "signed" ? "Signed" : "Recruiting Active"}
                  </span>
                  {nilDeals.length > 0 && <span className="text-xs bg-green-900 text-green-400 px-3 py-1.5 rounded-full font-bold">NIL Active</span>}
                  <span className="text-xs bg-purple-900 text-purple-300 px-3 py-1.5 rounded-full font-bold">Verified Athlete</span>
                </div>

                {/* Connections */}
                <div className="flex gap-6 mt-3 text-sm">
                  <div><span className="font-bold text-white">{followers.toLocaleString()}</span> <span className="text-blue-400">Followers</span></div>
                  <div><span className="font-bold text-white">{userPosts.length}</span> <span className="text-blue-400">Posts</span></div>
                  <div><span className="font-bold text-white">{nilDeals.length}</span> <span className="text-blue-400">NIL Deals</span></div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#1a3a8f] border border-blue-900 rounded-xl p-1">
          {["posts", "highlights", "stats", "recruiting", "nil"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg capitalize transition-colors ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-blue-400 hover:text-white'}`}
            >
              {tab === "nil" ? "NIL" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Posts tab — real data */}
        {activeTab === "posts" && (
          <div className="space-y-3">
            {userPosts.length === 0 ? (
              <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-6 text-center">
                <div className="text-blue-400 text-sm mb-3">No posts yet. Share your first update!</div>
                <Link href="/feed">
                  <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-6 py-2 rounded-lg transition-colors">
                    Go to Feed
                  </button>
                </Link>
              </div>
            ) : (
              userPosts.map((post: any) => (
                <div key={post.id} className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-blue-900 text-blue-400 px-2 py-0.5 rounded-full font-bold uppercase">{post.type || "post"}</span>
                    <span className="text-blue-500 text-xs">{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-blue-100 text-sm">{post.content}</p>
                  {post.mediaUrl && post.mediaType === "image" && (
                    <img src={post.mediaUrl} alt="" className="w-full rounded-lg mt-2 max-h-48 object-cover" />
                  )}
                  {post.mediaUrl && post.mediaType === "video" && (
                    <video className="w-full rounded-lg mt-2 max-h-48 object-cover" muted loop playsInline controls>
                      <source src={post.mediaUrl} />
                    </video>
                  )}
                  <div className="flex gap-4 mt-2 text-xs text-blue-500">
                    <span>{post.likeCount ?? 0} hypes</span>
                    <span>{post.commentCount ?? 0} comments</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Highlights tab */}
        {activeTab === "highlights" && (
          <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-4">
            <h3 className="text-white font-bold mb-3">Highlight Reels</h3>
            {profile?.highlightUrl ? (
              <div className="bg-[#1530a0] rounded-xl overflow-hidden mb-3">
                <video className="w-full aspect-video object-cover" muted loop playsInline controls>
                  <source src={profile.highlightUrl} />
                </video>
                <div className="p-3">
                  <div className="text-white font-semibold text-sm">My Highlight Reel</div>
                </div>
              </div>
            ) : (
              <div className="text-blue-400 text-sm text-center py-4">No highlight reel uploaded yet.</div>
            )}
            <button className="w-full mt-3 border-2 border-dashed border-blue-700 text-blue-400 hover:text-white hover:border-blue-500 text-sm font-bold py-4 rounded-xl transition-colors">
              + Upload Highlight Reel
            </button>
          </div>
        )}

        {/* Stats tab */}
        {activeTab === "stats" && (
          <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-4">
            <h3 className="text-white font-bold mb-3">Athlete Profile Stats</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Sport", value: sport },
                { label: "Position", value: position },
                { label: "School", value: school },
                { label: "Height", value: height },
                { label: "Weight", value: profile?.weight ? `${profile.weight} lbs` : "—" },
                { label: "GPA", value: gpa },
                { label: "NIL Value", value: nilValue },
                { label: "Followers", value: followers.toLocaleString() },
                { label: "Posts", value: userPosts.length.toString() },
              ].map((stat, i) => (
                <div key={i} className="bg-[#1530a0] rounded-xl p-3 text-center">
                  <div className="text-xl font-black text-blue-400 truncate">{stat.value}</div>
                  <div className="text-blue-500 text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recruiting tab */}
        {activeTab === "recruiting" && (
          <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-4">
            <h3 className="text-white font-bold mb-3">Recruiting Status</h3>
            <div className="bg-[#1530a0] rounded-xl p-4 mb-4">
              <div className="text-blue-400 text-xs mb-1">Current Status</div>
              <div className={`text-xl font-black ${
                recruitingStatus === "committed" ? "text-green-400" :
                recruitingStatus === "signed" ? "text-purple-400" :
                "text-blue-300"
              }`}>
                {recruitingStatus === "available" ? "Available for Transfer" :
                 recruitingStatus === "committed" ? "Committed" :
                 recruitingStatus === "signed" ? "Signed" : "Recruiting Active"}
              </div>
            </div>
            <div className="text-center py-4">
              <div className="text-blue-400 text-sm mb-3">Use the Transfer Portal to find your next school</div>
              <Link href="/transfer-portal">
                <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-6 py-2 rounded-lg transition-colors">
                  Open Transfer Portal
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* NIL tab — real data */}
        {activeTab === "nil" && (
          <div className="bg-[#1a3a8f] border border-blue-900 rounded-xl p-4">
            <h3 className="text-white font-bold mb-3">NIL Portfolio</h3>
            {totalNilEarnings > 0 && (
              <div className="bg-[#1530a0] rounded-xl p-4 text-center mb-3">
                <div className="text-blue-400 text-xs mb-1">Total NIL Earnings</div>
                <div className="text-4xl font-black text-green-400">${totalNilEarnings.toLocaleString()}</div>
                <div className="text-blue-400 text-xs mt-1">All Time</div>
              </div>
            )}
            {nilDeals.length === 0 ? (
              <div className="text-center py-4">
                <div className="text-blue-400 text-sm mb-3">No NIL deals yet. Start building your portfolio!</div>
                <Link href="/nil-portal">
                  <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-6 py-2 rounded-lg transition-colors">
                    Browse NIL Deals
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {nilDeals.map((deal: any) => (
                  <div key={deal.id} className="flex items-center justify-between bg-[#1530a0] rounded-xl p-3">
                    <div>
                      <div className="font-semibold text-white text-sm">{deal.brandName}</div>
                      <div className="text-blue-400 text-xs">{deal.description || "NIL Deal"}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold">${Number(deal.dealValue).toLocaleString()}</div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        deal.status === "active" ? "bg-green-900 text-green-400" :
                        deal.status === "completed" ? "bg-blue-900 text-blue-400" :
                        "bg-gray-800 text-gray-400"
                      }`}>{deal.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </PlatformLayout>
  );
}
