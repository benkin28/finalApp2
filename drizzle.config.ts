import { Config } from "drizzle-kit";

export default {
  schema: "./schema",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: String(process.env.NODE_DATABASE_URL),
  },
} satisfies Config;
