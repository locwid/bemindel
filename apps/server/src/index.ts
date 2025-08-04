import { Hono } from 'hono'
import { orpc } from '@/app/orpc'
import { cors } from 'hono/cors'
import { config } from '@/app/config'
import { auth } from '@/app/auth'

const app = new Hono()

app.use(
  '*',
  cors({
    origin: config.CLIENT_URL,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  }),
)
app.use('/rpc/*', orpc('/rpc'))
app.on(['POST', 'GET'], '/api/auth/*', (c) => {
  return auth.handler(c.req.raw)
})

const server = Bun.serve({
  fetch: app.fetch,
  port: 3000,
})

console.log(`Server running at http://localhost:${server.port}`)
