import { Hono } from "hono"
import { cors } from "hono/cors"
import { handle } from "hono/vercel"
import { authRouter } from "@/server/routers/auth-router"

const app = new Hono().basePath("/api").use(cors())

const appRouter = app.route("/auth", authRouter)

export const httpHandler = handle(app)

export default app

export type AppType = typeof appRouter
