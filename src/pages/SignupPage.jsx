// src/pages/SignupPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CpuChipIcon } from '@heroicons/react/24/outline';

export default function SignupPage() {
  const [form, setForm] = useState({ displayName: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) return setError('Passwords do not match.');
    if (form.password.length < 6) return setError('Password must be at least 6 characters.');
    setLoading(true);
    try {
      await signup(form.email, form.password, form.displayName);
      navigate('/dashboard');
    } catch (err) {
      const map = {
        'auth/email-already-in-use': 'An account with this email already exists.',
        'auth/invalid-email': 'Invalid email address.',
        'auth/weak-password': 'Password is too weak.',
      };
      setError(map[err.code] ?? 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid-bg animate-fade-in" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ position: 'fixed', top: '5rem', right: '33%', width: '20rem', height: '20rem', background: 'rgba(139,92,246,0.05)', borderRadius: '50%', filter: 'blur(3rem)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '28rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <CpuChipIcon style={{ width: '2rem', height: '2rem', color: '#22d3ee' }} />
            <h1 className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 700 }}>RoboInvento</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.25rem' }}>Create your account</p>
        </div>

        <div className="glass-card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'white', marginBottom: '1.5rem' }}>Sign Up</h2>

          {error && (
            <div style={{ marginBottom: '1rem', padding: '0.75rem', borderRadius: '0.75rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <p style={{ fontSize: '0.75rem', color: '#f87171' }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="label">Full Name</label>
              <input id="signup-name" name="displayName" value={form.displayName} onChange={handleChange} className="input-field" placeholder="Your Name" required />
            </div>
            <div>
              <label className="label">Email</label>
              <input id="signup-email" name="email" type="email" value={form.email} onChange={handleChange} className="input-field" placeholder="you@example.com" required />
            </div>
            <div>
              <label className="label">Password</label>
              <input id="signup-password" name="password" type="password" value={form.password} onChange={handleChange} className="input-field" placeholder="Min. 6 characters" required />
            </div>
            <div>
              <label className="label">Confirm Password</label>
              <input id="signup-confirm" name="confirm" type="password" value={form.confirm} onChange={handleChange} className="input-field" placeholder="Repeat password" required />
            </div>
            <button id="signup-submit" type="submit" disabled={loading} className="btn-primary" style={{ justifyContent: 'center', padding: '0.75rem' }}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#475569', marginTop: '1.25rem' }}>
            Have an account? <Link to="/login" style={{ color: '#22d3ee', fontWeight: 500, textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
