import type { PropsWithChildren } from 'react'
import { useAuth } from '../model/use-auth'
import { Navigate } from 'react-router'
import { FullscreenError } from '@/shared/ui/components/FullscreenError'
import { FullscreenLoading } from '@/shared/ui/components/FullscreenLoading'

interface PropsAuthOnly {
  redirectTo: string
}

export const AuthOnly: React.FC<PropsWithChildren<PropsAuthOnly>> = ({
  children,
  redirectTo,
}) => {
  const { data, isPending, error } = useAuth()

  if (isPending) {
    return <FullscreenLoading />
  }

  if (error) {
    return <FullscreenError error={error} />
  }

  if (!data) {
    return <Navigate to={redirectTo} />
  }

  return children
}
