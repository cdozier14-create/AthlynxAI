import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";

/**
 * Unified auth hook for ATHLYNX platform.
 * Wraps Auth0's useAuth0 and provides a consistent interface.
 */
export function useAuth() {
  const {
    isAuthenticated,
    isLoading,
    user,
    loginWithRedirect,
    logout: auth0Logout,
    getAccessTokenSilently,
  } = useAuth0();

  const login = useCallback(
    (returnTo?: string) => {
      loginWithRedirect({
        appState: { returnTo: returnTo ?? window.location.pathname },
      });
    },
    [loginWithRedirect]
  );

  const logout = useCallback(() => {
    auth0Logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }, [auth0Logout]);

  return {
    isAuthenticated,
    isLoading,
    user: isAuthenticated
      ? {
          id: user?.sub ?? "",
          name: user?.name ?? user?.nickname ?? "",
          email: user?.email ?? "",
          avatarUrl: user?.picture ?? "",
          openId: user?.sub ?? "",
        }
      : null,
    login,
    logout,
    getAccessTokenSilently,
  };
}
