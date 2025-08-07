import { betterAuth, BetterAuthOptions } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import * as schema from '@/db/schema/auth'
import { db } from '@/db'
import { env } from './env'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
    schema,
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 1 * 60,
    },
  },
  trustedOrigins: [env.CLIENT_URL],
  emailAndPassword: {
    enabled: true,
    password: {
      hash: (val) => Bun.password.hash(val, { algorithm: 'bcrypt', cost: 14 }),
      verify: ({ hash, password }) =>
        Bun.password.verify(password, hash, 'bcrypt'),
    },
    minPasswordLength: 6,
    maxPasswordLength: 128,
    requireEmailVerification: false,
  },
  advanced: {
    database: {
      generateId: () => Bun.randomUUIDv7(),
    },
  },
})
