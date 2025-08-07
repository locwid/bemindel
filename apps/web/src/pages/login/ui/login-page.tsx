import { LoginForm } from '@/features/authorization'

export const LoginPage: React.FC = () => {
  return (
    <div className='bg-background flex min-h-dvh items-center justify-center px-4'>
      <LoginForm className='mx-auto' />
    </div>
  )
}
