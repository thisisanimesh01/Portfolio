const ACHIEVEMENTS = [
  {
    year: 'July 2025',
    title: 'Bluestock Internship Completion',
    desc: 'Successfully completed SDE internship at Bluestock Fintech, optimizing Django REST APIs and reducing database query latency by 20–30%.',
  },
  {
    year: '2025',
    title: 'Kraf Think 2025 Hackathon',
    desc: 'Participated in building responsive tools and pipelines under constraints at the Kraf Think 2025 hackathon.',
  },
  {
    year: '2024',
    title: 'AI For Impact APAC Hackathon',
    desc: 'Engineered socially beneficial machine learning applications for community development in the APAC region.',
  },
  {
    year: '2024',
    title: 'NITS Hacks — NIT Silchar',
    desc: 'Created functional SDE prototypes under tight deadlines at the national-level NIT Silchar hackathon.',
  },
  {
    year: '2024 – Present',
    title: 'Open Source Contributor & Team Lead',
    desc: 'Led development squads (Team InnovateX) and contributed modules across active open-source software stacks.',
  },
];

export default function Achievements() {
  return (
    <section className="section" id="achievements">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Milestones</span>
          <h2 className="section-title">Achievements</h2>
        </div>

        <div className="achievements-grid">
          {ACHIEVEMENTS.map((a, i) => (
            <div key={a.title} className={`achievement-card reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="achievement-year">{a.year}</div>
              <div className="achievement-title">{a.title}</div>
              <div className="achievement-desc">{a.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
