// src/pages/DashboardPage.jsx
import { useState, useMemo, useCallback } from 'react';
import { useInventory } from '../context/InventoryContext';
import { useAuth } from '../context/AuthContext';
import InventoryTable from '../components/InventoryTable';
import AddEditModal from '../components/AddEditModal';
import StatsCard from '../components/StatsCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { PlusIcon, CubeIcon, ExclamationTriangleIcon, TagIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const { items, loading, error, addItem, updateItem, deleteItem } = useInventory();
  const { currentUser, isDemoMode } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  const stats = useMemo(() => ({
    totalComponents: items.length,
    totalUnits: items.reduce((sum, i) => sum + Number(i.quantity || 0), 0),
    lowStock: items.filter(i => Number(i.quantity) <= 2).length,
    categories: new Set(items.map(i => i.category).filter(Boolean)).size,
  }), [items]);

  const handleEdit = useCallback((item) => { setEditTarget(item); setModalOpen(true); }, []);
  const handleAdd  = useCallback(() => { setEditTarget(null); setModalOpen(true); }, []);
  const handleSave = useCallback(async (formData) => {
    if (editTarget) await updateItem(editTarget.id, formData);
    else await addItem(formData);
  }, [editTarget, addItem, updateItem]);
  const handleDelete = useCallback(async (id) => { await deleteItem(id); }, [deleteItem]);

  const displayName = currentUser?.displayName?.split(' ')[0] ?? 'there';

  if (loading) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <LoadingSpinner size="lg" text="Loading your inventory..." />
    </div>
  );

  return (
    <div className="animate-fade-in" style={{ maxWidth: '80rem', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>
            Hey, <span className="text-gradient">{displayName}</span> 👋
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.25rem' }}>Your electronics component dashboard</p>
          {isDemoMode && (
            <span className="badge badge-yellow" style={{ fontSize: '0.625rem', marginTop: '0.5rem', display: 'inline-flex' }}>
              ⚡ Demo Mode — data stored locally
            </span>
          )}
        </div>
        <button id="add-component-btn" onClick={handleAdd} className="btn-primary" style={{ flexShrink: 0 }}>
          <PlusIcon style={{ width: '1rem', height: '1rem' }} /> Add Component
        </button>
      </div>

      {/* Error */}
      {error && (
        <div style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '0.75rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ExclamationTriangleIcon style={{ width: '1.25rem', height: '1.25rem', color: '#f87171', flexShrink: 0 }} />
          <p style={{ fontSize: '0.875rem', color: '#f87171' }}>{error}</p>
        </div>
      )}

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(10rem, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <StatsCard title="Total Components" value={stats.totalComponents} icon={CubeIcon} color="cyan" trend="Unique types" />
        <StatsCard title="Total Units" value={stats.totalUnits} icon={ArchiveBoxIcon} color="blue" trend="Across all components" />
        <StatsCard title="Low Stock" value={stats.lowStock} icon={ExclamationTriangleIcon} color={stats.lowStock > 0 ? 'yellow' : 'green'} trend={stats.lowStock > 0 ? 'Qty ≤ 2' : 'All stocked!'} />
        <StatsCard title="Categories" value={stats.categories} icon={TagIcon} color="purple" trend="Component families" />
      </div>

      {/* Category chart */}
      {items.length > 0 && <CategoryBreakdown items={items} />}

      {/* Table */}
      <div style={{ marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'white' }}>
            Inventory <span style={{ color: '#475569', fontSize: '0.875rem', fontWeight: 400 }}>({items.length})</span>
          </h2>
        </div>
        <InventoryTable items={items} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      <AddEditModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} editItem={editTarget} />
    </div>
  );
}

function CategoryBreakdown({ items }) {
  const cats = useMemo(() => {
    const counts = {};
    items.forEach(i => { const c = i.category ?? 'Other'; counts[c] = (counts[c] ?? 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [items]);

  if (!cats.length) return null;
  const max = cats[0][1];
  const COLORS = ['#06b6d4','#3b82f6','#8b5cf6','#10b981','#f59e0b'];

  return (
    <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '0.5rem' }}>
      <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>Top Categories</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {cats.map(([cat, count], i) => (
          <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', width: '9rem', flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cat}</span>
            <div style={{ flex: 1, height: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: COLORS[i % COLORS.length], borderRadius: '9999px', width: `${(count/max)*100}%`, transition: 'width 0.7s ease' }} />
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-family-mono)', color: '#475569', width: '1.5rem', textAlign: 'right' }}>{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
