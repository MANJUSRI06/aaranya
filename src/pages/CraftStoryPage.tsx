import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, ArrowRight, Heart, Award, Compass, MessageCircle } from 'lucide-react';
import { ARTISAN_CLUSTERS } from '../data/sarees.data';
import { brandConfig } from '../config/brand.config';
import { openWhatsAppAction } from '../utils/whatsapp';

export const CraftStoryPage: React.FC = () => {
  const handleWhatsAppInquiry = () => {
    const cleanNumber = brandConfig.whatsapp.phoneNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `*Namaste AARANYA Master Guild,*\n\nI am deeply inspired by your weaving story and would love to learn more about bespoke commissions and master weaver collaborations.\n\nThank you!`
    );
    openWhatsAppAction(`https://wa.me/${cleanNumber}?text=${message}`);
  };

  return (
    <div className="craft-story-page" style={{ padding: '3.5rem 0 6rem 0' }}>
      <div className="container">
        {/* Editorial Hero */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 4.5rem auto' }}>
          <span className="section-tag">Living Textile Heritage</span>
          <h1 className="section-title">The Sacred Architecture of Indian Handlooms</h1>
          <p className="section-subtitle">
            A handloom saree is not merely six yards of dyed silk or cotton; it is an unbroken continuum of
            botany, mathematics, sacred geometry, and hereditary human patience spanning thousands of years.
          </p>
        </div>

        {/* Feature Story Section 1: The Pit Loom vs Powerloom */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center',
            marginBottom: '6rem',
          }}
        >
          <div style={{ borderRadius: 'var(--radius-xs)', overflow: 'hidden', height: '420px' }}>
            <img
              src="/images/hero-saree.jpg"
              alt="Traditional pit loom weaving"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div>
            <span
              style={{
                fontFamily: 'var(--font-brand)',
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                color: 'var(--color-gold-dark)',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginBottom: '0.5rem',
                display: 'block',
              }}
            >
              The Human Cadence
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.5rem',
                color: 'var(--color-forest-dark)',
                marginBottom: '1rem',
                lineHeight: 1.2,
              }}
            >
              Why We Stand Exclusively by the Handloom
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              Unlike automated powerlooms that force synthetic polyester blends at high speeds—causing thread stress
              and mechanical uniformity—a traditional pit loom breathes with the artisan. The pit dug into the earth
              maintains constant natural humidity, preserving the natural moisture and elasticity of raw silk filaments.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Every touch of the sley, every crossing of the flying shuttle, and every tensioning of the foot pedal
              is guided by human touch. No two handloom sarees are identical; the microscopic variations in weft
              density are the indelible fingerprints of human art.
            </p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-forest-dark)', fontWeight: 700 }}>
                  0%
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Powerloom Substitutes</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-forest-dark)', fontWeight: 700 }}>
                  100%
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Natural Fiber Sourced</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-forest-dark)', fontWeight: 700 }}>
                  400+
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Years Cluster Heritage</div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Story Section 2: Transparent Clusters Documentation */}
        <section id="clusters" style={{ marginBottom: '6rem' }}>
          <div className="section-header">
            <span className="section-tag">Ethical Craft Cooperatives</span>
            <h2 className="section-title">The Geographic Sanctuaries of Aaranya</h2>
            <p className="section-subtitle">
              We work directly with certified cooperative weaver guilds across India. Every cluster is
              documented transparently to honor the generational artisans behind each piece.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2.5rem',
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
                <div style={{ height: '220px', overflow: 'hidden' }}>
                  <img
                    src={cluster.image}
                    alt={cluster.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.725rem',
                      fontWeight: 600,
                      color: 'var(--color-forest-dark)',
                      marginBottom: '0.5rem',
                      backgroundColor: 'var(--color-forest-surface)',
                      padding: '0.25rem 0.55rem',
                      borderRadius: 'var(--radius-xs)',
                      width: 'fit-content',
                    }}
                  >
                    <ShieldCheck size={13} /> {cluster.verificationStatus}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.5rem',
                      color: 'var(--color-forest-dark)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {cluster.name}
                  </h3>
                  <div style={{ fontSize: '0.825rem', color: 'var(--color-gold-dark)', fontWeight: 600, marginBottom: '0.85rem' }}>
                    {cluster.region}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-forest-dark)', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Craft Signature: {cluster.specialty}
                  </div>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                    {cluster.history}
                  </p>
                  <div
                    style={{
                      marginTop: 'auto',
                      paddingTop: '0.85rem',
                      borderTop: '1px solid var(--border-light)',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    Active Guild Members: <strong>{cluster.artisanCount}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Banner */}
        <div
          style={{
            backgroundColor: 'var(--color-forest-dark)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-xs)',
            padding: '3.5rem 2.5rem',
            textAlign: 'center',
            border: '2px solid var(--color-gold)',
          }}
        >
          <Sparkles size={28} color="var(--color-gold-light)" style={{ margin: '0 auto 1rem auto' }} />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#FFFFFF', marginBottom: '1rem' }}>
            Experience the Touch of Generations
          </h2>
          <p style={{ maxWidth: '640px', margin: '0 auto 2rem auto', color: '#CADCD2', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Explore our curated heirloom sarees, each accompanied by official handloom certification and bespoke
            presentation packaging.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link to="/collection" className="btn-gold">
              Explore the Collection <ArrowRight size={16} />
            </Link>
            <button
              type="button"
              onClick={handleWhatsAppInquiry}
              className="btn-whatsapp"
            >
              <MessageCircle size={18} />
              Inquire via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
