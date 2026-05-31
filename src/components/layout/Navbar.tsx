/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useStore } from '../../stores/useStore';
import { ShoppingBag, Compass, HelpCircle, FileText, Send, Menu, X } from 'lucide-react';
import { motion } from 'motion/react';

export const Navbar: React.FC = () => {
  const { 
    isMenuOpen, 
    setMenuOpen, 
    isCartOpen, 
    setCartOpen, 
    cart, 
    activeRoute, 
    setActiveRoute 
  } = useStore();

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Collection', route: 'collection', icon: Compass },
    { name: 'About', route: 'about', icon: HelpCircle },
    { name: 'Journal', route: 'journal', icon: FileText },
    { name: 'Concierge', route: 'contact', icon: Send },
  ];

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 md:py-8 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand Logo - Fully Interactive */}
        <div className="pointer-events-auto">
          <button
            onClick={() => setActiveRoute('home')}
            className="group flex flex-col items-start cursor-pointer text-left"
            id="nv-brand-logo"
          >
            <span className="font-display font-semibold text-[20px] md:text-[24px] uppercase tracking-[0.25em] text-[#E5E3DB] transition-all duration-300 group-hover:text-[#D4AF37]">
              AURELIS
            </span>
            <span className="font-mono text-[8px] tracking-[0.4em] text-gray-400 mt-0.5 group-hover:text-white transition-colors duration-300">
              GRASSE / PARIS
            </span>
          </button>
        </div>

        {/* Desktop Menu - Editorial Spacing */}
        <nav className="hidden md:flex items-center gap-10 pointer-events-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeRoute === link.route || activeRoute.startsWith(`${link.route}-`);
            return (
              <button
                key={link.route}
                onClick={() => setActiveRoute(link.route)}
                className="group relative flex items-center gap-2 font-sans text-[11px] tracking-[0.25em] text-xs uppercase text-gray-300 hover:text-white transition-all cursor-pointer"
                id={`nv-link-${link.route}`}
              >
                <Icon className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#D4AF37] transition-colors duration-300" />
                <span className="relative">
                  {link.name}
                  <span className={`absolute -bottom-1.5 left-0 w-full h-[1px] bg-[#D4AF37] transition-all duration-500 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls: Menu + Cart Drawer */}
        <div className="flex items-center gap-4 ptr-evt md:gap-6 pointer-events-auto">
          {/* Cart Collection Selector */}
          <button
            onClick={() => setCartOpen(!isCartOpen)}
            className="group relative flex items-center gap-2.5 p-2 px-3 bg-black/40 hover:bg-black/60 border border-white/5 hover:border-white/10 rounded-full transition-all cursor-pointer shadow-lg backdrop-blur-md"
            id="nv-cart-selector"
          >
            <span className="relative flex">
              <ShoppingBag className="w-4 h-4 text-gray-300 group-hover:text-[#D4AF37] transition-colors duration-300" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#D4AF37] text-black text-[9px] font-mono font-bold flex items-center justify-center rounded-full animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </span>
            <span className="hidden sm:inline font-mono text-[9px] tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors duration-300">
              COLLECTION
            </span>
          </button>

          {/* Luxury Floating Circle Hamburger Toggle */}
          <button
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="group relative flex items-center justify-center w-10 h-10 bg-black/40 hover:bg-black/60 border border-white/5 hover:border-[#D4AF37]/50 rounded-full cursor-pointer transition-all shadow-lg backdrop-blur-md"
            id="nv-menu-hamburger"
            aria-label="Toggle Luxury Site Navigation Menu"
          >
            <motion.div
              animate={isMenuOpen ? 'open' : 'closed'}
              className="relative w-5 h-5 flex flex-col justify-center items-center"
            >
              <span className={`absolute block w-4 h-[1.5px] bg-white transition-transform duration-300 ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5 group-hover:-translate-y-2'}`} />
              <span className={`absolute block w-2.5 h-[1.5px] bg-[#D4AF37] right-0.5 transition-opacity duration-200 ${isMenuOpen ? 'opacity-0' : 'opacity-100 group-hover:w-4'}`} />
              <span className={`absolute block w-4 h-[1.5px] bg-white transition-transform duration-300 ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5 group-hover:translate-y-2'}`} />
            </motion.div>
          </button>
        </div>
      </div>
    </motion.header>
  );
};
