import { useEffect, useRef, useState } from 'react';

const STATS = [
  { target: 300, suffix: '+', label: 'DSA Problems Solved' },
  { target: 15,  suffix: '+', label: 'Projects Built' },
  { target: 5,   suffix: '+', label: 'Hackathons' },
  { target: 1,   suffix: '+', label: 'Industry Internship' },
];

function Counter({ target, suffix }) {
  const [val, setVal] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let start = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        start += step;
        if (start >= target) { setVal(target); clearInterval(timer); }
        else setVal(Math.floor(start));
      }, 16);
    }, { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

export default function StatsStrip() {
  return (
    <div className="stats-strip">
      <div className="container">
        <div className="stats-inner">
          {STATS.map(s => (
            <div key={s.label} className="stat-item">
              <div className="stat-num">
                <Counter target={s.target} suffix={s.suffix} />
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
