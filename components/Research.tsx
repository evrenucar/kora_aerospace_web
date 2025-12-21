
import React from 'react';
import { RESEARCH_MILESTONES } from '../constants';

const Research: React.FC = () => {
  return (
    <section id="research" className="py-32 bg-kora-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/2">
            <h2 className="text-4xl lg:text-5xl font-black text-kora-offwhite mb-8 uppercase tracking-tighter">Current research program</h2>
            <p className="text-xl text-slate-400 mb-12 font-light">
              We’re building a platform that proves autonomy in constrained UAV form factors.
            </p>
            
            <h3 className="text-xs font-mono font-black text-kora-cyan mb-8 tracking-[0.4em] uppercase">// NEAR_TERM_MILESTONES</h3>
            <div className="space-y-4">
              {RESEARCH_MILESTONES.map((milestone, idx) => (
                <div key={idx} className="p-6 bg-kora-surface border border-slate-800 sharp-edge">
                  <h4 className="font-black text-kora-offwhite mb-2 uppercase tracking-tight text-lg">{milestone.title}</h4>
                  {milestone.points.map((p, pIdx) => (
                    <p key={pIdx} className="text-slate-400 text-sm font-light">{p}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 p-1 bg-kora-cyan sharp-edge h-fit">
            <div className="bg-kora-bg p-12 sharp-edge">
              <h3 className="text-2xl font-black text-kora-offwhite mb-10 uppercase tracking-tight">What sponsorship directly enables</h3>
              <ul className="space-y-6">
                {[
                  'PCB fabrication + assembly spins',
                  'Sensor and compute hardware',
                  'Airframe prototyping materials and tooling',
                  'Batteries, RF/telemetry gear, and test equipment',
                  'Field testing logistics and competition travel'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 group">
                    <div className="w-2 h-2 bg-kora-cyan group-hover:w-4 transition-all sharp-edge"></div>
                    <span className="text-slate-300 font-light">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-16 p-8 bg-kora-surface border-l-4 border-kora-cyan sharp-edge">
                 <p className="text-sm italic text-slate-400 font-light">"Our program prioritizes hardware iterations that lead directly to autonomy breakthroughs."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Research;
