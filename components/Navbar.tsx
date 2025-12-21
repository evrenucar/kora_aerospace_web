
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-kora-bg/95 border-b border-slate-800 py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-5 group">
          {/* Recreated Logo from Image */}
          <div className="flex items-center gap-4">
            <svg viewBox="0 0 100 100" className="w-12 h-12 text-kora-offwhite fill-current">
              <path d="M20 30 L60 10 L80 10 L45 85 L25 85 L55 35 L20 45 Z" />
            </svg>
            <div className="flex flex-col justify-center">
              <span className="text-4xl font-black tracking-tight text-kora-offwhite leading-[0.8]">KORA</span>
              <span className="text-[10px] font-medium tracking-[0.45em] text-kora-offwhite mt-1 uppercase">AEROSPACE</span>
            </div>
          </div>
        </a>
        
        <div className="hidden lg:flex items-center space-x-6">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.href} 
              href={item.href} 
              className="text-xs font-bold text-slate-400 hover:text-kora-cyan transition-all uppercase tracking-widest"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button className="hidden xl:block text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">
            Request Sponsor Deck
          </button>
          <a 
            href="#sponsors" 
            className="bg-kora-cyan text-kora-bg px-6 py-2.5 sharp-edge text-xs font-black uppercase tracking-widest hover:bg-white transition-all cyan-glow"
          >
            Sponsor the Team
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
