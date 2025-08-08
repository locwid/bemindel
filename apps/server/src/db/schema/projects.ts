import { pgTable, text } from 'drizzle-orm/pg-core'
import { baseTable } from '../helpers/baseTable'
import { relations } from 'drizzle-orm'
import { users } from './auth'
import { projectMembers } from './projectMembers'

export const projects = pgTable('projects', {
  ...baseTable,
  name: text('name').notNull(),
  description: text('description').notNull(),
  code: text('code').notNull().unique(),
})

export const projectRelations = relations(projects, ({ many }) => ({
  members: many(projectMembers),
}))
