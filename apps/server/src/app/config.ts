import { z } from 'zod'

const zConfig = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  CLIENT_URL: z.string().default('http://localhost:3000'),
})

export const config = zConfig.parse(Bun.env)
