import { PrismaClient } from "@prisma/client"
import { nanoid } from "nanoid"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const longUrl: string = req.body.longUrl
  if (!longUrl) return res.status(400).json("No longUrl provided.")

  let url: string
  try {
    const array = longUrl.split("//", 2)
    if (array.length === 1) {
      url = array[0]
    } else {
      url = array[1]
    }
    new URL(`https://${url}`)
  } catch (e) {
    console.error(e)
    res.status(422).json("longUrl is not a valid url.")
  }
  console.log(await prisma.url.findMany({}))

  const data = await prisma.url.findOne({ select: { slug: true }, where: { longUrl: url } })
  if (data) return res.status(200).json(`${process.env.NOW_URL}/${data.slug}`)

  const slug = nanoid(7)
  await prisma.url.create({ data: { longUrl: url, slug } })
  return res.status(201).json(`${process.env.NOW_URL}/${slug}`)
}
