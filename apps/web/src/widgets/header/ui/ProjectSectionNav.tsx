import React from 'react'
import { Button } from '@/shared/ui/kit/Button'
import { cn } from '@/shared/ui/lib'

interface Option {
  key: string
  label: string
}

interface PropsProjectSectionNav {
  active: string | null
  onChange?: (key: string) => void
  options?: Option[]
  className?: string
}

export const ProjectSectionNav: React.FC<PropsProjectSectionNav> = ({
  active,
  onChange,
  options = [],
  className,
}) => {
  return (
    <nav className={cn('flex items-center gap-1', className)}>
      {options.map((s) => {
        const isActive = s.key === active
        return (
          <Button
            key={s.key}
            variant={isActive ? 'secondary' : 'ghost'}
            className={cn(
              'px-3',
              isActive &&
                'data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground',
            )}
            data-state={isActive ? 'active' : 'inactive'}
            onClick={() => onChange?.(s.key)}
          >
            {s.label}
          </Button>
        )
      })}
    </nav>
  )
}
