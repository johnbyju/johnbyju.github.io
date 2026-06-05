import React, { useState, useEffect } from 'react';

export default function Footer() {
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} John Byju. Built with React, HTML &amp; CSS.</p>
      <a
        href="#home"
        className={`back-top ${showBackTop ? 'show' : ''}`}
        id="back-top"
        aria-label="Back to top"
      >
        <i className="bx bx-up-arrow-alt"></i>
      </a>
    </footer>
  );
}
