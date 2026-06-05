import React from 'react';

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <h2 className="section-title reveal">About <span>Me</span></h2>
        <div className="about-grid reveal">
          <div className="about-text">
            <h3>Full Stack Engineer</h3>
            <p>
              Full stack developer based in Coimbatore, Tamil Nadu. I coordinate with development teams to
              design user interfaces and build responsive web and mobile experiences with HTML, JavaScript,
              and React.
            </p>
            <p>
              I design, develop, and debug web applications — diagnosing root causes, shipping fixes, and
              building wireframes and prototypes from concept through delivery.
            </p>
            <ul className="about-highlights">
              <li><i className="bx bx-check"></i> Front-end: React, Next.js, TypeScript</li>
              <li><i className="bx bx-check"></i> Back-end: Node.js, Express, REST APIs</li>
              <li><i className="bx bx-check"></i> Data: MongoDB, MySQL, PostgreSQL, Redis</li>
            </ul>
          </div>
          <div className="about-cards">
            <article className="info-card">
              <i className="bx bx-code-alt"></i>
              <h4>Front-End</h4>
              <p>React, Next.js, HTML, CSS, Tailwind</p>
            </article>
            <article className="info-card">
              <i className="bx bxs-server"></i>
              <h4>Back-End</h4>
              <p>Node.js, Express, Socket.io, Python</p>
            </article>
            <article className="info-card">
              <i className="bx bx-data"></i>
              <h4>Data & DevOps</h4>
              <p>MongoDB, SQL, Git, Vercel</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
