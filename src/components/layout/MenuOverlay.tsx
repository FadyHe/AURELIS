/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useStore } from '../../stores/useStore';
import { PERFUMES } from '../../data/perfumes';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, MapPin, Globe, Award, Instagram, Mail } from 'lucide-react';

export const MenuOverlay: React.FC = () => {
  const { isMenuOpen, setMenuOpen, activeRoute, setActiveRoute } = useStore();

  const handleNavigate = (route: string) => {
    setActiveRoute(route);
    setMenuOpen(false);
  };

  const menuItems = [
    { title: 'The Cinematic Journey', subtitle: 'Experience Scent In 3D', route: 'home' },
    { title: 'The Portfolio Collection', subtitle: 'Browse All Fragrances', route: 'collection' },
    { title: 'Maison Philosophy', subtitle: 'The Slow distillation Craft', route: 'about' },
    { title: 'The Journal', subtitle: 'Botanical Explorations', route: 'journal' },
    { title: 'Private Consultation', subtitle: 'Luxury Concierge Service', route: 'contact' },
  ];

  const brandPillars = [
    { label: 'Grasse Laboratories', value: '100% Raw botanical base extracts', icon: MapPin },
    { label: 'Carbon Offset Yield', value: 'Double Tree Replanting Scheme', icon: Globe },
    { label: 'Artisanal Batch Number', value: 'Exclusive low-yield decants', icon: Award },
  ];

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 bg-[#0A0A0B]/98 text-white min-h-screen overflow-y-auto flex flex-col justify-between pt-24 pb-8 px-6 md:px-12 lg:px-24 font-sans"
        >
          {/* Ambient lighting backdrop */}
          <div className="absolute top-1/4 right-1/4 w-[35vw] h-[35vw] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-[25vw] h-[25vw] rounded-full bg-[#3b82f6]/5 blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 mt-4 lg:mt-8 flex-grow">
            {/* Left Section: Branding and Scent Portals */}
            <div className="lg:col-span-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5 pb-8 lg:pb-0 lg:pr-12">
              <div>
                <span className="font-mono text-[9px] tracking-[0.4em] text-[#D4AF37] uppercase flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" /> OUR CREATIVE ETHOS
                </span>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-sans max-w-sm mt-3">
                  We believe fragrance is dynamic fluid architecture. It should not sit flat on your vanity, but transform the space around you. Walk through our virtual scent realms.
                </p>
              </div>

              {/* Quick Jump Portals */}
              <div className="mt-8">
                <span className="font-mono text-[10px] tracking-[0.25em] text-gray-500 block mb-3">SCENT PORTALS</span>
                <div className="space-y-3">
                  {PERFUMES.map((perfume) => (
                    <button
                      key={perfume.id}
                      onClick={() => handleNavigate(`product-${perfume.id}`)}
                      className="group w-full flex items-center justify-between p-3.5 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 rounded-xl text-left transition-all cursor-pointer"
                      id={`menu-portal-${perfume.id}`}
                    >
                      <div>
                        <p className="font-display font-medium text-xs tracking-wider text-white group-hover:text-[#D4AF37] transition-colors">{perfume.name}</p>
                        <p className="font-mono text-[9px] text-gray-500 mt-0.5">{perfume.scentProfile}</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-white transition-all transform group-hover:translate-x-1.5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Section: Core Nav Links */}
            <div className="lg:col-span-8 flex flex-col justify-center pl-0 lg:pl-12">
              <span className="font-mono text-[10px] tracking-[0.25em] text-gray-500 block mb-4">NAVIGATION DIRECTORY</span>
              <div className="space-y-4 md:space-y-6">
                {menuItems.map((item, index) => {
                  const isCurrent = activeRoute === item.route;
                  return (
                    <motion.div
                      key={item.route}
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                    >
                      <button
                        onClick={() => handleNavigate(item.route)}
                        className="group flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 text-left cursor-pointer"
                        id={`menu-link-${item.route}`}
                      >
                        <span className="font-mono text-[10px] md:text-sm text-gray-600 group-hover:text-[#D4AF37] transition-colors">
                          0{index + 1}.
                        </span>
                        <div>
                          <span className={`font-display font-semibold text-2xl md:text-4xl tracking-wide uppercase transition-all duration-300 ${isCurrent ? 'text-[#D4AF37]' : 'text-gray-300 group-hover:text-white group-hover:pl-2'}`}>
                            {item.title}
                          </span>
                          <span className="block font-mono text-[10px] tracking-widest text-gray-500 uppercase mt-1 group-hover:text-gray-300 transition-colors">
                            {item.subtitle}
                          </span>
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Footer block inside Menu */}
          <div className="max-w-7xl mx-auto w-full border-t border-white/5 pt-6 mt-12 grid grid-cols-1 md:grid-cols-12 gap-6 text-xs text-gray-500 items-center">
            {/* Brand pillars */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {brandPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.label} className="flex gap-2.5 items-start">
                    <Icon className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-sans text-[10px] font-semibold text-gray-300 uppercase tracking-wider">{pillar.label}</p>
                      <p className="font-mono text-[9px] text-gray-500 mt-0.5">{pillar.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social handles */}
            <div className="md:col-span-4 flex justify-end gap-5">
              <a href="#instagram" className="hover:text-white transition-colors flex items-center gap-1.5">
                <Instagram className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="font-mono text-[9px] tracking-widest uppercase">@aurelis_scents</span>
              </a>
              <a href="#mail" className="hover:text-white transition-colors flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="font-mono text-[9px] tracking-widest uppercase">concierge@aurelis.com</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
