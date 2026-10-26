import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import type { Saree } from '../types';
import { getAllSarees } from '../services/db';
import { useWishlist } from '../context/WishlistContext';
import { SareeCard } from '../components/common/SareeCard';

export const WishlistPage: React.FC = () => {
  const { wishlistIds, clearWishlist, totalWishlist } = useWishlist();
  const [savedSarees, setSavedSarees] = useState<Saree[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllSarees(false).then((all) => {
      const filtered = all.filter((s) => wishlistIds.includes(s.id));
      setSavedSarees(filtered);
      setLoading(false);
    });
  }, [wishlistIds]);

  return (
    <div className="wishlist-page" style={{ padding: '3.5rem 0 6rem 0' }}>
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: '1rem',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          <div>
            <span className="section-tag">Curated Archive</span>
            <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>
              My Saved Sarees ({totalWishlist})
            </h1>
          </div>

          {totalWishlist > 0 && (
            <button
              type="button"
              onClick={clearWishlist}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.85rem',
                color: 'var(--color-maroon)',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              <Trash2 size={16} /> Clear Saved Sarees
            </button>
          )}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--color-forest)' }}>
            Retrieving saved heirloom pieces...
          </div>
        ) : savedSarees.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '6rem 2rem',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-xs)',
              maxWidth: '680px',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-maroon-surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                color: 'var(--color-maroon)',
              }}
            >
              <Heart size={28} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.75rem' }}>
              Your Wishlist is Empty
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
              As you explore our handloom collections, click the heart icon on any saree to save it to your
              private curation for future contemplation.
            </p>
            <Link to="/collection" className="btn-primary">
              Explore Handloom Sarees <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {savedSarees.map((saree) => (
              <SareeCard key={saree.id} saree={saree} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
