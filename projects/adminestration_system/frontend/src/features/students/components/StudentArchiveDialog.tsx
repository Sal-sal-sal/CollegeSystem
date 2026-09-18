import { useEffect, useState } from 'react'
import { Button, Icon } from '../../../components/ui'
import type { Student } from '../types'

interface Props {
  student: Student
  onClose: () => void
  onArchive: () => Promise<void>
}

export function StudentArchiveDialog({ student, onClose, onArchive }: Props) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  async function confirm() {
    setSubmitting(true)
    setError('')
    try {
      await onArchive()
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Не удалось архивировать студента.')
      setSubmitting(false)
    }
  }

  return (
    <div className="students-modal-backdrop" onMouseDown={onClose}>
      <section className="students-modal students-confirm-modal" role="alertdialog" aria-modal="true"
        aria-labelledby="archive-student-title" onMouseDown={(event) => event.stopPropagation()}>
        <header className="students-modal-header">
          <div><span className="students-eyebrow">Архивирование записи</span><h2 id="archive-student-title">Архивировать {student.fullName}?</h2></div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Закрыть окно"><Icon name="close" /></Button>
        </header>
        <div className="students-confirm-content">
          <p>Студент будет удалён из активного реестра. Выданные ссылки проверки сохранят текущий статус.</p>
          {error && <p className="students-form-error" role="alert">{error}</p>}
          <footer className="students-modal-actions">
            <Button variant="secondary" onClick={onClose}>Отмена</Button>
            <Button className="ui-button--danger" onClick={confirm} disabled={submitting}>
              <Icon name="archive" />{submitting ? 'Архивирование...' : 'Архивировать студента'}
            </Button>
          </footer>
        </div>
      </section>
    </div>
  )
}
