import { NextApiRequest, NextApiResponse } from "next";
import { getMatch } from "~/utils/cricket";

export const config = {
  runtime: 'edge',
}

export default async (req: Request) => {
  const { id } = await req.json()
  const response = new Response(JSON.stringify(await getMatch(id)), { status: 200 })
  return response
}