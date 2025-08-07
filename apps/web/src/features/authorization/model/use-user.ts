import { useAuth } from './use-auth'

export const useUser = () => {
  const { data } = useAuth()
  if (!data) {
    throw new Error('useUser must be used within an useAuth or AuthOnly')
  }
  return data.user
}
