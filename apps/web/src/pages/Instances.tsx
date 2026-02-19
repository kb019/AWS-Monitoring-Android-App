const instances = [
  {
    id: "i-0a12b3c4d5e6f7890",
    name: "Web Server",
    state: "running",
    type: "t3.medium",
    zone: "us-east-1a",
    cpu: 42,
    memory: 61,
  },
  {
    id: "i-0123abc456def7890",
    name: "Database Server",
    state: "stopped",
    type: "t3.large",
    zone: "us-east-1b",
    cpu: 0,
    memory: 0,
  },
  {
    id: "i-09aa23bb44cc55dd6",
    name: "Batch Worker",
    state: "pending",
    type: "t3.small",
    zone: "us-east-1c",
    cpu: 65,
    memory: 38,
  },
];

const statCards = [
  { label: "Running", value: "1" },
  { label: "Stopped", value: "1" },
  { label: "Pending", value: "1" },
  { label: "Alerts", value: "2" },
];

export default function Instances() {
  return (
    <div className="page">
      <section className="section">
        <div className="page-header">
          <div>
            <div className="eyebrow">Infrastructure Overview</div>
            <h1 className="page-title">Instance Control Center</h1>
            <p className="page-subtitle">
              Monitor health, usage, and security posture across your EC2 fleet.
            </p>
          </div>
          <div className="header-actions">
            <button className="btn ghost">Schedule Maintenance</button>
            <button className="btn primary">Launch Instance</button>
          </div>
        </div>
        <div className="stat-grid">
          {statCards.map((card) => (
            <div key={card.label} className="stat-card">
              <div className="stat-label">{card.label}</div>
              <div className="stat-value">{card.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div className="panel-title">Instances</div>
          <input className="search" placeholder="Search by tag or ID" />
        </div>
        <div className="card-grid">
          {instances.map((instance) => (
            <article key={instance.id} className="instance-card">
              <div className="instance-header">
                <div>
                  <div className="instance-name">{instance.name}</div>
                  <div className="instance-id">{instance.id}</div>
                </div>
                <span className="status-pill" data-state={instance.state}>
                  {instance.state}
                </span>
              </div>
              <div className="instance-meta">
                <div>Type: {instance.type}</div>
                <div>Zone: {instance.zone}</div>
              </div>
              <div className="meter">
                <div>CPU</div>
                <div>{instance.cpu}%</div>
                <div className="meter-bar">
                  <span style={{ width: `${instance.cpu}%` }} />
                </div>
              </div>
              <div className="meter">
                <div>Memory</div>
                <div>{instance.memory}%</div>
                <div className="meter-bar">
                  <span style={{ width: `${instance.memory}%` }} />
                </div>
              </div>
              <div className="card-actions">
                <button className="btn ghost">Start</button>
                <button className="btn ghost">Stop</button>
                <button className="btn">Reboot</button>
                <button className="btn primary">Details</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
