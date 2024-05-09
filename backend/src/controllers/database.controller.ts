import express from "express"
import { TheCatAPI } from "@thatapicompany/thecatapi";
import { count, desc, eq, sql } from "drizzle-orm"

import jwt_verify from '../middleware/jwt.middleware'
import { db } from '../config/sqlite'
import { images } from "../config/schema"
import { getOpponents } from "../helpers/look-for-opponents.helper";
import { calculateRating } from "../helpers/elo-rating.helper";

const databaseController = express.Router()

databaseController.post("/populate", jwt_verify, async (req: any, res) => {
  try {
    const catsApi = new TheCatAPI(req.body.apiKey)
    const batch = 10
    const max = 200
    let page = 0
    let amountOfCats

    const result = await db.select({ count: count() }).from(images)
    amountOfCats = result[0].count

    while (amountOfCats < max) {
      const cats = await catsApi.images.searchImages({
        limit: batch + (page * 15),
        hasBreeds: true,
        page
      })

      await db
        .insert(images)
        .values(
          cats.map(cat => ({
            cat_id: cat.id,
            url: cat.url,
            breeds: JSON.stringify(cat.breeds)
          }))
        )

      const result = await db
        .select({ count: count() })
        .from(images)

      amountOfCats = result[0].count
      page++
    }

    res.status(200).send()
  } catch (error) {
    res.status(500).send(error)
  }
})

databaseController.get("/leaderboard", jwt_verify, async (req: any, res) => {
  try {
    const top10 = await db.
      select({
        id: images.cat_id,
        breeds: images.breeds,
        url: images.url,
        elo: images.elo,
        place: sql`ROW_NUMBER() OVER ()`
      })
      .from(images)
      .orderBy(desc(images.elo))
      .limit(10)

    res.status(200).json(top10)
  } catch (error) {
    res.status(500).send()
  }
})

databaseController.get("/catmash", jwt_verify, async (req: any, res) => {
  try {
    const eloRange = 150
    const randomOffset = Math.floor(Math.random() * 200); // Get pseudo random id for a cat

    const cat = await db
      .select({
        id: images.id,
        url: images.url,
        cat_id: images.cat_id,
        elo: images.elo
      })
      .from(images)
      .limit(1)
      .offset(randomOffset)

    // look for opponents in range
    const opponents = await getOpponents(cat[0].id, cat[0].elo!, eloRange)

    res.status(200).json([
      cat[0],
      opponents[Math.floor(Math.random() * opponents.length)]
    ])
  } catch (error) {
    res.status(500).json({ err: "Error fetching cats 😿" })
  }
})

databaseController.post("/catmash", jwt_verify, async (req: any, res) => {
  try {
    const { winner, loser, wasDraw } = req.body

    const newWinnerElo = calculateRating(winner.elo, loser.elo, wasDraw ? 0.5 : 1)
    await db
      .update(images)
      .set({ elo: newWinnerElo })
      .where(
        eq(images.cat_id, winner.cat_id)
      )

    const newLoserElo = calculateRating(loser.elo, winner.elo, wasDraw ? 0.5 : 0)
    await db
      .update(images)
      .set({ elo: newLoserElo })
      .where(
        eq(images.cat_id, loser.cat_id)
      )

    res.status(200).send()
  } catch (error) {
    res.status(500).json({err: "Couldn't update elo 😿"})
  }
})

export { databaseController }
