import type { PropsWithChildren } from 'react'
import { useHealthCheck } from '../model/use-health-check'
import { Navigate } from 'react-router'
import { FullscreenError } from '@/shared/ui/components/FullscreenError'
import { FullscreenLoading } from '@/shared/ui/components/FullscreenLoading'

type PropsServerSetupGuard =
  | {
      required: true
    }
  | {
      required: false
      redirectTo: string
    }

export const ServerSetupGuard: React.FC<
  PropsWithChildren<PropsServerSetupGuard>
> = (props) => {
  const { required, children } = props
  const { data, isPending, isSuccess, isError, error } = useHealthCheck()

  if (isPending) {
    return <FullscreenLoading />
  }

  if (isError) {
    return <FullscreenError error={error} />
  }

  if (isSuccess) {
    if (required) {
      if (data.setupRequired) {
        return <Navigate to='/setup' />
      }
    } else {
      if (!data.setupRequired) {
        return <Navigate to={props.redirectTo} />
      }
    }
  }

  return children
}
