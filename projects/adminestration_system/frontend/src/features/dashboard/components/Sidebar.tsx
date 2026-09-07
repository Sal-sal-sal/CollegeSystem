import { BrandMark, Icon } from '../../../components/ui'
import { navigation, secondaryNavigation } from '../data'

type SidebarProps = {
  activeItem: string
  mobileOpen: boolean
  onNavigate: (item: string) => void
  onClose: () => void
}

export function Sidebar({ activeItem, mobileOpen, onNavigate, onClose }: SidebarProps) {
  const renderNavigation = (items: typeof navigation) => items.map((item) => (
    <button
      className="dashboard-nav-item"
      data-active={activeItem === item.id}
      key={item.id}
      onClick={() => onNavigate(item.id)}
      type="button"
    >
      <Icon className="size-4" name={item.icon} />
      <span>{item.label}</span>
      {item.badge && <span className="dashboard-nav-badge">{item.badge}</span>}
    </button>
  ))

  return (
    <>
      <button
        aria-label="Close navigation"
        className="dashboard-sidebar-backdrop"
        data-open={mobileOpen}
        onClick={onClose}
        type="button"
      />
      <aside className="dashboard-sidebar" data-open={mobileOpen}>
        <div className="dashboard-sidebar-brand">
          <BrandMark label="Admin OS" />
          <button aria-label="Close navigation" className="dashboard-mobile-close" onClick={onClose} type="button">
            <Icon className="size-4" name="close" />
          </button>
        </div>

        <div className="dashboard-workspace">
          <div className="dashboard-workspace-mark">AS</div>
          <div>
            <strong>Administration</strong>
            <span>Production</span>
          </div>
          <Icon className="ml-auto size-3.5 text-zinc-500" name="chevronDown" />
        </div>

        <nav aria-label="Primary navigation" className="dashboard-nav">
          <span className="dashboard-nav-label">Workspace</span>
          {renderNavigation(navigation)}
        </nav>

        <nav aria-label="Secondary navigation" className="dashboard-nav dashboard-nav-secondary">
          {renderNavigation(secondaryNavigation)}
        </nav>

        <div className="dashboard-sidebar-footer">
          <span className="dashboard-live-dot" />
          <div>
            <strong>All systems normal</strong>
            <span>Last checked just now</span>
          </div>
        </div>
      </aside>
    </>
  )
}
