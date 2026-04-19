import postgres from 'postgres';

const dbUrl = process.env.PLANETSCALE_DATABASE_URL || process.env.DATABASE_URL;
const sql = postgres(dbUrl, { ssl: 'require' });

async function main() {
  // Count before
  const before = await sql`SELECT COUNT(*) as cnt FROM users`;
  console.log('Users before deletion:', before[0].cnt);
  
  // Delete dependent records first (foreign key constraints)
  await sql`DELETE FROM athlete_profiles`;
  console.log('Deleted athlete_profiles');
  
  await sql`DELETE FROM posts`;
  console.log('Deleted posts');
  
  // Delete all users
  const result = await sql`DELETE FROM users RETURNING id, name, email`;
  console.log('Deleted users:', result.map(r => `${r.id}: ${r.name} (${r.email})`));
  
  const after = await sql`SELECT COUNT(*) as cnt FROM users`;
  console.log('Users after deletion:', after[0].cnt);
  
  await sql.end();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
