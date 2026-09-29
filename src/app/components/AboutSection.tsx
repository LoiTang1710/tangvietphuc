'use client';

import React, { useRef, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';

const highlights = [
  { label: '1+ YEAR', sub: 'Editing Experience' },
  { label: 'iChill Media', sub: 'Professional Work' },
  { label: 'Retention', sub: 'Focused Editing' },
  { label: 'Results', sub: 'Not Just Cuts' },
];

const skills = [
  'Hook Optimization',
  'Viewer Retention',
  'Pacing & Rhythm',
  'Sound Design',
  'Storytelling Flow',
  'Motion Graphics',
  'Short-form Cuts',
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targets = entry.target.querySelectorAll('.reveal-up');
            targets.forEach((el, i) => {
              setTimeout(() => el.classList.add('active'), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    const el = sectionRef?.current;
    if (el) observer?.observe(el);
    return () => { if (el) observer?.unobserve(el); };
  }, []);

  return (
    <section id="about" className="relative py-24 overflow-hidden" ref={sectionRef}>
      {/* Gradient background inspired by Image 4 */}
      <div className="absolute inset-0 gradient-about" />
      <div className="absolute inset-0 gradient-about-glow pointer-events-none" />
      <div className="absolute inset-0 grid-dot-bg opacity-30 pointer-events-none" />

      {/* Floating decorative elements */}
      <div className="absolute left-8 top-1/4 float-slow opacity-20 pointer-events-none hidden lg:block">
        <div className="w-16 h-20 rounded-lg bg-gradient-to-br from-purple-500/40 to-transparent border border-purple-500/20" />
      </div>
      <div className="absolute right-12 top-1/3 float-medium opacity-20 pointer-events-none hidden lg:block">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500/40 to-transparent border border-teal-500/20" />
      </div>
      <div className="absolute left-1/4 bottom-1/4 float-slow opacity-15 pointer-events-none hidden lg:block">
        <div className="w-10 h-10 rounded-md rotate-45 bg-gradient-to-br from-blue-500/30 to-transparent border border-blue-500/20" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Avatar diamond */}
        <div className="flex justify-center mb-8 reveal-up">
          <div
            className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/50 rotate-45 shadow-2xl"
            style={{ boxShadow: '0 0 40px rgba(75,123,255,0.3)' }}
          >
            <div className="-rotate-45 scale-125 w-full h-full">
              <AppImage
                src="/assets/images/2aOboQv9DrDdwD0Bbo6xPH1dVnOnbtF8l6d0jUaO-1788092832171.jpg"
                alt="Tang Viet Phuc profile"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Section title */}
        <div className="text-center mb-12 reveal-up">
          <h2 className="text-section-title font-black text-white uppercase tracking-tight">
            WHY WORK WITH ME
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4" />
        </div>

        {/* Content blocks */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="reveal-up space-y-4">
            <p className="text-foreground/80 leading-relaxed text-base">
              Most videos lose viewers in the first 30 seconds. I fix that. With{' '}
              <span className="text-primary font-bold">1+ year of editing experience</span> and real work at{' '}
              <span className="font-bold text-white">iChill Media</span>, I know exactly where viewers drop off — and how to stop it.
            </p>
            <p className="text-foreground/70 leading-relaxed text-base">
              I&apos;ve worked on short-form and long-form YouTube content, including{' '}
              <span className="font-bold text-white">AI-assisted video production</span>, helping creators publish faster without sacrificing quality.
            </p>
          </div>
          <div className="reveal-up space-y-4">
            <p className="text-foreground/70 leading-relaxed text-base">
              Every edit I deliver is built around one goal:{' '}
              <span className="text-primary font-bold">keeping your audience watching longer</span>. That means tight pacing, well-timed SFX, clean transitions, and a story that pulls people in from the first frame.
            </p>
            <p className="text-foreground/70 leading-relaxed text-base">
              If your videos aren&apos;t getting the views they deserve, the edit might be the problem.{' '}
              <span className="font-bold text-white">Let&apos;s change that.</span>
            </p>
          </div>
        </div>

        {/* Highlight stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 reveal-up">
          {highlights?.map((h) => (
            <div
              key={h?.label}
              className="text-center p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <p className="font-black text-lg text-white tracking-tight">{h?.label}</p>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">{h?.sub}</p>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="reveal-up">
          <p className="section-label text-center mb-6">What I Solve For You</p>
          <div className="flex flex-wrap justify-center gap-3">
            {skills?.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full text-sm font-600 text-foreground/80 border border-white/10 bg-white/5 hover:border-primary/40 hover:text-primary transition-all duration-300 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}