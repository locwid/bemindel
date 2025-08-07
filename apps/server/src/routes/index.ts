import { auth } from '@/app/auth'
import { os } from '@/contract'
import { db, tables } from '@/db'
import { migrate } from 'drizzle-orm/bun-sql/migrator'

export const router = os.router({
  healthCheck: os.healthCheck.handler(async () => {
    const userCount = await db.$count(tables.users)
    return {
      server: true,
      setup: userCount > 0,
    }
  }),
  setupServer: os.setupServer.handler(async ({ input }) => {
    try {
      const admin = await auth.api.signUpEmail({
        body: {
          name: input.username,
          email: input.email,
          password: input.password,
        },
      })

      return {
        result: 'Server setup complete',
      }
    } catch (e) {
      console.log(e)
      throw e
    }
  }),
})
