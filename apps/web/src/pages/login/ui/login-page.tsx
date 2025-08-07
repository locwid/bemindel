import { LoginForm } from '@/features/authorization'
import { AuthLoadingBox } from '@/features/authorization/ui/auth-loading-box'
import { Navigate } from 'react-router'

export const LoginPage: React.FC = () => {
  return (
    <AuthLoadingBox
      privateRender={() => <Navigate to='/' />}
      publicRender={() => (
        <div className='bg-background flex min-h-dvh items-center justify-center px-4'>
          <LoginForm className='mx-auto' />
        </div>
      )}
    />
  )
}
