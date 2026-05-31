/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HelpCircle, Clock, ShieldAlert, Award, Feather, Compass, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export const About: React.FC = () => {
  const steps = [
    {
      time: '05:30 AM',
      title: 'Alpine Sea-Mist Condensation',
      subtitle: 'Summit Harvesting at Grasse Cliffs',
      desc: 'Our harvesters construct micro-condensation grids along alpine cliffs to trap dew as seawater vapor ascends. The trapped water absorbs natural mineral compounds and silts, resulting in the crystalline ozone base that defines Aurelis.',
      icon: Clock
    },
    {
      time: 'SPRING FULL MOON',
      title: 'Bioluminescent Lichen CO2 Foraging',
      subtitle: 'Ancient Boreal Canopy',
      desc: 'We sustainably harvest Bryophyta organisms at midnight underneath pine roots in Lappish valleys. Using temperatures below 31°C, high-pressure carbon dioxide extracts their scent without thermal damage, preserving mossy forest electrical notes.',
      icon: Compass
    },
    {
      time: 'TWILIGHT HOUR',
      title: 'Obsidian Vacuum Toasting',
      subtitle: 'Saffron Molecular Fusion',
      desc: 'Raw saffron cropped under fair-trade conditions is toasted inside vacuum ovens over heated obsidian granite fragments. Exposure to the cooling volcanic stone lends Solaire Noir its hallmark smoky saffron, suede, and basalt contrast.',
      icon: MapPin
    },
    {
      time: 'DELIVERY DISPATCH',
      title: 'The Double-Replanting Covenant',
      subtitle: 'Ecological Reforestation Commitment',
      desc: 'For every cedarwood packaging chamber decanted, Maison Aurelis finances the planting of two juvenile evergreen samplings in collaboration with French forest registries, offsetting three times our atmospheric freight consumption.',
      icon: Feather
    }
  ];

  return (
    <div className="min-h-screen bg-[#080809] text-white pt-32 pb-24 px-6 md:px-12 lg:px-24 font-sans relative">
      
      {/* Decorative environment background light */}
      <div className="absolute top-1/4 left-[15%] w-80 h-80 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[10%] w-96 h-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Editorial Heading */}
        <div className="space-y-4 max-w-2xl text-center mx-auto">
          <span className="font-mono text-[9px] tracking-[0.3em] text-[#D4AF37] uppercase flex items-center justify-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" /> PHILOSOPHY ARCHIVE
          </span>
          <h1 className="font-display font-medium text-4xl md:text-5xl uppercase tracking-wider text-[#E5E3DB]">
            THE ART OF SLOW PERFUMERY
          </h1>
          <p className="text-gray-500 text-xs md:text-sm leading-relaxed mx-auto">
            Maison Aurelis was born of a simple friction: the speed of modern digital commerce matched against the geometric patience of organic botany. We do not manufacture; we distill epochs.
          </p>
        </div>

        {/* Editorial Banner block */}
        <div className="p-8 bg-black/40 border border-white/5 rounded-3xl backdrop-blur-md space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D4AF37]/5 to-transparent rounded-bl-full" />
          <p className="font-display font-medium text-[#E5E3DB] text-lg md:text-xl leading-relaxed italic max-w-2xl">
            “To bottle a fragrance is to capture an atmospheric snapshot of a single geocoordinate at a single minute of the year. When you wear our extracts, you wear time itself.”
          </p>
          <div className="flex gap-4 items-center">
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#D4AF37] font-mono text-[10px] font-bold">
              AR
            </div>
            <div>
              <p className="font-sans text-[11px] font-bold text-white uppercase">DR. JACQUES DE LA ROCHE</p>
              <p className="font-mono text-[9px] text-gray-500 uppercase">Master Perfume Chemist, Paris VIII</p>
            </div>
          </div>
        </div>

        {/* Vertical Timeline Process Steps */}
        <div className="space-y-10 relative">
          {/* Vertical axis line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[1px] bg-white/5 -translate-x-1/2 hidden md:block" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`flex flex-col md:flex-row gap-6 md:gap-12 relative items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline content bubble */}
                <div className="w-full md:w-1/2 space-y-3 p-6 bg-white/[0.01] border border-white/5 hover:border-[#D4AF37]/20 rounded-2xl transition duration-300 backdrop-blur-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] tracking-widest text-[#D4AF37] uppercase">{step.time}</span>
                    <Icon className="w-4 h-4 text-gray-600" />
                  </div>
                  
                  <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-white">
                    {step.title}
                  </h3>
                  <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">{step.subtitle}</p>
                  
                  <p className="font-sans text-xs text-gray-400 leading-relaxed text-justify">
                    {step.desc}
                  </p>
                </div>

                {/* Center node indicator */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0D0D0E] border border-white/10 flex items-center justify-center text-[#D4AF37] shadow-xl z-10 hidden md:flex">
                  <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                </div>

                {/* Empty block on other side to balance grid */}
                <div className="w-full md:w-1/2 hidden md:block" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
