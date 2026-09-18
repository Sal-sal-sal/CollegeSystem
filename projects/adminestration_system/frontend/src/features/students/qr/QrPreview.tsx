import { Button, Icon } from '../../../components/ui'
import type { DocumentRecord } from '../documents/types'

interface QrPreviewProps {
  documents: DocumentRecord[]
  selectedDocument: DocumentRecord
  url: string
  dataUrl: string
  generationError: string
  actionError: string
  copied: boolean
  onSelect: (id: string) => void
  onCopy: () => void
}

function isLocalUrl(value: string) {
  const hostname = new URL(value).hostname
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]'
}

export function QrPreview(props: QrPreviewProps) {
  const { documents, selectedDocument, url, dataUrl } = props
  const localUrl = isLocalUrl(url)

  return (
    <>
      <label className="students-qr-picker">
        <span>Документ в QR-коде</span>
        <select value={selectedDocument.id} onChange={(event) => props.onSelect(event.target.value)}>
          {documents.map((document) => (
            <option value={document.id} key={document.id}>{document.title}</option>
          ))}
        </select>
      </label>
      <div className="students-qr-frame">
        {dataUrl && <img src={dataUrl} alt={`QR-код для документа «${selectedDocument.title}»`} />}
        {!dataUrl && !props.generationError && <span className="students-qr-loading">Создание QR-кода...</span>}
        {props.generationError && <span className="students-qr-error">{props.generationError}</span>}
      </div>
      <div className={`students-link-box${localUrl ? ' students-link-box--local' : ''}`}>
        <div>
          <span title={url}>{url}</span>
          {localUrl && <small>Локальный адрес · перед публикацией задайте PUBLIC_BASE_URL</small>}
        </div>
        <Button variant="secondary" size="icon" onClick={props.onCopy} aria-label="Скопировать ссылку проверки">
          <Icon name={props.copied ? 'check' : 'copy'} />
        </Button>
      </div>
      {props.actionError && <p className="students-qr-action-error" role="alert">{props.actionError}</p>}
      <p className="ui-sr-only" aria-live="polite">{props.copied ? 'Ссылка проверки скопирована.' : ''}</p>
    </>
  )
}
