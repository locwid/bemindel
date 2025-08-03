import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router'

import { HomePage } from '@/pages/home'

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<HomePage />}
        />
      </Routes>
    </BrowserRouter>
  )
}
