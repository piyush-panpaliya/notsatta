import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import { getMatch } from "~/utils/cricket";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.headers.secret !== process.env.CRON_KEY) return res.status(401).json({ error: "Unauthorized" })
  try {
    const fetchedMatch = await getMatch(req.body.link)
    console.log(fetchedMatch)
    if (fetchedMatch.status === 'OPEN') {
      return res.status(400).send('Match is still open to vote')
    }
    if (fetchedMatch.status === 'LIVE') {
      await prisma.cmatch.updateMany({
        where: {
          matchId: fetchedMatch.id,
        },
        data: {
          status: "LIVE"
        }
      })
      return res.status(200)
    }
    if (fetchedMatch.status === 'FINISHED') {
      await prisma.cmatch.updateMany({
        where: {
          matchId: fetchedMatch.id,
        },
        data: {
          status:"FINISHED",
          winnerId: fetchedMatch.winner,
        }
      })
      //leaderboard update
      return res.status(200)
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send('Error')
  }
}

