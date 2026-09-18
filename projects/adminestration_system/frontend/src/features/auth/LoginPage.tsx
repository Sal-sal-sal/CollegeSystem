import { BrandMark } from '../../components/ui'
import { LoginForm } from './LoginForm'
import './login.css'

export function LoginPage() {
  return (
    <section className="login-page" aria-labelledby="login-title">
      <header className="login-page__header">
        <BrandMark label="Панель администратора" />
        <div className="login-page__intro">
          <p className="login-page__eyebrow">Доступ к рабочему пространству</p>
          <h1 id="login-title">С возвращением</h1>
          <p>Войдите, чтобы продолжить работу в панели администратора.</p>
        </div>
      </header>

      <LoginForm />

      <p className="login-page__footer">
        Нужен доступ? Обратитесь к администратору рабочего пространства.
      </p>
    </section>
  )
}

export default LoginPage
