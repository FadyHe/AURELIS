/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useStore } from '../../stores/useStore';
import { PERFUMES } from '../../data/perfumes';
import { Compass, Sparkles, Filter, Droplet, Star, ShoppingBag, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Collection: React.FC = () => {
  const { addToCart, setActiveRoute, selectProductForDrawer } = useStore();
  const [activeFilter, setActiveFilter] = useState<'all' | 'oceanic' | 'forest' | 'desert'>('all');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, '50ml' | '100ml'>>({
    aurelis: '100ml',
    nocterra: '100ml',
    'solaire-noir': '100ml'
  });

  const handleSizeChange = (perfumeId: string, size: '50ml' | '100ml') => {
    setSelectedSizes(prev => ({ ...prev, [perfumeId]: size }));
  };

  const filteredPerfumes = PERFUMES.filter(perfume => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'oceanic') return perfume.id === 'aurelis';
    if (activeFilter === 'forest') return perfume.id === 'nocterra';
    if (activeFilter === 'desert') return perfume.id === 'solaire-noir';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#09090A] text-white pt-32 pb-24 px-6 md:px-12 lg:px-24 font-sans">
      
      {/* Decorative environment background lights */}
      <div className="absolute top-1/4 right-[10%] w-96 h-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[5%] w-96 h-96 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Editorial Header */}
        <div className="space-y-4 max-w-xl">
          <span className="font-mono text-[9px] tracking-[0.3em] text-[#D4AF37] uppercase flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" /> ESSENCE DIRECTORY
          </span>
          <h1 className="font-display font-medium text-4xl md:text-5xl uppercase tracking-wider text-[#E5E3DB]">
            THE PORTFOLIO
          </h1>
          <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
            Our curated portfolio showcases raw botanical patience. Formulated through precise cold CO2 extractions and distillation directly in Grasse, France.
          </p>
        </div>

        {/* Collection Filters Tabs */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3.5 border-b border-white/5 pb-6">
          <span className="font-mono text-[9px] tracking-wider text-gray-500 flex items-center gap-1 uppercase mr-2">
            <Filter className="w-3 h-3 text-gray-500" /> CATEGORIES:
          </span>
          {[
            { tag: 'all', label: 'All concentric scents' },
            { tag: 'oceanic', label: 'Oceanic Atmospheric' },
            { tag: 'forest', label: 'Forest Bioluminescent' },
            { tag: 'desert', label: 'Desert Obsidian' }
          ].map(f => (
            <button
              key={f.tag}
              onClick={() => setActiveFilter(f.tag as any)}
              className={`p-2 px-4 rounded-full border text-[10px] uppercase font-mono tracking-wider transition-all cursor-pointer ${activeFilter === f.tag ? 'bg-[#D4AF37] border-transparent text-black font-semibold' : 'bg-white/[0.01] border-white/5 text-gray-400 hover:border-white/15 hover:text-white'}`}
              id={`filter-tab-${f.tag}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Unified Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPerfumes.map((perfume, idx) => {
              const activeSize = selectedSizes[perfume.id] || '100ml';
              const price = activeSize === '50ml' ? perfume.price50ml : perfume.price100ml;

              return (
                <motion.div
                  key={perfume.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-[#0F0F11]/50 border border-white/5 rounded-3xl p-6 flex flex-col justify-between hover:border-white/10 transition-all duration-300 backdrop-blur-sm shadow-xl group hover:-translate-y-1.5"
                  id={`collect-card-${perfume.id}`}
                >
                  <div>
                    {/* Visual Bottle Shading Proxy Cover */}
                    <div 
                      onClick={() => setActiveRoute(`product-${perfume.id}`)}
                      className="w-full h-64 bg-black/35 border border-white/5 rounded-2xl relative flex items-center justify-center mb-6 overflow-hidden hover:border-[#D4AF37]/35 transition duration-300 cursor-pointer pointer-events-auto"
                      title={`Explore ${perfume.name}`}
                    >
                      <img 
                        src={perfume.imageUrl} 
                        alt={`${perfume.name} Luxury Flask`}
                        referrerPolicy="no-referrer"
                        className="w-full h-[85%] object-contain select-none pointer-events-none transition-transform duration-500 group-hover:scale-108"
                      />
                      {/* Subtle elegant card overlay vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Interactive floating particles in cover */}
                      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-[50px] opacity-10 filter pointer-events-none"
                        style={{
                          backgroundColor: perfume.id === 'aurelis' ? '#38bdf8' : perfume.id === 'nocterra' ? '#10b981' : '#f59e0b'
                        }}
                      />

                      {/* Bottle dynamic info flag inside frame */}
                      <div className="absolute bottom-3 left-4 right-4 z-10 flex justify-between items-center text-[8px] font-mono tracking-widest text-[#E5E3DB] pointer-events-none">
                        <span className="p-1 px-2.5 bg-black/85 border border-[#D4AF37]/15 rounded-full font-bold">
                          €{price}.00
                        </span>
                        <span className="p-1 px-2.5 bg-black/85 border border-white/10 rounded-full uppercase">
                          {perfume.scentProfile.split(' / ')[0]}
                        </span>
                      </div>
                    </div>

                    {/* Scent Info details */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-baseline cursor-pointer" onClick={() => setActiveRoute(`product-${perfume.id}`)}>
                        <h3 className="font-display font-semibold text-lg uppercase tracking-wider text-white hover:text-[#D4AF37] transition duration-300">
                          {perfume.name}
                        </h3>
                        <div className="flex items-center gap-1 text-[10px] font-mono text-[#D4AF37]">
                          <Star className="w-3.5 h-3.5 fill-[#D4AF37] stroke-transparent" />
                          <span>4.9</span>
                        </div>
                      </div>

                      <p className="font-mono text-[9px] tracking-widest text-[#D4AF37]/80 uppercase">{perfume.scentProfile}</p>
                      
                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                        {perfume.shortDescription}
                      </p>

                      {/* Olfactory Note Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1.5 text-[8px] font-mono text-gray-400">
                        <span className="p-1 px-2 border border-white/5 bg-white/[0.01] rounded-md">TOP: {perfume.pyramid.top[0].name.substring(0,18)}</span>
                        <span className="p-1 px-2 border border-white/5 bg-white/[0.01] rounded-md">BASE: {perfume.pyramid.base[0].name.substring(0,18)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Size toggles & CTAs */}
                  <div className="border-t border-white/5 pt-5 mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">Select decant volume:</span>
                      
                      <div className="flex bg-black border border-white/5 rounded-md p-0.5">
                        {(['50ml', '100ml'] as const).map(size => {
                          const isSelected = activeSize === size;
                          return (
                            <button
                              key={size}
                              onClick={() => handleSizeChange(perfume.id, size)}
                              className={`p-1 px-2 text-[9px] tracking-wide font-mono rounded-md cursor-pointer ${isSelected ? 'bg-[#D4AF37] text-black font-semibold' : 'text-gray-500 hover:text-white'}`}
                              id={`size-toggle-${perfume.id}-${size}`}
                            >
                              {size}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex gap-2 text-[10px] font-mono">
                      <button
                        onClick={() => addToCart(perfume, activeSize)}
                        className="flex-grow py-3 bg-[#D4AF37] hover:bg-white text-black font-semibold tracking-widest uppercase rounded-lg transition duration-300 flex items-center justify-center gap-2 cursor-pointer"
                        id={`btn-cart-${perfume.id}`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" /> ADD TO CART • €{price}.00
                      </button>
                      <button
                        onClick={() => selectProductForDrawer(perfume)}
                        className="p-3 bg-white/5 hover:bg-white text-white hover:text-black rounded-lg border border-white/10 hover:border-transparent transition-all cursor-pointer flex items-center justify-center"
                        id={`btn-details-${perfume.id}`}
                        aria-label="View perfume breakdown sheet"
                      >
                        <Eye className="w-4 h-4 text-gray-450 group-hover:text-white" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
