import React from 'react';

/**
 * Minimal, subtle futuristic Footer component.
 * Displays IAE × EEE branding and event motto.
 */
const Footer = () => {
  return (
    <footer className="w-full py-8 mt-auto border-t border-white/5 bg-[#030712]/60 backdrop-blur-sm text-center">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-2">
        <div className="font-orbitron font-bold text-sm tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-violet-400">
          IAE × EEE
        </div>
        <p className="text-xs font-mono tracking-widest text-slate-500 uppercase">
          Think • Explore • Play
        </p>
      </div>
    </footer>
  );
};

export default Footer;
