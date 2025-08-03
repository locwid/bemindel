import { orpc } from '@/shared/api'
import { Button } from '@/shared/ui/button'
import { useQuery } from '@tanstack/react-query'

export const HomePage: React.FC = () => {
  const { data } = useQuery(orpc.healthCheck.queryOptions())

  return (
    <div>
      <Button>Hello world</Button>
      <div>Server status: {data?.status ?? 'N/A'}</div>
    </div>
  )
}
