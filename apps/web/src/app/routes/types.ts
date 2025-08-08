import type { RouteProps } from 'react-router'

export type RouteDefinition = Omit<RouteProps, 'children'> &
  ({ index: true } | { index?: false; children?: RouteDefinition[] })
