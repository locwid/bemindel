import { QueryProvider } from './providers/query-provider'
import { ThemeProvider } from './providers/theme-provider'
import { Router } from './router'
import React from 'react'

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <QueryProvider>
        <Router />
      </QueryProvider>
    </ThemeProvider>
  )
}
