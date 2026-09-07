import type { HTMLAttributes } from 'react'

type AvatarSize = 'sm' | 'md'

interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  initials: string
  size?: AvatarSize
  label?: string
}

export function Avatar({ initials, size = 'md', label, className = '', ...props }: AvatarProps) {
  const accessibleProps = label
    ? { role: 'img', 'aria-label': label }
    : { 'aria-hidden': true }

  return (
    <span
      className={`ui-avatar ui-avatar--${size} ${className}`.trim()}
      {...accessibleProps}
      {...props}
    >
      {initials.slice(0, 2).toUpperCase()}
    </span>
  )
}
