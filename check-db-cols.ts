import { getDb } from "./server/db";
import { sql } from "drizzle-orm";

async function main() {
  const db = await getDb();
  if (!db) {
    console.log("No DB connection");
    process.exit(1);
  }
  // Try a simple count query first
  try {
    const result = await db.execute(sql`SELECT COUNT(*) as cnt FROM users`);
    console.log("Users count:", JSON.stringify(result.rows));
  } catch (e: any) {
    console.error("Count error:", e.message);
  }
  
  // Try selecting just basic columns
  try {
    const result = await db.execute(sql`SELECT id, open_id, name, email FROM users LIMIT 1`);
    console.log("Basic query OK:", JSON.stringify(result.rows));
  } catch (e: any) {
    console.error("Basic query error:", e.message);
  }
  
  // Try selecting the new columns
  try {
    const result = await db.execute(sql`SELECT id, sport, school, year, bio, phone, trial_ends_at, password_hash FROM users LIMIT 1`);
    console.log("New columns OK:", JSON.stringify(result.rows));
  } catch (e: any) {
    console.error("New columns error:", e.message);
  }
  
  process.exit(0);
}

main().catch((e) => {
  console.error("Fatal:", e.message);
  process.exit(1);
});
