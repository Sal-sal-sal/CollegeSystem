export function getStudentDocumentsUrl(studentId: string) {
  const configuredOrigin = import.meta.env.VITE_PUBLIC_APP_URL?.replace(/\/$/, '')
  const origin = configuredOrigin || window.location.origin

  return `${origin}/students/${encodeURIComponent(studentId)}/documents`
}
