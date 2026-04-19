import { useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { trpc } from "@/lib/trpc";

/**
 * Auth0 redirects here after login.
 * We sync the Auth0 user to our backend DB (which sets a session cookie),
 * then do a HARD redirect to /feed so the browser picks up the new cookie.
 */
export default function AuthCallback() {
  const { isAuthenticated, isLoading, user, getIdTokenClaims } = useAuth0();
  const syncUser = trpc.auth.syncAuth0User.useMutation();
  const hasSynced = useRef(false);

  useEffect(() => {
    if (isLoading) return;
    if (hasSynced.current) return;

    if (!isAuthenticated || !user) {
      // Not authenticated — go back to sign in
      window.location.href = "/signin";
      return;
    }

    hasSynced.current = true;

    const doSync = async () => {
      try {
        // Use ID token claims — works without an audience configured
        const claims = await getIdTokenClaims();
        const token = claims?.__raw ?? user.sub ?? "auth0_session";

        await syncUser.mutateAsync({
          token,
          name: user.name ?? user.nickname ?? user.email ?? "",
          email: user.email ?? "",
          picture: user.picture ?? "",
          sub: user.sub ?? "",
        });
      } catch (err) {
        console.error("[AuthCallback] Sync failed:", err);
        // Even if sync fails, redirect so user isn't stuck
      } finally {
        // HARD redirect to homepage after login/signup (per Okta POC requirement)
        window.location.href = "/";
      }
    };

    doSync();
  }, [isAuthenticated, isLoading, user]);

  return (
    <div className="min-h-screen bg-[#050c1a] flex items-center justify-center">
      <div className="text-center">
        <div className="w-14 h-14 border-2 border-[#00c2ff] border-t-transparent rounded-full animate-spin mx-auto mb-5" />
        <p className="text-white font-bold text-lg mb-1">Signing you in...</p>
        <p className="text-white/40 text-sm">Setting up your ATHLYNX account</p>
      </div>
    </div>
  );
}
