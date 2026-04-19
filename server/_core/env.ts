export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",

  // ─── Okta Enterprise Auth (ready for migration) ───────────────────────────
  // When Okta enterprise credentials arrive, set these env vars and update
  // server/_core/oauth.ts to route through Okta's /authorize + /token endpoints.
  // OKTA_DOMAIN=your-org.okta.com
  // OKTA_CLIENT_ID=your_client_id
  // OKTA_CLIENT_SECRET=your_client_secret
  // OKTA_AUDIENCE=api://default
  oktaDomain: process.env.OKTA_DOMAIN ?? "",
  oktaClientId: process.env.OKTA_CLIENT_ID ?? "",
  oktaClientSecret: process.env.OKTA_CLIENT_SECRET ?? "",
  oktaAudience: process.env.OKTA_AUDIENCE ?? "api://default",
  useOkta: !!(process.env.OKTA_DOMAIN && process.env.OKTA_CLIENT_ID && process.env.OKTA_CLIENT_SECRET),
};
