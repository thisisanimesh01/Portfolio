export default function Modal({ modal, closeModal }) {
  const { open, type, src } = modal;

  // Close on overlay click
  const onOverlay = (e) => { if (e.target === e.currentTarget) closeModal(); };

  if (type === 'resume') {
    return (
      <div className={`modal-overlay ${open ? 'open' : ''}`} onClick={onOverlay}>
        <div className="modal-box">
          <div className="modal-header">
            <span className="modal-title">Select Resume Track</span>
            <button className="modal-close" onClick={closeModal}>✕</button>
          </div>
          <div className="modal-body">
            <div className="resume-options">
              <a
                className="resume-option"
                href={`${import.meta.env.BASE_URL}resume_aiml.png`}
                download="Animesh_Yadav_Resume_AIML.png"
              >
                <span className="resume-option-icon">🧠</span>
                <span className="resume-option-title">AI &amp; Machine Learning</span>
                <span className="resume-option-desc">
                  Focuses on LLMs, RAG, neural networks, PyTorch, and AI pipelines.
                </span>
                <span className="resume-option-action">Download Resume →</span>
              </a>
              <a
                className="resume-option"
                href={`${import.meta.env.BASE_URL}resume_backend.png`}
                download="Animesh_Yadav_Resume_Backend.png"
              >
                <span className="resume-option-icon">⚙️</span>
                <span className="resume-option-title">Backend &amp; Systems</span>
                <span className="resume-option-desc">
                  Focuses on Django, FastAPI, C++ compilers, Rust shells, and databases.
                </span>
                <span className="resume-option-action">Download Resume →</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'cert') {
    return (
      <div className={`modal-overlay ${open ? 'open' : ''}`} onClick={onOverlay}>
        <div className="modal-box" style={{ maxWidth: 760 }}>
          <div className="modal-header">
            <span className="modal-title">Credential Verification</span>
            <button className="modal-close" onClick={closeModal}>✕</button>
          </div>
          <div className="modal-body">
            <img src={src} alt="Certificate" />
          </div>
        </div>
      </div>
    );
  }

  return null;
}
