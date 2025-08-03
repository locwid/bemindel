import { os } from '@/contract'

export const router = os.router({
  healthCheck: os.healthCheck.handler(() => ({ status: 'ok' })),
})
