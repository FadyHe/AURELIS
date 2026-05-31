/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Perfume, BlogItem } from '../types';

export const PERFUMES: Perfume[] = [
  {
    id: 'aurelis',
    name: 'AURELIS',
    tagline: 'Liquid Atmospheric Sky & Mineral Sea',
    shortDescription: 'Fresh. Mineral. Volumetric. A sensory exploration of high-altitude sea-mist and floating limestone cliffs.',
    description: 'AURELIS redefines the oceanic fragrance family. It captures the raw energy of high waves crashing against high-alpine mineral cliffs, carried by volumetric clouds and heavy ozone mists. Perfect for those who seek modern luxury through clean, expansive, and high-altitude freshness.',
    price50ml: 145,
    price100ml: 220,
    scentProfile: 'Ozone / Salt Mineral / Cool Clouds',
    ingredients: ['Salicylate d\'Ambre', 'Sea Silt Extract', 'Bergamot Essential Oil', 'Ozone accords', 'White Driftwood', 'Salt-crusted Vetiver'],
    pyramid: {
      top: [
        { name: 'Ozone & Frozen Mist', intensity: 95, description: 'An initial rush of crisp, cold oxygenated air accompanied by maritime sea salt spray.' },
        { name: 'Bergamot Peel', intensity: 75, description: 'Bright, citrusy bitterness from wild Calabrian bergamot, adding an elegant sparkle.' }
      ],
      heart: [
        { name: 'Cold-Pressed Lavender', intensity: 60, description: 'A sophisticated aromatic heart providing structure and a clean herbal texture.' },
        { name: 'Wet Algae Accord', intensity: 50, description: 'An elegant, organic marine touch that mimics damp mineral stone and marine flora.' }
      ],
      base: [
        { name: 'Sun-Bleached Driftwood', intensity: 80, description: 'A luxurious dry-down of salty, dry woods that roots the fragrance dynamically.' },
        { name: 'White Ambergris', intensity: 85, description: 'A velvety, skin-like sensuality that leaves an incredible sillage representing solar minerals.' }
      ]
    },
    themeColor: 'sky-blue',
    accentBg: 'bg-slate-900/60 border-cyan-500/30',
    worldTitle: 'Oceanic Fresh: The Spires of Aurelis',
    worldConcept: 'Floating oceanic limestone obelisks suspended over crystal white currents, with sea mist rising into crisp sunlight.',
    imageUrl: '/src/assets/images/aurelis_ocean_storm_1780227730581.webp'
  },
  {
    id: 'nocterra',
    name: 'NOCTERRA',
    tagline: 'Bioluminescent Woods & Moss-Coated Stone',
    shortDescription: 'Deep. Velvet. Organic. A sensory voyage into an ancient, glowing canopy of sacred spore-filled woods.',
    description: 'NOCTERRA is an invitation to walk through a primeval, bioluminescent wilderness. Ancient mossy giant roots grow over damp basalt, with glowing spores casting emerald lights into a perpetual, fog-filled night. A deeply sophisticated, earthy green statement with rich resinous undercurrents.',
    price50ml: 160,
    price100ml: 245,
    scentProfile: 'Damp Earth / Green Spores / Sacred Resin',
    ingredients: ['Agarwood (Oud)', 'Oakmoss Absolute', 'Petrichor Extract', 'Siberian Fir Needle', 'Sacred Myrrh', 'Bioluminescent Lichen Accord'],
    pyramid: {
      top: [
        { name: 'Petrichor & Fir Needle', intensity: 90, description: 'The electric fragrance of rain hit on rich, mossy soil, combined with freshly crushed evergreen needles.' },
        { name: 'Smoked Green Tea', intensity: 70, description: 'An elegant, dry smoky introduction that creates mystery and high-end texture.' }
      ],
      heart: [
        { name: 'Bioluminescent Lichen', intensity: 65, description: 'A custom glowing green accord featuring damp, cold herbal nodes and velvet moss.' },
        { name: 'Myrrh & Galbanum', intensity: 75, description: 'Sticky, bittersweet resins that lend a luxurious organic depth resembling sacred bark.' }
      ],
      base: [
        { name: 'Sacred Black Oud', intensity: 95, description: 'Rich, luxurious agarwood extract providing unprecedented sillage and an dark woodland shadow.' },
        { name: 'Wet Vetiver & Cedarwood', intensity: 85, description: 'Deep grounding woods that replicate the scent of ancient roots growing over cold basalt stone.' }
      ]
    },
    themeColor: 'emerald-green',
    accentBg: 'bg-[#091512]/80 border-emerald-500/20',
    worldTitle: 'Forest Mystic: The Roots of Nocterra',
    worldConcept: 'Deep, towering redwood trees with moss-coated hanging branches. Bioluminescent ferns glow along the damp path.',
    imageUrl: '/src/assets/images/nocterra_glowing_forest_1780228327135.webp'
  },
  {
    id: 'solaire-noir',
    name: 'SOLAIRE NOIR',
    tagline: 'Warm Onyx dunes & Golden Dust',
    shortDescription: 'Mysterious. Burning. Precious. The contrast of cold volcanic obsidian monoliths against warm saffron sunset sands.',
    description: 'SOLAIRE NOIR captures the ultimate luxury of friction. A scent of incredible contrasts: the coldness of dark stone obelisks juxtaposed against heat-radiating obsidian sands, golden wind-blown spices, and soft luxury suede. It leaves a powerful, intoxicating trail of amber smoke, honeyed smoke, and absolute mystery.',
    price50ml: 175,
    price100ml: 265,
    scentProfile: 'Burned Saffron / Smoked Oud / Warm Sand Dust',
    ingredients: ['Black Amber', 'Saffron Crocus Extract', 'Golden Sandalwood', 'Incense Smoke', 'Volcanic Obsidian Accord', 'Raw Tuscan Leather'],
    pyramid: {
      top: [
        { name: 'Burning Saffron', intensity: 95, description: 'Spicy, rich red saffron filaments heated over flame, introducing absolute luxury.' },
        { name: 'Pink Pepper & Bergamot', intensity: 75, description: 'A sharp, aromatic opening that bursts with sparks of fiery spice and dark citrus.' }
      ],
      heart: [
        { name: 'Incense Smoke & Suede', intensity: 85, description: 'Rich, mystical smoke drifting over ultra-luxurious, velvet Tuscan suede sheets.' },
        { name: 'Black Rose Absolute', intensity: 60, description: 'A deep, dark, velvet floral core that softens the burning sand edges with dark elegance.' }
      ],
      base: [
        { name: 'Ashen Sandalwood', intensity: 90, description: 'A comforting, warm, and highly precious milk-wood base representing cooling golden sands.' },
        { name: 'Warm Ambrette & Vanilla Co2', intensity: 90, description: 'Indulgent, smoky amber and vanilla pods that wrap the skin in a continuous, hypnotic heat.' }
      ]
    },
    themeColor: 'sunset-amber',
    accentBg: 'bg-[#150e09]/80 border-amber-500/20',
    worldTitle: 'Desert Noir: The Monoliths of Solaire Noir',
    worldConcept: 'Towering volcanic obsidian monoliths under a bleeding golden-hour sky, with warm sand dust carrying traces of rich resin.',
    imageUrl: '/src/assets/images/solaire_noir_ultra_luxury_1780226364281.webp'
  }
];

export const BLOG_POSTS: BlogItem[] = [
  {
    id: 'art-of-slow-distillation',
    slug: 'art-of-slow-distillation',
    title: 'The Poetics of Water: The Slow Harvesting of Aurelis',
    category: 'Maison Philosophy',
    readTime: '6 min read',
    date: 'May 14, 2026',
    imageUrl: 'ocean_mist_editorial',
    excerpt: 'Step behind our atmospheric harvesting platforms in Grasse where oceanic sea-mists are slow-condensed through mountain limestone to create the mineral ozone in Aurelis.',
    content: `For Aurelis, we did not want a standard marine fragrance. Marine scents are traditionally composed of synthetic calone, which provides a clean but flat representation of water. 

Our creative director sought the visceral sensation of alpine sea-mist—where cold mountain winds meet the warm Mediterranean current above sharp limestone cliffs. To achieve this, Maison Aurelis engineered localized atmospheric condensation nets positioned on the peaks of high cliffs in Grasse.

These custom-crafted organic fiber nets trap the ascending maritime clouds in the early morning at exactly 5:30 AM, before the sun burns down the overnight dew. The resulting dense droplets run along cold polished limestone gutters, absorbing micro-minerals and trace sea silt. This dynamic mountain sea-water is then fractional-distilled over double-smoked glass spheres.

This represents the difference between perfumery as chemical assembly and perfumery as geographical translation. Each bottle of Aurelis holds water-vapor footprints from the very morning it was captured.`
  },
  {
    id: 'bioluminescent-foraging',
    slug: 'bioluminescent-foraging',
    title: 'Glowing Under the Canopy: The Extraction of Nocterra Moss',
    category: 'Creative Foraging',
    readTime: '8 min read',
    date: 'April 28, 2026',
    imageUrl: 'forest_lichen_editorial',
    excerpt: 'Inside the damp ancient forests of Northern Lapland, our foragers seek the nocturnal bioluminescent lichens that define Nocterra’s deep green heart.',
    content: `To build the damp, earthy root architecture of Nocterra, we traveled to the ancient boreal forests of Lappish valleys. Here, growing along the shaded undersides of thousand-year-old pine roots, exists a rare bryophyte species: Bioluminescent Lichen (Lichen Phos).

During the day, this lichen appears as an inconspicuous, powdery grey moss, completely silent. However, under the cover of dense forest twilight, it synthesizes luciferin, emitting a cold green phosphor glow that guides insects. 

Maison Aurelis works alongside local Lapland herbalists who harvest this moss exclusively during the full moon of spring, ensuring sustainable foraging. The lichen must be kept alive in climate-controlled dark moss trays until it reaches our state-of-the-art CO2 extraction chambers.

Using high-pressure supercritical carbon dioxide at cold temperatures, we extract the delicate scent glands without heat damage. The olfactory yield is striking: it smells not just of oakmoss, but of glowing midnight moisture, wet damp granite, and the electrical current of growing forest roots.`
  },
  {
    id: 'the-alchemy-of-obsidian',
    slug: 'the-alchemy-of-obsidian',
    title: 'The Friction of Solaire Noir: Translating Obsidian Dune Shadows',
    category: 'Olfactory Sillage',
    readTime: '7 min read',
    date: 'March 15, 2026',
    imageUrl: 'desert_onyx_editorial',
    excerpt: 'Discover the intense heat-contrast design of Solaire Noir, where raw saffron filaments are flamed over cold volcanic stone to release deep resinous smoke.',
    content: `The ultimate challenge of modern oriental-spicy perfumery is balancing suffocating heat with sculptural definition. Solaire Noir is our masterclass in molecular friction.

Its inspiration was a lonely volcanic dune desert in Iceland where black basalt stones crumble into warm volcanic sand. To recreate this on a molecular level, our master chemist combined Saffron Crocus filaments—the most valuable spice on earth—and toasted them in a vacuum over heated black obsidian tiles.

Under high heat in a vacuum, the delicate saffron releases intense, bittersweet safranal, but immediately adheres to the cold minerality of the obsidian stone. This prevents the spicy wood notes from turning overly sweet, giving Solaire Noir a modern, clean, graphic outline.

This complex interaction of elements is why Solaire Noir stays suspended on the skin for up to 14 hours. It is an olfactive shadow that shifts from freezing stone back to scorching wood, depending on your body's temperature.`
  }
];
