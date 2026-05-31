/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useStore } from '../../stores/useStore';
import { PERFUMES } from '../../data/perfumes';
import { motion } from 'motion/react';
import { ArrowRight, Compass, Shield, Eye, Flame, Trees, Sparkles, Wind } from 'lucide-react';

const CAMPAIGN_SECTIONS = [
  {
    id: 'aurelis',
    name: 'AURELIS',
    subTitle: 'Defy Gravity',
    tagline: 'Crystalline ocean wind meets floating white cliffs.',
    accent: '#38bdf8',
    bgImage: '/src/assets/images/aurelis_campaign_1780222997018.png',
    bottleImage: '/src/assets/images/aurelis_smooth_bottle_1780223760436.png',
    tone: 'Cold, crystalline air and coastal sea mist. Suspended limestone pillars.',
    quote: 'An elevation of the senses beyond earthly weights.',
  },
  {
    id: 'nocterra',
    name: 'NOCTERRA',
    subTitle: 'The Forest Breathes',
    tagline: 'Deep ancient midnight. Wet moss. Bioluminescent mystery.',
    accent: '#10b981',
    bgImage: '/src/assets/images/nocterra_campaign_1780223016557.png',
    bottleImage: '/src/assets/images/nocterra_smooth_bottle_1780223465270.png',
    tone: 'Damp primeval roots growing over wet forest basalt and glowing lichen spores.',
    quote: 'A perpetual green twilight carved in stone.',
  },
  {
    id: 'solaire-noir',
    name: 'SOLAIRE NOIR',
    subTitle: 'The Last Light',
    tagline: 'Smoked amber. Dark stone. Golden desert wind.',
    accent: '#f59e0b',
    bgImage: '/src/assets/images/solaire_campaign_1780223040000.png',
    bottleImage: '/src/assets/images/solaire_smooth_bottle_1780223485925.png',
    tone: 'Cold obsidian dunes reacting against scorching red saffron sunsets.',
    quote: 'The thermal friction of shadow and absolute warmth.',
  }
];

export const Home: React.FC = () => {
  const { setActiveRoute } = useStore();

  return (
    <div className="relative min-h-screen bg-[#070708] text-[#E5E3DB] overflow-hidden font-sans select-none">
      
      {/* 1. THREE CINEMATIC HIGH-FASHION CAMPAIGN SECTIONS */}
      {CAMPAIGN_SECTIONS.map((campaign, index) => {
        const isEven = index % 2 === 0;
        return (
          <section
            key={campaign.id}
            id={`section-${campaign.id}`}
            className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 py-20 border-b border-white/[0.03] overflow-hidden"
          >
            {/* Dynamic Subtle Mood Shadow Backdrop overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#070708]/90 via-transparent to-[#070708]/95 z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-20">
              
              {/* BRAND STORY & EDITORIAL TEXT BLOCK */}
              <div className={`lg:col-span-6 space-y-8 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                
                {/* Micro Category Segment */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8 }}
                  className="flex items-center gap-3"
                >
                  <span className="font-mono text-[9px] tracking-[0.4em] text-gray-500 uppercase">
                    CHAPTER 0{index + 1} // MAISON FORMULATION
                  </span>
                  <div className="h-[1px] w-12 bg-white/10" />
                </motion.div>

                {/* Main Hero Header */}
                <div className="space-y-4">
                  <motion.h2 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display font-light text-6xl md:text-8xl tracking-[0.1em] text-white uppercase leading-none"
                  >
                    {campaign.name}
                  </motion.h2>

                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 1, delay: 0.15 }}
                    className="font-serif italic text-2xl md:text-3xl text-gray-400 font-light"
                  >
                    {campaign.subTitle}
                  </motion.h3>
                </div>

                {/* Poetry Text Block */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: 0.25 }}
                  className="space-y-5"
                >
                  <p className="font-sans text-sm md:text-base text-[#D4AF37] leading-relaxed tracking-wide font-medium">
                    {campaign.tagline}
                  </p>
                  <p className="font-sans text-xs text-gray-400 leading-relaxed font-light max-w-md">
                    {campaign.tone}
                  </p>
                  <p className="font-serif italic text-xs text-gray-500 leading-relaxed border-l border-white/10 pl-4 py-1">
                    “{campaign.quote}”
                  </p>
                </motion.div>

                {/* Luxury Action Call To Page */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: 0.35 }}
                  className="pt-4"
                >
                  <button
                    onClick={() => setActiveRoute(`product-${campaign.id}`)}
                    className="group bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 hover:border-transparent py-3 px-8 text-[10px] tracking-[0.3em] uppercase rounded-full cursor-pointer transition-all duration-500 flex items-center gap-3.5"
                    id={`campaign-explore-${campaign.id}`}
                  >
                    <span>EXPLORE THE ESSENCE</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </motion.div>

              </div>

              {/* ASYMMETRICAL LUXURY CAMPAIGN PHOTO BLOCK WITH LAYERED BOTTLE HERO */}
              <div className={`lg:col-span-6 flex justify-center items-center ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full aspect-[4/5] max-w-[460px] bg-black/40 border border-white/5 rounded-2xl overflow-hidden shadow-2xl group flex items-center justify-center"
                >
                  {/* Slow Infinite Scale Backplate Image */}
                  <motion.div
                    initial={{ scale: 1.05 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 12, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={campaign.bgImage}
                      alt={`${campaign.name} Campaign Mood Background`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-65 transition-transform duration-1000 group-hover:scale-105"
                    />
                  </motion.div>

                  {/* High Contrast Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10" />

                  {/* Layered Floating Bottle Flacon — The real luxury hero */}
                  <motion.div
                    initial={{ y: 25, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute z-20 w-[60%] aspect-square flex items-center justify-center filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
                  >
                    <img
                      src={campaign.bottleImage}
                      alt={`${campaign.name} Premium Flacon`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain pointer-events-none transition-transform duration-700 group-hover:scale-108 group-hover:-translate-y-2"
                    />
                  </motion.div>

                  {/* Micro Coordinate Specs Overlaid on Border Corners */}
                  <span className="absolute top-5 left-5 z-20 font-mono text-[7px] text-gray-500 tracking-widest uppercase">
                    COORDINATE ZONE: {campaign.name} / CR-0{index + 1}
                  </span>
                  <span className="absolute bottom-5 right-5 z-20 font-mono text-[7.5px] text-[#D4AF37] tracking-widest uppercase bg-black/80 p-1.5 px-3 rounded-md border border-white/5 backdrop-blur-xs">
                    FORMULA INTENSITY: 98.4%
                  </span>
                </motion.div>

              </div>

            </div>
          </section>
        );
      })}

      {/* 2. THE GRAND PRODUCT SHOWCASE PORTFOLIO */}
      <section className="relative min-h-screen py-32 px-6 md:px-12 lg:px-24 flex flex-col justify-center items-center bg-[#09090A] relative z-20">
        <div className="max-w-7xl mx-auto w-full space-y-20">
          
          {/* Section Introduction */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="font-mono text-[9px] tracking-[0.45em] text-[#D4AF37] uppercase p-1.5 px-4 bg-white/5 rounded-full border border-white/5 inline-block">
              THE SCENT PORTFOLIO
            </span>
            <h3 className="font-display font-light text-4.5xl md:text-6xl uppercase tracking-[0.08em] text-white leading-tight">
              OLFACTORY SYSTEM
            </h3>
            <p className="text-gray-400 font-sans text-xs md:text-sm leading-relaxed font-light">
              Each formulation is clean, seasonal, and captured at structural transition points. Crafted with precision in Grasse, France.
            </p>
          </div>

          {/* Fragrances 3-Column Luxury Cards Portfolio */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PERFUMES.map((perfume, idx) => {
              const bgGradient = idx === 0 
                ? 'group-hover:shadow-[0_0_50px_rgba(56,189,248,0.06)]' 
                : idx === 1 
                  ? 'group-hover:shadow-[0_0_50px_rgba(16,185,129,0.06)]' 
                  : 'group-hover:shadow-[0_0_50px_rgba(245,158,11,0.06)]';

              return (
                <div
                  key={perfume.id}
                  onClick={() => setActiveRoute(`product-${perfume.id}`)}
                  className={`group bg-[#0C0C0D] border border-white/5 rounded-3xl p-6 flex flex-col justify-between h-[520px] shadow-sm hover:border-white/15 hover:bg-[#111112] transition-all duration-500 cursor-pointer pointer-events-auto ${bgGradient}`}
                >
                  {/* Top classification label */}
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="font-mono text-[8.5px] text-gray-400 tracking-wider">
                      EDITION 0{idx + 1}
                    </span>
                    <span className="font-mono text-[8px] text-[#D4AF37] tracking-[0.2em] font-semibold uppercase">
                      {perfume.scentProfile.split('/')[0]}
                    </span>
                  </div>

                  {/* Hero Flacon Image Platform with soft light shifts */}
                  <div className="relative flex-grow flex items-center justify-center my-4 overflow-hidden">
                    {/* Atmospheric circle behind bottle */}
                    <div className="absolute w-36 h-36 rounded-full bg-white/[0.01] group-hover:bg-white/[0.03] transition-colors duration-700 blur-xl z-0" />
                    
                    <img
                      src={perfume.imageUrl}
                      alt={`${perfume.name} Luxury Perfume Bottle`}
                      referrerPolicy="no-referrer"
                      className="h-56 object-contain z-10 transition-transform duration-700 group-hover:scale-108 group-hover:-translate-y-3 filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]"
                    />
                  </div>

                  {/* Scent Detail Metadata */}
                  <div className="space-y-4 pt-3 border-t border-white/5">
                    <div>
                      <h4 className="font-display font-medium text-xl uppercase tracking-wider text-white group-hover:text-[#D4AF37] transition-colors duration-300">
                        {perfume.name}
                      </h4>
                      <p className="font-serif italic text-xs text-gray-500 mt-0.5">
                        {perfume.tagline}
                      </p>
                    </div>

                    <p className="font-sans text-[11px] text-gray-400 leading-relaxed line-clamp-2 font-light">
                      {perfume.shortDescription}
                    </p>

                    <div className="flex justify-between items-baseline pt-1">
                      <span className="font-mono text-[9px] text-gray-500 tracking-wider uppercase">
                        VOLUME OPTIONS
                      </span>
                      <span className="font-mono text-[11px] text-[#D4AF37] font-semibold">
                        €{perfume.price50ml}.00 / €{perfume.price100ml}.00
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sincere Maison details footer */}
          <div className="pt-10 border-t border-white/[0.02] flex flex-col md:flex-row justify-between items-center text-gray-500 text-[10px] font-mono space-y-4 md:space-y-0">
            <span>REGISTERED ORIGINAL DISTILLATIONS FROM GRASSE </span>
            <span>SECURE CONTINUOUS DEPOSIT INTAKE • SHIPPING GLOBAL</span>
          </div>

        </div>
      </section>

    </div>
  );
};
