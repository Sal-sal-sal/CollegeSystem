import { authorizedRequest, expectJson } from '../../../services/api/client'
import type { DocumentRecord, DocumentUpload } from './types'

export async function getStudentDocuments(studentId: string) {
  const response = await authorizedRequest(`/api/students/${encodeURIComponent(studentId)}/documents`)
  return expectJson<{ documents: DocumentRecord[] }>(response)
}

export async function uploadDocument(upload: DocumentUpload) {
  const body = new FormData()
  body.append('file', upload.file)
  body.append('title', upload.title)
  body.append('student_id', upload.studentId)
  body.append('student_name', upload.studentName)
  body.append('student_number', upload.studentNumber)

  const response = await authorizedRequest('/api/documents', {
    method: 'POST',
    body,
  })
  return expectJson<DocumentRecord>(response)
}

export async function revokeDocument(documentId: string, reason: string) {
  const response = await authorizedRequest(`/api/documents/${encodeURIComponent(documentId)}/revoke`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reason }),
  })
  return expectJson<DocumentRecord>(response)
}
