import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ArrowRight, MessageCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency, generateCartWhatsAppUrl, openWhatsAppAction } from '../../utils/whatsapp';
import { brandConfig } from '../../config/brand.config';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    totalItems,
    subtotal,
    shippingFee,
    estimatedTotal,
    freeShippingRemaining,
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const threshold = brandConfig.shipping.freeShippingThreshold;
  const progressPercent = Math.min(100, Math.round((subtotal / threshold) * 100));

  const handleWhatsAppCheckout = () => {
    const url = generateCartWhatsAppUrl(items, subtotal, shippingFee, estimatedTotal);
    openWhatsAppAction(url);
  };

  const handleProceedToBag = () => {
    closeCart();
    navigate('/bag');
  };

  return (
    <>
      <div className="drawer-backdrop" onClick={closeCart} aria-hidden="true" />
      <aside className="drawer-panel" role="dialog" aria-modal="true" aria-label="Shopping Bag">
        {/* Header */}
        <div className="drawer-header">
          <h2 className="drawer-title">Shopping Bag ({totalItems})</h2>
          <button
            type="button"
            onClick={closeCart}
            className="icon-btn"
            aria-label="Close bag drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div style={{ padding: '1rem 1.5rem 0 1.5rem' }}>
          <div className="shipping-meter-box">
            <div className="shipping-meter-text">
              {freeShippingRemaining > 0 ? (
                <>
                  Add <strong>{formatCurrency(freeShippingRemaining)}</strong> more for complimentary
                  pan-India insured delivery
                </>
              ) : (
                <>✨ Complimentary Pan-India Insured Delivery Unlocked</>
              )}
            </div>
            <div className="shipping-meter-track">
              <div
                className="shipping-meter-bar"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Bag Content */}
        <div className="drawer-body">
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-gold-surface)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto',
                  color: 'var(--color-gold-dark)',
                }}
              >
                <ArrowRight size={24} />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.45rem',
                  marginBottom: '0.65rem',
                }}
              >
                Your bag is empty
              </h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1.75rem' }}>
                Every thread carries a story. Discover our curated heirloom sarees handwoven across
                India's heritage clusters.
              </p>
              <button
                type="button"
                onClick={() => {
                  closeCart();
                  navigate('/collection');
                }}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                Explore Sarees
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {items.map((item) => (
                <div
                  key={item.saree.id}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    paddingBottom: '1.25rem',
                    borderBottom: '1px solid var(--border-light)',
                  }}
                >
                  <Link
                    to={`/saree/${item.saree.slug}`}
                    onClick={closeCart}
                    style={{
                      width: '78px',
                      height: '102px',
                      flexShrink: 0,
                      borderRadius: 'var(--radius-xs)',
                      overflow: 'hidden',
                      backgroundColor: 'var(--bg-surface)',
                    }}
                  >
                    <img
                      src={item.saree.images.hero}
                      alt={item.saree.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Link>

                  <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Link
                        to={`/saree/${item.saree.slug}`}
                        onClick={closeCart}
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.05rem',
                          fontWeight: 600,
                          color: 'var(--color-forest-dark)',
                          lineHeight: 1.25,
                        }}
                      >
                        {item.saree.title}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeItem(item.saree.id)}
                        style={{ color: 'var(--text-muted)', padding: '2px', marginLeft: '0.5rem' }}
                        aria-label={`Remove ${item.saree.title}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'var(--color-gold-dark)', margin: '0.2rem 0' }}>
                      {item.saree.regionalOrigin}
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>
                      {item.selectedBlouseOption || 'Unstitched Blouse Piece Included'}
                    </div>

                    <div
                      style={{
                        marginTop: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          border: '1px solid var(--border-light)',
                          borderRadius: 'var(--radius-xs)',
                          backgroundColor: '#FFFFFF',
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.saree.id, item.quantity - 1)}
                          style={{ padding: '0.3rem 0.55rem', color: 'var(--text-secondary)' }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, minWidth: '1.75rem', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.saree.id, item.quantity + 1)}
                          style={{ padding: '0.3rem 0.55rem', color: 'var(--text-secondary)' }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <div style={{ fontWeight: 600, color: 'var(--color-forest-dark)', fontSize: '0.95rem' }}>
                        {formatCurrency(item.saree.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="drawer-footer">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Items Subtotal</span>
              <span style={{ fontWeight: 600 }}>{formatCurrency(subtotal)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.95rem', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Insured Delivery</span>
              <span style={{ fontWeight: 600, color: shippingFee === 0 ? 'var(--color-forest)' : 'inherit' }}>
                {shippingFee === 0 ? 'Complimentary' : formatCurrency(shippingFee)}
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '0.85rem',
                borderTop: '1px solid var(--border-light)',
                marginBottom: '1.25rem',
              }}
            >
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 600 }}>
                Estimated Total
              </span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-forest-dark)' }}>
                {formatCurrency(estimatedTotal)}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                className="btn-whatsapp"
                style={{ width: '100%' }}
              >
                <MessageCircle size={18} />
                Order via WhatsApp Concierge
              </button>

              <button
                type="button"
                onClick={handleProceedToBag}
                className="btn-secondary"
                style={{ width: '100%' }}
              >
                Review Bag & Checkout
              </button>
            </div>

            <p
              style={{
                fontSize: '0.725rem',
                textAlign: 'center',
                color: 'var(--text-muted)',
                marginTop: '0.85rem',
                lineHeight: 1.4,
              }}
            >
              Clicking opens WhatsApp with your pre-formatted order summary. Our concierge confirms loom
              availability before payment.
            </p>
          </div>
        )}
      </aside>
    </>
  );
};
