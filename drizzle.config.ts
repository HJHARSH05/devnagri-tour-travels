import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/config/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_tfayb7OLjYS6@ep-rough-field-ahhu1a9k-pooler.c-3.us-east-1.aws.neon.tech/Devnagri?sslmode=require&channel_binding=require",
  },
});