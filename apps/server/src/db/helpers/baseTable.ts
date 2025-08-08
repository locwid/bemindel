import { text, timestamp } from 'drizzle-orm/pg-core'

export const baseTable = {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => Bun.randomUUIDv7()),
  createdAt: timestamp('created_at')
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => new Date())
    .notNull(),
}
