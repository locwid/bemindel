import React from 'react'
import { Button } from '@/shared/ui/kit/Button'
import { Plus } from 'lucide-react'

interface PropsQuickAddIssueButton {
  onClick?: () => void
  loading?: boolean
  className?: string
}

export const QuickAddIssueButton: React.FC<PropsQuickAddIssueButton> = ({
  onClick,
  loading,
  className,
}) => {
  return (
    <Button
      onClick={onClick}
      className={className}
    >
      <Plus className='size-4' />
      <span className='hidden md:inline'>
        {loading ? 'Создание...' : 'Новая задача'}
      </span>
    </Button>
  )
}
