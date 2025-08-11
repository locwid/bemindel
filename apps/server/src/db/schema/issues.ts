import { pgTable, text, integer } from 'drizzle-orm/pg-core'
import { baseTable } from '../helpers/baseTable'
import { relations } from 'drizzle-orm'
import { users } from './auth'
import { projects } from './projects'

export const issues = pgTable('issues', {
  ...baseTable,
  title: text('title').notNull(),
  type: text('type').notNull(),
  description: text('description').notNull(),
  number: integer('number').notNull(),
  project_id: text('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  creatorId: text('creator_id').references(() => users.id, {
    onDelete: 'set null',
  }),
  assigneeId: text('assignee_id').references(() => users.id, {
    onDelete: 'set null',
  }),
})

export const issueRelations = relations(issues, ({ one }) => ({
  creator: one(users, {
    fields: [issues.creatorId],
    references: [users.id],
  }),
  assignee: one(users, {
    fields: [issues.assigneeId],
    references: [users.id],
  }),
  project: one(projects, {
    fields: [issues.project_id],
    references: [projects.id],
  }),
}))
