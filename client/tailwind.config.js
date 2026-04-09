/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                // Royal Black System
                black: {
                    DEFAULT: '#0A0A0A',
                    900: '#0A0A0A',
                    800: '#111112',
                    700: '#18181B',
                    600: '#1F1F23',
                    500: '#27272A',
                },
                // Premium Green System
                green: {
                    DEFAULT: '#00C853',
                    50: '#E8FFF2',
                    100: '#C3FFD9',
                    200: '#8BFFB4',
                    300: '#4DFF8D',
                    400: '#00E676',
                    500: '#00C853',
                    600: '#00A844',
                    700: '#008035',
                    800: '#005C26',
                    900: '#003817',
                },
                // Neutral Gray
                surface: {
                    DEFAULT: '#111112',
                    1: '#18181B',
                    2: '#1F1F23',
                    3: '#27272A',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            backgroundImage: {
                'green-gradient': 'linear-gradient(135deg, #00C853 0%, #00E676 100%)',
                'dark-gradient': 'linear-gradient(135deg, #0A0A0A 0%, #111827 100%)',
                'card-gradient': 'linear-gradient(135deg, #18181B 0%, #1F1F23 100%)',
                'hero-gradient': 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(0,200,83,0.3) 0%, transparent 60%)',
            },
            boxShadow: {
                green: '0 0 30px rgba(0,200,83,0.3)',
                'green-sm': '0 0 15px rgba(0,200,83,0.2)',
                card: '0 4px 24px rgba(0,0,0,0.5)',
                glass: '0 8px 32px rgba(0,0,0,0.4)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.4s ease-out',
                'pulse-green': 'pulseGreen 2s infinite',
                float: 'float 3s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
                slideUp: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
                pulseGreen: { '0%,100%': { boxShadow: '0 0 0 0 rgba(0,200,83,0.4)' }, '50%': { boxShadow: '0 0 0 12px rgba(0,200,83,0)' } },
                float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
            },
            backdropBlur: { xs: '2px' },
        },
    },
    plugins: [],
};
