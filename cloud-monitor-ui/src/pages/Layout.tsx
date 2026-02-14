import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div style={{ padding: 16 }}>
      <nav style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <Link to="/instances">Instances</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Outlet />
    </div>
  );
}
