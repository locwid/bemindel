import { Header } from '@/widgets/header'
import type { PropsWithChildren } from 'react'

export const BaseLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className='flex flex-1 flex-col gap-4 p-4'>{children}</main>
    </div>
  )
}
