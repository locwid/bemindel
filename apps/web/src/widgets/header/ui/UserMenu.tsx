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
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/kit/Avatar'
import { ChevronDown, LogOut } from 'lucide-react'
import { getUserInitials } from '../lib/getUserInitials'
import { cn } from '@/shared/ui/lib'

export interface UserData {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

export interface PropsUserMenu {
  user: UserData
  onLogout?: () => void
  className?: string
}

export const UserMenu: React.FC<PropsUserMenu> = ({
  user,
  onLogout,
  className,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className={cn('pr-3 pl-1.5', className)}
          aria-label='User menu'
        >
          <Avatar className='size-6'>
            {user.avatarUrl ? (
              <AvatarImage
                src={user.avatarUrl}
                alt={user.name}
              />
            ) : null}
            <AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
          </Avatar>
          <span className='flex max-w-36 flex-col text-start leading-tight'>
            <span className='truncate text-sm font-medium'>{user.name}</span>
          </span>
          <ChevronDown
            className='size-4 opacity-70'
            aria-hidden='true'
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56'
        align='end'
      >
        <DropdownMenuLabel className='flex flex-col'>
          <span className='font-medium'>{user.name}</span>
          <span className='text-muted-foreground truncate text-sm font-normal'>
            {user.email}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant='destructive'
          onSelect={onLogout}
        >
          <LogOut className='size-4' />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
