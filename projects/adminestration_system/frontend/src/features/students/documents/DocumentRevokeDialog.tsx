import { useEffect, useState, type FormEvent } from 'react'
import { Button, Icon } from '../../../components/ui'
import type { DocumentRecord } from './types'

interface Props {
  document: DocumentRecord
  onClose: () => void
  onRevoke: (reason: string) => Promise<void>
}

export function DocumentRevokeDialog({ document, onClose, onRevoke }: Props) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const reason = String(new FormData(event.currentTarget).get('reason')).trim()
    setSubmitting(true)
    setError('')
    try {
      await onRevoke(reason)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Не удалось отозвать документ.')
      setSubmitting(false)
    }
  }

  return (
    <div className="students-modal-backdrop" onMouseDown={onClose}>
      <section className="students-modal documents-revoke-modal" role="alertdialog" aria-modal="true"
        aria-labelledby="revoke-document-title" onMouseDown={(event) => event.stopPropagation()}>
        <header className="students-modal-header">
          <div><span className="students-eyebrow">Отзыв проверки</span><h2 id="revoke-document-title">Отозвать «{document.title}»?</h2></div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Закрыть окно"><Icon name="close" /></Button>
        </header>
        <form className="documents-revoke-form" onSubmit={submit}>
          <p>На публичной странице QR-кода сразу будет показано, что документ отозван.</p>
          <label><span>Причина</span><textarea name="reason" maxLength={300} placeholder="Почему этот документ больше недействителен?" autoFocus required /></label>
          {error && <p className="students-form-error" role="alert">{error}</p>}
          <footer className="students-modal-actions">
            <Button variant="secondary" onClick={onClose}>Отмена</Button>
            <Button className="ui-button--danger" type="submit" disabled={submitting}>
              {submitting ? 'Отзыв...' : 'Отозвать документ'}
            </Button>
          </footer>
        </form>
      </section>
    </div>
  )
}
