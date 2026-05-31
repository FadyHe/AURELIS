/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useStore } from '../../stores/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Landmark, Sparkles, Star, FlaskConical, Droplet } from 'lucide-react';

export const ProductDrawer: React.FC = () => {
  const { 
    isProductDrawerOpen, 
    setProductDrawerOpen, 
    selectedProductForDrawer, 
    addToCart,
    showToast 
  } = useStore();

  const [selectedSize, setSelectedSize] = useState<'50ml' | '100ml'>('100ml');
  const [quantity, setQuantity] = useState<number>(1);

  // Sync state when selected product shifts
  useEffect(() => {
    if (selectedProductForDrawer) {
      setSelectedSize('100ml');
      setQuantity(1);
    }
  }, [selectedProductForDrawer]);

  if (!selectedProductForDrawer) return null;

  const perfume = selectedProductForDrawer;
  const price = selectedSize === '50ml' ? perfume.price50ml : perfume.price100ml;

  const handleAddToCart = () => {
    // Add multiple quantities
    for (let i = 0; i < quantity; i++) {
      addToCart(perfume, selectedSize);
    }
    setProductDrawerOpen(false);
  };

  return (
    <AnimatePresence>
      {isProductDrawerOpen && (
        <>
          {/* Subtle backdrop darken */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setProductDrawerOpen(false)}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs cursor-pointer"
          />

          {/* Luxury slow-motion sliding card drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-115 md:w-130 bg-[#0C0C0D] text-white border-l border-white/10 shadow-3xl flex flex-col font-sans"
            id="premium-product-drawer"
          >
            {/* Header section with fine horizontal lines and luxury branding */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="font-mono text-[8.5px] tracking-[0.4em] text-gray-500 uppercase block">
                  [ PRODUCT ANALYSIS CONCIERGE ]
                </span>
                <span className="font-mono text-[9.5px] tracking-[0.2em] text-[#D4AF37] uppercase font-bold">
                  MAISON AURELIS GRASSE
                </span>
              </div>
              <button
                onClick={() => setProductDrawerOpen(false)}
                className="p-1.5 hover:bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 rounded-full transition-all cursor-pointer"
                id="close-product-drawer"
                aria-label="Close Product Drawer"
              >
                <X className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Scrollable specs list */}
            <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-8">
              
              {/* Product Info Block & Image */}
              <div className="space-y-5">
                <div className="w-full h-48 bg-black/30 border border-white/5 rounded-2xl relative overflow-hidden flex items-center justify-center">
                  <img 
                    src={perfume.imageUrl} 
                    alt={`${perfume.name} Flacon detail`} 
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover opacity-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between items-baseline text-white">
                    <span className="font-mono text-[8px] tracking-[0.3em] uppercase opacity-75">PORTFOLIO ENTRY 0{perfume.id === 'aurelis' ? 1 : perfume.id === 'nocterra' ? 2 : 3}</span>
                    <span className="font-mono text-[9px] text-[#D4AF37] tracking-wider uppercase font-semibold">GRASSE OUTLET SECURED</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono text-[9px] tracking-[0.2em] text-[#D4AF37] uppercase block">
                        COLLECTION: ETERNAL ATOM
                      </span>
                      <h3 className="font-display font-medium text-2xl uppercase tracking-wider text-white mt-1">
                        {perfume.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-[#D4AF37] bg-[#D4AF37]/5 border border-[#D4AF37]/25 p-1 px-2.5 rounded-full mt-2">
                      <Star className="w-3 h-3 fill-[#D4AF37] stroke-transparent" />
                      <span>4.9 / 5.0 Rating</span>
                    </div>
                  </div>
                  
                  <p className="font-mono text-[10px] tracking-widest text-gray-400 uppercase">
                    SCENT FAMILY: {perfume.scentProfile}
                  </p>
                </div>

                <p className="text-gray-400 text-xs leading-relaxed">
                  {perfume.shortDescription}
                </p>
              </div>

              {/* Comprehensive Notes Pyramid (Chanel style breakdown with minimal graphic bars) */}
              <div className="space-y-4 pt-2 border-t border-white/5">
                <span className="font-mono text-[9px] tracking-[0.3em] text-[#D4AF37] uppercase block">
                  OLFACTORY FORMULA COMPOSITION
                </span>

                <div className="space-y-4 font-mono text-[11px]">
                  {/* Top note */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-white">
                      <span className="font-bold uppercase flex items-center gap-1">
                        <Droplet className="w-3 h-3 text-[#38bdf8]" /> Top Accord
                      </span>
                      <span className="text-[#38bdf8] italic">{perfume.pyramid.top[0].name}</span>
                    </div>
                    <p className="font-sans text-[10.5px] text-gray-500 leading-normal">{perfume.pyramid.top[0].description}</p>
                  </div>

                  {/* Heart note */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-white">
                      <span className="font-bold uppercase flex items-center gap-1">
                        <FlaskConical className="w-3 h-3 text-[#10b981]" /> Heart Impression
                      </span>
                      <span className="text-[#10b981] italic">{perfume.pyramid.heart[0].name}</span>
                    </div>
                    <p className="font-sans text-[10.5px] text-gray-500 leading-normal">{perfume.pyramid.heart[0].description}</p>
                  </div>

                  {/* Base note */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-white">
                      <span className="font-bold uppercase flex items-center gap-1">
                        <Landmark className="w-3 h-3 text-[#f59e0b]" /> Base Sillage
                      </span>
                      <span className="text-[#f59e0b] italic">{perfume.pyramid.base[0].name}</span>
                    </div>
                    <p className="font-sans text-[10.5px] text-gray-500 leading-normal">{perfume.pyramid.base[0].description}</p>
                  </div>
                </div>
              </div>

              {/* Botantical components listing */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                <span className="font-mono text-[9px] text-gray-500 tracking-widest uppercase block">
                  BOTANICAL EXTRACT CORE MATRIX:
                </span>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {perfume.ingredients.map(ing => (
                    <span key={ing} className="p-1 px-2.5 bg-white/[0.01] border border-white/5 rounded-md font-mono text-[8.5px] text-gray-400">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom persistent transaction control and selectors */}
            <div className="p-6 border-t border-white/5 bg-[#101011] space-y-4">
              
              {/* Size selector & Quantity toggle */}
              <div className="flex justify-between items-center text-xs font-mono">
                <div className="space-y-0.5">
                  <span className="font-mono text-[8.5px] text-gray-500 uppercase block">DECANT VOLUME</span>
                  <div className="flex bg-black border border-white/5 p-0.5 rounded-md mt-1">
                    {(['50ml', '100ml'] as const).map(size => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`p-1 px-2.5 text-[9px] font-mono tracking-wider rounded-md cursor-pointer transition ${isSelected ? 'bg-[#D4AF37] text-black font-semibold' : 'text-gray-500 hover:text-white'}`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-0.5 text-right">
                  <span className="font-mono text-[8.5px] text-gray-500 uppercase block">QUANTITY</span>
                  <div className="flex items-center gap-2 bg-black border border-white/5 p-0.5 rounded-md mt-1">
                    <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="w-5 h-5 flex items-center justify-center text-xs text-gray-500 hover:text-white cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-mono text-[10.5px] w-4 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="w-5 h-5 flex items-center justify-center text-xs text-gray-500 hover:text-white cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic overall valuation details */}
              <div className="flex justify-between items-baseline font-mono text-xs pt-1">
                <span className="text-gray-500">VALUATION FOR DEPOSIT:</span>
                <span className="text-[#D4AF37] text-sm font-semibold">€{price * quantity}.00</span>
              </div>

              {/* Slide to Add To Cart action trigger */}
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 bg-[#D4AF37] hover:bg-white text-black font-semibold text-[10.5px] tracking-widest uppercase rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <ShoppingBag className="w-3.5 h-3.5" /> SECURE DECODE INTRUSION • €{price * quantity}.00
              </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
