import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validators/category-validator"
import { db } from "@/db"
import { DiscordClient } from "@/lib/discord-client"

const REQUEST_VALIDATOR = z.object({
  category: CATEGORY_NAME_VALIDATOR,
  fields: z.record(z.string().or(z.number()).or(z.boolean()).optional()),
  description: z.string().optional(),
}).strict()

export const POST = async (req: NextRequest) => {
  const authHeader = req.headers.get("Authorization")

  if (!authHeader) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  if (!authHeader.startsWith("Bearer")) {
    return NextResponse.json({ message: "Invalid header format, expected 'Bearer [API_KEY]'" }, { status: 401 })
  }

  const apiKey = authHeader.split(" ")[1]

  if (!apiKey || apiKey.trim() === "") {
    return NextResponse.json({ message: "Invalid API key" }, { status: 401 })
  }

  const user = await db.user.findUnique({ where: { apiKey: apiKey }, include: { EventCategories: true } })

  if (!user) {
    return NextResponse.json({ message: "Invalid API key" }, { status: 404 })
  }

  if (!user.discordId) {
    return NextResponse.json({ message: "Discord id is not present" }, { status: 403 })
  }

  //   ACTUAL LOGIC
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()

  const discord = new DiscordClient(process.env.DISCORD_BOT_TOKEN)

  const dmChannel = await discord.createDm(user.discordId)

  await discord.sendEmbed(dmChannel.id, {
    title: "Hello world",
  })

  let requestData

  try {
    requestData = await req.json()
  } catch (err) {
    return NextResponse.json({
      message: "Invalid JSON request body",
    }, { status: 400 })
  }

  const validationResult = REQUEST_VALIDATOR.parse(requestData)

  const category = user.EventCategories.find((cat) => cat.name === validationResult.category)

  if (!category) {
    return NextResponse.json({ message: `You dont have a category named ${validationResult.category}` }, { status: 404 })
  }
  const eventData = {
    title: `${category.emoji || "🔔"} ${category.name.charAt(0).toUpperCase() + category.name.slice(1)}`,
    description: validationResult.description || `A new ${category.name} has occured`,
    color: category.color,
    timestamp: new Date().toISOString(),
    fields: Object.entries(validationResult.fields || {}).map(([k, v]) => ({
      name: k,
      value: String(v),
      inline: true,
    })),
  }

  const event = await db.event.create({
    data: {
      name: category.name,
      formattedMessage: `${eventData.title}\n\n${eventData.description}`,
      userId: user.id,
      fields: validationResult.fields || {},
      eventCategoryId: category.id,
    },
  })


  try {
    await discord.sendEmbed(dmChannel.id, eventData)
    await db.event.update({
      where: {
        id: event.id,
      },
      data: { diliveryStatus: "DELIVERED" },
    })
  } catch (err) {
    await db.event.update({
      where: {
        id: event.id,
      },
      data: { diliveryStatus: "FAILED" },
    })
    console.log(err)

    return NextResponse.json({ message: "Error Processing event", eventId: event.id }, { status: 500 })
  }
}

