export default function OpenSource({ openModal }) {
  return (
    <section className="section section-alt" id="open-source">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Open Source</span>
          <h2 className="section-title">Open Source Impact</h2>
        </div>

        <div className="os-grid">
          {/* Left — GitHub snapshot */}
          <div
            className="os-snapshot reveal reveal-delay-1"
            onClick={() => openModal('cert', '/github_profile.png')}
          >
            <img src="/github_profile.png" alt="Animesh Yadav GitHub Profile" />
            <div className="os-snapshot-overlay">
              Click to view GitHub profile snapshot
            </div>
          </div>

          {/* Right — stats */}
          <div className="reveal reveal-delay-2">
            <h3 className="os-info" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.7rem', fontWeight: 600, marginBottom: 12 }}>
              GitHub Activity Summary
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 28 }}>
              Active builder in open-source ecosystems — developing custom interpreters, OS shells,
              cognitive AI agent platforms, and medical AI research tools.
            </p>

            <div className="os-metrics">
              <div className="os-metric">
                <div className="os-metric-num">332</div>
                <div className="os-metric-label">Contributions (Last Year)</div>
              </div>
              <div className="os-metric">
                <div className="os-metric-num">6</div>
                <div className="os-metric-label">Core Pinned Repositories</div>
              </div>
            </div>

            <div className="os-highlights">
              <div className="os-highlight">
                <span>AI pipelines →</span>
                <strong>Friday, ResLSTM-BrainNet</strong>
              </div>
              <div className="os-highlight">
                <span>Systems tools →</span>
                <strong>My-Rust-Shell, Dragon (C++)</strong>
              </div>
              <div className="os-highlight">
                <span>Full-stack →</span>
                <strong>Virtual-Campus-Tour, Cold Connect</strong>
              </div>
              <div className="os-highlight">
                <span>Programming languages →</span>
                <strong>Python, C++, Rust, Java</strong>
              </div>
            </div>

            <a
              href="https://github.com/thisisanimesh01"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              View GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
