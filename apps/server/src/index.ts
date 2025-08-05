import { Hono } from 'hono'
import { orpc } from '@/app/orpc'
import { cors } from 'hono/cors'
import { env } from '@/app/env'
import { auth } from '@/app/auth'
import { runtimeConfig } from './app/runtimeConfig'
import { db } from './db'

const bootstrap = async () => {
  const runtimeConfigState = await runtimeConfig.initialize()
  if (!runtimeConfigState) {
    return
  }
  const { postgresUrl } = runtimeConfigState

  await db.connect(postgresUrl)
}

const startServer = () => {
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

  const server = Bun.serve({
    fetch: app.fetch,
    port: 3000,
  })

  console.log(`Server running at http://localhost:${server.port}`)
}

;(async () => {
  await bootstrap()
  startServer()
})()
