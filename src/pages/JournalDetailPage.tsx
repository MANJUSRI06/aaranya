import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../data/sarees.data';

export const JournalDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '1rem' }}>
          Essay Not Found
        </h1>
        <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
          The requested textile journal article could not be located in our archive.
        </p>
        <Link to="/journal" className="btn-primary">
          Return to Textile Journal
        </Link>
      </div>
    );
  }

  return (
    <div className="journal-detail-page" style={{ padding: '2rem 0 6rem 0' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        {/* Back Link */}
        <Link
          to="/journal"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.85rem',
            color: 'var(--color-forest)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '2rem',
          }}
        >
          <ArrowLeft size={16} /> Back to Journal
        </Link>

        {/* Article Header */}
        <header style={{ marginBottom: '2.5rem' }}>
          <div
            style={{
              fontSize: '0.775rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-gold-dark)',
              fontWeight: 600,
              marginBottom: '0.75rem',
            }}
          >
            {article.category}
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)',
              color: 'var(--color-forest-dark)',
              lineHeight: 1.15,
              marginBottom: '1rem',
            }}
          >
            {article.title}
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            {article.subtitle}
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              fontSize: '0.825rem',
              color: 'var(--text-muted)',
              borderTop: '1px solid var(--border-light)',
              borderBottom: '1px solid var(--border-light)',
              padding: '0.85rem 0',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <User size={14} /> {article.author}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={14} /> {article.date}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={14} /> {article.readTime}
            </span>
          </div>
        </header>

        {/* Cover Image */}
        <div
          style={{
            borderRadius: 'var(--radius-xs)',
            overflow: 'hidden',
            marginBottom: '3rem',
            border: '1px solid var(--border-light)',
          }}
        >
          <img
            src={article.coverImage}
            alt={article.title}
            style={{ width: '100%', maxHeight: '480px', objectFit: 'cover' }}
          />
        </div>

        {/* Content Paragraphs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', fontSize: '1.1rem', lineHeight: 1.85, color: '#2B332E', marginBottom: '3.5rem' }}>
          {article.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '4rem' }}>
          <Tag size={16} color="var(--color-gold-dark)" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {article.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-light)',
                  padding: '0.3rem 0.75rem',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.8rem',
                  color: 'var(--color-forest-dark)',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Explore Sarees Callout */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-gold)',
            borderRadius: 'var(--radius-xs)',
            padding: '2.5rem',
            textAlign: 'center',
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', marginBottom: '0.75rem' }}>
            Explore Verified Handloom Weaves
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '560px', margin: '0 auto 1.5rem auto' }}>
            Discover our authentic saree catalog honoring the techniques explored in this essay.
          </p>
          <Link to="/collection" className="btn-primary">
            Shop Handloom Sarees <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};
