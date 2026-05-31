/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useStore } from '../../stores/useStore';
import { motion } from 'motion/react';
import { Compass, HelpCircle, FileText, Send, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  const { setActiveRoute } = useStore();

  return (
    <div className="min-h-screen bg-[#080809] text-white pt-40 pb-24 px-6 md:px-12 lg:px-24 font-sans relative flex flex-col justify-center items-center text-center">
      
      {/* Decorative ambient background flares */}
      <div className="absolute top-[30%] left-[25%] w-72 h-72 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[25%] right-[25%] w-80 h-80 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto space-y-12 relative z-10">
        
        {/* Editorial Heading */}
        <div className="space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-mono text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase font-bold px-3 py-1 bg-white/5 border border-white/10 rounded-full inline-block"
          >
            ERROR CODE 404 : SCENT OVERFLOW
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display font-light text-5xl md:text-7xl uppercase tracking-[0.12em] text-[#E5E3DB] leading-tight"
          >
            LOST IN <br />
            <span className="text-[#D4AF37]">COSMIC VAPOR</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-lg mx-auto"
          >
            The olfactory coordinate you requested was slowly distilled but has vanished from the active catalog. Follow the currents to return to inhabited chambers.
          </motion.p>
        </div>

        {/* Helpful Luxury Redirect Channels */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto pt-4"
        >
          <button
            onClick={() => setActiveRoute('home')}
            className="group flex items-center justify-between p-4 bg-black/40 hover:bg-white/5 border border-white/5 hover:border-white/15 rounded-2xl transition-all duration-300 text-left"
          >
            <div className="space-y-1">
              <p className="font-mono text-[9px] tracking-wider text-[#D4AF37] uppercase">MAISON HOME</p>
              <p className="text-[11px] text-gray-500 group-hover:text-gray-300 transition-colors">Start sensory journey</p>
            </div>
            <ArrowLeft className="w-4 h-4 text-gray-500 group-hover:text-[#D4AF37] transition-all rotate-180" />
          </button>

          <button
            onClick={() => setActiveRoute('collection')}
            className="group flex items-center justify-between p-4 bg-black/40 hover:bg-white/5 border border-white/5 hover:border-white/15 rounded-2xl transition-all duration-300 text-left"
          >
            <div className="space-y-1">
              <p className="font-mono text-[9px] tracking-wider text-[#D4AF37] uppercase">THE DIRECTORY</p>
              <p className="text-[11px] text-gray-500 group-hover:text-gray-300 transition-colors">Browse all perfumes</p>
            </div>
            <Compass className="w-4 h-4 text-gray-500 group-hover:text-[#D4AF37] transition-all" />
          </button>

          <button
            onClick={() => setActiveRoute('journal')}
            className="group flex items-center justify-between p-4 bg-black/40 hover:bg-white/5 border border-white/5 hover:border-white/15 rounded-2xl transition-all duration-300 text-left"
          >
            <div className="space-y-1">
              <p className="font-mono text-[9px] tracking-wider text-[#D4AF37] uppercase">THE JOURNAL</p>
              <p className="text-[11px] text-gray-500 group-hover:text-gray-300 transition-colors">Explore origin articles</p>
            </div>
            <FileText className="w-4 h-4 text-gray-500 group-hover:text-[#D4AF37] transition-all" />
          </button>

          <button
            onClick={() => setActiveRoute('contact')}
            className="group flex items-center justify-between p-4 bg-black/40 hover:bg-white/5 border border-white/5 hover:border-white/15 rounded-2xl transition-all duration-300 text-left"
          >
            <div className="space-y-1">
              <p className="font-mono text-[9px] tracking-wider text-[#D4AF37] uppercase">CONCIERGE</p>
              <p className="text-[11px] text-gray-500 group-hover:text-gray-300 transition-colors">Reserve private salon</p>
            </div>
            <Send className="w-4 h-4 text-gray-500 group-hover:text-[#D4AF37] transition-all" />
          </button>
        </motion.div>

        {/* Minimal return text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-[10px] font-mono text-gray-500 hover:text-[#D4AF37] transition-colors cursor-pointer"
          onClick={() => setActiveRoute('home')}
        >
          ← ESCAPE AND RESTORE HARMONY
        </motion.div>

      </div>
    </div>
  );
};
