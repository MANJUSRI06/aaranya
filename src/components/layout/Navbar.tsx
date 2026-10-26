import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { SearchModal } from '../common/SearchModal';
import { CartDrawer } from '../cart/CartDrawer';
import { getCurrentAdmin } from '../../services/db';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const { totalWishlist } = useWishlist();
  const location = useLocation();
  const admin = getCurrentAdmin();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="announcement-bar">
        <span>Complimentary Pan-India Insured Shipping on Orders Above ₹5,000</span>
        <span className="dot" />
        <span>Authentic Loom Mark Certification</span>
        <span className="dot" />
        <span>Bespoke Heirloom Keepsake Packaging</span>
      </div>

      {/* Main Sticky Header */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          {/* Mobile Menu Trigger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="icon-btn"
              style={{ display: 'flex' }}
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="icon-btn"
              aria-label="Search handloom sarees"
            >
              <Search size={20} />
            </button>
          </div>

          {/* Centered Brand Wordmark */}
          <Link to="/" className="brand-wordmark" aria-label="AARANYA Home">
            <span className="title">AARANYA</span>
            <span className="tagline">Woven by Tradition</span>
          </Link>

          {/* Action Icons */}
          <div className="nav-actions">
            <Link
              to="/admin"
              className="icon-btn"
              title={admin ? `Admin: ${admin.name}` : 'Admin Atelier Portal'}
              aria-label="Admin Atelier Portal"
            >
              <User size={20} color={admin ? 'var(--color-gold-dark)' : 'currentColor'} />
            </Link>

            <Link
              to="/wishlist"
              className="icon-btn"
              aria-label={`Wishlist with ${totalWishlist} saved sarees`}
            >
              <Heart size={20} />
              {totalWishlist > 0 && <span className="badge-count">{totalWishlist}</span>}
            </Link>

            <button
              type="button"
              onClick={openCart}
              className="icon-btn"
              aria-label={`Shopping bag with ${totalItems} items`}
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && <span className="badge-count">{totalItems}</span>}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div
          style={{
            borderTop: '1px solid var(--border-light)',
            backgroundColor: 'rgba(253, 251, 247, 0.98)',
            display: 'none',
          }}
          className="desktop-nav-bar"
        >
          <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
            <nav
              className="desktop-nav-links"
              style={{ display: 'flex', gap: '2rem', padding: '0.75rem 0' }}
              aria-label="Primary Navigation"
            >
              <NavLink to="/collection" className="nav-link" end>
                All Sarees
              </NavLink>
              <NavLink to="/collection/silk" className="nav-link">
                Silk Sarees
              </NavLink>
              <NavLink to="/collection/cotton" className="nav-link">
                Cotton Sarees
              </NavLink>
              <NavLink to="/collection/festive" className="nav-link">
                Festive Sarees
              </NavLink>
              <NavLink to="/collection/wedding" className="nav-link">
                Wedding Sarees
              </NavLink>
              <NavLink to="/collection/everyday" className="nav-link">
                Everyday Handlooms
              </NavLink>
              <NavLink to="/collection/regional" className="nav-link">
                Regional Traditions
              </NavLink>
              <NavLink to="/craft-story" className="nav-link">
                Weaving Story
              </NavLink>
              <NavLink to="/journal" className="nav-link">
                Textile Journal
              </NavLink>
            </nav>
          </div>
        </div>
      </header>

      {/* Inline style helper for desktop nav bar visibility */}
      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav-bar {
            display: block !important;
          }
        }
      `}</style>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="drawer-backdrop"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <nav
            className="drawer-panel"
            style={{ left: 0, right: 'auto', animation: 'slideInLeft 300ms var(--ease-smooth)' }}
            aria-label="Mobile Navigation Drawer"
          >
            <div className="drawer-header">
              <div className="brand-wordmark" style={{ alignItems: 'flex-start' }}>
                <span className="title" style={{ fontSize: '1.4rem' }}>
                  AARANYA
                </span>
                <span className="tagline" style={{ fontSize: '0.675rem' }}>
                  Woven by Tradition
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="icon-btn"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="drawer-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div
                style={{
                  fontSize: '0.725rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold-dark)',
                  fontWeight: 600,
                }}
              >
                Handloom Collections
              </div>

              {[
                { to: '/collection', label: 'All Sarees' },
                { to: '/collection/silk', label: 'Silk Sarees (Kanjeevaram & Banarasi)' },
                { to: '/collection/cotton', label: 'Cotton Sarees (Chanderi & Muslin)' },
                { to: '/collection/festive', label: 'Festive Sarees' },
                { to: '/collection/wedding', label: 'Wedding & Bridal Heirlooms' },
                { to: '/collection/everyday', label: 'Everyday Handlooms' },
                { to: '/collection/regional', label: 'Regional Weaving Traditions' },
              ].map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  style={({ isActive }) => ({
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    color: isActive ? 'var(--color-maroon)' : 'var(--color-forest-dark)',
                    fontWeight: 500,
                  })}
                >
                  {link.label}
                </NavLink>
              ))}

              <div
                style={{
                  borderTop: '1px solid var(--border-light)',
                  paddingTop: '1.25rem',
                  marginTop: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <div
                  style={{
                    fontSize: '0.725rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--color-gold-dark)',
                    fontWeight: 600,
                  }}
                >
                  Craft & Editorial
                </div>
                <NavLink
                  to="/craft-story"
                  style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-forest-dark)' }}
                >
                  Discover the Weaving Story
                </NavLink>
                <NavLink
                  to="/journal"
                  style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-forest-dark)' }}
                >
                  Textile Journal & Care Archive
                </NavLink>
                <NavLink
                  to="/wishlist"
                  style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-forest-dark)' }}
                >
                  My Saved Wishlist ({totalWishlist})
                </NavLink>
                <NavLink
                  to="/admin"
                  style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-forest-dark)' }}
                >
                  Atelier Admin Portal
                </NavLink>
              </div>
            </div>
          </nav>
        </>
      )}

      {/* Modals */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CartDrawer />
    </>
  );
};
