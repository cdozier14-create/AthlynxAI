import mysql from 'mysql2/promise';

const url = process.env.DATABASE_URL || process.env.PLANETSCALE_DATABASE_URL;
if (!url) { console.error('No DATABASE_URL'); process.exit(1); }

const conn = await mysql.createConnection(url);

const tables = [
  `CREATE TABLE IF NOT EXISTS athlete_data_sources (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sourceType ENUM('ai_bot','robot','wearable','video_analysis','manual','api_integration') NOT NULL,
    deviceId VARCHAR(255),
    firmwareVersion VARCHAR(64),
    isActive TINYINT(1) NOT NULL DEFAULT 1,
    lastSeenAt TIMESTAMP NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS athlete_data_events (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    athleteId INT,
    sourceId INT,
    sourceType ENUM('ai_bot','robot','wearable','video_analysis','manual','api_integration') NOT NULL,
    eventType ENUM('performance_metric','biometric','gps_tracking','motion_capture','ai_session','recruitment_interaction','training_session','health_record','game_stat','combine_result','injury_report','recovery_score') NOT NULL,
    sport VARCHAR(64),
    sessionId VARCHAR(128),
    payload JSON NOT NULL,
    heartRate INT,
    speed FLOAT,
    distance FLOAT,
    acceleration FLOAT,
    recoveryScore FLOAT,
    aiConfidence FLOAT,
    latitude FLOAT,
    longitude FLOAT,
    deviceTimestamp TIMESTAMP NULL,
    processedAt TIMESTAMP NULL,
    isAnonymized TINYINT(1) NOT NULL DEFAULT 0,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS athlete_data_summaries (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    athleteId INT NOT NULL,
    summaryDate VARCHAR(10) NOT NULL,
    sport VARCHAR(64),
    totalEvents INT NOT NULL DEFAULT 0,
    avgHeartRate FLOAT,
    maxSpeed FLOAT,
    totalDistance FLOAT,
    avgRecoveryScore FLOAT,
    aiSessionCount INT NOT NULL DEFAULT 0,
    robotSessionCount INT NOT NULL DEFAULT 0,
    wearableSessionCount INT NOT NULL DEFAULT 0,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS subscription_expiry_notices (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    stripeSubscriptionId VARCHAR(255),
    daysRemaining INT NOT NULL,
    emailType ENUM('7_day','5_day','4_day','3_day','2_day','1_day','expired') NOT NULL,
    status ENUM('sent','failed','skipped') NOT NULL DEFAULT 'sent',
    emailSentAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expiresAt TIMESTAMP NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
];

for (const sql of tables) {
  const tableName = sql.match(/CREATE TABLE IF NOT EXISTS (\w+)/)[1];
  try {
    await conn.execute(sql);
    console.log('✅ Created/verified:', tableName);
  } catch (e) {
    console.error('❌ Failed:', tableName, e.message);
  }
}

await conn.end();
console.log('Done.');
