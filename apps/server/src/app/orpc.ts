import { RPCHandler } from '@orpc/server/fetch'
import { createMiddleware } from 'hono/factory'
import { router } from '@/routes'

const handler = new RPCHandler(router)

export const orpc = (path: `/${string}`) =>
  createMiddleware(async (c, next) => {
    const { matched, response } = await handler.handle(c.req.raw, {
      prefix: path,
      context: {},
    })

    if (matched) {
      return c.newResponse(response.body, response)
    }

    await next()
  })
