
import React from 'react';

const GetInvolved: React.FC = () => {
  return (
    <section className="py-32 bg-kora-bg border-y border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-black text-kora-offwhite mb-8 uppercase tracking-tighter">Get involved</h2>
            <p className="text-xl text-slate-400 mb-12 font-light leading-relaxed max-w-xl">
              If you’re a company or lab that wants to accelerate autonomous UAV development, there are three ways to help:
            </p>
            
            <div className="space-y-6 mb-12">
              {[
                { title: 'Sponsor hardware development', detail: '(cash or in-kind)' },
                { title: 'Provide equipment or fabrication support', detail: '(PCB assembly, sensors, compute, RF tools)' },
                { title: 'Enable testing', detail: '(safe test site access, field conditions, mentorship)' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="text-kora-cyan font-black text-xl font-mono leading-none">0{i+1}</div>
                  <div>
                    <h4 className="text-kora-offwhite font-black uppercase tracking-tight text-lg mb-1">{item.title}</h4>
                    <p className="text-slate-500 font-light italic">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <a 
              href="#contact" 
              className="inline-block bg-kora-cyan text-kora-bg px-10 py-5 sharp-edge font-black text-lg hover:bg-white transition-all uppercase tracking-tighter"
            >
              Contact us for the sponsor deck
            </a>
          </div>
          
          <div className="bg-kora-surface p-1 sharp-edge h-fit border border-slate-800 rotate-1">
             <div className="bg-kora-bg p-12 sharp-edge border border-slate-800">
                <div className="text-kora-cyan font-mono text-[10px] uppercase tracking-[0.5em] mb-8 font-bold">// SYSTEM_NOTE</div>
                <p className="text-kora-offwhite text-lg font-light leading-relaxed mb-6 italic">
                  "Accelerating development requires specialized fabrication and field access. We partner with labs and manufacturers who want to see these technologies validated at scale."
                </p>
                <div className="h-0.5 w-full bg-slate-800 mt-12 relative overflow-hidden">
                   <div className="absolute inset-0 bg-kora-cyan w-1/3 animate-[slide_3s_infinite]"></div>
                </div>
             </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </section>
  );
};

export default GetInvolved;
