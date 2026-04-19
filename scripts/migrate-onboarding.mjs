import mysql from 'mysql2/promise';

const url = process.env.DATABASE_URL;
if (!url) throw new Error('DATABASE_URL not set');

const conn = await mysql.createConnection(url);

try {
  // Add onboarding fields to users table
  await conn.execute(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS onboardingRole VARCHAR(64) NULL,
    ADD COLUMN IF NOT EXISTS onboardingData TEXT NULL,
    ADD COLUMN IF NOT EXISTS onboardingCompleted TINYINT NOT NULL DEFAULT 0
  `);
  console.log('✅ Onboarding columns added to users table');

  // Add broadcast_messages table
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS broadcast_messages (
      id SERIAL PRIMARY KEY,
      senderId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      targetRole VARCHAR(64),
      targetUserId INT,
      sentAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      isRead TINYINT NOT NULL DEFAULT 0
    )
  `);
  console.log('✅ broadcast_messages table created');

  // Add podcast_episodes table
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS podcast_episodes (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      audioUrl TEXT,
      thumbnailUrl TEXT,
      spotifyUrl TEXT,
      appleUrl TEXT,
      youtubeUrl TEXT,
      duration VARCHAR(16),
      episodeNumber INT,
      season INT DEFAULT 1,
      publishedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✅ podcast_episodes table created');

  console.log('\n✅ All migrations complete!');
} catch (err) {
  console.error('Migration error:', err.message);
  // If column already exists, that's fine
  if (err.message.includes('Duplicate column')) {
    console.log('Columns already exist — skipping');
  } else {
    process.exit(1);
  }
} finally {
  await conn.end();
}
