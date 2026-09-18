import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Icon } from '../../../components/ui'
import { AppHeader } from '../../shell/AppHeader'
import { useStudents } from '../hooks/useStudents'
import type { Student } from '../types'
import { StudentQrDialog } from '../qr/StudentQrDialog'
import { StudentCreateDialog } from './StudentCreateDialog'
import { StudentArchiveDialog } from './StudentArchiveDialog'
import { StudentTable } from './StudentTable'
import { StudentsSummary } from './StudentsSummary'

function studentCountLabel(count: number) {
  const remainder100 = count % 100
  const remainder10 = count % 10
  if (remainder100 >= 11 && remainder100 <= 14) return `${count} активных студентов`
  if (remainder10 === 1) return `${count} активный студент`
  if (remainder10 >= 2 && remainder10 <= 4) return `${count} активных студента`
  return `${count} активных студентов`
}

export function StudentsWorkspace() {
  const navigate = useNavigate()
  const records = useStudents()
  const { students } = records
  const [query, setQuery] = useState('')
  const [createOpen, setCreateOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [archivingStudent, setArchivingStudent] = useState<Student | null>(null)

  const filteredStudents = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return students
    return students.filter((student) =>
      `${student.fullName} ${student.studentNumber} ${student.group}`.toLowerCase().includes(normalized),
    )
  }, [query, students])

  return (
    <div className="students-page">
      <AppHeader context="Управление документами студентов" />

      <main className="students-main">
        <section className="students-intro">
          <div>
            <span className="students-eyebrow">Администрирование / Студенты</span>
            <h1>Студенты</h1>
            <p>Создавайте записи студентов и открывайте доступ к документам по QR-коду.</p>
          </div>
          <Button onClick={() => setCreateOpen(true)}><Icon name="plus" />Добавить студента</Button>
        </section>

        <StudentsSummary students={students} />

        <section className="students-registry" aria-labelledby="registry-title">
          <header className="students-registry-header">
            <div>
              <h2 id="registry-title">Реестр студентов</h2>
              <p>{studentCountLabel(students.length)} · Документы и QR-доступ в одном месте</p>
            </div>
            <label className="students-search">
              <Icon name="search" />
              <span className="ui-sr-only">Поиск студентов</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск студентов..." />
            </label>
          </header>
          {records.loading && <p className="students-registry-state">Загрузка студентов...</p>}
          {!records.loading && records.error && (
            <div className="students-registry-state students-registry-state--error">
              <span>{records.error}</span><Button variant="secondary" size="sm" onClick={records.reload}>Повторить</Button>
            </div>
          )}
          {!records.loading && !records.error && (
            <StudentTable students={filteredStudents}
              onDocuments={(student) => navigate(`/students/${student.id}/documents`)}
              onQr={setSelectedStudent} onEdit={setEditingStudent} onArchive={setArchivingStudent} />
          )}
        </section>
      </main>

      <StudentCreateDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSave={async (draft) => {
          await records.addStudent(draft)
          setCreateOpen(false)
        }}
      />
      {editingStudent && (
        <StudentCreateDialog key={editingStudent.id} open student={editingStudent}
          onClose={() => setEditingStudent(null)} onSave={async (draft) => {
            await records.editStudent(editingStudent.id, draft)
            setEditingStudent(null)
          }} />
      )}
      {archivingStudent && (
        <StudentArchiveDialog student={archivingStudent} onClose={() => setArchivingStudent(null)}
          onArchive={async () => {
            await records.removeStudent(archivingStudent.id)
            setArchivingStudent(null)
          }} />
      )}
      {selectedStudent && (
        <StudentQrDialog student={selectedStudent} onClose={() => setSelectedStudent(null)} />
      )}
    </div>
  )
}
