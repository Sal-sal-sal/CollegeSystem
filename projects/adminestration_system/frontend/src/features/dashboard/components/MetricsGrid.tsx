import { Icon } from '../../../components/ui'
import type { Metric } from '../types'

type MetricsGridProps = {
  metrics: Metric[]
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <section aria-label="Overview metrics" className="dashboard-metrics-grid">
      {metrics.map((metric) => (
        <article className="dashboard-metric" key={metric.id}>
          <div className="dashboard-metric-heading">
            <span>{metric.label}</span>
            <Icon className="size-4 text-zinc-400" name="arrowRight" />
          </div>
          <strong>{metric.value}</strong>
          <div className="dashboard-metric-change" data-trend={metric.trend}>
            <span>{metric.trend === 'up' ? '↑' : '↓'} {metric.change}</span>
            <p>{metric.detail}</p>
          </div>
        </article>
      ))}
    </section>
  )
}
