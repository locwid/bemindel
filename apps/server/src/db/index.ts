import { drizzle } from 'drizzle-orm/bun-sql'
import * as schema from './schema'
import { SQL } from 'bun'
import { env } from '@/app/env'

const client = new SQL(env.POSTGRES_URL)
export const db = drizzle({ client, schema })
export const tables = schema
