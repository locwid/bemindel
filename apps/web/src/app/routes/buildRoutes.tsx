import { Route } from 'react-router'
import type { RouteDefinition } from './types'

export const buildRoutes = (routes: RouteDefinition[]) => {
  return routes.map((props) => {
    if (props.index) {
      return <Route {...props} />
    }
    const { children, ...other } = props
    return <Route {...other}>{children ? buildRoutes(children) : null}</Route>
  })
}
