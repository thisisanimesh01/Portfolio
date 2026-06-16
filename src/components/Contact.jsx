/**
 * Contact.jsx — Fully functional contact section with EmailJS integration.
 *
 * HOW EMAILJS WORKS (no backend required):
 * 1. EmailJS receives the form data from the browser directly.
 * 2. It uses your Service (linked to Gmail/Outlook/etc) and Template to
 *    construct and send the email on your behalf.
 * 3. All credentials are stored in .env and exposed only as VITE_ prefixed
 *    variables, which are baked into the client bundle at build time.
 *    → Never hardcode keys in source files.
 *
 * REQUIRED ENV VARIABLES (see .env file):
 *   VITE_EMAILJS_SERVICE_ID   — from EmailJS dashboard → Email Services
 *   VITE_EMAILJS_TEMPLATE_ID  — from EmailJS dashboard → Email Templates
 *   VITE_EMAILJS_PUBLIC_KEY   — from EmailJS dashboard → Account → Public Key
 *
 * DEBUG CHECKLIST:
 *   1. Open browser DevTools → Console for step-by-step logs prefixed [Contact]
 *   2. Open Network tab and filter "api.emailjs.com" to confirm the HTTP request
 *   3. If you see "EmailJS not configured" the .env values are still placeholders
 */

import { useState, useRef, useCallback } from 'react';
import emailjs from '@emailjs/browser';

/* ── EmailJS configuration — read from .env at build time via Vite ── */
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/* Detect placeholder / missing values */
const PLACEHOLDER_VALUES = ['your_service_id_here', 'your_template_id_here', 'your_public_key_here', '', undefined];
const IS_EMAILJS_CONFIGURED =
  !PLACEHOLDER_VALUES.includes(EMAILJS_SERVICE_ID)  &&
  !PLACEHOLDER_VALUES.includes(EMAILJS_TEMPLATE_ID) &&
  !PLACEHOLDER_VALUES.includes(EMAILJS_PUBLIC_KEY);

/* Log config status once on module load so it's visible in DevTools immediately */
if (IS_EMAILJS_CONFIGURED) {
  console.log('[Contact] ✅ EmailJS configured. Service:', EMAILJS_SERVICE_ID);
} else {
  console.warn(
    '[Contact] ⚠️  EmailJS NOT configured.',
    '\n  VITE_EMAILJS_SERVICE_ID  =', EMAILJS_SERVICE_ID,
    '\n  VITE_EMAILJS_TEMPLATE_ID =', EMAILJS_TEMPLATE_ID,
    '\n  VITE_EMAILJS_PUBLIC_KEY  =', EMAILJS_PUBLIC_KEY,
    '\n  → Fill in real values in the .env file, then restart the dev server.'
  );
}

/* ── Spam-protection: max 3 submissions per 10 minutes ── */
const RATE_LIMIT_MAX       = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const submissionLog = [];
function isRateLimited() {
  const now = Date.now();
  while (submissionLog.length && now - submissionLog[0] > RATE_LIMIT_WINDOW_MS) {
    submissionLog.shift();
  }
  return submissionLog.length >= RATE_LIMIT_MAX;
}
function recordSubmission() {
  submissionLog.push(Date.now());
}

/** Email format validator */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/* ── Status machine ── */
const STATUS = { IDLE: 'idle', SENDING: 'sending', SUCCESS: 'success', ERROR: 'error' };

/* Fallback mailto link shown when EmailJS is not yet configured */
const MAILTO_FALLBACK =
  'mailto:thisisanimesh01@gmail.com?subject=Portfolio%20Inquiry';

export default function Contact({ showToast }) {
  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus]   = useState(STATUS.IDLE);
  const [errors, setErrors]   = useState({});
  const [copyLabel, setCopyLabel] = useState('📋 Copy Email');

  const formRef = useRef(null);

  /* ── Field change ── */
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  }, []);

  /* ── Validation ── */
  function validate() {
    const errs = {};
    if (!form.name.trim())              errs.name    = 'Name is required.';
    if (!form.email.trim())             errs.email   = 'Email is required.';
    else if (!isValidEmail(form.email)) errs.email   = 'Please enter a valid email address.';
    if (!form.message.trim())           errs.message = 'Message is required.';
    return errs;
  }

  /* ── Copy email ── */
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText('thisisanimesh01@gmail.com')
      .then(() => {
        setCopyLabel('✓ Copied!');
        showToast('Email copied to clipboard!');
        setTimeout(() => setCopyLabel('📋 Copy Email'), 2000);
      })
      .catch(() => showToast('Could not copy — please copy manually.'));
  }, [showToast]);

  /* ── Form submit ── */
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    console.log('[Contact] 🔵 handleSubmit fired');

    /* ── Honeypot check ── */
    if (honeypot) {
      console.warn('[Contact] 🤖 Bot detected via honeypot — aborting.');
      return;
    }

    /* ── Rate limit ── */
    if (isRateLimited()) {
      console.warn('[Contact] ⏱️  Rate limited.');
      showToast('Too many messages. Please wait a few minutes and try again.');
      return;
    }

    /* ── Client-side validation ── */
    const errs = validate();
    if (Object.keys(errs).length) {
      console.log('[Contact] ❌ Validation failed:', errs);
      setErrors(errs);
      return;
    }
    console.log('[Contact] ✅ Validation passed.');

    /* ── Guard: EmailJS not configured ── */
    if (!IS_EMAILJS_CONFIGURED) {
      console.error(
        '[Contact] ❌ EmailJS credentials are missing or still set to placeholder values.',
        '\nFix: Open .env, fill in real VITE_EMAILJS_* values, restart "npm run dev".'
      );
      /* Still show the error banner + toast so the visitor knows what happened */
      setStatus(STATUS.ERROR);
      showToast('Contact form is not configured yet.');
      setTimeout(() => setStatus(STATUS.IDLE), 6000);
      return;
    }

    /* ── Send via EmailJS ── */
    setStatus(STATUS.SENDING);
    console.log('[Contact] 📤 Sending via EmailJS...',
      { service: EMAILJS_SERVICE_ID, template: EMAILJS_TEMPLATE_ID });

    try {
      /*
       * emailjs.sendForm() reads <input name="..."> values directly from the DOM.
       * The name attributes — "name", "email", "message" — must exactly match the
       * template variable names: {{name}}, {{email}}, {{message}}
       */
      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      console.log('[Contact] ✅ EmailJS success:', result.status, result.text);
      recordSubmission();
      setStatus(STATUS.SUCCESS);
      setForm({ name: '', email: '', message: '' });
      setErrors({});
      showToast('✓ Message sent successfully!');
      setTimeout(() => setStatus(STATUS.IDLE), 6000);

    } catch (err) {
      console.error('[Contact] ❌ EmailJS error:', err);
      setStatus(STATUS.ERROR);
      showToast('✗ Failed to send. Please try emailing directly.');
      setTimeout(() => setStatus(STATUS.IDLE), 6000);
    }
  }, [form, honeypot, showToast]);

  const isSending = status === STATUS.SENDING;

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Collaborate</span>
          <h2 className="section-title">Let's Connect</h2>
          <p className="section-sub">
            Open to AI engineering roles, backend positions, systems work, and
            open-source collaboration. Drop me a message — I reply within 24 hours.
          </p>
        </div>

        <div className="contact-grid">

          {/* ── LEFT: Contact info ── */}
          <div className="contact-info reveal">
            <h3>Direct Engineering Inquiry</h3>
            <p>
              Open to discuss AI Agent engineering positions, core backend roles,
              compiler/systems tasks, or open-source initiatives.
            </p>

            <div className="contact-detail">
              <span className="contact-detail-label">Email</span>
              <a
                href="mailto:thisisanimesh01@gmail.com"
                className="contact-detail-value contact-email-link"
              >
                thisisanimesh01@gmail.com
              </a>
            </div>

            <button
              className="copy-btn"
              onClick={handleCopy}
              aria-label="Copy email address to clipboard"
              type="button"
            >
              {copyLabel}
            </button>

            <div className="contact-socials">
              {/* GitHub */}
              <a
                href="https://github.com/thisisanimesh01"
                target="_blank"
                rel="noreferrer noopener"
                className="contact-social-card"
                aria-label="View GitHub profile"
              >
                <span className="contact-social-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.185 6.839 9.504.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.203 22 16.447 22 12.021 22 6.484 17.522 2 12 2z"/>
                  </svg>
                </span>
                <span className="contact-social-info">
                  <span className="contact-social-label">GitHub</span>
                  <span className="contact-social-handle">thisisanimesh01</span>
                </span>
                <span className="contact-social-arrow">→</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/animesh-yadav-39460b276"
                target="_blank"
                rel="noreferrer noopener"
                className="contact-social-card"
                aria-label="View LinkedIn profile"
              >
                <span className="contact-social-icon contact-social-icon--linkedin">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </span>
                <span className="contact-social-info">
                  <span className="contact-social-label">LinkedIn</span>
                  <span className="contact-social-handle">animesh-yadav</span>
                </span>
                <span className="contact-social-arrow">→</span>
              </a>
            </div>
          </div>

          {/* ── RIGHT: Contact Form ── */}
          <div className="reveal reveal-delay-2">

            {/* ── EmailJS not configured warning ── */}
            {!IS_EMAILJS_CONFIGURED && (
              <div className="contact-feedback contact-feedback--warning" role="note">
                <span className="contact-feedback-icon">⚠️</span>
                <div>
                  <p className="contact-feedback-title">Email delivery not yet active</p>
                  <p className="contact-feedback-sub">
                    Add your EmailJS credentials to <code>.env</code> and restart the dev server.
                    Until then, use the{' '}
                    <a href={MAILTO_FALLBACK} className="contact-fallback-link">
                      direct email link
                    </a>{' '}
                    to reach me.
                  </p>
                </div>
              </div>
            )}

            {/* ── Success banner ── */}
            {status === STATUS.SUCCESS && (
              <div className="contact-feedback contact-feedback--success" role="alert" aria-live="polite">
                <span className="contact-feedback-icon">✓</span>
                <div>
                  <p className="contact-feedback-title">Message sent successfully.</p>
                  <p className="contact-feedback-sub">I'll get back to you soon.</p>
                </div>
              </div>
            )}

            {/* ── Error banner ── */}
            {status === STATUS.ERROR && (
              <div className="contact-feedback contact-feedback--error" role="alert" aria-live="polite">
                <span className="contact-feedback-icon">✗</span>
                <div>
                  <p className="contact-feedback-title">Failed to send message.</p>
                  <p className="contact-feedback-sub">
                    {!IS_EMAILJS_CONFIGURED
                      ? 'EmailJS credentials are missing. See the README for setup steps.'
                      : 'Something went wrong. '}
                    <a href={MAILTO_FALLBACK} className="contact-fallback-link">
                      Email me directly →
                    </a>
                  </p>
                </div>
              </div>
            )}

            <form
              ref={formRef}
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
            >
              {/*
                ── HONEYPOT ──
                Invisible to humans, only bots auto-fill it.
                Submissions with this field filled are silently discarded.
              */}
              <div
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  top: '-9999px',
                  opacity: 0,
                  pointerEvents: 'none',
                  height: 0,
                  overflow: 'hidden',
                }}
                aria-hidden="true"
              >
                <label htmlFor="contact-website">Website (leave blank)</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={e => setHoneypot(e.target.value)}
                />
              </div>

              {/* Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="cname">
                  Name <span className="form-required" aria-hidden="true">*</span>
                </label>
                <input
                  id="cname"
                  name="name"
                  className={`form-input${errors.name ? ' form-input--error' : ''}`}
                  type="text"
                  placeholder="Jane Smith"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={isSending}
                  aria-describedby={errors.name ? 'cname-error' : undefined}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <span id="cname-error" className="form-error" role="alert">
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label" htmlFor="cemail">
                  Email <span className="form-required" aria-hidden="true">*</span>
                </label>
                <input
                  id="cemail"
                  name="email"
                  className={`form-input${errors.email ? ' form-input--error' : ''}`}
                  type="email"
                  placeholder="jane@company.com"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={isSending}
                  aria-describedby={errors.email ? 'cemail-error' : undefined}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <span id="cemail-error" className="form-error" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="form-group">
                <label className="form-label" htmlFor="cmessage">
                  Message <span className="form-required" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="cmessage"
                  name="message"
                  className={`form-input${errors.message ? ' form-input--error' : ''}`}
                  placeholder="Hi Animesh, I'd like to discuss an SDE / AI role at our company..."
                  value={form.message}
                  onChange={handleChange}
                  disabled={isSending}
                  aria-describedby={errors.message ? 'cmessage-error' : undefined}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <span id="cmessage-error" className="form-error" role="alert">
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit */}
              <button
                className="btn btn-primary contact-submit-btn"
                type="submit"
                disabled={isSending}
                aria-label={isSending ? 'Sending message, please wait' : 'Send message'}
              >
                {isSending ? (
                  <>
                    <span className="contact-spinner" aria-hidden="true" />
                    Sending message...
                  </>
                ) : status === STATUS.SUCCESS ? (
                  '✓ Message Sent'
                ) : (
                  'Send Message →'
                )}
              </button>

              {/* Fallback mailto — always visible as a secondary option */}
              <p className="contact-mailto-fallback">
                Prefer email?{' '}
                <a href={MAILTO_FALLBACK} className="contact-fallback-link">
                  Open in mail client →
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
