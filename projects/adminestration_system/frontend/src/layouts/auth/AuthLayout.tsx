import { Outlet } from 'react-router-dom'
import { BrandMark } from '../../components/ui'
import { AuthBlob } from './AuthBlob'
import { AuthSignal } from './AuthSignal'
import './auth-layout.css'

export function AuthLayout() {
  return (
    <main className="auth-shell">
      <section className="auth-stage" aria-label="Administration platform">
        <AuthBlob />
        <div className="auth-stage__grid" aria-hidden="true" />
        <div className="auth-stage__content">
          <BrandMark label="Admin OS" />
          <div className="auth-stage__message">
            <p>CONTROL PLANE / 01</p>
            <h1>One place to run your entire operation.</h1>
            <span>People, access, reports and system health stay in one precise view.</span>
          </div>
          <AuthSignal />
        </div>
      </section>
      <section className="auth-panel">
        <div className="auth-panel__meta">
          <span>ADMINISTRATION SYSTEM</span>
          <span>SECURE ACCESS</span>
        </div>
        <div className="auth-panel__content">
          <Outlet />
        </div>
        <p className="auth-panel__footer">Protected by encrypted session controls.</p>
      </section>
    </main>
  )
}
