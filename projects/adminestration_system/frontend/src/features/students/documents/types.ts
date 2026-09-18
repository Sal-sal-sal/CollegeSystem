export interface DocumentRecord {
  id: string
  title: string
  student_id: string
  student_name: string
  student_number: string
  original_filename: string
  media_type: 'pdf' | 'image'
  content_type: 'application/pdf' | 'image/png'
  created_at: string
  status: string
  verification_url: string
  download_url: string
  sha256: string
}

export interface DocumentUpload {
  file: File
  title: string
  studentId: string
  studentName: string
  studentNumber: string
}
