const cards = [
  { label: 'Total Assets', key: 'totalAssets', className: '' },
  { label: 'Active', key: 'activeAssets', className: 'active' },
  { label: 'Inactive', key: 'inactiveAssets', className: 'inactive' },
  { label: 'Maintenance', key: 'maintenanceAssets', className: 'maintenance' }
]

function StatsGrid({ counts }) {
  return (
    <section className="stats-grid">
      {cards.map((card) => (
        <div className={`stat-card ${card.className}`} key={card.key}>
          <span>{card.label}</span>
          <strong>{counts[card.key]}</strong>
        </div>
      ))}
    </section>
  )
}

export default StatsGrid
