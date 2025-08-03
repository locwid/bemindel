import { QueryProvider } from './providers/query-provider'
import { Router } from './router'
import React from 'react'

export const App: React.FC = () => {
  return (
    <QueryProvider>
      <Router />
    </QueryProvider>
  )
}
