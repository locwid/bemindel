import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import type { Contract } from '@bemindel/server/contract'
import { createTanstackQueryUtils } from '@orpc/tanstack-query'

const link = new RPCLink({
  url: 'http://localhost:3000/rpc',
})

const orpcClient: Contract = createORPCClient(link)

export const orpc = createTanstackQueryUtils(orpcClient)
