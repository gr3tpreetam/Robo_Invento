// src/components/LoadingSpinner.jsx
export default function LoadingSpinner({ size = 'md', text = null }) {
  const s = { sm: 20, md: 36, lg: 56 }[size] ?? 36;
  const bw = size === 'lg' ? 3 : 2;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
      <div style={{
        width: s, height: s,
        borderRadius: '50%',
        border: `${bw}px solid rgba(255,255,255,0.1)`,
        borderTopColor: '#22d3ee',
        animation: 'spin 0.8s linear infinite',
      }} />
      {text && <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{text}</p>}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
