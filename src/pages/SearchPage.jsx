// src/pages/SearchPage.jsx
import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { useMouserSearch } from '../hooks/useMouserSearch';
import { useInventory } from '../context/InventoryContext';
import ComponentCard from '../components/ComponentCard';
import AddEditModal from '../components/AddEditModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { MagnifyingGlassIcon, XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';

const QUICK_SEARCHES = ['L298N','LM317','HC-SR04','ESP32','Arduino Nano','NE555','LM741','MOSFET','Relay Module','MPU6050'];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [addPrefill, setAddPrefill] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const searchInputRef = useRef(null);

  const debouncedQuery = useDebounce(query, 500);
  const { results, loading, error } = useMouserSearch(debouncedQuery);
  const { addItem } = useInventory();
  const navigate = useNavigate();

  const handleClear = useCallback(() => { setQuery(''); searchInputRef.current?.focus(); }, []);

  const handleAddToInventory = useCallback((part) => {
    setAddPrefill({
      name: part.ManufacturerPartNumber ?? '', partNumber: part.ManufacturerPartNumber ?? '',
      manufacturer: part.Manufacturer ?? '', category: part.Category ?? 'Other',
      quantity: 1, datasheetUrl: part.DataSheetUrl ?? '', imageUrl: part.ImagePath ?? '',
      notes: part.Description?.slice(0, 100) ?? '',
    });
    setModalOpen(true);
  }, []);

  const handleSave = useCallback(async (formData) => {
    await addItem(formData);
    navigate('/dashboard');
  }, [addItem, navigate]);

  const hasResults = results.length > 0;
  const isTyping = query.length > 0 && query !== debouncedQuery;
  const isDemoMode = !import.meta.env.VITE_MOUSER_API_KEY || import.meta.env.VITE_MOUSER_API_KEY === 'your_mouser_api_key_here';

  return (
    <div className="animate-fade-in" style={{ maxWidth: '80rem', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <SparklesIcon style={{ width: '1.25rem', height: '1.25rem', color: '#22d3ee' }} />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>Search Parts</h1>
        </div>
        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Search the Mouser Electronics catalog — get specs, images, and datasheets instantly</p>
      </div>

      {/* Search bar */}
      <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
        <MagnifyingGlassIcon style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '1.25rem', height: '1.25rem', color: '#64748b' }} />
        <input ref={searchInputRef} id="mouser-search-input" type="search" value={query} onChange={e => setQuery(e.target.value)}
          className="input-field" placeholder="Search components e.g. L298N, ESP32, HC-SR04..."
          style={{ paddingLeft: '3rem', paddingRight: '3rem', paddingTop: '1rem', paddingBottom: '1rem', fontSize: '1rem' }} autoFocus />
        {query && (
          <button onClick={handleClear} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
            <XMarkIcon style={{ width: '1rem', height: '1rem' }} />
          </button>
        )}
      </div>

      {/* Quick searches */}
      {!query && (
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.65rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '0.75rem' }}>Popular Searches</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {QUICK_SEARCHES.map(term => (
              <button key={term} id={`quick-search-${term}`} onClick={() => setQuery(term)}
                style={{ padding: '0.375rem 0.875rem', borderRadius: '0.75rem', fontSize: '0.75rem', fontFamily: 'var(--font-family-mono)', fontWeight: 500,
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseOver={e => { e.currentTarget.style.color='#22d3ee'; e.currentTarget.style.borderColor='rgba(34,211,238,0.3)'; e.currentTarget.style.background='rgba(34,211,238,0.05)'; }}
                onMouseOut={e => { e.currentTarget.style.color='#94a3b8'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; e.currentTarget.style.background='rgba(255,255,255,0.05)'; }}>
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Demo notice */}
      {isDemoMode && (
        <div style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '0.75rem', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <SparklesIcon style={{ width: '1.25rem', height: '1.25rem', color: '#60a5fa', flexShrink: 0, marginTop: '0.125rem' }} />
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#93c5fd' }}>Running in Demo Mode</p>
            <p style={{ fontSize: '0.75rem', color: 'rgba(147,197,253,0.7)', marginTop: '0.25rem' }}>
              Add your <code style={{ fontFamily: 'var(--font-family-mono)', background: 'rgba(59,130,246,0.1)', padding: '0.125rem 0.25rem', borderRadius: '0.25rem' }}>VITE_MOUSER_API_KEY</code> to{' '}
              <code style={{ fontFamily: 'var(--font-family-mono)', background: 'rgba(59,130,246,0.1)', padding: '0.125rem 0.25rem', borderRadius: '0.25rem' }}>.env</code> for real data. Try searching "L298N".
            </p>
          </div>
        </div>
      )}

      {/* Loading */}
      {(loading || isTyping) && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
          <LoadingSpinner size="md" text="Searching Mouser catalog..." />
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <p style={{ color: '#f87171', fontSize: '0.875rem' }}>{error}</p>
          <p style={{ color: '#475569', fontSize: '0.75rem', marginTop: '0.25rem' }}>Check your API key in .env</p>
        </div>
      )}

      {/* Results */}
      {hasResults && !loading && !isTyping && (
        <>
          <p style={{ fontSize: '0.75rem', color: '#475569', marginBottom: '1rem', fontWeight: 500 }}>
            {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{debouncedQuery}&quot;
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(20rem, 1fr))', gap: '1.25rem' }}>
            {results.map((part, idx) => (
              <ComponentCard key={`${part.MouserPartNumber}-${idx}`} part={part} onAddToInventory={handleAddToInventory} />
            ))}
          </div>
        </>
      )}

      {/* No results */}
      {!hasResults && !loading && !isTyping && debouncedQuery.length >= 2 && (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <div style={{ width: '4rem', height: '4rem', margin: '0 auto 1rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MagnifyingGlassIcon style={{ width: '2rem', height: '2rem', color: '#334155' }} />
          </div>
          <p style={{ color: '#94a3b8', fontWeight: 500 }}>No results for &quot;{debouncedQuery}&quot;</p>
          <p style={{ color: '#475569', fontSize: '0.875rem', marginTop: '0.25rem' }}>Try a different part number or keyword</p>
        </div>
      )}

      <AddEditModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} editItem={addPrefill} />
    </div>
  );
}
