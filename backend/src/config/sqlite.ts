import { MySql2Database, drizzle } from "drizzle-orm/mysql2"
import { migrate } from "drizzle-orm/mysql2/migrator"
import mysql from "mysql2/promise"
import { users } from "./schema"

let connection, db: MySql2Database

async function connectDatabase() {
  connection = await mysql.createConnection({
    host: "mysql",
    user: "user",
    password: "password",
    database: "mydb",
  })

  db = drizzle(connection)

  console.log("Connected to database")

  // Migrate
  await migrate(db, { migrationsFolder: "/usr/src/app/drizzle" })

  console.log("Migrated database")

  // Seed a user
  await db
    .select()
    .from(users)
    .then(async (result) => {
      if (result.length > 0) {
        console.log("Database already seeded")
        return
      }

      type NewUser = typeof users.$inferInsert
      const newUser: NewUser = {
        name: "Admin",
        email: "admin@brynq.com",
        // encrypt
        password: await Bun.password.hash("password"),
      }

      await db.insert(users).values(newUser).execute()
      console.log("Seeded the database with a user")

      return
    })
}

export { connectDatabase, db }
