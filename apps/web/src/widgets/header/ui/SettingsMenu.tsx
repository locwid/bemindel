import React from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/shared/ui/kit/DropdownMenu'
import { Button } from '@/shared/ui/kit/Button'
import { Settings as SettingsIcon } from 'lucide-react'

interface SettingsAction {
  key: string
  label: string
}

interface PropsSettingsMenu {
  items: SettingsAction[]
  onAction?: (key: string) => void
}

export const SettingsMenu: React.FC<PropsSettingsMenu> = ({
  items,
  onAction,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          aria-label='Settings menu'
        >
          <SettingsIcon className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-44'
        align='end'
      >
        <DropdownMenuLabel>Настройки</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((item) => (
          <DropdownMenuItem
            key={item.key}
            onSelect={() => onAction?.(item.key)}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
