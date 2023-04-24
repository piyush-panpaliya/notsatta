import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import { getMatchType } from "~/utils/cricket";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.headers.secret !== process.env.CRON_KEY) return res.status(401).json({ error: "Unauthorized" })
  try {
    await res.revalidate('/dash')
    const rooms = await prisma.room.findMany()
    JSON.parse(req.body).forEach(async (match:getMatchType) => {
      rooms.forEach(async (room) => {        
        await prisma.cmatch.create({
          data: {
            matchId: match.id,
            roomId: room.id,
          }
        })
      })
    }) 
    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}
