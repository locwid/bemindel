import { authClient } from '@/shared/api'

export const useAuth = () => {
  return authClient.useSession()
}
