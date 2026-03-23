import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

const email = "theoton100@gmail.com";
const password = "Adinoyi1";

async function main() {
  const passwordHash = await bcrypt.hash(password, 12);
  const conn = await mysql.createConnection(DATABASE_URL);
  await conn.execute(
    `INSERT INTO admin_credentials (email, passwordHash) VALUES (?, ?) ON DUPLICATE KEY UPDATE passwordHash = ?`,
    [email, passwordHash, passwordHash]
  );
  console.log(`Admin credential seeded for ${email}`);
  await conn.end();
}

main().catch(console.error);
