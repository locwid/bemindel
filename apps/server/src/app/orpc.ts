import { RPCHandler } from '@orpc/server/fetch'
import { createMiddleware } from 'hono/factory'
import { router } from '@/routes'
import { auth } from './auth'

const handler = new RPCHandler(router)

export const orpc = (path: `/${string}`) =>
  createMiddleware(async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers })
    if (!session) {
      return c.newResponse('Unauthorized', 401)
    }

    const { matched, response } = await handler.handle(c.req.raw, {
      prefix: path,
      context: {
        session: session.session,
        user: session.user,
      },
    })

    if (matched) {
      return c.newResponse(response.body, response)
    }

    await next()
  })
