import { z } from 'zod'

const zEnv = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  CLIENT_URL: z.string().default('http://localhost:3001'),
  POSTGRES_URL: z.string(),
})

export const env = zEnv.parse(Bun.env)
