import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router'

import { HomePage } from '@/pages/home'
import { LoginPage } from '@/pages/login-page'
import { SetupPage } from '@/pages/setup-page'

import { ServerSetupGuard } from '@/app/guards/server-setup-guard'
import { AuthOnlyGuard } from '@/app/guards/auth-only-guard'

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/setup'
          element={<SetupPage />}
        />
        <Route element={<ServerSetupGuard />}>
          <Route
            path='/login'
            element={<LoginPage />}
          />
          <Route element={<AuthOnlyGuard redirectTo='/login' />}>
            <Route
              path='/'
              element={<HomePage />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
