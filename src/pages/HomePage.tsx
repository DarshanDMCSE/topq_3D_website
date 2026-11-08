/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TopQ Academy - Main Landing Page
 */

import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { AlumniMarquee } from '../components/AlumniMarquee';
import { MonaContributionWave } from '../components/MonaContributionWave';
import { CourseTracks } from '../components/CourseTracks';
import { CoreFeatures } from '../components/CoreFeatures';
import { MentorsSection } from '../components/MentorsSection';
import { CurriculumSection } from '../components/CurriculumSection';
import { IndustryInsights } from '../components/IndustryInsights';
import { PlacementDesk } from '../components/PlacementDesk';
import { LeadCaptureForm } from '../components/LeadCaptureForm';
import { TestimonialsFAQ } from '../components/TestimonialsFAQ';

interface HomePageProps {
  onOpenGuidance: (trackName?: string) => void;
  onExploreTracks: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenGuidance, onExploreTracks }) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Zone 0: Alpine Valley Stream & Hero Section */}
      <div className="reveal-on-scroll">
        <HeroSection
          onOpenGuidance={() => onOpenGuidance()}
          onExploreTracks={onExploreTracks}
        />
      </div>

      {/* Enterprise Ecosystem Marquee */}
      <div className="reveal-on-scroll">
        <AlumniMarquee />
      </div>

      {/* Interactive Contribution Wave with Butterfly */}
      <div className="reveal-on-scroll">
        <MonaContributionWave />
      </div>

      {/* Zone 1: Misty Pine Ridge & Learning Pathways */}
      <div className="reveal-on-scroll">
        <CourseTracks
          onOpenSyllabus={(track) => onOpenGuidance(track)}
        />
      </div>

      {/* Zone 2: Granite Pillars & Core Features */}
      <div className="reveal-on-scroll">
        <CoreFeatures />
      </div>

      {/* Zone 3: High-Camp Mentors */}
      <div className="reveal-on-scroll">
        <MentorsSection />
      </div>

      {/* Zone 4: Glacial Shelf & 16-Week Curriculum */}
      <div className="reveal-on-scroll">
        <CurriculumSection />
      </div>

      {/* Independent Research & Industry Insights */}
      <div className="reveal-on-scroll">
        <IndustryInsights />
      </div>

      {/* Placement Desk Section */}
      <div className="reveal-on-scroll">
        <PlacementDesk />
      </div>

      {/* Zone 5: Summit Sunrise & Application Form */}
      <div className="reveal-on-scroll">
        <LeadCaptureForm />
      </div>

      {/* Testimonials & FAQs */}
      <div className="reveal-on-scroll">
        <TestimonialsFAQ />
      </div>
    </div>
  );
};
