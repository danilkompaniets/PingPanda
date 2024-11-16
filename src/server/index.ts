import { Hono } from "hono"
import { cors } from "hono/cors"
import { handle } from "hono/vercel"
import { authRouter } from "@/server/routers/auth-router"
import { categoryRouter } from "@/server/routers/category-router"

const app = new Hono().basePath("/api").use(cors())

const appRouter = app
  .route("/auth", authRouter)
  .route("/category", categoryRouter)

export const httpHandler = handle(app)

export default app

export type AppType = typeof appRouter
