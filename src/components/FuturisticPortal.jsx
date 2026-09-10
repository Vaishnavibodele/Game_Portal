import React from 'react';
import { motion } from 'framer-motion';

/**
 * Hero Gateway / Digital Portal visual component.
 * Combines concentric animated rings, cybernetic circuit details, 
 * glowing AI core, and holographic light trails leading toward the primary CTA.
 */
const FuturisticPortal = () => {
  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 my-4 flex items-center justify-center pointer-events-none select-none">
      {/* Outer Ambient Radial Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-violet-600/20 blur-3xl animate-pulse-slow"></div>

      {/* Ring 1 - Outer Cyber Orbit (Clockwise rotation) */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-cyan-500/20 border-dashed"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_12px_#00f0ff]"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-violet-400 rounded-full shadow-[0_0_10px_#8b5cf6]"></div>
      </motion.div>

      {/* Ring 2 - HUD Reticle Ring with ticks */}
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 rounded-full border border-violet-500/25 flex items-center justify-center"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-400/40">
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 6" />
          <path d="M 50 2 L 50 10 M 98 50 L 90 50 M 50 98 L 50 90 M 2 50 L 10 50" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* Ring 3 - Geometric Glowing Hex Core Ring */}
      <div className="absolute inset-10 rounded-full border-2 border-cyan-400/40 bg-gradient-to-br from-cyan-950/30 via-slate-950/60 to-violet-950/40 backdrop-blur-sm shadow-[inset_0_0_30px_rgba(0,240,255,0.15)] flex items-center justify-center">
        
        {/* Hologram Grid Pattern inside core */}
        <div 
          className="absolute inset-0 rounded-full opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(0,240,255,0.4) 1px, transparent 1px)`,
            backgroundSize: '16px 16px'
          }}
        ></div>

        {/* Center Glowing Energy Core */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 flex items-center justify-center">
          {/* Inner Pulsing Core Ring */}
          <motion.div 
            animate={{ scale: [0.92, 1.05, 0.92], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full rounded-full border border-cyan-400/70 shadow-[0_0_40px_rgba(0,240,255,0.5)] flex items-center justify-center"
          >
            {/* Inner AI Circuit Diamond */}
            <motion.div 
              animate={{ rotate: 180 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 sm:w-20 sm:h-20 border border-violet-400/80 transform rotate-45 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.5)]"
            >
              <div className="w-6 h-6 bg-gradient-to-tr from-cyan-400 to-violet-400 rounded-full shadow-[0_0_25px_#00f0ff] animate-ping opacity-60"></div>
            </motion.div>
          </motion.div>

          {/* Holographic Center Beam */}
          <div className="absolute w-1.5 h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent blur-[1px] opacity-80"></div>
          <div className="absolute h-1.5 w-full bg-gradient-to-r from-transparent via-violet-400 to-transparent blur-[1px] opacity-80"></div>
        </div>
      </div>

      {/* Floating Corner HUD Data Markers */}
      <div className="absolute top-2 left-2 text-[9px] font-mono text-cyan-400/60 tracking-widest uppercase">
        SYS.LOC // 0xIAE
      </div>
      <div className="absolute bottom-2 right-2 text-[9px] font-mono text-violet-400/60 tracking-widest uppercase">
        PORTAL.READY // EEE
      </div>
    </div>
  );
};

export default FuturisticPortal;
