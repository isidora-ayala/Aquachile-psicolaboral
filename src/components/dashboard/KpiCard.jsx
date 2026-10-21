export default function KpiCard({ icon, value, label, color = 'salmon' }) {
  const getColor = (color) => {
    switch (color) {
      case 'success':
        return { bg: 'var(--success-light)', icon: 'var(--success)' };
      case 'warning':
        return { bg: 'var(--warning-light)', icon: 'var(--warning)' };
      case 'info':
        return { bg: 'var(--info-light)', icon: 'var(--info)' };
      case 'navy':
        return { bg: 'rgba(27, 42, 74, 0.08)', icon: 'var(--navy-900)' };
      case 'salmon':
      default:
        return { bg: 'var(--salmon-100)', icon: 'var(--salmon-700)' };
    }
  };
  const colors = getColor(color);
  return (
    <div className="kpi-card h-100">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <div className="kpi-card-value mb-2">{value}</div>
          <div className="kpi-card-label">{label}</div>
        </div>
        <div className="kpi-card-icon" style={{ background: colors.bg, color: colors.icon }}>
          <i className={`bi bi-${icon}`}></i>
        </div>
      </div>
    </div>
  );
}
