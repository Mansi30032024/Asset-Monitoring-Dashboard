function Topbar({ onLogout }) {
  return (
    <section className="topbar">
      <div>
        <p className="eyebrow">Industrial Monitoring</p>
        <h1>Asset Monitoring Dashboard</h1>
        <p className="topbar-copy">
          Track equipment status, service metrics, and operational health from one place.
        </p>
      </div>

      <div className="topbar-actions">
        <div className="login-state">
          <span> Connected</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      </div>
    </section>
  )
}

export default Topbar
