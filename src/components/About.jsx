const CARDS = [
  {
    icon: '🧠',
    title: 'AI Systems Builder',
    desc: 'Designing memory-enabled LLM agents, RAG pipelines, and neural network architectures for real-world applications.',
  },
  {
    icon: '⚙️',
    title: 'Backend Engineer',
    desc: 'Building scalable REST APIs with Django, FastAPI, and Node.js — with a focus on performance and clean architecture.',
  },
  {
    icon: '🔬',
    title: 'Systems Programmer',
    desc: 'Crafting interpreters, custom shells, and low-level tools in C++ and Rust to understand computing from first principles.',
  },
  {
    icon: '🌐',
    title: 'Open Source Contributor',
    desc: '332+ GitHub contributions in the last year, actively maintaining repositories across AI, systems, and web stacks.',
  },
];

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Left — narrative */}
          <div>
            <div className="reveal">
              <span className="section-label">About Me</span>
              <h2 className="section-title">An Engineering<br />Perspective</h2>
            </div>

            <div className="about-text reveal reveal-delay-1">
              <p>
                I'm Animesh Yadav, an AI &amp; ML undergraduate focused on building intelligent
                software systems, AI-powered products, and scalable backend solutions.
              </p>
              <p>
                I specialise in bridging the gap between machine learning models and production
                software — designing LLM memory systems, training CNN-LSTM networks, constructing
                custom language interpreters, and optimising transactional backends.
              </p>
              <p>
                My goal is to work at the intersection of research and engineering, building
                products that are both technically rigorous and genuinely useful.
              </p>
            </div>

            <div className="about-chips reveal reveal-delay-2">
              {['Python', 'C++', 'Rust', 'FastAPI', 'Django', 'PyTorch', 'LLMs', 'RAG', 'PostgreSQL', 'Docker'].map(c => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
          </div>

          {/* Right — cards */}
          <div className="about-cards">
            {CARDS.map((c, i) => (
              <div key={c.title} className={`about-card reveal reveal-delay-${i + 1}`}>
                <div className="about-card-title">
                  <span className="about-card-icon">{c.icon}</span>
                  {c.title}
                </div>
                <p className="about-card-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
