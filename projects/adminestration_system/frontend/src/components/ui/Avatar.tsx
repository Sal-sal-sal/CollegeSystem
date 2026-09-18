import type { HTMLAttributes } from 'react'

type AvatarSize = 'sm' | 'md'

interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  initials: string
  size?: AvatarSize
  label?: string
  src?: string
}

export function Avatar({ initials, size = 'md', label, src, className = '', ...props }: AvatarProps) {
  const accessibleProps = label
    ? { role: 'img', 'aria-label': label }
    : { 'aria-hidden': true }

  return (
    <span
      className={`ui-avatar ui-avatar--${size} ${className}`.trim()}
      {...accessibleProps}
      {...props}
    >
      {src ? <img src={src} alt="" /> : initials.slice(0, 2).toUpperCase()}
    </span>
  )
}
