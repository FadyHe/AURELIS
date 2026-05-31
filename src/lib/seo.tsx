/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { useStore } from '../stores/useStore';
import { PERFUMES, BLOG_POSTS } from '../data/perfumes';
import { SEOMetadata } from '../types';

/**
 * Global SEO Config for Aurelis Brand
 */
export const METADATA_REGISTRY: Record<string, SEOMetadata> = {
  home: {
    title: 'AURELIS | Continuous Immersive Olfactory 3D Journey',
    description: 'Walk through are three surreal, continuous fragrance portals: Aurelis, Nocterra, and Solaire Noir. A high-contrast premium 3D sensory experience.',
    keywords: ['aurelis perfume', 'luxury 3D website', 'organic fragrance', 'artisan perfumery', 'sustainable scents', '3D design web'],
    ogImage: 'aurelis_home_og',
    canonicalUrl: 'https://aurelis-perfumes.com/'
  },
  collection: {
    title: 'The Collection Portfolio | AURELIS Scents',
    description: 'Explore the full spectrum of our sustainable botanical collection. Hand-foraged, low-yield extracts distilled slowly in our Grasse laboratories.',
    keywords: ['fragrance portfolio', 'perfume sets', 'organic lavender', 'lappish moss absolute', 'saffron oil'],
    ogImage: 'aurelis_collection_og',
    canonicalUrl: 'https://aurelis-perfumes.com/collection'
  },
  about: {
    title: 'Maison Philosophy: The Art of Slow Perfumery | AURELIS',
    description: 'Driven by botanical patience, our harvesters collect rain-captured sea-mist, bioluminescent Lappish lichen, and volcanic obsidian-smoked saffron.',
    keywords: ['sustainable perfumery', 'ecological luxury', 'grasse slow distillation', 'foraging lichen', 'fair trade oud'],
    ogImage: 'aurelis_about_og',
    canonicalUrl: 'https://aurelis-perfumes.com/about'
  },
  contact: {
    title: 'Maison Concierge Desk & Scent Consultations | AURELIS',
    description: 'Reserve an exclusive digital or physical private consultation with our fragrance experts. Tailor-made signature profiles designed for your skin.',
    keywords: ['private sensory consultation', 'grasse private salon', 'custom sillage', 'luxury concierge perfume'],
    ogImage: 'aurelis_contact_og',
    canonicalUrl: 'https://aurelis-perfumes.com/contact'
  },
  journal: {
    title: 'The Journal: Botanical Explorations | AURELIS',
    description: 'Philosophical essays, research notes, and creative foraging journals from our master chemists and sustainable botanists in Grasse.',
    keywords: ['botany essays', 'perfume chemistry', 'olfactory journals', 'carbon dioxide extraction'],
    ogImage: 'aurelis_journal_og',
    canonicalUrl: 'https://aurelis-perfumes.com/journal'
  }
};

/**
 * Dynamic SEO metadata component
 */
export const SEOPress: React.FC = () => {
  const activeRoute = useStore((state) => state.activeRoute);

  useEffect(() => {
    let metadata: SEOMetadata = METADATA_REGISTRY.home;

    // Handle dynamic product routes
    if (activeRoute.startsWith('product-')) {
      const id = activeRoute.replace('product-', '');
      const perfume = PERFUMES.find(p => p.id === id);
      if (perfume) {
        metadata = {
          title: `${perfume.name} Parfum: ${perfume.tagline} | AURELIS`,
          description: perfume.shortDescription,
          keywords: [perfume.name.toLowerCase(), perfume.scentProfile.toLowerCase(), ...perfume.ingredients.map(i => i.toLowerCase())],
          ogImage: `aurelis_${perfume.id}_og`,
          canonicalUrl: `https://aurelis-perfumes.com/perfume/${perfume.id}`
        };
      }
    } 
    // Handle dynamic journal/blog routes
    else if (activeRoute.startsWith('blog-')) {
      const slug = activeRoute.replace('blog-', '');
      const post = BLOG_POSTS.find(p => p.slug === slug);
      if (post) {
        metadata = {
          title: `${post.title} | The AURELIS Journal`,
          description: post.excerpt,
          keywords: [post.category.toLowerCase(), 'editorial scent', 'botany', 'fragrance research'],
          ogImage: `aurelis_journal_${post.id}_og`,
          canonicalUrl: `https://aurelis-perfumes.com/journal/${post.slug}`
        };
      }
    } 
    // Fallback to static routes
    else if (METADATA_REGISTRY[activeRoute]) {
      metadata = METADATA_REGISTRY[activeRoute];
    }

    // Direct DOM manipulation for clean, crawlable client headers
    document.title = metadata.title;

    // Update Meta description
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', metadata.description);

    // Update Meta keywords
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsMeta);
    }
    keywordsMeta.setAttribute('content', metadata.keywords.join(', '));

    // Update OpenGraph details
    const setOgMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setOgMeta('og:title', metadata.title);
    setOgMeta('og:description', metadata.description);
    setOgMeta('og:image', metadata.ogImage);
    setOgMeta('og:url', metadata.canonicalUrl);
    setOgMeta('og:type', activeRoute.startsWith('blog-') ? 'article' : 'website');

    // Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', metadata.canonicalUrl);

    // Build and inject dynamic JSON-LD Structured Data
    let schemaScript = document.getElementById('json-ld-structured-data');
    if (schemaScript) {
      schemaScript.remove();
    }

    const schemas: any[] = [
      // 1. Organization Schema (Globally applicable)
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Maison AURELIS Scent Experience',
        url: 'https://aurelis-perfumes.com/',
        logo: 'https://aurelis-perfumes.com/assets/logo.png',
        description: 'Ultra-premium slow distillation perfume brand designed in Grasse.',
        sameAs: [
          'https://instagram.com/aurelis_scents',
          'https://pinterest.com/aurelis_scents'
        ]
      }
    ];

    // 2. Conditional Product Schema
    if (activeRoute.startsWith('product-')) {
      const id = activeRoute.replace('product-', '');
      const perfume = PERFUMES.find(p => p.id === id);
      if (perfume) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: perfume.name,
          image: [
            `https://aurelis-perfumes.com/assets/images/${perfume.id}_front.jpg`,
            `https://aurelis-perfumes.com/assets/images/${perfume.id}_world.jpg`
          ],
          description: perfume.shortDescription,
          sku: `AR-${perfume.id.substring(0,3).toUpperCase()}-100`,
          mpn: `M-AR-${perfume.id.toUpperCase()}`,
          brand: {
            '@type': 'Brand',
            name: 'AURELIS'
          },
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'EUR',
            lowPrice: perfume.price50ml,
            highPrice: perfume.price100ml,
            offerCount: '2',
            availability: 'https://schema.org/InStock'
          },
          review: {
            '@type': 'Review',
            reviewRating: {
              '@type': 'Rating',
              ratingValue: '4.9',
              bestRating: '5'
            },
            author: {
              '@type': 'Person',
              name: 'Dr. Evelyn Rousseau | Scent Critic'
            }
          }
        });
      }
    }

    // 3. Conditional Article Schema
    if (activeRoute.startsWith('blog-')) {
      const slug = activeRoute.replace('blog-', '');
      const post = BLOG_POSTS.find(p => p.slug === slug);
      if (post) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: post.title,
          description: post.excerpt,
          datePublished: '2026-05-30T22:20:00Z',
          dateModified: '2026-05-30T22:20:00Z',
          author: {
            '@type': 'Person',
            name: 'Aurelis Editorial Harvesters'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Maison AURELIS Scent Experience',
            logo: {
              '@type': 'ImageObject',
              url: 'https://aurelis-perfumes.com/assets/logo.png'
            }
          }
        });
      }
    }

    const script = document.createElement('script');
    script.id = 'json-ld-structured-data';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schemas);
    document.head.appendChild(script);

  }, [activeRoute]);

  return null;
};

/**
 * Premium floating inspector component to trace SEO & Canonical schemas in real-time
 */
export const SEOMetadataInspector: React.FC = () => {
  const activeRoute = useStore((state) => state.activeRoute);
  const [showInspector, setShowInspector] = React.useState(false);

  let metadata: SEOMetadata = METADATA_REGISTRY.home;
  if (activeRoute.startsWith('product-')) {
    const id = activeRoute.replace('product-', '');
    const perfume = PERFUMES.find(p => p.id === id);
    if (perfume) {
      metadata = {
        title: `${perfume.name} Parfum | AURELIS`,
        description: perfume.shortDescription,
        keywords: [perfume.name.toLowerCase(), perfume.scentProfile.toLowerCase()],
        ogImage: `aurelis_${perfume.id}_og`,
        canonicalUrl: `https://aurelis-perfumes.com/perfume/${perfume.id}`
      };
    }
  } else if (activeRoute.startsWith('blog-')) {
    const slug = activeRoute.replace('blog-', '');
    const post = BLOG_POSTS.find(p => p.slug === slug);
    if (post) {
      metadata = {
        title: `${post.title} | Journal`,
        description: post.excerpt,
        keywords: [post.category.toLowerCase()],
        ogImage: `aurelis_journal_${post.id}_og`,
        canonicalUrl: `https://aurelis-perfumes.com/journal/${post.slug}`
      };
    }
  } else if (METADATA_REGISTRY[activeRoute]) {
    metadata = METADATA_REGISTRY[activeRoute];
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 font-sans">
      <button
        onClick={() => setShowInspector(!showInspector)}
        className="px-3 py-1.5 bg-black/80 hover:bg-black/90 border border-white/10 text-[10px] tracking-widest text-[#E6E4DD] hover:text-[#D4AF37] rounded-full transition-all duration-300 shadow-xl flex items-center gap-1.5"
      >
        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
        SEO INFRASTRUCTURE
      </button>

      {showInspector && (
        <div className="mt-2 w-80 max-h-96 overflow-y-auto bg-black/95 border border-white/10 text-white p-4 rounded-xl shadow-2xl backdrop-blur-md">
          <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-3">
            <h4 className="text-[11px] font-semibold text-[#D4AF37] tracking-widest uppercase">Dynamic Meta Head Tracer</h4>
            <button onClick={() => setShowInspector(false)} className="text-gray-400 hover:text-white text-xs">×</button>
          </div>
          
          <div className="space-y-3.5 text-[11px] font-mono leading-relaxed text-gray-300">
            <div>
              <span className="text-[#D4AF37] block mb-0.5">Active Route Context:</span>
              <span className="text-[#88c0d0]">/{activeRoute}</span>
            </div>
            
            <div>
              <span className="text-[#D4AF37] block mb-0.5">Browser Document Title:</span>
              <span className="text-white italic">{metadata.title}</span>
            </div>
            
            <div>
              <span className="text-[#D4AF37] block mb-0.5">Snippet Meta Description:</span>
              <span className="text-gray-400 block pb-1 border-b border-white/5">{metadata.description}</span>
            </div>

            <div>
              <span className="text-[#D4AF37] block mb-0.5">Canonical Link Element:</span>
              <span className="text-emerald-400">{metadata.canonicalUrl}</span>
            </div>

            <div>
              <span className="text-[#D4AF37] block mb-0.5">Open Graph Tags Injector:</span>
              <div className="pl-2 border-l border-white/10 space-y-0.5 text-[10px] text-gray-500">
                <p>og:title → <span className="text-gray-300">{metadata.title.substring(0,35)}...</span></p>
                <p>og:description → <span className="text-gray-300">{metadata.description.substring(0,35)}...</span></p>
                <p>og:image → <span className="text-gray-300">/assets/images/{metadata.ogImage}.jpg</span></p>
              </div>
            </div>

            <div>
              <span className="text-[#D4AF37] block mb-0.5">Schema.org Structured Linked Data:</span>
              <div className="pl-2 border-l border-white/10 text-[10px] text-emerald-300/80">
                <p className="font-bold">✓ Org: Maison AURELIS Scent Experience</p>
                {activeRoute.startsWith('product-') && <p className="font-bold">✓ Product: AggregateOffer (EUR) & Reviews</p>}
                {activeRoute.startsWith('blog-') && <p className="font-bold">✓ NewsArticle: Publisher & Author</p>}
              </div>
            </div>
            
            <div className="pt-2 border-t border-white/10 text-[10px] text-gray-500 text-center">
              Target Lighthouse Checklist: 100/100 Perfect Performance & SEO
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
