import { useEffect, useMemo, useState } from 'react'
import { Button, Icon } from '../../../components/ui'
import { resolveApiUrl } from '../../../services/api/client'
import { getStudentDocumentsUrl } from '../services/studentLinks'
import type { Student } from '../types'
import { QrPreview } from './QrPreview'
import { useQrCode } from './useQrCode'
import { useQrDocuments } from './useQrDocuments'

interface StudentQrDialogProps {
  student: Student
  onClose: () => void
}

function downloadQrCode(dataUrl: string, studentNumber: string, documentTitle: string) {
  const safeNumber = studentNumber.replace(/[^a-z0-9_-]+/gi, '-').toLowerCase()
  const safeTitle = documentTitle.replace(/[^a-z0-9_-]+/gi, '-').replace(/^-|-$/g, '').toLowerCase()
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = `${safeNumber}-${safeTitle || 'document'}-qr.png`
  link.click()
}

export function StudentQrDialog({ student, onClose }: StudentQrDialogProps) {
  const [selectedId, setSelectedId] = useState('')
  const [copied, setCopied] = useState(false)
  const [actionError, setActionError] = useState('')
  const records = useQrDocuments(student.id)
  const documents = useMemo(
    () => records.documents.filter((document) => document.status.toLowerCase() === 'active'),
    [records.documents],
  )
  const selectedDocument = documents.find((document) => document.id === selectedId) || documents[0]
  const url = selectedDocument ? resolveApiUrl(selectedDocument.verification_url) : ''
  const qr = useQrCode(url)

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [student, onClose])

  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(url)
      setActionError('')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setActionError('Не удалось скопировать ссылку. Выделите и скопируйте URL ниже.')
    }
  }

  return (
    <div className="students-modal-backdrop" onMouseDown={onClose}>
      <section className="students-modal students-qr-modal" role="dialog" aria-modal="true"
        aria-labelledby="student-qr-title" aria-describedby="student-qr-description"
        onMouseDown={(event) => event.stopPropagation()}>
        <header className="students-modal-header">
          <div><span className="students-eyebrow">Поделиться проверенным документом</span><h2 id="student-qr-title">{student.fullName}</h2></div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Закрыть QR-код" autoFocus><Icon name="close" /></Button>
        </header>
        <div className="students-qr-content">
          <p className="students-qr-description" id="student-qr-description">
            QR-код открывает публичную запись проверки одного документа. Страница администратора при этом не раскрывается.
          </p>
          {records.loading && <div className="students-qr-state">Загрузка проверенных документов...</div>}
          {!records.loading && records.error && (
            <div className="students-qr-state students-qr-state--error"><span>{records.error}</span>
              <Button variant="secondary" size="sm" onClick={records.reload}>Повторить</Button></div>
          )}
          {!records.loading && !records.error && documents.length === 0 && (
            <div className="students-qr-state"><Icon name="qr" /><strong>Нет активных документов</strong>
              <span>Загрузите проверенный PDF-файл или фото, прежде чем создавать QR-код для общего доступа.</span>
              <Button variant="secondary" size="sm" onClick={() => window.location.assign(getStudentDocumentsUrl(student.id))}>
                Открыть документы
              </Button></div>
          )}
          {selectedDocument && <QrPreview documents={documents} selectedDocument={selectedDocument}
            url={url} dataUrl={qr.dataUrl} generationError={qr.error} actionError={actionError}
            copied={copied} onSelect={setSelectedId} onCopy={copyUrl} />}
        </div>
        <footer className="students-modal-actions students-qr-actions">
          <Button variant="secondary" onClick={() => window.open(url, '_blank', 'noopener,noreferrer')} disabled={!url}>
            Открыть проверку <Icon name="external-link" />
          </Button>
          <Button onClick={() => selectedDocument && downloadQrCode(qr.dataUrl, student.studentNumber, selectedDocument.title)}
            disabled={!qr.dataUrl}>Скачать PNG</Button>
        </footer>
      </section>
    </div>
  )
}
