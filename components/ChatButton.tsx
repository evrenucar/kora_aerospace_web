
import React, { useState } from 'react';

const ChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 bg-kora-surface border-2 border-kora-cyan p-6 shadow-2xl sharp-edge animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex justify-between items-center mb-4">
             <span className="text-[10px] font-mono text-kora-cyan tracking-widest uppercase">Research_Connect</span>
             <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
             </button>
          </div>
          <p className="text-slate-300 text-sm mb-6 leading-relaxed font-light">
            Need details on our research stack or sponsorship tiers? Our team is available for technical deep dives.
          </p>
          <button className="w-full bg-kora-cyan text-kora-bg py-3 font-black uppercase text-xs tracking-widest sharp-edge hover:bg-white transition-all">
             Send Inquiry
          </button>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-4 bg-kora-cyan text-kora-bg flex items-center gap-3 sharp-edge cyan-glow hover:bg-white transition-all group font-black uppercase text-xs tracking-widest"
      >
        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        Chat with us
      </button>
    </div>
  );
};

export default ChatButton;
