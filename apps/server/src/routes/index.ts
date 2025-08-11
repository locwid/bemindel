import { auth } from '@/app/auth'
import { base, os } from '@/contract'
import { db, tables } from '@/db'
import { migrate } from 'drizzle-orm/bun-sql/migrator'
import { projectHandler } from './project'
import { ORPCError } from '@orpc/contract'

const isSetup = async () => {
  const userCount = await db.$count(tables.users)
  return userCount > 0
}

export const router = {
  healthCheck: os.healthCheck.handler(async () => {
    return {
      server: true,
      setup: await isSetup(),
    }
  }),
  setupServer: os.setupServer.handler(async ({ input }) => {
    if (await isSetup()) {
      throw new ORPCError('BAD_REQUEST', { message: 'Server already setup' })
    }

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
  }),
  project: projectHandler,
}
