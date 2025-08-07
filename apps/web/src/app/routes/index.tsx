import { Outlet, Route, Routes, type RouteProps } from 'react-router'
import { BrowserRouter } from 'react-router'

import { HomePage } from '@/pages/home'
import { LoginPage } from '@/pages/login'
import { SetupPage } from '@/pages/setup'

import { ServerSetupGuard } from '@/features/server-setup'
import { AuthOnly } from '@/features/authorization'

type RouteDefinition = Omit<RouteProps, 'children'> &
  ({ index: true } | { index?: false; children?: RouteDefinition[] })

const routes: RouteDefinition[] = [
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
    children: [{ path: '/login', element: <LoginPage /> }],
  },
  {
    element: (
      <AuthOnly
        redirectTo='/login'
        children={<Outlet />}
      />
    ),
    children: [{ index: true, element: <HomePage /> }],
  },
]

const buildRoutes = (routes: RouteDefinition[]) => {
  return routes.map((props) => {
    if (props.index) {
      return <Route {...props} />
    }
    const { children, ...other } = props
    return <Route {...other}>{children ? buildRoutes(children) : null}</Route>
  })
}

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>{buildRoutes(routes)}</Routes>
    </BrowserRouter>
  )
}
