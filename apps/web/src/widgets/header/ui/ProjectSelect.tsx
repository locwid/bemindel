import React from 'react'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/shared/ui/kit/Select'
import { FolderGit2 } from 'lucide-react'
import { cn } from '@/shared/ui/lib'

type Option = { id: string; name: string; code: string }

interface ProjectSelectProps {
  value: Option | null
  onChange: (opt: Option) => void
  options?: Option[]
  className?: string
}

export const ProjectSelect: React.FC<ProjectSelectProps> = ({
  value,
  onChange,
  options = [],
  className,
}) => {
  const handleSelect = (id: string) => {
    const option = options.find((o) => o.id === id)
    if (!option) {
      throw new Error(
        `Critical error: ProjectSelect received unknown id: ${id}`,
      )
    }
    onChange(option)
  }

  return (
    <Select
      value={value?.id}
      onValueChange={handleSelect}
    >
      <SelectTrigger
        className={cn(`w-full min-w-52 justify-between`, className)}
      >
        <SelectValue
          placeholder={
            <span className='flex items-center gap-2 truncate'>
              <FolderGit2 className='text-muted-foreground size-4 shrink-0' />
              <span className='truncate'>Выберите проект</span>
            </span>
          }
        >
          {value && (
            <span className='flex items-center gap-2 truncate'>
              <FolderGit2 className='text-muted-foreground size-4 shrink-0' />
              <span className='truncate'>{value.name}</span>
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className='w-60'>
        {options.map((option) => (
          <SelectItem
            key={option.id}
            value={option.id}
          >
            <span className='truncate'>
              {option.name}
              <span className='text-muted-foreground ml-1 text-xs'>
                ({option.code})
              </span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
