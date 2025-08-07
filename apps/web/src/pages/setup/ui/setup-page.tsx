import { DatabaseForm } from '@/features/server-setup'

export const SetupPage: React.FC = () => {
  return (
    <div className='bg-background flex min-h-screen items-center justify-center px-4'>
      <DatabaseForm className='mx-auto' />
    </div>
  )
}
