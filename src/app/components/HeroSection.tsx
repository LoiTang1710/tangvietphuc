'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const heroImg = heroRef.current.querySelector('.hero-parallax') as HTMLElement;
      if (heroImg) {
        heroImg.style.transform = `translate(${x * 20}px, ${y * 15}px) scale(1.05)`;
      }
      if (avatarRef.current) {
        avatarRef.current.style.transform = `translate(${x * 8}px, ${y * 6}px)`;
      }
    };

    const el = heroRef.current;
    if (el) el.addEventListener('mousemove', handleMouseMove);
    return () => { if (el) el.removeEventListener('mousemove', handleMouseMove); };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-dot-bg"
      style={{ paddingTop: '80px' }}
    >
      {/* Scan line effect */}
      <div className="scan-line absolute inset-x-0 top-0 h-32 pointer-events-none z-10 opacity-60" />

      {/* Atmospheric blobs */}
      <div className="blob-blue absolute top-1/4 left-1/4 w-96 h-96 opacity-60 pointer-events-none" />
      <div className="blob-purple absolute bottom-1/3 right-1/4 w-80 h-80 opacity-40 pointer-events-none" />

      {/* Hero image — large, centered, behind text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div
          className="hero-parallax relative w-full max-w-3xl mx-auto px-8"
          style={{ transition: 'transform 0.3s cubic-bezier(0.2,1,0.3,1)' }}
        >
          <AppImage
            src="/assets/images/Lobby_S-1788092832909.png"
            alt="Vibrant cinematic game lobby environment with dramatic atmospheric lighting, dark teal and blue tones, moody volumetric fog"
            fill={false}
            width={900}
            height={700}
            priority
            className="w-full h-auto object-contain hero-glow"
            style={{ opacity: 0.55, filter: 'brightness(0.75) saturate(1.1)' }}
          />
          {/* Gradient overlay to blend bottom */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #0D0D10 0%, #0D0D10 15%, transparent 100%)' }}
          />
          <div className="absolute inset-x-0 top-0 h-1/4 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, #0D0D10 0%, transparent 100%)' }}
          />
          <div className="absolute inset-y-0 left-0 w-1/4 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #0D0D10 0%, transparent 100%)' }}
          />
          <div className="absolute inset-y-0 right-0 w-1/4 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #0D0D10 0%, transparent 100%)' }}
          />
        </div>
      </div>

      {/* Content — centered above image */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 w-full max-w-5xl mx-auto">
        {/* Avatar */}
        <div
          ref={avatarRef}
          className="mb-6 animate-scale-in"
          style={{ transition: 'transform 0.3s cubic-bezier(0.2,1,0.3,1)' }}
        >
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden avatar-glow border-2 border-primary/50">
            <AppImage
              src="/assets/images/2aOboQv9DrDdwD0Bbo6xPH1dVnOnbtF8l6d0jUaO-1788092832171.jpg"
              alt="Tang Viet Phuc avatar profile picture"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Name */}
        <h1
          className="text-hero-xl font-black text-white uppercase tracking-tight leading-none animate-fade-in-up delay-100 mb-4"
          style={{ textShadow: '0 0 80px rgba(75,123,255,0.3), 0 2px 40px rgba(0,0,0,0.8)' }}
        >
          TANG VIET PHUC
        </h1>

        {/* Role */}
        <p className="section-label text-muted-foreground mb-3 animate-fade-in-up delay-200">
          Video Editor &amp; YouTube Creator
        </p>

        {/* Short intro */}
        <p className="max-w-md text-sm text-muted-foreground leading-relaxed animate-fade-in-up delay-300 mb-8">
          I help YouTube creators turn raw footage into videos that keep viewers watching — stronger hooks, tighter pacing, and edits that actually grow your channel.
        </p>

        {/* Social CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 animate-fade-in-up delay-400">
          <a
            href="https://www.youtube.com/@PhucTangg-TVP"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn pill-btn-youtube w-full sm:w-auto justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6a3 3 0 00-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
            </svg>
            YouTube
          </a>
          <a
            href="https://www.facebook.com/phuc.tang.50552"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn pill-btn-facebook w-full sm:w-auto justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z"/>
            </svg>
            Facebook
          </a>
          <a
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn pill-btn-telegram w-full sm:w-auto justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.94 8.2l-2.02 9.53c-.15.67-.54.83-1.08.52l-3-2.21-1.45 1.39c-.16.16-.3.3-.6.3l.21-3.02 5.5-4.97c.24-.21-.05-.33-.37-.12L6.26 14.4l-2.95-.92c-.64-.2-.65-.64.13-.95l11.53-4.44c.53-.2 1 .13.97.11z"/>
            </svg>
            Telegram
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 animate-fade-in delay-800 flex flex-col items-center gap-2">
          <span className="section-label opacity-40">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}