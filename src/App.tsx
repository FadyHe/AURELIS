/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { useStore } from './stores/useStore';
import { Navbar } from './components/layout/Navbar';
import { MenuOverlay } from './components/layout/MenuOverlay';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/ui/CartDrawer';
import { ProductDrawer } from './components/ui/ProductDrawer';
import { Toast } from './components/ui/Toast';
import { PerformanceControls } from './components/ui/PerformanceControls';
import { SEOPress, SEOMetadataInspector } from './lib/seo';

// Pages
import { Home } from './components/pages/Home';
import { Collection } from './components/pages/Collection';
import { ProductPage } from './components/pages/ProductPage';
import { About } from './components/pages/About';
import { Contact } from './components/pages/Contact';
import { Journal } from './components/pages/Journal';

// Smooth Scroll support (Lenis simulation)
import Lenis from 'lenis';

export default function App() {
  const activeRoute = useStore((state) => state.activeRoute);

  // Initialize Lenis scroll physics in Phase 1 for luxury animation framing
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Simple router resolver
  const renderActivePage = () => {
    if (activeRoute === 'home') {
      return <Home />;
    }
    if (activeRoute === 'collection') {
      return <Collection />;
    }
    if (activeRoute === 'about') {
      return <About />;
    }
    if (activeRoute === 'contact') {
      return <Contact />;
    }
    if (activeRoute === 'journal' || activeRoute.startsWith('blog-')) {
      return <Journal />;
    }
    if (activeRoute.startsWith('product-')) {
      return <ProductPage />;
    }
    
    // Fallback to Home
    return <Home />;
  };

  return (
    <div className="relative min-h-screen bg-[#080809] text-white selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. Dynamic SEO Header Injector */}
      <SEOPress />

      {/* 2. Global Floating Navigation */}
      <Navbar />

      {/* 3. Fullscreen Navigation Overlay */}
      <MenuOverlay />

      {/* 4. Sliding E-Commerce Cart & Checkout Drawer */}
      <CartDrawer />

      {/* Premium Product Detail Side Drawer */}
      <ProductDrawer />

      {/* 5. Custom Real-time Visual Alerts */}
      <Toast />

      {/* Adaptive Quality System Performance Toggle */}
      <PerformanceControls />

      {/* 6. Dynamic Page Views (Controlled by Zustand Route Store) */}
      <main className="relative z-20">
        {renderActivePage()}
      </main>

      {/* 7. Structural Sitemap & Contact Registry */}
      <Footer />

      {/* 8. Premium Real-Time SEO & Metadata Schema Inspector */}
      <SEOMetadataInspector />

    </div>
  );
}
