import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, BrandMark, Button, Icon } from '../../components/ui'
import { clearSession } from '../../services/api/session'
import { ChangePasswordDialog } from '../auth/change-password/ChangePasswordDialog'
import { logout } from '../auth/services/authApi'
import './shell.css'

interface AppHeaderProps {
  context?: string
}

export function AppHeader({ context = 'Управление документами' }: AppHeaderProps) {
  const navigate = useNavigate()
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)

  async function signOut() {
    try {
      await logout()
    } catch {
      // Local session is still cleared if the service is unavailable.
    }
    clearSession()
    navigate('/auth/login', { replace: true })
  }

  return (
    <header className="app-header">
      <div className="app-header__brand">
        <BrandMark label="Администрирование" />
        <span className="app-header__context">{context}</span>
      </div>
      <nav className="app-header__nav" aria-label="Навигация по системе">
        <Link to="/dashboard"><Icon name="users" />Студенты</Link>
      </nav>
      <div className="app-header__account">
        <div><strong>Администратор</strong><span>Защищённый кабинет</span></div>
        <button className="app-header__avatar-button" type="button"
          onClick={() => setPasswordDialogOpen(true)} aria-label="Изменить пароль"
          title="Изменить пароль">
          <Avatar initials="АД" src="/atfitk-emblem.png" label="Эмблема администратора" />
        </button>
        <Button variant="ghost" size="icon" onClick={signOut} aria-label="Выйти">
          <Icon name="logout" />
        </Button>
      </div>
      {passwordDialogOpen && <ChangePasswordDialog onClose={() => setPasswordDialogOpen(false)} />}
    </header>
  )
}
