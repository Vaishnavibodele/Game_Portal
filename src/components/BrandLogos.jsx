import React from 'react';

/**
 * High-tech SVG Logo components for IAE and EEE.
 * Designed to look crisp, futuristic, and official while staying lightweight.
 */

export const IAELogo = ({ className = "h-8 md:h-10", imageSrc = null }) => {
  if (imageSrc) {
    return <img src={imageSrc} alt="IAE" className={`${className} object-contain`} />;
  }

  return (
    <div className={`flex items-center gap-2.5 group cursor-pointer select-none ${className}`}>
      {/* Dynamic Emblem */}
      <div className="relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9">
        <svg viewBox="0 0 40 40" className="w-full h-full text-cyan-400 transform group-hover:rotate-45 transition-transform duration-500">
          {/* Hexagon/Diamond outer ring */}
          <polygon 
            points="20,2 37,11 37,29 20,38 3,29 3,11" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            className="opacity-70"
          />
          {/* Inner Glowing Nodes */}
          <circle cx="20" cy="20" r="4" fill="#00f0ff" className="animate-pulse" />
          <line x1="20" y1="2" x2="20" y2="16" stroke="currentColor" strokeWidth="1.5" />
          <line x1="20" y1="24" x2="20" y2="38" stroke="currentColor" strokeWidth="1.5" />
          <line x1="3" y1="11" x2="16" y2="18" stroke="currentColor" strokeWidth="1.5" />
          <line x1="24" y1="22" x2="37" y2="29" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <span className="font-orbitron font-extrabold text-lg md:text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-400 group-hover:to-cyan-300 transition-all">
          IAE
        </span>
        <span className="h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"></span>
      </div>
    </div>
  );
};

export const EEELogo = ({ className = "h-8 md:h-10", imageSrc = null }) => {
  if (imageSrc) {
    return <img src={imageSrc} alt="EEE" className={`${className} object-contain`} />;
  }

  return (
    <div className={`flex items-center gap-2.5 group cursor-pointer select-none ${className}`}>
      {/* Brand Text */}
      <div className="flex flex-col items-end">
        <span className="font-orbitron font-extrabold text-lg md:text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-white group-hover:from-violet-300 transition-all">
          EEE
        </span>
        <span className="h-[2px] w-0 group-hover:w-full bg-gradient-to-l from-violet-400 to-purple-500 transition-all duration-300"></span>
      </div>

      {/* Dynamic Emblem */}
      <div className="relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9">
        <svg viewBox="0 0 40 40" className="w-full h-full text-violet-400 transform group-hover:-rotate-45 transition-transform duration-500">
          {/* Circular Tech Shield */}
          <circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" className="opacity-80" />
          <path d="M12 20 L20 12 L28 20 L20 28 Z" fill="none" stroke="#d946ef" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="3" fill="#8b5cf6" className="animate-ping opacity-75" />
        </svg>
      </div>
    </div>
  );
};
