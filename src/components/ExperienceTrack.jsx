import React, { useState } from 'react';

export default function ExperienceTrack() {
  const [collapsedCards, setCollapsedCards] = useState({
    marma: false,
    throughbit: false,
    xzect: false,
  });

  const handleClose = (cardKey) => {
    setCollapsedCards((prev) => ({ ...prev, [cardKey]: true }));
  };

  const handleRestore = () => {
    setCollapsedCards({
      marma: false,
      throughbit: false,
      xzect: false,
    });
  };

  const hasCollapsed = Object.values(collapsedCards).some((val) => val);

  return (
    <section className="section experience" id="experience">
      <div className="container">
        <h2 className="section-title reveal">Work <span>Experience</span></h2>
        <p className="section-subtitle reveal">
          <a
            href="https://www.linkedin.com/in/johnbyju/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-link"
          >
            View full profile on LinkedIn <i className="bx bx-link-external"></i>
          </a>
        </p>

        <div className="experience-track">
          {/* Card 1: Marma Fintech */}
          <div className={`ide-card reveal ${collapsedCards.marma ? 'collapsed' : ''}`} data-card="marma">
            <div className="ide-titlebar">
              <div className="window-controls">
                <span
                  className="ctrl-dot close"
                  role="button"
                  aria-label="Close Marma Fintech card"
                  onClick={() => handleClose('marma')}
                ></span>
                <span className="ctrl-dot minimize"></span>
                <span className="ctrl-dot expand"></span>
              </div>
              <div className="window-title">MarmaFintech.json</div>
              <div className="window-actions-dummy"></div>
            </div>

            <div className="editor-tabs">
              <div className="tab active">
                <i className="bx bxs-file-json json-icon"></i>
                <span>MarmaFintech.json</span>
              </div>
            </div>

            <div className="code-editor-viewport">
              <div className="code-view">
                <div className="code-line">
                  <span className="line-num">1</span>
                  <span className="line-code"><span className="syntax-keyword">&#123;</span></span>
                </div>
                <div className="code-line">
                  <span className="line-num">2</span>
                  <span className="line-code">  <span className="syntax-key">"company"</span>: <span className="syntax-string">"Marma Fintech"</span>,</span>
                </div>
                <div className="code-line">
                  <span className="line-num">3</span>
                  <span className="line-code">  <span className="syntax-key">"role"</span>: <span className="syntax-string">"SDE-III (Full-time)"</span>,</span>
                </div>
                <div className="code-line">
                  <span className="line-num">4</span>
                  <span className="line-code">  <span className="syntax-key">"period"</span>: <span className="syntax-string">"Jan 2025 – Present"</span>,</span>
                </div>
                <div className="code-line">
                  <span className="line-num">5</span>
                  <span className="line-code">  <span className="syntax-key">"location"</span>: <span className="syntax-string">"Coimbatore, India (On-site)"</span>,</span>
                </div>
                <div className="code-line">
                  <span className="line-num">6</span>
                  <span className="line-code">  <span className="syntax-key">"responsibilities"</span>: [</span>
                </div>
                <div className="code-line">
                  <span className="line-num">7</span>
                  <span className="line-code">    <span className="syntax-string">"Develop & ship production features for fintech products using React"</span>,</span>
                </div>
                <div className="code-line">
                  <span className="line-num">8</span>
                  <span className="line-code">    <span className="syntax-string">"Build responsive, client-facing web apps with performance focus"</span>,</span>
                </div>
                <div className="code-line">
                  <span className="line-num">9</span>
                  <span className="line-code">    <span className="syntax-string">"Collaborate with the team on full product delivery and code reviews"</span></span>
                </div>
                <div className="code-line">
                  <span className="line-num">10</span>
                  <span className="line-code">  ],</span>
                </div>
                <div className="code-line">
                  <span className="line-num">11</span>
                  <span className="line-code">  <span className="syntax-key">"techStack"</span>: [</span>
                </div>
                <div className="code-line">
                  <span className="line-num">12</span>
                  <span className="line-code">    <span className="syntax-string">"React.js"</span>,</span>
                </div>
                <div className="code-line">
                  <span className="line-num">13</span>
                  <span className="line-code">    <span className="syntax-string">"JavaScript"</span>,</span>
                </div>
                <div className="code-line">
                  <span className="line-num">14</span>
                  <span className="line-code">    <span className="syntax-string">"TypeScript"</span>,</span>
                </div>
                <div className="code-line">
                  <span className="line-num">15</span>
                  <span className="line-code">    <span className="syntax-string">"HTML"</span>,</span>
                </div>
                <div className="code-line">
                  <span className="line-num">16</span>
                  <span className="line-code">    <span className="syntax-string">"CSS"</span></span>
                </div>
                <div className="code-line">
                  <span className="line-num">17</span>
                  <span className="line-code">  ]</span>
                </div>
                <div className="code-line">
                  <span className="line-num">18</span>
                  <span className="line-code"><span class="syntax-keyword">&#125;</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: ThroughBit */}
          <div className={`ide-card reveal ${collapsedCards.throughbit ? 'collapsed' : ''}`} data-card="throughbit">
            <div className="ide-titlebar">
              <div className="window-controls">
                <span
                  className="ctrl-dot close"
                  role="button"
                  aria-label="Close ThroughBit card"
                  onClick={() => handleClose('throughbit')}
                ></span>
                <span className="ctrl-dot minimize"></span>
                <span className="ctrl-dot expand"></span>
              </div>
              <div className="window-title">ThroughBit.md</div>
              <div className="window-actions-dummy"></div>
            </div>

            <div className="editor-tabs">
              <div className="tab active">
                <i className="bx bxs-file-md md-icon"></i>
                <span>ThroughBit.md</span>
              </div>
            </div>

            <div className="code-editor-viewport">
              <div className="code-view">
                <div className="code-line">
                  <span className="line-num">1</span>
                  <span className="line-code"><span className="syntax-keyword"># ThroughBit</span></span>
                </div>
                <div className="code-line">
                  <span className="line-num">2</span>
                  <span className="line-code"></span>
                </div>
                <div className="code-line">
                  <span className="line-num">3</span>
                  <span className="line-code"><span className="syntax-comment">## Frontend Developer (Internship)</span></span>
                </div>
                <div className="code-line">
                  <span className="line-num">4</span>
                  <span className="line-code"><span className="syntax-string">*Sep 2024 – Jan 2025*</span></span>
                </div>
                <div className="code-line">
                  <span className="line-num">5</span>
                  <span className="line-code"><span className="syntax-string">*Coimbatore, Tamil Nadu (On-site)*</span></span>
                </div>
                <div className="code-line">
                  <span className="line-num">6</span>
                  <span className="line-code"></span>
                </div>
                <div className="code-line">
                  <span className="line-num">7</span>
                  <span className="line-code"><span className="syntax-comment">### Core Contributions</span></span>
                </div>
                <div className="code-line">
                  <span className="line-num">8</span>
                  <span className="line-code">- Built and maintained client-side web applications for product features.</span>
                </div>
                <div className="code-line">
                  <span className="line-num">9</span>
                  <span className="line-code">- Implemented responsive UI components and integrated workflows.</span>
                </div>
                <div className="code-line">
                  <span className="line-num">10</span>
                  <span className="line-code">- Contributed to web application development across the stack.</span>
                </div>
                <div className="code-line">
                  <span className="line-num">11</span>
                  <span className="line-code"></span>
                </div>
                <div className="code-line">
                  <span className="line-num">12</span>
                  <span className="line-code"><span className="syntax-comment">### Key Skills Learned</span></span>
                </div>
                <div className="code-line">
                  <span className="line-num">13</span>
                  <span className="line-code">React, JavaScript, HTML, CSS, Responsive Layouts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Xzect Labs */}
          <div className={`ide-card reveal ${collapsedCards.xzect ? 'collapsed' : ''}`} data-card="xzect">
            <div className="ide-titlebar">
              <div className="window-controls">
                <span
                  className="ctrl-dot close"
                  role="button"
                  aria-label="Close Xzect Labs card"
                  onClick={() => handleClose('xzect')}
                ></span>
                <span className="ctrl-dot minimize"></span>
                <span className="ctrl-dot expand"></span>
              </div>
              <div className="window-title">XzectLabs.js</div>
              <div className="window-actions-dummy"></div>
            </div>

            <div className="editor-tabs">
              <div className="tab active">
                <i className="bx bxl-javascript js-icon"></i>
                <span>XzectLabs.js</span>
              </div>
            </div>

            <div className="code-editor-viewport">
              <div className="code-view">
                <div className="code-line">
                  <span className="line-num">1</span>
                  <span className="line-code"><span className="syntax-keyword">const</span> <span className="syntax-method">xzectLabsInternship</span> = <span className="syntax-keyword">&#123;</span></span>
                </div>
                <div className="code-line">
                  <span className="line-num">2</span>
                  <span className="line-code">  role: <span className="syntax-string">"Full-Stack Developer"</span>,</span>
                </div>
                <div className="code-line">
                  <span className="line-num">3</span>
                  <span className="line-code">  period: <span className="syntax-string">"Jun 2024 – Aug 2024"</span>,</span>
                </div>
                <div className="code-line">
                  <span className="line-num">4</span>
                  <span className="line-code">  location: <span className="syntax-string">"Delhi, India (Remote)"</span>,</span>
                </div>
                <div className="code-line">
                  <span className="line-num">5</span>
                  <span className="line-code">  technologies: <span className="syntax-keyword">[</span></span>
                </div>
                <div className="code-line">
                  <span className="line-num">6</span>
                  <span className="line-code">    <span className="syntax-string">"Node.js"</span>, <span class="syntax-string">"Express"</span>, <span class="syntax-string">"MongoDB"</span>, </span>
                </div>
                <div className="code-line">
                  <span className="line-num">7</span>
                  <span className="line-code">    <span className="syntax-string">"React"</span>, <span class="syntax-string">"JavaScript"</span>, <span class="syntax-string">"HTML"</span>, <span class="syntax-string">"CSS"</span></span>
                </div>
                <div className="code-line">
                  <span className="line-num">8</span>
                  <span className="line-code">  <span className="syntax-keyword">]</span>,</span>
                </div>
                <div className="code-line">
                  <span className="line-num">9</span>
                  <span className="line-code">  getResponsibilities: <span className="syntax-keyword">() =&gt; [</span></span>
                </div>
                <div className="code-line">
                  <span className="line-num">10</span>
                  <span className="line-code">    <span className="syntax-string">"Built backend APIs with Node, Express & MongoDB"</span>,</span>
                </div>
                <div className="code-line">
                  <span className="line-num">11</span>
                  <span className="line-code">    <span className="syntax-string">"Collaborated on client-facing UIs using React"</span>,</span>
                </div>
                <div className="code-line">
                  <span className="line-num">12</span>
                  <span className="line-code">    <span className="syntax-string">"Designed, developed & debugged full stack features"</span>,</span>
                </div>
                <div className="code-line">
                  <span className="line-num">13</span>
                  <span className="line-code">    <span className="syntax-string">"Delivered responsive mobile & web wireframe layouts"</span></span>
                </div>
                <div className="code-line">
                  <span className="line-num">14</span>
                  <span className="line-code">  <span className="syntax-keyword">]</span></span>
                </div>
                <div className="code-line">
                  <span className="line-num">15</span>
                  <span className="line-code"><span className="syntax-keyword">&#125;;</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Restore closed cards container */}
        <div className={`restore-container ${hasCollapsed ? 'show' : ''}`} id="restore-container">
          <p className="restore-text">Some workspace windows were closed.</p>
          <button className="btn btn-outline btn-sm" id="restore-btn" type="button" onClick={handleRestore}>
            <i className="bx bx-refresh"></i> Restore Windows
          </button>
        </div>
      </div>
    </section>
  );
}
