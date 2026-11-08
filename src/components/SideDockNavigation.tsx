/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TopQ Academy - SideDockNavigation Component
 * A side-docked navigation dot indicator highlighting the active curriculum zone
 * based on the scroll position, allowing users to jump directly between key sections.
 */

import React, { useState, useEffect, useCallback } from 'react';

interface NavSection {
  id: string;
  label: string;
  zone: string;
  altitude: string;
}

const NAV_SECTIONS: NavSection[] = [
  { id: 'hero', label: 'Overview', zone: 'Alpine Base Camp', altitude: '1,200m' },
  { id: 'gen-ai', label: 'Gen AI Matrix', zone: 'Alpine Stream', altitude: '1,500m' },
  { id: 'tracks', label: 'Learning Tracks', zone: 'Misty Pine Ridge', altitude: '1,990m' },
  { id: 'mentors', label: 'Industry Mentors', zone: 'High Plateau', altitude: '3,360m' },
  { id: 'curriculum', label: 'Curriculum & Labs', zone: 'Glacier Cirque', altitude: '4,010m' },
  { id: 'placement', label: 'Placement Desk', zone: 'The Summit Pass', altitude: '4,400m' },
  { id: 'faq', label: 'Admissions & FAQ', zone: 'Summit Pinnacle', altitude: '4,800m' },
];

export const SideDockNavigation: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('hero');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-25% 0px -45% 0px',
        threshold: 0.1,
      }
    );

    NAV_SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const activeIndex = NAV_SECTIONS.findIndex((s) => s.id === activeId);

  return (
    <aside
      className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center select-none"
      aria-label="Curriculum Zone Quick Navigation"
    >
      <nav className="glass-panel rounded-full py-3 px-2 border border-slate-200/80 dark:border-slate-800/90 shadow-xl backdrop-blur-xl relative flex flex-col items-center gap-3">
        {/* Background Vertical Ascent Trail Track */}
        <div className="absolute top-4 bottom-4 w-[2px] bg-slate-200/80 dark:bg-slate-700/80 -z-10 rounded-full" />

        {/* Dynamic Trail Progress Fill */}
        <div
          className="absolute top-4 w-[2px] bg-gradient-to-b from-emerald-500 to-teal-400 -z-10 rounded-full transition-all duration-300"
          style={{
            height: `${Math.max(
              0,
              (activeIndex / Math.max(1, NAV_SECTIONS.length - 1)) * 100
            )}%`,
          }}
        />

        {/* Navigation Dots */}
        {NAV_SECTIONS.map((section, idx) => {
          const isActive = activeId === section.id;
          const isHovered = hoveredId === section.id;

          return (
            <div key={section.id} className="relative flex items-center group">
              {/* Tooltip on Left */}
              <div
                className={`absolute right-full mr-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200 ${
                  isHovered
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-2'
                }`}
              >
                <div className="glass-panel rounded-xl py-1.5 px-3 border border-emerald-500/30 shadow-lg text-left whitespace-nowrap space-y-0.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    <span>{section.zone}</span>
                    <span className="text-slate-300 dark:text-slate-600">·</span>
                    <span>{section.altitude}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {section.label}
                  </div>
                </div>
              </div>

              {/* Clickable Nav Dot Button */}
              <button
                type="button"
                onClick={() => scrollToSection(section.id)}
                onMouseEnter={() => setHoveredId(section.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(section.id)}
                onBlur={() => setHoveredId(null)}
                className="relative p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                aria-label={`Jump to ${section.label} (${section.zone}, ${section.altitude})`}
                aria-current={isActive ? 'location' : undefined}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-2.5 h-6 bg-gradient-to-b from-emerald-500 to-teal-400 shadow-[0_0_10px_#10b981] scale-105'
                      : 'w-2.5 h-2.5 bg-slate-300 dark:bg-slate-600 group-hover:bg-emerald-400 group-hover:scale-125'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideDockNavigation;
