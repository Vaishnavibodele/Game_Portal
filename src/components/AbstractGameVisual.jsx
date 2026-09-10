import React from 'react';
import { Scan, HelpCircle, Zap, Lock, Cpu } from 'lucide-react';

/**
 * Renders an abstract futuristic placeholder visual or standard image for game cards.
 * Supports image override seamlessly when `image` path is provided in games.js.
 */
const AbstractGameVisual = ({ id, accent = "cyan", image = null, title = "Game" }) => {
  if (image) {
    return (
      <div className="relative w-full h-full overflow-hidden rounded-lg">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
      </div>
    );
  }

  // Accent color map for placeholder backgrounds and glowing accents
  const accentStyles = {
    cyan: {
      gradient: "from-cyan-950/40 via-slate-900/60 to-cyan-900/20",
      glow: "text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)]",
      border: "border-cyan-500/30",
      icon: "text-cyan-400",
      ring: "border-cyan-400/40"
    },
    purple: {
      gradient: "from-purple-950/40 via-slate-900/60 to-pink-900/20",
      glow: "text-purple-400 shadow-[0_0_20px_rgba(217,70,239,0.3)]",
      border: "border-purple-500/30",
      icon: "text-purple-400",
      ring: "border-purple-400/40"
    },
    teal: {
      gradient: "from-teal-950/40 via-slate-900/60 to-emerald-900/20",
      glow: "text-teal-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]",
      border: "border-teal-500/30",
      icon: "text-teal-400",
      ring: "border-teal-400/40"
    },
    orange: {
      gradient: "from-orange-950/40 via-slate-900/60 to-amber-900/20",
      glow: "text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.3)]",
      border: "border-orange-500/30",
      icon: "text-orange-400",
      ring: "border-orange-400/40"
    },
    violet: {
      gradient: "from-violet-950/40 via-slate-900/60 to-indigo-900/20",
      glow: "text-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.3)]",
      border: "border-violet-500/30",
      icon: "text-violet-400",
      ring: "border-violet-400/40"
    }
  };

  const style = accentStyles[accent] || accentStyles.cyan;

  // Render distinct abstract futuristic theme according to ID
  const renderAbstractTheme = () => {
    switch (id) {
      case 1:
        // Game 01: Abstract AI Scan / Digital Lens
        return (
          <div className="relative flex items-center justify-center w-full h-full">
            <div className={`absolute w-24 h-24 rounded-full border ${style.ring} animate-ping opacity-30`} />
            <div className={`absolute w-20 h-20 rounded-full border border-dashed ${style.ring} animate-spin-slow`} />
            <Scan className={`w-10 h-10 ${style.icon} transform group-hover:scale-110 transition-transform duration-300`} />
          </div>
        );
      case 2:
        // Game 02: Abstract Mystery / Silhouette / Question Mark
        return (
          <div className="relative flex items-center justify-center w-full h-full">
            <div className="absolute w-20 h-20 rounded-full bg-purple-500/10 blur-md" />
            <div className="relative z-10 flex flex-col items-center">
              <HelpCircle className={`w-10 h-10 ${style.icon} transform group-hover:rotate-12 transition-transform duration-300`} />
            </div>
          </div>
        );
      case 3:
        // Game 03: Energy / Speed / Lightning-inspired
        return (
          <div className="relative flex items-center justify-center w-full h-full">
            <div className="absolute w-20 h-20 bg-teal-500/10 rounded-full blur-md" />
            <Zap className={`w-10 h-10 ${style.icon} transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`} />
          </div>
        );
      case 4:
        // Game 04: Digital Lock / Encrypted Interface
        return (
          <div className="relative flex items-center justify-center w-full h-full">
            <div className="absolute w-20 h-20 border border-orange-500/20 transform rotate-45 group-hover:rotate-90 transition-transform duration-700" />
            <Lock className={`w-10 h-10 ${style.icon} transform group-hover:scale-110 transition-transform duration-300`} />
          </div>
        );
      case 5:
      default:
        // Game 05: AI Brain / Neural Network
        return (
          <div className="relative flex items-center justify-center w-full h-full">
            <div className="absolute w-24 h-24 rounded-full border border-violet-500/20 animate-pulse" />
            <Cpu className={`w-10 h-10 ${style.icon} transform group-hover:scale-110 transition-transform duration-300`} />
          </div>
        );
    }
  };

  return (
    <div className={`relative w-full h-40 md:h-44 rounded-lg bg-gradient-to-br ${style.gradient} border ${style.border} overflow-hidden flex items-center justify-center group-hover:border-opacity-60 transition-all duration-300`}>
      {/* Background Micro Grid */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '16px 16px'
        }}
      />
      
      {/* HUD Corner Reticles */}
      <div className="hud-corner-tl opacity-40 text-white" />
      <div className="hud-corner-tr opacity-40 text-white" />
      <div className="hud-corner-bl opacity-40 text-white" />
      <div className="hud-corner-br opacity-40 text-white" />

      {/* Abstract Theme */}
      {renderAbstractTheme()}
    </div>
  );
};

export default AbstractGameVisual;
