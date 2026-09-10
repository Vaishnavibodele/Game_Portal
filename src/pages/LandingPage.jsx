import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import FuturisticPortal from '../components/FuturisticPortal';

/**
 * Landing Page — Cinematic Introduction.
 * Designed to build intense curiosity and excitement for the IAE × EEE event.
 */
const LandingPage = () => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleExploreGames = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/games');
    }, 700);
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-4 py-8 overflow-hidden select-none">
      {/* Smooth Transition Light Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-gradient-to-r from-cyan-500/40 via-blue-600/40 to-violet-600/50 backdrop-blur-2xl pointer-events-none flex items-center justify-center"
          >
            <div className="w-96 h-96 rounded-full bg-cyan-400 blur-3xl opacity-80 animate-ping" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center my-auto">
        
        {/* Top Minimal Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 font-mono text-xs tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>IAE × EEE EXPERIENTIAL PORTAL</span>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-orbitron font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-tight uppercase text-white mb-4"
        >
          THE CHALLENGE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 drop-shadow-[0_0_35px_rgba(0,240,255,0.4)]">
            AWAITS
          </span>
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-sans font-medium tracking-wide mb-6 leading-relaxed"
        >
          Think fast. Trust your instincts. Explore what AI can do.
        </motion.p>

        {/* Main Hero Visual: Futuristic Gateway Portal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.45 }}
        >
          <FuturisticPortal />
        </motion.div>

        {/* Hero CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-4"
        >
          <button
            onClick={handleExploreGames}
            disabled={isTransitioning}
            className="group relative inline-flex items-center gap-3 py-4 px-8 sm:py-5 sm:px-10 rounded-full font-orbitron font-extrabold text-sm sm:text-base tracking-widest text-white uppercase bg-gradient-to-r from-cyan-500/20 via-blue-600/30 to-violet-600/20 border-2 border-cyan-400/60 backdrop-blur-xl shadow-[0_0_40px_rgba(0,240,255,0.35)] hover:shadow-[0_0_60px_rgba(0,240,255,0.6)] hover:border-cyan-300 transform hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer active:scale-95"
          >
            {/* Ambient light sweep inside CTA */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <span className="text-xl">🎮</span>
            <span>EXPLORE GAMES</span>
            <ArrowRight className="w-5 h-5 text-cyan-300 transform group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default LandingPage;
