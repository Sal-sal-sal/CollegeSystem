import { Avatar, Icon } from '../../../components/ui'
import type { Student } from '../types'

interface StudentTableProps {
  students: Student[]
  onDocuments: (student: Student) => void
  onQr: (student: Student) => void
  onEdit: (student: Student) => void
  onArchive: (student: Student) => void
}

function initials(name: string) {
  return name.split(' ').map((part) => part[0]).join('').slice(0, 2)
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function StudentTable({ students, onDocuments, onQr, onEdit, onArchive }: StudentTableProps) {
  if (students.length === 0) {
    return (
      <div className="students-empty">
        <Icon name="search" />
        <strong>Студенты не найдены</strong>
        <span>Попробуйте другое имя или ID студента.</span>
      </div>
    )
  }

  return (
    <div className="students-list" role="table" aria-label="Студенты">
      <div className="students-list-head" role="row">
        <span role="columnheader">Студент</span>
        <span role="columnheader">ID студента</span>
        <span role="columnheader">Группа</span>
        <span role="columnheader">Документы</span>
        <span role="columnheader" aria-label="Действия" />
      </div>
      {students.map((student) => (
        <div className="students-list-row" role="row" key={student.id}>
          <span className="students-person" role="cell">
            <Avatar initials={initials(student.fullName)} label={student.fullName} />
            <span><strong>{student.fullName}</strong><small>Добавлен {formatDate(student.createdAt)}</small></span>
          </span>
          <span className="students-mono" role="cell">{student.studentNumber}</span>
          <span role="cell">{student.group}</span>
          <span role="cell">{student.activeDocumentCount} активных / {student.documentCount} всего</span>
          <span className="students-row-actions" role="cell">
            <button type="button" onClick={() => onDocuments(student)}><Icon name="file" />Документы</button>
            <button type="button" onClick={() => onQr(student)} aria-label={`Показать QR-код для ${student.fullName}`}><Icon name="qr" /></button>
            <button type="button" onClick={() => onEdit(student)} aria-label={`Изменить данные ${student.fullName}`}><Icon name="edit" /></button>
            <button type="button" onClick={() => onArchive(student)} aria-label={`Архивировать ${student.fullName}`}><Icon name="archive" /></button>
          </span>
        </div>
      ))}
    </div>
  )
}
