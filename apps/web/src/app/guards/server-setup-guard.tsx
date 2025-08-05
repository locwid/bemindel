import { orpc } from '@/shared/api'
import { useQuery } from '@tanstack/react-query'
import { Navigate, Outlet } from 'react-router'

export const ServerSetupGuard: React.FC = () => {
  const { data, error, isPending } = useQuery(orpc.healthCheck.queryOptions())

  if (isPending) {
    return <>Loading ...</>
  }

  if (error) {
    return <>Error: {error.message}</>
  }

  if (data?.setupRequired) {
    return <Navigate to='/setup' />
  }

  return <Outlet />
}
