import { drizzle } from 'drizzle-orm/bun-sql'
import { SQL } from 'bun'
import { config } from '@/app/config'
import * as schema from './schema'

const client = new SQL(config.POSTGRES_URL)
export const db = drizzle({ client, schema })
export const tables = schema
