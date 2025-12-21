
import React from 'react';
import { TEAM_MEMBERS } from '../constants';

const Team: React.FC = () => {
  return (
    <section id="team" className="py-32 bg-kora-bg border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <div className="text-xs font-mono font-black text-kora-cyan mb-4 tracking-[0.4em] uppercase">// PERSONNEL</div>
            <h2 className="text-5xl font-black text-kora-offwhite uppercase tracking-tighter">Engineering Core</h2>
          </div>
          <p className="text-slate-500 max-w-xs text-sm font-mono leading-relaxed">
            Multidisciplinary specialists bridging the gap between hardware architecture and high-level autonomy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TEAM_MEMBERS.map((member, idx) => (
            <div key={idx} className="bg-kora-surface sharp-edge group overflow-hidden border border-slate-800 hover:border-kora-cyan transition-all">
              <div className="aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8">
                <div className="text-xs font-mono text-kora-cyan mb-2 uppercase tracking-widest">{member.role}</div>
                <h3 className="text-2xl font-black text-kora-offwhite mb-4 uppercase tracking-tighter">{member.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">{member.bio}</p>
                <div className="h-0.5 w-8 bg-slate-700 group-hover:w-full group-hover:bg-kora-cyan transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
