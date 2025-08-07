import { Hono } from 'hono'
import { orpc } from '@/app/orpc'
import { cors } from 'hono/cors'
import { env } from '@/app/env'
import { auth } from '@/app/auth'
import { db } from './db'
import { HTTPException } from 'hono/http-exception'
import { migrate } from 'drizzle-orm/bun-sql/migrator'

await migrate(db, {
  migrationsFolder: './migrations',
})

const app = new Hono()

app.use(
  '*',
  cors({
    origin: env.CLIENT_URL,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  }),
)
app.use('/rpc/*', orpc('/rpc'))
app.on(['POST', 'GET'], '/api/auth/*', (c) => auth.handler(c.req.raw))
app.notFound((c) => {
  c.status(404)
  return c.json({
    message: 'Not found',
  })
})

const server = Bun.serve({
  fetch: app.fetch,
  port: 3000,
})

console.log(`Server running at http://localhost:${server.port}`)
