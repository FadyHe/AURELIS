/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { create } from 'zustand';
import { CartItem, Perfume } from '../types';

interface StoreState {
  // Navigation & Page State
  isMenuOpen: boolean;
  activeRoute: string; // 'home', 'collection', 'about', 'contact', 'journal', 'product-[id]', 'blog-[slug]'
  setMenuOpen: (open: boolean) => void;
  setActiveRoute: (route: string) => void;
  
  // Cinematic Scroll & 3D Environment States
  scrollProgress: number; // 0.0 to 1.0 (synced across main experience)
  activePerfumeIndex: number; // 0 = Aurelis, 1 = Nocterra, 2 = Solaire Noir
  setScrollProgress: (progress: number) => void;
  setActivePerfumeIndex: (index: number) => void;
  
  // Cart & E-commerce State
  isCartOpen: boolean;
  cart: CartItem[];
  setCartOpen: (open: boolean) => void;
  addToCart: (perfume: Perfume, size: '50ml' | '100ml') => void;
  removeFromCart: (perfumeId: string, size: '50ml' | '100ml') => void;
  updateQuantity: (perfumeId: string, size: '50ml' | '100ml', quantity: number) => void;
  getCartTotal: () => number;
  clearCart: () => void;

  // Premium Product Drawer State
  isProductDrawerOpen: boolean;
  selectedProductForDrawer: Perfume | null;
  setProductDrawerOpen: (open: boolean) => void;
  selectProductForDrawer: (perfume: Perfume | null) => void;
  
  // Luxury Sample Selection Strategy
  selectedSample: 'aurelis' | 'nocterra' | 'solaire-noir' | null;
  setSelectedSample: (sample: 'aurelis' | 'nocterra' | 'solaire-noir' | null) => void;
  
  // Checkout flow state
  checkoutStep: 'idle' | 'shipping' | 'payment' | 'completed';
  setCheckoutStep: (step: 'idle' | 'shipping' | 'payment' | 'completed') => void;
  
  // Real-time custom toast notifications
  toast: { message: string; type: 'success' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'info') => void;
  hideToast: () => void;

  // Adaptive Quality system
  performanceTier: 'high' | 'medium' | 'low';
  setPerformanceTier: (tier: 'high' | 'medium' | 'low') => void;
}

// Auto-detect performance tier on startup
const getInitialPerformanceTier = (): 'high' | 'medium' | 'low' => {
  if (typeof window === 'undefined') return 'high';
  
  const ua = window.navigator.userAgent.toLowerCase();
  const isMobile = /mobile|android|iphone|ipad|phone/i.test(ua);
  if (isMobile) return 'low';
  
  try {
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return 'low';
    
    // Check coarse unmasked GPU vendor if extended info is supported
    const dbgRenderInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (dbgRenderInfo) {
      const renderer = gl.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();
      if (
        renderer.includes('intel') || 
        renderer.includes('hd graphics') || 
        renderer.includes('iris') ||
        renderer.includes('swiftshader') ||
        renderer.includes('llvmpipe')
      ) {
        return 'medium';
      }
    }
  } catch (e) {
    // Fail-safe
  }
  
  return 'high';
};

export const useStore = create<StoreState>((set, get) => ({
  // Navigation
  isMenuOpen: false,
  activeRoute: 'home',
  setMenuOpen: (open) => set({ isMenuOpen: open }),
  setActiveRoute: (route) => {
    set({ activeRoute: route, isMenuOpen: false });
    // Reset page scroll position on transition
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  },

  // 3D & Scroll Integration
  scrollProgress: 0,
  activePerfumeIndex: 0,
  setScrollProgress: (progress) => {
    // Map progress to active perfume index (e.g. 0-0.33 for Aurelis, 0.33-0.66 for Nocterra, 0.66-1.0 for Solaire Noir)
    let index = 0;
    if (progress > 0.35 && progress <= 0.7) {
      index = 1;
    } else if (progress > 0.7) {
      index = 2;
    }
    set({ scrollProgress: progress, activePerfumeIndex: index });
  },
  setActivePerfumeIndex: (index) => set({ activePerfumeIndex: index }),

  // Cart & E-commerce Operations
  isCartOpen: false,
  cart: [],
  setCartOpen: (open) => set({ isCartOpen: open }),
  addToCart: (perfume, size) => {
    const { cart, showToast } = get();
    const existingIndex = cart.findIndex(
      (item) => item.perfume.id === perfume.id && item.size === size
    );
    const price = size === '50ml' ? perfume.price50ml : perfume.price100ml;

    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
      set({ cart: updatedCart });
    } else {
      set({ cart: [...cart, { perfume, size, quantity: 1, price }] });
    }
    
    set({ isCartOpen: true });
    showToast(`Added ${perfume.name} (${size}) to your collection drawer`, 'success');
  },
  removeFromCart: (perfumeId, size) => {
    const { cart, showToast } = get();
    const item = cart.find(i => i.perfume.id === perfumeId && i.size === size);
    if (item) {
      const filtered = cart.filter(
        (item) => !(item.perfume.id === perfumeId && item.size === size)
      );
      set({ cart: filtered });
      showToast(`Removed ${item.perfume.name} from your collection`, 'info');
    }
  },
  updateQuantity: (perfumeId, size, quantity) => {
    const { cart } = get();
    if (quantity <= 0) {
      get().removeFromCart(perfumeId, size);
      return;
    }
    const updated = cart.map((item) => {
      if (item.perfume.id === perfumeId && item.size === size) {
        return { ...item, quantity };
      }
      return item;
    });
    set({ cart: updated });
  },
  getCartTotal: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },
  clearCart: () => set({ cart: [] }),

  // Premium Product Drawer Operations
  isProductDrawerOpen: false,
  selectedProductForDrawer: null,
  setProductDrawerOpen: (open) => set({ isProductDrawerOpen: open }),
  selectProductForDrawer: (perfume) => set({ selectedProductForDrawer: perfume, isProductDrawerOpen: perfume !== null }),

  // Sample Selection
  selectedSample: null,
  setSelectedSample: (sample) => set({ selectedSample: sample }),

  // Checkout Steps
  checkoutStep: 'idle',
  setCheckoutStep: (step) => set({ checkoutStep: step }),

  // Toast notifications
  toast: null,
  showToast: (message, type = 'success') => {
    set({ toast: { message, type } });
    setTimeout(() => {
      get().hideToast();
    }, 4000);
  },
  hideToast: () => set({ toast: null }),

  // Adaptive Quality System
  performanceTier: getInitialPerformanceTier(),
  setPerformanceTier: (tier) => {
    set({ performanceTier: tier });
    get().showToast(`Switched presentation to ${tier.toUpperCase()} quality`, 'info');
  },
}));
