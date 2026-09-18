import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Icon } from '../../components/ui'
import { AppHeader } from '../shell/AppHeader'
import { DocumentList } from './documents/DocumentList'
import { DocumentRevokeDialog } from './documents/DocumentRevokeDialog'
import { DocumentUploadForm } from './documents/DocumentUploadForm'
import type { DocumentRecord } from './documents/types'
import { useDocumentRecords } from './documents/useDocumentRecords'
import { useStudent } from './hooks/useStudent'
import './students.css'
import './documents/documents.css'

function DocumentsContent({ studentId }: { studentId: string }) {
  const studentRecord = useStudent(studentId)
  const student = studentRecord.student
  const records = useDocumentRecords(studentId)
  const [revoking, setRevoking] = useState<DocumentRecord | null>(null)

  return (
    <div className="documents-page">
      <AppHeader context="Безопасный доступ к документам" />
      <main className="documents-main">
        <Link className="documents-back" to="/dashboard"><Icon name="arrow-left" />Назад к студентам</Link>
        <section className="documents-identity">
          <span className="students-eyebrow">Документы студента</span>
          <h1>{student?.fullName || records.documents[0]?.student_name || 'Запись студента'}</h1>
          <p>{student?.studentNumber || records.documents[0]?.student_number || studentId}{student?.group ? ` · Группа ${student.group}` : ''}</p>
        </section>
        {studentRecord.loading && <p className="documents-page-state">Загрузка данных студента...</p>}
        {studentRecord.error && <p className="documents-page-state documents-page-state--error">{studentRecord.error}</p>}
        {student && <DocumentUploadForm student={student} onUpload={records.createDocument} />}
        <DocumentList {...records} onReload={() => void records.reload()} onRevoke={setRevoking} />
        <p className="documents-footnote">Каждый PDF-файл или снимок получает отдельную запись проверки по QR-коду.</p>
      </main>
      {revoking && <DocumentRevokeDialog document={revoking} onClose={() => setRevoking(null)}
        onRevoke={async (reason) => {
          await records.revoke(revoking.id, reason)
          setRevoking(null)
        }} />}
    </div>
  )
}

export function StudentDocumentsPage() {
  const { studentId } = useParams()
  if (!studentId) return <Navigate to="/auth/login" replace />
  return <DocumentsContent studentId={studentId} />
}
