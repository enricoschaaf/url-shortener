import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const slug: any = req.query.slug
  if (!slug) res.status(400).json("No slug provided.")

  const data = await prisma.url.findOne({ select: { longUrl: true }, where: { slug } })

  if (!data) return res.writeHead(404, { Location: "/404" })
  res.writeHead(301, { Location: "https://" + data.longUrl })
  res.end()
}
