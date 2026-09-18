import { Icon } from '../../../components/ui'
import type { Student } from '../types'

export function StudentsSummary({ students }: { students: Student[] }) {
  const documents = students.reduce((sum, student) => sum + student.documentCount, 0)
  const active = students.reduce((sum, student) => sum + student.activeDocumentCount, 0)

  const metrics = [
    { label: 'Активные студенты', value: students.length, icon: 'users' as const },
    { label: 'Выданные документы', value: documents, icon: 'file' as const },
    { label: 'Документы с QR-кодом', value: active, icon: 'qr' as const },
  ]

  return (
    <section className="students-summary" aria-label="Сводка реестра">
      {metrics.map((metric) => (
        <article key={metric.label}>
          <span><Icon name={metric.icon} /></span>
          <div><strong>{metric.value}</strong><small>{metric.label}</small></div>
        </article>
      ))}
    </section>
  )
}
