/**
 * Safe migration: only adds missing columns to the users table.
 * Does NOT rename, drop, or alter any existing tables or columns.
 */
import mysql from "mysql2/promise";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

async function main() {
  const pool = mysql.createPool({
    uri: DATABASE_URL!,
    ssl: { rejectUnauthorized: false },
    connectionLimit: 2,
    connectTimeout: 15000,
  });

  const conn = await pool.getConnection();
  
  try {
    console.log("Connected to database");
    
    // Check what columns currently exist in the users table
    const [cols] = await conn.execute(`SHOW COLUMNS FROM users`) as any;
    const existingCols = new Set(cols.map((c: any) => c.Field));
    console.log("Existing users columns:", [...existingCols].join(", "));

    // Define columns to add if missing
    const columnsToAdd = [
      { name: "sport", sql: "VARCHAR(64)" },
      { name: "school", sql: "VARCHAR(128)" },
      { name: "year", sql: "VARCHAR(32)" },
      { name: "bio", sql: "TEXT" },
      { name: "phone", sql: "VARCHAR(32)" },
      { name: "trialEndsAt", sql: "TIMESTAMP NULL" },
      { name: "phoneVerified", sql: "BOOLEAN NOT NULL DEFAULT FALSE" },
      { name: "passwordHash", sql: "VARCHAR(255)" },
      { name: "stripeCustomerId", sql: "VARCHAR(128)" },
      { name: "stripeSubscriptionId", sql: "VARCHAR(128)" },
      { name: "stripePlanId", sql: "VARCHAR(128)" },
      { name: "credits", sql: "INT NOT NULL DEFAULT 0" },
      { name: "lastSignedIn", sql: "TIMESTAMP NULL" },
      { name: "loginMethod", sql: "VARCHAR(32)" },
      { name: "avatarUrl", sql: "TEXT" },
    ];

    for (const col of columnsToAdd) {
      if (!existingCols.has(col.name)) {
        console.log(`Adding column: ${col.name}`);
        await conn.execute(`ALTER TABLE users ADD COLUMN \`${col.name}\` ${col.sql}`);
        console.log(`  ✓ Added ${col.name}`);
      } else {
        console.log(`  - ${col.name} already exists, skipping`);
      }
    }

    // Verify the users table now has all columns
    const [newCols] = await conn.execute(`SHOW COLUMNS FROM users`) as any;
    console.log("\nFinal users columns:", newCols.map((c: any) => c.Field).join(", "));
    console.log("\n✅ Migration complete");
    
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  } finally {
    conn.release();
    await pool.end();
  }
}

main();
