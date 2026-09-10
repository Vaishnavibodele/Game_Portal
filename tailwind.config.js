/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#030712",
          card: "rgba(15, 23, 42, 0.65)",
          border: "rgba(255, 255, 255, 0.08)",
          cyan: "#00f0ff",
          blue: "#3b82f6",
          violet: "#8b5cf6",
          purple: "#d946ef",
          teal: "#10b981",
          orange: "#f97316"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 240, 255, 0.4)',
        'glow-purple': '0 0 25px -5px rgba(217, 70, 239, 0.4)',
        'glow-teal': '0 0 25px -5px rgba(16, 185, 129, 0.4)',
        'glow-orange': '0 0 25px -5px rgba(249, 115, 22, 0.4)',
        'glow-violet': '0 0 25px -5px rgba(139, 92, 246, 0.4)',
        'glow-portal': '0 0 60px 10px rgba(0, 240, 255, 0.25), inset 0 0 40px rgba(139, 92, 246, 0.3)',
      },
      keyframes: {
        pulseSlow: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        spinReverseSlow: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        lightSweep: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        }
      },
      animation: {
        'pulse-slow': 'pulseSlow 6s ease-in-out infinite',
        'spin-slow': 'spinSlow 25s linear infinite',
        'spin-reverse-slow': 'spinReverseSlow 35s linear infinite',
        'light-sweep': 'lightSweep 2.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
