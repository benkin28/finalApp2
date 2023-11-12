import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
const connectionString = process.env.NODE_DATABASE_URL;
const client = postgres(String(process.env.NODE_DATABASE_URL));
export const db = drizzle(client);
