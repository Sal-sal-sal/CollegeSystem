export interface Student {
  id: string
  studentNumber: string
  fullName: string
  group: string
  createdAt: string
  updatedAt: string
  status: 'active' | 'archived'
  documentCount: number
  activeDocumentCount: number
}

export interface StudentDraft {
  studentNumber: string
  fullName: string
  group: string
}
