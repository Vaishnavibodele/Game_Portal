import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { IAELogo, EEELogo } from './BrandLogos';

/**
 * Minimal, elegant futuristic Navbar header.
 * Left: IAE logo, Right: EEE logo, Center/Minimal Nav: HOME | GAMES.
 */
const Navbar = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#030712]/75 border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Left: IAE Logo (Navigates Home) */}
        <NavLink to="/" className="flex items-center focus:outline-none" title="IAE Home">
          <IAELogo />
        </NavLink>

        {/* Center: Minimal Navigation */}
        <nav className="flex items-center gap-6 sm:gap-10 font-orbitron text-xs sm:text-sm tracking-widest uppercase">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `relative py-1 transition-colors duration-300 ${
                isActive
                  ? 'text-cyan-400 font-semibold drop-shadow-[0_0_10px_rgba(0,240,255,0.6)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>HOME</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_#00f0ff]" />
                )}
              </>
            )}
          </NavLink>

          <span className="text-slate-700 select-none">•</span>

          <NavLink
            to="/games"
            className={({ isActive }) =>
              `relative py-1 transition-colors duration-300 ${
                isActive
                  ? 'text-cyan-400 font-semibold drop-shadow-[0_0_10px_rgba(0,240,255,0.6)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>GAMES</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full shadow-[0_0_8px_#00f0ff]" />
                )}
              </>
            )}
          </NavLink>
        </nav>

        {/* Right: EEE Logo */}
        <NavLink to="/" className="flex items-center focus:outline-none" title="EEE">
          <EEELogo />
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;
