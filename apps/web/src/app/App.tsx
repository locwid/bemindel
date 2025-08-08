import { ThemeProvider } from '@/shared/lib/theme'
import { AppRoutes } from './routes'
import './styles/main.css'
import React from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/shared/api'
import { ErrorBoundary } from 'react-error-boundary'
import { FullscreenError } from '@/shared/ui/components/FullscreenError'

export const App: React.FC = () => {
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => <FullscreenError error={error} />}
    >
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
