import React from 'react';
import { ArrowRight } from 'lucide-react';
import AbstractGameVisual from './AbstractGameVisual';

/**
 * Individual Game Module Card component.
 * Simplified & premium glassmorphism card.
 */
const GameCard = ({ game }) => {
  const { id, number, title, description, image, url, accent = "cyan" } = game;

  // Accent styling mappings for hover border, glow, badge, button
  const accentStyles = {
    cyan: {
      borderHover: "group-hover:border-cyan-400/50",
      shadowHover: "group-hover:shadow-[0_0_25px_rgba(0,240,255,0.2)]",
      numberText: "text-cyan-400",
      btnBg: "bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border-cyan-400/40",
      badge: "border-cyan-400/30 bg-cyan-950/40 text-cyan-400"
    },
    purple: {
      borderHover: "group-hover:border-purple-400/50",
      shadowHover: "group-hover:shadow-[0_0_25px_rgba(217,70,239,0.2)]",
      numberText: "text-purple-400",
      btnBg: "bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border-purple-400/40",
      badge: "border-purple-400/30 bg-purple-950/40 text-purple-400"
    },
    teal: {
      borderHover: "group-hover:border-teal-400/50",
      shadowHover: "group-hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]",
      numberText: "text-teal-400",
      btnBg: "bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border-teal-400/40",
      badge: "border-teal-400/30 bg-teal-950/40 text-teal-400"
    },
    orange: {
      borderHover: "group-hover:border-orange-400/50",
      shadowHover: "group-hover:shadow-[0_0_25px_rgba(249,115,22,0.2)]",
      numberText: "text-orange-400",
      btnBg: "bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 border-orange-400/40",
      badge: "border-orange-400/30 bg-orange-950/40 text-orange-400"
    },
    violet: {
      borderHover: "group-hover:border-violet-400/50",
      shadowHover: "group-hover:shadow-[0_0_25px_rgba(139,92,246,0.2)]",
      numberText: "text-violet-400",
      btnBg: "bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 border-violet-400/40",
      badge: "border-violet-400/30 bg-violet-950/40 text-violet-400"
    }
  };

  const style = accentStyles[accent] || accentStyles.cyan;

  const handlePlayClick = (e) => {
    e.preventDefault();
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div 
      className={`group relative flex flex-col justify-between rounded-xl bg-[#0a1128]/70 backdrop-blur-xl border border-white/10 p-5 md:p-6 transition-all duration-300 ease-out transform hover:-translate-y-1 hover:scale-[1.01] ${style.borderHover} ${style.shadowHover} overflow-hidden`}
    >
      {/* Light sweep hover overlay */}
      <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-light-sweep pointer-events-none" />

      {/* Top Bar: Game Number & Badge */}
      <div className="flex items-center justify-between mb-4">
        <span className={`font-orbitron font-extrabold text-base md:text-lg tracking-wider ${style.numberText}`}>
          {number}
        </span>
        <span className={`text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full border ${style.badge}`}>
          {url ? "READY" : "COMING SOON"}
        </span>
      </div>

      {/* Visual Area (Abstract Visual or Real Image) */}
      <div className="mb-4">
        <AbstractGameVisual id={id} accent={accent} image={image} title={title} />
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-grow justify-between">
        <div className="mb-5">
          <h3 className="font-orbitron font-bold text-base md:text-lg tracking-wide text-white group-hover:text-cyan-200 transition-colors mb-1">
            {title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2">
            {description}
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={handlePlayClick}
          disabled={!url}
          className={`w-full relative flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-orbitron font-bold text-xs tracking-wider border transition-all duration-300 ${
            url 
              ? `${style.btnBg} cursor-pointer` 
              : "bg-slate-900/60 text-slate-500 border-white/5 cursor-not-allowed opacity-75"
          }`}
        >
          <span>PLAY NOW</span>
          <ArrowRight className={`w-3.5 h-3.5 ${url ? 'transform group-hover:translate-x-1 transition-transform' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default GameCard;
