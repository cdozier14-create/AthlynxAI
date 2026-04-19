// ATHLYNX Service Worker — v1.2.0
// Offline-first PWA: cache-first for assets, network-first for API

const CACHE_VERSION = 'athlynx-v1.2.0';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;

// Core app shell files to pre-cache
const APP_SHELL = [
  '/',
  '/manifest.json',
  '/favicon.ico',
];

// CDN assets to pre-cache (app icons used everywhere)
const CDN_ASSETS = [
  'https://d2xsxph8kpxj0f.cloudfront.net/310419663028706780/CwaxehSqJgGxbN8KdgWNph/icon-192_52ef996c.png',
  'https://d2xsxph8kpxj0f.cloudfront.net/310419663028706780/CwaxehSqJgGxbN8KdgWNph/icon-512_816b3f83.png',
  'https://d2xsxph8kpxj0f.cloudfront.net/310419663028706780/CwaxehSqJgGxbN8KdgWNph/apple-touch-icon_6f0ee0ef.png',
  'https://d2xsxph8kpxj0f.cloudfront.net/310419663028706780/CwaxehSqJgGxbN8KdgWNph/athlynx-main-icon_7b5e9ca6.png',
];

// ─── INSTALL ────────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  console.log('[SW] Installing ATHLYNX service worker v1.2.0...');
  event.waitUntil(
    Promise.all([
      // Cache app shell
      caches.open(STATIC_CACHE).then((cache) =>
        cache.addAll(APP_SHELL).catch((err) =>
          console.warn('[SW] Failed to cache some app shell files:', err)
        )
      ),
      // Pre-cache CDN icons
      caches.open(STATIC_CACHE).then((cache) =>
        Promise.allSettled(
          CDN_ASSETS.map((url) =>
            fetch(url, { mode: 'cors' })
              .then((res) => { if (res.ok) cache.put(url, res); })
              .catch(() => console.warn('[SW] Could not pre-cache CDN asset:', url))
          )
        )
      ),
    ]).then(() => {
      console.log('[SW] App shell cached. Skipping waiting...');
      return self.skipWaiting();
    })
  );
});

// ─── ACTIVATE ───────────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating ATHLYNX service worker v1.2.0...');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) =>
            name.startsWith('athlynx-') &&
            name !== STATIC_CACHE &&
            name !== DYNAMIC_CACHE
          )
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      )
    ).then(() => {
      console.log('[SW] Activated. Claiming clients...');
      return self.clients.claim();
    })
  );
});

// ─── FETCH ──────────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip non-http(s) protocols
  if (!url.protocol.startsWith('http')) return;

  // Skip Manus internal routes
  if (url.pathname.startsWith('/__manus__/')) return;

  // ── API calls: Network-only with offline error ───────────────────────────
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).catch(() =>
        new Response(
          JSON.stringify({ error: 'You are offline. Please check your connection.' }),
          { status: 503, headers: { 'Content-Type': 'application/json' } }
        )
      )
    );
    return;
  }

  // ── OAuth / Auth routes: Always network ─────────────────────────────────
  if (url.pathname.startsWith('/callback')) {
    event.respondWith(fetch(request));
    return;
  }

  // ── CDN assets (CloudFront): Cache-first ────────────────────────────────
  if (url.hostname.includes('cloudfront.net')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        }).catch(() => new Response('', { status: 404 }));
      })
    );
    return;
  }

  // ── Navigation (SPA routes): Network-first, fallback to cached root ──────
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => {
            if (cached) return cached;
            return caches.match('/').then((root) => {
              if (root) return root;
              // Final offline fallback page
              return new Response(
                `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ATHLYNX – Offline</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #0a1628;
      color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 24px;
      text-align: center;
    }
    img { width: 80px; height: 80px; border-radius: 16px; margin-bottom: 24px; }
    h1 { font-size: 24px; font-weight: 800; margin-bottom: 8px; }
    p { color: #00D4FF; font-size: 16px; margin-bottom: 24px; }
    button {
      background: #00D4FF;
      color: #0a1628;
      border: none;
      border-radius: 12px;
      padding: 14px 32px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <img src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028706780/CwaxehSqJgGxbN8KdgWNph/icon-192_52ef996c.png" alt="ATHLYNX">
  <h1>You're Offline</h1>
  <p>Connect to the internet to use ATHLYNX</p>
  <button onclick="window.location.reload()">Try Again</button>
</body>
</html>`,
                { headers: { 'Content-Type': 'text/html' } }
              );
            });
          })
        )
    );
    return;
  }

  // ── Static assets (JS, CSS, fonts, images): Cache-first ─────────────────
  if (url.pathname.match(/\.(js|css|woff2?|ttf|otf|eot|svg|png|jpg|jpeg|gif|webp|ico)$/)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        }).catch(() => new Response('', { status: 404 }));
      })
    );
    return;
  }

  // ── Default: Network with dynamic cache fallback ─────────────────────────
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});

// ─── PUSH NOTIFICATIONS ─────────────────────────────────────────────────────
self.addEventListener('push', (event) => {
  let data = {
    title: 'ATHLYNX',
    body: 'You have a new notification',
    icon: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028706780/CwaxehSqJgGxbN8KdgWNph/icon-192_52ef996c.png',
    badge: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028706780/CwaxehSqJgGxbN8KdgWNph/icon-192_52ef996c.png',
    url: '/',
  };

  if (event.data) {
    try {
      data = { ...data, ...event.data.json() };
    } catch {
      data.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      badge: data.badge,
      vibrate: [200, 100, 200],
      data: { url: data.url },
      actions: [
        { action: 'open', title: 'Open ATHLYNX' },
        { action: 'dismiss', title: 'Dismiss' },
      ],
    })
  );
});

// ─── NOTIFICATION CLICK ─────────────────────────────────────────────────────
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'dismiss') return;

  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(targetUrl);
    })
  );
});

// ─── BACKGROUND SYNC ────────────────────────────────────────────────────────
self.addEventListener('sync', (event) => {
  if (event.tag === 'athlynx-sync') {
    console.log('[SW] Background sync triggered — syncing offline data...');
  }
});

// ─── MESSAGE HANDLER ────────────────────────────────────────────────────────
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data?.type === 'CLEAR_CACHE') {
    caches.keys().then((names) => Promise.all(names.map((n) => caches.delete(n))));
  }
});
