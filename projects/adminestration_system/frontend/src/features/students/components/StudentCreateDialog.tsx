import { useEffect, useState, type FormEvent } from 'react'
import { Button, Icon } from '../../../components/ui'
import type { Student, StudentDraft } from '../types'

interface StudentCreateDialogProps {
  open: boolean
  student?: Student
  onClose: () => void
  onSave: (draft: StudentDraft) => Promise<void>
}

export function StudentCreateDialog({ open, student, onClose, onSave }: StudentCreateDialogProps) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open, onClose])

  if (!open) return null

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setSubmitting(true)
    setError('')
    try {
      await onSave({
        fullName: String(data.get('fullName')).trim(),
        studentNumber: String(data.get('studentNumber')).trim(),
        group: String(data.get('group')).trim(),
      })
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Не удалось сохранить данные студента.')
      setSubmitting(false)
    }
  }

  return (
    <div className="students-modal-backdrop" onMouseDown={onClose}>
      <section
        className="students-modal students-create-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-student-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="students-modal-header">
          <div>
            <span className="students-eyebrow">{student ? 'Редактирование записи' : 'Новая запись'}</span>
            <h2 id="create-student-title">{student ? 'Изменить данные студента' : 'Добавить студента'}</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Закрыть окно">
            <Icon name="close" />
          </Button>
        </header>

        <form className="students-create-form" onSubmit={handleSubmit}>
          <label>
            <span>Полное имя</span>
            <input name="fullName" placeholder="Имя и фамилия студента" defaultValue={student?.fullName} autoFocus required />
          </label>
          <div className="students-form-row">
            <label>
              <span>ID студента</span>
              <input name="studentNumber" placeholder="ST-1051" defaultValue={student?.studentNumber} required />
            </label>
            <label>
              <span>Группа</span>
              <input name="group" placeholder="10A" defaultValue={student?.group} required />
            </label>
          </div>
          <p className="students-form-note">ID студента должен быть уникальным. Изменения применяются к будущим документам, а выданные записи сохраняют исходные данные.</p>
          {error && <p className="students-form-error" role="alert">{error}</p>}
          <footer className="students-modal-actions">
            <Button variant="secondary" onClick={onClose}>Отмена</Button>
            <Button type="submit" disabled={submitting}>
              <Icon name={student ? 'check' : 'plus'} />
              {submitting ? 'Сохранение...' : student ? 'Сохранить изменения' : 'Добавить студента'}
            </Button>
          </footer>
        </form>
      </section>
    </div>
  )
}
