import { useEffect, useState } from 'react'
import { archiveStudent, createStudent, getStudents, updateStudent } from '../services/studentsApi'
import type { Student, StudentDraft } from '../types'

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [requestVersion, setRequestVersion] = useState(0)

  useEffect(() => {
    let active = true
    getStudents()
      .then((value) => active && setStudents(value))
      .catch((requestError: unknown) => {
        if (active) setError(requestError instanceof Error ? requestError.message : 'Не удалось загрузить студентов.')
      })
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [requestVersion])

  async function addStudent(draft: StudentDraft) {
    const student = await createStudent(draft)
    setStudents((current) => [student, ...current])
    return student
  }

  async function editStudent(studentId: string, draft: StudentDraft) {
    const student = await updateStudent(studentId, draft)
    setStudents((current) => current.map((item) => item.id === studentId ? student : item))
    return student
  }

  async function removeStudent(studentId: string) {
    await archiveStudent(studentId)
    setStudents((current) => current.filter((student) => student.id !== studentId))
  }

  function reload() {
    setLoading(true)
    setError('')
    setRequestVersion((value) => value + 1)
  }

  return { students, loading, error, addStudent, editStudent, removeStudent, reload }
}
