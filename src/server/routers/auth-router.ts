import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { router } from "../__internals/router"
import { privateProcedure, publicProcedure } from "../procedures"
import { z } from "zod"

export const authRouter = router({
  getDatabaseSyncStatus: publicProcedure.query(async ({ c, ctx }) => {
    const auth = await currentUser()

    if (!auth) {
      return c.json({ isSynced: false })
    }

    const user = await db.user.findFirst({
      where: { externalId: auth.id },
    })

    console.log("USER IN DB:", user)

    if (!user) {
      await db.user.create({
        data: {
          externalId: auth.id,
          email: auth.emailAddresses[0].emailAddress,
        },
      })
    }

    return c.json({ isSynced: true })
  }),

  setDiscordId: privateProcedure.input(z.object({ discordId: z.string().max(20) })).mutation(async ({
                                                                                                      c,
                                                                                                      ctx,
                                                                                                      input, }) => {
    const { user } = ctx
    const { discordId } = input

    await db.user.update({
      where: { id: user.id },
      data: { discordId },
    })
    return c.json({ success: true })
  }),
})

