import { Icon } from '../../components/ui'

const signals = [
  { label: 'Профиль', value: 'Подтверждён' },
  { label: 'Режим', value: 'Рабочий' },
  { label: 'Сеанс', value: 'Зашифрован' },
]

export function AuthSignal() {
  return (
    <div className="auth-signal" aria-label="Статус доступа к системе">
      <div className="auth-signal__head">
        <span><Icon name="activity" /> Протокол доступа</span>
        <span className="auth-signal__live">Активен</span>
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
