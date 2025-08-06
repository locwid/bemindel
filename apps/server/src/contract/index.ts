import { auth } from '@/app/auth'
import {
  ContractRouterClient,
  InferContractRouterInputs,
  InferContractRouterOutputs,
  oc,
  ORPCError,
} from '@orpc/contract'
import { implement } from '@orpc/server'
import { z } from 'zod'

const contract = {
  healthCheck: oc.output(
    z.object({
      server: z.boolean(),
      database: z.boolean(),
      setupRequired: z.boolean(),
    }),
  ),
  setupServer: oc
    .input(
      z.object({
        postgresUrl: z.string(),
      }),
    )
    .output(
      z.object({
        result: z.string(),
      }),
    ),
}

export const os = implement(contract)

export const base = os.$context<{ headers: Headers }>()

export const authMiddleware = base.middleware(
  async ({ context, context: { headers }, next }) => {
    const session = await auth.api.getSession({ headers })
    if (!session) {
      throw new ORPCError('UNAUTHORIZED')
    }

    const result = await next({
      context: {
        ...context,
        session: session.session,
        user: session.user,
      },
    })

    return result
  },
)

export type Contract = ContractRouterClient<typeof contract>
export type ContractInput = InferContractRouterInputs<typeof contract>
export type ContractOutput = InferContractRouterOutputs<typeof contract>
