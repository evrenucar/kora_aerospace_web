
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-kora-bg pt-32 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-5 mb-8">
              {/* Recreated Logo from Image */}
              <div className="flex items-center gap-4">
                <svg viewBox="0 0 100 100" className="w-14 h-14 text-kora-offwhite fill-current">
                  <path d="M20 30 L60 10 L80 10 L45 85 L25 85 L55 35 L20 45 Z" />
                </svg>
                <div className="flex flex-col justify-center">
                  <span className="text-5xl font-black tracking-tight text-kora-offwhite leading-[0.8]">KORA</span>
                  <span className="text-[12px] font-medium tracking-[0.45em] text-kora-offwhite mt-1 uppercase">AEROSPACE</span>
                </div>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-12 font-mono text-xs uppercase tracking-widest mt-12">
               <div>
                  <div className="text-slate-600 mb-2">// CONTACT</div>
                  <div className="text-kora-offwhite font-bold">[Name]</div>
                  <div className="text-kora-cyan mt-1">[Email]</div>
                  <div className="text-slate-400 mt-1">[LinkedIn]</div>
               </div>
               <div>
                  <div className="text-slate-600 mb-2">// LOCATION</div>
                  <div className="text-kora-offwhite">[City/Country]</div>
               </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-mono font-black text-slate-600 mb-8 tracking-widest uppercase">// MEDIA_KIT</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-400">
              <li><a href="#" className="hover:text-kora-cyan uppercase tracking-tighter">Logos & Photos</a></li>
              <li><a href="#" className="hover:text-kora-cyan uppercase tracking-tighter">One-Page PDF</a></li>
              <li><a href="#" className="hover:text-kora-cyan uppercase tracking-tighter">Git_Portfolio</a></li>
            </ul>
          </div>
          
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-mono font-black text-slate-600 mb-8 tracking-widest uppercase">// SYSTEM</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-400">
              <li><a href="#about" className="hover:text-kora-cyan uppercase tracking-tighter">About</a></li>
              <li><a href="#research" className="hover:text-kora-cyan uppercase tracking-tighter">Research</a></li>
              <li><a href="#track-record" className="hover:text-kora-cyan uppercase tracking-tighter">Track Record</a></li>
              <li><a href="#sponsors" className="hover:text-kora-cyan uppercase tracking-tighter">Sponsors</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-600 text-[10px] font-mono uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} KORA AEROSPACE. ALL_RIGHTS_RESERVED.
          </p>
          <div className="flex gap-8 text-[10px] font-mono uppercase tracking-widest text-slate-600">
            <a href="#" className="hover:text-kora-cyan transition-colors">Internal_Use_Only</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
