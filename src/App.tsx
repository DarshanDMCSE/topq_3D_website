/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TopQ Academy - Main Application Entry
 * Features full client-side routing (/admin, /dashboard, /genai, /tracks, /curriculum, /aiimpact, /placementdesk, /login, /register),
 * high-performance 3D Mountain ascent engine, Supabase authentication, and Excel export.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { MountainBackground } from './components/MountainBackground';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GuidanceModal } from './components/GuidanceModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { MountainScrollProgress } from './components/MountainScrollProgress';
import { SideDockNavigation } from './components/SideDockNavigation';

// Routing & Auth Providers
import { RouterProvider, useRouter } from './lib/router';
import { AuthProvider } from './context/AuthContext';

// Pages
import { HomePage } from './pages/HomePage';
import { GenAIPage } from './pages/GenAIPage';
import { CurriculumPage } from './pages/CurriculumPage';
import { AIImpactPage } from './pages/AIImpactPage';
import { PlacementDeskPage } from './pages/PlacementDeskPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPage } from './pages/AdminPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

function AppContent() {
  const { currentPath, navigate } = useRouter();

  // Theme state: dark / light
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('topq-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Guidance modal state
  const [isGuidanceOpen, setIsGuidanceOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState('Gen AI & Multi-Agent Engineering');

  // Sync theme with html class
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('topq-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('topq-theme', 'light');
    }
  }, [isDark]);

  // Scroll reveal animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [currentPath]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  const openGuidance = useCallback((trackName?: string) => {
    if (trackName) setSelectedTrack(trackName);
    setIsGuidanceOpen(true);
  }, []);

  const closeGuidance = useCallback(() => {
    setIsGuidanceOpen(false);
  }, []);

  const scrollToTracks = useCallback(() => {
    if (currentPath !== '/') {
      navigate('/genai');
    } else {
      const el = document.getElementById('tracks');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [currentPath, navigate]);

  // Dedicated standalone Admin Console (Completely separate from public marketing layout)
  if (currentPath === '/admin' || currentPath === '/admin/' || currentPath.startsWith('/admin')) {
    return <AdminPage />;
  }

  const isHome = currentPath === '/' || currentPath === '';
  const isAuthPage = currentPath === '/login' || currentPath === '/register';

  // Render matching page according to URL
  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/admin':
      case '/admin/':
        return <AdminPage />;
      case '/dashboard':
        return <DashboardPage />;
      case '/login':
        return <LoginPage />;
      case '/register':
        return <RegisterPage />;
      case '/genai':
      case '/tracks':
        return <GenAIPage />;
      case '/curriculum':
        return <CurriculumPage />;
      case '/aiimpact':
        return <AIImpactPage />;
      case '/placementdesk':
      case '/placement':
        return <PlacementDeskPage />;
      default:
        return (
          <HomePage
            onOpenGuidance={openGuidance}
            onExploreTracks={scrollToTracks}
          />
        );
    }
  };

  return (
    <div className={`relative min-h-screen ${isAuthPage ? 'text-white' : 'text-slate-900 dark:text-slate-100'} selection:bg-emerald-500/30 selection:text-emerald-900 dark:selection:text-emerald-100`}>
      {/* Mountain Ascent Scroll Progress Bar (Visible across content pages) */}
      <MountainScrollProgress />

      {/* Side-Docked Mountain Curriculum Navigation Dots (Only on Home Page) */}
      {isHome && <SideDockNavigation />}

      {/* 3D Mountain Background Engine (Active across ALL pages: /genai, /curriculum, /login, /register, /aiimpact, /placementdesk) */}
      <MountainBackground isDark={isAuthPage ? true : isDark} />

      {/* Sticky Top Navigation Bar */}
      <Navbar
        isDark={isAuthPage ? true : isDark}
        onToggleTheme={toggleTheme}
        onOpenGuidance={openGuidance}
      />

      {/* Main Routed Page Content */}
      <main className="relative z-10">{renderCurrentPage()}</main>

      {/* Footer */}
      <Footer
        onOpenGuidance={() => openGuidance()}
        onExploreTracks={scrollToTracks}
      />

      {/* Floating WhatsApp Assistance Button */}
      <WhatsAppButton />

      {/* 1-on-1 Guidance & Syllabus Download Modal */}
      <GuidanceModal
        isOpen={isGuidanceOpen}
        onClose={closeGuidance}
        defaultTrack={selectedTrack}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </AuthProvider>
  );
}
