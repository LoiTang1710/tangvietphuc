'use client';

import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  const [year, setYear] = useState('');

  useEffect(() => {
    setYear(new Date()?.getFullYear()?.toString());
  }, []);

  return (
    <footer className="py-16 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Logo + name */}
        <div className="flex items-center gap-2">
          <AppLogo size={28} iconName="FilmIcon" />
          <span className="font-bold text-sm text-foreground">Hyxtyss.</span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground tracking-widest uppercase text-center">
          {year ? `© ${year} TANG VIET PHUC — MADE WITH CARE.` : '© TANG VIET PHUC — MADE WITH CARE.'}
        </p>

        {/* Social icons */}
        <div className="flex items-center gap-5">
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-secondary transition-colors"
            aria-label="YouTube"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6a3 3 0 00-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
            </svg>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Facebook"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z"/>
            </svg>
          </a>
          <a
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-[#2AABEE] transition-colors"
            aria-label="Telegram"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.94 8.2l-2.02 9.53c-.15.67-.54.83-1.08.52l-3-2.21-1.45 1.39c-.16.16-.3.3-.6.3l.21-3.02 5.5-4.97c.24-.21-.05-.33-.37-.12L6.26 14.4l-2.95-.92c-.64-.2-.65-.64.13-.95l11.53-4.44c.53-.2 1 .13.97.11z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}