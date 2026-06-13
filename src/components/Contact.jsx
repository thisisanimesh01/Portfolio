import { useState } from 'react';

export default function Contact({ showToast }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('thisisanimesh01@gmail.com');
    showToast('Email copied to clipboard!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real MERN app this would POST to /api/contact
    setSent(true);
    showToast('Message sent! I\'ll reply soon.');
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Collaborate</span>
          <h2 className="section-title">Let's Connect</h2>
        </div>

        <div className="contact-grid">
          {/* Left */}
          <div className="contact-info reveal">
            <h3>Direct Engineering Inquiry</h3>
            <p>
              Open to discuss AI Agent engineering positions, core backend roles,
              compiler/systems tasks, or open-source initiatives.
            </p>

            <div className="contact-detail">
              <span className="contact-detail-label">Email</span>
              <span className="contact-detail-value">thisisanimesh01@gmail.com</span>
            </div>

            <button className="copy-btn" onClick={handleCopy}>
              📋 Copy Email
            </button>

            <div style={{ marginTop: 28 }}>
              <div className="contact-detail">
                <span className="contact-detail-label">GitHub</span>
                <a
                  href="https://github.com/thisisanimesh01"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-detail-value"
                  style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}
                >
                  thisisanimesh01
                </a>
              </div>
              <div className="contact-detail">
                <span className="contact-detail-label">LinkedIn</span>
                <a
                  href="https://linkedin.com/in/animesh-yadav-39460b276"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-detail-value"
                  style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}
                >
                  animesh-yadav
                </a>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="reveal reveal-delay-2">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="cname">Name</label>
                <input
                  id="cname"
                  className="form-input"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="cemail">Email</label>
                <input
                  id="cemail"
                  className="form-input"
                  type="email"
                  placeholder="john@company.com"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="cmessage">Message</label>
                <textarea
                  id="cmessage"
                  className="form-input"
                  placeholder="Hi Animesh, let's discuss an SDE/AI role..."
                  required
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                />
              </div>
              <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>
                {sent ? '✓ Message Sent' : 'Send Message →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
