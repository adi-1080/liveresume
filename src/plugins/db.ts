// src/plugins/db.ts
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL as string;
console.log("DATABASE_URL: ", connectionString);

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000
});

const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });