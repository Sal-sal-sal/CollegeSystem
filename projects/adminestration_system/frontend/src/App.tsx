import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from './features/auth/LoginPage'
import DashboardPage from './features/dashboard/DashboardPage'
import { AuthLayout } from './layouts/auth/AuthLayout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" replace />} />
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
      </Route>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  )
}

export default App
