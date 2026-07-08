// src/pages/LoginPage.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CpuChipIcon } from '@heroicons/react/24/outline';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, loginWithGoogle, currentUser, isDemoMode } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? '/dashboard';

  useEffect(() => {
    if (currentUser) navigate(from, { replace: true });
  }, [currentUser, navigate, from]);

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(getFriendlyError(err.code));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError('');
    try { await loginWithGoogle(); }
    catch { setError('Google sign-in failed. Try email/password.'); }
  }

  const handleDemoLogin = async () => {
    setIsDemo(true);
    await login('demo@roboinvento.dev', 'demo1234');
  };

  return (
    <div className="grid-bg animate-fade-in" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      {/* Glow orbs */}
      <div style={{ position: 'fixed', top: '5rem', left: '33%', width: '20rem', height: '20rem', background: 'rgba(34,211,238,0.05)', borderRadius: '50%', filter: 'blur(3rem)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '5rem', right: '33%', width: '20rem', height: '20rem', background: 'rgba(59,130,246,0.05)', borderRadius: '50%', filter: 'blur(3rem)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '28rem' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <CpuChipIcon style={{ width: '2rem', height: '2rem', color: '#22d3ee' }} />
            <h1 className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 700 }}>RoboInvento</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.25rem' }}>Smart Electronics Inventory</p>
        </div>

        {/* Card */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'white', marginBottom: '1.5rem' }}>Sign In</h2>

          {isDemoMode && (
            <div style={{ marginBottom: '1rem', padding: '0.75rem', borderRadius: '0.75rem', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
              <p style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: 600 }}>⚡ Demo Mode Active</p>
              <p style={{ fontSize: '0.75rem', color: 'rgba(251,191,36,0.7)', marginTop: '0.25rem' }}>No Firebase config detected. Click "Continue as Demo" to explore.</p>
            </div>
          )}

          {error && (
            <div style={{ marginBottom: '1rem', padding: '0.75rem', borderRadius: '0.75rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <p style={{ fontSize: '0.75rem', color: '#f87171' }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="label">Email</label>
              <input id="login-email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="input-field" placeholder="you@example.com" required={!isDemoMode} />
            </div>
            <div>
              <label className="label">Password</label>
              <input id="login-password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="input-field" placeholder="••••••••" required={!isDemoMode} />
            </div>
            <button id="login-submit" type="submit" disabled={loading} className="btn-primary" style={{ justifyContent: 'center', padding: '0.75rem' }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.25rem 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
            <span style={{ fontSize: '0.75rem', color: '#475569' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
          </div>

          <button id="google-login" onClick={handleGoogle} className="btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', marginBottom: '0.75rem' }}>
            <svg style={{ width: '1rem', height: '1rem' }} viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <button id="demo-login" onClick={handleDemoLogin} style={{ width: '100%', textAlign: 'center', fontSize: '0.75rem', color: '#64748b', cursor: 'pointer', padding: '0.5rem', background: 'none', border: 'none', transition: 'color 0.2s' }}
            onMouseOver={e => e.target.style.color='#22d3ee'} onMouseOut={e => e.target.style.color='#64748b'}>
            Continue as Demo User →
          </button>

          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#475569', marginTop: '1.25rem' }}>
            No account? <Link to="/signup" style={{ color: '#22d3ee', fontWeight: 500, textDecoration: 'none' }}>Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function getFriendlyError(code) {
  const map = {
    'auth/user-not-found': 'No account found with that email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/invalid-email': 'Invalid email address.',
    'auth/too-many-requests': 'Too many attempts. Try again later.',
    'auth/invalid-credential': 'Invalid email or password.',
  };
  return map[code] ?? 'Sign in failed. Please try again.';
}
