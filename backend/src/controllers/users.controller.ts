import express from "express"
import jwt from 'jsonwebtoken'
import { db } from '../config/sqlite'
import { users } from "../config/schema"
import { eq } from "drizzle-orm"

const usersController = express.Router()

usersController.post("/login", (req, res) => {
  const { username, password } = req.body

  db
    .select()
    .from(users)
    .where(eq(users.email, username))
    .then(async (result) => {
      if (result.length === 0) {
        // No such user
        return res
          .status(500)
          .send("Invalid username or password")
      }

      const user = result[0]

      const passwordMatch = await Bun.password.verify(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)

        return res
          .cookie("token", token)
          .status(200)
          .send()
      } else {
        // Password is incorrect
        return res
          .status(500)
          .send("Invalid username or password")
      }
    })
})

usersController.get("/logout", (req, res) => {
  return res
    .clearCookie("token")
    .status(200)
    .send()
});

export { usersController }
