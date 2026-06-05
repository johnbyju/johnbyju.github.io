import React, { useState } from 'react';

const projectsList = [
  {
    id: 'backstage',
    title: 'Backstage',
    desc: 'Full-stack application with a deployed production build on Vercel.',
    category: 'fullstack',
    stack: 'TypeScript · React · Node',
    codeLink: 'https://github.com/johnbyju/backstage',
    liveLink: 'https://backstage-bay.vercel.app',
    thumbClass: 'project-thumb project-thumb--a',
    icon: 'bx bx-store'
  },
  {
    id: 'cricket-league',
    title: 'Cricket League',
    desc: 'Interactive cricket league app with scheduling and match management.',
    category: 'backend',
    stack: 'JavaScript · Express',
    codeLink: 'https://github.com/johnbyju/cricket-league',
    liveLink: 'https://cricketleague.vercel.app',
    thumbClass: 'project-thumb project-thumb--b',
    icon: 'bx bx-trophy'
  },
  {
    id: 'stock-chatbot',
    title: 'Stock Advisor Chatbot',
    desc: 'AI-assisted chatbot for stock market insights and guidance.',
    category: 'fullstack',
    stack: 'TypeScript · Next.js',
    codeLink: 'https://github.com/johnbyju/stock-market-advisor-chatbot',
    liveLink: 'https://stock-market-advisor-chatbot.vercel.app',
    thumbClass: 'project-thumb project-thumb--c',
    icon: 'bx bx-bot'
  },
  {
    id: 'url-shortener',
    title: 'URL Shortener',
    desc: 'Shorten long URLs and serve them through a clean, fast interface.',
    category: 'backend',
    stack: 'Python · Flask',
    codeLink: 'https://github.com/johnbyju/url-shortner',
    liveLink: 'https://url-shortner-nine-drab.vercel.app',
    thumbClass: 'project-thumb project-thumb--d',
    icon: 'bx bx-link'
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Template',
    desc: 'Responsive storefront template with product layout and checkout flow.',
    category: 'frontend',
    stack: 'HTML · CSS · JavaScript',
    codeLink: 'https://github.com/johnbyju/Ecommerce-Template',
    liveLink: 'https://ecommerce-template-navy.vercel.app',
    thumbClass: 'project-thumb project-thumb--e',
    icon: 'bx bx-shopping-bag'
  },
  {
    id: 'marma-fintech',
    title: 'Marma FinTech',
    desc: 'Financial technology web app with modern UI and deployed demo.',
    category: 'frontend',
    stack: 'JavaScript · React',
    codeLink: 'https://github.com/johnbyju/exMarmaFin',
    liveLink: 'https://marmafintech.vercel.app',
    thumbClass: 'project-thumb project-thumb--f',
    icon: 'bx bx-line-chart'
  }
];

export default function Projects() {
  const [filter, setFilter] = useState('all');

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'fullstack', label: 'Full Stack' }
  ];

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <h2 className="section-title reveal">Featured <span>Projects</span></h2>
        <p className="section-subtitle reveal">Selected work from my GitHub — live demos where available.</p>

        <div className="project-filters reveal">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              className={`filter-btn ${filter === opt.value ? 'active' : ''}`}
              onClick={() => setFilter(opt.value)}
              aria-label={`Show ${opt.label} projects`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {projectsList.map((project) => {
            const isHidden = filter !== 'all' && project.category !== filter;
            return (
              <article
                key={project.id}
                className={`project-card reveal ${isHidden ? 'hide' : ''}`}
                data-category={project.category}
              >
                <div className={project.thumbClass}>
                  <i className={project.icon}></i>
                </div>
                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                  <p className="project-stack">{project.stack}</p>
                  <div className="project-links">
                    <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
                      <i className="bx bxl-github"></i> Code
                    </a>
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      <i className="bx bx-link-external"></i> Live
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="projects-more reveal">
          <a
            href="https://github.com/johnbyju?tab=repositories"
            className="btn btn-outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxl-github"></i> See all repositories
          </a>
        </div>
      </div>
    </section>
  );
}
