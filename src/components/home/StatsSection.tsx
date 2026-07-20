'use client';

import { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: 50000, label: 'Active Jobs', suffix: '+', prefix: '' },
  { value: 10000, label: 'Companies', suffix: '+', prefix: '' },
  { value: 95, label: 'Placement Rate', suffix: '%', prefix: '' },
  { value: 2.5, label: 'Avg. Time to Hire', suffix: ' Weeks', prefix: '' },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(target * progress);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ value, label, suffix, prefix }: (typeof STATS)[0]) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(value, 2000, started);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStarted(true); observer.disconnect(); }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const display = value >= 1000
    ? `${prefix}${(count / 1000).toFixed(0)}K`
    : value < 10
    ? `${prefix}${count.toFixed(1)}`
    : `${prefix}${Math.round(count)}`;

  return (
    <div ref={ref} className="text-center p-8 glass-card hover:border-indigo-500/30 transition-all duration-300 group">
      <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">
        {display}{suffix}
      </div>
      <div className="text-white/60 text-sm font-medium">{label}</div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-16 bg-slate-950/50">
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
