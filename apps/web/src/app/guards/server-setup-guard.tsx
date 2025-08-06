import { orpc } from '@/shared/api'
import { useHealthCheck } from '@/shared/api/health-check'
import { useQuery } from '@tanstack/react-query'
import { Navigate, Outlet } from 'react-router'

export const ServerSetupGuard: React.FC = () => {
  const { setupRequired } = useHealthCheck()

  if (setupRequired) {
    return <Navigate to='/setup' />
  }

  return <Outlet />
}
