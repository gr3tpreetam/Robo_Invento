// src/components/InventoryTable.jsx
import { useState, useMemo, useCallback } from 'react';
import { PencilIcon, TrashIcon, DocumentTextIcon, ChevronUpDownIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const CAT_BADGES = {
  'Motor Drivers':         'badge-blue',
  'Sensors':               'badge-green',
  'Linear Regulators':     'badge-purple',
  'Microcontrollers':      'badge-cyan',
  'Passives':              'badge-yellow',
  'Communication Modules': 'badge-blue',
  'Displays':              'badge-purple',
  'Power Management':      'badge-red',
};

function QuantityBadge({ qty }) {
  const n = Number(qty);
  if (n === 0) return <span className="badge badge-red">{n}</span>;
  if (n <= 2)  return <span className="badge badge-yellow">{n}</span>;
  return <span className="badge badge-green">{n}</span>;
}

export default function InventoryTable({ items, onEdit, onDelete }) {
  const [sortField, setSortField] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const categories = useMemo(() => {
    return [...new Set(items.map(i => i.category).filter(Boolean))].sort();
  }, [items]);

  const displayedItems = useMemo(() => {
    let result = items;
    if (filter.trim()) {
      const q = filter.toLowerCase();
      result = result.filter(i =>
        i.name?.toLowerCase().includes(q) || i.partNumber?.toLowerCase().includes(q) ||
        i.manufacturer?.toLowerCase().includes(q) || i.location?.toLowerCase().includes(q)
      );
    }
    if (categoryFilter) result = result.filter(i => i.category === categoryFilter);
    result = [...result].sort((a, b) => {
      let av = a[sortField] ?? ''; let bv = b[sortField] ?? '';
      if (sortField === 'quantity') { av = Number(av); bv = Number(bv); }
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return result;
  }, [items, filter, categoryFilter, sortField, sortDir]);

  const handleSort = useCallback((field) => {
    setSortField(prev => {
      if (prev === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
      else setSortDir('asc');
      return field;
    });
  }, []);

  const handleDeleteConfirm = useCallback(async (id) => {
    await onDelete(id);
    setDeleteConfirm(null);
  }, [onDelete]);

  const th = { padding: '0.75rem 1rem', fontSize: '0.65rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'left', whiteSpace: 'nowrap' };
  const td = { padding: '0.75rem 1rem', borderTop: '1px solid rgba(255,255,255,0.03)' };

  return (
    <div className="glass-card" style={{ overflow: 'hidden' }}>
      {/* Toolbar */}
      <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        <input id="inventory-search" type="search" value={filter} onChange={e => setFilter(e.target.value)}
          className="input-field" placeholder="Search by name, part #, location..." style={{ flex: 1, minWidth: '12rem', padding: '0.5rem 1rem' }} />
        <select id="category-filter" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
          className="input-field" style={{ width: '11rem', padding: '0.5rem 1rem' }}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Empty */}
      {displayedItems.length === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 1rem', gap: '0.75rem', color: '#475569' }}>
          <div style={{ width: '4rem', height: '4rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ExclamationTriangleIcon style={{ width: '2rem', height: '2rem', opacity: 0.4 }} />
          </div>
          <p style={{ fontWeight: 500 }}>No components found</p>
          <p style={{ fontSize: '0.75rem' }}>{filter || categoryFilter ? 'Try clearing your filters' : 'Add your first component!'}</p>
        </div>
      )}

      {/* Table */}
      {displayedItems.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: '0.875rem', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {[{f:'name',l:'Component'},{f:'category',l:'Category'},{f:'quantity',l:'Qty'},{f:'location',l:'Location'},{f:null,l:'Actions'}].map(({f,l}) => (
                  <th key={l} style={th}>
                    {f ? (
                      <button onClick={() => handleSort(f)} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: sortField===f ? '#22d3ee' : '#64748b', background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {l} <ChevronUpDownIcon style={{ width: '0.875rem', height: '0.875rem', transform: sortField===f && sortDir==='desc' ? 'scaleY(-1)' : undefined }} />
                      </button>
                    ) : l}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedItems.map(item => (
                <tr key={item.id} style={{ transition: 'background 0.2s' }}
                  onMouseOver={e => e.currentTarget.style.background='rgba(255,255,255,0.02)'}
                  onMouseOut={e => e.currentTarget.style.background='transparent'}>
                  <td style={td}>
                    <div>
                      <p style={{ fontWeight: 500, color: 'white' }}>{item.name}</p>
                      {item.partNumber && <p style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-family-mono)' }}>{item.partNumber}</p>}
                    </div>
                  </td>
                  <td style={td}><span className={`${CAT_BADGES[item.category] ?? 'badge-cyan'} badge`}>{item.category ?? '—'}</span></td>
                  <td style={td}><QuantityBadge qty={item.quantity} /></td>
                  <td style={{ ...td, fontFamily: 'var(--font-family-mono)', fontSize: '0.75rem', color: '#94a3b8' }}>{item.location || '—'}</td>
                  <td style={td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      {item.datasheetUrl && (
                        <a href={item.datasheetUrl} target="_blank" rel="noopener noreferrer" title="Open datasheet"
                          style={{ padding: '0.375rem', borderRadius: '0.5rem', color: '#64748b', display: 'flex', transition: 'color 0.2s' }}
                          onMouseOver={e => e.currentTarget.style.color='#22d3ee'} onMouseOut={e => e.currentTarget.style.color='#64748b'}>
                          <DocumentTextIcon style={{ width: '1rem', height: '1rem' }} />
                        </a>
                      )}
                      <button onClick={() => onEdit(item)} id={`edit-${item.id}`} title="Edit"
                        style={{ padding: '0.375rem', borderRadius: '0.5rem', color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', transition: 'color 0.2s' }}
                        onMouseOver={e => e.currentTarget.style.color='#60a5fa'} onMouseOut={e => e.currentTarget.style.color='#64748b'}>
                        <PencilIcon style={{ width: '1rem', height: '1rem' }} />
                      </button>
                      {deleteConfirm === item.id ? (
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                          <button onClick={() => handleDeleteConfirm(item.id)} style={{ padding: '0.25rem 0.5rem', borderRadius: '0.5rem', fontSize: '0.75rem', background: 'rgba(239,68,68,0.2)', color: '#f87171', border: 'none', cursor: 'pointer' }}>Confirm</button>
                          <button onClick={() => setDeleteConfirm(null)} style={{ padding: '0.25rem 0.5rem', borderRadius: '0.5rem', fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: 'none', cursor: 'pointer' }}>Cancel</button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(item.id)} id={`delete-${item.id}`} title="Delete"
                          style={{ padding: '0.375rem', borderRadius: '0.5rem', color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', transition: 'color 0.2s' }}
                          onMouseOver={e => e.currentTarget.style.color='#f87171'} onMouseOut={e => e.currentTarget.style.color='#64748b'}>
                          <TrashIcon style={{ width: '1rem', height: '1rem' }} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {items.length > 0 && (
        <div style={{ padding: '0.625rem 1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ fontSize: '0.75rem', color: '#334155' }}>Showing {displayedItems.length} of {items.length} components</p>
        </div>
      )}
    </div>
  );
}
