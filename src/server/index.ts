import { Hono } from "hono"
import { cors } from "hono/cors"
import { handle } from "hono/vercel"
import { postRouter } from "./routers/post-router"

const app = new Hono().basePath("/api").use(cors())

const appRouter = app.route("/post", postRouter)

export const httpHandler = handle(app)

export default app

export type AppType = typeof appRouter
