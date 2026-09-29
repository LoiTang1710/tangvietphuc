'use client';

import React, { useRef, useEffect } from 'react';

const socialLinks = [
  {
    platform: 'YOUTUBE',
    handle: '@PhucTangg-TVP',
    href: 'https://www.youtube.com/@PhucTangg-TVP',
    color: '#FF0000',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6a3 3 0 00-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
      </svg>
    ),
  },
  {
    platform: 'FACEBOOK',
    handle: 'Phuc Tang',
    href: 'https://www.facebook.com/phuc.tang.50552',
    color: '#1877F2',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z"/>
      </svg>
    ),
  },
  {
    platform: 'TELEGRAM',
    handle: '@tangvietphuc',
    href: 'https://t.me/tangvietphuc',
    color: '#2AABEE',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.94 8.2l-2.02 9.53c-.15.67-.54.83-1.08.52l-3-2.21-1.45 1.39c-.16.16-.3.3-.6.3l.21-3.02 5.5-4.97c.24-.21-.05-.33-.37-.12L6.26 14.4l-2.95-.92c-.64-.2-.65-.64.13-.95l11.53-4.44c.53-.2 1 .13.97.11z"/>
      </svg>
    ),
  },
];

export default function ContactSection() {
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
    <section id="contact" className="relative py-24 px-6 overflow-hidden" ref={sectionRef}>
      {/* Decorative background layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dark base */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0a0f1a 0%, #0d1220 40%, #0f1a10 100%)' }} />
        {/* Warm amber glow bottom-right (like Image 3) */}
        <div
          className="absolute bottom-0 right-0 w-2/3 h-2/3 opacity-25"
          style={{ background: 'radial-gradient(ellipse at bottom right, #b45309 0%, #92400e 30%, transparent 70%)' }}
        />
        {/* Cool teal glow top-left */}
        <div
          className="absolute top-0 left-0 w-1/2 h-1/2 opacity-20"
          style={{ background: 'radial-gradient(ellipse at top left, #0d9488 0%, transparent 60%)' }}
        />
        {/* Grid dots overlay */}
        <div className="absolute inset-0 grid-dot-bg opacity-20" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Top label */}
        <div className="reveal-up mb-4">
          <span className="section-label text-xs tracking-widest">WORK WITH ME</span>
        </div>

        {/* Large bold headline — Image 3 style */}
        <div className="reveal-up mb-6">
          <h2 className="font-black leading-tight" style={{ fontSize: 'clamp(2.2rem, 6vw, 3.8rem)' }}>
            <span className="text-white">Let&apos;s Fix What&apos;s</span>
            <br />
            <span className="text-primary">Killing Your Views.</span>
          </h2>
        </div>

        {/* Sub-description */}
        <div className="reveal-up mb-10">
          <p className="text-foreground/70 text-base leading-relaxed max-w-lg">
            I&apos;ll personally review your content and show you exactly how to improve your hooks, editing pace, storytelling, and viewer retention.
          </p>
        </div>

        {/* Social link cards */}
        <div className="space-y-3">
          {socialLinks?.map((link, i) => (
            <a
              key={link?.platform}
              href={link?.href}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal-up flex items-center gap-4 px-5 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/25 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Icon box */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{ background: `${link?.color}18`, color: link?.color }}
              >
                {link?.icon}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-0.5">{link?.platform}</p>
                <p className="text-base font-semibold text-foreground truncate">{link?.handle}</p>
              </div>

              {/* Arrow */}
              <svg
                className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}