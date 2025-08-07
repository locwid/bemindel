import { Alert, AlertTitle, AlertDescription } from '@/shared/ui/kit/Alert'
import { AlertCircle } from 'lucide-react'

interface PropsFullscreenError {
  error?: Error | string | null
}

export const FullscreenError: React.FC<PropsFullscreenError> = ({ error }) => {
  const content =
    error instanceof Error
      ? error.message
      : error || 'An unexpected error occurred'

  return (
    <div className='bg-background flex h-dvh w-full items-center justify-center'>
      <Alert
        className='max-w-md'
        variant='destructive'
      >
        <AlertCircle />
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription>{content}</AlertDescription>
      </Alert>
    </div>
  )
}
