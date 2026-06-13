import { useState, useEffect } from 'react';
import './index.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsStrip from './components/StatsStrip';
import About from './components/About';
import Skills from './components/Skills';
import Strengths from './components/Strengths';
import Projects from './components/Projects';
import Experience from './components/Experience';
import OpenSource from './components/OpenSource';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Toast from './components/Toast';

export default function App() {
  const [modal, setModal]   = useState({ open: false, type: '', src: '' });
  const [toast, setToast]   = useState({ show: false, msg: '' });
  const [scroll, setScroll] = useState(0);

  // Scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const el  = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setScroll(pct);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const openModal  = (type, src) => setModal({ open: true, type, src });
  const closeModal = () => setModal({ open: false, type: '', src: '' });

  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 2500);
  };

  return (
    <>
      {/* Scroll progress */}
      <div className="scroll-bar" style={{ width: `${scroll}%` }} />

      <Navbar openModal={openModal} />

      <main>
        <Hero openModal={openModal} />
        <StatsStrip />
        <About />
        <Skills />
        <Strengths />
        <Projects />
        <Experience openModal={openModal} />
        <OpenSource openModal={openModal} />
        <Achievements />
        <Certifications openModal={openModal} />
        <Contact showToast={showToast} />
      </main>

      <Footer openModal={openModal} />

      <Modal modal={modal} closeModal={closeModal} />
      <Toast toast={toast} />
    </>
  );
}
