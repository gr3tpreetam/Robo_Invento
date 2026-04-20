// src/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/outline';

export default function NotFoundPage() {
  return (
    <div className="grid-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div className="animate-fade-in" style={{ textAlign: 'center' }}>
        <p className="text-gradient" style={{ fontSize: '6rem', fontWeight: 700, fontFamily: 'var(--font-family-mono)', marginBottom: '1rem', lineHeight: 1 }}>404</p>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'white', marginBottom: '0.5rem' }}>Page Not Found</h1>
        <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '2rem' }}>This circuit path leads nowhere.</p>
        <Link to="/dashboard" className="btn-primary" style={{ display: 'inline-flex' }}>
          <HomeIcon style={{ width: '1rem', height: '1rem' }} /> Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
