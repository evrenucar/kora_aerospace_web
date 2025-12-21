
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-48 pb-32 lg:pt-64 lg:pb-48">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h1 className="text-5xl lg:text-7xl font-black text-kora-offwhite leading-[1] mb-10 tracking-tighter uppercase">
              We build compact <span className="text-kora-cyan">autonomous UAV</span> systems with onboard AI.
            </h1>
            <p className="text-xl text-slate-400 mb-12 leading-relaxed max-w-xl font-light">
              We’re a 4-person UAV/autonomy research team designing complete systems end-to-end: 
              <span className="text-kora-offwhite font-bold"> airframe, avionics, embedded, and autonomy</span>, 
              validated in high-pressure competitive environments.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <a 
                href="#sponsors" 
                className="bg-kora-cyan text-kora-bg px-10 py-5 sharp-edge font-black text-lg hover:bg-white transition-all uppercase tracking-tighter text-center"
              >
                Sponsor the Team
              </a>
              <button className="bg-kora-surface border border-slate-700 text-kora-offwhite px-10 py-5 sharp-edge font-black text-lg hover:border-kora-cyan transition-all uppercase tracking-tighter text-center">
                Download Sponsor Deck (PDF)
              </button>
            </div>
            
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              Backed by engineers with professional hardware/embedded experience. Built for real-world reliability.
            </p>
          </div>
          
          <div className="relative">
             <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-kora-surface sharp-edge overflow-hidden border border-slate-800">
                   <img src="https://images.unsplash.com/photo-1527336367580-52a1d8095130?auto=format&fit=crop&q=80&w=400" alt="Drone flight" className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all" />
                </div>
                <div className="aspect-square bg-kora-surface sharp-edge overflow-hidden border border-slate-800 translate-y-8">
                   <img src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=400" alt="PCB engineering" className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all" />
                </div>
                <div className="col-span-2 aspect-[2/1] bg-kora-surface sharp-edge overflow-hidden border border-slate-800 mt-4">
                   <img src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800" alt="Flight still" className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all" />
                </div>
             </div>
             {/* Offset Decorative Box */}
             <div className="absolute -z-10 -top-8 -right-8 w-64 h-64 border border-kora-cyan/20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
