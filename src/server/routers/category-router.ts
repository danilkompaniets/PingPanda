import { router } from "@/server/__internals/router"
import { privateProcedure } from "@/server/procedures"
import { db } from "@/db"
import { startOfDay, startOfMonth, startOfWeek } from "date-fns"
import { z } from "zod"
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validators/category-validator"
import { parseColor } from "@/utils"
import { HTTPException } from "hono/http-exception"

export const categoryRouter = router({
  getEventCategories: privateProcedure.query(async ({ c, ctx }) => {

    const categories = await db.eventCategory.findMany({
      where: { userId: ctx.user.id },
      select: {
        id: true,
        name: true,
        emoji: true,
        color: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: "desc" },
    })

    console.log(categories)

    const categoriesWithCounts = await Promise.all(categories.map(async (category) => {
      const now = new Date()
      const firstDayOfMonth = startOfMonth(now)

      const [uniqueFieldCount, eventsCount, lastPing] = await Promise.all([db.event.findMany({
        where: {
          EventCategory: { id: category.id },
          createdAt: { gte: firstDayOfMonth },
        },
        select: { fields: true },
        distinct: ["fields"],
      }).then((events) => {
        const fieldNames = new Set<string>()
        events.forEach(event => {
          Object.keys(event.fields as object).forEach((fieldName) => {
            fieldNames.add(fieldName)
          })
        })
        return fieldNames.size
      }),
        db.event.count({
          where: {
            EventCategory: { id: category.id },
            createdAt: { gte: firstDayOfMonth },
          },
        }),

        db.event.findFirst({
          where: {
            EventCategory: { id: category.id },
          },
          orderBy: { createdAt: "desc" },
          select: { createdAt: true },
        }),
      ])

      return {
        ...category,
        uniqueFieldCount,
        eventsCount,
        lastPing: lastPing?.createdAt || null,
      }
    }))

    return c.superjson({ categories: categoriesWithCounts })
  }),

  deleteCategory: privateProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ c, ctx, input }) => {
      const { name } = input
      await db.eventCategory.delete({
        where: { name_userId: { name, userId: ctx.user.id } },
      })
      return c.json({ success: true })
    }),


  createEventCategory: privateProcedure.input(z.object({
    name: CATEGORY_NAME_VALIDATOR,
    color: z.string().min(1, "Color is required.").regex(/^#[0-9A-F]{6}$/i, "Invalid color format."),
    emoji: z.string().emoji("Invalid emoji format.").optional(),
  })).mutation(async ({ c, ctx, input }) => {
    const { user } = ctx
    const { name, color, emoji } = input

    const eventCategory = await db.eventCategory.create({
      data: {
        name: name.toLowerCase(),
        color: parseColor(color),
        emoji: emoji,
        userId: user.id,
      },
    })

    return c.json({ eventCategory })
  }),

  insertQuickStartCategories: privateProcedure.mutation(async ({ c, ctx }) => {
    const categories = await db.eventCategory.createMany({
      data: [
        {
          userId: ctx.user.id,
          name: "Bug",
          emoji: "👾",
          color: parseColor("#de781f"),
        },
        {
          userId: ctx.user.id,
          name: "Sale",
          emoji: "💰",
          color: parseColor("#1f85de"),
        },
        {
          userId: ctx.user.id,
          name: "sign-up",
          emoji: "🙎🏻‍♂️",
          color: parseColor("#72cb29"),
        },
      ],
    })
    return c.json({ success: true })
  }),

  pollCategory: privateProcedure
    .input(z.object({ name: CATEGORY_NAME_VALIDATOR }))
    .query(async ({ c, ctx, input }) => {
      const { name } = input

      const category = await db.eventCategory.findUnique({
        where: { name_userId: { name, userId: ctx.user.id } },
        include: {
          _count: {
            select: {
              events: true,
            },
          },
        },
      })

      if (!category) {
        throw new HTTPException(404, {
          message: `Category "${name}" not found`,
        })
      }

      const hasEvents = category._count.events > 0

      return c.json({ hasEvents })
    }),

  getEventsByCategoryName: privateProcedure.input(z.object({
    name: CATEGORY_NAME_VALIDATOR,
    page: z.number(),
    limit: z.number().max(50),
    timeRange: z.enum(["today", "week", "month"]),
  })).query(async ({ c, ctx, input }) => {
    const { name, page, limit, timeRange } = input

    const now = new Date()
    let startDate: Date

    switch (timeRange) {
      case "today":
        startDate = startOfDay(now)
        break
      case "week":
        startDate = startOfWeek(now, { weekStartsOn: 0 })
        break
      case "month":
        startDate = startOfMonth(now)
        break
    }

    const [events, eventsCount, uniqueFieldCount] = await Promise.all([
      db.event.findMany({
        where: { EventCategory: { name, userId: ctx.user.id }, createdAt: { gte: startDate } },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      db.event.count({
        where: {
          EventCategory: { name, userId: ctx.user.id },
          createdAt: { gte: startDate },
        },
      }),
      db.event.findMany({
        where: {
          EventCategory: { name, userId: ctx.user.id },
          createdAt: { gte: startDate },
        },
        select: {
          fields: true,
        },
        distinct: ["fields"],
      }).then((events) => {
        const fieldNames = new Set<string>()
        events.forEach((event) => {
          Object.keys(event.fields as object).forEach((fieldName) => {
            fieldNames.add(fieldName)
          })
        })
        return fieldNames.size
      }),
    ])

    return c.superjson({ uniqueFieldCount, eventsCount, events })
  }),
})
