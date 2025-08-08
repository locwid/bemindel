import { relations } from 'drizzle-orm'
import { pgTable, text } from 'drizzle-orm/pg-core'
import { projects } from './projects'
import { users } from './auth'

export const projectMembers = pgTable('project_members', {
  userId: text('user_id'),
  projectId: text('project_id'),
  permissions: text('permissions').array(),
})

export const projectMembersRelations = relations(projectMembers, ({ one }) => ({
  project: one(projects, {
    fields: [projectMembers.projectId],
    references: [projects.id],
  }),
  user: one(users, {
    fields: [projectMembers.userId],
    references: [users.id],
  }),
}))
