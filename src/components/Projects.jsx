import { useState } from 'react';

const GH_SVG = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const EXT_SVG = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const PROJECTS = [
  {
    num: '01',
    flag: 'Flagship',
    title: 'Friday',
    subtitle: 'Personal AI Assistant',
    category: 'AI Agent Engineering',
    problem: 'Existing personal assistants lack persistent contextual memory and the ability to seamlessly invoke external tools based on user intent — making them stateless and ultimately disposable.',
    solution: 'Built a fully autonomous conversational AI agent with a SQLite-backed memory graph, modular plugin hooks, and LLM-driven intent routing — so every conversation builds on prior context.',
    architecture: ['User Input', 'Intent Router', 'Memory Lookup (SQLite)', 'Plugin Dispatch', 'LLM Reasoning', 'Response + Memory Write'],
    features: [
      'Persistent SQLite memory system',
      'Context-aware multi-turn conversations',
      'Tool calling & plugin architecture',
      'Intelligent task execution engine',
      'Reminder automation system',
      'REST API integrations (weather, news, maps)',
      'Agent reasoning workflows',
    ],
    challenges: 'Designing a memory schema that supports fuzzy relevance retrieval across long conversation histories without degrading LLM context window efficiency.',
    stack: ['Python', 'SQLite', 'LLMs', 'REST APIs', 'Plugin Architecture'],
    impact: 'Automated 90% of recurring daily tasks. Context queries resolve in under 180ms.',
    link: 'https://github.com/thisisanimesh01/Friday',
  },
  {
    num: '02',
    flag: 'LLM Application',
    title: 'Legal Document Assistant',
    subtitle: 'AI-Powered Legal Analysis Platform',
    category: 'LLM Application',
    problem: 'Legal professionals and students spend excessive time manually reading through dense PDF documents to extract key clauses, summaries, or answers to specific legal questions.',
    solution: 'Built a Django web platform that parses uploaded legal PDFs, extracts structured text, and routes queries to an OpenRouter-backed LLM for summarisation and context-aware Q&A.',
    architecture: ['Document Upload', 'Text Extraction (PyPDF2)', 'LLM Processing (OpenRouter)', 'Summary Generation', 'Q&A Interface'],
    features: [
      'PDF upload and parsing pipeline',
      'Legal document summarisation',
      'Context-aware Q&A over documents',
      'OpenRouter LLM integration',
      'Structured document parsing',
      'Sub-second AI response delivery',
    ],
    challenges: 'Handling large PDFs that exceed token limits required intelligent chunking and context window management without losing cross-paragraph semantics.',
    stack: ['Django', 'Python', 'OpenRouter', 'PyPDF2', 'HTML', 'CSS'],
    impact: 'Reduces manual document review time by ~70%. Suitable for legal research and contract analysis workflows.',
    futureScope: ['Clause detection & risk flagging', 'Multi-language document support', 'Voice query interface', 'Cloud deployment pipeline'],
    link: 'https://github.com/thisisanimesh01',
  },
  {
    num: '03',
    flag: 'RAG System',
    title: 'Sports Intelligence Chatbot',
    subtitle: 'Retrieval-Augmented Generation System',
    category: 'Retrieval-Augmented Generation',
    problem: 'General-purpose LLMs hallucinate sports facts and lack up-to-date knowledge about game rules, player stats, and event history — making them unreliable for sports queries.',
    solution: 'Engineered a RAG pipeline that grounds all LLM responses against a curated FAISS vector knowledge base, ensuring every answer is semantically retrieved before generation.',
    architecture: ['Knowledge Base Ingestion', 'Embedding Generation (HuggingFace)', 'FAISS Vector Store', 'Query Classification', 'Semantic Retrieval', 'LLM Response Generation'],
    features: [
      'Query intent classification',
      'FAISS vector database retrieval',
      'Semantic similarity search',
      'Local LLM integration (Hugging Face)',
      'Knowledge-grounded response generation',
      'Streamlit interactive interface',
    ],
    challenges: 'Tuning embedding chunk size and overlap to maximise retrieval recall without injecting irrelevant context that degrades LLM output quality.',
    stack: ['LangChain', 'HuggingFace', 'FAISS', 'Streamlit', 'Python'],
    impact: 'Eliminates hallucination on domain-specific sports queries. Retrieval latency under 120ms per query.',
    link: 'https://github.com/thisisanimesh01',
  },
  {
    num: '04',
    flag: 'Backend Engineering',
    title: 'ColdConnect',
    subtitle: 'Cold Outreach Automation Platform',
    category: 'Backend Engineering',
    problem: 'Manual cold outreach is time-consuming and inconsistent — personalising emails, attaching the right resume, and tracking responses requires switching between multiple tools.',
    solution: 'Built a full-stack automation platform with a React frontend, Node.js orchestration layer, and a FastAPI service that interfaces with the Gmail API to send personalised, tracked emails.',
    architecture: ['React Frontend', 'Node.js Backend', 'FastAPI Service', 'Gmail API', 'Open Tracking Pixel', 'Analytics Dashboard'],
    features: [
      'Dynamic personalised email generation',
      'Automated resume selection & attachment',
      'Gmail API OAuth integration',
      'Email open tracking (pixel-based)',
      'Activity logging & analytics',
      'Campaign management dashboard',
    ],
    challenges: 'Implementing reliable open-tracking across email clients that aggressively strip tracking pixels required a fallback redirect-link strategy.',
    stack: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', 'FastAPI', 'Gmail API'],
    impact: 'Reduced outreach cycle time from 45 minutes to under 5 minutes per batch campaign.',
    link: 'https://github.com/thisisanimesh01',
  },
  {
    num: '05',
    flag: 'Machine Learning',
    title: 'ResLSTM-BrainNet',
    subtitle: 'Brain Tumor Detection via MRI',
    category: 'Deep Learning · Medical AI',
    problem: 'Manual radiologist inspection of MRI brain scans is slow, costly, and subject to diagnostic inconsistency — delaying treatment for critical cases.',
    solution: 'Designed a hybrid deep-learning model combining ResNet50 spatial feature extraction with LSTM temporal sequence modelling across MRI scan slices, achieving 99%+ accuracy with explainable Grad-CAM heatmaps.',
    architecture: ['MRI Scan Input', 'ResNet50 Feature Extraction', 'LSTM Sequence Modelling', 'Classification Head', 'Grad-CAM Heatmap Output'],
    features: [
      'Medical MRI image classification',
      'ResNet50 spatial feature extraction',
      'LSTM temporal sequence modelling',
      'Explainable AI with Grad-CAM visualisation',
      '99%+ classification accuracy',
      'End-to-end deep learning pipeline',
    ],
    challenges: 'Preventing overfitting on a limited clinical dataset required aggressive augmentation strategies and careful regularisation of the LSTM layers.',
    stack: ['Python', 'PyTorch', 'ResNet50', 'LSTM', 'Grad-CAM', 'NumPy'],
    impact: '99%+ test accuracy on MRI classification. Grad-CAM overlays provide clinical interpretability for radiologist review.',
    link: 'https://github.com/thisisanimesh01/ResLSTM-BrainNet',
  },
  {
    num: '06',
    flag: 'Compiler Design',
    title: 'Dragon',
    subtitle: 'Custom Programming Language',
    category: 'Compiler Engineering',
    problem: 'Understanding compiler internals — lexical analysis, parsing strategies, AST construction, and interpreter design — requires hands-on implementation beyond textbook theory.',
    solution: 'Designed and built Dragon from scratch in C++ with a hand-written lexer, recursive-descent parser, AST, and tree-walking interpreter supporting variables, control flow, and expression evaluation.',
    architecture: ['Source Code Input', 'Lexer (Tokenisation)', 'Parser (Recursive Descent)', 'AST Generation', 'Interpreter (Tree-Walker)', 'Output'],
    features: [
      'Hand-written lexical analyser',
      'Recursive-descent parser',
      'Abstract Syntax Tree (AST) generation',
      'Tree-walking interpreter',
      'Variable scoping & control flow',
      'Full arithmetic and logical expression evaluation',
    ],
    challenges: 'Implementing operator precedence correctly in a recursive-descent parser without grammar ambiguity required careful grammar factorisation.',
    stack: ['C++', 'Compiler Design', 'Lexer', 'Parser', 'AST'],
    impact: 'Demonstrates deep CS fundamentals. Full expression evaluation with correct precedence and scoping.',
    link: 'https://github.com/thisisanimesh01',
  },
  {
    num: '07',
    flag: 'Systems Programming',
    title: 'Rust Shell',
    subtitle: 'Unix Shell from Scratch',
    category: 'Systems Programming',
    problem: 'Learning systems-level programming requires working directly with OS primitives — process creation, signal handling, and I/O — which are abstracted away by modern frameworks.',
    solution: 'Built a Unix-like shell in Rust with custom command parsing, process spawning via system calls, I/O redirection, piping, and built-in command handling.',
    architecture: ['REPL Input Loop', 'Command Parser / Tokeniser', 'Built-in Command Handler', 'Process Spawner (fork/exec)', 'I/O Pipe Management', 'Signal Handling'],
    features: [
      'Custom command tokenisation & parsing',
      'Process spawning via system calls',
      'I/O piping and redirection',
      'Built-in commands (cd, exit, help)',
      'Signal handling (Ctrl+C, Ctrl+Z)',
      'Zero-dependency Rust implementation',
    ],
    challenges: 'Managing pipe file descriptors correctly across forked child processes without resource leaks required careful fd duplication and close sequencing.',
    stack: ['Rust', 'POSIX', 'Systems Programming', 'Process Management'],
    impact: 'Full POSIX-compatible shell feature parity. Built in pure Rust with zero external dependencies.',
    link: 'https://github.com/thisisanimesh01/My-Rust-Shell',
  },
];

const CATEGORY_COLORS = {
  'AI Agent Engineering':         { bg: '#f0fdf4', border: '#bbf7d0', text: '#15803d' },
  'LLM Application':              { bg: '#eff6ff', border: '#bfdbfe', text: '#1d4ed8' },
  'Retrieval-Augmented Generation':{ bg: '#fdf4ff', border: '#e9d5ff', text: '#7e22ce' },
  'Backend Engineering':          { bg: '#fff7ed', border: '#fed7aa', text: '#c2410c' },
  'Deep Learning · Medical AI':   { bg: '#fef2f2', border: '#fecaca', text: '#b91c1c' },
  'Compiler Engineering':         { bg: '#fafaf9', border: '#d6d3d1', text: '#44403c' },
  'Systems Programming':          { bg: '#f0f9ff', border: '#bae6fd', text: '#0369a1' },
};

function ArchFlow({ steps }) {
  return (
    <div className="arch-flow">
      {steps.map((step, i) => (
        <div key={i} className="arch-flow-step-wrap">
          <div className="arch-flow-step">{step}</div>
          {i < steps.length - 1 && (
            <svg className="arch-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

function ProjectCard({ p, index }) {
  const [expanded, setExpanded] = useState(false);
  const catStyle = CATEGORY_COLORS[p.category] || { bg: '#f5f4f4', border: '#d6d6d6', text: '#555' };
  const isFlagship = p.flag === 'Flagship';

  return (
    <article
      className={`pcs-card reveal reveal-delay-${(index % 3) + 1} ${isFlagship ? 'pcs-flagship' : ''}`}
    >
      {/* ── TOP ROW ── */}
      <div className="pcs-top">
        <div className="pcs-meta">
          <span className="pcs-num">{p.num}</span>
          {isFlagship && <span className="pcs-flagship-badge">Flagship Project</span>}
        </div>
        <span
          className="pcs-category"
          style={{ background: catStyle.bg, border: `1px solid ${catStyle.border}`, color: catStyle.text }}
        >
          {p.category}
        </span>
      </div>

      {/* ── TITLE ── */}
      <div className="pcs-title-row">
        <div>
          <h3 className="pcs-title">{p.title}</h3>
          <p className="pcs-subtitle">{p.subtitle}</p>
        </div>
        <a
          href={p.link}
          target="_blank"
          rel="noreferrer"
          className="pcs-gh-link"
          title="View on GitHub"
          onClick={e => e.stopPropagation()}
        >
          {GH_SVG}
          <span>GitHub</span>
          {EXT_SVG}
        </a>
      </div>

      {/* ── PROBLEM / SOLUTION ── */}
      <div className="pcs-ps-grid">
        <div className="pcs-ps-block">
          <div className="pcs-ps-label">Problem</div>
          <p className="pcs-ps-text">{p.problem}</p>
        </div>
        <div className="pcs-ps-block">
          <div className="pcs-ps-label">Solution</div>
          <p className="pcs-ps-text">{p.solution}</p>
        </div>
      </div>

      {/* ── ARCHITECTURE FLOW ── */}
      <div className="pcs-section">
        <div className="pcs-section-label">Architecture</div>
        <ArchFlow steps={p.architecture} />
      </div>

      {/* ── TECH STACK ── */}
      <div className="pcs-section">
        <div className="pcs-section-label">Stack</div>
        <div className="pcs-stack">
          {p.stack.map(t => <span key={t} className="pcs-stack-tag">{t}</span>)}
        </div>
      </div>

      {/* ── EXPANDABLE DETAIL ── */}
      <button
        className="pcs-expand-btn"
        onClick={() => setExpanded(e => !e)}
      >
        <span>{expanded ? 'Hide details' : 'View full case study'}</span>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s' }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {expanded && (
        <div className="pcs-expanded">
          {/* Features */}
          <div className="pcs-section">
            <div className="pcs-section-label">Key Features</div>
            <ul className="pcs-features">
              {p.features.map(f => (
                <li key={f} className="pcs-feature-item">
                  <span className="pcs-feature-bullet" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Engineering Challenge */}
          <div className="pcs-section">
            <div className="pcs-section-label">Engineering Challenge</div>
            <div className="pcs-challenge-box">{p.challenges}</div>
          </div>

          {/* Future scope (optional) */}
          {p.futureScope && (
            <div className="pcs-section">
              <div className="pcs-section-label">Future Scope</div>
              <div className="pcs-stack" style={{ gap: 8 }}>
                {p.futureScope.map(f => <span key={f} className="pcs-scope-tag">{f}</span>)}
              </div>
            </div>
          )}

          {/* Impact */}
          <div className="pcs-impact-row">
            <div className="pcs-impact-inner">
              <div className="pcs-section-label" style={{ marginBottom: 6 }}>Results & Impact</div>
              <p className="pcs-impact-text">{p.impact}</p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default function Projects() {
  return (
    <section className="section section-alt" id="projects">
      <div className="container">
        {/* Section header */}
        <div className="section-header reveal">
          <span className="section-label">Case Studies</span>
          <h2 className="section-title">Engineering Portfolio</h2>
          <p className="section-sub">
            Production-grade systems across AI agents, LLM applications, RAG pipelines,
            backend engineering, medical ML, compiler design, and systems programming.
          </p>
        </div>

        {/* Filter chips */}
        <div className="pcs-filter-row reveal">
          {['All', 'AI / LLM', 'Backend', 'ML / CV', 'Systems'].map(f => (
            <span key={f} className="pcs-filter-chip">{f}</span>
          ))}
        </div>

        {/* Project list */}
        <div className="pcs-list">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.num} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
