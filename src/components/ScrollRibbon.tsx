import { useEffect, useRef, useState } from 'react';
import '../styles/ScrollRibbon.css';

interface ScrollRibbonProps {
  direction?: 'ltr' | 'rtl'; // ltr = zleva doprava, rtl = zprava doleva
}

export function ScrollRibbon({ direction = 'rtl' }: ScrollRibbonProps) {
  const ribbonRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ribbonRef.current) return;

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = Math.min(scrolled / scrollHeight, 1);

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getRibbonPath = (startY: number, endY: number, widthBase: number, phase: number) => {
    const steps = 40;
    const pointsTop: string[] = [];
    const pointsBottom: string[] = [];
    
    for (let i = 0; i <= steps; i++) {
      const x = -100 + (1400 * (i / steps));
      const t = i / steps;
      
      // Základní diagonální linie s mírným zvlněním
      const baseY = startY + (endY - startY) * t + Math.sin(t * Math.PI * 2) * 30;
      
      // Změna šířky (4x v průběhu délky, až o 50 %)
      const currentWidth = widthBase * (1 + 0.4 * Math.sin(t * Math.PI * 8 + phase));
      
      pointsTop.push(`${x},${baseY - currentWidth / 2}`);
      pointsBottom.unshift(`${x},${baseY + currentWidth / 2}`);
    }
    
    return `M ${pointsTop.join(' L ')} L ${pointsBottom.join(' L ')} Z`;
  };

  const goldPath = getRibbonPath(90, 550, 16, 0);   // Začíná těsněji u hnědé
  const brownPath = getRibbonPath(140, 475, 16, Math.PI); // Končí těsněji u zlaté (překřížení stále proběhne)

  return (
    <div
      ref={ribbonRef}
      className={`scroll-ribbon scroll-ribbon-${direction}`}
      style={{
        '--scroll-progress': scrollProgress,
      } as React.CSSProperties & { '--scroll-progress': number }}
    >
      <svg
        viewBox="0 0 1200 692"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="ribbon-svg"
      >
        <defs>
          <linearGradient id="sideFadeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="15%" stopColor="white" stopOpacity="1" />
            <stop offset="85%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <mask id="sideFadeMask">
            <rect x="0" y="0" width="1200" height="692" fill="url(#sideFadeGradient)" />
          </mask>

          <filter id="ribbonBlurWhite" x="-50%" y="-50%" width="200%" height="200%">
            <feColorMatrix in="SourceGraphic" type="matrix"
              values="0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 1 0" result="whiteBase" />
            <feGaussianBlur in="whiteBase" stdDeviation="30" result="largeWhiteBlur" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="softColoredBlur" />
            <feMerge>
              <feMergeNode in="largeWhiteBlur" />
              <feMergeNode in="softColoredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Zlatá stuha */}
        <path
          d={goldPath}
          fill="#D4AF37"
          className="ribbon-path ribbon-gold"
          filter="url(#ribbonBlurWhite)"
          mask="url(#sideFadeMask)"
        />

        {/* Hnědá stuha */}
        <path
          d={brownPath}
          fill="#5D4037"
          className="ribbon-path ribbon-brown"
          filter="url(#ribbonBlurWhite)"
          mask="url(#sideFadeMask)"
        />
      </svg>
    </div>
  );
}