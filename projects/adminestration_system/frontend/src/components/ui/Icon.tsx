import type { ReactNode, SVGProps } from 'react'

export type IconName =
  | 'overview'
  | 'users'
  | 'building'
  | 'calendar'
  | 'settings'
  | 'search'
  | 'bell'
  | 'arrowRight'
  | 'arrow-right'
  | 'arrow-up-right'
  | 'eye'
  | 'eyeOff'
  | 'eye-off'
  | 'alert-triangle'
  | 'check'
  | 'lock'
  | 'mail'
  | 'activity'
  | 'chevronDown'
  | 'chevron-down'
  | 'chevrons-up-down'
  | 'menu'
  | 'close'
  | 'x'
  | 'plus'
  | 'command'
  | 'database'
  | 'shield'
  | 'more-horizontal'

interface IconProps {
  name: IconName
  className?: string
}

const arrowRight = <><path d="M5 12h14M13 6l6 6-6 6" /></>
const eyeOff = <><path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.7 10.7 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-2.1 3M6.6 6.6C3.5 8.4 2 12 2 12s3.5 7 10 7a10 10 0 0 0 4.1-.9" /></>
const close = <path d="m6 6 12 12M18 6 6 18" />
const chevronDown = <path d="m6 9 6 6 6-6" />

const paths: Record<IconName, ReactNode> = {
  overview: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  building: <><path d="M3 21h18M5 21V5l7-3 7 3v16" /><path d="M9 9h1M14 9h1M9 13h1M14 13h1M10 21v-4h4v4" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21H9.6v-.09A1.7 1.7 0 0 0 8.5 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.51-1H3v-4h.09A1.7 1.7 0 0 0 4.6 8.5a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.51V3h4v.09A1.7 1.7 0 0 0 15.5 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.12.36.33.7.6 1 .3.28.68.44 1.09.49H21v4h-.09A1.7 1.7 0 0 0 19.4 15Z" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
  arrowRight,
  'arrow-right': arrowRight,
  'arrow-up-right': <path d="M7 17 17 7M7 7h10v10" />,
  eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
  eyeOff,
  'eye-off': eyeOff,
  'alert-triangle': <path d="M10.3 3.6 2.2 18a2 2 0 0 0 1.8 3h16a2 2 0 0 0 1.8-3L13.7 3.6a2 2 0 0 0-3.4 0ZM12 9v4M12 17h.01" />,
  check: <path d="m5 12 4 4L19 6" />,
  lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  activity: <path d="M3 12h4l2.5-7 5 14 2.5-7h4" />,
  chevronDown,
  'chevron-down': chevronDown,
  'chevrons-up-down': <path d="m7 15 5 5 5-5M17 9l-5-5-5 5" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close,
  x: close,
  plus: <path d="M12 5v14M5 12h14" />,
  command: <path d="M9 6V5a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v14a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6Z" />,
  database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" /></>,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10ZM9 12l2 2 4-4" />,
  'more-horizontal': <><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" /></>,
}

export function Icon({ name, className = '' }: IconProps) {
  const svgProps: SVGProps<SVGSVGElement> = {
    className: `ui-icon ${className}`.trim(),
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    focusable: false,
  }

  return <svg {...svgProps}>{paths[name]}</svg>
}
