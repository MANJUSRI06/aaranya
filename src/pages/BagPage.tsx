import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  ShieldCheck,
  Check,
  ArrowRight,
  Package,
  Sparkles,
  Truck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency, generateCartWhatsAppUrl, openWhatsAppAction } from '../utils/whatsapp';
import { brandConfig } from '../config/brand.config';

export const BagPage: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    shippingFee,
    estimatedTotal,
    freeShippingRemaining,
  } = useCart();

  // Customer Delivery details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [giftNote, setGiftNote] = useState('');

  // Simulated Order Success Modal
  const [orderConfirmed, setOrderConfirmed] = useState<string | null>(null);

  if (items.length === 0 && !orderConfirmed) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '1rem' }}>
          Your Bag is Empty
        </h1>
        <p style={{ maxWidth: '520px', margin: '0 auto 2rem auto', color: 'var(--text-secondary)' }}>
          Every thread carries a story. Explore our authentic handloom collections and discover sarees
          woven with generational craftsmanship.
        </p>
        <Link to="/collection" className="btn-primary">
          Explore Handloom Sarees <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const handleWhatsAppCheckout = () => {
    let note = giftNote.trim();
    if (customerName || city) {
      note = `Deliver to: ${customerName}, ${shippingAddress}, ${city} - ${pincode} (Tel: ${customerPhone}). ${note}`;
    }
    const url = generateCartWhatsAppUrl(items, subtotal, shippingFee, estimatedTotal, note);
    openWhatsAppAction(url);
  };

  const handleSimulatedOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderRef = `AAR-${Date.now().toString().slice(-6)}`;
    setOrderConfirmed(orderRef);
    clearCart();
  };

  if (orderConfirmed) {
    return (
      <div className="container" style={{ padding: '6rem 0', maxWidth: '680px', textAlign: 'center' }}>
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-forest-surface)',
            color: 'var(--color-forest)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
            border: '2px solid var(--color-forest)',
          }}
        >
          <Check size={36} />
        </div>
        <span className="section-tag">Order Received</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.75rem', marginBottom: '0.75rem' }}>
          Thank You for Cherishing Handloom
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Your bespoke order reference is <strong>{orderConfirmed}</strong>. Our atelier team will inspect
          and prepare your handloom pieces with certified Silk Mark labels and signature wooden gift packaging.
        </p>
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-gold)',
            borderRadius: 'var(--radius-xs)',
            padding: '1.5rem',
            marginBottom: '2.5rem',
            textAlign: 'left',
          }}
        >
          <div style={{ fontWeight: 600, color: 'var(--color-forest-dark)', marginBottom: '0.5rem' }}>
            Next Steps in Your Heirloom's Journey:
          </div>
          <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <li>Weaver inspection and quality certification: 24 hours</li>
            <li>Hand-wrapping in breathable unbleached muslin cloth with organic bay leaves</li>
            <li>Insured door-to-door courier dispatch with live tracking notification</li>
          </ul>
        </div>
        <Link to="/collection" className="btn-primary">
          Continue Exploring Sarees
        </Link>
      </div>
    );
  }

  return (
    <div className="bag-page" style={{ padding: '3.5rem 0 6rem 0' }}>
      <div className="container">
        <div style={{ marginBottom: '3rem' }}>
          <span className="section-tag">Checkout Concierge</span>
          <h1 className="section-title">Review Your Shopping Bag</h1>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '3.5rem',
            alignItems: 'flex-start',
          }}
        >
          {/* LEFT: ITEM LIST */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
              {items.map((item) => (
                <div
                  key={item.saree.id}
                  style={{
                    display: 'flex',
                    gap: '1.25rem',
                    padding: '1.5rem',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-xs)',
                  }}
                >
                  <Link
                    to={`/saree/${item.saree.slug}`}
                    style={{
                      width: '100px',
                      height: '130px',
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
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.25rem',
                          fontWeight: 600,
                          color: 'var(--color-forest-dark)',
                        }}
                      >
                        {item.saree.title}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeItem(item.saree.id)}
                        style={{ color: 'var(--text-muted)' }}
                        aria-label={`Remove ${item.saree.title}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--color-gold-dark)', margin: '0.25rem 0' }}>
                      {item.saree.regionalOrigin} • {item.saree.fabric}
                    </div>

                    <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
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
                      {/* Quantity Controls */}
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
                          style={{ padding: '0.35rem 0.65rem' }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, minWidth: '2rem', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.saree.id, item.quantity + 1)}
                          style={{ padding: '0.35rem 0.65rem' }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--color-forest-dark)' }}>
                        {formatCurrency(item.saree.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Details Form */}
            <form
              onSubmit={handleSimulatedOrder}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xs)',
                padding: '2rem',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1.25rem' }}>
                Delivery Destination & Patron Information
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Manjusri Devi"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">WhatsApp Contact Number *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Shipping Address *</label>
                <input
                  type="text"
                  required
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Street, Residence or Villa"
                  className="form-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Bengaluru"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Postal Pincode *</label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="560001"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Personalized Keepsake / Gift Message (Optional)</label>
                <textarea
                  rows={2}
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="Special instructions for unbleached gift box or anniversary note..."
                  className="form-textarea"
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                Place Order with Atelier Confirmation
              </button>
            </form>
          </div>

          {/* RIGHT: ORDER SUMMARY & WHATSAPP DIRECT */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-xs)',
              padding: '2rem',
              position: 'sticky',
              top: '6rem',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1.25rem' }}>
              Order Summary
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Items Subtotal</span>
                <span style={{ fontWeight: 600 }}>{formatCurrency(subtotal)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Insured Delivery</span>
                <span style={{ fontWeight: 600, color: shippingFee === 0 ? 'var(--color-forest)' : 'inherit' }}>
                  {shippingFee === 0 ? 'Complimentary' : formatCurrency(shippingFee)}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-light)',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.45rem',
                  fontWeight: 700,
                  color: 'var(--color-forest-dark)',
                }}
              >
                <span>Estimated Total</span>
                <span>{formatCurrency(estimatedTotal)}</span>
              </div>
            </div>

            {/* WhatsApp Ordering Primary CTA */}
            <div
              style={{
                backgroundColor: 'var(--color-forest-surface)',
                border: '1px solid #C5DBD0',
                borderRadius: 'var(--radius-xs)',
                padding: '1.25rem',
                marginBottom: '1.5rem',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-forest-dark)', marginBottom: '0.35rem' }}>
                Recommended: Instant WhatsApp Order
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                Receive immediate confirmation from our master concierge with photos of the finished drape before
                payment.
              </p>
              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                className="btn-whatsapp"
                style={{ width: '100%' }}
              >
                <MessageCircle size={18} />
                Order via WhatsApp Concierge
              </button>
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.4 }}>
              WhatsApp messages are generated for your review. Sending the message connects you directly with our
              Atelier concierge team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
