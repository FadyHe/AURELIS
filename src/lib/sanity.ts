/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PERFUMES, BLOG_POSTS } from '../data/perfumes';
import { Perfume, BlogItem } from '../types';

// Configuration interface for Sanity Integration
export const sanityConfig = {
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'aurelis_mock_id',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2026-05-30',
  useCdn: true,
};

/**
 * Mock Sanity client for production-ready design
 * In a live project, you would import { createClient } from '@sanity/client'
 * and do: export const sanityClient = createClient(sanityConfig);
 */
export const sanityClient = {
  fetch: async <T>(query: string, params: Record<string, any> = {}): Promise<T> => {
    // If a project ID is configured and this were a real client, we would hit Sanity
    // Here we parse query paths conceptually to return corresponding high-fidelity datasets:
    
    if (query.includes('*[_type == "perfume"]')) {
      return Promise.resolve(PERFUMES as unknown as T);
    }
    
    if (query.includes('*[_type == "perfume" && id == $id]')) {
      const match = PERFUMES.find(p => p.id === params.id) || PERFUMES[0];
      return Promise.resolve(match as unknown as T);
    }
    
    if (query.includes('*[_type == "post"]')) {
      return Promise.resolve(BLOG_POSTS as unknown as T);
    }

    if (query.includes('*[_type == "post" && slug.current == $slug]')) {
      const match = BLOG_POSTS.find(p => p.slug === params.slug) || BLOG_POSTS[0];
      return Promise.resolve(match as unknown as T);
    }

    // Default general response
    return Promise.resolve([] as unknown as T);
  }
};

/**
 * High-performance data fetching functions with instant local fallbacks
 */
export const fetchPerfumes = async (): Promise<Perfume[]> => {
  try {
    const query = `*[_type == "perfume"] {
      id,
      name,
      tagline,
      shortDescription,
      description,
      price50ml,
      price100ml,
      scentProfile,
      ingredients,
      pyramid,
      themeColor,
      accentBg,
      worldTitle,
      worldConcept
    }`;
    return await sanityClient.fetch<Perfume[]>(query);
  } catch (error) {
    console.warn('Sanity fetch failed. Falling back to high-fidelity local dataset.', error);
    return PERFUMES;
  }
};

export const fetchPerfumeById = async (id: string): Promise<Perfume> => {
  try {
    const query = `*[_type == "perfume" && id == $id][0]`;
    return await sanityClient.fetch<Perfume>(query, { id });
  } catch (error) {
    console.warn(`Sanity product fetch failed. Falling back to local ID: ${id}`, error);
    return PERFUMES.find(p => p.id === id) || PERFUMES[0];
  }
};

export const fetchBlogPosts = async (): Promise<BlogItem[]> => {
  try {
    const query = `*[_type == "post"] | order(date desc) {
      id,
      slug,
      title,
      category,
      readTime,
      date,
      imageUrl,
      excerpt,
      content
    }`;
    return await sanityClient.fetch<BlogItem[]>(query);
  } catch (error) {
    console.warn('Sanity blog fetch failed. Falling back to local blog entries.', error);
    return BLOG_POSTS;
  }
};
