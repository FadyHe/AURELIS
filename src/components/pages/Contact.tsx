/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useStore } from '../../stores/useStore';
import { Mail, Calendar, Sparkles, MapPin, Award, Check } from 'lucide-react';
import { motion } from 'motion/react';

export const Contact: React.FC = () => {
  const { showToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState('mineral');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !date) {
      showToast('Please specify your name, contact email, and desired slot.', 'info');
      return;
    }
    
    setIsBooked(true);
    showToast('A private sensory slot reservation has been recorded. Our Parisian concierge will email you in 2 hours.', 'success');
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setProfile('mineral');
    setDate('');
    setNotes('');
    setIsBooked(false);
  };

  return (
    <div className="min-h-screen bg-[#080809] text-white pt-32 pb-24 px-6 md:px-12 lg:px-24 font-sans relative">
      
      {/* Background radial lights */}
      <div className="absolute top-1/4 right-[15%] w-80 h-80 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[10%] w-[400px] h-[400px] rounded-full bg-[#10b981]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Column 1: Editorial concierge information */}
        <div className="lg:col-span-5 space-y-6">
          <span className="font-mono text-[9px] tracking-[0.3em] text-[#D4AF37] uppercase flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#D4AF37]" /> CONCIERGE DESK
          </span>
          <h2 className="font-display font-medium text-4xl uppercase tracking-wider text-[#E5E3DB] leading-tight">
            PRIVATE SCENT <br />
            <span className="text-[#D4AF37]">CONSULTATION</span>
          </h2>
          <p className="text-gray-400 text-xs md:text-sm leading-relaxed text-justify">
            Securing is just the introductory trace. To unlock the full chemistry of raw botanical extracts, Maison Aurelis offers complimentary digital or sensory salon consultations with our fragrance specialists in Grasse or Paris.
          </p>

          <div className="space-y-4 pt-4 border-t border-white/5">
            <div className="flex gap-3 items-start text-xs font-mono">
              <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white uppercase">Maison Paris Salon</p>
                <p className="text-gray-500 mt-0.5">Place Vendôme, Paris VIII, France</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-start text-xs font-mono">
              <Calendar className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white uppercase">Operating Availability</p>
                <p className="text-gray-500 mt-0.5">Monday – Friday: 09:00 - 18:00 CET</p>
              </div>
            </div>

            <div className="flex gap-3 items-start text-xs font-mono">
              <Award className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white uppercase">Secure Digital Channel</p>
                <p className="text-gray-500 mt-0.5">Encrypted high-end video consultations globally</p>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Booking Form Sheet */}
        <div className="lg:col-span-7">
          <div className="p-6 md:p-8 bg-black/40 border border-white/5 rounded-3xl backdrop-blur-md relative overflow-hidden">
            
            {!isBooked ? (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono" id="consultation-form">
                <span className="font-display font-semibold text-[11px] tracking-widest text-[#D4AF37] uppercase block border-b border-white/5 pb-2">
                  SECURE SENSORY PORTAL SLOT
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-500 block mb-1">RECIPIENT FULL NAME</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Johnathan Doe"
                      className="w-full bg-[#151517] border border-white/5 focus:border-[#D4AF37] text-white p-3 rounded-lg focus:outline-none focus:ring-0 text-xs font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-gray-500 block mb-1">CONTACT CONCIERGE EMAIL</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@aurelis.com"
                      className="w-full bg-[#151517] border border-white/5 focus:border-[#D4AF37] text-white p-3 rounded-lg focus:outline-none focus:ring-0 text-xs font-mono"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-500 block mb-1">PREFERRED SCENT COMPLEX</label>
                    <select
                      value={profile}
                      onChange={(e) => setProfile(e.target.value)}
                      className="w-full bg-[#151517] border border-white/5 focus:border-[#D4AF37] text-white p-3 rounded-lg focus:outline-none focus:ring-0 text-xs font-mono cursor-pointer"
                    >
                      <option value="mineral">Ozone & Minerals (Aurelis)</option>
                      <option value="boreal">Moss & Bioluminescence (Nocterra)</option>
                      <option value="obsidian">Spicy Saffron Suede (Solaire Noir)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-500 block mb-1">CONSULTATION SLOT DATE</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#151517] border border-white/5 focus:border-[#D4AF37] text-white p-3 rounded-lg focus:outline-none focus:ring-0 text-xs font-mono cursor-pointer"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-500 block mb-1">PRIVATE SKIN CHEMISTRY NOTES (OPTIONAL)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Describe any fragrances you currently wear or notable herbal triggers..."
                    className="w-full bg-[#151517] border border-white/5 focus:border-[#D4AF37] text-white p-3 rounded-lg focus:outline-none focus:ring-0 text-xs font-mono resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#D4AF37] hover:bg-white text-black font-semibold text-[10px] tracking-widest uppercase rounded-lg transition duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                    id="btn-calendar-submit"
                  >
                    <Calendar className="w-3.5 h-3.5" /> SECURE CONCIERGE SLOT
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-12 flex flex-col justify-center items-center text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500 rounded-full flex items-center justify-center text-emerald-400">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-white">RESERVATION LOG RESERVED</h4>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed max-w-sm font-sans mx-auto">
                    Your appointment request for <strong>{date}</strong> focusing on <strong>{profile.toUpperCase()}</strong> has been committed to our logs. A Parisian concierge is preparing your calendar invite.
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="px-6 py-2 border border-white/10 hover:border-[#D4AF37] text-gray-400 hover:text-white rounded-lg text-[9px] font-mono tracking-widest uppercase transition-all cursor-pointer"
                >
                  SCHEDULE ANOTHER SLOT
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
