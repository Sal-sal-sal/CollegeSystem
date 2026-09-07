import type { ActivityItem, Metric, NavigationItem, SystemService, TimeRange } from './types'

export function getTodayLabel() {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date())
}

export const navigation: NavigationItem[] = [
  { id: 'overview', label: 'Overview', icon: 'overview' },
  { id: 'users', label: 'Users', icon: 'users' },
  { id: 'departments', label: 'Departments', icon: 'building' },
  { id: 'programs', label: 'Programs', icon: 'database' },
  { id: 'schedule', label: 'Schedule', icon: 'calendar', badge: '4' },
]

export const secondaryNavigation: NavigationItem[] = [
  { id: 'audit', label: 'Audit log', icon: 'activity' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
]

export const metricsByRange: Record<TimeRange, Metric[]> = {
  '7d': [
    { id: 'users', label: 'Active users', value: '2,847', change: '8.2%', trend: 'up', detail: 'vs. previous week' },
    { id: 'requests', label: 'Requests processed', value: '184.2k', change: '12.4%', trend: 'up', detail: 'across all services' },
    { id: 'response', label: 'Avg. response time', value: '128 ms', change: '4.1%', trend: 'down', detail: 'faster than last week' },
    { id: 'uptime', label: 'System uptime', value: '99.98%', change: '0.03%', trend: 'up', detail: 'last 7 days' },
  ],
  '30d': [
    { id: 'users', label: 'Active users', value: '8,491', change: '14.8%', trend: 'up', detail: 'vs. previous month' },
    { id: 'requests', label: 'Requests processed', value: '721.6k', change: '9.6%', trend: 'up', detail: 'across all services' },
    { id: 'response', label: 'Avg. response time', value: '134 ms', change: '2.7%', trend: 'down', detail: 'faster than last month' },
    { id: 'uptime', label: 'System uptime', value: '99.96%', change: '0.01%', trend: 'up', detail: 'last 30 days' },
  ],
  '90d': [
    { id: 'users', label: 'Active users', value: '12,204', change: '21.3%', trend: 'up', detail: 'vs. previous quarter' },
    { id: 'requests', label: 'Requests processed', value: '2.1m', change: '18.9%', trend: 'up', detail: 'across all services' },
    { id: 'response', label: 'Avg. response time', value: '141 ms', change: '7.2%', trend: 'down', detail: 'faster than last quarter' },
    { id: 'uptime', label: 'System uptime', value: '99.94%', change: '0.02%', trend: 'up', detail: 'last 90 days' },
  ],
}

export const activity: ActivityItem[] = [
  { id: 'evt-01', actor: 'Amina T.', initials: 'AT', action: 'approved access for', target: 'Finance workspace', time: '2 min ago', status: 'Completed' },
  { id: 'evt-02', actor: 'Daniyar K.', initials: 'DK', action: 'invited 12 users to', target: 'Academic Affairs', time: '18 min ago', status: 'Pending' },
  { id: 'evt-03', actor: 'System', initials: 'SY', action: 'completed a scheduled', target: 'Database backup', time: '41 min ago', status: 'Completed' },
  { id: 'evt-04', actor: 'Mira S.', initials: 'MS', action: 'updated permissions for', target: 'Student Services', time: '1 hr ago', status: 'Review' },
  { id: 'evt-05', actor: 'Arman B.', initials: 'AB', action: 'published the', target: 'Autumn timetable', time: '2 hrs ago', status: 'Completed' },
]

export const services: SystemService[] = [
  { id: 'api', name: 'Public API', detail: 'All regions', status: 'Operational', uptime: '99.99%' },
  { id: 'auth', name: 'Authentication', detail: 'Global', status: 'Operational', uptime: '100%' },
  { id: 'sync', name: 'Data sync', detail: 'Central Asia', status: 'Degraded', uptime: '99.72%' },
  { id: 'storage', name: 'File storage', detail: 'All regions', status: 'Operational', uptime: '99.98%' },
]
