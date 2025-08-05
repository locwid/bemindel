import type { Session, User } from 'better-auth'
import { createAuthClient } from 'better-auth/react'
import { createContext, useContext } from 'react'

export const authClient = createAuthClient({
  baseURL: 'http://localhost:3000',
})

export const AuthContext = createContext<{
  session: Session
  user: User
} | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthOnly')
  }
  return context
}
