import { Outlet } from 'react-router-dom'
import { BrandMark } from '../../components/ui'
import { AuthBlob } from './AuthBlob'
import { AuthSignal } from './AuthSignal'
import './auth-layout.css'

export function AuthLayout() {
  return (
    <main className="auth-shell">
      <section className="auth-stage" aria-label="Административная платформа">
        <AuthBlob />
        <div className="auth-stage__grid" aria-hidden="true" />
        <div className="auth-stage__content">
          <BrandMark label="Панель администратора" />
          <div className="auth-stage__message">
            <p>ЦЕНТР УПРАВЛЕНИЯ / 01</p>
            <h1>Одно место для управления всей системой.</h1>
            <span>Пользователи, доступ, отчёты и состояние системы собраны в одном точном представлении.</span>
          </div>
          <AuthSignal />
        </div>
      </section>
      <section className="auth-panel">
        <div className="auth-panel__meta">
          <span>АДМИНИСТРАТИВНАЯ СИСТЕМА</span>
          <span>ЗАЩИЩЁННЫЙ ДОСТУП</span>
        </div>
        <div className="auth-panel__content">
          <Outlet />
        </div>
        <p className="auth-panel__footer">Защищено шифрованием и контролем сессий.</p>
      </section>
    </main>
  )
}
