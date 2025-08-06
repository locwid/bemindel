import { HealthCheckProvider } from './providers/health-check-provider'
import { QueryProvider } from './providers/query-provider'
import { ThemeProvider } from './providers/theme-provider'
import { Router } from './router'
import React from 'react'

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <QueryProvider>
        <HealthCheckProvider>
          <Router />
        </HealthCheckProvider>
      </QueryProvider>
    </ThemeProvider>
  )
}
