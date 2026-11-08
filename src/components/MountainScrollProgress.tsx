/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TopQ Academy - MountainScrollProgress Component
 * Thin, elegant progress bar at the very top of the viewport (z-[60])
 * that fills up as the user scrolls down the page, visualizing their journey
 * up the mountain from Alpine Valley Stream (1,200 m) to the Summit Pinnacle (4,800 m).
 */

import React, { useEffect, useRef } from 'react';

interface AscentZone {
  name: string;
  altitude: number;
  threshold: number; // 0 to 1
}

const ZONES: AscentZone[] = [
  { name: 'Alpine Valley Stream', altitude: 1200, threshold: 0.0 },
  { name: 'Misty Pine Ridge', altitude: 1990, threshold: 0.22 },
  { name: 'Steel Crag Pass', altitude: 2710, threshold: 0.45 },
  { name: 'High Altitude Plateau', altitude: 3360, threshold: 0.65 },
  { name: 'Glacier Cirque', altitude: 4010, threshold: 0.82 },
  { name: 'TopQ Summit Pinnacle', altitude: 4800, threshold: 0.98 },
];

export const MountainScrollProgress: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const tipRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const altTextRef = useRef<HTMLSpanElement | null>(null);
  const zoneTextRef = useRef<HTMLSpanElement | null>(null);
  const pctTextRef = useRef<HTMLSpanElement | null>(null);

  const scrollTimeoutRef = useRef<number | null>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const rawProgress = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0;
      const pct = Math.min(99.6, rawProgress * 100);

      // Direct GPU-accelerated DOM updates (zero React re-renders)
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${rawProgress})`;
      }
      if (tipRef.current) {
        tipRef.current.style.left = `${pct}%`;
      }
      if (badgeRef.current) {
        badgeRef.current.style.left = `${Math.max(8, Math.min(92, pct))}%`;
        badgeRef.current.style.opacity = '1';
        badgeRef.current.style.transform = 'translateX(-50%) translateY(0)';
      }

      const currentAlt = Math.round(1200 + rawProgress * 3600);
      if (altTextRef.current) {
        altTextRef.current.textContent = `${currentAlt.toLocaleString()} m`;
      }

      if (pctTextRef.current) {
        pctTextRef.current.textContent = `${Math.round(rawProgress * 100)}%`;
      }

      let activeZone = ZONES[0].name;
      for (let i = ZONES.length - 1; i >= 0; i--) {
        if (rawProgress >= ZONES[i].threshold - 0.04) {
          activeZone = ZONES[i].name;
          break;
        }
      }
      if (zoneTextRef.current) {
        zoneTextRef.current.textContent = activeZone;
      }

      // Hide badge after scrolling stops unless hovered
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        if (!isHoveredRef.current && badgeRef.current) {
          badgeRef.current.style.opacity = '0';
          badgeRef.current.style.transform = 'translateX(-50%) translateY(-8px)';
        }
      }, 1400);

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 right-0 z-[60] pointer-events-auto select-none"
      onMouseEnter={() => {
        isHoveredRef.current = true;
        if (badgeRef.current) {
          badgeRef.current.style.opacity = '1';
          badgeRef.current.style.transform = 'translateX(-50%) translateY(0)';
        }
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        if (badgeRef.current) {
          badgeRef.current.style.opacity = '0';
          badgeRef.current.style.transform = 'translateX(-50%) translateY(-8px)';
        }
      }}
      role="progressbar"
      aria-label="Mountain Ascent Scroll Progress"
    >
      {/* Background Track */}
      <div className="w-full h-[3px] bg-slate-200/40 dark:bg-slate-800/40 backdrop-blur-sm relative overflow-hidden">
        {/* Animated Progress Fill (GPU Accelerated transform scaleX) */}
        <div
          ref={fillRef}
          className="h-full w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 origin-left relative will-change-transform"
          style={{
            transform: 'scaleX(0)',
            boxShadow: '0 0 10px rgba(16, 185, 129, 0.7), 0 0 16px rgba(56, 189, 248, 0.4)',
          }}
        >
          {/* Shimmer sweep effect */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-24 animate-[shimmer_2s_infinite]"
            style={{
              animationDuration: '2.2s',
            }}
          />
        </div>
      </div>

      {/* Leading Tip Glow & Mountain Summit Beacon */}
      <div
        ref={tipRef}
        className="absolute top-0 pointer-events-none will-change-[left]"
        style={{
          left: '0%',
          transform: 'translateX(-50%)',
        }}
      >
        <div className="w-3 h-3 -mt-[4.5px] rounded-full bg-white dark:bg-emerald-300 shadow-[0_0_12px_#10b981,0_0_20px_#38bdf8] flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping opacity-75" />
        </div>
      </div>

      {/* Elegant Hover / Scroll Ascent Milestone Badge */}
      <div
        ref={badgeRef}
        className="absolute top-2.5 transition-all duration-200 pointer-events-none opacity-0 -translate-y-2 will-change-[left,opacity,transform]"
        style={{
          left: '8%',
          transform: 'translateX(-50%)',
        }}
      >
        <div className="flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-emerald-500/30 shadow-lg text-[11px] font-medium text-slate-800 dark:text-slate-100 whitespace-nowrap">
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
            <svg
              className="w-3 h-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
            </svg>
            <span ref={altTextRef}>1,200 m</span>
          </span>
          <span className="text-slate-400 dark:text-slate-500">/ 4,800 m</span>
          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
          <span ref={zoneTextRef} className="font-semibold text-slate-700 dark:text-slate-200">
            Alpine Valley Stream
          </span>
          <span
            ref={pctTextRef}
            className="px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold font-mono text-[10px]"
          >
            0%
          </span>
        </div>
      </div>
    </div>
  );
};

export default MountainScrollProgress;
