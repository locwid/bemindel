import { useAuth } from './useAuth'

export const useUser = () => {
  const { data } = useAuth()
  if (!data) {
    throw new Error('useUser: no user data available')
  }
  return data.user
}
