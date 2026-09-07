import { Avatar, Button, Icon, StatusPill } from '../../../components/ui'
import { activity } from '../data'

const statusTone = {
  Completed: 'success',
  Pending: 'warning',
  Review: 'neutral',
} as const

export function ActivityTable() {
  return (
    <section className="dashboard-panel dashboard-activity">
      <div className="dashboard-panel-heading">
        <div>
          <h2>Recent activity</h2>
          <p>Changes across your organization</p>
        </div>
        <Button size="sm" variant="secondary">View all</Button>
      </div>

      <div className="dashboard-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Member</th>
              <th>Activity</th>
              <th>Status</th>
              <th>Time</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {activity.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="dashboard-member">
                    <Avatar initials={item.initials} size="sm" />
                    <strong>{item.actor}</strong>
                  </div>
                </td>
                <td>
                  <span>{item.action} <strong>{item.target}</strong></span>
                </td>
                <td><StatusPill tone={statusTone[item.status]}>{item.status}</StatusPill></td>
                <td className="dashboard-table-time">{item.time}</td>
                <td>
                  <Button aria-label={`Actions for ${item.actor}`} className="dashboard-icon-button" size="sm" variant="ghost">
                    <Icon className="size-4" name="settings" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
