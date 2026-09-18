import { authorizedRequest, expectJson } from '../../../services/api/client'
import type { Student, StudentDraft } from '../types'

interface StudentResponse {
  id: string
  student_number: string
  full_name: string
  group: string
  status: 'active' | 'archived'
  created_at: string
  updated_at: string
  document_count: number
  active_document_count: number
}

function toStudent(value: StudentResponse): Student {
  return {
    id: value.id,
    studentNumber: value.student_number,
    fullName: value.full_name,
    group: value.group,
    status: value.status,
    createdAt: value.created_at,
    updatedAt: value.updated_at,
    documentCount: value.document_count,
    activeDocumentCount: value.active_document_count,
  }
}

function studentBody(draft: StudentDraft) {
  return JSON.stringify({
    student_number: draft.studentNumber,
    full_name: draft.fullName,
    group: draft.group,
  })
}

export async function getStudents() {
  const response = await authorizedRequest('/api/students')
  const body = await expectJson<{ students: StudentResponse[] }>(response)
  return body.students.map(toStudent)
}

export async function getStudent(studentId: string) {
  const response = await authorizedRequest(`/api/students/${encodeURIComponent(studentId)}`)
  return toStudent(await expectJson<StudentResponse>(response))
}

export async function createStudent(draft: StudentDraft) {
  const response = await authorizedRequest('/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: studentBody(draft),
  })
  return toStudent(await expectJson<StudentResponse>(response))
}

export async function updateStudent(studentId: string, draft: StudentDraft) {
  const response = await authorizedRequest(`/api/students/${encodeURIComponent(studentId)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: studentBody(draft),
  })
  return toStudent(await expectJson<StudentResponse>(response))
}

export async function archiveStudent(studentId: string) {
  const response = await authorizedRequest(
    `/api/students/${encodeURIComponent(studentId)}/archive`,
    { method: 'PATCH' },
  )
  return toStudent(await expectJson<StudentResponse>(response))
}
