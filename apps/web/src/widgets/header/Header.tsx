import React from 'react'
import { ProjectSelect } from './ui/ProjectSelect'
import { ProjectSearch } from './ui/ProjectSearch'
import { ProjectSectionNav } from './ui/ProjectSectionNav'
import { QuickAddIssueButton } from './ui/QuickAddIssueButton'
import { UserMenu } from './ui/UserMenu'
import { SettingsMenu } from './ui/SettingsMenu'
import { mockProjects, mockUser, type Project } from './model/mock'

export const Header: React.FC = () => {
  const [project, setProject] = React.useState<Project | null>(null)
  const [search, setSearch] = React.useState('')
  const [section, setSection] = React.useState<string | null>('dev')

  const handleSectionChange = (key: string) => {
    if (key === section) {
      setSection(null)
    } else {
      setSection(key)
    }
  }

  return (
    <header className='flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
      <div className='flex w-full items-center justify-between gap-4 px-4'>
        {/* LEFT */}
        <div className='flex min-w-0 items-center gap-4'>
          <ProjectSelect
            value={project}
            onChange={setProject}
            options={mockProjects}
          />
          <ProjectSectionNav
            active={section}
            onChange={handleSectionChange}
            options={[
              { key: 'dev', label: 'Development' },
              { key: 'analysis', label: 'Analysis' },
              { key: 'design', label: 'Design' },
              { key: 'qa', label: 'QA' },
              { key: 'docs', label: 'Docs' },
            ]}
          />
        </div>

        {/* RIGHT */}
        <div className='flex items-center gap-2'>
          <ProjectSearch
            value={search}
            onChange={setSearch}
          />
          <QuickAddIssueButton />
          <UserMenu user={mockUser} />
          <SettingsMenu
            items={[
              { key: 'main', label: 'Общие' },
              { key: 'project', label: 'Проект' },
            ]}
          />
        </div>
      </div>
    </header>
  )
}
