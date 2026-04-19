import postgres from "postgres";

async function main() {
  const raw = process.env.DATABASE_URL;
  if (!raw) {
    console.log("No DATABASE_URL");
    process.exit(1);
  }
  
  // Clean the URL
  const url = new URL(raw);
  url.searchParams.delete('sslrootcert');
  url.searchParams.set('sslmode', 'require');
  const cleanUrl = url.toString();
  
  console.log("Connecting to DB...");
  const client = postgres(cleanUrl, {
    ssl: { rejectUnauthorized: false },
    max: 1,
    connect_timeout: 10,
  });
  
  try {
    // Test connection
    const result = await client`SELECT 1 as test`;
    console.log("Connection OK:", result);
    
    // List tables
    const tables = await client`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`;
    console.log("Tables:", tables.map((t: any) => t.table_name));
    
    // Check users table columns
    const cols = await client`SELECT column_name FROM information_schema.columns WHERE table_name = 'users' AND table_schema = 'public' ORDER BY ordinal_position`;
    console.log("Users columns:", cols.map((c: any) => c.column_name));
    
  } catch (e: any) {
    console.error("Error:", e.message);
  } finally {
    await client.end();
    process.exit(0);
  }
}

main().catch(console.error);
