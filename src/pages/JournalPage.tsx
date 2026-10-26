import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../data/sarees.data';

export const JournalPage: React.FC = () => {
  return (
    <div className="journal-page" style={{ padding: '3.5rem 0 6rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4.5rem auto' }}>
          <span className="section-tag">Textile Archive & Knowledge</span>
          <h1 className="section-title">The Aaranya Textile Journal</h1>
          <p className="section-subtitle">
            Essays on Indian textile metallurgy, handloom preservation, heirloom storage, and the cultural
            anthropology of traditional drapes.
          </p>
        </div>

        {/* Featured Editorial Article */}
        <article
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-xs)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
            marginBottom: '4.5rem',
          }}
        >
          <div style={{ height: '400px', overflow: 'hidden' }}>
            <img
              src={JOURNAL_ARTICLES[0].coverImage}
              alt={JOURNAL_ARTICLES[0].title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ padding: '2.5rem' }}>
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                fontSize: '0.75rem',
                color: 'var(--color-gold-dark)',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginBottom: '0.75rem',
              }}
            >
              <span>{JOURNAL_ARTICLES[0].category}</span>
              <span>•</span>
              <span>{JOURNAL_ARTICLES[0].readTime}</span>
              <span>•</span>
              <span>{JOURNAL_ARTICLES[0].date}</span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.25rem',
                color: 'var(--color-forest-dark)',
                lineHeight: 1.25,
                marginBottom: '1rem',
              }}
            >
              <Link to={`/journal/${JOURNAL_ARTICLES[0].slug}`}>{JOURNAL_ARTICLES[0].title}</Link>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>
              {JOURNAL_ARTICLES[0].excerpt}
            </p>
            <Link to={`/journal/${JOURNAL_ARTICLES[0].slug}`} className="btn-primary">
              Read Archival Essay <ArrowRight size={16} />
            </Link>
          </div>
        </article>

        {/* Remaining Articles Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {JOURNAL_ARTICLES.slice(1).map((article) => (
            <article
              key={article.id}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ height: '240px', overflow: 'hidden' }}>
                <img
                  src={article.coverImage}
                  alt={article.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem',
                    color: 'var(--color-gold-dark)',
                    textTransform: 'uppercase',
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
                    fontSize: '1.5rem',
                    color: 'var(--color-forest-dark)',
                    lineHeight: 1.3,
                    marginBottom: '0.75rem',
                  }}
                >
                  <Link to={`/journal/${article.slug}`}>{article.title}</Link>
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {article.excerpt}
                </p>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Link
                    to={`/journal/${article.slug}`}
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--color-forest)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    Read Essay <ArrowRight size={14} />
                  </Link>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{article.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
