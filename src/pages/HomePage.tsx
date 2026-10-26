import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles, Compass, Heart, MessageCircle, ChevronRight, Layers, Award } from 'lucide-react';
import type { Saree } from '../types';
import { getAllSarees } from '../services/db';
import { JOURNAL_ARTICLES, ARTISAN_CLUSTERS, LOOKBOOK_GALLERY } from '../data/sarees.data';
import { SareeCard } from '../components/common/SareeCard';
import { brandConfig } from '../config/brand.config';
import { openWhatsAppAction } from '../utils/whatsapp';

export const HomePage: React.FC = () => {
  const [featuredSarees, setFeaturedSarees] = useState<Saree[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    getAllSarees(false).then((sarees) => {
      const featured = sarees.filter((s) => s.isFeatured);
      setFeaturedSarees(featured.length > 0 ? featured : sarees.slice(0, 4));
    });
  }, []);

  const craftsmanshipSteps = [
    {
      step: '01',
      title: 'Sericulture & Pure Filament Selection',
      desc: 'Sourcing certified mulberry and wild forest tussar filaments. Yarns are hand-twisted into 3-ply strands for heirloom durability and tensile strength.',
      duration: '4–6 Days',
      highlight: 'Mulberry & Wild Kosa',
    },
    {
      step: '02',
      title: 'Vat & Botanical Infused Dyeing',
      desc: 'Achieving deep forest greens, madder reds, and rich ivory using azo-free and herbal formulations steeped in copper cauldrons for colorfast longevity.',
      duration: '3 Days',
      highlight: 'Azo-Free & Herbal',
    },
    {
      step: '03',
      title: 'Pit Loom Graph & Warp Pegging',
      desc: 'Thousands of silk threads are hand-drawn through reeds. Nakshaband masters chart intricate floral jaals, shikargah vines, and temple motifs onto coordinate cards.',
      duration: '5–7 Days',
      highlight: 'Manual Reed Threading',
    },
    {
      step: '04',
      title: 'The Flying Shuttle & Interlocking Weft',
      desc: 'Two master artisans work the pedals and shuttles in synchronized rhythm. In Korvai and Kadwa techniques, each motif is manually inserted with individual spools.',
      duration: '16–28 Days',
      highlight: '100% Hand-Thrown Weft',
    },
    {
      step: '05',
      title: 'Silk Mark Inspection & Keepsake Box',
      desc: 'Every inch is inspected under magnification for uniform thread tension. Finished with hand-knotted tassels and nestled in unbleached muslin with bay leaf pouches.',
      duration: '2 Days',
      highlight: 'Silk Mark Certified',
    },
  ];

  const handleWhatsAppConcierge = () => {
    const cleanNumber = brandConfig.whatsapp.phoneNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `*Namaste AARANYA Atelier,*\n\nI am visiting your website and would love guidance in selecting an authentic handloom saree for an upcoming special occasion.\n\nCould you please assist me?`
    );
    openWhatsAppAction(`https://wa.me/${cleanNumber}?text=${message}`);
  };

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section
        style={{
          position: 'relative',
          minHeight: '88vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#16231D',
          overflow: 'hidden',
          padding: '4rem 0',
        }}
        aria-label="Aaranya Hero Campaign"
      >
        {/* Background Image with Warm Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('/images/hero-saree.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 20%',
            opacity: 0.42,
            filter: 'brightness(0.85) contrast(1.1)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, rgba(18, 40, 30, 0.95) 0%, rgba(18, 40, 30, 0.65) 50%, rgba(18, 40, 30, 0.3) 100%)',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '720px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(197, 160, 89, 0.15)',
                border: '1px solid rgba(197, 160, 89, 0.4)',
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-xs)',
                marginBottom: '1.5rem',
              }}
            >
              <Sparkles size={14} color="var(--color-gold-light)" />
              <span
                style={{
                  fontFamily: 'var(--font-brand)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.18em',
                  color: 'var(--color-gold-light)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                A Saree-Only Handloom Sanctuary
              </span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
                color: '#FAF7F2',
                fontFamily: 'var(--font-serif)',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                fontWeight: 500,
              }}
            >
              Not Just a Saree. <br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-gold-light)' }}>
                A Story Woven by Hand.
              </em>
            </h1>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
                color: '#E0ECE5',
                lineHeight: 1.7,
                marginBottom: '2.5rem',
                maxWidth: '620px',
              }}
            >
              Discover thoughtfully curated sarees inspired by India's rich textile traditions,
              crafted with care and made to be cherished for generations.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
              <Link to="/collection" className="btn-gold" style={{ fontSize: '0.9rem' }}>
                Shop Sarees <ArrowRight size={16} />
              </Link>
              <Link
                to="/craft-story"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.95rem 2rem',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid rgba(250, 247, 242, 0.4)',
                  color: '#FAF7F2',
                  fontSize: '0.9rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  transition: 'all 200ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(250, 247, 242, 0.15)';
                  e.currentTarget.style.borderColor = '#FAF7F2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(250, 247, 242, 0.4)';
                }}
              >
                Discover the Weaving Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BRAND MANIFESTO BAR */}
      <section
        style={{
          backgroundColor: 'var(--bg-surface-elevated)',
          borderBottom: '1px solid var(--border-light)',
          padding: '2.25rem 0',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2rem',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Award size={32} color="var(--color-gold-dark)" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.925rem', color: 'var(--color-forest-dark)' }}>
                  100% Authentic Handloom
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Certified Silk Mark & Geographical Indication
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Layers size={32} color="var(--color-gold-dark)" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.925rem', color: 'var(--color-forest-dark)' }}>
                  Saree-Only Atelier
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Zero powerloom imitations or synthetic blends
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Compass size={32} color="var(--color-gold-dark)" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.925rem', color: 'var(--color-forest-dark)' }}>
                  Heritage Weaving Guilds
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Direct artisan fair-welfare compensation
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <MessageCircle size={32} color="var(--color-gold-dark)" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.925rem', color: 'var(--color-forest-dark)' }}>
                  Personal WhatsApp Concierge
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Loom availability & custom draping assistance
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED SAREES */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Heirloom Handloom Edition</span>
            <h2 className="section-title">Featured Masterpieces</h2>
            <p className="section-subtitle">
              Each piece represents between 12 to 30 days of meticulous pit loom weaving. Handpicked for
              their exceptional zari purity, balanced drape, and historical lineage.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2.5rem',
              marginBottom: '3.5rem',
            }}
          >
            {featuredSarees.map((saree) => (
              <SareeCard key={saree.id} saree={saree} />
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/collection" className="btn-secondary">
              Explore All Handloom Sarees <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SHOP BY FABRIC */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Pure Natural Fibers</span>
            <h2 className="section-title">Shop by Fabric</h2>
            <p className="section-subtitle">
              From heavy temple Mulberry silks to gossamer handspun muslin, celebrate the organic tactile
              poetry of authentic Indian textiles.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              {
                title: 'Pure Mulberry Silk',
                desc: '3-ply twisted silk with heavy lustrous drape from Mysore and Kanchipuram.',
                link: '/collection?fabric=Pure+Kanjeevaram+Mulberry+Silk+(3-Ply)',
                count: 'Kanjeevaram & Paithani',
                img: '/images/hero-saree.jpg',
              },
              {
                title: 'Banarasi Katan Silk',
                desc: 'Fine spun filament silk known for Kadwa meenakari brocade & regal sheen.',
                link: '/collection?fabric=Pure+Banarasi+Katan+Silk',
                count: 'Katan & Brocade',
                img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
              },
              {
                title: 'Chanderi Silk Cotton',
                desc: 'Gossamer translucence blending pure silk warp with breathable fine cotton weft.',
                link: '/collection?fabric=Chanderi+Handloom+(Silk+Warp,+Cotton+Weft)',
                count: 'Featherlight Malwa',
                img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
              },
              {
                title: 'Wild Forest Tussar',
                desc: 'Organic golden honey texture hand-reeled from central Indian wild oak silkworms.',
                link: '/collection?fabric=100%+Wild+Forest+Tussar+Silk+(Kosa)',
                count: 'Organic Kosa Silk',
                img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
              },
              {
                title: 'Bengal Muslin & Jamdani',
                desc: 'Woven moonlight on 120-count combed cotton with extra-weft floral embroidery.',
                link: '/collection?fabric=Fine+Bengal+Handspun+Muslin+Cotton+(120s+Count)',
                count: 'UNESCO Recognized',
                img: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80',
              },
            ].map((f) => (
              <Link
                key={f.title}
                to={f.link}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-xs)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 250ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  e.currentTarget.style.borderColor = 'var(--color-gold)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                }}
              >
                <div style={{ height: '160px', overflow: 'hidden' }}>
                  <img
                    src={f.img}
                    alt={f.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div
                    style={{
                      fontSize: '0.7rem',
                      letterSpacing: '0.1em',
                      color: 'var(--color-gold-dark)',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      marginBottom: '0.25rem',
                    }}
                  >
                    {f.count}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.25rem',
                      marginBottom: '0.45rem',
                      color: 'var(--color-forest-dark)',
                    }}
                  >
                    {f.title}
                  </h3>
                  <p style={{ fontSize: '0.825rem', lineHeight: 1.5, marginBottom: '1rem' }}>{f.desc}</p>
                  <div
                    style={{
                      marginTop: 'auto',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--color-forest)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    Explore Weaves <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SHOP BY WEAVING TRADITION */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Regional Craft Clusters</span>
            <h2 className="section-title">Shop by Weaving Tradition</h2>
            <p className="section-subtitle">
              Every geographic enclave in India has evolved its own distinctive loom setup, warp-weft joinery,
              and ceremonial motifs preserved across generations.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {[
              {
                name: 'Kanchipuram, Tamil Nadu',
                technique: 'Korvai Interlocking Temple Weave',
                sareeType: 'Pure Kanjeevaram Silk',
                tag: 'UNESCO Intangible Legacy',
                link: '/collection/wedding',
                bg: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
              },
              {
                name: 'Varanasi, Uttar Pradesh',
                technique: 'Kadwa Hand-Weft Meenakari Brocade',
                sareeType: 'Banarasi Katan Silk',
                tag: 'Ancient Vedic Brocade',
                link: '/collection/silk',
                bg: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
              },
              {
                name: 'Chanderi, Madhya Pradesh',
                technique: 'Gossamer Extra-Weft Ashrafi Booti',
                sareeType: 'Chanderi Silk Cotton',
                tag: 'Malwa Royal Court Craft',
                link: '/collection/cotton',
                bg: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
              },
              {
                name: 'Phulia & Shantipur, West Bengal',
                technique: 'Extra-Weft Muslin Tapestry Needlework',
                sareeType: 'Bengal Jamdani Muslin',
                tag: 'UNESCO Inscribed Craft',
                link: '/collection/cotton',
                bg: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
              },
              {
                name: 'Yeola & Paithan, Maharashtra',
                technique: 'Solid Tissue Tapestry & Asawali Motifs',
                sareeType: 'Pure Silk Paithani',
                tag: 'Peshwa Royal Heirloom',
                link: '/collection/regional',
                bg: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
              },
              {
                name: 'Bargarh, Western Odisha',
                technique: 'Double Bandha Resist Tie-and-Dye',
                sareeType: 'Sambalpuri Silk Ikat',
                tag: 'Jayadeva Gita Govinda Legacy',
                link: '/collection/regional',
                bg: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
              },
            ].map((t) => (
              <Link
                key={t.name}
                to={t.link}
                style={{
                  position: 'relative',
                  height: '320px',
                  borderRadius: 'var(--radius-xs)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${t.bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 600ms var(--ease-smooth)',
                  }}
                  className="zoom-hover"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(18, 40, 30, 0.95) 0%, rgba(18, 40, 30, 0.6) 50%, rgba(18, 40, 30, 0.1) 100%)',
                  }}
                />
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-brand)',
                      fontSize: '0.725rem',
                      letterSpacing: '0.14em',
                      color: 'var(--color-gold-light)',
                      textTransform: 'uppercase',
                      marginBottom: '0.4rem',
                      fontWeight: 600,
                    }}
                  >
                    {t.tag}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.75rem',
                      color: '#FFFFFF',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {t.name}
                  </h3>
                  <div style={{ color: '#D2E3D9', fontSize: '0.875rem', marginBottom: '0.85rem' }}>
                    {t.sareeType} • {t.technique}
                  </div>
                  <div
                    style={{
                      color: 'var(--color-gold-light)',
                      fontSize: '0.775rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    View Cluster Sarees <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FROM THREAD TO SAREE: INTERACTIVE CRAFTSMANSHIP JOURNEY */}
      <section
        style={{
          padding: '6rem 0',
          backgroundColor: 'var(--color-forest-dark)',
          color: 'var(--bg-ivory)',
        }}
      >
        <div className="container">
          <div className="section-header">
            <span className="section-tag" style={{ color: 'var(--color-gold-light)' }}>
              Metamorphosis of Handloom
            </span>
            <h2 className="section-title" style={{ color: '#FFFFFF' }}>
              From Thread to Saree
            </h2>
            <p className="section-subtitle" style={{ color: '#CADCD2' }}>
              The journey of an Aaranya handloom saree is measured in weeks, not minutes. Take a step inside the
              hereditary workshops of master weavers.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '3rem',
            }}
          >
            {craftsmanshipSteps.map((step, idx) => (
              <button
                key={step.step}
                type="button"
                onClick={() => setActiveStep(idx)}
                style={{
                  padding: '1.25rem',
                  backgroundColor:
                    activeStep === idx ? 'rgba(197, 160, 89, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                  border:
                    activeStep === idx
                      ? '1px solid var(--color-gold)'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-xs)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-brand)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.12em',
                    color: activeStep === idx ? 'var(--color-gold-light)' : '#8DA396',
                    marginBottom: '0.35rem',
                  }}
                >
                  STEP {step.step}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.15rem',
                    color: '#FFFFFF',
                    lineHeight: 1.25,
                  }}
                >
                  {step.title.split('&')[0]}
                </div>
              </button>
            ))}
          </div>

          {/* Active Step Showcase */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(197, 160, 89, 0.25)',
              borderRadius: 'var(--radius-sm)',
              padding: '2.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: 'var(--color-maroon)',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '0.3rem 0.75rem',
                  borderRadius: 'var(--radius-xs)',
                  marginBottom: '1rem',
                }}
              >
                Duration: {craftsmanshipSteps[activeStep].duration}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2.25rem',
                  color: '#FFFFFF',
                  marginBottom: '1rem',
                  lineHeight: 1.2,
                }}
              >
                {craftsmanshipSteps[activeStep].title}
              </h3>
              <p style={{ color: '#D4E5DC', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.75rem' }}>
                {craftsmanshipSteps[activeStep].desc}
              </p>
              <div
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                  paddingTop: '1.25rem',
                  display: 'flex',
                  gap: '2rem',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#8DA396', textTransform: 'uppercase' }}>
                    Authenticity Focus
                  </div>
                  <div style={{ color: 'var(--color-gold-light)', fontWeight: 600, fontSize: '0.95rem' }}>
                    {craftsmanshipSteps[activeStep].highlight}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#8DA396', textTransform: 'uppercase' }}>
                    Weaving Method
                  </div>
                  <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.95rem' }}>
                    Manual Pit Loom
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                maxHeight: '380px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80"
                alt="Handloom pit loom craftsmanship"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. MEET THE ARTISANS & ETHICAL CLUSTERS */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Ethical Craft Guilds</span>
            <h2 className="section-title">Meet the Master Artisans</h2>
            <p className="section-subtitle">
              Transparent documentation of the weaving collectives who preserve India's living textile
              heritage. We partner directly with cooperative unions to ensure equitable compensation.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem',
            }}
          >
            {ARTISAN_CLUSTERS.map((cluster) => (
              <div
                key={cluster.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-xs)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img
                    src={cluster.image}
                    alt={cluster.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.725rem',
                      fontWeight: 600,
                      color: 'var(--color-forest-dark)',
                      marginBottom: '0.4rem',
                      backgroundColor: 'var(--color-forest-surface)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: 'var(--radius-xs)',
                      width: 'fit-content',
                    }}
                  >
                    <ShieldCheck size={13} /> {cluster.verificationStatus}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.4rem',
                      color: 'var(--color-forest-dark)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {cluster.name}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-gold-dark)', fontWeight: 600, marginBottom: '0.75rem' }}>
                    {cluster.region}
                  </div>
                  <p style={{ fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                    {cluster.history}
                  </p>
                  <div
                    style={{
                      marginTop: 'auto',
                      paddingTop: '0.85rem',
                      borderTop: '1px solid var(--border-light)',
                      fontSize: '0.775rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    Active Loom Community: <strong>{cluster.artisanCount}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              padding: '1.5rem 2rem',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-gold)',
              borderRadius: 'var(--radius-xs)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--color-forest-dark)' }}>
                Direct Artisan Weaving Inquiries
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Looking for a bespoke wedding heirloom woven with custom jala or personalized initials in the pallu?
              </p>
            </div>
            <button
              type="button"
              onClick={handleWhatsAppConcierge}
              className="btn-whatsapp"
            >
              <MessageCircle size={18} />
              Inquire with Master Guild
            </button>
          </div>
        </div>
      </section>

      {/* 8. CUSTOMER STYLING & PATRON LOOKBOOK */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Living Traditions</span>
            <h2 className="section-title">The Patron Lookbook</h2>
            <p className="section-subtitle">
              Authentic drapes styled by patrons celebrating life’s watershed moments—from South Indian temple
              muhurthams to evening recitals.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {LOOKBOOK_GALLERY.map((look) => (
              <div
                key={look.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-xs)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-light)',
                }}
              >
                <div style={{ height: '380px', overflow: 'hidden' }}>
                  <img
                    src={look.image}
                    alt={look.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div
                    style={{
                      fontSize: '0.725rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--color-maroon)',
                      fontWeight: 600,
                      marginBottom: '0.25rem',
                    }}
                  >
                    {look.occasion}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.35rem',
                      color: 'var(--color-forest-dark)',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {look.title}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-gold-dark)', fontWeight: 600, marginBottom: '0.65rem' }}>
                    {look.sareeName}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {look.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. TEXTILE JOURNAL PREVIEW */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Textile Knowledge & Archival Notes</span>
            <h2 className="section-title">The Textile Journal</h2>
            <p className="section-subtitle">
              Deep dives into weaving metallurgy, pure silver zari identification, and generational fabric care.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
              marginBottom: '3.5rem',
            }}
          >
            {JOURNAL_ARTICLES.slice(0, 3).map((article) => (
              <article
                key={article.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-xs)',
                  overflow: 'hidden',
                }}
              >
                <div style={{ height: '220px', overflow: 'hidden' }}>
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.75rem',
                      color: 'var(--color-gold-dark)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontWeight: 600,
                      marginBottom: '0.5rem',
                    }}
                  >
                    <span>{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.4rem',
                      color: 'var(--color-forest-dark)',
                      lineHeight: 1.3,
                      marginBottom: '0.65rem',
                    }}
                  >
                    <Link to={`/journal/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {article.excerpt}
                  </p>
                  <Link
                    to={`/journal/${article.slug}`}
                    style={{
                      marginTop: 'auto',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--color-forest)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    Read Journal Essay <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/journal" className="btn-secondary">
              View All Journal Essays <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
