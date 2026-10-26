/**
 * AARANYA Saree Catalog — Initial Verified Heirloom Collection
 * Saree-only collection celebrating authentic Indian handloom traditions.
 */

import type { Saree } from '../types';

export const INITIAL_SAREES: Saree[] = [
  {
    id: 'saree-01',
    slug: 'rajkumari-kanjeevaram-pure-silk-emerald-crimson',
    title: 'Rajkumari Korvai Kanjeevaram Pure Silk Saree',
    subtitle: 'Woven with pure 3-ply mulberry silk and antique electroplated silver-gilt zari in Kanchipuram.',
    sku: 'AAR-KANJ-001',
    price: 48500,
    originalPrice: 56000,
    category: 'wedding',
    fabric: 'Pure Kanjeevaram Mulberry Silk (3-Ply)',
    color: 'Forest Emerald with Ruby Temple Border',
    colorFamily: 'green',
    occasion: 'Wedding & Bridal',
    weavingTechnique: 'Korvai Interlocking Weave with Petni Zari Pallu',
    regionalOrigin: 'Kanchipuram, Tamil Nadu',
    clusterName: 'Kanchipuram Traditional Weavers Guild',
    isVerifiedHandloom: true,
    handloomCertification: 'Silk Mark India Certified • Handloom Mark #TN-KANJ-4482',
    dimensions: {
      length: '5.5 meters',
      width: '45 inches (114 cm)',
      blousePiece: 'Includes 80 cm unstitched contrast crimson silk blouse piece',
      hasBlousePiece: true,
    },
    materials: {
      warp: 'Pure Mulberry 3-ply twisted silk (20/22 denier)',
      weft: 'Pure Mulberry Silk with silver-gilded zari',
      zariPurity: 'Tested Antique Zari with 0.6% Silver plating',
      weightApprox: 'approx. 850 grams',
    },
    careInstructions: [
      'Dry clean only by specialized heritage textile conservators',
      'Wrap in unbleached pure cotton or muslin fabric; avoid plastic bags',
      'Store flat in a dark, dry cabinet away from direct moisture',
      'Re-fold every 3 to 4 months along fresh creases to prevent zari wear',
      'Never spray perfume or deodorants directly onto silk or zari'
    ],
    stock: 3,
    isAvailable: true,
    isMadeToOrder: false,
    dispatchTime: 'Ships within 24–48 hours in signature keepsake wooden box',
    isFeatured: true,
    isPublished: true,
    images: {
      hero: '/images/hero-saree.jpg',
      border: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      pallu: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
      body: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      texture: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85',
    },
    story: {
      headline: 'The Sacred Temple Borders of Kanchipuram',
      text: 'Woven using the historic Korvai technique where two weavers sit side-by-side on the pit loom, meticulously interlocking the emerald body warp with the deep crimson border warp. The motifs draw inspiration from the temple friezes of Ekambareswarar, immortalising sacred yali, gopuram pyramids, and annapakshi swans.',
      clusterNotes: 'Kanchipuram handloom weaving is a UNESCO recognized craft tradition dating back over four centuries to the reign of Krishna Deva Raya.',
      artisanAttribution: 'Hand-woven by the master guild of Kanchipuram under standard cooperative welfare norms.',
      isVerifiedFact: true,
      journeyTimeline: [
        {
          step: 1,
          title: 'Sericulture & Mulberry Silk Sizing',
          description: 'High-twist mulberry silk cultivated in Mysore is degummed and hand-twisted into 3-ply strands for durability.',
          duration: '6 Days',
          artisanRole: 'Silk Twisters Guild'
        },
        {
          step: 2,
          title: 'Dip Dyeing in Emerald & Temple Crimson',
          description: 'Colorfast vat dyes are mixed in copper cauldrons to achieve the signature Aaranya forest emerald and temple red.',
          duration: '3 Days',
          artisanRole: 'Dye Master'
        },
        {
          step: 3,
          title: 'Pit Loom Graph Setup & Korvai Warp Pegging',
          description: 'Thousands of silk threads are hand-threaded through reeds; the petni technique is prepared for the border joinery.',
          duration: '4 Days',
          artisanRole: 'Loom Setup Specialists'
        },
        {
          step: 4,
          title: 'Two-Weaver Synchronous Looming',
          description: 'Two artisans work the pedals and shuttles in rhythmic harmony to create solid interlocking borders without visible seams.',
          duration: '18 Days',
          artisanRole: 'Master & Apprentice Weavers'
        },
        {
          step: 5,
          title: 'Pallu Tasseling & Quality Hallmark',
          description: 'Hand-knotted kuchu tassels are finished along the pallu edge before official Silk Mark certification testing.',
          duration: '2 Days',
          artisanRole: 'Finishing Artisans'
        }
      ]
    },
    createdAt: '2026-01-15T09:00:00.000Z',
    updatedAt: '2026-02-01T14:30:00.000Z',
  },
  {
    id: 'saree-02',
    slug: 'kashi-kadwa-katan-silk-deep-maroon-antique-gold',
    title: 'Kashi Kadwa Banarasi Katan Silk Saree',
    subtitle: 'Pure Katan silk embellished with intricate Kadwa meenakari motifs and antique sonaa-roopa zari.',
    sku: 'AAR-BAN-002',
    price: 54000,
    originalPrice: 62000,
    category: 'silk',
    fabric: 'Pure Banarasi Katan Silk',
    color: 'Deep Maroon with Antique Gold Zari',
    colorFamily: 'maroon',
    occasion: 'Wedding & Bridal',
    weavingTechnique: 'Authentic Kadwa Hand-Weft Meenakari',
    regionalOrigin: 'Varanasi (Kashi), Uttar Pradesh',
    clusterName: 'Varanasi Master Handloom Weavers Union',
    isVerifiedHandloom: true,
    handloomCertification: 'Silk Mark Certified • Geographical Indication #GI-BAN-07',
    dimensions: {
      length: '5.5 meters',
      width: '45 inches (114 cm)',
      blousePiece: 'Includes 80 cm pure Katan unstitched blouse piece in matching maroon with zari sleeve border',
      hasBlousePiece: true,
    },
    materials: {
      warp: 'Natural Pure Katan Mulberry Silk 2-ply',
      weft: 'Fine Spun Katan Silk with Metallic Silver Zari & Muted Gold Electroplating',
      zariPurity: 'Fine Muted Gold Zari with certified silver core',
      weightApprox: 'approx. 920 grams',
    },
    careInstructions: [
      'Strictly dry clean only',
      'Keep away from sunlight to prevent oxidation of antique zari',
      'Wrap in pure unbleached muslin with a bay leaf pouch for natural protection',
      'Do not hang on metal hangers; keep folded flat'
    ],
    stock: 2,
    isAvailable: true,
    isMadeToOrder: false,
    dispatchTime: 'Ships within 24–48 hours in signature keepsake wooden box',
    isFeatured: true,
    isPublished: true,
    images: {
      hero: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      border: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
      pallu: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      body: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85',
      texture: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    },
    story: {
      headline: 'The Grandeur of the Ghats: Kadwa Craftsmanship',
      text: 'Unlike machine jacquards or cutwork sarees where loose threads hang on the reverse, the ancient Kadwa technique requires the weaver to engrave each individual boota into the fabric by hand using a separate spool. The reverse of the saree is as smooth as the front, ensuring zero snagging against jewelry.',
      clusterNotes: 'Varanasi has been the epicenter of Indian brocade weaving since the Rigvedic era, renowned globally for floral jangla and shikargah motifs.',
      artisanAttribution: 'Weaver collective in the historic weaving alleys of Madanpura, Varanasi.',
      isVerifiedFact: true,
      journeyTimeline: [
        {
          step: 1,
          title: 'Katan Thread Throwing & Sizing',
          description: 'Raw filament silk is degummed, reeled and double-twisted to yield lustrous katan silk.',
          duration: '5 Days',
          artisanRole: 'Varanasi Katan Guild'
        },
        {
          step: 2,
          title: 'Naksha Graphing & Jala Creation',
          description: 'Master draftsman draws the floral vine motif on coordinate paper; jala threads are tied to memorize the design.',
          duration: '7 Days',
          artisanRole: 'Nakshaband Master'
        },
        {
          step: 3,
          title: 'Pit Loom Assembly with Wooden Shuttles',
          description: 'Setting up the traditional wooden pit loom with over 8,000 warp strands.',
          duration: '3 Days',
          artisanRole: 'Loom Technicians'
        },
        {
          step: 4,
          title: 'Slow Kadwa Discontinuous Weft Weaving',
          description: 'Each miniature floral motif is woven one by one with pure zari spools; daily output is limited to 4 to 6 inches.',
          duration: '26 Days',
          artisanRole: 'Master Artisan'
        },
        {
          step: 5,
          title: 'Kundi Calendering & Heritage Inspection',
          description: 'Manual wood-roller pressure calendering to enhance drape suppleness without chemical finishes.',
          duration: '2 Days',
          artisanRole: 'Finishing Guild'
        }
      ]
    },
    createdAt: '2026-01-20T11:00:00.000Z',
    updatedAt: '2026-02-05T16:00:00.000Z',
  },
  {
    id: 'saree-03',
    slug: 'avani-chanderi-silk-cotton-warm-ivory-gold-ashrafi',
    title: 'Avani Chanderi Silk Cotton Saree with Ashrafi Booti',
    subtitle: 'Feather-light Chanderi handloom in warm ivory featuring delicate coin motifs woven with real zari.',
    sku: 'AAR-CHAN-003',
    price: 18500,
    originalPrice: 22000,
    category: 'cotton',
    fabric: 'Chanderi Handloom (Silk Warp, Cotton Weft)',
    color: 'Warm Ivory with Muted Gold Boota',
    colorFamily: 'ivory',
    occasion: 'Festive & Celebrations',
    weavingTechnique: 'Traditional Chanderi Extra-Weft Handloom Weave',
    regionalOrigin: 'Chanderi, Madhya Pradesh',
    clusterName: 'Chanderi Handloom Weaver Cooperative',
    isVerifiedHandloom: true,
    handloomCertification: 'Handloom Mark India • GI Certified #GI-CHAN-04',
    dimensions: {
      length: '5.5 meters',
      width: '45 inches (114 cm)',
      blousePiece: 'Includes 80 cm running ivory Chanderi unstitched blouse piece with gold border',
      hasBlousePiece: true,
    },
    materials: {
      warp: 'Mulberry Raw Silk 20/22 Denier',
      weft: 'Fine Count Mercerized Cotton (100s count)',
      zariPurity: 'Muted Gold Tested Zari',
      weightApprox: 'approx. 380 grams (ultra-lightweight)',
    },
    careInstructions: [
      'Gentle dry clean recommended',
      'Low heat steam iron on reverse side with protective cotton cloth',
      'Store flat wrapped in natural muslin cloth',
      'Air in gentle shade every season'
    ],
    stock: 5,
    isAvailable: true,
    isMadeToOrder: false,
    dispatchTime: 'Ships within 24–48 hours',
    isFeatured: true,
    isPublished: true,
    images: {
      hero: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
      border: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      pallu: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      body: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85',
      texture: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
    },
    story: {
      headline: 'The Gossamer Translucence of the Malwa Plateau',
      text: 'Celebrated by royal courts since the 13th century, Chanderi weaving marries the sheer luster of pure silk in the warp with the breathable comfort of fine cotton in the weft. The round Ashrafi (golden coin) booti is meticulously hand-plucked using supplementary weft threads.',
      clusterNotes: 'Nestled between the Vindhyachal hills, Chanderi artisans utilize ancient pit looms with throw-shuttles to maintain gossamer fineness.',
      artisanAttribution: 'Chanderi Weaver Cluster, Ashoknagar District, Madhya Pradesh.',
      isVerifiedFact: true,
      journeyTimeline: [
        {
          step: 1,
          title: 'Fine Count Cotton & Silk Harmonisation',
          description: 'Spinning 100-count cotton threads with fine mulberry raw silk to yield signature translucency.',
          duration: '4 Days',
          artisanRole: 'Thread Curators'
        },
        {
          step: 2,
          title: 'Ivory Bleaching & Natural Starch Bath',
          description: 'Cotton threads are treated with natural rice-gruel starch to give the weave its crisp, royal hold.',
          duration: '2 Days',
          artisanRole: 'Finishing Artisans'
        },
        {
          step: 3,
          title: 'Ashrafi Design Stencilling on Dobby',
          description: 'The geometric coin and floral buttis are programmed into the wooden dobby harnesses.',
          duration: '3 Days',
          artisanRole: 'Loom Master'
        },
        {
          step: 4,
          title: 'Handloom Throw-Shuttle Weaving',
          description: 'Slow manual weaving of the gossamer body with subtle gold borders.',
          duration: '9 Days',
          artisanRole: 'Master Artisan'
        },
        {
          step: 5,
          title: 'Inspection & Moisture-Safe Packaging',
          description: 'Every meter inspected under magnification for uniform thread tension.',
          duration: '1 Day',
          artisanRole: 'Quality Lead'
        }
      ]
    },
    createdAt: '2026-01-28T08:00:00.000Z',
    updatedAt: '2026-02-08T12:00:00.000Z',
  },
  {
    id: 'saree-04',
    slug: 'aranya-wild-tussar-silk-honey-ochre-earth-brown',
    title: 'Aaranya Wild Tussar Silk Saree in Honey Ochre',
    subtitle: 'Wild forest-harvested Kosa Tussar with natural organic sheen and hand-drawn temple border.',
    sku: 'AAR-TUS-004',
    price: 24500,
    originalPrice: 28000,
    category: 'everyday',
    fabric: '100% Wild Forest Tussar Silk (Kosa)',
    color: 'Honey Ochre with Earth Brown Border',
    colorFamily: 'earth',
    occasion: 'Everyday Handlooms',
    weavingTechnique: 'Handspun Textured Handloom Weave with Tribal Temple Pallu',
    regionalOrigin: 'Bhagalpur, Bihar',
    clusterName: 'Bhagalpur Silk Artisans Guild',
    isVerifiedHandloom: true,
    handloomCertification: 'Silk Mark India • Wild Silk Organic Certified',
    dimensions: {
      length: '5.5 meters',
      width: '45 inches (114 cm)',
      blousePiece: 'Includes 80 cm unstitched raw Tussar blouse piece with earth border',
      hasBlousePiece: true,
    },
    materials: {
      warp: 'Hand-reeled Wild Tussar (Antheraea mylitta) Silk',
      weft: 'Handspun Wild Kosa Silk with natural textured slubs',
      zariPurity: 'Muted Antique Zari in pallu highlights',
      weightApprox: 'approx. 560 grams',
    },
    careInstructions: [
      'Dry clean or gentle cold hand wash with mild baby shampoo',
      'Never wring or twist wild silk; dry flat in shade',
      'Iron on low silk setting while slightly damp',
      'Aerate twice a year in cool shade'
    ],
    stock: 4,
    isAvailable: true,
    isMadeToOrder: false,
    dispatchTime: 'Ships within 24–48 hours',
    isFeatured: true,
    isPublished: true,
    images: {
      hero: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      border: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      pallu: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
      body: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85',
      texture: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
    },
    story: {
      headline: 'The Untamed Elegance of Wild Forest Silks',
      text: 'Harvested from wild oak silkworms in the deciduous forest belts of Central India, Tussar silk is prized for its porous thermal comfort, distinctive golden beige luster, and tactile handspun slub texture. It cools in the summer heat and holds cozy warmth in winter evenings.',
      clusterNotes: 'Known colloquially as the Silk City of the East, Bhagalpur weavers have sustained wild silk rearing for over a thousand years.',
      artisanAttribution: 'Weaver collective in the Bhagalpur handloom cluster, Bihar.',
      isVerifiedFact: true,
      journeyTimeline: [
        {
          step: 1,
          title: 'Wild Cocoon Foraging & Boiling',
          description: 'Sustainably collected wild cocoons are boiled in herbal extracts to soften the natural sericin coating.',
          duration: '3 Days',
          artisanRole: 'Cocoon Harvesters'
        },
        {
          step: 2,
          title: 'Thigh Reeling by Women Artisans',
          description: 'Traditional reeling produces textured yarns with irregular, organic beauty.',
          duration: '5 Days',
          artisanRole: 'Spinning Guild'
        },
        {
          step: 3,
          title: 'Natural Clay & Bark Dyeing',
          description: 'Natural mineral and bark baths enhance the rich golden ochre and earthy brown undertones.',
          duration: '3 Days',
          artisanRole: 'Dye Artisans'
        },
        {
          step: 4,
          title: 'Handloom Texturing on Frame Looms',
          description: 'Weaving the textured fabric with traditional temple edge borders.',
          duration: '11 Days',
          artisanRole: 'Master Artisan'
        },
        {
          step: 5,
          title: 'Steam Setting & Soft Finish',
          description: 'Soft steam finishing to accentuate the natural thermal drape.',
          duration: '1 Day',
          artisanRole: 'Finishing Guild'
        }
      ]
    },
    createdAt: '2026-02-01T10:00:00.000Z',
    updatedAt: '2026-02-12T15:00:00.000Z',
  },
  {
    id: 'saree-05',
    slug: 'shantipur-jamdani-fine-muslin-blush-rose-ivory',
    title: 'Shantipur Bengal Jamdani Fine Muslin Saree',
    subtitle: 'Woven on historic pit looms in Phulia with feather-light cotton muslin and floral extra-weft motifs.',
    sku: 'AAR-JAM-005',
    price: 21000,
    originalPrice: 25000,
    category: 'cotton',
    fabric: 'Fine Bengal Handspun Muslin Cotton (120s Count)',
    color: 'Blush Rose with Pearl White & Antique Gold Weave',
    colorFamily: 'pink',
    occasion: 'Festive & Celebrations',
    weavingTechnique: 'UNESCO Recognized Jamdani Extra-Weft Hand Technique',
    regionalOrigin: 'Phulia & Shantipur, West Bengal',
    clusterName: 'Phulia Traditional Jamdani Guild',
    isVerifiedHandloom: true,
    handloomCertification: 'Handloom Mark India Certified • Verified Craft Guild',
    dimensions: {
      length: '5.5 meters',
      width: '46 inches (117 cm)',
      blousePiece: 'Includes 80 cm unstitched running Jamdani muslin blouse piece with jaal border',
      hasBlousePiece: true,
    },
    materials: {
      warp: '120s Count Combed Egyptian-Staple Cotton',
      weft: '100s Count Handspun Muslin with Bamboo Spun Extra-Weft threads',
      zariPurity: 'Subtle Gilded Zari highlights in pallu',
      weightApprox: 'approx. 320 grams (ultralight cloud drape)',
    },
    careInstructions: [
      'Delicate hand wash with cold water and organic soap nuts or dry clean',
      'Roll around a cardboard tube or store flat in breathable cotton',
      'Do not machine spin; squeeze gently between towels',
      'Iron gently on medium steam heat'
    ],
    stock: 3,
    isAvailable: true,
    isMadeToOrder: false,
    dispatchTime: 'Ships within 24–48 hours',
    isFeatured: true,
    isPublished: true,
    images: {
      hero: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85',
      border: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      pallu: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
      body: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      texture: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85',
    },
    story: {
      headline: 'Poetry in Muslin: The Intangible Heritage of Jamdani',
      text: 'Often called "woven moonlight," Jamdani is an extraordinary technique where opaque patterns are hand-embroidered directly on the loom into translucent gossamer muslin. The weaver holds no blueprint—every floral jaal and kalgai teardrop is placed from generational memory using bamboo needles.',
      clusterNotes: 'Jamdani was inscribed on the UNESCO Representative List of Intangible Cultural Heritage of Humanity in 2013.',
      artisanAttribution: 'Artisan families of Shantipur & Phulia, Nadia District, West Bengal.',
      isVerifiedFact: true,
      journeyTimeline: [
        {
          step: 1,
          title: 'Fine Cotton Combing & Water Baths',
          description: 'Long-staple cotton is hand-combed and dipped in morning dew water to ensure filament suppleness.',
          duration: '4 Days',
          artisanRole: 'Yarn Preparer'
        },
        {
          step: 2,
          title: 'Blush Rose Mineral & Herbal Bath',
          description: 'Herbal extracts of madder root and rosewood provide the muted blush nuance.',
          duration: '3 Days',
          artisanRole: 'Colorist'
        },
        {
          step: 3,
          title: 'Loom Warping with Fine Reed Teeth',
          description: 'Threading 120-count threads through dense bamboo reeds on traditional pit looms.',
          duration: '3 Days',
          artisanRole: 'Warp Specialist'
        },
        {
          step: 4,
          title: 'Bamboo Needle Extra-Weft Insertion',
          description: 'Artisans insert separate needle spools for each petal, creating motifs suspended in air.',
          duration: '21 Days',
          artisanRole: 'Master Artisan'
        },
        {
          step: 5,
          title: 'Muslin Washing & Shade Drying',
          description: 'Gently hand-washed in river water and dried on bamboo poles in soft morning sunlight.',
          duration: '2 Days',
          artisanRole: 'Weaver Guild'
        }
      ]
    },
    createdAt: '2026-02-05T09:00:00.000Z',
    updatedAt: '2026-02-14T11:00:00.000Z',
  },
  {
    id: 'saree-06',
    slug: 'yeola-paithani-pure-silk-royal-purple-peacock-pallu',
    title: 'Yeola Paithani Pure Silk Saree with Asawali Pallu',
    subtitle: 'Maharashtra’s royal heirloom in royal purple with hand-woven Mor-Bangadi peacock motifs and pure gold tissue border.',
    sku: 'AAR-PAI-006',
    price: 62000,
    originalPrice: 70000,
    category: 'regional',
    fabric: 'Pure Paithani Mulberry Silk with Solid Gold Tissue',
    color: 'Royal Imperial Purple with Gold & Emerald Accents',
    colorFamily: 'purple',
    occasion: 'Wedding & Bridal',
    weavingTechnique: 'Tapestry Weave with Interlocking Double Weft and Mirror-Reversible Pallu',
    regionalOrigin: 'Yeola & Paithan, Maharashtra',
    clusterName: 'Yeola Paithani Handloom Cluster',
    isVerifiedHandloom: true,
    handloomCertification: 'Silk Mark Certified • Geographical Indication #GI-PAI-02',
    dimensions: {
      length: '5.5 meters',
      width: '45 inches (114 cm)',
      blousePiece: 'Includes 80 cm pure silk unstitched running blouse piece with Paithani peacock border',
      hasBlousePiece: true,
    },
    materials: {
      warp: '2-Ply Filature Mulberry Silk',
      weft: 'Fine Spun Pure Silk with High-Tension Gold Tissue Weft',
      zariPurity: 'Electroplated Silver-Gilt Tested Zari',
      weightApprox: 'approx. 940 grams',
    },
    careInstructions: [
      'Exclusively dry clean by antique textile professionals',
      'Do not expose to moisture or direct steam',
      'Wrap in pure muslin cloth with dry neem leaves',
      'Re-fold every 4 months along different lines'
    ],
    stock: 2,
    isAvailable: true,
    isMadeToOrder: false,
    dispatchTime: 'Ships within 24–48 hours in luxury presentation chest',
    isFeatured: true,
    isPublished: true,
    images: {
      hero: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
      border: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      pallu: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      body: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85',
      texture: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
    },
    story: {
      headline: 'The Queen of Heirlooms: Paithani Tapestry',
      text: 'Patronized by the Peshwa rulers and the Satavahana dynasty, the Paithani saree is a masterpiece of interlocking tapestry weave. Its magnificent pallu resembles stained glass, where peacocks (mor) dance inside floral bracelets (bangadi). The motifs look identical on both the face and the reverse.',
      clusterNotes: 'Paithani has been woven since 200 BC in the Godavari basin; Yeola remains the thriving stronghold of this royal art.',
      artisanAttribution: 'Master Paithani weavers of Yeola, Nashik District, Maharashtra.',
      isVerifiedFact: true,
      journeyTimeline: [
        {
          step: 1,
          title: 'Fine Silk Reeling & Degumming',
          description: 'Natural raw silk fibers are washed in mild soap water to bring out organic luster.',
          duration: '5 Days',
          artisanRole: 'Silk Twisters'
        },
        {
          step: 2,
          title: 'Vibrant Royal Purple Vat Dyeing',
          description: 'Achieving deep royal purple using high grade colorfast formulation.',
          duration: '3 Days',
          artisanRole: 'Dye Master'
        },
        {
          step: 3,
          title: 'Tapestry Loom Setting & Bamboo Spooling',
          description: 'Dozens of small colored wooden spools (tilis) are wound with individual weft colors.',
          duration: '4 Days',
          artisanRole: 'Tili Master'
        },
        {
          step: 4,
          title: 'Intricate Tapestry Pallu Weaving',
          description: 'Weaving the peacock motifs without any jacquard cards, relying completely on hand-guided spools.',
          duration: '30 Days',
          artisanRole: 'Master Artisan'
        },
        {
          step: 5,
          title: 'Silk Mark Inspection & Wooden Box Curation',
          description: 'Inspected under high illumination before sealing in cotton muslin.',
          duration: '2 Days',
          artisanRole: 'Curator'
        }
      ]
    },
    createdAt: '2026-02-10T12:00:00.000Z',
    updatedAt: '2026-02-18T10:00:00.000Z',
  },
  {
    id: 'saree-07',
    slug: 'sambalpuri-bandha-ikat-pure-silk-midnight-indigo',
    title: 'Sambalpuri Bandha Ikat Pure Silk Saree',
    subtitle: 'Odisha’s master tie-and-dye Ikat woven in deep indigo with conch shell and rudraksha borders.',
    sku: 'AAR-SAM-007',
    price: 29500,
    originalPrice: 34000,
    category: 'regional',
    fabric: 'Pure Mulberry Silk with Hand-Tied Bandha Ikat',
    color: 'Midnight Indigo with Crimson & Turmeric Gold',
    colorFamily: 'indigo',
    occasion: 'Festive & Celebrations',
    weavingTechnique: 'Double Bandha Tie-and-Dye Resist Handloom Weaving',
    regionalOrigin: 'Bargarh & Sambalpur, Odisha',
    clusterName: 'Odisha Handloom Weavers Cooperative',
    isVerifiedHandloom: true,
    handloomCertification: 'Silk Mark India • GI Certified #GI-SAM-03',
    dimensions: {
      length: '5.5 meters',
      width: '45 inches (114 cm)',
      blousePiece: 'Includes 80 cm unstitched silk blouse piece in contrast crimson with rudraksha border',
      hasBlousePiece: true,
    },
    materials: {
      warp: 'Hand-dyed 2-ply Mulberry Silk',
      weft: 'Resist Tie-Dyed Pure Silk threads',
      zariPurity: 'Minimal gold thread in pallu borders',
      weightApprox: 'approx. 620 grams',
    },
    careInstructions: [
      'Dry clean only for initial 2 cleans; gentle hand wash thereafter',
      'Dry flat in shade; do not dry in direct sunlight',
      'Store wrapped in fine muslin cloth'
    ],
    stock: 4,
    isAvailable: true,
    isMadeToOrder: false,
    dispatchTime: 'Ships within 24–48 hours',
    isFeatured: false,
    isPublished: true,
    images: {
      hero: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      border: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      pallu: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
      body: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85',
      texture: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
    },
    story: {
      headline: 'The Sacred Poetry of Bandha Ikat',
      text: 'In Odisha’s Bandha tradition, patterns are dyed onto the warp and weft yarns before they touch the loom. Through intricate cotton cord ties and successive dye baths, the motif emerges only as the shuttle travels across the shed, creating soft blurred edges that are the hallmark of true resist dyeing.',
      clusterNotes: 'Practiced for centuries in Western Odisha, immortalized in the verses of poet Jayadeva’s Gita Govinda.',
      artisanAttribution: 'Artisan weavers in Bargarh, Western Odisha.',
      isVerifiedFact: true,
      journeyTimeline: [
        {
          step: 1,
          title: 'Warp & Weft Graphing',
          description: 'Calculations for exact dye placement along thousands of individual meters of thread.',
          duration: '4 Days',
          artisanRole: 'Design Master'
        },
        {
          step: 2,
          title: 'Bandha Rubber & Thread Tying',
          description: 'Tying resist knots tightly to protect white and yellow areas from indigo dye penetration.',
          duration: '6 Days',
          artisanRole: 'Bandha Artisans'
        },
        {
          step: 3,
          title: 'Multi-Stage Indigo & Crimson Dyeing',
          description: 'Successive dye dips from light to dark tones with knot releases in between.',
          duration: '5 Days',
          artisanRole: 'Dye Specialist'
        },
        {
          step: 4,
          title: 'Precision Handloom Alignment Weaving',
          description: 'Weaving on wooden pit looms where each weft thread is micro-adjusted to align the pattern perfectly.',
          duration: '14 Days',
          artisanRole: 'Master Artisan'
        },
        {
          step: 5,
          title: 'Handloom Inspection & Packaging',
          description: 'Inspecting the feathered ikat boundaries before certification.',
          duration: '1 Day',
          artisanRole: 'Quality Lead'
        }
      ]
    },
    createdAt: '2026-02-12T14:00:00.000Z',
    updatedAt: '2026-02-19T09:00:00.000Z',
  },
  {
    id: 'saree-08',
    slug: 'maheshwari-silk-cotton-reversible-narmada-border',
    title: 'Maheshwari Silk Cotton Saree in Forest Moss & Zari',
    subtitle: 'Inspired by Queen Ahilyabai Holkar with reversible border and lightweight pleated drape.',
    sku: 'AAR-MAH-008',
    price: 15500,
    originalPrice: 18500,
    category: 'cotton',
    fabric: 'Maheshwari Silk Cotton (Silk Warp, Cotton Weft)',
    color: 'Forest Moss Green with Muted Gold Border',
    colorFamily: 'green',
    occasion: 'Everyday Handlooms',
    weavingTechnique: 'Bugdi Handloom Weave with Reversible Narmada River Wave Border',
    regionalOrigin: 'Maheshwar, Madhya Pradesh',
    clusterName: 'Maheshwar Handloom Society',
    isVerifiedHandloom: true,
    handloomCertification: 'Handloom Mark India • GI Certified #GI-MAH-05',
    dimensions: {
      length: '5.5 meters',
      width: '45 inches (114 cm)',
      blousePiece: 'Includes 80 cm running silk cotton blouse piece in forest moss green',
      hasBlousePiece: true,
    },
    materials: {
      warp: 'Mulberry Silk 20/22 denier',
      weft: 'Fine Count Mercerized Cotton (80s count)',
      zariPurity: 'Muted Gold Tested Zari',
      weightApprox: 'approx. 420 grams',
    },
    careInstructions: [
      'Gentle cold wash with mild liquid detergent or dry clean',
      'Do not soak; shade dry immediately',
      'Medium heat iron on reverse side'
    ],
    stock: 6,
    isAvailable: true,
    isMadeToOrder: false,
    dispatchTime: 'Ships within 24–48 hours',
    isFeatured: false,
    isPublished: true,
    images: {
      hero: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      border: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
      pallu: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      body: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85',
      texture: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    },
    story: {
      headline: 'The Legacy of Rani Ahilyabai Holkar',
      text: 'In the late 18th century, the visionary ruler Queen Ahilyabai Holkar invited master weavers from Surat and Malwa to her riverside fort capital in Maheshwar. She designed sarees that were dignified, featherweight, and featured reversible borders inspired by the stone carvings and ripples of the Narmada River.',
      clusterNotes: 'Maheshwar remains one of India’s most celebrated ethical handloom revivals.',
      artisanAttribution: 'Weavers of Ahilya Fort Handloom Society, Maheshwar.',
      isVerifiedFact: true,
      journeyTimeline: [
        {
          step: 1,
          title: 'Silk & Cotton Sizing on Fort Ghats',
          description: 'Yarns are sized and washed in Narmada river currents.',
          duration: '3 Days',
          artisanRole: 'Yarn Sizers'
        },
        {
          step: 2,
          title: 'Forest Moss Herb-Infused Dyeing',
          description: 'Achieving soft earthy olive and moss shades with herbal formulations.',
          duration: '2 Days',
          artisanRole: 'Master Dyer'
        },
        {
          step: 3,
          title: 'Dobby Harness Reversible Border Setup',
          description: 'Setting up the bugdi border harness so both front and back show identical borders.',
          duration: '3 Days',
          artisanRole: 'Harness Master'
        },
        {
          step: 4,
          title: 'Rhythmic Handloom Weaving',
          description: 'Weaving the crisp body with 5 distinctive zari pallu stripes.',
          duration: '8 Days',
          artisanRole: 'Master Artisan'
        },
        {
          step: 5,
          title: 'Ironing & Packaging',
          description: 'Inspected and packaged in traditional paper sleeves.',
          duration: '1 Day',
          artisanRole: 'Finishing Guild'
        }
      ]
    },
    createdAt: '2026-02-14T09:00:00.000Z',
    updatedAt: '2026-02-20T17:00:00.000Z',
  }
];

export const JOURNAL_ARTICLES = [
  {
    id: 'journal-01',
    slug: 'the-collectors-guide-pure-zari-vs-tested-zari',
    title: "The Connoisseur’s Guide: Discerning Pure Zari from Tested & Synthetic Threads",
    subtitle: "Understanding the metallurgical heritage, silver-core guilding, and longevity of authentic handloom zari.",
    category: 'Textile Knowledge',
    readTime: '6 min read',
    date: 'February 18, 2026',
    author: 'Aaranya Heritage Archive',
    coverImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
    excerpt: 'Authentic Indian handloom sarees owe their ethereal radiance to zari—the art of spinning metallic threads onto pure silk cores. But how does an heirloom collector authenticate pure silver zari against modern electroplated substitutes?',
    content: [
      'In the historic royal ateliers of Varanasi, Kanchipuram, and Surat, zari was never a mere glitter—it was an investment asset. True zari (Asli Zari) consists of a pure silk thread core around which a microscopic ribbon of flattened silver (surma) is tightly wound, before being gilded in real 24-karat gold.',
      'Over centuries, economic realities and industrialization introduced "Tested Zari" (copper wire coated with electroplated silver) and "Metallic/Plastic Zari" (polyester film). While tested zari offers wonderful beauty for celebratory wear at accessible price points, knowing what you wear is paramount to honoring the artisan.',
      'At AARANYA, our philosophy is absolute transparency. Every product listing clearly specifies whether the zari used is Certified Pure Zari, Silver-Gilt Tested Zari, or Muted Copper Zari, with exact silver percentages documented wherever verified by laboratory testing.',
      'To test your heirloom saree at home: gently rub the fringe of the zari thread between your fingers. Pure zari feels supple, cool to the touch like fine metal, and reveals a cream silk core when burnt. Synthetic zari melts into a hard plastic bead.'
    ],
    tags: ['Zari Purity', 'Heirloom Care', 'Handloom Guide']
  },
  {
    id: 'journal-02',
    slug: 'preserving-the-500-year-heritage-of-kanjeevaram-korvai',
    title: 'The Sacred Architecture of Korvai: Two Weavers, One Soul',
    subtitle: 'Why the interlocking Korvai technique represents one of the most physically demanding arts in world textiles.',
    category: 'Weaving Traditions',
    readTime: '8 min read',
    date: 'January 29, 2026',
    author: 'Kanchipuram Guild Liaison',
    coverImage: '/images/hero-saree.jpg',
    excerpt: 'Observe the boundary where an emerald Kanjeevaram body meets its crimson temple border. There is no stitching, no cut thread, no seam. Discover the magic of Korvai.',
    content: [
      'In Tamil, "Korvai" means to sync or thread together. Unlike standard powerlooms or single-shuttle looms where warp and weft remain uniform, a Korvai handloom requires two weavers sitting across the wooden pit loom, operating three independent shuttles simultaneously.',
      'As the master weaver flings the body shuttle from left to right, the second weaver throws the border shuttle from right to left. At the exact meeting point, the two weft threads are interlocked in a minuscule loop, before the heavy wooden sley beats down with tremendous force.',
      'This interlocking ensures that the border colors remain deeply saturated and solid, without the muted blending common in mechanized looms. A single Korvai saree can demand 16 to 24 days of non-stop, synchronized manual labor.',
      'When you wrap a Korvai saree around your shoulders, you are not wearing fabric; you are wearing hundreds of thousands of synchronized hand movements by two artisans working in unspoken cadence.'
    ],
    tags: ['Kanchipuram', 'Korvai Weave', 'Master Weavers']
  },
  {
    id: 'journal-03',
    slug: 'how-to-care-for-heirloom-handloom-sarees',
    title: 'How to Care for Your Heirloom Handloom Sarees for Generations',
    subtitle: 'From unbleached muslin wrap to seasonal refolding: preservation secrets from Indian textile conservators.',
    category: 'Conservation',
    readTime: '5 min read',
    date: 'January 12, 2026',
    author: 'Textile Conservation Lab',
    coverImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
    excerpt: 'A handloom saree is crafted to outlive its first custodian. With thoughtful storage and mindful care, a silk or cotton handloom only softens and gains character over generations.',
    content: [
      'Rule #1: Banish Plastic Forever. Never store pure silk or zari sarees in plastic or zippered polyester bags. Plastic traps ambient humidity, causing volatile acids to build up and accelerate the oxidation of silver zari threads, turning them black or brittle.',
      'Rule #2: The Muslin Sanctuary. Wrap each saree individually in unbleached, breathable pure cotton or muslin fabric. The natural fibers absorb excess moisture during monsoons and release gentle air during dry seasons.',
      'Rule #3: The Quarter-Year Refold. Every three to four months, gently remove your sarees from their shelves. Re-fold them along fresh lines. Keeping a heavy silk saree folded along the same crease for years causes the warp threads under the fold line to fracture under pressure.',
      'Rule #4: Shaded Aeration. After wearing, air the saree on a wooden clothes horse in a shaded, well-ventilated room for 24 hours before returning it to its case. Never spray water or perfume directly on the weave.'
    ],
    tags: ['Saree Care', 'Muslin Storage', 'Preservation']
  }
];

export const ARTISAN_CLUSTERS = [
  {
    id: 'cluster-kanchipuram',
    name: 'Kanchipuram Weaving Guild',
    region: 'Tamil Nadu, South India',
    specialty: 'Pure Mulberry Silk, Korvai Interlocking, Temple Borders',
    history: 'Historic temple town where weaving has flourished for over 400 years, anchored by hereditary weaver communities.',
    artisanCount: 'Over 5,000 active traditional pit looms',
    verificationStatus: 'Verified Historical GI Craft Cluster',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'cluster-varanasi',
    name: 'Varanasi Brocade Artisans',
    region: 'Varanasi, Uttar Pradesh',
    specialty: 'Katan Silk, Kadwa Meenakari, Pure Gold Brocade',
    history: 'Ancient craft alleys of Madanpura and Kotwa, celebrated since Vedic eras for intricate floral and jaal weaving.',
    artisanCount: 'Over 12,000 artisan families',
    verificationStatus: 'Verified Historical GI Craft Cluster',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'cluster-chanderi',
    name: 'Chanderi Handloom Collective',
    region: 'Ashoknagar, Madhya Pradesh',
    specialty: 'Silk-Cotton Gossamer, Real Zari Booti, Malwa Drapes',
    history: 'Royal patronage under Scindia dynasty and Malwa Sultans, known for sheer elegance and breathability.',
    artisanCount: 'Over 3,500 active pit looms',
    verificationStatus: 'Verified Historical GI Craft Cluster',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'cluster-shantipur',
    name: 'Phulia & Shantipur Jamdani Guild',
    region: 'Nadia, West Bengal',
    specialty: 'Fine Muslin Cotton, Extra-Weft Floral Jaal, Cloud Drapes',
    history: 'Centuries-old Jamdani tradition recognized by UNESCO, weaving poetry onto feather-light muslin.',
    artisanCount: 'Over 8,000 skilled handloom artisans',
    verificationStatus: 'Verified UNESCO Recognized Craft Cluster',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
  }
];

export const LOOKBOOK_GALLERY = [
  {
    id: 'look-1',
    title: 'The Temple Morning Drape',
    sareeName: 'Rajkumari Korvai Kanjeevaram Pure Silk',
    caption: 'Draped in traditional seedha pallu with heirloom temple gold jewelry for a dawn wedding muhurtham in Madurai.',
    image: '/images/hero-saree.jpg',
    occasion: 'Bridal & Muhurtham',
  },
  {
    id: 'look-2',
    title: 'The Soirée of Antiquity',
    sareeName: 'Kashi Kadwa Banarasi Katan Silk',
    caption: 'Fluid drape with structured velvet blouse for an autumn music festival in Rajasthan.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    occasion: 'Festive & Celebration',
  },
  {
    id: 'look-3',
    title: 'Midsummer Literary Gathering',
    sareeName: 'Avani Chanderi Silk Cotton Saree',
    caption: 'Effortless daytime pleating in warm ivory paired with raw silver cuffs and botanical fragrance.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
    occasion: 'Everyday Handlooms',
  },
  {
    id: 'look-4',
    title: 'The Autumn Art Vernissage',
    sareeName: 'Shantipur Bengal Jamdani Muslin',
    caption: 'Breathtaking gossamer drape catching the natural gallery skylight in New Delhi.',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85',
    occasion: 'Formal & Soirée',
  }
];
