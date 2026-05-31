/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useStore } from '../../stores/useStore';
import { PERFUMES } from '../../data/perfumes';
import { ChevronLeft, ShoppingBag, MapPin, Sparkles, Sprout, ArrowRight, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { SceneCanvas } from '../scene/SceneCanvas';

export const ProductPage: React.FC = () => {
  const { activeRoute, setActiveRoute, addToCart } = useStore();
  const [selectedSize, setSelectedSize] = useState<'50ml' | '100ml'>('100ml');

  // Extract ID from product Route (e.g. 'product-aurelis')
  const perfumeId = activeRoute.replace('product-', '');
  const perfume = PERFUMES.find(p => p.id === perfumeId) || PERFUMES[0];

  const price = selectedSize === '50ml' ? perfume.price50ml : perfume.price100ml;

  // Determine campaign visual assets
  const campaignBg = perfume.id === 'aurelis' 
    ? '/assets/images/aurelis_campaign_1780222997018.webp'
    : perfume.id === 'nocterra'
      ? '/assets/images/nocterra_campaign_1780223016557.webp'
      : '/assets/images/solaire_campaign_1780223040000.webp';

  const storyCopy = perfume.id === 'aurelis'
    ? 'Harvested at early dawn in Grasse, we condense sea-air vapor molecules through alpine limestone structures. This process traps the salty maritime micro-elements, rendering an incredibly sharp, fresh marine sillage.'
    : perfume.id === 'nocterra'
      ? 'Collected during midnight springs under the full moon in Lapland valleys. We capture rare lichen moss and pine spruce using pressurized cold CO2, retaining the damp botanical complexity and raw basalt minerality.'
      : 'Toasted saffron crocus filaments are flamed over dark obsidian tiles in absolute vacuum chambers. The resulting black resin triggers continuous thermal friction, reacting dynamically to your body heat throughout the day.';

  // Identify related products (other 2 fragrances)
  const relatedPerfumes = PERFUMES.filter(p => p.id !== perfume.id);

  return (
    <div className="min-h-screen bg-[#070708] text-[#E5E3DB] pt-32 pb-24 px-6 md:px-12 lg:px-24 font-sans relative select-none">
      
      {/* 1. STRUCTURAL BACKGROUND LIGHTING */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[55vw] h-[55vh] filter blur-[150px] opacity-40 transition-all duration-1000 -z-10 rounded-full"
        style={{ 
          background: perfume.id === 'aurelis' 
            ? 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(0,0,0,0) 80%)'
            : perfume.id === 'nocterra'
              ? 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(0,0,0,0) 80%)'
              : 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, rgba(0,0,0,0) 80%)'
        }}
      />

      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* TOP COMPASS BREADCRUMB */}
        <div className="flex justify-between items-center pb-6 border-b border-white/5">
          <button
            onClick={() => setActiveRoute('home')}
            className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white border border-white/10 text-gray-400 hover:text-black rounded-full text-[9px] tracking-[0.25em] font-mono uppercase transition cursor-pointer"
            id="product-back-btn"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> THE COLLECTION PORTFOLIO
          </button>
          
          <span className="font-mono text-[8px] text-gray-500 tracking-[0.4em] uppercase hidden sm:inline">
            SECURE SOURCE ALLOTMENT NO: AR-{perfume.id.substring(0,3).toUpperCase()}
          </span>
        </div>

        {/* SECTION A: THE MONUMENT (Core presentation) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Column 1: Interactive optimized 2.5D Flacon scene frame */}
          <div className="lg:col-span-6 space-y-4">
            <div className="w-full h-[52vh] bg-black/60 border border-white/5 rounded-2xl relative flex flex-col items-center justify-center overflow-hidden shadow-2xl">
              
              {/* Dynamic 2.5D Custom Canvas rendering of specific ID */}
              <div className="absolute inset-0 z-10 w-full h-full">
                <SceneCanvas id={perfume.id} />
              </div>
              
              {/* Surrounding high-end dark studio shade overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35 z-0 pointer-events-none" />

              {/* Status Header Overlay */}
              <div className="absolute top-5 right-5 z-20 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-1.5 font-mono text-[8px] tracking-widest text-[#D4AF37] uppercase select-none pointer-events-none shadow-md">
                <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" /> OPTIMIZED INTERACTIVE VIEW
              </div>

              {/* Left footer indicator */}
              <span className="absolute bottom-5 left-5 z-20 font-mono text-[8px] text-gray-500 tracking-[0.2em] uppercase select-none pointer-events-none">
                COORD: [LAT 43.6589° N] / SEC-D
              </span>
            </div>

            {/* Micro Details banner */}
            <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl flex items-center gap-3">
              <MapPin className="w-4 h-4 text-gray-500" />
              <div className="text-[10px] font-mono text-gray-400 leading-relaxed uppercase">
                <span className="font-bold text-white block">Captured Distillation Zone</span>
                {perfume.worldConcept.split('with')[0]}
              </div>
            </div>
          </div>

          {/* Column 2: Specs, notes, options formulation */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="space-y-3">
              <span className="p-1 px-3 bg-white/5 border border-white/10 rounded-full font-mono text-[8.5px] tracking-widest text-gray-400 uppercase inline-block">
                {perfume.scentProfile}
              </span>
              <h2 className="font-display font-light text-5xl md:text-6xl uppercase tracking-[0.05em] text-white">
                {perfume.name}
              </h2>
              <p className="font-mono text-[11px] tracking-[0.25em] text-[#D4AF37] uppercase font-semibold">
                {perfume.tagline}
              </p>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed font-light">
              {perfume.description}
            </p>

            {/* Olfactory pyramid detailed progress lines */}
            <div className="p-6 bg-[#0B0B0C] border border-white/5 rounded-2xl space-y-5">
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#D4AF37] uppercase block border-b border-white/5 pb-2">
                OLFACTORY NOTE PYRAMID BREAKDOWN
              </span>

              <div className="space-y-4 font-mono text-xs">
                {/* 01. Top */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-white uppercase tracking-wider">TOP ACCORD</span>
                    <span className="text-gray-400 italic text-[11px]">{perfume.pyramid.top[0].name}</span>
                  </div>
                  <div className="w-full bg-white/5 h-[1.5px] rounded-full overflow-hidden">
                    <div className="bg-[#38bdf8] h-full" style={{ width: `${perfume.pyramid.top[0].intensity}%` }} />
                  </div>
                  <p className="font-sans text-[10.5px] text-gray-500 leading-relaxed font-light">{perfume.pyramid.top[0].description}</p>
                </div>

                {/* 02. Heart */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-white uppercase tracking-wider">HEART CORE</span>
                    <span className="text-gray-400 italic text-[11px]">{perfume.pyramid.heart[0].name}</span>
                  </div>
                  <div className="w-full bg-white/5 h-[1.5px] rounded-full overflow-hidden">
                    <div className="bg-[#10b981] h-full" style={{ width: `${perfume.pyramid.heart[0].intensity}%` }} />
                  </div>
                  <p className="font-sans text-[10.5px] text-gray-500 leading-relaxed font-light">{perfume.pyramid.heart[0].description}</p>
                </div>

                {/* 03. Base */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-white uppercase tracking-wider">BASE SILLAGE</span>
                    <span className="text-gray-400 italic text-[11px]">{perfume.pyramid.base[0].name}</span>
                  </div>
                  <div className="w-full bg-white/5 h-[1.5px] rounded-full overflow-hidden">
                    <div className="bg-[#f59e0b] h-full" style={{ width: `${perfume.pyramid.base[0].intensity}%` }} />
                  </div>
                  <p className="font-sans text-[10.5px] text-gray-500 leading-relaxed font-light">{perfume.pyramid.base[0].description}</p>
                </div>
              </div>
            </div>

            {/* Quantities & add to drawer triggers */}
            <div className="border-t border-white/5 pt-6 space-y-5">
              <div className="flex justify-between items-center bg-black/40 border border-white/5 p-4 rounded-xl">
                <div className="space-y-0.5">
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">CHOOSE CONCENTRATE QUANTITY</span>
                  <span className="text-gray-400 text-xs font-light font-serif italic">Includes raw cedarwood box packaging envelope</span>
                </div>
                
                <div className="flex bg-[#070708] border border-white/5 p-0.5 rounded-md">
                  {(['50ml', '100ml'] as const).map(size => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`p-1.5 px-4 text-[10px] font-mono tracking-wider rounded-md cursor-pointer transition ${isSelected ? 'bg-[#D4AF37] text-black font-semibold' : 'text-gray-500 hover:text-white'}`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => addToCart(perfume, selectedSize)}
                  className="flex-grow py-4 bg-[#D4AF37] hover:bg-white text-black font-semibold text-[11px] tracking-[0.25em] uppercase rounded-xl transition duration-300 flex items-center justify-center gap-3.5 cursor-pointer shadow-xl hover:shadow-[#D4AF37]/5"
                  id="prod-add-cart-btn"
                >
                  <ShoppingBag className="w-4 h-4" /> SECURE DEPOSIT • €{price}.00
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* SECTION B: THE LANDSCAPE (Storytelling & Campaign Resonance) */}
        <div className="border-t border-white/5 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Split A: Story description panel */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <Sprout className="w-4 h-4" />
                <span className="font-mono text-[9px] tracking-widest uppercase">THE CHRONICLE OF BOTANY</span>
              </div>
              
              <h3 className="font-display font-light text-2.5xl md:text-4xl text-white uppercase tracking-wide leading-tight">
                Slow Distillation Philosophy
              </h3>
              
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-light">
                {storyCopy}
              </p>

              <div className="space-y-1 pb-4">
                <span className="font-mono text-[9px] text-gray-500 tracking-widest uppercase block">BOTANICAL EXTRACT COMPOSITION:</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {perfume.ingredients.map(ing => (
                    <span key={ing} className="p-1 px-2.5 bg-white/[0.02] border border-white/5 rounded-md font-mono text-[8px] text-gray-400 uppercase tracking-wider">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Split B: Full landscape background visual spread */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/9] w-full bg-black border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={campaignBg}
                  alt={`${perfume.name} Campaign backdrop landscape`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-75"
                />
                {/* Visual vignette */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10" />
                <div className="absolute bottom-6 left-6 z-20 max-w-sm">
                  <p className="font-serif italic text-white text-base">“Capturing geography, converting climate to liquid memory.”</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION C: RELATED SYSTEM (Other products in collection) */}
        <div className="border-t border-white/5 pt-20 space-y-12">
          
          <div className="flex justify-between items-baseline">
            <h4 className="font-display font-light text-xl md:text-2xl text-white uppercase tracking-wider">
              OLFACTORY CONVERGENCES
            </h4>
            <span className="font-mono text-[8.5px] text-gray-500 tracking-widest uppercase">
              RELATED SYSTEM MODULES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPerfumes.map(rel => (
              <div
                key={rel.id}
                onClick={() => {
                  setActiveRoute(`product-${rel.id}`);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="group p-6 bg-[#0B0B0C] border border-white/5 rounded-2xl flex items-center justify-between h-52 shadow-md hover:border-white/15 hover:bg-[#111112] transition duration-500 cursor-pointer pointer-events-auto"
              >
                <div className="space-y-3.5 max-w-[65%]">
                  <span className="font-mono text-[8px] text-[#D4AF37] tracking-widest uppercase">
                    {rel.scentProfile.split('/')[0]}
                  </span>
                  
                  <h5 className="font-display text-lg uppercase tracking-wider text-white group-hover:text-[#D4AF37] transition duration-300">
                    {rel.name}
                  </h5>

                  <p className="font-sans text-[11px] text-gray-500 leading-normal line-clamp-2 font-light">
                    {rel.shortDescription}
                  </p>

                  <div className="flex items-center gap-1.5 font-mono text-[8px] text-gray-400 group-hover:text-[#D4AF37] transition-all pt-1">
                    <span>ENTER ESSENCE CHAPTER</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div className="w-[30%] h-full flex items-center justify-center relative overflow-hidden">
                  <div className="absolute w-20 h-20 rounded-full bg-white/[0.005] group-hover:bg-white/[0.012] transition duration-700 blur-md" />
                  <img
                    src={rel.imageUrl}
                    alt={`${rel.name} bottle mockup reference`}
                    referrerPolicy="no-referrer"
                    className="h-32 object-contain select-none pointer-events-none transition duration-700 group-hover:scale-110 group-hover:-translate-y-2 filter drop-shadow-[0_8px_15px_rgba(0,0,0,0.5)]"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
