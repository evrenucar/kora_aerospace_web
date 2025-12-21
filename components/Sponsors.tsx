
import React from 'react';
import { SPONSOR_TIERS } from '../constants';

const Sponsors: React.FC = () => {
  return (
    <section id="sponsors" className="py-32 bg-kora-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="max-w-2xl">
            <h2 className="text-5xl lg:text-6xl font-black text-kora-offwhite uppercase tracking-tighter mb-8 leading-none">Sponsors</h2>
            <p className="text-xl text-slate-400 font-light leading-relaxed">
              We’re funded through research-style sponsorships: cash and in-kind support that accelerates development and testing.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
             <button className="bg-kora-cyan text-kora-bg px-10 py-5 sharp-edge font-black text-lg hover:bg-white transition-all uppercase tracking-tighter">
                Become a sponsor
             </button>
             <button className="bg-kora-surface border border-slate-700 text-kora-offwhite px-10 py-5 sharp-edge font-black text-lg hover:border-kora-cyan transition-all uppercase tracking-tighter">
                Sponsor via in-kind
             </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-24">
          {SPONSOR_TIERS.map((tier, idx) => (
            <div key={idx} className={`p-8 sharp-edge border transition-all flex flex-col group ${tier.color} ${idx === 0 ? 'border-kora-cyan' : 'border-slate-800 hover:border-slate-600'}`}>
              <h3 className="text-2xl font-black mb-6 uppercase tracking-tighter">{tier.name}</h3>
              {tier.bestFor && <p className="text-[10px] font-mono opacity-70 mb-8 uppercase tracking-widest h-12 leading-tight">{tier.bestFor}</p>}
              <div className="flex-grow">
                <ul className="text-xs space-y-4 opacity-90">
                  {tier.benefits.map((benefit, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-current mt-1 flex-shrink-0"></span>
                      <span className="leading-relaxed font-bold uppercase tracking-tight">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-kora-surface p-12 sharp-edge border border-slate-800 mb-20">
           <div className="flex flex-col lg:flex-row gap-12 items-center justify-between mb-16">
              <h3 className="text-2xl font-black text-kora-offwhite uppercase tracking-tight">What sponsors get (explicit)</h3>
              <div className="text-kora-cyan font-mono text-xs uppercase tracking-[0.3em] font-bold">
                 // IN-KIND EQUIVALENCY: PCB ASSEMBLY / SENSORS / COMPUTE BOARDS
              </div>
           </div>
           <div className="grid lg:grid-cols-4 gap-12">
              {[
                { title: 'Visibility', desc: 'Logo on vehicle, website, posters, and demo content.' },
                { title: 'Recruiting Access', desc: 'Direct pipeline to engineers who ship hardware.' },
                { title: 'Engineering Insight', desc: 'Periodic progress updates, test results, and lessons learned.' },
                { title: 'Demos', desc: 'Sponsor showcase flight/test session when feasible.' }
              ].map((item, i) => (
                <div key={i}>
                   <h4 className="text-kora-offwhite font-black uppercase text-sm mb-3 tracking-widest">{item.title}</h4>
                   <p className="text-slate-400 text-sm font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>

        <div className="text-center pt-16 border-t border-slate-900">
           <h4 className="text-slate-600 font-black uppercase tracking-[0.5em] text-[10px] mb-12">Current Sponsors</h4>
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-900 border border-slate-900">
              {['Platinum: (Open)', 'Gold: (Open)', 'Silver: (Open)', 'Bronze: (Open)'].map((p, i) => (
                <div key={i} className="bg-kora-bg py-10 text-slate-500 font-mono text-xs uppercase tracking-widest">
                  {p}
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
