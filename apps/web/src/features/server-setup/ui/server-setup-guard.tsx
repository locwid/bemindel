import type { PropsWithChildren } from 'react'
import { useHealthCheck } from '../model/use-health-check'
import { Navigate } from 'react-router'

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
    return <>Loading...</>
  }

  if (isError) {
    return <>Error: {error.message}</>
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
