import React, { useState, useEffect } from 'react';

const roles = [
  "Full Stack Developer",
  "React Developer",
  "Node.js Engineer",
  "Problem Solver",
];

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timer;

    if (!isDeleting && charIndex < current.length) {
      // Type next character
      timer = setTimeout(() => {
        setTypedText(current.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 90);
    } else if (isDeleting && charIndex > 0) {
      // Delete last character
      timer = setTimeout(() => {
        setTypedText(current.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, 45);
    } else if (!isDeleting && charIndex === current.length) {
      // Pause when fully typed
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && charIndex === 0) {
      // Switch to next role
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [roleIndex, charIndex, isDeleting]);

  return (
    <section className="hero" id="home">
      <div className="hero-content reveal">
        <p className="hero-greeting">Hi, I'm</p>
        <h1 className="hero-name">John Byju</h1>
        <p className="hero-role">
          I'm a <span className="typed-text">{typedText}</span><span className="cursor" aria-hidden="true">|</span>
        </p>
        <p className="hero-desc">
          Full stack developer from Coimbatore building fast, reliable web applications with
          JavaScript, React, and Node.js.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">View my work</a>
          <a href="#contact" className="btn btn-outline">Get in touch</a>
        </div>
        <div className="social-links">
          <a href="https://github.com/johnbyju" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="bx bxl-github"></i></a>
          <a href="https://www.linkedin.com/in/johnbyju/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="bx bxl-linkedin"></i></a>
          <a href="https://x.com/itz_John14" target="_blank" rel="noopener noreferrer" aria-label="X"><i className="bx bxl-twitter"></i></a>
          <a href="https://www.instagram.com/johnbyju14/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="bx bxl-instagram"></i></a>
        </div>
      </div>
      <div className="hero-visual reveal">
        <div className="hero-image-wrap">
          <img src="assets/img/sticker.png" alt="John Byju" className="hero-image" width="420" height="420" />
        </div>
      </div>
    </section>
  );
}
