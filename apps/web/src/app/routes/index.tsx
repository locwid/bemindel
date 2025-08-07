import { Outlet, Route, Routes, type RouteProps } from 'react-router'
import { BrowserRouter } from 'react-router'

import { HomePage } from '@/pages/home'
import { LoginPage } from '@/pages/login'
import { SetupPage } from '@/pages/setup'

import { ServerSetupGuard } from '@/features/server-setup'
import { AuthOnly } from '@/features/authorization'

type RouteDefinition = Omit<RouteProps, 'children'> &
  ({ index: true } | { index?: false; children?: RouteDefinition[] })

const setupRoutes: RouteDefinition[] = [
  {
    path: '/setup',
    element: <SetupPage />,
  },
]

const publicRoutes: RouteDefinition[] = [
  {
    path: '/login',
    element: <LoginPage />,
    children: [],
  },
]

const privateRoutes: RouteDefinition[] = [
  {
    index: true,
    element: <HomePage />,
  },
]

const spreadRoutes = (routes: RouteDefinition[]) => {
  return routes.map((props) => {
    if (props.index) {
      return <Route {...props} />
    }
    const { children, ...other } = props
    return <Route {...other}>{children ? spreadRoutes(children) : null}</Route>
  })
}

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ServerSetupGuard
              required={false}
              redirectTo='/'
              children={<Outlet />}
            />
          }
        >
          {spreadRoutes(setupRoutes)}
        </Route>
        <Route
          element={
            <ServerSetupGuard
              required
              children={<Outlet />}
            />
          }
        >
          {spreadRoutes(publicRoutes)}
          <Route
            element={
              <AuthOnly
                redirectTo='/login'
                children={<Outlet />}
              />
            }
          >
            {spreadRoutes(privateRoutes)}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
