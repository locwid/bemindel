export interface Project {
  id: string
  name: string
  code: string
}

export interface HeaderUser {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

export const mockProjects: Project[] = [
  { id: 'p1', name: 'Core Platform', code: 'CORE' },
  { id: 'p2', name: 'Mobile App', code: 'MOB' },
  { id: 'p3', name: 'ML Toolkit', code: 'ML' },
]

export const mockUser: HeaderUser = {
  id: 'u1',
  name: 'Иван Петров',
  email: 'ivan@example.com',
}

export function getProjectById(id: string | undefined | null): Project | null {
  if (!id) return null
  return mockProjects.find((p) => p.id === id) ?? null
}
