import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Check } from 'lucide-react';
import type { Saree } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from './Toast';
import { formatCurrency } from '../../utils/whatsapp';

interface SareeCardProps {
  saree: Saree;
}

export const SareeCard: React.FC<SareeCardProps> = ({ saree }) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const isSaved = isInWishlist(saree.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(saree.id);
    if (!isSaved) {
      showToast(`Added "${saree.title}" to your curated wishlist`, 'wishlist');
    } else {
      showToast(`Removed from wishlist`, 'info');
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(saree, 1);
    showToast(`Added 1 × ${saree.title} to your bag`, 'cart');
  };

  return (
    <article className="saree-card" aria-label={saree.title}>
      <Link to={`/saree/${saree.slug}`} className="card-media">
        <img
          src={saree.images.hero}
          alt={`${saree.title} - Handloom Silk Drape`}
          className="img-main"
          loading="lazy"
        />
        {saree.images.border && (
          <img
            src={saree.images.border}
            alt={`${saree.title} - Close-up Border & Weave`}
            className="img-hover"
            loading="lazy"
          />
        )}

        <div className="card-badges">
          {saree.isVerifiedHandloom && (
            <span className="verified-handloom-pill">
              <Check size={12} /> Verified Handloom
            </span>
          )}
          {saree.stock <= 2 && saree.stock > 0 && (
            <span
              style={{
                backgroundColor: 'rgba(94, 25, 20, 0.9)',
                color: '#FFFFFF',
                fontSize: '0.675rem',
                fontWeight: 600,
                padding: '0.2rem 0.5rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Only {saree.stock} Left
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleWishlistToggle}
          className={`card-wishlist-btn ${isSaved ? 'active' : ''}`}
          aria-label={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart size={16} fill={isSaved ? '#5E1914' : 'none'} color={isSaved ? '#5E1914' : 'currentColor'} />
        </button>
      </Link>

      <div className="card-details">
        <div className="card-origin">{saree.regionalOrigin}</div>
        <h3 className="card-title">
          <Link to={`/saree/${saree.slug}`}>{saree.title}</Link>
        </h3>
        <p className="card-fabric">{saree.fabric}</p>

        <div className="card-footer">
          <div className="card-price">
            <span className="current">{formatCurrency(saree.price)}</span>
            {saree.originalPrice && saree.originalPrice > saree.price && (
              <span className="original">{formatCurrency(saree.originalPrice)}</span>
            )}
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className="quick-add-btn"
            aria-label={`Add ${saree.title} to bag`}
          >
            Add to Bag
          </button>
        </div>
      </div>
    </article>
  );
};
