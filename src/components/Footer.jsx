export default function Footer({ openModal }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <span className="footer-logo">Animesh Yadav</span>
          <span className="footer-copy">- thanks for reaching out!</span>
          <nav className="footer-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#open-source">Open Source</a>
            <a href="#contact">Contact</a>
            <button
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: 'rgba(245,244,244,0.55)' }}
              onClick={() => openModal('resume', '')}
            >
              Resume
            </button>
          </nav>
        </div>
      </div>
    </footer>
  );
}
