import { Hono } from 'hono'
import { orpc } from '@/app/orpc'
import { cors } from 'hono/cors'
import { config } from '@/app/config'

const app = new Hono()

app.use('/rpc/*', cors({ origin: config.CLIENT_URL }), orpc('/rpc'))

const server = Bun.serve({
  fetch: app.fetch,
  port: 3000,
})

console.log(`Server running at http://localhost:${server.port}`)
