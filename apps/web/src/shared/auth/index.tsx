import type { Session, User } from 'better-auth'
import { createAuthClient } from 'better-auth/react'
import { createContext, useContext } from 'react'
import { Navigate, Outlet } from 'react-router'

export const authClient = createAuthClient({
  baseURL: 'http://localhost:3000',
})

const AuthContext = createContext<{
  session: Session
  user: User
} | null>(null)

export const AuthOnly: React.FC<{ redirectTo: string }> = ({ redirectTo }) => {
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

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthOnly')
  }
  return context
}
