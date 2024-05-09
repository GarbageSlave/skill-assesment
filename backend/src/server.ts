import express from "express"
import cookieParser from 'cookie-parser'
import 'dotenv/config'

import { connectDatabase } from "./config/sqlite"
import { usersController } from "./controllers/users.controller"
import { databaseController } from "./controllers/database.controller"

const app = express()
const port = 3000

// Middleware
app.use(express.json())
app.use(cookieParser())

// Controllers
app.use(usersController)
app.use(databaseController)

await connectDatabase()

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server")
  server.close(() => {
    console.log("HTTP server closed")
  })
})
