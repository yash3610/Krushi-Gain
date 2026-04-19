/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern':
          'radial-gradient(circle at 10% 20%, rgba(34, 197, 94, 0.25) 0%, rgba(30, 41, 59, 0) 40%), radial-gradient(circle at 90% 10%, rgba(14, 165, 233, 0.2) 0%, rgba(30, 41, 59, 0) 40%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.2) 0%, rgba(30, 41, 59, 0) 45%)',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(15, 23, 42, 0.22)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'loader-screen': 'loaderScreen 2.6s ease-in-out forwards',
        'grow-stem': 'growStem 1.5s ease-out infinite',
        'leaf-left': 'leafLeft 1.5s ease-out infinite',
        'leaf-right': 'leafRight 1.5s ease-out infinite',
        'leaf-top-left': 'leafTopLeft 1.5s ease-out infinite',
        'leaf-top-right': 'leafTopRight 1.5s ease-out infinite',
        'seed-pop': 'seedPop 1.5s ease-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        loaderScreen: {
          '0%': { opacity: '0' },
          '12%': { opacity: '1' },
          '82%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        growStem: {
          '0%': { transform: 'translateX(-50%) scaleY(0.2)' },
          '35%': { transform: 'translateX(-50%) scaleY(1)' },
          '75%': { transform: 'translateX(-50%) scaleY(1)' },
          '100%': { transform: 'translateX(-50%) scaleY(0.2)' },
        },
        leafLeft: {
          '0%, 22%': { transform: 'scale(0) rotate(-20deg)' },
          '40%, 78%': { transform: 'scale(1) rotate(-16deg)' },
          '100%': { transform: 'scale(0) rotate(-20deg)' },
        },
        leafRight: {
          '0%, 25%': { transform: 'scale(0) rotate(20deg)' },
          '45%, 78%': { transform: 'scale(1) rotate(16deg)' },
          '100%': { transform: 'scale(0) rotate(20deg)' },
        },
        leafTopLeft: {
          '0%, 38%': { transform: 'scale(0) rotate(-8deg)' },
          '56%, 80%': { transform: 'scale(1) rotate(-4deg)' },
          '100%': { transform: 'scale(0) rotate(-8deg)' },
        },
        leafTopRight: {
          '0%, 40%': { transform: 'scale(0) rotate(8deg)' },
          '58%, 82%': { transform: 'scale(1) rotate(4deg)' },
          '100%': { transform: 'scale(0) rotate(8deg)' },
        },
        seedPop: {
          '0%, 42%': { transform: 'translateX(-50%) scale(0)' },
          '60%, 82%': { transform: 'translateX(-50%) scale(1)' },
          '100%': { transform: 'translateX(-50%) scale(0)' },
        },
      },
    },
  },
  plugins: [],
};
