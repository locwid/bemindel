import { oc } from '@orpc/contract'
import z from 'zod'

const zProjectUser = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  image: z.string().nullable(),
})

const zProject = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  code: z.string(),
  creator: zProjectUser.nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

const zCreateProject = z.object({
  name: z.string(),
  description: z.string(),
  code: z.string(),
})

export const projectContract = {
  create: oc.input(zCreateProject).output(zProject),
  get: oc.input(z.object({ id: z.string() })).output(zProject),
  getAll: oc.output(z.array(zProject)),
  delete: oc
    .input(z.object({ id: z.string() }))
    .output(z.object({ result: z.boolean() })),
}
