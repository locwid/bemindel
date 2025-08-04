import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router'

import { HomePage } from '@/pages/home'
import { LoginPage } from '@/pages/login-page'
import { AuthOnly } from '@/shared/auth'

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/login'
          element={<LoginPage />}
        />
        <Route element={<AuthOnly redirectTo='/login' />}>
          <Route
            path='/'
            element={<HomePage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
