/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useStore } from '../../stores/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { Wind, Shield, Layers3, Sparkles } from 'lucide-react';

interface SceneCanvasProps {
  id?: string;          // Optional forced bottle showing (e.g. for Product Screen)
  interactive?: boolean; // Kept for interface compatibility
}

// 1. High-Precision Luxury Portal Context Configurations
const ACTIVE_PALETTE = {
  aurelis: {
    id: 'aurelis',
    name: 'AURELIS',
    image: '/src/assets/images/aurelis_smooth_bottle_1780223760436.png',
    bgGlow: 'radial-gradient(circle, rgba(34,211,238,0.18) 0%, rgba(56,189,248,0.04) 50%, rgba(0,0,0,0) 100%)',
    portalOutline: 'border-cyan-500/15',
    sparkleColor: '#22d3ee',
    particleClass: 'shadow-[0_0_12px_rgba(34,211,238,0.6)] bg-cyan-400',
    tagline: 'LIQUID ATMOSPHERIC SKY & MINERAL SEA',
    indexSuffix: 'I/III',
    plinthLine: 'rgba(34,211,238,0.2)'
  },
  nocterra: {
    id: 'nocterra',
    name: 'NOCTERRA',
    image: '/src/assets/images/nocterra_smooth_bottle_1780223465270.png',
    bgGlow: 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, rgba(52,211,153,0.04) 50%, rgba(0,0,0,0) 100%)',
    portalOutline: 'border-emerald-500/15',
    sparkleColor: '#10b981',
    particleClass: 'shadow-[0_0_12px_rgba(16,185,129,0.6)] bg-emerald-400',
    tagline: 'BIOLUMINESCENT WOODS & MOSS STONE',
    indexSuffix: 'II/III',
    plinthLine: 'rgba(16,185,129,0.2)'
  },
  'solaire-noir': {
    id: 'solaire-noir',
    name: 'SOLAIRE NOIR',
    image: '/src/assets/images/solaire_smooth_bottle_1780223485925.png',
    bgGlow: 'radial-gradient(circle, rgba(249,115,22,0.18) 0%, rgba(217,119,6,0.04) 50%, rgba(0,0,0,0) 100%)',
    portalOutline: 'border-amber-500/15',
    sparkleColor: '#f97316',
    particleClass: 'shadow-[0_0_12px_rgba(249,115,22,0.6)] bg-amber-500',
    tagline: 'WARM ONYX DUNES & GOLD SEED DUST',
    indexSuffix: 'III/III',
    plinthLine: 'rgba(249,115,22,0.2)'
  }
};

// Static pre-computed particle specs to avoid re-render performance costs
const AMBIENT_PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 80 + 10,  // Restrict to center viewport frame (10% to 90%)
  y: Math.random() * 70 + 15,  // Avoid top header bleed
  size: Math.random() * 3 + 1.2,
  duration: Math.random() * 10 + 6,
  delay: Math.random() * 4,
  driftX: Math.random() * 40 - 20,
  opacity: Math.random() * 0.45 + 0.15
}));

export const SceneCanvas: React.FC<SceneCanvasProps> = ({ id = '', interactive = false }) => {
  const { activePerfumeIndex, scrollProgress } = useStore();

  // 2. Identify active config payload
  const activeScentKey = useMemo<'aurelis' | 'nocterra' | 'solaire-noir'>(() => {
    if (id) {
       // Support normal format & alternate hyphen styles
       const formatted = id.toLowerCase().replace('_', '-');
       if (formatted === 'solairenoir') return 'solaire-noir';
       return formatted as 'aurelis' | 'nocterra' | 'solaire-noir';
    }
    if (activePerfumeIndex === 0) return 'aurelis';
    if (activePerfumeIndex === 1) return 'nocterra';
    return 'solaire-noir';
  }, [id, activePerfumeIndex]);

  const activeConfig = ACTIVE_PALETTE[activeScentKey];

  // 3. Normalized real-time mouse coordinate tracking (Spring Inertia Simulation)
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Scale coordinates from -1 to 1 representing relative offset
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 4. Parallax Scroll Choreography Translation Coordinates
  // Slides the bottle panel elegantly to accommodate editorial prose panels on scroll
  const scrollOffsetX = useMemo(() => {
    if (id) return 0; // Completely centered for Product page specs block

    if (scrollProgress < 0.35) {
      const t = scrollProgress / 0.35;
      // Aurelis: transitions from center to left offset matching prose column width
      return 0 * (1 - t) + (-14) * t; 
    } else if (scrollProgress < 0.70) {
      const t = (scrollProgress - 0.35) / 0.35;
      // Nocterra: slides across viewport to right offset column
      return -14 * (1 - t) + 14 * t;
    } else {
      const t = (scrollProgress - 0.70) / 0.30;
      // Solaire Noir: centers beautifully for the final convergence showcase
      return 14 * (1 - t) + 0 * t;
    }
  }, [id, scrollProgress]);

  // Compute scale and subtle rotation shift during scrolling
  const scrollDynamics = useMemo(() => {
    if (id) return { scale: 1.05, rotation: 0 };
    // Elegant slight scale pinch on active scroll regions
    const scaleBase = 0.96;
    const compression = Math.sin(scrollProgress * Math.PI) * 0.04;
    return {
      scale: scaleBase - compression,
      rotation: Math.sin(scrollProgress * Math.PI * 2) * 5 // Subtle elegant lean
    };
  }, [id, scrollProgress]);

  return (
    <div className="w-full h-full relative flex items-center justify-center select-none pointer-events-none overflow-hidden z-10">
      
      {/* FEATURE 1 — DYNAMIC BACKLIGHT GRADIENT PORTAL */}
      <div 
        className="absolute inset-0 w-full h-full ease-out duration-1000 transition-all opacity-90 z-0"
        style={{ backgroundImage: activeConfig.bgGlow }}
      />

      {/* Rotating fine vector atmospheric ring mimicking luxury radar dials */}
      <div className="absolute w-[28vw] h-[28vw] max-w-[420px] rounded-full border border-white/[0.03] animate-[spin_60s_linear_infinite] z-0 opacity-60 flex items-center justify-center">
        <div className={`w-[98%] h-[98%] rounded-full border ${activeConfig.portalOutline} border-dashed opacity-40`} />
      </div>

      {/* FEATURE 2 — ACTIVE CLUSTER EMBERS (2.5D Atmospheric Particle Drift) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {AMBIENT_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            initial={{ 
              x: `${p.x}vw`, 
              y: `${p.y}vh`, 
              scale: p.size / 3, 
              opacity: 0 
            }}
            animate={{ 
              y: [`${p.y}vh`, `${p.y - 18}vh`], 
              x: [`${p.x}vw`, `${p.x + (p.driftX / 6)}vw`],
              opacity: [0, p.opacity, p.opacity * 0.5, 0] 
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut"
            }}
            className={`absolute rounded-full pointer-events-none ${activeConfig.particleClass}`}
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              filter: 'blur(0.5px)'
            }}
          />
        ))}
      </div>

      {/* FEATURE 3 — CORE EDITORIAL STAGE (Houses Bottles & Mirror Reflections) */}
      <motion.div
        animate={{ 
          x: `${scrollOffsetX}vw`,
          y: mouse.y * -14 // Subtle micro parallax depth reaction
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 18 }}
        className="relative w-full h-full max-w-4xl flex flex-col justify-center items-center z-10 pointer-events-none"
      >
        
        {/* Luxury subtle fine-grid coordinates plinth */}
        <div 
          className="absolute bottom-[28%] left-1/2 -translate-x-1/2 w-80 h-0.5 z-0 transition-colors duration-1000"
          style={{ 
            background: `linear-gradient(90deg, transparent 0%, ${activeConfig.plinthLine} 50%, transparent 100%)` 
          }}
        >
          {/* Subtle tick marks mimicking precision coordinate dials */}
          <div className="absolute left-[15%] w-1.5 h-1 bg-white/20 -top-0.5" />
          <div className="absolute right-[15%] w-1.5 h-1 bg-white/20 -top-0.5" />
          <div className="absolute left-1/2 -translate-x-1/2 w-4 h-[1px] bg-white/40 -top-[1px]" />
        </div>

        {/* Dynamic Transition Wrapper for FLACON ART */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeConfig.id}
            initial={{ opacity: 0, scale: 0.90, y: 30, rotateY: 25 }}
            animate={{ 
              opacity: 1, 
              scale: scrollDynamics.scale, 
              y: mouse.y * -8, // Dynamic mouse tracking vertical float
              x: mouse.x * 12,  // Dynamic mouse tracking horizontal push
              rotateY: mouse.x * 15, // Real-time simulated 3D Yaw Rotation
              rotateZ: scrollDynamics.rotation + (mouse.x * -1.5) // Sleek perspective tilt
            }}
            exit={{ opacity: 0, scale: 0.90, y: -30, rotateY: -25 }}
            transition={{ 
              duration: 0.85, 
              ease: [0.16, 1, 0.3, 1],
              rotateY: { type: 'spring', stiffness: 45, damping: 15 },
              scale: { duration: 0.6 }
            }}
            className="relative flex flex-col items-center select-none pointer-events-none w-72 md:w-85 lg:w-96 aspect-[3/4]"
          >
            {/* 1. PHOTOREALISTIC REFLEXIVE BOTTLE GLASS SHADE (Flipped & blurred under bottom mirror) */}
            <div 
              className="absolute top-[48%] left-1/2 -translate-x-1/2 w-[70%] h-[70%] z-0 origin-bottom select-none pointer-events-none hidden md:block"
              style={{ transform: 'scaleY(-0.75) translateY(0%)' }}
            >
              <img 
                src={activeConfig.image} 
                alt={`${activeConfig.name} reflection shadow`}
                className="w-full h-full object-contain filter blur-[4.5px] opacity-[0.25]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-transparent h-full w-full" />
            </div>

            {/* 2. SPECULAR SHADOW GROUND WASH */}
            <div 
              className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-[76%] h-[8%] rounded-full filter blur-[20px] opacity-75 z-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse, ${activeConfig.sparkleColor}22 0%, #0000 70%)`
              }}
            />

            {/* 3. HERO GLASS MULTI-LAYERED PICTURE BODY */}
            <div className="w-full h-full relative z-10 flex items-center justify-center filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)]">
              
              {/* Main Luxury PNG Layer */}
              <img
                src={activeConfig.image}
                alt={`Maison Aurelis Flacon: ${activeConfig.name}`}
                referrerPolicy="no-referrer"
                className="w-full h-[85%] object-contain select-none pointer-events-none transition-transform duration-[1200ms] hover:scale-102"
              />

              {/* Dynamic light refraction layer gliding across glass */}
              <motion.div 
                animate={{
                  backgroundPosition: [`${mouse.x * -80}px 0px`, `${mouse.x * 80}px 0px`]
                }}
                className="absolute inset-x-10 top-18 bottom-18 rounded-3xl mix-blend-color-dodge opacity-25 pointer-events-none z-20 transition-all duration-300"
                style={{
                  background: 'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.45) 50%, transparent 65%)',
                  backgroundSize: '300% 100%'
                }}
              />
            </div>

            {/* 4. PREMIUM FLOATING OVERLAYS (Integrated Editorial Info Label Plate) */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-2.5 px-6 font-mono tracking-widest text-[8.5px] text-[#E5E3DB] shadow-2xl space-y-0.5 min-w-[210px] text-center">
              <span className="text-[#D4AF37] text-[7.5px] uppercase tracking-[0.3em] font-semibold">
                {activeConfig.tagline}
              </span>
              <div className="flex items-center gap-1.5 text-gray-400 text-[8px] justify-center">
                <span>INDEXED MODEL N° {activeConfig.indexSuffix}</span>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </motion.div>

    </div>
  );
};
