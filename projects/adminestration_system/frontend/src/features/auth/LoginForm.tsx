import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Icon } from '../../components/ui'

export function LoginForm() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity()
      return
    }

    navigate('/dashboard')
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-form__field">
        <label htmlFor="login-email">Email</label>
        <div className="login-form__control">
          <Icon name="mail" className="login-form__leading-icon" />
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@company.com"
            required
          />
        </div>
      </div>

      <div className="login-form__field">
        <label htmlFor="login-password">Password</label>
        <div className="login-form__control">
          <Icon name="lock" className="login-form__leading-icon" />
          <input
            id="login-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Enter your password"
            minLength={8}
            required
          />
          <button
            className="login-form__visibility"
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
          >
            <Icon name={showPassword ? 'eyeOff' : 'eye'} className="size-4" />
          </button>
        </div>
      </div>

      <label className="login-form__remember">
        <input name="remember" type="checkbox" />
        <span>Keep me signed in</span>
      </label>

      <Button variant="primary" size="md" type="submit">
        Continue
        <Icon name="arrowRight" className="size-4" />
      </Button>
    </form>
  )
}
