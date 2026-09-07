import { useState } from 'react'
import { Avatar, Button, Icon } from '../../../components/ui'

type TopBarProps = {
  onOpenNavigation: () => void
}

export function TopBar({ onOpenNavigation }: TopBarProps) {
  const [profileOpen, setProfileOpen] = useState(false)
  const [query, setQuery] = useState('')

  return (
    <header className="dashboard-topbar">
      <div className="dashboard-topbar-left">
        <Button aria-label="Open navigation" className="dashboard-icon-button lg:hidden" onClick={onOpenNavigation} size="sm" variant="ghost">
          <Icon className="size-4" name="menu" />
        </Button>
        <div>
          <span className="dashboard-breadcrumb">Administration / Overview</span>
          <h1>Overview</h1>
        </div>
      </div>

      <div className="dashboard-topbar-actions">
        <label className="dashboard-search">
          <Icon className="size-4" name="search" />
          <span className="sr-only">Search dashboard</span>
          <input onChange={(event) => setQuery(event.target.value)} placeholder="Search" value={query} />
          <kbd>⌘ K</kbd>
        </label>
        <Button aria-label="Notifications" className="dashboard-icon-button" size="sm" variant="ghost">
          <Icon className="size-4" name="bell" />
          <span className="dashboard-notification-dot" />
        </Button>
        <div className="dashboard-profile">
          <button aria-expanded={profileOpen} className="dashboard-profile-button" onClick={() => setProfileOpen((open) => !open)} type="button">
            <Avatar initials="SA" size="sm" />
            <span>Saladin</span>
            <Icon className="size-3.5 text-zinc-500" name="chevronDown" />
          </button>
          {profileOpen && (
            <div className="dashboard-profile-menu">
              <strong>Saladin Admin</strong>
              <span>saladin@example.com</span>
              <button onClick={() => setProfileOpen(false)} type="button">Account settings</button>
              <button onClick={() => setProfileOpen(false)} type="button">Sign out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
