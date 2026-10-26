import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import type { Saree } from '../../types';
import { getAllSarees } from '../../services/db';
import { formatCurrency } from '../../utils/whatsapp';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [allSarees, setAllSarees] = useState<Saree[]>([]);
  const [results, setResults] = useState<Saree[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      getAllSarees(false).then(setAllSarees);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setResults([]);
      return;
    }
    const filtered = allSarees.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.fabric.toLowerCase().includes(q) ||
        s.color.toLowerCase().includes(q) ||
        s.regionalOrigin.toLowerCase().includes(q) ||
        s.weavingTechnique.toLowerCase().includes(q) ||
        s.clusterName.toLowerCase().includes(q)
    );
    setResults(filtered.slice(0, 6));
  }, [query, allSarees]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="drawer-backdrop"
        onClick={onClose}
        style={{ zIndex: 1100 }}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search sarees"
        style={{
          position: 'fixed',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '680px',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-sm)',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 1101,
          overflow: 'hidden',
          animation: 'fadeIn 200ms ease-out',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-light)',
            gap: '1rem',
          }}
        >
          <Search size={22} color="var(--color-gold-dark)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by fabric, region (e.g. Kanchipuram, Banarasi), color, or weave..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flexGrow: 1,
              border: 'none',
              outline: 'none',
              fontSize: '1.05rem',
              fontFamily: 'var(--font-sans)',
              color: 'var(--text-main)',
            }}
          />
          <button
            type="button"
            onClick={onClose}
            className="icon-btn"
            style={{ width: '2rem', height: '2rem' }}
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Suggestions when empty */}
        {!query && (
          <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-ivory)' }}>
            <div
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-gold-dark)',
                fontWeight: 600,
                marginBottom: '0.75rem',
              }}
            >
              Popular Handloom Searches
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['Kanjeevaram Silk', 'Banarasi Brocade', 'Chanderi Cotton', 'Tussar Wild Silk', 'Phulia Jamdani', 'Temple Border'].map(
                (term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                    }}
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Results */}
        {query && (
          <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '1rem' }}>
            {results.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                No handloom sarees found matching "{query}". Try searching by fabric (e.g. Silk, Muslin) or origin.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {results.map((saree) => (
                  <div
                    key={saree.id}
                    onClick={() => {
                      onClose();
                      navigate(`/saree/${saree.slug}`);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.65rem',
                      borderRadius: 'var(--radius-xs)',
                      cursor: 'pointer',
                      transition: 'background-color 150ms ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-ivory)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <img
                      src={saree.images.hero}
                      alt={saree.title}
                      style={{
                        width: '48px',
                        height: '64px',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-xs)',
                      }}
                    />
                    <div style={{ flexGrow: 1 }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.05rem',
                          fontWeight: 600,
                          color: 'var(--color-forest-dark)',
                        }}
                      >
                        {saree.title}
                      </div>
                      <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                        {saree.fabric} • {saree.regionalOrigin}
                      </div>
                    </div>
                    <div style={{ fontWeight: 600, color: 'var(--color-forest-dark)', fontSize: '0.95rem' }}>
                      {formatCurrency(saree.price)}
                    </div>
                    <ArrowRight size={16} color="var(--color-gold-dark)" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
