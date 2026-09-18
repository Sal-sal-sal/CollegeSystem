import { useEffect, useRef, useState, type ClipboardEvent, type DragEvent, type FormEvent } from 'react'
import { Button, Icon } from '../../../components/ui'
import type { Student } from '../types'
import type { DocumentUpload } from './types'

const ACCEPTED_TYPES = ['application/pdf', 'image/png', 'image/jpeg']
const ACCEPTED_EXTENSIONS = ['.pdf', '.png', '.jpg', '.jpeg']
const MAX_FILE_BYTES = 10 * 1024 * 1024

interface DocumentUploadFormProps {
  student: Student
  onUpload: (upload: DocumentUpload) => Promise<unknown>
}

function isSupportedFile(file: File) {
  const lowerName = file.name.toLowerCase()
  return ACCEPTED_TYPES.includes(file.type) || ACCEPTED_EXTENSIONS.some((extension) => lowerName.endsWith(extension))
}

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} КБ`
  return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`
}

function fileLabel(file: File) {
  return file.type.startsWith('image/') || /\.(png|jpe?g)$/i.test(file.name) ? 'Фото' : 'PDF-документ'
}

export function DocumentUploadForm({ student, onUpload }: DocumentUploadFormProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
  }, [previewUrl])

  function chooseFile(file: File | undefined) {
    if (!file || !file.size) return
    if (file.size > MAX_FILE_BYTES) {
      setMessage('Файл слишком большой. Размер не должен превышать 10 МБ.')
      return
    }
    if (!isSupportedFile(file)) {
      setMessage('Выберите файл PDF, PNG или JPEG.')
      return
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(file.type.startsWith('image/') ? URL.createObjectURL(file) : '')
    setSelectedFile(file)
    setMessage('')
  }

  function clearFile() {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl('')
    setSelectedFile(null)
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setDragActive(false)
    chooseFile(event.dataTransfer.files[0])
  }

  function handlePaste(event: ClipboardEvent<HTMLDivElement>) {
    const pastedFile = Array.from(event.clipboardData.files).find(isSupportedFile)
    if (!pastedFile) return
    event.preventDefault()
    chooseFile(pastedFile)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selectedFile) {
      setMessage('Сначала выберите или вставьте файл.')
      return
    }
    const title = new FormData(event.currentTarget).get('title')
    if (typeof title !== 'string' || !title.trim()) return
    setSubmitting(true)
    setMessage('')
    try {
      await onUpload({ file: selectedFile, title, studentId: student.id, studentName: student.fullName, studentNumber: student.studentNumber })
      event.currentTarget.reset()
      clearFile()
      setMessage(fileLabel(selectedFile) === 'Фото' ? 'Фото загружено с QR-кодом.' : 'PDF-файл успешно загружен.')
    } catch (requestError) {
      setMessage(requestError instanceof Error ? requestError.message : 'Не удалось загрузить файл.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="documents-upload" aria-labelledby="upload-title" onPaste={handlePaste}>
      <header><div><span className="documents-upload-kicker"><Icon name="qr" /> QR-студия</span><h2 id="upload-title">Загрузить файл</h2><p>Добавьте PDF или фото и получите копию с QR-кодом</p></div></header>
      <form onSubmit={handleSubmit}>
        <label><span>Название записи</span><input name="title" placeholder="Справка о зачислении" required /></label>
        <div
          className={`documents-upload-zone${dragActive ? ' documents-upload-zone--active' : ''}${selectedFile ? ' documents-upload-zone--filled' : ''}`}
          role="button"
          tabIndex={0}
          aria-label="Выбрать, перетащить или вставить PDF-файл или фото"
          onClick={() => inputRef.current?.click()}
          onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); inputRef.current?.click() } }}
          onDragEnter={(event) => { event.preventDefault(); setDragActive(true) }}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
        >
          <input ref={inputRef} className="documents-upload-file-input" name="file" type="file" accept="application/pdf,image/png,image/jpeg,.pdf,.png,.jpg,.jpeg" onChange={(event) => chooseFile(event.target.files?.[0])} />
          {selectedFile ? <SelectedFile file={selectedFile} previewUrl={previewUrl} onClear={clearFile} /> : <EmptyDropzone />}
        </div>
        <div className="documents-upload-actions">
          {message && <p role="status" className={/загружен|успешно/.test(message) ? 'documents-upload-message--success' : ''}>{message}</p>}
          <Button type="submit" disabled={submitting}><Icon name="plus" />{submitting ? 'Создание QR-кода...' : 'Загрузить файл'}</Button>
        </div>
      </form>
    </section>
  )
}

function EmptyDropzone() {
  return <div className="documents-upload-empty"><span className="documents-upload-icon"><Icon name="qr" /></span><strong>Перетащите файл сюда</strong><span>или нажмите для выбора · вставьте из буфера Cmd/Ctrl+V</span><small>PDF, PNG или JPEG · до 10 МБ</small></div>
}

function SelectedFile({ file, previewUrl, onClear }: { file: File; previewUrl: string; onClear: () => void }) {
  return <div className="documents-upload-selected">
    {previewUrl ? <img src={previewUrl} alt="Предпросмотр выбранного фото" /> : <span className="documents-upload-icon"><Icon name="file" /></span>}
    <span className="documents-upload-selected-copy"><strong>{file.name}</strong><span>{fileLabel(file)} · {formatBytes(file.size)} · готово</span></span>
    <Button type="button" variant="ghost" size="sm" onClick={(event) => { event.stopPropagation(); onClear() }}>Удалить</Button>
  </div>
}
