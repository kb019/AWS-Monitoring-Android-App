import { Outlet, NavLink } from "react-router-dom";

const navItems = [
  { label: "Instances", to: "/instances" },
  { label: "Alerts", to: "/instances" },
  { label: "Activity", to: "/instances" },
];

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">CM</div>
          <div>
            <div className="brand-title">Cloud Monitor</div>
            <div className="brand-sub">AWS Control Plane</div>
          </div>
        </div>
        <nav className="topnav">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `nav-link${isActive ? " active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="meta">
          <div className="meta-item">
            <span className="meta-label">Region</span>
            <span className="meta-value">us-east-1</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Env</span>
            <span className="meta-value">Staging</span>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer">
        <strong>Cloud Infrastructure Monitoring</strong> - Sprint 1 UI scaffold
      </footer>
    </div>
  );
}
