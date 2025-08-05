import { authClient, AuthContext } from '@/shared/auth'
import { Navigate, Outlet } from 'react-router'

export const AuthOnlyGuard: React.FC<{ redirectTo: string }> = ({
  redirectTo,
}) => {
  const { data, isPending, error } = authClient.useSession()

  if (isPending) {
    return <>Loading...</>
  }

  if (error) {
    return <>Error: {error.message}</>
  }

  if (!data) {
    return <Navigate to={redirectTo} />
  }

  return (
    <AuthContext.Provider value={data}>
      <Outlet />
    </AuthContext.Provider>
  )
}
