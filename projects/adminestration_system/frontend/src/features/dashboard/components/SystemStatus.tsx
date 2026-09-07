import { Icon, StatusPill } from '../../../components/ui'
import { services } from '../data'

export function SystemStatus() {
  return (
    <section className="dashboard-panel dashboard-status">
      <div className="dashboard-panel-heading">
        <div>
          <h2>System status</h2>
          <p>Live service health</p>
        </div>
        <span className="dashboard-status-live"><i /> Live</span>
      </div>

      <div className="dashboard-service-list">
        {services.map((service) => (
          <div className="dashboard-service" key={service.id}>
            <div className="dashboard-service-icon" data-status={service.status}>
              <Icon className="size-4" name={service.status === 'Operational' ? 'shield' : 'activity'} />
            </div>
            <div>
              <strong>{service.name}</strong>
              <span>{service.detail}</span>
            </div>
            <div className="dashboard-service-meta">
              <StatusPill tone={service.status === 'Operational' ? 'success' : 'warning'}>{service.status}</StatusPill>
              <span>{service.uptime}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
