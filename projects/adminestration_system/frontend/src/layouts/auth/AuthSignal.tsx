import { Icon } from '../../components/ui'

const signals = [
  { label: 'Identity', value: 'Verified' },
  { label: 'Workspace', value: 'Operations' },
  { label: 'Session', value: 'Encrypted' },
]

export function AuthSignal() {
  return (
    <div className="auth-signal" aria-label="System access status">
      <div className="auth-signal__head">
        <span><Icon name="activity" /> Access protocol</span>
        <span className="auth-signal__live">Live</span>
      </div>
      <div className="auth-signal__rows">
        {signals.map((signal) => (
          <div className="auth-signal__row" key={signal.label}>
            <span>{signal.label}</span>
            <strong>{signal.value}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}
