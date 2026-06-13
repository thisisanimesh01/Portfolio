const STRENGTHS = [
  { icon: '🧭', name: 'Leadership' },
  { icon: '👥', name: 'Team Management' },
  { icon: '💬', name: 'Communication' },
  { icon: '💡', name: 'Problem Solving' },
  { icon: '🧠', name: 'Critical Thinking' },
  { icon: '🤝', name: 'Collaboration' },
  { icon: '🔄', name: 'Adaptability' },
  { icon: '✨', name: 'Innovation' },
  { icon: '📦', name: 'Project Ownership' },
  { icon: '⏱️', name: 'Time Management' },
];

export default function Strengths() {
  return (
    <section className="section" id="strengths">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Soft Skills</span>
          <h2 className="section-title">Professional Strengths</h2>
        </div>

        <div className="strengths-grid">
          {STRENGTHS.map((s, i) => (
            <div key={s.name} className={`strength-card reveal reveal-delay-${(i % 5) + 1}`}>
              <span className="strength-icon">{s.icon}</span>
              <span className="strength-name">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
