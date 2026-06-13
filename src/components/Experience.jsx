const EXPERIENCE = [
  {
    role: 'Software Development Engineer Intern',
    company: 'Bluestock Fintech',
    date: 'Jun 2025 – Jul 2025',
    points: [
      'Developed IPO platform using Django, DRF, and PostgreSQL, scaling system performance.',
      'Built scalable backend services optimizing thread bounds and asynchronous workflows.',
      'Developed optimised REST APIs, reducing response latency by 20–30% under load.',
      'Improved overall response performance and cleaned up redundant SQL queries.',
    ],
    cert: 'certs/cert_bluestock.png',
    certLabel: 'Verify Internship Certificate',
  },
  {
    role: 'Freelance Web Developer',
    company: 'Remote',
    date: 'May 2024 – Jul 2024',
    points: [
      'Built responsive websites utilising HTML, CSS, JavaScript, and Bootstrap.',
      'Focused on UI/UX, SEO optimisation, and cross-browser compatibility.',
      'Delivered client-focused solutions increasing organic traffic.',
    ],
    cert: null,
  },
];

export default function Experience({ openModal }) {
  return (
    <section className="section" id="experience">
      <div className="container" style={{ maxWidth: 800 }}>
        <div className="section-header reveal">
          <span className="section-label">Timeline</span>
          <h2 className="section-title">Career History</h2>
        </div>

        <div className="timeline">
          {EXPERIENCE.map((e, i) => (
            <div key={e.role} className={`timeline-item reveal reveal-delay-${i + 1}`}>
              <div className="timeline-dot" />
              <div className="timeline-meta">
                <span className="timeline-role">{e.role}</span>
                <span className="timeline-company">@ {e.company}</span>
                <span className="timeline-date">{e.date}</span>
              </div>
              <div className="timeline-points">
                {e.points.map(p => <div key={p} className="timeline-point">{p}</div>)}
              </div>
              {e.cert && (
                <button
                  className="timeline-cert-btn"
                  onClick={() => openModal('cert', `${import.meta.env.BASE_URL}${e.cert}`)}
                >
                  🎓 {e.certLabel}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
