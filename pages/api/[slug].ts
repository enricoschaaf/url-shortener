import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query.slug[0]
  if (!slug) res.status(400).json("No slug provided.")
  const data = await prisma.url.findOne({ select: { longUrl: true }, where: { slug } })
  console.log(data)
  res.writeHead(301, { Location: data.longUrl })
  res.end()
}
