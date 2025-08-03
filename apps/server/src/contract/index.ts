import { ContractRouterClient, oc } from '@orpc/contract'
import { implement } from '@orpc/server'
import { z } from 'zod'

const contract = {
  healthCheck: oc.output(
    z.object({
      status: z.string(),
    }),
  ),
}

export const os = implement(contract)

export type Contract = ContractRouterClient<typeof contract>
