import { and, between, ne } from 'drizzle-orm'
import { images } from '../config/schema'
import { db } from '../config/sqlite'

export async function getOpponents(playerId: number, playerElo: number, difference: number, broadenEloByIfNotFount = 100): Promise<Array<{ id: number, url: string, cat_id: string, elo: number | null }>> {
  const opponents = await db
    .select({
      id: images.id,
      url: images.url,
      cat_id: images.cat_id,
      elo: images.elo
    })
    .from(images)
    .where(
      and(
        ne(images.id, playerId),
        between(images.elo, playerElo - difference, playerElo + difference)
      )
    )

  if (opponents.length > 0) {
    return opponents
  } else {
    return await getOpponents(playerId, playerElo, difference + broadenEloByIfNotFount)
  }
}