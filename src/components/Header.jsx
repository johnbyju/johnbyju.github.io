import React, { useState, useEffect } from 'react';
import LiveClock from './LiveClock';

export default function Header({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [sigError, setSigError] = useState(false);

  useEffect(() => {
    // Simple window scroll listener for header styled background
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial call

    // IntersectionObserver for highly performant active section tracking
    const sections = ['home', 'about', 'experience', 'certifications', 'skills', 'projects', 'contact'];
    
    // We want to detect when the section is in the upper portion of the viewport
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -65% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((secId) => {
      const el = document.getElementById(secId);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((secId) => {
        const el = document.getElementById(secId);
        if (el) {
          observer.unobserve(el);
        }
      });
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`} id="header">
      <a href="#home" className="logo" aria-label="John Byju home" onClick={closeMenu}>
        {!sigError ? (
          <img
            src="assets/img/signature.png"
            alt="John Byju Signature Logo"
            className="logo-img"
            width="140"
            height="48"
            onError={() => setSigError(true)}
          />
        ) : (
          <span className="logo-text">John Byju</span>
        )}
      </a>
      <nav className={`nav ${menuOpen ? 'open' : ''}`} id="nav">
        {[
          { id: 'home', label: 'Home' },
          { id: 'about', label: 'About' },
          { id: 'experience', label: 'Experience' },
          { id: 'certifications', label: 'Certificates' },
          { id: 'skills', label: 'Skills' },
          { id: 'projects', label: 'Projects' },
          { id: 'contact', label: 'Contact' }
        ].map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
            onClick={closeMenu}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="header-actions-wrap">
        <button
          className="theme-toggle"
          id="theme-toggle"
          type="button"
          aria-label="Toggle dark/light theme"
          onClick={toggleTheme}
        >
          <i className={`bx ${theme === 'light' ? 'bx-sun' : 'bx-moon'}`}></i>
        </button>
        <a
          href="https://github.com/johnbyju"
          className="btn btn-sm header-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bx bxl-github"></i> GitHub
        </a>
        <button
          className="menu-btn"
          id="menu-btn"
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={`bx ${menuOpen ? 'bx-x' : 'bx-menu'}`}></i>
        </button>
        <LiveClock />
      </div>
    </header>
  );
}
