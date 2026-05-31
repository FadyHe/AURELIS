/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useStore } from '../../stores/useStore';
import { PERFUMES } from '../../data/perfumes';
import { Mail, ArrowRight, ShieldCheck, Map, Share2, Award } from 'lucide-react';
import { motion } from 'motion/react';

export const Footer: React.FC = () => {
  const { setActiveRoute, showToast } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please specify a valid email address.', 'info');
      return;
    }
    showToast('Welcome to the Maison. You are registered for exclusive batches.', 'success');
    setEmail('');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0A0A0B] text-gray-400 font-sans border-t border-white/5 pt-16 pb-8 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Upper Column Block: Newsletter & Brand Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          {/* Column 1: Brand statement */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-display font-semibold text-white text-[18px] tracking-[0.25em] uppercase">
              MAISON AURELIS
            </h3>
            <p className="font-sans text-xs md:text-sm leading-relaxed max-w-sm text-gray-500">
              Pioneers of botanical patience and slow double-distillation. We formulate, harvest, and craft individual fluid atmospheric sculptures that respond live to your surrounding environment.
            </p>
            <div className="flex gap-4 pt-2">
              <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider uppercase text-gray-600">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> Organic Ecocertified
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider uppercase text-gray-600">
                <Award className="w-3.5 h-3.5 text-[#D4AF37]" /> Grasse Distilled
              </span>
            </div>
          </div>

          {/* Column 2: Newsletter capture */}
          <div className="lg:col-span-7 space-y-4">
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase block">
              THE MAISON PRIVATE REGISTER
            </span>
            <p className="font-sans text-xs text-gray-500 max-w-md">
              Receive notifications for seasonal micro-yield batch extractions, private collection access, and botanical explorations compiled by our laboratory botanists. No spam.
            </p>

            <form onSubmit={handleSubscribe} className="relative mt-4 max-w-md" id="newsletter-form">
              <div className="flex items-center border-b border-white/15 focus-within:border-[#D4AF37] transition-all py-1.5">
                <Mail className="w-4 h-4 text-gray-600 mr-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your concierge email"
                  className="bg-transparent border-0 text-white placeholder-gray-600 focus:outline-none focus:ring-0 text-xs md:text-sm w-full font-mono"
                  required
                />
                <button
                  type="submit"
                  className="p-1 px-3 bg-white/5 hover:bg-[#D4AF37] text-white hover:text-black rounded-md transition-all text-[10px] tracking-widest font-mono flex items-center gap-1 cursor-pointer"
                  aria-label="Subscribe to Private Register"
                >
                  JOIN <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Middle Column Block: Link Map and Directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 py-16 text-xs border-b border-white/5">
          {/* Directory Column 1: Scent lines */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-mono text-[10px] tracking-[0.2em] text-white uppercase block">
              THE PORTFOLIO
            </span>
            <ul className="space-y-2 font-sans text-gray-500 text-[11px]">
              {PERFUMES.map((perfume) => (
                <li key={perfume.id}>
                  <button
                    onClick={() => setActiveRoute(`product-${perfume.id}`)}
                    className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left uppercase tracking-wider"
                    id={`ft-fragrance-${perfume.id}`}
                  >
                    {perfume.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Directory Column 2: Navigation map */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-mono text-[10px] tracking-[0.2em] text-white uppercase block">
              EXPLORATION
            </span>
            <ul className="space-y-2 font-sans text-gray-500 text-[11px] uppercase tracking-wider">
              <li>
                <button
                  onClick={() => setActiveRoute('collection')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                  id="ft-link-collection"
                >
                  Fragrance Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveRoute('about')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                  id="ft-link-about"
                >
                  Our Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveRoute('journal')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                  id="ft-link-journal"
                >
                  The Journal
                </button>
              </li>
            </ul>
          </div>

          {/* Directory Column 3: Brand Support */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-mono text-[10px] tracking-[0.2em] text-white uppercase block">
              CONCIERGE DESK
            </span>
            <ul className="space-y-2 font-sans text-gray-500 text-[11px] uppercase tracking-wider">
              <li>
                <button
                  onClick={() => setActiveRoute('contact')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                  id="ft-link-contact"
                >
                  Book Private Scent consultation
                </button>
              </li>
              <li>
                <span className="text-gray-600 block">Sizing & Decanting Guides</span>
              </li>
              <li>
                <span className="text-gray-600 block">Atmospheric display installation</span>
              </li>
            </ul>
          </div>

          {/* Directory Column 4: Location/Origins */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-mono text-[10px] tracking-[0.2em] text-white uppercase block">
              HEADQUARTERS
            </span>
            <div className="space-y-1 font-mono text-[10px] text-gray-500 leading-relaxed">
              <p className="text-gray-400">LABORATOIRE GRASSE</p>
              <p>42 Blvd de la République</p>
              <p>06130 Grasse, France</p>
              <p className="text-gray-600 mt-2">PARIS DESIGN BUREAU</p>
              <p className="text-gray-600">Place Vendôme, Paris VIII</p>
            </div>
          </div>
        </div>

        {/* Lower Column Block: Legal & Design attributes */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-[10px] font-mono text-gray-600 gap-4">
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-center">
            <span>© {currentYear} MAISON AURELIS. ALL RIGHTS RESERVED.</span>
            <span className="hidden md:inline">|</span>
            <span className="hover:text-white transition-colors cursor-pointer">TERMS OF PATIENCE</span>
            <span className="hidden md:inline">|</span>
            <span className="hover:text-white transition-colors cursor-pointer">ECOLOGICAL COVENANT</span>
          </div>
          <div className="text-center md:text-right text-[9px] tracking-wider text-gray-700">
            BOTANICAL FLUID SYSTEM EXCLUSIVELY DESIGNED BY AURELIS CHEMISTS
          </div>
        </div>

      </div>
    </footer>
  );
};
