import { Icon, StatusPill } from '../../../components/ui'
import { resolveApiUrl } from '../../../services/api/client'
import type { DocumentRecord } from './types'

interface DocumentListProps {
  documents: DocumentRecord[]
  loading: boolean
  error: string
  onReload: () => void
  onRevoke: (document: DocumentRecord) => void
}

function statusTone(status: string) {
  const normalized = status.toLowerCase()
  if (normalized === 'verified' || normalized === 'valid' || normalized === 'active') return 'success'
  if (normalized === 'pending' || normalized === 'processing') return 'warning'
  if (normalized === 'revoked') return 'danger'
  return 'neutral'
}

function statusLabel(status: string) {
  return status.toLowerCase() === 'active' ? 'Активен' : 'Отозван'
}

function recordsLabel(count: number) {
  const remainder100 = count % 100
  const remainder10 = count % 10
  if (remainder100 >= 11 && remainder100 <= 14) return `${count} записей`
  if (remainder10 === 1) return `${count} запись`
  if (remainder10 >= 2 && remainder10 <= 4) return `${count} записи`
  return `${count} записей`
}

export function DocumentList({ documents, loading, error, onReload, onRevoke }: DocumentListProps) {
  return (
    <section className="documents-list" aria-labelledby="documents-title">
      <header><div><h2 id="documents-title">Доступные документы</h2><p>{recordsLabel(documents.length)}</p></div></header>
      {loading && <p className="documents-state">Загрузка документов...</p>}
      {!loading && error && (
        <div className="documents-state documents-state--error"><p>{error}</p><button onClick={onReload}>Повторить</button></div>
      )}
      {!loading && !error && documents.length === 0 && <p className="documents-state">Документы ещё не загружены.</p>}
      {!loading && !error && documents.map((document) => (
        <article className="documents-item" key={document.id}>
          <span className="documents-file-icon"><Icon name="file" /></span>
          <div>
            <h3>{document.title}</h3>
            <p>{document.original_filename} · Добавлен {new Date(document.created_at).toLocaleDateString('ru-RU')}</p>
            <nav aria-label={`Ссылки для документа ${document.title}`}>
              {document.status === 'active' && (
                <a href={resolveApiUrl(document.download_url)}>
                  {document.media_type === 'image' ? 'Скачать фото с QR-кодом' : 'Скачать PDF'}
                </a>
              )}
              <a href={resolveApiUrl(document.verification_url)} target="_blank" rel="noreferrer">Проверить</a>
              {document.status === 'active' && <button type="button" onClick={() => onRevoke(document)}>Отозвать</button>}
            </nav>
          </div>
          <StatusPill tone={statusTone(document.status)}>
            {statusLabel(document.status)}
          </StatusPill>
        </article>
      ))}
    </section>
  )
}
