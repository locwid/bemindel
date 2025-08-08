import { orpc } from '@/shared/api'
import type { ContractOutput } from '@bemindel/server/contract'
import { useQuery } from '@tanstack/react-query'

export type HealthCheckData = ContractOutput['healthCheck']

export const useHealthCheck = () => {
  return useQuery(orpc.healthCheck.queryOptions())
}
