import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import ExperienceTrack from './components/ExperienceTrack';
import Certificates from './components/Certificates';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

const certData = {
  python: {
    title: "Python Certification",
    date: "Aug 2023",
    issuer: "GUVI Geek Networks, IITM Research Park",
    desc: "Earned Python programming proficiency credentials. Course syllabus included data structure design, core programming controls, object-oriented concepts, modules application, and interactive algorithm design.",
    link: "https://www.linkedin.com/company/guviofficial/",
    icon: "bx bxs-certification"
  }
};

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'dark';
  });
  const [selectedCertId, setSelectedCertId] = useState(null);

  // Apply theme class to document.body
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  // Toggle theme handler using View Transitions API
  const toggleTheme = (e) => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const x = e.clientX ?? window.innerWidth / 2;
    const y = e.clientY ?? window.innerHeight / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.style.setProperty('--x', `${x}px`);
    document.documentElement.style.setProperty('--y', `${y}px`);
    document.documentElement.style.setProperty('--r', `${endRadius}px`);

    document.startViewTransition(() => {
      import('react-dom').then(({ flushSync }) => {
        flushSync(() => {
          setTheme(nextTheme);
        });
      });
    });
  };

  // Keyboard listener for modal closure (Escape key)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedCertId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // IntersectionObserver for elements with the .reveal class
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            // Only hide if the element is below viewport (user scrolled up past it)
            if (entry.boundingClientRect.top > 0) {
              entry.target.classList.remove('visible');
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10px 0px' }
    );

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => revealObserver.observe(el));

    return () => {
      reveals.forEach((el) => revealObserver.unobserve(el));
    };
  }, []);

  const selectedCert = selectedCertId ? certData[selectedCertId] : null;

  return (
    <>
      <Preloader />
      <div className="bg-gradient" aria-hidden="true"></div>
      
      <Header theme={theme} toggleTheme={toggleTheme} />
      
      <main>
        <Hero />
        <About />
        <ExperienceTrack />
        <Certificates onSelectCert={setSelectedCertId} />
        <Skills />
        <Projects />

        {/* GitHub Stats section */}
        <section className="section github-stats" id="github">
          <div className="container">
            <h2 className="section-title reveal">GitHub <span>Activity</span></h2>
            <div className="stats-grid reveal">
              <a href="https://github.com/johnbyju" target="_blank" rel="noopener noreferrer" className="stats-card">
                <img
                  src="https://github-readme-streak-stats.herokuapp.com?user=johnbyju&theme=dark&hide_border=true&background=0D1117&ring=00E5C0&fire=00E5C0&currStreakLabel=00E5C0"
                  alt="GitHub contribution streak for johnbyju"
                  loading="lazy"
                />
              </a>
              <a href="https://github.com/johnbyju" target="_blank" rel="noopener noreferrer" className="stats-card">
                <img
                  src="https://github-readme-stats.vercel.app/api/top-langs/?username=johnbyju&theme=tokyonight&hide_border=true&layout=compact&bg_color=0d1117"
                  alt="Top languages on GitHub for johnbyju"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </section>

        <Contact />
      </main>

      <Footer />

      {/* Certificate Details Modal */}
      {selectedCert && (
        <div className="modal open" id="cert-modal" role="dialog" aria-labelledby="modal-title">
          <div className="modal-overlay" id="modal-overlay" onClick={() => setSelectedCertId(null)}></div>
          <div className="modal-content">
            <button
              className="modal-close"
              id="modal-close"
              type="button"
              aria-label="Close modal"
              onClick={() => setSelectedCertId(null)}
            >
              <i className="bx bx-x"></i>
            </button>
            <div className="modal-body">
              <div className="modal-icon" id="modal-icon">
                <i className={selectedCert.icon}></i>
              </div>
              <h3 className="modal-title" id="modal-title">{selectedCert.title}</h3>
              <span className="modal-date" id="modal-date">{selectedCert.date}</span>
              <p className="modal-issuer" id="modal-issuer">{selectedCert.issuer}</p>
              <div className="modal-badge-graphic">
                <i className="bx bxs-badge-check"></i> Verified Credential
              </div>
              <p className="modal-desc" id="modal-desc">{selectedCert.desc}</p>
              <a
                href={selectedCert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
                id="modal-verify-link"
              >
                <i className="bx bx-check-shield"></i> Verify Credential
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
