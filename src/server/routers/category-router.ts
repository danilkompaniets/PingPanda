import { router } from "@/server/__internals/router"
import { privateProcedure } from "@/server/procedures"

export const categoryRouter = router({
  getEventCategories: privateProcedure.query(({ c, ctx }) => {

  }),
})
