import { LoaderCircle } from 'lucide-react'

export const FullscreenLoading: React.FC = () => {
  return (
    <div className='bg-background flex h-dvh items-center justify-center'>
      <LoaderCircle
        className='animate-spin'
        size={96}
      />
    </div>
  )
}
