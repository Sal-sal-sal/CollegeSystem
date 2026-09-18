interface BrandMarkProps {
  label: string
  compact?: boolean
}

export function BrandMark({ label, compact = false }: BrandMarkProps) {
  return (
    <span className="ui-brand" aria-label={label}>
      <span className="ui-brand__mark" aria-hidden="true">
        <img src="/atfitk-emblem.png" alt="" />
      </span>
      <span className={compact ? 'ui-sr-only' : 'ui-brand__label'}>{label}</span>
    </span>
  )
}
