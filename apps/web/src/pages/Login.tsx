export default function Login() {
  return (
    <div className="page login-shell">
      <div className="login-card">
        <div className="eyebrow">Welcome back</div>
        <h1 className="page-title">Sign in to Cloud Monitor</h1>
        <p className="page-subtitle">
          Access role-based controls for your infrastructure.
        </p>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" placeholder="you@company.com" type="email" />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input id="password" placeholder="••••••••" type="password" />
        </div>
        <button className="btn primary" style={{ width: "100%" }}>
          Sign In
        </button>
      </div>
    </div>
  );
}
