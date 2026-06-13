const CERTS = [
  { issuer: 'IBM', name: 'Introduction to Data Analytics', file: 'certs/cert_dataanalytics.png' },
  { issuer: 'IBM', name: 'Generative AI: Introduction & Applications', file: 'certs/cert_genai.png' },
  { issuer: 'Duke University', name: 'Introduction to Machine Learning', file: 'certs/cert_ml.png' },
  { issuer: 'Google', name: 'Foundations of Project Management', file: 'certs/cert_projectmanagement.png' },
  { issuer: 'University of Colorado', name: 'The Structured Query Language (SQL)', file: 'certs/cert_sql.png' },
  { issuer: 'Vanderbilt University', name: 'Introduction to Programming with MATLAB', file: 'certs/cert_matlab.png' },
];

export default function Certifications({ openModal }) {
  return (
    <section className="section section-alt" id="certifications">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Qualifications</span>
          <h2 className="section-title">Key Certifications</h2>
          <p className="section-sub">Click any card to verify the credential.</p>
        </div>

        <div className="certs-grid">
          {CERTS.map((c, i) => (
            <div
              key={c.name}
              className={`cert-card reveal reveal-delay-${(i % 3) + 1}`}
              onClick={() => openModal('cert', `${import.meta.env.BASE_URL}${c.file}`)}
            >
              <div>
                <div className="cert-issuer">{c.issuer}</div>
                <div className="cert-name">{c.name}</div>
              </div>
              <div className="cert-cta">View Certificate →</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
