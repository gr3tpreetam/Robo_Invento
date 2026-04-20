// src/components/StatsCard.jsx
const COLORS = {
  cyan:   { bg: 'rgba(34,211,238,0.12)',   border: 'rgba(34,211,238,0.2)',  text: '#22d3ee',  icon: 'rgba(34,211,238,0.15)' },
  blue:   { bg: 'rgba(59,130,246,0.12)',   border: 'rgba(59,130,246,0.2)',  text: '#60a5fa',  icon: 'rgba(59,130,246,0.15)' },
  purple: { bg: 'rgba(139,92,246,0.12)',   border: 'rgba(139,92,246,0.2)',  text: '#c084fc',  icon: 'rgba(139,92,246,0.15)' },
  green:  { bg: 'rgba(16,185,129,0.12)',   border: 'rgba(16,185,129,0.2)',  text: '#34d399',  icon: 'rgba(16,185,129,0.15)' },
  yellow: { bg: 'rgba(245,158,11,0.12)',   border: 'rgba(245,158,11,0.2)',  text: '#fbbf24',  icon: 'rgba(245,158,11,0.15)' },
  red:    { bg: 'rgba(239,68,68,0.12)',    border: 'rgba(239,68,68,0.2)',   text: '#f87171',  icon: 'rgba(239,68,68,0.15)' },
};

export default function StatsCard({ title, value, icon: Icon, color = 'cyan', trend }) {
  const c = COLORS[color] ?? COLORS.cyan;
  return (
    <div className="animate-fade-in" style={{
      background: `linear-gradient(135deg, ${c.bg}, rgba(15,32,64,0.3))`,
      border: `1px solid ${c.border}`,
      borderRadius: '1rem',
      padding: '1.25rem',
      backdropFilter: 'blur(12px)',
      boxShadow: 'var(--shadow-card)',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: '0.65rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{title}</p>
          <p style={{ marginTop: '0.5rem', fontSize: '1.875rem', fontWeight: 700, color: 'white', fontFamily: 'var(--font-family-mono)' }}>{value}</p>
          {trend && <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#64748b' }}>{trend}</p>}
        </div>
        <div style={{ padding: '0.75rem', borderRadius: '0.75rem', background: c.icon, color: c.text, display: 'flex' }}>
          <Icon style={{ width: '1.5rem', height: '1.5rem' }} />
        </div>
      </div>
    </div>
  );
}
