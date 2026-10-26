import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  Check,
  Layers,
  Sparkles,
  ArrowRight,
  ZoomIn,
  Truck,
  RotateCcw,
  Clock,
  Scissors
} from 'lucide-react';
import type { Saree } from '../types';
import { getSareeBySlug, getAllSarees } from '../services/db';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../components/common/Toast';
import { formatCurrency, generateSingleSareeWhatsAppUrl, openWhatsAppAction } from '../utils/whatsapp';
import { SareeCard } from '../components/common/SareeCard';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [saree, setSaree] = useState<Saree | null>(null);
  const [relatedSarees, setRelatedSarees] = useState<Saree[]>([]);
  const [loading, setLoading] = useState(true);

  // Gallery state
  const [selectedView, setSelectedView] = useState<'hero' | 'border' | 'pallu' | 'body' | 'texture'>('hero');
  const [isZoomed, setIsZoomed] = useState(false);

  // Blouse option selection
  const [blouseOption, setBlouseOption] = useState<string>('Unstitched Blouse Piece (Included)');

  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getSareeBySlug(slug).then((found) => {
      if (found) {
        setSaree(found);
        setSelectedView('hero');
        // Fetch related sarees
        getAllSarees(false).then((all) => {
          const related = all
            .filter((s) => s.id !== found.id && (s.category === found.category || s.colorFamily === found.colorFamily))
            .slice(0, 3);
          setRelatedSarees(related.length > 0 ? related : all.filter((s) => s.id !== found.id).slice(0, 3));
        });
      } else {
        setSaree(null);
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '8rem 0', textAlign: 'center', color: 'var(--color-forest)' }}>
        Retrieving loom archive and verified textile details...
      </div>
    );
  }

  if (!saree) {
    return (
      <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '1rem' }}>
          Saree Not Found
        </h1>
        <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
          The handloom piece you are looking for may have been archived or is temporarily resting between loom releases.
        </p>
        <Link to="/collection" className="btn-primary">
          Return to Saree Collection
        </Link>
      </div>
    );
  }

  const isSaved = isInWishlist(saree.id);

  const handleWishlistClick = () => {
    toggleWishlist(saree.id);
    if (!isSaved) {
      showToast(`Added "${saree.title}" to your curated wishlist`, 'wishlist');
    } else {
      showToast(`Removed from wishlist`, 'info');
    }
  };

  const handleAddToBag = () => {
    addItem(saree, 1, blouseOption);
    showToast(`Added "${saree.title}" to your bag`, 'cart');
  };

  const handleWhatsAppOrder = () => {
    const url = generateSingleSareeWhatsAppUrl(saree, 1, blouseOption);
    openWhatsAppAction(url);
  };

  // Image source based on active view tab
  const getActiveImageUrl = () => {
    switch (selectedView) {
      case 'border':
        return saree.images.border || saree.images.hero;
      case 'pallu':
        return saree.images.pallu || saree.images.hero;
      case 'body':
        return saree.images.body || saree.images.hero;
      case 'texture':
        return saree.images.texture || saree.images.hero;
      default:
        return saree.images.hero;
    }
  };

  return (
    <div className="pdp-page" style={{ padding: '2rem 0 6rem 0' }}>
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            marginBottom: '2rem',
          }}
        >
          <Link to="/" style={{ color: 'var(--text-muted)' }}>
            Home
          </Link>
          <span>/</span>
          <Link to="/collection" style={{ color: 'var(--text-muted)' }}>
            Sarees
          </Link>
          <span>/</span>
          <Link to={`/collection/${saree.category}`} style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>
            {saree.category} Sarees
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--color-forest-dark)', fontWeight: 500 }}>{saree.title}</span>
        </nav>

        {/* Main Grid: Gallery + Details */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '3.5rem',
            marginBottom: '5rem',
          }}
        >
          {/* LEFT: HIGH-RESOLUTION GALLERY & CLOSE-UP CONTROLS */}
          <div>
            {/* View Switcher Tabs (Border, Pallu, Body, Texture) */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginBottom: '1rem',
              }}
            >
              {[
                { id: 'hero', label: 'Full Drape' },
                { id: 'border', label: 'Border Detail' },
                { id: 'pallu', label: 'Pallu View' },
                { id: 'body', label: 'Pleat & Body' },
                { id: 'texture', label: 'Weave Texture' },
              ].map((view) => (
                <button
                  key={view.id}
                  type="button"
                  onClick={() => setSelectedView(view.id as any)}
                  style={{
                    padding: '0.45rem 0.85rem',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    backgroundColor:
                      selectedView === view.id ? 'var(--color-forest-dark)' : 'var(--bg-surface)',
                    color: selectedView === view.id ? '#FAF7F2' : 'var(--text-secondary)',
                    border:
                      selectedView === view.id
                        ? '1px solid var(--color-forest-dark)'
                        : '1px solid var(--border-light)',
                    cursor: 'pointer',
                    transition: 'all 150ms ease',
                  }}
                >
                  {view.label}
                </button>
              ))}
            </div>

            {/* Main Stage with Zoom Effect */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '3/4',
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                border: '1px solid var(--border-light)',
                cursor: isZoomed ? 'zoom-out' : 'zoom-in',
              }}
              onClick={() => setIsZoomed((prev) => !prev)}
            >
              <img
                src={getActiveImageUrl()}
                alt={`${saree.title} - ${selectedView} view`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 400ms var(--ease-smooth)',
                  transform: isZoomed ? 'scale(1.8)' : 'scale(1)',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  right: '1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  color: 'var(--color-forest-dark)',
                  pointerEvents: 'none',
                }}
              >
                <ZoomIn size={14} /> {isZoomed ? 'Click to Reset' : 'Click to Magnify Weave'}
              </div>

              {saree.isVerifiedHandloom && (
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    backgroundColor: 'rgba(26, 56, 43, 0.92)',
                    backdropFilter: 'blur(4px)',
                    color: '#FAF7F2',
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.725rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <ShieldCheck size={14} color="var(--color-gold-light)" /> {saree.handloomCertification}
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem', marginTop: '0.75rem' }}>
              {[
                { id: 'hero', src: saree.images.hero },
                { id: 'border', src: saree.images.border },
                { id: 'pallu', src: saree.images.pallu },
                { id: 'body', src: saree.images.body },
                { id: 'texture', src: saree.images.texture },
              ].map((thumb) => (
                <button
                  key={thumb.id}
                  type="button"
                  onClick={() => setSelectedView(thumb.id as any)}
                  style={{
                    aspectRatio: '1',
                    borderRadius: 'var(--radius-xs)',
                    overflow: 'hidden',
                    border:
                      selectedView === thumb.id
                        ? '2px solid var(--color-forest)'
                        : '1px solid var(--border-light)',
                    padding: 0,
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={thumb.src || saree.images.hero}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: SAREE SPECIFICATIONS & PURCHASE CONCIERGE */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Origin & SKU */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.65rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-brand)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.14em',
                  color: 'var(--color-gold-dark)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                {saree.regionalOrigin} • {saree.clusterName}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SKU: {saree.sku}</span>
            </div>

            {/* Title & Subtitle */}
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                color: 'var(--color-forest-dark)',
                lineHeight: 1.15,
                marginBottom: '0.75rem',
              }}
            >
              {saree.title}
            </h1>

            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {saree.subtitle}
            </p>

            {/* Price Box */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '1rem',
                paddingBottom: '1.5rem',
                borderBottom: '1px solid var(--border-light)',
                marginBottom: '1.5rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2.25rem',
                  fontWeight: 700,
                  color: 'var(--color-forest-dark)',
                }}
              >
                {formatCurrency(saree.price)}
              </span>
              {saree.originalPrice && saree.originalPrice > saree.price && (
                <span
                  style={{
                    fontSize: '1.15rem',
                    textDecoration: 'line-through',
                    color: 'var(--text-muted)',
                  }}
                >
                  {formatCurrency(saree.originalPrice)}
                </span>
              )}
              <span style={{ fontSize: '0.775rem', color: 'var(--color-forest)', fontWeight: 500 }}>
                (Inclusive of all taxes & complimentary insured shipping)
              </span>
            </div>

            {/* Availability & Stock Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                marginBottom: '1.5rem',
                fontSize: '0.875rem',
              }}
            >
              <div
                style={{
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  backgroundColor: saree.stock > 0 ? '#10B981' : '#EF4444',
                }}
              />
              <span style={{ fontWeight: 600, color: 'var(--color-forest-dark)' }}>
                {saree.stock > 0 ? `In Stock: Only ${saree.stock} heirloom piece(s) available` : 'Made to Order'}
              </span>
              <span style={{ color: 'var(--text-muted)' }}>• {saree.dispatchTime}</span>
            </div>

            {/* Blouse Piece Option */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Scissors size={14} /> Blouse Configuration
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  'Unstitched Blouse Piece (Included, 80 cm)',
                  'Pure Handloom Fabric Only (Standard Saree Drape)',
                ].map((opt) => (
                  <label
                    key={opt}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      padding: '0.65rem 0.85rem',
                      border: blouseOption === opt ? '1px solid var(--color-forest)' : '1px solid var(--border-light)',
                      backgroundColor: blouseOption === opt ? 'var(--color-forest-surface)' : '#FFFFFF',
                      borderRadius: 'var(--radius-xs)',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: blouseOption === opt ? 600 : 400,
                    }}
                  >
                    <input
                      type="radio"
                      name="blouse"
                      checked={blouseOption === opt}
                      onChange={() => setBlouseOption(opt)}
                      style={{ accentColor: 'var(--color-forest)' }}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={handleAddToBag}
                  className="btn-primary"
                  style={{ flexGrow: 1, padding: '1rem' }}
                >
                  <ShoppingBag size={18} /> Add to Bag
                </button>

                <button
                  type="button"
                  onClick={handleWishlistClick}
                  className={`btn-secondary ${isSaved ? 'active' : ''}`}
                  style={{
                    padding: '1rem',
                    color: isSaved ? 'var(--color-maroon)' : 'inherit',
                    borderColor: isSaved ? 'var(--color-maroon)' : 'var(--border-light)',
                  }}
                  aria-label="Save to Wishlist"
                >
                  <Heart size={20} fill={isSaved ? '#5E1914' : 'none'} />
                </button>
              </div>

              {/* Order via WhatsApp Direct Button */}
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="btn-whatsapp"
                style={{ width: '100%', padding: '1rem' }}
              >
                <MessageCircle size={18} />
                Order on WhatsApp
              </button>

              <p
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  textAlign: 'center',
                  lineHeight: 1.4,
                  marginTop: '0.25rem',
                }}
              >
                Direct WhatsApp Concierge: Instant loom verification, draping guidance, and official invoice.
              </p>
            </div>

            {/* Assurance Badges */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem',
                padding: '1.25rem',
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--border-light)',
                marginBottom: '2rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                <Truck size={16} color="var(--color-forest)" />
                <span>Complimentary Insured Shipping</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                <ShieldCheck size={16} color="var(--color-forest)" />
                <span>Silk Mark Certified Purity</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                <Clock size={16} color="var(--color-forest)" />
                <span>Handcrafted in 18+ Days</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                <RotateCcw size={16} color="var(--color-forest)" />
                <span>7-Day Authenticity Exchange</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. SPECIFICATIONS, WEAVING STORY & TIMELINE TABS */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-xs)',
            padding: '2.5rem',
            marginBottom: '5rem',
          }}
        >
          {/* Grid of Verified Details */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '2.5rem',
              paddingBottom: '2.5rem',
              borderBottom: '1px solid var(--border-light)',
              marginBottom: '2.5rem',
            }}
          >
            {/* Column 1: Fabric & Materials */}
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-brand)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold-dark)',
                  marginBottom: '1rem',
                  fontWeight: 600,
                }}
              >
                Material & Fiber Purity
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
                <li>
                  <strong>Primary Fabric:</strong> {saree.fabric}
                </li>
                <li>
                  <strong>Warp Composition:</strong> {saree.materials.warp}
                </li>
                <li>
                  <strong>Weft Composition:</strong> {saree.materials.weft}
                </li>
                <li>
                  <strong>Zari Metallurgy:</strong> {saree.materials.zariPurity}
                </li>
                <li>
                  <strong>Approximate Weight:</strong> {saree.materials.weightApprox}
                </li>
              </ul>
            </div>

            {/* Column 2: Dimensions & Blouse */}
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-brand)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold-dark)',
                  marginBottom: '1rem',
                  fontWeight: 600,
                }}
              >
                Dimensions & Fitting
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
                <li>
                  <strong>Saree Length:</strong> {saree.dimensions.length}
                </li>
                <li>
                  <strong>Saree Width:</strong> {saree.dimensions.width}
                </li>
                <li>
                  <strong>Blouse Piece:</strong> {saree.dimensions.blousePiece}
                </li>
                <li>
                  <strong>Drape Style:</strong> Suitable for Nivi, Seedha Pallu, or Bengali pleated drape
                </li>
              </ul>
            </div>

            {/* Column 3: Care Instructions */}
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-brand)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold-dark)',
                  marginBottom: '1rem',
                  fontWeight: 600,
                }}
              >
                Heirloom Care & Storage
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
                {saree.careInstructions.map((instruction, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <Check size={14} color="var(--color-gold-dark)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Deep Weaving Story */}
          <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-tag">{saree.weavingTechnique}</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', marginBottom: '1.25rem' }}>
              {saree.story.headline}
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              {saree.story.text}
            </p>
            <div
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.25rem',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-gold)',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.85rem',
                color: 'var(--color-earth)',
              }}
            >
              <strong>Cluster Heritage:</strong> {saree.story.clusterNotes}
            </div>
          </div>

          {/* "JOURNEY OF THIS SAREE" TIMELINE */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.75rem',
                textAlign: 'center',
                marginBottom: '2.5rem',
                color: 'var(--color-forest-dark)',
              }}
            >
              The Journey of This Saree
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {saree.story.journeyTimeline.map((step) => (
                <div
                  key={step.step}
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '1.25rem',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-brand)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.12em',
                      color: 'var(--color-gold-dark)',
                      marginBottom: '0.4rem',
                      fontWeight: 600,
                    }}
                  >
                    PHASE {step.step} • {step.duration}
                  </div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.15rem',
                      color: 'var(--color-forest-dark)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {step.title}
                  </h4>
                  <p style={{ fontSize: '0.825rem', lineHeight: 1.5, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                    {step.description}
                  </p>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-forest)' }}>
                    Artisan: {step.artisanRole}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. RELATED SAREES */}
        {relatedSarees.length > 0 && (
          <div>
            <div className="section-header">
              <span className="section-tag">Complementary Weaves</span>
              <h2 className="section-title">You May Also Cherish</h2>
              <p className="section-subtitle">
                Explore handloom sarees sharing similar regional techniques and natural fiber purity.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '2.5rem',
              }}
            >
              {relatedSarees.map((rel) => (
                <SareeCard key={rel.id} saree={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
