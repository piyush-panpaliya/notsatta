import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import { getMatch } from "~/utils/cricket";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') return res.status(404).json({ error: "yaha na aaye" })
    const reqData = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const fetchedMatch = await getMatch(reqData.link)
    console.log('fetchedMatch', fetchedMatch)
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
      return res.status(200).send('Match is live')
    }
    if (fetchedMatch.status === 'FINISHED') {
      await prisma.cmatch.updateMany({
        where: {
          matchId: fetchedMatch.id,
        },
        data: {
          status: "FINISHED",
          winnerId: fetchedMatch.winner,
        }
      })
      //leaderboard update
      const votes = await prisma.vote.findMany({
        where: {
          cmatch: {
            matchId: fetchedMatch.id
          }
        },
      })
      console.log(votes)
      const upVotes = votes.map((vote) => ({ ...vote, won: vote.teamId === fetchedMatch.winner }))
      upVotes.forEach(async (vote) => {
        await prisma.vote.update({
          where: {
            id: vote.id
          },
          data: {
            won: vote.won
          }
        })
      })
      return res.status(200).send('Match finished')
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send('Error')
  }
}

