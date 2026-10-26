import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, ShieldCheck, Image as ImageIcon, Sparkles } from 'lucide-react';
import type { SareeCategory, ColorFamily, SareeOccasion } from '../../types';
import { getSareeById, createSaree, updateSaree, getCurrentAdmin } from '../../services/db';
import { useToast } from '../../components/common/Toast';

export const AdminSareeEditorPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const admin = getCurrentAdmin();

  const [loading, setLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState<SareeCategory>('silk');
  const [fabric, setFabric] = useState('');
  const [color, setColor] = useState('');
  const [colorFamily, setColorFamily] = useState<ColorFamily>('green');
  const [occasion, setOccasion] = useState<SareeOccasion>('Festive & Celebrations');
  const [weavingTechnique, setWeavingTechnique] = useState('');
  const [regionalOrigin, setRegionalOrigin] = useState('');
  const [clusterName, setClusterName] = useState('');
  const [isVerifiedHandloom, setIsVerifiedHandloom] = useState(true);
  const [handloomCertification, setHandloomCertification] = useState('Silk Mark Certified • 100% Handloom');

  const [price, setPrice] = useState<number>(25000);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(30000);
  const [stock, setStock] = useState<number>(3);
  const [isAvailable, setIsAvailable] = useState(true);
  const [isMadeToOrder, setIsMadeToOrder] = useState(false);
  const [dispatchTime, setDispatchTime] = useState('Ships within 24–48 hours');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  // Dimensions
  const [length, setLength] = useState('5.5 meters');
  const [width, setWidth] = useState('45 inches (114 cm)');
  const [blousePiece, setBlousePiece] = useState('Includes 80 cm unstitched running blouse piece');
  const [hasBlousePiece, setHasBlousePiece] = useState(true);

  // Materials
  const [warp, setWarp] = useState('Pure Mulberry 3-ply twisted silk');
  const [weft, setWeft] = useState('Pure Mulberry silk with silver-gilded electroplated zari');
  const [zariPurity, setZariPurity] = useState('Tested Antique Zari with 0.6% Silver plating');
  const [weightApprox, setWeightApprox] = useState('approx. 850 grams');

  // Care instructions
  const [careInstructions, setCareInstructions] = useState<string[]>([
    'Dry clean only by specialized heritage textile conservators',
    'Wrap in unbleached pure cotton or muslin fabric; avoid plastic bags',
    'Store flat in a dark, dry cabinet away from direct moisture',
    'Re-fold every 3 to 4 months along fresh creases to prevent zari wear',
  ]);
  const [newCareItem, setNewCareItem] = useState('');

  // Images
  const [heroImg, setHeroImg] = useState('/images/hero-saree.jpg');
  const [borderImg, setBorderImg] = useState('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85');
  const [palluImg, setPalluImg] = useState('https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85');
  const [bodyImg, setBodyImg] = useState('https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85');
  const [textureImg, setTextureImg] = useState('https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85');

  // Story
  const [storyHeadline, setStoryHeadline] = useState('');
  const [storyText, setStoryText] = useState('');
  const [clusterNotes, setClusterNotes] = useState('');
  const [artisanAttribution, setArtisanAttribution] = useState('');
  const [isVerifiedFact, setIsVerifiedFact] = useState(true);

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }

    if (isEditing && id) {
      setLoading(true);
      getSareeById(id).then((s) => {
        if (s) {
          setTitle(s.title);
          setSlug(s.slug);
          setSubtitle(s.subtitle);
          setSku(s.sku);
          setCategory(s.category);
          setFabric(s.fabric);
          setColor(s.color);
          setColorFamily(s.colorFamily);
          setOccasion(s.occasion);
          setWeavingTechnique(s.weavingTechnique);
          setRegionalOrigin(s.regionalOrigin);
          setClusterName(s.clusterName);
          setIsVerifiedHandloom(s.isVerifiedHandloom);
          setHandloomCertification(s.handloomCertification);
          setPrice(s.price);
          setOriginalPrice(s.originalPrice);
          setStock(s.stock);
          setIsAvailable(s.isAvailable);
          setIsMadeToOrder(s.isMadeToOrder);
          setDispatchTime(s.dispatchTime);
          setIsFeatured(s.isFeatured);
          setIsPublished(s.isPublished);

          setLength(s.dimensions.length);
          setWidth(s.dimensions.width);
          setBlousePiece(s.dimensions.blousePiece);
          setHasBlousePiece(s.dimensions.hasBlousePiece);

          setWarp(s.materials.warp);
          setWeft(s.materials.weft);
          setZariPurity(s.materials.zariPurity);
          setWeightApprox(s.materials.weightApprox);

          setCareInstructions(s.careInstructions || []);

          setHeroImg(s.images.hero || '');
          setBorderImg(s.images.border || '');
          setPalluImg(s.images.pallu || '');
          setBodyImg(s.images.body || '');
          setTextureImg(s.images.texture || '');

          setStoryHeadline(s.story.headline || '');
          setStoryText(s.story.text || '');
          setClusterNotes(s.story.clusterNotes || '');
          setArtisanAttribution(s.story.artisanAttribution || '');
          setIsVerifiedFact(s.story.isVerifiedFact);
        }
        setLoading(false);
      });
    }
  }, [id, isEditing, admin, navigate]);

  // Auto-generate slug when title changes in new mode
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditing) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      );
    }
  };

  const addCareInstruction = () => {
    if (!newCareItem.trim()) return;
    setCareInstructions([...careInstructions, newCareItem.trim()]);
    setNewCareItem('');
  };

  const removeCareInstruction = (index: number) => {
    setCareInstructions(careInstructions.filter((_, idx) => idx !== index));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title,
      slug: slug || `aaranya-${Date.now()}`,
      subtitle,
      sku: sku || `AAR-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      category,
      fabric,
      color,
      colorFamily,
      occasion,
      weavingTechnique,
      regionalOrigin,
      clusterName,
      isVerifiedHandloom,
      handloomCertification,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      stock: Number(stock),
      isAvailable: Number(stock) > 0,
      isMadeToOrder,
      dispatchTime,
      isFeatured,
      isPublished,
      dimensions: {
        length,
        width,
        blousePiece,
        hasBlousePiece,
      },
      materials: {
        warp,
        weft,
        zariPurity,
        weightApprox,
      },
      careInstructions,
      images: {
        hero: heroImg,
        border: borderImg,
        pallu: palluImg,
        body: bodyImg,
        texture: textureImg,
      },
      story: {
        headline: storyHeadline || `The Legacy of ${title}`,
        text: storyText || `Handwoven with generational craftsmanship in ${regionalOrigin}.`,
        clusterNotes: clusterNotes || `Traditional craft guild of ${regionalOrigin}.`,
        artisanAttribution: artisanAttribution || `Master weavers of ${clusterName}.`,
        isVerifiedFact,
        journeyTimeline: [
          {
            step: 1,
            title: 'Sericulture & Pure Filament Selection',
            description: 'Carefully sorted raw filaments sized for tensile durability.',
            duration: '4 Days',
            artisanRole: 'Silk Twisters Guild',
          },
          {
            step: 2,
            title: 'Vat Dyeing',
            description: 'Steeped in colorfast baths in copper cauldrons.',
            duration: '3 Days',
            artisanRole: 'Dye Master',
          },
          {
            step: 3,
            title: 'Pit Loom Graph & Setup',
            description: 'Manual warp threading through reeds.',
            duration: '4 Days',
            artisanRole: 'Loom Setup Artisans',
          },
          {
            step: 4,
            title: 'Handloom Shuttle Weaving',
            description: 'Two artisans work the pedals and shuttles in synchronized rhythm.',
            duration: '18 Days',
            artisanRole: 'Master Artisan',
          },
          {
            step: 5,
            title: 'Tasseling & Certification',
            description: 'Hand-knotted pallu fringes and official inspection.',
            duration: '2 Days',
            artisanRole: 'Finishing Guild',
          },
        ],
      },
    };

    try {
      if (isEditing && id) {
        await updateSaree(id, payload);
        showToast(`Updated "${title}" successfully`, 'success');
      } else {
        await createSaree(payload);
        showToast(`Created new saree "${title}"`, 'success');
      }
      navigate('/admin');
    } catch (err: any) {
      showToast(err.message || 'Failed to persist saree', 'info');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-editor-page" style={{ padding: '2.5rem 0 6rem 0', backgroundColor: '#F8F6F1' }}>
      <div className="container" style={{ maxWidth: '980px' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem',
          }}
        >
          <Link
            to="/admin"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.85rem',
              color: 'var(--color-forest)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Database: <strong>Persistent Schema</strong>
            </span>
          </div>
        </div>

        <form onSubmit={handleSave}>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-xs)',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '2rem',
            }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2rem',
                color: 'var(--color-forest-dark)',
                marginBottom: '1.5rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--border-light)',
              }}
            >
              {isEditing ? `Edit Saree: ${title}` : 'Add New Handloom Saree'}
            </h1>

            {/* BASIC METADATA */}
            <h3 style={{ fontFamily: 'var(--font-brand)', fontSize: '0.85rem', color: 'var(--color-gold-dark)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              1. Identity & Pricing
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Saree Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Rajkumari Korvai Kanjeevaram Pure Silk Saree"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Unique URL Slug *</label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="rajkumari-kanjeevaram-emerald"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Inventory SKU *</label>
                <input
                  type="text"
                  required
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="AAR-KANJ-001"
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Editorial Subtitle *</label>
                <input
                  type="text"
                  required
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Woven with pure 3-ply mulberry silk and antique zari in Kanchipuram."
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Storefront Price (INR) *</label>
                <input
                  type="number"
                  required
                  min="1000"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Original MRP (Optional, for strikethrough)</label>
                <input
                  type="number"
                  min="0"
                  value={originalPrice || ''}
                  onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Current Stock Count *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Dispatch Timeline *</label>
                <input
                  type="text"
                  required
                  value={dispatchTime}
                  onChange={(e) => setDispatchTime(e.target.value)}
                  placeholder="Ships within 24–48 hours"
                  className="form-input"
                />
              </div>
            </div>

            {/* CATEGORY & CRAFT ATTRIBUTES */}
            <h3 style={{ fontFamily: 'var(--font-brand)', fontSize: '0.85rem', color: 'var(--color-gold-dark)', textTransform: 'uppercase', marginBottom: '1.25rem', marginTop: '2rem' }}>
              2. Saree Categorization & Regional Lineage
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Collection Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as SareeCategory)}
                  className="form-select"
                >
                  <option value="silk">Silk Sarees</option>
                  <option value="cotton">Cotton Sarees</option>
                  <option value="festive">Festive Sarees</option>
                  <option value="wedding">Wedding Sarees</option>
                  <option value="everyday">Everyday Handlooms</option>
                  <option value="regional">Regional Traditions</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Occasion *</label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value as SareeOccasion)}
                  className="form-select"
                >
                  <option value="Wedding & Bridal">Wedding & Bridal</option>
                  <option value="Festive & Celebrations">Festive & Celebrations</option>
                  <option value="Everyday Handlooms">Everyday Handlooms</option>
                  <option value="Formal & Soirée">Formal & Soirée</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Color Description *</label>
                <input
                  type="text"
                  required
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="e.g. Forest Emerald with Crimson Temple"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Color Family (For Filter) *</label>
                <select
                  value={colorFamily}
                  onChange={(e) => setColorFamily(e.target.value as ColorFamily)}
                  className="form-select"
                >
                  <option value="ivory">Ivory & Cream</option>
                  <option value="green">Forest Green</option>
                  <option value="gold">Muted Gold</option>
                  <option value="maroon">Deep Maroon</option>
                  <option value="earth">Earthy Brown</option>
                  <option value="indigo">Midnight Indigo</option>
                  <option value="pink">Blush Pink</option>
                  <option value="purple">Imperial Purple</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Handloom Fabric *</label>
                <input
                  type="text"
                  required
                  value={fabric}
                  onChange={(e) => setFabric(e.target.value)}
                  placeholder="e.g. Pure Kanjeevaram Mulberry Silk (3-Ply)"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Weaving Technique *</label>
                <input
                  type="text"
                  required
                  value={weavingTechnique}
                  onChange={(e) => setWeavingTechnique(e.target.value)}
                  placeholder="e.g. Korvai Interlocking Weave with Petni Zari Pallu"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Regional Origin *</label>
                <input
                  type="text"
                  required
                  value={regionalOrigin}
                  onChange={(e) => setRegionalOrigin(e.target.value)}
                  placeholder="e.g. Kanchipuram, Tamil Nadu"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Weaver Guild / Cluster Name *</label>
                <input
                  type="text"
                  required
                  value={clusterName}
                  onChange={(e) => setClusterName(e.target.value)}
                  placeholder="e.g. Kanchipuram Master Weavers Guild"
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Handloom Certification Badge *</label>
                <input
                  type="text"
                  required
                  value={handloomCertification}
                  onChange={(e) => setHandloomCertification(e.target.value)}
                  placeholder="Silk Mark India Certified • Handloom Mark #TN-KANJ-4482"
                  className="form-input"
                />
              </div>
            </div>

            {/* DIMENSIONS & MATERIALS */}
            <h3 style={{ fontFamily: 'var(--font-brand)', fontSize: '0.85rem', color: 'var(--color-gold-dark)', textTransform: 'uppercase', marginBottom: '1.25rem', marginTop: '2rem' }}>
              3. Dimensions & Verified Fiber Specifications
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Saree Length *</label>
                <input
                  type="text"
                  required
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Saree Width *</label>
                <input
                  type="text"
                  required
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Blouse Piece Details *</label>
                <input
                  type="text"
                  required
                  value={blousePiece}
                  onChange={(e) => setBlousePiece(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Warp Thread Composition *</label>
                <input
                  type="text"
                  required
                  value={warp}
                  onChange={(e) => setWarp(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Weft Thread Composition *</label>
                <input
                  type="text"
                  required
                  value={weft}
                  onChange={(e) => setWeft(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Zari Metallurgy / Purity *</label>
                <input
                  type="text"
                  required
                  value={zariPurity}
                  onChange={(e) => setZariPurity(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Approximate Weight *</label>
                <input
                  type="text"
                  required
                  value={weightApprox}
                  onChange={(e) => setWeightApprox(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            {/* PHOTOGRAPHY GALLERY */}
            <h3 style={{ fontFamily: 'var(--font-brand)', fontSize: '0.85rem', color: 'var(--color-gold-dark)', textTransform: 'uppercase', marginBottom: '1.25rem', marginTop: '2rem' }}>
              4. High-Resolution Saree Photography (Multi-Image Angles)
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Hero / Primary Drape Image URL *</label>
                <input
                  type="text"
                  required
                  value={heroImg}
                  onChange={(e) => setHeroImg(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Border Close-Up Image URL</label>
                <input
                  type="text"
                  value={borderImg}
                  onChange={(e) => setBorderImg(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Pallu View Image URL</label>
                <input
                  type="text"
                  value={palluImg}
                  onChange={(e) => setPalluImg(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Pleats & Body Image URL</label>
                <input
                  type="text"
                  value={bodyImg}
                  onChange={(e) => setBodyImg(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Macro Weave Texture Image URL</label>
                <input
                  type="text"
                  value={textureImg}
                  onChange={(e) => setTextureImg(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            {/* WEAVING STORY & ARTISAN ATTRIBUTION */}
            <h3 style={{ fontFamily: 'var(--font-brand)', fontSize: '0.85rem', color: 'var(--color-gold-dark)', textTransform: 'uppercase', marginBottom: '1.25rem', marginTop: '2rem' }}>
              5. Weaving Story & Heritage Attribution
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Story Headline</label>
                <input
                  type="text"
                  value={storyHeadline}
                  onChange={(e) => setStoryHeadline(e.target.value)}
                  placeholder="e.g. The Sacred Temple Borders of Kanchipuram"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Weaving Narrative Text</label>
                <textarea
                  rows={4}
                  value={storyText}
                  onChange={(e) => setStoryText(e.target.value)}
                  placeholder="Detail the loom technique, cultural motifs, and two-weaver cadence..."
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Cluster Historical Context</label>
                <input
                  type="text"
                  value={clusterNotes}
                  onChange={(e) => setClusterNotes(e.target.value)}
                  placeholder="Historical heritage of the guild..."
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Artisan Guild Attribution</label>
                <input
                  type="text"
                  value={artisanAttribution}
                  onChange={(e) => setArtisanAttribution(e.target.value)}
                  placeholder="Hand-woven by the master guild under cooperative fair-welfare norms."
                  className="form-input"
                />
              </div>
            </div>

            {/* CARE INSTRUCTIONS LIST */}
            <h3 style={{ fontFamily: 'var(--font-brand)', fontSize: '0.85rem', color: 'var(--color-gold-dark)', textTransform: 'uppercase', marginBottom: '1.25rem', marginTop: '2rem' }}>
              6. Care Instructions
            </h3>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  value={newCareItem}
                  onChange={(e) => setNewCareItem(e.target.value)}
                  placeholder="Add care instruction (e.g. Wrap in pure unbleached muslin)..."
                  className="form-input"
                  style={{ flexGrow: 1 }}
                />
                <button
                  type="button"
                  onClick={addCareInstruction}
                  className="btn-secondary"
                  style={{ padding: '0.75rem 1.25rem' }}
                >
                  Add
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {careInstructions.map((instruction, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.5rem 0.85rem',
                      backgroundColor: 'var(--bg-surface)',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.85rem',
                    }}
                  >
                    <span>{instruction}</span>
                    <button
                      type="button"
                      onClick={() => removeCareInstruction(idx)}
                      style={{ color: 'var(--color-maroon)', cursor: 'pointer' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* TOGGLES: PUBLISHED, FEATURED */}
            <div
              style={{
                display: 'flex',
                gap: '2.5rem',
                padding: '1.5rem',
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--border-light)',
                marginBottom: '2rem',
              }}
            >
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  style={{ accentColor: 'var(--color-forest)', transform: 'scale(1.2)' }}
                />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Publish Live on Storefront</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  style={{ accentColor: 'var(--color-forest)', transform: 'scale(1.2)' }}
                />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Feature on Homepage</span>
              </label>
            </div>

            {/* SAVE BUTTON */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="btn-secondary"
                style={{ padding: '0.95rem 2rem' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ padding: '0.95rem 2.5rem' }}
              >
                <Save size={18} /> {loading ? 'Persisting to Database...' : 'Save Saree to Database'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
