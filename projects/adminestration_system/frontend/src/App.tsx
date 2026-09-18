import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from './features/auth/LoginPage'
import { RequireSession } from './features/auth/RequireSession'
import { StudentDocumentsPage } from './features/students/StudentDocumentsPage'
import { StudentsPage } from './features/students/StudentsPage'
import { AuthLayout } from './layouts/auth/AuthLayout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" replace />} />
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
      </Route>
      <Route element={<RequireSession />}>
        <Route path="/dashboard" element={<StudentsPage />} />
        <Route path="/students" element={<Navigate to="/dashboard" replace />} />
        <Route path="/students/:studentId/documents" element={<StudentDocumentsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  )
}

export default App
