import { PrismaClient } from "@prisma/client"
import { nanoid } from "nanoid"
import { NextApiRequest, NextApiResponse } from "next"
import urlExist from "url-exist"

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { longUrl } = JSON.parse(req.body)
  if (!longUrl) return res.status(400).json({ error: "No longUrl provided." })

  let url: string
  try {
    const array = longUrl.split("//", 2)
    if (array.length === 1) {
      url = array[0]
    } else {
      url = array[1]
    }
    const exists = await urlExist(`https://${url}`)
    if (!exists) throw new Error()
  } catch (e) {
    console.error(e)
    res.status(422).json({ error: "longUrl is not a valid url." })
  }

  const data = await prisma.url.findOne({ select: { slug: true }, where: { longUrl: url } })
  if (data)
    return res.status(200).json({
      data: {
        longUrl: url,
        shortUrl: `${process.env.PRODUCTION_URL}/${data.slug}`
      }
    })

  const slug = nanoid(7)
  await prisma.url.create({ data: { longUrl: url, slug } })
  return res
    .status(201)
    .json({ data: { longUrl: url, shortUrl: `${process.env.PRODUCTION_URL}/${slug}` } })
}
