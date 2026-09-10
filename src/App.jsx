import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import GamesZone from './pages/GamesZone';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <Router>
      {/* Dynamic Performant Particle Canvas Background */}
      <ParticleBackground />

      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
        ) : (
          <motion.div
            key="main-portal"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 flex flex-col min-h-screen"
          >
            <Navbar />

            <main className="flex-grow flex flex-col">
              <Routes>
                <Route path="/" element={<GamesZone />} />
                <Route path="/games" element={<GamesZone />} />
                <Route path="*" element={<GamesZone />} />
              </Routes>
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;
