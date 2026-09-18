const ACCESS_TOKEN_KEY = 'administration.access_token'
const TOKEN_EXPIRY_KEY = 'administration.access_token_expires_at'

export function getAccessToken() {
  const expiresAt = window.sessionStorage.getItem(TOKEN_EXPIRY_KEY)
  if (!expiresAt || Date.parse(expiresAt) <= Date.now()) {
    clearSession()
    return null
  }
  return window.sessionStorage.getItem(ACCESS_TOKEN_KEY)
}

export function saveSession(accessToken: string, expiresAt: string) {
  window.sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  window.sessionStorage.setItem(TOKEN_EXPIRY_KEY, expiresAt)
}

export function clearSession() {
  window.sessionStorage.removeItem(ACCESS_TOKEN_KEY)
  window.sessionStorage.removeItem(TOKEN_EXPIRY_KEY)
}

export function hasSession() {
  return Boolean(getAccessToken())
}

export function requireAccessToken() {
  const token = getAccessToken()
  if (!token) throw new Error('Сеанс завершён. Войдите снова, чтобы продолжить.')
  return token
}
