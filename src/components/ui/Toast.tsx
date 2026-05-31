/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useStore } from '../../stores/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const toast = useStore((state) => state.toast);
  const hideToast = useStore((state) => state.hideToast);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-[#0F0F10]/95 border border-white/10 shadow-3xl text-[#E6E4DD] flex items-center gap-3.5 max-w-sm backdrop-blur-md font-sans pointer-events-auto"
        >
          <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0 text-[#D4AF37]">
            {toast.type === 'success' ? (
              <Sparkles className="w-4 h-4" />
            ) : (
              <Info className="w-4 h-4" />
            )}
          </div>
          <div className="flex-grow">
            <span className="font-mono text-[9px] tracking-widest text-[#D4AF37] block uppercase font-bold">
              {toast.type === 'success' ? 'MAISON RECORDED' : 'SYSTEM UPDATE'}
            </span>
            <p className="text-[11px] leading-snug text-gray-300 mt-0.5">{toast.message}</p>
          </div>
          <button
            onClick={hideToast}
            className="text-gray-500 hover:text-white transition-colors text-xs font-mono pl-2 border-l border-white/5 cursor-pointer"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
