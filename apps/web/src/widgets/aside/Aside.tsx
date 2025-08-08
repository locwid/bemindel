import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Layers2,
  ListTree,
  Settings2,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/shared/ui/kit/Sidebar'
import { ProjectNavigation } from './ProjectNavigation'
import { ProjectSwitcher } from './ProjectSwitch'
import { UserNavigation } from './UserNavigation'

const data = {
  projects: [
    {
      name: 'Project #1',
      logo: GalleryVerticalEnd,
      code: 'PRJ1',
    },
    {
      name: 'Project #2',
      logo: AudioWaveform,
      code: 'PRJ2',
    },
    {
      name: 'Project #3',
      logo: Command,
      code: 'PRJ3',
    },
  ],
  navigation: [
    {
      title: 'Issues',
      url: '#',
      icon: ListTree,
      items: [
        {
          title: "I'm assigned",
          url: '#',
        },
        {
          title: "I'm paticipating",
          url: '#',
        },
        {
          title: 'Starred',
          url: '#',
        },
        {
          title: 'All',
          url: '#',
        },
      ],
    },
    {
      title: 'Scopes',
      url: '#',
      icon: Layers2,
      items: [
        {
          title: 'Analysis',
          url: '#',
        },
        {
          title: 'Development',
          url: '#',
        },
        {
          title: 'Design',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
      ],
    },
  ],
}

export const Aside = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar
      collapsible='offcanvas'
      {...props}
    >
      <SidebarHeader>
        <ProjectSwitcher projects={data.projects} />
      </SidebarHeader>
      <SidebarContent>
        <ProjectNavigation items={data.navigation} />
      </SidebarContent>
      <SidebarFooter>
        <UserNavigation />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
