import React from 'react';

const certsList = [
  {
    id: 'python',
    title: 'Python Certification',
    date: 'Aug 2023',
    issuer: 'GUVI Geek Networks, IITM Research Park',
    issuerUrl: 'https://www.linkedin.com/company/guviofficial/',
    desc: 'Certified Python programming training completed through GUVI (IIT Madras Research Park affiliate).',
    icon: 'bx bxs-certification',
  }
];

export default function Certificates({ onSelectCert }) {
  return (
    <section className="section certifications" id="certifications">
      <div className="container">
        <h2 className="section-title reveal">Certificates</h2>
        <p className="section-subtitle reveal">Licenses and certifications from my LinkedIn profile.</p>
        <div className="cert-grid">
          {certsList.map((cert) => (
            <article
              key={cert.id}
              className="cert-card reveal"
              style={{ cursor: 'pointer' }}
              onClick={() => onSelectCert(cert.id)}
            >
              <div className="cert-icon">
                <i className={cert.icon}></i>
              </div>
              <span className="cert-date">{cert.date}</span>
              <h3>{cert.title}</h3>
              <p className="cert-issuer">
                <a
                  href={cert.issuerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  {cert.issuer}
                </a>
              </p>
              <p className="cert-desc">{cert.desc}</p>
              <span className="cert-action">
                Click to view <i className="bx bx-zoom-in"></i>
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
