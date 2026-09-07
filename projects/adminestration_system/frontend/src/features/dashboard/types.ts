import type { IconName } from '../../components/ui'

export type TimeRange = '7d' | '30d' | '90d'

export type Metric = {
  id: string
  label: string
  value: string
  change: string
  trend: 'up' | 'down'
  detail: string
}

export type ActivityItem = {
  id: string
  actor: string
  initials: string
  action: string
  target: string
  time: string
  status: 'Completed' | 'Pending' | 'Review'
}

export type SystemService = {
  id: string
  name: string
  detail: string
  status: 'Operational' | 'Degraded'
  uptime: string
}

export type NavigationItem = {
  id: string
  label: string
  icon: IconName
  badge?: string
}
