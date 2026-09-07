import { Button, Icon } from '../../../components/ui'

type AttentionPanelProps = {
  onDismiss: () => void
}

export function AttentionPanel({ onDismiss }: AttentionPanelProps) {
  return (
    <aside className="dashboard-attention">
      <div className="dashboard-attention-icon">
        <Icon className="size-4" name="activity" />
      </div>
      <div className="dashboard-attention-copy">
        <span>Needs attention</span>
        <h2>3 access reviews expire this week</h2>
        <p>Review temporary permissions before they are automatically revoked.</p>
      </div>
      <Button size="sm" variant="secondary">Review access</Button>
      <button aria-label="Dismiss attention notice" className="dashboard-attention-close" onClick={onDismiss} type="button">
        <Icon className="size-4" name="close" />
      </button>
    </aside>
  )
}
