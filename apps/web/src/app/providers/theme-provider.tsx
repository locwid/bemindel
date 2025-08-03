import { Theme } from '@/shared/theme'
import type { PropsWithChildren } from 'react'

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Theme
      defaultTheme='dark'
      storageKey='vite-ui-theme'
    >
      {children}
    </Theme>
  )
}
