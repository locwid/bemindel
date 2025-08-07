import { FullscreenLoading } from '@/shared/ui/components/FullscreenLoading'
import { useAuth } from '../model/use-auth'
import { FullscreenError } from '@/shared/ui/components/FullscreenError'
import type { User } from 'better-auth'

interface PropsAuthLoadingBox {
  privateRender?: (user: User) => React.ReactNode
  publicRender?: () => React.ReactNode
}

export const AuthLoadingBox: React.FC<PropsAuthLoadingBox> = ({
  privateRender: render,
  publicRender: fallbackRender,
}) => {
  const { data, isPending, error } = useAuth()

  if (isPending) {
    return <FullscreenLoading />
  }

  if (error) {
    return <FullscreenError error={error} />
  }

  if (data) {
    return render?.(data.user)
  }

  return fallbackRender?.()
}
