/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useStore } from '../../stores/useStore';
import { BLOG_POSTS } from '../../data/perfumes';
import { FileText, ArrowRight, HelpCircle, Calendar, ChevronLeft, ArrowDown, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Journal: React.FC = () => {
  const { activeRoute, setActiveRoute } = useStore();

  // Check if we are viewing a single blog post
  const isPostActive = activeRoute.startsWith('blog-');
  const activeSlug = activeRoute.replace('blog-', '');
  const activePost = BLOG_POSTS.find(p => p.slug === activeSlug);

  return (
    <div className="min-h-screen bg-[#080809] text-white pt-32 pb-24 px-6 md:px-12 lg:px-24 font-sans relative">
      
      {/* Background ambient light */}
      <div className="absolute top-1/4 right-[25%] w-96 h-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-12">
        <AnimatePresence mode="wait">
          
          {/* VIEW SINGLE BLOG ARTICLE */}
          {isPostActive && activePost ? (
            <motion.div
              key={activePost.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
              id="single-blog-view"
            >
              {/* Back button */}
              <button
                onClick={() => setActiveRoute('journal')}
                className="group flex items-center gap-1.5 p-2 bg-white/5 hover:bg-white border border-white/10 text-gray-400 hover:text-black rounded-full text-[10px] tracking-widest font-mono uppercase transition cursor-pointer"
                id="blog-back-btn"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Return to Catalog
              </button>

              {/* Header */}
              <div className="space-y-3.5">
                <div className="flex items-center gap-3 text-xs font-mono text-[#D4AF37]">
                  <span className="p-1 px-2.5 bg-white/5 border border-white/10 rounded-full font-mono text-[8.5px] uppercase">
                    {activePost.category}
                  </span>
                  <span>•</span>
                  <span>{activePost.readTime}</span>
                </div>
                
                <h1 className="font-display font-medium text-3xl md:text-5xl uppercase tracking-wider text-white leading-tight">
                  {activePost.title}
                </h1>

                <div className="flex gap-2 items-center text-[10px] font-mono text-gray-500 pt-2">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  <span>PUBLISHED ON {activePost.date.toUpperCase()}</span>
                </div>
              </div>

              {/* Editorial simulated visual banner */}
              <div className="w-full h-80 bg-black/40 border border-white/5 rounded-3xl relative flex items-center justify-center p-6 overflow-hidden">
                <div className="absolute w-44 h-44 rounded-full bg-[#D4AF37]/5 blur-[60px] animate-pulse" />
                <div className="text-center space-y-1 z-10">
                  <FileText className="w-8 h-8 text-gray-600 mx-auto" />
                  <p className="font-mono text-[9px] text-[#D4AF37] tracking-[0.3em] uppercase">MAISON BOTANICAL PHOTOGRAPHY</p>
                  <p className="font-sans text-[10px] text-gray-500 italic">Plate {activePost.id.substring(0,6).toUpperCase()}</p>
                </div>
              </div>

              {/* Long-form Article Body with Dropcap */}
              <article className="prose prose-invert max-w-none text-gray-300 text-xs md:text-sm leading-relaxed space-y-6 text-justify pt-4">
                <div className="text-justify font-sans">
                  {/* Styled split paragraph to demonstrate luxury drop-cap */}
                  <p className="first-letter:text-5xl first-letter:font-display first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-[#D4AF37] first-letter:leading-none">
                    {activePost.content.split('\n\n')[0]}
                  </p>
                  
                  {activePost.content.split('\n\n').slice(1).map((para, i) => (
                    <p key={i} className="mt-4">
                      {para}
                    </p>
                  ))}
                </div>
              </article>

              {/* Footer credits in dynamic view */}
              <div className="border-t border-white/5 pt-8 mt-12 flex justify-between items-center text-[10px] font-mono text-gray-600">
                <span>COMPILED AT LABS, GRASSE</span>
                <span>MAISON AURELIS ARCHIVE</span>
              </div>
            </motion.div>
          ) : (
            
            /* VIEW ALL JOURNAL ARTICLES LIST */
            <div className="space-y-12">
              {/* Directory headers */}
              <div className="space-y-4 max-w-xl">
                <span className="font-mono text-[9px] tracking-[0.3em] text-[#D4AF37] uppercase flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#D4AF37]" /> JOURNAL LOGS
                </span>
                <h2 className="font-display font-medium text-4xl md:text-5xl uppercase tracking-wider text-[#E5E3DB]">
                  THE BOTANICAL JOURNAL
                </h2>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  Essays from our laboratory distillation books. Discover the meticulous geolocational processes that separate chemical synthesis from geographical storytelling.
                </p>
              </div>

              {/* Articles lists */}
              <div className="space-y-8">
                {BLOG_POSTS.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ease: [0.19, 1, 0.22, 1], duration: 0.8, delay: idx * 0.1 }}
                    className="p-6 md:p-8 bg-[#0F0F11]/50 hover:bg-[#0F0F11]/85 border border-white/5 hover:border-white/10 rounded-3xl backdrop-blur-sm transition-all duration-300 grid grid-cols-1 md:grid-cols-12 gap-6 items-center group cursor-pointer"
                    onClick={() => setActiveRoute(`blog-${post.slug}`)}
                    id={`blog-card-${post.id}`}
                  >
                    {/* Placeholder micro cover */}
                    <div className="md:col-span-3 h-36 bg-black/40 border border-white/5 rounded-2xl flex items-center justify-center p-4 relative overflow-hidden flex-shrink-0 group-hover:border-white/15 transition">
                      <div className="absolute w-16 h-16 bg-[#D4AF37]/5 blur-md" />
                      <FileText className="w-6 h-6 text-gray-700" />
                    </div>

                    {/* Excerpt Details */}
                    <div className="md:col-span-9 space-y-3">
                      <div className="flex gap-3 items-center text-[10px] font-mono text-[#D4AF37]">
                        <span className="p-0.5 px-2 bg-white/5 rounded-md uppercase text-[8px]">{post.category}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="font-display font-semibold text-lg md:text-xl text-[#E5E3DB] uppercase tracking-wider group-hover:text-[#D4AF37] transition duration-300">
                        {post.title}
                      </h3>

                      <p className="font-sans text-xs text-gray-500 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex gap-1 items-center font-mono text-[9px] text-gray-500 group-hover:text-white transition duration-300 pt-1">
                        <span>EXPAND ESSAY</span>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#D4AF37] group-hover:translate-x-1.5 transition" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          )}

        </AnimatePresence>
      </div>

    </div>
  );
};
