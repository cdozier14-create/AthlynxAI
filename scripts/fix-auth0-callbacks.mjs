import { execSync } from 'child_process';

// Load env from the webdev environment
const domain = process.env.VITE_AUTH0_DOMAIN || 'dev-bzdjgeksqaxkjoqq.us.auth0.com';
const clientId = process.env.VITE_AUTH0_CLIENT_ID || '6kMlNIq8zEF97huCYBhSFTgSvWNcWSbW';
const clientSecret = process.env.AUTH0_CLIENT_SECRET;

if (!clientSecret) {
  console.error('AUTH0_CLIENT_SECRET not found in environment');
  process.exit(1);
}

console.log('Auth0 Domain:', domain);
console.log('Client ID:', clientId);

// All deployed domains that need to be in the callback URLs
const deployedDomains = [
  'https://athlynxapp-cwaxehsq.manus.space',
  'https://athlynxapp.vip',
  'https://athlynx.ai',
  'https://www.athlynx.ai',
  'https://athlynx.io',
  'https://www.athlynx.io',
  'https://athlynx.net',
  'https://www.athlynx.net',
  'http://localhost:3000',
  'http://localhost:5173',
];

const callbackUrls = deployedDomains.map(d => `${d}/callback`);
const logoutUrls = deployedDomains;
const webOrigins = deployedDomains;

// Step 1: Get management API token using client credentials
const tokenRes = await fetch(`https://${domain}/oauth/token`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    audience: `https://${domain}/api/v2/`,
  }),
});

const tokenData = await tokenRes.json();
if (!tokenData.access_token) {
  console.error('Failed to get management token:', JSON.stringify(tokenData));
  process.exit(1);
}

console.log('✅ Got management API token');

// Step 2: Update the application with new callback URLs
const updateRes = await fetch(`https://${domain}/api/v2/clients/${clientId}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tokenData.access_token}`,
  },
  body: JSON.stringify({
    callbacks: callbackUrls,
    allowed_logout_urls: logoutUrls,
    web_origins: webOrigins,
    allowed_origins: webOrigins,
  }),
});

const updateData = await updateRes.json();
if (updateRes.ok) {
  console.log('✅ Auth0 callback URLs updated successfully!');
  console.log('Callback URLs:', updateData.callbacks);
  console.log('Logout URLs:', updateData.allowed_logout_urls);
  console.log('Web Origins:', updateData.web_origins);
} else {
  console.error('❌ Failed to update Auth0 app:', JSON.stringify(updateData));
  process.exit(1);
}
