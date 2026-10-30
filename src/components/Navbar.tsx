/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { STRINGS } from '../strings.ts';

interface NavbarProps {
  activeScreen: 'home' | 'map' | 'school-mode' | 'how-it-works' | 'accuracy' | 'test-view';
  onSelectScreen: (screen: 'home' | 'map' | 'school-mode' | 'how-it-works' | 'accuracy' | 'test-view') => void;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  lastUpdated: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeScreen,
  onSelectScreen,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleNav = (screen: 'home' | 'map' | 'school-mode' | 'how-it-works' | 'accuracy' | 'test-view') => {
    onSelectScreen(screen);
    setMobileMenuOpen(false);
  };

  const navItems: Array<{ id: 'home' | 'map' | 'school-mode' | 'how-it-works' | 'accuracy'; label: string }> = [
    { id: 'home', label: STRINGS.nav.home },
    { id: 'map', label: STRINGS.nav.dashboard },
    { id: 'school-mode', label: STRINGS.nav.schoolMode },
    { id: 'how-it-works', label: STRINGS.nav.howItWorks },
    { id: 'accuracy', label: STRINGS.nav.accuracy },
  ];

  return (
    <header className="bg-[#FFFDFB]/95 backdrop-blur-xs border-b border-[#DFCBB3] sticky top-0 z-40 transition-colors">
      {/* UAE Sunset Atmospheric Horizon Line */}
      <div className="h-1 bg-gradient-to-r from-[#E8874A] via-[#D57639] to-[#713F2B]" />
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-8">
        {/* Zone 1: Official DustWatch Logo */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="flex items-center group cursor-pointer focus:outline-none shrink-0 interactive-tap py-0.5"
          aria-label="DustWatch Homepage"
        >
          <img
            src="/assets/dustwatch-logo-transparent.png"
            alt="DustWatch - UAE Dust Risk Outlook"
            className="h-9 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            width={64}
            height={40}
            loading="eager"
            decoding="async"
          />
        </button>

        {/* Zone 2: 4-5 concise single-line nav links with animated warm sand indicator */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-1 overflow-x-auto py-0.5 relative"
        >
          {navItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`relative px-3.5 py-1.5 rounded-md text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer min-h-[40px] z-10 ${
                  isActive
                    ? 'text-[#713F2B]'
                    : 'text-[#5A453A] hover:text-[#713F2B] hover:bg-[#E8D2B4]/30'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="relative z-10">{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId={shouldReduceMotion ? undefined : 'activeNavIndicator'}
                    className="absolute inset-0 bg-[#E8D2B4]/60 border-b-2 border-[#E8874A] rounded-md -z-0"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action in Deep Forest green for strong authoritative contrast */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNav('map')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#244C3B] text-white rounded-lg text-xs font-semibold hover:bg-[#1B3A2D] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] shadow-2xs hover:shadow-xs"
          >
            <span>Explore Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#713F2B] hover:bg-[#E8D2B4]/40 rounded-md min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer interactive-tap"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-[#DFCBB3] bg-[#FFFDFB] overflow-hidden shadow-lg"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                    activeScreen === item.id
                      ? 'bg-[#E8D2B4]/60 text-[#713F2B] border-l-3 border-[#E8874A]'
                      : 'text-[#5A453A] hover:bg-[#E8D2B4]/25 hover:text-[#713F2B]'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-2 border-t border-[#DFCBB3] mt-2">
                <button
                  type="button"
                  onClick={() => handleNav('map')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#244C3B] text-white rounded-md text-sm font-semibold interactive-tap"
                >
                  <span>Explore Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
