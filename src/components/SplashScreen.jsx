import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Performant Canvas System rendering:
 * 1. Dual-depth particle field (Foreground + Background)
 * 2. Dynamic proximity-based particle connection network
 * 3. Directional data streams moving along screen axes
 */
const CanvasSystem = ({ mouseOffset }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 25 : 55;

    // Initialize particles with depth properties
    const particles = Array.from({ length: particleCount }).map(() => {
      const isForeground = Math.random() > 0.5;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (isForeground ? 0.6 : 0.25),
        vy: (Math.random() - 0.5) * (isForeground ? 0.6 : 0.25),
        radius: isForeground ? Math.random() * 2 + 1.5 : Math.random() * 1.2 + 0.6,
        alpha: isForeground ? Math.random() * 0.5 + 0.4 : Math.random() * 0.3 + 0.15,
        color: Math.random() > 0.4 ? '#00f0ff' : '#a855f7',
        isForeground,
      };
    });

    // Data streams
    const streamCount = isMobile ? 3 : 6;
    const streams = Array.from({ length: streamCount }).map(() => ({
      axis: Math.random() > 0.5 ? 'h' : 'v',
      pos: Math.random() * (Math.random() > 0.5 ? canvas.width : canvas.height),
      coord: Math.random() * 100,
      length: Math.random() * 120 + 80,
      speed: Math.random() * 4 + 2,
      dir: Math.random() > 0.5 ? 1 : -1,
      color: Math.random() > 0.5 ? 'rgba(0, 240, 255, 0.4)' : 'rgba(168, 85, 247, 0.4)',
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply mouse parallax offset to canvas context
      const offsetX = (mouseOffset.x || 0) * 12;
      const offsetY = (mouseOffset.y || 0) * 12;

      // Draw Data Streams
      streams.forEach((s) => {
        s.coord += s.speed * s.dir;
        if (s.coord > (s.axis === 'h' ? canvas.width : canvas.height) + 150) {
          s.coord = -150;
        } else if (s.coord < -150) {
          s.coord = (s.axis === 'h' ? canvas.width : canvas.height) + 150;
        }

        ctx.beginPath();
        if (s.axis === 'h') {
          const grad = ctx.createLinearGradient(s.coord + offsetX, s.pos, s.coord + s.length * s.dir + offsetX, s.pos);
          grad.addColorStop(0, 'rgba(0,0,0,0)');
          grad.addColorStop(0.5, s.color);
          grad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1;
          ctx.moveTo(s.coord + offsetX, s.pos + offsetY);
          ctx.lineTo(s.coord + s.length * s.dir + offsetX, s.pos + offsetY);
        } else {
          const grad = ctx.createLinearGradient(s.pos, s.coord + offsetY, s.pos, s.coord + s.length * s.dir + offsetY);
          grad.addColorStop(0, 'rgba(0,0,0,0)');
          grad.addColorStop(0.5, s.color);
          grad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1;
          ctx.moveTo(s.pos + offsetX, s.coord + offsetY);
          ctx.lineTo(s.pos + offsetX, s.coord + s.length * s.dir + offsetY);
        }
        ctx.stroke();
      });

      // Update & Draw Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const pX = p.x + (p.isForeground ? offsetX * 1.5 : offsetX * 0.5);
        const pY = p.y + (p.isForeground ? offsetY * 1.5 : offsetY * 0.5);

        ctx.beginPath();
        ctx.arc(pX, pY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      // Draw Proximity Connections
      ctx.globalAlpha = 1;
      const maxDist = isMobile ? 80 : 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p1.x + offsetX, p1.y + offsetY);
            ctx.lineTo(p2.x + offsetX, p2.y + offsetY);
            ctx.strokeStyle = '#00f0ff';
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseOffset]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
};

/**
 * 3D Perspective Digital Grid Layer
 */
const PerspectiveGrid = ({ mouseOffset }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      <div 
        className="absolute bottom-0 inset-x-0 h-[60vh] opacity-20"
        style={{
          perspective: '600px',
          transformStyle: 'preserve-3d',
        }}
      >
        <div 
          className="w-full h-full border-t border-cyan-500/30"
          style={{
            transform: `rotateX(72deg) translateY(${mouseOffset.y * -15}px) translateX(${mouseOffset.x * 15}px)`,
            backgroundImage: `linear-gradient(to right, rgba(0, 240, 255, 0.25) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(0, 240, 255, 0.25) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 90%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 90%)',
          }}
        />
      </div>
    </div>
  );
};

/**
 * Floating Outer Geometric Elements Layer
 */
const FloatingGeometry = ({ mouseOffset }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10">
      {/* Top Left Diamond */}
      <motion.div
        animate={{ rotate: 360, y: [-8, 8, -8] }}
        transition={{ rotate: { duration: 24, repeat: Infinity, ease: 'linear' }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
        style={{ transform: `translate(${mouseOffset.x * 15}px, ${mouseOffset.y * 15}px)` }}
        className="absolute top-16 left-12 md:left-24 w-12 h-12 text-cyan-400/20"
      >
        <svg viewBox="0 0 60 60" className="w-full h-full">
          <polygon points="30,5 55,30 30,55 5,30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
        </svg>
      </motion.div>

      {/* Top Right Hexagon */}
      <motion.div
        animate={{ rotate: -360, y: [10, -10, 10] }}
        transition={{ rotate: { duration: 28, repeat: Infinity, ease: 'linear' }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
        style={{ transform: `translate(${mouseOffset.x * 18}px, ${mouseOffset.y * 18}px)` }}
        className="absolute top-20 right-12 md:right-28 w-14 h-14 text-violet-400/20"
      >
        <svg viewBox="0 0 60 60" className="w-full h-full">
          <polygon points="30,5 52,18 52,42 30,55 8,42 8,18" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="30" cy="30" r="3" fill="#a855f7" opacity="0.6" />
        </svg>
      </motion.div>

      {/* Bottom Left Square */}
      <motion.div
        animate={{ rotate: 180, scale: [0.9, 1.1, 0.9] }}
        transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
        style={{ transform: `translate(${mouseOffset.x * 12}px, ${mouseOffset.y * 12}px)` }}
        className="absolute bottom-24 left-16 md:left-32 w-10 h-10 text-cyan-300/20"
      >
        <svg viewBox="0 0 60 60" className="w-full h-full">
          <rect x="10" y="10" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 3" />
        </svg>
      </motion.div>

      {/* Bottom Right Triangle */}
      <motion.div
        animate={{ rotate: -180, y: [-6, 6, -6] }}
        transition={{ rotate: { duration: 22, repeat: Infinity, ease: 'linear' }, y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' } }}
        style={{ transform: `translate(${mouseOffset.x * 14}px, ${mouseOffset.y * 14}px)` }}
        className="absolute bottom-28 right-16 md:right-36 w-12 h-12 text-violet-400/20"
      >
        <svg viewBox="0 0 60 60" className="w-full h-full">
          <polygon points="30,8 54,50 6,50" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </motion.div>
    </div>
  );
};

/**
 * Minimal Corner Vector Indicators (No heavy text clutter)
 */
const CornerUI = () => {
  return (
    <div className="absolute inset-0 pointer-events-none select-none z-10">
      {/* Top Left Corner Bracket */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 text-cyan-500/30">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M0 12V0H12" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="3" cy="3" r="1.5" fill="currentColor" />
        </svg>
      </div>

      {/* Top Right Corner Bracket */}
      <div className="absolute top-6 right-6 md:top-10 md:right-10 text-cyan-500/30">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M32 12V0H20" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="29" cy="3" r="1.5" fill="currentColor" />
        </svg>
      </div>

      {/* Bottom Left Corner Bracket */}
      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-violet-500/30">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M0 20V32H12" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="3" cy="29" r="1.5" fill="currentColor" />
        </svg>
      </div>

      {/* Bottom Right Corner Bracket */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 text-violet-500/30">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M32 20V32H20" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="29" cy="29" r="1.5" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
};

/**
 * 5-Layer Multi-Ring Digital Interface Core
 */
const MultiRingInterface = ({ bootStage, mouseOffset }) => {
  // Orbiting satellite particles
  const satellites = [
    { id: 1, radius: 105, speed: 12, dir: 1, color: '#00f0ff', size: 4 },
    { id: 2, radius: 85, speed: 9, dir: -1, color: '#a855f7', size: 3 },
    { id: 3, radius: 120, speed: 18, dir: -1, color: '#3b82f6', size: 3.5 },
    { id: 4, radius: 65, speed: 7, dir: 1, color: '#00f0ff', size: 2.5 },
  ];

  return (
    <div 
      className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-88 md:h-88 my-4 sm:my-6 flex items-center justify-center pointer-events-none select-none z-20"
      style={{
        transform: `translate(${mouseOffset.x * 24}px, ${mouseOffset.y * 24}px)`,
        transition: 'transform 0.15s ease-out',
      }}
    >
      {/* RADIAL SCANNING radar arc sweep */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
      >
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, transparent 300deg, rgba(0, 240, 255, 0.25) 360deg)',
          }}
        />
      </motion.div>

      {/* LINEAR SCANNING blurred beam top-to-bottom */}
      <motion.div
        animate={{ y: ['-100%', '800%'] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent pointer-events-none blur-[1px]"
      />

      {/* DIGITAL SHOCKWAVE PULSES (Periodic outward expansion) */}
      <motion.div
        animate={{ scale: [0.5, 2.2], opacity: [0.7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
        className="absolute inset-0 rounded-full border border-cyan-400/60 pointer-events-none"
      />
      <motion.div
        animate={{ scale: [0.5, 2.2], opacity: [0.7, 0] }}
        transition={{ duration: 2.2, delay: 1.1, repeat: Infinity, ease: 'easeOut' }}
        className="absolute inset-0 rounded-full border border-violet-500/60 pointer-events-none"
      />

      {/* RING 1: Outer Technical Degree Markers Ring (Clockwise) */}
      <AnimatePresence>
        {bootStage >= 2 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: 360 }}
            transition={{ scale: { duration: 0.6, ease: 'easeOut' }, opacity: { duration: 0.6 }, rotate: { duration: 36, repeat: Infinity, ease: 'linear' } }}
            className="absolute inset-0 rounded-full border border-cyan-500/25 border-dashed flex items-center justify-center"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full text-cyan-400/35">
              <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 6" />
              <text x="100" y="14" textAnchor="middle" fill="currentColor" fontSize="7" className="font-mono">N</text>
              <text x="190" y="103" textAnchor="middle" fill="currentColor" fontSize="7" className="font-mono">E</text>
              <text x="100" y="191" textAnchor="middle" fill="currentColor" fontSize="7" className="font-mono">S</text>
              <text x="10" y="103" textAnchor="middle" fill="currentColor" fontSize="7" className="font-mono">W</text>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RING 2: Broken Segmented Arc Ring (Counter-Clockwise) */}
      <AnimatePresence>
        {bootStage >= 2 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: -360 }}
            transition={{ scale: { duration: 0.6, delay: 0.1, ease: 'easeOut' }, opacity: { duration: 0.6, delay: 0.1 }, rotate: { duration: 24, repeat: Infinity, ease: 'linear' } }}
            className="absolute inset-3.5 flex items-center justify-center"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full text-violet-400/40">
              <path d="M 50 5 A 45 45 0 0 1 95 50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="15 5 5 5" />
              <path d="M 50 95 A 45 45 0 0 1 5 50" fill="none" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="20 10" />
              <circle cx="50" cy="5" r="2.5" fill="#a855f7" />
              <circle cx="95" cy="50" r="2.5" fill="#00f0ff" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RING 3: Thin Technical Precision Reticle Ring (Clockwise) */}
      <AnimatePresence>
        {bootStage >= 2 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: 360 }}
            transition={{ scale: { duration: 0.5, delay: 0.2 }, opacity: { duration: 0.5 }, rotate: { duration: 18, repeat: Infinity, ease: 'linear' } }}
            className="absolute inset-8 rounded-full border border-cyan-400/40 flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,240,255,0.2)]"
          >
            <div className="w-full h-full rounded-full border border-dashed border-violet-400/30" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* RING 4: Small Inner Reticle Ring (Fast Counter-Clockwise Rotation) */}
      <AnimatePresence>
        {bootStage >= 2 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: -360 }}
            transition={{ scale: { duration: 0.5, delay: 0.25 }, opacity: { duration: 0.5 }, rotate: { duration: 12, repeat: Infinity, ease: 'linear' } }}
            className="absolute inset-14 rounded-full border-2 border-violet-500/50 flex items-center justify-center"
          >
            <div className="w-full h-full rounded-full border border-cyan-400/60 transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* RING 5: Inner Pulsing Glow Ring */}
      <AnimatePresence>
        {bootStage >= 1 && (
          <motion.div
            animate={{ scale: [0.92, 1.08, 0.92], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-20 rounded-full border-2 border-cyan-300 shadow-[0_0_30px_#00f0ff,inset_0_0_15px_#00f0ff] flex items-center justify-center"
          />
        )}
      </AnimatePresence>

      {/* ORBITING SATELLITES */}
      {satellites.map((sat) => (
        <motion.div
          key={`sat-${sat.id}`}
          animate={{ rotate: sat.dir * 360 }}
          transition={{ duration: sat.speed, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div 
            style={{
              transform: `translateY(-${sat.radius}px)`,
              width: `${sat.size}px`,
              height: `${sat.size}px`,
              backgroundColor: sat.color,
              boxShadow: `0 0 10px ${sat.color}`,
            }}
            className="rounded-full"
          />
        </motion.div>
      ))}

      {/* CENTRAL ENERGY CORE (Ignites at 0.4s - 0.6s) */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center z-30">
        <AnimatePresence>
          {bootStage >= 1 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0.8, 1.2, 0.9, 1], opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Outer Core Aura */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-violet-600 blur-xl opacity-80 animate-pulse" />
              
              {/* Core Geometry */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-white bg-gradient-to-br from-cyan-400/60 to-violet-600/60 backdrop-blur-md rotate-45 flex items-center justify-center shadow-[0_0_35px_#00f0ff]"
              >
                <div className="w-3.5 h-3.5 bg-white rounded-full shadow-[0_0_15px_#ffffff] animate-ping" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};

/**
 * Main Cinematic Corporate Splash Screen component.
 */
const SplashScreen = ({ onComplete }) => {
  const [bootStage, setBootStage] = useState(0); // 0: dark -> 1: core -> 2: rings -> 3: text -> 4: active -> 5: exit
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [glitchActive, setGlitchActive] = useState(false);

  // Mouse Parallax (Desktop Only)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth < 768) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Cinematic Boot Sequence Timeline
  useEffect(() => {
    // 0.4s: Point of light ignites central core
    const t1 = setTimeout(() => setBootStage(1), 400);

    // 0.8s: Multi-ring interface forms
    const t2 = setTimeout(() => setBootStage(2), 800);

    // 1.1s - 1.5s: Heading reveal timeline
    const t3 = setTimeout(() => setBootStage(3), 1100);

    // 1.8s: Specular text light sweep & full system activation
    const t4 = setTimeout(() => setBootStage(4), 1800);

    // Occasional micro glitch trigger at 2.2s
    const tGlitch = setTimeout(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 120);
    }, 2200);

    // 2.6s: Trigger exit activation transition
    const tExit = setTimeout(() => setBootStage(5), 2650);

    // 3.2s: Complete splash screen and transition to Games Zone
    const tComplete = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(tGlitch);
      clearTimeout(tExit);
      clearTimeout(tComplete);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={bootStage === 5 ? { opacity: 0, scale: 1.08, filter: 'blur(12px)' } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#02050e] p-4 overflow-hidden select-none"
    >
      {/* Ambient Moving Radial Glow Layers */}
      <motion.div 
        animate={{
          x: mouseOffset.x * -20,
          y: mouseOffset.y * -20,
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[170px] pointer-events-none z-0" 
      />
      <motion.div 
        animate={{
          x: mouseOffset.x * 20,
          y: mouseOffset.y * 20,
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-violet-600/10 rounded-full blur-[170px] pointer-events-none z-0" 
      />

      {/* Canvas Particle Field + Synapse Connections + Data Streams */}
      <CanvasSystem mouseOffset={mouseOffset} />

      {/* 3D Perspective Digital Grid */}
      <PerspectiveGrid mouseOffset={mouseOffset} />

      {/* Floating Geometry Shapes */}
      <FloatingGeometry mouseOffset={mouseOffset} />

      {/* Minimal Corner UI Vector Indicators */}
      <CornerUI />

      {/* CENTER INTERFACE & HEADLINE DISPLAY */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl w-full my-auto">
        
        {/* Multi-Ring Digital Interface Core */}
        <MultiRingInterface bootStage={bootStage} mouseOffset={mouseOffset} />

        {/* CINEMATIC HEADLINE DISPLAY */}
        <div className="relative flex flex-col items-center select-none font-space tracking-tight text-white uppercase">
          
          {/* 1. "THE" Reveal (1.1s) */}
          <AnimatePresence>
            {bootStage >= 3 && (
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="text-xs sm:text-sm font-mono tracking-[0.4em] text-cyan-400 font-semibold mb-1"
              >
                THE
              </motion.span>
            )}
          </AnimatePresence>

          {/* 2. "CHALLENGE" Reveal with Horizontal Light Mask (1.3s) */}
          <AnimatePresence>
            {bootStage >= 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: glitchActive ? [-2, 2, 0] : 0,
                }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                className="relative overflow-hidden py-1 px-4"
              >
                <h1 className="font-orbitron font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 drop-shadow-[0_0_35px_rgba(0,240,255,0.45)]">
                  CHALLENGE
                </h1>

                {/* Light Sweep Effect across CHALLENGE (1.8s) */}
                {bootStage >= 4 && (
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-12 pointer-events-none mix-blend-overlay"
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3. "AWAITS" Reveal (1.5s) */}
          <AnimatePresence>
            {bootStage >= 3 && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
                className="text-sm sm:text-base font-mono tracking-[0.45em] text-slate-300 font-medium mt-1"
              >
                AWAITS
              </motion.span>
            )}
          </AnimatePresence>

        </div>

      </div>
    </motion.div>
  );
};

export default SplashScreen;
