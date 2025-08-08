import type { RouteDefinition } from './types'
import { Outlet } from 'react-router'

import { AuthOnly } from '@/features/authorization'
import { ServerSetupGuard } from '@/features/server-setup'

import { SetupPage } from '@/pages/setup'
import { LoginPage } from '@/pages/login'
import { HomePage } from '@/pages/home'

export const routesTree: RouteDefinition[] = [
  {
    element: (
      <ServerSetupGuard
        required={false}
        redirectTo='/'
        children={<Outlet />}
      />
    ),
    children: [
      {
        path: '/setup',
        element: <SetupPage />,
      },
    ],
  },
  {
    element: (
      <ServerSetupGuard
        required
        children={<Outlet />}
      />
    ),
    children: [
      { path: '/login', element: <LoginPage /> },
      {
        element: (
          <AuthOnly
            redirectTo='/login'
            children={<Outlet />}
          />
        ),
        children: [{ index: true, element: <HomePage /> }],
      },
    ],
  },
]
