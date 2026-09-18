import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Icon } from '../../components/ui'
import { saveSession } from '../../services/api/session'
import { login } from './services/authApi'

export function LoginForm() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity()
      return
    }

    const data = new FormData(event.currentTarget)
    setSubmitting(true)
    setError('')

    try {
      const response = await login(String(data.get('login')), String(data.get('password')))
      saveSession(response.access_token, response.expires_at)
      navigate('/dashboard')
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Не удалось войти.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-form__field">
        <label htmlFor="login-login">Логин</label>
        <div className="login-form__control">
          <Icon name="users" className="login-form__leading-icon" />
          <input
            id="login-login"
            name="login"
            type="text"
            autoComplete="username"
            placeholder="Введите логин"
            required
          />
        </div>
      </div>

      <div className="login-form__field">
        <label htmlFor="login-password">Пароль</label>
        <div className="login-form__control">
          <Icon name="lock" className="login-form__leading-icon" />
          <input
            id="login-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Введите пароль"
            minLength={8}
            required
          />
          <button
            className="login-form__visibility"
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
            aria-pressed={showPassword}
          >
            <Icon name={showPassword ? 'eyeOff' : 'eye'} className="size-4" />
          </button>
        </div>
      </div>

      {error && <p className="login-form__error" role="alert">{error}</p>}

      <Button variant="primary" size="md" type="submit" disabled={submitting}>
        {submitting ? 'Выполняется вход...' : 'Продолжить'}
        <Icon name="arrowRight" className="size-4" />
      </Button>
    </form>
  )
}
