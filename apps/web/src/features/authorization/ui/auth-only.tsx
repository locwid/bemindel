import type { PropsWithChildren } from 'react'
import { useAuth } from '../model/use-auth'
import { Navigate } from 'react-router'

interface PropsAuthOnly {
  redirectTo: string
}

export const AuthOnly: React.FC<PropsWithChildren<PropsAuthOnly>> = ({
  children,
  redirectTo,
}) => {
  const { data, isPending, error } = useAuth()

  if (isPending) {
    return <>Loading...</>
  }

  if (error) {
    return <>Error: {error.message}</>
  }

  if (!data) {
    return <Navigate to={redirectTo} />
  }

  return children
}
