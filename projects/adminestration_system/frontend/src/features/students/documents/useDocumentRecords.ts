import { useEffect, useState } from 'react'
import { getStudentDocuments, revokeDocument, uploadDocument } from './documentsApi'
import type { DocumentRecord, DocumentUpload } from './types'

export function useDocumentRecords(studentId: string) {
  const [documents, setDocuments] = useState<DocumentRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [requestVersion, setRequestVersion] = useState(0)

  useEffect(() => {
    let active = true
    getStudentDocuments(studentId)
      .then((response) => active && setDocuments(response.documents))
      .catch((requestError: unknown) => {
        if (active) setError(requestError instanceof Error ? requestError.message : 'Не удалось загрузить документы.')
      })
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [requestVersion, studentId])

  function reload() {
    setLoading(true)
    setError('')
    setRequestVersion((version) => version + 1)
  }

  async function createDocument(upload: DocumentUpload) {
    const document = await uploadDocument(upload)
    setDocuments((current) => [document, ...current.filter((item) => item.id !== document.id)])
    return document
  }

  async function revoke(documentId: string, reason: string) {
    const document = await revokeDocument(documentId, reason)
    setDocuments((current) => current.map((item) => item.id === documentId ? document : item))
    return document
  }

  return { documents, loading, error, reload, createDocument, revoke }
}
