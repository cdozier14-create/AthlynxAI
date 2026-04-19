import mysql from "mysql2/promise";

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) throw new Error("DATABASE_URL not set");

// Parse the URL to extract components
const url = new URL(dbUrl);
const conn = await mysql.createConnection({
  host: url.hostname,
  port: parseInt(url.port) || 3306,
  user: url.username,
  password: decodeURIComponent(url.password),
  database: url.pathname.replace("/", ""),
  ssl: { rejectUnauthorized: true },
});

try {
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS \`broadcast_messages\` (
      \`id\` serial AUTO_INCREMENT NOT NULL,
      \`senderId\` int NOT NULL,
      \`subject\` varchar(256) NOT NULL,
      \`body\` text NOT NULL,
      \`channel\` enum('email','in_app','both') NOT NULL DEFAULT 'in_app',
      \`recipientFilter\` enum('all','trial','subscribed','free') NOT NULL DEFAULT 'all',
      \`recipientCount\` int DEFAULT 0,
      \`status\` enum('draft','sent','failed') NOT NULL DEFAULT 'sent',
      \`sentAt\` timestamp NOT NULL DEFAULT (now()),
      \`createdAt\` timestamp NOT NULL DEFAULT (now()),
      CONSTRAINT \`broadcast_messages_id\` PRIMARY KEY(\`id\`)
    )
  `);
  console.log("✅ broadcast_messages table created/verified");
} catch (e) {
  console.error("❌ Error:", e.message);
} finally {
  await conn.end();
}
