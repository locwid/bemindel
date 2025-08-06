import { orpc } from '@/shared/api'
import { HealthCheckContext } from '@/shared/api/health-check'
import { useQuery } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'

export const HealthCheckProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { data, error, isPending } = useQuery(orpc.healthCheck.queryOptions())

  if (isPending) {
    return <>Loading ...</>
  }

  if (error) {
    return <>Error: {error.message}</>
  }

  if (!data) {
    return <>No data available</>
  }

  return (
    <HealthCheckContext.Provider value={data}>
      {children}
    </HealthCheckContext.Provider>
  )
}
