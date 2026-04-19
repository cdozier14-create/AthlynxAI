import mysql from "mysql2/promise";

const conn = await mysql.createConnection(process.env.DATABASE_URL);

const tables = [
  `CREATE TABLE IF NOT EXISTS \`athlete_profiles\` (
    \`id\` int AUTO_INCREMENT NOT NULL,
    \`userId\` int NOT NULL,
    \`sport\` varchar(64),
    \`position\` varchar(64),
    \`school\` varchar(128),
    \`height\` varchar(16),
    \`weight\` varchar(16),
    \`gpa\` float,
    \`classYear\` varchar(16),
    \`state\` varchar(64),
    \`bio\` text,
    \`recruitingStatus\` enum('available','committed','signed','transferred') DEFAULT 'available',
    \`nilValue\` int DEFAULT 0,
    \`coverUrl\` text,
    \`highlightUrl\` text,
    \`instagram\` varchar(128),
    \`twitter\` varchar(128),
    \`followers\` int DEFAULT 0,
    \`createdAt\` timestamp NOT NULL DEFAULT (now()),
    \`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT \`athlete_profiles_id\` PRIMARY KEY(\`id\`)
  )`,
  `CREATE TABLE IF NOT EXISTS \`posts\` (
    \`id\` int AUTO_INCREMENT NOT NULL,
    \`userId\` int NOT NULL,
    \`content\` text NOT NULL,
    \`type\` enum('text','highlight','training','nil_deal','game_result','transfer') DEFAULT 'text' NOT NULL,
    \`mediaUrl\` text,
    \`mediaType\` enum('image','video'),
    \`likeCount\` int DEFAULT 0 NOT NULL,
    \`commentCount\` int DEFAULT 0 NOT NULL,
    \`createdAt\` timestamp NOT NULL DEFAULT (now()),
    \`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT \`posts_id\` PRIMARY KEY(\`id\`)
  )`,
  `CREATE TABLE IF NOT EXISTS \`post_likes\` (
    \`id\` int AUTO_INCREMENT NOT NULL,
    \`postId\` int NOT NULL,
    \`userId\` int NOT NULL,
    \`createdAt\` timestamp NOT NULL DEFAULT (now()),
    CONSTRAINT \`post_likes_id\` PRIMARY KEY(\`id\`)
  )`,
  `CREATE TABLE IF NOT EXISTS \`post_comments\` (
    \`id\` int AUTO_INCREMENT NOT NULL,
    \`postId\` int NOT NULL,
    \`userId\` int NOT NULL,
    \`content\` text NOT NULL,
    \`createdAt\` timestamp NOT NULL DEFAULT (now()),
    CONSTRAINT \`post_comments_id\` PRIMARY KEY(\`id\`)
  )`,
  `CREATE TABLE IF NOT EXISTS \`conversations\` (
    \`id\` int AUTO_INCREMENT NOT NULL,
    \`name\` varchar(128),
    \`isGroup\` boolean DEFAULT false NOT NULL,
    \`lastMessage\` text,
    \`lastMessageAt\` timestamp NOT NULL DEFAULT (now()),
    \`createdAt\` timestamp NOT NULL DEFAULT (now()),
    CONSTRAINT \`conversations_id\` PRIMARY KEY(\`id\`)
  )`,
  `CREATE TABLE IF NOT EXISTS \`conversation_participants\` (
    \`id\` int AUTO_INCREMENT NOT NULL,
    \`conversationId\` int NOT NULL,
    \`userId\` int NOT NULL,
    \`joinedAt\` timestamp NOT NULL DEFAULT (now()),
    CONSTRAINT \`conversation_participants_id\` PRIMARY KEY(\`id\`)
  )`,
  `CREATE TABLE IF NOT EXISTS \`messages\` (
    \`id\` int AUTO_INCREMENT NOT NULL,
    \`conversationId\` int NOT NULL,
    \`senderId\` int NOT NULL,
    \`content\` text NOT NULL,
    \`readAt\` timestamp,
    \`createdAt\` timestamp NOT NULL DEFAULT (now()),
    CONSTRAINT \`messages_id\` PRIMARY KEY(\`id\`)
  )`,
  `CREATE TABLE IF NOT EXISTS \`nil_deals\` (
    \`id\` int AUTO_INCREMENT NOT NULL,
    \`athleteId\` int NOT NULL,
    \`brandName\` varchar(128) NOT NULL,
    \`dealValue\` int DEFAULT 0 NOT NULL,
    \`status\` enum('pending','active','completed','declined') DEFAULT 'pending' NOT NULL,
    \`description\` text,
    \`category\` varchar(64),
    \`startDate\` timestamp,
    \`endDate\` timestamp,
    \`contractUrl\` text,
    \`createdAt\` timestamp NOT NULL DEFAULT (now()),
    \`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT \`nil_deals_id\` PRIMARY KEY(\`id\`)
  )`,
  `CREATE TABLE IF NOT EXISTS \`training_logs\` (
    \`id\` int AUTO_INCREMENT NOT NULL,
    \`userId\` int NOT NULL,
    \`workout\` varchar(128) NOT NULL,
    \`duration\` int,
    \`notes\` text,
    \`performance\` int,
    \`logDate\` timestamp NOT NULL DEFAULT (now()),
    \`createdAt\` timestamp NOT NULL DEFAULT (now()),
    CONSTRAINT \`training_logs_id\` PRIMARY KEY(\`id\`)
  )`,
  `CREATE TABLE IF NOT EXISTS \`transfer_portal_entries\` (
    \`id\` int AUTO_INCREMENT NOT NULL,
    \`athleteId\` int NOT NULL,
    \`fromSchool\` varchar(128),
    \`toSchool\` varchar(128),
    \`status\` enum('entered','committed','withdrawn') DEFAULT 'entered' NOT NULL,
    \`eligibilityYears\` int,
    \`enteredAt\` timestamp NOT NULL DEFAULT (now()),
    \`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT \`transfer_portal_entries_id\` PRIMARY KEY(\`id\`)
  )`,
  `CREATE TABLE IF NOT EXISTS \`notifications\` (
    \`id\` int AUTO_INCREMENT NOT NULL,
    \`userId\` int NOT NULL,
    \`type\` varchar(64) NOT NULL,
    \`title\` varchar(256) NOT NULL,
    \`body\` text,
    \`isRead\` boolean DEFAULT false NOT NULL,
    \`relatedId\` int,
    \`createdAt\` timestamp NOT NULL DEFAULT (now()),
    CONSTRAINT \`notifications_id\` PRIMARY KEY(\`id\`)
  )`,
  // Add credits column to users if not exists
  `ALTER TABLE \`users\` ADD COLUMN IF NOT EXISTS \`credits\` int DEFAULT 0 NOT NULL`,
  `ALTER TABLE \`users\` ADD COLUMN IF NOT EXISTS \`avatarUrl\` text`,
];

let success = 0;
let skipped = 0;
for (const sql of tables) {
  try {
    await conn.execute(sql);
    success++;
    const name = sql.match(/TABLE.*?`(\w+)`/)?.[1] || sql.match(/TABLE `(\w+)`/)?.[1] || "column";
    console.log(`✅ ${name}`);
  } catch (e) {
    if (e.code === "ER_TABLE_EXISTS_ERROR" || e.code === "ER_DUP_FIELDNAME") {
      skipped++;
      console.log(`⏭️  Already exists: ${e.sqlMessage}`);
    } else {
      console.error(`❌ Error: ${e.message}`);
    }
  }
}

console.log(`\nDone: ${success} created, ${skipped} skipped`);
await conn.end();
