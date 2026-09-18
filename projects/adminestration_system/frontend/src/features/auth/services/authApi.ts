import { apiRequest, authorizedRequest, expectJson } from '../../../services/api/client'

interface LoginResponse {
  access_token: string
  expires_at: string
}

export async function login(login: string, password: string) {
  const response = await apiRequest('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password }),
  })

  return expectJson<LoginResponse>(response)
}

export async function getCurrentSession() {
  const response = await authorizedRequest('/api/auth/session')
  return expectJson<{ login: string }>(response)
}

export async function logout() {
  await authorizedRequest('/api/auth/logout', { method: 'POST' })
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
  confirmPassword: string,
) {
  const response = await authorizedRequest('/api/auth/password', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      current_password: currentPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    }),
  })
  if (!response.ok) await expectJson<never>(response)
}
