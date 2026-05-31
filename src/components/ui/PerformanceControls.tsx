import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../../stores/useStore';
import { Cpu, Zap, Sparkles, Sliders } from 'lucide-react';

export const PerformanceControls: React.FC = () => {
  const { performanceTier, setPerformanceTier } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const tiers = [
    {
      id: 'low' as const,
      name: 'LITE ENVIRONMENT',
      icon: Zap,
      desc: 'Mobile & legacy GPUs. Optimized standard glass and 20 particles.',
    },
    {
      id: 'medium' as const,
      name: 'BALANCED SYSTEM',
      icon: Cpu,
      desc: 'Laptops & integrated GPUs. Lite refraction and 55 particles.',
    },
    {
      id: 'high' as const,
      name: 'CINEMATIC RENDER',
      icon: Sparkles,
      desc: 'Desktop & workstations. Anisotropic refraction and 115 particles.',
    },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50 font-mono text-[9px]">
      <div className="relative">
        {/* Expanded panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="absolute bottom-10 left-0 w-64 p-4 rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl text-white shadow-2xl space-y-3"
            >
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="tracking-[0.2em] text-gray-400 font-bold uppercase">RENDER ENGINE</span>
                <span className="text-[7px] text-amber-500 uppercase font-bold select-none">[ ADAPTIVE ]</span>
              </div>

              <div className="space-y-2">
                {tiers.map((t) => {
                  const Icon = t.icon;
                  const isActive = performanceTier === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        setPerformanceTier(t.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-start gap-2.5 p-2 rounded-lg text-left transition-all ${
                        isActive
                          ? 'bg-white/10 border border-white/20 text-[#D4AF37]'
                          : 'bg-transparent border border-transparent text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isActive ? 'text-[#D4AF37]' : 'text-gray-500'}`} />
                      <div className="space-y-0.5">
                        <div className="font-bold tracking-widest leading-none text-[8px] uppercase">{t.name}</div>
                        <div className="font-sans text-[9px] text-gray-500 leading-normal">{t.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="text-[8px] text-gray-500 text-center font-sans">
                AURELIS dynamically matches your device constraints.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating trigger button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-3 py-2 rounded-full border bg-black/80 backdrop-blur-md transition-all cursor-pointer shadow-lg uppercase tracking-[0.25em] font-medium leading-none ${
            isOpen 
              ? 'border-[#D4AF37] text-[#D4AF37]' 
              : 'border-white/10 text-gray-400 hover:text-white hover:border-white/20'
          }`}
          title="Toggle Rendering Pipeline Quality"
        >
          <Sliders className="w-3 h-3" />
          <span>ENGINE: {performanceTier}</span>
        </button>
      </div>
    </div>
  );
};
