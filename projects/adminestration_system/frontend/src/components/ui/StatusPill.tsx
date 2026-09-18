import type { HTMLAttributes } from 'react'

type StatusTone = 'success' | 'warning' | 'neutral' | 'info' | 'danger'

interface StatusPillProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: StatusTone
}

export function StatusPill({ tone = 'neutral', className = '', ...props }: StatusPillProps) {
  return (
    <span
      className={`ui-status ui-status--${tone} ${className}`.trim()}
      {...props}
    />
  )
}
