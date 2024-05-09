import { bigint, mysqlTable, varchar, int, text } from "drizzle-orm/mysql-core"

export const users = mysqlTable("users", {
  id: bigint("id", { mode: "number", unsigned: true })
    .primaryKey()
    .autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
})

export const images = mysqlTable("images", {
  id: bigint("id", { mode: "number", unsigned: true })
    .primaryKey()
    .autoincrement(),
  cat_id: varchar("cat_id", { length: 255 }).notNull(),
  url: varchar("url", { length: 255 }).notNull(),
  breeds: text("breeds"),
  elo: int('elo').default(1000)
})
