import { runtimeConfig } from '@/app/runtimeConfig'
import { os } from '@/contract'
import { db } from '@/db'
import { migrate } from 'drizzle-orm/bun-sql/migrator'

export const router = os.router({
  healthCheck: os.healthCheck.handler(async () => {
    return {
      server: true,
      database: db.isDefined,
      setupRequired: !runtimeConfig.isDefined,
    }
  }),
  setupServer: os.setupServer.handler(async ({ input }) => {
    try {
      await db.connect(input.postgresUrl)

      const config = await runtimeConfig.set({
        postgresUrl: input.postgresUrl,
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
