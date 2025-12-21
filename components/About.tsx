
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-kora-bg border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24">
          <div>
            <h2 className="text-4xl lg:text-5xl font-black text-kora-offwhite mb-8 uppercase tracking-tighter">About the team</h2>
            <p className="text-xl text-slate-400 leading-relaxed mb-10 font-light">
              We operate like a small R&D group: fast iteration, disciplined engineering, and field validation. 
              Two members bring professional experience in 
              <span className="text-kora-cyan font-bold"> PCB development, embedded firmware, product/mechanical design, and DFM-ready development.</span> 
              The team’s focus is building autonomy systems that survive constraints—not demos that only work once.
            </p>
            
            <div className="space-y-4 font-mono">
               <div className="flex items-center gap-4 text-xs text-slate-500 tracking-widest uppercase">
                  <span className="w-4 h-0.5 bg-kora-cyan"></span>
                  Fast iteration
               </div>
               <div className="flex items-center gap-4 text-xs text-slate-500 tracking-widest uppercase">
                  <span className="w-4 h-0.5 bg-kora-cyan"></span>
                  Disciplined engineering
               </div>
               <div className="flex items-center gap-4 text-xs text-slate-500 tracking-widest uppercase">
                  <span className="w-4 h-0.5 bg-kora-cyan"></span>
                  Field validation
               </div>
            </div>
          </div>
          
          <div className="bg-kora-surface p-12 sharp-edge border border-slate-800 relative">
            <h3 className="text-2xl font-black text-kora-offwhite mb-8 uppercase tracking-tight">What we’re building now</h3>
            <p className="text-slate-400 mb-10 text-lg font-light leading-relaxed">
              A <span className="text-kora-cyan font-bold">minimal-size autonomous drone platform</span> with onboard compute and machine vision—designed for rapid iteration and competition-grade reliability, and demonstrated at SUAS and Teknofest.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
               {[
                 { label: 'Payload', val: 'Configurable' },
                 { label: 'Compute', val: 'Onboard Edge AI' },
                 { label: 'Sensing', val: 'Computer Vision' },
                 { label: 'Environment', val: 'High-Pressure' }
               ].map((item, i) => (
                 <div key={i} className="p-4 border border-slate-700 bg-kora-bg sharp-edge">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">{item.label}</div>
                    <div className="text-sm font-black text-kora-offwhite uppercase tracking-tighter">{item.val}</div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
