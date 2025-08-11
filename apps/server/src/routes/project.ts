import { authMiddleware, base } from '@/contract'
import { db, tables } from '@/db'
import { ORPCError } from '@orpc/contract'
import { eq } from 'drizzle-orm'
import { handle } from 'hono/service-worker'

const getProject = async (projectId: string) => {
  const project = await db.query.projects.findFirst({
    where: (projects, { eq }) => eq(projects.id, projectId),
    with: {
      creator: {
        columns: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  })
  if (!project) {
    throw new ORPCError('NOT_FOUND', { message: 'Project not found' })
  }
  return {
    id: project.id,
    name: project.name,
    description: project.description,
    code: project.code,
    creator: project.creator ? project.creator : null,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  }
}

const getProjectHandler = base.project.get
  .use(authMiddleware)
  .handler(async ({ input: { id } }) => getProject(id))

const createProject = base.project.create
  .use(authMiddleware)
  .handler(({ input, context: { user } }) => {
    return db.transaction(async (tx) => {
      const projectId = Bun.randomUUIDv7()
      await tx.insert(tables.projects).values({
        id: projectId,
        name: input.name,
        description: input.description,
        code: input.code,
        creatorId: user.id,
      })
      await tx.insert(tables.projectMembers).values({
        userId: user.id,
        projectId,
      })

      return getProject(projectId)
    })
  })

export const getAllHandler = base.project.getAll
  .use(authMiddleware)
  .handler(async ({ context: { user } }) => {
    const result = await db.query.projectMembers.findMany({
      where: (projectMembers, { eq }) => eq(projectMembers.userId, user.id),
      columns: {},
      with: {
        project: {
          with: {
            creator: {
              columns: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
      },
    })
    return result.map(({ project }) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      code: project.code,
      creator: project.creator ? project.creator : null,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    }))
  })

const deleteProjectHandler = base.project.delete
  .use(authMiddleware)
  .handler(async ({ input: { id }, context: { user } }) => {
    const result = await db
      .delete(tables.projects)
      .where(eq(tables.projects.id, id))
      .returning({ id: tables.projects.id })
    return {
      result: result?.[0]?.id === id,
    }
  })

export const projectHandler = {
  get: getProjectHandler,
  getAll: getAllHandler,
  create: createProject,
  delete: deleteProjectHandler,
}
