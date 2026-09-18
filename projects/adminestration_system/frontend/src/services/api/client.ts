import { clearSession, requireAccessToken } from './session'

const DEFAULT_API_BASE_URL = import.meta.env.DEV ? 'http://127.0.0.1:3100' : ''

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL
).replace(/\/$/, '')

export class ApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function responseMessage(response: Response) {
  try {
    const body = (await response.json()) as { error?: string; message?: string }
    return body.message || body.error
  } catch {
    return undefined
  }
}

export async function expectJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const message = await responseMessage(response)
    throw new ApiError(message || `Запрос завершился ошибкой (${response.status})`, response.status)
  }

  return response.json() as Promise<T>
}

export function resolveApiUrl(url: string) {
  if (/^https?:\/\//i.test(url)) return url
  return `${API_BASE_URL}${url.startsWith('/') ? url : `/${url}`}`
}

export async function apiRequest(path: string, init?: RequestInit) {
  try {
    return await fetch(resolveApiUrl(path), init)
  } catch {
    const serviceAddress = API_BASE_URL || 'текущего домена'
    throw new ApiError(`Не удалось подключиться к сервису по адресу ${serviceAddress}.`, 0)
  }
}

export async function authorizedRequest(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers)
  headers.set('Authorization', `Bearer ${requireAccessToken()}`)
  const response = await apiRequest(path, { ...init, headers })
  if (response.status === 401) clearSession()
  return response
}
