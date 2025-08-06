import type { ContractOutput } from '@bemindel/server/contract'
import { createContext, useContext } from 'react'

type HealthCheckData = ContractOutput['healthCheck']

export const HealthCheckContext = createContext<HealthCheckData | null>(null)

export const useHealthCheck = () => {
  const data = useContext(HealthCheckContext)
  if (!data) {
    throw new Error('HealthCheck context is not defined')
  }
  return data
}
