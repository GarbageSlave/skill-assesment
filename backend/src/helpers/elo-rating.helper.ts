const kFactor = 32

/**
 * Calculate the new rating for a player after a match
 * @param playerRating The player's current rating
 * @param opponentRating The opponent's current rating
 * @param score The score of the match (0 = loss, 0.5 = draw, 1 = win)
 * @returns The player's new rating
 */
export function calculateRating(
  playerRating: number,
  opponentRating: number,
  score: 0 | 0.5 | 1
) {
  const expectedScore =
    1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400))
  return Math.round(playerRating + kFactor * (score - expectedScore))
}
