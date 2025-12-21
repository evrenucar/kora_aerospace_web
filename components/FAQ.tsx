
import React from 'react';

const FAQ: React.FC = () => {
  const faqs = [
    {
      q: "Are you offering engineering services?",
      a: "No. We’re a research-focused student team seeking sponsorship to fund development and demonstrations."
    },
    {
      q: "What will sponsorship be used for?",
      a: "Manufacturing iterations, compute + sensors, airframe prototyping, test equipment, and competition testing/travel."
    },
    {
      q: "What do sponsors receive?",
      a: "Visibility, recruiting access, progress updates, and demo opportunities. Sponsorship does not imply ownership of IP unless explicitly agreed in writing."
    },
    {
      q: "Can we sponsor with parts instead of cash?",
      a: "Yes. We accept in-kind sponsorships (PCB fab/assembly credit, sensors, compute, RF gear, batteries, tooling)."
    },
    {
      q: "How do we start?",
      a: "Request the sponsor deck and we’ll propose the best tier based on what you can provide."
    }
  ];

  return (
    <section id="faq" className="py-32 bg-kora-bg">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-black text-kora-offwhite mb-16 uppercase tracking-tighter text-center">FAQ</h2>
        <div className="grid gap-1px bg-slate-800 border border-slate-800 sharp-edge">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-8 bg-kora-bg hover:bg-kora-surface transition-colors group">
              <h3 className="text-xl font-black text-kora-offwhite mb-4 uppercase tracking-tight group-hover:text-kora-cyan transition-colors">{faq.q}</h3>
              <p className="text-slate-400 leading-relaxed font-light">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
