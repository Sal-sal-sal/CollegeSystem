import { useEffect, useState } from 'react'
import { AttentionPanel } from './AttentionPanel'
import { ActivityTable } from './ActivityTable'
import { MetricsGrid } from './MetricsGrid'
import { Sidebar } from './Sidebar'
import { SystemStatus } from './SystemStatus'
import { TopBar } from './TopBar'
import { getTodayLabel, metricsByRange } from '../data'
import type { TimeRange } from '../types'

const ranges: { id: TimeRange; label: string }[] = [
  { id: '7d', label: '7 days' },
  { id: '30d', label: '30 days' },
  { id: '90d', label: '90 days' },
]

export function DashboardShell() {
  const [activeItem, setActiveItem] = useState('overview')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [range, setRange] = useState<TimeRange>('7d')
  const [showAttention, setShowAttention] = useState(true)
  const todayLabel = getTodayLabel()

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const handleNavigate = (item: string) => {
    setActiveItem(item)
    setMobileOpen(false)
  }

  return (
    <div className="dashboard-page">
      <Sidebar activeItem={activeItem} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} onNavigate={handleNavigate} />
      <div className="dashboard-main">
        <TopBar onOpenNavigation={() => setMobileOpen(true)} />
        <main className="dashboard-content">
          <section className="dashboard-intro">
            <div>
              <span className="dashboard-eyebrow">{todayLabel}</span>
              <h2>Good morning, Saladin.</h2>
              <p>Here is what is happening across your organization today.</p>
            </div>
            <div aria-label="Metric period" className="dashboard-range">
              {ranges.map((item) => (
                <button data-active={range === item.id} key={item.id} onClick={() => setRange(item.id)} type="button">
                  {item.label}
                </button>
              ))}
            </div>
          </section>

          <MetricsGrid metrics={metricsByRange[range]} />
          {showAttention && <AttentionPanel onDismiss={() => setShowAttention(false)} />}

          <div className="dashboard-grid">
            <ActivityTable />
            <SystemStatus />
          </div>
        </main>
      </div>
    </div>
  )
}
