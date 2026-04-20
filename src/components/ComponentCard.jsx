// src/components/ComponentCard.jsx
import { useState } from 'react';
import { PlusIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

/** Category-specific SVG placeholder when no real image is available */
function ComponentImagePlaceholder({ category, partNumber }) {
  if (category === 'Motor Drivers') {
    return (
      <svg viewBox="0 0 80 80" style={{ width: '80%', height: '80%' }}>
        <rect x="10" y="20" width="60" height="40" rx="4" fill="none" stroke="#3b82f6" strokeWidth="2"/>
        <circle cx="25" cy="40" r="8" fill="none" stroke="#60a5fa" strokeWidth="1.5"/>
        <circle cx="55" cy="40" r="8" fill="none" stroke="#60a5fa" strokeWidth="1.5"/>
        <line x1="33" y1="40" x2="47" y2="40" stroke="#22d3ee" strokeWidth="1.5"/>
        <line x1="10" y1="32" x2="4"  y2="32" stroke="#60a5fa" strokeWidth="1.5"/>
        <line x1="10" y1="48" x2="4"  y2="48" stroke="#60a5fa" strokeWidth="1.5"/>
        <line x1="70" y1="32" x2="76" y2="32" stroke="#60a5fa" strokeWidth="1.5"/>
        <line x1="70" y1="48" x2="76" y2="48" stroke="#60a5fa" strokeWidth="1.5"/>
        <text x="40" y="68" textAnchor="middle" fontSize="7" fill="#3b82f6" fontFamily="monospace">DRIVER</text>
      </svg>
    );
  }

  if (category === 'Sensors') {
    return (
      <svg viewBox="0 0 80 80" style={{ width: '80%', height: '80%' }}>
        <circle cx="40" cy="38" r="18" fill="none" stroke="#10b981" strokeWidth="2"/>
        <circle cx="40" cy="38" r="10" fill="none" stroke="#34d399" strokeWidth="1.5"/>
        <circle cx="40" cy="38" r="4"  fill="#10b981"/>
        <line x1="40" y1="14" x2="40" y2="20" stroke="#10b981" strokeWidth="1.5"/>
        <line x1="40" y1="56" x2="40" y2="62" stroke="#10b981" strokeWidth="1.5"/>
        <line x1="16" y1="38" x2="22" y2="38" stroke="#10b981" strokeWidth="1.5"/>
        <line x1="58" y1="38" x2="64" y2="38" stroke="#10b981" strokeWidth="1.5"/>
        <line x1="23" y1="21" x2="27" y2="25" stroke="#10b981" strokeWidth="1.5"/>
        <line x1="53" y1="51" x2="57" y2="55" stroke="#10b981" strokeWidth="1.5"/>
        <line x1="57" y1="21" x2="53" y2="25" stroke="#10b981" strokeWidth="1.5"/>
        <line x1="27" y1="51" x2="23" y2="55" stroke="#10b981" strokeWidth="1.5"/>
        <text x="40" y="72" textAnchor="middle" fontSize="7" fill="#10b981" fontFamily="monospace">SENSOR</text>
      </svg>
    );
  }

  if (category === 'Microcontrollers') {
    return (
      <svg viewBox="0 0 80 80" style={{ width: '80%', height: '80%' }}>
        <rect x="20" y="18" width="40" height="40" rx="3" fill="none" stroke="#22d3ee" strokeWidth="2"/>
        <rect x="26" y="24" width="28" height="28" rx="2" fill="rgba(34,211,238,0.08)" stroke="#22d3ee" strokeWidth="1"/>
        <line x1="14" y1="28" x2="20" y2="28" stroke="#22d3ee" strokeWidth="1.5"/>
        <line x1="14" y1="34" x2="20" y2="34" stroke="#22d3ee" strokeWidth="1.5"/>
        <line x1="14" y1="40" x2="20" y2="40" stroke="#22d3ee" strokeWidth="1.5"/>
        <line x1="14" y1="46" x2="20" y2="46" stroke="#22d3ee" strokeWidth="1.5"/>
        <line x1="14" y1="52" x2="20" y2="52" stroke="#22d3ee" strokeWidth="1.5"/>
        <line x1="60" y1="28" x2="66" y2="28" stroke="#22d3ee" strokeWidth="1.5"/>
        <line x1="60" y1="34" x2="66" y2="34" stroke="#22d3ee" strokeWidth="1.5"/>
        <line x1="60" y1="40" x2="66" y2="40" stroke="#22d3ee" strokeWidth="1.5"/>
        <line x1="60" y1="46" x2="66" y2="46" stroke="#22d3ee" strokeWidth="1.5"/>
        <line x1="60" y1="52" x2="66" y2="52" stroke="#22d3ee" strokeWidth="1.5"/>
        <line x1="28" y1="12" x2="28" y2="18" stroke="#22d3ee" strokeWidth="1.5"/>
        <line x1="36" y1="12" x2="36" y2="18" stroke="#22d3ee" strokeWidth="1.5"/>
        <line x1="44" y1="12" x2="44" y2="18" stroke="#22d3ee" strokeWidth="1.5"/>
        <line x1="52" y1="12" x2="52" y2="18" stroke="#22d3ee" strokeWidth="1.5"/>
        <line x1="28" y1="58" x2="28" y2="64" stroke="#22d3ee" strokeWidth="1.5"/>
        <line x1="36" y1="58" x2="36" y2="64" stroke="#22d3ee" strokeWidth="1.5"/>
        <line x1="44" y1="58" x2="44" y2="64" stroke="#22d3ee" strokeWidth="1.5"/>
        <line x1="52" y1="58" x2="52" y2="64" stroke="#22d3ee" strokeWidth="1.5"/>
        <text x="40" y="41" textAnchor="middle" fontSize="6" fill="#22d3ee" fontFamily="monospace">MCU</text>
      </svg>
    );
  }

  if (category === 'Linear Regulators') {
    return (
      <svg viewBox="0 0 80 80" style={{ width: '80%', height: '80%' }}>
        <rect x="22" y="22" width="36" height="34" rx="3" fill="none" stroke="#8b5cf6" strokeWidth="2"/>
        <line x1="8"  y1="33" x2="22" y2="33" stroke="#a78bfa" strokeWidth="2"/>
        <line x1="8"  y1="45" x2="22" y2="45" stroke="#475569" strokeWidth="2"/>
        <line x1="58" y1="39" x2="72" y2="39" stroke="#a78bfa" strokeWidth="2"/>
        <path d="M 30 34 L 40 39 L 30 44 Z" fill="#8b5cf6"/>
        <line x1="40" y1="39" x2="52" y2="39" stroke="#8b5cf6" strokeWidth="1.5"/>
        <line x1="52" y1="32" x2="52" y2="46" stroke="#a78bfa" strokeWidth="2"/>
        <text x="40" y="68" textAnchor="middle" fontSize="7" fill="#8b5cf6" fontFamily="monospace">REG</text>
      </svg>
    );
  }

  if (category === 'ICs') {
    return (
      <svg viewBox="0 0 80 80" style={{ width: '80%', height: '80%' }}>
        <rect x="16" y="20" width="48" height="36" rx="3" fill="none" stroke="#f59e0b" strokeWidth="2"/>
        <rect x="22" y="26" width="36" height="24" rx="2" fill="rgba(245,158,11,0.08)"/>
        <circle cx="20" cy="24" r="2" fill="#f59e0b"/>
        <line x1="8"  y1="29" x2="16" y2="29" stroke="#f59e0b" strokeWidth="1.5"/>
        <line x1="8"  y1="38" x2="16" y2="38" stroke="#f59e0b" strokeWidth="1.5"/>
        <line x1="8"  y1="47" x2="16" y2="47" stroke="#f59e0b" strokeWidth="1.5"/>
        <line x1="64" y1="29" x2="72" y2="29" stroke="#f59e0b" strokeWidth="1.5"/>
        <line x1="64" y1="38" x2="72" y2="38" stroke="#f59e0b" strokeWidth="1.5"/>
        <line x1="64" y1="47" x2="72" y2="47" stroke="#f59e0b" strokeWidth="1.5"/>
        <text x="40" y="42" textAnchor="middle" fontSize="8" fill="#f59e0b" fontFamily="monospace">IC</text>
        <text x="40" y="68" textAnchor="middle" fontSize="7" fill="#f59e0b" fontFamily="monospace">CHIP</text>
      </svg>
    );
  }

  if (category === 'Passives') {
    return (
      <svg viewBox="0 0 80 80" style={{ width: '80%', height: '80%' }}>
        <line x1="8"  y1="40" x2="22" y2="40" stroke="#94a3b8" strokeWidth="2"/>
        <rect x="22" y="30" width="36" height="20" rx="3" fill="rgba(148,163,184,0.12)" stroke="#94a3b8" strokeWidth="2"/>
        <line x1="58" y1="40" x2="72" y2="40" stroke="#94a3b8" strokeWidth="2"/>
        <line x1="31" y1="30" x2="31" y2="50" stroke="#94a3b8" strokeWidth="1" opacity="0.5"/>
        <line x1="40" y1="30" x2="40" y2="50" stroke="#94a3b8" strokeWidth="1" opacity="0.5"/>
        <line x1="49" y1="30" x2="49" y2="50" stroke="#94a3b8" strokeWidth="1" opacity="0.5"/>
        <text x="40" y="68" textAnchor="middle" fontSize="7" fill="#94a3b8" fontFamily="monospace">PASSIVE</text>
      </svg>
    );
  }

  // Generic fallback
  return (
    <svg viewBox="0 0 80 80" style={{ width: '80%', height: '80%' }}>
      <rect x="12" y="12" width="56" height="56" rx="4" fill="none" stroke="#334155" strokeWidth="1.5" strokeDasharray="4,3"/>
      <rect x="24" y="22" width="32" height="26" rx="3" fill="none" stroke="#475569" strokeWidth="1.5"/>
      <line x1="16" y1="34" x2="24" y2="34" stroke="#475569" strokeWidth="1.5"/>
      <line x1="16" y1="40" x2="24" y2="40" stroke="#475569" strokeWidth="1.5"/>
      <line x1="56" y1="34" x2="64" y2="34" stroke="#475569" strokeWidth="1.5"/>
      <line x1="56" y1="40" x2="64" y2="40" stroke="#475569" strokeWidth="1.5"/>
      <text x="40" y="56" textAnchor="middle" fontSize="6" fill="#475569" fontFamily="monospace">
        {(partNumber ?? 'N/A').slice(0, 8)}
      </text>
      <text x="40" y="68" textAnchor="middle" fontSize="6" fill="#334155" fontFamily="monospace">NO IMAGE</text>
    </svg>
  );
}

const CAT_COLORS = {
  'Motor Drivers':     { bg: 'rgba(59,130,246,0.15)',  text: '#60a5fa',  border: 'rgba(59,130,246,0.25)' },
  'Sensors':           { bg: 'rgba(16,185,129,0.15)',  text: '#34d399',  border: 'rgba(16,185,129,0.25)' },
  'Linear Regulators': { bg: 'rgba(139,92,246,0.15)', text: '#c084fc',  border: 'rgba(139,92,246,0.25)' },
  'Microcontrollers':  { bg: 'rgba(34,211,238,0.15)',  text: '#22d3ee',  border: 'rgba(34,211,238,0.25)' },
  'Passives':          { bg: 'rgba(245,158,11,0.15)',  text: '#fbbf24',  border: 'rgba(245,158,11,0.25)' },
  'ICs':               { bg: 'rgba(245,158,11,0.15)',  text: '#fbbf24',  border: 'rgba(245,158,11,0.25)' },
  'Transistors':       { bg: 'rgba(239,68,68,0.15)',   text: '#f87171',  border: 'rgba(239,68,68,0.25)'  },
  'Connectors':        { bg: 'rgba(99,102,241,0.15)',  text: '#818cf8',  border: 'rgba(99,102,241,0.25)' },
};
const DEFAULT_CAT = { bg: 'rgba(34,211,238,0.15)', text: '#22d3ee', border: 'rgba(34,211,238,0.25)' };

export default function ComponentCard({ part, onAddToInventory }) {
  const [imgError, setImgError] = useState(false);
  const cat = CAT_COLORS[part.Category] ?? DEFAULT_CAT;
  const specs = part.ProductAttributes?.slice(0, 3) ?? [];
  const showRealImage = part.ImagePath && !imgError;

  return (
    <div className="glass-card-hover" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Header row */}
      <div style={{ display: 'flex', gap: '1rem' }}>

        {/* Image / SVG placeholder */}
        <div style={{
          width: '5rem', height: '5rem', flexShrink: 0, borderRadius: '0.75rem',
          background: 'rgba(10,22,40,0.6)', border: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
        }}>
          {showRealImage ? (
            <img
              src={part.ImagePath}
              alt={part.ManufacturerPartNumber}
              style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '0.25rem' }}
              onError={() => setImgError(true)}
            />
          ) : (
            <ComponentImagePlaceholder category={part.Category} partNumber={part.ManufacturerPartNumber} />
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: 'var(--font-family-mono)' }}>{part.MouserPartNumber}</p>
              <h3 style={{ fontWeight: 600, color: 'white', fontSize: '0.875rem', lineHeight: 1.3, marginTop: '0.125rem' }}>{part.ManufacturerPartNumber}</h3>
            </div>
            <span style={{ flexShrink: 0, background: cat.bg, color: cat.text, border: `1px solid ${cat.border}`, borderRadius: '9999px', padding: '0.125rem 0.5rem', fontSize: '0.65rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
              {part.Category ?? 'IC'}
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>{part.Manufacturer}</p>
          <div style={{ display: 'flex', gap: '0.375rem', marginTop: '0.375rem', flexWrap: 'wrap' }}>
            {part.LifecycleStatus === 'Active' && <span className="badge badge-green" style={{ fontSize: '0.6rem' }}>Active</span>}
            {part.RoHSStatus?.includes('Compliant') && <span className="badge badge-cyan" style={{ fontSize: '0.6rem' }}>RoHS</span>}
          </div>
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {part.Description}
      </p>

      {/* Key specs */}
      {specs.length > 0 && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.625rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          {specs.map(attr => (
            <div key={attr.AttributeName} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{attr.AttributeName}</span>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-family-mono)', color: '#22d3ee' }}>{attr.AttributeValue}</span>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.25rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        {part.DataSheetUrl && (
          <a href={part.DataSheetUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary"
            style={{ flex: 1, justifyContent: 'center', fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}>
            <DocumentTextIcon style={{ width: '0.875rem', height: '0.875rem' }} /> Datasheet
          </a>
        )}
        <button onClick={() => onAddToInventory(part)} id={`add-to-inv-${part.MouserPartNumber}`} className="btn-primary"
          style={{ flex: 1, justifyContent: 'center', fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}>
          <PlusIcon style={{ width: '0.875rem', height: '0.875rem' }} /> Add to Inventory
        </button>
      </div>
    </div>
  );
}
