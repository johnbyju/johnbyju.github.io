import React, { useState, useEffect } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Lock scrolling on mount
    document.body.classList.add('no-scroll');
    document.documentElement.classList.add('no-scroll');

    const timer = setTimeout(() => {
      setFadeOut(true);
      const hideTimer = setTimeout(() => {
        setLoading(false);
        // Unlock scrolling
        document.body.classList.remove('no-scroll');
        document.documentElement.classList.remove('no-scroll');
      }, 600); // matches CSS fade out transition time
      return () => clearTimeout(hideTimer);
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    };
  }, []);

  if (!loading) return null;

  return (
    <div id="preloader" className={fadeOut ? 'fade-out' : ''}>
      <div className="preloader-content">
        <svg viewBox="0 0 320 100" className="preloader-sig" aria-label="John Byju">
          <defs>
            <linearGradient id="sig-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--text)" />
              <stop offset="50%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="var(--text)" />
            </linearGradient>
          </defs>
          <mask id="write-mask">
            <rect x="0" y="0" width="320" height="100" fill="white" className="sig-mask-rect" />
          </mask>
          <text
            x="15"
            y="70"
            fontFamily="'Mrs Saint Delafield', cursive"
            fontSize="78"
            fill="url(#sig-grad)"
            mask="url(#write-mask)"
          >
            John Byju
          </text>
          <circle cx="15" cy="50" r="4" fill="var(--accent)" className="sig-dot" />
        </svg>
        <div className="preloader-bar"></div>
      </div>
    </div>
  );
}
