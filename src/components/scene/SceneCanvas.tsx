/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useStore } from '../../stores/useStore';
import { motion, AnimatePresence } from 'motion/react';

// Secure relative image imports for bundler resolution
import aurelisBottleImg from '../../assets/images/aurelis_ocean_storm_1780227730581.webp';
import nocterraBottleImg from '../../assets/images/nocterra_glowing_forest_1780228327135.webp';
import solaireBottleImg from '../../assets/images/solaire_noir_ultra_luxury_1780226364281.webp';

interface SceneCanvasProps {
  id?: string;          // Optional forced bottle showing (e.g. for Product Screen)
  interactive?: boolean; // Kept for interface compatibility
}

// 1. High-Precision Luxury Portal Context Configurations
const ACTIVE_PALETTE = {
  aurelis: {
    id: 'aurelis',
    name: 'AURELIS',
    image: aurelisBottleImg,
    bgGlow: 'radial-gradient(circle, rgba(56,189,248,0.22) 0%, rgba(56,189,248,0.01) 60%, rgba(0,0,0,0) 100%)',
    particleColor: 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.45)]',
    tagline: 'LIQUID ATMOSPHERIC SKY & MINERAL SEA',
    indexSuffix: 'I/III'
  },
  nocterra: {
    id: 'nocterra',
    name: 'NOCTERRA',
    image: nocterraBottleImg,
    bgGlow: 'radial-gradient(circle, rgba(16,185,129,0.22) 0%, rgba(16,185,129,0.01) 60%, rgba(0,0,0,0) 100%)',
    particleColor: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.45)]',
    tagline: 'BIOLUMINESCENT WOODS & MOSS STONE',
    indexSuffix: 'II/III'
  },
  'solaire-noir': {
    id: 'solaire-noir',
    name: 'SOLAIRE NOIR',
    image: solaireBottleImg,
    bgGlow: 'radial-gradient(circle, rgba(245,158,11,0.22) 0%, rgba(245,158,11,0.01) 60%, rgba(0,0,0,0) 100%)',
    particleColor: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.45)]',
    tagline: 'WARM ONYX DUNES & GOLD SEED DUST',
    indexSuffix: 'III/III'
  }
};

// Concentrated micro-particles that get sharper and larger ONLY near the bottle centered in the photograph
const SceneAtmosphereParticles: React.FC<{ 
  color: string; 
  count?: number; 
}> = ({ color, count = 30 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const r = Math.random();
      const leftVal = 50 + (r - 0.5) * (r < 0.65 ? 25 : 75); // 65% of particles concentrated within +/- 12.5% of center

      const baseSize = Math.random() * 1.5 + 0.8;
      const duration = Math.random() * 6 + 5;
      
      return {
        id: i,
        left: `${leftVal}%`,
        startY: Math.random() * 100,
        baseSize,
        duration,
        delay: Math.random() * -12,
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
            scale: [0.6, 1.25, 2.8, 1.25, 0.4],
            opacity: [0, 0.4, 0.95, 0.4, 0],
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

export const SceneCanvas: React.FC<SceneCanvasProps> = ({ id = '', interactive = true }) => {
  const { activePerfumeIndex } = useStore();

  // 2. Identify active config payload
  const activeScentKey = useMemo<'aurelis' | 'nocterra' | 'solaire-noir'>(() => {
    if (id) {
       const formatted = id.toLowerCase().replace('_', '-');
       if (formatted === 'solairenoir') return 'solaire-noir';
       return formatted as 'aurelis' | 'nocterra' | 'solaire-noir';
    }
    if (activePerfumeIndex === 0) return 'aurelis';
    if (activePerfumeIndex === 1) return 'nocterra';
    return 'solaire-noir';
  }, [id, activePerfumeIndex]);

  const activeConfig = ACTIVE_PALETTE[activeScentKey];

  return (
    <div 
      id="scene-canvas-container"
      className="w-full h-full relative aspect-[3/4] md:aspect-auto flex items-center justify-center select-none overflow-hidden z-10 p-2 md:p-4"
    >
      {/* Immersive backdrop atmosphere */}
      <div 
        className="absolute inset-[15%] rounded-full blur-[80px] opacity-30 transition-all duration-[1.5s] pointer-events-none"
        style={{ backgroundImage: activeConfig.bgGlow }}
      />

      {/* Pristine Editorial Framing Canvas */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeConfig.id}
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            scale: 1,
          }}
          exit={{ opacity: 0, y: -15, scale: 0.98 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative w-full h-full bg-[#0A0A0B] border border-white/[0.06] rounded-2xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.85)] flex items-center justify-center pointer-events-auto"
        >
          {/* High-fashion product campaign photograph */}
          <motion.img
            src={activeConfig.image}
            alt={`Maison Aurelis High-Fashion Flacon: ${activeConfig.name}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover select-none pointer-events-none"
            animate={{
              scale: 1.025,
            }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Luxury vignette shadow layer inside image frame */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none z-10" />

          {/* Atmospheric micro particles focused dynamically onto the central flacon region */}
          <SceneAtmosphereParticles color={activeConfig.particleColor} />

          {/* Technical Sensory Data Plate Overlay */}
          <div className="absolute bottom-5 left-5 z-20 flex flex-col gap-0.5 pointer-events-none font-mono text-[8px] tracking-[0.25em] text-[#E5E3DB] select-none">
            <span className="text-[#D4AF37] font-semibold">MAISON ORIGINE SENSORY PORTRAIT</span>
            <span className="text-gray-400">INDEXED MODEL N° {activeConfig.indexSuffix}</span>
          </div>

          <div className="absolute top-5 right-5 z-20 flex flex-col items-end gap-0.5 pointer-events-none font-mono text-[7px] tracking-widest text-gray-400 select-none">
            <span>STATION // GRASSE</span>
            <span className="text-[#D4AF37]">ORIGINE REGISTERED</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
