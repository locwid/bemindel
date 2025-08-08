import { ConfigurationForm } from '@/features/server-setup'

export const SetupPage: React.FC = () => {
  return (
    <div className='bg-background flex min-h-dvh items-center justify-center px-4'>
      <ConfigurationForm className='mx-auto' />
    </div>
  )
}
