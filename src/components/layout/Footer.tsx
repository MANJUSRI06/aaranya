import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { brandConfig } from '../../config/brand.config';
import { openWhatsAppAction } from '../../utils/whatsapp';
import { useToast } from '../common/Toast';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const { showToast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consent) {
      showToast('Please provide your email and agree to receive updates.', 'info');
      return;
    }
    showToast('Thank you for subscribing to the Aaranya Heritage Dispatch.', 'success');
    setEmail('');
    setConsent(false);
  };

  const handleDirectWhatsAppConcierge = () => {
    const cleanNumber = brandConfig.whatsapp.phoneNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `*Namaste AARANYA Team,*\n\nI would like to enquire about your handloom saree collections, bespoke weaving orders, or atelier visits.\n\nThank you!`
    );
    openWhatsAppAction(`https://wa.me/${cleanNumber}?text=${message}`);
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-forest-dark)',
        color: 'var(--bg-ivory)',
        borderTop: '2px solid var(--color-gold)',
        paddingTop: '4.5rem',
        paddingBottom: '2.5rem',
      }}
    >
      <div className="container">
        {/* Main Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Brand Manifesto */}
          <div style={{ maxWidth: '320px' }}>
            <div className="brand-wordmark" style={{ alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <span className="title" style={{ color: '#FFFFFF', fontSize: '1.85rem' }}>
                AARANYA
              </span>
              <span className="tagline" style={{ color: 'var(--color-gold-light)', fontSize: '0.75rem' }}>
                Woven by Tradition
              </span>
            </div>
            <p style={{ color: '#C8DBD0', fontSize: '0.925rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Every thread carries a story. Every saree reflects a tradition. A saree-only sanctuary
              celebrating ancestral Indian weaving, master artisans, and timeless textiles.
            </p>
            <button
              type="button"
              onClick={handleDirectWhatsAppConcierge}
              className="btn-whatsapp"
              style={{ padding: '0.75rem 1.25rem', fontSize: '0.8rem' }}
            >
              <MessageCircle size={16} />
              WhatsApp Concierge
            </button>
          </div>

          {/* Saree Collections */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-brand)',
                fontSize: '0.85rem',
                letterSpacing: '0.14em',
                color: 'var(--color-gold-light)',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
                fontWeight: 600,
              }}
            >
              Heirloom Collections
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>
                <Link to="/collection" style={{ color: '#E1ECE6', fontSize: '0.9rem' }}>
                  All Sarees
                </Link>
              </li>
              <li>
                <Link to="/collection/silk" style={{ color: '#E1ECE6', fontSize: '0.9rem' }}>
                  Pure Silk Sarees (Kanjeevaram & Banarasi)
                </Link>
              </li>
              <li>
                <Link to="/collection/cotton" style={{ color: '#E1ECE6', fontSize: '0.9rem' }}>
                  Handspun Cotton Sarees (Chanderi & Muslin)
                </Link>
              </li>
              <li>
                <Link to="/collection/festive" style={{ color: '#E1ECE6', fontSize: '0.9rem' }}>
                  Festive & Celebrations
                </Link>
              </li>
              <li>
                <Link to="/collection/wedding" style={{ color: '#E1ECE6', fontSize: '0.9rem' }}>
                  Wedding & Muhurtham Heirlooms
                </Link>
              </li>
              <li>
                <Link to="/collection/everyday" style={{ color: '#E1ECE6', fontSize: '0.9rem' }}>
                  Everyday Handlooms (Wild Tussar & Linen)
                </Link>
              </li>
              <li>
                <Link to="/collection/regional" style={{ color: '#E1ECE6', fontSize: '0.9rem' }}>
                  Regional Weaving Traditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Craft Heritage & Archive */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-brand)',
                fontSize: '0.85rem',
                letterSpacing: '0.14em',
                color: 'var(--color-gold-light)',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
                fontWeight: 600,
              }}
            >
              Weaving Heritage
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>
                <Link to="/craft-story" style={{ color: '#E1ECE6', fontSize: '0.9rem' }}>
                  Discover the Weaving Story
                </Link>
              </li>
              <li>
                <Link to="/craft-story#clusters" style={{ color: '#E1ECE6', fontSize: '0.9rem' }}>
                  Meet the Artisan Clusters
                </Link>
              </li>
              <li>
                <Link to="/craft-story#journey" style={{ color: '#E1ECE6', fontSize: '0.9rem' }}>
                  From Thread to Saree
                </Link>
              </li>
              <li>
                <Link to="/journal" style={{ color: '#E1ECE6', fontSize: '0.9rem' }}>
                  Textile Journal & Care Archive
                </Link>
              </li>
              <li>
                <Link to="/journal/the-collectors-guide-pure-zari-vs-tested-zari" style={{ color: '#E1ECE6', fontSize: '0.9rem' }}>
                  Pure Zari vs Tested Zari Guide
                </Link>
              </li>
              <li>
                <Link to="/admin" style={{ color: 'var(--color-gold-light)', fontSize: '0.9rem', fontWeight: 600 }}>
                  Atelier Portal (Admin Only)
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup with explicit consent */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-brand)',
                fontSize: '0.85rem',
                letterSpacing: '0.14em',
                color: 'var(--color-gold-light)',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
                fontWeight: 600,
              }}
            >
              The Aaranya Dispatch
            </div>
            <p style={{ color: '#C8DBD0', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              Receive thoughtful essays on Indian textile preservation, invitations to loom-release
              heirlooms, and master artisan stories.
            </p>
            <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex' }}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flexGrow: 1,
                    padding: '0.7rem 0.9rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(223, 196, 136, 0.3)',
                    color: '#FFFFFF',
                    borderRadius: 'var(--radius-xs) 0 0 var(--radius-xs)',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  className="btn-gold"
                  style={{
                    padding: '0.7rem 1.15rem',
                    borderRadius: '0 var(--radius-xs) var(--radius-xs) 0',
                    border: 'none',
                  }}
                  aria-label="Subscribe"
                >
                  <ArrowRight size={16} />
                </button>
              </div>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  fontSize: '0.75rem',
                  color: '#A0B4AA',
                  cursor: 'pointer',
                  lineHeight: 1.4,
                }}
              >
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  style={{ marginTop: '2px' }}
                />
                <span>
                  I consent to receive occasional textile updates and acknowledge Aaranya’s privacy
                  commitment. No spam, ever.
                </span>
              </label>
            </form>

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
              <a
                href={brandConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                style={{ color: '#E1ECE6', backgroundColor: 'rgba(255,255,255,0.06)' }}
                aria-label="Follow Aaranya on Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href={brandConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                style={{ color: '#E1ECE6', backgroundColor: 'rgba(255,255,255,0.06)' }}
                aria-label="Follow Aaranya on Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <button
                type="button"
                onClick={handleDirectWhatsAppConcierge}
                className="icon-btn"
                style={{ color: '#E1ECE6', backgroundColor: 'rgba(255,255,255,0.06)' }}
                aria-label="WhatsApp Aaranya Concierge"
              >
                <MessageCircle size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Authenticity Transparency Disclaimer */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            backgroundColor: 'rgba(0, 0, 0, 0.22)',
            border: '1px solid rgba(197, 160, 89, 0.2)',
            borderRadius: 'var(--radius-xs)',
            marginBottom: '2.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
          }}
        >
          <ShieldCheck size={24} color="var(--color-gold-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.8rem', color: '#B5C9BD', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--color-gold-light)' }}>Handloom Integrity & Editorial Transparency:</strong>{' '}
            Aaranya is committed to ethical Indian textile documentation. All weaving techniques, GI origin
            records, warp/weft compositions, and laboratory certifications documented in our catalog reflect
            verified handloom standards. Where sample illustrative drapes or conceptual lookbooks are displayed,
            they are distinctly labeled to honor the master weavers of India without fabrication.
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.775rem',
            color: '#8CA095',
          }}
        >
          <div>
            © {new Date().getFullYear()} AARANYA Sarees. All rights reserved. Saree-only Atelier.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Verified Silk Mark Certified</span>
            <span>Handloom Mark Partner</span>
            <span>Geographical Indication Protected</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
