'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import AppImage from '@/components/ui/AppImage';

interface Project {
  id: number;
  title: string;
  thumbnail: string;
  alt: string;
  videoUrl: string;
  embedUrl: string;
}

interface ShortProject {
  id: number;
  title: string;
  embedUrl: string;
  videoPreviewUrl: string | null;
  coverColor: string;
  thumbnail?: string;
}

const allProjects: Project[] = [
  {
    id: 1,
    title: 'Tôi xây NETHERHUB TO NHẤT Polym Realm !!!',
    thumbnail: '/assets/images/zwAVUcX0hCU-HD-1788107353520.jpg',
    alt: 'Minecraft Netherhub build showcase in Polym Realm with dramatic lighting and cinematic editing',
    videoUrl: 'https://www.youtube.com/watch?v=zwAVUcX0hCU&t=167s',
    embedUrl: 'https://www.youtube.com/embed/zwAVUcX0hCU?autoplay=1',
  },
  {
    id: 2,
    title: 'Tóm tắt 100 NGÀY trên ĐẢO HOANG trong MINECRAFT HARDCORE !!!',
    thumbnail: '/assets/images/IFHILkboWPE-HD-1788107384316.jpg',
    alt: '100 days survival on a deserted island in Minecraft Hardcore mode with dramatic thumbnail',
    videoUrl: 'https://www.youtube.com/watch?v=IFHILkboWPE&t=184s',
    embedUrl: 'https://www.youtube.com/embed/IFHILkboWPE?autoplay=1',
  },
  {
    id: 3,
    title: 'Khởi Đầu HOÀN HẢO Trong Minecraft Hardcore !',
    thumbnail: '/assets/images/3CBJHl_e1Dw-HD__1_-1788107416076.jpg',
    alt: 'Perfect start in Minecraft Hardcore with vibrant thumbnail and dynamic editing style',
    videoUrl: 'https://www.youtube.com/watch?v=3CBJHl_e1Dw&t=44s',
    embedUrl: 'https://www.youtube.com/embed/3CBJHl_e1Dw?autoplay=1',
  },
  {
    id: 4,
    title: 'Thử thách ĐÀO 1.000.000 BLOCK bằng CÂY CÚP ??! | Polym Realm',
    thumbnail: '/assets/images/KP6wtvyTFCM-HD-1788107533474.jpg',
    alt: 'Mining 1 million blocks challenge in Polym Realm Minecraft with dramatic cinematic thumbnail',
    videoUrl: 'https://www.youtube.com/watch?v=KP6wtvyTFCM&t=39s',
    embedUrl: 'https://www.youtube.com/embed/KP6wtvyTFCM?autoplay=1',
  },
  {
    id: 5,
    title: 'Mình đã bị SHANGHOANG ĐE DỌA như thế nào ?? | Polym Realm',
    thumbnail: '/assets/images/Lcjf3TxO174-HD-1788107563312.jpg',
    alt: 'Dramatic story about being threatened in Polym Realm Minecraft with cinematic thumbnail',
    videoUrl: 'https://www.youtube.com/watch?v=Lcjf3TxO174&t=149s',
    embedUrl: 'https://www.youtube.com/embed/Lcjf3TxO174?autoplay=1',
  },
];

const shortProjects: ShortProject[] = [
  {
    id: 1,
    title: 'Short-form Edit #1',
    embedUrl: 'https://drive.google.com/file/d/1RNK-7-5WRiwIieTMBIZR1I0Qsq6kiYhS/preview',
    videoPreviewUrl: 'https://drive.google.com/uc?export=download&id=1RNK-7-5WRiwIieTMBIZR1I0Qsq6kiYhS',
    coverColor: '#1a1a2e',
    thumbnail: '/assets/images/short-thumb1-1789819209007.jpg',
  },
  {
    id: 2,
    title: 'Short-form Edit #2',
    embedUrl: 'https://drive.google.com/file/d/13MyegKT6ahPwfMRhz5w7UwDHO_IPTMW5/preview',
    videoPreviewUrl: 'https://drive.google.com/uc?export=download&id=13MyegKT6ahPwfMRhz5w7UwDHO_IPTMW5',
    coverColor: '#16213e',
    thumbnail: '/assets/images/thumb-short-3-1789819220180.jpg',
  },
  {
    id: 3,
    title: 'Short-form Edit #3',
    embedUrl: 'https://drive.google.com/file/d/1BsCV8fuVZ-dnDSEZtvZHMtGPO9GicGYy/preview',
    videoPreviewUrl: 'https://drive.google.com/uc?export=download&id=1BsCV8fuVZ-dnDSEZtvZHMtGPO9GicGYy',
    coverColor: '#0f3460',
    thumbnail: '/assets/images/thumb-short-2-1789819214747.jpg',
  },
];

// ─── Video Thumbnail (auto-capture from first 10s) ────────────────────────────
function VideoThumbnail({ src, coverColor }: { src: string; coverColor: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [thumbUrl, setThumbUrl] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!src) { setFailed(true); return; }
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const handleSeeked = () => {
      try {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        canvas.width = video.videoWidth || 360;
        canvas.height = video.videoHeight || 640;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setThumbUrl(canvas.toDataURL('image/jpeg', 0.85));
      } catch {
        setFailed(true);
      }
    };

    const handleLoaded = () => {
      video.currentTime = 10;
    };

    const handleError = () => setFailed(true);

    video.addEventListener('loadeddata', handleLoaded);
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('error', handleError);
    video.crossOrigin = 'anonymous';
    video.src = src;
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoaded);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('error', handleError);
    };
  }, [src]);

  return (
    <>
      <video ref={videoRef} style={{ display: 'none' }} muted playsInline preload="metadata" />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {thumbUrl ? (
        <img
          src={thumbUrl}
          alt="Video thumbnail"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center" style={{ background: coverColor }}>
          {!failed && (
            <div className="w-8 h-8 border-2 border-white/30 border-t-amber-400 rounded-full animate-spin" />
          )}
          {failed && (
            <div className="flex flex-col items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white" opacity="0.4">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          )}
        </div>
      )}
    </>
  );
}

// ─── Lightbox Modal ───────────────────────────────────────────────────────────
interface LightboxProps {
  embedUrl: string;
  title: string;
  isPortrait?: boolean;
  onClose: () => void;
}

function Lightbox({ embedUrl, title, isPortrait, onClose }: LightboxProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative"
        style={
          isPortrait
            ? { width: 'min(360px, 90vw)', aspectRatio: '9/16' }
            : { width: 'min(900px, 95vw)', aspectRatio: '16/9' }
        }
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-10 right-0 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <iframe
          src={embedUrl}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          className="w-full h-full rounded-xl border-0"
          style={{ background: '#000' }}
        />
      </div>
    </div>
  );
}

// ─── Short-form Slider ────────────────────────────────────────────────────────
interface ShortSliderProps {
  onOpen: (embedUrl: string, title: string) => void;
  visible: boolean;
}

function ShortFormSlider({ onOpen, visible }: ShortSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + shortProjects.length) % shortProjects.length);
  }, []);

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % shortProjects.length);
  }, []);

  const getCardStyle = (index: number) => {
    const total = shortProjects.length;
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    const absDiff = Math.abs(diff);
    if (absDiff > 1) return null;

    const isActive = diff === 0;
    const translateX = diff * 220;
    const scale = isActive ? 1 : 0.72;
    const opacity = isActive ? 1 : 0.45;
    const zIndex = isActive ? 30 : 10;
    const blur = isActive ? 0 : 2;

    return { translateX, scale, opacity, zIndex, blur, isActive };
  };

  return (
    <div className={`transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {/* Category label */}
      <div className="flex items-center gap-2 justify-center mb-8">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="section-label text-xs tracking-widest text-amber-400">SHORT-FORM (PORTRAIT)</span>
      </div>

      {/* Slider */}
      <div className="relative flex items-center justify-center">
        {/* Prev */}
        <button
          onClick={prev}
          aria-label="Previous short video"
          className="absolute left-4 md:left-8 z-40 w-11 h-11 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:border-amber-400 hover:text-amber-400 transition-all duration-300 hover:scale-110"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        {/* Cards track */}
        <div className="relative w-full" style={{ height: '420px' }}>
          {shortProjects.map((project, index) => {
            const style = getCardStyle(index);
            if (!style) return null;
            const { translateX, scale, opacity, zIndex, blur, isActive } = style;

            return (
              <div
                key={project.id}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `translate(calc(-50% + ${translateX}px), -50%) scale(${scale})`,
                  opacity,
                  zIndex,
                  filter: blur > 0 ? `blur(${blur}px)` : 'none',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  width: '240px',
                }}
              >
                <button
                  onClick={() => isActive && onOpen(project.embedUrl, project.title)}
                  disabled={!isActive}
                  className={`block w-full rounded-2xl overflow-hidden group cursor-pointer focus:outline-none ${isActive ? 'ring-2 ring-amber-400/60 shadow-2xl' : 'pointer-events-none'}`}
                  style={{ aspectRatio: '9/16', background: project.coverColor }}
                  tabIndex={isActive ? 0 : -1}
                  aria-label={`Play ${project.title}`}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Thumbnail or fallback */}
                    {project.thumbnail ? (
                      <div className="absolute inset-0">
                        <AppImage
                          src={project.thumbnail}
                          alt={`Short-form video ${project.id} thumbnail`}
                          fill
                          sizes="240px"
                          className="object-cover"
                        />
                      </div>
                    ) : project.videoPreviewUrl ? (
                      <div className="absolute inset-0">
                        <VideoThumbnail src={project.videoPreviewUrl} coverColor={project.coverColor} />
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60" style={{ background: project.coverColor }} />
                    )}

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/50" />

                    {/* Play icon */}
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/25 transition-all duration-300 group-hover:scale-110">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Next */}
        <button
          onClick={next}
          aria-label="Next short video"
          className="absolute right-4 md:right-8 z-40 w-11 h-11 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:border-amber-400 hover:text-amber-400 transition-all duration-300 hover:scale-110"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {shortProjects.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`Go to short video ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex ? 'w-8 h-2 bg-amber-400' : 'w-2 h-2 bg-white/25 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mt-14 mb-2 max-w-2xl mx-auto">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-white/20 text-xs tracking-widest uppercase">Long-form</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Lightbox state
  const [lightbox, setLightbox] = useState<{ embedUrl: string; title: string; isPortrait?: boolean } | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.1 }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + allProjects.length) % allProjects.length);
  }, []);

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % allProjects.length);
  }, []);

  // Keyboard navigation (only when lightbox is closed)
  useEffect(() => {
    if (lightbox) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [prev, next, lightbox]);

  const getCardStyle = (index: number) => {
    const total = allProjects.length;
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const absDiff = Math.abs(diff);
    if (absDiff > 2) return null;

    const isActive = diff === 0;
    const translateX = diff * 340;
    const scale = isActive ? 1 : absDiff === 1 ? 0.78 : 0.62;
    const opacity = isActive ? 1 : absDiff === 1 ? 0.65 : 0.35;
    const zIndex = isActive ? 30 : absDiff === 1 ? 20 : 10;
    const blur = isActive ? 0 : absDiff === 1 ? 1 : 3;

    return { translateX, scale, opacity, zIndex, blur, isActive, diff };
  };

  const openLightbox = (embedUrl: string, title: string, isPortrait?: boolean) => {
    setLightbox({ embedUrl, title, isPortrait });
  };

  return (
    <>
      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          embedUrl={lightbox.embedUrl}
          title={lightbox.title}
          isPortrait={lightbox.isPortrait}
          onClose={() => setLightbox(null)}
        />
      )}

      <section id="projects" className="py-24 px-6 relative overflow-hidden" ref={sectionRef}>
        {/* Background accent */}
        <div className="blob-blue absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="section-label mb-2">Featured Edits</p>
            <h2 className="text-section-title font-black text-foreground uppercase">MY FINAL CUTS</h2>
            <div className="w-16 h-px bg-primary/50 mx-auto mt-4 mb-3" />
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Cinematic edits crafted to keep viewers hooked — frame by frame.
            </p>
          </div>

          {/* ── SHORT-FORM SLIDER ── */}
          <ShortFormSlider
            onOpen={(url, title) => openLightbox(url, title, true)}
            visible={visible}
          />

          {/* ── LONG-FORM SLIDER ── */}
          {/* Category label */}
          <div className={`flex items-center gap-2 justify-center mb-10 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="section-label text-xs tracking-widest">LONG-FORM (LANDSCAPE)</span>
          </div>

          {/* Slider */}
          <div className={`relative flex items-center justify-center transition-all duration-700 delay-200 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Prev arrow */}
            <button
              onClick={prev}
              aria-label="Previous project"
              className="absolute left-4 md:left-8 z-40 w-11 h-11 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:border-primary hover:text-primary transition-all duration-300 hover:scale-110"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </button>

            {/* Cards track */}
            <div className="relative w-full" style={{ height: '340px' }}>
              {allProjects.map((project, index) => {
                const style = getCardStyle(index);
                if (!style) return null;
                const { translateX, scale, opacity, zIndex, blur, isActive } = style;

                return (
                  <div
                    key={project.id}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `translate(calc(-50% + ${translateX}px), -50%) scale(${scale})`,
                      opacity,
                      zIndex,
                      filter: blur > 0 ? `blur(${blur}px)` : 'none',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      width: '560px',
                      maxWidth: '80vw',
                    }}
                  >
                    <button
                      onClick={() => isActive && openLightbox(project.embedUrl, project.title)}
                      disabled={!isActive}
                      className={`block w-full rounded-2xl overflow-hidden group cursor-pointer focus:outline-none ${isActive ? 'ring-2 ring-primary/60 shadow-2xl' : 'pointer-events-none'}`}
                      style={{ aspectRatio: '16/9' }}
                      tabIndex={isActive ? 0 : -1}
                      aria-label={`Play ${project.title}`}
                    >
                      <div className="relative w-full h-full">
                        <AppImage
                          src={project.thumbnail}
                          alt={project.alt}
                          fill
                          sizes="(max-width: 768px) 90vw, 560px"
                          className="object-cover"
                        />
                        {/* Hover overlay — only on active */}
                        {isActive && (
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-400 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        )}
                        {/* Bottom gradient for non-active */}
                        {!isActive && (
                          <div className="absolute inset-0 bg-black/20" />
                        )}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Next arrow */}
            <button
              onClick={next}
              aria-label="Next project"
              className="absolute right-4 md:right-8 z-40 w-11 h-11 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:border-primary hover:text-primary transition-all duration-300 hover:scale-110"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {allProjects.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to project ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-8 h-2 bg-primary' : 'w-2 h-2 bg-white/25 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Active project title */}
          <div className="text-center mt-5 min-h-[2rem]">
            <p className="text-sm text-muted-foreground font-medium transition-all duration-300">
              {allProjects[activeIndex].title}
            </p>
          </div>

          {/* Channel link */}
          <div className="flex justify-center mt-6">
            <a
              href="https://www.youtube.com/@PhucTangg-TVP"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-red-500 transition-colors duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
                <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6a3 3 0 00-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
              </svg>
              View all videos on YouTube →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
