import type { Config } from "drizzle-kit"

export default {
  schema: "./src/config/schema.ts",
  out: "./drizzle",
} satisfies Config
