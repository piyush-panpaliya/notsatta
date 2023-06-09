import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import { getMatchType } from "~/utils/cricket";

type cmatchCreate = { matchId: number, roomId: string }[]
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.headers.secret !== process.env.CRON_KEY) return res.status(401).json({ error: "Unauthorized" })
  try {
    await res.revalidate('/dash')

    const rooms = await prisma.room.findMany()
    let data: cmatchCreate = []
    console.log(req.body)
    console.log(typeof req.body)
    const reqData = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    reqData.forEach(async (match: getMatchType) => {
      rooms.forEach(async (room) => {
        data.push({ matchId: match.id, roomId: room.id })
      })
    })
    const cmatches = await prisma.cmatch.createMany({
      data,
      skipDuplicates: true
    })
    console.log(cmatches)
    return res.json({ revalidated: true })
  } catch (err) {
    console.log(err)
    return res.status(500).send('Error revalidating')
  }
}
