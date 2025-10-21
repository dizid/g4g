/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      // Custom gaming-themed color palette
      colors: {
        gaming: {
          dark: '#0a0e27',
          darker: '#060816',
          primary: '#6366f1',
          secondary: '#8b5cf6',
          accent: '#ec4899',
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444',
        },
        neon: {
          blue: '#00f0ff',
          purple: '#b400ff',
          pink: '#ff006e',
          green: '#39ff14',
        }
      },
      // Custom gaming fonts
      fontFamily: {
        gaming: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      // Custom animations
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-in',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          'from': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)' },
          'to': { boxShadow: '0 0 30px rgba(139, 92, 246, 0.8)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        slideUp: {
          'from': { transform: 'translateY(20px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' }
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' }
        }
      },
      // Glassmorphism backdrop blur
      backdropBlur: {
        xs: '2px',
      },
      // Custom box shadows for depth
      boxShadow: {
        'neon': '0 0 20px rgba(99, 102, 241, 0.5)',
        'neon-strong': '0 0 40px rgba(99, 102, 241, 0.8)',
        'game-card': '0 10px 40px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
