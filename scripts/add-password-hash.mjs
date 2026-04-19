import { createConnection } from 'mysql2/promise';
import { readFileSync } from 'fs';

// Load env from .env if present
const envPath = new URL('../.env', import.meta.url).pathname;
try {
  const envContent = readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const [key, ...vals] = line.split('=');
    if (key && vals.length) process.env[key.trim()] = vals.join('=').trim();
  }
} catch {}

const dbUrl = process.env.DATABASE_URL || process.env.PLANETSCALE_DATABASE_URL;
if (!dbUrl) { console.error('No DATABASE_URL'); process.exit(1); }

// Parse the URL
const url = new URL(dbUrl);
const conn = await createConnection({
  host: url.hostname,
  port: parseInt(url.port) || 3306,
  user: url.username,
  password: url.password,
  database: url.pathname.replace('/', ''),
  ssl: { rejectUnauthorized: false },
});

try {
  await conn.execute('ALTER TABLE users ADD COLUMN IF NOT EXISTS passwordHash VARCHAR(255)');
  console.log('✓ passwordHash column added (or already exists)');
} catch (e) {
  if (e.code === 'ER_DUP_FIELDNAME' || e.message?.includes('Duplicate column')) {
    console.log('✓ passwordHash column already exists');
  } else {
    console.error('Error:', e.message);
  }
}
await conn.end();
