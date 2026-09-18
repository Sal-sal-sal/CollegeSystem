import { useEffect, useState } from 'react'
import { getStudent } from '../services/studentsApi'
import type { Student } from '../types'

export function useStudent(studentId: string) {
  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    getStudent(studentId)
      .then((value) => active && setStudent(value))
      .catch((requestError: unknown) => {
        if (active) setError(requestError instanceof Error ? requestError.message : 'Не удалось загрузить данные студента.')
      })
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [studentId])

  return { student, loading, error }
}
