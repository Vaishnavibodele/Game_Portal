import React from 'react';
import { motion } from 'framer-motion';
import games from '../data/games';
import GameGrid from '../components/GameGrid';

/**
 * IAE GAMES ZONE — Main game selection dashboard.
 * Clean, futuristic, premium dashboard layout.
 */
const GamesZone = () => {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center px-4 py-8 md:py-12 select-none">
      
      {/* Page Header Area */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-8 md:mb-12"
      >
        {/* Futuristic Dashboard Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 font-mono text-xs tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>IAE CENTRAL PORTAL</span>
        </div>

        {/* Title */}
        <h1 className="font-orbitron font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight uppercase text-white mb-3 drop-shadow-[0_0_20px_rgba(0,240,255,0.25)]">
          IAE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400">GAMES ZONE</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-300 font-sans tracking-wide">
          Choose your challenge.
        </p>
      </motion.div>

      {/* 5-Card Responsive Game Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="w-full my-auto"
      >
        <GameGrid games={games} />
      </motion.div>

    </div>
  );
};

export default GamesZone;
