
import React from 'react';
import { ACHIEVEMENTS } from '../constants';

const TrackRecord: React.FC = () => {
  return (
    <section id="track-record" className="py-32 bg-kora-bg border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl lg:text-5xl font-black text-kora-offwhite mb-20 uppercase tracking-tighter">Track record</h2>
        
        <div className="grid lg:grid-cols-2 gap-24 mb-32">
          <div className="space-y-12">
            {ACHIEVEMENTS.map((achievement, idx) => (
              <div key={idx} className="flex gap-8 group">
                <div className="text-kora-cyan font-black text-3xl leading-none opacity-40 group-hover:opacity-100 transition-opacity">
                  {achievement.date}
                </div>
                <div>
                  <div className="inline-block bg-kora-cyan text-kora-bg text-[10px] font-black px-2 py-1 sharp-edge mb-3 uppercase tracking-widest">
                    {achievement.rank}
                  </div>
                  <h3 className="text-2xl font-black text-kora-offwhite mb-2 uppercase tracking-tight leading-none">{achievement.title}</h3>
                  <p className="text-slate-400 leading-relaxed font-light">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div className="col-span-2 aspect-video bg-kora-surface sharp-edge border border-slate-800 overflow-hidden relative group">
               <img src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800" alt="PCB Hardware" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
               <div className="absolute top-4 left-4 bg-kora-bg px-3 py-1 text-[10px] font-black text-kora-cyan border border-kora-cyan/30 sharp-edge uppercase tracking-widest">Artifact: Custom PCB Assembly</div>
             </div>
             <div className="aspect-square bg-kora-surface sharp-edge border border-slate-800 overflow-hidden relative group">
               <img src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&q=80&w=400" alt="CAD Render" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
               <div className="absolute top-4 left-4 bg-kora-bg px-2 py-1 text-[8px] font-black text-slate-400 border border-slate-800 sharp-edge uppercase tracking-widest">Artifact: CAD View</div>
             </div>
             <div className="aspect-square bg-kora-surface sharp-edge border border-slate-800 overflow-hidden relative group">
               <img src="https://images.unsplash.com/photo-1527336367580-52a1d8095130?auto=format&fit=crop&q=80&w=400" alt="Flight Validation" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
               <div className="absolute top-4 left-4 bg-kora-bg px-2 py-1 text-[8px] font-black text-slate-400 border border-slate-800 sharp-edge uppercase tracking-widest">Artifact: Flight Still</div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackRecord;
