import { useEffect, useState } from 'react'
import { getStudentDocuments } from '../documents/documentsApi'
import type { DocumentRecord } from '../documents/types'

interface QrDocumentsState {
  studentId?: string
  requestVersion: number
  documents: DocumentRecord[]
  error: string
}

const emptyState: QrDocumentsState = {
  requestVersion: -1,
  documents: [],
  error: '',
}

export function useQrDocuments(studentId?: string) {
  const [state, setState] = useState<QrDocumentsState>(emptyState)
  const [requestVersion, setRequestVersion] = useState(0)

  useEffect(() => {
    if (!studentId) return

    let active = true
    getStudentDocuments(studentId)
      .then((response) => {
        if (active) setState({ studentId, requestVersion, documents: response.documents, error: '' })
      })
      .catch((error: unknown) => {
        if (!active) return
        const message = error instanceof Error ? error.message : 'Не удалось загрузить документы.'
        setState({ studentId, requestVersion, documents: [], error: message })
      })

    return () => {
      active = false
    }
  }, [requestVersion, studentId])

  const isCurrent = state.studentId === studentId && state.requestVersion === requestVersion
  return {
    documents: isCurrent ? state.documents : [],
    loading: Boolean(studentId) && !isCurrent,
    error: isCurrent ? state.error : '',
    reload: () => setRequestVersion((version) => version + 1),
  }
}
