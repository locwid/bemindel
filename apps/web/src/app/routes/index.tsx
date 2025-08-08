import { Routes } from 'react-router'
import { BrowserRouter } from 'react-router'
import { buildRoutes } from './buildRoutes'
import { routesTree } from './routesTree'

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>{buildRoutes(routesTree)}</Routes>
    </BrowserRouter>
  )
}
