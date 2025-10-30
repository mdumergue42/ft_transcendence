module.exports = {
  content: [
    "./public/**/*.html", 
    "./src/**/*.{ts,js}",
    "./public/js/**/*.js"
  ],
  theme: { 
    extend: {
      fontFamily: {
        'pixel': ['monospace'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'glitch-light': 'glitch-light 3.7s infinite',
        'glitch-heavy': 'glitch-heavy 5.3s infinite',
        'noise-anim': 'noise-anim 2.1s infinite',
        'noise-anim-2': 'noise-anim-2 2.7s infinite',
      },
      keyframes: {
        glow: {
          'from': { textShadow: '0 0 5px #06b6d4, 0 0 10px #06b6d4, 0 0 15px #06b6d4' },
          'to': { textShadow: '0 0 10px #06b6d4, 0 0 20px #06b6d4, 0 0 30px #06b6d4' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'glitch-light': {
          '0%, 92%, 100%': { 
            transform: 'translate3d(0, 0, 0)',
            textShadow: '0 0 8px #00ff00'
          },
          '2%': { 
            transform: 'translate3d(-1px, 0, 0)',
            textShadow: '-1px 0 #ff00ff, 1px 0 #00ffff'
          },
          '4%': { 
            transform: 'translate3d(1px, 0, 0)',
            textShadow: '1px 0 #00ffff, -1px 0 #ff00ff'
          },
          '37%': { 
            transform: 'translate3d(-2px, 0, 0)',
            textShadow: '-2px 0 #ffff00, 2px 0 #ff00ff'
          },
          '39%': { 
            transform: 'translate3d(0, 0, 0)',
            textShadow: '0 0 6px #00ff00'
          },
          '73%': { 
            transform: 'translate3d(1px, -1px, 0)',
            textShadow: '1px 0 #00ffff, -1px 0 #ffff00'
          },
          '75%': { 
            transform: 'translate3d(-1px, 1px, 0)',
            textShadow: '-1px 0 #ff00ff, 1px 0 #00ffff'
          }
        },
        'glitch-heavy': {
          '0%, 88%, 100%': { 
            transform: 'translate3d(0, 0, 0)',
            textShadow: '0 0 10px #00ff00'
          },
          '1%': { 
            transform: 'translate3d(-6px, 2px, 0)',
            textShadow: '-6px 0 #ff00ff, 6px 0 #00ffff, 0 0 15px #ffff00'
          },
          '3%': { 
            transform: 'translate3d(7px, -3px, 0)',
            textShadow: '7px 0 #ff0000, -7px 0 #00ff00, 0 0 20px #ff00ff'
          },
          '5%': { 
            transform: 'translate3d(-4px, 4px, 0)',
            textShadow: '-4px 0 #00ffff, 4px 0 #ffff00, 0 0 12px #ff0000'
          },
          '7%': { 
            transform: 'translate3d(5px, -1px, 0)',
            textShadow: '5px 0 #ff00ff, -5px 0 #00ffff'
          },
          '43%': { 
            transform: 'translate3d(-8px, 1px, 0)',
            textShadow: '-8px 0 #ffff00, 8px 0 #ff0000, 0 0 25px #00ffff'
          },
          '45%': { 
            transform: 'translate3d(3px, -4px, 0)',
            textShadow: '3px 0 #00ff00, -3px 0 #ff00ff, 0 0 18px #ffff00'
          },
          '47%': { 
            transform: 'translate3d(-2px, 3px, 0)',
            textShadow: '-2px 0 #ff0000, 2px 0 #00ffff'
          },
          '81%': { 
            transform: 'translate3d(4px, -2px, 0)',
            textShadow: '4px 0 #ff00ff, -4px 0 #ffff00, 0 0 14px #00ff00'
          },
          '83%': { 
            transform: 'translate3d(-3px, 5px, 0)',
            textShadow: '-3px 0 #00ffff, 3px 0 #ff0000, 0 0 22px #ff00ff'
          },
          '85%': { 
            transform: 'translate3d(6px, -1px, 0)',
            textShadow: '6px 0 #ffff00, -6px 0 #00ff00'
          }
        },
        'noise-anim': {
          '0%': { clipPath: 'inset(23% 0 45% 0)' },
          '5%': { clipPath: 'inset(67% 0 12% 0)' },
          '10%': { clipPath: 'inset(8% 0 78% 0)' },
          '15%': { clipPath: 'inset(34% 0 29% 0)' },
          '20%': { clipPath: 'inset(89% 0 5% 0)' },
          '25%': { clipPath: 'inset(45% 0 32% 0)' },
          '30%': { clipPath: 'inset(12% 0 67% 0)' },
          '35%': { clipPath: 'inset(78% 0 15% 0)' },
          '40%': { clipPath: 'inset(56% 0 23% 0)' },
          '45%': { clipPath: 'inset(29% 0 58% 0)' },
          '50%': { clipPath: 'inset(73% 0 18% 0)' },
          '55%': { clipPath: 'inset(41% 0 47% 0)' },
          '60%': { clipPath: 'inset(18% 0 69% 0)' },
          '65%': { clipPath: 'inset(85% 0 8% 0)' },
          '70%': { clipPath: 'inset(52% 0 35% 0)' },
          '75%': { clipPath: 'inset(25% 0 62% 0)' },
          '80%': { clipPath: 'inset(69% 0 21% 0)' },
          '85%': { clipPath: 'inset(36% 0 54% 0)' },
          '90%': { clipPath: 'inset(91% 0 3% 0)' },
          '95%': { clipPath: 'inset(14% 0 76% 0)' },
          '100%': { clipPath: 'inset(58% 0 27% 0)' }
        },
        'noise-anim-2': {
          '0%': { clipPath: 'inset(76% 0 14% 0)' },
          '5%': { clipPath: 'inset(31% 0 52% 0)' },
          '10%': { clipPath: 'inset(65% 0 28% 0)' },
          '15%': { clipPath: 'inset(19% 0 73% 0)' },
          '20%': { clipPath: 'inset(47% 0 41% 0)' },
          '25%': { clipPath: 'inset(83% 0 9% 0)' },
          '30%': { clipPath: 'inset(56% 0 37% 0)' },
          '35%': { clipPath: 'inset(22% 0 68% 0)' },
          '40%': { clipPath: 'inset(74% 0 16% 0)' },
          '45%': { clipPath: 'inset(38% 0 51% 0)' },
          '50%': { clipPath: 'inset(87% 0 7% 0)' },
          '55%': { clipPath: 'inset(43% 0 39% 0)' },
          '60%': { clipPath: 'inset(15% 0 71% 0)' },
          '65%': { clipPath: 'inset(59% 0 26% 0)' },
          '70%': { clipPath: 'inset(92% 0 4% 0)' },
          '75%': { clipPath: 'inset(27% 0 64% 0)' },
          '80%': { clipPath: 'inset(71% 0 18% 0)' },
          '85%': { clipPath: 'inset(44% 0 48% 0)' },
          '90%': { clipPath: 'inset(86% 0 11% 0)' },
          '95%': { clipPath: 'inset(33% 0 55% 0)' },
          '100%': { clipPath: 'inset(77% 0 13% 0)' }
        }
      }
    } 
  },
  plugins: [],
};
