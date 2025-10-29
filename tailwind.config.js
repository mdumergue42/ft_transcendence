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
      },
      keyframes: {
        glow: {
          'from': { textShadow: '0 0 5px #06b6d4, 0 0 10px #06b6d4, 0 0 15px #06b6d4' },
          'to': { textShadow: '0 0 10px #06b6d4, 0 0 20px #06b6d4, 0 0 30px #06b6d4' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    } 
  },
  plugins: [],
};
