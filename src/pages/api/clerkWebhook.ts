import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const reqData= typeof req.body==='string'?JSON.parse(req.body):req.body
  if(reqData.type ==="user.deleted") {
    await prisma.user.delete({where:{id:reqData.data.id}})
    return res.json({ success: true })
  }
  return res.json({ success: true })
}