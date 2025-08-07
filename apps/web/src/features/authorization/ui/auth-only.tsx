import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router'
import { AuthLoadingBox } from './auth-loading-box'

interface PropsAuthOnly {
  redirectTo: string
}

export const AuthOnly: React.FC<PropsWithChildren<PropsAuthOnly>> = ({
  children,
  redirectTo,
}) => {
  return (
    <AuthLoadingBox
      privateRender={() => children}
      publicRender={() => <Navigate to={redirectTo} />}
    />
  )
}
