const CATEGORIES = [
  {
    title: 'Languages',
    tags: ['Python', 'C++', 'Rust', 'JavaScript', 'SQL'],
  },
  {
    title: 'Artificial Intelligence',
    tags: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'NLP', 'LLMs & AI Agents', 'RAG Systems', 'PyTorch', 'TensorFlow'],
  },
  {
    title: 'Backend Engineering',
    tags: ['FastAPI', 'Django & DRF', 'Node.js & Express', 'REST APIs', 'System Architecture', 'API Design'],
  },
  {
    title: 'Databases & DevOps',
    tags: ['PostgreSQL', 'MongoDB', 'SQLite', 'FAISS Vector DB', 'Docker', 'Git', 'Postman'],
  },
];

export default function Skills() {
  return (
    <section className="section section-alt" id="skills">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">My Stack</span>
          <h2 className="section-title">Technical Expertise</h2>
          <p className="section-sub">Tools and technologies I use to build intelligent, scalable products.</p>
        </div>

        <div className="skills-grid">
          {CATEGORIES.map((cat, i) => (
            <div key={cat.title} className={`skill-category reveal reveal-delay-${i + 1}`}>
              <div className="skill-cat-title">{cat.title}</div>
              <div className="skill-tags">
                {cat.tags.map(t => <span key={t} className="skill-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
