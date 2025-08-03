import { orpc } from '@/shared/api'
import { useQuery } from '@tanstack/react-query'

export const HomePage: React.FC = () => {
  const { data } = useQuery(orpc.healthCheck.queryOptions())

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main entry point of our application.</p>
      <p>Explore the features and functionalities we offer!</p>
      <div>Server status: {data?.status ?? 'N/A'}</div>
    </div>
  )
}
