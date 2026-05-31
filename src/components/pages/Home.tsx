/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
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
    bottleImage: '/src/assets/images/aurelis_ultra_luxury_1780226323004.png',
    tone: 'Cold, crystalline air and coastal sea mist. Suspended limestone pillars.',
    quote: 'An elevation of the senses beyond earthly weights.',
    ambientGlow: 'radial-gradient(circle, rgba(56,189,248,0.22) 0%, rgba(56,189,248,0.01) 60%, rgba(0,0,0,0) 100%)',
    particleColor: 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.45)]',
    effectType: 'mist'
  },
  {
    id: 'nocterra',
    name: 'NOCTERRA',
    subTitle: 'The Forest Breathes',
    tagline: 'Deep ancient midnight. Wet moss. Bioluminescent mystery.',
    accent: '#10b981',
    bgImage: '/src/assets/images/nocterra_campaign_1780223016557.png',
    bottleImage: '/src/assets/images/nocterra_ultra_luxury_1780226339771.png',
    tone: 'Damp primeval roots growing over wet forest basalt and glowing lichen spores.',
    quote: 'A perpetual green twilight carved in stone.',
    ambientGlow: 'radial-gradient(circle, rgba(16,185,129,0.22) 0%, rgba(16,185,129,0.01) 60%, rgba(0,0,0,0) 100%)',
    particleColor: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.45)]',
    effectType: 'spores'
  },
  {
    id: 'solaire-noir',
    name: 'SOLAIRE NOIR',
    subTitle: 'The Last Light',
    tagline: 'Smoked amber. Dark stone. Golden desert wind.',
    accent: '#f59e0b',
    bgImage: '/src/assets/images/solaire_campaign_1780223040000.png',
    bottleImage: '/src/assets/images/solaire_noir_ultra_luxury_1780226364281.png',
    tone: 'Cold obsidian dunes reacting against scorching red saffron sunsets.',
    quote: 'The thermal friction of shadow and absolute warmth.',
    ambientGlow: 'radial-gradient(circle, rgba(245,158,11,0.22) 0%, rgba(245,158,11,0.01) 60%, rgba(0,0,0,0) 100%)',
    particleColor: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.45)]',
    effectType: 'embers'
  }
];

// Concentrated micro-particles that get sharper and larger ONLY near the bottle centered in the photograph
const LocalizedAtmosphereParticles: React.FC<{ 
  color: string; 
  count?: number;
  isSelected: boolean;
}> = ({ color, count = 35, isSelected }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // Focus particles center-ward horizontally (Gaussian-like clusters on the bottle center-line 50%)
      const r = Math.random();
      const leftVal = 50 + (r - 0.5) * (r < 0.65 ? 25 : 75); // 65% of particles concentrated within +/- 12.5% of center

      const baseSize = Math.random() * 1.5 + 0.8; // Tiny standard dust particles
      const duration = Math.random() * 7 + 5; // Drift speeds
      
      return {
        id: i,
        left: `${leftVal}%`,
        startY: Math.random() * 100,
        baseSize,
        duration,
        delay: Math.random() * -12, // Pre-distribute fully on load
        driftX: (Math.random() - 0.5) * 45
      };
    });
  }, [count]);

  return (
    <div className="absolute inset-0 w-full h-full z-15 pointer-events-none overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${color}`}
          style={{
            left: p.left,
            bottom: `${p.startY}%`,
            width: `${p.baseSize}px`,
            height: `${p.baseSize}px`,
          }}
          animate={{
            y: [-120, -550], // Drift upward gracefully
            x: [0, p.driftX],
            // SHARPNESS & MAGNIFICATION CURVE (peaks exactly in the center vertically where the bottle stands in the photo)
            scale: isSelected ? [0.6, 1.25, 2.8, 1.25, 0.4] : [0.5, 1.0, 2.2, 1.0, 0.4],
            opacity: [0, 0.35, 0.95, 0.35, 0],
            filter: [
              'blur(1.5px)', // Fuzzy, out-of-focus background air at bottom
              'blur(0.6px)', // Starts sharpening as it approaches the focal plane
              'blur(0px)',   // Crisp, razor-sharp bright glowing spark directly over the glass flacon
              'blur(0.8px)', // Glides into soft focus at top foreground
              'blur(2px)'    // Blurs away into upper atmosphere
            ]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export const Home: React.FC = () => {
  const { setActiveRoute } = useStore();
  const [hoveredBottle, setHoveredBottle] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen bg-[#070708] text-[#E5E3DB] overflow-hidden font-sans select-none">
      
      {/* 1. IMMERSIVE CAMPAIGN ENVIRONMENTS */}
      {CAMPAIGN_SECTIONS.map((campaign, index) => {
        const isSelected = hoveredBottle === campaign.id;
        return (
          <section
            key={campaign.id}
            id={`section-${campaign.id}`}
            className="relative min-h-[95vh] lg:min-h-screen w-full flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 py-20 border-b border-white/[0.03] overflow-hidden group/section"
          >
            {/* Full-bleed high-end luxury backdrop scene covering the entire section */}
            <div className="absolute inset-0 w-full h-full -z-10 bg-[#070708]">
              <motion.img
                initial={{ scale: 1.06, filter: 'brightness(0.35) blur(10px)' }}
                whileInView={{ scale: 1, filter: 'brightness(0.55) blur(0px)' }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                src={campaign.bgImage}
                alt={`${campaign.name} Immersive Campaign Environment`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover/section:scale-102"
              />
              {/* High precision vignette shading to blend perfectly into dark space */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/35 to-black/80 z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-transparent to-black/80 z-10 pointer-events-none" />
            </div>

            {/* Content Layout Grid */}
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-20">
              
              {/* BRAND STORY & POETRY TEXT BLOCK (LEFT) */}
              <div className="lg:col-span-6 space-y-8 order-2 lg:order-1 text-left">
                
                {/* Micro Category Segment */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8 }}
                  className="flex items-center gap-3.5"
                >
                  <span className="font-mono text-[9px] tracking-[0.45em] text-[#D4AF37] uppercase font-bold">
                    EDITION CHAPTER 0{index + 1}
                  </span>
                  <div className="h-[1px] w-12 bg-[#D4AF37]/30" />
                  <span className="font-mono text-[8px] tracking-[0.3em] text-gray-500 uppercase">
                    MAISON ORIGINE
                  </span>
                </motion.div>

                {/* Main Hero Header */}
                <div className="space-y-4">
                  <motion.h2 
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display font-light text-6xl md:text-8xl tracking-[0.15em] text-white uppercase leading-none"
                  >
                    {campaign.name}
                  </motion.h2>

                  <motion.h3
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 1, delay: 0.15 }}
                    className="font-serif italic text-2xl md:text-3xl text-gray-350 font-light tracking-wide"
                  >
                    {campaign.subTitle}
                  </motion.h3>
                </div>

                {/* Scent & Essence Chemistry Poetry */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, delay: 0.25 }}
                  className="space-y-4"
                >
                  <p className="font-sans text-xs md:text-sm text-[#E5E3DB] leading-relaxed tracking-wider font-light max-w-xl">
                    {campaign.tagline}
                  </p>
                  <p className="font-sans text-[11px] text-[#D4AF37] leading-relaxed font-normal uppercase tracking-[0.2em]">
                    {campaign.tone}
                  </p>
                  <p className="font-serif italic text-xs text-gray-500 leading-relaxed border-l-2 border-[#D4AF37]/30 pl-4 py-1 max-w-md">
                    “{campaign.quote}”
                  </p>
                </motion.div>

                {/* Elegant Minimalist Call To Exploration */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, delay: 0.35 }}
                  className="pt-4"
                >
                  <button
                    onClick={() => setActiveRoute(`product-${campaign.id}`)}
                    className="group bg-black/40 hover:bg-white text-white hover:text-black border border-white/10 hover:border-transparent py-4 px-10 text-[9px] tracking-[0.4em] uppercase rounded-full cursor-pointer transition-all duration-500 flex items-center gap-4 shadow-xl backdrop-blur-sm"
                    id={`campaign-explore-${campaign.id}`}
                  >
                    <span>ENTER THIS ATMOSPHERE</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </button>
                </motion.div>

              </div>

              {/* IMMERSIVE HIGH-END GALLERY PORTRAIT (RIGHT) */}
              <div className="lg:col-span-6 flex justify-center items-center order-1 lg:order-2">
                <div 
                  className="relative w-full aspect-[4/5] max-w-[465px] flex flex-col justify-center items-center group/bottle-container"
                  onMouseEnter={() => setHoveredBottle(campaign.id)}
                  onMouseLeave={() => setHoveredBottle(null)}
                >
                  
                  {/* Soft backlight aura mimicking scent projection */}
                  <div 
                    className="absolute inset-[15%] rounded-full blur-[90px] opacity-35 transition-all duration-1000 pointer-events-none"
                    style={{ 
                      background: campaign.ambientGlow,
                      transform: isSelected ? 'scale(1.15) translate(0%, -5%)' : 'scale(1)' 
                    }}
                  />

                  {/* High-contrast luxurious gallery photo frame */}
                  <motion.div
                    onClick={() => setActiveRoute(`product-${campaign.id}`)}
                    className="relative w-full h-[54vh] md:h-[58vh] bg-[#0A0A0B] border border-white/[0.06] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] transition-all duration-700 cursor-pointer pointer-events-auto flex items-center justify-center"
                    whileHover={{ scale: 1.015 }}
                  >
                    {/* The genuine, premium, integrated photograph of the bottle in its natural environment */}
                    <motion.img
                      src={campaign.bottleImage}
                      alt={`${campaign.name} High Fashion Campaign`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover select-none pointer-events-none"
                      animate={{
                        scale: isSelected ? 1.045 : 1.01,
                      }}
                      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    />

                    {/* Sophisticated dark vignette inside image frame */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25 pointer-events-none z-10" />

                    {/* Concentrated micro-particles that get sharper and bigger ONLY near the bottle centered in the photograph */}
                    <LocalizedAtmosphereParticles color={campaign.particleColor} isSelected={isSelected} />

                    {/* Floating precision label inside photograph frame */}
                    <div className="absolute top-5 right-5 z-20 flex flex-col items-end gap-0.5 pointer-events-none font-mono text-[7px] tracking-widest text-gray-400 select-none">
                      <span>FORMULATION SENSOR // FS-94</span>
                      <span className="text-[#D4AF37]">98.2% ORIGINE CERTIFIED</span>
                    </div>

                    {/* Interactive label overlay bottom left */}
                    <div className="absolute bottom-5 left-5 z-20 flex flex-col gap-0.5 pointer-events-none font-mono text-[8px] tracking-[0.25em] text-[#E5E3DB] select-none">
                      <span className="text-[#D4AF37] font-semibold">MAISON ORIGINE SENSORY CELL</span>
                      <span className="text-gray-400">SESSION COORDINATES: 0{index + 1} // GRASSE</span>
                    </div>
                  </motion.div>

                </div>
              </div>

            </div>

            {/* Micro subtle footer indicators */}
            <div className="absolute bottom-6 left-6 md:left-24 z-20 pointer-events-none hidden md:flex items-center gap-3 font-mono text-[7.5px] text-gray-600 tracking-widest">
              <span>MAISON ORIGINE SENSORY CELL // GRASSE, FRANCE</span>
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

                  {/* High-Fashion Framed Product Photograph in its Natural Environment */}
                  <div className="w-full h-48 overflow-hidden rounded-xl border border-white/[0.06] relative bg-[#131314] my-4 shadow-inner">
                    <img
                      src={perfume.imageUrl}
                      alt={`${perfume.name} Luxury Perfume Bottle`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[0.16, 1, 0.3, 1] group-hover:scale-106"
                    />
                    {/* Dark gradient shadow overlay inside the photo frame */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
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
