import { useParams } from "react-router-dom";

const events = [
  { label: "CPU alarm cleared", time: "2 min ago" },
  { label: "Snapshot completed", time: "1 hr ago" },
  { label: "User login", time: "Yesterday" },
];

export default function InstanceDetail() {
  const { instanceId } = useParams();

  return (
    <div className="page">
      <section className="section">
        <div className="page-header">
          <div>
            <div className="eyebrow">Instance Detail</div>
            <h1 className="page-title">{instanceId ?? "Instance"}</h1>
            <p className="page-subtitle">
              Live metrics, recent activity, and protection controls.
            </p>
          </div>
          <div className="header-actions">
            <button className="btn ghost">Terminate</button>
            <button className="btn primary">Reboot</button>
          </div>
        </div>

        <div className="detail-grid">
          <div className="detail-card">
            <div className="panel-title">Health</div>
            <p className="page-subtitle">Checks passed. No active incidents.</p>
          </div>
          <div className="detail-card">
            <div className="panel-title">Configuration</div>
            <p className="page-subtitle">t3.medium · 2 vCPU · 4GB RAM</p>
          </div>
          <div className="detail-card">
            <div className="panel-title">Security</div>
            <p className="page-subtitle">IAM role verified · MFA enforced</p>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div className="panel-title">Usage</div>
          <button className="btn ghost">Last 24 hours</button>
        </div>
        <div className="chart-placeholder" />
      </section>

      <section className="panel">
        <div className="panel-header">
          <div className="panel-title">Recent Activity</div>
          <button className="btn ghost">View all</button>
        </div>
        <div className="event-list">
          {events.map((event) => (
            <div key={event.label} className="event-item">
              <div>{event.label}</div>
              <div>{event.time}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
