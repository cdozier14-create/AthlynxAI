/**
 * Fix Auth0 callback URLs for ATHLYNX
 * Adds all 6 domain callbacks to the SPA app
 */

const DOMAIN = 'dev-bzdjgeksqaxkjoqq.us.auth0.com';
const CLIENT_ID = '6kMlNIq8zEF97huCYBhSFTgSvWNcWSbW';
const CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;

const CALLBACK_URLS = [
  'https://athlynx.ai/callback',
  'https://www.athlynx.ai/callback',
  'https://athlynxapp.vip/callback',
  'https://www.athlynxapp.vip/callback',
  'https://athlynx.io/callback',
  'https://www.athlynx.io/callback',
  'https://athlynx.net/callback',
  'https://www.athlynx.net/callback',
  'http://localhost:3000/callback',
  'https://3000-iv3ib5jhgdxzk8de8aw8k-e5114fe0.us2.manus.computer/callback',
];

const LOGOUT_URLS = [
  'https://athlynx.ai',
  'https://www.athlynx.ai',
  'https://athlynxapp.vip',
  'https://www.athlynxapp.vip',
  'https://athlynx.io',
  'https://athlynx.net',
  'http://localhost:3000',
];

const WEB_ORIGINS = [
  'https://athlynx.ai',
  'https://www.athlynx.ai',
  'https://athlynxapp.vip',
  'https://www.athlynxapp.vip',
  'https://athlynx.io',
  'https://athlynx.net',
  'http://localhost:3000',
];

async function run() {
  if (!CLIENT_SECRET) {
    console.error('AUTH0_CLIENT_SECRET not set');
    process.exit(1);
  }

  // Step 1: Get Management API token
  console.log('Getting Management API token...');
  const tokenRes = await fetch(`https://${DOMAIN}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      audience: `https://${DOMAIN}/api/v2/`
    })
  });
  const tokenData = await tokenRes.json();
  
  if (!tokenData.access_token) {
    console.error('Failed to get token:', JSON.stringify(tokenData));
    process.exit(1);
  }
  
  const token = tokenData.access_token;
  console.log('Got management token ✅');

  // Step 2: Update the application
  console.log('Updating callback URLs...');
  const updateRes = await fetch(`https://${DOMAIN}/api/v2/clients/${CLIENT_ID}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      callbacks: CALLBACK_URLS,
      allowed_logout_urls: LOGOUT_URLS,
      web_origins: WEB_ORIGINS,
      allowed_origins: WEB_ORIGINS,
    })
  });
  
  const updateData = await updateRes.json();
  
  if (updateData.error) {
    console.error('Update failed:', JSON.stringify(updateData));
    process.exit(1);
  }
  
  console.log('✅ Auth0 callback URLs updated successfully!');
  console.log('Callbacks:', updateData.callbacks);
}

run().catch(e => { console.error(e); process.exit(1); });
