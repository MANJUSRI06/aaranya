import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { loginAdmin, getCurrentAdmin } from '../../services/db';
import { useToast } from '../../components/common/Toast';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    if (getCurrentAdmin()) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const admin = await loginAdmin(email, password);
      showToast(`Welcome back, ${admin.name}`, 'success');
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@aaranya.com');
    setPassword('aaranya2026');
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        backgroundColor: 'var(--bg-ivory)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-xs)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="brand-wordmark" style={{ marginBottom: '1rem' }}>
            <span className="title" style={{ fontSize: '1.75rem' }}>
              AARANYA
            </span>
            <span className="tagline">Atelier Management Portal</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Authorized master curators and administrative personnel only.
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: 'var(--color-maroon-surface)',
              border: '1px solid var(--color-maroon)',
              color: 'var(--color-maroon)',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.85rem',
              marginBottom: '1.5rem',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Mail size={14} /> Administrator Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@aaranya.com"
              className="form-input"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Lock size={14} /> Secure Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="form-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Atelier'} <ArrowRight size={16} />
          </button>

          {/* Quick Demo Credentials Assistant */}
          <div
            style={{
              marginTop: '1rem',
              padding: '1rem',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-gold)',
              borderRadius: 'var(--radius-xs)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--color-forest-dark)', fontWeight: 600, marginBottom: '0.35rem' }}>
              Curator Access Credentials:
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.65rem' }}>
              <code>admin@aaranya.com</code> / <code>aaranya2026</code>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              style={{
                fontSize: '0.75rem',
                color: 'var(--color-forest)',
                textDecoration: 'underline',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Fill Credentials Automatically
            </button>
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            ← Return to Public Storefront
          </Link>
        </div>
      </div>
    </div>
  );
};
