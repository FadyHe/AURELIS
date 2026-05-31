/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Note {
  name: string;
  intensity: number; // 0 to 100
  description: string;
}

export interface OlfactoryPyramid {
  top: Note[];
  heart: Note[];
  base: Note[];
}

export interface Perfume {
  id: string;
  name: string;
  tagline: string;
  shortDescription: string;
  description: string;
  price50ml: number;
  price100ml: number;
  ingredients: string[];
  pyramid: OlfactoryPyramid;
  themeColor: string; // Tailwind color class or hex
  accentBg: string; // Background color for its world panel
  worldTitle: string;
  worldConcept: string;
  scentProfile: string; // e.g. "Mineral / Marine / Solar"
  imageUrl: string;
}

export interface CartItem {
  perfume: Perfume;
  size: '50ml' | '100ml';
  quantity: number;
  price: number;
}

export interface BlogItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  imageUrl: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonicalUrl: string;
}
