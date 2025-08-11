import React from 'react'
import { Input } from '@/shared/ui/kit/Input'
import { Search } from 'lucide-react'
import { cn } from '@/shared/ui/lib'

export interface PropsProjectSearch {
  value: string
  onChange: (v: string) => void
  className?: string
}

export const ProjectSearch: React.FC<PropsProjectSearch> = ({
  value,
  onChange,
  className,
}) => {
  return (
    <div className={cn('relative w-56', className)}>
      <Search className='text-muted-foreground pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2' />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={'Поиск по проекту…'}
        className='pl-8'
        autoComplete='off'
        spellCheck={false}
      />
    </div>
  )
}
