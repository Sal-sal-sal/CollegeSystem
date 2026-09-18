import { useEffect, useState, type FormEvent } from 'react'
import { Button, Icon } from '../../../components/ui'
import { changePassword } from '../services/authApi'
import './change-password.css'

interface ChangePasswordDialogProps {
  onClose: () => void
}

type PasswordFieldName = 'currentPassword' | 'newPassword' | 'confirmPassword'

interface PasswordFieldProps {
  label: string
  name: PasswordFieldName
  autoComplete: string
  visible: boolean
  autoFocus?: boolean
  onToggle: () => void
}

function PasswordField({
  label,
  name,
  autoComplete,
  visible,
  autoFocus,
  onToggle,
}: PasswordFieldProps) {
  return (
    <label className="password-dialog__field">
      <span>{label}</span>
      <div className="password-dialog__input-wrap">
        <input
          name={name}
          type={visible ? 'text' : 'password'}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          minLength={name === 'currentPassword' ? undefined : 12}
          maxLength={name === 'currentPassword' ? 1024 : 128}
          required
        />
        <button
          type="button"
          onClick={onToggle}
          aria-label={`${visible ? 'Скрыть' : 'Показать'} поле «${label.toLowerCase()}»`}
        >
          <Icon name={visible ? 'eyeOff' : 'eye'} />
        </button>
      </div>
    </label>
  )
}

export function ChangePasswordDialog({ onClose }: ChangePasswordDialogProps) {
  const [visibleField, setVisibleField] = useState<PasswordFieldName | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !submitting) onClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose, submitting])

  function toggleVisibility(field: PasswordFieldName) {
    setVisibleField((current) => current === field ? null : field)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const currentPassword = String(data.get('currentPassword'))
    const newPassword = String(data.get('newPassword'))
    const confirmPassword = String(data.get('confirmPassword'))

    if (newPassword !== confirmPassword) {
      setError('Новые пароли не совпадают.')
      return
    }

    setSubmitting(true)
    setError('')
    try {
      await changePassword(currentPassword, newPassword, confirmPassword)
      setCompleted(true)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Не удалось изменить пароль.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="password-dialog__backdrop" onMouseDown={() => !submitting && onClose()}>
      <section
        className="password-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="change-password-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="password-dialog__header">
          <div>
            <span>Безопасность аккаунта</span>
            <h2 id="change-password-title">Изменение пароля</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} disabled={submitting} aria-label="Закрыть окно">
            <Icon name="close" />
          </Button>
        </header>

        {completed ? (
          <div className="password-dialog__success">
            <span><Icon name="check" /></span>
            <h3>Пароль обновлён</h3>
            <p>Новый пароль уже действует. Остальные сеансы администратора завершены.</p>
            <Button onClick={onClose}>Готово</Button>
          </div>
        ) : (
          <form className="password-dialog__form" onSubmit={handleSubmit}>
            <PasswordField label="Текущий пароль" name="currentPassword" autoComplete="current-password"
              visible={visibleField === 'currentPassword'} autoFocus onToggle={() => toggleVisibility('currentPassword')} />
            <PasswordField label="Новый пароль" name="newPassword" autoComplete="new-password"
              visible={visibleField === 'newPassword'} onToggle={() => toggleVisibility('newPassword')} />
            <PasswordField label="Повторите новый пароль" name="confirmPassword" autoComplete="new-password"
              visible={visibleField === 'confirmPassword'} onToggle={() => toggleVisibility('confirmPassword')} />
            <p className="password-dialog__note">Используйте от 12 до 128 символов. Не повторяйте пароль от других сервисов.</p>
            {error && <p className="password-dialog__error" role="alert">{error}</p>}
            <footer className="password-dialog__actions">
              <Button variant="secondary" onClick={onClose} disabled={submitting}>Отмена</Button>
              <Button type="submit" disabled={submitting}>
                <Icon name="lock" />
                {submitting ? 'Обновление...' : 'Обновить пароль'}
              </Button>
            </footer>
          </form>
        )}
      </section>
    </div>
  )
}
