import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Star,
  Layers,
  Sparkles,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import type { Saree } from '../../types';
import {
  getAllSarees,
  getCatalogStats,
  deleteSaree,
  togglePublishSaree,
  updateSareeStock,
  getCurrentAdmin,
  logoutAdmin,
  updateSaree,
} from '../../services/db';
import type { CatalogStats } from '../../services/db';
import { formatCurrency } from '../../utils/whatsapp';
import { useToast } from '../../components/common/Toast';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const admin = getCurrentAdmin();

  const [sarees, setSarees] = useState<Saree[]>([]);
  const [stats, setStats] = useState<CatalogStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Delete confirmation modal state
  const [deleteTarget, setDeleteTarget] = useState<Saree | null>(null);

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }
    loadData();
  }, [admin, navigate]);

  const loadData = async () => {
    setLoading(true);
    const [all, catalogStats] = await Promise.all([
      getAllSarees(true), // include drafts
      getCatalogStats(),
    ]);
    setSarees(all);
    setStats(catalogStats);
    setLoading(false);
  };

  const handleLogout = () => {
    logoutAdmin();
    showToast('Signed out of Atelier Portal', 'info');
    navigate('/admin/login');
  };

  const handleTogglePublish = async (saree: Saree) => {
    try {
      const updated = await togglePublishSaree(saree.id, !saree.isPublished);
      setSarees((prev) => prev.map((s) => (s.id === saree.id ? updated : s)));
      showToast(
        updated.isPublished ? `"${saree.title}" is now published.` : `"${saree.title}" has been archived to draft.`,
        'success'
      );
      loadData();
    } catch (e: any) {
      showToast('Failed to update status', 'info');
    }
  };

  const handleToggleFeatured = async (saree: Saree) => {
    try {
      const updated = await updateSaree(saree.id, { isFeatured: !saree.isFeatured });
      setSarees((prev) => prev.map((s) => (s.id === saree.id ? updated : s)));
      showToast(
        updated.isFeatured ? `Marked as Featured Saree.` : `Removed from Featured section.`,
        'success'
      );
    } catch (e: any) {
      showToast('Failed to toggle featured status', 'info');
    }
  };

  const handleStockChange = async (saree: Saree, delta: number) => {
    const newStock = Math.max(0, saree.stock + delta);
    try {
      const updated = await updateSareeStock(saree.id, newStock);
      setSarees((prev) => prev.map((s) => (s.id === saree.id ? updated : s)));
      showToast(`Stock updated to ${newStock} for "${saree.title}"`, 'success');
      loadData();
    } catch (e) {
      showToast('Failed to update stock', 'info');
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteSaree(deleteTarget.id);
      setSarees((prev) => prev.filter((s) => s.id !== deleteTarget.id));
      showToast(`Deleted "${deleteTarget.title}" from database`, 'info');
      setDeleteTarget(null);
      loadData();
    } catch (e) {
      showToast('Failed to delete saree', 'info');
    }
  };

  const filteredSarees = sarees.filter((s) => {
    const matchCat = selectedCategory === 'all' || s.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchQuery =
      !q ||
      s.title.toLowerCase().includes(q) ||
      s.sku.toLowerCase().includes(q) ||
      s.fabric.toLowerCase().includes(q) ||
      s.regionalOrigin.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  return (
    <div className="admin-dashboard-page" style={{ padding: '2.5rem 0 6rem 0', backgroundColor: '#F8F6F1', minHeight: '90vh' }}>
      <div className="container">
        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid var(--border-light)',
            marginBottom: '2.5rem',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
                color: 'var(--color-gold-dark)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: 600,
                marginBottom: '0.35rem',
              }}
            >
              <ShieldCheck size={14} /> Authenticated Curator: {admin?.name} ({admin?.role})
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--color-forest-dark)', lineHeight: 1.1 }}>
              Atelier Catalog Dashboard
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <Link
              to="/"
              target="_blank"
              className="btn-secondary"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.8rem' }}
            >
              <ExternalLink size={15} /> View Storefront
            </Link>

            <Link
              to="/admin/sarees/new"
              className="btn-primary"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.8rem' }}
            >
              <Plus size={16} /> Add New Handloom Saree
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="icon-btn"
              style={{ border: '1px solid var(--border-light)', backgroundColor: '#FFFFFF' }}
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut size={18} color="var(--color-maroon)" />
            </button>
          </div>
        </div>

        {/* Catalog Metrics Cards */}
        {stats && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.25rem',
              marginBottom: '3rem',
            }}
          >
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '1.5rem',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--border-light)',
              }}
            >
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                Total Catalog
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', fontWeight: 700, color: 'var(--color-forest-dark)' }}>
                {stats.totalCount} Sarees
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '1.5rem',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--border-light)',
              }}
            >
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                Published Live
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', fontWeight: 700, color: '#10B981' }}>
                {stats.publishedCount} Sarees
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '1.5rem',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--border-light)',
              }}
            >
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                Draft / Archived
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', fontWeight: 700, color: 'var(--color-gold-dark)' }}>
                {stats.draftCount} Pieces
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '1.5rem',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--border-light)',
              }}
            >
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                Low Stock Warning (≤2)
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', fontWeight: 700, color: 'var(--color-maroon)' }}>
                {stats.lowStockCount} Sarees
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '1.5rem',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--border-light)',
              }}
            >
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                Catalog Valuation
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', fontWeight: 700, color: 'var(--color-forest-dark)' }}>
                {formatCurrency(stats.totalInventoryValue)}
              </div>
            </div>
          </div>
        )}

        {/* Filter Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            padding: '1rem 1.25rem',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-xs)',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ position: 'relative', minWidth: '320px', flexGrow: 1 }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search catalog by title, SKU, fabric, or city..."
              className="form-input"
              style={{ paddingLeft: '2.4rem' }}
            />
            <Search
              size={16}
              color="var(--text-muted)"
              style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-select"
              style={{ width: 'auto', padding: '0.55rem 1rem' }}
            >
              <option value="all">All Categories</option>
              <option value="silk">Silk Sarees</option>
              <option value="cotton">Cotton Sarees</option>
              <option value="festive">Festive Sarees</option>
              <option value="wedding">Wedding Sarees</option>
              <option value="everyday">Everyday Handlooms</option>
              <option value="regional">Regional Traditions</option>
            </select>
          </div>
        </div>

        {/* Sarees Table */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-xs)',
            overflowX: 'auto',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderBottom: '1px solid var(--border-light)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                <th style={{ padding: '1rem' }}>Saree Details</th>
                <th style={{ padding: '1rem' }}>Category & Origin</th>
                <th style={{ padding: '1rem' }}>Price (INR)</th>
                <th style={{ padding: '1rem' }}>Stock Control</th>
                <th style={{ padding: '1rem' }}>Featured</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSarees.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No sarees match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredSarees.map((saree) => (
                  <tr
                    key={saree.id}
                    style={{
                      borderBottom: '1px solid var(--border-light)',
                      transition: 'background-color 150ms ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FCFAF7')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                  >
                    {/* Media + Title + SKU */}
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img
                          src={saree.images.hero}
                          alt={saree.title}
                          style={{
                            width: '48px',
                            height: '62px',
                            objectFit: 'cover',
                            borderRadius: 'var(--radius-xs)',
                            border: '1px solid var(--border-light)',
                          }}
                        />
                        <div>
                          <div
                            style={{
                              fontFamily: 'var(--font-serif)',
                              fontSize: '1.05rem',
                              fontWeight: 600,
                              color: 'var(--color-forest-dark)',
                            }}
                          >
                            {saree.title}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            SKU: {saree.sku} • {saree.fabric}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category & Origin */}
                    <td style={{ padding: '1rem' }}>
                      <div style={{ textTransform: 'capitalize', fontWeight: 500 }}>
                        {saree.category} Saree
                      </div>
                      <div style={{ fontSize: '0.775rem', color: 'var(--color-gold-dark)' }}>
                        {saree.regionalOrigin}
                      </div>
                    </td>

                    {/* Price */}
                    <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-forest-dark)' }}>
                      {formatCurrency(saree.price)}
                    </td>

                    {/* Stock Control */}
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button
                          type="button"
                          onClick={() => handleStockChange(saree, -1)}
                          style={{
                            width: '24px',
                            height: '24px',
                            border: '1px solid var(--border-light)',
                            borderRadius: 'var(--radius-xs)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                          aria-label="Decrease stock"
                        >
                          -
                        </button>
                        <span
                          style={{
                            minWidth: '24px',
                            textAlign: 'center',
                            fontWeight: 600,
                            color: saree.stock <= 2 ? 'var(--color-maroon)' : 'inherit',
                          }}
                        >
                          {saree.stock}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleStockChange(saree, 1)}
                          style={{
                            width: '24px',
                            height: '24px',
                            border: '1px solid var(--border-light)',
                            borderRadius: 'var(--radius-xs)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                          aria-label="Increase stock"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    {/* Featured Star Toggle */}
                    <td style={{ padding: '1rem' }}>
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(saree)}
                        style={{ cursor: 'pointer', color: saree.isFeatured ? '#D4AF37' : '#D1D5DB' }}
                        title={saree.isFeatured ? 'Featured on Homepage' : 'Not Featured'}
                      >
                        <Star size={18} fill={saree.isFeatured ? '#D4AF37' : 'none'} />
                      </button>
                    </td>

                    {/* Publish Status Toggle */}
                    <td style={{ padding: '1rem' }}>
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(saree)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: '0.3rem 0.65rem',
                          borderRadius: 'var(--radius-xs)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          backgroundColor: saree.isPublished ? 'var(--color-forest-surface)' : 'var(--bg-surface)',
                          color: saree.isPublished ? 'var(--color-forest-dark)' : 'var(--text-muted)',
                          border: saree.isPublished ? '1px solid #CADBD1' : '1px solid var(--border-light)',
                        }}
                      >
                        {saree.isPublished ? (
                          <>
                            <Eye size={13} /> Published
                          </>
                        ) : (
                          <>
                            <EyeOff size={13} /> Draft
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Link
                          to={`/admin/sarees/${saree.id}/edit`}
                          className="icon-btn"
                          style={{ width: '2rem', height: '2rem' }}
                          title="Edit Saree Details"
                        >
                          <Edit size={16} color="var(--color-forest)" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(saree)}
                          className="icon-btn"
                          style={{ width: '2rem', height: '2rem' }}
                          title="Delete Saree"
                        >
                          <Trash2 size={16} color="var(--color-maroon)" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <>
          <div
            className="drawer-backdrop"
            onClick={() => setDeleteTarget(null)}
            style={{ zIndex: 1200 }}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Confirm deletion"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: '460px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xs)',
              padding: '2rem',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 1201,
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-maroon-surface)',
                color: 'var(--color-maroon)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <AlertTriangle size={24} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              Confirm Deletion
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Are you sure you want to permanently delete <strong>{deleteTarget.title}</strong>? This action
              will remove it immediately from both the persistent database and the public catalog.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="btn-secondary"
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.8rem' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                style={{
                  padding: '0.65rem 1.25rem',
                  backgroundColor: 'var(--color-maroon)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
