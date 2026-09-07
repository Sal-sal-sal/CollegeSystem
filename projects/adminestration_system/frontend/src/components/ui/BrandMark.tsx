interface BrandMarkProps {
  label: string
  compact?: boolean
}

export function BrandMark({ label, compact = false }: BrandMarkProps) {
  return (
    <span className="ui-brand" aria-label={label}>
      <span className="ui-brand__mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M12 4 20 18H4L12 4Z" fill="currentColor" />
          <path d="M12 9.2 16.9 18H7.1L12 9.2Z" fill="var(--ui-brand-cutout)" />
        </svg>
      </span>
      <span className={compact ? 'ui-sr-only' : 'ui-brand__label'}>{label}</span>
    </span>
  )
}
