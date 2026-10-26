import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ShieldAlert, ArrowRight } from 'lucide-react';
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
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div className="brand-wordmark" style={{ marginBottom: '1rem' }}>
            <span className="title" style={{ fontSize: '1.75rem' }}>
              AARANYA
            </span>
            <span className="tagline">Atelier Management Portal</span>
          </div>
        </div>

        {/* Prominent Admin-Only Access Restriction Banner */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            padding: '0.9rem 1.1rem',
            backgroundColor: 'var(--color-maroon-surface)',
            border: '1px solid #E8C4C0',
            borderRadius: 'var(--radius-xs)',
            marginBottom: '1.75rem',
            textAlign: 'left',
          }}
        >
          <ShieldAlert size={20} color="var(--color-maroon)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: '0.85rem',
                color: 'var(--color-maroon-dark)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Only Admin Can Access This
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginTop: '0.25rem' }}>
              This portal is strictly restricted to authorized administrators and curators. Sign in with your assigned administrative credentials.
            </div>
          </div>
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
              placeholder="Enter administrator email"
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
            {loading ? 'Authenticating...' : 'Sign In as Administrator'} <ArrowRight size={16} />
          </button>
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
