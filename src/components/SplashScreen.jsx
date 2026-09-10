import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { IAELogo, EEELogo } from './BrandLogos';

/**
 * Full-Screen Event Opening Splash Screen.
 * Displays IAE & EEE branding, event tagline "THE CHALLENGE AWAITS", 
 * futuristic cyber loading bar, and automatically transitions after 2.5 seconds.
 */
const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#030712] p-6 md:p-12 overflow-hidden select-none"
    >
      {/* Background Ambient Radial Glow & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/40 via-[#030712] to-[#030712] pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />

      {/* Top Branding Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl flex items-center justify-between z-10"
      >
        <IAELogo className="h-8 md:h-10" />
        <div className="h-px flex-grow mx-6 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-violet-500/0" />
        <EEELogo className="h-8 md:h-10" />
      </motion.div>

      {/* Center Cinematic Content */}
      <div className="relative z-10 my-auto flex flex-col items-center text-center max-w-3xl">
        
        {/* Animated Cyber Ring / Hex Core */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="relative w-24 h-24 sm:w-28 sm:h-28 mb-8 flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full border border-cyan-400/30 border-dashed animate-spin-slow" />
          <div className="absolute inset-2 rounded-full border border-violet-500/40 animate-spin-reverse-slow" />
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-500 shadow-[0_0_30px_#00f0ff] animate-pulse" />
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase mb-3"
        >
          IAE × EEE EXPERIENTIAL PORTAL
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-orbitron font-black text-3xl sm:text-5xl md:text-6xl tracking-tight uppercase text-white mb-6"
        >
          THE CHALLENGE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 drop-shadow-[0_0_30px_rgba(0,240,255,0.4)]">
            AWAITS
          </span>
        </motion.h1>

        {/* Futuristic Loading Bar */}
        <motion.div 
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "100%" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-48 sm:w-64 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-cyan-500/30 p-0.5 relative"
        >
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 rounded-full shadow-[0_0_12px_#00f0ff]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mt-3"
        >
          INITIALIZING SYSTEM...
        </motion.div>

      </div>

      {/* Footer System Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="z-10 text-[10px] font-mono text-slate-500 tracking-widest uppercase"
      >
        IAE × EEE // SYSTEM READY
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
