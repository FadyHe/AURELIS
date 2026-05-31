/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * SANITY SCHEMA ARCHITECTURE FOR AURELIS SCENT EXPERIENCE
 * This file contains standard, copy-pasteable Sanity Studio schema configurations.
 */

export const NoteSchemaDefinition = `
// schemas/note.js
export default {
  name: 'note',
  title: 'Scent Note',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Note Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'intensity',
      title: 'Intensity Percentage',
      type: 'number',
      validation: Rule => Rule.min(0).max(100)
    },
    {
      name: 'description',
      title: 'Sensory Note Description',
      type: 'text',
      rows: 2
    }
  ]
}
`;

export const PerfumeSchemaDefinition = `
// schemas/perfume.js
export default {
  name: 'perfume',
  title: 'Perfume Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'id',
      title: 'Product Unique ID',
      type: 'string',
      description: 'Used for routing: e.g., "aurelis", "nocterra"',
      validation: Rule => Rule.required()
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Comprehensive Story Description',
      type: 'text',
      rows: 5
    },
    {
      name: 'price50ml',
      title: 'Price 50ml (€ / $)',
      type: 'number',
      validation: Rule => Rule.required().positive()
    },
    {
      name: 'price100ml',
      title: 'Price 100ml (€ / $)',
      type: 'number',
      validation: Rule => Rule.required().positive()
    },
    {
      name: 'scentProfile',
      title: 'Scent Classification Profile',
      type: 'string',
      description: 'e.g. "Mineral / Marine / Ozone"'
    },
    {
      name: 'ingredients',
      title: 'Ingredients Checklist',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'pyramid',
      title: 'Olfactory Pyramid',
      type: 'object',
      fields: [
        {
          name: 'top',
          title: 'Top Notes (Header Sensory Burst)',
          type: 'array',
          of: [{ type: 'note' }]
        },
        {
          name: 'heart',
          title: 'Heart Notes (The Core Identity)',
          type: 'array',
          of: [{ type: 'note' }]
        },
        {
          name: 'base',
          title: 'Base Notes (The Deep Sillage)',
          type: 'array',
          of: [{ type: 'note' }]
        }
      ]
    },
    {
      name: 'themeColor',
      title: 'Visual Theme Alias',
      type: 'string',
      description: 'sky-blue, emerald-green, sunset-amber'
    },
    {
      name: 'worldTitle',
      title: 'Scent World Display Title',
      type: 'string'
    },
    {
      name: 'worldConcept',
      title: 'Scent World 3D Concept Description',
      type: 'text',
      rows: 3
    }
  ]
}
`;

export const PostSchemaDefinition = `
// schemas/post.js
export default {
  name: 'post',
  title: 'Journal Editorial Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Headline Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Editorial Category',
      type: 'string',
      options: {
        list: [
          'Maison Philosophy',
          'Creative Foraging',
          'Olfactory Sillage',
          'Sustainability'
        ]
      }
    },
    {
      name: 'readTime',
      title: 'Read Duration',
      type: 'string',
      description: 'e.g., "6 min read"'
    },
    {
      name: 'date',
      title: 'Publishing Date',
      type: 'string',
      description: 'e.g., "May 14, 2026"'
    },
    {
      name: 'imageUrl',
      title: 'Image Cover Placeholder/ID',
      type: 'string'
    },
    {
      name: 'excerpt',
      title: 'Introductory Excerpt',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    },
    {
      name: 'content',
      title: 'Full Article Content (Markdown)',
      type: 'text',
      rows: 15,
      validation: Rule => Rule.required()
    }
  ]
}
`;

export const SEOSchemaDefinition = `
// schemas/seo.js
export default {
  name: 'seoMetadata',
  title: 'Page SEO Configurations',
  type: 'document',
  fields: [
    {
      name: 'pageName',
      title: 'Target Page Name',
      type: 'string',
      description: 'e.g. "home", "collection", "about", "contact", "journal"'
    },
    {
      name: 'title',
      title: 'Browser Tab Title',
      type: 'string',
      validation: Rule => Rule.required().max(60)
    },
    {
      name: 'description',
      title: 'Search snippet Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(160)
    },
    {
      name: 'keywords',
      title: 'SEO Tags / Keywords',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'ogImage',
      title: 'OpenGraph Share Image URL / Asset ID',
      type: 'string'
    },
    {
      name: 'canonicalUrl',
      title: 'Canonical URL String',
      type: 'string'
    }
  ]
}
`;
