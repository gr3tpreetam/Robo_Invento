// src/components/Navbar.jsx
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useInventory } from '../context/InventoryContext';
import { HomeIcon, MagnifyingGlassIcon, ArrowRightOnRectangleIcon, CpuChipIcon, BellAlertIcon } from '@heroicons/react/24/outline';

const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: HomeIcon },
  { to: '/search', label: 'Search Parts', icon: MagnifyingGlassIcon },
];

export default function Navbar() {
  const { currentUser, logout, isDemoMode } = useAuth();
  const { items } = useInventory();
  const location = useLocation();
  const navigate = useNavigate();

  const lowStockCount = items.filter(i => Number(i.quantity) <= 2).length;

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  const initials = currentUser?.displayName
    ? currentUser.displayName.slice(0, 2).toUpperCase()
    : currentUser?.email?.slice(0, 2).toUpperCase() ?? 'IR';

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(10,22,40,0.80)', backdropFilter: 'blur(12px)' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' }}>

        {/* Logo */}
        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}>
          <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #06b6d4, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-glow-cyan)' }}>
            <CpuChipIcon style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
          </div>
          <div className="hide-mobile">
            <p className="text-gradient" style={{ fontWeight: 700, fontSize: '0.875rem', lineHeight: 1 }}>Inventory Robo</p>
            <p style={{ fontSize: '0.625rem', color: '#64748b', lineHeight: 1, marginTop: '0.125rem' }}>Electronics Manager</p>
          </div>
        </Link>

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {NAV_LINKS.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link key={to} to={to} style={{
                display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 0.875rem', borderRadius: '0.75rem',
                fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none', transition: 'all 0.2s',
                background: active ? 'rgba(34,211,238,0.15)' : 'transparent',
                color: active ? '#22d3ee' : '#94a3b8',
                border: active ? '1px solid rgba(34,211,238,0.25)' : '1px solid transparent',
              }}>
                <Icon style={{ width: '1rem', height: '1rem' }} />
                <span className="hide-mobile">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {isDemoMode && (
            <span className="badge badge-yellow hide-mobile" style={{ fontSize: '0.625rem' }}>DEMO</span>
          )}

          {lowStockCount > 0 && (
            <Link to="/dashboard" style={{ position: 'relative', padding: '0.5rem', borderRadius: '0.75rem', color: '#94a3b8', display: 'flex', textDecoration: 'none' }} title={`${lowStockCount} low-stock items`}>
              <BellAlertIcon style={{ width: '1.25rem', height: '1.25rem' }} />
              <span style={{ position: 'absolute', top: '0.25rem', right: '0.25rem', width: '0.5rem', height: '0.5rem', background: '#fbbf24', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
            </Link>
          )}

          <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'white' }}>
            {initials}
          </div>

          <button id="logout-btn" onClick={handleLogout} title="Sign out"
            style={{ padding: '0.5rem', borderRadius: '0.75rem', color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s', display: 'flex' }}
            onMouseOver={e => e.currentTarget.style.color='#f87171'} onMouseOut={e => e.currentTarget.style.color='#94a3b8'}>
            <ArrowRightOnRectangleIcon style={{ width: '1.25rem', height: '1.25rem' }} />
          </button>
        </div>
      </div>
    </header>
  );
}
