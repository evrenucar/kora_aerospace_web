
import React from 'react';

const Pillars: React.FC = () => {
  const pillars = [
    {
      title: 'Competition-grade validation',
      desc: 'We use competitions as a forcing function for reliability under constraints: limited time, limited budget, strict rules, real field conditions.'
    },
    {
      title: 'Hardware-first autonomy',
      desc: 'We don’t treat autonomy as “just software.” We build the stack as a system: sensing, compute, power integrity, EMI, mechanical integration, logging, and testability.'
    },
    {
      title: 'Fast iteration, real engineering',
      desc: 'Short cycles, tight scope, measurable milestones. We design for the build, not just for the render.'
    },
  ];

  return (
    <section className="py-32 bg-kora-surface border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-black text-kora-offwhite mb-20 uppercase tracking-widest text-center">What makes this team unique</h2>
        <div className="grid md:grid-cols-3 gap-16">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="relative">
              <div className="text-[120px] font-black text-white/5 absolute -top-20 -left-10 select-none leading-none">0{idx + 1}</div>
              <h3 className="text-2xl font-black text-kora-offwhite mb-6 uppercase tracking-tighter relative z-10">{pillar.title}</h3>
              <p className="text-slate-400 leading-relaxed text-lg font-light relative z-10">{pillar.desc}</p>
              <div className="mt-8 h-1 w-12 bg-kora-cyan sharp-edge"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pillars;
