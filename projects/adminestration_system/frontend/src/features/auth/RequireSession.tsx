import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { clearSession, hasSession } from '../../services/api/session'
import { getCurrentSession } from './services/authApi'

type SessionState = 'checking' | 'valid' | 'invalid'

export function RequireSession() {
  const location = useLocation()
  const [state, setState] = useState<SessionState>(() => hasSession() ? 'checking' : 'invalid')

  useEffect(() => {
    if (!hasSession()) return
    let active = true
    getCurrentSession()
      .then(() => active && setState('valid'))
      .catch(() => {
        clearSession()
        if (active) setState('invalid')
      })
    return () => { active = false }
  }, [])

  if (state === 'checking') {
    return <div className="app-loading" role="status">Проверяем защищённый сеанс...</div>
  }
  if (state === 'invalid') {
    return <Navigate to="/auth/login" replace state={{ from: location.pathname }} />
  }
  return <Outlet />
}
