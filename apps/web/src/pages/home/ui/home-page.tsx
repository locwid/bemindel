import { useUser } from '@/features/authorization'
import { authClient } from '@/shared/api'
import { Button } from '@/shared/ui/kit/button'
import { useNavigate } from 'react-router'

export const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const { email } = useUser()

  return (
    <div>
      Logged in as: {email}
      <Button
        onClick={async () => {
          await authClient.signOut()
          navigate('/login')
        }}
      >
        Logout
      </Button>
    </div>
  )
}
