import { BrandMark } from '../../components/ui'
import { LoginForm } from './LoginForm'
import './login.css'

export function LoginPage() {
  return (
    <section className="login-page" aria-labelledby="login-title">
      <header className="login-page__header">
        <BrandMark label="Admin OS" />
        <div className="login-page__intro">
          <p className="login-page__eyebrow">Workspace access</p>
          <h1 id="login-title">Welcome back</h1>
          <p>Sign in to continue to your administration workspace.</p>
        </div>
      </header>

      <LoginForm />

      <p className="login-page__footer">
        Need access? Contact your workspace administrator.
      </p>
    </section>
  )
}

export default LoginPage
