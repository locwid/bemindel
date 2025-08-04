import { ContractRouterClient, oc } from '@orpc/contract'
import { implement } from '@orpc/server'
import { Session, User } from 'better-auth'
import { z } from 'zod'

const contract = {
  healthCheck: oc.output(
    z.object({
      status: z.string(),
    }),
  ),
}

export const os = implement(contract)

export const base = os.$context<{ session: Session; user: User }>()

export type Contract = ContractRouterClient<typeof contract>
