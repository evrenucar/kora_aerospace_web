
import React from 'react';

const WhatWeDo: React.FC = () => {
  const domains = [
    { title: 'Airframe & mechanical design', desc: 'CAD, structural design, integration, manufacturability.' },
    { title: 'Electronics & avionics', desc: 'Custom PCBs, power distribution, comms, sensor integration.' },
    { title: 'Embedded & firmware', desc: 'Drivers, real-time systems, bring-up, debugging, test tooling.' },
    { title: 'Autonomy stack', desc: 'Sensor fusion, state estimation, planning/control, mission logic.' },
    { title: 'Onboard AI / machine vision', desc: 'Perception pipelines tuned for edge compute.' },
    { title: 'Rapid validation', desc: 'Prototype → bench tests → flight tests → iterate.' },
  ];

  return (
    <section className="py-32 bg-kora-bg">
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:items-end">
          <div className="lg:w-2/3">
             <h2 className="text-4xl lg:text-5xl font-black text-kora-offwhite mb-6 uppercase tracking-tighter">Full-stack UAV + autonomy development</h2>
          </div>
          <div className="lg:w-1/3">
             <div className="h-0.5 w-16 bg-kora-cyan mb-6"></div>
             <p className="text-slate-400 font-light">Complete end-to-end engineering, optimized for reliability under operational constraints.</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-800 border border-slate-800 sharp-edge">
        {domains.map((domain, idx) => (
          <div key={idx} className="p-10 bg-kora-surface hover:bg-slate-800 transition-all group">
            <h3 className="text-xl font-black text-kora-offwhite mb-4 uppercase tracking-tighter group-hover:text-kora-cyan transition-colors">{domain.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-light">{domain.desc}</p>
          </div>
        ))}
      </div>
      
      <div className="max-w-3xl mx-auto px-6 mt-24 text-center">
        <h3 className="text-2xl font-black text-kora-offwhite mb-6 uppercase tracking-tight">Engineering approach</h3>
        <p className="text-slate-400 leading-relaxed font-light text-lg">
          We prioritize <span className="text-kora-offwhite font-bold underline decoration-kora-cyan decoration-2 underline-offset-4">repeatable testing</span>, clear interfaces, and modular architecture so we can upgrade components without rebuilding the whole system.
        </p>
      </div>
    </section>
  );
};

export default WhatWeDo;
