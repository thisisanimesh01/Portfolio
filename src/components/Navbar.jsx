import { useState, useEffect } from 'react';

const GH_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LINKS = ['About', 'Skills', 'Projects', 'Experience', 'Open Source', 'Contact'];

export default function Navbar({ openModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const href = (label) => `#${label.toLowerCase().replace(/ /g, '-')}`;

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <span className="nav-logo">Animesh Yadav</span>

        <ul className="nav-links">
          {LINKS.map(l => (
            <li key={l}><a href={href(l)}>{l}</a></li>
          ))}
        </ul>

        <div className="nav-cta">
          <button className="btn btn-secondary btn-sm" onClick={() => openModal('resume', '')}>
            Resume
          </button>
          <a className="btn btn-primary btn-sm" href={GH_ICON} style={{ display: 'none' }}>X</a>
        </div>

        <div
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {LINKS.map(l => (
          <a key={l} href={href(l)} onClick={() => setMenuOpen(false)}>{l}</a>
        ))}
        <button
          className="btn btn-primary btn-sm"
          onClick={() => { openModal('resume', ''); setMenuOpen(false); }}
          style={{ alignSelf: 'flex-start' }}
        >
          Resume
        </button>
      </div>
    </>
  );
}
