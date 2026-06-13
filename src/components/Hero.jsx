import { useEffect, useRef } from 'react';

export default function Hero({ openModal }) {
  /* ── Typed-text effect for the subtitle line ── */
  const typedRef  = useRef(null);
  const roles     = ['AI & ML Engineer', 'Backend Developer', 'Open Source Contributor', 'AI Agent Builder'];
  const roleIdx   = useRef(0);
  const charIdx   = useRef(0);
  const deleting  = useRef(false);
  const timerRef  = useRef(null);

  useEffect(() => {
    const el = typedRef.current;
    if (!el) return;

    const tick = () => {
      const current = roles[roleIdx.current];
      if (deleting.current) {
        charIdx.current -= 1;
        el.textContent = current.slice(0, charIdx.current);
        if (charIdx.current === 0) {
          deleting.current = false;
          roleIdx.current  = (roleIdx.current + 1) % roles.length;
          timerRef.current = setTimeout(tick, 500);
          return;
        }
        timerRef.current = setTimeout(tick, 45);
      } else {
        charIdx.current += 1;
        el.textContent = current.slice(0, charIdx.current);
        if (charIdx.current === current.length) {
          timerRef.current = setTimeout(() => { deleting.current = true; tick(); }, 2200);
          return;
        }
        timerRef.current = setTimeout(tick, 80);
      }
    };

    timerRef.current = setTimeout(tick, 900);
    return () => clearTimeout(timerRef.current);
  }, []); // eslint-disable-line

  return (
    <section className="hero" id="about-anchor">
      <div className="container">
        <div className="hero-inner">

          {/* ── LEFT — Text ── */}
          <div className="hero-left">
            {/* Status badge */}
            <div className="hero-badge hero-anim-1">
              <span className="hero-badge-dot" />
              Currently Building AI Agents &amp; Intelligent Systems
            </div>

            {/* Name */}
            <h1 className="hero-name hero-anim-2">
              Animesh<br />Yadav
            </h1>

            {/* Typed role */}
            <div className="hero-typed-wrap hero-anim-3">
              <span ref={typedRef} className="hero-typed" />
              <span className="hero-typed-cursor">|</span>
            </div>

            {/* Description */}
            <p className="hero-desc hero-anim-4">
              CS undergraduate specialising in AI, Machine Learning, and Backend Engineering.
              I build intelligent systems, scalable APIs, and production-grade software that creates real impact.
            </p>

            {/* CTA buttons */}
            <div className="hero-actions hero-anim-5">
              <a href="#projects" className="btn btn-primary btn-animate">View Projects</a>
              <button className="btn btn-secondary btn-animate" onClick={() => openModal('resume', '')}>Download Resume</button>
              <a href="#contact" className="btn btn-secondary btn-animate">Contact Me</a>
            </div>

            {/* Socials */}
            <div className="hero-socials hero-anim-6">
              <a href="https://github.com/thisisanimesh01" target="_blank" rel="noreferrer" className="hero-social" title="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
              <a href="https://linkedin.com/in/animesh-yadav-39460b276" target="_blank" rel="noreferrer" className="hero-social" title="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="mailto:thisisanimesh01@gmail.com" className="hero-social" title="Email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── RIGHT — Clean photo, no badge ── */}
          <div className="hero-photo-wrap hero-anim-photo">
            <div className="hero-photo-card">
              <img src="/animesh.jpg" alt="Animesh Yadav — AI Engineer & Backend Developer" />
              {/* Subtle corner accent line — purely decorative, no emoji */}
              <div className="hero-photo-accent" />
            </div>

            {/* Floating stat pill — text only, professional */}
            <div className="hero-float-pill hero-float-pill-1">
              <span className="hfp-label">Contributions</span>
              <span className="hfp-value">332+</span>
            </div>
            <div className="hero-float-pill hero-float-pill-2">
              <span className="hfp-label">Projects</span>
              <span className="hfp-value">15+</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
