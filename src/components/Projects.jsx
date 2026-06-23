import React, { useState } from 'react';

const projectsList = [
  {
    id: 'zentro',
    title: 'Zentro',
    desc: 'Browser-Based Local AI App Creator. Create, test, and persist interactive web applications offline in the browser using local WebGPU LLMs, a premium code editor, and sandboxed previews.',
    category: 'fullstack',
    stack: 'TypeScript · React · Next.js · WebGPU',
    codeLink: 'https://github.com/johnbyju/zentro',
    liveLink: 'https://zentro-rust.vercel.app/',
    thumbClass: 'project-thumb project-thumb--a',
    icon: 'bx bx-cpu'
  },
  {
    id: 'whistling-citizen',
    title: 'Whistling Citizen',
    desc: 'Civic accountability and issue reporting platform designed for citizens to report local civic issues (waste management, road safety, grievances) and create citywide impact.',
    category: 'fullstack',
    stack: 'TypeScript · React · Next.js · Express',
    codeLink: 'https://github.com/johnbyju/whistlingcitizen',
    liveLink: 'https://whistlingcitizen.com',
    thumbClass: 'project-thumb project-thumb--b',
    icon: 'bx bx-bullseye'
  },
  {
    id: 'quests-games',
    title: 'Quests & Games',
    desc: 'Interactive quest gaming system featuring structured quests in games, competitive challenges, and skill-based progression for immersive and engaging gameplay.',
    category: 'frontend',
    stack: 'JavaScript · React · Vite',
    codeLink: 'https://github.com/johnbyju/questsandgames',
    liveLink: 'https://questsandgames.com',
    thumbClass: 'project-thumb project-thumb--c',
    icon: 'bx bx-game'
  },
  {
    id: 'thebitcoin',
    title: 'TheBitcoin',
    desc: 'First Project from ThroughBit. A cryptocurrency information, tracking, and wallet platform providing real-time tracking, secure transactions, and educational resources.',
    category: 'frontend',
    stack: 'JavaScript · React · Express',
    codeLink: 'https://github.com/throughbit/TheBitcoin.com',
    liveLink: 'https://thebitcoin.com',
    thumbClass: 'project-thumb project-thumb--d',
    icon: 'bx bx-bitcoin'
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
