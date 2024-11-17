import { router } from "@/server/__internals/router"
import { privateProcedure } from "@/server/procedures"
import { db } from "@/db"
import { startOfMonth } from "date-fns"
import { z } from "zod"
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validators/category-validator"
import { parseColor } from "@/utils"

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
})
