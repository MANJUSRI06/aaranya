import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, X, RotateCcw, Search, Check, Sparkles } from 'lucide-react';
import type { Saree, SareeCategory, ColorFamily } from '../types';
import { getAllSarees } from '../services/db';
import { SareeCard } from '../components/common/SareeCard';
import { formatCurrency } from '../utils/whatsapp';

export const CollectionPage: React.FC = () => {
  const { category: routeCategory } = useParams<{ category?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [sarees, setSarees] = useState<Saree[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>(routeCategory || 'all');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedTechniques, setSelectedTechniques] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<'all' | 'in-stock' | 'made-to-order'>('all');
  const [priceMax, setPriceMax] = useState<number>(80000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sync route param with category
  useEffect(() => {
    if (routeCategory) {
      setSelectedCategory(routeCategory);
    } else {
      setSelectedCategory('all');
    }
  }, [routeCategory]);

  // Initial load
  useEffect(() => {
    setLoading(true);
    getAllSarees(false).then((data) => {
      setSarees(data);
      setLoading(false);
    });
  }, []);

  // Filter categories metadata
  const categoriesList = [
    { id: 'all', label: 'All Sarees', to: '/collection' },
    { id: 'silk', label: 'Silk Sarees', to: '/collection/silk' },
    { id: 'cotton', label: 'Cotton Sarees', to: '/collection/cotton' },
    { id: 'festive', label: 'Festive Sarees', to: '/collection/festive' },
    { id: 'wedding', label: 'Wedding Sarees', to: '/collection/wedding' },
    { id: 'everyday', label: 'Everyday Handlooms', to: '/collection/everyday' },
    { id: 'regional', label: 'Regional Traditions', to: '/collection/regional' },
  ];

  // Colors available
  const colorOptions: { id: ColorFamily; label: string; hex: string }[] = [
    { id: 'ivory', label: 'Ivory & Cream', hex: '#FAF7F2' },
    { id: 'green', label: 'Forest Green', hex: '#1A382B' },
    { id: 'gold', label: 'Muted Gold', hex: '#C5A059' },
    { id: 'maroon', label: 'Deep Maroon', hex: '#5E1914' },
    { id: 'earth', label: 'Earthy Brown', hex: '#4A3525' },
    { id: 'indigo', label: 'Midnight Indigo', hex: '#1F2937' },
    { id: 'pink', label: 'Blush Pink', hex: '#E8A598' },
    { id: 'purple', label: 'Imperial Purple', hex: '#4A154B' },
  ];

  // Distinct filter options extracted from active catalog
  const distinctFabrics = useMemo(() => {
    return Array.from(new Set(sarees.map((s) => s.fabric))).filter(Boolean);
  }, [sarees]);

  const distinctOccasions = useMemo(() => {
    return Array.from(new Set(sarees.map((s) => s.occasion))).filter(Boolean);
  }, [sarees]);

  const distinctTechniques = useMemo(() => {
    return Array.from(new Set(sarees.map((s) => s.weavingTechnique))).filter(Boolean);
  }, [sarees]);

  // Handle color toggle
  const toggleColor = (colorId: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorId) ? prev.filter((c) => c !== colorId) : [...prev, colorId]
    );
  };

  // Handle fabric toggle
  const toggleFabric = (fabric: string) => {
    setSelectedFabrics((prev) =>
      prev.includes(fabric) ? prev.filter((f) => f !== fabric) : [...prev, fabric]
    );
  };

  // Handle occasion toggle
  const toggleOccasion = (occ: string) => {
    setSelectedOccasions((prev) =>
      prev.includes(occ) ? prev.filter((o) => o !== occ) : [...prev, occ]
    );
  };

  // Handle technique toggle
  const toggleTechnique = (tech: string) => {
    setSelectedTechniques((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  // Reset all filters
  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedColors([]);
    setSelectedFabrics([]);
    setSelectedOccasions([]);
    setSelectedTechniques([]);
    setSelectedAvailability('all');
    setPriceMax(80000);
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedColors.length > 0 ||
    selectedFabrics.length > 0 ||
    selectedOccasions.length > 0 ||
    selectedTechniques.length > 0 ||
    selectedAvailability !== 'all' ||
    priceMax < 80000 ||
    searchQuery.trim().length > 0;

  // Filtered and Sorted Sarees
  const filteredSarees = useMemo(() => {
    let result = [...sarees];

    // Category
    if (selectedCategory !== 'all') {
      result = result.filter((s) => s.category === selectedCategory);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.fabric.toLowerCase().includes(q) ||
          s.regionalOrigin.toLowerCase().includes(q) ||
          s.weavingTechnique.toLowerCase().includes(q)
      );
    }

    // Price Max
    result = result.filter((s) => s.price <= priceMax);

    // Color Family
    if (selectedColors.length > 0) {
      result = result.filter((s) => selectedColors.includes(s.colorFamily));
    }

    // Fabric
    if (selectedFabrics.length > 0) {
      result = result.filter((s) => selectedFabrics.includes(s.fabric));
    }

    // Occasion
    if (selectedOccasions.length > 0) {
      result = result.filter((s) => selectedOccasions.includes(s.occasion));
    }

    // Weaving Technique
    if (selectedTechniques.length > 0) {
      result = result.filter((s) => selectedTechniques.includes(s.weavingTechnique));
    }

    // Availability
    if (selectedAvailability === 'in-stock') {
      result = result.filter((s) => s.stock > 0 && !s.isMadeToOrder);
    } else if (selectedAvailability === 'made-to-order') {
      result = result.filter((s) => s.isMadeToOrder);
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      // Featured
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [
    sarees,
    selectedCategory,
    searchQuery,
    priceMax,
    selectedColors,
    selectedFabrics,
    selectedOccasions,
    selectedTechniques,
    selectedAvailability,
    sortBy,
  ]);

  return (
    <div className="collection-page" style={{ padding: '3.5rem 0 6rem 0' }}>
      <div className="container">
        {/* Editorial Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag">Saree-Only Atelier</span>
          <h1 className="section-title">
            {selectedCategory === 'silk' && 'Pure Handloom Silk Sarees'}
            {selectedCategory === 'cotton' && 'Handspun & Muslin Cotton Sarees'}
            {selectedCategory === 'festive' && 'Festive Handloom Sarees'}
            {selectedCategory === 'wedding' && 'Wedding & Bridal Heirlooms'}
            {selectedCategory === 'everyday' && 'Everyday Handlooms'}
            {selectedCategory === 'regional' && 'Regional Weaving Traditions'}
            {selectedCategory === 'all' && 'The Handloom Saree Collection'}
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '680px', margin: '0 auto' }}>
            Every saree in this archive is handwoven on traditional wooden pit looms across India's master
            weaving clusters, certified for fiber purity and ethical craftsmanship.
          </p>
        </div>

        {/* Category Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.65rem',
            marginBottom: '3rem',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '1.5rem',
          }}
        >
          {categoriesList.map((cat) => (
            <Link
              key={cat.id}
              to={cat.to}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '0.55rem 1.25rem',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.85rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontWeight: 600,
                backgroundColor:
                  selectedCategory === cat.id ? 'var(--color-forest-dark)' : 'var(--bg-surface)',
                color: selectedCategory === cat.id ? '#FAF7F2' : 'var(--text-secondary)',
                border:
                  selectedCategory === cat.id
                    ? '1px solid var(--color-forest-dark)'
                    : '1px solid var(--border-light)',
                transition: 'all 180ms ease',
              }}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Toolbar: Count, Mobile Filter Trigger, Sort */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '2rem',
            padding: '1rem 1.25rem',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-xs)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen(true)}
              className="btn-secondary"
              style={{
                display: 'inline-flex',
                padding: '0.55rem 1rem',
                fontSize: '0.8rem',
              }}
            >
              <SlidersHorizontal size={15} />
              Filter Catalog {hasActiveFilters && '• Active'}
            </button>

            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Showing <strong>{filteredSarees.length}</strong> authenticated sarees
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetAllFilters}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.8rem',
                  color: 'var(--color-maroon)',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                <RotateCcw size={13} /> Clear Filters
              </button>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                style={{
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-light)',
                  backgroundColor: '#FFFFFF',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  color: 'var(--color-forest-dark)',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                <option value="featured">Featured Heirlooms</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content Layout: Sidebar + Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }} className="collection-grid-layout">
          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
              {selectedColors.map((c) => (
                <span
                  key={c}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    backgroundColor: 'var(--color-gold-surface)',
                    border: '1px solid var(--border-gold)',
                    fontSize: '0.75rem',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-xs)',
                    color: 'var(--color-earth)',
                  }}
                >
                  Color: {c}
                  <X size={12} style={{ cursor: 'pointer' }} onClick={() => toggleColor(c)} />
                </span>
              ))}
              {selectedFabrics.map((f) => (
                <span
                  key={f}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    backgroundColor: 'var(--color-forest-surface)',
                    border: '1px solid #CADBD1',
                    fontSize: '0.75rem',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-xs)',
                    color: 'var(--color-forest-dark)',
                  }}
                >
                  {f}
                  <X size={12} style={{ cursor: 'pointer' }} onClick={() => toggleFabric(f)} />
                </span>
              ))}
              {selectedOccasions.map((o) => (
                <span
                  key={o}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.75rem',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-xs)',
                    color: 'var(--text-main)',
                  }}
                >
                  {o}
                  <X size={12} style={{ cursor: 'pointer' }} onClick={() => toggleOccasion(o)} />
                </span>
              ))}
              {priceMax < 80000 && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.75rem',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-xs)',
                  }}
                >
                  Max Price: {formatCurrency(priceMax)}
                  <X size={12} style={{ cursor: 'pointer' }} onClick={() => setPriceMax(80000)} />
                </span>
              )}
            </div>
          )}

          {/* Saree Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--color-forest)' }}>
              Loading authenticated handloom catalog...
            </div>
          ) : filteredSarees.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '5rem 2rem',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xs)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.85rem',
                  color: 'var(--color-forest-dark)',
                  marginBottom: '0.75rem',
                }}
              >
                No Handloom Sarees Match Your Filters
              </div>
              <p style={{ maxWidth: '520px', margin: '0 auto 2rem auto', color: 'var(--text-secondary)' }}>
                We could not find any sarees matching all of your selected criteria. Try expanding the price
                threshold or clearing selected fabric filters.
              </p>
              <button type="button" onClick={resetAllFilters} className="btn-primary">
                <RotateCcw size={16} /> Reset All Filters
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '2.5rem',
              }}
            >
              {filteredSarees.map((saree) => (
                <SareeCard key={saree.id} saree={saree} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FILTER DRAWER / MODAL */}
      {isMobileFiltersOpen && (
        <>
          <div
            className="drawer-backdrop"
            onClick={() => setIsMobileFiltersOpen(false)}
            aria-hidden="true"
          />
          <aside
            className="drawer-panel"
            style={{ left: 0, right: 'auto', animation: 'slideInLeft 300ms var(--ease-smooth)' }}
            role="dialog"
            aria-label="Filter sarees"
          >
            <div className="drawer-header">
              <h2 className="drawer-title">Filter Catalog</h2>
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="icon-btn"
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>

            <div className="drawer-body" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Search Inside Catalog */}
              <div className="form-group">
                <label className="form-label">Search Handloom Catalog</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by weave, motif, city..."
                    className="form-input"
                    style={{ paddingLeft: '2.4rem' }}
                  />
                  <Search
                    size={16}
                    color="var(--text-muted)"
                    style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }}
                  />
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <div className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Maximum Price</span>
                  <strong style={{ color: 'var(--color-forest)' }}>{formatCurrency(priceMax)}</strong>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="80000"
                  step="2500"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-forest)', cursor: 'pointer' }}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    marginTop: '0.25rem',
                  }}
                >
                  <span>₹10,000</span>
                  <span>₹80,000</span>
                </div>
              </div>

              {/* Color Palette */}
              <div>
                <label className="form-label">Saree Palette</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                  {colorOptions.map((c) => {
                    const isSelected = selectedColors.includes(c.id);
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => toggleColor(c.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.65rem',
                          padding: '0.45rem 0.65rem',
                          borderRadius: 'var(--radius-xs)',
                          border: isSelected ? '1px solid var(--color-forest)' : '1px solid var(--border-light)',
                          backgroundColor: isSelected ? 'var(--color-forest-surface)' : '#FFFFFF',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        <span
                          style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '50%',
                            backgroundColor: c.hex,
                            border: '1px solid rgba(0,0,0,0.15)',
                            display: 'inline-block',
                          }}
                        />
                        <span style={{ fontWeight: isSelected ? 600 : 400 }}>{c.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Handloom Fabric */}
              {distinctFabrics.length > 0 && (
                <div>
                  <label className="form-label">Handloom Fabric</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    {distinctFabrics.map((fabric) => {
                      const isSelected = selectedFabrics.includes(fabric);
                      return (
                        <label
                          key={fabric}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.65rem',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleFabric(fabric)}
                            style={{ marginTop: '3px', accentColor: 'var(--color-forest)' }}
                          />
                          <span style={{ color: isSelected ? 'var(--color-forest-dark)' : 'var(--text-secondary)' }}>
                            {fabric}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Occasions */}
              {distinctOccasions.length > 0 && (
                <div>
                  <label className="form-label">Occasion & Ceremony</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    {distinctOccasions.map((occ) => {
                      const isSelected = selectedOccasions.includes(occ);
                      return (
                        <label
                          key={occ}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.65rem',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleOccasion(occ)}
                            style={{ accentColor: 'var(--color-forest)' }}
                          />
                          <span style={{ color: isSelected ? 'var(--color-forest-dark)' : 'var(--text-secondary)' }}>
                            {occ}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Availability */}
              <div>
                <label className="form-label">Loom Availability</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {[
                    { id: 'all', label: 'All Handlooms' },
                    { id: 'in-stock', label: 'In Stock (Ships in 24–48h)' },
                    { id: 'made-to-order', label: 'Bespoke / Made to Order' },
                  ].map((av) => (
                    <label
                      key={av.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.65rem',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                      }}
                    >
                      <input
                        type="radio"
                        name="availability"
                        checked={selectedAvailability === av.id}
                        onChange={() => setSelectedAvailability(av.id as any)}
                        style={{ accentColor: 'var(--color-forest)' }}
                      />
                      <span>{av.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="drawer-footer" style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={resetAllFilters}
                className="btn-secondary"
                style={{ flexGrow: 1, padding: '0.75rem' }}
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="btn-primary"
                style={{ flexGrow: 2, padding: '0.75rem' }}
              >
                Apply Filters ({filteredSarees.length})
              </button>
            </div>
          </aside>
        </>
      )}
    </div>
  );
};
